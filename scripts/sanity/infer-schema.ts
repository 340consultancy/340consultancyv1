// One-off: derives Sanity schema definitions from the bundled content, so the
// Studio mirrors exactly the shapes the site already renders.
import { COLLECTIONS, SINGLETONS, type ContentBundle } from '../../src/lib/sanity/documents';

export type ArrayMember =
  | { type: 'string' }
  | { type: 'image'; options: { hotspot: true } }
  | { type: 'block'; styles: { title: string; value: string }[] }
  | { type: 'object'; name: 'item'; fields: FieldDef[]; preview?: { select: { title: string } } };

interface BaseField {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  /** '__NOW__' is emitted as a function returning the current date. */
  initialValue?: '__NOW__';
}

export type FieldDef =
  | (BaseField & { type: 'string'; options?: { list: string[] } })
  | (BaseField & { type: 'text' | 'number' | 'boolean' | 'datetime' })
  | (BaseField & { type: 'image'; options: { hotspot: true } })
  | (BaseField & { type: 'slug'; options: { source: string; maxLength: number } })
  | (BaseField & { type: 'object'; fields: FieldDef[] })
  | (BaseField & { type: 'array'; of: ArrayMember[] });

export interface DocumentSchema {
  name: string;
  title: string;
  type: 'document';
  fields: FieldDef[];
  preview?: { select: { title: string } };
}

