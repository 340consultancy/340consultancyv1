import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import SplitHeading from '@/components/SplitHeading';
import { useIsMobile } from '@/hooks/use-mobile';
import { contact, img, Icon } from '@/content';
import { strapiCreate } from '@/lib/strapi';

/* ─── FAQ Accordion item ─────────────────────────────────────────────────── */

const FaqItem: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderTop: '1px solid hsl(36 21% 95% / 0.08)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4"
        style={{ padding: 'clamp(1rem, 2vw, 1.4rem) 0' }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Kelson Sans BG', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
            letterSpacing: '0.01em',
            lineHeight: 1.35,
            color: open ? 'hsl(36 21% 95%)' : 'hsl(36 21% 95% / 0.75)',
            transition: 'color 0.3s ease',
            flex: 1,
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          <Plus size={16} color="hsl(354 100% 87%)" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)',
                lineHeight: 1.75,
                color: 'hsl(36 21% 95% / 0.55)',
                paddingBottom: 'clamp(1rem, 1.5vw, 1.3rem)',
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main component ─────────────────────────────────────────────────────── */

const ContactFAQ: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const prefillName = (location.state as { name?: string } | null)?.name ?? '';

  const [form, setForm] = useState({
    name: prefillName,
    igHandle: '',
    email: '',
    interest: '',
    message: '',
    newsletter: false,
  });

  const [founderSrc, setFounderSrc] = useState<string>(img(contact.form.photo));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFounderSrc(url);
  }, []);

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

  useEffect(() => {
    if (prefillName) {
      const el = document.getElementById('contacto');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  /* Shared input style — bump to 16px on mobile to avoid iOS zoom */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid hsl(36 21% 95% / 0.12)',
    fontFamily: "'Poppins', sans-serif",
    fontSize: isMobile ? '16px' : 'clamp(0.82rem, 1vw, 0.9rem)',
    color: 'hsl(36 21% 95%)',
    padding: isMobile ? '0.9rem 0' : '1rem 0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  return (
    <div style={{ background: 'hsl(0 0% 13%)', color: 'hsl(36 21% 95%)' }}>
      <TopNav />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          height: '88vh',
          background: 'hsl(0 0% 5%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {/* Background photo — raw, no overlays */}
        <img
          src={img(contact.hero.image)}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: contact.hero.imagePosition,
          }}
        />
        {/* Minimal bottom fade so text stays legible */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, hsl(0 0% 5% / 0.55) 82%, hsl(0 0% 5%) 100%)',
          }}
        />


        {/* Content — bottom-anchored like all other PageHero pages */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            gap: 0,
            paddingBottom: '2rem',
            paddingLeft: '1.5rem', paddingRight: '1.5rem',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '0.6rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'hsl(354 100% 87%)',
              marginBottom: '1rem',
            }}
          >
            {contact.hero.eyebrow}
          </motion.p>

          {/* Headline — one line */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Kelson Sans BG', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 9vw, 6.5rem)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'hsl(36 21% 95%)',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {contact.hero.headline}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1rem, 4vw, 2rem)',
              color: 'hsl(36 21% 95% / 0.78)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              marginTop: '1.2rem',
            }}
          >
            {contact.hero.tagline}
          </motion.p>

        </div>

      </section>


      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CONTACT FORM — visual, founders photo left, form right            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        id="contacto"
        style={{ background: 'hsl(0 0% 13%)', borderBottom: '1px solid hsl(36 21% 95% / 0.06)', scrollMarginTop: 88 }}
      >
        {/* min-height instead of a fixed height: the form column may grow taller
            than the viewport and must never be clipped at the top or bottom. */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ minHeight: isMobile ? 'auto' : 'calc(100vh - 72px)' }}
        >
          {/* ── Left: Founders photo ── */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: isMobile ? 'clamp(260px, 44vh, 380px)' : '100%',
            }}
          >
            <img
              src={founderSrc}
              alt={contact.form.photoAlt}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 20%',
              }}
            />

            {/* Gradient veil */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, hsl(0 0% 8% / 0.72) 0%, transparent 55%)',
              }}
            />

            {/* Contact links — bottom left, subtle */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                left: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {contact.links.map(({ icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    opacity: 0.65,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.65'}
                >
                  <Icon name={icon} size={11} color="hsl(354 100% 87%)" />
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: 'hsl(36 21% 95%)',
                  }}>
                    {label}
                  </span>
                </a>
              ))}
            </div>

          </div>

          {/* ── Right: Form ── */}
          <div
            style={{
              padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1.75rem, 5vw, 5.5rem)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              borderLeft: '1px solid hsl(36 21% 95% / 0.06)',
              minWidth: 0,
            }}
          >
            {/* Header */}
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'hsl(354 100% 87%)',
                marginBottom: '0.6rem',
              }}
            >
              {contact.form.eyebrow}
            </p>

            <SplitHeading
              line1={contact.form.headline.line1}
              line2={contact.form.headline.line2}
              size="clamp(1.6rem, 2.8vw, 2.4rem)"
              className="mb-4"
            />

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                lineHeight: 1.7,
                color: 'hsl(36 21% 95% / 0.55)',
                marginBottom: '1.6rem',
                maxWidth: '46ch',
              }}
            >
              {contact.form.intro}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 2rem' }}>
                <div style={{ marginBottom: '0.9rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'hsl(36 21% 95% / 0.3)',
                      marginBottom: 8,
                    }}
                  >
                    {contact.form.labels.name}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={contact.form.placeholders.name}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = 'hsl(354 100% 87% / 0.6)')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = 'hsl(36 21% 95% / 0.12)')}
                  />
                </div>
                <div style={{ marginBottom: '0.9rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'hsl(36 21% 95% / 0.3)',
                      marginBottom: 8,
                    }}
                  >
                    {contact.form.labels.email}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={contact.form.placeholders.email}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = 'hsl(354 100% 87% / 0.6)')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = 'hsl(36 21% 95% / 0.12)')}
                  />
                </div>
              </div>

              {/* Instagram */}
              <div style={{ marginBottom: '0.9rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'hsl(36 21% 95% / 0.3)',
                    marginBottom: 8,
                  }}
                >
                  {contact.form.labels.instagram} <span style={{ opacity: 0.45 }}>{contact.form.labels.instagramOptional}</span>
                </label>
                <input
                  type="text"
                  placeholder={contact.form.placeholders.instagram}
                  value={form.igHandle}
                  onChange={e => setForm({ ...form, igHandle: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'hsl(354 100% 87% / 0.6)')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'hsl(36 21% 95% / 0.12)')}
                />
              </div>

              {/* Interest */}
              <div style={{ marginBottom: '0.9rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'hsl(36 21% 95% / 0.3)',
                    marginBottom: 8,
                  }}
                >
                  {contact.form.labels.interest}
                </label>
                <select
                  required
                  value={form.interest}
                  onChange={e => setForm({ ...form, interest: e.target.value })}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    color: form.interest ? 'hsl(36 21% 95%)' : 'hsl(36 21% 95% / 0.3)',
                    cursor: 'pointer',
                  }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'hsl(354 100% 87% / 0.6)')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'hsl(36 21% 95% / 0.12)')}
                >
                  <option value="" style={{ background: 'hsl(0 0% 10%)', color: 'hsl(36 21% 95% / 0.4)' }}>
                    {contact.form.placeholders.interest}
                  </option>
                  {contact.form.serviceOptions.map(s => (
                    <option key={s} value={s} style={{ background: 'hsl(0 0% 10%)', color: 'hsl(36 21% 95%)' }}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'hsl(36 21% 95% / 0.3)',
                    marginBottom: 8,
                  }}
                >
                  {contact.form.labels.message}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={contact.form.placeholders.message}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    ...inputStyle,
                    resize: 'none',
                    paddingTop: '0.8rem',
                  }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'hsl(354 100% 87% / 0.6)')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'hsl(36 21% 95% / 0.12)')}
                />
              </div>

              {/* Newsletter opt-in */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.7rem',
                  marginBottom: '1.4rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                {/* Custom checkbox */}
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: '1px',
                    width: 14,
                    height: 14,
                    border: `1px solid ${form.newsletter ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95% / 0.2)'}`,
                    borderRadius: 3,
                    background: form.newsletter ? 'hsl(354 100% 87%)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                >
                  {form.newsletter && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="hsl(0 0% 8%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={e => setForm({ ...form, newsletter: e.target.checked })}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.65rem',
                  lineHeight: 1.6,
                  color: 'hsl(36 21% 95% / 0.38)',
                  letterSpacing: '0.01em',
                }}>
                  {contact.form.newsletter.prefix}<span style={{ color: 'hsl(36 21% 95% / 0.6)' }}>{contact.form.newsletter.highlight}</span>{contact.form.newsletter.suffix}
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '1.1rem 1.4rem',
                  background: 'hsl(354 100% 87%)',
                  border: 'none',
                  borderRadius: 999,
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'hsl(89 71% 15%)',
                  cursor: submitting ? 'wait' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                  transition: 'background 0.32s ease, color 0.32s ease, box-shadow 0.32s ease',
                  boxShadow: '0 4px 24px -4px hsl(354 100% 87% / 0.4)',
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = 'hsl(89 71% 15%)';
                  t.style.color = 'hsl(354 100% 87%)';
                  t.style.boxShadow = '0 4px 24px -4px hsl(89 71% 15% / 0.5)';
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = 'hsl(354 100% 87%)';
                  t.style.color = 'hsl(89 71% 15%)';
                  t.style.boxShadow = '0 4px 24px -4px hsl(354 100% 87% / 0.4)';
                }}
              >
                {contact.form.submitLabel}
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* FAQ — two columns side by side                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'hsl(0 0% 13%)',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: 'none',
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'clamp(3rem, 6vw, 6rem)', maxWidth: 1280, margin: '0 auto' }}
        >
          {/* ── Left: You Asked ── */}
          <div>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'hsl(354 100% 87%)',
                marginBottom: '1rem',
              }}
            >
              {contact.faq.eyebrow}
            </p>

            <SplitHeading
              line1={contact.faq.headline.line1}
              line2={contact.faq.headline.line2}
              size="clamp(1.8rem, 3vw, 2.6rem)"
              className="mb-8"
            />

            <div style={{ borderBottom: '1px solid hsl(36 21% 95% / 0.08)' }}>
              {contact.faq.items.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} index={i} />
              ))}
            </div>
          </div>

          {/* ── Right: Pricing FAQ ── */}
          <div>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'hsl(354 100% 87%)',
                marginBottom: '1rem',
              }}
            >
              {contact.pricingFaq.eyebrow}
            </p>

            <SplitHeading
              line1={contact.pricingFaq.headline.line1}
              line2={contact.pricingFaq.headline.line2}
              size="clamp(1.8rem, 3vw, 2.6rem)"
              className="mb-8"
            />

            <div style={{ borderBottom: '1px solid hsl(36 21% 95% / 0.08)' }}>
              {contact.pricingFaq.items.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactFAQ;
