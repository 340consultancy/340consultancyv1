// /about-us — header → our story → our values → the founders with a quote
// between them, reworked after the client review:
// green header with the pink title, light sections, a photo of the two
// founders next to the story, smaller portraits, hoverable value cards.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import YesCTA from '@/components/YesCTA';
import Footer from '@/components/Footer';
import GreenHeader from '@/components/GreenHeader';
import SplitHeading from '@/components/SplitHeading';
import { aboutUs, img, Icon } from '@/content';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  pink: 'hsl(354 100% 87%)',
  green: 'hsl(89 71% 15%)',
  offWhite: 'hsl(36 21% 95%)',
  beige: 'hsl(36 18% 92%)',
  ink: 'hsl(0 0% 13%)',
} as const;

const FONT = {
  display: "'Kelson Sans BG', sans-serif",
  subheading: "'Montserrat', sans-serif",
  body: "'Poppins', sans-serif",
  editorial: "'Montserrat', serif",
} as const;

/** Photo of the two founders shown next to the story. */
const TOGETHER_IMG = 'linda-nancy';

const SECTION_Y = 'clamp(4.5rem, 11vh, 7.5rem)';

const css = `
.au-story { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2.5rem, 6vw, 6rem); align-items: start; }
.au-founder { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(2rem, 5vw, 5rem); align-items: center; }
.au-founder.is-flipped { grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); }
.au-photo { position: relative; overflow: hidden; aspect-ratio: 4 / 5; max-height: 560px; background: ${C.beige}; }
.au-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.au-values { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(0.75rem, 1.5vw, 1.25rem); }
.au-value {
  background: ${C.beige}; color: ${C.ink}; outline: none; cursor: default;
  padding: clamp(2rem, 3vw, 2.75rem) clamp(1.5rem, 3vw, 2.5rem);
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem;
  transition: background-color .4s ease, color .4s ease, transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s ease;
}
.au-value .au-icon { width: 56px; height: 56px; border-radius: 50%; background: ${C.green}; color: ${C.pink}; display: flex; align-items: center; justify-content: center; transition: background-color .4s ease, color .4s ease, transform .5s cubic-bezier(.16,1,.3,1); }
.au-value .au-rule { width: 32px; height: 1px; background: ${C.green}; opacity: .5; transition: width .5s cubic-bezier(.16,1,.3,1), background-color .4s ease; }
.au-value .au-title { transition: color .4s ease; }
.au-value .au-desc { color: hsl(0 0% 13% / 0.7); transition: color .4s ease; }
.au-value:hover, .au-value:focus-visible { background: ${C.green}; color: ${C.offWhite}; transform: translateY(-6px); box-shadow: 0 24px 40px -24px hsl(89 71% 15% / 0.6); }
.au-value:hover .au-icon, .au-value:focus-visible .au-icon { background: ${C.pink}; color: ${C.green}; transform: scale(1.08); }
.au-value:hover .au-rule, .au-value:focus-visible .au-rule { width: 64px; background: ${C.pink}; opacity: 1; }
.au-value:hover .au-title, .au-value:focus-visible .au-title { color: ${C.pink}; }
.au-value:hover .au-desc, .au-value:focus-visible .au-desc { color: hsl(36 21% 95% / 0.85); }
.au-value:focus-visible { box-shadow: 0 0 0 2px ${C.pink}, 0 24px 40px -24px hsl(89 71% 15% / 0.6); }
@media (prefers-reduced-motion: reduce) {
  .au-value, .au-value .au-icon, .au-value .au-rule { transition: background-color .2s ease, color .2s ease; }
  .au-value:hover, .au-value:focus-visible, .au-value:hover .au-icon, .au-value:focus-visible .au-icon { transform: none; }
}
@media (max-width: 860px) {
  .au-story, .au-founder, .au-founder.is-flipped { grid-template-columns: 1fr; }
  .au-founder.is-flipped > .au-photo { order: -1; }
  .au-photo { max-width: 420px; }
  .au-values { grid-template-columns: 1fr; }
}
`;

// ─── Reveal animation preset ─────────────────────────────────────────────────
const useReveal = () => {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-10% 0px' },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };
};

// ─── LANGUAGE CHIP ────────────────────────────────────────────────────────────
const LangChip: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '4px 11px',
      borderRadius: 999,
      background: C.green,
      fontFamily: FONT.body,
      fontWeight: 700,
      fontSize: '0.6rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: C.offWhite,
    }}
  >
    {label}
  </span>
);

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: FONT.subheading,
      fontWeight: 700,
      fontSize: '0.55rem',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: C.green,
      marginBottom: '1.5rem',
      position: 'relative',
      top: '-0.5rem',
    }}
  >
    {children}
  </p>
);

