import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, testimonialsCta } from '@/content';

/** `showCta` hides the button where it would link to the current page. */
const Testimonials: React.FC<{ showCta?: boolean; tone?: 'green' | 'light' }> = ({ showCta = true, tone = 'green' }) => {
  const light = tone === 'light';
  const textColor = light ? 'hsl(0 0% 13%)' : 'hsl(36 21% 95%)';
  const accentColor = light ? 'hsl(89 71% 15%)' : 'hsl(354 100% 87%)';
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const items = testimonials.slice(0, 5); // all 5 testimonials

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const prev = () => go((current - 1 + items.length) % items.length);
  const next = () => go((current + 1) % items.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      aria-label="Client testimonials"
      style={{
        background: light ? '#fff' : 'hsl(89 71% 15%)',
        color: textColor,
        borderTop: 'none',
      }}
      className="relative flex flex-col items-center justify-center py-20 px-14 md:px-24 overflow-hidden"
    >
      {/* Arrow left */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-10 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="transition-opacity opacity-40 group-hover:opacity-100">
          <path d="M25 8L13 20L25 32" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Arrow right */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-10 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="transition-opacity opacity-40 group-hover:opacity-100">
          <path d="M15 8L27 20L15 32" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Quote */}
      <div className="w-full max-w-3xl text-center min-h-[150px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0, 0.18, 1] }}
            className="flex flex-col items-center gap-5"
            style={{
              background: 'transparent',
              padding: 'clamp(1.3rem, 2.2vw, 2rem)',
              borderRadius: 2,
              position: 'relative',
            }}
          >
            {/* Decorative oversized opening quote */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "'Kelson Sans BG', sans-serif",
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                lineHeight: 0.7,
                color: light ? 'hsl(89 71% 15% / 0.25)' : 'hsl(354 100% 87% / 0.5)',
                position: 'absolute',
                top: '-0.1em',
                left: '-0.05em',
                display: 'block',
                userSelect: 'none',
              }}
            >
              &ldquo;
            </span>

            <p
              style={{
                fontFamily: "'Kelson Sans BG', sans-serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.9rem)',
                lineHeight: 1.25,
                letterSpacing: '0.03em',
                color: textColor,
                position: 'relative',
              }}
            >
              {items[current].quote}
            </p>

            <div>
              <p
                style={{
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  color: accentColor,
                }}
              >
                {items[current].name}
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: light ? 'hsl(0 0% 13% / 0.7)' : 'hsl(36 21% 95% / 0.8)',
                  marginTop: 4,
                }}
              >
                {items[current].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-3 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              width: i === current ? 48 : 24,
              height: 3,
              borderRadius: 2,
              background: i === current ? accentColor : light ? 'hsl(89 71% 15% / 0.25)' : 'hsl(36 21% 95% / 0.35)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* CTA */}
      {showCta && (
      <Link
        to={testimonialsCta.to}
        onMouseEnter={(e) => {
          const t = e.currentTarget as HTMLAnchorElement;
          t.style.background = 'hsl(89 71% 15%)';
          t.style.color = 'hsl(354 100% 87%)';
          t.style.boxShadow = '0 6px 32px -4px hsl(89 71% 15% / 0.45)';
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget as HTMLAnchorElement;
          t.style.background = 'hsl(354 100% 87%)';
          t.style.color = 'hsl(89 71% 15%)';
          t.style.boxShadow = '0 4px 24px -4px hsl(354 100% 87% / 0.35)';
        }}
        style={{
          marginTop: 32,
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          fontWeight: 700,
          background: 'hsl(354 100% 87%)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: 'none',
          boxShadow: '0 4px 24px -4px hsl(354 100% 87% / 0.35)',
          color: 'hsl(89 71% 15%)',
          borderRadius: 999,
          padding: '13px 28px',
          display: 'inline-block',
          textTransform: 'uppercase' as const,
          transition: 'background 0.42s ease, color 0.42s ease, box-shadow 0.42s ease',
        }}
      >
        {testimonialsCta.label}
      </Link>
      )}
    </section>
  );
};

export default Testimonials;
