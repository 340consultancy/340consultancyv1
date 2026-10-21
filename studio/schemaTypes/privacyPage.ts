// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "privacyPage",
  "title": "Privacy",
  "type": "document",
  "fields": [
    {
      "name": "backLabel",
      "title": "Back label",
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
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "sections",
      "title": "Sections",
      "type": "array",
      validation: (Rule: any) => Rule.required(),
      "of": [
        {
          "type": "object",
          "name": "item",
          "fields": [
            {
              "name": "id",
              "title": "Id",
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
              "name": "blocks",
              "title": "Blocks",
              "type": "array",
              validation: (Rule: any) => Rule.required(),
              "of": [
                {
                  "type": "object",
                  "name": "item",
                  "fields": [
                    {
                      "name": "kind",
                      "title": "Kind",
                      "type": "string",
                      validation: (Rule: any) => Rule.required()
                    },
                    {
                      "name": "text",
                      "title": "Text",
                      "type": "text"
                    },
                    {
                      "name": "mt",
                      "title": "Mt",
                      "type": "string"
                    },
                    {
                      "name": "lead",
                      "title": "Lead",
                      "type": "text"
                    },
                    {
                      "name": "link",
                      "title": "Link",
                      "type": "object",
                      "fields": [
                        {
                          "name": "text",
                          "title": "Text",
                          "type": "string",
                          validation: (Rule: any) => Rule.required()
                        },
                        {
                          "name": "href",
                          "title": "Href",
                          "type": "string",
                          validation: (Rule: any) => Rule.required()
                        }
                      ]
                    },
                    {
                      "name": "items",
                      "title": "Items",
                      "type": "array",
                      "of": [
                        {
                          "type": "string"
                        }
                      ]
                    },
                    {
                      "name": "tail",
                      "title": "Tail",
                      "type": "string"
                    }
                  ],
                  "preview": {
                    "select": {
                      "title": "kind"
                    }
                  }
                }
              ]
            }
          ],
          "preview": {
            "select": {
              "title": "id"
            }
          }
        }
      ]
    },
    {
      "name": "lastUpdated",
      "title": "Last updated",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    }
  ]
};
