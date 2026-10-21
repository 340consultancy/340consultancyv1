// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "blogPost",
  "title": "Blog posts",
  "type": "document",
  "fields": [
    {
      "name": "id",
      "title": "Id",
      "type": "slug",
      "options": {
        "source": "title",
        "maxLength": 96
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
      "name": "excerpt",
      "title": "Excerpt",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "category",
      "title": "Category",
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
      "name": "author",
      "title": "Author",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "publishedDate",
      "title": "Published date",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "title": "Body",
      "type": "array",
      "of": [
        {
          "type": "block",
          "styles": [
            {
              "title": "Normal",
              "value": "normal"
            },
            {
              "title": "Heading",
              "value": "h2"
            }
          ]
        }
      ],
      "name": "body"
    },
    {
      "name": "publishedAt",
      "title": "Published at",
      "type": "datetime",
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      "description": "Newest posts are listed first."
    }
  ],
  "preview": {
    "select": {
      "title": "title"
    }
  }
};
