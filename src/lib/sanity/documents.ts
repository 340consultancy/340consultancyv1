// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for how the site's content exports (src/content/**)
// map onto Sanity documents. Used by the build-time fetch, the schema
// generator and the import scripts.
// ─────────────────────────────────────────────────────────────────────────────

/** Every content export, keyed by its export name in "@/content". */
export type ContentBundle = Record<string, unknown>;

/**
 * A document that exists exactly once. Either its whole body IS one content
 * export (`export`), or each listed export is one top-level field (`fields`).
 */
export interface SingletonDef {
  type: string;
  title: string;
  export?: string;
  fields?: string[];
}

/** A repeatable document type mapped onto one array export. */
export interface CollectionDef {
  type: string;
  title: string;
  export: string;
  /** Field used in URLs, stored as a Sanity slug (null: no route). */
  idField: string | null;
  /** Field shown as the document title in the Studio lists. */
  titleField: string;
  ordering: 'order' | 'publishedAt';
  /** Fields recomputed from the display position, never stored. */
  derivedFields: string[];
}

export const SINGLETONS: SingletonDef[] = [
  { type: 'homePage', title: 'Home', export: 'home' },
  { type: 'aboutPage', title: 'About us', export: 'aboutUs' },
  { type: 'servicesPage', title: 'Services', export: 'servicesPage' },
  { type: 'workPage', title: 'Our work', export: 'work' },
  { type: 'up2datePage', title: 'Up2date', export: 'up2date' },
  { type: 'contactPage', title: 'Contact', export: 'contact' },
  { type: 'privacyPage', title: 'Privacy', export: 'privacy' },
  { type: 'notFoundPage', title: '404 page', export: 'notFound' },
  {
    type: 'siteSettings',
    title: 'Site settings',
    fields: [
      'nav', 'footer', 'cta', 'testimonialsCta', 'showcase', 'blogSection', 'blogPage',
      'serviceDetailLabels', 'caseStudyLabels', 'managementAddOns', 'strategyAddOns', 'igPostUrls',
    ],
  },
];

export const COLLECTIONS: CollectionDef[] = [
  { type: 'testimonial', title: 'Testimonials', export: 'testimonials', idField: null, titleField: 'name', ordering: 'order', derivedFields: [] },
  { type: 'service', title: 'Services', export: 'services', idField: 'key', titleField: 'label', ordering: 'order', derivedFields: [] },
  { type: 'caseStudy', title: 'Case studies', export: 'caseStudies', idField: 'slug', titleField: 'client', ordering: 'order', derivedFields: [] },
  { type: 'blogPost', title: 'Blog posts', export: 'blogArticles', idField: 'id', titleField: 'title', ordering: 'publishedAt', derivedFields: ['number'] },
];

export const ALL_EXPORTS: string[] = [
  ...SINGLETONS.flatMap((s) => (s.export ? [s.export] : s.fields ?? [])),
  ...COLLECTIONS.map((c) => c.export),
];

export const CONTENT_TYPES: string[] = [
  ...SINGLETONS.map((s) => s.type),
  ...COLLECTIONS.map((c) => c.type),
];
