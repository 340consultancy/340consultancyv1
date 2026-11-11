// /work/:slug — case study as a long-read.
// Green cover with the headline and the facts, a wide photo that breaks out
// of the cover, then the three chapters (challenge → approach → results)
// with a sticky chapter title, the numbers, and the next case as the closing page.

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import { caseStudies, caseStudyLabels, img } from '@/content';

const GREEN = 'hsl(89 71% 15%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const BEIGE = 'hsl(36 18% 92%)';
const INK = 'hsl(0 0% 13%)';
const ROSA = 'hsl(354 100% 87%)';
const FONT_DISPLAY = "'Kelson Sans BG', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";
const EASE = [0.16, 1, 0.3, 1] as const;

const css = `
.cs-root a:focus-visible { outline: 2px solid ${ROSA}; outline-offset: 4px; }
.cs-facts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.5rem clamp(1rem, 3vw, 3rem); }
.cs-chapter { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: clamp(1rem, 2.5vw, 2.5rem); }
.cs-chapter > .cs-label { grid-column: 1 / span 3; position: sticky; top: 120px; align-self: start; }
.cs-chapter > .cs-body { grid-column: 5 / span 6; }
.cs-pair { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: clamp(1rem, 2.5vw, 2.5rem); align-items: start; }
.cs-pair > :first-child { grid-column: 1 / span 6; aspect-ratio: 4 / 5; }
.cs-pair > :last-child { grid-column: 8 / span 5; aspect-ratio: 1 / 1; margin-top: clamp(4rem, 14vw, 14rem); }
.cs-pair.is-single > :first-child { grid-column: 1 / -1; aspect-ratio: 16 / 9; margin-top: 0; }
.cs-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.cs-stats > div + div { border-left: 1px solid hsl(0 0% 13% / 0.12); }
.cs-next { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: 70vh; color: ${OFFWHITE}; text-decoration: none; }
.cs-next img { transition: transform 1.4s cubic-bezier(.16,1,.3,1); }
.cs-next:hover img { transform: scale(1.04); }
.cs-back { color: hsl(36 21% 95% / 0.7); text-decoration: none; transition: color .2s ease; }
.cs-back:hover { color: ${ROSA}; }
@media (max-width: 860px) {
  .cs-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cs-cover { aspect-ratio: 4 / 3 !important; }
  .cs-chapter > .cs-label, .cs-chapter > .cs-body { grid-column: 1 / -1; }
  .cs-chapter > .cs-label { position: static; margin-bottom: 1.25rem; }
  .cs-pair > :first-child, .cs-pair > :last-child { grid-column: 1 / -1; margin-top: 0; }
  .cs-pair > :last-child { margin-top: 1rem; }
  .cs-stats { grid-template-columns: 1fr; }
  .cs-stats > div + div { border-left: 0; border-top: 1px solid hsl(0 0% 13% / 0.12); }
  .cs-next { grid-template-columns: 1fr; }
  .cs-next > :first-child { min-height: 42vh; }
}
`;

const Photo: React.FC<{ src: string; natural?: boolean; style?: React.CSSProperties; className?: string }> = ({ src, natural = false, style, className }) => (
  <div className={className} style={{ position: 'relative', overflow: 'hidden', background: 'hsl(36 14% 88%)', ...(natural ? { aspectRatio: 'auto' } : {}), ...style }}>
    <img src={src} alt="" loading="lazy" style={{ display: 'block', position: natural ? 'relative' : 'absolute', inset: 0, width: '100%', height: natural ? 'auto' : '100%', objectFit: 'cover' }} />
  </div>
);

const Chapter: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="cs-chapter">
    <h2 className="cs-label" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)', lineHeight: 1, textTransform: 'uppercase', color: GREEN, margin: 0 }}>
      {title}
    </h2>
    <div className="cs-body">{children}</div>
  </section>
);

const bodyText: React.CSSProperties = { fontFamily: FONT_BODY, fontSize: 'clamp(1rem, 1.15vw, 1.1rem)', lineHeight: 1.8, color: 'hsl(0 0% 13% / 0.82)', maxWidth: '62ch', margin: 0 };

