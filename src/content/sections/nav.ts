// Top navigation content — shared across all pages.
// Serializable: logo → AssetKey, links → href strings.

import type { AssetKey } from '@/content/assets';

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

export const nav: NavContent = {
  logo: { src: 'logo-340-white', alt: '340', ariaLabel: '340 Consultancy — Home' },
  leftLinks: [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/about-us' },
    { label: 'SERVICES', href: '/services' },
  ],
  rightLinks: [
    { label: 'OUR WORK', href: '/work' },
    { label: 'UP2DATE', href: '/about' },
  ],
  bookNow: { label: 'BOOK NOW', href: '/contact' },
  servicesLabel: 'SERVICES',
  serviceLinks: [
    { label: 'Social Media Strategy', href: '/services/strategy' },
    { label: 'Social Media Management', href: '/services/management' },
    { label: '1:1 Coaching', href: '/services/coaching' },
    { label: 'Content & Copywriting', href: '/services/content' },
    { label: 'Workshops', href: '/services/workshops' },
  ],
  closeLabel: 'CLOSE',
  mobileTagline: 'Social Media Consultancy',
  openMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
};
