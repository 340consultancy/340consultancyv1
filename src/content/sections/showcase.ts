// "Content we create" / "Every industry" showcase section — shared between
// the Services and Work pages.
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.
// are media fields, seeded from the bundled files (swap in the Media Library).

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

export interface ShowcaseItem {
  label: string;
  /** Image shown while the term is hovered — AssetKey (or CMS URL after hydration), resolve via img(). */
  img: AssetKey | (string & {});
}

export interface ShowcaseText {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  sub: string;
}

export interface ShowcaseHalf {
  text: ShowcaseText;
  items: ShowcaseItem[];
  /** Founder photos cycled as the default background before hover. */
  defaultImages: AssetKey[];
}

export const showcase = generated.showcase as { content: ShowcaseHalf; industry: ShowcaseHalf };
