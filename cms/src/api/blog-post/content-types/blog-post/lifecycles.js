'use strict';

// Technical fields are hidden from editors — fill them automatically.
const slugify = (s) =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const fill = (data) => {
  if (!data) return;
  if (!data.slug && data.title) data.slug = slugify(data.title);
  if (!data.number && data.order) data.number = String(data.order).padStart(2, '0');
};

module.exports = {
  beforeCreate(event) { fill(event.params.data); },
  beforeUpdate(event) { fill(event.params.data); },
};
