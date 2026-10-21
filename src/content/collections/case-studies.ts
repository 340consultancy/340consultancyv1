// Case studies collection (CMS collection type `case-study`).
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';
import type { CaseStudyLabels } from '@/content/types';

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  services: string;
  website?: string;
  headline: string;
  heroImg: AssetKey;
  intro: string;
  challenge: string;
  approach: string;
  resultText: string;
  stats: CaseStudyStat[];
  visuals: [AssetKey, AssetKey];
  gallery: AssetKey[];
  cardImg: AssetKey;
  cardTag: string;
  cardStat: string;
  /** Multi-line card headline (rendered with white-space: pre-line) — keep the \n. */
  cardHeadline: string;
}

export const caseStudies = generated.caseStudies as CaseStudy[];

/** Static labels on the case-study detail page (part of a global/shared type). */
export const caseStudyLabels = generated.caseStudyLabels as CaseStudyLabels;
