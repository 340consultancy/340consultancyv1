// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "workPage",
  "title": "Our work",
  "type": "document",
  "fields": [
    {
      "name": "hero",
      "title": "Hero",
      "type": "object",
      "fields": [
        {
          "name": "image",
          "title": "Image",
          "type": "image",
          "options": {
            "hotspot": true
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "headline",
          "title": "Headline",
          "type": "object",
          "fields": [
            {
              "name": "lead",
              "title": "Lead",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "accent",
              "title": "Accent",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "subtitle",
          "title": "Subtitle",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "scrollLabel",
          "title": "Scroll label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "separatorLogo",
      "title": "Separator logo",
      "type": "image",
      "options": {
        "hotspot": true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "clients",
      "title": "Clients",
      "type": "array",
      validation: (Rule: any) => Rule.required(),
      "of": [
        {
          "type": "object",
          "name": "item",
          "fields": [
            {
              "name": "initials",
              "title": "Initials",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "color",
              "title": "Color",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "name",
              "title": "Name",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ],
          "preview": {
            "select": {
              "title": "initials"
            }
          }
        }
      ]
    },
    {
      "name": "stats",
      "title": "Stats",
      "type": "array",
      validation: (Rule: any) => Rule.required(),
      "of": [
        {
          "type": "object",
          "name": "item",
          "fields": [
            {
              "name": "value",
              "title": "Value",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "label",
              "title": "Label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "client",
              "title": "Client",
              "type": "string"
            }
          ],
          "preview": {
            "select": {
              "title": "value"
            }
          }
        }
      ]
    },
    {
      "name": "cases",
      "title": "Cases",
      "type": "object",
      "fields": [
        {
          "name": "eyebrow",
          "title": "Eyebrow",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "heading",
          "title": "Heading",
          "type": "object",
          "fields": [
            {
              "name": "lead",
              "title": "Lead",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "accent",
              "title": "Accent",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "viewLabel",
          "title": "View label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "cards",
          "title": "Cards",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "slug",
                  "title": "Slug",
                  "type": "string"
                },
                {
                  "name": "client",
                  "title": "Client",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "tag",
                  "title": "Tag",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "headline",
                  "title": "Headline",
                  "type": "text",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "stat",
                  "title": "Stat",
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
                }
              ],
              "preview": {
                "select": {
                  "title": "slug"
                }
              }
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    }
  ]
};
