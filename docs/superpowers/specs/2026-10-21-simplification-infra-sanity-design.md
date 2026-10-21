# Simplification de l'infrastructure — passage de Strapi à Sanity

- **Date** : 2026-10-21
- **Statut** : design validé, en attente de relecture de la spec
- **Repo** : https://github.com/340consultancy/340consultancyv1 — branche `simplify/sanity-migration`

## 1. Contexte et objectif

Le site 340 Consultancy est une SPA Vite + React hébergée sur Vercel. Son contenu
vient d'un Strapi 5 hébergé sur Railway (Strapi + Postgres + volume d'uploads),
avec trois plugins, un patch `patch-package`, du code d'amorçage maison (seed,
renommage des champs de l'admin) et une copie complète du contenu dans
`src/content/**` qui sert de secours quand le CMS ne répond pas.

Le 2026-10-21, Strapi a planté à chaque upload d'image : deux versions de `sharp`
(0.33.5 pour Strapi, 0.32.6 embarquée par `strapi-plugin-imgfmtconv`) chargent
deux `libvips` dans le même processus et corrompent la mémoire
(`Segmentation fault`, `munmap_chunk(): invalid pointer`). Après 10 redémarrages
Railway a abandonné (`CRASHED`, 502) ; le site est retombé sur le contenu de
secours, obsolète. Une panne Railway le même jour a empêché tout redémarrage.

**Objectif** : réduire l'infrastructure au strict minimum, sans aucun serveur à
maintenir, tout en gardant pour la cliente une interface d'édition confortable.

**Contraintes exprimées**
- La cliente publie elle-même et souvent (articles, images) : il lui faut un vrai admin.
- Contact → email dans la boîte de la cliente. Newsletter → Brevo.
- Le projet doit rester maintenable sans expertise CMS spécifique.

**Critères de réussite**
- Plus aucun service à héberger hors Vercel ; Railway supprimé.
- Une panne du CMS n'affecte jamais le site en ligne.
- La cliente publie un article avec images depuis le Studio et le voit en ligne en ~1 minute.
- Tout le contenu actuel de Strapi (y compris ses éditions depuis juillet) est présent dans Sanity.
- Les formulaires contact et newsletter arrivent respectivement par email et dans Brevo.

## 2. Architecture

```
Cliente ──édite──▶ Sanity Studio (hébergé par Sanity, *.sanity.studio)
                        │ publication
                        ▼
                  webhook Sanity ──▶ deploy hook Vercel (rebuild ~1 min)
                                          │ prebuild : lit tout le contenu Sanity (GROQ)
                                          ▼
Visiteur ◀── SPA statique (Vercel) ── images via CDN Sanity
    │
    ├── POST /api/contact    (fonction Vercel) ──▶ Resend ──▶ email cliente
    └── POST /api/newsletter (fonction Vercel) ──▶ API Brevo (ajout contact)
```

**Décision clé : le contenu est lu au build, jamais à l'exécution.** Le site
construit ne dépend pas de Sanity. Si Sanity est indisponible pendant un build,
le build échoue et Vercel garde la version précédente en ligne. Contrepartie
acceptée : ~1 minute entre « Publier » et la mise en ligne.

**Supprimé** : `cms/` en entier, `docker-compose.yml`, `.env.docker.example`,
`scripts/dump-seed.ts`, `scripts/verify-cms.ts`, `src/lib/strapi.ts`,
`src/lib/cmsContent.ts`, le contenu de secours de `src/content/**` (les
données ; les types sont conservés), les images de `src/assets/` (hors polices),
le projet Railway.

**Ajouté** : `studio/` (schémas et configuration Sanity Studio),
`scripts/fetch-content.ts` (prebuild), `api/contact.ts`, `api/newsletter.ts`.

## 3. Modèle de contenu Sanity

17 types Strapi → 13 types Sanity. Disparaissent : `contact-message`,
`newsletter-signup` (remplacés par email / Brevo), `site-content` (endpoint
technique d'agrégation), `instagram-post` (devient un champ liste d'URLs).

### Collections

| Type Sanity | Champs | Différences avec l'existant |
|---|---|---|
| `blogPost` | title, slug, category, excerpt, image, number, author, publishedDate, body, seo | `body` passe en Portable Text (texte riche) ; l'ancien champ `date` (qui contient en fait la catégorie) devient `category`. |
| `caseStudy` | mêmes champs que `CaseStudy` (client, industry, services, website, headline, heroImg, intro, challenge, approach, resultText, stats[], visuals[2], gallery[], cardImg, cardTag, cardStat, cardHeadline), seo | Les `AssetKey` deviennent des images Sanity (avec recadrage). |
| `service` | mêmes champs que `src/content/collections/services.ts`, seo | Images → images Sanity. |
| `testimonial` | quote, author (+ champs existants) | Aucun. |

### Pages uniques (singletons)

`homePage`, `aboutPage`, `servicesPage`, `workPage`, `up2datePage`,
`contactPage`, `privacyPage`, `notFoundPage`, `siteSettings`.

`siteSettings` regroupe `nav`, `footer`, `cta`, `showcase`, `igPostUrls`.

Chaque singleton reprend la forme de l'objet TypeScript correspondant dans
`src/content/pages/*.ts` / `src/content/sections/*.ts`, plus un bloc `seo`
(title, description). Le Studio range les singletons dans un menu « Pages »
(Structure Builder) et interdit leur création multiple ou leur suppression.

