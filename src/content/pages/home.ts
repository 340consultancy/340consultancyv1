// Home page (single type). Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';

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

export const home = generated.home as HomeContent;
