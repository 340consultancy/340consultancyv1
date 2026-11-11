// /work — green header, results, industries, case studies, pink client ticker
// and green testimonials.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import GreenHeader from '@/components/GreenHeader';
import Testimonials from '@/components/Testimonials';
import { Marquee } from '@/components/ui/marquee';
import { work, caseStudies, showcase, img } from '@/content';

const GREEN = 'hsl(89 71% 15%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const BEIGE = 'hsl(36 18% 92%)';
const INK = 'hsl(0 0% 13%)';
const ROSA = 'hsl(354 100% 87%)';
const FONT_DISPLAY = "'Kelson Sans BG', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";
const EASE = [0.16, 1, 0.3, 1] as const;

const css = `
.wr-toc a { display: grid; grid-template-columns: 2.2rem 1fr; align-items: baseline; padding: 0.9rem 0; border-top: 1px solid hsl(36 21% 95% / 0.18); color: hsl(36 21% 95% / 0.85); text-decoration: none; transition: color .25s ease; }
.wr-toc a:last-child { border-bottom: 1px solid hsl(36 21% 95% / 0.18); }
.wr-toc a:hover, .wr-toc a:focus-visible { color: ${ROSA}; }
.wr-spread { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: clamp(1rem, 2.5vw, 2.5rem); align-items: center; }
.wr-spread .wr-img { grid-column: 1 / span 5; }
.wr-spread .wr-text { grid-column: 9 / span 4; }
.wr-spread.is-flipped .wr-img { grid-column: 8 / span 5; grid-row: 1; }
.wr-spread.is-flipped .wr-text { grid-column: 1 / span 4; grid-row: 1; }
.wr-img-frame { position: relative; overflow: hidden; aspect-ratio: 4 / 5; background: hsl(36 14% 88%); }
.wr-img-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(.16,1,.3,1); }
.wr-spread a:hover .wr-img-frame img { transform: scale(1.035); }
.wr-read { display: inline-block; position: relative; padding-bottom: 6px; color: ${INK}; text-decoration: none; }
.wr-read::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform-origin: left; transition: transform .45s cubic-bezier(.16,1,.3,1), background-color .3s ease; }
.wr-read:hover::after, .wr-read:focus-visible::after { background: ${GREEN}; transform: scaleX(0.4); }
.wr-industries { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid hsl(0 0% 13% / 0.14); border-left: 1px solid hsl(0 0% 13% / 0.14); }
.wr-industry { position: relative; overflow: hidden; min-height: clamp(9rem, 18vw, 13rem); display: flex; align-items: center; justify-content: center; text-align: center; padding: 1.5rem; border-right: 1px solid hsl(0 0% 13% / 0.14); border-bottom: 1px solid hsl(0 0% 13% / 0.14); outline: none; }
.wr-industry img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.06); transition: opacity .5s ease, transform 1.2s cubic-bezier(.16,1,.3,1); }
.wr-industry::after { content: ''; position: absolute; inset: 0; background: hsl(89 71% 15% / 0.55); opacity: 0; transition: opacity .5s ease; }
.wr-industry span { position: relative; z-index: 1; color: ${INK}; transition: color .35s ease; }
.wr-industry:hover img, .wr-industry:focus-visible img { opacity: 1; transform: scale(1); }
.wr-industry:hover::after, .wr-industry:focus-visible::after { opacity: 1; }
.wr-industry:hover span, .wr-industry:focus-visible span { color: ${OFFWHITE}; }
.wr-root a:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 4px; }
@media (max-width: 860px) {
  .wr-spread .wr-img, .wr-spread .wr-text, .wr-spread.is-flipped .wr-img, .wr-spread.is-flipped .wr-text { grid-column: 1 / -1; grid-row: auto; }
  .wr-spread .wr-img { width: 85%; max-width: 28rem; justify-self: center; }
  .wr-spread .wr-text { margin-top: 1.75rem; }
  .wr-industries { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`;

/** "Café & Retail · DE" → "Café & Retail, DE" */
const industryText = (industry: string) => industry.split('·').map((s) => s.trim()).join(', ');

