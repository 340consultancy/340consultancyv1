// UP2DATE page (single type) — lead magnet + newsletter copy.
// Serializable: images → AssetKey, text verbatim.

import type { AssetKey } from '@/content/assets';

export interface Up2dateContent {
  hero: {
    /** Title parts: lead + outlined accent + tail (renders "UP2DATE"). */
    title: { lead: string; accent: string; tail: string };
    tagline: string;
    image: AssetKey;
    scrollLabel: string;
  };
  leadMagnet: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    body: string;
    emailPlaceholder: string;
    buttonLabel: string;
    successToast: string;
    errorToast: string;
    image: AssetKey;
    imageAlt: string;
  };
  newsletter: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    body: string;
    emailPlaceholder: string;
    buttonLabel: string;
    successToast: string;
    errorToast: string;
  };
}

export const up2date: Up2dateContent = {
  hero: {
    title: { lead: 'UP', accent: '2', tail: 'DATE' },
    tagline: 'Consider yourself updated.',
    image: 'up2date',
    scrollLabel: 'SCROLL',
  },
  leadMagnet: {
    eyebrow: 'FREE DOWNLOAD',
    headline: { line1: 'Your Free Social Media', line2: 'Content Calendar.' },
    body: 'Download our free social media content calendar and plan a full month of posts — the same framework our clients use to stay consistent and on-brand.',
    emailPlaceholder: 'Your email…',
    buttonLabel: 'GET IT FOR FREE →',
    successToast: 'Thanks! Check your inbox.',
    errorToast: 'Something went wrong — please try again in a moment.',
    image: 'starterguide',
    imageAlt: 'Social Media Content Calendar',
  },
  newsletter: {
    eyebrow: 'NEWSLETTER',
    headline: { line1: 'Always stay', line2: 'up2date.' },
    body: 'No spam. Just real insights, new blog posts and fresh social strategies — straight to your inbox.',
    emailPlaceholder: 'Your email…',
    buttonLabel: 'SUBSCRIBE →',
    successToast: "You're in! 🎉",
    errorToast: 'Something went wrong — please try again in a moment.',
  },
};
