'use strict';

// Create-only: the form POST is public, but there are deliberately NO public
// read/update/delete routes — signups are only visible in the admin.
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/newsletter-signups',
      handler: 'newsletter-signup.create',
      config: { auth: false },
    },
  ],
};
