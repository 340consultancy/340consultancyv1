// UP2DATE page (single type) — lead magnet + newsletter copy.
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

export interface Up2dateContent {
  hero: {
    /** Title parts: lead + outlined accent + tail (renders "UP2DATE"). */
    title: { lead: string; accent: string; tail: string };
    tagline: string;
    image: AssetKey;
    scrollLabel: string;
  };
  leadMagnet: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    body: string;
    emailPlaceholder: string;
    buttonLabel: string;
    successToast: string;
    errorToast: string;
    image: AssetKey;
    imageAlt: string;
  };
  newsletter: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    body: string;
    emailPlaceholder: string;
    buttonLabel: string;
    successToast: string;
    errorToast: string;
  };
}

export const up2date = generated.up2date as Up2dateContent;
