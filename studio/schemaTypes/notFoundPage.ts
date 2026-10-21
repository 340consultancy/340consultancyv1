// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "notFoundPage",
  "title": "404 page",
  "type": "document",
  "fields": [
    {
      "name": "eyebrow",
      "title": "Eyebrow",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "code",
      "title": "Code",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "message",
      "title": "Message",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "backLabel",
      "title": "Back label",
      "type": "string",
      validation: (Rule: any) => Rule.required()
    }
  ]
};
