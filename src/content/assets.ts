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

// Case-study photos (Pexels, free licence) — placeholders until the clients' own.
import caseAnCircle from '@/assets/case-an-circle.jpg';
import caseAnConversation from '@/assets/case-an-conversation.jpg';
import caseAnNotebooks from '@/assets/case-an-notebooks.jpg';
import caseAnSketch from '@/assets/case-an-sketch.jpg';
import caseGeBeans from '@/assets/case-ge-beans.jpg';
import caseGeColombia from '@/assets/case-ge-colombia.jpg';
import caseGeInterior from '@/assets/case-ge-interior.jpg';
import caseGeJars from '@/assets/case-ge-jars.jpg';
import caseSdHall from '@/assets/case-sd-hall.jpg';
import caseSdInstall from '@/assets/case-sd-install.jpg';
import caseSdStands from '@/assets/case-sd-stands.jpg';
import caseSdWorkshop from '@/assets/case-sd-workshop.jpg';
import contactSofa from '@/assets/contact-sofa.jpg';
import ctaWomen from '@/assets/cta-women.jpg';
import foundersSofa from '@/assets/founders-sofa.jpg';
import founders from '@/assets/founders.jpg';
import howWeWork from '@/assets/how-we-work.jpg';
import industryTravel from '@/assets/industry-travel.jpg';
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
import albanova1 from '@/assets/albanova-1.jpg';
import albanova2 from '@/assets/albanova-2.jpg';
import albanova3 from '@/assets/albanova-3.jpg';
import albanova4 from '@/assets/albanova-4.jpg';
import dorado1 from '@/assets/dorado-1.jpg';
import dorado2 from '@/assets/dorado-2.jpg';
import dorado3 from '@/assets/dorado-3.jpg';
import dorado4 from '@/assets/dorado-4.jpg';
import blogLinkedin from '@/assets/blog-linkedin.jpg';
import blogContentPlanner from '@/assets/blog-content-planner.jpg';
import blogAudit from '@/assets/blog-audit.jpg';
import blogGeneralLinkedin from '@/assets/blog-general-linkedin.jpg';
import blogGeneralContentPlanner from '@/assets/blog-general-content-planner.jpg';
import blogGeneralAudit from '@/assets/blog-general-audit.jpg';

export const assets = {
  'albanova-1': albanova1,
  'albanova-2': albanova2,
  'albanova-3': albanova3,
  'albanova-4': albanova4,
  'dorado-1': dorado1,
  'dorado-2': dorado2,
  'dorado-3': dorado3,
  'dorado-4': dorado4,
  'blog-linkedin': blogLinkedin,
  'blog-content-planner': blogContentPlanner,
  'blog-audit': blogAudit,
  'blog-general-linkedin': blogGeneralLinkedin,
  'blog-general-content-planner': blogGeneralContentPlanner,
  'blog-general-audit': blogGeneralAudit,
  'case-an-circle': caseAnCircle,
  'case-an-conversation': caseAnConversation,
  'case-an-notebooks': caseAnNotebooks,
  'case-an-sketch': caseAnSketch,
  'case-ge-beans': caseGeBeans,
  'case-ge-colombia': caseGeColombia,
  'case-ge-interior': caseGeInterior,
  'case-ge-jars': caseGeJars,
  'case-sd-hall': caseSdHall,
  'case-sd-install': caseSdInstall,
  'case-sd-stands': caseSdStands,
  'case-sd-workshop': caseSdWorkshop,
  'contact-sofa': contactSofa,
  'cta-women': ctaWomen,
  'founders-sofa': foundersSofa,
  founders: founders,
  'how-we-work': howWeWork,
  'industry-travel': industryTravel,
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
 * After CMS hydration (src/lib/cmsContent.ts) image fields may hold a full
 * media URL from Strapi instead of a registered key — those pass through
 * unchanged. `string & {}` keeps AssetKey autocomplete while allowing URLs.
 */
export const img = (key: AssetKey | (string & {})): string =>
  (assets as Record<string, string>)[key] ?? key;
