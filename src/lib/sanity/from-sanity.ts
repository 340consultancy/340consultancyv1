// ─────────────────────────────────────────────────────────────────────────────
// Turns published Sanity documents back into the exact shapes the site's
// content modules export (src/content/**). Runs at build time only.
// ─────────────────────────────────────────────────────────────────────────────
import { COLLECTIONS, SINGLETONS, type ContentBundle } from './documents';

export interface SanityConfig {
  projectId: string;
  dataset: string;
}

export interface SanityImage {
  _type?: string;
  asset?: { _ref?: string };
  crop?: { top: number; bottom: number; left: number; right: number };
}

type Doc = Record<string, unknown>;

const isRecord = (v: unknown): v is Doc => typeof v === 'object' && v !== null && !Array.isArray(v);

const REF = /^image-([a-zA-Z0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/;

/** CDN URL of an image, honouring the editor's crop; WebP/AVIF served automatically. */
export function imageUrl(image: SanityImage, cfg: SanityConfig): string {
  const ref = image.asset?._ref ?? '';
  const match = REF.exec(ref);
  if (!match) throw new Error(`Référence d'image invalide : ${ref}`);
  const [, id, w, h, ext] = match;
  const width = Number(w);
  const height = Number(h);
  const params: string[] = [];
  const c = image.crop;
  if (c && (c.top || c.bottom || c.left || c.right)) {
    const rect = [
      Math.round(c.left * width),
      Math.round(c.top * height),
      Math.round(width * (1 - c.left - c.right)),
      Math.round(height * (1 - c.top - c.bottom)),
    ];
    params.push(`rect=${rect.join(',')}`);
  }
  params.push('w=2400', 'fit=max', 'auto=format');
  return `https://cdn.sanity.io/images/${cfg.projectId}/${cfg.dataset}/${id}-${w}x${h}.${ext}?${params.join('&')}`;
}

const isImage = (v: Doc): boolean => v._type === 'image' || (isRecord(v.asset) && typeof v.asset._ref === 'string');

/** Recursively convert a Sanity value into a plain content value. */
export function fromSanity(value: unknown, cfg: SanityConfig): unknown {
  if (Array.isArray(value)) {
    // Portable Text is consumed as-is by the article renderer.
    if (value.length > 0 && value.every((v) => isRecord(v) && v._type === 'block')) return value;
    return value.map((v) => fromSanity(v, cfg)).filter((v) => v !== undefined);
  }
  if (isRecord(value)) {
    if (isImage(value)) return isRecord(value.asset) ? imageUrl(value as SanityImage, cfg) : undefined;
    if (value._type === 'slug') return value.current;
    const out: Doc = {};
    for (const [key, v] of Object.entries(value)) {
      if (key.startsWith('_')) continue;
      const converted = fromSanity(v, cfg);
      if (converted !== undefined) out[key] = converted;
    }
    return out;
  }
  return value;
}

const orderOf = (v: unknown): number => (typeof v === 'number' ? v : Number.MAX_SAFE_INTEGER);

/**
 * Build every content export from the published documents. Throws (and so
 * fails the build, keeping the previous deployment live) rather than
 * publishing a site with missing content.
 *
 * `requiredFields` lists, per singleton type, the top-level fields the pages
 * read unconditionally (scripts/fetch-content.ts derives it from the Studio
 * schemas). Site settings always require all of their fields.
 */
export function assembleContent(allDocs: Doc[], cfg: SanityConfig, requiredFields: Record<string, string[]> = {}): ContentBundle {
  const docs = allDocs.filter((d) => !String(d._id).startsWith('drafts.'));
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const content: ContentBundle = {};

  for (const s of SINGLETONS) {
    const doc = byId.get(s.type);
    if (!doc) throw new Error(`Sanity : la page « ${s.title} » (${s.type}) est introuvable ou n'a jamais été publiée`);
    const plain = fromSanity(doc, cfg) as Doc;
    for (const field of s.fields ?? requiredFields[s.type] ?? []) {
      if (plain[field] === undefined) throw new Error(`Sanity : le champ « ${field} » est vide dans « ${s.title} »`);
    }
    if (s.export) {
      content[s.export] = plain;
    } else {
      for (const field of s.fields ?? []) content[field] = plain[field];
    }
  }

  for (const c of COLLECTIONS) {
    const items = docs.filter((d) => d._type === c.type);
    items.sort(
      c.ordering === 'order'
        ? (a, b) => orderOf(a.order) - orderOf(b.order)
        : (a, b) => String(b.publishedAt ?? '').localeCompare(String(a.publishedAt ?? ''))
    );
    const plainItems = items
      .map((d) => fromSanity(d, cfg) as Doc)
      .filter((p) => !c.idField || (typeof p[c.idField] === 'string' && p[c.idField] !== ''))
      .map((p, i) => {
        const { order: _order, publishedAt: _publishedAt, ...rest } = p;
        return c.derivedFields.includes('number') ? { ...rest, number: String(i + 1).padStart(2, '0') } : rest;
      });
    if (c.minItems && plainItems.length < c.minItems) {
      throw new Error(`Sanity : « ${c.title} » doit contenir au moins ${c.minItems} éléments publiés (${plainItems.length} trouvés) — les pages les lisent par position`);
    }
    content[c.export] = plainItems;
  }

  return content;
}
