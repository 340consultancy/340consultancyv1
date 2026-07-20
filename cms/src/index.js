'use strict';

const fs = require('fs');
const path = require('path');
const { applyContentManagerConfig } = require('./content-manager-config');
const { seedMedia } = require('./media-seed');

const SINGLE_UIDS = {
  global: 'api::global.global',
  'home-page': 'api::home-page.home-page',
  'about-page': 'api::about-page.about-page',
  'services-page': 'api::services-page.services-page',
  'contact-page': 'api::contact-page.contact-page',
  'up2date-page': 'api::up2date-page.up2date-page',
  'work-page': 'api::work-page.work-page',
  'privacy-page': 'api::privacy-page.privacy-page',
  'not-found-page': 'api::not-found-page.not-found-page',
};

const COLLECTION_UIDS = {
  testimonial: 'api::testimonial.testimonial',
  service: 'api::service.service',
  'case-study': 'api::case-study.case-study',
  'blog-post': 'api::blog-post.blog-post',
  'instagram-post': 'api::instagram-post.instagram-post',
};

/**
 * Adapt a raw seed value (shape of the frontend's src/content/**) to the
 * schema of a content type / component, guided by the model definition:
 *  - media attributes are skipped (images get uploaded via the admin later;
 *    the site falls back to its bundled images while a media field is empty)
 *  - plain-string arrays are wrapped into their single-field component
 *    (e.g. "…" → { text: "…" } for repeatable shared.text)
 *  - json attributes pass through verbatim
 */
function adapt(strapi, uid, raw) {
  const model = strapi.getModel(uid);
  if (!model || typeof raw !== 'object' || raw === null) return undefined;
  const data = {};
  for (const [name, attr] of Object.entries(model.attributes)) {
    const value = raw[name];
    if (value === undefined || value === null) continue;
    switch (attr.type) {
      case 'media':
        break;
      case 'json':
        data[name] = value;
        break;
      case 'component': {
        if (attr.repeatable) {
          if (!Array.isArray(value)) break;
          const compModel = strapi.getModel(attr.component);
          const firstAttr = Object.keys(compModel.attributes)[0];
          data[name] = value
            .map((item) =>
              typeof item === 'object' && item !== null
                ? adapt(strapi, attr.component, item)
                : { [firstAttr]: item }
            )
            .filter((item) => item !== undefined);
        } else {
          const sub = adapt(strapi, attr.component, value);
          if (sub !== undefined) data[name] = sub;
        }
        break;
      }
      case 'string':
      case 'text':
      case 'richtext':
      case 'email':
      case 'enumeration':
      case 'uid':
        if (typeof value === 'string') data[name] = value;
        break;
      case 'integer':
      case 'biginteger':
      case 'float':
      case 'decimal':
        if (typeof value === 'number') data[name] = value;
        break;
      case 'boolean':
        if (typeof value === 'boolean') data[name] = value;
        break;
      default:
        break;
    }
  }
  return data;
}

module.exports = {
  register({ strapi }) {
    // Upstream bug in @notum-cz/strapi-plugin-seo v2: the admin panel calls
    // its API under the npm package name (/@notum-cz/strapi-plugin-seo/…)
    // while the server mounts the plugin under its short name (/seo/…) —
    // every call 404s and the SEO page crashes. Rewrite the prefix so the
    // two meet; becomes a harmless no-op once upstream fixes the path.
    const WRONG_PREFIX = '/@notum-cz/strapi-plugin-seo/';
    strapi.server.use(async (ctx, next) => {
      if (ctx.url.startsWith(WRONG_PREFIX)) {
        ctx.url = `/seo/${ctx.url.slice(WRONG_PREFIX.length)}`;
      }
      await next();
    });
  },

  /**
   * Pre-fill the CMS with the site's bundled text content from data/seed.json
   * (generated in the frontend via `npm run cms:seed-dump`). Each single type
   * is seeded when it doesn't exist yet, each collection when it is empty —
   * so newly added content types get filled in on existing installations
   * without touching anything the editors already changed.
   * Disable with SEED_FROM_DEFAULTS=false.
   */
  async bootstrap({ strapi }) {
    await applyContentManagerConfig(strapi);

    // Camera photos carry an EXIF rotation flag; without auto-orientation
    // Strapi's resized variants (thumbnails etc.) render sideways. Strapi
    // defaults this to OFF — force it on so every future upload is upright.
    try {
      const uploadStore = strapi.store({ type: 'plugin', name: 'upload', key: 'settings' });
      const settings = await uploadStore.get();
      if (settings && settings.autoOrientation !== true) {
        await uploadStore.set({ value: { ...settings, autoOrientation: true } });
        strapi.log.info('[upload-settings] enabled autoOrientation (EXIF-aware image variants)');
      }
    } catch (err) {
      strapi.log.warn(`[upload-settings] could not enable autoOrientation: ${err.message}`);
    }

    if (process.env.SEED_FROM_DEFAULTS === 'false') return;
    // process.cwd() = app root — works both from source (develop) and from the
    // compiled dist/ output (start).
    const seedPath = path.join(process.cwd(), 'data', 'seed.json');
    if (!fs.existsSync(seedPath)) return;

    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    let seeded = 0;

    for (const [name, uid] of Object.entries(SINGLE_UIDS)) {
      if (!seed[name]) continue;
      try {
        const exists = await strapi.documents(uid).findFirst();
        if (exists) continue;
        await strapi.documents(uid).create({ data: adapt(strapi, uid, seed[name]), status: 'published' });
        seeded++;
        strapi.log.info(`[seed] created single type "${name}" from bundled defaults`);
      } catch (err) {
        strapi.log.warn(`[seed] ${name}: ${err.message}`);
      }
    }

    for (const [name, uid] of Object.entries(COLLECTION_UIDS)) {
      const rows = seed[name];
      if (!Array.isArray(rows) || rows.length === 0) continue;
      try {
        const existing = await strapi.documents(uid).findMany({ limit: 1 });
        if (existing.length > 0) continue;
      } catch (err) {
        strapi.log.warn(`[seed] ${name}: ${err.message}`);
        continue;
      }
      for (let idx = 0; idx < rows.length; idx++) {
        try {
          await strapi.documents(uid).create({
            data: { ...adapt(strapi, uid, rows[idx]), order: idx + 1 },
            status: 'published',
          });
          seeded++;
        } catch (err) {
          strapi.log.warn(`[seed] ${name}[${idx}]: ${err.message}`);
        }
      }
      strapi.log.info(`[seed] filled empty collection "${name}" (${rows.length} entries)`);
    }

    if (seeded > 0) {
      strapi.log.info('[seed] Text content seeded.');
    }

    // Upload bundled images into the Media Library and link every empty media
    // field to them (idempotent — runs on first start and after new deploys).
    try {
      await seedMedia(strapi, seed, { singleUids: SINGLE_UIDS, collectionUids: COLLECTION_UIDS });
    } catch (err) {
      strapi.log.warn(`[media-seed] skipped: ${err.message}`);
    }
  },
};
