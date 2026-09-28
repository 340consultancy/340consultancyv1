import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import { useIsMobile } from '@/hooks/use-mobile';
import { caseStudies, caseStudyLabels, img } from '@/content';

const ROSA = 'hsl(354 100% 87%)';

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const study = caseStudies.find((c) => c.slug === slug);
  const others = caseStudies.filter((c) => c.slug !== slug);

  if (!study) {
    return (
      <div style={{ minHeight: '100vh', background: 'hsl(0 0% 13%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.35)', marginBottom: '1.5rem' }}>
            {caseStudyLabels.notFound.message}
          </p>
          <Link to="/work" style={{ fontFamily: "'Kelson Sans BG', sans-serif", color: ROSA, textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            {caseStudyLabels.notFound.backLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(0 0% 13%)' }}>
      <TopNav />

      {/* HERO — full bleed dark, 88vh to align with TopNav */}
      <section style={{ position: 'relative', height: '88vh', overflow: 'hidden', background: 'hsl(0 0% 5%)' }}>
        <img
          src={img(study.heroImg)}
          alt={study.client}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, hsl(0 0% 5% / 0.3) 0%, hsl(0 0% 5% / 0.05) 35%, hsl(0 0% 5% / 0.7) 75%, hsl(0 0% 5%) 100%)' }} />

        {/* 340 watermark — right */}
        <motion.span
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
          style={{
            position: 'absolute', top: '50%', right: '-2vw',
            transform: 'translateY(-50%)',
            fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700,
            fontSize: 'clamp(14rem, 36vw, 28rem)', lineHeight: 0.85,
            letterSpacing: '-0.04em', color: 'transparent',
            WebkitTextStroke: `1.5px ${ROSA}24`,
            userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 1,
          }}
        >
          340
        </motion.span>

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 10, height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vh, 3.5rem)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Industry · Services tag line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.38)' }}>
                {study.industry}
              </span>
              <span style={{ width: 32, height: 1, background: 'hsl(36 21% 95% / 0.18)', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: ROSA }}>
                {study.services}
              </span>
            </div>

            {/* Client name */}
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 800,
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
              color: 'hsl(36 21% 95% / 0.42)',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.6rem',
            }}>
              {study.client}
            </p>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Kelson Sans BG', sans-serif",
              fontSize: 'clamp(2.75rem, 12vw, 13rem)',
              lineHeight: 0.88, letterSpacing: '0.01em',
              color: 'hsl(36 21% 95%)',
              textShadow: '0 4px 40px rgba(0,0,0,0.45)',
              whiteSpace: 'pre-line',
              margin: 0,
            }}>
              {study.headline}
            </h1>
          </motion.div>

        </div>
      </section>

      {/* ← BACK — below hero, top of content */}
      <div style={{ background: 'hsl(0 0% 13%)', padding: 'clamp(1.2rem, 2vw, 1.8rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => navigate('/work')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Poppins', sans-serif", fontWeight: 700,
            fontSize: '0.58rem', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'hsl(36 21% 95% / 0.35)',
            transition: 'color 0.2s ease', padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = ROSA)}
          onMouseLeave={e => (e.currentTarget.style.color = 'hsl(36 21% 95% / 0.35)')}
        >
          <ArrowLeft size={12} />
          {caseStudyLabels.backLabel}
        </motion.button>
      </div>

      {/* META GRID */}
      <section style={{ background: 'hsl(0 0% 13%)' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'hsl(36 21% 95% / 0.05)' }}>
          {[
            { label: caseStudyLabels.meta.client, value: study.client },
            { label: caseStudyLabels.meta.services, value: study.services },
            ...(study.website ? [{ label: caseStudyLabels.meta.website, value: study.website, href: `https://${study.website}` }] : []),
            { label: caseStudyLabels.meta.industry, value: study.industry },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ background: 'hsl(0 0% 7%)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.25)', marginBottom: '0.6rem' }}>
                {item.label}
              </p>
              {'href' in item && item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(0.82rem, 1.4vw, 0.98rem)', color: ROSA, textDecoration: 'none' }}>
                  {item.value}
                  <ExternalLink size={11} />
                </a>
              ) : (
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(0.82rem, 1.4vw, 0.98rem)', color: 'hsl(36 21% 95% / 0.82)', lineHeight: 1.35 }}>
                  {item.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', background: 'hsl(0 0% 13%)' }}>
        <div style={{ maxWidth: 860 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Montserrat', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
              lineHeight: 1.4,
              color: 'hsl(36 21% 95% / 0.85)',
              letterSpacing: '-0.01em',
            }}
          >
            {study.intro}
          </motion.p>
        </div>
      </section>

      {/* THE CHALLENGE */}
      <section style={{ padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem)', background: 'hsl(0 0% 13%)', borderTop: 'none' }}>
        <div style={{ maxWidth: 760 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'hsl(354 100% 87%)', marginBottom: '1rem' }}>
              {caseStudyLabels.sections.challenge}
            </p>
            <div style={{ width: 28, height: 2, background: ROSA, borderRadius: 999, marginBottom: '1.6rem' }} />
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)', lineHeight: 1.9, color: 'hsl(36 21% 95% / 0.65)', fontWeight: 400 }}>
              {study.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CASE VISUALS — 3 square images in one row (feedback #59) */}
      <section style={{ background: 'hsl(0 0% 13%)', padding: 'clamp(2.5rem,5vw,4.5rem) clamp(1.5rem,5vw,5rem)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 'clamp(0.6rem,1.5vw,1.2rem)' }}>
          {[...study.visuals, ...study.gallery].slice(0, 3).map((key, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 8 }}
            >
              <img
                src={img(key)}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* OUR APPROACH */}
      <section style={{ padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem)', background: 'hsl(0 0% 13%)', borderTop: 'none' }}>
        <div style={{ maxWidth: 760 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'hsl(354 100% 87%)', marginBottom: '1rem' }}>
              {caseStudyLabels.sections.approach}
            </p>
            <div style={{ width: 28, height: 2, background: ROSA, borderRadius: 999, marginBottom: '1.6rem' }} />
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)', lineHeight: 1.9, color: 'hsl(36 21% 95% / 0.65)', fontWeight: 400 }}>
              {study.approach}
            </p>
          </motion.div>
        </div>
      </section>

      {/* RESULTS TEXT */}
      <section style={{ padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem)', background: 'hsl(0 0% 13%)', borderTop: 'none' }}>
        <div style={{ maxWidth: 760 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'hsl(354 100% 87%)', marginBottom: '1rem' }}>
              {caseStudyLabels.sections.results}
            </p>
            <div style={{ width: 28, height: 2, background: ROSA, borderRadius: 999, marginBottom: '1.6rem' }} />
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)', lineHeight: 1.9, color: 'hsl(36 21% 95% / 0.65)', fontWeight: 400 }}>
              {study.resultText}
            </p>
          </motion.div>
        </div>
      </section>


      {/* STATS STRIP */}
      <section style={{ background: ROSA, overflow: 'hidden' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${study.stats.length}, 1fr)`, gap: '1px', background: 'rgba(0,0,0,0.1)' }}>
          {study.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ background: ROSA, padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)', textAlign: 'center' }}
            >
              <p style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.9, color: 'hsl(0 0% 8%)', letterSpacing: '0.02em' }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'hsl(0 0% 8% / 0.52)', marginTop: '0.7rem' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OTHER CASES */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', background: 'hsl(0 0% 13%)' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 5vw, 3.5rem)', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.25)', marginBottom: '0.7rem' }}>
                {caseStudyLabels.others.eyebrow}
              </p>
              <h2 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 0.9, color: 'hsl(36 21% 95%)', margin: 0 }}>
                <span style={{ color: 'hsl(36 21% 95%)' }}>{caseStudyLabels.others.heading.lead}</span>
                <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{caseStudyLabels.others.heading.accent}</span>
              </h2>
            </div>
            <Link
              to="/work"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.4)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = ROSA)}
              onMouseLeave={e => (e.currentTarget.style.color = 'hsl(36 21% 95% / 0.4)')}
            >
              {caseStudyLabels.others.allWorkLabel} <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2px' }}>
            {others.map((other, i) => (
              <motion.div
                key={other.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'clamp(240px, 60vw, 340px)' : 'clamp(280px, 42vh, 480px)', borderRadius: 8 }}
                className="group"
              >
                <Link to={`/work/${other.slug}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                  <img
                    src={img(other.cardImg)}
                    alt={other.client}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.8)', transition: 'transform 0.7s ease, filter 0.5s ease' }}
                    className="group-hover:scale-105"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = 'brightness(0.65) saturate(0.9)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = 'brightness(0.5) saturate(0.8)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)' }} />
                  {/* Client info */}
                  <div style={{ position: 'absolute', top: 20, left: 20 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>{other.client}</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '7px', color: 'rgba(255,255,255,0.26)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 3 }}>{other.cardTag}</p>
                  </div>
                  {/* Stat badge — pill */}
                  <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)', padding: '4px 12px', borderRadius: 999 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '7.5px', color: 'rgba(255,255,255,0.82)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{other.cardStat}</p>
                  </div>
                  {/* Headline */}
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                    <p style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#fff', lineHeight: 0.92, letterSpacing: '0.02em', whiteSpace: 'pre-line', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>{other.cardHeadline}</p>
                  </div>
                  {/* VIEW CASE hover pill */}
                  <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <div style={{ background: ROSA, borderRadius: 999, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, opacity: isMobile ? 1 : 0, transition: 'opacity 0.3s ease' }} className={isMobile ? undefined : 'group-hover:opacity-100'}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(0 0% 8%)', fontWeight: 700 }}>{caseStudyLabels.others.viewCaseLabel}</span>
                      <ArrowRight size={10} color="hsl(0 0% 8%)" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <YesCTA />
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
