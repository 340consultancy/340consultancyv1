// Footer section content — shared across all pages.
// Serializable: images → AssetKey, icons → IconName, links → href strings.

import type { IconName } from '@/content/icons';
import type { AssetKey } from '@/content/assets';

export interface FooterNavItem {
  label: string;
  to: string;
}

export interface FooterSocialItem {
  icon: IconName;
  href: string;
  label: string;
}

export interface FooterContent {
  logo: { src: AssetKey; alt: string };
  /** Wordmark lockup beside the logo: reads "340 knows the way." — `accent` is the coloured span. */
  lockup: { line1: string; line2Lead: string; accent: string };
  quote: string;
  hashtag: string;
  social: FooterSocialItem[];
  nav: FooterNavItem[];
  backToTopLabel: string;
  copyright: string;
  privacy: { label: string; to: string };
  tagline: string;
}

export const footer: FooterContent = {
  logo: { src: 'logo-340', alt: '340 Consultancy' },
  lockup: { line1: 'Knows', line2Lead: 'the ', accent: 'way.' },
  quote: '"Aesthetic posts don\'t build brands, strategy does."',
  hashtag: '#340consultancy',
  social: [
    { icon: 'instagram', href: 'https://instagram.com/340consultancy', label: 'Instagram' },
    { icon: 'linkedin', href: 'https://www.linkedin.com/company/340consultancy/', label: 'LinkedIn' },
    { icon: 'mail', href: 'mailto:info@340consultancy.com', label: 'Email us' },
  ],
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Services', to: '/services' },
    { label: 'Our Work', to: '/work' },
    { label: 'UP2DATE', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  backToTopLabel: 'BACK TO TOP',
  copyright: '© 2026 340 CONSULTANCY V.O.F. · KvK 96558075',
  privacy: { label: 'Privacy & Imprint', to: '/privacy' },
  tagline: 'Be the brand people remember.',
};
