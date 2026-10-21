// @vitest-environment node
import { describe, it, expect } from 'vitest';
import fixture from '../../src/test/fixtures/bundled-content.json';
import { schemaTypes } from '../../studio/schemaTypes';
import { assembleContent } from '../../src/lib/sanity/from-sanity';
import type { DocumentSchema } from './infer-schema';
import { slugify, toSanityDocs, type ImageRef } from './to-sanity';

const schemas = schemaTypes as unknown as DocumentSchema[];
const cfg = { projectId: 'proj', dataset: 'test' };

/** Fake upload: each distinct source gets an asset id; URLs map back to sources. */
function fakeResolver() {
  const ids = new Map<string, string>();
  const sourceByUrl = new Map<string, string>();
  const resolve = async (source: string): Promise<ImageRef> => {
    if (!ids.has(source)) {
      const id = `a${ids.size + 1}`;
      ids.set(source, id);
      sourceByUrl.set(`https://cdn.sanity.io/images/proj/test/${id}-100x100.jpg?w=2400&fit=max&auto=format`, source);
    }
    return { _type: 'image', asset: { _type: 'reference', _ref: `image-${ids.get(source)}-100x100-jpg` } };
  };
  return { resolve, sourceByUrl };
}

function mapStrings(value: unknown, fn: (s: string) => string): unknown {
  if (typeof value === 'string') return fn(value);
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn)]));
  }
  return value;
}

/** Sanity never stores null: a null field comes back absent (same truthiness). */
function dropNulls(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(dropNulls);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== null).map(([k, v]) => [k, dropNulls(v)]));
  }
  return value;
}

describe('slugify', () => {
  it('makes Sanity-safe ids', () => {
    expect(slugify('SOCIAL MEDIA\nSTRATEGY')).toBe('social-media-strategy');
    expect(slugify('Café Déco')).toBe('cafe-deco');
  });
});

describe('toSanityDocs', () => {
  it('round-trips the whole bundled content through Sanity documents', async () => {
    const { resolve, sourceByUrl } = fakeResolver();
    const { docs, warnings } = await toSanityDocs(fixture.content, schemas, resolve);
    expect(warnings).toEqual([]);

    const back = mapStrings(assembleContent(docs, cfg), (s) => sourceByUrl.get(s) ?? s) as Record<string, any>;
    const expected = dropNulls(structuredClone(fixture.content)) as Record<string, any>;
    // Article bodies become Portable Text: covered by the next test.
    for (const a of back.blogArticles) delete a.body;
    for (const a of expected.blogArticles) delete a.body;
    expect(back).toEqual(expected);
  });

  it('converts article bodies to Portable Text and keeps slugs as ids', async () => {
    const { resolve } = fakeResolver();
    const { docs } = await toSanityDocs(fixture.content, schemas, resolve);
    const post = docs.find((d) => d._type === 'blogPost')!;
    expect(post._id).toBe(`blogPost-${slugify(fixture.content.blogArticles[0].id)}`);
    expect(post.id).toEqual({ _type: 'slug', current: fixture.content.blogArticles[0].id });
    expect(Array.isArray(post.body)).toBe(true);
    expect((post.body as { _type: string }[])[0]._type).toBe('block');
    expect(post).not.toHaveProperty('number');
  });

  it('gives every array item a key and every collection item an ordering', async () => {
    const { resolve } = fakeResolver();
    const { docs } = await toSanityDocs(fixture.content, schemas, resolve);
    const service = docs.find((d) => d._type === 'service')!;
    expect(service.order).toBe(1);
    for (const fact of service.facts as { _key: string }[]) expect(fact._key).toMatch(/^k\d+$/);
    const posts = docs.filter((d) => d._type === 'blogPost');
    expect(String(posts[0].publishedAt) > String(posts[1].publishedAt)).toBe(true);
  });

  it('warns about fields that are not in the schema instead of losing them silently', async () => {
    const { resolve } = fakeResolver();
    const content = structuredClone(fixture.content) as Record<string, any>;
    content.home.unexpected = 'x';
    const { warnings } = await toSanityDocs(content, schemas, resolve);
    expect(warnings).toEqual(['homePage.unexpected : champ absent du schéma, ignoré']);
  });
});
