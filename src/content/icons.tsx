// ─────────────────────────────────────────────────────────────────────────────
// Icon registry — content-bound icons only.
//
// Content modules store an icon NAME string (e.g. "target"); the component
// resolves it via <Icon name="target" />. Purely decorative / UI affordance
// icons (arrows, close, check, …) stay as direct lucide imports in components.
//
// CMS migration maps each name → a select/enum field.
// ─────────────────────────────────────────────────────────────────────────────

import type { LucideIcon, LucideProps } from 'lucide-react';
import { Target, Fingerprint, Eye, Mail, Phone, Instagram, Linkedin } from 'lucide-react';

export const iconRegistry = {
  target: Target,
  fingerprint: Fingerprint,
  eye: Eye,
  mail: Mail,
  phone: Phone,
  instagram: Instagram,
  linkedin: Linkedin,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

/** Render a content-bound icon by name. Forwards all lucide props (size, color, strokeWidth…). */
export const Icon = ({ name, ...props }: { name: IconName } & LucideProps) => {
  const Cmp = iconRegistry[name];
  return <Cmp {...props} />;
};
