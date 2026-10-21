// One-off: freezes the bundled content of src/content/** into a JSON fixture.
// The fixture drives the Sanity schema generator, the import of the
// development dataset and the round-trip tests.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import * as content from '@/content';
import { assets, iconRegistry } from '@/content';
import { ALL_EXPORTS } from '@/lib/sanity/documents';

const bundle: Record<string, unknown> = {};
for (const name of ALL_EXPORTS) {
  const value = (content as Record<string, unknown>)[name];
  if (value === undefined) throw new Error(`Export introuvable dans @/content : ${name}`);
  bundle[name] = value;
}

// Vite resolves image imports to "/src/assets/<file>" in vite-node.
const assetFiles: Record<string, string> = {};
for (const [key, url] of Object.entries(assets)) {
  const file = String(url).replace(/^\/@fs\//, '').replace(/^\//, '');
  if (!existsSync(file)) throw new Error(`Fichier image introuvable pour « ${key} » : ${file}`);
  assetFiles[key] = file;
}

const fixture = {
  content: JSON.parse(JSON.stringify(bundle)),
  assetKeys: Object.keys(assets),
  iconNames: Object.keys(iconRegistry),
  assetFiles,
};

mkdirSync('src/test/fixtures', { recursive: true });
writeFileSync('src/test/fixtures/bundled-content.json', JSON.stringify(fixture, null, 2) + '\n');
console.log(`Instantané écrit : ${ALL_EXPORTS.length} exports, ${Object.keys(assets).length} images`);
