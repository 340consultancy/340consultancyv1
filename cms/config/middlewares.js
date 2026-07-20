module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Frontend origins allowed to read the API. "*" keeps local dev and
      // Vercel preview URLs working; tighten via CORS_ORIGINS in production,
      // e.g. CORS_ORIGINS=https://340consultancy.com,https://www.340consultancy.com
      origin: process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
        : ['*'],
      // Strapi's defaults plus the draft-preview token header the site sends
      // on /api/site-content (see src/lib/cmsContent.ts in the web app).
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Preview-Token'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
