// Dumps the bundled site content (src/content/**) to cms/data/seed.json AND
// copies every registered image into cms/data/seed-media/ (+ a manifest), so
// the Strapi bootstrap (cms/src/index.js) can pre-fill an empty CMS with all
// text content AND upload every image into the Media Library, linked to the
// right field — no manual uploads needed, on first start and on fresh deploys.
//
// Run from the repo root:  npm run cms:seed-dump
import { writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import {
  assets,
  nav, footer, cta, showcase,
  testimonials, testimonialsCta,
  services, managementAddOns, strategyAddOns, serviceDetailLabels,
  caseStudies, caseStudyLabels,
  blogArticles, blogSection, blogPage, igPostUrls,
  home, aboutUs, servicesPage, contact, up2date, work, privacy, notFound,
} from '../src/content';

// Privacy blocks are polymorphic in the frontend ({kind:'p'|'ul', link:{…}}).
// In Strapi they are flat privacy.block components: link split into
// linkText/linkHref, list items joined one-per-line into `text`, and the
// reserved `id` renamed to `anchor`. src/lib/cmsContent.ts reverses this.
const privacyForCms = {
  ...privacy,
  sections: privacy.sections.map((section) => ({
    anchor: section.id,
    title: section.title,
    blocks: section.blocks.map((block) =>
      block.kind === 'ul'
        ? { kind: 'ul', text: block.items.join('\n') }
        : {
            kind: 'p',
            text: block.text,
            lead: block.lead,
            linkText: block.link?.text,
            linkHref: block.link?.href,
            tail: block.tail,
            mt: block.mt,
          }
    ),
  })),
};

// Read-only editor guides ("Also on this page") — shown as the first field of
// every page in the CMS. They point to the shared content that appears on the
// page but is edited elsewhere. Never rendered on the website (the hydration
// strips the field).
const PAGE_GUIDES: Record<string, string> = {
  'home-page': [
    'Shown on this page but edited elsewhere:',
    '• Testimonials slider → “Testimonial” entries (button: General → Testimonials button)',
    '• Blog & Social tiles → tile texts: General → Blog/Social section · posts: “Blog Article” + “Instagram Post” entries',
    '• Closing “Ready to level up?” → General → Closing section',
    '• Navigation & footer → General',
  ].join('\n'),
  'about-page': [
    'Shown on this page but edited elsewhere:',
    '• Closing “Ready to level up?” → General → Closing section',
    '• Navigation & footer → General',
  ].join('\n'),
  'services-page': [
    'Shown on this page but edited elsewhere:',
    '• Service cards & detail pages → “Service” entries',
    '• Add-ons on the detail pages → General → Add-ons',
    '• Showcase “Content we create” / “Every industry” → General',
    '• Testimonials slider → “Testimonial” entries',
    '• Closing section, navigation & footer → General',
  ].join('\n'),
  'contact-page': [
    'Shown on this page but edited elsewhere:',
    '• Navigation & footer → General',
  ].join('\n'),
  'up2date-page': [
    'Shown on this page but edited elsewhere:',
    '• Blog & Social tiles → tile texts: General → Blog/Social section · posts: “Blog Article” + “Instagram Post” entries',
    '• Closing section, navigation & footer → General',
  ].join('\n'),
  'work-page': [
    'Shown on this page but edited elsewhere:',
    '• Case cards & detail pages → “Case Study” entries (shared labels: General → Labels: case-study pages)',
    '• Showcase “Content we create” / “Every industry” → General',
    '• Testimonials slider → “Testimonial” entries',
    '• Closing section, navigation & footer → General',
  ].join('\n'),
  'privacy-page': [
    'Shown on this page but edited elsewhere:',
    '• Navigation & footer → General',
  ].join('\n'),
};

const seed = {
  global: {
    nav, footer, cta, testimonialsCta,
    showcaseContent: showcase.content,
    showcaseIndustry: showcase.industry,
    blogSection, blogPage,
    serviceDetailLabels, caseStudyLabels,
    managementAddOns, strategyAddOns,
  },
  'home-page': { alsoOnThisPage: PAGE_GUIDES['home-page'], ...home },
  'about-page': { alsoOnThisPage: PAGE_GUIDES['about-page'], ...aboutUs },
  'services-page': { alsoOnThisPage: PAGE_GUIDES['services-page'], ...servicesPage },
  'contact-page': { alsoOnThisPage: PAGE_GUIDES['contact-page'], ...contact },
  'up2date-page': { alsoOnThisPage: PAGE_GUIDES['up2date-page'], ...up2date },
  'work-page': { alsoOnThisPage: PAGE_GUIDES['work-page'], ...work },
  'privacy-page': { alsoOnThisPage: PAGE_GUIDES['privacy-page'], ...privacyForCms },
  'not-found-page': notFound,
  testimonial: testimonials,
  service: services,
  'case-study': caseStudies,
  // Strapi reserves `id` — the local BlogArticle.id becomes the `slug` field.
  // Bundled list is newest-first; seed OLDEST first so entry creation
  // timestamps follow real chronology — the site-content endpoint sorts
  // createdAt:desc, and every article an editor adds later lands on top.
  'blog-post': [...blogArticles].reverse().map(({ id, ...rest }) => ({ slug: id, ...rest })),
  // Bundled list is newest-first; seed OLDEST first so the entries' creation
  // timestamps follow real chronology — the site-content endpoint sorts
  // createdAt:desc, and every post an editor adds later lands on top.
  'instagram-post': [...igPostUrls].reverse().map((url) => ({ url })),
};

mkdirSync('cms/data', { recursive: true });
writeFileSync('cms/data/seed.json', JSON.stringify(seed, null, 2) + '\n');
console.log('cms/data/seed.json written');

// ── Copy every registered image into cms/data/seed-media/ + a manifest ──
// The bootstrap uploads these into the Media Library and links each media
// field to the matching AssetKey. AssetKeys map 1:1 onto the source filename
// (minus extension) in src/assets/.
const MEDIA_DIR = 'cms/data/seed-media';
if (existsSync(MEDIA_DIR)) rmSync(MEDIA_DIR, { recursive: true, force: true });
mkdirSync(MEDIA_DIR, { recursive: true });

const manifest: Record<string, string> = {};
const EXTS = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'avif'];
for (const key of Object.keys(assets)) {
  const ext = EXTS.find((e) => existsSync(`src/assets/${key}.${e}`));
  if (!ext) {
    console.warn(`  ! no source file found for asset key "${key}" — skipped`);
    continue;
  }
  const filename = `${key}.${ext}`;
  copyFileSync(`src/assets/${key}.${ext}`, `${MEDIA_DIR}/${filename}`);
  manifest[key] = filename;
}
writeFileSync(`${MEDIA_DIR}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`cms/data/seed-media/ written (${Object.keys(manifest).length} images + manifest)`);
console.log('  copied:', readdirSync(MEDIA_DIR).filter((f) => f !== 'manifest.json').length, 'files');