// ─── SECTION 1: OUR STORY — with the founders' photo next to the text ────────
const OurStory: React.FC = () => {
  const reveal = useReveal();
  const { story } = aboutUs;
  return (
    <section style={{ background: C.offWhite }}>
      <div className="container-wide au-story" style={{ paddingTop: SECTION_Y, paddingBottom: SECTION_Y }}>
        <motion.div {...reveal(0)}>
          <div className="au-photo" style={{ maxWidth: 460 }}>
            <img src={img(TOGETHER_IMG)} alt={aboutUs.hero.imageAlt} loading="lazy" style={{ objectPosition: '50% 30%' }} />
          </div>
        </motion.div>

        <motion.div {...reveal(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div>
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <SplitHeading
              line1={story.headline.line1}
              line2={story.headline.line2}
              size="clamp(2.6rem, 6vw, 5rem)"
              solidColor={C.green}
              strokeColor={C.green}
              className="mb-4"
            />
          </div>
          {story.paragraphs.map((p, i) => (
            <p key={i} style={{ fontFamily: FONT.body, fontSize: '1rem', lineHeight: 1.85, color: 'hsl(0 0% 13% / 0.78)', margin: 0, maxWidth: '58ch' }}>
              {p}
            </p>
          ))}
          <p style={{ fontFamily: FONT.editorial, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: C.green, lineHeight: 1.4, margin: '0.4rem 0 0' }}>
            {story.signoff}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ─── SECTION 2: THE FOUNDERS — smaller portraits, quote between them ────────
interface FounderProps {
  imgKey: string;
  imgPos: string;
  name: string;
  surname: string;
  role: string;
  bio: string;
  langs: string[];
  flipped?: boolean;
}

const Founder: React.FC<FounderProps> = ({ imgKey, imgPos, name, surname, role, bio, langs, flipped = false }) => {
  const reveal = useReveal();
  const photo = (
    <motion.div {...reveal(0)} className="au-photo">
      <img src={img(imgKey)} alt={`${name} ${surname.replace(/\.$/, '')}`} loading="lazy" style={{ objectPosition: imgPos }} />
    </motion.div>
  );
  const text = (
    <motion.div {...reveal(0.1)} style={{ maxWidth: '52ch' }}>
      <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.18, letterSpacing: '-0.02em', margin: 0, padding: '0.08em 0.025em', textTransform: 'uppercase', overflowWrap: 'anywhere' }}>
        <span style={{ display: 'block', color: C.pink, marginBottom: '0.16em' }}>{name}</span>
        <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: `1.5px ${C.green}` }}>{surname}</span>
      </h2>
      <p style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.green, margin: '1.5rem 0 1rem' }}>
        {role}
      </p>
      <div style={{ height: 1, background: 'hsl(0 0% 13% / 0.12)', marginBottom: '1.2rem' }} />
      <p style={{ fontFamily: FONT.body, fontSize: '1rem', lineHeight: 1.85, color: 'hsl(0 0% 13% / 0.75)', margin: 0 }}>
        {bio}
      </p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {langs.map((l) => <LangChip key={l} label={l} />)}
      </div>
    </motion.div>
  );
  return (
    <section style={{ background: C.offWhite }}>
      <div className={`container-wide au-founder${flipped ? ' is-flipped' : ''}`} style={{ paddingTop: SECTION_Y, paddingBottom: SECTION_Y }}>
        {flipped ? <>{text}{photo}</> : <>{photo}{text}</>}
      </div>
    </section>
  );
};

/** "What began as friendship became a journey of big dreams." — kept as is, on green. */
const FoundersQuote: React.FC = () => {
  const reveal = useReveal();
  const { quote } = aboutUs.founders;
  return (
    <section style={{ background: C.green }}>
      <motion.div {...reveal(0)} className="container-wide" style={{ paddingTop: 'clamp(4rem, 10vh, 6.5rem)', paddingBottom: 'clamp(4rem, 10vh, 6.5rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2rem, 4.6vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 auto', maxWidth: '20ch' }}>
          <span style={{ color: C.offWhite }}>{quote.solid}</span>
          <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${C.pink}` }}>{quote.outline}</span>
        </p>
      </motion.div>
    </section>
  );
};

const FoundersSection: React.FC = () => {
  const { linda, nancy } = aboutUs.founders;
  return (
    <>
      <Founder imgKey={linda.img} imgPos="55% 30%" name={linda.name} surname={linda.surname} role={linda.role} bio={linda.bio} langs={linda.langs} />
      <FoundersQuote />
      <Founder imgKey={nancy.img} imgPos="30% 30%" name={nancy.name} surname={nancy.surname} role={nancy.role} bio={nancy.bio} langs={nancy.langs} flipped />
    </>
  );
};

// ─── SECTION 3: OUR VALUES — hoverable cards ─────────────────────────────────
const ValuesSection: React.FC = () => {
  const reveal = useReveal();
  const { values } = aboutUs;
  return (
    <section style={{ background: C.offWhite, borderTop: '1px solid hsl(0 0% 13% / 0.08)' }}>
      <div className="container-wide" style={{ paddingTop: SECTION_Y, paddingBottom: SECTION_Y }}>
        <motion.div {...reveal(0)} style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <SplitHeading
            line1={values.headline.line1}
            line2={values.headline.line2}
            size="clamp(3rem, 5vw, 4.5rem)"
            align="center"
            solidColor={C.green}
            strokeColor={C.green}
          />
        </motion.div>

        <div className="au-values">
          {values.items.map(({ icon, title, desc }, i) => (
            <motion.div key={title} {...reveal(i * 0.1)}>
              <div className="au-value" tabIndex={0} style={{ height: '100%' }}>
                <div className="au-icon" aria-hidden>
                  <Icon name={icon} size={22} strokeWidth={1.5} />
                </div>
                <h3 className="au-title" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.2rem, 1.7vw, 1.5rem)', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.15, margin: 0, whiteSpace: 'pre-line' }}>
                  {title}
                </h3>
                <div className="au-rule" aria-hidden />
                <p className="au-desc" style={{ fontFamily: FONT.body, fontSize: 'clamp(0.88rem, 0.95vw, 0.95rem)', lineHeight: 1.75, margin: 0, maxWidth: '30ch' }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const AboutUs: React.FC = () => (
  <div style={{ minHeight: '100vh', background: C.offWhite, overflowX: 'clip' }}>
    <style>{css}</style>
    <TopNav />

    <GreenHeader lead={aboutUs.hero.headline.lead} accent={aboutUs.hero.headline.accent} intro={aboutUs.hero.tagline} />

    <OurStory />
    <ValuesSection />
    <FoundersSection />

    <YesCTA />
    <Footer />
  </div>
);

export default AboutUs;
