// @vitest-environment node
/* eslint-disable @typescript-eslint/no-explicit-any -- one-off migration code over loosely shaped CMS JSON */
import { describe, it, expect } from 'vitest';
import { mergeStrapiPayload } from './strapi-merge';

const STRAPI = 'https://cms.example.com';
const base = () => ({
  nav: { cta: 'BOOK', links: [{ label: 'Home', href: '/' }] },
  showcase: { content: { title: 'Content' }, industry: { title: 'Industry' } },
  home: { hero: { title: 'Bundled', img: 'sea-1' } },
  privacy: { title: 'Privacy', sections: [{ id: 'old', title: 'Old', blocks: [] }] },
  testimonials: [{ quote: 'q1', name: 'A', role: 'r' }],
  blogArticles: [{ id: 'blog-1', category: 'TIPS', title: 'Bundled post', number: '01', image: 'sea-1' }],
  igPostUrls: ['https://instagram.com/p/old'],
});

describe('mergeStrapiPayload', () => {
  it('keeps the bundled value when Strapi sends an empty field', () => {
    const out = mergeStrapiPayload(base(), { homePage: { hero: { title: '' } } }, STRAPI) as any;
    expect(out.home.hero.title).toBe('Bundled');
  });

  it('turns Strapi media into absolute URLs and strips bookkeeping keys', () => {
    const out = mergeStrapiPayload(base(), {
      homePage: { id: 3, documentId: 'd', hero: { title: 'From CMS', img: { url: '/uploads/hero.jpg', mime: 'image/jpeg' } } },
    }, STRAPI) as any;
    expect(out.home.hero).toEqual({ title: 'From CMS', img: 'https://cms.example.com/uploads/hero.jpg' });
    expect(out.home).not.toHaveProperty('documentId');
  });

  it('maps the global single onto the shared sections', () => {
    const out = mergeStrapiPayload(base(), {
      global: { nav: { cta: 'CALL US' }, showcaseContent: { title: 'New content' } },
    }, STRAPI) as any;
    expect(out.nav.cta).toBe('CALL US');
    expect(out.nav.links).toEqual([{ label: 'Home', href: '/' }]);
    expect(out.showcase.content.title).toBe('New content');
  });

  it('maps blog posts: slug → id, date → category, number from position, slug-less posts skipped', () => {
    const out = mergeStrapiPayload(base(), {
      blogPosts: [
        { slug: 'new-post', title: 'New', date: 'LINKEDIN', number: '99' },
        { title: 'No slug yet' },
      ],
    }, STRAPI) as any;
    expect(out.blogArticles).toEqual([
      { id: 'new-post', category: 'LINKEDIN', title: 'New', number: '01', image: 'sea-1', slug: 'new-post' },
    ]);
  });

  it('rebuilds privacy sections from flat Strapi blocks', () => {
    const out = mergeStrapiPayload(base(), {
      privacyPage: {
        sections: [{
          anchor: 'cookies', title: 'Cookies',
          blocks: [
            { kind: 'p', lead: 'Lead', text: 'Body', linkText: 'here', linkHref: '/x', tail: '.', mt: '' },
            { kind: 'ul', text: 'one\n two \n\nthree' },
          ],
        }],
      },
    }, STRAPI) as any;
    expect(out.privacy.sections).toEqual([{
      id: 'cookies', title: 'Cookies',
      blocks: [
        { kind: 'p', text: 'Body', lead: 'Lead', link: { text: 'here', href: '/x' }, tail: '.', mt: undefined },
        { kind: 'ul', items: ['one', 'two', 'three'] },
      ],
    }]);
  });

  it('turns instagram posts into the URL list', () => {
    const out = mergeStrapiPayload(base(), { instagramPosts: [{ url: 'https://instagram.com/p/a' }, { url: '' }] }, STRAPI) as any;
    expect(out.igPostUrls).toEqual(['https://instagram.com/p/a']);
  });

  it('unwraps single-field components inside arrays', () => {
    const out = mergeStrapiPayload(base(), { testimonials: [{ quote: 'New', name: 'A', role: 'r' }] }, STRAPI) as any;
    expect(out.testimonials[0].quote).toBe('New');
  });

  it('never mutates the base content', () => {
    const b = base();
    mergeStrapiPayload(b, { homePage: { hero: { title: 'Changed' } } }, STRAPI);
    expect(b.home.hero.title).toBe('Bundled');
  });
});
