// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "contactPage",
  "title": "Contact",
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
          "name": "imagePosition",
          "title": "Image position",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "eyebrow",
          "title": "Eyebrow",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "headline",
          "title": "Headline",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "tagline",
          "title": "Tagline",
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
      "name": "form",
      "title": "Form",
      "type": "object",
      "fields": [
        {
          "name": "photo",
          "title": "Photo",
          "type": "image",
          "options": {
            "hotspot": true
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "photoAlt",
          "title": "Photo alt",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
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
          "name": "intro",
          "title": "Intro",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "object",
          "fields": [
            {
              "name": "name",
              "title": "Name",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "email",
              "title": "Email",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "instagram",
              "title": "Instagram",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "instagramOptional",
              "title": "Instagram optional",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "interest",
              "title": "Interest",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "message",
              "title": "Message",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "placeholders",
          "title": "Placeholders",
          "type": "object",
          "fields": [
            {
              "name": "name",
              "title": "Name",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "email",
              "title": "Email",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "instagram",
              "title": "Instagram",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "interest",
              "title": "Interest",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "message",
              "title": "Message",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "serviceOptions",
          "title": "Service options",
          "type": "array",
          "of": [
            {
              "type": "string"
            }
          ],
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "newsletter",
          "title": "Newsletter",
          "type": "object",
          "fields": [
            {
              "name": "prefix",
              "title": "Prefix",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "highlight",
              "title": "Highlight",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "suffix",
              "title": "Suffix",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "submitLabel",
          "title": "Submit label",
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
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "links",
      "title": "Links",
      "type": "array",
      validation: (Rule: any) => Rule.required(),
      "of": [
        {
          "type": "object",
          "name": "item",
          "fields": [
            {
              "name": "icon",
              "title": "Icon",
              "type": "string",
              "options": {
                "list": [
                  "target",
                  "fingerprint",
                  "eye",
                  "mail",
                  "phone",
                  "instagram",
                  "linkedin"
                ]
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "label",
              "title": "Label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "href",
              "title": "Href",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ],
          "preview": {
            "select": {
              "title": "icon"
            }
          }
        }
      ]
    },
    {
      "name": "faq",
      "title": "Faq",
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
          "name": "items",
          "title": "Items",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "q",
                  "title": "Q",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "a",
                  "title": "A",
                  "type": "text",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "q"
                }
              }
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "pricingFaq",
      "title": "Pricing faq",
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
          "name": "items",
          "title": "Items",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "q",
                  "title": "Q",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "a",
                  "title": "A",
                  "type": "text",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "q"
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
