// Footer section content — shared across all pages.
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.

import type { IconName } from '@/content/icons';
import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

export interface FooterNavItem {
  label: string;
  to: string;
}

export interface FooterSocialItem {
  icon: IconName;
  href: string;
  label: string;
}

export interface FooterContent {
  logo: { src: AssetKey; alt: string };
  /** Wordmark lockup beside the logo: reads "340 knows the way." — `accent` is the coloured span. */
  lockup: { line1: string; line2Lead: string; accent: string };
  quote: string;
  hashtag: string;
  social: FooterSocialItem[];
  nav: FooterNavItem[];
  backToTopLabel: string;
  copyright: string;
  privacy: { label: string; to: string };
  tagline: string;
}

export const footer = generated.footer as FooterContent;
