# Simplification de l'infra (Strapi/Railway → Sanity) — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer Strapi + Postgres + Railway par Sanity (contenu lu au build) et des fonctions Vercel pour les formulaires, sans modifier l'affichage des pages.

**Architecture:** Les pages continuent d'importer des objets simples depuis `@/content`. Au build, `scripts/fetch-content.ts` lit Sanity, transforme les documents dans les formes TypeScript existantes et écrit `src/content/generated/content.json`, que les modules de `src/content/**` ré-exportent. Les schémas Sanity sont générés une fois à partir du contenu actuel, puis maintenus à la main dans `studio/`. Les formulaires passent par `api/contact.ts` (Resend) et `api/newsletter.ts` (Brevo).

**Tech Stack:** Vite 5 + React 18 + TypeScript, Vitest 3, vite-node 3, Sanity (Studio hébergé + `@sanity/client`), `@portabletext/react`, fonctions Vercel (`@vercel/node`), zod, Resend et Brevo via `fetch`.

**Spec:** `docs/superpowers/specs/2026-10-21-simplification-infra-sanity-design.md`

> **Mise à jour 2026-10-21 (après exécution des tâches 0–14)** : le formulaire de contact envoie l'email via **Brevo** (API transactionnelle) au lieu de Resend, à la demande de l'utilisateur. Variables : `BREVO_API_KEY`, `BREVO_LIST_ID`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (expéditeur validé dans Brevo), `CONTACT_FROM_NAME`. Les mentions de Resend ci-dessous sont caduques ; à la tâche 15, l'étape « Resend » devient « valider l'expéditeur dans Brevo → Senders, domains & dedicated IPs (idéalement authentifier le domaine 340consultancy.com) ». Les imports en `production` exigent `--overwrite` et refusent `--source bundled`.

## Global Constraints

