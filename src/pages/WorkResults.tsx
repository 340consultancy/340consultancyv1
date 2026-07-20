import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import HoverEyes from '@/components/HoverEyes';
import ContentIndustryShowcase from '@/components/ContentIndustryShowcase';
import { Marquee } from '@/components/ui/marquee';
import { useIsMobile } from '@/hooks/use-mobile';
import { work, img } from '@/content';

/* ── palette accent shortcuts ── */
const ROSA = 'hsl(354 100% 87%)';
const DARK = 'hsl(0 0% 13%)';

const CLIENTS = work.clients;
const STATS = work.stats;

/* ── Logo separator between items ── */
const LogoSep: React.FC = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, margin: '0 clamp(1rem, 2.5vw, 2rem)',
  }}>
    <img
      src={img(work.separatorLogo)}
      alt=""
      aria-hidden
      style={{ height: 18, width: 'auto', opacity: 0.12, userSelect: 'none', pointerEvents: 'none' }}
    />
  </div>
);

/* ── Client pill badge — uniform: tile + name only ── */
const ClientBadge: React.FC<{ initials: string; color: string; name: string }> = ({
  initials, color, name,
}) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 12,
    padding: '9px 22px 9px 10px',
    border: '1px solid hsl(36 21% 95% / 0.08)',
    borderRadius: 999,
    background: 'hsl(36 21% 95% / 0.03)',
    flexShrink: 0,
  }}>
    {/* coloured initial tile */}
    <div style={{
      width: 34, height: 34, borderRadius: 8, background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      border: '1px solid hsl(36 21% 95% / 0.08)',
    }}>
      <span style={{
        fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700,
        fontSize: '0.72rem', letterSpacing: '0.06em', color: 'hsl(36 21% 95% / 0.65)',
      }}>
        {initials}
      </span>
    </div>
    {/* name */}
    <p style={{
      fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700,
      fontSize: 'clamp(0.78rem, 1.1vw, 0.98rem)', letterSpacing: '0.04em',
      textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.82)',
      lineHeight: 1.2, margin: 0, whiteSpace: 'nowrap',
    }}>
      {name}
    </p>
  </div>
);

