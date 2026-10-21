// ─────────────────────────────────────────────────────────────────────────────
// Asset registry — single source of truth for every image / media reference.
//
// Components reference assets by a stable kebab-case key via `img("key")`.
// Swapping an image = change exactly one line here. CMS migration maps each
// key → a media field.
//
// NOTE: keys are serializable strings. Content modules under src/content/**
// store the KEY (e.g. "founders-sofa"), never the imported URL.
// ─────────────────────────────────────────────────────────────────────────────

import contactSofa from '@/assets/contact-sofa.jpg';
import ctaWomen from '@/assets/cta-women.jpg';
import foundersSofa from '@/assets/founders-sofa.jpg';
import founders from '@/assets/founders.jpg';
import howWeWork from '@/assets/how-we-work.jpg';
import ipadZebra from '@/assets/ipad-zebra.jpg';
import lindaNancySofa from '@/assets/linda-nancy-sofa.jpg';
import lindaNancy from '@/assets/linda-nancy.jpg';
import linda from '@/assets/linda.jpg';
import logo340White from '@/assets/logo-340-white.png';
import logo340 from '@/assets/logo-340.png';
import nancyWide from '@/assets/nancy-wide.png';
import ourServices from '@/assets/our-services.jpg';
import sea1 from '@/assets/sea-1.jpg';
import sea2 from '@/assets/sea-2.jpg';
import sea3 from '@/assets/sea-3.jpg';
import sea4 from '@/assets/sea-4.jpg';
import servicesHero from '@/assets/services-hero.jpg';
import showcaseCarousels from '@/assets/showcase-carousels.jpg';
import showcaseCoaching from '@/assets/showcase-coaching.jpg';
import showcaseCopywriting from '@/assets/showcase-copywriting.jpg';
import showcaseDecks from '@/assets/showcase-decks.jpg';
import showcaseEducation from '@/assets/showcase-education.jpg';
import showcaseExhibit from '@/assets/showcase-exhibit.jpg';
import showcaseFood from '@/assets/showcase-food.jpg';
import showcaseHoliday from '@/assets/showcase-holiday.jpg';
import showcaseIntercultural from '@/assets/showcase-intercultural.jpg';
import showcaseLaunches from '@/assets/showcase-launches.jpg';
import showcaseReels from '@/assets/showcase-reels.jpg';
import showcaseRetail from '@/assets/showcase-retail.jpg';
import starterguide from '@/assets/starterguide.png';
import up2date from '@/assets/up2date.png';
import workHero from '@/assets/work-hero.jpg';

export const assets = {
  'contact-sofa': contactSofa,
  'cta-women': ctaWomen,
  'founders-sofa': foundersSofa,
  founders: founders,
  'how-we-work': howWeWork,
  'ipad-zebra': ipadZebra,
  'linda-nancy-sofa': lindaNancySofa,
  'linda-nancy': lindaNancy,
  linda: linda,
  'logo-340-white': logo340White,
  'logo-340': logo340,
  'nancy-wide': nancyWide,
  'our-services': ourServices,
  'sea-1': sea1,
  'sea-2': sea2,
  'sea-3': sea3,
  'sea-4': sea4,
  'services-hero': servicesHero,
  'showcase-carousels': showcaseCarousels,
  'showcase-coaching': showcaseCoaching,
  'showcase-copywriting': showcaseCopywriting,
  'showcase-decks': showcaseDecks,
  'showcase-education': showcaseEducation,
  'showcase-exhibit': showcaseExhibit,
  'showcase-food': showcaseFood,
  'showcase-holiday': showcaseHoliday,
  'showcase-intercultural': showcaseIntercultural,
  'showcase-launches': showcaseLaunches,
  'showcase-reels': showcaseReels,
  'showcase-retail': showcaseRetail,
  starterguide: starterguide,
  up2date: up2date,
  'work-hero': workHero,
} as const;

export type AssetKey = keyof typeof assets;

/**
 * Resolve a stable asset key to its bundled URL.
 *
 * Content image fields hold Sanity CDN URLs, which pass through unchanged;
 * registered keys still resolve to bundled files.
 * `string & {}` keeps AssetKey autocomplete while allowing URLs.
 */
export const img = (key: AssetKey | (string & {})): string =>
  (assets as Record<string, string>)[key] ?? key;
