// Services collection (CMS collection type `service`) + add-on groups and the
// static labels of the service-detail page.
// Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

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

export const services: Service[] = [
  {
    key: 'strategy',
    label: 'SOCIAL MEDIA\nSTRATEGY',
    eyebrow: 'SERVICE 01',
    img: 'our-services',
    tagline: 'Smart strategies and clear insights to help your business grow, reach the right audience and stand out.',
    price: 'Custom',
    priceNote: 'one-off · no min. term',
    body: "Everyone can post on social media. Not everyone grows from it. At 340, we take the time to truly understand your brand, your market, and your audience before anything goes live. Whether you're just getting started, or going through a rebrand, strategy is the foundation that sets you up for long-term success.",
    facts: [
      { label: 'PRICING', value: 'Upon request' },
      { label: 'FORMAT', value: 'Remote' },
      { label: 'MIN. TERM', value: 'None' },
      { label: 'LANGUAGES', value: 'EN · NL · DE · ES' },
    ],
    includes: [
      'Brand overview',
      'Market Analysis (Competitor and Inspiration Analysis)',
      'Target Audience Insights',
      'Sweetspot',
      'Biography optimization',
      'Content pillars, Ideas & Tone of voice',
      'KPIs & optimization roadmap',
      'Feed plan & post prototype per content pillar',
      'Action plan',
    ],
  },
  {
    key: 'management',
    label: 'SOCIAL MEDIA\nMANAGEMENT',
    eyebrow: 'SERVICE 02',
    img: 'ipad-zebra',
    tagline: 'Keeping your channels active, engaged and connecting with your audience, fully hands-off for you.',
    price: 'Custom',
    priceNote: 'tailored to your needs',
    body: "Social media takes time. Posting, engaging, replying, tracking results. It adds up fast. We take over the day-to-day management of your channels, fully adjusted to what you actually need. No rigid packages. We chat with you first, understand your goals and budget, then build something that fits.",
    facts: [
      { label: 'PRICING', value: 'Upon request' },
      { label: 'FORMAT', value: 'Remote' },
      { label: 'MIN. TERM', value: '3 months' },
      { label: 'LANGUAGES', value: 'EN · NL · DE · ES' },
    ],
    includes: [
      'Management of 1 platform',
      'Monthly visuals (standard is 8)',
      'Copywriting',
      '10 minutes of daily engagement',
      'Planning and scheduling',
      'Monthly performance reporting',
      'Optional monthly 30-min virtual meeting',
    ],
    includesNote: "We can customize the scope around your goals and budget. Book a free intro call and we'll figure out what fits you.",
  },
  {
    key: 'coaching',
    label: '1:1\nCOACHING',
    eyebrow: 'SERVICE 03',
    img: 'linda-nancy-sofa',
    tagline: 'Periodic sessions for updates, optimization and strategizing, so you feel confident and informed.',
    price: 'Upon request',
    priceNote: 'custom proposal',
    body: "You bring the questions. We help you find the answers. Whether it's a brainstorming session for a new campaign, guidance on your content approach, or practical advice on what to focus on next, we tailor each session to exactly where you are right now.",
    facts: [
      { label: 'PRICING', value: 'Upon request' },
      { label: 'FORMAT', value: 'Remote · 1:1' },
      { label: 'MIN. TERM', value: 'None' },
      { label: 'LANGUAGES', value: 'EN · NL · DE · ES' },
    ],
    includes: [
      'Strategic brainstorming sessions',
      'Platform tactics and solutions',
      'Social media audit & performance review',
      'Content direction & optimization advice',
      'Content reviews with actionable tips',
      'On-demand advice when you need it',
    ],
    ctaLabel: 'CONTACT US',
  },
  {
    key: 'content',
    label: 'CONTENT &\nCOPYWRITING',
    eyebrow: 'SERVICE 04',
    img: 'how-we-work',
    tagline: 'Words and visuals that tell your story, spark attention and drive action.',
    price: 'Upon request',
    priceNote: 'custom proposal',
    body: "Content & Copywriting is more than just visuals and captions, it's how your brand communicates, connects, and leaves a lasting impression. We create branded content that aligns with your identity, including presentation decks, documents, social posts, captions and other marketing materials. Available as standalone services or as add-ons to any management package.",
    facts: [
      { label: 'PRICING', value: 'Upon request' },
      { label: 'FORMAT', value: 'Remote' },
      { label: 'MIN. TERM', value: 'None' },
      { label: 'LANGUAGES', value: 'EN · NL · DE · ES' },
    ],
    includes: [
      'Individual social media posts (events, announcements)',
      'Copywriting for posts, presentations or promotional materials',
      'Professional company presentation design',
      'Branded documents',
    ],
    ctaLabel: 'CONTACT US',
  },
  {
    key: 'workshops',
    label: 'WORKSHOPS',
    eyebrow: 'SERVICE 05',
    img: 'founders-sofa',
    tagline: 'Workshops to level up your social media skills, we offer Canva, CapCut, Instagram and more.',
    price: 'Upon request',
    priceNote: 'custom proposal',
    body: "Whether you want to design stunning graphics in Canva, edit short-form video in CapCut, or master Instagram's algorithm or just need help setting up your account. Our workshops are built around what you or your team needs. Practical, interactive, and adapted to your level.",
    facts: [
      { label: 'PRICING', value: 'Upon request' },
      { label: 'FORMAT', value: 'Remote' },
      { label: 'MIN. TERM', value: 'None' },
      { label: 'LANGUAGES', value: 'EN' },
    ],
    includes: [
      'Canva workshop — design basics to advanced templates',
      'CapCut workshop — video editing',
      'Instagram workshop — features, algorithm & growth tactics',
      'Custom workshop — built around your needs',
      'Practical exercises & take-home resource packs',
      'Follow-up Q&A session included',
    ],
    ctaLabel: 'CONTACT US',
  },
];

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
export const managementAddOns: AddOnsContent = {
  intro: 'Everything below is optional and available as custom add-on services.',
  outro: 'Exact pricing is scoped in your intake call based on platforms, volume, and goals.',
  categories: [
    {
      category: 'CONTENT & CREATIVE',
      items: [
        { name: 'Copywriting', text: 'Platform-native captions, hooks, and copy written for you.' },
        { name: 'Content creation', text: 'Graphics, carousels, and visuals aligned to your brand.' },
        { name: 'Video editing', text: 'Short-form editing for Reels, TikTok, and Shorts.' },
      ],
    },
    {
      category: 'ENGAGEMENT & GROWTH',
      items: [
        { name: 'Community management', text: 'Extra engagement, the better your content performs. DMs, comments, and daily engagement handled for you.' },
        { name: 'Extra platforms', text: 'Extend management to a second or third platform.' },
        { name: 'Paid social / ads', text: 'Ad setup, copy, and performance management.' },
      ],
    },
    {
      category: 'SUPPORT & REPORTING',
      items: [
        { name: '24/7 emergency support', text: 'On-call response for urgent brand moments or crises.' },
        { name: 'Extra check-ins', text: 'Weekly or bi-weekly calls on top of your monthly base.' },
      ],
    },
    {
      category: 'ONE-TIME SERVICES',
      items: [
        { name: 'One-time strategy', text: 'A one-time social media strategy before starting management.' },
        { name: 'Social media audit', text: 'Full review of your current presence, gaps, and opportunities.' },
        { name: 'Profile optimisation', text: 'Bio, highlights, links, and first-impression polish across platforms.' },
        { name: 'Competitor analysis', text: 'In-depth report on what your competitors are doing.' },
      ],
    },
  ],
};

