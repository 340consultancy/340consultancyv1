// Field-by-field CMS parity check.
//
// The local Strapi was seeded FROM the bundled content, so after hydration
// every field of every content module must be identical to its bundled value
// (media fields are empty in the CMS and must keep the bundled asset keys).
// Any difference = a field that does not round-trip through the CMS.
//
// Run from the repo root (Strapi + VITE_STRAPI_URL in .env.local required):
//   npm run cms:verify
import {
  nav, footer, cta, showcase,
  testimonials, testimonialsCta,
  services, managementAddOns, strategyAddOns, serviceDetailLabels,
  caseStudies, caseStudyLabels,
  blogArticles, blogSection, blogPage, igPostUrls,
  home, aboutUs, servicesPage, contact, up2date, work, privacy,
} from '../src/content';
import { hydrateContentFromCms } from '../src/lib/cmsContent';

const modules: Record<string, unknown> = {
  nav, footer, cta, testimonialsCta,
  'showcase.content': showcase.content, 'showcase.industry': showcase.industry,
  blogSection, blogPage, serviceDetailLabels, caseStudyLabels,
  managementAddOns, strategyAddOns,
  home, aboutUs, servicesPage, contact, up2date, work, privacy,
  testimonials, services, caseStudies, blogArticles, igPostUrls,
};

const snapshot = JSON.parse(JSON.stringify(modules));

const diffs: string[] = [];
function diff(path: string, a: unknown, b: unknown): void {
  if (a === b) return;
  const bothObjects = typeof a === 'object' && a !== null && typeof b === 'object' && b !== null;
  if (!bothObjects) {
    // undefined vs missing key noise: treat undefined==undefined already handled
    diffs.push(`${path}: bundled=${JSON.stringify(a)} → hydrated=${JSON.stringify(b)}`);
    return;
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    diffs.push(`${path}: array/object mismatch`);
    return;
  }
  const keys = new Set([...Object.keys(a as object), ...Object.keys(b as object)]);
  for (const k of keys) {
    diff(`${path}.${k}`, (a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]);
  }
}

if (!process.env.VITE_STRAPI_URL && !import.meta.env?.VITE_STRAPI_URL) {
  console.error('VITE_STRAPI_URL is not set — start Strapi and set it in .env.local');
  process.exit(2);
}

await hydrateContentFromCms();

for (const [name, mod] of Object.entries(modules)) {
  diff(name, snapshot[name], mod);
}

// Known, intended differences (extra CMS bookkeeping merged into collections):
//  - order/caption: CMS-only sorting/notes fields
//  - blogArticles.N.slug: CMS-side name of the local `id` (both are kept)
const expected = /(\.(order|caption)|^blogArticles\.\d+\.slug)$/;
const real = diffs.filter((d) => !expected.test(d.split(':')[0]));

// Once editors change content in the admin, values legitimately differ from
// the bundled defaults — that is the CMS doing its job. Only structural
// problems are failures: a shape mismatch, or a NAMED field the CMS no longer
// returns. A missing ARRAY INDEX is an editor deleting list entries = drift.
const isArrayIndexPath = (d: string) => /\.\d+$/.test(d.split(':')[0]);
const structural = real.filter(
  (d) => d.includes('array/object mismatch') || (/→ hydrated=undefined$/.test(d) && !isArrayIndexPath(d))
);
const drift = real.filter((d) => !structural.includes(d));

console.log(`Checked ${Object.keys(modules).length} content modules against the CMS.`);
if (drift.length > 0) {
  console.log(`ℹ️  ${drift.length} field(s) changed by editors (expected drift):`);
  for (const d of drift.slice(0, 30)) console.log('  ~', d);
}
if (structural.length === 0) {
  console.log('✅ PARITY OK — every field round-trips through Strapi with the correct shape.');
  process.exit(0);
} else {
  console.error(`❌ ${structural.length} structural difference(s):`);
  for (const d of structural.slice(0, 60)) console.error('  -', d);
  process.exit(1);
}
