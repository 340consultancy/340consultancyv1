// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "caseStudy",
  "title": "Case studies",
  "type": "document",
  "fields": [
    {
      "name": "slug",
      "title": "Slug",
      "type": "slug",
      "options": {
        "source": "client",
        "maxLength": 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "client",
      "title": "Client",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "industry",
      "title": "Industry",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "services",
      "title": "Services",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "website",
      "title": "Website",
      "type": "string"
    },
    {
      "name": "headline",
      "title": "Headline",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "heroImg",
      "title": "Hero img",
      "type": "image",
      "options": {
        "hotspot": true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "intro",
      "title": "Intro",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "challenge",
      "title": "Challenge",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "approach",
      "title": "Approach",
      "type": "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "resultText",
      "title": "Result text",
      "type": "text",
      validation: (Rule: any) => Rule.required()
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
      "name": "visuals",
      "title": "Visuals",
      "type": "array",
      "of": [
        {
          "type": "image",
          "options": {
            "hotspot": true
          }
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "gallery",
      "title": "Gallery",
      "type": "array",
      "of": [
        {
          "type": "image",
          "options": {
            "hotspot": true
          }
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "cardImg",
      "title": "Card img",
      "type": "image",
      "options": {
        "hotspot": true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "cardTag",
      "title": "Card tag",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "cardStat",
      "title": "Card stat",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "cardHeadline",
      "title": "Card headline",
      "type": "text",
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
      "title": "client"
    }
  }
};
