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
