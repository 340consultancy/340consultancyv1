// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "up2datePage",
  "title": "Up2date",
  "type": "document",
  "fields": [
    {
      "name": "hero",
      "title": "Hero",
      "type": "object",
      "fields": [
        {
          "name": "title",
          "title": "Title",
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
            },
            {
              "name": "tail",
              "title": "Tail",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "tagline",
          "title": "Tagline",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
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
          "name": "scrollLabel",
          "title": "Scroll label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "leadMagnet",
      "title": "Lead magnet",
      "type": "object",
      "fields": [
        {
          "name": "eyebrow",
          "title": "Eyebrow",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "headline",
          "title": "Headline",
          "type": "object",
          "fields": [
            {
              "name": "line1",
              "title": "Line1",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "line2",
              "title": "Line2",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "body",
          "title": "Body",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "emailPlaceholder",
          "title": "Email placeholder",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "buttonLabel",
          "title": "Button label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "successToast",
          "title": "Success toast",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "errorToast",
          "title": "Error toast",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
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
          "name": "imageAlt",
          "title": "Image alt",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "newsletter",
      "title": "Newsletter",
      "type": "object",
      "fields": [
        {
          "name": "eyebrow",
          "title": "Eyebrow",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "headline",
          "title": "Headline",
          "type": "object",
          "fields": [
            {
              "name": "line1",
              "title": "Line1",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "line2",
              "title": "Line2",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "body",
          "title": "Body",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "emailPlaceholder",
          "title": "Email placeholder",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "buttonLabel",
          "title": "Button label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "successToast",
          "title": "Success toast",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "errorToast",
          "title": "Error toast",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    }
  ]
};
