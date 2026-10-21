// One-off: writes studio/schemaTypes/*.ts from the bundled content snapshot.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { buildSchemas, toTs, type InferContext } from './sanity/infer-schema';
import { COLLECTIONS, SINGLETONS } from '../src/lib/sanity/documents';

const fixture = JSON.parse(readFileSync('src/test/fixtures/bundled-content.json', 'utf8'));

const OVERRIDES: InferContext['overrides'] = {
  'blogPost.body': {
    title: 'Body',
    type: 'array',
    of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading', value: 'h2' }] }],
  },
};

const ctx: InferContext = {
  assetKeys: new Set(fixture.assetKeys),
  iconNames: new Set(fixture.iconNames),
  overrides: OVERRIDES,
  imagePaths: [],
};
const schemas = buildSchemas(fixture.content, ctx);

const header =
  '// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.\n' +
  '// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.\n\n';

mkdirSync('studio/schemaTypes', { recursive: true });
for (const s of schemas) {
  writeFileSync(`studio/schemaTypes/${s.name}.ts`, `${header}export default ${toTs(s)};\n`);
}

const index =
  header +
  schemas.map((s) => `import ${s.name} from './${s.name}';`).join('\n') +
  `\n\nexport const schemaTypes = [${schemas.map((s) => s.name).join(', ')}];\n\n` +
  `export const SINGLETONS = ${JSON.stringify(SINGLETONS.map(({ type, title }) => ({ type, title })), null, 2)};\n\n` +
  `export const COLLECTIONS = ${JSON.stringify(COLLECTIONS.map(({ type, title, ordering }) => ({ type, title, ordering })), null, 2)};\n\n` +
  'export const SINGLETON_TYPES: string[] = SINGLETONS.map((s) => s.type);\n';
writeFileSync('studio/schemaTypes/index.ts', index);

console.log(`${schemas.length} schémas écrits dans studio/schemaTypes/`);
console.log('Champs détectés comme images (à comparer aux champs typés AssetKey / ImageRef) :');
for (const p of ctx.imagePaths) console.log(`  ${p}`);
