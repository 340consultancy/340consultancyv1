import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { showcase, img, type ShowcaseItem } from '@/content';

/*
  Mirrored 2×2 grid in the "340 knows the way" style:

    ┌──────────────┬──────────────┐
    │ TEXT         │ MODULE (img) │   row 1: Content we create
    ├──────────────┼──────────────┤
    │ MODULE (img) │ TEXT         │   row 2: Every industry (mirrored)
    └──────────────┴──────────────┘

  TEXT cell  : eyebrow + heading + intro on plain dark (no image).
  MODULE cell: hover-swapping image (cycling founder defaults, per-term image
               on hover) with the term tags overlaid — kept as before.

  All copy, term images and founder defaults come from src/content/sections/showcase.ts.
*/

const ROSA = 'hsl(354 100% 87%)';
const CREAM = 'hsl(36 21% 95%)';

/* ── Text cell — eyebrow + heading + intro, plain dark, vertically centered ── */
const TextCell: React.FC<{ eyebrow: string; titleLead: string; titleAccent: string; sub: string }> = ({
  eyebrow, titleLead, titleAccent, sub,
}) => (
  <div
    style={{
      background: 'hsl(0 0% 13%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 'clamp(180px, 24vh, 320px)',
      padding: 'clamp(1.8rem, 4vw, 3.5rem)',
    }}
  >
    <p
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: '0.5rem',
        letterSpacing: '0.36em',
        textTransform: 'uppercase',
        color: ROSA,
        marginBottom: '1rem',
      }}
    >
      {eyebrow}
    </p>

    <h2
      style={{
        fontFamily: "'Kelson Sans BG', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(2rem, 4vw, 3.6rem)',
        lineHeight: 0.9,
        textTransform: 'uppercase',
        margin: 0,
      }}
    >
      <span style={{ color: CREAM }}>{titleLead} </span>
      <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{titleAccent}</span>
    </h2>

    <p
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)',
        lineHeight: 1.6,
        color: 'hsl(36 21% 95% / 0.7)',
        maxWidth: '40ch',
        margin: '1.2rem 0 0',
      }}
    >
      {sub}
    </p>
  </div>
);

/* ── Module cell — hover-swapping image + term tags (kept as before) ───────── */
const ModuleCell: React.FC<{ items: ShowcaseItem[]; defaultImages: string[] }> = ({ items, defaultImages }) => {
  const [active, setActive] = useState<number | null>(null);
  const [didx, setDidx] = useState(0);

  // Auto-cycle the founder default background.
  useEffect(() => {
    if (defaultImages.length < 2) return;
    const id = setInterval(() => setDidx((d) => (d + 1) % defaultImages.length), 4500);
    return () => clearInterval(id);
  }, [defaultImages.length]);

  const showingDefault = active === null;

  return (
    <div
      onMouseLeave={() => setActive(null)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(320px, 42vh, 480px)',
        background: 'hsl(0 0% 13%)',
        display: 'flex',
      }}
    >
      {/* Default founder backgrounds — cycle, visible only when no term hovered */}
      {defaultImages.map((src, k) => (
        <img
          key={`d-${k}`}
          src={src}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: showingDefault && didx === k ? 1 : 0,
            transform: showingDefault && didx === k ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 1.1s ease, transform 5s ease',
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* Per-term background images — crossfade in on hover */}
      {items.map((it, i) => (
        <img
          key={i}
          src={img(it.img)}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: active === i ? 1 : 0,
            transform: active === i ? 'scale(1.04)' : 'scale(1.12)',
            transition: 'opacity 0.6s ease, transform 1.2s ease',
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* Dark overlay for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, hsl(0 0% 4% / 0.55) 0%, hsl(0 0% 4% / 0.4) 40%, hsl(0 0% 4% / 0.82) 100%)',
        }}
      />

      {/* Terms over the image — anchored to the bottom */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 'clamp(1.8rem, 3.5vw, 3.2rem)',
        }}
      >
        <div
          style={{
            marginTop: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            columnGap: 'clamp(0.8rem, 2vw, 2rem)',
          }}
        >
          {items.map((it, i) => {
            const on = active === i;
            return (
              <button
                key={it.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  background: 'transparent',
                  border: 'none',
                  borderTop: '1px solid hsl(36 21% 95% / 0.16)',
                  padding: 'clamp(0.55rem, 1.1vw, 0.85rem) 0',
                  textAlign: 'left',
                  cursor: 'default',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: ROSA,
                    flexShrink: 0,
                    opacity: on ? 1 : 0.5,
                    transform: on ? 'scale(1.6)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: on ? 700 : 600,
                    fontSize: 'clamp(0.82rem, 1.15vw, 1.05rem)',
                    letterSpacing: '0.03em',
                    lineHeight: 1.2,
                    color: on ? ROSA : 'hsl(36 21% 95% / 0.85)',
                    textShadow: '0 1px 10px hsl(0 0% 0% / 0.55)',
                    transition: 'color 0.25s ease, font-weight 0.25s ease',
                  }}
                >
                  {it.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ContentIndustryShowcase: React.FC = () => {
  const isMobile = useIsMobile();

  const contentText = (
    <TextCell
      key="content-text"
      eyebrow={showcase.content.text.eyebrow}
      titleLead={showcase.content.text.titleLead}
      titleAccent={showcase.content.text.titleAccent}
      sub={showcase.content.text.sub}
    />
  );
  const contentModule = <ModuleCell key="content-module" items={showcase.content.items} defaultImages={showcase.content.defaultImages.map(img)} />;
  const industryText = (
    <TextCell
      key="industry-text"
      eyebrow={showcase.industry.text.eyebrow}
      titleLead={showcase.industry.text.titleLead}
      titleAccent={showcase.industry.text.titleAccent}
      sub={showcase.industry.text.sub}
    />
  );
  const industryModule = <ModuleCell key="industry-module" items={showcase.industry.items} defaultImages={showcase.industry.defaultImages.map(img)} />;

  // Desktop: mirrored diagonal (text TL, module TR, module BL, text BR).
  // Mobile (single column): text always directly above its module.
  const cells = isMobile
    ? [contentText, contentModule, industryText, industryModule]
    : [contentText, contentModule, industryModule, industryText];

  return (
    <section style={{ background: 'hsl(0 0% 13%)' }}>
      <div
        style={{ background: 'hsl(36 21% 95% / 0.07)' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
      >
        {cells}
      </div>
    </section>
  );
};

export default ContentIndustryShowcase;
