// Case studies collection (CMS collection type `case-study`).
// Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  services: string;
  website?: string;
  headline: string;
  heroImg: AssetKey;
  intro: string;
  challenge: string;
  approach: string;
  resultText: string;
  stats: CaseStudyStat[];
  /** Two detail photos (the pair after the challenge). */
  visuals: [AssetKey, AssetKey];
  /** Further photos; the first one is the wide shot after the approach. */
  gallery: AssetKey[];
  cardImg: AssetKey;
  cardTag: string;
  cardStat: string;
  /** Multi-line card headline (rendered with white-space: pre-line) — keep the \n. */
  cardHeadline: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'studio-displays',
    client: 'Studio Displays',
    industry: 'Exhibit Design & Fabrication · US',
    services: 'Social Media Strategy + Management + Meta Ads',
    website: 'studiodisplays.com',
    headline: 'REACH. ENGAGE. GROW.',
    heroImg: 'case-sd-stands',
    intro: 'Studio Displays had the craft. They needed the reach. In 90 days we turned a scattered social presence into a portfolio and touchpoint for potential clients.',
    challenge: "Despite being an established company, Studio Displays lacked the brand awareness it deserved. Their online presence didn't reflect the creativity and quality of their work, and without a clear strategy or the time to manage multiple accounts, the brand wasn't reaching its full potential.",
    approach: "We started with a full social media audit to identify gaps, define goals, and build a strategy tailored to Studio Displays' multiple target audiences. From there, we optimized every channel and took over day-to-day management, including Meta ad campaigns and monthly performance reviews.",
    resultText: 'The first 90 days focused on building a strong organic foundation, resulting in 9× Instagram view growth, 300 local followers gained, and 38% growth in LinkedIn profile views. Afterward, targeted Meta ad campaigns were introduced to further expand reach and strengthen local brand awareness.',
    stats: [
      { value: '×9', label: 'Instagram views in 90 days' },
      { value: '+1,197', label: 'LinkedIn clicks gained' },
      { value: '16k', label: 'Facebook reach (was 115)' },
    ],
    visuals: ['case-sd-hall', 'case-sd-install'],
    gallery: [],
    cardImg: 'case-sd-stands',
    cardTag: 'Strategy + Management · US',
    cardStat: '81× Increase Reach in 90 Days',
    cardHeadline: 'REACH.\nENGAGE.\nGROW.',
  },
  {
    slug: 'albanova',
    client: 'AlbaNova',
    industry: 'Intercultural Consulting · ES, DE, EN',
    services: 'Social Media Strategy + Content & Copywriting',
    headline: 'FROM IDEA TO IDENTITY.',
    heroImg: 'albanova-1',
    intro: 'A new organisation needed to translate their brand identity into a social media presence that actually resonated, across languages, cultures, and audiences.',
    challenge: 'AlbaNova is a newly established organisation in its early development phase. After defining its brand identity with partnering agency New Edge, the next step was to translate that foundation into a clear and consistent social media presence that could work across multilingual and multicultural audiences.',
    approach: 'We built a strategy grounded in research and cultural understanding, positioning AlbaNova as a genuine bridge between cultures. We defined clear content pillars, developed a content calendar, and designed core brand assets: a master presentation template and a pitch deck built for investor and partner conversations.',
    resultText: 'AlbaNova launched with a coherent voice, a ready content strategy, and the assets to back it up. The groundwork is in place for sustained growth as the organisation scales.',
    stats: [
      { value: '2', label: 'Social accounts launched' },
      { value: '3', label: 'Languages, one consistent voice' },
      { value: '100%', label: 'Brand asset delivery on time' },
    ],
    visuals: ['albanova-2', 'albanova-3'],
    gallery: ['albanova-4'],
    cardImg: 'albanova-3',
    cardTag: 'Strategy + Content & Copywriting · ES, DE, EN',
    cardStat: '2 Accounts Launched',
    cardHeadline: 'FROM\nIDEA TO\nIDENTITY.',
  },
  {
    slug: 'galeria-eldorado',
    client: 'Galería Eldorado / Café Ordoñez',
    industry: 'Café & Retail · DE',
    services: 'Social Media Strategy',
    website: 'galeriaeldorado.de',
    headline: 'ESTRATEGIA QUE FUNCIONA.',
    heroImg: 'dorado-1',
    intro: 'A Colombian coffee café and concept store in Frankfurt that brings culture, craft, and fair trade together. They needed a strategy that honoured both their roots and their audience.',
    challenge: "Galería Eldorado operates at a unique intersection: café, gallery, and concept store, bridging Colombian culture and fair trade products with a German-speaking audience. Their social media wasn't capturing this complexity, posts lacked direction and the community wasn't growing.",
    approach: 'We developed a strategy focused on unifying the brand voice across all touchpoints. Through audience research we identified a shared mindset: people who care about origin stories, craft, and fair trade. We built content pillars around that mindset and created a framework the team could execute independently.',
    resultText: 'The strategy gave the team a clear, executable framework. The brand started attracting exactly the kind of customers who stay, come back, and bring others.',
    stats: [
      { value: '3 weeks', label: 'Strategy delivered' },
      { value: '2', label: 'Christmas campaign concepts created' },
      { value: '100%', label: 'Custom research-based strategy tailored to brand goals' },
    ],
    visuals: ['dorado-2', 'dorado-3'],
    gallery: ['dorado-4'],
    cardImg: 'dorado-3',
    cardTag: 'Strategy · DE',
    cardStat: 'Christmas Campaign',
    cardHeadline: 'ESTRATEGIA\nQUE\nFUNCIONA.',
  },
];

/** Static labels on the case-study detail page (part of a global/shared type). */
export const caseStudyLabels = {
  notFound: { message: 'Case not found', backLabel: 'Back to all work' },
  backLabel: 'All work',
  meta: { client: 'Client', services: 'Services', website: 'Website', industry: 'Industry' },
  sections: { challenge: 'The Challenge', approach: 'Our Approach', results: 'Results' },
  others: {
    eyebrow: 'Next case',
    heading: { lead: 'Other ', accent: 'Cases' },
    allWorkLabel: 'All Work',
    viewCaseLabel: 'VIEW CASE',
  },
  scrollLabel: 'SCROLL',
};
