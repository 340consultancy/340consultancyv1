// Blog articles collection (CMS collection type `blog-post`) + the shared
// blog/social section copy and the Instagram post URLs.
// Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  /** Category eyebrow shown above the title (or "Coming soon"). */
  date: string;
  image: AssetKey;
  /** Wide image for the article header; older CMS posts fall back to image. */
  heroImage?: AssetKey;
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
    date: 'LINKEDIN TIPS',
    image: 'blog-general-linkedin',
    heroImage: 'blog-linkedin',
    number: '01',
    author: '340 Consultancy',
    publishedDate: 'May 2026',
    body: `Your next client is probably on LinkedIn right now. Scrolling between meetings, half reading, looking for someone who seems to know what they're doing. And what do most small businesses give them? A job post. Or a "We're thrilled to announce" with a stock photo of two people shaking hands.

We get it. LinkedIn feels formal, so people write formally. But the posts that actually start conversations (and later, projects) look very different. We spend a lot of time on our own accounts and our clients' accounts, and the same four types of content keep coming out on top. It doesn't matter if it's a law firm, a bakery supplier or a two person design studio.

## 1. Behind the scenes of real work

People don't hire a finished result. They hire the person who got there. So show the getting there.

A photo of your desk in the middle of a project. A whiteboard full of crossed out ideas. A draft with comments all over it. Add two or three sentences about what you're trying to solve, and that's your post. It doesn't need to be pretty. It actually works better when it isn't, because it looks like what it is: real work, happening right now.

Why it works: it's proof without bragging. Anyone can say they're good at what they do. Showing how you think through a problem is much harder to fake.

Steal this: "This is what week two of a rebrand looks like. Three logo directions on the wall, and we already killed one this morning. The client loved it. We didn't. It looked great but said nothing about what they actually do. We'll share where we landed next week."

Notice the last line. Give people a reason to come back.

## 2. Lessons from client conversations

Every question a client asks you is a question twenty other people are typing into Google. Take it, remove the names and details, and answer it in public.

Something like: "A client asked us this week whether X still works. Here's what we told them." It positions you as the person people go to with questions, which is exactly where you want to be when they need to hire someone.

This is also the easiest one when you're out of ideas. Just open your inbox.

Steal this: "A client asked me on Monday if they still need a newsletter now that they're active on Instagram. Short answer: yes. Instagram decides who sees your posts. Your email list doesn't. If the algorithm changes tomorrow (and it will), the list is still yours. We told them to send one email a month. Not weekly. Just one good one."

One rule: if the situation could still be recognised, ask the client before you post. Trust is worth more than content.

## 3. Opinionated takes on your industry

Not rage bait. A clear stance. The difference? Rage bait wants a reaction. A real opinion wants a conversation, and it explains its reasoning.

"We stopped doing weekly reports and our clients are happier" is a good example. Some people will agree, some will push back in the comments, and both are great for you. You're showing how you think, and for anyone selling expertise, that's the thing people are really buying.

A lot of small businesses avoid this because they're scared of putting someone off. But if nobody could ever disagree with your post, nobody will remember it either.

Steal this: "Unpopular opinion: most small businesses don't need to be on TikTok. They need to be really good on one platform where their clients already are. Being average everywhere is just a lot of work for nothing."

Before you post, ask yourself one thing: would I happily defend this in the comments? If the answer is no, it's not your opinion yet.

## 4. Small wins with real numbers

Concrete beats impressive. "+38% profile views in 30 days" from a small account is far more believable than "massive growth this quarter." Specific numbers sound true because they are specific. Huge round numbers sound like marketing.

And don't wait for a big win. Your first inbound lead counts. A post that got three times your usual comments counts. A client renewing counts. The trick is to share what you did, not only what happened, so people can learn something from it.

Steal this: "Small win, but we're proud of it. A client's LinkedIn profile views went up 38% in 30 days. No ads, no viral post. We changed three things: rewrote her headline so it says what she does instead of her job title, posted twice a week instead of whenever, and replied to every comment within a day. That's the whole trick."

## So where do you start?

Pick one. Not all four. Post it this week and pay attention to what your network does with it. Who comments, who sends a message, who suddenly views your profile. Then do it again next week.

Consistency on one format beats random attempts at all four, every time. And if you really don't know where to begin, go with number two. Your inbox already did half the work.`,
  },
  {
    id: 'blog-2',
    title: 'How to Set Up a Social Media Content Calendar: Is It Actually Worth It',
    excerpt: "Spoiler: it's not about whether you need one. It's about how long you've been without one.",
    date: 'CONTENT PLANNING',
    image: 'blog-general-content-planner',
    heroImage: 'blog-content-planner',
    number: '02',
    author: '340 Consultancy',
    publishedDate: 'May 2026',
    body: `Spoiler: it's not about whether you need one. It's about how long you've been without one.

Every business that posts "when we have time" eventually stops posting. Not because they don't care, but because there's never time. There's always a client email, an invoice, a meeting that runs over. Social media quietly slides to the bottom of the list, and three weeks later someone realises the last post was about a summer event.

A content calendar isn't bureaucracy. It's the difference between a channel that builds on itself and one that starts from zero every month. And no, it doesn't have to be a giant colour coded spreadsheet that nobody opens. Here's how we set them up for our clients, and how you can do it too.

## Start with pillars, not posts

Before you think about a single post, decide what your brand actually talks about. Pick three to five recurring themes. We call them content pillars.

For a physiotherapy practice, that could be: everyday exercises, myths about pain, meet the team, and patient questions. For a small agency, maybe: behind the scenes, client results, industry opinions, and practical tips.

Every post you plan should fit into one of those pillars. If it doesn't fit anywhere, it probably doesn't belong on your feed. This sounds strict, but it's actually freeing. You're no longer staring at a blank page asking "what should we post?" You're asking "what's our next myth about pain?" which is a much easier question.

It also helps your audience. When people know roughly what to expect from you, they're more likely to follow and come back.

## Plan two weeks, not two months

We see this all the time. Someone gets motivated, plans out an entire quarter in one afternoon, and by week three the plan is useless. A product launch moves, a team member is sick, something happens in the industry that you want to talk about. Long plans collapse under real life.

A rolling two week plan works much better. Every week, you plan the week after next. That way you always know what's coming, but you're never so far ahead that the plan stops making sense.

It also leaves room for reactive content. If something relevant happens, you can slot it in without throwing away a month of work. And most importantly, it kills the "what do we post today?" panic that leads to rushed, forgettable posts.

## Batch the boring parts

Here's the thing that makes social media feel like a full time job: jumping between tasks. Writing one caption, then opening Canva, then going back to write, then scheduling, then realising you need another photo. Every switch costs you focus.

Instead, split the work into sessions. Write all your captions for the next two weeks in one sitting. Design all the visuals in another. Schedule everything in a third. Each session is focused, faster, and honestly a lot less annoying.

Most of our clients are surprised how little time it takes once it's batched. Two or three focused hours every couple of weeks often replaces what used to be a daily low level stress.

## Review what actually happened

A calendar that never changes is just a to do list. Once a month, sit down and compare what you planned with how it performed.

Which posts got comments? Which ones got saved or shared? Which pillar does your audience clearly care about, and which one gets crickets every time? You don't need fancy analytics for this. The numbers inside the platform are usually enough.

Then adjust. Keep the formats that worked, drop the ones that didn't, and try one new thing next month. The calendar is a living document, not a contract. The goal isn't to follow the plan perfectly. It's to get a little bit better every month.

## Want a head start?

You don't have to build this from scratch. Our free content calendar template is on the UP2DATE page, and it's the same framework we use with our clients. Pillars, two week planning, batching and monthly review, all in one place.

Download it, fill in your pillars this week, and plan your next two weeks. That's it. You've officially stopped posting "when we have time."`,
  },
  {
    id: 'blog-3',
    title: 'What a Social Media Audit Actually Tells You (And How to Do One in an Afternoon)',
    excerpt: "You're posting consistently. You've got a calendar. So why aren't you sure it's working?",
    date: 'SOCIAL MEDIA AUDITS',
    image: 'blog-general-audit',
    heroImage: 'blog-audit',
    number: '03',
    author: '340 Consultancy',
    publishedDate: 'June 2026',
    body: `You're posting consistently. You've got a calendar. So why aren't you sure it's working?

That feeling is more common than you'd think. You put in the effort every week, the posts go out, a few people like them, and still there's this quiet question in the back of your head: is any of this actually doing something?

An audit sounds like something you hire a consultancy for (and yes, we do them). But a first honest pass doesn't need an agency or expensive tools. It takes one afternoon, a cup of coffee and a bit of honesty. Here's where to look.

## Look at reach before likes

Likes feel good, but they mostly measure how polite your existing audience is. Your colleague, your cousin, that one loyal client. They'll like your posts no matter what.

Reach tells you something much more useful: whether new people are seeing you at all. Open your insights and look at how many accounts you reached over the last three months, and how many of those weren't following you yet.

If reach has been flat for three months, your content is talking to the same room over and over. That's not a disaster, but it's a sign. Usually it means your posts are made for people who already know you, not for people who are discovering you for the first time.

## Check your profile like a stranger

Your profile is the page people land on when a post makes them curious. If it doesn't do its job, all the work you put into content leaks out right there.

So look at it the way a stranger would. Open your profile while logged out, or even better, hand your phone to someone who doesn't know your business. Give them five seconds and then ask three questions. What does this business do? Who is it for? What should I do next?

Most bios fail at least one of the three. Very often it's the last one. There's a nice description, maybe a few emojis, but no clear next step. A link to book a call, a free guide, a newsletter. Something. If people don't know what to do next, they do nothing.

## Map your last 30 posts against your pillars

If you've been working with content pillars (the three to five recurring themes your brand talks about), this is where it gets interesting.

Go through your last 30 posts and note which pillar each one belongs to. Just a simple tally on paper is enough. Then look at the result.

Almost every audit we do shows the same pattern. One pillar is hogging the feed, usually the one that's easiest to make. And one pillar barely shows up at all. Annoyingly, that's often the one that actually brings in clients, like case studies or posts that explain what you offer. It's harder to create, so it quietly gets skipped.

Once you see it written down, it's hard to unsee. And it's easy to fix.

## Find your top three and your bottom three

Don't look at averages. Averages hide everything interesting. Instead, look at the extremes.

Pick your three best performing posts and your three worst. Lay them side by side and ask yourself what they have in common. Maybe your best posts all have a face in the first image. Maybe they all start with a question. Maybe your flops are all the ones with long text on a graphic, or the ones posted late on a Friday.

You're looking for a pattern, not a single reason. And that pattern is basically your strategy for next month: do more of what the top three share, and stop doing what the bottom three share.

## When the afternoon isn't enough

If this quick version raises more questions than it answers, that's completely normal. Sometimes the numbers don't make sense, or you can see something is off but not why. That's exactly where a full audit starts, and where we build a strategy on top of it.

But do the afternoon version first. You'll understand your own channel better, and if you do decide to bring someone in, you'll know exactly what to ask.`,
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
