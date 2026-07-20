// About Us page (single type). Serializable: images → AssetKey,
// icons → IconName, text verbatim.

import type { AssetKey } from '@/content/assets';
import type { IconName } from '@/content/icons';

export interface Founder {
  img: AssetKey;
  /** object-position for the desktop full-bleed layout. */
  imgPosDesktop: string;
  /** object-position for the stacked mobile layout. */
  imgPosMobile: string;
  name: string;
  surname: string;
  role: string;
  bio: string;
  langs: string[];
}

export interface ValueItem {
  icon: IconName;
  title: string;
  desc: string;
}

export interface AboutUsContent {
  hero: {
    image: AssetKey;
    imageAlt: string;
    imagePosition: string;
    headline: { lead: string; accent: string };
    tagline: string;
    scrollLabel: string;
  };
  story: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    paragraphs: string[];
    signoff: string;
  };
  founders: {
    eyebrow: string;
    linda: Founder;
    nancy: Founder;
    /** Quote panel between the two founders — solid line + outlined line. */
    quote: {
      /** Desktop layout, one entry per line. */
      solidLines: string[];
      outlineLines: string[];
      /** Mobile layout, joined into a single running sentence. */
      solid: string;
      outline: string;
    };
  };
  values: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    items: ValueItem[];
  };
}

export const aboutUs: AboutUsContent = {
  hero: {
    image: 'founders',
    imageAlt: 'Linda & Nancy — 340 Consultancy',
    imagePosition: '50% 30%',
    headline: { lead: 'WE ARE ', accent: '340' },
    tagline: 'Not your average agency.',
    scrollLabel: 'SCROLL',
  },
  story: {
    eyebrow: 'OUR STORY',
    headline: { line1: 'More than', line2: 'just a number' },
    paragraphs: [
      '340 Consultancy began in 2025 with two best friends, a shared wall and a big idea. Linda was living in room 339. Nancy was in 341. And somewhere between late night study sessions and endless conversations about brands and social media, they realized something was missing. Room 340.',
      'That gap became a name. And that name became a vision.',
      "What started in two tiny student rooms has grown into something we never could have imagined: a social media agency working with clients across 3 continents. Built on bold ideas. Driven by a commitment to showing up for every client like it's our own brand on the line.",
      'Social media that actually works.',
    ],
    signoff: 'Linda & Nancy x',
  },
  founders: {
    eyebrow: 'CO-FOUNDER · 340 CONSULTANCY',
    linda: {
      img: 'linda',
      imgPosDesktop: '74% 30%',
      imgPosMobile: '72% 52%',
      name: 'Linda',
      surname: 'Müller-Veerse.',
      role: 'Co-Founder / Creative Director',
      bio: "Linda is the creative mind behind 340. She's the one dreaming up concepts, building the visuals and making sure every brand we work with has a look and feel that actually means something. Having lived and worked across multiple countries, she brings a perspective to creativity that you can't learn in a classroom.",
      langs: ['DE', 'ES', 'EN', 'NL'],
    },
    nancy: {
      img: 'nancy-wide',
      imgPosDesktop: '35% 22%',
      imgPosMobile: '35% 22%',
      name: 'Nancy',
      surname: 'Boerjan.',
      role: 'Co-Founder / Organisational Director',
      bio: "Nancy is the strategic mind behind 340. She's the one making sure everything runs smoothly: the plans, the clients, the details that keep our business moving. With experience across the Netherlands and the US, she knows how to build strategies that actually make sense, not just on paper but in practice.",
      langs: ['EN', 'NL'],
    },
    quote: {
      solidLines: ['WHAT BEGAN', 'AS', 'FRIENDSHIP'],
      outlineLines: ['BECAME', 'A JOURNEY', 'OF BIG DREAMS.'],
      solid: 'What began as friendship ',
      outline: 'became a journey of big dreams.',
    },
  },
  values: {
    eyebrow: 'WHAT WE STAND FOR',
    headline: { line1: 'Our', line2: 'Values.' },
    items: [
      {
        icon: 'target',
        title: 'INNOVATION',
        desc: 'We stay ahead of social media trends, providing creative, cutting-edge solutions.',
      },
      {
        icon: 'fingerprint',
        title: 'PASSION',
        desc: 'We put heart into every story, strategy and solution we create.',
      },
      {
        icon: 'eye',
        title: 'EMPOWERMENT',
        desc: 'We aim to educate and equip our clients with the knowledge and tools they need to thrive online.',
      },
    ],
  },
};
