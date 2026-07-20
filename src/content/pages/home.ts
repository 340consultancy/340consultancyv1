// Home page (single type). Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

export interface HomeServiceLink {
  name: string;
  slug: string;
}

export interface HomeServiceRow {
  num: string;
  name: string;
  price: string;
  tag: string;
  href: string;
}

export interface HomeApproachCard {
  num: string;
  title: string;
  body: string;
}

export interface HomeLanguage {
  code: string;
  label: string;
}

export interface HomeCaseCard {
  client: string;
  tag: string;
  /** Multi-line headline (rendered with white-space: pre-line) — keep the \n. */
  headline: string;
  stat: string;
  img: AssetKey;
  slug: string;
}

export interface HomeContent {
  hero: {
    image: AssetKey;
    eyebrow: string;
    headline: { line1: string; line2Lead: string; accent: string };
    services: HomeServiceLink[];
    scrollLabel: string;
  };
  way: {
    image: AssetKey;
    imagePosition: string;
    eyebrow: string;
    headline: { line1: string; line2: string };
    paragraphs: string[];
    signoff: string;
  };
  servicesPanel: {
    image: AssetKey;
    imagePosition: string;
    eyebrow: string;
    headline: { line1: string; line2: string };
    rows: HomeServiceRow[];
    cta: { label: string; href: string };
  };
  foundersPanel: {
    image: AssetKey;
    imagePosition: string;
    eyebrow: string;
    headline: { line1: string; line2: string };
    lede: string;
    body: string;
    note: string;
    cta: { label: string; href: string };
  };
  approachPanel: {
    image: AssetKey;
    imagePosition: string;
    eyebrow: string;
    headline: { line1: string; line2: string };
    cards: HomeApproachCard[];
    languages: { label: string; items: HomeLanguage[] };
  };
  cases: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    seeAllLabel: string;
    mobileCtaLabel: string;
    cards: HomeCaseCard[];
  };
  quickCheck: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    items: string[];
  };
  /** The animated phone mock next to the quick check (images + all its copy). */
  phoneMock: {
    postImage: AssetKey;
    strategyImage: AssetKey;
    handle: string;
    brandName: string;
    brandTagline: string;
    keywords: string;
    missionTitle: string;
    missionText: string;
    strategyLabel: string;
    performanceTitle: string;
    metrics: { label: string; value: string }[];
    postHeadline: string;
    postHeadlineAccent: string;
    postSubtext: string;
    captionText: string;
    moreLabel: string;
    viewCommentsPrefix: string;
    viewCommentsSuffix: string;
    commentUser: string;
    commentText: string;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    floatingLabels: string[];
  };
}