export interface InferContext {
  assetKeys: Set<string>;
  iconNames: Set<string>;
  /** Keyed by path ("blogPost.body", "homePage.hero.title", "x.list[].y"); null drops the field. */
  overrides: Record<string, Omit<FieldDef, 'name'> | null>;
  /** Filled while inferring: every path detected as an image, for review. */
  imagePaths: string[];
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isEmpty = (v: unknown): boolean =>
  v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

const kindOf = (v: unknown): string => (Array.isArray(v) ? 'array' : typeof v);

export const humanize = (name: string): string => {
  const spaced = name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

function unionKeys(objects: Record<string, unknown>[]): string[] {
  const keys: string[] = [];
  for (const o of objects) for (const k of Object.keys(o)) if (!keys.includes(k)) keys.push(k);
  return keys;
}

function inferFields(objects: Record<string, unknown>[], path: string, ctx: InferContext): FieldDef[] {
  return unionKeys(objects)
    .map((k) => inferField(k, objects.map((o) => o[k]), `${path}.${k}`, ctx))
    .filter((f): f is FieldDef => f !== null);
}

export function inferField(name: string, samples: unknown[], path: string, ctx: InferContext): FieldDef | null {
  if (path in ctx.overrides) {
    const override = ctx.overrides[path];
    return override ? ({ ...override, name } as FieldDef) : null;
  }
  const title = humanize(name);
  const req = samples.length > 0 && samples.every((v) => !isEmpty(v)) ? { required: true as const } : {};
  const present = samples.filter((v) => v !== undefined && v !== null);
  if (present.length === 0) throw new Error(`${path} : aucune valeur d'exemple, ajoutez une entrée dans OVERRIDES`);
  const kinds = new Set(present.map(kindOf));
  if (kinds.size > 1) throw new Error(`${path} : types mélangés (${[...kinds].join(', ')})`);
  const kind = [...kinds][0];

  if (kind === 'string') {
    const strings = present as string[];
    const filled = strings.filter((s) => s !== '');
    if (filled.length > 0 && filled.every((s) => ctx.assetKeys.has(s))) {
      ctx.imagePaths.push(path);
      return { name, title, type: 'image', options: { hotspot: true }, ...req };
    }
    if (filled.length > 0 && filled.every((s) => ctx.iconNames.has(s))) {
      return { name, title, type: 'string', options: { list: [...ctx.iconNames] }, ...req };
    }
    const multiline = strings.some((s) => s.includes('\n') || s.length > 100);
    return { name, title, type: multiline ? 'text' : 'string', ...req };
  }
  if (kind === 'number') return { name, title, type: 'number', ...req };
  if (kind === 'boolean') return { name, title, type: 'boolean' };
  if (kind === 'object') {
    return { name, title, type: 'object', fields: inferFields(present as Record<string, unknown>[], path, ctx) };
  }
  if (kind === 'array') {
    const items = (present as unknown[][]).flatMap((a) => a);
    if (items.length === 0) throw new Error(`${path} : tableau toujours vide, ajoutez une entrée dans OVERRIDES`);
    const itemKinds = new Set(items.map(kindOf));
    if (itemKinds.has('array')) throw new Error(`${path} : tableaux imbriqués non pris en charge`);
    if (itemKinds.size > 1) throw new Error(`${path} : éléments de types mélangés (${[...itemKinds].join(', ')})`);
    const itemKind = [...itemKinds][0];
    if (itemKind === 'string') {
      if ((items as string[]).every((s) => ctx.assetKeys.has(s))) {
        ctx.imagePaths.push(`${path}[]`);
        return { name, title, type: 'array', of: [{ type: 'image', options: { hotspot: true } }], ...req };
      }
      return { name, title, type: 'array', of: [{ type: 'string' }], ...req };
    }
    if (itemKind === 'object') {
      const fields = inferFields(items as Record<string, unknown>[], `${path}[]`, ctx);
      const firstText = fields.find((f) => f.type === 'string' || f.type === 'text');
      return {
        name, title, type: 'array', ...req,
        of: [{ type: 'object', name: 'item', fields, ...(firstText ? { preview: { select: { title: firstText.name } } } : {}) }],
      };
    }
    throw new Error(`${path} : éléments de type ${itemKind} non pris en charge`);
  }
  throw new Error(`${path} : type ${kind} non pris en charge`);
}

export function buildSchemas(content: ContentBundle, ctx: InferContext): DocumentSchema[] {
  const schemas: DocumentSchema[] = [];

  for (const s of SINGLETONS) {
    const doc = s.export ? content[s.export] : Object.fromEntries((s.fields ?? []).map((f) => [f, content[f]]));
    if (!isRecord(doc)) throw new Error(`${s.type} : contenu introuvable`);
    const fields = Object.keys(doc)
      .map((k) => inferField(k, [doc[k]], `${s.type}.${k}`, ctx))
      .filter((f): f is FieldDef => f !== null);
    schemas.push({ name: s.type, title: s.title, type: 'document', fields });
  }

  for (const c of COLLECTIONS) {
    const items = content[c.export];
    if (!Array.isArray(items) || items.length === 0) throw new Error(`${c.type} : collection vide ou introuvable`);
    const records = items as Record<string, unknown>[];
    const fields: FieldDef[] = [];
    for (const k of unionKeys(records)) {
      if (c.derivedFields.includes(k)) continue;
      if (k === c.idField) {
        fields.push({ name: k, title: humanize(k), type: 'slug', options: { source: c.titleField, maxLength: 96 }, required: true });
        continue;
      }
      const field = inferField(k, records.map((r) => r[k]), `${c.type}.${k}`, ctx);
      if (field) fields.push(field);
    }
    fields.push(
      c.ordering === 'order'
        ? { name: 'order', title: 'Order', type: 'number', description: 'Position in the list (1 = first).' }
        : { name: 'publishedAt', title: 'Published at', type: 'datetime', required: true, initialValue: '__NOW__', description: 'Newest posts are listed first.' }
    );
    schemas.push({ name: c.type, title: c.title, type: 'document', fields, preview: { select: { title: c.titleField } } });
  }

  return schemas;
}

/** Serialize a schema as a TS object literal; `required` and `__NOW__` become code. */
export function toTs(value: unknown): string {
  return JSON.stringify(value, null, 2)
    .replace(/"required": true/g, 'validation: (Rule: any) => Rule.required()')
    .replace(/"initialValue": "__NOW__"/g, 'initialValue: () => new Date().toISOString()');
}
