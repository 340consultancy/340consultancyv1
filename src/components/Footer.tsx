import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { footer, img, Icon, type IconName } from '@/content';
import { useIsMobile } from '@/hooks/use-mobile';

/* ── Social icon button — large, always pink ────────────────────────────── */
const SocialBtn: React.FC<{
  href: string; icon: IconName; label: string;
}> = ({ href, icon, label }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: 46,
        border: `1px solid ${hov ? 'hsl(354 100% 87%)' : 'hsl(354 100% 87% / 0.35)'}`,
        background: hov ? 'hsl(354 100% 87%)' : 'transparent',
        color: hov ? 'hsl(89 71% 15%)' : 'hsl(354 100% 87%)',
        borderRadius: 12,
        textDecoration: 'none',
        flexShrink: 0,
        transition: 'all 0.22s ease',
        cursor: 'pointer',
        boxShadow: hov ? '0 4px 24px hsl(354 100% 87% / 0.3)' : 'none',
      }}
    >
      <Icon name={icon} size={18} />
    </a>
  );
};

/* ── Footer nav link ────────────────────────────────────────────────────── */
const FooterNavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: '0.58rem',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: hov ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95% / 0.75)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Link>
  );
};

/* ── Back to top ────────────────────────────────────────────────────────── */
const BackToTop: React.FC = () => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={footer.backToTopLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: hov ? 'hsl(36 21% 95%)' : 'hsl(354 100% 87%)',
        border: `1px solid ${hov ? 'hsl(36 21% 95%)' : 'hsl(354 100% 87%)'}`,
        color: 'hsl(89 71% 15%)',
        borderRadius: 999,
        padding: '0.75rem 1.6rem',
        fontFamily: "'Kelson Sans BG', sans-serif",
        fontWeight: 700,
        fontSize: '0.6rem',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hov
          ? '0 4px 22px hsl(0 0% 0% / 0.25)'
          : '0 4px 22px hsl(354 100% 87% / 0.35)',
        flexShrink: 0,
      }}
    >
      <ArrowUp size={13} />
      {footer.backToTopLabel}
    </button>
  );
};

/* ── Footer ─────────────────────────────────────────────────────────────── */
const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: 'hsl(89 71% 15%)', color: 'hsl(36 21% 95%)' }}>

      {/* ── Top accent line ── */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, transparent 0%, hsl(354 100% 87% / 0.5) 40%, hsl(354 100% 87% / 0.5) 60%, transparent 100%)',
      }} />

      {/* ── HERO WORDMARK ROW ── */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        padding: isMobile
          ? 'clamp(1.75rem,7vw,2.5rem) 1.5rem clamp(0.75rem,2vw,1.25rem)'
          : 'clamp(1.6rem,2.6vw,2.4rem) clamp(1.5rem,5vw,4rem)',
        gap: isMobile ? '1.6rem' : '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.8rem, 2vw, 1.6rem)', minWidth: 0 }}>
          <Link to="/" aria-label={footer.logo.alt} style={{ textDecoration: 'none', lineHeight: 1 }}>
            {/* A logo uploaded in the CMS arrives as a URL (contains "/") and
                replaces the typographic default wordmark below. */}
            {String(footer.logo.src).includes('/') ? (
              <motion.img
                src={img(footer.logo.src)}
                alt=""
                aria-hidden
                whileHover={{ opacity: 0.75 }}
                transition={{ duration: 0.18 }}
                style={{
                  height: isMobile ? 'clamp(2.6rem, 11vw, 3.8rem)' : 'clamp(2.6rem, 4.6vw, 4.1rem)',
                  width: 'auto',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
            ) : (
              <motion.span
                aria-hidden
                whileHover={{ opacity: 0.75 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 'clamp(3.2rem, 14vw, 4.6rem)' : 'clamp(3.2rem, 5.7vw, 5rem)',
                  lineHeight: 0.82,
                  letterSpacing: '-0.02em',
                  color: 'transparent',
                  WebkitTextStroke: '1.5px hsl(354 100% 87%)',
                  display: 'block',
                  userSelect: 'none',
                }}
              >
                340
              </motion.span>
            )}
          </Link>

          {/* Wordmark lockup — reads "340 knows the way." */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Kelson Sans BG', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 'clamp(1.4rem, 6.5vw, 2rem)' : 'clamp(1.4rem, 2.4vw, 2.2rem)',
              lineHeight: 0.92,
              letterSpacing: '0.005em',
              textTransform: 'uppercase',
              color: 'hsl(36 21% 95%)',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {footer.lockup.line1}<br />
            {footer.lockup.line2Lead}<span style={{ color: 'hsl(354 100% 87%)' }}>{footer.lockup.accent}</span>
          </motion.p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: isMobile ? 'center' : 'flex-end',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          gap: isMobile ? '1rem' : '1.2rem',
          width: isMobile ? '100%' : undefined,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          paddingBottom: isMobile ? 0 : '0.4rem',
          flexShrink: 0,
        }}>
          <p style={{
            fontFamily: "'Montserrat', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)',
            color: 'hsl(36 21% 95% / 0.7)',
            lineHeight: 1.5,
            textAlign: isMobile ? 'left' : 'right',
            maxWidth: isMobile ? '18ch' : '22ch',
            margin: 0,
          }}>
            {footer.quote}
          </p>
          <BackToTop />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.16)', margin: '0 clamp(1.5rem,5vw,4rem)' }} />

      {/* ── HASHTAG + SOCIAL STRIP ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(1.1rem,2vw,1.5rem) clamp(1.5rem,5vw,4rem)',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {/* Hashtag */}
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
          letterSpacing: '-0.01em',
          color: 'hsl(354 100% 87%)',
          lineHeight: 1,
        }}>
          {footer.hashtag}
        </span>

        {/* Social icons — large, pink */}
        <div style={{ display: 'flex', gap: '0.7rem', flexShrink: 0 }}>
          {footer.social.map((s) => (
            <SocialBtn key={s.label} href={s.href} icon={s.icon} label={s.label} />
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.16)', margin: '0 clamp(1.5rem,5vw,4rem)' }} />

      {/* ── NAV LINKS ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(1.2rem, 3vw, 2.8rem)',
        padding: 'clamp(1rem,1.8vw,1.4rem) clamp(1.5rem,5vw,4rem)',
        flexWrap: 'wrap',
      }}>
        {footer.nav.map(({ label, to }, i, arr) => (
          <React.Fragment key={to}>
            <FooterNavLink to={to} label={label} />
          </React.Fragment>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        borderTop: 'none',
        padding: 'clamp(1rem,2vw,1.5rem) clamp(1.5rem,5vw,4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '0.5rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'hsl(36 21% 95% / 0.55)',
        }}>
          {footer.copyright}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            to={footer.privacy.to}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '0.5rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'hsl(36 21% 95% / 0.55)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'hsl(36 21% 95%)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'hsl(36 21% 95% / 0.55)')}
          >
            {footer.privacy.label}
          </Link>

          <span style={{
            fontFamily: "'Montserrat', serif",
            fontStyle: 'italic',
            fontSize: '0.72rem',
            color: 'hsl(36 21% 95% / 0.5)',
            letterSpacing: '0.02em',
          }}>
            {footer.tagline}
          </span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
