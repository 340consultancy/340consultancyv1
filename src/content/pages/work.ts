// Our Work page (single type). Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

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

export const work: WorkContent = {
  hero: {
    image: 'work-hero',
    headline: { lead: 'OUR ', accent: 'WORK' },
    subtitle: 'The numbers speak for themselves.',
    scrollLabel: 'SCROLL',
  },
  separatorLogo: 'logo-340-white',
  clients: [
    { initials: 'SD', color: '#3d2b1f', name: 'Studio Displays' },
    { initials: 'AN', color: '#1c2c1e', name: 'AlbaNova' },
    { initials: 'GE', color: '#26202f', name: 'Galería Eldorado' },
    { initials: 'BY', color: '#1e2830', name: 'Becoming You' },
    { initials: 'NS', color: '#2a1d1d', name: 'NHL Stenden University' },
    { initials: 'NH', color: '#1f2830', name: 'Notiz Hotel' },
    { initials: 'NE', color: '#24201c', name: 'New Edge' },
    { initials: 'WX', color: '#1c2020', name: 'Weltladen Xanten' },
  ],
  stats: [
    { value: '+200', label: 'Followers in 10 days', client: '' },
    { value: '3K → 30K', label: 'Profile views', client: '' },
    { value: '15.20%', label: 'Engagement rate', client: '' },
    { value: '+84.5%', label: 'Profile views in 30 days', client: '' },
    { value: '+78.2%', label: 'Profile visits in 30 days', client: '' },
    { value: '3K → 30K', label: 'Reach growth', client: '' },
    { value: '+103%', label: 'Reach in 30 days', client: '' },
  ],
  cases: {
    eyebrow: 'RESULTS THAT MATTER',
    heading: { lead: 'Case ', accent: 'Studies' },
    viewLabel: 'VIEW CASE',
    cards: [
      { slug: 'galeria-eldorado', client: 'Galería Eldorado', tag: 'Strategy · DE', headline: 'ESTRATEGIA\nQUE\nFUNCIONA.', stat: '318 Qualified Leads', img: 'sea-3' },
      { slug: null, client: 'Bloom Collective', tag: 'Content + Copy · EN', headline: 'FROM 0\nTO 16K\nREACH.', stat: '+86% Engagement', img: 'sea-4' },
      { slug: null, client: 'Maison Verde', tag: 'Management · NL', headline: 'CONTENT\nWITH\nPURPOSE.', stat: '1.8K Saves / Month', img: 'sea-2' },
    ],
  },
};
