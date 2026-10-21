// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "service",
  "title": "Services",
  "type": "document",
  "fields": [
    {
      "name": "key",
      "title": "Key",
      "type": "slug",
      "options": {
        "source": "label",
        "maxLength": 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "label",
      "title": "Label",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "eyebrow",
      "title": "Eyebrow",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "img",
      "title": "Img",
      "type": "image",
      "options": {
        "hotspot": true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "tagline",
      "title": "Tagline",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "price",
      "title": "Price",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "priceNote",
      "title": "Price note",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "body",
      "title": "Body",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "facts",
      "title": "Facts",
      "type": "array",
      validation: (Rule: any) => Rule.required(),
      "of": [
        {
          "type": "object",
          "name": "item",
          "fields": [
            {
              "name": "label",
              "title": "Label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "value",
              "title": "Value",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ],
          "preview": {
            "select": {
              "title": "label"
            }
          }
        }
      ]
    },
    {
      "name": "includes",
      "title": "Includes",
      "type": "array",
      "of": [
        {
          "type": "string"
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "includesNote",
      "title": "Includes note",
      "type": "text"
    },
    {
      "name": "ctaLabel",
      "title": "Cta label",
      "type": "string"
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
      "title": "label"
    }
  }
};
