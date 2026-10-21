// Our Work page (single type). Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

export interface WorkClient {
  initials: string;
  color: string;
  name: string;
}

export interface WorkStat {
  value: string;
  label: string;
  client: string;
}

export interface WorkCaseCard {
  slug: string | null;
  client: string;
  tag: string;
  /** Multi-line headline (rendered with white-space: pre-line) — keep the \n. */
  headline: string;
  stat: string;
  img: AssetKey;
}

export interface WorkContent {
  hero: {
    image: AssetKey;
    headline: { lead: string; accent: string };
    subtitle: string;
    scrollLabel: string;
  };
  /** Small logo used as separator in the client marquee. */
  separatorLogo: AssetKey;
  clients: WorkClient[];
  stats: WorkStat[];
  cases: {
    eyebrow: string;
    heading: { lead: string; accent: string };
    viewLabel: string;
    cards: WorkCaseCard[];
  };
}

export const work = generated.work as WorkContent;
