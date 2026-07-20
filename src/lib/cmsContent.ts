// ─────────────────────────────────────────────────────────────────────────────
// CMS hydration — pulls all site content from Strapi (when VITE_STRAPI_URL is
// set) and deep-merges it into the local modules under src/content/** BEFORE
// the app renders. Components keep importing plain objects from "@/content";
// they never know whether a value came from the bundled defaults or the CMS.
//
// The bundled content acts as the fallback: if Strapi is unreachable, not
// configured, or a field is empty, the local value stays. This keeps the
// Vercel deploy fully functional with or without a running CMS.
//
// Data source: one aggregated endpoint (GET {STRAPI}/api/site-content) served
// by cms/src/api/site-content — it returns every single type, fully populated,
// plus all collections in one round-trip.
// ─────────────────────────────────────────────────────────────────────────────

import { strapiMediaUrl } from '@/lib/strapi';
import {
  nav, footer, cta, showcase,
  testimonials, testimonialsCta,
  services, managementAddOns, strategyAddOns, serviceDetailLabels,
  caseStudies, caseStudyLabels,
  blogArticles, blogSection, blogPage, igPostUrls,
  home, aboutUs, servicesPage, contact, up2date, work, privacy, notFound,
} from '@/content';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL as string | undefined;
const FETCH_TIMEOUT_MS = 4000;

/** Strapi bookkeeping keys that must never leak into the content objects
 *  (alsoOnThisPage is the CMS-only editor guide shown on page singles). */
const META_KEYS = new Set(['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'createdBy', 'updatedBy', 'alsoOnThisPage']);

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** A populated Strapi media object (upload). */
const isMedia = (v: unknown): boolean =>
  isPlainObject(v) && typeof v.url === 'string' &&
  ('mime' in v || 'hash' in v || 'formats' in v || 'provider' in v);

/**
 * Normalize a raw Strapi value into the shape of src/content/**:
 *  - media objects (single or multiple) → absolute URL string(s)
 *  - Strapi meta keys stripped
 *  - inside arrays: single-key wrapper components ({ text: "…" }) → the value,
 *    so repeatable text components come back as plain string arrays
 */
function normalize(value: unknown, insideArray = false): unknown {
  if (Array.isArray(value)) {
    return value.map((v) => normalize(v, true));
  }
  if (isMedia(value)) {
    return strapiMediaUrl(value as { url: string } as never);
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (META_KEYS.has(k)) continue;
      out[k] = normalize(v);
    }
    const keys = Object.keys(out);
    // Single-field wrapper components ({ text: "…" }) unwrap to their value.
    // `typeof null === 'object'`, so check null explicitly — an EMPTY row an
    // editor saved ({ text: null }) must unwrap to null (dropped during the
    // array merge), not leak an object into a string[] and crash the render.
    if (insideArray && keys.length === 1 && (out[keys[0]] === null || typeof out[keys[0]] !== 'object')) {
      return out[keys[0]];
    }
    return out;
  }
  return value;
}

/**
 * Deep-merge `source` into `target` IN PLACE.
 *  - null / undefined / '' in the source keep the local default
 *  - arrays merge element-wise by index (see mergeArrayInPlace)
 *  - nested objects merge recursively
 */
function mergeInto(target: Record<string, unknown>, source: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined || value === '') continue;
    const current = target[key];
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      if (Array.isArray(current)) {
        mergeArrayInPlace(current, value);
      } else {
        target[key] = value;
      }
    } else if (isPlainObject(value) && isPlainObject(current)) {
      mergeInto(current as Record<string, unknown>, value);
    } else {
      target[key] = value;
    }
  }
}

/**
 * Merge a CMS array onto a bundled default array IN PLACE (keeps the exported
 * reference). The CMS decides length and order; object items at the same index
 * deep-merge onto the bundled item so that fields the CMS left empty — above
 * all not-yet-uploaded media — keep their bundled default (e.g. the seeded
 * blog posts keep their bundled images until real ones are uploaded).
 */
