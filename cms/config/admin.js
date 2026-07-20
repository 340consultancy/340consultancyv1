const crypto = require('crypto');

// Maps every previewable content type to its public path on the website.
// Types without an own page (inboxes, testimonials, global, …) are absent —
// the admin shows no preview button for them. Slug-based types return null
// while the entry has no slug/key yet (nothing to link to).
const PREVIEW_PATHS = {
  'api::home-page.home-page': () => '/',
  'api::about-page.about-page': () => '/about-us',
  'api::services-page.services-page': () => '/services',
  'api::work-page.work-page': () => '/work',
  'api::up2date-page.up2date-page': () => '/about',
  'api::contact-page.contact-page': () => '/contact',
  'api::privacy-page.privacy-page': () => '/privacy',
  'api::not-found-page.not-found-page': () => '/404',
  'api::blog-post.blog-post': (doc) => (doc && doc.slug ? `/blog/${doc.slug}` : null),
  'api::case-study.case-study': (doc) => (doc && doc.slug ? `/work/${doc.slug}` : null),
  'api::service.service': (doc) => (doc && doc.key ? `/services/${doc.key}` : null),
};

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
  // "Open preview" in the Content Manager — renders the website inside the
  // admin. The draft tab appends ?cmsPreview=<expires>.<hmac> to the page URL:
  // a short-lived token signed with PREVIEW_SECRET (the raw secret itself
  // never appears in a URL or log). The frontend sends the token back as the
  // X-Preview-Token header on /api/site-content, which verifies it and serves
  // the draft content. Without a PREVIEW_SECRET the preview still works but
  // always shows the published state.
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('CLIENT_URL', 'http://localhost:8080'),
      async handler(uid, { documentId, status }) {
        const toPath = PREVIEW_PATHS[uid];
        if (!toPath) return null;
        // Only slug/key-based types need the document to build their path.
        const document =
          toPath.length > 0
            ? (await strapi.documents(uid).findOne({ documentId, status })) ||
              (await strapi.documents(uid).findOne({ documentId }))
            : null;
        const pathname = toPath(document);
        if (!pathname) return null;
        const clientUrl = env('CLIENT_URL', 'http://localhost:8080');
        const secret = env('PREVIEW_SECRET');
        if (status === 'draft' && secret) {
          const expires = String(Date.now() + 12 * 60 * 60 * 1000); // 12h
          const sig = crypto.createHmac('sha256', secret).update(expires).digest('hex');
          return `${clientUrl}${pathname}?${new URLSearchParams({ cmsPreview: `${expires}.${sig}` })}`;
        }
        return `${clientUrl}${pathname}`;
      },
    },
  },
});
