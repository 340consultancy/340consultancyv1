import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import YesCTA from '@/components/YesCTA';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { aboutUs, img, Icon } from '@/content';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  burgundy: 'hsl(354 100% 87%)',
  pink: 'hsl(354 100% 87%)',
  green: 'hsl(89 71% 15%)',
  offWhite: 'hsl(36 21% 95%)',
  nearBlack: 'hsl(0 0% 8%)',
  darkGrey: 'hsl(0 0% 13%)',
} as const;

const FONT = {
  display: "'Kelson Sans BG', sans-serif",
  subheading: "'Montserrat', sans-serif",
  body: "'Poppins', sans-serif",
  editorial: "'Montserrat', serif",
} as const;

const SECTION_PADDING = 'clamp(3rem, 5vw, 4.5rem)';

// ─── Reveal animation preset ─────────────────────────────────────────────────
const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const revealTransition = (delay = 0) => ({
  duration: 0.7,
  delay,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
});

// ─── LANGUAGE CHIP ────────────────────────────────────────────────────────────
const LangChip: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '4px 11px',
      borderRadius: 999,
      background: C.green,
      border: '1px solid hsl(89 60% 30% / 0.5)',
      fontFamily: FONT.body,
      fontWeight: 700,
      fontSize: '0.5rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'hsl(36 21% 95% / 0.9)',
    }}
  >
    {label}
  </span>
);

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <p
    style={{
      fontFamily: FONT.subheading,
      fontWeight: 700,
      fontSize: '0.5rem',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: dark ? 'hsl(354 100% 87% / 0.7)' : C.pink,
      marginBottom: '1.2rem',
    }}
  >
    {children}
  </p>
);

// ─── SECTION 1: OUR STORY ────────────────────────────────────────────────────
const OurStory: React.FC = () => (
  <section
    style={{
      background: C.darkGrey,
      padding: `${SECTION_PADDING} clamp(1.5rem, 6vw, 5rem)`,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'start',
      }}
    >
      {/* Left col */}
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={revealTransition(0)}
      >
        <Eyebrow dark>{aboutUs.story.eyebrow}</Eyebrow>

        <h2
          style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(2.6rem, 8vw, 5.5rem)',
            lineHeight: 0.9,
            margin: 0,
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              display: 'block',
              color: C.offWhite,
            }}
          >
            {aboutUs.story.headline.line1}
          </span>
          <span
            style={{
              display: 'block',
              color: 'transparent',
              WebkitTextStroke: `1.5px ${C.burgundy}`,
            }}
          >
            {aboutUs.story.headline.line2}
          </span>
        </h2>

        <div
          style={{
            height: 1,
            background: `hsl(36 21% 95% / 0.1)`,
            marginTop: '2.5rem',
          }}
        />
      </motion.div>

      {/* Right col */}
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={revealTransition(0.12)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}
      >
        {aboutUs.story.paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: FONT.body,
              fontSize: '0.95rem',
              lineHeight: 1.85,
              color: `hsl(36 21% 95% / 0.72)`,
              margin: 0,
            }}
          >
            {p}
          </p>
        ))}

        <p
          style={{
            fontFamily: FONT.editorial,
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: C.burgundy,
            lineHeight: 1.4,
            margin: '0.4rem 0 0',
          }}
        >
          {aboutUs.story.signoff}
        </p>
      </motion.div>
    </div>
  </section>
);

// ─── Divider between Story and Founders ──────────────────────────────────────
const SectionDivider: React.FC = () => (
  <div
    aria-hidden
    style={{
      height: 1,
      background:
        'linear-gradient(90deg, transparent, hsl(36 21% 95% / 0.06) 50%, transparent)',
    }}
  />
);

// ─── FOUNDER CARD ─────────────────────────────────────────────────────────────
// ─── SECTION 2: FOUNDERS SCROLL ADVENTURE ────────────────────────────────────
const ANIM_MS = 1400;
const DELTA_THRESHOLD = 180;

