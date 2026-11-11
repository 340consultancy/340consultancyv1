// /services — "Pick your game plan". The visitor says where they stand; the
// matching services rise to the front of the grid and the pink band explains
// why. All copy comes from servicesPage (CMS single type "Page: Services");
// the cards come from the `services` collection.

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, LayoutGroup, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import Testimonials from '@/components/Testimonials';
import { services, servicesPage, img, type Service } from '@/content';

const ROSA = 'hsl(354 100% 87%)';
const GREEN = 'hsl(89 71% 15%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const INK = 'hsl(0 0% 13%)';
const FONT = {
  display: "'Kelson Sans BG', sans-serif",
  sub: "'Montserrat', sans-serif",
  body: "'Poppins', sans-serif",
};

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';
const cardSpring = { type: 'spring', stiffness: 260, damping: 32 } as const;

type CardState = 'neutral' | 'match' | 'dim';

// ── Service card ────────────────────────────────────────────────────────────

const ServiceCard: React.FC<{ service: Service; state: CardState; animate: boolean }> = ({ service, state, animate }) => {
  const match = state === 'match';
  return (
    <motion.article
      layout={animate ? 'position' : false}
      transition={cardSpring}
      style={{
        background: match ? ROSA : 'hsl(36 18% 92%)',
        opacity: state === 'dim' ? 0.38 : 1,
        filter: state === 'dim' ? 'grayscale(0.9)' : 'none',
        transition: 'opacity 0.35s ease, filter 0.35s ease, background 0.35s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative' }}>
        <img
          src={img(service.img)}
          alt=""
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%' }}
        />
        {match && (
          <span
            style={{
              position: 'absolute', top: 14, left: 14, padding: '6px 12px', borderRadius: 999,
              background: GREEN, color: ROSA, fontFamily: FONT.body, fontSize: 12, fontWeight: 600,
            }}
          >
            {servicesPage.grid.matchBadge}
          </span>
        )}
      </div>

      <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
        <h3
          style={{
            fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
            lineHeight: 1.12, whiteSpace: 'pre-line', color: match ? GREEN : INK, margin: 0,
          }}
        >
          {service.label}
        </h3>
        <p style={{ fontFamily: FONT.body, fontSize: '0.92rem', lineHeight: 1.6, color: 'hsl(0 0% 13% / 0.72)', margin: 0, maxWidth: '42ch' }}>
          {service.tagline}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.45rem' }}>
          {(service.includes ?? []).slice(0, 3).map((item) => (
            <li key={item} style={{ display: 'flex', gap: '0.6rem', fontFamily: FONT.body, fontSize: '0.85rem', lineHeight: 1.45, color: INK }}>
              <Check size={16} strokeWidth={2.5} style={{ color: GREEN, flexShrink: 0, marginTop: 2 }} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <Link
          to={`/services/${service.key}`}
          className={focusRing}
          style={{
            marginTop: 'auto', alignSelf: 'flex-start', paddingTop: '0.5rem',
            fontFamily: FONT.body, fontSize: '0.88rem', fontWeight: 600, color: GREEN,
            textDecoration: 'underline', textUnderlineOffset: 5, textDecorationThickness: 1.5, outlineColor: GREEN,
          }}
        >
          {servicesPage.grid.cardCtaLabel}
        </Link>
      </div>
    </motion.article>
  );
};

// ── Help card — last cell of the grid, never dimmed ─────────────────────────

const HelpCard: React.FC<{ animate: boolean }> = ({ animate }) => {
  const { heading, text, ctaLabel } = servicesPage.grid.helpCard;
  return (
    <motion.article
      layout={animate ? 'position' : false}
      transition={cardSpring}
      style={{
        background: GREEN, color: OFFWHITE, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: '2rem', padding: 'clamp(1.75rem, 3vw, 2.5rem)', minHeight: 'clamp(18rem, 30vw, 24rem)',
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', lineHeight: 1.12,
            textTransform: 'uppercase', whiteSpace: 'pre-line', color: ROSA, margin: '0 0 1.1rem',
          }}
        >
          {heading}
        </h3>
        <p style={{ fontFamily: FONT.body, fontSize: '0.98rem', lineHeight: 1.6, color: 'hsl(36 21% 95% / 0.85)', margin: 0, maxWidth: '30ch' }}>
          {text}
        </p>
      </div>
      {/* Pink border kept on hover: the hover fill is the card's own green. */}
      <Link to="/contact" className={`btn-primary self-start ${focusRing}`} style={{ borderColor: ROSA, outlineColor: ROSA }}>
        {ctaLabel}
      </Link>
    </motion.article>
  );
};

// ── Page ────────────────────────────────────────────────────────────────────

const ServicesPackages: React.FC = () => {
  const { hero, process } = servicesPage;
  const [selected, setSelected] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const situation = selected === null ? null : hero.situations[selected] ?? null;

  // Matching services move to the front of the grid, in the order the situation lists them.
  const ordered = useMemo(() => {
    if (!situation) return services;
    const keys = situation.services;
    const rank = (s: Service) => {
      const i = keys.indexOf(s.key);
      return i === -1 ? keys.length + services.indexOf(s) : i;
    };
    return [...services].sort((a, b) => rank(a) - rank(b));
  }, [situation]);

  const stateOf = (key: string): CardState => (!situation ? 'neutral' : situation.services.includes(key) ? 'match' : 'dim');

  const chip = (active: boolean): React.CSSProperties => ({
    fontFamily: FONT.body,
    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
    fontWeight: 500,
    textAlign: 'left',
    padding: '0.95rem 1.4rem',
    borderRadius: 999,
    border: `1.5px solid ${active ? ROSA : 'hsl(354 100% 87% / 0.45)'}`,
    background: active ? ROSA : 'transparent',
    color: active ? GREEN : OFFWHITE,
    cursor: 'pointer',
    transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
    outlineColor: ROSA,
  });

  return (
    <div className="min-h-screen" style={{ background: OFFWHITE }}>
      <TopNav />

      {/* ===== HERO = THE SELECTOR ===== */}
      <section style={{ background: GREEN, color: OFFWHITE, paddingTop: 'clamp(9rem, 16vw, 12rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h1
            style={{
              fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(3.2rem, 9vw, 8.5rem)', lineHeight: 1.12,
              textTransform: 'uppercase', whiteSpace: 'pre-line', color: ROSA, margin: 0,
            }}
          >
            {hero.heading}
          </h1>

          <div>
            <h2 id="situation-q" style={{ fontFamily: FONT.sub, fontWeight: 600, fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)', color: OFFWHITE, margin: '0 0 1.25rem' }}>
              {hero.question}
            </h2>
            <div role="group" aria-labelledby="situation-q" className="flex flex-wrap gap-2.5">
              {hero.situations.map((s, i) => {
                const active = selected === i;
                return (
                  <button
                    key={s.label}
                    type="button"
                    aria-pressed={active}
                    aria-controls="services-grid"
                    onClick={() => setSelected(active ? null : i)}
                    className={`${focusRing} hover:border-[hsl(354_100%_87%)]`}
                    style={chip(active)}
                  >
                    {s.label}
                  </button>
                );
              })}
              <button
                type="button"
                aria-pressed={selected === null}
                aria-controls="services-grid"
                onClick={() => setSelected(null)}
                className={focusRing}
                style={{
                  ...chip(false),
                  border: '1.5px solid transparent',
                  textDecoration: 'underline',
                  textUnderlineOffset: 5,
                  color: selected === null ? 'hsl(36 21% 95% / 0.45)' : OFFWHITE,
                }}
              >
                {hero.showAllLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECOMMENDATION BAND ===== */}
      <section style={{ background: ROSA }}>
        <div className="container-wide" style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem' }}>
          <p
            aria-live="polite"
            style={{ fontFamily: FONT.sub, fontWeight: 600, fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', lineHeight: 1.4, color: GREEN, margin: 0, maxWidth: '60ch' }}
          >
            {situation ? situation.reco : hero.defaultReco}
          </p>
        </div>
      </section>

      {/* ===== SERVICE GRID ===== */}
      <section className="section-padding">
        <div className="container-wide">
          <LayoutGroup>
            <div id="services-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ordered.map((s) => (
                <ServiceCard key={s.key} service={s} state={stateOf(s.key)} animate={!reduceMotion} />
              ))}
              <HelpCard animate={!reduceMotion} />
            </div>
          </LayoutGroup>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="services-process-heading">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <p className="text-micro mb-6" style={{ color: GREEN }}>{process.eyebrow}</p>
            <h2 id="services-process-heading" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', lineHeight: 1.12, color: GREEN, margin: 0 }}>
              {process.headline.lead}{process.headline.accent}
            </h2>
            <p style={{ fontFamily: FONT.body, fontSize: '1rem', lineHeight: 1.65, color: 'hsl(0 0% 13% / 0.7)', margin: '1.25rem 0 2.5rem' }}>{process.sub}</p>
            <ol className="m-0 list-none p-0">
              {process.steps.map((step, i) => (
                <li key={step.phase} className="relative flex gap-5" style={{ paddingBottom: i < process.steps.length - 1 ? '2rem' : 0 }}>
                  {i < process.steps.length - 1 && (
                    <span aria-hidden className="absolute" style={{ top: 40, bottom: 0, left: 19, width: 1.5, background: 'hsl(89 71% 15% / 0.25)' }} />
                  )}
                  <span aria-hidden style={{ width: 40, height: 40, borderRadius: '50%', background: GREEN, color: ROSA, flexShrink: 0, display: 'grid', placeItems: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: '1.15rem' }}>{step.phase}</span>
                  <div style={{ paddingTop: '0.45rem' }}>
                    <h3 style={{ fontFamily: FONT.display, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', lineHeight: 1.12, color: INK, margin: '0 0 0.5rem' }}>{step.title}</h3>
                    <p style={{ fontFamily: FONT.body, fontSize: '0.98rem', lineHeight: 1.65, color: 'hsl(0 0% 13% / 0.7)', margin: 0, maxWidth: '52ch' }}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Testimonials tone="light" />
      <YesCTA />
      <Footer />
    </div>
  );
};

export default ServicesPackages;
