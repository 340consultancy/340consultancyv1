// Contact & FAQ page (single type). Serializable: images → AssetKey,
// icons → IconName, text verbatim.

import type { AssetKey } from '@/content/assets';
import type { IconName } from '@/content/icons';
import { generated } from '@/content/generated';

export interface ContactLink {
  icon: IconName;
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqColumn {
  eyebrow: string;
  headline: { line1: string; line2: string };
  items: FaqItem[];
}

export interface ContactContent {
  hero: {
    image: AssetKey;
    imagePosition: string;
    eyebrow: string;
    headline: string;
    tagline: string;
    scrollLabel: string;
  };
  form: {
    photo: AssetKey;
    photoAlt: string;
    eyebrow: string;
    headline: { line1: string; line2: string };
    intro: string;
    labels: {
      name: string;
      email: string;
      instagram: string;
      instagramOptional: string;
      interest: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      instagram: string;
      interest: string;
      message: string;
    };
    serviceOptions: string[];
    newsletter: { prefix: string; highlight: string; suffix: string };
    submitLabel: string;
    successToast: string;
    errorToast: string;
  };
  links: ContactLink[];
  faq: FaqColumn;
  pricingFaq: FaqColumn;
}

export const contact = generated.contact as ContactContent;