const FounderMobile: React.FC<{
  img: string; imgPos: string; name: string; surname: string; role: string; bio: string; langs: string[];
}> = ({ img, imgPos, name, surname, role, bio, langs }) => (
  <section className="relative w-full" style={{ background: C.darkGrey }}>
    <div style={{ position: 'relative', width: '100%', height: 'clamp(340px, 60vh, 500px)', overflow: 'hidden' }}>
      <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: imgPos }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent 55%, hsl(0 0% 8% / 0.65) 100%)' }} />
    </div>
    <div style={{ padding: 'clamp(2rem, 7vw, 3rem) clamp(1.5rem, 6vw, 2.5rem)' }}>
      <p style={{ fontFamily: FONT.subheading, fontSize: '0.46rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.4)', marginBottom: '1rem' }}>
        {aboutUs.founders.eyebrow}
      </p>
      <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2.6rem, 12vw, 4rem)', lineHeight: 0.88, letterSpacing: '-0.02em', margin: 0 }}>
        <span style={{ display: 'block', color: C.pink }}>{name}</span>
        <span style={{ display: 'block', color: C.offWhite }}>{surname}</span>
      </h2>
      <p style={{ fontFamily: FONT.body, fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.pink, marginTop: '1.2rem', marginBottom: '1rem' }}>
        {role}
      </p>
      <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.12)', marginBottom: '1.2rem' }} />
      <p style={{ fontFamily: FONT.body, fontSize: '0.85rem', lineHeight: 1.85, color: 'hsl(36 21% 95% / 0.6)', margin: 0 }}>
        {bio}
      </p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {langs.map(l => <LangChip key={l} label={l} />)}
      </div>
    </div>
  </section>
);

const FoundersScrollSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const total = 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);
  const isInView = useRef(false);
  const deltaAccum = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boundaryLock = useRef(false);
  const boundaryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    if (scrolling.current) return;
    setPage(p => {
      const next = Math.max(0, Math.min(total - 1, p + dir));
      if (next === 0 || next === total - 1) {
        boundaryLock.current = true;
        if (boundaryTimer.current) clearTimeout(boundaryTimer.current);
        boundaryTimer.current = setTimeout(() => { boundaryLock.current = false; }, ANIM_MS + 600);
      }
      return next;
    });
    scrolling.current = true;
    setTimeout(() => { scrolling.current = false; }, ANIM_MS);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { isInView.current = e.intersectionRatio > 0.85; },
      { threshold: [0.3, 0.85, 1.0] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isInView.current) return;
      if (page === 0 && e.deltaY < 0) {
        if (boundaryLock.current) { e.preventDefault(); deltaAccum.current = 0; return; }
        deltaAccum.current = 0; return;
      }
      if (page === total - 1 && e.deltaY > 0) {
        if (boundaryLock.current) { e.preventDefault(); deltaAccum.current = 0; return; }
        deltaAccum.current = 0; return;
      }
      e.preventDefault();
      if (scrolling.current) return;
      deltaAccum.current += e.deltaY;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => { deltaAccum.current = 0; }, 400);
      if (Math.abs(deltaAccum.current) >= DELTA_THRESHOLD) {
        go(deltaAccum.current > 0 ? 1 : -1);
        deltaAccum.current = 0;
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [page, go]);

  const dur = `${ANIM_MS}ms`;
  const ease = 'cubic-bezier(0.76,0,0.24,1)';

  // Per-panel transform: left slides down↑up, right slides up↓down (opposite = drama)
  const leftT  = (i: number) => i === page ? 'translateY(0)' : i < page ? 'translateY(-100%)' : 'translateY(100%)';
  const rightT = (i: number) => i === page ? 'translateY(0)' : i < page ? 'translateY(100%)'  : 'translateY(-100%)';

  // Full-bleed founder page (type: 'full') — true 100% wide photo + text overlay
  const founderPage = (
    img: string, imgPos: string, textSide: 'left' | 'right',
    name: string, surname: string, nameColor: string,
    role: string, bio: string, langs: string[],
    textVAlign: 'center' | 'bottom' = 'bottom',
    photoFullBleed = false
  ) => ({
    type: 'full' as const,
    content: (
      <div style={{ position: 'absolute', inset: 0, background: C.darkGrey }}>
        {/* Photo — full-bleed OR clipped to 52% depending on photoFullBleed */}
        {photoFullBleed ? (
          <img src={img} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: imgPos,
          }} />
        ) : (
          <div style={{
            position: 'absolute',
            ...(textSide === 'right'
              ? { left: 0, top: 0, bottom: 0, width: '52%' }
              : { right: 0, top: 0, bottom: 0, width: '52%' }),
            overflow: 'hidden',
          }}>
            <img src={img} alt="" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: imgPos,
            }} />
          </div>
        )}
        {/* Directional gradient — only for clipped (non-full-bleed) pages */}
        {!photoFullBleed && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: textSide === 'left'
              ? 'linear-gradient(to right, hsl(0 0% 4% / 0.95) 0%, hsl(0 0% 4% / 0.95) 44%, hsl(0 0% 4% / 0.35) 52%, transparent 64%)'
              : 'linear-gradient(to left,  hsl(0 0% 4% / 0.95) 0%, hsl(0 0% 4% / 0.95) 44%, hsl(0 0% 4% / 0.35) 52%, transparent 64%)',
          }} />
        )}
        {/* Bottom vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, hsl(0 0% 4% / 0.5) 0%, transparent 35%)' }} />
        {/* Text — confined to the 48% side opposite the photo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: textVAlign === 'center' ? 'center' : 'flex-end',
          padding: textSide === 'left'
            ? 'clamp(2.5rem, 4vw, 5rem) 38% clamp(2.5rem, 4vw, 5rem) clamp(5rem, 10vw, 12rem)'
            : 'clamp(2.5rem, 4vw, 5rem) clamp(2.5rem, 4vw, 5rem) clamp(2.5rem, 4vw, 5rem) 52%',
          alignItems: 'flex-start',
        }}>
          <div style={{ maxWidth: '44ch', textAlign: 'left' }}>
            <p style={{ fontFamily: FONT.subheading, fontSize: '0.46rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.4)', marginBottom: '1rem' }}>
              {aboutUs.founders.eyebrow}
            </p>
            <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', lineHeight: 0.88, letterSpacing: '-0.02em', margin: 0 }}>
              <span style={{ display: 'block', color: nameColor }}>{name}</span>
              <span style={{ display: 'block', color: C.offWhite }}>{surname}</span>
            </h2>
            <p style={{ fontFamily: FONT.body, fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.pink, marginTop: '1.5rem', marginBottom: '1rem' }}>
              {role}
            </p>
            <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.12)', marginBottom: '1.2rem' }} />
            <p style={{ fontFamily: FONT.body, fontSize: 'clamp(0.78rem, 0.9vw, 0.9rem)', lineHeight: 1.85, color: 'hsl(36 21% 95% / 0.55)', margin: 0 }}>
              {bio}
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.5rem', justifyContent: 'flex-start' }}>
              {langs.map(l => <LangChip key={l} label={l} />)}
            </div>
          </div>
        </div>
      </div>
    ),
  });

  const { linda, nancy, quote } = aboutUs.founders;

  const pages = [
    founderPage(img(linda.img), linda.imgPosDesktop, 'left', linda.name, linda.surname, C.pink,
      linda.role,
      linda.bio,
      linda.langs, 'center', true),
    {
      type: 'split' as const,
      left: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%', paddingRight: '3vw', background: C.darkGrey }}>
          <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.01em', color: C.offWhite, textAlign: 'right', textTransform: 'uppercase', margin: 0 }}>
            {quote.solidLines.map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </p>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%', paddingLeft: '3vw', background: C.darkGrey, borderLeft: '1px solid hsl(36 21% 95% / 0.06)' }}>
          <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'transparent', WebkitTextStroke: `1.5px ${C.pink}`, textTransform: 'uppercase', margin: 0 }}>
            {quote.outlineLines.map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </p>
        </div>
      ),
    },
    founderPage(img(nancy.img), nancy.imgPosDesktop, 'right', nancy.name, nancy.surname, C.pink,
      nancy.role,
      nancy.bio,
      nancy.langs, 'center', true),
  ];

  // ── Mobile: stack the founders + quote vertically (no scroll-hijack, no
  //    off-screen panels). All three are reachable and full-width. ──
  if (isMobile) {
    return (
      <div style={{ background: C.darkGrey }}>
        <FounderMobile
          img={img(linda.img)} imgPos={linda.imgPosMobile} name={linda.name} surname={linda.surname}
          role={linda.role} bio={linda.bio} langs={linda.langs}
        />
        <section style={{
          background: C.darkGrey,
          padding: 'clamp(2.5rem, 9vw, 4rem) clamp(1.5rem, 6vw, 2.5rem)',
          textAlign: 'center',
          borderTop: 'none',
          borderBottom: '1px solid hsl(36 21% 95% / 0.06)',
        }}>
          <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 'clamp(1.7rem, 8vw, 2.6rem)', lineHeight: 1.12, textTransform: 'uppercase', margin: 0 }}>
            <span style={{ color: C.offWhite }}>{quote.solid}</span>
            <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${C.pink}` }}>{quote.outline}</span>
          </p>
        </section>
        <FounderMobile
          img={img(nancy.img)} imgPos={nancy.imgPosMobile} name={nancy.name} surname={nancy.surname}
          role={nancy.role} bio={nancy.bio} langs={nancy.langs}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: C.darkGrey }}>
      {pages.map((p, i) => {
        const isFull = p.type === 'full';
        const t = i === page ? 'translateY(0)' : i < page ? 'translateY(-100%)' : 'translateY(100%)';

        if (isFull) {
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              transform: t,
              transition: `transform ${dur} ${ease}`,
              willChange: 'transform',
            }}>
              {(p as any).content}
            </div>
          );
        }

        // Split page (quote)
        return (
        <div key={i} style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <div style={{
            width: '50%', height: '100%', overflow: 'hidden',
            transform: leftT(i),
            transition: `transform ${dur} ${ease}`,
            willChange: 'transform',
          }}>
            {(p as any).left}
          </div>
          <div style={{
            width: '50%', height: '100%', overflow: 'hidden',
            transform: rightT(i),
            transition: `transform ${dur} ${ease}`,
            willChange: 'transform',
          }}>
            {(p as any).right}
          </div>
        </div>
        );
      })}

      {/* Page dots */}
      <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 30, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i > page ? 1 : -1)}
            style={{
              width: 6, height: 6, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: i === page ? C.pink : 'hsl(36 21% 95% / 0.25)',
              transform: i === page ? 'scale(1.4)' : 'scale(1)',
              transition: 'background 0.4s, transform 0.4s',
            }}
          />
        ))}
      </div>

      {/* Page counter */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 30, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: FONT.body, fontSize: '0.5rem', letterSpacing: '0.3em', color: 'hsl(36 21% 95% / 0.3)', textTransform: 'uppercase' }}>
          0{page + 1} / 0{total}
        </span>
      </div>
    </div>
  );
};

