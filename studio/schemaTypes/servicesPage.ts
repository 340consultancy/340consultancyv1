// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "servicesPage",
  "title": "Services",
  "type": "document",
  "fields": [
    {
      "name": "hero",
      "title": "Hero",
      "type": "object",
      "fields": [
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
          "name": "imagePosition",
          "title": "Image position",
          "type": "string",
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
      "name": "bento",
      "title": "Bento",
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
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "hint",
          "title": "Hint",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "viewDetailsLabel",
          "title": "View details label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "workshopTools",
          "title": "Workshop tools",
          "type": "array",
          "of": [
            {
              "type": "string"
            }
          ],
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "workshopNote",
          "title": "Workshop note",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "process",
      "title": "Process",
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
          "name": "sub",
          "title": "Sub",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "steps",
          "title": "Steps",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "phase",
                  "title": "Phase",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "title",
                  "title": "Title",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "desc",
                  "title": "Desc",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "phase"
                }
              }
            }
          ]
        },
        {
          "name": "hashtag",
          "title": "Hashtag",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    }
  ]
};
