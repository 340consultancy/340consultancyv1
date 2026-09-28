import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HoverEyes from '@/components/HoverEyes';
import SplitHeading from '@/components/SplitHeading';
import YesCTA from '@/components/YesCTA';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';
import PhoneCinematicAnimation from '@/components/PhoneCinematicAnimation';
import { useIsMobile } from '@/hooks/use-mobile';
import { home, img } from '@/content';
import { SplitTransition } from '@/components/ui/animated-scroll';
import ScrollAdventure from '@/components/ScrollAdventure';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div>
      {/* HERO — Brand Burgundy, outlined "340" motif, pink accents */}
      <section id="hero-bg" className="relative w-full overflow-hidden" style={{ height: isMobile ? '92vh' : '88vh', background: 'hsl(0 0% 5%)' }}>
        {/* ── Hero photo ── */}
        <img
          src={img(home.hero.image)}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 35%', opacity: 0.55 }}
        />
        {/* ── Dark gradient overlay — strong at top, lighter at mid, deep at bottom ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, hsl(0 0% 5% / 0.45) 0%, hsl(0 0% 5% / 0.1) 40%, hsl(0 0% 5% / 0.6) 75%, hsl(0 0% 5%) 100%)',
          }}
        />


        {/* ── Grain overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* ── Bottom: Eyebrow + Headline + Services strip + Scroll indicator ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 text-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 'clamp(1.2rem, 3vh, 2rem)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            gap: 0,
          }}
        >
          {/* Eyebrow — Cormorant italic pink */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            style={{
              fontFamily: "'Montserrat', serif",
              fontStyle: 'italic',
              fontSize: '0.95rem',
              letterSpacing: '0.05em',
              color: 'hsl(354 100% 87%)',
              marginBottom: '0.75rem',
            }}
          >
            {home.hero.eyebrow}
          </motion.p>

          {/* Headline — same style as PageHero */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Kelson Sans BG', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.3rem, 9vw, 6.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            <span style={{ display: 'block', color: 'hsl(36 21% 95%)' }}>{home.hero.headline.line1}</span>
            <span style={{ display: 'block' }}>
              <span style={{ color: 'hsl(36 21% 95%)' }}>{home.hero.headline.line2Lead}</span>
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px hsl(354 100% 87%)' }}>{home.hero.headline.accent}</span>
            </span>
          </motion.h1>

          {/* Hairline separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'clamp(18rem, 60vw, 52rem)',
              height: 1,
              background: 'linear-gradient(90deg, transparent, hsl(354 100% 87% / 0.2) 50%, transparent)',
              marginTop: 'clamp(0.9rem, 2vh, 1.4rem)',
              marginBottom: 0,
              transformOrigin: 'center',
            }}
          />

          {/* Services strip */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(8px, 2vw, 24px)',
              rowGap: '0.5rem',
              marginTop: 'clamp(0.7rem, 1.5vh, 1rem)',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
          >
            {home.hero.services.map(({ name, slug }, i) => (
              <React.Fragment key={i}>
                {i > 0 && !isMobile && (
                  <span style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', display: 'block', flexShrink: 0 }} />
                )}
                <Link
                  to={`/services/${slug}`}
                  style={{ textAlign: 'center', flexShrink: 0, textDecoration: 'none', padding: isMobile ? '4px 2px' : 0 }}
                >
                  <p style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? '9px' : 'clamp(7px, 0.9vw, 10px)',
                    color: 'hsl(354 100% 87% / 0.85)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                  }}>{name}</p>
                </Link>
              </React.Fragment>
            ))}
          </motion.div>

        </div>

      </section>

      {/* 340 KNOWS THE WAY */}
      <SplitTransition
        rightImage={img(home.way.image)}
        rightImagePosition={home.way.imagePosition}
        leftContent={
          <div className="max-w-md">
            <p className="text-micro mb-4 tracking-[0.3em]">{home.way.eyebrow}</p>
            <SplitHeading
              line1={home.way.headline.line1}
              line2={home.way.headline.line2}
              size="clamp(2rem, 4.5vw, 3.8rem)"
              className="mb-6"
            />
            {home.way.paragraphs.map((p, i) => (
              <p key={i} className="text-sm md:text-base text-background/70 leading-[1.8] mb-4">
                {p}
              </p>
            ))}
            <p className="font-serif-elegant italic text-base md:text-lg text-background">
              {home.way.signoff}
            </p>
          </div>
        }
      />

      {/* FOUNDERS + APPROACH + SERVICES — single ScrollAdventure, 3 pages */}
      <ScrollAdventure
        pages={[
          {
            leftBgImage: img(home.servicesPanel.image),
            leftBgImagePosition: home.servicesPanel.imagePosition,
            rightBgImage: null,
            leftContent: null,
            rightContent: (
              <div className="max-w-lg w-full">
                <p className="text-micro mb-4 tracking-[0.3em]">{home.servicesPanel.eyebrow}</p>
                <SplitHeading
                  line1={home.servicesPanel.headline.line1}
                  line2={home.servicesPanel.headline.line2}
                  size="clamp(2.5rem, 6vw, 5rem)"
                  className="mb-10"
                />
                <div className="space-y-px w-full" style={{ background: 'hsl(var(--background) / 0.08)' }}>
                  {home.servicesPanel.rows.map((s) => (
                    <Link
                      key={s.num}
                      to={s.href}
                      className="group flex items-center justify-between px-5 py-4 bg-foreground transition-colors duration-200 hover:bg-background/5"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-micro text-background/20 w-5">{s.num}</span>
                        <span style={{ fontFamily: 'Kelson Sans BG, sans-serif', fontSize: 'clamp(16px, 2vw, 24px)', color: 'hsl(var(--background))', letterSpacing: '0.05em' }}>{s.name}</span>
                        <span className="text-micro text-background/30">{s.tag}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-micro font-bold" style={{ color: 'hsl(354 100% 87%)' }}>{s.price}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-background/20 group-hover:text-background/60 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to={home.servicesPanel.cta.href} className="btn-inline text-secondary inline-flex items-center gap-2">
                    <span>{home.servicesPanel.cta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ),
          },
          {
            leftBgImage: img(home.foundersPanel.image),
            leftBgImagePosition: home.foundersPanel.imagePosition,
            leftBgImageGrayscale: true,
            rightBgImage: null,
            leftContent: null,
            rightContent: (
              <div className="max-w-lg">
                <p className="text-micro mb-4 tracking-[0.3em]">{home.foundersPanel.eyebrow}</p>
                <SplitHeading
                  line1={home.foundersPanel.headline.line1}
                  line2={home.foundersPanel.headline.line2}
                  size="clamp(2.5rem, 6vw, 5rem)"
                  className="mb-8"
                />
                <p className="font-serif-elegant italic text-base md:text-lg text-secondary mb-6">
                  {home.foundersPanel.lede}
                </p>
                <p className="text-sm md:text-base text-background/60 leading-[1.8]">
                  {home.foundersPanel.body}
                </p>
                <p className="text-xs text-background/30 mt-6">{home.foundersPanel.note}</p>
                <div className="mt-8">
                  <Link to={home.foundersPanel.cta.href} className="btn-inline text-secondary inline-flex items-center gap-2">
                    <span>{home.foundersPanel.cta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ),
          },
          {
            leftBgImage: null,
            rightBgImage: img(home.approachPanel.image),
            rightBgImagePosition: home.approachPanel.imagePosition,
            leftContent: (
              <div className="max-w-xl w-full">
                <p className="text-micro mb-4 tracking-[0.3em]">{home.approachPanel.eyebrow}</p>
                <SplitHeading
                  line1={home.approachPanel.headline.line1}
                  line2={home.approachPanel.headline.line2}
                  size="clamp(2.2rem, 5vw, 4rem)"
                  className="mb-8"
                />

                {/* 4 approach cards — 2x2 grid */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-8"
                  style={{ background: 'hsl(var(--background) / 0.08)' }}
                >
                  {home.approachPanel.cards.map((c) => (
                    <div key={c.num} className="bg-foreground p-5 md:p-6">
                      <span className="text-micro text-primary/60 mb-2 block">{c.num}</span>
                      <p
                        style={{
                          fontFamily: "'Kelson Sans BG', sans-serif",
                          fontWeight: 700,
                          fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                          color: 'hsl(36 21% 95%)',
                          letterSpacing: '0.01em',
                          lineHeight: 1.2,
                          marginBottom: '0.55rem',
                        }}
                      >
                        {c.title}
                      </p>
                      <p
                        className="leading-[1.6]"
                        style={{ color: 'hsl(36 21% 95% / 0.55)', fontSize: 'clamp(0.72rem, 0.85vw, 0.82rem)' }}
                      >
                        {c.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Languages strip */}
                <div className="flex items-center gap-5">
                  <p
                    className="text-micro shrink-0"
                    style={{ color: 'hsl(36 21% 95% / 0.5)', maxWidth: '8rem', lineHeight: 1.4, whiteSpace: 'pre-line' }}
                  >
                    {home.approachPanel.languages.label}
                  </p>
                  <div
                    className="flex-1 grid grid-cols-4 gap-px"
                    style={{ background: 'hsl(var(--background) / 0.08)' }}
                  >
                    {home.approachPanel.languages.items.map((l) => (
                      <div key={l.code} className="bg-foreground py-3 px-3 text-center">
                        <p
                          style={{
                            fontFamily: "'Kelson Sans BG', sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: 'hsl(354 100% 87%)',
                            letterSpacing: '0.1em',
                            lineHeight: 1,
                            marginBottom: 4,
                          }}
                        >
                          {l.code}
                        </p>
                        <p
                          className="text-micro"
                          style={{ color: 'hsl(36 21% 95% / 0.45)', letterSpacing: '0.18em' }}
                        >
                          {l.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            rightContent: null,
          },
        ]}
      />

      {/* CASE STUDIES — Zwetschke card grid */}
      <section className="bg-foreground">
        <div className="container-wide pt-16 md:pt-28 pb-16 md:pb-20">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-micro mb-4 tracking-[0.3em] text-primary">{home.cases.eyebrow}</p>
              <SplitHeading
                line1={home.cases.headline.line1}
                line2={home.cases.headline.line2}
                size="clamp(2.5rem, 6vw, 5rem)"
              />
            </div>
            <Link to="/work" className="hidden md:inline-flex items-center gap-2 text-micro text-primary/60 hover:text-primary transition-colors duration-300 pb-1">
              <span>{home.cases.seeAllLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card grid */}
          <div className="flex flex-col gap-px" style={{ background: 'hsl(var(--background) / 0.12)' }}>
          {/* 3 case cards — single uniform grid */}
          <div className="flex flex-col md:flex-row gap-px">
            {home.cases.cards.map((card, i) => (
              <HoverEyes key={i} style={{ flex: 1 }} onClick={() => navigate(`/work/${card.slug}`)}>
                <motion.div
                  className="relative overflow-hidden group"
                  style={{ minHeight: 'clamp(300px, 44vh, 480px)', height: '100%' }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Background image */}
                  <img
                    src={img(card.img)}
                    alt={card.client}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ filter: 'brightness(0.55) saturate(0.8)' }}
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 100%)',
                  }} />
                  {/* Client tag — top left */}
                  <div className="absolute top-7 left-7 z-10">
                    <p style={{
                      fontSize: '9px', color: 'rgba(255,255,255,0.55)',
                      letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                    }}>{card.client}</p>
                    <p style={{
                      fontSize: '8px', color: 'rgba(255,255,255,0.32)',
                      letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '3px',
                    }}>{card.tag}</p>
                  </div>
                  {/* Stat pill — top right */}
                  <div className="absolute top-7 right-7 z-10" style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    padding: '5px 11px',
                    borderRadius: 999,
                  }}>
                    <p style={{
                      fontSize: '8.5px', color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
                    }}>{card.stat}</p>
                  </div>
                  {/* Headline — bottom left */}
                  <div className="absolute bottom-7 left-7 right-7 z-10">
                    <p style={{
                      fontFamily: 'Kelson Sans BG, sans-serif',
                      fontSize: 'clamp(28px, 3.6vw, 56px)',
                      color: '#fff',
                      lineHeight: 0.92,
                      letterSpacing: '0.02em',
                      whiteSpace: 'pre-line',
                      textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    }}>{card.headline}</p>
                  </div>
                </motion.div>
              </HoverEyes>
            ))}
          </div>

        </div>

          {/* Mobile CTA */}
          <div className="md:hidden pt-8">
            <Link to="/work" className="btn-inline text-secondary inline-flex items-center gap-2">
              <span>{home.cases.mobileCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK CHECK — IS THIS FOR ME? */}
      <section className="bg-foreground" style={{ paddingTop: 'clamp(1.6rem, 3vw, 2.6rem)', paddingBottom: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
        <div className="container-wide">
          <p className="text-micro mb-4 tracking-[0.3em] text-primary">{home.quickCheck.eyebrow}</p>
          <SplitHeading
            line1={home.quickCheck.headline.line1}
            line2={home.quickCheck.headline.line2}
            size="clamp(1.8rem, 4vw, 3.2rem)"
            className="mb-5"
          />

          {/* 2/3 + 1/3 layout */}
          <div className="flex flex-col lg:flex-row gap-px" style={{ background: 'hsl(var(--background) / 0.08)' }}>
            {/* Left — 2/3: the 4 points */}
            <div className="lg:w-2/3 flex flex-col bg-foreground">
              {home.quickCheck.items.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start"
                  style={{
                    gap: 'clamp(0.9rem, 2vw, 2rem)',
                    padding: 'clamp(0.55rem, 1.1vw, 0.95rem) clamp(1.1rem, 2vw, 1.8rem)',
                    borderTop: i === 0 ? 'none' : '1px solid hsl(var(--background) / 0.1)',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "'Kelson Sans BG', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.3rem, 2vw, 1.9rem)',
                      lineHeight: 1,
                      color: 'transparent',
                      WebkitTextStroke: '1.2px hsl(354 100% 87% / 0.75)',
                      flexShrink: 0,
                      width: 'clamp(2rem, 3.2vw, 2.8rem)',
                      paddingTop: '0.05em',
                    }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="text-background/75"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(0.88rem, 1vw, 1.04rem)',
                      lineHeight: 1.5,
                      maxWidth: '46ch',
                      margin: 0,
                    }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right — 1/3: cinematic phone animation */}
            <div className="lg:w-1/3 bg-foreground flex items-center justify-center relative overflow-hidden" style={{ minHeight: 'clamp(240px, 34vh, 380px)' }}>
              <PhoneCinematicAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* BLOG */}
      <BlogSection />

      {/* CTA */}
      <YesCTA />
    </div>
  );
};

export default Home;
