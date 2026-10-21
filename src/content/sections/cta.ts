// "Ready to level up?" call-to-action section (YesCTA) — shared.

import type { SplitHeadline } from '@/content/types';
import { generated } from '@/content/generated';

export interface CtaContent {
  eyebrow: string;
  headline: SplitHeadline;
  yesLabel: string;
  goLabel: string;
  nameLabel: string;
  namePlaceholder: string;
}

export const cta = generated.cta as CtaContent;
