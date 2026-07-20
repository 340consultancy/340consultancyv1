'use strict';

// The slug is hidden from editors — derive it from the client name.
const slugify = (s) =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const fill = (data) => {
  if (!data) return;
  if (!data.slug && data.client) data.slug = slugify(data.client);
};

module.exports = {
  beforeCreate(event) { fill(event.params.data); },
  beforeUpdate(event) { fill(event.params.data); },
};