function mergeArrayInPlace(target: unknown[], source: unknown[]): void {
  if (source.length === 0) return;
  const merged = source
    .map((item, i) => {
      const base = target[i];
      if (isPlainObject(item) && isPlainObject(base)) {
        mergeInto(base as Record<string, unknown>, item);
        return base;
      }
      return item;
    })
    // empty single-field rows unwrap to null (see normalize) — drop them so
    // a blank list entry in the CMS simply renders nothing
    .filter((item) => item !== null && item !== undefined);
  if (merged.length === 0) return;
  target.splice(0, target.length, ...merged);
}

interface SiteContentPayload {
  global?: Record<string, unknown> | null;
  homePage?: Record<string, unknown> | null;
  aboutPage?: Record<string, unknown> | null;
  servicesPage?: Record<string, unknown> | null;
  contactPage?: Record<string, unknown> | null;
  up2datePage?: Record<string, unknown> | null;
  workPage?: Record<string, unknown> | null;
  privacyPage?: Record<string, unknown> | null;
  notFoundPage?: Record<string, unknown> | null;
  testimonials?: unknown[];
  services?: unknown[];
  caseStudies?: unknown[];
  blogPosts?: unknown[];
  instagramPosts?: unknown[];
}

/**
 * Fetch all CMS content and merge it into the local content modules.
 * Resolves quickly (no-op) when VITE_STRAPI_URL is not configured; never
 * rejects — any failure logs a warning and leaves the bundled defaults.
 */
