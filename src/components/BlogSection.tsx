import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitHeading from '@/components/SplitHeading';
import InstagramEmbeds from '@/components/InstagramEmbeds';
import { useIsMobile } from '@/hooks/use-mobile';
import { blogArticles, blogSection, igPostUrls, img, type BlogArticle } from '@/content';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────────────────────── */
/* Horizontal 3-column accordion                                              */
/* ────────────────────────────────────────────────────────────────────────── */

const BlogAccordion: React.FC<{ items: BlogArticle[] }> = ({ items }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);
  const [readLinkHovered, setReadLinkHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // ── Mobile: stack the cards full-width (no hover-to-expand on touch). Each
  //    card shows date + title + excerpt directly so nothing is hidden; the
  //    page itself scrolls down through all articles (no inner scroll box). ──
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        {items.map((article, i) => {
          const isComingSoon = article.category === 'Coming soon';
          return (
            <button
              key={article.id}
              onClick={() => navigate(`/blog/${article.id}`)}
              className="relative w-full overflow-hidden text-left"
              style={{
                minHeight: 'clamp(190px, 30vh, 240px)',
                borderBottom: i < items.length - 1 ? '1px solid hsl(36 21% 95% / 0.08)' : 'none',
              }}
            >
              <img
                src={img(article.image)}
                alt={article.title}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover select-none"
                style={{ filter: 'brightness(0.46) saturate(0.85)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.25) 50%, transparent 85%)' }}
              />
              <span
                className="absolute z-10 select-none"
                style={{ top: 18, right: 18, fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', color: 'hsl(36 21% 95% / 0.4)' }}
              >
                {article.number}
              </span>
              <div className="absolute z-10 flex flex-col" style={{ left: 'clamp(18px, 5vw, 28px)', right: 'clamp(18px, 5vw, 28px)', bottom: 'clamp(18px, 4vw, 28px)' }}>
                <p className="text-micro mb-2" style={{ color: 'hsl(354 100% 87%)', letterSpacing: '0.28em', fontFamily: "'Poppins', sans-serif", fontSize: 10 }}>
                  {isComingSoon ? blogSection.comingSoonLabel : article.category}
                </p>
                <h3 style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', lineHeight: 1.08, letterSpacing: '-0.01em', color: 'hsl(36 21% 95%)', textTransform: 'uppercase', margin: 0 }}>
                  {article.title}
                </h3>
                <p style={{ marginTop: 8, fontFamily: "'Poppins', sans-serif", fontSize: '0.8rem', lineHeight: 1.6, color: 'hsl(36 21% 95% / 0.62)' }}>
                  {article.excerpt}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // More than 3 articles → horizontal rail: exactly 3 visible, the rest
  // scrolls (snap per card). With up to 3, the classic hover-expand
  // accordion fills the row as before.
  const useRail = items.length > 3;

  return (
    <div
      className={`flex h-full w-full${useRail ? ' blog-rail overflow-x-auto' : ''}`}
      style={{ minHeight: 'inherit', ...(useRail ? { scrollSnapType: 'x mandatory' } : {}) }}
    >
      {items.map((article, i) => {
        const isHovered = hovered === i;
        const flexGrow = hovered === null ? 1 : isHovered ? 3 : 1;
        const isComingSoon = article.category === 'Coming soon';

        return (
          <button
            key={article.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/blog/${article.id}`)}
            className="relative h-full overflow-hidden text-left group focus:outline-none"
            style={{
              flex: useRail ? '0 0 calc(100% / 3)' : `${flexGrow} 1 0`,
              ...(useRail ? { scrollSnapAlign: 'start' } : {}),
              transition: 'flex-grow 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRight: i < items.length - 1 ? '1px solid hsl(36 21% 95% / 0.08)' : 'none',
              minWidth: 0,
            }}
          >
            {/* Background image */}
            <img
              src={img(article.image)}
              alt={article.title}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
                filter: isHovered
                  ? 'brightness(0.58) saturate(1.08)'
                  : 'brightness(0.42) saturate(0.8)',
                transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
              }}
            />

            {/* Gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.25) 45%, transparent 80%)',
              }}
            />

            {/* Pink left border strip */}
            <div
              className="absolute left-0 top-0 bottom-0 pointer-events-none"
              style={{
                width: 2,
                background: 'hsl(354 100% 87% / 0.7)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />

            {/* Number — top right */}
            <span
              className="absolute z-10 select-none"
              style={{
                top: 20,
                right: 20,
                fontFamily: "'Kelson Sans BG', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.28em',
                color: 'hsl(36 21% 95% / 0.35)',
              }}
            >
              {article.number}
            </span>

            {/* Coming soon watermark monogram */}
            {isComingSoon && (
              <span
                className="absolute z-10 select-none pointer-events-none"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.2rem, 3vw, 2.4rem)',
                  letterSpacing: '0.3em',
                  color: 'transparent',
                  WebkitTextStroke: '1px hsl(354 100% 87%)',
                  opacity: 0.22,
                  whiteSpace: 'nowrap',
                }}
              >
                {blogSection.comingSoonWatermark}
              </span>
            )}

            {/* Bottom content */}
            <div
              className="absolute z-10 flex flex-col"
              style={{
                left: 'clamp(18px, 2vw, 28px)',
                right: 'clamp(18px, 2vw, 28px)',
                bottom: 'clamp(20px, 3vw, 32px)',
              }}
            >
              {/* Eyebrow / date — pink */}
              <p
                className="text-micro mb-3"
                style={{
                  color: 'hsl(354 100% 87%)',
                  letterSpacing: '0.28em',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 10,
                }}
              >
                {article.category}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Kelson Sans BG', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.6rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  color: 'hsl(36 21% 95%)',
                  textTransform: 'uppercase',
                }}
              >
                {article.title}
              </h3>

              {/* Horizontal rule below title */}
              <hr
                style={{
                  border: 'none',
                  borderTop: '1px solid hsl(36 21% 95% / 0.12)',
                  width: '100%',
                  marginTop: 10,
                  marginBottom: 0,
                }}
              />

              {/* Excerpt + Read — only visible on hover (height + opacity) */}
              <div
                style={{
                  maxHeight: isHovered ? 220 : 0,
                  opacity: isHovered ? 1 : 0,
                  overflow: 'hidden',
                  transition:
                    'max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease',
                }}
              >
                <p
                  style={{
                    marginTop: 12,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.78rem',
                    lineHeight: 1.75,
                    color: 'hsl(36 21% 95% / 0.7)',
                  }}
                >
                  {article.excerpt}
                </p>
                <span
                  className="inline-flex items-center gap-2 mt-5"
                  onMouseEnter={() => setReadLinkHovered(i)}
                  onMouseLeave={() => setReadLinkHovered(null)}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    color:
                      readLinkHovered === i
                        ? 'hsl(354 100% 87%)'
                        : 'hsl(36 21% 95%)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {blogSection.readArticleLabel}
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Text side                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

interface TextSideProps {
  eyebrow: string;
  headline: [string, string];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
}

const TextSide: React.FC<TextSideProps> = ({ eyebrow, headline, body, ctaLabel, ctaHref, external }) => {
  const inner = (
    <>
      <span>{ctaLabel}</span>
      <ArrowRight className="w-4 h-4" />
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.85, ease: EASE }}
      className="flex flex-col justify-center bg-foreground overflow-hidden"
      style={{
        padding: 'clamp(1.5rem, 3.5vw, 3rem)',
        borderTop: 'none',
      }}
    >
      <p className="text-micro mb-3 tracking-[0.3em]">{eyebrow}</p>
      <SplitHeading
        line1={headline[0]}
        line2={headline[1]}
        size="clamp(1.6rem, 3.2vw, 2.8rem)"
        className="mb-4"
      />
      <p
        className="leading-[1.7] mb-6"
        style={{
          color: 'hsl(36 21% 95% / 0.65)',
          maxWidth: '32ch',
          fontSize: 'clamp(0.8rem, 0.95vw, 0.95rem)',
        }}
      >
        {body}
      </p>
      {external ? (
        <a
          href={ctaHref}
          target="_blank"
          rel="noreferrer"
          className="btn-inline text-primary inline-flex items-center gap-2 self-start"
          style={{ color: 'hsl(354 100% 87%)' }}
        >
          {inner}
        </a>
      ) : (
        <Link
          to={ctaHref}
          className="btn-inline text-primary inline-flex items-center gap-2 self-start"
          style={{ color: 'hsl(354 100% 87%)' }}
        >
          {inner}
        </Link>
      )}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Section                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

const BlogSection: React.FC = () => {
  // Each row exactly 50vh on desktop → both rows fit in one viewport.
  // On mobile, stack each cell with its own min-height for usable content.
  return (
    <section className="bg-foreground" aria-label="Blog and social posts">
      {/* ── Row 1: Blog accordion (left, 65%) | Text (right, 35%) ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[65fr_35fr] md:h-[50vh]"
      >
        <div className="relative overflow-hidden md:h-full">
          <BlogAccordion items={blogArticles} />
        </div>
        <TextSide
          eyebrow={blogSection.blogs.eyebrow}
          headline={blogSection.blogs.headline}
          body={blogSection.blogs.body}
          ctaLabel={blogSection.blogs.ctaLabel}
          ctaHref={blogSection.blogs.ctaHref}
          external={blogSection.blogs.external}
        />
      </div>

      {/* Row separator */}
      <div style={{ height: 1, background: 'hsl(36 21% 95% / 0.08)' }} />

      {/* ── Row 2: Text (left, 35%) | Instagram embeds (right, 65%) ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[35fr_65fr] md:h-[50vh]"
      >
        <TextSide
          eyebrow={blogSection.social.eyebrow}
          headline={blogSection.social.headline}
          body={blogSection.social.body}
          ctaLabel={blogSection.social.ctaLabel}
          ctaHref={blogSection.social.ctaHref}
          external={blogSection.social.external}
        />
        <div className="relative overflow-hidden h-[60vh] md:h-full">
          <InstagramEmbeds posts={igPostUrls} />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
