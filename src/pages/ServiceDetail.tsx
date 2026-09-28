import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import { services, managementAddOns, strategyAddOns, serviceDetailLabels, img, type AddOnCategory } from '@/content';
import { useIsMobile } from '@/hooks/use-mobile';

const ROSA = 'hsl(354 100% 87%)';
const CREAM = 'hsl(36 21% 95%)';
const INK = 'hsl(0 0% 13%)';
const RED = '#A22131'; // brand dark red — accent that stays legible on light backgrounds
const FONT = {
  display: "'Kelson Sans BG', sans-serif",
  body: "'Poppins', sans-serif",
  sub: "'Montserrat', sans-serif",
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

/* ── Add-ons block — rendered on the Strategy and Management service pages ── */
const AddOnsBlock: React.FC<{
  categories: AddOnCategory[];
  intro: string;
  outro: string;
}> = ({ categories, intro, outro }) => (
  <section style={{ background: 'hsl(0 0% 8%)', padding: 'clamp(3rem,6vw,5.5rem) clamp(1.5rem,5vw,5rem)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ marginBottom: 'clamp(1.6rem,3vw,2.4rem)' }}>
        <p style={{ fontFamily: FONT.sub, fontWeight: 700, fontSize: '0.45rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: ROSA, marginBottom: '0.9rem' }}>
          {serviceDetailLabels.addOns.eyebrow}
        </p>
        <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 0.9, textTransform: 'uppercase', color: CREAM, margin: 0 }}>
          <span>{serviceDetailLabels.addOns.heading.lead}</span>
          <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{serviceDetailLabels.addOns.heading.accent}</span>
        </h2>
        <p style={{ fontFamily: FONT.body, fontSize: 'clamp(0.85rem,1.1vw,1rem)', lineHeight: 1.7, color: 'hsl(36 21% 95% / 0.5)', margin: 'clamp(1rem,2vw,1.4rem) 0 0', maxWidth: '52ch' }}>
          {intro}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4vw,3rem)' }}>
        {categories.map((cat) => (
          <div key={cat.category}>
            <p style={{ fontFamily: FONT.sub, fontWeight: 700, fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: ROSA, marginBottom: '1rem' }}>
              {cat.category}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(0.6rem, 1.2vw, 0.9rem)' }}>
              {cat.items.map((a, i) => (
                <motion.div key={a.name} {...reveal(i * 0.05)} style={{ background: 'hsl(0 0% 7%)', border: '1px solid hsl(36 21% 95% / 0.1)', padding: 'clamp(1.5rem,2.5vw,2rem)' }}>
                  <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.26em', color: 'hsl(354 100% 87% / 0.6)', display: 'block', marginBottom: '0.9rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.05rem,1.6vw,1.3rem)', letterSpacing: '0.02em', textTransform: 'uppercase', color: CREAM, margin: '0 0 0.6rem' }}>
                    {a.name}
                  </h3>
                  <p style={{ fontFamily: FONT.body, fontSize: '0.8rem', lineHeight: 1.7, color: 'hsl(36 21% 95% / 0.55)', margin: 0 }}>
                    {a.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: FONT.body, fontSize: 'clamp(0.78rem,1vw,0.9rem)', lineHeight: 1.7, color: 'hsl(36 21% 95% / 0.4)', margin: 'clamp(2rem,4vw,3rem) 0 0' }}>
        {outro}
      </p>
    </div>
  </section>
);

/* ── Single "other service" link row ─────────────────────────────────────── */
const OtherServiceRow: React.FC<{ to: string; num: string; label: string; tagline: string }> = ({ to, num, label, tagline }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'clamp(1rem,3vw,2.5rem)',
        padding: 'clamp(1.1rem,2vw,1.6rem) 0',
        borderTop: '1px solid hsl(36 21% 95% / 0.1)',
        textDecoration: 'none',
      }}
    >
      <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.24em', color: hov ? ROSA : 'hsl(36 21% 95% / 0.3)', width: '2rem', flexShrink: 0, transition: 'color 0.25s ease' }}>
        {num}
      </span>
      <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.3rem,3vw,2.2rem)', lineHeight: 1.05, textTransform: 'uppercase', color: hov ? CREAM : 'hsl(36 21% 95% / 0.82)', flex: 1, transition: 'color 0.25s ease' }}>
        {label}
      </span>
      <span className="hidden sm:block" style={{ fontFamily: FONT.body, fontSize: '0.72rem', lineHeight: 1.5, color: 'hsl(36 21% 95% / 0.4)', maxWidth: '30ch', textAlign: 'right' }}>
        {tagline}
      </span>
      <ArrowRight size={20} style={{ color: hov ? ROSA : 'hsl(36 21% 95% / 0.3)', flexShrink: 0, transform: hov ? 'translateX(4px)' : 'none', transition: 'color 0.25s ease, transform 0.25s ease' }} />
    </Link>
  );
};

/* ── Page ────────────────────────────────────────────────────────────────── */
const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const isMobile = useIsMobile();
  const service = services.find((s) => s.key === slug);

  if (!service) return <Navigate to="/services" replace />;

  const others = services.filter((s) => s.key !== service.key);
  const singleLine = (s: string) => s.replace(/\n/g, ' ');

  return (
    <div className="min-h-screen" style={{ background: INK }}>
      <TopNav />

      {/* ── HERO — the one image + title ── */}
      <section
        style={{
          position: 'relative',
          height: 'clamp(58vh, 62vh, 68vh)',
          minHeight: 380,
          overflow: 'hidden',
          background: 'hsl(0 0% 5%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <motion.img
          src={img(service.img)}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, hsl(0 0% 5% / 0.5) 0%, transparent 38%, hsl(0 0% 5% / 0.72) 80%, hsl(0 0% 5%) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1180, margin: '0 auto', padding: 'clamp(1.5rem,5vw,4rem)' }}>
          <motion.p {...reveal(0)} style={{ fontFamily: FONT.body, fontSize: '0.56rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: ROSA, marginBottom: '1rem' }}>
            {service.eyebrow}
          </motion.p>
          <motion.h1 {...reveal(0.08)} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2.6rem, 7vw, 6rem)', lineHeight: 0.9, letterSpacing: '0.01em', textTransform: 'uppercase', color: CREAM, margin: 0, whiteSpace: 'pre-line' }}>
            {service.label}
          </motion.h1>
          <motion.p {...reveal(0.16)} style={{ fontFamily: FONT.sub, fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', color: 'hsl(36 21% 95% / 0.7)', margin: 'clamp(1rem,2vw,1.5rem) 0 0', maxWidth: '46ch', lineHeight: 1.45 }}>
            {service.tagline}
          </motion.p>
        </div>
      </section>

      {/* ── FACTS STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', background: 'hsl(0 0% 10%)', borderBottom: '1px solid hsl(36 21% 95% / 0.05)' }}>
        {service.facts.map((f, i) => (
          <div key={f.label} style={{ padding: 'clamp(1.1rem,2.5vw,1.6rem) 1rem', textAlign: 'center', borderRight: (isMobile ? i % 2 === 0 : i < 3) ? '1px solid hsl(36 21% 95% / 0.05)' : 'none', borderTop: isMobile && i >= 2 ? '1px solid hsl(36 21% 95% / 0.05)' : 'none' }}>
            <p style={{ fontFamily: FONT.body, fontSize: '0.48rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: ROSA, marginBottom: 6 }}>{f.label}</p>
            <p style={{ fontFamily: FONT.body, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', color: 'hsl(36 21% 95% / 0.82)', textTransform: 'uppercase', margin: 0 }}>{f.value}</p>
          </div>
        ))}
      </div>

      {/* ── INFO — pop-up style, dark ── */}
      <section style={{ background: 'hsl(0 0% 13%)', padding: 'clamp(2.5rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: 'clamp(2rem,5vw,4.5rem)', alignItems: 'start' }}>
            {/* Left — intro */}
            <motion.div {...reveal(0)}>
              <p style={{ fontFamily: FONT.sub, fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'hsl(354 100% 87% / 0.7)', marginBottom: '1.2rem' }}>
                {serviceDetailLabels.serviceEyebrow}
              </p>
              <p style={{ fontFamily: FONT.body, fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)', lineHeight: 1.85, color: 'hsl(36 21% 95% / 0.7)', margin: 0, maxWidth: '58ch' }}>
                {service.body}
              </p>
            </motion.div>

            {/* Right — pricing note */}
            <motion.div {...reveal(0.1)} style={{ border: '1px solid hsl(36 21% 95% / 0.14)', padding: 'clamp(1.4rem,2.5vw,2rem)' }}>
              <p style={{ fontFamily: FONT.body, fontSize: '0.46rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'hsl(354 100% 87% / 0.7)', marginBottom: '0.4rem' }}>{serviceDetailLabels.pricingLabel}</p>
              <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.6rem)', lineHeight: 1, color: CREAM, margin: 0 }}>
                {service.price}
              </p>
              {service.priceNote && (
                <p style={{ fontFamily: FONT.body, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.4)', marginTop: '0.5rem' }}>
                  {service.priceNote}
                </p>
              )}
              <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.12)', margin: '1.2rem 0' }} />
              <Link
                to="/contact"
                className="group"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', minHeight: 44, fontFamily: FONT.body, fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(89 71% 15%)', background: ROSA, textDecoration: 'none', borderRadius: 999 }}
              >
                {service.ctaLabel ?? serviceDetailLabels.defaultCtaLabel} <ArrowUpRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* What's included */}
          {service.includes && (
            <div style={{ marginTop: 'clamp(2.5rem,5vw,4rem)' }}>
              <p style={{ fontFamily: FONT.sub, fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'hsl(354 100% 87% / 0.7)', marginBottom: 'clamp(1.2rem,2.5vw,1.8rem)' }}>
                {serviceDetailLabels.includesLabel}
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '0.7rem clamp(1.5rem,3vw,3rem)' }}>
                {service.includes.map((item, i) => (
                  <motion.li key={i} {...reveal(Math.min(i * 0.03, 0.2))} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontFamily: FONT.body, fontSize: '0.85rem', lineHeight: 1.55, color: 'hsl(36 21% 95% / 0.7)' }}>
                    <Check size={14} style={{ color: ROSA, flexShrink: 0, marginTop: 3 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
              {service.includesNote && (
                <p style={{ fontFamily: FONT.body, fontSize: '0.8rem', lineHeight: 1.7, color: 'hsl(36 21% 95% / 0.45)', margin: 'clamp(1.2rem,2.5vw,1.8rem) 0 0', maxWidth: '58ch' }}>
                  {service.includesNote}
                </p>
              )}
            </div>
          )}

          <p style={{ fontFamily: FONT.body, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.3)', margin: 'clamp(2rem,4vw,3rem) 0 0' }}>
            {serviceDetailLabels.availableInPrefix} {service.facts.find((f) => f.label === 'LANGUAGES')?.value}
          </p>
        </div>
      </section>

      {/* ── ADD-ONS — strategy & management only ── */}
      {service.key === 'strategy' && <AddOnsBlock categories={strategyAddOns.categories} intro={strategyAddOns.intro} outro={strategyAddOns.outro} />}
      {service.key === 'management' && <AddOnsBlock categories={managementAddOns.categories} intro={managementAddOns.intro} outro={managementAddOns.outro} />}

      {/* ── OTHER SERVICES — text links (one image max: no thumbnails) ── */}
      <section style={{ background: INK, padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)', borderTop: 'none' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <p style={{ fontFamily: FONT.sub, fontWeight: 700, fontSize: '0.48rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: ROSA, marginBottom: '0.8rem' }}>
            {serviceDetailLabels.others.eyebrow}
          </p>
          <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,3.2rem)', lineHeight: 0.9, textTransform: 'uppercase', color: CREAM, margin: '0 0 clamp(1.5rem,3vw,2.5rem)' }}>
            {serviceDetailLabels.others.heading.lead}<span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{serviceDetailLabels.others.heading.accent}</span>
          </h2>
          <nav aria-label="Other services" style={{ borderBottom: '1px solid hsl(36 21% 95% / 0.1)' }}>
            {others.map((o, i) => (
              <OtherServiceRow
                key={o.key}
                to={`/services/${o.key}`}
                num={String(i + 1).padStart(2, '0')}
                label={singleLine(o.label)}
                tagline={o.tagline}
              />
            ))}
          </nav>
        </div>
      </section>

      <YesCTA />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
