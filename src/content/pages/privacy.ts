// Privacy & Imprint page (single type). Content is serializable: rich text is
// modelled as typed blocks (paragraph / list / inline-link) rendered by the page.

import { generated } from '@/content/generated';

export interface PrivacyLink {
  text: string;
  href: string;
}

/** A paragraph: either plain `text`, or `lead` + inline `link` + optional `tail`. `mt` = top spacing. */
export interface PrivacyParagraph {
  kind: 'p';
  text?: string;
  lead?: string;
  link?: PrivacyLink;
  tail?: string;
  mt?: string;
}

export interface PrivacyList {
  kind: 'ul';
  items: string[];
}

export type PrivacyBlock = PrivacyParagraph | PrivacyList;

export interface PrivacySection {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyContent {
  backLabel: string;
  eyebrow: string;
  heading: { lead: string; accent: string };
  sections: PrivacySection[];
  lastUpdated: string;
}

export const privacy = generated.privacy as PrivacyContent;
