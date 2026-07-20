'use strict';

// Public, read-only aggregate of all published site content — the frontend
// hydrates from this single endpoint (see src/lib/cmsContent.ts in the web app).
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/site-content',
      handler: 'site-content.find',
      config: { auth: false },
    },
  ],
};
