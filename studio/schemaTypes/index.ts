// Generated once by scripts/generate-sanity-schemas.ts from the bundled site content.
// Safe to edit by hand (titles, descriptions, validation): the generator is not re-run.

import homePage from './homePage';
import aboutPage from './aboutPage';
import servicesPage from './servicesPage';
import workPage from './workPage';
import up2datePage from './up2datePage';
import contactPage from './contactPage';
import privacyPage from './privacyPage';
import notFoundPage from './notFoundPage';
import siteSettings from './siteSettings';
import testimonial from './testimonial';
import service from './service';
import caseStudy from './caseStudy';
import blogPost from './blogPost';

export const schemaTypes = [homePage, aboutPage, servicesPage, workPage, up2datePage, contactPage, privacyPage, notFoundPage, siteSettings, testimonial, service, caseStudy, blogPost];

export const SINGLETONS = [
  {
    "type": "homePage",
    "title": "Home"
  },
  {
    "type": "aboutPage",
    "title": "About us"
  },
  {
    "type": "servicesPage",
    "title": "Services"
  },
  {
    "type": "workPage",
    "title": "Our work"
  },
  {
    "type": "up2datePage",
    "title": "Up2date"
  },
  {
    "type": "contactPage",
    "title": "Contact"
  },
  {
    "type": "privacyPage",
    "title": "Privacy"
  },
  {
    "type": "notFoundPage",
    "title": "404 page"
  },
  {
    "type": "siteSettings",
    "title": "Site settings"
  }
];

export const COLLECTIONS = [
  {
    "type": "testimonial",
    "title": "Testimonials",
    "ordering": "order"
  },
  {
    "type": "service",
    "title": "Services",
    "ordering": "order"
  },
  {
    "type": "caseStudy",
    "title": "Case studies",
    "ordering": "order"
  },
  {
    "type": "blogPost",
    "title": "Blog posts",
    "ordering": "publishedAt"
  }
];

export const SINGLETON_TYPES: string[] = SINGLETONS.map((s) => s.type);
