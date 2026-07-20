// Contact & FAQ page (single type). Serializable: images → AssetKey,
// icons → IconName, text verbatim.

import type { AssetKey } from '@/content/assets';
import type { IconName } from '@/content/icons';

export interface ContactLink {
  icon: IconName;
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqColumn {
  eyebrow: string;
  headline: { line1: string; line2: string };
  items: FaqItem[];
}

export interface ContactContent {
  hero: {
    image: AssetKey;
    imagePosition: string;
    eyebrow: string;
    headline: string;
    tagline: string;
    scrollLabel: string;
  };
  form: {
    photo: AssetKey;
    photoAlt: string;
    eyebrow: string;
    headline: { line1: string; line2: string };
    intro: string;
    labels: {
      name: string;
      email: string;
      instagram: string;
      instagramOptional: string;
      interest: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      instagram: string;
      interest: string;
      message: string;
    };
    serviceOptions: string[];
    newsletter: { prefix: string; highlight: string; suffix: string };
    submitLabel: string;
    successToast: string;
    errorToast: string;
  };
  links: ContactLink[];
  faq: FaqColumn;
  pricingFaq: FaqColumn;
}

export const contact: ContactContent = {
  hero: {
    image: 'contact-sofa',
    imagePosition: '50% 40%',
    eyebrow: 'GET IN TOUCH',
    headline: 'CONTACT',
    tagline: "Let's talk.",
    scrollLabel: 'SCROLL',
  },
  form: {
    photo: 'contact-sofa',
    photoAlt: '340 Consultancy founders',
    eyebrow: 'WRITE TO US',
    headline: { line1: 'Send us', line2: 'a message.' },
    intro: "Whether you just have a question or you're ready to get started, either way, drop us a message. We'd love to chat.",
    labels: {
      name: 'NAME',
      email: 'EMAIL',
      instagram: 'INSTAGRAM HANDLE',
      instagramOptional: '(optional)',
      interest: "I'M INTERESTED IN",
      message: 'MESSAGE',
    },
    placeholders: {
      name: 'Linda Müller',
      email: 'hello@brand.com',
      instagram: '@yourbrand',
      interest: 'Select…',
      message: 'Tell us about your brand and what you want to achieve…',
    },
    serviceOptions: [
      'Social Media Strategy',
      'Social Media Management',
      '1:1 Coaching',
      'Content & Copywriting',
      'Workshops',
      'Not sure yet',
    ],
    newsletter: {
      prefix: "I'd like to subscribe to the ",
      highlight: '340 Newsletter',
      suffix: ', no spam, just real insights and industry updates.',
    },
    submitLabel: 'SEND MESSAGE →',
    successToast: "Thanks — we'll be in touch shortly.",
    errorToast: "Something went wrong — please try again or email us directly.",
  },
  links: [
    { icon: 'mail', label: 'info@340consultancy.com', href: 'mailto:info@340consultancy.com' },
    { icon: 'phone', label: '+31 6 13866189', href: 'tel:+31613866189' },
    { icon: 'instagram', label: '@340consultancy', href: 'https://instagram.com/340consultancy' },
    { icon: 'linkedin', label: '340 Consultancy', href: 'https://linkedin.com/company/340consultancy' },
  ],
  faq: {
    eyebrow: 'YOU ASKED',
    headline: { line1: 'Questions', line2: 'Answered.' },
    items: [
      {
        q: 'How long until we see results?',
        a: "Organic growth takes time, but you'll start noticing shifts in engagement within the first few months. Paid campaigns move faster, often within weeks.",
      },
      {
        q: 'What do we as a client need to provide?',
        a: "We'll send you an onboarding questionnaire before we kick things off. From there, we'll need access to your social media accounts and any brand assets you already have — think logos, fonts, brand colors, existing content. Don't have everything? No problem. We'll help you figure out what's missing.",
      },
      {
        q: 'Do you also create the visuals / imagery?',
        a: "Yes. We design graphics and templates, and handle basic video editing. The one thing we'll need from you: the raw images and footage. You know your brand best — we'll make it look the part.",
      },
      {
        q: 'In which languages do you work?',
        a: 'English, Dutch, German, and Spanish. Pick yours.',
      },
    ],
  },
  pricingFaq: {
    eyebrow: 'PRICING & COMMITMENT',
    headline: { line1: 'Pricing', line2: 'FAQ.' },
    items: [
      {
        q: 'Is there a minimum term?',
        a: "For social media management, we work with a minimum of 3 months. Social media takes time to build momentum, and we're not in the business of quick fixes. All other services have no minimum term.",
      },
      {
        q: 'What does onboarding look like?',
        a: 'We will have an introductory call with you to better understand your challenges and needs. Depending on which service we go through our questionnaire together or offer a flexible option to simply share it with you.',
      },
      {
        q: 'What happens if we want to cancel?',
        a: "For social media management, 30 days written notice is all we need. For one-off services like strategy, there's a 24-hour window after signing if you change your mind.",
      },
      {
        q: 'Do you guarantee results?',
        a: "Honestly? No, and we won't pretend otherwise. No one can guarantee specific numbers on social media. What we do guarantee is a strategy built to perform, continuous optimization based on real data, and full transparency throughout.",
      },
    ],
  },
};
