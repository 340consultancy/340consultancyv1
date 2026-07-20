import type { Schema, Struct } from '@strapi/strapi';

export interface AboutFounder extends Struct.ComponentSchema {
  collectionName: 'components_about_founders';
  info: {
    displayName: 'founder';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    img: Schema.Attribute.Media<'images' | 'videos'>;
    imgPosDesktop: Schema.Attribute.String;
    imgPosMobile: Schema.Attribute.String;
    langs: Schema.Attribute.Component<'shared.text', true>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
    surname: Schema.Attribute.String;
  };
}

export interface AboutFounders extends Struct.ComponentSchema {
  collectionName: 'components_about_founderss';
  info: {
    displayName: 'founders';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    linda: Schema.Attribute.Component<'about.founder', false>;
    nancy: Schema.Attribute.Component<'about.founder', false>;
    quote: Schema.Attribute.Component<'about.quote', false>;
  };
}

export interface AboutHero extends Struct.ComponentSchema {
  collectionName: 'components_about_heros';
  info: {
    displayName: 'hero';
  };
  attributes: {
    headline: Schema.Attribute.Component<'shared.lead-accent', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imageAlt: Schema.Attribute.String;
    imagePosition: Schema.Attribute.String;
    scrollLabel: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface AboutQuote extends Struct.ComponentSchema {
  collectionName: 'components_about_quotes';
  info: {
    displayName: 'quote';
  };
  attributes: {
    outline: Schema.Attribute.String;
    outlineLines: Schema.Attribute.Component<'shared.text', true>;
    solid: Schema.Attribute.String;
    solidLines: Schema.Attribute.Component<'shared.text', true>;
  };
}

export interface AboutStory extends Struct.ComponentSchema {
  collectionName: 'components_about_storys';
  info: {
    displayName: 'story';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    paragraphs: Schema.Attribute.Component<'shared.text', true>;
    signoff: Schema.Attribute.String;
  };
}

export interface AboutValues extends Struct.ComponentSchema {
  collectionName: 'components_about_valuess';
  info: {
    displayName: 'values';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    items: Schema.Attribute.Component<'shared.icon-item', true>;
  };
}

export interface ContactFaqColumn extends Struct.ComponentSchema {
  collectionName: 'components_contact_faq_columns';
  info: {
    displayName: 'faq column';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    items: Schema.Attribute.Component<'shared.faq', true>;
  };
}

export interface ContactForm extends Struct.ComponentSchema {
  collectionName: 'components_contact_forms';
  info: {
    displayName: 'form';
  };
  attributes: {
    errorToast: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    intro: Schema.Attribute.Text;
    labels: Schema.Attribute.Component<'contact.form-labels', false>;
    newsletter: Schema.Attribute.Component<'contact.newsletter-note', false>;
    photo: Schema.Attribute.Media<'images' | 'videos'>;
    photoAlt: Schema.Attribute.String;
    placeholders: Schema.Attribute.Component<
      'contact.form-placeholders',
      false
    >;
    serviceOptions: Schema.Attribute.Component<'shared.text', true>;
    submitLabel: Schema.Attribute.String;
    successToast: Schema.Attribute.String;
  };
}

export interface ContactFormLabels extends Struct.ComponentSchema {
  collectionName: 'components_contact_form_labelss';
  info: {
    displayName: 'form labels';
  };
  attributes: {
    email: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    instagramOptional: Schema.Attribute.String;
    interest: Schema.Attribute.String;
    message: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface ContactFormPlaceholders extends Struct.ComponentSchema {
  collectionName: 'components_contact_form_placeholderss';
  info: {
    displayName: 'form placeholders';
  };
  attributes: {
    email: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    interest: Schema.Attribute.String;
    message: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface ContactHero extends Struct.ComponentSchema {
  collectionName: 'components_contact_heros';
  info: {
    displayName: 'hero';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imagePosition: Schema.Attribute.String;
    scrollLabel: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface ContactNewsletterNote extends Struct.ComponentSchema {
  collectionName: 'components_contact_newsletter_notes';
  info: {
    displayName: 'newsletter note';
  };
  attributes: {
    highlight: Schema.Attribute.String;
    prefix: Schema.Attribute.Text;
    suffix: Schema.Attribute.Text;
  };
}

export interface GlobalBlogArticleLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_blog_article_labelss';
  info: {
    displayName: 'blog article labels';
  };
  attributes: {
    backLabel: Schema.Attribute.String;
    byLabel: Schema.Attribute.String;
    moreEyebrow: Schema.Attribute.String;
    moreHeadline: Schema.Attribute.Component<'shared.lead-accent', false>;
  };
}

export interface GlobalBlogListing extends Struct.ComponentSchema {
  collectionName: 'components_global_blog_listings';
  info: {
    displayName: 'blog listing';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.lead-accent', false>;
    readLabel: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface GlobalBlogPage extends Struct.ComponentSchema {
  collectionName: 'components_global_blog_pages';
  info: {
    displayName: 'blog page';
  };
  attributes: {
    article: Schema.Attribute.Component<'global.blog-article-labels', false>;
    listing: Schema.Attribute.Component<'global.blog-listing', false>;
  };
}

export interface GlobalBlogSection extends Struct.ComponentSchema {
  collectionName: 'components_global_blog_sections';
  info: {
    displayName: 'blog section';
  };
  attributes: {
    blogs: Schema.Attribute.Component<'global.blog-text-cell', false>;
    comingSoonLabel: Schema.Attribute.String;
    comingSoonWatermark: Schema.Attribute.String;
    readArticleLabel: Schema.Attribute.String;
    social: Schema.Attribute.Component<'global.blog-text-cell', false>;
  };
}

export interface GlobalBlogTextCell extends Struct.ComponentSchema {
  collectionName: 'components_global_blog_text_cells';
  info: {
    displayName: 'blog text cell';
  };
  attributes: {
    body: Schema.Attribute.Text;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    external: Schema.Attribute.Boolean;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.text', true>;
  };
}

export interface GlobalCaseMetaLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_case_meta_labelss';
  info: {
    displayName: 'case meta labels';
  };
  attributes: {
    client: Schema.Attribute.String;
    industry: Schema.Attribute.String;
    services: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface GlobalCaseOthersLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_case_others_labelss';
  info: {
    displayName: 'case others labels';
  };
  attributes: {
    allWorkLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.Component<'shared.lead-accent', false>;
    viewCaseLabel: Schema.Attribute.String;
  };
}

export interface GlobalCaseSectionLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_case_section_labelss';
  info: {
    displayName: 'case section labels';
  };
  attributes: {
    approach: Schema.Attribute.String;
    challenge: Schema.Attribute.String;
    results: Schema.Attribute.String;
  };
}

export interface GlobalCaseStudyLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_case_study_labelss';
  info: {
    displayName: 'case study labels';
  };
  attributes: {
    backLabel: Schema.Attribute.String;
    meta: Schema.Attribute.Component<'global.case-meta-labels', false>;
    notFound: Schema.Attribute.Component<'global.not-found-labels', false>;
    others: Schema.Attribute.Component<'global.case-others-labels', false>;
    scrollLabel: Schema.Attribute.String;
    sections: Schema.Attribute.Component<'global.case-section-labels', false>;
  };
}

export interface GlobalCta extends Struct.ComponentSchema {
  collectionName: 'components_global_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    goLabel: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    nameLabel: Schema.Attribute.String;
    namePlaceholder: Schema.Attribute.String;
    yesLabel: Schema.Attribute.String;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    backToTopLabel: Schema.Attribute.String;
    copyright: Schema.Attribute.String;
    hashtag: Schema.Attribute.String;
    lockup: Schema.Attribute.Component<'shared.lockup', false>;
    logo: Schema.Attribute.Component<'shared.logo', false>;
    nav: Schema.Attribute.Component<'shared.route-link', true>;
    privacy: Schema.Attribute.Component<'shared.route-link', false>;
    quote: Schema.Attribute.Text;
    social: Schema.Attribute.Component<'shared.social-link', true>;
    tagline: Schema.Attribute.String;
  };
}

export interface GlobalNav extends Struct.ComponentSchema {
  collectionName: 'components_global_navs';
  info: {
    displayName: 'nav';
  };
  attributes: {
    bookNow: Schema.Attribute.Component<'shared.link', false>;
    closeLabel: Schema.Attribute.String;
    closeMenuLabel: Schema.Attribute.String;
    leftLinks: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Component<'shared.logo', false>;
    mobileTagline: Schema.Attribute.String;
    openMenuLabel: Schema.Attribute.String;
    rightLinks: Schema.Attribute.Component<'shared.link', true>;
    serviceLinks: Schema.Attribute.Component<'shared.link', true>;
    servicesLabel: Schema.Attribute.String;
  };
}

export interface GlobalNotFoundLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_not_found_labelss';
  info: {
    displayName: 'not found labels';
  };
  attributes: {
    backLabel: Schema.Attribute.String;
    message: Schema.Attribute.String;
  };
}

export interface GlobalServiceDetailLabels extends Struct.ComponentSchema {
  collectionName: 'components_global_service_detail_labelss';
  info: {
    displayName: 'service detail labels';
  };
  attributes: {
    addOns: Schema.Attribute.Component<'shared.eyebrow-heading', false>;
    availableInPrefix: Schema.Attribute.String;
    defaultCtaLabel: Schema.Attribute.String;
    includesLabel: Schema.Attribute.String;
    others: Schema.Attribute.Component<'shared.eyebrow-heading', false>;
    pricingLabel: Schema.Attribute.String;
    serviceEyebrow: Schema.Attribute.String;
  };
}

export interface HomeApproachCard extends Struct.ComponentSchema {
  collectionName: 'components_home_approach_cards';
  info: {
    displayName: 'approach card';
  };
  attributes: {
    body: Schema.Attribute.Text;
    num: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeApproachPanel extends Struct.ComponentSchema {
  collectionName: 'components_home_approach_panels';
  info: {
    displayName: 'approach panel';
  };
  attributes: {
    cards: Schema.Attribute.Component<'home.approach-card', true>;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imagePosition: Schema.Attribute.String;
    languages: Schema.Attribute.Component<'home.languages', false>;
  };
}

export interface HomeCases extends Struct.ComponentSchema {
  collectionName: 'components_home_casess';
  info: {
    displayName: 'cases';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.tag-image-card', true>;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    mobileCtaLabel: Schema.Attribute.String;
    seeAllLabel: Schema.Attribute.String;
  };
}

export interface HomeFoundersPanel extends Struct.ComponentSchema {
  collectionName: 'components_home_founders_panels';
  info: {
    displayName: 'founders panel';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'shared.link', false>;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imagePosition: Schema.Attribute.String;
    lede: Schema.Attribute.Text;
    note: Schema.Attribute.String;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heros';
  info: {
    displayName: 'hero';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline3', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    scrollLabel: Schema.Attribute.String;
    services: Schema.Attribute.Component<'shared.name-slug', true>;
  };
}

export interface HomeLanguages extends Struct.ComponentSchema {
  collectionName: 'components_home_languagess';
  info: {
    displayName: 'languages';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.code-label', true>;
    label: Schema.Attribute.Text;
  };
}

export interface HomePhoneMock extends Struct.ComponentSchema {
  collectionName: 'components_home_phone_mocks';
  info: {
    displayName: 'phone mock';
  };
  attributes: {
    brandName: Schema.Attribute.String;
    brandTagline: Schema.Attribute.Text;
    captionText: Schema.Attribute.Text;
    comments: Schema.Attribute.Integer;
    commentText: Schema.Attribute.String;
    commentUser: Schema.Attribute.String;
    floatingLabels: Schema.Attribute.Component<'shared.text', true>;
    handle: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    likes: Schema.Attribute.Integer;
    metrics: Schema.Attribute.Component<'shared.fact', true>;
    missionText: Schema.Attribute.Text;
    missionTitle: Schema.Attribute.Text;
    moreLabel: Schema.Attribute.String;
    performanceTitle: Schema.Attribute.Text;
    postHeadline: Schema.Attribute.Text;
    postHeadlineAccent: Schema.Attribute.String;
    postImage: Schema.Attribute.Media<'images'>;
    postSubtext: Schema.Attribute.Text;
    saves: Schema.Attribute.Integer;
    shares: Schema.Attribute.Integer;
    strategyImage: Schema.Attribute.Media<'images'>;
    strategyLabel: Schema.Attribute.Text;
    viewCommentsPrefix: Schema.Attribute.String;
    viewCommentsSuffix: Schema.Attribute.String;
  };
}

export interface HomeQuickCheck extends Struct.ComponentSchema {
  collectionName: 'components_home_quick_checks';
  info: {
    displayName: 'quick check';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    items: Schema.Attribute.Component<'shared.text', true>;
  };
}

export interface HomeServiceRow extends Struct.ComponentSchema {
  collectionName: 'components_home_service_rows';
  info: {
    displayName: 'service row';
  };
  attributes: {
    href: Schema.Attribute.String;
    name: Schema.Attribute.String;
    num: Schema.Attribute.String;
    price: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

export interface HomeServicesPanel extends Struct.ComponentSchema {
  collectionName: 'components_home_services_panels';
  info: {
    displayName: 'services panel';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', false>;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imagePosition: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'home.service-row', true>;
  };
}

export interface HomeWay extends Struct.ComponentSchema {
  collectionName: 'components_home_ways';
  info: {
    displayName: 'way';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imagePosition: Schema.Attribute.String;
    paragraphs: Schema.Attribute.Component<'shared.text', true>;
    signoff: Schema.Attribute.Text;
  };
}

export interface PrivacyBlock extends Struct.ComponentSchema {
  collectionName: 'components_privacy_blocks';
  info: {
    displayName: 'block';
  };
  attributes: {
    kind: Schema.Attribute.Enumeration<['p', 'ul']> &
      Schema.Attribute.DefaultTo<'p'>;
    lead: Schema.Attribute.String;
    linkHref: Schema.Attribute.String;
    linkText: Schema.Attribute.String;
    mt: Schema.Attribute.String;
    tail: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface PrivacySection extends Struct.ComponentSchema {
  collectionName: 'components_privacy_sections';
  info: {
    displayName: 'section';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    blocks: Schema.Attribute.Component<'privacy.block', true>;
    title: Schema.Attribute.String;
  };
}

export interface ServicesBento extends Struct.ComponentSchema {
  collectionName: 'components_services_bentos';
  info: {
    displayName: 'bento';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    hint: Schema.Attribute.String;
    viewDetailsLabel: Schema.Attribute.String;
    workshopNote: Schema.Attribute.String;
    workshopTools: Schema.Attribute.Component<'shared.text', true>;
  };
}

export interface ServicesHero extends Struct.ComponentSchema {
  collectionName: 'components_services_heros';
  info: {
    displayName: 'hero';
  };
  attributes: {
    headline: Schema.Attribute.Component<'shared.lead-accent', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imagePosition: Schema.Attribute.String;
    scrollLabel: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface ServicesProcess extends Struct.ComponentSchema {
  collectionName: 'components_services_processs';
  info: {
    displayName: 'process';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    hashtag: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.lead-accent', false>;
    steps: Schema.Attribute.Component<'services.step', true>;
    sub: Schema.Attribute.Text;
  };
}

export interface ServicesStep extends Struct.ComponentSchema {
  collectionName: 'components_services_steps';
  info: {
    displayName: 'step';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    phase: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedAddOnCategory extends Struct.ComponentSchema {
  collectionName: 'components_shared_add_on_categorys';
  info: {
    displayName: 'add on category';
  };
  attributes: {
    category: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.named-text', true>;
  };
}

export interface SharedAddOns extends Struct.ComponentSchema {
  collectionName: 'components_shared_add_onss';
  info: {
    displayName: 'add ons';
  };
  attributes: {
    categories: Schema.Attribute.Component<'shared.add-on-category', true>;
    intro: Schema.Attribute.Text;
    outro: Schema.Attribute.Text;
  };
}

export interface SharedCodeLabel extends Struct.ComponentSchema {
  collectionName: 'components_shared_code_labels';
  info: {
    displayName: 'code label';
  };
  attributes: {
    code: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedEyebrowHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_eyebrow_headings';
  info: {
    displayName: 'eyebrow heading';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.Component<'shared.lead-accent', false>;
  };
}

export interface SharedFact extends Struct.ComponentSchema {
  collectionName: 'components_shared_facts';
  info: {
    displayName: 'fact';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    a: Schema.Attribute.Text;
    q: Schema.Attribute.String;
  };
}

export interface SharedHeadline extends Struct.ComponentSchema {
  collectionName: 'components_shared_headlines';
  info: {
    displayName: 'headline';
  };
  attributes: {
    line1: Schema.Attribute.String;
    line2: Schema.Attribute.String;
  };
}

export interface SharedHeadline3 extends Struct.ComponentSchema {
  collectionName: 'components_shared_headline3s';
  info: {
    displayName: 'headline3';
  };
  attributes: {
    accent: Schema.Attribute.String;
    line1: Schema.Attribute.String;
    line2Lead: Schema.Attribute.String;
  };
}

export interface SharedIconItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_items';
  info: {
    displayName: 'icon item';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      ['target', 'fingerprint', 'eye', 'mail', 'phone', 'instagram', 'linkedin']
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedLeadAccent extends Struct.ComponentSchema {
  collectionName: 'components_shared_lead_accents';
  info: {
    displayName: 'lead accent';
  };
  attributes: {
    accent: Schema.Attribute.String;
    lead: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedLockup extends Struct.ComponentSchema {
  collectionName: 'components_shared_lockups';
  info: {
    displayName: 'lockup';
  };
  attributes: {
    accent: Schema.Attribute.String;
    line1: Schema.Attribute.String;
    line2Lead: Schema.Attribute.String;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    alt: Schema.Attribute.String;
    ariaLabel: Schema.Attribute.String;
    src: Schema.Attribute.Media<'images' | 'videos'>;
  };
}

export interface SharedNameSlug extends Struct.ComponentSchema {
  collectionName: 'components_shared_name_slugs';
  info: {
    displayName: 'name slug';
  };
  attributes: {
    name: Schema.Attribute.String;
    slug: Schema.Attribute.String;
  };
}

export interface SharedNamedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_named_texts';
  info: {
    displayName: 'named text';
  };
  attributes: {
    name: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedRouteLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_route_links';
  info: {
    displayName: 'route link';
  };
  attributes: {
    label: Schema.Attribute.String;
    to: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedShowcaseHalf extends Struct.ComponentSchema {
  collectionName: 'components_shared_showcase_halfs';
  info: {
    displayName: 'showcase half';
  };
  attributes: {
    defaultImages: Schema.Attribute.Media<'images' | 'videos', true>;
    items: Schema.Attribute.Component<'shared.showcase-item', true>;
    text: Schema.Attribute.Component<'shared.showcase-text', false>;
  };
}

export interface SharedShowcaseItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_showcase_items';
  info: {
    displayName: 'showcase item';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'videos'>;
    label: Schema.Attribute.String;
  };
}

export interface SharedShowcaseText extends Struct.ComponentSchema {
  collectionName: 'components_shared_showcase_texts';
  info: {
    displayName: 'showcase text';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    sub: Schema.Attribute.Text;
    titleAccent: Schema.Attribute.String;
    titleLead: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'social link';
  };
  attributes: {
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      ['target', 'fingerprint', 'eye', 'mail', 'phone', 'instagram', 'linkedin']
    >;
    label: Schema.Attribute.String;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedTagImageCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_tag_image_cards';
  info: {
    displayName: 'tag image card';
  };
  attributes: {
    client: Schema.Attribute.String;
    headline: Schema.Attribute.Text;
    img: Schema.Attribute.Media<'images' | 'videos'>;
    slug: Schema.Attribute.String;
    stat: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface SharedUrl extends Struct.ComponentSchema {
  collectionName: 'components_shared_urls';
  info: {
    displayName: 'url';
  };
  attributes: {
    url: Schema.Attribute.String;
  };
}

export interface Up2DateHero extends Struct.ComponentSchema {
  collectionName: 'components_up2date_heros';
  info: {
    displayName: 'hero';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'videos'>;
    scrollLabel: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.Component<'up2date.title', false>;
  };
}

export interface Up2DateLeadMagnet extends Struct.ComponentSchema {
  collectionName: 'components_up2date_lead_magnets';
  info: {
    displayName: 'lead magnet';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttonLabel: Schema.Attribute.String;
    emailPlaceholder: Schema.Attribute.String;
    errorToast: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    imageAlt: Schema.Attribute.String;
    successToast: Schema.Attribute.String;
  };
}

export interface Up2DateNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_up2date_newsletters';
  info: {
    displayName: 'newsletter';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttonLabel: Schema.Attribute.String;
    emailPlaceholder: Schema.Attribute.String;
    errorToast: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'shared.headline', false>;
    successToast: Schema.Attribute.String;
  };
}

export interface Up2DateTitle extends Struct.ComponentSchema {
  collectionName: 'components_up2date_titles';
  info: {
    displayName: 'title';
  };
  attributes: {
    accent: Schema.Attribute.String;
    lead: Schema.Attribute.String;
    tail: Schema.Attribute.String;
  };
}

export interface WorkCases extends Struct.ComponentSchema {
  collectionName: 'components_work_casess';
  info: {
    displayName: 'cases';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.tag-image-card', true>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.Component<'shared.lead-accent', false>;
    viewLabel: Schema.Attribute.String;
  };
}

export interface WorkClient extends Struct.ComponentSchema {
  collectionName: 'components_work_clients';
  info: {
    displayName: 'client';
  };
  attributes: {
    color: Schema.Attribute.String;
    initials: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface WorkHero extends Struct.ComponentSchema {
  collectionName: 'components_work_heros';
  info: {
    displayName: 'hero';
  };
  attributes: {
    headline: Schema.Attribute.Component<'shared.lead-accent', false>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    scrollLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
  };
}

export interface WorkStat extends Struct.ComponentSchema {
  collectionName: 'components_work_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {
    client: Schema.Attribute.String;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about.founder': AboutFounder;
      'about.founders': AboutFounders;
      'about.hero': AboutHero;
      'about.quote': AboutQuote;
      'about.story': AboutStory;
      'about.values': AboutValues;
      'contact.faq-column': ContactFaqColumn;
      'contact.form': ContactForm;
      'contact.form-labels': ContactFormLabels;
      'contact.form-placeholders': ContactFormPlaceholders;
      'contact.hero': ContactHero;
      'contact.newsletter-note': ContactNewsletterNote;
      'global.blog-article-labels': GlobalBlogArticleLabels;
      'global.blog-listing': GlobalBlogListing;
      'global.blog-page': GlobalBlogPage;
      'global.blog-section': GlobalBlogSection;
      'global.blog-text-cell': GlobalBlogTextCell;
      'global.case-meta-labels': GlobalCaseMetaLabels;
      'global.case-others-labels': GlobalCaseOthersLabels;
      'global.case-section-labels': GlobalCaseSectionLabels;
      'global.case-study-labels': GlobalCaseStudyLabels;
      'global.cta': GlobalCta;
      'global.footer': GlobalFooter;
      'global.nav': GlobalNav;
      'global.not-found-labels': GlobalNotFoundLabels;
      'global.service-detail-labels': GlobalServiceDetailLabels;
      'home.approach-card': HomeApproachCard;
      'home.approach-panel': HomeApproachPanel;
      'home.cases': HomeCases;
      'home.founders-panel': HomeFoundersPanel;
      'home.hero': HomeHero;
      'home.languages': HomeLanguages;
      'home.phone-mock': HomePhoneMock;
      'home.quick-check': HomeQuickCheck;
      'home.service-row': HomeServiceRow;
      'home.services-panel': HomeServicesPanel;
      'home.way': HomeWay;
      'privacy.block': PrivacyBlock;
      'privacy.section': PrivacySection;
      'services.bento': ServicesBento;
      'services.hero': ServicesHero;
      'services.process': ServicesProcess;
      'services.step': ServicesStep;
      'shared.add-on-category': SharedAddOnCategory;
      'shared.add-ons': SharedAddOns;
      'shared.code-label': SharedCodeLabel;
      'shared.eyebrow-heading': SharedEyebrowHeading;
      'shared.fact': SharedFact;
      'shared.faq': SharedFaq;
      'shared.headline': SharedHeadline;
      'shared.headline3': SharedHeadline3;
      'shared.icon-item': SharedIconItem;
      'shared.lead-accent': SharedLeadAccent;
      'shared.link': SharedLink;
      'shared.lockup': SharedLockup;
      'shared.logo': SharedLogo;
      'shared.name-slug': SharedNameSlug;
      'shared.named-text': SharedNamedText;
      'shared.open-graph': SharedOpenGraph;
      'shared.route-link': SharedRouteLink;
      'shared.seo': SharedSeo;
      'shared.showcase-half': SharedShowcaseHalf;
      'shared.showcase-item': SharedShowcaseItem;
      'shared.showcase-text': SharedShowcaseText;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
      'shared.tag-image-card': SharedTagImageCard;
      'shared.text': SharedText;
      'shared.url': SharedUrl;
      'up2date.hero': Up2DateHero;
      'up2date.lead-magnet': Up2DateLeadMagnet;
      'up2date.newsletter': Up2DateNewsletter;
      'up2date.title': Up2DateTitle;
      'work.cases': WorkCases;
      'work.client': WorkClient;
      'work.hero': WorkHero;
      'work.stat': WorkStat;
    }
  }
}
