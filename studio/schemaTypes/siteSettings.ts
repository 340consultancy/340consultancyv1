// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

export default {
  "name": "siteSettings",
  "title": "Site settings",
  "type": "document",
  "fields": [
    {
      "name": "nav",
      "title": "Nav",
      "type": "object",
      "fields": [
        {
          "name": "logo",
          "title": "Logo",
          "type": "object",
          "fields": [
            {
              "name": "src",
              "title": "Src",
              "type": "image",
              "options": {
                "hotspot": true
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "alt",
              "title": "Alt",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "ariaLabel",
              "title": "Aria label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "leftLinks",
          "title": "Left links",
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
                  "name": "href",
                  "title": "Href",
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
          "name": "rightLinks",
          "title": "Right links",
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
                  "name": "href",
                  "title": "Href",
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
          "name": "bookNow",
          "title": "Book now",
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
        },
        {
          "name": "servicesLabel",
          "title": "Services label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "serviceLinks",
          "title": "Service links",
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
                  "name": "href",
                  "title": "Href",
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
          "name": "closeLabel",
          "title": "Close label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "mobileTagline",
          "title": "Mobile tagline",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "openMenuLabel",
          "title": "Open menu label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "closeMenuLabel",
          "title": "Close menu label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "footer",
      "title": "Footer",
      "type": "object",
      "fields": [
        {
          "name": "logo",
          "title": "Logo",
          "type": "object",
          "fields": [
            {
              "name": "src",
              "title": "Src",
              "type": "image",
              "options": {
                "hotspot": true
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "alt",
              "title": "Alt",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "lockup",
          "title": "Lockup",
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
          "name": "quote",
          "title": "Quote",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "hashtag",
          "title": "Hashtag",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "social",
          "title": "Social",
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
                  "name": "href",
                  "title": "Href",
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
                  "title": "icon"
                }
              }
            }
          ]
        },
        {
          "name": "nav",
          "title": "Nav",
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
                  "name": "to",
                  "title": "To",
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
          "name": "backToTopLabel",
          "title": "Back to top label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "copyright",
          "title": "Copyright",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "privacy",
          "title": "Privacy",
          "type": "object",
          "fields": [
            {
              "name": "label",
              "title": "Label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "to",
              "title": "To",
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
        }
      ]
    },
    {
      "name": "cta",
      "title": "Cta",
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
          "name": "yesLabel",
          "title": "Yes label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "goLabel",
          "title": "Go label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "nameLabel",
          "title": "Name label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "namePlaceholder",
          "title": "Name placeholder",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "testimonialsCta",
      "title": "Testimonials cta",
      "type": "object",
      "fields": [
        {
          "name": "label",
          "title": "Label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "to",
          "title": "To",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "showcase",
      "title": "Showcase",
      "type": "object",
      "fields": [
        {
          "name": "content",
          "title": "Content",
          "type": "object",
          "fields": [
            {
              "name": "text",
              "title": "Text",
              "type": "object",
              "fields": [
                {
                  "name": "eyebrow",
                  "title": "Eyebrow",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "titleLead",
                  "title": "Title lead",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "titleAccent",
                  "title": "Title accent",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "sub",
                  "title": "Sub",
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
                      "name": "label",
                      "title": "Label",
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
                      "title": "label"
                    }
                  }
                }
              ]
            },
            {
              "name": "defaultImages",
              "title": "Default images",
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
            }
          ]
        },
        {
          "name": "industry",
          "title": "Industry",
          "type": "object",
          "fields": [
            {
              "name": "text",
              "title": "Text",
              "type": "object",
              "fields": [
                {
                  "name": "eyebrow",
                  "title": "Eyebrow",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "titleLead",
                  "title": "Title lead",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "titleAccent",
                  "title": "Title accent",
                  "type": "string",
                  validation: (Rule: any) => Rule.required()
                },
                {
                  "name": "sub",
                  "title": "Sub",
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
                      "name": "label",
                      "title": "Label",
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
                      "title": "label"
                    }
                  }
                }
              ]
            },
            {
              "name": "defaultImages",
              "title": "Default images",
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
            }
          ]
        }
      ]
    },
    {
      "name": "blogSection",
      "title": "Blog section",
      "type": "object",
      "fields": [
        {
          "name": "blogs",
          "title": "Blogs",
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
              "type": "array",
              "of": [
                {
                  "type": "string"
                }
              ],
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "body",
              "title": "Body",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "ctaLabel",
              "title": "Cta label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "ctaHref",
              "title": "Cta href",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "social",
          "title": "Social",
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
              "type": "array",
              "of": [
                {
                  "type": "string"
                }
              ],
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "body",
              "title": "Body",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "ctaLabel",
              "title": "Cta label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "ctaHref",
              "title": "Cta href",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "external",
              "title": "External",
              "type": "boolean"
            }
          ]
        },
        {
          "name": "readArticleLabel",
          "title": "Read article label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "comingSoonLabel",
          "title": "Coming soon label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "comingSoonWatermark",
          "title": "Coming soon watermark",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      "name": "blogPage",
      "title": "Blog page",
      "type": "object",
      "fields": [
        {
          "name": "listing",
          "title": "Listing",
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
              "name": "tagline",
              "title": "Tagline",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "readLabel",
              "title": "Read label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "article",
          "title": "Article",
          "type": "object",
          "fields": [
            {
              "name": "backLabel",
              "title": "Back label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "moreEyebrow",
              "title": "More eyebrow",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "moreHeadline",
              "title": "More headline",
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
              "name": "byLabel",
              "title": "By label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    },
    {
      "name": "serviceDetailLabels",
      "title": "Service detail labels",
      "type": "object",
      "fields": [
        {
          "name": "addOns",
          "title": "Add ons",
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
            }
          ]
        },
        {
          "name": "serviceEyebrow",
          "title": "Service eyebrow",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "pricingLabel",
          "title": "Pricing label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "includesLabel",
          "title": "Includes label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "defaultCtaLabel",
          "title": "Default cta label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "availableInPrefix",
          "title": "Available in prefix",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "others",
          "title": "Others",
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
            }
          ]
        }
      ]
    },
    {
      "name": "caseStudyLabels",
      "title": "Case study labels",
      "type": "object",
      "fields": [
        {
          "name": "notFound",
          "title": "Not found",
          "type": "object",
          "fields": [
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
        },
        {
          "name": "backLabel",
          "title": "Back label",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "meta",
          "title": "Meta",
          "type": "object",
          "fields": [
            {
              "name": "client",
              "title": "Client",
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
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "industry",
              "title": "Industry",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "sections",
          "title": "Sections",
          "type": "object",
          "fields": [
            {
              "name": "challenge",
              "title": "Challenge",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "approach",
              "title": "Approach",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "results",
              "title": "Results",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          "name": "others",
          "title": "Others",
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
              "name": "allWorkLabel",
              "title": "All work label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            },
            {
              "name": "viewCaseLabel",
              "title": "View case label",
              "type": "string",
              validation: (Rule: any) => Rule.required()
            }
          ]
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
      "name": "managementAddOns",
      "title": "Management add ons",
      "type": "object",
      "fields": [
        {
          "name": "intro",
          "title": "Intro",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "outro",
          "title": "Outro",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "categories",
          "title": "Categories",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "category",
                  "title": "Category",
                  "type": "string",
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
                          "name": "name",
                          "title": "Name",
                          "type": "string",
                          validation: (Rule: any) => Rule.required()
                        },
                        {
                          "name": "text",
                          "title": "Text",
                          "type": "text",
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
                }
              ],
              "preview": {
                "select": {
                  "title": "category"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "name": "strategyAddOns",
      "title": "Strategy add ons",
      "type": "object",
      "fields": [
        {
          "name": "intro",
          "title": "Intro",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "outro",
          "title": "Outro",
          "type": "string",
          validation: (Rule: any) => Rule.required()
        },
        {
          "name": "categories",
          "title": "Categories",
          "type": "array",
          validation: (Rule: any) => Rule.required(),
          "of": [
            {
              "type": "object",
              "name": "item",
              "fields": [
                {
                  "name": "category",
                  "title": "Category",
                  "type": "string",
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
                          "name": "name",
                          "title": "Name",
                          "type": "string",
                          validation: (Rule: any) => Rule.required()
                        },
                        {
                          "name": "text",
                          "title": "Text",
                          "type": "text",
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
                }
              ],
              "preview": {
                "select": {
                  "title": "category"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "name": "igPostUrls",
      "title": "Ig post urls",
      "type": "array",
      "of": [
        {
          "type": "string"
        }
      ],
      validation: (Rule: any) => Rule.required()
    }
  ]
};
