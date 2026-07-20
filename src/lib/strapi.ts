// ─────────────────────────────────────────────────────────────────────────────
// Strapi REST client — thin, typed fetch layer for the Strapi v5 REST API.
//
// This is scaffolding, not a finished integration: no Strapi content types
// exist yet to point it at. Once they do, wire individual `src/content/**`
// modules to call `strapiFind` / `strapiFindOne` instead of exporting a
// hardcoded constant — the shapes in `src/content/types.ts` were designed to
// match 1:1 onto Strapi fields (AssetKey → media field, IconName → enum
// field), so the migration should mostly be "swap the export for a fetch".
//
// Strapi v5 REST responses are flat (no more `.attributes` nesting):
//   { data: { id, documentId, title, ... }, meta: {...} }          (single)
//   { data: [{ id, documentId, ... }, ...], meta: { pagination } } (collection)
// Docs: https://docs.strapi.io/dev-docs/api/rest
// ─────────────────────────────────────────────────────────────────────────────

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL as string | undefined;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: { pagination: StrapiPagination };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

/** Resolve a Strapi media object (or a plain relative URL) to an absolute URL. */
export const strapiMediaUrl = (media: StrapiMedia | string | null | undefined): string => {
  if (!media) return '';
  const url = typeof media === 'string' ? media : media.url;
  if (/^https?:\/\//.test(url)) return url;
  if (!STRAPI_URL) {
    console.warn('[strapi] VITE_STRAPI_URL is not set — cannot resolve media URL:', url);
    return url;
  }
  return `${STRAPI_URL}${url}`;
};

class StrapiError extends Error {
  constructor(public status: number, public path: string, message: string) {
    super(`Strapi request to ${path} failed with ${status}: ${message}`);
    this.name = 'StrapiError';
  }
}

async function strapiFetch<T>(path: string): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error(
      'VITE_STRAPI_URL is not set. Add it to .env (local) and to the Vercel ' +
      'project env vars (Preview + Production) — see .env.example.'
    );
  }
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
  });
  if (!res.ok) {
    throw new StrapiError(res.status, path, await res.text().catch(() => res.statusText));
  }
  return res.json() as Promise<T>;
}

/**
 * Fetch a Strapi collection type, e.g. `strapiFind('testimonials')`.
 * Pass raw query params (Strapi's REST API takes bracket-style params for
 * populate/filters/sort — for anything beyond `populate=*` it's worth adding
 * the `qs` package Strapi's own docs recommend, to build nested params).
 */
export const strapiFind = <T>(
  contentType: string,
  params: Record<string, string> = { populate: '*' }
): Promise<StrapiCollectionResponse<T>> => {
  const qs = new URLSearchParams(params).toString();
  return strapiFetch<StrapiCollectionResponse<T>>(`/${contentType}${qs ? `?${qs}` : ''}`);
};

/**
 * Create an entry in a public create-only collection (form submissions):
 * `strapiCreate('contact-messages', {...})`. Throws when the CMS is not
 * configured or rejects the payload — callers show their CMS-provided
 * error toast in that case.
 */
export const strapiCreate = async (
  contentType: string,
  data: Record<string, unknown>
): Promise<void> => {
  if (!STRAPI_URL) {
    throw new Error('VITE_STRAPI_URL is not set — form submissions have nowhere to go.');
  }
  const res = await fetch(`${STRAPI_URL}/api/${contentType}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    throw new StrapiError(res.status, `/${contentType}`, await res.text().catch(() => res.statusText));
  }
};

/** Fetch a Strapi single type, e.g. `strapiFindOne('work-page')`. */
export const strapiFindOne = <T>(
  contentType: string,
  params: Record<string, string> = { populate: '*' }
): Promise<StrapiSingleResponse<T>> => {
  const qs = new URLSearchParams(params).toString();
  return strapiFetch<StrapiSingleResponse<T>>(`/${contentType}${qs ? `?${qs}` : ''}`);
};
