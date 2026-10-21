// Prebuild: reads every published document from Sanity and writes the site
// content to src/content/generated/content.json. Any failure exits non-zero,
// so a Vercel build never publishes a site without content.
import { mkdirSync, writeFileSync } from 'node:fs';
import { schemaTypes } from '../studio/schemaTypes';
import { CONTENT_TYPES, SINGLETONS } from '../src/lib/sanity/documents';
import { assembleContent } from '../src/lib/sanity/from-sanity';
import { loadDotEnv, requireEnv, sanityReadClient } from './sanity/cli';

loadDotEnv();
const projectId = requireEnv('SANITY_PROJECT_ID');
const dataset = requireEnv('SANITY_DATASET');

const docs = await sanityReadClient(projectId, dataset).fetch<Record<string, unknown>[]>(
  '*[_type in $types]',
  { types: CONTENT_TYPES }
);
if (docs.length === 0) {
  throw new Error(`Sanity : aucun document dans le dataset « ${dataset} » du projet ${projectId} (dataset vide, privé ou mal nommé ?)`);
}

// Every top-level section of a page is read unconditionally by its component.
const singletonTypes = new Set(SINGLETONS.map((s) => s.type));
const requiredFields = Object.fromEntries(
  (schemaTypes as unknown as { name: string; fields: { name: string }[] }[])
    .filter((t) => singletonTypes.has(t.name))
    .map((t) => [t.name, t.fields.map((f) => f.name)])
);
const content = assembleContent(docs, { projectId, dataset }, requiredFields);

mkdirSync('src/content/generated', { recursive: true });
writeFileSync('src/content/generated/content.json', JSON.stringify(content, null, 2) + '\n');
console.log(`Contenu Sanity : ${docs.length} documents lus (dataset « ${dataset} »).`);
