// ─────────────────────────────────────────────────────────────────────────────
// Content barrel — components import everything content-related from "@/content".
//
//   import { img, Icon, type CTA } from "@/content";
//
// Foundation: assets (image registry), icons (icon registry), types (shared).
// Collections, pages and sections are re-exported as they are migrated.
// ─────────────────────────────────────────────────────────────────────────────

export { assets, img, type AssetKey } from './assets';
export { Icon, iconRegistry, type IconName } from './icons';
export * from './types';

// ── sections ──
export * from './sections/nav';
export * from './sections/footer';
export * from './sections/cta';
export * from './sections/showcase';

// ── collections ──
export * from './collections/testimonials';
export * from './collections/services';
export * from './collections/case-studies';
export * from './collections/blog';

// ── pages ──
export * from './pages/home';
export * from './pages/about-us';
export * from './pages/services';
export * from './pages/contact';
export * from './pages/up2date';
export * from './pages/privacy';
export * from './pages/work';
export * from './pages/not-found';
