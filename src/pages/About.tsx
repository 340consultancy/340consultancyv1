import React, { useState } from 'react';
import { toast } from 'sonner';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import PageHero from '@/components/PageHero';
import SplitHeading from '@/components/SplitHeading';
import BlogSection from '@/components/BlogSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { up2date, img } from '@/content';
import { honeypot, postForm } from '@/lib/forms';

/* ─── Lead Magnet Section ──────────────────────────────────────────────────── */

const LeadMagnet: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Added to the Brevo newsletter list.
      await postForm('/api/newsletter', { email, source: 'lead-magnet', website: honeypot(e.currentTarget as HTMLFormElement) });
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
    <div
      className="grid grid-cols-1 md:grid-cols-[1.22fr_1fr]"
      style={{
        minHeight: isMobile ? 'auto' : 'clamp(480px, 56vh, 640px)',
      }}
    >
      {/* Right on mobile stacks below text; on desktop it's to the right */}
      {/* Left — text */}
      <div
        style={{
          background: 'hsl(0 0% 13%)',
          padding: 'clamp(2.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'hsl(354 100% 87%)',
            marginBottom: '1.25rem',
          }}
        >
          {up2date.leadMagnet.eyebrow}
        </p>

        <SplitHeading
          line1={up2date.leadMagnet.headline.line1}
          line2={up2date.leadMagnet.headline.line2}
          size="clamp(1.8rem, 3.5vw, 3rem)"
        />

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.85rem',
            color: 'hsl(36 21% 95% / 0.6)',
            lineHeight: 1.75,
            marginTop: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '42ch',
          }}
        >
          {up2date.leadMagnet.body}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: 420 }}
        >
          {/* Honeypot: invisible to people, bots fill it and get silently dropped. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={up2date.leadMagnet.emailPlaceholder}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid hsl(36 21% 95% / 0.15)',
              padding: isMobile ? '0.95rem 1.4rem' : '0.85rem 1.4rem',
              fontFamily: "'Poppins', sans-serif",
              fontSize: isMobile ? '16px' : '0.85rem',
              color: 'hsl(36 21% 95%)',
              outline: 'none',
              borderRadius: 999,
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'hsl(354 100% 87%)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'hsl(36 21% 95% / 0.15)';
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              background: 'hsl(354 100% 87%)',
              color: 'hsl(0 0% 8%)',
              fontFamily: "'Kelson Sans BG', sans-serif",
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
              transition: 'opacity 0.2s ease',
              boxShadow: '0 4px 24px -4px hsl(354 100% 87% / 0.4)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            {up2date.leadMagnet.buttonLabel}
          </button>
        </form>
      </div>

      {/* Right — book cover full bleed */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: isMobile ? 'clamp(240px, 46vw, 340px)' : '100%',
          minHeight: isMobile ? undefined : 'clamp(280px, 40vh, 420px)',
          borderLeft: isMobile ? 'none' : '1px solid hsl(36 21% 95% / 0.06)',
          borderTop: isMobile ? '1px solid hsl(36 21% 95% / 0.06)' : 'none',
        }}
      >
        <img
          src={img(up2date.leadMagnet.image)}
          alt={up2date.leadMagnet.imageAlt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
        />
      </div>
    </div>
  );
};

/* ─── Newsletter Section ───────────────────────────────────────────────────── */

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Added to the Brevo newsletter list.
      await postForm('/api/newsletter', { email, source: 'newsletter', website: honeypot(e.currentTarget as HTMLFormElement) });
      toast.success(up2date.newsletter.successToast);
      setEmail('');
    } catch (err) {
      console.warn('[newsletter] submit failed:', err);
      toast.error(up2date.newsletter.errorToast);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Top decorative line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, hsl(36 21% 95% / 0.1) 50%, transparent)',
        }}
      />

      <section
        style={{
          background: 'hsl(0 0% 13%)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'hsl(354 100% 87%)',
            marginBottom: '1.5rem',
          }}
        >
          {up2date.newsletter.eyebrow}
        </p>

        <SplitHeading
          line1={up2date.newsletter.headline.line1}
          line2={up2date.newsletter.headline.line2}
          size="clamp(2rem, 4.5vw, 3.8rem)"
          align="center"
        />

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.85rem',
            color: 'hsl(36 21% 95% / 0.45)',
            lineHeight: 1.75,
            maxWidth: '38ch',
            margin: '1.5rem auto 0',
            textAlign: 'center',
          }}
        >
          {up2date.newsletter.body}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 440,
            margin: '2.5rem auto 0',
            gap: 0,
            alignItems: 'stretch',
          }}
        >
          {/* Honeypot: invisible to people, bots fill it and get silently dropped. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={up2date.newsletter.emailPlaceholder}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid hsl(36 21% 95% / 0.15)',
              padding: isMobile ? '0.95rem 1.4rem' : '0.85rem 1.4rem',
              fontFamily: "'Poppins', sans-serif",
              fontSize: isMobile ? '16px' : '0.85rem',
              color: 'hsl(36 21% 95%)',
              outline: 'none',
              borderRadius: 999,
              boxSizing: 'border-box',
              marginBottom: '0.75rem',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'hsl(354 100% 87%)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'hsl(36 21% 95% / 0.15)';
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              background: 'hsl(354 100% 87%)',
              color: 'hsl(0 0% 8%)',
              fontFamily: "'Kelson Sans BG', sans-serif",
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              padding: '1rem 1.4rem',
              border: 'none',
              borderRadius: 999,
              cursor: submitting ? 'wait' : 'pointer',
              opacity: submitting ? 0.6 : 1,
              marginTop: 0,
              transition: 'opacity 0.2s ease',
              boxShadow: '0 4px 24px -4px hsl(354 100% 87% / 0.4)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            {up2date.newsletter.buttonLabel}
          </button>
        </form>
      </section>

      {/* Bottom decorative line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, hsl(36 21% 95% / 0.1) 50%, transparent)',
        }}
      />
    </>
  );
};

/* ─── Page ────────────────────────────────────────────────────────────────── */

const About: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'hsl(0 0% 13%)' }}>
      <TopNav />

      <PageHero
        title={[
          <>
            <span style={{ fontFamily: "'Kelson Sans BG', sans-serif" }}>{up2date.hero.title.lead}</span>
            <span style={{ fontFamily: "'Kelson Sans BG', sans-serif", color: 'transparent', WebkitTextStroke: '1.5px hsl(354 100% 87%)' }}>{up2date.hero.title.accent}</span>
            <span style={{ fontFamily: "'Kelson Sans BG', sans-serif" }}>{up2date.hero.title.tail}</span>
          </>,
        ]}
        tagline={up2date.hero.tagline}
        image={img(up2date.hero.image)}
        scrollLabel={up2date.hero.scrollLabel}
        noOverlay
      />

      {/* Divider — hero → lead magnet */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, hsl(36 21% 95% / 0.1) 50%, transparent)', margin: 'clamp(2.5rem, 6vw, 5rem) 0' }} />

      {/* Lead Magnet Bento */}
      <LeadMagnet />

      {/* Divider — lead magnet → blog */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, hsl(36 21% 95% / 0.1) 50%, transparent)', margin: 'clamp(2.5rem, 6vw, 5rem) 0' }} />

      {/* Blog Bento */}
      <BlogSection />

      <YesCTA />
      <Footer />
    </div>
  );
};

export default About;
