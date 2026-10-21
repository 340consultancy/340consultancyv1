import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import { blogArticles, blogPage, img } from '@/content';

const ROSA = 'hsl(354 100% 87%)';
const CREAM = 'hsl(36 21% 95%)';

const headingStyle: React.CSSProperties = {
  fontFamily: "'Kelson Sans BG', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
  lineHeight: 1.15,
  textTransform: 'uppercase',
  color: CREAM,
  margin: 'clamp(1.8rem, 3vw, 2.4rem) 0 0.9rem',
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 'clamp(0.92rem, 1.15vw, 1.02rem)',
  lineHeight: 1.9,
  color: 'hsl(36 21% 95% / 0.68)',
  margin: '0 0 1.1rem',
};

/**
 * Render the plain-text article body: blank lines separate paragraphs,
 * lines starting with "## " become subheadings (a paragraph may follow a
 * heading on the very next line).
 */
const ArticleBody: React.FC<{ body: string }> = ({ body }) => {
  const nodes: React.ReactNode[] = [];
  let paragraph: string[] = [];

  const flush = (key: string) => {
    if (paragraph.length === 0) return;
    nodes.push(<p key={key} style={paragraphStyle}>{paragraph.join(' ')}</p>);
    paragraph = [];
  };

  body.split('\n').forEach((rawLine, i) => {
    const line = rawLine.trim();
    if (line === '') {
      flush(`p-${i}`);
    } else if (line.startsWith('## ')) {
      flush(`p-${i}`);
      nodes.push(<h2 key={`h-${i}`} style={headingStyle}>{line.slice(3)}</h2>);
    } else {
      paragraph.push(line);
    }
  });
  flush('p-end');

  return <>{nodes}</>;
};

const BlogArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = blogArticles.find((a) => a.id === id);
  const others = blogArticles.filter((a) => a.id !== id).slice(0, 2);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(0 0% 13%)' }}>
      <TopNav />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 'clamp(46vh, 56vh, 64vh)', minHeight: 340, overflow: 'hidden', background: 'hsl(0 0% 5%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <motion.img
          src={img(article.image)}
          alt=""
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, hsl(0 0% 5% / 0.4) 0%, transparent 40%, hsl(0 0% 5% / 0.75) 80%, hsl(0 0% 5%) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, padding: 'clamp(1.5rem, 5vw, 4rem)' }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: ROSA, marginBottom: '1rem' }}
          >
            {article.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 4.6vw, 3.8rem)', lineHeight: 0.95, textTransform: 'uppercase', color: CREAM, margin: 0 }}
          >
            {article.title}
          </motion.h1>
          {(article.author || article.publishedDate) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.4)', marginTop: '1.1rem' }}
            >
              {article.author ? `${blogPage.article.byLabel} ${article.author}` : ''}
              {article.author && article.publishedDate ? ' · ' : ''}
              {article.publishedDate ?? ''}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Back link ── */}
      <div style={{ padding: 'clamp(1.2rem, 2vw, 1.8rem) clamp(1.5rem, 5vw, 4rem) 0' }}>
        <Link
          to="/blog"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.58rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.35)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ROSA)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'hsl(36 21% 95% / 0.35)')}
        >
          <ArrowLeft size={12} />
          {blogPage.article.backLabel}
        </Link>
      </div>

      {/* ── Body ── */}
      <article style={{ maxWidth: 760, padding: 'clamp(1.6rem, 3.5vw, 3rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)' }}>
        <p style={{ fontFamily: "'Montserrat', serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.9vw, 1.5rem)', lineHeight: 1.5, color: 'hsl(36 21% 95% / 0.85)', marginBottom: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
          {article.excerpt}
        </p>
        {article.body && <ArticleBody body={article.body} />}
      </article>

      {/* ── More articles ── */}
      {others.length > 0 && (
        <section style={{ padding: '0 clamp(1.5rem, 5vw, 4rem) clamp(3.5rem, 7vw, 6rem)' }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.48rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'hsl(36 21% 95% / 0.3)', marginBottom: '0.7rem' }}>
            {blogPage.article.moreEyebrow}
          </p>
          <h2 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 0.9, textTransform: 'uppercase', margin: '0 0 clamp(1.4rem, 2.5vw, 2rem)' }}>
            <span style={{ color: CREAM }}>{blogPage.article.moreHeadline.lead}</span>
            <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ROSA}` }}>{blogPage.article.moreHeadline.accent}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(0.8rem, 1.5vw, 1.2rem)' }}>
            {others.map((other) => (
              <Link
                key={other.id}
                to={`/blog/${other.id}`}
                className="group"
                style={{ display: 'block', position: 'relative', overflow: 'hidden', borderRadius: 8, minHeight: 'clamp(220px, 30vh, 300px)', textDecoration: 'none' }}
              >
                <img
                  src={img(other.image)}
                  alt={other.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.5) saturate(0.8)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20 }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: ROSA, marginBottom: 8 }}>
                    {other.category}
                  </p>
                  <h3 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', lineHeight: 1.12, textTransform: 'uppercase', color: CREAM, margin: 0 }}>
                    {other.title}
                  </h3>
                  <span
                    className="inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-[hsl(354,100%,87%)]"
                    style={{ marginTop: 10, fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', color: 'hsl(36 21% 95% / 0.7)' }}
                  >
                    {blogPage.listing.readLabel}
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <YesCTA />
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
