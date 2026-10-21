// One-off import of the site content into a Sanity dataset.
//
//   npm run sanity:import -- --source bundled                       (development dataset)
//   npm run sanity:import -- --source strapi --strapi-url https://cms.340consultancy.com --overwrite
//
// Needs SANITY_PROJECT_ID, SANITY_DATASET and SANITY_WRITE_TOKEN (Editor token).
// Read-only towards Strapi: it never uploads anything there.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import fixture from '../src/test/fixtures/bundled-content.json';
import { schemaTypes } from '../studio/schemaTypes';
import { argValue, loadDotEnv, requireEnv, SANITY_API_VERSION } from './sanity/cli';
import type { DocumentSchema } from './sanity/infer-schema';
import { checkImportTarget } from './sanity/import-guard';
import { fetchStrapiPayload, mergeStrapiPayload } from './sanity/strapi-merge';
import { toSanityDocs, type ImageRef, type ResolveImage } from './sanity/to-sanity';

loadDotEnv();
const source = argValue('source');
if (source !== 'bundled' && source !== 'strapi') throw new Error('Préciser --source bundled ou --source strapi');

const dataset = requireEnv('SANITY_DATASET');
checkImportTarget(dataset, source, process.argv.includes('--overwrite'));
const client = createClient({
  projectId: requireEnv('SANITY_PROJECT_ID'),
  dataset,
  token: requireEnv('SANITY_WRITE_TOKEN'),
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

let content = structuredClone(fixture.content) as Record<string, unknown>;
if (source === 'strapi') {
  const strapiUrl = (argValue('strapi-url') ?? '').replace(/\/+$/, '');
  if (!strapiUrl) throw new Error('Préciser --strapi-url https://…');
  console.log(`Lecture du contenu Strapi : ${strapiUrl}/api/site-content`);
  content = mergeStrapiPayload(content, await fetchStrapiPayload(strapiUrl), strapiUrl);
}

const assetFiles = fixture.assetFiles as Record<string, string>;

async function upload(src: string): Promise<ImageRef> {
  let buffer: Buffer;
  let filename: string;
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Téléchargement impossible (HTTP ${res.status}) : ${src}`);
    buffer = Buffer.from(await res.arrayBuffer());
    filename = path.basename(new URL(src).pathname);
  } else if (assetFiles[src]) {
    buffer = readFileSync(assetFiles[src]);
    filename = path.basename(assetFiles[src]);
  } else {
    throw new Error(`Image inconnue (ni URL, ni image embarquée) : ${src}`);
  }
  const asset = await client.assets.upload('image', buffer, { filename });
  console.log(`  image ${filename} → ${asset._id}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

// Each distinct source is uploaded once, even when used in several places.
const uploads = new Map<string, Promise<ImageRef>>();
const resolveImage: ResolveImage = (src) => {
  if (!uploads.has(src)) uploads.set(src, upload(src));
  return uploads.get(src)!;
};

const { docs, warnings } = await toSanityDocs(content, schemaTypes as unknown as DocumentSchema[], resolveImage);
for (const w of warnings) console.warn(`⚠ ${w}`);

const tx = client.transaction();
for (const doc of docs) tx.createOrReplace(doc);
await tx.commit();
console.log(`${docs.length} documents et ${uploads.size} images écrits dans le dataset « ${dataset} ».`);
