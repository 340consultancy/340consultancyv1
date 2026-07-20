'use strict';

// The key (route slug) is hidden from editors — derive it from the label.
const slugify = (s) =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const fill = (data) => {
  if (!data) return;
  if (!data.key && data.label) data.key = slugify(data.label.split('\n').pop());
};

module.exports = {
  beforeCreate(event) { fill(event.params.data); },
  beforeUpdate(event) { fill(event.params.data); },
};
