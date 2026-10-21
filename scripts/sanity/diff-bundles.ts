// One-off: lists every value the site showed from Strapi that is missing in
// Sanity. Walks only the fields the site uses (the bundled content's shape).
type Obj = Record<string, unknown>;

const isRecord = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const isEmpty = (v: unknown): boolean =>
  v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

/** Union of the fields of every array item, so optional fields are checked too. */
function itemShape(items: unknown[]): unknown {
  const objects = items.filter(isRecord);
  if (objects.length === 0) return items[0];
  const out: Obj = {};
  for (const o of objects) for (const [k, v] of Object.entries(o)) if (!(k in out) || isEmpty(out[k])) out[k] = v;
  return out;
}

export function diffBundles(shape: unknown, source: unknown, target: unknown, path = ''): string[] {
  if (Array.isArray(shape)) {
    if (!Array.isArray(source)) return [];
    const tgt = Array.isArray(target) ? target : [];
    const problems: string[] = [];
    if (tgt.length < source.length) problems.push(`${path} : ${source.length} élément(s) côté Strapi, ${tgt.length} côté Sanity`);
    const inner = itemShape(shape);
    source.forEach((item, i) => problems.push(...diffBundles(inner, item, tgt[i], `${path}[${i}]`)));
    return problems;
  }
  if (isRecord(shape)) {
    if (!isRecord(source)) return [];
    const tgt = isRecord(target) ? target : {};
    return Object.keys(shape).flatMap((k) => diffBundles(shape[k], source[k], tgt[k], path ? `${path}.${k}` : k));
  }
  return !isEmpty(source) && isEmpty(target) ? [`${path} : rempli côté Strapi, vide côté Sanity`] : [];
}
