import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import { blogArticles, blogPage, img } from '@/content';

const ROSA = 'hsl(354 100% 87%)';
const CREAM = 'hsl(36 21% 95%)';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const Blog: React.FC = () => (
  <div style={{ minHeight: '100vh', background: 'hsl(0 0% 13%)' }}>
    <TopNav />

    {/* ── Header ── */}
    <section style={{ padding: 'clamp(8rem, 16vh, 11rem) clamp(1.5rem, 5vw, 5rem) clamp(2.5rem, 5vw, 4rem)', position: 'relative', overflow: 'hidden' }}>
      <motion.p
        {...reveal(0)}
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: ROSA, marginBottom: '1rem' }}
      >
        {blogPage.listing.eyebrow}
      </motion.p>
      <motion.h1
        {...reveal(0.08)}
        style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(2.6rem, 8vw, 6rem)', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 }}
      >
        <span style={{ color: CREAM }}>{blogPage.listing.headline.lead}</span>
        <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{blogPage.listing.headline.accent}</span>
      </motion.h1>
      <motion.p
        {...reveal(0.16)}
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', color: 'hsl(36 21% 95% / 0.55)', marginTop: '1.2rem', maxWidth: '46ch', lineHeight: 1.7 }}
      >
        {blogPage.listing.tagline}
      </motion.p>
    </section>

    {/* ── Article grid ── */}
    <section style={{ padding: '0 clamp(1.5rem, 5vw, 5rem) clamp(4rem, 8vw, 7rem)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 'clamp(0.8rem, 1.5vw, 1.2rem)' }}>
        {blogArticles.map((article, i) => (
          <motion.div key={article.id} {...reveal(i * 0.08)}>
            <Link
              to={`/blog/${article.id}`}
              className="group"
              style={{ display: 'block', position: 'relative', overflow: 'hidden', borderRadius: 8, minHeight: 'clamp(320px, 44vh, 440px)', textDecoration: 'none' }}
            >
              <img
                src={img(article.image)}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.5) saturate(0.8)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.2) 55%, transparent 85%)' }} />
              <span style={{ position: 'absolute', top: 18, right: 18, fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', color: 'hsl(36 21% 95% / 0.4)' }}>
                {article.number}
              </span>
              <div style={{ position: 'absolute', left: 'clamp(18px, 3vw, 26px)', right: 'clamp(18px, 3vw, 26px)', bottom: 'clamp(18px, 3vw, 26px)' }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ROSA, marginBottom: 10 }}>
                  {article.category}
                </p>
                <h2 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)', lineHeight: 1.1, textTransform: 'uppercase', color: CREAM, margin: 0 }}>
                  {article.title}
                </h2>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.8rem', lineHeight: 1.65, color: 'hsl(36 21% 95% / 0.62)', marginTop: 8 }}>
                  {article.excerpt}
                </p>
                <span
                  className="inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-[hsl(354,100%,87%)]"
                  style={{ marginTop: 14, fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: CREAM }}
                >
                  {blogPage.listing.readLabel}
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    <YesCTA />
    <Footer />
  </div>
);

export default Blog;
