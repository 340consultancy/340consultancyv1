// /services/:slug — a service as a product sheet: compact light hero, a long
// reading column on the left and a sticky green booking card on the right
// (a sticky CTA bar on mobile). Same visual language as the /services page.
// Copy comes from the `services` collection, serviceDetailLabels, the add-on
// groups and servicesPage.process ("How it works").

import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import {
  services,
  servicesPage,
  strategyAddOns,
  managementAddOns,
  serviceDetailLabels,
  img,
  type AddOnsContent,
  type Service,
} from '@/content';

const ROSA = 'hsl(354 100% 87%)';
const GREEN = 'hsl(89 71% 15%)';
const OFFWHITE = 'hsl(36 21% 95%)';
const INK = 'hsl(0 0% 13%)';
const FONT_DISPLAY = "'Kelson Sans BG', sans-serif";
const FONT_SUB = "'Montserrat', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";

const SAND = 'hsl(36 18% 90%)';
const NAV_H = 88; // TopNav height — its links are light, so the page starts under a dark band.
const STICKY_TOP = NAV_H + 24;

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';

const oneLine = (s: string) => s.replace(/\n/g, ' ');
/** "MIN. TERM" → "Min. term" */
const sentenceCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const ADD_ONS: Record<string, AddOnsContent> = { strategy: strategyAddOns, management: managementAddOns };

const h2Style: React.CSSProperties = {
  fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.12,
  textTransform: 'uppercase', color: INK, margin: 0,
};

// ── Booking card (desktop, sticky) ──────────────────────────────────────────

const BookingCard: React.FC<{ service: Service }> = ({ service }) => {
  const details = service.facts.filter((f) => f.label !== 'PRICING');
  return (
    <aside
      aria-label="Book this service"
      style={{ position: 'sticky', top: STICKY_TOP, background: GREEN, color: OFFWHITE, padding: 'clamp(1.75rem, 2.4vw, 2.25rem)' }}
    >
      <p style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: '0.85rem', color: ROSA, margin: 0 }}>
        {sentenceCase(serviceDetailLabels.pricingLabel)}
      </p>
      <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(2.4rem, 3.4vw, 3.2rem)', lineHeight: 1.12, textTransform: 'uppercase', margin: '0.5rem 0 0' }}>
        {service.price}
      </p>
      {service.priceNote && (
        <p style={{ fontFamily: FONT_BODY, fontSize: '0.85rem', color: 'hsl(36 21% 95% / 0.65)', margin: '0.5rem 0 0' }}>
          {service.priceNote}
        </p>
      )}

      <dl style={{ margin: '1.75rem 0', borderTop: '1px solid hsl(36 21% 95% / 0.18)' }}>
        {details.map((f) => (
          <div key={f.label} className="flex items-baseline justify-between gap-4" style={{ padding: '0.85rem 0', borderBottom: '1px solid hsl(36 21% 95% / 0.18)' }}>
            <dt style={{ fontFamily: FONT_BODY, fontSize: '0.85rem', color: 'hsl(36 21% 95% / 0.65)' }}>{sentenceCase(f.label)}</dt>
            <dd style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.92rem', margin: 0, textAlign: 'right' }}>{f.value}</dd>
          </div>
        ))}
      </dl>

      <Link to="/contact" className={`btn-primary w-full ${focusRing}`} style={{ outlineColor: ROSA }}>
        {service.ctaLabel ?? serviceDetailLabels.defaultCtaLabel}
      </Link>
      <Link
        to="/services"
        className={focusRing}
        style={{ display: 'block', textAlign: 'center', marginTop: '1.1rem', fontFamily: FONT_BODY, fontSize: '0.85rem', color: 'hsl(36 21% 95% / 0.75)', textDecoration: 'underline', textUnderlineOffset: 4, outlineColor: ROSA }}
      >
        {serviceDetailLabels.allServicesLabel}
      </Link>
    </aside>
  );
};

// ── Booking bar (mobile, sticky at the bottom of the viewport) ──────────────

