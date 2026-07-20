// Privacy & Imprint page (single type). Content is serializable: rich text is
// modelled as typed blocks (paragraph / list / inline-link) rendered by the page.

export interface PrivacyLink {
  text: string;
  href: string;
}

/** A paragraph: either plain `text`, or `lead` + inline `link` + optional `tail`. `mt` = top spacing. */
export interface PrivacyParagraph {
  kind: 'p';
  text?: string;
  lead?: string;
  link?: PrivacyLink;
  tail?: string;
  mt?: string;
}

export interface PrivacyList {
  kind: 'ul';
  items: string[];
}

export type PrivacyBlock = PrivacyParagraph | PrivacyList;

export interface PrivacySection {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyContent {
  backLabel: string;
  eyebrow: string;
  heading: { lead: string; accent: string };
  sections: PrivacySection[];
  lastUpdated: string;
}

export const privacy: PrivacyContent = {
  backLabel: 'BACK TO HOME',
  eyebrow: 'LEGAL',
  heading: { lead: 'PRIVACY & ', accent: 'IMPRINT' },
  sections: [
    {
      id: 'imprint',
      title: 'Imprint',
      blocks: [
        { kind: 'p', text: '340 Consultancy V.O.F.' },
        { kind: 'p', text: 'Zangvogelstraat 18, 4451 CE Heinkenszand, Netherlands' },
        { kind: 'p', text: 'KvK: 96558075', mt: '0.75rem' },
        { kind: 'p', text: 'VAT: NL867660120B01' },
        { kind: 'p', text: 'Directors: Linda Müller-Veerse & Nancy Boerjan', mt: '0.75rem' },
        { kind: 'p', lead: 'Email: ', link: { text: 'info@340consultancy.com', href: 'mailto:info@340consultancy.com' }, mt: '0.75rem' },
        { kind: 'p', lead: 'Phone: ', link: { text: '+31 6 13866189', href: 'tel:+31613866189' } },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      blocks: [
        { kind: 'p', text: '340 Consultancy V.O.F. ("we", "us", "our") is committed to protecting and respecting your privacy. This policy explains how we collect, use, and store personal data when you visit our website or contact us.' },
      ],
    },
    {
      id: 'data',
      title: 'Data We Collect',
      blocks: [
        { kind: 'p', text: 'When you submit a contact form or otherwise communicate with us, we may collect:' },
        { kind: 'ul', items: ['Name and email address', 'Phone number (if provided)', 'Social media handles (if provided)', 'Any information you include in your message'] },
        { kind: 'p', text: 'We do not use cookies for tracking purposes. Our website does not use analytics tools that identify individual users.', mt: '1rem' },
      ],
    },
    {
      id: 'use',
      title: 'How We Use Your Data',
      blocks: [
        { kind: 'p', text: 'We use your personal data solely to respond to your enquiry and, where applicable, to fulfil our services. We do not sell, share, or transfer your data to third parties unless required by law.' },
      ],
    },
    {
      id: 'retention',
      title: 'Data Retention',
      blocks: [
        { kind: 'p', text: 'We retain personal data for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.' },
      ],
    },
    {
      id: 'rights',
      title: 'Your Rights',
      blocks: [
        { kind: 'p', lead: 'Under GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at ', link: { text: 'info@340consultancy.com', href: 'mailto:info@340consultancy.com' }, tail: '.' },
      ],
    },
  ],
  lastUpdated: 'Last updated: May 2026 — Full privacy policy is being finalized. Contact us if you have any questions.',
};
