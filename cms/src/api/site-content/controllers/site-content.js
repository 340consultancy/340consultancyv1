'use strict';

const crypto = require('crypto');

/**
 * Verify a preview token minted by the admin preview handler (config/admin.js):
 * "<expiresMs>.<hmacSha256Hex(expiresMs, PREVIEW_SECRET)>". Short-lived and
 * signed, so the raw secret never travels in URLs or logs. Comparison is
 * constant-time (hashed first so lengths may differ).
 */
function validPreviewToken(token, secret) {
  if (typeof token !== 'string' || !token || typeof secret !== 'string' || !secret) {
    return false;
  }
  const [expires, sig] = token.split('.');
  if (!expires || !sig || !/^\d+$/.test(expires) || Number(expires) < Date.now()) {
    return false;
  }
  const expected = crypto.createHmac('sha256', secret).update(expires).digest('hex');
  const a = crypto.createHash('sha256').update(sig).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

/**
 * Build a populate object that follows every media / component / dynamic-zone
 * attribute of a model recursively, so singles come back fully nested.
 */
function buildPopulate(strapi, uid, depth = 0) {
  if (depth > 8) return true;
  const model = strapi.getModel(uid);
  if (!model) return true;
  const populate = {};
  for (const [name, attr] of Object.entries(model.attributes)) {
    // Relations are deliberately NOT populated: the site content has none it
    // needs, and populating them would expose admin bookkeeping relations
    // (createdBy/updatedBy → admin user records) on this public endpoint.
    if (attr.type === 'media') {
      populate[name] = true;
    } else if (attr.type === 'component') {
      const sub = buildPopulate(strapi, attr.component, depth + 1);
      populate[name] = sub === true ? true : { populate: sub };
    } else if (attr.type === 'dynamiczone') {
      populate[name] = { populate: '*' };
    }
  }
  return Object.keys(populate).length > 0 ? populate : true;
}

/** Defensively strip admin bookkeeping keys from an API result. */
function stripAdminKeys(value) {
  if (Array.isArray(value)) return value.map(stripAdminKeys);
  if (value && typeof value === 'object') {
    const { createdBy, updatedBy, ...rest } = value;
    for (const k of Object.keys(rest)) rest[k] = stripAdminKeys(rest[k]);
    return rest;
  }
  return value;
}

module.exports = {
  async find(ctx) {
    // Draft preview (admin "Open preview", draft tab): ?status=draft plus a
    // valid X-Preview-Token header serves the draft versions instead. Without
    // a valid token this public endpoint only ever serves published content
    // (invalid/expired tokens fall back silently so stale preview links still
    // render the live site).
    let status = 'published';
    if (ctx.query.status === 'draft') {
      if (validPreviewToken(ctx.request.headers['x-preview-token'], process.env.PREVIEW_SECRET)) {
        status = 'draft';
      } else {
        strapi.log.warn('[site-content] draft requested without valid preview token — serving published');
      }
    }

    // Types without any media/component attribute yield `true` from
    // buildPopulate; the document service rejects `populate: true`, so map it
    // to undefined (no populate needed for plain scalar types like 404).
    const popOf = (uid) => {
      const p = buildPopulate(strapi, uid);
      return p === true ? undefined : p;
    };
    const single = async (uid) => {
      try {
        return await strapi.documents(uid).findFirst({
          populate: popOf(uid),
          status,
        });
      } catch (err) {
        strapi.log.warn(`[site-content] failed to load ${uid}: ${err.message}`);
        return null;
      }
    };
    const collection = async (uid, sort = 'order:asc') => {
      try {
        return await strapi.documents(uid).findMany({
          populate: popOf(uid),
          sort,
          status,
          limit: 100,
        });
      } catch (err) {
        strapi.log.warn(`[site-content] failed to load ${uid}: ${err.message}`);
        return [];
      }
    };

    // order:asc puts NULL first in SQLite/Postgres — entries an editor created
    // without a number would jump to the front. Push them to the end instead.
    const nullOrderLast = (rows) =>
      [...rows].sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));

    const [
      global, homePage, aboutPage, servicesPage, contactPage, up2datePage, workPage, privacyPage, notFoundPage,
      testimonialsRaw, servicesRaw, caseStudiesRaw, blogPosts, instagramPosts,
    ] = await Promise.all([
      single('api::global.global'),
      single('api::home-page.home-page'),
      single('api::about-page.about-page'),
      single('api::services-page.services-page'),
      single('api::contact-page.contact-page'),
      single('api::up2date-page.up2date-page'),
      single('api::work-page.work-page'),
      single('api::privacy-page.privacy-page'),
      single('api::not-found-page.not-found-page'),
      collection('api::testimonial.testimonial'),
      collection('api::service.service'),
      collection('api::case-study.case-study'),
      // Newest post first, automatically — no manual order numbers.
      collection('api::blog-post.blog-post', ['createdAt:desc', 'id:desc']),
      collection('api::instagram-post.instagram-post', ['createdAt:desc', 'id:desc']),
    ]);

    const testimonials = nullOrderLast(testimonialsRaw);
    const services = nullOrderLast(servicesRaw);
    const caseStudies = nullOrderLast(caseStudiesRaw);

    ctx.body = stripAdminKeys({
      global, homePage, aboutPage, servicesPage, contactPage, up2datePage, workPage, privacyPage, notFoundPage,
      testimonials, services, caseStudies, blogPosts, instagramPosts,
    });
  },
};
