// /contact — green header, then the contact block on light (intro, founders
// photo and direct links on the left, the form on the right), then the two
// FAQ columns, the YES call to action and the footer.
// Submission logic is unchanged: messages land in the CMS ("Inbox: Contact form").

import React, { useState, useEffect, useId } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import GreenHeader from '@/components/GreenHeader';
import SplitHeading from '@/components/SplitHeading';
import { contact, img, Icon } from '@/content';
import { strapiCreate } from '@/lib/strapi';

const GREEN = 'hsl(89 71% 15%)';
const ROSA = 'hsl(354 100% 87%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const BEIGE = 'hsl(36 18% 92%)';
const INK = 'hsl(0 0% 13%)';
const FONT_DISPLAY = "'Kelson Sans BG', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";

/** Hollow headings on light sections: ink solid line, green outlined line. */
const LIGHT_HEADING = { solidColor: GREEN, strokeColor: GREEN } as const;

/** "NAME" → "Name" (labels are stored upper-case in the CMS). */
const sentenceCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const css = `
.ct-root a:focus-visible, .ct-root button:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 3px; }
.ct-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(2.5rem, 6vw, 6rem); align-items: start; }
.ct-faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(3rem, 6vw, 6rem); }
.ct-pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 1.5rem; }
.ct-field { width: 100%; background: ${OFFWHITE}; border: 1px solid hsl(0 0% 13% / 0.18); border-radius: 0; font-family: ${FONT_BODY}; font-size: 16px; color: ${INK}; padding: .9rem 1rem; outline: none; transition: border-color .25s ease, box-shadow .25s ease; }
.ct-field::placeholder { color: hsl(0 0% 13% / 0.38); }
.ct-field:focus { border-color: ${GREEN}; box-shadow: 0 0 0 3px hsl(89 71% 15% / 0.18); }
.ct-select { appearance: none; -webkit-appearance: none; cursor: pointer; background-image: linear-gradient(45deg, transparent 50%, ${GREEN} 50%), linear-gradient(135deg, ${GREEN} 50%, transparent 50%); background-position: calc(100% - 20px) 50%, calc(100% - 15px) 50%; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 2.5rem; }
.ct-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.ct-check input:focus-visible + .ct-box { outline: 2px solid ${GREEN}; outline-offset: 2px; }
.ct-link { display: flex; align-items: center; gap: .7rem; padding: .85rem 0; border-top: 1px solid hsl(0 0% 13% / 0.12); color: ${INK}; text-decoration: none; transition: color .2s ease; }
.ct-link:hover { color: ${GREEN}; }
.ct-submit { width: 100%; justify-content: center; }
.ct-submit:disabled { opacity: .6; cursor: wait; }
@media (max-width: 860px) {
  .ct-grid, .ct-faq, .ct-pair { grid-template-columns: 1fr; }
}
`;

