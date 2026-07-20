module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  // SEO plugin (github.com/notum-cz/strapi-plugin-seo) — adds the "SEO" panel
  // in the admin for per-entry meta title/description/social previews.
  seo: {
    enabled: true,
  },
  // Image format converter (strapi-plugin-imgfmtconv) — auto-converts uploads
  // to WebP/AVIF and offers bulk conversion of existing media in the admin.
  imgfmtconv: {
    enabled: true,
  },
  // Preview button (strapi-plugin-preview-button) — "open on website" button in
  // the content manager. CLIENT_URL = the deployed frontend (Vercel) URL.
  // The site renders published content only, so buttons are configured for the
  // published state (no draft preview).
  'preview-button': {
    config: {
      contentTypes: [
        { uid: 'api::blog-post.blog-post', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/blog/{slug}` } },
        { uid: 'api::case-study.case-study', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/work/{slug}` } },
        { uid: 'api::service.service', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/services/{key}` } },
        { uid: 'api::home-page.home-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/` } },
        { uid: 'api::about-page.about-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/about-us` } },
        { uid: 'api::services-page.services-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/services` } },
        { uid: 'api::work-page.work-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/work` } },
        { uid: 'api::up2date-page.up2date-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/about` } },
        { uid: 'api::contact-page.contact-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/contact` } },
        { uid: 'api::privacy-page.privacy-page', published: { url: `${env('CLIENT_URL', 'http://localhost:8080')}/privacy` } },
      ],
    },
  },
});
