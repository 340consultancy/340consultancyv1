'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

module.exports = createCoreService('api::newsletter-signup.newsletter-signup', () => ({
  /**
   * Store a signup once per address (case-insensitive) — re-subscribing the
   * same email is a silent no-op, so the inbox never fills with duplicates.
   */
  async subscribe(rawEmail, source) {
    const email = String(rawEmail || '').trim().toLowerCase().slice(0, 320);
    if (!EMAIL_RE.test(email)) throw new Error('invalid email');
    const existing = await strapi
      .documents('api::newsletter-signup.newsletter-signup')
      .findFirst({ filters: { email: { $eqi: email } } });
    if (existing) return existing;
    return strapi.documents('api::newsletter-signup.newsletter-signup').create({
      data: { email, source: String(source || '').slice(0, 100) },
    });
  },
}));