const WorkResults: React.FC = () => {
  const reduce = useReducedMotion();
  const industry = showcase.industry;

  return (
    <div className="wr-root" style={{ minHeight: '100vh', background: OFFWHITE }}>
      <style>{css}</style>
      <TopNav />

      {/* HEADER — green, pink title, contents. */}
      <GreenHeader lead={work.hero.headline.lead} accent={work.hero.headline.accent} intro={work.hero.subtitle}>
        <nav aria-label="Case studies" className="wr-toc" style={{ display: 'flex', flexDirection: 'column' }}>
          {caseStudies.map((cs, i) => (
            <a key={cs.slug} href={`#${cs.slug}`}>
              <span style={{ fontFamily: FONT_BODY, fontSize: '0.8rem', opacity: 0.6 }}>{i + 1}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.1rem, 1.6vw, 1.45rem)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{cs.client}</span>
            </a>
          ))}
        </nav>
      </GreenHeader>

      {/* RESULTS TICKER — from the original page. */}
      <section aria-label="Results" style={{ background: BEIGE, padding: 'clamp(1.6rem, 3vh, 2.2rem) 0', borderBottom: '1px solid hsl(0 0% 13% / 0.08)' }}>
        <Marquee pauseOnHover repeat={3} className="[--duration:34s] [--gap:0px]">
          {work.stats.map((s) => (
            <div key={s.value + s.label} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10, flexShrink: 0, margin: '0 clamp(1.6rem, 3vw, 3rem)' }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.02em', color: GREEN, lineHeight: 1.3, whiteSpace: 'nowrap' }}>{s.value}</span>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(0 0% 13% / 0.55)', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* INDUSTRIES — 8 fields in 2 rows; hovering shows a photo. */}
      <section className="container-wide" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
        <p className="text-micro mb-4 tracking-[0.3em]" style={{ color: GREEN }}>{industry.text.eyebrow}</p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 1.12, textTransform: 'uppercase', margin: '0 0 1.2rem' }}>
          <span style={{ color: GREEN }}>{industry.text.titleLead} </span>
          <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${GREEN}` }}>{industry.text.titleAccent}</span>
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: '1rem', lineHeight: 1.65, color: 'hsl(0 0% 13% / 0.7)', maxWidth: '44ch', margin: '0 0 clamp(2.5rem, 6vh, 3.5rem)' }}>{industry.text.sub}</p>
        <div className="wr-industries">
          {industry.items.slice(0, 8).map((it) => (
            <div key={it.label} className="wr-industry" tabIndex={0}>
              <img src={img(it.img)} alt="" loading="lazy" />
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.15rem, 1.8vw, 1.6rem)', lineHeight: 1.05, textTransform: 'uppercase' }}>{it.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPREADS — one per case, alternating sides. */}
      <main className="container-wide" style={{ paddingTop: 'clamp(5rem, 12vh, 9rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(6rem, 16vh, 12rem)' }}>
        {caseStudies.map((cs, i) => {
          const lead = cs.stats[0];
          const to = `/work/${cs.slug}`;
          return (
            <article key={cs.slug} id={cs.slug} className={`wr-spread${i % 2 ? ' is-flipped' : ''}`} style={{ scrollMarginTop: 120 }}>
              <Link to={to} className="wr-img" aria-label={`${cs.client}: ${work.cases.viewLabel}`} tabIndex={-1}>
                <motion.div
                  className="wr-img-frame"
                  initial={reduce ? false : { clipPath: 'inset(18% 0% 0% 0%)' }}
                  whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: '-12% 0px' }}
                  transition={{ duration: 1.3, ease: EASE }}
                >
                  <img src={img(cs.cardImg)} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
                </motion.div>
              </Link>

              <div className="wr-text">
                <p style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.95rem', color: INK, margin: 0 }}>{cs.client}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: '0.85rem', color: 'hsl(0 0% 13% / 0.55)', margin: '0.2rem 0 1.6rem' }}>
                  {industryText(cs.industry)}
                </p>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.2rem, 4.2vw, 4rem)', lineHeight: 1.12, textTransform: 'uppercase', color: GREEN, margin: '0 0 1.6rem' }}>
                  {cs.headline}
                </h2>
                <p style={{ fontFamily: FONT_BODY, fontSize: '1rem', lineHeight: 1.7, color: 'hsl(0 0% 13% / 0.78)', maxWidth: '44ch', margin: '0 0 2.2rem' }}>
                  {cs.intro}
                </p>
                {lead && (
                  <div style={{ borderTop: '1px solid hsl(0 0% 13% / 0.15)', paddingTop: '1.2rem', marginBottom: '2.2rem', display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2rem, 3vw, 2.8rem)', lineHeight: 1, color: INK }}>{lead.value}</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: '0.9rem', color: 'hsl(0 0% 13% / 0.62)' }}>{lead.label}</span>
                  </div>
                )}
                <Link to={to} className="wr-read" style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.95rem' }}>
                  {work.cases.viewLabel}
                </Link>
              </div>
            </article>
          );
        })}
      </main>

      {/* CLIENT TICKER — pink band with white client cards. */}
      <section aria-label={work.clientsHeading} style={{ background: ROSA, padding: 'clamp(2rem, 4vh, 2.8rem) 0' }}>
        <Marquee pauseOnHover repeat={3} className="[--duration:38s] [--gap:0px]">
          {work.clients.map((c) => (
            <React.Fragment key={c.name}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '9px 22px 9px 10px', border: '1px solid hsl(0 0% 13% / 0.12)', borderRadius: 999, background: '#fff', flexShrink: 0 }}>
                <span style={{ width: 34, height: 34, borderRadius: 8, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em', color: 'hsl(36 21% 95% / 0.85)', flexShrink: 0 }}>
                  {c.initials}
                </span>
                <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(0.8rem, 1.1vw, 1rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: INK, whiteSpace: 'nowrap' }}>
                  {c.name}
                </span>
              </div>
              <img src={img('logo-340')} alt="" aria-hidden style={{ height: 16, width: 'auto', opacity: 0.18, margin: '0 clamp(1rem, 2.5vw, 2rem)', alignSelf: 'center', flexShrink: 0 }} />
            </React.Fragment>
          ))}
        </Marquee>
      </section>

      {/* TESTIMONIALS — green with light quotes and pink names. */}
      <Testimonials showCta={false} />

      <YesCTA />
      <Footer />
    </div>
  );
};

export default WorkResults;