/* ─── FAQ Accordion item ─────────────────────────────────────────────────── */

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div style={{ borderTop: '1px solid hsl(0 0% 13% / 0.14)' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4"
        style={{ padding: 'clamp(1rem, 2vw, 1.3rem) 0' }}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            letterSpacing: '0.01em',
            lineHeight: 1.35,
            color: open ? GREEN : INK,
            transition: 'color 0.3s ease',
            flex: 1,
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0, marginTop: 2, display: 'inline-flex' }}
          aria-hidden
        >
          <Plus size={18} color={GREEN} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontFamily: FONT_BODY, fontSize: '0.95rem', lineHeight: 1.75, color: 'hsl(0 0% 13% / 0.72)', maxWidth: '60ch', paddingBottom: 'clamp(1rem, 1.5vw, 1.3rem)', margin: 0 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqColumn: React.FC<{ column: typeof contact.faq }> = ({ column }) => (
  <div>
    <p className="text-micro mb-4 tracking-[0.3em]" style={{ color: GREEN }}>{column.eyebrow}</p>
    <SplitHeading line1={column.headline.line1} line2={column.headline.line2} size="clamp(2rem, 3.4vw, 3rem)" className="mb-8" {...LIGHT_HEADING} />
    <div style={{ borderBottom: '1px solid hsl(0 0% 13% / 0.14)' }}>
      {column.items.map((f) => (
        <FaqItem key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: FONT_BODY,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: INK,
  marginBottom: 8,
};

const ContactFAQ: React.FC = () => {
  const location = useLocation();
  const reduce = useReducedMotion();
  const prefillName = (location.state as { name?: string } | null)?.name ?? '';

  const [form, setForm] = useState({
    name: prefillName,
    igHandle: '',
    email: '',
    interest: '',
    message: '',
    newsletter: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Lands in the CMS under Content Manager → “Inbox: Contact form”.
      await strapiCreate('contact-messages', {
        name: form.name,
        email: form.email,
        igHandle: form.igHandle,
        interest: form.interest,
        message: form.message,
        newsletter: form.newsletter,
      });
      toast.success(contact.form.successToast);
      setForm({ name: '', igHandle: '', email: '', interest: '', message: '', newsletter: false });
    } catch (err) {
      console.warn('[contact] submit failed:', err);
      toast.error(contact.form.errorToast);
    } finally {
      setSubmitting(false);
    }
  };

  // Arriving from the YES call to action: jump straight to the form.
  useEffect(() => {
    if (prefillName) {
      const el = document.getElementById('contacto');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="ct-root" style={{ background: OFFWHITE, color: INK }}>
      <style>{css}</style>
      <TopNav />

      <GreenHeader lead={contact.hero.headline} accent={contact.hero.tagline} intro={contact.form.intro} />

      {/* ═══ CONTACT — details left, form right ═══ */}
      <section id="contacto" style={{ scrollMarginTop: 88 }}>
        <div className="container-wide ct-grid" style={{ paddingTop: 'clamp(4.5rem, 11vh, 7.5rem)', paddingBottom: 'clamp(4.5rem, 11vh, 7.5rem)' }}>
          {/* ── Left: who you're writing to ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-micro mb-4 tracking-[0.3em]" style={{ color: GREEN }}>{contact.form.eyebrow}</p>
            <SplitHeading line1={contact.form.headline.line1} line2={contact.form.headline.line2} size="clamp(2.4rem, 4.6vw, 4rem)" className="mb-8" {...LIGHT_HEADING} />

            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: BEIGE, marginBottom: '2rem', maxWidth: 520 }}>
              <img
                src={img(contact.form.photo)}
                alt={contact.form.photoAlt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: contact.hero.imagePosition }}
              />
            </div>

            <div style={{ borderBottom: '1px solid hsl(0 0% 13% / 0.12)', maxWidth: 520 }}>
              {contact.links.map(({ icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="ct-link"
                >
                  <Icon name={icon} size={16} color={GREEN} />
                  <span style={{ fontFamily: FONT_BODY, fontSize: '0.95rem', fontWeight: 500 }}>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: the form ── */}
          <div style={{ background: BEIGE, padding: 'clamp(1.75rem, 4vw, 3.25rem)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
              <div className="ct-pair" style={{ rowGap: '1.3rem' }}>
                <div>
                  <label htmlFor="ct-name" style={labelStyle}>{sentenceCase(contact.form.labels.name)}</label>
                  <input
                    id="ct-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={contact.form.placeholders.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="ct-field"
                  />
                </div>
                <div>
                  <label htmlFor="ct-email" style={labelStyle}>{sentenceCase(contact.form.labels.email)}</label>
                  <input
                    id="ct-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={contact.form.placeholders.email}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="ct-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ct-ig" style={labelStyle}>
                  {sentenceCase(contact.form.labels.instagram)}{' '}
                  <span style={{ fontWeight: 400, color: 'hsl(0 0% 13% / 0.55)' }}>{contact.form.labels.instagramOptional}</span>
                </label>
                <input
                  id="ct-ig"
                  type="text"
                  placeholder={contact.form.placeholders.instagram}
                  value={form.igHandle}
                  onChange={(e) => setForm({ ...form, igHandle: e.target.value })}
                  className="ct-field"
                />
              </div>

              <div>
                <label htmlFor="ct-interest" style={labelStyle}>{sentenceCase(contact.form.labels.interest)}</label>
                <select
                  id="ct-interest"
                  required
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="ct-field ct-select"
                  style={{ color: form.interest ? INK : 'hsl(0 0% 13% / 0.45)' }}
                >
                  <option value="">{contact.form.placeholders.interest}</option>
                  {contact.form.serviceOptions.map((s) => (
                    <option key={s} value={s} style={{ color: INK }}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ct-message" style={labelStyle}>{sentenceCase(contact.form.labels.message)}</label>
                <textarea
                  id="ct-message"
                  required
                  rows={5}
                  placeholder={contact.form.placeholders.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="ct-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Newsletter opt-in */}
              <label className="ct-check" style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
                />
                <span
                  className="ct-box"
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    width: 18,
                    height: 18,
                    border: `1.5px solid ${form.newsletter ? GREEN : 'hsl(0 0% 13% / 0.35)'}`,
                    background: form.newsletter ? GREEN : OFFWHITE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                >
                  {form.newsletter && (
                    <svg width="10" height="8" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke={ROSA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span style={{ fontFamily: FONT_BODY, fontSize: '0.85rem', lineHeight: 1.6, color: 'hsl(0 0% 13% / 0.7)' }}>
                  {contact.form.newsletter.prefix}
                  <span style={{ color: GREEN, fontWeight: 600 }}>{contact.form.newsletter.highlight}</span>
                  {contact.form.newsletter.suffix}
                </span>
              </label>

              <button type="submit" disabled={submitting} className="btn-primary ct-submit" style={{ outlineColor: GREEN }}>
                {contact.form.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ FAQ — two columns ═══ */}
      <section style={{ borderTop: '1px solid hsl(0 0% 13% / 0.1)' }}>
        <div className="container-wide ct-faq" style={{ paddingTop: 'clamp(4.5rem, 11vh, 7.5rem)', paddingBottom: 'clamp(4.5rem, 11vh, 7.5rem)' }}>
          <FaqColumn column={contact.faq} />
          <FaqColumn column={contact.pricingFaq} />
        </div>
      </section>

      <YesCTA />
      <Footer />
    </div>
  );
};

export default ContactFAQ;