/* ── Stat badge ── */
const StatBadge: React.FC<{ value: string; label: string; client: string }> = ({ value, label, client }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'baseline', gap: 10,
    flexShrink: 0,
  }}>
    <span style={{
      fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700,
      fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.02em',
      color: ROSA, lineHeight: 1.35, whiteSpace: 'nowrap',
    }}>
      {value}
    </span>
    <span style={{
      fontFamily: "'Poppins', sans-serif", fontWeight: 700,
      fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'hsl(36 21% 95% / 0.55)', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  </div>
);

const WorkResults: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Custom hero — no overlays, clean photo */}
      <section style={{ height: '88vh', position: 'relative', overflow: 'hidden', background: 'hsl(0 0% 5%)', display: 'flex', flexDirection: 'column' }}>
        <img
          src={img(work.hero.image)}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
        />
        {/* Only a bottom gradient for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, hsl(0 0% 5% / 0.68) 80%, hsl(0 0% 5%) 100%)', pointerEvents: 'none' }} />

        {/* 340 watermark right */}
        <motion.span
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
          style={{ position: 'absolute', top: '50%', right: '-2vw', transform: 'translateY(-50%)', fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(14rem, 36vw, 28rem)', lineHeight: 0.85, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px hsl(354 100% 87% / 0.14)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 5 }}
        >
          340
        </motion.span>

        {/* Text bottom */}
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '2.5rem', textAlign: 'center' }}>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)', lineHeight: 0.9, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'hsl(36 21% 95%)', margin: 0 }}
          >
            {work.hero.headline.lead}
            <span style={{ fontFamily: "'Kelson Sans BG', sans-serif", color: 'transparent', WebkitTextStroke: '1.5px hsl(354 100% 87%)' }}>{work.hero.headline.accent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.15rem, 2.8vw, 2rem)', color: 'hsl(36 21% 95% / 0.78)', letterSpacing: '-0.01em', marginTop: '1.2rem' }}
          >
            {work.hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: '2rem' }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.46rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.3)' }}>{work.hero.scrollLabel}</span>
            <motion.div animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, hsl(36 21% 95% / 0.5), transparent)', transformOrigin: 'top' }} />
          </motion.div>
        </div>
      </section>

      {/* ── CLIENT × RESULT MARQUEE STRIP ─────────────────────────────── */}
      <section style={{
        background: DARK,
        position: 'relative',
        overflowX: 'clip',
        overflowY: 'visible',
        padding: 'clamp(2.4rem, 4vh, 3.2rem) 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.4rem, 2.2vh, 2rem)',
      }}>
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent 0%, ${ROSA}55 30%, ${ROSA}55 70%, transparent 100%)`,
        }} />
        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${ROSA}18 50%, transparent)`,
        }} />

        {/* ── Row 1: client badges → left ── */}
        <Marquee
          pauseOnHover
          reverse={false}
          repeat={3}
          className="[--duration:38s] [--gap:0px]"
        >
          {CLIENTS.map((c) => (
            <React.Fragment key={c.name}>
              <ClientBadge
                initials={c.initials}
                color={c.color}
                name={c.name}
              />
              <LogoSep />
            </React.Fragment>
          ))}
        </Marquee>

        {/* Centre hairline */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${ROSA}12 50%, transparent)`,
          margin: '0 clamp(2rem, 6vw, 6rem)',
        }} />

        {/* ── Row 2: result stats → right ── */}
        <Marquee
          pauseOnHover
          reverse={true}
          repeat={3}
          className="[--duration:30s] [--gap:0px]"
        >
          {STATS.map(s => (
            <React.Fragment key={s.value + s.label}>
              <StatBadge value={s.value} label={s.label} client={s.client} />
              <div style={{
                display: 'flex', alignItems: 'center', margin: '0 clamp(1.2rem, 2.5vw, 2.4rem)',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700,
                  fontSize: '1.1rem', color: `${ROSA}30`, lineHeight: 1,
                }}>◆</span>
              </div>
            </React.Fragment>
          ))}
        </Marquee>
      </section>

      {/* CASE STUDIES — bento grid */}
      <section className="bg-foreground">
        <div className="container-wide pt-20 md:pt-28 pb-16 md:pb-20">
          {/* Section header */}
          <div className="mb-10">
            <p className="text-micro mb-4 tracking-[0.3em] text-primary">{work.cases.eyebrow}</p>
            <h2 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              <span style={{ color: 'hsl(36 21% 95%)' }}>{work.cases.heading.lead}</span>
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px hsl(354 100% 87%)' }}>{work.cases.heading.accent}</span>
            </h2>
          </div>

          {/* Card grid — same 5-card bento as homepage: 2 wide + 3 medium */}
          <div className="flex flex-col gap-px" style={{ background: 'hsl(var(--background) / 0.12)' }}>

          {/* ── 3 case studies (feedback #52: first row removed) ── */}
          <div className="flex flex-col md:flex-row gap-px">
            {work.cases.cards.map((card, i) => (
              <HoverEyes key={i} style={{ flex: 1 }} onClick={() => card.slug ? navigate(`/work/${card.slug}`) : navigate('/work')}>
                <motion.div
                  className="relative overflow-hidden group"
                  style={{ minHeight: 'clamp(260px, 38vh, 420px)', height: '100%' }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={img(card.img)} alt={card.client}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ filter: 'brightness(0.5) saturate(0.75)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)' }} />
                  <div className="absolute top-6 left-6 z-10">
                    <p style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>{card.client}</p>
                    <p style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '3px' }}>{card.tag}</p>
                  </div>
                  <div className="absolute top-6 right-6 z-10" style={{ background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 999 }}>
                    <p style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{card.stat}</p>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <p style={{ fontFamily: 'Kelson Sans BG, sans-serif', fontSize: 'clamp(28px, 3.8vw, 58px)', color: '#fff', lineHeight: 0.92, letterSpacing: '0.02em', whiteSpace: 'pre-line', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>{card.headline}</p>
                  </div>
                  <div className={`absolute bottom-6 right-6 z-10 transition-opacity duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div style={{ background: 'hsl(354 100% 87%)', padding: '6px 11px', display: 'flex', alignItems: 'center', gap: 5, borderRadius: 999 }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(89 71% 15%)', fontWeight: 700 }}>{work.cases.viewLabel}</span>
                      <ArrowRight size={8} color="hsl(89 71% 15%)" />
                    </div>
                  </div>
                </motion.div>
              </HoverEyes>
            ))}
          </div>

          </div>
        </div>
      </section>

      {/* CONTENT WE CREATE + EVERY INDUSTRY — two hover-image rectangles */}
      <ContentIndustryShowcase />

      <Testimonials />

      <YesCTA />
      <Footer />
    </div>
  );
};

export default WorkResults;
