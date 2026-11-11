// "Content we create" / "Every industry" showcase section — shared between
// the Services and Work pages.
// Serializable: ALL images are AssetKeys resolved via img() — in Strapi they
// are media fields, seeded from the bundled files (swap in the Media Library).

import type { AssetKey } from '@/content/assets';

export interface ShowcaseItem {
  label: string;
  /** Image shown while the term is hovered — AssetKey (or CMS URL after hydration), resolve via img(). */
  img: AssetKey | (string & {});
}

export interface ShowcaseText {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  sub: string;
}

export interface ShowcaseHalf {
  text: ShowcaseText;
  items: ShowcaseItem[];
  /** Founder photos cycled as the default background before hover. */
  defaultImages: AssetKey[];
}

export const showcase: { content: ShowcaseHalf; industry: ShowcaseHalf } = {
  content: {
    text: {
      eyebrow: 'CONTENT WE CREATE',
      titleLead: 'Content',
      titleAccent: 'we create.',
      sub: 'Each piece serves a purpose, designed to do more than look good.',
    },
    items: [
      { label: 'Informational Carousels', img: 'showcase-carousels' },
      { label: 'Product & Service Launches', img: 'showcase-launches' },
      { label: 'Holiday Campaigns', img: 'showcase-holiday' },
      { label: 'Presentation Decks', img: 'showcase-decks' },
      { label: 'Copywriting', img: 'showcase-copywriting' },
      { label: 'Reels & Short-form Videos', img: 'showcase-reels' },
    ],
    defaultImages: ['founders-sofa', 'linda-nancy-sofa'],
  },
  industry: {
    text: {
      eyebrow: "INDUSTRIES WE'VE WORKED IN",
      titleLead: 'Many',
      titleAccent: 'worlds.',
      sub: 'No two fields are alike. Neither is the work we make for them.',
    },
    items: [
      { label: 'Exhibit Design', img: 'showcase-exhibit' },
      { label: 'Intercultural Consulting', img: 'showcase-intercultural' },
      { label: 'Food & Hospitality', img: 'showcase-food' },
      { label: 'Life Coaching', img: 'showcase-coaching' },
      { label: 'Retail', img: 'showcase-retail' },
      { label: 'Education', img: 'showcase-education' },
      { label: 'Travel', img: 'industry-travel' },
      { label: 'Tech', img: 'ipad-zebra' },
    ],
    defaultImages: ['linda-nancy', 'founders'],
  },
};
