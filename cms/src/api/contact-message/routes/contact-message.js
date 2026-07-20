'use strict';

// Create-only: the form POST is public, but there are deliberately NO public
// read/update/delete routes — submissions are only visible in the admin.
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contact-messages',
      handler: 'contact-message.create',
      config: { auth: false },
    },
  ],
};
