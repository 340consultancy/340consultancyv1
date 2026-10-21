/* eslint-disable @typescript-eslint/no-explicit-any -- one-off migration code over loosely shaped CMS JSON */
// One-off: reproduces what the site rendered while Strapi was up — the CMS
// payload deep-merged onto the bundled content — so the Sanity import starts
// from exactly what visitors saw. Ported from src/lib/cmsContent.ts, working
// on a copy instead of mutating the live content modules.
import type { ContentBundle } from '../../src/lib/sanity/documents';

type Obj = Record<string, unknown>;

const META_KEYS = new Set(['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'createdBy', 'updatedBy', 'alsoOnThisPage']);

const isPlainObject = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);

const isMedia = (v: unknown): boolean =>
  isPlainObject(v) && typeof v.url === 'string' && ('mime' in v || 'hash' in v || 'formats' in v || 'provider' in v);

const absoluteUrl = (url: string, strapiUrl: string): string => (/^https?:\/\//.test(url) ? url : `${strapiUrl}${url}`);

export async function fetchStrapiPayload(strapiUrl: string): Promise<unknown> {
  const res = await fetch(`${strapiUrl}/api/site-content`);
  if (!res.ok) throw new Error(`Strapi a répondu HTTP ${res.status} sur /api/site-content`);
  return res.json();
}

/** Same rules as the site: media → absolute URL, meta keys stripped,
 *  single-field wrapper components inside arrays unwrapped. */
export function normalize(value: unknown, strapiUrl: string, insideArray = false): unknown {
  if (Array.isArray(value)) return value.map((v) => normalize(v, strapiUrl, true));
  if (isMedia(value)) return absoluteUrl((value as { url: string }).url, strapiUrl);
  if (isPlainObject(value)) {
    const out: Obj = {};
    for (const [k, v] of Object.entries(value)) {
      if (META_KEYS.has(k)) continue;
      out[k] = normalize(v, strapiUrl);
    }
    const keys = Object.keys(out);
    if (insideArray && keys.length === 1 && (out[keys[0]] === null || typeof out[keys[0]] !== 'object')) {
      return out[keys[0]];
    }
    return out;
  }
  return value;
}

function mergeInto(target: Obj, source: Obj): void {
  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined || value === '') continue;
    const current = target[key];
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      if (Array.isArray(current)) mergeArrayInPlace(current, value);
      else target[key] = value;
    } else if (isPlainObject(value) && isPlainObject(current)) {
      mergeInto(current, value);
    } else {
      target[key] = value;
    }
  }
}

function mergeArrayInPlace(target: unknown[], source: unknown[]): void {
  if (source.length === 0) return;
  const merged = source
    .map((item, i) => {
      const base = target[i];
      if (isPlainObject(item) && isPlainObject(base)) {
        mergeInto(base, item);
        return base;
      }
      return item;
    })
    .filter((item) => item !== null && item !== undefined);
  if (merged.length === 0) return;
  target.splice(0, target.length, ...merged);
}

export function mergeStrapiPayload(base: ContentBundle, rawPayload: unknown, strapiUrl: string): ContentBundle {
  const content = structuredClone(base) as Record<string, any>;
  const payload = (normalize(rawPayload, strapiUrl) ?? {}) as Record<string, any>;
  const mergeObj = (target: unknown, source: unknown) => {
    if (isPlainObject(target) && isPlainObject(source)) mergeInto(target, source);
  };

  // ── shared / global ──
  const g = payload.global;
  if (isPlainObject(g)) {
    mergeObj(content.nav, g.nav);
    mergeObj(content.footer, g.footer);
    mergeObj(content.cta, g.cta);
    mergeObj(content.testimonialsCta, g.testimonialsCta);
    mergeObj(content.showcase?.content, g.showcaseContent);
    mergeObj(content.showcase?.industry, g.showcaseIndustry);
    mergeObj(content.blogSection, g.blogSection);
    mergeObj(content.blogPage, g.blogPage);
    mergeObj(content.serviceDetailLabels, g.serviceDetailLabels);
    mergeObj(content.caseStudyLabels, g.caseStudyLabels);
    mergeObj(content.managementAddOns, g.managementAddOns);
    mergeObj(content.strategyAddOns, g.strategyAddOns);
  }

  // ── page singles ──
  mergeObj(content.home, payload.homePage);
  mergeObj(content.aboutUs, payload.aboutPage);
  mergeObj(content.servicesPage, payload.servicesPage);
  mergeObj(content.contact, payload.contactPage);
  mergeObj(content.up2date, payload.up2datePage);
  mergeObj(content.work, payload.workPage);
  mergeObj(content.notFound, payload.notFoundPage);
  if (isPlainObject(payload.privacyPage)) {
    const { sections, ...rest } = payload.privacyPage as Obj;
    mergeObj(content.privacy, rest);
    if (Array.isArray(sections) && sections.length > 0) {
      content.privacy.sections = sections.filter(isPlainObject).map((section) => ({
        id: (section.anchor as string) ?? '',
        title: (section.title as string) ?? '',
        blocks: (Array.isArray(section.blocks) ? section.blocks.filter(isPlainObject) : []).map((b) =>
          b.kind === 'ul'
            ? { kind: 'ul', items: String(b.text ?? '').split('\n').map((l) => l.trim()).filter(Boolean) }
            : {
                kind: 'p',
                text: (b.text as string) || undefined,
                lead: (b.lead as string) || undefined,
                link: b.linkText ? { text: b.linkText as string, href: (b.linkHref as string) ?? '' } : undefined,
                tail: (b.tail as string) || undefined,
                mt: (b.mt as string) || undefined,
              }
        ),
      }));
    }
  }

  // ── collections ──
  if (Array.isArray(payload.testimonials)) mergeArrayInPlace(content.testimonials, payload.testimonials);
  if (Array.isArray(payload.services)) mergeArrayInPlace(content.services, payload.services);
  if (Array.isArray(payload.caseStudies)) mergeArrayInPlace(content.caseStudies, payload.caseStudies);
  if (Array.isArray(payload.blogPosts)) {
    const routable = payload.blogPosts.filter(
      (p: unknown): p is Obj => isPlainObject(p) && typeof p.slug === 'string' && p.slug.length > 0
    );
    mergeArrayInPlace(
      content.blogArticles,
      routable.map((p: Obj, i: number) => {
        const { date, ...rest } = p;
        return {
          ...rest,
          ...(date !== undefined && date !== null && date !== '' ? { category: date } : {}),
          id: p.slug,
          number: String(i + 1).padStart(2, '0'),
        };
      })
    );
  }
  if (Array.isArray(payload.instagramPosts)) {
    const urls = payload.instagramPosts
      .map((p: unknown) => (isPlainObject(p) ? (p as { url?: string }).url : typeof p === 'string' ? p : undefined))
      .filter((u: unknown): u is string => typeof u === 'string' && u.length > 0);
    mergeArrayInPlace(content.igPostUrls, urls);
  }

  return content;
}
