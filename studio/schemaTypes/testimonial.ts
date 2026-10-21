// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "testimonial",
  "title": "Testimonials",
  "type": "document",
  "fields": [
    {
      "name": "quote",
      "title": "Quote",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "name",
      "title": "Name",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "role",
      "title": "Role",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "order",
      "title": "Order",
      "type": "number",
      "description": "Position in the list (1 = first)."
    }
  ],
  "preview": {
    "select": {
      "title": "name"
    }
  }
};
