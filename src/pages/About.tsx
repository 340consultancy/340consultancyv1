// /about — UP2DATE. Green header, the free content-calendar download,
// the latest articles as a compact card grid,
// the social posts, then the YES call to action.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import GreenHeader from '@/components/GreenHeader';
import SplitHeading from '@/components/SplitHeading';
import { SocialPostsSection } from '@/components/BlogSection';
import { useIsMobile } from '@/hooks/use-mobile';
import ArticleCard from '@/components/ArticleCard';
import { up2date, blogArticles, blogSection, img } from '@/content';
import { strapiCreate } from '@/lib/strapi';

const GREEN = 'hsl(89 71% 15%)';
const ROSA = 'hsl(354 100% 87%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const BEIGE = 'hsl(36 18% 92%)';
const INK = 'hsl(0 0% 13%)';
const FONT_DISPLAY = "'Kelson Sans BG', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";

/** Light sections use green headings. */
const LIGHT_HEADING = { solidColor: GREEN, strokeColor: GREEN } as const;

const css = `
.u2-link { color: ${INK}; font-family: ${FONT_BODY}; font-weight: 600; font-size: .95rem; text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 1.5px; }
.u2-root a:focus-visible, .u2-root button:focus-visible, .u2-root input:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 3px; }
`;

/* ─── Latest articles ────────────────────────────────────────────────── */

const LatestArticles: React.FC = () => (
  <section className="container-wide" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.2rem, 4.4vw, 4rem)', lineHeight: 1.12, textTransform: 'uppercase', color: INK, margin: 0 }}>
        {blogSection.blogs.headline.join(' ')}
      </h2>
      <Link to={blogSection.blogs.ctaHref} className="u2-link">See all articles</Link>
    </div>
    <div className="article-grid">
      {blogArticles.slice(0, 3).map((a) => <ArticleCard key={a.id} article={a} />)}
    </div>
  </section>
);

/* ─── Lead Magnet Section ──────────────────────────────────────────────────── */

const inputStyle = (isMobile: boolean): React.CSSProperties => ({
  width: '100%',
  background: OFFWHITE,
  border: '1px solid hsl(0 0% 13% / 0.2)',
  padding: isMobile ? '0.95rem 1.4rem' : '0.85rem 1.4rem',
  fontFamily: FONT_BODY,
  fontSize: isMobile ? '16px' : '0.85rem',
  color: INK,
  outline: 'none',
  borderRadius: 999,
  boxSizing: 'border-box',
});

const buttonStyle = (submitting: boolean): React.CSSProperties => ({
  width: '100%',
  background: ROSA,
  color: GREEN,
  fontFamily: FONT_DISPLAY,
  fontWeight: 700,
  fontSize: '0.65rem',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  padding: '1rem 1.4rem',
  border: 'none',
  borderRadius: 999,
  cursor: submitting ? 'wait' : 'pointer',
  opacity: submitting ? 0.6 : 1,
  whiteSpace: 'nowrap',
  transition: 'background 0.25s ease, color 0.25s ease',
  boxShadow: '0 4px 24px -4px hsl(354 100% 87% / 0.4)',
});

const hoverButton = {
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = ROSA; },
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = ROSA; e.currentTarget.style.color = GREEN; },
};

const focusInput = {
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = GREEN; },
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = 'hsl(0 0% 13% / 0.2)'; },
};

const LeadMagnet: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Lands in the CMS under Content Manager → “Inbox: Newsletter signups”.
      await strapiCreate('newsletter-signups', { email, source: 'lead-magnet' });
      toast.success(up2date.leadMagnet.successToast);
      setEmail('');
    } catch (err) {
      console.warn('[lead-magnet] submit failed:', err);
      toast.error(up2date.leadMagnet.errorToast);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-[1.22fr_1fr]"
      style={{ background: BEIGE, minHeight: isMobile ? 'auto' : 'clamp(600px, 72vh, 820px)' }}
    >
      {/* Left — text */}
      <div style={{ padding: 'clamp(2.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: GREEN, marginBottom: '1.25rem' }}>
          {up2date.leadMagnet.eyebrow}
        </p>

        <SplitHeading
          line1={up2date.leadMagnet.headline.line1}
          line2={up2date.leadMagnet.headline.line2}
          size="clamp(2.1rem, 4.2vw, 3.8rem)"
          {...LIGHT_HEADING}
        />

        <p style={{ fontFamily: FONT_BODY, fontSize: '0.9rem', color: 'hsl(0 0% 13% / 0.72)', lineHeight: 1.75, marginTop: '1.25rem', marginBottom: '2rem', maxWidth: '42ch' }}>
          {up2date.leadMagnet.body}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: 420 }}>
          <input
            type="email"
            required
            aria-label={up2date.leadMagnet.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={up2date.leadMagnet.emailPlaceholder}
            style={inputStyle(isMobile)}
            {...focusInput}
          />
          <button type="submit" disabled={submitting} style={buttonStyle(submitting)} {...hoverButton}>
            {up2date.leadMagnet.buttonLabel}
          </button>
        </form>
      </div>

      {/* Right — the founders */}
      <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 'clamp(300px, 90vw, 440px)' : '100%', minHeight: isMobile ? undefined : 'clamp(280px, 40vh, 420px)' }}>
        <img
          src={img(up2date.leadMagnet.image)}
          alt={up2date.leadMagnet.imageAlt}
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 58%' }}
        />
      </div>
    </section>
  );
};

/* ─── Page ────────────────────────────────────────────────────────────────── */

const About: React.FC = () => {
  const { lead, accent, tail } = up2date.hero.title;
  return (
    <div className="u2-root" style={{ minHeight: '100vh', background: OFFWHITE }}>
      <style>{css}</style>
      <TopNav />

      {/* "UP" + "2" / "DATE" — the second line keeps the hollow brand type. */}
      <GreenHeader lead={`${lead}${accent}`} accent={tail} intro={up2date.hero.tagline} />

      <LeadMagnet />

      <LatestArticles />

      {/* White social and closing sections share a spacious background. */}
      <SocialPostsSection tone="light" />

      <YesCTA />
      <Footer />
    </div>
  );
};

export default About;
