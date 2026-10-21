// Services collection (CMS collection type `service`) + add-on groups and the
// static labels of the service-detail page.
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';
import type { ServiceDetailLabels } from '@/content/types';

export interface ServiceFact {
  label: string;
  value: string;
}

export interface Service {
  key: string;
  /** Multi-line label (rendered with white-space: pre-line) — keep the \n. */
  label: string;
  eyebrow: string;
  img: AssetKey;
  tagline: string;
  price: string;
  priceNote?: string;
  body: string;
  facts: ServiceFact[];
  includes?: string[];
  includesNote?: string;
  ctaLabel?: string;
}

export const services = generated.services as Service[];

/* ── Add-ons — grouped into categories, per the client handover. Rendered on
      the Strategy and Management service pages. ── */

export interface AddOnItem {
  name: string;
  text: string;
}

export interface AddOnCategory {
  category: string;
  items: AddOnItem[];
}

export interface AddOnsContent {
  intro: string;
  outro: string;
  categories: AddOnCategory[];
}

/** Add-ons shown on the Social Media Management service page. */
export const managementAddOns = generated.managementAddOns as AddOnsContent;

/** Add-ons shown on the Social Media Strategy service page. */
export const strategyAddOns = generated.strategyAddOns as AddOnsContent;

/** Static labels on the service-detail page (part of a global/shared type). */
export const serviceDetailLabels = generated.serviceDetailLabels as ServiceDetailLabels;