/** "Café & Retail · DE" → "Café & Retail, DE" */
const industryText = (industry: string) => industry.split('·').map((s) => s.trim()).join(', ');

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const reduce = useReducedMotion();
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const study = caseStudies[index];

  if (!study) {
    return (
      <div style={{ minHeight: '100vh', background: GREEN, display: 'grid', placeItems: 'center', color: OFFWHITE, fontFamily: FONT_BODY }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>{caseStudyLabels.notFound.message}</p>
          <Link to="/work" style={{ color: ROSA }}>{caseStudyLabels.notFound.backLabel}</Link>
        </div>
      </div>
    );
  }

  const next = caseStudies[(index + 1) % caseStudies.length];
  // Editors can provide fewer than the bundled pair; never render an empty src.
  const visuals = (Array.isArray(study.visuals) ? study.visuals : [])
    .filter((photo) => typeof photo === 'string' && photo.trim() !== '')
    .slice(0, 2);
  // Studio Displays ends with the results; older CMS content may still
  // contain its removed gallery photo.
  const widePhoto = study.slug === 'studio-displays' ? undefined : study.gallery[0] ?? visuals[0];
  const facts: { label: string; value: string; href?: string }[] = [
    { label: caseStudyLabels.meta.client, value: study.client },
    { label: caseStudyLabels.meta.industry, value: industryText(study.industry) },
    { label: caseStudyLabels.meta.services, value: study.services.split('+').map((s) => s.trim()).join(', ') },
    ...(study.website ? [{ label: caseStudyLabels.meta.website, value: study.website, href: `https://${study.website}` }] : []),
  ];

  return (
    <div className="cs-root" style={{ minHeight: '100vh', background: OFFWHITE }}>
      <style>{css}</style>
      <TopNav />

      {/* COVER */}
      <header style={{ background: GREEN, color: OFFWHITE }}>
        <div className="container-wide" style={{ paddingTop: 'calc(88px + clamp(2.5rem, 6vh, 4.5rem))', paddingBottom: 'clamp(9rem, 22vh, 16rem)' }}>
          <Link to="/work" className="cs-back" style={{ fontFamily: FONT_BODY, fontSize: '0.9rem' }}>
            {caseStudyLabels.backLabel}
          </Link>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(3rem, 9.5vw, 9.5rem)', lineHeight: 1.12, textTransform: 'uppercase', color: ROSA, margin: 'clamp(2.5rem, 6vh, 4.5rem) 0 clamp(3rem, 7vh, 5rem)', maxWidth: '12ch' }}
          >
            {study.headline}
          </motion.h1>
          <dl className="cs-facts" style={{ margin: 0, borderTop: '1px solid hsl(36 21% 95% / 0.2)', paddingTop: '1.4rem' }}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt style={{ fontFamily: FONT_BODY, fontSize: '0.8rem', color: 'hsl(36 21% 95% / 0.55)', marginBottom: '0.35rem' }}>{f.label}</dt>
                <dd style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.45, margin: 0 }}>
                  {f.href
                    ? <a href={f.href} target="_blank" rel="noopener noreferrer" style={{ color: ROSA, textDecoration: 'none' }}>{f.value}</a>
                    : f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* COVER PHOTO — breaks out of the green band. */}
      <div className="container-wide" style={{ marginTop: 'clamp(-14rem, -18vh, -7rem)' }}>
        <motion.div
          initial={reduce ? false : { clipPath: 'inset(0% 6% 0% 6%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
        >
          <Photo src={img(study.heroImg)} className="cs-cover" style={{ aspectRatio: '21 / 10' }} />
        </motion.div>
      </div>

      {/* LEDE */}
      <div className="container-wide" style={{ paddingTop: 'clamp(5rem, 12vh, 9rem)', paddingBottom: 'clamp(5rem, 12vh, 9rem)' }}>
        <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 300, fontSize: 'clamp(1.6rem, 3.1vw, 2.9rem)', lineHeight: 1.22, color: INK, maxWidth: '32ch', margin: '0 auto' }}>
          {study.intro}
        </p>
      </div>

      {/* CHAPTERS */}
      <div className="container-wide" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5rem, 13vh, 9rem)', paddingBottom: 'clamp(5rem, 12vh, 9rem)' }}>
        <Chapter title={caseStudyLabels.sections.challenge}>
          <p style={bodyText}>{study.challenge}</p>
        </Chapter>

        {visuals.length > 0 && (
          <div className={`cs-pair${visuals.length === 1 ? ' is-single' : ''}`}>
            {visuals.map((photo, i) => <Photo key={i} src={img(photo)} natural={study.slug !== 'studio-displays'} />)}
          </div>
        )}

        <Chapter title={caseStudyLabels.sections.approach}>
          <p style={bodyText}>{study.approach}</p>
        </Chapter>

        {widePhoto && <Photo src={img(widePhoto)} natural={study.slug !== 'studio-displays'} style={study.slug === 'studio-displays' ? { aspectRatio: '16 / 7' } : undefined} />}

        <Chapter title={caseStudyLabels.sections.results}>
          <p style={bodyText}>{study.resultText}</p>
        </Chapter>

        {/* THE NUMBERS */}
        <div className="cs-stats" style={{ background: BEIGE }}>
          {study.stats.map((s) => (
            <div key={s.label} style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)', lineHeight: 1.12, color: GREEN, margin: '0 0 0.8rem' }}>{s.value}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: '0.95rem', lineHeight: 1.5, color: 'hsl(0 0% 13% / 0.7)', margin: 0, maxWidth: '26ch' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEXT CASE — the closing page. */}
      {next && next.slug !== study.slug && (
        <Link to={`/work/${next.slug}`} className="cs-next" style={{ background: GREEN }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={img(next.heroImg)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: 'clamp(2.5rem, 6vw, 6rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '3rem' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: '0.9rem', color: 'hsl(36 21% 95% / 0.6)', margin: 0 }}>{caseStudyLabels.others.eyebrow}</p>
            <div>
              <p style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '1rem', margin: '0 0 1rem' }}>{next.client}</p>
              <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.12, textTransform: 'uppercase', margin: 0 }}>{next.headline}</p>
            </div>
          </div>
        </Link>
      )}

      <YesCTA />
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
