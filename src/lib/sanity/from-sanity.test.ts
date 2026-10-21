import { describe, it, expect } from 'vitest';
import { assembleContent, fromSanity, imageUrl } from './from-sanity';
import { SINGLETONS } from './documents';

const cfg = { projectId: 'proj', dataset: 'prod' };
const image = (id: string) => ({ _type: 'image', asset: { _type: 'reference', _ref: `image-${id}-800x600-jpg` } });

/** Minimal set of published singletons so assembleContent can run. */
function singletonDocs(overrides: Record<string, Record<string, unknown>> = {}) {
  return SINGLETONS.map((s) => {
    const body = s.fields ? Object.fromEntries(s.fields.map((f) => [f, { label: f }])) : { title: s.title };
    return { _id: s.type, _type: s.type, ...body, ...(overrides[s.type] ?? {}) };
  });
}

describe('imageUrl', () => {
  it('builds a CDN URL with automatic format', () => {
    expect(imageUrl(image('abc'), cfg)).toBe('https://cdn.sanity.io/images/proj/prod/abc-800x600.jpg?w=2400&fit=max&auto=format');
  });

  it('applies the editor crop as a rect', () => {
    const cropped = { ...image('abc'), crop: { top: 0.1, bottom: 0.1, left: 0.25, right: 0 } };
    expect(imageUrl(cropped, cfg)).toBe('https://cdn.sanity.io/images/proj/prod/abc-800x600.jpg?rect=200,60,600,480&w=2400&fit=max&auto=format');
  });

  it('rejects a malformed asset reference', () => {
    expect(() => imageUrl({ _type: 'image', asset: { _ref: 'nope' } }, cfg)).toThrow('nope');
  });
});

describe('fromSanity', () => {
  it('strips Sanity bookkeeping keys, resolves images and slugs', () => {
    expect(fromSanity({
      _id: 'x', _type: 'caseStudy', _rev: 'r', _createdAt: 'd',
      slug: { _type: 'slug', current: 'studio' },
      heroImg: image('abc'),
      stats: [{ _key: 'k0', _type: 'item', value: '3x', label: 'Reach' }],
      gallery: [{ _key: 'k0', ...image('g1') }],
    }, cfg)).toEqual({
      slug: 'studio',
      heroImg: 'https://cdn.sanity.io/images/proj/prod/abc-800x600.jpg?w=2400&fit=max&auto=format',
      stats: [{ value: '3x', label: 'Reach' }],
      gallery: ['https://cdn.sanity.io/images/proj/prod/g1-800x600.jpg?w=2400&fit=max&auto=format'],
    });
  });

  it('keeps Portable Text blocks verbatim', () => {
    const body = [{ _type: 'block', _key: 'b0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's', text: 'Hi', marks: [] }] }];
    expect(fromSanity({ body }, cfg)).toEqual({ body });
  });

  it('drops an image field with no uploaded asset', () => {
    expect(fromSanity({ img: { _type: 'image' }, title: 'T' }, cfg)).toEqual({ title: 'T' });
  });
});

describe('assembleContent', () => {
  it('maps page singletons and site settings onto the content exports', () => {
    const content = assembleContent(singletonDocs({ homePage: { hero: { title: 'Hello' } } }), cfg);
    expect(content.home).toEqual({ title: 'Home', hero: { title: 'Hello' } });
    expect(content.nav).toEqual({ label: 'nav' });
    expect(content.igPostUrls).toEqual({ label: 'igPostUrls' });
  });

  it('fails the build when a page was never published', () => {
    const docs = singletonDocs().filter((d) => d._id !== 'privacyPage');
    expect(() => assembleContent(docs, cfg)).toThrow('privacyPage');
  });

  it('fails the build when a site settings field is empty', () => {
    const docs = singletonDocs();
    const settings = docs.find((d) => d._id === 'siteSettings') as Record<string, unknown>;
    delete settings.footer;
    expect(() => assembleContent(docs, cfg)).toThrow('footer');
  });

  it('ignores drafts', () => {
    const docs = [...singletonDocs(), { _id: 'drafts.blogPost-x', _type: 'blogPost', id: { _type: 'slug', current: 'x' }, title: 'Draft', publishedAt: '2026-10-01T00:00:00Z' }];
    expect(assembleContent(docs, cfg).blogArticles).toEqual([]);
  });

  it('sorts collections by order, without leaking the order field', () => {
    const docs = [
      ...singletonDocs(),
      { _id: 'testimonial-2', _type: 'testimonial', name: 'B', order: 2 },
      { _id: 'testimonial-1', _type: 'testimonial', name: 'A', order: 1 },
      { _id: 'testimonial-3', _type: 'testimonial', name: 'C' },
    ];
    expect(assembleContent(docs, cfg).testimonials).toEqual([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
  });

  it('lists blog posts newest first, numbers them by position and skips posts without slug', () => {
    const docs = [
      ...singletonDocs(),
      { _id: 'blogPost-old', _type: 'blogPost', id: { _type: 'slug', current: 'old' }, title: 'Old', publishedAt: '2026-01-01T00:00:00Z' },
      { _id: 'blogPost-new', _type: 'blogPost', id: { _type: 'slug', current: 'new' }, title: 'New', publishedAt: '2026-09-01T00:00:00Z' },
      { _id: 'blogPost-noslug', _type: 'blogPost', title: 'No slug', publishedAt: '2026-10-01T00:00:00Z' },
    ];
    expect(assembleContent(docs, cfg).blogArticles).toEqual([
      { id: 'new', title: 'New', number: '01' },
      { id: 'old', title: 'Old', number: '02' },
    ]);
  });
});