const BookingBar: React.FC<{ service: Service }> = ({ service }) => (
  <div
    className="flex items-center justify-between gap-3 lg:hidden"
    style={{
      position: 'sticky', bottom: 12, zIndex: 20, marginTop: '2.5rem',
      background: GREEN, color: OFFWHITE, padding: '0.75rem 0.75rem 0.75rem 1.1rem',
      boxShadow: '0 10px 30px -10px hsl(0 0% 0% / 0.45)',
    }}
  >
    <div style={{ minWidth: 0 }}>
      <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.25rem', lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>{service.price}</p>
      {service.priceNote && (
        <p style={{ fontFamily: FONT_BODY, fontSize: '0.72rem', color: 'hsl(36 21% 95% / 0.65)', margin: '0.2rem 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {service.priceNote}
        </p>
      )}
    </div>
    <Link
      to="/contact"
      className={`btn-primary ${focusRing}`}
      style={{ padding: '0.85rem 1.1rem', fontSize: '0.62rem', letterSpacing: '0.16em', flexShrink: 0, outlineColor: ROSA }}
    >
      {service.ctaLabel ?? serviceDetailLabels.defaultCtaLabel}
    </Link>
  </div>
);

// ── Page ────────────────────────────────────────────────────────────────────

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();
  const service = services.find((s) => s.key === slug);

  if (!service) return <Navigate to="/services" replace />;

  const others = services.filter((s) => s.key !== service.key);
  const addOns = ADD_ONS[service.key];
  const { process } = servicesPage;
  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <div className="min-h-screen" style={{ background: OFFWHITE }}>
      <TopNav />
      <div aria-hidden style={{ height: NAV_H, background: INK }} />

      {/* ===== HERO — compact, light ===== */}
      <header style={{ paddingTop: 'clamp(2rem, 4vw, 3.5rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2" style={{ listStyle: 'none', margin: 0, padding: 0, fontFamily: FONT_BODY, fontSize: '0.85rem', color: 'hsl(0 0% 13% / 0.6)' }}>
                <li>
                  <Link to="/services" className={focusRing} style={{ color: GREEN, textDecoration: 'underline', textUnderlineOffset: 4, outlineColor: GREEN }}>
                    {serviceDetailLabels.breadcrumbLabel}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{oneLine(service.label).toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())}</li>
              </ol>
            </nav>

            <motion.h1
              {...enter(0.06)}
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 1.12, textTransform: 'uppercase', whiteSpace: 'pre-line', color: INK, margin: 'clamp(2rem, 4vw, 3rem) 0 0' }}
            >
              {service.label}
            </motion.h1>
            <motion.p
              {...enter(0.14)}
              style={{ fontFamily: FONT_SUB, fontWeight: 500, fontSize: 'clamp(1.1rem, 1.7vw, 1.4rem)', lineHeight: 1.45, color: 'hsl(0 0% 13% / 0.75)', margin: 'clamp(1.25rem, 2.4vw, 1.75rem) 0 0', maxWidth: '44ch' }}
            >
              {service.tagline}
            </motion.p>
          </div>

          <motion.div {...enter(0.2)} className="relative">
            {/* Pink block offset behind the photo — the brand's colour blocking. */}
            <div aria-hidden className="absolute hidden lg:block" style={{ inset: '1.25rem -1.25rem -1.25rem 1.25rem', background: ROSA }} />
            <img
              src={img(service.img)}
              alt=""
              className="relative block w-full object-cover aspect-[16/10] lg:aspect-[4/5]"
              style={{ maxHeight: '62vh' }}
            />
          </motion.div>
        </div>
      </header>

      {/* ===== FACTS — mobile only (desktop has them in the sticky card) ===== */}
      <section aria-label="Key facts" className="lg:hidden" style={{ background: SAND }}>
        <dl className="container-wide grid grid-cols-2" style={{ margin: 0, paddingTop: '1.25rem', paddingBottom: '1.25rem', rowGap: '1.1rem', columnGap: '1rem' }}>
          {service.facts.map((f) => (
            <div key={f.label}>
              <dt style={{ fontFamily: FONT_BODY, fontSize: '0.78rem', color: 'hsl(0 0% 13% / 0.6)' }}>{sentenceCase(f.label)}</dt>
              <dd style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: '0.92rem', color: INK, margin: '0.15rem 0 0' }}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ===== BODY — reading column + sticky booking card ===== */}
      <div className="container-wide" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(4rem, 8vw, 6.5rem)' }}>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-start xl:gap-24">
          <div className="flex min-w-0 flex-col" style={{ gap: 'clamp(3.5rem, 7vw, 5.5rem)' }}>
            {/* Intro */}
            <section aria-labelledby="intro-h">
              <h2 id="intro-h" className="sr-only">{sentenceCase(serviceDetailLabels.serviceEyebrow)}</h2>
              <p style={{ fontFamily: FONT_SUB, fontWeight: 500, fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)', lineHeight: 1.55, color: INK, margin: 0, maxWidth: '58ch' }}>
                {service.body}
              </p>
            </section>

            {/* What's included */}
            {service.includes && (
              <section aria-labelledby="includes-h">
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 id="includes-h" style={h2Style}>{serviceDetailLabels.includesLabel}</h2>
                </div>
                <ol className="grid md:grid-cols-2 md:gap-x-10" style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `1.5px solid ${INK}` }}>
                  {service.includes.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-4"
                      style={{ padding: '1rem 0', borderBottom: '1px solid hsl(0 0% 13% / 0.12)', fontFamily: FONT_BODY, fontSize: '0.98rem', lineHeight: 1.5, color: INK }}
                    >
                      <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: GREEN, minWidth: '1.6rem', lineHeight: 1.4 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1">{item}</span>
                      <Check aria-hidden size={18} strokeWidth={2.5} style={{ color: GREEN, flexShrink: 0, marginTop: 2 }} />
                    </li>
                  ))}
                </ol>
                {service.includesNote && (
                  <p style={{ background: ROSA, color: GREEN, fontFamily: FONT_SUB, fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.55, padding: '1.1rem 1.35rem', margin: '1.75rem 0 0', maxWidth: '62ch' }}>
                    {service.includesNote}
                  </p>
                )}
              </section>
            )}

            {/* How it works */}
            <section aria-labelledby="process-h">
              <h2 id="process-h" style={h2Style}>
                {process.headline.lead}
                {process.headline.accent}
              </h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: '0.98rem', lineHeight: 1.6, color: 'hsl(0 0% 13% / 0.65)', margin: '0.9rem 0 2rem', maxWidth: '50ch' }}>
                {process.sub}
              </p>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {process.steps.map((step, i) => (
                  <li key={step.phase} className="relative flex gap-5" style={{ paddingBottom: i < process.steps.length - 1 ? '1.75rem' : 0 }}>
                    {/* Connector down to the next step */}
                    {i < process.steps.length - 1 && (
                      <span aria-hidden className="absolute" style={{ top: 40, bottom: 0, left: 19, width: 1.5, background: 'hsl(89 71% 15% / 0.25)' }} />
                    )}
                    <span
                      style={{
                        width: 40, height: 40, borderRadius: '50%', background: GREEN, color: ROSA, flexShrink: 0,
                        display: 'grid', placeItems: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.15rem',
                      }}
                    >
                      {step.phase}
                    </span>
                    <div style={{ paddingTop: '0.45rem' }}>
                      <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: '0 0 0.35rem', lineHeight: 1.1 }}>
                        {step.title}
                      </h3>
                      <p style={{ fontFamily: FONT_BODY, fontSize: '0.92rem', lineHeight: 1.6, color: 'hsl(0 0% 13% / 0.7)', margin: 0, maxWidth: '52ch' }}>
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Add-ons — strategy & management only */}
            {addOns && (
              <section aria-labelledby="addons-h">
                <h2 id="addons-h" style={h2Style}>
                  {serviceDetailLabels.addOns.heading.lead}
                  {serviceDetailLabels.addOns.heading.accent}
                </h2>
                <p style={{ fontFamily: FONT_BODY, fontSize: '0.98rem', lineHeight: 1.6, color: 'hsl(0 0% 13% / 0.65)', margin: '0.9rem 0 2rem', maxWidth: '52ch' }}>
                  {addOns.intro}
                </p>
                <div className="flex flex-col" style={{ gap: '2rem' }}>
                  {addOns.categories.map((cat) => (
                    <div key={cat.category}>
                      <h3 style={{ fontFamily: FONT_SUB, fontWeight: 700, fontSize: '0.95rem', color: GREEN, margin: '0 0 0.85rem' }}>
                        {sentenceCase(cat.category)}
                      </h3>
                      <ul className="grid gap-3 sm:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {cat.items.map((a) => (
                          <li key={a.name} style={{ background: SAND, padding: '1.1rem 1.25rem' }}>
                            <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: INK, margin: '0 0 0.35rem' }}>
                              {a.name}
                            </p>
                            <p style={{ fontFamily: FONT_BODY, fontSize: '0.86rem', lineHeight: 1.55, color: 'hsl(0 0% 13% / 0.7)', margin: 0 }}>{a.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: '0.88rem', lineHeight: 1.6, color: 'hsl(0 0% 13% / 0.6)', margin: '1.75rem 0 0' }}>
                  {addOns.outro}
                </p>
              </section>
            )}

            <BookingBar service={service} />
          </div>

          <div className="hidden lg:block lg:self-stretch">
            <BookingCard service={service} />
          </div>
        </div>
      </div>

      {/* ===== OTHER SERVICES — chips, like the selector on /services ===== */}
      <section aria-labelledby="others-h" style={{ background: GREEN, color: OFFWHITE }} className="section-padding">
        <div className="container-wide grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <h2 id="others-h" style={{ ...h2Style, color: ROSA }}>
            {serviceDetailLabels.others.heading.lead}
            {serviceDetailLabels.others.heading.accent}
          </h2>
          <ul className="flex flex-wrap gap-2.5" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {others.map((o) => (
              <li key={o.key}>
                <Link
                  to={`/services/${o.key}`}
                  title={o.tagline}
                  className={`block hover:bg-[hsl(354_100%_87%)] hover:text-[hsl(89_71%_15%)] ${focusRing}`}
                  style={{
                    fontFamily: FONT_BODY, fontWeight: 500, fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                    padding: '0.95rem 1.4rem', borderRadius: 999, border: `1.5px solid ${ROSA}`,
                    textDecoration: 'none', transition: 'background 0.25s ease, color 0.25s ease', outlineColor: ROSA,
                  }}
                >
                  {oneLine(o.label).toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <YesCTA />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
