import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import PageHero from '@/components/PageHero';
import Testimonials from '@/components/Testimonials';
import HoverEyes from '@/components/HoverEyes';
import ContentIndustryShowcase from '@/components/ContentIndustryShowcase';
import { useIsMobile } from '@/hooks/use-mobile';
import { services, servicesPage, img } from '@/content';

const ROSA = 'hsl(354 100% 87%)';

const ServicesPackages: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const openService = (idx: number) => navigate(`/services/${services[idx].key}`);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <PageHero
        title={[
          <>
            {servicesPage.hero.headline.lead}
            <span style={{ fontFamily: "'Kelson Sans BG', sans-serif", color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>
              {servicesPage.hero.headline.accent}
            </span>
          </>,
        ]}
        tagline={servicesPage.hero.tagline}
        image={img(servicesPage.hero.image)}
        imagePosition={servicesPage.hero.imagePosition}
        scrollLabel={servicesPage.hero.scrollLabel}
        imageOpacity={0.72}
        lightPhoto
      />

      {/* ===== OUR SERVICES — moved to top (feedback #30) ===== */}
      <section id="services-bento" className="section-padding bg-foreground">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-micro tracking-[0.3em] mb-3" style={{ color: 'hsl(36 21% 95% / 0.4)' }}>{servicesPage.bento.eyebrow}</p>
              <h2 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 0.9, color: 'hsl(36 21% 95%)' }}>
                {servicesPage.bento.heading}
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-xs uppercase tracking-widest" style={{ color: 'hsl(36 21% 95% / 0.4)', fontFamily: "'Poppins', sans-serif" }}>
              {servicesPage.bento.hint}
            </p>
          </div>

          {/* Bento grid: row 1 = 2 wide cards, row 2 = 3 medium cards */}
          <div className="flex flex-col gap-px" style={{ background: 'hsl(36 21% 95% / 0.06)' }}>

            {/* ── Row 1: Strategy + Management ── */}
            <div className="flex flex-col md:flex-row gap-px">
              {[0, 1].map((idx) => (
                <HoverEyes key={idx} style={{ flex: 1 }} onClick={() => openService(idx)}>
                  <button className="relative overflow-hidden group text-left focus:outline-none w-full h-full"
                    style={{ minHeight: 'clamp(300px, 46vh, 500px)' }}>
                    <img src={img(services[idx].img)} alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.55) saturate(0.8)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.78) 100%)' }} />
                    {/* Price pill */}
                    <span className="absolute top-5 right-5 px-3 py-1.5 z-10"
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999 }}>
                      {services[idx].price}
                    </span>
                    {/* Hover chip — always visible on touch (no hover state) */}
                    <span className={`absolute top-5 left-5 px-2 py-1 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-10`}
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'white', background: ROSA, textTransform: 'uppercase', borderRadius: 999 }}>
                      {servicesPage.bento.viewDetailsLabel}
                    </span>
                    {/* Title */}
                    <p className="absolute bottom-6 left-6 z-10"
                      style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.6rem)', lineHeight: 0.92, whiteSpace: 'pre-line', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                      {services[idx].label}
                    </p>
                  </button>
                </HoverEyes>
              ))}
            </div>

            {/* ── Row 2: Coaching + Content + Workshops ── */}
            <div className="flex flex-col md:flex-row gap-px">
              {/* Coaching */}
              <HoverEyes style={{ flex: 1 }} onClick={() => openService(2)}>
                <button className="relative overflow-hidden group text-left focus:outline-none w-full h-full"
                  style={{ minHeight: 'clamp(240px, 36vh, 400px)' }}>
                  <img src={img(services[2].img)} alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.5) saturate(0.75)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)' }} />
                  <span className="absolute top-4 right-4 px-2.5 py-1 z-10"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999 }}>
                    {services[2].price}
                  </span>
                  <span className={`absolute top-4 left-4 px-2 py-1 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-10`}
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.5rem', letterSpacing: '0.2em', color: 'white', background: ROSA, textTransform: 'uppercase', borderRadius: 999 }}>
                    {servicesPage.bento.viewDetailsLabel}
                  </span>
                  <p className="absolute bottom-5 left-5 z-10"
                    style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)', lineHeight: 0.92, whiteSpace: 'pre-line', color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
                    {services[2].label}
                  </p>
                </button>
              </HoverEyes>

              {/* Content */}
              <HoverEyes style={{ flex: 1 }} onClick={() => openService(3)}>
                <button className="relative overflow-hidden group text-left focus:outline-none w-full h-full"
                  style={{ minHeight: 'clamp(240px, 36vh, 400px)' }}>
                  <img src={img(services[3].img)} alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.5) saturate(0.75)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)' }} />
                  <span className="absolute top-4 right-4 px-2.5 py-1 z-10"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999 }}>
                    {services[3].price}
                  </span>
                  <span className={`absolute top-4 left-4 px-2 py-1 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-10`}
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.5rem', letterSpacing: '0.2em', color: 'white', background: ROSA, textTransform: 'uppercase', borderRadius: 999 }}>
                    {servicesPage.bento.viewDetailsLabel}
                  </span>
                  <p className="absolute bottom-5 left-5 z-10"
                    style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)', lineHeight: 0.92, whiteSpace: 'pre-line', color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
                    {services[3].label}
                  </p>
                </button>
              </HoverEyes>

              {/* Workshops */}
              <HoverEyes style={{ flex: 1 }} onClick={() => openService(4)}>
                <button className="relative overflow-hidden group text-left focus:outline-none w-full h-full"
                  style={{ minHeight: 'clamp(240px, 36vh, 400px)' }}>
                  <img src={img(services[4].img)} alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.45) saturate(0.7)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.82) 100%)' }} />
                  {/* Tool chips */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                    {servicesPage.bento.workshopTools.map((tool) => (
                      <span key={tool} style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.48rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)', padding: '2px 7px', borderRadius: 999 }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="absolute top-4 right-4 px-2.5 py-1 z-10"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999 }}>
                    {services[4].price}
                  </span>
                  <div className="absolute bottom-5 left-5 z-10">
                    <p style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)', lineHeight: 0.92, whiteSpace: 'pre-line', color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
                      {services[4].label}
                    </p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginTop: '0.4rem' }}>
                      {servicesPage.bento.workshopNote}
                    </p>
                  </div>
                </button>
              </HoverEyes>
            </div>

          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — 4 steps (feedback #46), compact (feedback #48) ===== */}
      <section
        style={{
          background: 'hsl(0 0% 13%)',
          paddingTop: 'clamp(3rem,6vw,5rem)',
          paddingBottom: 'clamp(3rem,6vw,5rem)',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingLeft: 'clamp(1.5rem,5vw,5rem)',
            paddingRight: 'clamp(1.5rem,5vw,5rem)',
            marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.48rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: ROSA, marginBottom: '0.6rem' }}>
              {servicesPage.process.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "'Kelson Sans BG', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 4vw, 3.4rem)',
                lineHeight: 0.88,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: 'hsl(36 21% 95%)',
                margin: 0,
              }}
            >
              {servicesPage.process.headline.lead}
              <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{servicesPage.process.headline.accent}</span>
            </h2>
          </div>
          {/* body font instead of display serif (feedback #47) */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(0.72rem, 1vw, 0.82rem)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: 'hsl(36 21% 95% / 0.4)',
              lineHeight: 1.7,
              maxWidth: '30ch',
              textAlign: isMobile ? 'left' : 'right',
            }}
          >
            {servicesPage.process.sub}
          </p>
        </div>

        {/* Steps */}
        <div>
          {/* Top hairline */}
          <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.07)' }} />
          {servicesPage.process.steps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderBottom: '1px solid hsl(36 21% 95% / 0.07)',
                display: 'grid',
                gridTemplateColumns: isMobile ? 'clamp(2.25rem, 11vw, 3.25rem) 1fr' : 'clamp(3rem,6vw,6rem) 1fr auto',
                alignItems: 'center',
                columnGap: isMobile ? '1rem' : 'clamp(1rem,2vw,2.5rem)',
                rowGap: isMobile ? '0.45rem' : '0',
                paddingTop: 'clamp(1.1rem,2vw,1.6rem)',
                paddingBottom: 'clamp(1.1rem,2vw,1.6rem)',
                paddingLeft: 'clamp(1.5rem,5vw,5rem)',
                paddingRight: 'clamp(1.5rem,5vw,5rem)',
                cursor: 'default',
                transition: 'background 0.3s ease',
              }}
              whileHover={{ backgroundColor: 'hsl(36 21% 95% / 0.025)' } as any}
            >
              {/* Number */}
              <span
                style={{
                  gridRow: isMobile ? '1 / 3' : undefined,
                  alignSelf: 'center',
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: `1.5px ${ROSA}`,
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                }}
              >
                {step.phase}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.7rem)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'hsl(36 21% 95%)',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {step.title}
              </h3>

              {/* Description — body font (feedback #47) */}
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
                  fontWeight: 400,
                  color: 'hsl(36 21% 95% / 0.5)',
                  lineHeight: 1.7,
                  maxWidth: isMobile ? '100%' : '32ch',
                  textAlign: isMobile ? 'left' : 'right',
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* #340consultancy accent (feedback #50) */}
        <div style={{ textAlign: 'center', paddingTop: 'clamp(2.5rem,5vw,4rem)' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem,2.4vw,1.8rem)', letterSpacing: '-0.01em', color: ROSA }}>
            {servicesPage.process.hashtag}
          </span>
        </div>
      </section>

      {/* ===== EVERY INDUSTRY + CONTENT WE CREATE — "340 knows the way" style ===== */}
      <ContentIndustryShowcase />

      {/* TESTIMONIALS */}
      <Testimonials />

      <YesCTA />
      <Footer />
    </div>
  );
};

export default ServicesPackages;
