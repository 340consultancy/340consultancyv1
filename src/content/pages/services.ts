// Services overview page (single type). Serializable: text verbatim. The
// service entries themselves (title, tagline, photo, includes) live in
// src/content/collections/services.ts.

export interface ProcessStep {
  phase: string;
  title: string;
  desc: string;
}

/** One "Where are you right now?" answer and the services it points to. */
export interface ServiceSituation {
  label: string;
  /** Service keys (collection `service`.key), in recommendation order. */
  services: string[];
  reco: string;
}

export interface ServicesPageContent {
  /** Green hero = the situation selector. */
  hero: {
    /** Multi-line heading (rendered with white-space: pre-line) — keep the \n. */
    heading: string;
    question: string;
    showAllLabel: string;
    /** Line in the pink band while no situation is picked. */
    defaultReco: string;
    situations: ServiceSituation[];
  };
  grid: {
    matchBadge: string;
    cardCtaLabel: string;
    /** Last card of the grid, always shown: points undecided visitors to a call. */
    helpCard: { heading: string; text: string; ctaLabel: string };
  };
  /** "How it works" steps shared by the services overview and detail pages. */
  process: {
    eyebrow: string;
    headline: { lead: string; accent: string };
    sub: string;
    steps: ProcessStep[];
    hashtag: string;
  };
}

export const servicesPage: ServicesPageContent = {
  hero: {
    heading: 'Pick your\ngame plan',
    question: 'Where are you right now?',
    showAllLabel: 'Show all services',
    defaultReco: 'Not sure where to start? You don’t need to be. Tell us where you are and we’ll take it from there.',
    situations: [
      { label: 'I’m starting from scratch', services: ['strategy'], reco: 'Start with a strategy. It sets the foundation everything else builds on.' },
      { label: 'I post, but nothing grows', services: ['strategy', 'coaching'], reco: 'Step back with a strategy, then get coached on what to change week to week.' },
      { label: 'I have no time to post', services: ['management'], reco: 'Hand us the day-to-day. We run your channels so you can run your business.' },
      { label: 'I want to do it myself', services: ['workshops', 'coaching'], reco: 'Learn the tools in a workshop, then keep sharpening your approach with 1:1 coaching.' },
      { label: 'I need content, fast', services: ['content'], reco: 'Get posts, copy and decks made for you, as a one-off or on top of a package.' },
    ],
  },
  grid: {
    matchBadge: 'Fits you',
    cardCtaLabel: 'See what’s included',
    helpCard: {
      heading: 'Not sure\nyet?',
      text: 'Book a free intro call and we’ll figure out what fits you.',
      ctaLabel: 'Book a free call',
    },
  },
  process: {
    eyebrow: 'THE PROCESS',
    headline: { lead: 'HOW IT ', accent: 'WORKS' },
    sub: 'Four steps from first conversation to measurable growth.',
    steps: [
      { phase: '1', title: 'FREE INTRO CALL', desc: 'We get to know your business, goals and challenges. No commitment, just clarity.' },
      { phase: '2', title: 'ONBOARDING', desc: 'We share an onboarding questionnaire, gather your brand assets, and set the foundation.' },
      { phase: '3', title: 'EXECUTION', desc: 'Strategy goes live. Content is created, published, and managed based on what your audience needs.' },
      { phase: '4', title: 'REVIEW & OPTIMIZE', desc: 'Regular check-ins, performance tracking and transparent reporting. We optimize as we go.' },
    ],
    hashtag: '#340consultancy',
  },
};
