// Services overview page (single type). Serializable: images → AssetKey,
// text verbatim. The service entries themselves live in
// src/content/collections/services.ts.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

export interface ProcessStep {
  phase: string;
  title: string;
  desc: string;
}

export interface ServicesPageContent {
  hero: {
    headline: { lead: string; accent: string };
    tagline: string;
    image: AssetKey;
    imagePosition: string;
    scrollLabel: string;
  };
  bento: {
    eyebrow: string;
    heading: string;
    hint: string;
    viewDetailsLabel: string;
    workshopTools: string[];
    workshopNote: string;
  };
  process: {
    eyebrow: string;
    headline: { lead: string; accent: string };
    sub: string;
    steps: ProcessStep[];
    hashtag: string;
  };
}

export const servicesPage = generated.servicesPage as ServicesPageContent;
