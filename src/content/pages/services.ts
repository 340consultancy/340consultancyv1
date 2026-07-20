// Services overview page (single type). Serializable: images → AssetKey,
// text verbatim. The service entries themselves live in
// src/content/collections/services.ts.

import type { AssetKey } from '@/content/assets';

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

export const servicesPage: ServicesPageContent = {
  hero: {
    headline: { lead: 'OUR ', accent: 'SERVICES' },
    tagline: 'Pick your game plan',
    image: 'services-hero',
    imagePosition: '50% 20%',
    scrollLabel: 'SCROLL',
  },
  bento: {
    eyebrow: 'WHAT WE DO',
    heading: 'Our Services',
    hint: 'Click any service for details & pricing',
    viewDetailsLabel: 'VIEW DETAILS',
    workshopTools: ['Canva', 'CapCut', 'Instagram'],
    workshopNote: 'Remote',
  },
  process: {
    eyebrow: 'THE PROCESS',
    headline: { lead: 'HOW IT ', accent: 'WORKS' },
    sub: 'Four steps from first conversation to measurable growth.',
    steps: [
      { phase: '1', title: 'FREE INTRO CALL', desc: 'We get to know your business, goals and challenges. No commitment, just clarity.' },
      { phase: '2', title: 'ONBOARDING', desc: 'We share an onboarding questionnaire, gather your brand assets, and set the foundation.' },
      { phase: '3', title: 'EXECUTION', desc: 'Strategy goes live. Content is created, published, and managed based on what your audience needs.' },
      { phase: '4', title: 'REVIEW & OPTIMIZE', desc: 'Regular check-ins, performance tracking and transparent reporting. We optimize as we go.' },
    ],
    hashtag: '#340consultancy',
  },
};
