// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { diffBundles } from './diff-bundles';

describe('diffBundles', () => {
  it('reports nothing when Sanity holds everything Strapi had', () => {
    const shape = { hero: { title: 'x' }, list: [{ a: 'x' }] };
    expect(diffBundles(shape, { hero: { title: 'A' }, list: [{ a: '1' }] }, { hero: { title: 'A' }, list: [{ a: '1' }] })).toEqual([]);
  });

  it('reports a field filled in Strapi but empty in Sanity', () => {
    expect(diffBundles({ hero: { title: 'x' } }, { hero: { title: 'A' } }, { hero: {} })).toEqual(['hero.title : rempli côté Strapi, vide côté Sanity']);
  });

  it('reports missing collection items', () => {
    expect(diffBundles({ list: [{ a: 'x' }] }, { list: [{ a: '1' }, { a: '2' }] }, { list: [{ a: '1' }] })).toEqual([
      'list : 2 élément(s) côté Strapi, 1 côté Sanity',
      'list[1].a : rempli côté Strapi, vide côté Sanity',
    ]);
  });

  it('only checks fields the site uses, using every item to know them', () => {
    const shape = { list: [{ a: 'x' }, { a: 'x', b: 'y' }] };
    const source = { list: [{ a: '1', b: '2', seo: { title: 'ignored' } }] };
    expect(diffBundles(shape, source, { list: [{ a: '1' }] })).toEqual(['list[0].b : rempli côté Strapi, vide côté Sanity']);
  });

  it('accepts a rich-text body for a plain-text one', () => {
    const blocks = [{ _type: 'block', children: [] }];
    expect(diffBundles({ body: 'x' }, { body: 'Text' }, { body: blocks })).toEqual([]);
  });
});
