// Blog articles collection (Sanity type `blogPost`) + the shared
// blog/social section copy and the Instagram post URLs.
// Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs.

import type { AssetKey } from '@/content/assets';
import { generated } from '@/content/generated';
import type { BlogPageContent } from '@/content/types';
import type { PtBlock } from '@/lib/sanity/portable-text';

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  /** Category eyebrow shown above the title (or "Coming soon"). */
  category: string;
  image: AssetKey;
  number: string;
  /** Article body as Portable Text (rich text edited in Sanity). */
  body?: PtBlock[];
  author?: string;
  /** Human-readable publish date, e.g. "May 2026". */
  publishedDate?: string;
}

export const blogArticles = generated.blogArticles as BlogArticle[];

/** Blog listing + article page labels (part of a global/shared type). */
export const blogPage = generated.blogPage as BlogPageContent;

export interface BlogSectionText {
  eyebrow: string;
  headline: [string, string];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
}

/** Copy for the two text cells of the blog/social section. */
export const blogSection = generated.blogSection as { blogs: BlogSectionText; social: BlogSectionText; readArticleLabel: string; comingSoonLabel: string; comingSoonWatermark: string };

/** Latest posts from @340consultancy, embedded on the blog/social section. */
// Newest post FIRST — the CMS serves instagram posts sorted by creation date
// (newest first, automatically); this bundled fallback mirrors that order.
export const igPostUrls = generated.igPostUrls as string[];