export async function hydrateContentFromCms(): Promise<void> {
  if (!STRAPI_URL) return;

  // Draft preview: the Strapi admin's "Open preview" (draft tab) opens the
  // page with ?cmsPreview=<short-lived signed token>. Send it back as the
  // X-Preview-Token header (headers stay out of request logs, unlike query
  // strings) — the CMS verifies it server-side; for everyone else the
  // endpoint serves published content only.
  let query = '';
  let previewToken: string | null = null;
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    previewToken = params.get('cmsPreview');
    if (previewToken) {
      query = '?status=draft';
      // Standalone tab ("open in new tab"): scrub the token from the address
      // bar and history. Inside the admin's preview iframe keep the URL as-is
      // so a reload stays in draft mode.
      if (window.self === window.top) {
        params.delete('cmsPreview');
        const qs = params.toString();
        window.history.replaceState(
          null, '',
          `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
        );
      }
    }
  }

  let payload: SiteContentPayload;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(`${STRAPI_URL}/api/site-content${query}`, {
      signal: controller.signal,
      headers: previewToken ? { 'X-Preview-Token': previewToken } : undefined,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    payload = normalize(await res.json()) as SiteContentPayload;
  } catch (err) {
    console.warn('[cms] Strapi unreachable — using bundled content.', err);
    return;
  }

  try {
    // ── shared / global ──
    if (isPlainObject(payload.global)) {
      const g = payload.global;
      if (isPlainObject(g.nav)) mergeInto(nav as never, g.nav);
      if (isPlainObject(g.footer)) mergeInto(footer as never, g.footer);
      if (isPlainObject(g.cta)) mergeInto(cta as never, g.cta);
      if (isPlainObject(g.testimonialsCta)) mergeInto(testimonialsCta as never, g.testimonialsCta);
      if (isPlainObject(g.showcaseContent)) mergeInto(showcase.content as never, g.showcaseContent);
      if (isPlainObject(g.showcaseIndustry)) mergeInto(showcase.industry as never, g.showcaseIndustry);
      if (isPlainObject(g.blogSection)) mergeInto(blogSection as never, g.blogSection);
      if (isPlainObject(g.blogPage)) mergeInto(blogPage as never, g.blogPage);
      if (isPlainObject(g.serviceDetailLabels)) mergeInto(serviceDetailLabels as never, g.serviceDetailLabels);
      if (isPlainObject(g.caseStudyLabels)) mergeInto(caseStudyLabels as never, g.caseStudyLabels);
      if (isPlainObject(g.managementAddOns)) mergeInto(managementAddOns as never, g.managementAddOns);
      if (isPlainObject(g.strategyAddOns)) mergeInto(strategyAddOns as never, g.strategyAddOns);
    }

    // ── page singles ──
    if (isPlainObject(payload.homePage)) mergeInto(home as never, payload.homePage);
    if (isPlainObject(payload.aboutPage)) mergeInto(aboutUs as never, payload.aboutPage);
    if (isPlainObject(payload.servicesPage)) mergeInto(servicesPage as never, payload.servicesPage);
    if (isPlainObject(payload.contactPage)) mergeInto(contact as never, payload.contactPage);
    if (isPlainObject(payload.up2datePage)) mergeInto(up2date as never, payload.up2datePage);
    if (isPlainObject(payload.workPage)) mergeInto(work as never, payload.workPage);
    if (isPlainObject(payload.notFoundPage)) mergeInto(notFound as never, payload.notFoundPage);
    if (isPlainObject(payload.privacyPage)) {
      // Privacy sections are flat privacy.block components in Strapi — rebuild
      // the frontend's polymorphic block shape (see scripts/dump-seed.ts for
      // the inverse) and replace the bundled sections wholesale.
      const { sections, ...rest } = payload.privacyPage;
      mergeInto(privacy as never, rest);
      if (Array.isArray(sections) && sections.length > 0) {
        const rebuilt = sections.filter(isPlainObject).map((section) => ({
          id: (section.anchor as string) ?? '',
          title: (section.title as string) ?? '',
          blocks: (Array.isArray(section.blocks) ? section.blocks.filter(isPlainObject) : []).map((b) =>
            b.kind === 'ul'
              ? { kind: 'ul' as const, items: String(b.text ?? '').split('\n').map((l) => l.trim()).filter(Boolean) }
              : {
                  kind: 'p' as const,
                  text: (b.text as string) || undefined,
                  lead: (b.lead as string) || undefined,
                  link: b.linkText ? { text: b.linkText as string, href: (b.linkHref as string) ?? '' } : undefined,
                  tail: (b.tail as string) || undefined,
                  mt: (b.mt as string) || undefined,
                }
          ),
        }));
        privacy.sections.splice(0, privacy.sections.length, ...rebuilt);
      }
    }

    // ── collections ──
    if (Array.isArray(payload.testimonials)) mergeArrayInPlace(testimonials, payload.testimonials);
    if (Array.isArray(payload.services)) mergeArrayInPlace(services, payload.services);
    if (Array.isArray(payload.caseStudies)) mergeArrayInPlace(caseStudies, payload.caseStudies);
    if (Array.isArray(payload.blogPosts)) {
      // Strapi reserves `id` — blog posts carry a `slug` that maps onto the
      // local BlogArticle.id used by the /blog/:id routes. Posts arrive
      // newest-first (createdAt desc); the card number is always derived from
      // the display position so the badges stay 01, 02, … as new posts land
      // in front (a stored number would clash).
      // A post without a slug (no title yet — the CMS derives the slug from
      // the title) has no route; skip it instead of linking /blog/undefined.
      const routablePosts = payload.blogPosts.filter(
        (p): p is Record<string, unknown> =>
          isPlainObject(p) && typeof p.slug === 'string' && p.slug.length > 0
      );
      mergeArrayInPlace(
        blogArticles,
        routablePosts.map((p, i) => ({
          ...p,
          id: p.slug,
          number: String(i + 1).padStart(2, '0'),
        }))
      );
    }
    if (Array.isArray(payload.instagramPosts)) {
      // instagram-post entries → plain permalink URL list for the embed rail.
      const urls = payload.instagramPosts
        .map((p) => (isPlainObject(p) ? (p as { url?: string }).url : typeof p === 'string' ? p : undefined))
        .filter((u): u is string => typeof u === 'string' && u.length > 0);
      mergeArrayInPlace(igPostUrls, urls);
    }
  } catch (err) {
    console.warn('[cms] Failed to merge CMS content — some sections may show bundled defaults.', err);
  }
}