// ─── SECTION 3: OUR VALUES ────────────────────────────────────────────────────
const ValuesSection: React.FC = () => (
  <section
    style={{
      background: C.darkGrey,
      padding: `${SECTION_PADDING} clamp(1.5rem, 6vw, 5rem) clamp(2.5rem, 5vw, 4rem)`,
      overflow: 'hidden',
    }}
  >
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Section header */}
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={revealTransition(0)}
        style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)', textAlign: 'center' }}
      >
        <Eyebrow dark>{aboutUs.values.eyebrow}</Eyebrow>
        <h2
          style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          <span style={{ display: 'block', color: C.offWhite }}>{aboutUs.values.headline.line1}</span>
          <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: `1.5px ${C.pink}` }}>
            {aboutUs.values.headline.line2}
          </span>
        </h2>
      </motion.div>

      {/* 3 horizontal value cards — collapse to 1 column on phones */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        gap: 1,
        background: `hsl(36 21% 95% / 0.1)`,
      }}>
        {aboutUs.values.items.map(({ icon, title, desc }, i) => (
          <motion.div
            key={title}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={revealTransition(i * 0.1)}
            style={{
              background: C.darkGrey,
              padding: 'clamp(1.8rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem',
            }}
          >
            {/* Icon */}
            <div style={{
              width: 56, height: 56,
              borderRadius: '50%',
              background: C.green,
              border: `1.5px solid ${C.green}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name={icon} size={22} color={C.pink} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: C.offWhite,
              lineHeight: 1.15,
              margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {title}
            </h3>

            {/* Divider */}
            <div style={{ width: 32, height: 1, background: C.green, opacity: 0.6 }} />

            {/* Description */}
            <p style={{
              fontFamily: FONT.body,
              fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
              color: 'hsl(36 21% 95% / 0.6)',
              lineHeight: 1.75,
              margin: 0,
              maxWidth: '28ch',
            }}>
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const AboutUs: React.FC = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ minHeight: '100vh', background: C.darkGrey, overflow: 'hidden' }}>
    <TopNav />

    {/* ── Custom Hero ── */}
    <section
      style={{
        height: isMobile ? '78vh' : '88vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'hsl(0 0% 5%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo — full bleed, no filters */}
      <img
        src={img(aboutUs.hero.image)}
        alt={aboutUs.hero.imageAlt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: aboutUs.hero.imagePosition,
        }}
      />

      {/* Minimal gradient only at bottom so text stays readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, hsl(0 0% 5% / 0.72) 82%, hsl(0 0% 5%) 100%)',
          pointerEvents: 'none',
        }}
      />


      {/* Text — bottom center */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '2.5rem',
          textAlign: 'center',
          gap: 0,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Kelson Sans BG', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 9vw, 6.5rem)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'hsl(36 21% 95%)',
            margin: 0,
          }}
        >
          {aboutUs.hero.headline.lead}
          <span style={{ fontFamily: "'Kelson Sans BG', sans-serif", color: 'transparent', WebkitTextStroke: `1.5px ${C.pink}` }}>
            {aboutUs.hero.headline.accent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1rem, 4vw, 2rem)',
            color: 'hsl(36 21% 95% / 0.78)',
            letterSpacing: '-0.01em',
            marginTop: '1rem',
          }}
        >
          {aboutUs.hero.tagline}
        </motion.p>

      </div>
    </section>

    <OurStory />
    <FoundersScrollSection />
    <ValuesSection />

    <YesCTA />
    <Footer />
  </div>
  );
};

export default AboutUs;
