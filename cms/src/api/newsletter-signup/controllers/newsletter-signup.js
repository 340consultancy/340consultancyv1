'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

// Public create-only inbox (see routes/): the newsletter / lead-magnet forms
// POST here. No public read routes — signups are only visible in the admin.
module.exports = createCoreController('api::newsletter-signup.newsletter-signup', () => ({
  async create(ctx) {
    const b = ctx.request.body?.data ?? ctx.request.body ?? {};
    try {
      await strapi
        .service('api::newsletter-signup.newsletter-signup')
        .subscribe(b.email, b.source);
    } catch {
      return ctx.badRequest('a valid email is required');
    }
    ctx.body = { ok: true };
  },
}));
