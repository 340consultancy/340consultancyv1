// ─────────────────────────────────────────────────────────────────────────────
// Shared content types. Everything here is serializable (strings / numbers /
// arrays / objects) — no JSX, no functions, no React nodes.
//   - images  → AssetKey string (resolve with img())
//   - icons   → IconName string (render with <Icon name=… />)
//   - links   → href string
// ─────────────────────────────────────────────────────────────────────────────

import type { AssetKey } from './assets';
import type { IconName } from './icons';

export type { AssetKey } from './assets';
export type { IconName } from './icons';

/** A call-to-action / link leaf. */
export interface CTA {
  label: string;
  href: string;
}

/** A split headline: a solid lead line + an accent (outlined) line. */
export interface SplitHeadline {
  line1: string;
  line2: string;
}

/** Per-page SEO / document metadata. */
export interface SEO {
  title: string;
  description?: string;
}

/** A reference to a registered image asset. */
export type ImageRef = AssetKey;

/** A reference to a content-bound icon. */
export type IconRef = IconName;

/** A headline split into a solid lead and an accent part. */
export interface HeadlineParts {
  lead: string;
  accent: string;
}

/** Static labels of the blog listing and article pages. */
export interface BlogPageContent {
  listing: { eyebrow: string; headline: HeadlineParts; tagline: string; readLabel: string };
  article: { backLabel: string; moreEyebrow: string; moreHeadline: HeadlineParts; byLabel: string };
}

/** Static labels of the case study page. */
export interface CaseStudyLabels {
  notFound: { message: string; backLabel: string };
  backLabel: string;
  meta: { client: string; services: string; website: string; industry: string };
  sections: { challenge: string; approach: string; results: string };
  others: { eyebrow: string; heading: HeadlineParts; allWorkLabel: string; viewCaseLabel: string };
  scrollLabel: string;
}

/** Static labels of the service detail page. */
export interface ServiceDetailLabels {
  addOns: { eyebrow: string; heading: HeadlineParts };
  serviceEyebrow: string;
  pricingLabel: string;
  includesLabel: string;
  defaultCtaLabel: string;
  availableInPrefix: string;
  others: { eyebrow: string; heading: HeadlineParts };
}

/** Link under the testimonials section. */
export interface TestimonialsCta {
  label: string;
  to: string;
}
