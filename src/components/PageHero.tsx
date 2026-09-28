import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: React.ReactNode[];
  subtitle?: string;
  tagline?: string;
  image: string;
  imageOpacity?: number;
  imagePosition?: string;
  /** Set true when photo has a light/neutral background (people portraits etc.) */
  lightPhoto?: boolean;
  /** Show the image raw — no tint, no vignette, just a bottom-only dark fade for text readability */
  noOverlay?: boolean;
  /** Deprecated: the "scroll" hint was removed from all heroes. Still accepted so CMS data keeps type-checking. */
  scrollLabel?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, tagline, image, imageOpacity = 0.10, imagePosition = 'center top', lightPhoto = false, noOverlay = false }) => (
  <section
    style={{
      height: '88vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'hsl(0 0% 5%)',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Background image */}
    <div style={{ position: 'absolute', inset: 0 }}>
      <img
        src={image}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imagePosition, opacity: noOverlay ? 1 : imageOpacity }}
      />
      {/* Tint overlay — skipped when noOverlay */}
      {!noOverlay && (
        <div style={{
          position: 'absolute', inset: 0,
          background: lightPhoto ? 'hsl(0 0% 5% / 0.22)' : 'hsl(354 80% 22% / 0.38)',
        }} />
      )}
      {/* Vignette — full when normal, bottom-only when noOverlay (keeps text readable) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: noOverlay
          ? 'linear-gradient(to bottom, transparent 0%, transparent 50%, hsl(0 0% 5% / 0.55) 80%, hsl(0 0% 5%) 100%)'
          : lightPhoto
            ? 'linear-gradient(to bottom, hsl(0 0% 5% / 0.55) 0%, hsl(0 0% 5% / 0.1) 35%, hsl(0 0% 5% / 0.35) 72%, hsl(0 0% 5%) 100%)'
            : 'linear-gradient(to bottom, hsl(0 0% 5% / 0.45) 0%, transparent 35%, hsl(0 0% 5% / 0.55) 72%, hsl(0 0% 5%) 100%)',
      }} />
    </div>

    {/* 340 watermark — right side, like contact page */}
    <motion.span
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%',
        right: '-2vw',
        transform: 'translateY(-50%)',
        fontFamily: "'Kelson Sans BG', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(14rem, 36vw, 28rem)',
        lineHeight: 0.85,
        letterSpacing: '-0.04em',
        color: 'transparent',
        WebkitTextStroke: '1.5px hsl(354 100% 87% / 0.14)',
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 5,
      }}
    >
      340
    </motion.span>

    {/* Main content — text + scroll indicator stacked in normal flow */}
    <div style={{
      position: 'relative', zIndex: 10,
      flex: 1,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-end',
      paddingBottom: '2rem',
      paddingLeft: '1.5rem', paddingRight: '1.5rem',
      textAlign: 'center',
      gap: 0,
    }}>
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Kelson Sans BG', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
          lineHeight: 0.9,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'hsl(36 21% 95%)',
        }}
      >
        {title.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>{line}</span>
        ))}
      </motion.h1>

      {/* Tagline — big, bold, punchy */}
      {tagline && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.15rem, 2.8vw, 2rem)',
            color: 'hsl(36 21% 95% / 0.78)',
            letterSpacing: '-0.01em',
            marginTop: '1.4rem',
            lineHeight: 1.2,
          }}
        >
          {tagline}
        </motion.p>
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Montserrat', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'hsl(36 21% 95% / 0.42)',
            marginTop: '1.75rem',
            maxWidth: 440,
            lineHeight: 1.55,
          }}
        >
          {subtitle}
        </motion.p>
      )}

    </div>
  </section>
);

export default PageHero;
