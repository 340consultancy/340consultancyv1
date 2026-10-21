// Top navigation content — shared across all pages.
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavContent {
  logo: { src: AssetKey; alt: string; ariaLabel: string };
  leftLinks: NavLinkItem[];
  rightLinks: NavLinkItem[];
  bookNow: { label: string; href: string };
  /** Label of the SERVICES entry that opens the services submenu. */
  servicesLabel: string;
  /** Services submenu (each links to its own service detail page). */
  serviceLinks: NavLinkItem[];
  /** Mobile menu. */
  closeLabel: string;
  mobileTagline: string;
  /** Accessibility labels (screen readers). */
  openMenuLabel: string;
  closeMenuLabel: string;
}

export const nav = generated.nav as NavContent;
