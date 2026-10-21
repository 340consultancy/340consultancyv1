//   npm run sanity:verify -- --strapi-url https://cms.340consultancy.com
// Compares what the site showed from Strapi with what Sanity now publishes.
// Exits 1 when anything is missing.
import fixture from '../src/test/fixtures/bundled-content.json';
import { COLLECTIONS, CONTENT_TYPES } from '../src/lib/sanity/documents';
import { assembleContent } from '../src/lib/sanity/from-sanity';
import { argValue, loadDotEnv, requireEnv, sanityReadClient } from './sanity/cli';
import { diffBundles } from './sanity/diff-bundles';
import { fetchStrapiPayload, mergeStrapiPayload } from './sanity/strapi-merge';

loadDotEnv();
const strapiUrl = (argValue('strapi-url') ?? '').replace(/\/+$/, '');
if (!strapiUrl) throw new Error('Préciser --strapi-url https://…');
const projectId = requireEnv('SANITY_PROJECT_ID');
const dataset = requireEnv('SANITY_DATASET');

const source = mergeStrapiPayload(fixture.content, await fetchStrapiPayload(strapiUrl), strapiUrl);
const docs = await sanityReadClient(projectId, dataset).fetch<Record<string, unknown>[]>('*[_type in $types]', { types: CONTENT_TYPES });
const target = assembleContent(docs, { projectId, dataset });

for (const c of COLLECTIONS) {
  const count = (b: Record<string, unknown>) => (Array.isArray(b[c.export]) ? (b[c.export] as unknown[]).length : 0);
  console.log(`${c.title} : Strapi ${count(source)} / Sanity ${count(target)}`);
}

const problems = diffBundles(fixture.content, source, target);
if (problems.length > 0) {
  console.error(`\n${problems.length} écart(s) :`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('\nMigration vérifiée : rien ne manque dans Sanity.');
