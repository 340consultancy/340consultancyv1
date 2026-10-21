// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { buildSchemas, humanize, inferField, toTs, type InferContext } from './infer-schema';

const ctx = (overrides: InferContext['overrides'] = {}): InferContext => ({
  assetKeys: new Set(['sea-1', 'sea-2']),
  iconNames: new Set(['mail', 'phone']),
  overrides,
  imagePaths: [],
});

describe('humanize', () => {
  it('turns camelCase into a sentence-case title', () => {
    expect(humanize('heroImg')).toBe('Hero img');
    expect(humanize('cta')).toBe('Cta');
  });
});

describe('inferField', () => {
  it('detects images from registered asset keys and records the path', () => {
    const c = ctx();
    expect(inferField('img', ['sea-1', 'sea-2'], 'service.img', c)).toEqual({
      name: 'img', title: 'Img', type: 'image', options: { hotspot: true }, required: true,
    });
    expect(c.imagePaths).toEqual(['service.img']);
  });

  it('uses text for multi-line or long strings, string otherwise', () => {
    expect(inferField('label', ['A\nB'], 'x.label', ctx()).type).toBe('text');
    expect(inferField('body', ['x'.repeat(101)], 'x.body', ctx()).type).toBe('text');
    expect(inferField('price', ['Custom'], 'x.price', ctx()).type).toBe('string');
  });

  it('offers icon names as a closed list', () => {
    expect(inferField('icon', ['mail'], 'x.icon', ctx())).toEqual({
      name: 'icon', title: 'Icon', type: 'string', options: { list: ['mail', 'phone'] }, required: true,
    });
  });

  it('marks a field required only when every sample is filled', () => {
    expect(inferField('note', ['a', undefined], 'x.note', ctx())).toEqual({ name: 'note', title: 'Note', type: 'string' });
    expect(inferField('note', ['a', ''], 'x.note', ctx())).toEqual({ name: 'note', title: 'Note', type: 'string' });
  });

  it('never marks booleans or objects as required', () => {
    expect(inferField('flag', [true, false], 'x.flag', ctx())).toEqual({ name: 'flag', title: 'Flag', type: 'boolean' });
    expect(inferField('hero', [{ title: 'Hi' }], 'x.hero', ctx())).toEqual({
      name: 'hero', title: 'Hero', type: 'object',
      fields: [{ name: 'title', title: 'Title', type: 'string', required: true }],
    });
  });

  it('infers arrays of objects from the union of their keys, with a list preview', () => {
    const field = inferField('facts', [[{ label: 'A', value: '1' }], [{ label: 'B' }]], 'service.facts', ctx());
    expect(field).toEqual({
      name: 'facts', title: 'Facts', type: 'array', required: true,
      of: [{
        type: 'object', name: 'item',
        fields: [
          { name: 'label', title: 'Label', type: 'string', required: true },
          { name: 'value', title: 'Value', type: 'string' },
        ],
        preview: { select: { title: 'label' } },
      }],
    });
  });

  it('infers arrays of images and arrays of strings', () => {
    expect(inferField('gallery', [['sea-1', 'sea-2']], 'c.gallery', ctx()).type).toBe('array');
    expect(inferField('gallery', [['sea-1']], 'c.gallery', ctx())).toMatchObject({ of: [{ type: 'image' }] });
    expect(inferField('includes', [['Brand overview']], 'c.includes', ctx())).toMatchObject({ of: [{ type: 'string' }] });
  });

  it('applies overrides, and drops a field overridden with null', () => {
    const c = ctx({ 'blogPost.body': { title: 'Body', type: 'array', of: [{ type: 'block', styles: [] }] }, 'blogPost.number': null });
    expect(inferField('body', ['text'], 'blogPost.body', c)).toEqual({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block', styles: [] }] });
    expect(inferField('number', ['01'], 'blogPost.number', c)).toBeNull();
  });

  it('refuses what Sanity cannot store, naming the path', () => {
    expect(() => inferField('rows', [[['a']]], 'x.rows', ctx())).toThrow('x.rows');
    expect(() => inferField('mixed', [['a', { b: 1 }]], 'x.mixed', ctx())).toThrow('x.mixed');
    expect(() => inferField('empty', [[]], 'x.empty', ctx())).toThrow('x.empty');
    expect(() => inferField('nothing', [undefined], 'x.nothing', ctx())).toThrow('x.nothing');
  });
});

describe('buildSchemas', () => {
  const content = {
    home: { hero: { title: 'Hi' } }, aboutUs: { a: 'x' }, servicesPage: { a: 'x' }, work: { a: 'x' },
    up2date: { a: 'x' }, contact: { a: 'x' }, privacy: { a: 'x' }, notFound: { a: 'x' },
    nav: { a: 'x' }, footer: { a: 'x' }, cta: { a: 'x' }, testimonialsCta: { a: 'x' }, showcase: { a: 'x' },
    blogSection: { a: 'x' }, blogPage: { a: 'x' }, serviceDetailLabels: { a: 'x' }, caseStudyLabels: { a: 'x' },
    managementAddOns: { a: 'x' }, strategyAddOns: { a: 'x' }, igPostUrls: ['https://instagram.com/p/1'],
    testimonials: [{ quote: 'q', name: 'n', role: 'r' }],
    services: [{ key: 'strategy', label: 'S', img: 'sea-1' }],
    caseStudies: [{ slug: 'studio', client: 'Studio' }],
    blogArticles: [{ id: 'blog-1', title: 'T', number: '01', body: 'B' }],
  };
  const c = ctx({ 'blogPost.body': { title: 'Body', type: 'array', of: [{ type: 'block', styles: [] }], required: true } });
  const schemas = buildSchemas(content, c);
  const byName = Object.fromEntries(schemas.map((s) => [s.name, s]));

  it('builds the 13 document types', () => {
    expect(schemas).toHaveLength(13);
  });

  it('turns the id field into a required slug sourced from the title field', () => {
    expect(byName.blogPost.fields.find((f) => f.name === 'id')).toEqual({
      name: 'id', title: 'Id', type: 'slug', options: { source: 'title', maxLength: 96 }, required: true,
    });
  });

  it('skips derived fields and adds the ordering field', () => {
    const names = byName.blogPost.fields.map((f) => f.name);
    expect(names).not.toContain('number');
    expect(names).toContain('publishedAt');
    expect(byName.service.fields.map((f) => f.name)).toContain('order');
  });

  it('stores each siteSettings export as one top-level field', () => {
    expect(byName.siteSettings.fields.map((f) => f.name)).toEqual([
      'nav', 'footer', 'cta', 'testimonialsCta', 'showcase', 'blogSection', 'blogPage',
      'serviceDetailLabels', 'caseStudyLabels', 'managementAddOns', 'strategyAddOns', 'igPostUrls',
    ]);
  });

  it('requires every top-level section of a page, so the Studio blocks emptying one', () => {
    expect(byName.homePage.fields).toEqual([
      expect.objectContaining({ name: 'hero', type: 'object', required: true }),
    ]);
    expect(byName.siteSettings.fields.every((f) => f.required)).toBe(true);
  });

  it('uses the title field for the Studio list preview', () => {
    expect(byName.caseStudy.preview).toEqual({ select: { title: 'client' } });
  });
});

describe('toTs', () => {
  it('emits validation and initialValue as code', () => {
    const ts = toTs({ name: 'publishedAt', type: 'datetime', required: true, initialValue: '__NOW__' });
    expect(ts).toContain('validation: (Rule: any) => Rule.required()');
    expect(ts).toContain('initialValue: () => new Date().toISOString()');
    expect(ts).not.toContain('"required"');
  });
});
