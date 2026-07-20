import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { privacy, type PrivacyBlock } from '@/content';

const linkStyle = { color: 'hsl(354 100% 87%)', textDecoration: 'none' } as const;

/* Renders a serializable privacy block (paragraph / list / inline-link) — structure stays here. */
const Block: React.FC<{ block: PrivacyBlock }> = ({ block }) => {
  if (block.kind === 'ul') {
    return (
      <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {block.items.map((it, k) => <li key={k}>{it}</li>)}
      </ul>
    );
  }
  return (
    <p style={block.mt ? { marginTop: block.mt } : undefined}>
      {block.text ?? (
        <>
          {block.lead}
          <a href={block.link!.href} style={linkStyle}>{block.link!.text}</a>
          {block.tail}
        </>
      )}
    </p>
  );
};

const Privacy: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: '100vh', background: 'hsl(0 0% 13%)', color: 'hsl(36 21% 95%)' }}>
      <TopNav />

      {/* ── Back to home — top left, below nav ── */}
      <div style={{ paddingTop: 72 }}>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: 'clamp(1.5rem,3vw,2.5rem) clamp(1.5rem,5vw,5rem) 0' }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'hsl(36 21% 95% / 0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'hsl(354 100% 87%)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'hsl(36 21% 95% / 0.4)')}
          >
            <ArrowLeft size={12} />
            {privacy.backLabel}
          </Link>
        </motion.div>

        {/* ── Page header ── */}
        <div style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1.5rem,5vw,5rem) clamp(1.5rem,3vw,3rem)' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '0.58rem',
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              color: 'hsl(354 100% 87%)',
              marginBottom: '1rem',
            }}
          >
            {privacy.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Kelson Sans BG', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: 'hsl(36 21% 95%)',
              margin: 0,
            }}
          >
            {privacy.heading.lead}
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px hsl(354 100% 87%)' }}>
              {privacy.heading.accent}
            </span>
          </motion.h1>
        </div>

        {/* ── Top hairline ── */}
        <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.07)', margin: '0 clamp(1.5rem,5vw,5rem)' }} />

        {/* ── Content sections ── */}
        <div style={{ padding: 'clamp(2rem,5vw,5rem) clamp(1.5rem,5vw,5rem)', maxWidth: 860 }}>
          {privacy.sections.map((sec, i) => (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'clamp(8rem,18vw,16rem) 1fr',
                gap: isMobile ? '0.75rem' : 'clamp(1.5rem,4vw,4rem)',
                paddingTop: 'clamp(1.5rem,3vw,2.5rem)',
                paddingBottom: 'clamp(1.5rem,3vw,2.5rem)',
                borderBottom: '1px solid hsl(36 21% 95% / 0.06)',
                alignItems: 'start',
              }}
            >
              {/* Section label */}
              <h2 style={{
                fontFamily: "'Kelson Sans BG', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'hsl(354 100% 87%)',
                margin: 0,
                paddingTop: '0.1rem',
              }}>
                {sec.title}
              </h2>

              {/* Content */}
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                color: 'hsl(36 21% 95% / 0.55)',
                lineHeight: 1.85,
              }}>
                {sec.blocks.map((block, j) => <Block key={j} block={block} />)}
              </div>
            </motion.div>
          ))}

          {/* Last updated */}
          <p style={{
            fontFamily: "'Montserrat', serif",
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: 'hsl(36 21% 95% / 0.2)',
            marginTop: 'clamp(2rem,4vw,3.5rem)',
          }}>
            {privacy.lastUpdated}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
