// About Us page (single type). Serializable: images → AssetKey,
// icons → IconName, text verbatim.

import type { AssetKey } from '@/content/assets';
import type { IconName } from '@/content/icons';
import { generated } from '@/content/generated';

export interface Founder {
  img: AssetKey;
  /** object-position for the desktop full-bleed layout. */
  imgPosDesktop: string;
  /** object-position for the stacked mobile layout. */
  imgPosMobile: string;
  name: string;
  surname: string;
  role: string;
  bio: string;
  langs: string[];
}

export interface ValueItem {
  icon: IconName;
  title: string;
  desc: string;
}

export interface AboutUsContent {
  hero: {
    image: AssetKey;
    imageAlt: string;
    imagePosition: string;
    headline: { lead: string; accent: string };
    tagline: string;
    scrollLabel: string;
  };
  story: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    paragraphs: string[];
    signoff: string;
  };
  founders: {
    eyebrow: string;
    linda: Founder;
    nancy: Founder;
    /** Quote panel between the two founders — solid line + outlined line. */
    quote: {
      /** Desktop layout, one entry per line. */
      solidLines: string[];
      outlineLines: string[];
      /** Mobile layout, joined into a single running sentence. */
      solid: string;
      outline: string;
    };
  };
  values: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    items: ValueItem[];
  };
}

export const aboutUs = generated.aboutUs as AboutUsContent;
