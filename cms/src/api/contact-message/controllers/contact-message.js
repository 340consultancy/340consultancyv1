'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Public create-only inbox (see routes/): the website's contact form POSTs
// here. Input is sanitized server-side; there are NO public read routes.
module.exports = createCoreController('api::contact-message.contact-message', () => ({
  async create(ctx) {
    const b = ctx.request.body?.data ?? ctx.request.body ?? {};
    const data = {
      name: str(b.name, 200),
      email: str(b.email, 320),
      igHandle: str(b.igHandle, 200),
      interest: str(b.interest, 200),
      message: str(b.message, 5000),
      newsletter: Boolean(b.newsletter),
    };
    if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
      return ctx.badRequest('name, email and message are required');
    }

    const entry = await strapi.documents('api::contact-message.contact-message').create({ data });

    // The "keep me posted" checkbox doubles as a newsletter signup.
    if (data.newsletter) {
      try {
        await strapi.service('api::newsletter-signup.newsletter-signup').subscribe(data.email, 'contact-form');
      } catch (err) {
        strapi.log.warn(`[contact-message] newsletter signup failed: ${err.message}`);
      }
    }

    ctx.body = { ok: true, id: entry.documentId };
  },
}));
