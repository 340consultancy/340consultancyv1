// Blog articles collection (CMS collection type `blog-post`) + the shared
// blog/social section copy and the Instagram post URLs.
// Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  /** Category eyebrow shown above the title (or "Coming soon"). */
  category: string;
  image: AssetKey;
  number: string;
  /**
   * Article body. Plain text: blank lines separate paragraphs, lines starting
   * with "## " render as subheadings. In Strapi this is a long-text field.
   */
  body?: string;
  author?: string;
  /** Human-readable publish date, e.g. "May 2026". */
  publishedDate?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'What to Post on LinkedIn as a Small Business',
    excerpt: 'Four types of LinkedIn content that actually work, with real examples you can steal.',
    category: 'LINKEDIN TIPS',
    image: 'sea-1',
    number: '01',
    author: '340 Consultancy',
    publishedDate: 'May 2026',
    body: `LinkedIn is where your next client is already scrolling — but most small businesses post like it's a job board. Here are the four content types we see perform again and again, no matter the industry.

## 1. Behind-the-scenes of real work
Show the messy middle, not just the polished result. A photo of a project in progress with two sentences on what you're solving beats any stock-photo announcement.

## 2. Lessons from client conversations
Anonymize it, then share it: "A client asked us this week whether X still works — here's what we told them." It positions you as the person people ask.

## 3. Opinionated takes on your industry
Not rage-bait — a clear stance. "We stopped doing weekly reports and our clients are happier" invites discussion and shows how you think.

## 4. Small wins with real numbers
Concrete beats impressive. "+38% profile views in 30 days" from a small account is more credible (and more shareable) than vague success claims.

Pick one type, post it this week, and watch what your network responds to. Consistency on one format beats sporadic attempts at all four.`,
  },
  {
    id: 'blog-2',
    title: 'How to Set Up a Social Media Content Calendar: Is It Actually Worth It',
    excerpt: "Spoiler: it's not about whether you need one. It's about how long you've been without one.",
    category: 'CONTENT PLANNING',
    image: 'sea-2',
    number: '02',
    author: '340 Consultancy',
    publishedDate: 'May 2026',
    body: `Every business that posts "when we have time" eventually stops posting. A content calendar isn't bureaucracy — it's the difference between a channel that compounds and one that restarts every month.

## Start with pillars, not posts
Define three to five recurring themes your brand talks about. Every post slots into a pillar; if it doesn't fit any, it probably doesn't belong on your feed.

## Plan two weeks, not two months
Long horizons collapse under real life. A rolling two-week plan stays realistic, leaves room for reactive content, and still kills the "what do we post today?" panic.

## Batch the boring parts
Write captions in one sitting, design visuals in another, schedule everything in a third. Context-switching is what makes social media feel like a full-time job.

## Review what actually happened
Once a month, compare the plan against performance. Keep the formats that worked, drop the ones that didn't — the calendar is a living document, not a contract.

Want a head start? Our free content calendar template (on the UP2DATE page) is the exact framework our clients use.`,
  },
  {
    id: 'blog-3',
    title: 'What a Social Media Audit Actually Tells You (And How to Do One in an Afternoon)',
    excerpt: "You're posting consistently. You've got a calendar. So why aren't you sure it's working?",
    category: 'SOCIAL MEDIA AUDITS',
    image: 'sea-3',
    number: '03',
    author: '340 Consultancy',
    publishedDate: 'June 2026',
    body: `An audit sounds like something you hire a consultancy for (and yes, we do them) — but a first honest pass takes one afternoon and answers the question your gut keeps asking: is any of this working?

## Look at reach before likes
Likes measure your existing audience's politeness. Reach measures whether new people see you at all. If reach is flat for three months, your content is talking to the same room.

## Check your profile like a stranger
Open your profile in a private window. In five seconds, is it clear what you do, who it's for, and what to do next? Most bios fail at least one of the three.

## Map your last 30 posts against your pillars
Count how many posts served each theme. Almost every audit reveals one pillar hogging the feed and one — usually the one that converts — barely showing up.

## Find your top three and your bottom three
Don't average. Look at the extremes: what do your best posts share, and what do the flops have in common? That pattern is your next month's strategy.

If the afternoon version raises more questions than it answers, that's normal — it's exactly where a full audit (and a strategy built on it) starts.`,
  },
];

/** Blog listing + article page labels (part of a global/shared type). */
export const blogPage = {
  listing: {
    eyebrow: 'READ · LEARN',
    headline: { lead: 'Our ', accent: 'Blog' },
    tagline: 'Short, sharp reads on strategy, content and growth.',
    readLabel: 'READ ARTICLE',
  },
  article: {
    backLabel: 'ALL ARTICLES',
    moreEyebrow: 'KEEP READING',
    moreHeadline: { lead: 'More ', accent: 'articles' },
    byLabel: 'By',
  },
};

export interface BlogSectionText {
  eyebrow: string;
  headline: [string, string];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
}

/** Copy for the two text cells of the blog/social section. */
export const blogSection: { blogs: BlogSectionText; social: BlogSectionText; readArticleLabel: string; comingSoonLabel: string; comingSoonWatermark: string } = {
  blogs: {
    eyebrow: 'READ · LEARN',
    headline: ['Our', 'Blogs'],
    body: 'Short, sharp reads on social media strategy, content, and growth — straight from the 340 team.',
    ctaLabel: 'READ ALL ARTICLES',
    ctaHref: '/blog',
  },
  social: {
    eyebrow: 'LIVE · SOCIAL',
    headline: ['Social', 'Posts'],
    body: 'Catch the latest from our feed — every post is a strategic decision, not a coincidence.',
    ctaLabel: 'FOLLOW @340CONSULTANCY',
    ctaHref: 'https://instagram.com/340consultancy',
    external: true,
  },
  readArticleLabel: 'READ ARTICLE',
  /** Shown on blog cards flagged "Coming soon" (date === "Coming soon"). */
  comingSoonLabel: 'COMING SOON',
  comingSoonWatermark: 'BALD',
};

/** Latest posts from @340consultancy, embedded on the blog/social section. */
// Newest post FIRST — the CMS serves instagram posts sorted by creation date
// (newest first, automatically); this bundled fallback mirrors that order.
export const igPostUrls: string[] = [
  'https://www.instagram.com/p/DUaXkP0jNYR/',
  'https://www.instagram.com/p/DUQdunhDFsE/',
  'https://www.instagram.com/p/DUIb6GIDB7b/',
  'https://www.instagram.com/p/DT71Q4YjAed/',
  'https://www.instagram.com/p/DTs8Tq1jCGS/',
  'https://www.instagram.com/p/DQCfrAljKla/',
  'https://www.instagram.com/p/DOYrFZvDBNB/',
  'https://www.instagram.com/p/DOWJNQKjO43/',
  'https://www.instagram.com/p/DNs9X6fWGyb/',
  'https://www.instagram.com/p/DNTW6r3MU_8/',
  'https://www.instagram.com/p/DMBIz8LsPm8/',
  'https://www.instagram.com/p/DLPwIVZMn-5/',
  'https://www.instagram.com/p/DLKSe8TMbx6/',
  'https://www.instagram.com/p/DK98ahwMy_c/',
];
