// Prebuild: reads every published document from Sanity and writes the site
// content to src/content/generated/content.json. Any failure exits non-zero,
// so a Vercel build never publishes a site without content.
import { mkdirSync, writeFileSync } from 'node:fs';
import { CONTENT_TYPES } from '../src/lib/sanity/documents';
import { assembleContent } from '../src/lib/sanity/from-sanity';
import { loadDotEnv, requireEnv, sanityReadClient } from './sanity/cli';

loadDotEnv();
const projectId = requireEnv('SANITY_PROJECT_ID');
const dataset = requireEnv('SANITY_DATASET');

const docs = await sanityReadClient(projectId, dataset).fetch<Record<string, unknown>[]>(
  '*[_type in $types]',
  { types: CONTENT_TYPES }
);
const content = assembleContent(docs, { projectId, dataset });

mkdirSync('src/content/generated', { recursive: true });
writeFileSync('src/content/generated/content.json', JSON.stringify(content, null, 2) + '\n');
console.log(`Contenu Sanity : ${docs.length} documents lus (dataset « ${dataset} »).`);
