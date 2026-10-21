// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "homePage",
  "title": "Home",
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
              "name": "line2Lead",
              "title": "Line2 lead",
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
          "name": "services",
          "title": "Services",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "name",
                  "title": "Name",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "slug",
                  "title": "Slug",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "name"
                }
              }
            }
          ]
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
      "name": "way",
      "title": "Way",
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
      "name": "servicesPanel",
      "title": "Services panel",
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
          "name": "rows",
          "title": "Rows",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "num",
                  "title": "Num",
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
                  "name": "price",
                  "title": "Price",
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
                  "name": "href",
                  "title": "Href",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "num"
                }
              }
            }
          ]
        },
        {
          "name": "cta",
          "title": "Cta",
          "type": "object",
          "fields": [
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
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "foundersPanel",
      "title": "Founders panel",
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
          "name": "lede",
          "title": "Lede",
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
          "name": "note",
          "title": "Note",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "cta",
          "title": "Cta",
          "type": "object",
          "fields": [
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
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "approachPanel",
      "title": "Approach panel",
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
                  "name": "num",
                  "title": "Num",
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
                  "name": "body",
                  "title": "Body",
                  "type": "text",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "num"
                }
              }
            }
          ]
        },
        {
          "name": "languages",
          "title": "Languages",
          "type": "object",
          "fields": [
            {
              "name": "label",
              "title": "Label",
              "type": "text",
              validation: (Rule: any) => Rule.required()
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
                      "name": "code",
                      "title": "Code",
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
                      "title": "code"
                    }
                  }
                }
              ]
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
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
          "name": "seeAllLabel",
          "title": "See all label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "mobileCtaLabel",
          "title": "Mobile cta label",
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
                },
                {
                  "name": "slug",
                  "title": "Slug",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                }
              ],
              "preview": {
                "select": {
                  "title": "client"
                }
              }
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "quickCheck",
      "title": "Quick check",
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
          "of": [
            {
              "type": "string"
            }
          ],
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      "name": "phoneMock",
      "title": "Phone mock",
      "type": "object",
      "fields": [
        {
          "name": "postImage",
          "title": "Post image",
          "type": "image",
          "options": {
            "hotspot": true
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "strategyImage",
          "title": "Strategy image",
          "type": "image",
          "options": {
            "hotspot": true
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "handle",
          "title": "Handle",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "brandName",
          "title": "Brand name",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "brandTagline",
          "title": "Brand tagline",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "keywords",
          "title": "Keywords",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "missionTitle",
          "title": "Mission title",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "missionText",
          "title": "Mission text",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "strategyLabel",
          "title": "Strategy label",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "performanceTitle",
          "title": "Performance title",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "metrics",
          "title": "Metrics",
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
          "name": "postHeadline",
          "title": "Post headline",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "postHeadlineAccent",
          "title": "Post headline accent",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "postSubtext",
          "title": "Post subtext",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "captionText",
          "title": "Caption text",
          "type": "text",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "moreLabel",
          "title": "More label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "viewCommentsPrefix",
          "title": "View comments prefix",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "viewCommentsSuffix",
          "title": "View comments suffix",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "commentUser",
          "title": "Comment user",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "commentText",
          "title": "Comment text",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "likes",
          "title": "Likes",
          "type": "number",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "comments",
          "title": "Comments",
          "type": "number",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "shares",
          "title": "Shares",
          "type": "number",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "saves",
          "title": "Saves",
          "type": "number",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "floatingLabels",
          "title": "Floating labels",
          "type": "array",
          "of": [
            {
              "type": "string"
            }
          ],
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    }
  ]
};