### Règles transverses
- Les champs affichés systématiquement par le site sont marqués requis (validation Sanity bloquant la publication).
- Les icônes restent une liste fermée (`IconName`) proposée en liste déroulante.
- Les images sont servies via `@sanity/image-url` avec largeur adaptée et `auto=format` (WebP/AVIF automatiques), ce qui remplace le plugin de conversion.

## 4. Lecture du contenu au build

- `scripts/fetch-content.ts` s'exécute en `prebuild` (et avant `dev`). Il lance
  une requête GROQ par type, transforme les documents dans les formes
  TypeScript existantes (`BlogArticle`, `CaseStudy`, etc.) et écrit
  `src/content/generated/content.json`.
- `src/content/index.ts` exporte ces objets depuis le JSON généré. Les pages
  continuent d'importer depuis `@/content` : aucun changement côté pages, sauf
  le rendu du corps des articles (`BlogArticlePage.tsx`), qui passe à
  `@portabletext/react`.
- Les champs image sortent en URL absolues du CDN Sanity ; l'helper `img()`
  accepte une URL au lieu d'un `AssetKey`.
- La transformation (Sanity → types du site) est une fonction pure, testée
  séparément de l'appel réseau.
- Le dataset Sanity est public en lecture (contenu publié seulement) : aucun
  token n'est nécessaire au build. `src/content/generated/` est ignoré par git.
- En dev local, `npm run dev` lance le fetch une fois au démarrage ; un
  `npm run content` permet de rafraîchir.

## 5. Formulaires

### `/api/contact` (fonction Vercel)
- Entrée : name, email, message (+ champs actuels du formulaire de `ContactFAQ.tsx`) et un champ caché `website` (piège à robots).
- Validation serveur avec zod. Piège rempli → réponse 200 sans envoi.
- Envoi via Resend depuis une adresse du domaine `340consultancy.com`, vers `CONTACT_TO_EMAIL`, avec `reply_to` = email du visiteur.
- Variables : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

### `/api/newsletter` (fonction Vercel)
- Entrée : email, source (`lead-magnet` | `newsletter`), champ piège.
- Appel `POST https://api.brevo.com/v3/contacts` avec `listIds` = `BREVO_LIST_ID`, `updateEnabled: true`, attribut `SOURCE`.
- Variables : `BREVO_API_KEY`, `BREVO_LIST_ID`.

### Côté site
- `About.tsx` et `ContactFAQ.tsx` appellent ces deux routes à la place de `strapiCreate`.
- En cas d'échec, le formulaire affiche un message avec l'adresse email de contact plutôt que d'échouer silencieusement.
- Aucun secret dans une variable `VITE_*`.

## 6. Migration du contenu

**Source de vérité** : la base Postgres de Strapi sur Railway (elle contient les
éditions faites par la cliente depuis juillet), pas `src/content/**`.

1. Script `scripts/migrate-from-strapi.ts` (jetable, supprimé après la bascule) :
   lit l'endpoint public `GET /api/site-content` de Strapi (lecture seule,
   aucun upload, donc aucun risque de déclencher le crash `sharp`), télécharge
   chaque image depuis `cms.340consultancy.com/uploads/…`, l'envoie dans Sanity,
   puis crée les documents avec les références d'images.
2. Le corps des articles (texte brut avec `## `) est converti en Portable Text
   (paragraphes + titres h2).
3. Script de vérification : compare le nombre d'articles, d'études de cas, de
   services, de témoignages et d'images entre Strapi et Sanity, et liste les
   champs vides côté Sanity qui étaient remplis côté Strapi.

Tant que Railway est indisponible, le développement avance avec un import
provisoire depuis `src/content/**` (dataset Sanity `development`). L'import
définitif depuis Strapi vise le dataset `production`.

## 7. Gestion des erreurs

| Situation | Comportement |
|---|---|
| Sanity indisponible pendant un build | Build en échec, la version en ligne reste servie. |
| Champ requis manquant | Publication bloquée dans le Studio. |
| Champ optionnel vide | Le site masque le bloc concerné (comportement actuel des pages). |
| Resend / Brevo en échec | Réponse 502 de la fonction ; le formulaire affiche le message de repli avec l'email de contact. |
| Spam | Champ piège + validation zod ; pas de captcha visible. |

## 8. Tests

- Vitest : transformation Sanity → types du site (y compris Portable Text et
  images), validation et comportement des deux fonctions API (Resend et Brevo
  mockés, champ piège, entrées invalides).
- Script de vérification de la migration (section 6).
- Vérification manuelle de chaque route en local, puis sur la preview Vercel
  de la branche, avant fusion dans `main`.
- `npm run build` et `npm run lint` passent.

## 9. Déroulé

0. **Correctif d'urgence (indépendant)** : désactiver `imgfmtconv` dans
   `cms/config/plugins.js` sur `main`, pour que Strapi cesse de planter pendant
   la transition.
1. Développement sur `simplify/sanity-migration` (production intacte).
2. Création des comptes par le prestataire ou la cliente : projet Sanity, compte Resend
   avec domaine vérifié (DNS), clé API et liste Brevo, deploy hook Vercel relié
   au webhook Sanity.
3. Import définitif du contenu depuis Strapi dès que Railway répond, puis vérification.
4. Preview Vercel validée par le prestataire et la cliente ; invitation de la cliente dans le Studio.
5. Fusion dans `main` ; variables d'environnement Vercel en place.
6. Après une semaine sans incident : suppression du projet Railway.

## 10. Hors périmètre

- Pré-rendu HTML des pages pour le SEO (possible ensuite, puisque le contenu est connu au build).
- Refonte visuelle, multilingue.
- Mise à jour générale des dépendances du site (une partie des alertes `npm audit` disparaît avec Strapi).
