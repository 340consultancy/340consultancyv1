import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import legacy from './cmsLegacyDefaults.json';

let payload: Record<string, unknown>;

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('VITE_STRAPI_URL', 'https://cms.example.com');
  payload = {};
  // Keep normalization and merging real; only replace the network boundary.
  vi.stubGlobal('fetch', vi.fn(async () => ({
    ok: true,
    json: async () => structuredClone(payload),
  })));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

async function loadContent() {
  const content = await import('@/content');
  const bundled = {
    bodies: Object.fromEntries(content.blogArticles.map((post) => [post.id, post.body])),
    industry: structuredClone(content.showcase.industry),
    subtitle: content.work.hero.subtitle,
    viewLabel: content.work.cases.viewLabel,
  };
  const { hydrateContentFromCms } = await import('./cmsContent');
  return { content, bundled, hydrateContentFromCms };
}

describe('legacy CMS defaults compatibility', () => {
  it('upgrades the three exact legacy article bodies by slug while retaining editor metadata and media', async () => {
    const { content, bundled, hydrateContentFromCms } = await loadContent();
    payload.blogPosts = Object.entries(legacy.blogBodies).map(([slug, body]) => ({
      slug,
      body,
      title: `Edited title ${slug}`,
      excerpt: `Edited excerpt ${slug}`,
      image: { url: `/uploads/${slug}.jpg`, mime: 'image/jpeg' },
    }));

    await hydrateContentFromCms();

    for (const [slug, oldBody] of Object.entries(legacy.blogBodies)) {
      const post = content.blogArticles.find((article) => article.id === slug);
      expect(post?.body).toBe(bundled.bodies[slug]);
      expect(post?.body).not.toBe(oldBody);
      expect(post?.title).toBe(`Edited title ${slug}`);
      expect(post?.excerpt).toBe(`Edited excerpt ${slug}`);
      expect(post?.image).toBe(`https://cms.example.com/uploads/${slug}.jpg`);
    }
  });

  it('preserves edited article bodies and does not apply a legacy body to a different slug', async () => {
    const { content, hydrateContentFromCms } = await loadContent();
    payload.blogPosts = [
      { slug: 'blog-1', body: `${legacy.blogBodies['blog-1']}\nEditor addition.` },
      { slug: 'new-article', body: legacy.blogBodies['blog-2'] },
      { slug: 'blog-3', body: 'A completely rewritten draft.' },
    ];

    await hydrateContentFromCms();

    expect(content.blogArticles.find((post) => post.id === 'blog-1')?.body).toBe(`${legacy.blogBodies['blog-1']}\nEditor addition.`);
    expect(content.blogArticles.find((post) => post.id === 'new-article')?.body).toBe(legacy.blogBodies['blog-2']);
    expect(content.blogArticles.find((post) => post.id === 'blog-3')?.body).toBe('A completely rewritten draft.');
  });

  it('adds Travel and Tech to the exact six legacy industries without replacing their CMS uploads', async () => {
    const { content, bundled, hydrateContentFromCms } = await loadContent();
    payload.global = {
      showcaseIndustry: {
        text: { titleLead: legacy.industry.titleLead, titleAccent: legacy.industry.titleAccent, sub: 'Editor introduction.' },
        items: legacy.industry.labels.map((label, index) => ({ label, img: { url: `/uploads/industry-${index}.jpg`, mime: 'image/jpeg' } })),
      },
    };

    await hydrateContentFromCms();

    expect(content.showcase.industry.text.titleLead).toBe('Many');
    expect(content.showcase.industry.text.titleAccent).toBe('worlds.');
    expect(content.showcase.industry.text.sub).toBe('Editor introduction.');
    expect(content.showcase.industry.items.map((item) => item.label)).toEqual([...legacy.industry.labels, 'Travel', 'Tech']);
    expect(content.showcase.industry.items.slice(0, 6).map((item) => item.img)).toEqual(legacy.industry.labels.map((_, index) => `https://cms.example.com/uploads/industry-${index}.jpg`));
    expect(content.showcase.industry.items.slice(6)).toEqual(bundled.industry.items.slice(6));
  });

  it('preserves custom industry headings and lists', async () => {
    const { content, hydrateContentFromCms } = await loadContent();
    payload.global = {
      showcaseIndustry: {
        text: { titleLead: 'Our', titleAccent: 'industry.' },
        items: [{ label: 'Aviation', img: { url: '/uploads/aviation.jpg', mime: 'image/jpeg' } }],
      },
    };

    await hydrateContentFromCms();

    expect(content.showcase.industry.text.titleLead).toBe('Our');
    expect(content.showcase.industry.text.titleAccent).toBe('industry.');
    expect(content.showcase.industry.items).toEqual([{ label: 'Aviation', img: 'https://cms.example.com/uploads/aviation.jpg' }]);
  });

  it('upgrades exact work defaults while preserving edited fields', async () => {
    const { content, bundled, hydrateContentFromCms } = await loadContent();
    payload.workPage = {
      hero: { subtitle: legacy.work.subtitle, headline: { lead: 'SELECTED ', accent: 'PROJECTS' } },
      cases: { viewLabel: legacy.work.viewLabel },
      clientsHeading: 'Editor clients heading',
    };

    await hydrateContentFromCms();

    expect(content.work.hero.subtitle).toBe(bundled.subtitle);
    expect(content.work.cases.viewLabel).toBe(bundled.viewLabel);
    expect(content.work.hero.headline).toEqual({ lead: 'SELECTED ', accent: 'PROJECTS' });
    expect(content.work.clientsHeading).toBe('Editor clients heading');

    payload.workPage = { hero: { subtitle: 'Custom work introduction.' }, cases: { viewLabel: 'Discover our projects' } };
    await hydrateContentFromCms();

    expect(content.work.hero.subtitle).toBe('Custom work introduction.');
    expect(content.work.cases.viewLabel).toBe('Discover our projects');
  });

  it('uses the original bundled snapshot after a custom hydration and remains idempotent', async () => {
    const { content, bundled, hydrateContentFromCms } = await loadContent();
    payload.blogPosts = [{ slug: 'blog-1', body: 'A custom draft from a previous hydration.' }];
    payload.workPage = { hero: { subtitle: 'A custom previous introduction.' } };
    await hydrateContentFromCms();

    payload = {
      blogPosts: [{ slug: 'blog-1', body: legacy.blogBodies['blog-1'] }],
      workPage: { hero: { subtitle: legacy.work.subtitle }, cases: { viewLabel: legacy.work.viewLabel } },
      global: { showcaseIndustry: { text: { titleLead: legacy.industry.titleLead, titleAccent: legacy.industry.titleAccent }, items: legacy.industry.labels.map((label) => ({ label, img: null })) } },
    };
    await hydrateContentFromCms();
    const once = JSON.stringify({ blog: content.blogArticles, industry: content.showcase.industry, work: content.work });
    await hydrateContentFromCms();

    expect(content.blogArticles[0].body).toBe(bundled.bodies['blog-1']);
    expect(content.work.hero.subtitle).toBe(bundled.subtitle);
    expect(content.showcase.industry.items).toHaveLength(8);
    expect(JSON.stringify({ blog: content.blogArticles, industry: content.showcase.industry, work: content.work })).toBe(once);
  });
});