export const home: HomeContent = {
  hero: {
    image: 'founders-sofa',
    eyebrow: 'Be the brand people remember.',
    headline: { line1: 'SOCIAL MEDIA THAT', line2Lead: 'ACTUALLY ', accent: 'WORKS' },
    services: [
      { name: 'Social Media Strategy', slug: 'strategy' },
      { name: 'Social Media Management', slug: 'management' },
      { name: '1:1 Coaching', slug: 'coaching' },
      { name: 'Content & Copywriting', slug: 'content' },
      { name: 'Workshops', slug: 'workshops' },
    ],
    scrollLabel: 'SCROLL',
  },
  way: {
    image: 'ipad-zebra',
    imagePosition: '50% 40%',
    eyebrow: 'THE 340 WAY',
    headline: { line1: '340 knows', line2: 'the way.' },
    paragraphs: [
      "Since day one we've helped brands stop guessing and start growing. We're the boutique agency for founders and businesses who don't have the time to figure out every platform, the knowledge to know what actually works, or the energy to do it all alone.",
      "Ready to stop guessing? Let's talk.",
    ],
    signoff: 'Your go-to agency for all things social, strategy and content.',
  },
  servicesPanel: {
    image: 'our-services',
    imagePosition: '50% 55%',
    eyebrow: 'INVEST IN YOUR GROWTH',
    headline: { line1: 'Our', line2: 'Services' },
    rows: [
      { num: '01', name: 'STRATEGY', price: 'From €750', tag: 'One-off', href: '/services#services-bento' },
      { num: '02', name: 'MANAGEMENT', price: 'From €800', tag: 'Min. 3 months', href: '/services#services-bento' },
      { num: '03', name: '1:1 COACHING', price: 'Custom', tag: 'Flexible', href: '/services#services-bento' },
      { num: '04', name: 'CONTENT & COPY', price: 'Custom', tag: 'Flexible', href: '/services#services-bento' },
    ],
    cta: { label: 'VIEW ALL SERVICES & PRICING', href: '/services' },
  },
  foundersPanel: {
    image: 'linda-nancy-sofa',
    imagePosition: '50% 20%',
    eyebrow: 'MEET THE FOUNDERS',
    headline: { line1: 'Nancy &', line2: 'Linda' },
    lede: 'Two best friends who turned a missing room number into a social media consultancy.',
    body: "Nancy brings media strategy and operational precision. Linda brings bold creative ideas and a global perspective. Between them, they have worked across the Netherlands, the US, Germany, and Spain, giving them a perspective that's genuinely global. Together they deliver what big agencies can't: personal, strategic, results-driven social media, built for your business.",
    note: 'Co-founders · EN · NL · DE · ES',
    cta: { label: 'MEET THE TEAM', href: '/about-us' },
  },
  approachPanel: {
    image: 'how-we-work',
    imagePosition: '50% 35%',
    eyebrow: 'OUR APPROACH',
    headline: { line1: 'How we', line2: 'Work.' },
    cards: [
      {
        num: '01',
        title: 'Boutique by design',
        body: 'Small client roster on purpose. Every brand gets our full attention, not a junior account manager and a template.',
      },
      {
        num: '02',
        title: 'Strategy first, always',
        body: 'We never start creating before we understand your brand. Every post is rooted in a plan built specifically for you.',
      },
      {
        num: '03',
        title: 'Multilingual reach',
        body: 'EN, NL, DE and ES. Your audience speaks different languages, so does your content.',
      },
      {
        num: '04',
        title: 'Honest Transparency',
        body: "We work remotely and flexibly, with clear and honest communication throughout. You always know what we're doing and why.",
      },
    ],
    languages: {
      label: 'WE WORK IN\n4 LANGUAGES',
      items: [
        { code: 'EN', label: 'English' },
        { code: 'NL', label: 'Nederlands' },
        { code: 'DE', label: 'Deutsch' },
        { code: 'ES', label: 'Español' },
      ],
    },
  },
  cases: {
    eyebrow: 'RESULTS THAT MATTER',
    headline: { line1: 'Case', line2: 'Studies' },
    seeAllLabel: 'SEE ALL WORK',
    mobileCtaLabel: 'SEE ALL CASE STUDIES',
    cards: [
      {
        client: 'Studio Displays',
        tag: 'Strategy + Management · US',
        headline: 'REACH.\nENGAGE.\nGROW.',
        stat: '+420% Reach in 90 days',
        img: 'sea-1',
        slug: 'studio-displays',
      },
      {
        client: 'AlbaNova',
        tag: 'Strategy + Content · ES, DE',
        headline: 'FROM\nIDEA TO\nIDENTITY.',
        stat: '2 Accounts Launched',
        img: 'sea-2',
        slug: 'albanova',
      },
      {
        client: 'Galería Eldorado',
        tag: 'Strategy · ES',
        headline: 'ESTRATEGIA\nQUE\nFUNCIONA.',
        stat: 'Christmas Campaign',
        img: 'sea-3',
        slug: 'galeria-eldorado',
      },
    ],
  },
  quickCheck: {
    eyebrow: 'IS THIS FOR ME?',
    headline: { line1: "You're in the", line2: 'right place if...' },
    items: [
      "You're tired of posting without direction and seeing little return.",
      'You need a clear strategy before investing more time or budget.',
      'You want experts who understand your goals, not generic templates.',
      "You're ready to hand off your social media to someone you trust.",
    ],
  },
  phoneMock: {
    postImage: 'cta-women',
    strategyImage: 'sea-3',
    handle: '340consultancy',
    brandName: '340',
    brandTagline: 'Social Media Strategy\nThat Drives Growth',
    keywords: 'Strategy\nContent\nGrowth\nImpact',
    missionTitle: 'our\nmission',
    missionText: 'We help brands grow through strategies, data driven decisions, creative ideas, and focus on results that matter.',
    strategyLabel: 'Social\nMedia\nStrategy',
    performanceTitle: 'Performance\nOverview',
    metrics: [
      { label: 'Engagement rate', value: '5%' },
      { label: 'Impressions', value: '+53%' },
      { label: 'Clicks', value: '4x' },
      { label: 'Reach', value: '+103%' },
      { label: 'Views', value: '+84.5%' },
      { label: 'Profile visits', value: '+78.2%' },
    ],
    postHeadline: 'Strategy.\nContent.\nGrowth.\n',
    postHeadlineAccent: 'Impact.',
    postSubtext: 'Smart Strategies. Stronger Brands.\nReal Results.',
    captionText: 'We turn ideas into impact.\nStrategy. Content. Growth. Impact.',
    moreLabel: '… more',
    viewCommentsPrefix: 'View all',
    viewCommentsSuffix: 'comments',
    commentUser: 'brand.collective',
    commentText: 'Love this! 🔥',
    likes: 12400,
    comments: 486,
    shares: 342,
    saves: 1800,
    floatingLabels: ['+420% Reach', '318 qualif. Leads', '+86% Engagement', '1.8K Saves'],
  },
};
