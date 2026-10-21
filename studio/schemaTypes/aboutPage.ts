// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "aboutPage",
  "title": "About us",
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
          "name": "imageAlt",
          "title": "Image alt",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "imagePosition",
          "title": "Image position",
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
      "name": "story",
      "title": "Story",
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
          "name": "paragraphs",
          "title": "Paragraphs",
          "type": "array",
          "of": [
            {
              "type": "string"
            }
          ],
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "signoff",
          "title": "Signoff",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "founders",
      "title": "Founders",
      "type": "object",
      "fields": [
        {
          "name": "eyebrow",
          "title": "Eyebrow",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "linda",
          "title": "Linda",
          "type": "object",
          "fields": [
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
              "name": "imgPosDesktop",
              "title": "Img pos desktop",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "imgPosMobile",
              "title": "Img pos mobile",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "name",
              "title": "Name",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "surname",
              "title": "Surname",
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
              "name": "bio",
              "title": "Bio",
              "type": "text",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "langs",
              "title": "Langs",
              "type": "array",
              "of": [
                {
                  "type": "string"
                }
              ],
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "nancy",
          "title": "Nancy",
          "type": "object",
          "fields": [
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
              "name": "imgPosDesktop",
              "title": "Img pos desktop",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "imgPosMobile",
              "title": "Img pos mobile",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "name",
              "title": "Name",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "surname",
              "title": "Surname",
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
              "name": "bio",
              "title": "Bio",
              "type": "text",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "langs",
              "title": "Langs",
              "type": "array",
              "of": [
                {
                  "type": "string"
                }
              ],
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "quote",
          "title": "Quote",
          "type": "object",
          "fields": [
            {
              "name": "solidLines",
              "title": "Solid lines",
              "type": "array",
              "of": [
                {
                  "type": "string"
                }
              ],
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "outlineLines",
              "title": "Outline lines",
              "type": "array",
              "of": [
                {
                  "type": "string"
                }
              ],
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "solid",
              "title": "Solid",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "outline",
              "title": "Outline",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "values",
      "title": "Values",
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
                  "title": "icon"
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