/** Add-ons shown on the Social Media Strategy service page. */
export const strategyAddOns: AddOnsContent = {
  intro: 'Everything below is optional and available as custom add-on services.',
  outro: 'Exact pricing is scoped with you during the intake call.',
  categories: [
    {
      category: 'CREATIVE',
      items: [
        { name: 'Extra post prototypes', text: 'Want your strategy to feel more tangible? Get additional post-ready content concepts.' },
        { name: 'SEO keywords & hashtags', text: 'Receive SEO-optimized keywords and hashtags to improve discoverability across social platforms.' },
        { name: 'Prototype captions', text: 'Ready-to-use captions for your content prototypes.' },
      ],
    },
    {
      category: 'STRATEGY',
      items: [
        { name: 'Social media audit', text: 'A full review of your current social presence to identify strengths, gaps, opportunities, and your baseline.' },
        { name: 'Paid ad strategy', text: 'Strategic recommendations for paid social advertising.' },
        { name: 'Community management strategy', text: 'Tactics for growing and engaging your online community.' },
        { name: 'Geotargeting strategy', text: 'Recommendations for reaching local audiences through organic and paid tactics.' },
      ],
    },
    {
      category: 'RESEARCH & INSIGHTS',
      items: [
        { name: 'Competitor analysis', text: "An in-depth review of your competitors' social media presence." },
        { name: 'Inspiration analysis', text: "A breakdown of an inspirational brand's social media strategy and content." },
        { name: 'Additional profile optimization', text: 'Biography and profile optimization for any extra social platform.' },
      ],
    },
  ],
};

/** Static labels on the service-detail page (part of a global/shared type). */
export const serviceDetailLabels = {
  addOns: {
    eyebrow: 'PERSONALIZE IT',
    heading: { lead: 'Add-', accent: 'ons.' },
  },
  serviceEyebrow: 'THE SERVICE',
  pricingLabel: 'PRICING',
  includesLabel: "WHAT'S INCLUDED",
  defaultCtaLabel: 'BOOK A FREE CALL',
  availableInPrefix: 'Available in',
  breadcrumbLabel: 'Services',
  allServicesLabel: 'See all services',
  itemsLabel: 'items',
  others: {
    eyebrow: 'MORE FROM 340',
    heading: { lead: 'Other ', accent: 'services' },
  },
};
