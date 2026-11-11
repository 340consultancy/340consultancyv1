// Home page, assembled from the client review (Oct 2026): the original photo
// hero (without the services strip), the pink introduction band, the services
// list, who it's for, the founders, selected work, how we work, the social
// posts and the YES call to action. Light sections with a few green ones.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitHeading from '@/components/SplitHeading';
import YesCTA from '@/components/YesCTA';
import Testimonials from '@/components/Testimonials';
import { SocialPostsSection } from '@/components/BlogSection';
import { home, servicesPage, caseStudies, img } from '@/content';

const GREEN = 'hsl(89 71% 15%)';
const ROSA = 'hsl(354 100% 87%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const INK = 'hsl(0 0% 13%)';
const FONT_DISPLAY = "'Kelson Sans BG', sans-serif";
const FONT_SUB = "'Montserrat', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";

/** Light sections use green headings. */
const LIGHT_HEADING = { solidColor: GREEN, strokeColor: GREEN } as const;

/**
 * Each service row must open its own detail page. Older CMS entries still
 * point every row at the generic "/services#services-bento" anchor, so any
 * href that isn't a concrete /services/<slug> falls back to the row's slug.
 */
const SERVICE_ROW_SLUGS = ['strategy', 'management', 'coaching', 'content', 'workshops'];
const serviceRowHref = (href: string | undefined, index: number): string =>
  href && /^\/services\/[^/#?]+/.test(href)
    ? href
    : `/services/${SERVICE_ROW_SLUGS[index] ?? ''}`.replace(/\/$/, '');

const css = `
.hm-split { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(2rem, 6vw, 6rem); align-items: center; }
.hm-split.is-flipped { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
.hm-row { display: grid; grid-template-columns: 1.8rem minmax(0, 1fr) auto; align-items: center; gap: 1rem; padding: 1.05rem .25rem; border-top: 1px solid hsl(0 0% 13% / 0.12); color: ${INK}; text-decoration: none; transition: background-color .25s ease, padding .35s cubic-bezier(.16,1,.3,1); }
.hm-row:hover { background: hsl(36 18% 92%); padding-left: .9rem; }
.hm-row:hover .hm-arrow { transform: translateX(4px); color: ${GREEN}; }
.hm-arrow { transition: transform .3s ease, color .3s ease; color: hsl(0 0% 13% / 0.35); }
.hm-fit { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: clamp(2rem, 4vw, 4rem); }
.hm-cases { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1rem, 2.5vw, 2.5rem); }
.hm-case { color: ${INK}; text-decoration: none; }
.hm-case img { transition: transform 1.2s cubic-bezier(.16,1,.3,1); }
.hm-case:hover img { transform: scale(1.04); }
.hm-principles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 clamp(2rem, 5vw, 5rem); }
.hm-link { color: ${INK}; font-family: ${FONT_BODY}; font-weight: 600; font-size: .95rem; text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 1.5px; }
.hm-root a:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 3px; }
@media (max-width: 860px) {
  .hm-split, .hm-split.is-flipped, .hm-fit { grid-template-columns: 1fr; }
  .hm-split.is-flipped > :first-child { order: 2; }
  .hm-cases, .hm-principles { grid-template-columns: 1fr; }
}
`;

const Home: React.FC = () => {
  const reduce = useReducedMotion();
  const { hero, servicesPanel, foundersPanel, quickCheck, approachPanel } = home;

  return (
    <div className="hm-root" style={{ background: OFFWHITE }}>
      <style>{css}</style>

      {/* HERO — the original photo hero (kept as the home page's own header). */}
      <section id="hero-bg" className="relative w-full overflow-hidden" style={{ background: 'hsl(0 0% 5%)' }}>
        <img
          src={img(hero.image)}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 35%', opacity: 0.55 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, hsl(0 0% 5% / 0.45) 0%, hsl(0 0% 5% / 0.1) 40%, hsl(0 0% 5% / 0.6) 75%, hsl(0 0% 5%) 100%)' }}
        />
        <div
          className="relative z-10 text-center"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'calc(88px + clamp(4rem, 10vh, 8rem))', paddingBottom: 'clamp(3.5rem, 8vh, 6rem)', paddingLeft: '6vw', paddingRight: '6vw' }}
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            style={{ fontFamily: FONT_SUB, fontStyle: 'italic', fontSize: '0.95rem', letterSpacing: '0.05em', color: ROSA, marginBottom: 'clamp(2rem, 5vh, 3.5rem)' }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.3rem, 9vw, 6.5rem)', lineHeight: 1.12, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}
          >
            <span style={{ display: 'block', color: OFFWHITE }}>{hero.headline.line1}</span>
            <span style={{ display: 'block' }}>
              <span style={{ color: OFFWHITE }}>{hero.headline.line2Lead}</span>
              <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{hero.headline.accent}</span>
            </span>
          </motion.h1>
        </div>
      </section>

      {/* PINK BAND */}
      <section style={{ background: ROSA }}>
        <div className="container-wide" style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem 2rem' }}>
          <p style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', lineHeight: 1.4, color: GREEN, margin: 0, maxWidth: '60ch' }}>
            {servicesPage.hero.defaultReco}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.6rem' }}>
            <Link to="/services" style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.95rem', color: GREEN, textDecoration: 'underline', textUnderlineOffset: 5, textDecorationThickness: 1.5 }}>
              {servicesPage.hero.question}
            </Link>
            <Link to="/contact" style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.95rem', color: GREEN, textDecoration: 'underline', textUnderlineOffset: 5, textDecorationThickness: 1.5 }}>
              {servicesPage.grid.helpCard.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* OUR SERVICES — smaller image left, list right. */}
      <section className="container-wide hm-split" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
        <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', background: 'hsl(36 18% 92%)' }}>
          <img src={img(servicesPanel.image)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: servicesPanel.imagePosition }} />
        </div>
        <div>
          <p className="text-micro mb-6 tracking-[0.3em]" style={{ color: GREEN }}>{servicesPanel.eyebrow}</p>
          <SplitHeading line1={servicesPanel.headline.line1} line2={servicesPanel.headline.line2} size="clamp(2.5rem, 6vw, 5rem)" className="mb-10" {...LIGHT_HEADING} />
          <div style={{ borderBottom: '1px solid hsl(0 0% 13% / 0.12)' }}>
            {servicesPanel.rows.map((s, i) => (
              <Link key={s.num} to={serviceRowHref(s.href, i)} className="hm-row">
                <span style={{ fontFamily: FONT_BODY, fontSize: '0.75rem', color: 'hsl(0 0% 13% / 0.4)' }}>{s.num}</span>
                <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.3rem 1rem' }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '0.03em' }}>{s.name}</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: '0.8rem', color: 'hsl(0 0% 13% / 0.5)' }}>{s.tag}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: '0.85rem', color: GREEN, whiteSpace: 'nowrap' }}>{s.price}</span>
                  <ArrowRight className="hm-arrow" size={16} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link to={servicesPanel.cta.href} className="hm-link">{servicesPanel.cta.label}</Link>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR — green. */}
      <section style={{ background: GREEN, color: OFFWHITE }}>
        <div className="container-wide hm-fit" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)', lineHeight: 1.12, textTransform: 'uppercase', color: ROSA, margin: 0 }}>
            {quickCheck.headline.line1} {quickCheck.headline.line2}
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {quickCheck.items.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '1rem', padding: '1.1rem 0', borderTop: '1px solid hsl(36 21% 95% / 0.16)', fontFamily: FONT_BODY, fontSize: 'clamp(.88rem, 1.02vw, .98rem)', lineHeight: 1.55 }}>
                <Check size={20} strokeWidth={2.4} aria-hidden style={{ color: ROSA, flexShrink: 0, marginTop: 3 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOUNDERS — text left, smaller image right. */}
      <section className="container-wide hm-split is-flipped" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
        <div>
          <p className="text-micro mb-4 tracking-[0.3em]" style={{ color: GREEN }}>{foundersPanel.eyebrow}</p>
          <SplitHeading line1={foundersPanel.headline.line1} line2={foundersPanel.headline.line2} size="clamp(2.5rem, 6vw, 5rem)" className="mb-8" solidColor={ROSA} strokeColor={ROSA} />
          <p style={{ fontFamily: FONT_SUB, fontStyle: 'italic', fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', lineHeight: 1.5, color: GREEN, maxWidth: '40ch', margin: '0 0 1.4rem' }}>{foundersPanel.lede}</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: '1rem', lineHeight: 1.8, color: 'hsl(0 0% 13% / 0.75)', maxWidth: '56ch', margin: 0 }}>{foundersPanel.body}</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: '0.8rem', color: 'hsl(0 0% 13% / 0.5)', margin: '1.4rem 0 2rem' }}>{foundersPanel.note}</p>
          <Link to={foundersPanel.cta.href} className="hm-link">{foundersPanel.cta.label}</Link>
        </div>
        <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', background: 'hsl(36 18% 92%)' }}>
          <img src={img(foundersPanel.image)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: foundersPanel.imagePosition, filter: 'grayscale(1)' }} />
        </div>
      </section>

      {/* SELECTED WORK */}
      <section style={{ borderTop: '1px solid hsl(0 0% 13% / 0.1)' }}>
        <div className="container-wide" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.2rem, 4.4vw, 4rem)', lineHeight: 1.12, textTransform: 'uppercase', color: INK, margin: 0 }}>Selected work</h2>
            <Link to="/work" className="hm-link">See all work</Link>
          </div>
          <div className="hm-cases">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} to={`/work/${cs.slug}`} className="hm-case">
                <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', background: 'hsl(36 14% 88%)', marginBottom: '1.2rem' }}>
                  <img src={img(cs.cardImg)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  {cs.stats[0] && (
                    <span style={{ position: 'absolute', left: 14, bottom: 14, padding: '7px 13px', borderRadius: 999, background: GREEN, color: ROSA, fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600 }}>
                      {cs.stats[0].value} {cs.stats[0].label}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.95rem', margin: '0 0 0.5rem' }}>{cs.client}</p>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.6rem, 2.3vw, 2.2rem)', lineHeight: 1.12, textTransform: 'uppercase', color: GREEN, margin: 0 }}>{cs.headline}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK — green. */}
      <section style={{ background: GREEN, color: OFFWHITE }}>
        <div className="container-wide" style={{ paddingTop: 'clamp(5rem, 12vh, 8rem)', paddingBottom: 'clamp(5rem, 12vh, 8rem)' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', lineHeight: 1.12, textTransform: 'uppercase', color: ROSA, margin: '0 0 clamp(2.5rem, 6vh, 4rem)' }}>
            {approachPanel.headline.line1} {approachPanel.headline.line2.replace(/\.$/, '')}
          </h2>
          <div className="hm-principles">
            {approachPanel.cards.map((c) => (
              <div key={c.title} style={{ padding: '1.6rem 0', borderTop: '1px solid hsl(36 21% 95% / 0.16)' }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', textTransform: 'uppercase', margin: '0 0 0.7rem' }}>{c.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: '0.98rem', lineHeight: 1.65, color: 'hsl(36 21% 95% / 0.8)', margin: 0, maxWidth: '46ch' }}>{c.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(3rem, 7vh, 4.5rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '1rem clamp(1.5rem, 4vw, 3.5rem)' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: '0.95rem', color: 'hsl(36 21% 95% / 0.75)', margin: 0 }}>We work in four languages</p>
            {approachPanel.languages.items.map((l) => (
              <span key={l.code} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: 1, color: ROSA }}>{l.code}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: '0.85rem', color: 'hsl(36 21% 95% / 0.75)' }}>{l.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <Testimonials tone="light" />

      {/* SOCIAL POSTS */}
      <SocialPostsSection tone="light" />

      <YesCTA />
    </div>
  );
};

export default Home;
