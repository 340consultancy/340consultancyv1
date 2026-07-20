// "Ready to level up?" call-to-action section (YesCTA) — shared.

import type { SplitHeadline } from '@/content/types';

export interface CtaContent {
  eyebrow: string;
  headline: SplitHeadline;
  yesLabel: string;
  goLabel: string;
  nameLabel: string;
  namePlaceholder: string;
}

export const cta: CtaContent = {
  eyebrow: 'NEXT STEP',
  headline: { line1: 'Ready to', line2: 'level up?' },
  yesLabel: 'YES',
  goLabel: "LET'S GO →",
  nameLabel: 'Your name is...?',
  namePlaceholder: 'Name',
};