- Le site construit ne dépend jamais de Sanity à l'exécution : aucune requête Sanity depuis le navigateur.
- Un échec de lecture de Sanity au build fait échouer le build (code de sortie ≠ 0) ; Vercel garde alors la version en ligne.
- Aucun secret dans une variable `VITE_*`. Secrets serveur : `RESEND_API_KEY`, `BREVO_API_KEY`, `SANITY_WRITE_TOKEN`.
- Variables : `SANITY_PROJECT_ID`, `SANITY_DATASET` (build) ; `VITE_SANITY_STUDIO_URL` (redirection `/admin`) ; `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `BREVO_API_KEY`, `BREVO_LIST_ID` (formulaires) ; `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET` (Studio).
- Version d'API Sanity : `2025-01-01`, partout.
- La source de vérité du contenu pour la migration de production est Strapi (`GET {STRAPI}/api/site-content`), fusionné sur le contenu embarqué exactement comme le fait le site aujourd'hui.
- Les noms de champs Sanity sont ceux des types TypeScript actuels (sauf `BlogArticle.date` → `category`).
- `BlogArticle.number` n'est pas stocké : il est recalculé d'après la position (`01`, `02`, …), comme aujourd'hui.
- Tri : `testimonial`, `service`, `caseStudy` par `order` croissant ; `blogPost` par `publishedAt` décroissant.
- Tout le travail se fait sur la branche `simplify/sanity-migration`, sauf la tâche 0 (branche `hotfix/disable-imgfmtconv` depuis `main`).
- Ne jamais pousser (`git push`) ni déployer sans l'accord explicite de l'utilisateur.
- Les commentaires de code sont en anglais (convention du repo) ; les messages affichés par les scripts sont en français.
- Chaque commit se termine par la ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Document unique jamais publié ou dataset vide** : le build doit échouer avec un message clair, pas publier un site sans contenu (test dans la tâche 6).
2. **Brouillon en cours dans le Studio** : un document `drafts.*` ne doit jamais apparaître sur le site (test dans la tâche 6).
3. **Article publié sans slug** : il est ignoré, aucun lien `/blog/undefined` (test dans la tâche 6).
4. **Abonné déjà présent dans Brevo** : réponse 204 de Brevo = succès, pas une erreur affichée au visiteur (test dans la tâche 12).
5. **Robot qui remplit le champ piège, email invalide ou variables manquantes** : aucun email envoyé, statut HTTP adapté (tests dans la tâche 12).

---

## Carte des fichiers

| Fichier | Responsabilité |
|---|---|
| `src/lib/sanity/documents.ts` | Correspondance exports de `@/content` ↔ documents Sanity (seule source de vérité) |
| `src/lib/sanity/portable-text.ts` | Conversion texte brut (`## `) → Portable Text |
| `src/lib/sanity/from-sanity.ts` | Documents Sanity → formes du site (URL d'images, slugs, tri, numéros) |
| `scripts/sanity/cli.ts` | Aides communes aux scripts (env, arguments, client Sanity) |
| `scripts/sanity/infer-schema.ts` | Déduction des schémas Sanity à partir du contenu (jetable) |
| `scripts/sanity/to-sanity.ts` | Formes du site → documents Sanity, guidé par les schémas (jetable) |
| `scripts/sanity/strapi-merge.ts` | Fusion Strapi → contenu embarqué, portage de `cmsContent.ts` (jetable) |
| `scripts/sanity/diff-bundles.ts` | Comparaison Strapi ↔ Sanity après migration (jetable) |
| `scripts/snapshot-bundled-content.ts` | Instantané du contenu embarqué → `src/test/fixtures/bundled-content.json` (jetable) |
| `scripts/generate-sanity-schemas.ts` | Écrit `studio/schemaTypes/*.ts` (jetable) |
| `scripts/import-to-sanity.ts` | Import du contenu (embarqué ou Strapi) dans un dataset (jetable) |
| `scripts/verify-migration.ts` | Vérifie la migration de production (jetable) |
| `scripts/fetch-content.ts` | Prebuild : Sanity → `src/content/generated/content.json` |
| `src/content/generated.ts` | Point d'entrée typé du JSON généré |
| `studio/` | Sanity Studio (config, structure, schémas) |
| `api/_lib/brevo.ts`, `api/_lib/contact.ts`, `api/_lib/newsletter.ts` | Logique des formulaires, testable |
| `api/contact.ts`, `api/newsletter.ts` | Fonctions Vercel minces |
| `src/lib/forms.ts` | Envoi des formulaires depuis le navigateur |
| `src/components/ArticleBody.tsx` | Rendu Portable Text du corps des articles |
| `src/components/AdminRedirect.tsx` | `/admin` → Studio |

« Jetable » : supprimé à la tâche 16, une fois la production migrée.

---

### Task 0: Correctif d'urgence — désactiver `imgfmtconv` (branche séparée)

Strapi plante à chaque upload d'image parce que `strapi-plugin-imgfmtconv` embarque `sharp` 0.32.6 à côté du `sharp` 0.33.5 de Strapi. Désactiver le plugin évite de charger la seconde copie de `libvips`.

**Files:**
- Modify: `cms/config/plugins.js` (bloc `imgfmtconv`)

- [ ] **Step 1: Créer la branche depuis `main`**

```bash
cd C:/Users/etien/Desktop/340consultancyv1-git
git switch main
git switch -c hotfix/disable-imgfmtconv
```

- [ ] **Step 2: Désactiver le plugin**

Dans `cms/config/plugins.js`, remplacer :

```js
  // Image format converter (strapi-plugin-imgfmtconv) — auto-converts uploads
  // to WebP/AVIF and offers bulk conversion of existing media in the admin.
  imgfmtconv: {
    enabled: true,
  },
```

par :

```js
  // Image format converter (strapi-plugin-imgfmtconv) — DISABLED 2026-10-21.
  // It bundles sharp 0.32 next to Strapi's own sharp 0.33: two libvips copies
  // in one process corrupt memory and crash Node on every image upload
  // (Segmentation fault / munmap_chunk(): invalid pointer).
  imgfmtconv: {
    enabled: false,
  },
```

- [ ] **Step 3: Vérifier la configuration**

Run: `node -e "const c=require('./cms/config/plugins.js')({env:(k,d)=>d});console.log(JSON.stringify(c.imgfmtconv))"`
Expected: `{"enabled":false}`

- [ ] **Step 4: Commit**

```bash
git add cms/config/plugins.js
git commit -m "fix(cms): disable imgfmtconv, its bundled sharp crashes Strapi on upload

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: ⏸ Demander à l'utilisateur l'autorisation de pousser**

Ne pas pousser sans accord. Une fois l'accord donné : `git push -u origin hotfix/disable-imgfmtconv`, puis l'utilisateur fusionne dans `main` (Railway redéploie automatiquement quand ses builds sont rétablis). Revenir ensuite sur la branche de travail : `git switch simplify/sanity-migration`.

---

### Task 1: Renommer `BlogArticle.date` en `category`

Le champ `date` contient en réalité la catégorie (« LINKEDIN TIPS », « Coming soon »). On le renomme avant de figer l'instantané du contenu.

**Files:**
- Modify: `src/content/collections/blog.ts` (interface `BlogArticle` + chaque entrée de `blogArticles`)
- Modify: `src/components/BlogSection.tsx:29,59,88,197`
- Modify: `src/pages/Blog.tsx:69`
- Modify: `src/pages/BlogArticlePage.tsx:91,164`
- Test: `src/content/blog.test.ts`

**Interfaces:**
- Produces: `BlogArticle.category: string` (remplace `date`).

- [ ] **Step 1: Écrire le test qui échoue**

```ts
// src/content/blog.test.ts
import { describe, it, expect } from 'vitest';
import { blogArticles } from '@/content';

describe('blogArticles', () => {
  it('stores the eyebrow in `category`, not in a misnamed `date` field', () => {
    expect(blogArticles.length).toBeGreaterThan(0);
    for (const article of blogArticles) {
      expect(article).not.toHaveProperty('date');
      expect(typeof article.category).toBe('string');
      expect(article.category.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run: `npx vitest run src/content/blog.test.ts`
Expected: FAIL (`expected { …, date: 'LINKEDIN TIPS' } not to have property "date"`)

- [ ] **Step 3: Renommer le champ**

Dans `src/content/collections/blog.ts`, dans l'interface `BlogArticle`, remplacer :

```ts
  /** Category eyebrow shown above the title (or "Coming soon"). */
  date: string;
```

par :

```ts
  /** Category eyebrow shown above the title (or "Coming soon"). */
  category: string;
```

Puis, dans le tableau `blogArticles` uniquement, renommer chaque clé `date:` en `category:` (une par article ; ne pas toucher `publishedDate`).

Dans les composants, remplacer `article.date` par `article.category` et `other.date` par `other.category` :
- `src/components/BlogSection.tsx` lignes 29, 59, 88, 197
- `src/pages/Blog.tsx` ligne 69
- `src/pages/BlogArticlePage.tsx` lignes 91, 164

Vérifier qu'il ne reste rien : `grep -rnE "(article|other)\.date\b" src` ne doit rien afficher.

- [ ] **Step 4: Lancer le test pour le voir passer**

Run: `npx vitest run src/content/blog.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/content/collections/blog.ts src/content/blog.test.ts src/components/BlogSection.tsx src/pages/Blog.tsx src/pages/BlogArticlePage.tsx
git commit -m "refactor(content): rename BlogArticle.date to category

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Outillage, carte des documents et instantané du contenu

**Files:**
- Modify: `package.json` (dépendances, scripts)
- Modify: `vitest.config.ts` (`include`)
- Modify: `tsconfig.app.json` (`resolveJsonModule`)
- Modify: `.gitignore`, `eslint.config.js`
- Create: `src/lib/sanity/documents.ts`
- Create: `scripts/sanity/cli.ts`
- Create: `scripts/snapshot-bundled-content.ts`
- Create (généré) : `src/test/fixtures/bundled-content.json`
- Test: `src/lib/sanity/documents.test.ts`

**Interfaces:**
- Produces (`src/lib/sanity/documents.ts`) :
  - `type ContentBundle = Record<string, unknown>`
  - `interface SingletonDef { type: string; title: string; export?: string; fields?: string[] }`
  - `interface CollectionDef { type: string; title: string; export: string; idField: string | null; titleField: string; ordering: 'order' | 'publishedAt'; derivedFields: string[] }`
  - `SINGLETONS: SingletonDef[]`, `COLLECTIONS: CollectionDef[]`, `ALL_EXPORTS: string[]`, `CONTENT_TYPES: string[]`
- Produces (`scripts/sanity/cli.ts`) : `loadDotEnv(): void`, `requireEnv(name: string): string`, `argValue(name: string): string | undefined`, `SANITY_API_VERSION = '2025-01-01'`, `sanityReadClient(projectId: string, dataset: string): SanityClient`
- Produces (fixture) : `{ content: ContentBundle; assetKeys: string[]; iconNames: string[]; assetFiles: Record<string, string> }`

- [ ] **Step 1: Installer les dépendances**

```bash
npm install @sanity/client @portabletext/react
npm install -D vite-node@^3 @vercel/node
```

- [ ] **Step 2: Élargir Vitest et TypeScript**

Dans `vitest.config.ts`, remplacer :

```ts
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
```

par :

```ts
    include: ["src/**/*.{test,spec}.{ts,tsx}", "scripts/**/*.test.ts", "api/**/*.test.ts"],
```

Dans `tsconfig.app.json`, ajouter dans `compilerOptions`, après `"moduleResolution": "bundler",` :

```json
    "resolveJsonModule": true,
```

- [ ] **Step 3: Ignorer les fichiers générés**

Ajouter à la fin de `.gitignore` :

```
# Sanity: content generated at build time, Studio build output
src/content/generated/
studio/node_modules
studio/dist
studio/.sanity
```

Dans `eslint.config.js`, remplacer `{ ignores: ["dist"] },` par :

```js
  { ignores: ["dist", "studio/dist", "studio/.sanity", "src/content/generated"] },
```

- [ ] **Step 4: Écrire le test de la carte des documents (échoue : module absent)**

```ts
// src/lib/sanity/documents.test.ts
import { describe, it, expect } from 'vitest';
import { ALL_EXPORTS, CONTENT_TYPES, COLLECTIONS, SINGLETONS } from './documents';

describe('document map', () => {
  it('covers the 24 content exports exactly once', () => {
    expect(ALL_EXPORTS).toHaveLength(24);
    expect(new Set(ALL_EXPORTS).size).toBe(24);
  });

  it('declares 13 Sanity document types', () => {
    expect(CONTENT_TYPES).toHaveLength(13);
    expect(SINGLETONS).toHaveLength(9);
    expect(COLLECTIONS).toHaveLength(4);
  });

  it('gives every singleton either an export or a field list, never both', () => {
    for (const s of SINGLETONS) {
      expect(Boolean(s.export) !== Boolean(s.fields)).toBe(true);
    }
  });
});
```

Run: `npx vitest run src/lib/sanity/documents.test.ts`
Expected: FAIL (`Failed to resolve import "./documents"`)

- [ ] **Step 5: Écrire la carte des documents**

```ts
// src/lib/sanity/documents.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for how the site's content exports (src/content/**)
// map onto Sanity documents. Used by the build-time fetch, the schema
// generator and the import scripts.
// ─────────────────────────────────────────────────────────────────────────────

/** Every content export, keyed by its export name in "@/content". */
export type ContentBundle = Record<string, unknown>;

/**
 * A document that exists exactly once. Either its whole body IS one content
 * export (`export`), or each listed export is one top-level field (`fields`).
 */
export interface SingletonDef {
  type: string;
  title: string;
  export?: string;
  fields?: string[];
}

/** A repeatable document type mapped onto one array export. */
export interface CollectionDef {
  type: string;
  title: string;
  export: string;
  /** Field used in URLs, stored as a Sanity slug (null: no route). */
  idField: string | null;
  /** Field shown as the document title in the Studio lists. */
  titleField: string;
  ordering: 'order' | 'publishedAt';
  /** Fields recomputed from the display position, never stored. */
  derivedFields: string[];
}

export const SINGLETONS: SingletonDef[] = [
  { type: 'homePage', title: 'Home', export: 'home' },
  { type: 'aboutPage', title: 'About us', export: 'aboutUs' },
  { type: 'servicesPage', title: 'Services', export: 'servicesPage' },
  { type: 'workPage', title: 'Our work', export: 'work' },
  { type: 'up2datePage', title: 'Up2date', export: 'up2date' },
  { type: 'contactPage', title: 'Contact', export: 'contact' },
  { type: 'privacyPage', title: 'Privacy', export: 'privacy' },
  { type: 'notFoundPage', title: '404 page', export: 'notFound' },
  {
    type: 'siteSettings',
    title: 'Site settings',
    fields: [
      'nav', 'footer', 'cta', 'testimonialsCta', 'showcase', 'blogSection', 'blogPage',
      'serviceDetailLabels', 'caseStudyLabels', 'managementAddOns', 'strategyAddOns', 'igPostUrls',
    ],
  },
];

export const COLLECTIONS: CollectionDef[] = [
  { type: 'testimonial', title: 'Testimonials', export: 'testimonials', idField: null, titleField: 'name', ordering: 'order', derivedFields: [] },
  { type: 'service', title: 'Services', export: 'services', idField: 'key', titleField: 'label', ordering: 'order', derivedFields: [] },
  { type: 'caseStudy', title: 'Case studies', export: 'caseStudies', idField: 'slug', titleField: 'client', ordering: 'order', derivedFields: [] },
  { type: 'blogPost', title: 'Blog posts', export: 'blogArticles', idField: 'id', titleField: 'title', ordering: 'publishedAt', derivedFields: ['number'] },
];

export const ALL_EXPORTS: string[] = [
  ...SINGLETONS.flatMap((s) => (s.export ? [s.export] : s.fields ?? [])),
  ...COLLECTIONS.map((c) => c.export),
];

export const CONTENT_TYPES: string[] = [
  ...SINGLETONS.map((s) => s.type),
  ...COLLECTIONS.map((c) => c.type),
];
```

Run: `npx vitest run src/lib/sanity/documents.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Écrire les aides communes aux scripts**

```ts
// scripts/sanity/cli.ts
import { createClient, type SanityClient } from '@sanity/client';

export const SANITY_API_VERSION = '2025-01-01';

/** Load ./.env into process.env when present (local runs). On Vercel the
 *  variables already live in the real environment. */
export function loadDotEnv(): void {
  try {
    process.loadEnvFile('.env');
  } catch {
    // no .env file: rely on the real environment
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variable d'environnement manquante : ${name} (voir .env.example)`);
  return value;
}

/** `--name value` from the command line. */
export function argValue(name: string): string | undefined {
  const args = process.argv.slice(2);
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

/** Read-only client: published documents only, no token (public dataset). */
export function sanityReadClient(projectId: string, dataset: string): SanityClient {
  return createClient({ projectId, dataset, apiVersion: SANITY_API_VERSION, useCdn: false, perspective: 'published' });
}
```

- [ ] **Step 7: Écrire le script d'instantané**

```ts
// scripts/snapshot-bundled-content.ts
// One-off: freezes the bundled content of src/content/** into a JSON fixture.
// The fixture drives the Sanity schema generator, the import of the
// development dataset and the round-trip tests.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import * as content from '@/content';
import { assets, iconRegistry } from '@/content';
import { ALL_EXPORTS } from '@/lib/sanity/documents';

const bundle: Record<string, unknown> = {};
for (const name of ALL_EXPORTS) {
  const value = (content as Record<string, unknown>)[name];
  if (value === undefined) throw new Error(`Export introuvable dans @/content : ${name}`);
  bundle[name] = value;
}

// Vite resolves image imports to "/src/assets/<file>" in vite-node.
const assetFiles: Record<string, string> = {};
for (const [key, url] of Object.entries(assets)) {
  const file = String(url).replace(/^\/@fs\//, '').replace(/^\//, '');
  if (!existsSync(file)) throw new Error(`Fichier image introuvable pour « ${key} » : ${file}`);
  assetFiles[key] = file;
}

const fixture = {
  content: JSON.parse(JSON.stringify(bundle)),
  assetKeys: Object.keys(assets),
  iconNames: Object.keys(iconRegistry),
  assetFiles,
};

mkdirSync('src/test/fixtures', { recursive: true });
writeFileSync('src/test/fixtures/bundled-content.json', JSON.stringify(fixture, null, 2) + '\n');
console.log(`Instantané écrit : ${ALL_EXPORTS.length} exports, ${Object.keys(assets).length} images`);
```

- [ ] **Step 8: Ajouter les scripts npm**

Dans `package.json`, dans `"scripts"`, supprimer `"cms:seed-dump"` et `"cms:verify"`, et ajouter :

```json
    "sanity:snapshot": "vite-node scripts/snapshot-bundled-content.ts",
    "sanity:schemas": "vite-node scripts/generate-sanity-schemas.ts",
    "sanity:import": "vite-node scripts/import-to-sanity.ts",
    "sanity:verify": "vite-node scripts/verify-migration.ts",
```

- [ ] **Step 9: Générer l'instantané et le contrôler**

Run: `npm run sanity:snapshot`
Expected: `Instantané écrit : 24 exports, 33 images` (33 = nombre d'entrées de `assets` dans `src/content/assets.ts`).

Contrôle : `node -e "const f=require('./src/test/fixtures/bundled-content.json');console.log(f.content.blogArticles[0].category, f.content.blogArticles.map(a=>a.number).join(','))"`
Expected : une catégorie non vide, puis des numéros `01,02,…` dans l'ordre. S'ils ne sont pas consécutifs dans l'ordre, le noter : la tâche 7 devra en tenir compte.

- [ ] **Step 10: Lancer toute la suite**

Run: `npx vitest run`
Expected: PASS (tous les tests)

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tsconfig.app.json .gitignore eslint.config.js src/lib/sanity scripts src/test/fixtures
git commit -m "chore(sanity): tooling, document map and bundled content snapshot

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Générateur de schémas Sanity

**Files:**
- Create: `scripts/sanity/infer-schema.ts`
- Create: `scripts/generate-sanity-schemas.ts`
- Create (généré) : `studio/schemaTypes/*.ts`
- Test: `scripts/sanity/infer-schema.test.ts`

**Interfaces:**
- Consumes: `SINGLETONS`, `COLLECTIONS`, `ContentBundle` (tâche 2), fixture (tâche 2).
- Produces (`scripts/sanity/infer-schema.ts`) :
  - `type ArrayMember`, `type FieldDef`, `interface DocumentSchema { name: string; title: string; type: 'document'; fields: FieldDef[]; preview?: { select: { title: string } } }`
  - `interface InferContext { assetKeys: Set<string>; iconNames: Set<string>; overrides: Record<string, Omit<FieldDef, 'name'> | null>; imagePaths: string[] }`
  - `humanize(name: string): string`, `inferField(name, samples, path, ctx): FieldDef | null`, `buildSchemas(content, ctx): DocumentSchema[]`, `toTs(value: unknown): string`
- Produces (`studio/schemaTypes/index.ts`) : `schemaTypes` (tableau de `DocumentSchema`), `SINGLETONS: {type,title}[]`, `COLLECTIONS: {type,title,ordering}[]`, `SINGLETON_TYPES: string[]`.

- [ ] **Step 1: Écrire les tests qui échouent**

```ts
// scripts/sanity/infer-schema.test.ts
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
```

Run: `npx vitest run scripts/sanity/infer-schema.test.ts`
Expected: FAIL (`Failed to resolve import "./infer-schema"`)

- [ ] **Step 2: Écrire `infer-schema.ts`**

```ts
// scripts/sanity/infer-schema.ts
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
```

Run: `npx vitest run scripts/sanity/infer-schema.test.ts`
Expected: PASS

- [ ] **Step 3: Écrire le script de génération**

```ts
// scripts/generate-sanity-schemas.ts
// One-off: writes studio/schemaTypes/*.ts from the bundled content snapshot.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { buildSchemas, toTs, type InferContext } from './sanity/infer-schema';
import { COLLECTIONS, SINGLETONS } from '../src/lib/sanity/documents';

const fixture = JSON.parse(readFileSync('src/test/fixtures/bundled-content.json', 'utf8'));

const OVERRIDES: InferContext['overrides'] = {
  'blogPost.body': {
    title: 'Body',
    type: 'array',
    required: true,
    of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading', value: 'h2' }] }],
  },
};

const ctx: InferContext = {
  assetKeys: new Set(fixture.assetKeys),
  iconNames: new Set(fixture.iconNames),
  overrides: OVERRIDES,
  imagePaths: [],
};
const schemas = buildSchemas(fixture.content, ctx);

const header =
  '// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.\n' +
  '// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.\n\n';

mkdirSync('studio/schemaTypes', { recursive: true });
for (const s of schemas) {
  writeFileSync(`studio/schemaTypes/${s.name}.ts`, `${header}export default ${toTs(s)};\n`);
}

const index =
  header +
  schemas.map((s) => `import ${s.name} from './${s.name}';`).join('\n') +
  `\n\nexport const schemaTypes = [${schemas.map((s) => s.name).join(', ')}];\n\n` +
  `export const SINGLETONS = ${JSON.stringify(SINGLETONS.map(({ type, title }) => ({ type, title })), null, 2)};\n\n` +
  `export const COLLECTIONS = ${JSON.stringify(COLLECTIONS.map(({ type, title, ordering }) => ({ type, title, ordering })), null, 2)};\n\n` +
  'export const SINGLETON_TYPES: string[] = SINGLETONS.map((s) => s.type);\n';
writeFileSync('studio/schemaTypes/index.ts', index);

console.log(`${schemas.length} schémas écrits dans studio/schemaTypes/`);
console.log('Champs détectés comme images (à comparer aux champs typés AssetKey / ImageRef) :');
for (const p of ctx.imagePaths) console.log(`  ${p}`);
```

- [ ] **Step 4: Générer les schémas**

Run: `npm run sanity:schemas`
Expected : `13 schémas écrits dans studio/schemaTypes/`, puis la liste des champs image.

Si le script s'arrête sur `… : aucune valeur d'exemple` ou `… : tableau toujours vide`, ajouter pour ce chemin une entrée dans `OVERRIDES` avec le type réel lu dans l'interface TypeScript correspondante (par exemple `'caseStudy.gallery': { title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }`), puis relancer.

- [ ] **Step 5: Contrôler la détection des images**

Pour chaque chemin listé, vérifier dans `src/content/**` que le champ est typé `AssetKey`, `ImageRef` ou `AssetKey[]`. Puis lister les champs typés image qui manqueraient : `grep -rnE ":\s*(AssetKey|ImageRef)(\[\])?|\[AssetKey, AssetKey\]" src/content --include=*.ts`. Chaque champ de cette liste doit figurer parmi les chemins détectés. Un écart (un texte égal à un nom d'image, par exemple `'up2date'`) se corrige par une entrée dans `OVERRIDES` (`{ title: '…', type: 'string' }`), puis on relance l'étape 4.

- [ ] **Step 6: Lancer toute la suite**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add scripts/sanity/infer-schema.ts scripts/sanity/infer-schema.test.ts scripts/generate-sanity-schemas.ts studio/schemaTypes
git commit -m "feat(sanity): generate Studio schemas from the bundled content

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Sanity Studio

**Files:**
- Create: `studio/package.json`, `studio/tsconfig.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/structure.ts`, `studio/.env.example`

**Interfaces:**
- Consumes: `schemaTypes`, `SINGLETONS`, `COLLECTIONS`, `SINGLETON_TYPES` depuis `studio/schemaTypes/index.ts` (tâche 3).

- [ ] **Step 1: Créer le paquet du Studio**

```json
// studio/package.json
{
  "name": "340-studio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy",
    "validate": "sanity schema validate"
  }
}
```

(Le commentaire `// studio/package.json` n'est qu'un repère : ne pas l'écrire dans le fichier JSON.)

Puis :

```bash
cd studio
npm install sanity@latest @sanity/vision@latest react@^19 react-dom@^19 styled-components@^6
npm install -D typescript@^5
cd ..
```

- [ ] **Step 2: Configuration TypeScript et variables**

```json
// studio/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": false,
    "skipLibCheck": true,
    "noEmit": true,
    "isolatedModules": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

```
# studio/.env.example — copy to studio/.env
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
```

- [ ] **Step 3: Structure du Studio (menu « Pages » + collections triées)**

```ts
// studio/structure.ts
import type { StructureResolver } from 'sanity/structure';
import { COLLECTIONS, SINGLETONS } from './schemaTypes';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items(
              SINGLETONS.map((s) =>
                S.listItem().title(s.title).id(s.type).child(S.document().schemaType(s.type).documentId(s.type))
              )
            )
        ),
      S.divider(),
      ...COLLECTIONS.map((c) =>
        S.listItem()
          .title(c.title)
          .id(c.type)
          .child(
            S.documentTypeList(c.type)
              .title(c.title)
              .defaultOrdering(
                c.ordering === 'order'
                  ? [{ field: 'order', direction: 'asc' }]
                  : [{ field: 'publishedAt', direction: 'desc' }]
              )
          )
      ),
    ]);
```

- [ ] **Step 4: Configuration du Studio (pages uniques non créables ni supprimables)**

```ts
// studio/sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, SINGLETON_TYPES } from './schemaTypes';
import { structure } from './structure';

const singletons = new Set(SINGLETON_TYPES);
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: '340 Consultancy',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes as any,
    // Pages exist exactly once: no "create new" entry for them.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    // Pages cannot be duplicated or deleted, only edited and published.
    actions: (input, context) =>
      singletons.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
});
```

```ts
// studio/sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
});
```

`@sanity/vision` est installé pour un usage ponctuel en local ; ne pas l'ajouter aux `plugins` (YAGNI).

- [ ] **Step 5: Valider les schémas et construire le Studio**

Run (depuis `studio/`) : `SANITY_STUDIO_PROJECT_ID=placeholder1 npx sanity schema validate`
Expected : aucune erreur (les avertissements sont acceptables, les lire).

Run (depuis `studio/`) : `SANITY_STUDIO_PROJECT_ID=placeholder1 npx sanity build`
Expected : `Build Sanity Studio` terminé, dossier `studio/dist/` créé.

Sous PowerShell, remplacer le préfixe par `$env:SANITY_STUDIO_PROJECT_ID='placeholder1';` avant la commande.

- [ ] **Step 6: Commit**

```bash
git add studio/package.json studio/package-lock.json studio/tsconfig.json studio/sanity.config.ts studio/sanity.cli.ts studio/structure.ts
git add -f studio/.env.example
git commit -m "feat(studio): Sanity Studio with singleton pages and ordered collections

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(`-f` : la règle `.env*` du `.gitignore` ignore aussi les fichiers d'exemple non suivis.)

---

### Task 5: Conversion du corps des articles en Portable Text

**Files:**
- Create: `src/lib/sanity/portable-text.ts`
- Test: `src/lib/sanity/portable-text.test.ts`

**Interfaces:**
- Produces: `interface PtSpan { _type: 'span'; _key: string; text: string; marks: string[] }`, `interface PtBlock { _type: 'block'; _key: string; style: string; markDefs: unknown[]; children: PtSpan[] }`, `textToPortableText(body: string): PtBlock[]`

- [ ] **Step 1: Écrire le test qui échoue**

```ts
// src/lib/sanity/portable-text.test.ts
import { describe, it, expect } from 'vitest';
import { textToPortableText } from './portable-text';

const texts = (body: string) => textToPortableText(body).map((b) => [b.style, b.children[0].text]);

describe('textToPortableText', () => {
  it('splits paragraphs on blank lines and joins wrapped lines with a space', () => {
    expect(texts('First line\nsame paragraph\n\nSecond')).toEqual([
      ['normal', 'First line same paragraph'],
      ['normal', 'Second'],
    ]);
  });

  it('turns "## " lines into h2, even when a paragraph follows on the next line', () => {
    expect(texts('Intro\n\n## 1. Behind the scenes\nShow the messy middle.')).toEqual([
      ['normal', 'Intro'],
      ['h2', '1. Behind the scenes'],
      ['normal', 'Show the messy middle.'],
    ]);
  });

  it('produces valid Portable Text blocks with unique keys', () => {
    const blocks = textToPortableText('A\n\n## B\nC');
    expect(blocks[0]).toEqual({
      _type: 'block', _key: 'b0', style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: 'b0s0', text: 'A', marks: [] }],
    });
    expect(new Set(blocks.map((b) => b._key)).size).toBe(blocks.length);
  });

  it('returns no block for an empty body', () => {
    expect(textToPortableText('  \n\n ')).toEqual([]);
  });
});
```

Run: `npx vitest run src/lib/sanity/portable-text.test.ts`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Implémenter (même règle que l'actuel `ArticleBody`)**

```ts
// src/lib/sanity/portable-text.ts
// Converts the legacy plain-text article body (blank lines = paragraphs,
// "## " = subheading) into Portable Text — same rules as the old renderer.

export interface PtSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

export interface PtBlock {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: unknown[];
  children: PtSpan[];
}

export function textToPortableText(body: string): PtBlock[] {
  const blocks: PtBlock[] = [];
  let paragraph: string[] = [];

  const push = (style: string, text: string) => {
    const key = `b${blocks.length}`;
    blocks.push({ _type: 'block', _key: key, style, markDefs: [], children: [{ _type: 'span', _key: `${key}s0`, text, marks: [] }] });
  };
  const flush = () => {
    if (paragraph.length === 0) return;
    push('normal', paragraph.join(' '));
    paragraph = [];
  };

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim();
    if (line === '') {
      flush();
    } else if (line.startsWith('## ')) {
      flush();
      push('h2', line.slice(3));
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}
```

Run: `npx vitest run src/lib/sanity/portable-text.test.ts`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/sanity/portable-text.ts src/lib/sanity/portable-text.test.ts
git commit -m "feat(sanity): convert plain-text article bodies to Portable Text

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Documents Sanity → contenu du site

**Files:**
- Create: `src/lib/sanity/from-sanity.ts`
- Test: `src/lib/sanity/from-sanity.test.ts`

**Interfaces:**
- Consumes: `SINGLETONS`, `COLLECTIONS`, `ContentBundle` (tâche 2).
- Produces: `interface SanityConfig { projectId: string; dataset: string }`, `imageUrl(image: SanityImage, cfg: SanityConfig): string`, `fromSanity(value: unknown, cfg: SanityConfig): unknown`, `assembleContent(docs: Record<string, unknown>[], cfg: SanityConfig): ContentBundle`

Format d'URL d'image (utilisé tel quel par le test de la tâche 7) : `https://cdn.sanity.io/images/{projectId}/{dataset}/{id}-{w}x{h}.{ext}?[rect=x,y,w,h&]w=2400&fit=max&auto=format`

- [ ] **Step 1: Écrire les tests qui échouent**

```ts
// src/lib/sanity/from-sanity.test.ts
import { describe, it, expect } from 'vitest';
import { assembleContent, fromSanity, imageUrl } from './from-sanity';
import { SINGLETONS } from './documents';

const cfg = { projectId: 'proj', dataset: 'prod' };
const image = (id: string) => ({ _type: 'image', asset: { _type: 'reference', _ref: `image-${id}-800x600-jpg` } });

/** Minimal set of published singletons so assembleContent can run. */
function singletonDocs(overrides: Record<string, Record<string, unknown>> = {}) {
  return SINGLETONS.map((s) => {
    const body = s.fields ? Object.fromEntries(s.fields.map((f) => [f, { label: f }])) : { title: s.title };
    return { _id: s.type, _type: s.type, ...body, ...(overrides[s.type] ?? {}) };
  });
}

describe('imageUrl', () => {
  it('builds a CDN URL with automatic format', () => {
    expect(imageUrl(image('abc'), cfg)).toBe('https://cdn.sanity.io/images/proj/prod/abc-800x600.jpg?w=2400&fit=max&auto=format');
  });

  it('applies the editor crop as a rect', () => {
    const cropped = { ...image('abc'), crop: { top: 0.1, bottom: 0.1, left: 0.25, right: 0 } };
    expect(imageUrl(cropped, cfg)).toBe('https://cdn.sanity.io/images/proj/prod/abc-800x600.jpg?rect=200,60,600,480&w=2400&fit=max&auto=format');
  });

  it('rejects a malformed asset reference', () => {
    expect(() => imageUrl({ _type: 'image', asset: { _ref: 'nope' } }, cfg)).toThrow('nope');
  });
});

describe('fromSanity', () => {
  it('strips Sanity bookkeeping keys, resolves images and slugs', () => {
    expect(fromSanity({
      _id: 'x', _type: 'caseStudy', _rev: 'r', _createdAt: 'd',
      slug: { _type: 'slug', current: 'studio' },
      heroImg: image('abc'),
      stats: [{ _key: 'k0', _type: 'item', value: '3x', label: 'Reach' }],
      gallery: [{ _key: 'k0', ...image('g1') }],
    }, cfg)).toEqual({
      slug: 'studio',
      heroImg: 'https://cdn.sanity.io/images/proj/prod/abc-800x600.jpg?w=2400&fit=max&auto=format',
      stats: [{ value: '3x', label: 'Reach' }],
      gallery: ['https://cdn.sanity.io/images/proj/prod/g1-800x600.jpg?w=2400&fit=max&auto=format'],
    });
  });

  it('keeps Portable Text blocks verbatim', () => {
    const body = [{ _type: 'block', _key: 'b0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's', text: 'Hi', marks: [] }] }];
    expect(fromSanity({ body }, cfg)).toEqual({ body });
  });

  it('drops an image field with no uploaded asset', () => {
    expect(fromSanity({ img: { _type: 'image' }, title: 'T' }, cfg)).toEqual({ title: 'T' });
  });
});

describe('assembleContent', () => {
  it('maps page singletons and site settings onto the content exports', () => {
    const content = assembleContent(singletonDocs({ homePage: { hero: { title: 'Hello' } } }), cfg);
    expect(content.home).toEqual({ title: 'Home', hero: { title: 'Hello' } });
    expect(content.nav).toEqual({ label: 'nav' });
    expect(content.igPostUrls).toEqual({ label: 'igPostUrls' });
  });

  it('fails the build when a page was never published', () => {
    const docs = singletonDocs().filter((d) => d._id !== 'privacyPage');
    expect(() => assembleContent(docs, cfg)).toThrow('privacyPage');
  });

  it('fails the build when a site settings field is empty', () => {
    const docs = singletonDocs();
    const settings = docs.find((d) => d._id === 'siteSettings') as Record<string, unknown>;
    delete settings.footer;
    expect(() => assembleContent(docs, cfg)).toThrow('footer');
  });

  it('ignores drafts', () => {
    const docs = [...singletonDocs(), { _id: 'drafts.blogPost-x', _type: 'blogPost', id: { _type: 'slug', current: 'x' }, title: 'Draft', publishedAt: '2026-10-01T00:00:00Z' }];
    expect(assembleContent(docs, cfg).blogArticles).toEqual([]);
  });

  it('sorts collections by order, without leaking the order field', () => {
    const docs = [
      ...singletonDocs(),
      { _id: 'testimonial-2', _type: 'testimonial', name: 'B', order: 2 },
      { _id: 'testimonial-1', _type: 'testimonial', name: 'A', order: 1 },
      { _id: 'testimonial-3', _type: 'testimonial', name: 'C' },
    ];
    expect(assembleContent(docs, cfg).testimonials).toEqual([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
  });

  it('lists blog posts newest first, numbers them by position and skips posts without slug', () => {
    const docs = [
      ...singletonDocs(),
      { _id: 'blogPost-old', _type: 'blogPost', id: { _type: 'slug', current: 'old' }, title: 'Old', publishedAt: '2026-01-01T00:00:00Z' },
      { _id: 'blogPost-new', _type: 'blogPost', id: { _type: 'slug', current: 'new' }, title: 'New', publishedAt: '2026-09-01T00:00:00Z' },
      { _id: 'blogPost-noslug', _type: 'blogPost', title: 'No slug', publishedAt: '2026-10-01T00:00:00Z' },
    ];
    expect(assembleContent(docs, cfg).blogArticles).toEqual([
      { id: 'new', title: 'New', number: '01' },
      { id: 'old', title: 'Old', number: '02' },
    ]);
  });
});
```

Run: `npx vitest run src/lib/sanity/from-sanity.test.ts`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Implémenter**

```ts
// src/lib/sanity/from-sanity.ts
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

/** Build every content export from the published documents. Throws (and so
 *  fails the build) rather than publishing a site with missing content. */
export function assembleContent(allDocs: Doc[], cfg: SanityConfig): ContentBundle {
  const docs = allDocs.filter((d) => !String(d._id).startsWith('drafts.'));
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const content: ContentBundle = {};

  for (const s of SINGLETONS) {
    const doc = byId.get(s.type);
    if (!doc) throw new Error(`Sanity : la page « ${s.title} » (${s.type}) est introuvable ou n'a jamais été publiée`);
    const plain = fromSanity(doc, cfg) as Doc;
    if (s.export) {
      content[s.export] = plain;
    } else {
      for (const field of s.fields ?? []) {
        if (plain[field] === undefined) throw new Error(`Sanity : le champ « ${field} » est vide dans « ${s.title} »`);
        content[field] = plain[field];
      }
    }
  }

  for (const c of COLLECTIONS) {
    const items = docs.filter((d) => d._type === c.type);
    items.sort(
      c.ordering === 'order'
        ? (a, b) => orderOf(a.order) - orderOf(b.order)
        : (a, b) => String(b.publishedAt ?? '').localeCompare(String(a.publishedAt ?? ''))
    );
    content[c.export] = items
      .map((d) => fromSanity(d, cfg) as Doc)
      .filter((p) => !c.idField || (typeof p[c.idField] === 'string' && p[c.idField] !== ''))
      .map((p, i) => {
        const { order: _order, publishedAt: _publishedAt, ...rest } = p;
        return c.derivedFields.includes('number') ? { ...rest, number: String(i + 1).padStart(2, '0') } : rest;
      });
  }

  return content;
}
```

Run: `npx vitest run src/lib/sanity/from-sanity.test.ts`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/sanity/from-sanity.ts src/lib/sanity/from-sanity.test.ts
git commit -m "feat(sanity): assemble site content from published Sanity documents

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Contenu du site → documents Sanity (aller-retour complet)

**Files:**
- Create: `scripts/sanity/to-sanity.ts`
- Test: `scripts/sanity/to-sanity.test.ts`

**Interfaces:**
- Consumes: `FieldDef`, `ArrayMember`, `DocumentSchema` (tâche 3) ; `schemaTypes` (tâche 3) ; `textToPortableText` (tâche 5) ; `assembleContent` (tâche 6).
- Produces: `interface ImageRef { _type: 'image'; asset: { _type: 'reference'; _ref: string } }`, `type ResolveImage = (source: string) => Promise<ImageRef>`, `type SanityDoc = { _id: string; _type: string } & Record<string, unknown>`, `slugify(s: string): string`, `toSanityDocs(content, schemas, resolveImage, now?): Promise<{ docs: SanityDoc[]; warnings: string[] }>`

- [ ] **Step 1: Écrire les tests qui échouent**

```ts
// scripts/sanity/to-sanity.test.ts
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
    const expected = structuredClone(fixture.content) as Record<string, any>;
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
```

Run: `npx vitest run scripts/sanity/to-sanity.test.ts`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Implémenter**

```ts
// scripts/sanity/to-sanity.ts
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
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

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
```

Run: `npx vitest run scripts/sanity/to-sanity.test.ts`
Expected: PASS

Si l'aller-retour échoue uniquement sur `number` (numéros non consécutifs relevés à la tâche 2, étape 9), c'est un comportement voulu : le site recalcule déjà ces numéros. Dans ce cas, supprimer aussi `number` de `back.blogArticles` et `expected.blogArticles` dans le premier test, avec un commentaire qui l'explique. Tout autre écart est un bug à corriger dans `to-sanity.ts`, `from-sanity.ts` ou les schémas.

- [ ] **Step 3: Commit**

```bash
git add scripts/sanity/to-sanity.ts scripts/sanity/to-sanity.test.ts
git commit -m "feat(sanity): convert site content to Sanity documents, round-trip tested

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Fusion du contenu Strapi (portage de `cmsContent.ts`)

Reproduit exactement ce que le site affiche quand Strapi répond : le contenu Strapi fusionné sur le contenu embarqué. Ce module travaille sur une copie au lieu de modifier les modules du site.

**Files:**
- Create: `scripts/sanity/strapi-merge.ts`
- Test: `scripts/sanity/strapi-merge.test.ts`

**Interfaces:**
- Consumes: `ContentBundle` (tâche 2).
- Produces: `normalize(value: unknown, strapiUrl: string, insideArray?: boolean): unknown`, `mergeStrapiPayload(base: ContentBundle, rawPayload: unknown, strapiUrl: string): ContentBundle`, `fetchStrapiPayload(strapiUrl: string): Promise<unknown>`

- [ ] **Step 1: Écrire les tests qui échouent**

```ts
// scripts/sanity/strapi-merge.test.ts
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { mergeStrapiPayload } from './strapi-merge';

const STRAPI = 'https://cms.example.com';
const base = () => ({
  nav: { cta: 'BOOK', links: [{ label: 'Home', href: '/' }] },
  showcase: { content: { title: 'Content' }, industry: { title: 'Industry' } },
  home: { hero: { title: 'Bundled', img: 'sea-1' } },
  privacy: { title: 'Privacy', sections: [{ id: 'old', title: 'Old', blocks: [] }] },
  testimonials: [{ quote: 'q1', name: 'A', role: 'r' }],
  blogArticles: [{ id: 'blog-1', category: 'TIPS', title: 'Bundled post', number: '01', image: 'sea-1' }],
  igPostUrls: ['https://instagram.com/p/old'],
});

describe('mergeStrapiPayload', () => {
  it('keeps the bundled value when Strapi sends an empty field', () => {
    const out = mergeStrapiPayload(base(), { homePage: { hero: { title: '' } } }, STRAPI) as any;
    expect(out.home.hero.title).toBe('Bundled');
  });

  it('turns Strapi media into absolute URLs and strips bookkeeping keys', () => {
    const out = mergeStrapiPayload(base(), {
      homePage: { id: 3, documentId: 'd', hero: { title: 'From CMS', img: { url: '/uploads/hero.jpg', mime: 'image/jpeg' } } },
    }, STRAPI) as any;
    expect(out.home.hero).toEqual({ title: 'From CMS', img: 'https://cms.example.com/uploads/hero.jpg' });
    expect(out.home).not.toHaveProperty('documentId');
  });

  it('maps the global single onto the shared sections', () => {
    const out = mergeStrapiPayload(base(), {
      global: { nav: { cta: 'CALL US' }, showcaseContent: { title: 'New content' } },
    }, STRAPI) as any;
    expect(out.nav.cta).toBe('CALL US');
    expect(out.nav.links).toEqual([{ label: 'Home', href: '/' }]);
    expect(out.showcase.content.title).toBe('New content');
  });

  it('maps blog posts: slug → id, date → category, number from position, slug-less posts skipped', () => {
    const out = mergeStrapiPayload(base(), {
      blogPosts: [
        { slug: 'new-post', title: 'New', date: 'LINKEDIN', number: '99' },
        { title: 'No slug yet' },
      ],
    }, STRAPI) as any;
    expect(out.blogArticles).toEqual([
      { id: 'new-post', category: 'LINKEDIN', title: 'New', number: '01', image: 'sea-1', slug: 'new-post' },
    ]);
  });

  it('rebuilds privacy sections from flat Strapi blocks', () => {
    const out = mergeStrapiPayload(base(), {
      privacyPage: {
        sections: [{
          anchor: 'cookies', title: 'Cookies',
          blocks: [
            { kind: 'p', lead: 'Lead', text: 'Body', linkText: 'here', linkHref: '/x', tail: '.', mt: '' },
            { kind: 'ul', text: 'one\n two \n\nthree' },
          ],
        }],
      },
    }, STRAPI) as any;
    expect(out.privacy.sections).toEqual([{
      id: 'cookies', title: 'Cookies',
      blocks: [
        { kind: 'p', text: 'Body', lead: 'Lead', link: { text: 'here', href: '/x' }, tail: '.', mt: undefined },
        { kind: 'ul', items: ['one', 'two', 'three'] },
      ],
    }]);
  });

  it('turns instagram posts into the URL list', () => {
    const out = mergeStrapiPayload(base(), { instagramPosts: [{ url: 'https://instagram.com/p/a' }, { url: '' }] }, STRAPI) as any;
    expect(out.igPostUrls).toEqual(['https://instagram.com/p/a']);
  });

  it('unwraps single-field components inside arrays', () => {
    const out = mergeStrapiPayload(base(), { testimonials: [{ quote: 'New', name: 'A', role: 'r' }] }, STRAPI) as any;
    expect(out.testimonials[0].quote).toBe('New');
  });

  it('never mutates the base content', () => {
    const b = base();
    mergeStrapiPayload(b, { homePage: { hero: { title: 'Changed' } } }, STRAPI);
    expect(b.home.hero.title).toBe('Bundled');
  });
});
```

Run: `npx vitest run scripts/sanity/strapi-merge.test.ts`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Implémenter (portage fidèle de `src/lib/cmsContent.ts`)**

```ts
// scripts/sanity/strapi-merge.ts
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
```

Note : dans le test des articles, l'objet attendu contient `slug: 'new-post'` parce que la fusion garde ce champ Strapi ; `toSanityDocs` le signalera ensuite en avertissement (`champ absent du schéma`) et l'ignorera. C'est attendu.

Run: `npx vitest run scripts/sanity/strapi-merge.test.ts`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add scripts/sanity/strapi-merge.ts scripts/sanity/strapi-merge.test.ts
git commit -m "feat(sanity): port the Strapi content merge for the one-off migration

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Script d'import dans Sanity + jeu de données de développement

**Files:**
- Create: `scripts/import-to-sanity.ts`

**Interfaces:**
- Consumes: `loadDotEnv`, `requireEnv`, `argValue`, `SANITY_API_VERSION` (tâche 2) ; `toSanityDocs`, `ImageRef`, `ResolveImage` (tâche 7) ; `mergeStrapiPayload`, `fetchStrapiPayload` (tâche 8) ; `schemaTypes` (tâche 3) ; fixture (tâche 2).

- [ ] **Step 1: Écrire le script**

```ts
// scripts/import-to-sanity.ts
// One-off import of the site content into a Sanity dataset.
//
//   npm run sanity:import -- --source bundled                       (development dataset)
//   npm run sanity:import -- --source strapi --strapi-url https://cms.340consultancy.com
//
// Needs SANITY_PROJECT_ID, SANITY_DATASET and SANITY_WRITE_TOKEN (Editor token).
// Read-only towards Strapi: it never uploads anything there.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import fixture from '../src/test/fixtures/bundled-content.json';
import { schemaTypes } from '../studio/schemaTypes';
import { argValue, loadDotEnv, requireEnv, SANITY_API_VERSION } from './sanity/cli';
import type { DocumentSchema } from './sanity/infer-schema';
import { fetchStrapiPayload, mergeStrapiPayload } from './sanity/strapi-merge';
import { toSanityDocs, type ImageRef, type ResolveImage } from './sanity/to-sanity';

loadDotEnv();
const source = argValue('source');
if (source !== 'bundled' && source !== 'strapi') throw new Error('Préciser --source bundled ou --source strapi');

const dataset = requireEnv('SANITY_DATASET');
const client = createClient({
  projectId: requireEnv('SANITY_PROJECT_ID'),
  dataset,
  token: requireEnv('SANITY_WRITE_TOKEN'),
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

let content = structuredClone(fixture.content) as Record<string, unknown>;
if (source === 'strapi') {
  const strapiUrl = (argValue('strapi-url') ?? '').replace(/\/+$/, '');
  if (!strapiUrl) throw new Error('Préciser --strapi-url https://…');
  console.log(`Lecture du contenu Strapi : ${strapiUrl}/api/site-content`);
  content = mergeStrapiPayload(content, await fetchStrapiPayload(strapiUrl), strapiUrl);
}

const assetFiles = fixture.assetFiles as Record<string, string>;

async function upload(src: string): Promise<ImageRef> {
  let buffer: Buffer;
  let filename: string;
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Téléchargement impossible (HTTP ${res.status}) : ${src}`);
    buffer = Buffer.from(await res.arrayBuffer());
    filename = path.basename(new URL(src).pathname);
  } else if (assetFiles[src]) {
    buffer = readFileSync(assetFiles[src]);
    filename = path.basename(assetFiles[src]);
  } else {
    throw new Error(`Image inconnue (ni URL, ni image embarquée) : ${src}`);
  }
  const asset = await client.assets.upload('image', buffer, { filename });
  console.log(`  image ${filename} → ${asset._id}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

// Each distinct source is uploaded once, even when used in several places.
const uploads = new Map<string, Promise<ImageRef>>();
const resolveImage: ResolveImage = (src) => {
  if (!uploads.has(src)) uploads.set(src, upload(src));
  return uploads.get(src)!;
};

const { docs, warnings } = await toSanityDocs(content, schemaTypes as unknown as DocumentSchema[], resolveImage);
for (const w of warnings) console.warn(`⚠ ${w}`);

const tx = client.transaction();
for (const doc of docs) tx.createOrReplace(doc);
await tx.commit();
console.log(`${docs.length} documents et ${uploads.size} images écrits dans le dataset « ${dataset} ».`);
```

- [ ] **Step 2: Vérifier que le script se charge sans Sanity**

Run: `npm run sanity:import -- --source nimportequoi`
Expected : échec avec `Préciser --source bundled ou --source strapi` (le script se charge, les imports se résolvent).

- [ ] **Step 3: Commit**

```bash
git add scripts/import-to-sanity.ts
git commit -m "feat(sanity): one-off import script (bundled content or Strapi)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 4: ⏸ Action utilisateur — projet Sanity**

À faire par l'utilisateur, idéalement sur un compte au nom de la cliente ou en l'invitant :
1. Créer un projet sur https://www.sanity.io/manage et noter son **Project ID**.
2. Créer deux datasets publics : `production` et `development`.
3. Créer un token **Editor** (API → Tokens).
4. Copier `.env.example` en `.env` à la racine et renseigner `SANITY_PROJECT_ID`, `SANITY_DATASET=development`, `SANITY_WRITE_TOKEN`. Copier `studio/.env.example` en `studio/.env` avec le même Project ID.

- [ ] **Step 5: Importer le contenu embarqué dans `development`**

Run: `npm run sanity:import -- --source bundled`
Expected : une ligne par image envoyée, puis `N documents et M images écrits dans le dataset « development ».`, avec N = 9 + le nombre total d'éléments des 4 collections, à calculer avant de lancer l'import : `node -e "const c=require('./src/test/fixtures/bundled-content.json').content;console.log(9+c.testimonials.length+c.services.length+c.caseStudies.length+c.blogArticles.length)"`. M ≤ 33 (seules les images utilisées par le contenu sont envoyées). Aucun avertissement `⚠`.

- [ ] **Step 6: Contrôler dans le Studio**

Run (depuis `studio/`) : `npx sanity dev` avec `SANITY_STUDIO_DATASET=development`
Expected : http://localhost:3333 affiche « Pages » (9 entrées) et les 4 collections remplies, images visibles. Ouvrir un article : le corps est en texte riche avec ses intertitres.

---

### Task 10: Lecture du contenu au build et bascule des modules de contenu

**Files:**
- Create: `scripts/fetch-content.ts`, `src/content/generated.ts`
- Modify: les 16 modules de contenu (liste à l'étape 4), `src/content/types.ts`, `src/main.tsx`, `package.json`, `.env.example`
- Delete: `src/lib/cmsContent.ts`

**Interfaces:**
- Consumes: `assembleContent` (tâche 6), `CONTENT_TYPES` (tâche 2), `sanityReadClient`, `requireEnv`, `loadDotEnv` (tâche 2).
- Produces: `src/content/generated/content.json` (non versionné) ; `generated: Record<string, unknown>` ; nouvelles interfaces `HeadlineParts`, `BlogPageContent`, `CaseStudyLabels`, `ServiceDetailLabels`, `TestimonialsCta`.

- [ ] **Step 1: Écrire le script de prebuild**

```ts
// scripts/fetch-content.ts
// Prebuild: reads every published document from Sanity and writes the site
// content to src/content/generated/content.json. Any failure exits non-zero,
// so a Vercel build never publishes a site without content.
import { mkdirSync, writeFileSync } from 'node:fs';
import { CONTENT_TYPES } from '../src/lib/sanity/documents';
import { assembleContent } from '../src/lib/sanity/from-sanity';
import { loadDotEnv, requireEnv, sanityReadClient } from './sanity/cli';

loadDotEnv();
const projectId = requireEnv('SANITY_PROJECT_ID');
const dataset = requireEnv('SANITY_DATASET');

const docs = await sanityReadClient(projectId, dataset).fetch<Record<string, unknown>[]>(
  '*[_type in $types]',
  { types: CONTENT_TYPES }
);
const content = assembleContent(docs, { projectId, dataset });

mkdirSync('src/content/generated', { recursive: true });
writeFileSync('src/content/generated/content.json', JSON.stringify(content, null, 2) + '\n');
console.log(`Contenu Sanity : ${docs.length} documents lus (dataset « ${dataset} »).`);
```

Dans `package.json`, ajouter aux `"scripts"` :

```json
    "content": "vite-node scripts/fetch-content.ts",
    "predev": "npm run content",
    "prebuild": "npm run content",
```

Run: `npm run content`
Expected : `Contenu Sanity : N documents lus (dataset « development »).` (même N qu'à la tâche 9, étape 5) et le fichier `src/content/generated/content.json` existe.

- [ ] **Step 2: Point d'entrée typé du JSON**

```ts
// src/content/generated.ts
// Site content fetched from Sanity at build time (scripts/fetch-content.ts).
// The file is generated before `dev` and `build`; it is not committed.
import raw from './generated/content.json';

export const generated = raw as unknown as Record<string, unknown>;
```

- [ ] **Step 3: Interfaces des exports qui n'en avaient pas**

Ajouter à la fin de `src/content/types.ts` :

```ts
/** A headline split into a solid lead and an accent part. */
export interface HeadlineParts {
  lead: string;
  accent: string;
}

/** Static labels of the blog listing and article pages. */
export interface BlogPageContent {
  listing: { eyebrow: string; headline: HeadlineParts; tagline: string; readLabel: string };
  article: { backLabel: string; moreEyebrow: string; moreHeadline: HeadlineParts; byLabel: string };
}

/** Static labels of the case study page. */
export interface CaseStudyLabels {
  notFound: { message: string; backLabel: string };
  backLabel: string;
  meta: { client: string; services: string; website: string; industry: string };
  sections: { challenge: string; approach: string; results: string };
  others: { eyebrow: string; heading: HeadlineParts; allWorkLabel: string; viewCaseLabel: string };
  scrollLabel: string;
}

/** Static labels of the service detail page. */
export interface ServiceDetailLabels {
  addOns: { eyebrow: string; heading: HeadlineParts };
  serviceEyebrow: string;
  pricingLabel: string;
  includesLabel: string;
  defaultCtaLabel: string;
  availableInPrefix: string;
  others: { eyebrow: string; heading: HeadlineParts };
}

/** Link under the testimonials section. */
export interface TestimonialsCta {
  label: string;
  to: string;
}
```

- [ ] **Step 4: Faire pointer chaque module sur le contenu généré**

Dans chaque fichier ci-dessous, **supprimer l'objet ou le tableau littéral** de l'export indiqué et le remplacer par la ligne donnée. Garder les interfaces et tout autre code. Ajouter en tête de chaque fichier modifié `import { generated } from '@/content/generated';` (et l'import du type quand il vient de `types.ts`).

| Fichier | Remplacement |
|---|---|
| `src/content/sections/nav.ts` | `export const nav = generated.nav as NavContent;` |
| `src/content/sections/footer.ts` | `export const footer = generated.footer as FooterContent;` |
| `src/content/sections/cta.ts` | `export const cta = generated.cta as CtaContent;` |
| `src/content/sections/showcase.ts` | `export const showcase = generated.showcase as { content: ShowcaseHalf; industry: ShowcaseHalf };` |
| `src/content/collections/testimonials.ts` | `export const testimonials = generated.testimonials as Testimonial[];` et `export const testimonialsCta = generated.testimonialsCta as TestimonialsCta;` (`import type { TestimonialsCta } from '@/content/types';`) |
| `src/content/collections/services.ts` | `export const services = generated.services as Service[];`, `export const managementAddOns = generated.managementAddOns as AddOnsContent;`, `export const strategyAddOns = generated.strategyAddOns as AddOnsContent;`, `export const serviceDetailLabels = generated.serviceDetailLabels as ServiceDetailLabels;` |
| `src/content/collections/case-studies.ts` | `export const caseStudies = generated.caseStudies as CaseStudy[];`, `export const caseStudyLabels = generated.caseStudyLabels as CaseStudyLabels;` |
| `src/content/collections/blog.ts` | `export const blogArticles = generated.blogArticles as BlogArticle[];`, `export const blogPage = generated.blogPage as BlogPageContent;`, `export const blogSection = generated.blogSection as { blogs: BlogSectionText; social: BlogSectionText; readArticleLabel: string; comingSoonLabel: string; comingSoonWatermark: string };`, `export const igPostUrls = generated.igPostUrls as string[];` |
| `src/content/pages/home.ts` | `export const home = generated.home as HomeContent;` |
| `src/content/pages/about-us.ts` | `export const aboutUs = generated.aboutUs as AboutUsContent;` |
| `src/content/pages/services.ts` | `export const servicesPage = generated.servicesPage as ServicesPageContent;` |
| `src/content/pages/contact.ts` | `export const contact = generated.contact as ContactContent;` |
| `src/content/pages/up2date.ts` | `export const up2date = generated.up2date as Up2dateContent;` |
| `src/content/pages/privacy.ts` | `export const privacy = generated.privacy as PrivacyContent;` |
| `src/content/pages/work.ts` | `export const work = generated.work as WorkContent;` |
| `src/content/pages/not-found.ts` | `export const notFound = generated.notFound as NotFoundContent;` |

Dans `src/content/collections/blog.ts`, changer aussi le type du corps : `body?: string;` devient `body?: PtBlock[];`, avec `import type { PtBlock } from '@/lib/sanity/portable-text';`, et mettre à jour son commentaire (« Article body as Portable Text (rich text edited in Sanity). »). Garder `number` dans l'interface : il reste fourni, recalculé par `assembleContent`.

Mettre à jour le commentaire d'en-tête de chaque module : remplacer la mention « CMS collection type … / Serializable: images → AssetKey » par « Content comes from Sanity at build time (src/content/generated.ts). Images are CDN URLs. ».

- [ ] **Step 5: Supprimer l'hydratation au démarrage**

Remplacer tout le contenu de `src/main.tsx` par :

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

Supprimer `src/lib/cmsContent.ts` (`git rm src/lib/cmsContent.ts`).

Dans `src/content/assets.ts`, remplacer le commentaire de `img` (« After CMS hydration (src/lib/cmsContent.ts) image fields may hold a full media URL from Strapi … ») par : « Content image fields hold Sanity CDN URLs, which pass through unchanged; registered keys still resolve to bundled files. »

- [ ] **Step 6: Mettre à jour `.env.example`**

Remplacer tout le contenu de `.env.example` par :

```
# Copy to .env for local work, and set the same keys in Vercel
# (Project → Settings → Environment Variables, Preview & Production).
# Only VITE_* variables reach the browser: never put a secret in one.

# ── Sanity (read at build time by scripts/fetch-content.ts) ─────────────────
# Public dataset: reading published content needs no token.
SANITY_PROJECT_ID=
SANITY_DATASET=production

# Editor token — ONLY for the one-off import scripts. Never set it in Vercel.
SANITY_WRITE_TOKEN=

# <site>/admin redirects here, e.g. https://340consultancy.sanity.studio
VITE_SANITY_STUDIO_URL=

# ── Forms (Vercel functions in api/, server-side only) ──────────────────────
RESEND_API_KEY=
CONTACT_TO_EMAIL=
# Must be on the domain verified in Resend, e.g. "340 Consultancy <site@340consultancy.com>"
CONTACT_FROM_EMAIL=
BREVO_API_KEY=
BREVO_LIST_ID=
```

- [ ] **Step 7: Vérifier**

Run: `npx vitest run` — Expected: PASS (le test de la tâche 1 lit maintenant le contenu généré).
Run: `npm run build` — Expected : `Contenu Sanity : … documents lus`, puis build Vite réussi.
Run: `npm run lint` — Expected : aucune nouvelle erreur par rapport à `main` (comparer avec `git stash; npm run lint; git stash pop` si besoin).
Run: `npm run dev` puis ouvrir chaque route : `/`, `/about-us`, `/about`, `/services`, `/services/strategy`, `/work`, `/work/<un slug>`, `/blog`, `/blog/<un id>`, `/contact`, `/privacy`, `/une-page-inexistante`. Expected : même rendu qu'avant, images servies par `cdn.sanity.io` (onglet Réseau). Le corps d'un article ne s'affiche pas encore correctement (Portable Text) : c'est la tâche 11.

- [ ] **Step 8: Commit**

```bash
git add scripts/fetch-content.ts src/content src/main.tsx package.json .env.example
git rm src/lib/cmsContent.ts
git commit -m "feat(content): read site content from Sanity at build time

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Rendu du corps des articles en texte riche

**Files:**
- Create: `src/components/ArticleBody.tsx`
- Modify: `src/pages/BlogArticlePage.tsx` (supprimer l'`ArticleBody` local, lignes ~22-60, et ses styles s'ils ne servent plus qu'à lui)
- Test: `src/components/ArticleBody.test.tsx`

**Interfaces:**
- Consumes: `PtBlock`, `textToPortableText` (tâche 5).
- Produces: `ArticleBody: React.FC<{ body: PtBlock[] }>`

- [ ] **Step 1: Écrire le test qui échoue**

```tsx
// src/components/ArticleBody.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleBody from './ArticleBody';
import { textToPortableText } from '@/lib/sanity/portable-text';

describe('ArticleBody', () => {
  it('renders paragraphs and subheadings', () => {
    render(<ArticleBody body={textToPortableText('Intro paragraph\n\n## A heading\nFollow-up text')} />);
    expect(screen.getByRole('heading', { level: 2, name: 'A heading' })).toBeInTheDocument();
    expect(screen.getByText('Intro paragraph').tagName).toBe('P');
    expect(screen.getByText('Follow-up text').tagName).toBe('P');
  });

  it('renders links added in the Studio, opening in a new tab', () => {
    const body = [{
      _type: 'block', _key: 'b0', style: 'normal',
      markDefs: [{ _type: 'link', _key: 'l1', href: 'https://example.com' }],
      children: [{ _type: 'span', _key: 's0', text: 'Read more', marks: ['l1'] }],
    }];
    render(<ArticleBody body={body} />);
    const link = screen.getByRole('link', { name: 'Read more' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
```

Run: `npx vitest run src/components/ArticleBody.test.tsx`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Créer le composant**

Les styles `headingStyle` et `paragraphStyle` sont déplacés depuis `src/pages/BlogArticlePage.tsx` (valeurs identiques ; la constante `CREAM` y est remplacée par sa valeur) :

```tsx
// src/components/ArticleBody.tsx
import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PtBlock } from '@/lib/sanity/portable-text';

// Moved from BlogArticlePage.tsx with the legacy plain-text renderer.
const headingStyle: React.CSSProperties = {
  fontFamily: "'Kelson Sans BG', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
  lineHeight: 1.15,
  textTransform: 'uppercase',
  color: 'hsl(36 21% 95%)',
  margin: 'clamp(1.8rem, 3vw, 2.4rem) 0 0.9rem',
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 'clamp(0.92rem, 1.15vw, 1.02rem)',
  lineHeight: 1.9,
  color: 'hsl(36 21% 95% / 0.68)',
  margin: '0 0 1.1rem',
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p style={paragraphStyle}>{children}</p>,
    h2: ({ children }) => <h2 style={headingStyle}>{children}</h2>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  },
};

/** Article body written in the Sanity rich-text editor. */
const ArticleBody: React.FC<{ body: PtBlock[] }> = ({ body }) => (
  <PortableText value={body} components={components} />
);

export default ArticleBody;
```

Dans `src/pages/BlogArticlePage.tsx` : supprimer l'ancien composant `ArticleBody` et les objets `headingStyle` / `paragraphStyle` (vérifier ensuite qu'ils ne sont plus référencés : `grep -n "paragraphStyle\|headingStyle" src/pages/BlogArticlePage.tsx` ne doit rien afficher ; garder `CREAM` et `ROSA` s'ils servent encore), et ajouter `import ArticleBody from '@/components/ArticleBody';`. La ligne `{article.body && <ArticleBody body={article.body} />}` reste inchangée.

Run: `npx vitest run src/components/ArticleBody.test.tsx`
Expected: PASS

- [ ] **Step 3: Vérifier visuellement**

Run: `npm run dev`, ouvrir `/blog/<un id>`.
Expected : paragraphes et intertitres identiques à la version en production.

- [ ] **Step 4: Commit**

```bash
git add src/components/ArticleBody.tsx src/components/ArticleBody.test.tsx src/pages/BlogArticlePage.tsx
git commit -m "feat(blog): render article bodies from Portable Text

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Formulaires — fonctions Vercel (Resend + Brevo)

**Files:**
- Create: `api/_lib/brevo.ts`, `api/_lib/contact.ts`, `api/_lib/newsletter.ts`, `api/contact.ts`, `api/newsletter.ts`, `src/lib/forms.ts`
- Modify: `vercel.json` (réécriture qui exclut `/api/`)
- Modify: `src/pages/ContactFAQ.tsx` (handleSubmit ~l.107-130 + champ piège), `src/pages/About.tsx` (deux handleSubmit ~l.20-35 et ~l.182-197 + champs pièges)
- Delete: `src/lib/strapi.ts`
- Test: `api/_lib/contact.test.ts`, `api/_lib/newsletter.test.ts`

**Interfaces:**
- Produces: `subscribeToBrevo(email: string, source: string, env: BrevoEnv, fetchFn?: typeof fetch): Promise<void>` ; `handleContact(input: unknown, env: ContactEnv, fetchFn?: typeof fetch): Promise<ApiResult>` ; `handleNewsletter(input: unknown, env: BrevoEnv, fetchFn?: typeof fetch): Promise<ApiResult>` ; `interface ApiResult { status: number; body: { ok: boolean; error?: string } }` ; `postForm(path: '/api/contact' | '/api/newsletter', payload: Record<string, unknown>): Promise<void>`

Les imports relatifs dans `api/` portent l'extension `.js` (`./_lib/contact.js`) : le projet est en `"type": "module"` et Node exige l'extension à l'exécution sur Vercel. Vite et Vitest résolvent `.js` vers le fichier `.ts`.

- [ ] **Step 1: Écrire les tests qui échouent**

```ts
// api/_lib/newsletter.test.ts
// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { handleNewsletter } from './newsletter.js';

const env = { BREVO_API_KEY: 'key', BREVO_LIST_ID: '7' };
const ok = (status = 201) => vi.fn().mockResolvedValue(new Response(null, { status }));

describe('handleNewsletter', () => {
  it('adds the contact to the Brevo list with its source', async () => {
    const fetchFn = ok();
    const result = await handleNewsletter({ email: 'a@b.co', source: 'lead-magnet' }, env, fetchFn);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/contacts');
    expect(init.headers['api-key']).toBe('key');
    expect(JSON.parse(init.body)).toEqual({ email: 'a@b.co', listIds: [7], updateEnabled: true, attributes: { SOURCE: 'lead-magnet' } });
  });

  it('treats an already-subscribed address (204) as success', async () => {
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter' }, env, ok(204));
    expect(result.status).toBe(200);
  });

  it('silently accepts bots that fill the honeypot, without calling Brevo', async () => {
    const fetchFn = ok();
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter', website: 'spam.com' }, env, fetchFn);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('rejects an invalid email or source', async () => {
    expect((await handleNewsletter({ email: 'nope', source: 'newsletter' }, env, ok())).status).toBe(400);
    expect((await handleNewsletter({ email: 'a@b.co', source: 'other' }, env, ok())).status).toBe(400);
  });

  it('reports a Brevo failure as 502', async () => {
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter' }, env, ok(500));
    expect(result).toEqual({ status: 502, body: { ok: false, error: 'upstream_failed' } });
  });

  it('reports missing configuration as 500', async () => {
    const result = await handleNewsletter({ email: 'a@b.co', source: 'newsletter' }, { BREVO_API_KEY: '', BREVO_LIST_ID: '' }, ok());
    expect(result).toEqual({ status: 500, body: { ok: false, error: 'not_configured' } });
  });
});
```

```ts
// api/_lib/contact.test.ts
// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { handleContact } from './contact.js';

const env = {
  RESEND_API_KEY: 'rk', CONTACT_TO_EMAIL: 'owner@340.com', CONTACT_FROM_EMAIL: 'Site <site@340.com>',
  BREVO_API_KEY: 'bk', BREVO_LIST_ID: '7',
};
const valid = { name: 'Ann', email: 'ann@x.co', igHandle: '@ann', interest: 'Strategy', message: 'Hello', newsletter: false };
const respond = (...statuses: number[]) => {
  const fn = vi.fn();
  for (const s of statuses) fn.mockResolvedValueOnce(new Response('{}', { status: s }));
  return fn;
};

describe('handleContact', () => {
  it('emails the owner with the visitor as reply-to', async () => {
    const fetchFn = respond(200);
    expect(await handleContact(valid, env, fetchFn)).toEqual({ status: 200, body: { ok: true } });
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer rk');
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({ from: 'Site <site@340.com>', to: ['owner@340.com'], reply_to: 'ann@x.co' });
    expect(sent.subject).toContain('Ann');
    expect(sent.text).toContain('Hello');
    expect(sent.text).toContain('@ann');
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('also subscribes the visitor when the newsletter box is ticked', async () => {
    const fetchFn = respond(200, 201);
    await handleContact({ ...valid, newsletter: true }, env, fetchFn);
    expect(fetchFn.mock.calls[1][0]).toBe('https://api.brevo.com/v3/contacts');
    expect(JSON.parse(fetchFn.mock.calls[1][1].body).attributes).toEqual({ SOURCE: 'contact-form' });
  });

  it('still succeeds when only the newsletter subscription fails', async () => {
    expect((await handleContact({ ...valid, newsletter: true }, env, respond(200, 500))).status).toBe(200);
  });

  it('silently accepts bots that fill the honeypot, without sending anything', async () => {
    const fetchFn = respond(200);
    expect(await handleContact({ ...valid, website: 'spam' }, env, fetchFn)).toEqual({ status: 200, body: { ok: true } });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('rejects a missing name or an invalid email', async () => {
    expect((await handleContact({ ...valid, name: ' ' }, env, respond(200))).status).toBe(400);
    expect((await handleContact({ ...valid, email: 'x' }, env, respond(200))).status).toBe(400);
  });

  it('reports a Resend failure as 502', async () => {
    expect(await handleContact(valid, env, respond(422))).toEqual({ status: 502, body: { ok: false, error: 'upstream_failed' } });
  });

  it('reports missing configuration as 500', async () => {
    expect((await handleContact(valid, { ...env, RESEND_API_KEY: '' }, respond(200))).status).toBe(500);
  });
});
```

Run: `npx vitest run api`
Expected: FAIL (modules introuvables)

- [ ] **Step 2: Implémenter Brevo et la newsletter**

```ts
// api/_lib/brevo.ts
export interface BrevoEnv {
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
}

export interface ApiResult {
  status: number;
  body: { ok: boolean; error?: string };
}

export const OK: ApiResult = { status: 200, body: { ok: true } };
export const fail = (status: number, error: string): ApiResult => ({ status, body: { ok: false, error } });

export const brevoConfigured = (env: BrevoEnv): boolean => Boolean(env.BREVO_API_KEY && env.BREVO_LIST_ID);

/** Add (or update) a contact in the Brevo list. 201 = created, 204 = already there. */
export async function subscribeToBrevo(email: string, source: string, env: BrevoEnv, fetchFn: typeof fetch = fetch): Promise<void> {
  const res = await fetchFn('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY ?? '', 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ email, listIds: [Number(env.BREVO_LIST_ID)], updateEnabled: true, attributes: { SOURCE: source } }),
  });
  if (!res.ok) throw new Error(`Brevo HTTP ${res.status}`);
}
```

```ts
// api/_lib/newsletter.ts
import { z } from 'zod';
import { brevoConfigured, fail, OK, subscribeToBrevo, type ApiResult, type BrevoEnv } from './brevo.js';

const schema = z.object({
  email: z.string().trim().email().max(320),
  source: z.enum(['lead-magnet', 'newsletter']),
  /** Honeypot: hidden from people, filled by bots. */
  website: z.string().optional(),
});

export async function handleNewsletter(input: unknown, env: BrevoEnv, fetchFn: typeof fetch = fetch): Promise<ApiResult> {
  if (!brevoConfigured(env)) return fail(500, 'not_configured');
  const parsed = schema.safeParse(input);
  if (!parsed.success) return fail(400, 'invalid_input');
  if (parsed.data.website) return OK;
  try {
    await subscribeToBrevo(parsed.data.email, parsed.data.source, env, fetchFn);
    return OK;
  } catch (err) {
    console.error('[newsletter] Brevo failed:', err);
    return fail(502, 'upstream_failed');
  }
}
```

- [ ] **Step 3: Implémenter le contact**

```ts
// api/_lib/contact.ts
import { z } from 'zod';
import { brevoConfigured, fail, OK, subscribeToBrevo, type ApiResult, type BrevoEnv } from './brevo.js';

export interface ContactEnv extends BrevoEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const optionalText = (max: number) => z.string().trim().max(max).optional().default('');

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  igHandle: optionalText(100),
  interest: optionalText(200),
  message: optionalText(5000),
  newsletter: z.boolean().optional().default(false),
  /** Honeypot: hidden from people, filled by bots. */
  website: z.string().optional(),
});

export async function handleContact(input: unknown, env: ContactEnv, fetchFn: typeof fetch = fetch): Promise<ApiResult> {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) return fail(500, 'not_configured');
  const parsed = schema.safeParse(input);
  if (!parsed.success) return fail(400, 'invalid_input');
  const f = parsed.data;
  if (f.website) return OK;

  // Plain-text email only: visitor input is never interpreted as HTML.
  const text = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Instagram: ${f.igHandle || '-'}`,
    `Interested in: ${f.interest || '-'}`,
    `Newsletter: ${f.newsletter ? 'yes' : 'no'}`,
    '',
    f.message || '(no message)',
  ].join('\n');

  const res = await fetchFn('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: f.email,
      subject: `New contact form message from ${f.name}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error('[contact] Resend failed:', res.status, await res.text().catch(() => ''));
    return fail(502, 'upstream_failed');
  }

  if (f.newsletter && brevoConfigured(env)) {
    // The message already reached the owner: a newsletter failure must not
    // turn the visitor's submission into an error.
    await subscribeToBrevo(f.email, 'contact-form', env, fetchFn).catch((err) =>
      console.error('[contact] Brevo subscription failed:', err)
    );
  }
  return OK;
}
```

Run: `npx vitest run api`
Expected: PASS

- [ ] **Step 4: Fonctions Vercel**

```ts
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleContact, type ContactEnv } from './_lib/contact.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const result = await handleContact(req.body, process.env as ContactEnv);
  return res.status(result.status).json(result.body);
}
```

```ts
// api/newsletter.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { BrevoEnv } from './_lib/brevo.js';
import { handleNewsletter } from './_lib/newsletter.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const result = await handleNewsletter(req.body, process.env as BrevoEnv);
  return res.status(result.status).json(result.body);
}
```

Dans `vercel.json`, remplacer la réécriture pour ne pas avaler `/api/` :

```json
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
```

- [ ] **Step 5: Brancher les formulaires du site**

```ts
// src/lib/forms.ts
/** POST a form to one of the site's Vercel functions; throws when it fails. */
export async function postForm(
  path: '/api/contact' | '/api/newsletter',
  payload: Record<string, unknown>
): Promise<void> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

/** Value of the hidden honeypot field of the submitted form. */
export const honeypot = (form: HTMLFormElement): string =>
  String(new FormData(form).get('website') ?? '');
```

Champ piège à ajouter **dans chacun des trois `<form>`** (contact dans `ContactFAQ.tsx`, lead magnet et newsletter dans `About.tsx`), juste après la balise ouvrante :

```tsx
{/* Honeypot: invisible to people, bots fill it and get silently dropped. */}
<input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
  style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }} />
```

Le `<form>` parent doit avoir `position: relative` ou rien de spécial : le champ est sorti de l'écran, il ne décale pas la mise en page.

Dans `src/pages/ContactFAQ.tsx`, remplacer `import { strapiCreate } from '@/lib/strapi';` par `import { honeypot, postForm } from '@/lib/forms';`, puis dans `handleSubmit` remplacer l'appel :

```ts
      // Lands in the CMS under Content Manager → “Inbox: Contact form”.
      await strapiCreate('contact-messages', {
        name: form.name,
        email: form.email,
        igHandle: form.igHandle,
        interest: form.interest,
        message: form.message,
        newsletter: form.newsletter,
      });
```

par :

```ts
      // Emailed to the owner (Resend); ticking "newsletter" also subscribes in Brevo.
      await postForm('/api/contact', {
        name: form.name,
        email: form.email,
        igHandle: form.igHandle,
        interest: form.interest,
        message: form.message,
        newsletter: form.newsletter,
        website: honeypot(e.currentTarget as HTMLFormElement),
      });
```

Dans `src/pages/About.tsx`, même remplacement d'import, puis :
- dans `LeadMagnet`, remplacer les deux lignes `// Lands in the CMS …` + `await strapiCreate('newsletter-signups', { email, source: 'lead-magnet' });` par :
  ```ts
      // Added to the Brevo newsletter list.
      await postForm('/api/newsletter', { email, source: 'lead-magnet', website: honeypot(e.currentTarget as HTMLFormElement) });
  ```
- dans le formulaire newsletter (~l.188), remplacer les deux lignes équivalentes par :
  ```ts
      // Added to the Brevo newsletter list.
      await postForm('/api/newsletter', { email, source: 'newsletter', website: honeypot(e.currentTarget as HTMLFormElement) });
  ```

`e.currentTarget` doit être lu **avant** le premier `await` du handler (React réinitialise l'événement ensuite) : c'est bien le cas, l'appel `honeypot(...)` est évalué avant que `postForm` ne démarre.

Supprimer `src/lib/strapi.ts` (`git rm src/lib/strapi.ts`) et vérifier : `grep -rn "strapi" src` ne doit plus rien afficher hors commentaires de `App.tsx` (traités à la tâche 13).

- [ ] **Step 6: Vérifier**

Run: `npx vitest run` — Expected: PASS
Run: `npm run build` — Expected : build réussi.

Les fonctions ne tournent pas sous `npm run dev` (Vite seul). Pour les essayer en local : `npx vercel dev` (nécessite `npx vercel link` sur le projet, à faire par l'utilisateur). Sinon, elles seront vérifiées sur la preview Vercel (tâche 15).

- [ ] **Step 7: Commit**

```bash
git add api src/lib/forms.ts src/pages/ContactFAQ.tsx src/pages/About.tsx vercel.json
git rm src/lib/strapi.ts
git commit -m "feat(forms): contact via Resend and newsletter via Brevo in Vercel functions

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: `/admin` redirige vers le Studio

**Files:**
- Create: `src/components/AdminRedirect.tsx`
- Modify: `src/App.tsx` (supprimer la fonction locale `AdminRedirect` et son commentaire, l.22-38 ; importer le composant)
- Test: `src/components/AdminRedirect.test.tsx`

**Interfaces:**
- Produces: `AdminRedirect: React.FC<{ go?: (url: string) => void }>`

- [ ] **Step 1: Écrire le test qui échoue**

```tsx
// src/components/AdminRedirect.test.tsx
import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminRedirect from './AdminRedirect';

afterEach(() => vi.unstubAllEnvs());

describe('AdminRedirect', () => {
  it('sends editors to the Sanity Studio', () => {
    vi.stubEnv('VITE_SANITY_STUDIO_URL', 'https://340consultancy.sanity.studio/');
    const go = vi.fn();
    render(<MemoryRouter initialEntries={['/admin']}><AdminRedirect go={go} /></MemoryRouter>);
    expect(go).toHaveBeenCalledWith('https://340consultancy.sanity.studio');
  });

  it('falls back to the home page when no Studio is configured', () => {
    vi.stubEnv('VITE_SANITY_STUDIO_URL', '');
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<p>home</p>} />
          <Route path="/admin" element={<AdminRedirect go={vi.fn()} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
```

Run: `npx vitest run src/components/AdminRedirect.test.tsx`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Implémenter**

```tsx
// src/components/AdminRedirect.tsx
import { useEffect, type FC } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * /admin → the Sanity Studio where the site content is edited
 * (VITE_SANITY_STUDIO_URL). Without a configured Studio the route falls back
 * to the home page.
 */
const AdminRedirect: FC<{ go?: (url: string) => void }> = ({ go = (url) => window.location.replace(url) }) => {
  const studioUrl = (import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined)?.replace(/\/+$/, '');
  useEffect(() => {
    if (studioUrl) go(studioUrl);
  }, [studioUrl, go]);
  if (!studioUrl) return <Navigate to="/" replace />;
  return null; // blank for the split second until the browser navigates
};

export default AdminRedirect;
```

Dans `src/App.tsx` : supprimer le bloc de commentaire `/** /admin → the Strapi admin panel … */` et la fonction `AdminRedirect` locale ; ajouter `import AdminRedirect from '@/components/AdminRedirect';`. Les deux routes `/admin` et `/admin/*` restent. Retirer `useEffect` et `Navigate` des imports de `App.tsx` s'ils ne servent plus ailleurs dans le fichier.

Run: `npx vitest run src/components/AdminRedirect.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminRedirect.tsx src/components/AdminRedirect.test.tsx src/App.tsx
git commit -m "feat(admin): /admin redirects to the Sanity Studio

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Vérification de la migration Strapi → Sanity

**Files:**
- Create: `scripts/sanity/diff-bundles.ts`, `scripts/verify-migration.ts`
- Test: `scripts/sanity/diff-bundles.test.ts`

**Interfaces:**
- Consumes: `mergeStrapiPayload`, `fetchStrapiPayload` (tâche 8), `assembleContent` (tâche 6), `sanityReadClient`, `argValue`, `requireEnv`, `loadDotEnv` (tâche 2), `COLLECTIONS`, `CONTENT_TYPES` (tâche 2), fixture.
- Produces: `diffBundles(shape: unknown, source: unknown, target: unknown, path?: string): string[]`

- [ ] **Step 1: Écrire les tests qui échouent**

```ts
// scripts/sanity/diff-bundles.test.ts
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
```

Run: `npx vitest run scripts/sanity/diff-bundles.test.ts`
Expected: FAIL (module introuvable)

- [ ] **Step 2: Implémenter**

```ts
// scripts/sanity/diff-bundles.ts
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
```

Run: `npx vitest run scripts/sanity/diff-bundles.test.ts`
Expected: PASS

- [ ] **Step 3: Écrire le script de vérification**

```ts
// scripts/verify-migration.ts
//   npm run sanity:verify -- --strapi-url https://cms.340consultancy.com
// Compares what the site showed from Strapi with what Sanity now publishes.
// Exits 1 when anything is missing.
import fixture from '../src/test/fixtures/bundled-content.json';
import { COLLECTIONS, CONTENT_TYPES } from '../src/lib/sanity/documents';
import { assembleContent } from '../src/lib/sanity/from-sanity';
import { argValue, loadDotEnv, requireEnv, sanityReadClient } from './sanity/cli';
import { diffBundles } from './sanity/diff-bundles';
import { fetchStrapiPayload, mergeStrapiPayload } from './sanity/strapi-merge';

loadDotEnv();
const strapiUrl = (argValue('strapi-url') ?? '').replace(/\/+$/, '');
if (!strapiUrl) throw new Error('Préciser --strapi-url https://…');
const projectId = requireEnv('SANITY_PROJECT_ID');
const dataset = requireEnv('SANITY_DATASET');

const source = mergeStrapiPayload(fixture.content, await fetchStrapiPayload(strapiUrl), strapiUrl);
const docs = await sanityReadClient(projectId, dataset).fetch<Record<string, unknown>[]>('*[_type in $types]', { types: CONTENT_TYPES });
const target = assembleContent(docs, { projectId, dataset });

for (const c of COLLECTIONS) {
  const count = (b: Record<string, unknown>) => (Array.isArray(b[c.export]) ? (b[c.export] as unknown[]).length : 0);
  console.log(`${c.title} : Strapi ${count(source)} / Sanity ${count(target)}`);
}

const problems = diffBundles(fixture.content, source, target);
if (problems.length > 0) {
  console.error(`\n${problems.length} écart(s) :`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('\nMigration vérifiée : rien ne manque dans Sanity.');
```

- [ ] **Step 4: Vérifier que le script se charge**

Run: `npm run sanity:verify`
Expected : échec avec `Préciser --strapi-url https://…`.

- [ ] **Step 5: Commit**

```bash
git add scripts/sanity/diff-bundles.ts scripts/sanity/diff-bundles.test.ts scripts/verify-migration.ts package.json
git commit -m "feat(sanity): verify the Strapi to Sanity migration

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 15: ⏸ Bascule en production (actions utilisateur + vérifications)

Cette tâche suit la section 9 de la spec. Chaque action marquée « utilisateur » se fait dans une console tierce ; l'exécutant prépare, vérifie et attend la confirmation.

- [ ] **Step 1 (utilisateur) : services tiers**
  1. **Resend** : créer le compte, ajouter le domaine `340consultancy.com`, publier les enregistrements DNS demandés, attendre « Verified », créer une clé API.
  2. **Brevo** : créer la liste newsletter (noter son ID), créer l'attribut de contact `SOURCE` (type texte), créer une clé API.
  3. **Studio** : depuis `studio/`, `npx sanity login` puis `npx sanity deploy` (nom d'hôte proposé : `340consultancy`) → noter l'URL `https://340consultancy.sanity.studio`.
  4. **Vercel** : Project → Settings → Git → Deploy Hooks → créer un hook sur `main` ; copier l'URL.
  5. **Sanity** : sanity.io/manage → API → Webhooks → nouveau webhook : URL = le deploy hook Vercel, dataset `production`, déclencheurs create/update/delete, brouillons exclus, méthode POST.
  6. **Vercel → Environment Variables** (Production et Preview) : `SANITY_PROJECT_ID`, `SANITY_DATASET=production`, `VITE_SANITY_STUDIO_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `BREVO_API_KEY`, `BREVO_LIST_ID`. **Pas** de `SANITY_WRITE_TOKEN`. Supprimer `VITE_STRAPI_URL` et `VITE_STRAPI_TOKEN` seulement après l'étape 6.

- [ ] **Step 2 : import de production depuis Strapi (dès que `cms.340consultancy.com` répond)**

Vérifier d'abord : `curl -s -o /dev/null -w "%{http_code}" https://cms.340consultancy.com/api/site-content` → `200`.
Dans `.env` : `SANITY_DATASET=production`.
Run: `npm run sanity:import -- --source strapi --strapi-url https://cms.340consultancy.com --overwrite`
Expected : les images puis `… documents et … images écrits dans le dataset « production ».` Les avertissements `⚠ … champ absent du schéma, ignoré` attendus concernent uniquement des champs Strapi que le site n'affiche pas (`seo`, `order`, `slug`, `number`…) : les relire un par un ; tout autre champ signalé est un manque à corriger dans les schémas avant de continuer.

- [ ] **Step 3 : vérification de la migration**

Run: `npm run sanity:verify -- --strapi-url https://cms.340consultancy.com`
Expected : comptes identiques pour les 4 collections et `Migration vérifiée : rien ne manque dans Sanity.`

- [ ] **Step 4 (utilisateur) : preview Vercel**

Avec l'accord de l'utilisateur : `git push -u origin simplify/sanity-migration`. Sur la preview Vercel de la branche :
  - parcourir toutes les routes listées à la tâche 10, étape 7, en comparant avec le site en production ;
  - envoyer le formulaire de contact (case newsletter cochée) → email reçu dans `CONTACT_TO_EMAIL`, répondre à l'email part bien vers le visiteur, contact présent dans Brevo avec `SOURCE = contact-form` ;
  - s'inscrire via le lead magnet et la newsletter → contacts dans Brevo avec la bonne source ;
  - aller sur `/admin` → redirection vers le Studio.

- [ ] **Step 5 (utilisateur + cliente) : essai de publication**

Inviter la cliente dans le projet Sanity (rôle Editor). Elle modifie un texte et publie → un déploiement Vercel démarre (deploy hook) ; vérifier que le changement apparaît sur la preview après le build suivant de la branche, puis sur la production après la fusion.

- [ ] **Step 6 (utilisateur) : fusion**

Ouvrir la PR `simplify/sanity-migration` → `main`, la fusionner. Vérifier la production : toutes les routes, un envoi de formulaire. Prévenir la cliente : l'admin est désormais `340consultancy.com/admin` → Studio Sanity, et Strapi ne doit plus être utilisé.

---

### Task 16: Nettoyage (une semaine après la bascule, sans incident)

**Files:**
- Delete: `cms/`, `docker-compose.yml`, `.env.docker.example`, `scripts/dump-seed.ts`, `scripts/verify-cms.ts`, `scripts/snapshot-bundled-content.ts`, `scripts/generate-sanity-schemas.ts`, `scripts/import-to-sanity.ts`, `scripts/verify-migration.ts`, `scripts/sanity/infer-schema.ts` (+ test), `scripts/sanity/to-sanity.ts` (+ test), `scripts/sanity/strapi-merge.ts` (+ test), `scripts/sanity/diff-bundles.ts` (+ test), `src/test/fixtures/bundled-content.json`, les images de `src/assets/` (pas `src/assets/fonts/`)
- Modify: `src/content/assets.ts`, `package.json`

- [ ] **Step 1: Supprimer l'infrastructure Strapi et les outils jetables**

```bash
git rm -r cms docker-compose.yml .env.docker.example scripts/dump-seed.ts scripts/verify-cms.ts
git rm scripts/snapshot-bundled-content.ts scripts/generate-sanity-schemas.ts scripts/import-to-sanity.ts scripts/verify-migration.ts
git rm scripts/sanity/infer-schema.ts scripts/sanity/infer-schema.test.ts scripts/sanity/to-sanity.ts scripts/sanity/to-sanity.test.ts
git rm scripts/sanity/strapi-merge.ts scripts/sanity/strapi-merge.test.ts scripts/sanity/diff-bundles.ts scripts/sanity/diff-bundles.test.ts
git rm src/test/fixtures/bundled-content.json
```

Dans `package.json`, supprimer `sanity:snapshot`, `sanity:schemas`, `sanity:import`, `sanity:verify`.

En tête des fichiers `studio/schemaTypes/*.ts`, remplacer les deux lignes de commentaire « Generated once by … » par : `// Sanity schema — edit by hand. Field names must match the site's content types (src/content/**).`

- [ ] **Step 2: Vider le registre d'images**

Les images de contenu viennent toutes de Sanity. Vérifier qu'aucun composant n'utilise une clé d'image en dur : `grep -rhoE "img\(['\"][a-z0-9-]+['\"]\)" src` ne doit rien afficher (constaté vide lors de la rédaction du plan). Puis remplacer tout le contenu de `src/content/assets.ts` par :

```ts
// ─────────────────────────────────────────────────────────────────────────────
// Image helper. Content images are Sanity CDN URLs (see src/lib/sanity/
// from-sanity.ts); `img()` is kept so components read the same as before.
// ─────────────────────────────────────────────────────────────────────────────

/** Any image reference used by the content: a full URL. */
export type AssetKey = string;

export const img = (src: AssetKey): string => src;
```

Dans `src/content/index.ts`, remplacer `export { assets, img, type AssetKey } from './assets';` par `export { img, type AssetKey } from './assets';`.

Supprimer les images : `git rm src/assets/*.jpg src/assets/*.png` (garder `src/assets/fonts/`). Vérifier : `grep -rn "@/assets/" src | grep -v fonts` ne doit rien afficher.

- [ ] **Step 3: Vérifier**

Run: `npx vitest run` — Expected: PASS
Run: `npm run build` — Expected : build réussi.
Run: `npm run lint` — Expected : pas de nouvelle erreur.
Run: `npm install` puis `npm audit --omit=dev` — noter le nombre de vulnérabilités restantes pour l'utilisateur (le gros venait de Strapi).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Strapi, Railway tooling and one-off migration scripts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5 (utilisateur) : supprimer Railway**

Avec l'accord de l'utilisateur et après une semaine sans incident : supprimer le projet Railway « zealous-unity » (Strapi + Postgres + volume), retirer `VITE_STRAPI_URL` / `VITE_STRAPI_TOKEN` de Vercel, supprimer l'enregistrement DNS `cms.340consultancy.com`, révoquer le token Railway partagé pendant le diagnostic. Pousser la branche de nettoyage et la fusionner.
