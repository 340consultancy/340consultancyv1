// One-off: converts site content (bundled or merged from Strapi) into Sanity
// documents, guided by the Studio schemas so every value lands in the right
// field type (images uploaded, slugs wrapped, array items keyed).
import { COLLECTIONS, SINGLETONS, type ContentBundle } from '../../src/lib/sanity/documents';
import { textToPortableText } from '../../src/lib/sanity/portable-text';
import type { ArrayMember, DocumentSchema, FieldDef } from './infer-schema';

export interface ImageRef {
  _type: 'image';
  asset: { _type: 'reference'; _ref: string };
}
export type ResolveImage = (source: string) => Promise<ImageRef>;
export type SanityDoc = { _id: string; _type: string } & Record<string, unknown>;

interface Ctx {
  resolveImage: ResolveImage;
  warnings: string[];
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export const slugify = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

async function convertObject(fields: FieldDef[], value: unknown, path: string, ctx: Ctx): Promise<Record<string, unknown>> {
  if (!isRecord(value)) {
    ctx.warnings.push(`${path} : objet attendu, reçu ${Array.isArray(value) ? 'tableau' : typeof value}`);
    return {};
  }
  const known = new Set(fields.map((f) => f.name));
  for (const key of Object.keys(value)) {
    if (!known.has(key)) ctx.warnings.push(`${path}.${key} : champ absent du schéma, ignoré`);
  }
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    const converted = await convertField(field, value[field.name], `${path}.${field.name}`, ctx);
    if (converted !== undefined) out[field.name] = converted;
  }
  return out;
}

async function convertField(def: FieldDef, value: unknown, path: string, ctx: Ctx): Promise<unknown> {
  if (value === undefined || value === null) return undefined;
  switch (def.type) {
    case 'image':
      return typeof value === 'string' && value !== '' ? ctx.resolveImage(value) : undefined;
    case 'slug':
      return { _type: 'slug', current: String(value) };
    case 'object':
      return convertObject(def.fields, value, path, ctx);
    case 'array':
      return convertArray(def.of[0], value, path, ctx);
    default:
      return value;
  }
}

async function convertArray(member: ArrayMember, value: unknown, path: string, ctx: Ctx): Promise<unknown> {
  if (member.type === 'block') return typeof value === 'string' ? textToPortableText(value) : value;
  if (!Array.isArray(value)) {
    ctx.warnings.push(`${path} : tableau attendu`);
    return undefined;
  }
  const out: unknown[] = [];
  for (const [i, item] of value.entries()) {
    const _key = `k${i}`;
    if (member.type === 'string') {
      out.push(item);
    } else if (member.type === 'image') {
      if (typeof item === 'string' && item !== '') out.push({ _key, ...(await ctx.resolveImage(item)) });
    } else {
      out.push({ _key, _type: member.name, ...(await convertObject(member.fields, item, `${path}[${i}]`, ctx)) });
    }
  }
  return out;
}

export async function toSanityDocs(
  content: ContentBundle,
  schemas: DocumentSchema[],
  resolveImage: ResolveImage,
  now: Date = new Date()
): Promise<{ docs: SanityDoc[]; warnings: string[] }> {
  const ctx: Ctx = { resolveImage, warnings: [] };
  const byName = new Map(schemas.map((s) => [s.name, s]));
  const schemaOf = (type: string): DocumentSchema => {
    const schema = byName.get(type);
    if (!schema) throw new Error(`Schéma Sanity introuvable : ${type}`);
    return schema;
  };
  const docs: SanityDoc[] = [];

  for (const s of SINGLETONS) {
    const value = s.export ? content[s.export] : Object.fromEntries((s.fields ?? []).map((f) => [f, content[f]]));
    docs.push({ _id: s.type, _type: s.type, ...(await convertObject(schemaOf(s.type).fields, value, s.type, ctx)) });
  }

  for (const c of COLLECTIONS) {
    const items = content[c.export];
    if (!Array.isArray(items)) throw new Error(`Collection introuvable dans le contenu : ${c.export}`);
    const schema = schemaOf(c.type);
    for (const [i, raw] of items.entries()) {
      const item = { ...(raw as Record<string, unknown>) };
      for (const derived of c.derivedFields) delete item[derived];
      const body = await convertObject(schema.fields, item, `${c.type}[${i}]`, ctx);
      const idValue = c.idField ? String(item[c.idField] ?? '') : '';
      const _id = `${c.type}-${idValue ? slugify(idValue) : i + 1}`;
      const ordering =
        c.ordering === 'order'
          ? { order: i + 1 }
          : { publishedAt: new Date(now.getTime() - i * 60_000).toISOString() };
      docs.push({ _id, _type: c.type, ...body, ...ordering });
    }
  }

  return { docs, warnings: ctx.warnings };
}
