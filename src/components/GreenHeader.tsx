// Page header shared by every page except the home page: a deep-green band
// with a pink title (solid lead + outlined accent, the brand's "hollow" type),
// and an optional intro / extra content on the right.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const GREEN = 'hsl(89 71% 15%)';
const ROSA = 'hsl(354 100% 87%)';
const OFFWHITE = 'hsl(36 21% 95%)';

interface Props {
  /** Solid part of the title (pink). */
  lead: string;
  /** Outlined part of the title (pink stroke), rendered on its own line. */
  accent?: string;
  /** Short text on the right. */
  intro?: string;
  /** Anything else for the right column (links, a table of contents…). */
  children?: React.ReactNode;
}

const GreenHeader: React.FC<Props> = ({ lead, accent, intro, children }) => {
  const reduce = useReducedMotion();
  const hasAside = Boolean(intro || children);
  return (
    <header style={{ background: GREEN, color: OFFWHITE }}>
      <style>{`
        .gh-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(2rem, 6vw, 7rem); align-items: end; }
        @media (max-width: 860px) { .gh-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="container-wide" style={{ paddingTop: 'calc(88px + clamp(4rem, 10vh, 8rem))', paddingBottom: 'clamp(3.5rem, 8vh, 6rem)' }}>
        <div className={hasAside ? 'gh-grid' : undefined}>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Kelson Sans BG', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 9vw, 9rem)', lineHeight: 1.12, textTransform: 'uppercase', color: ROSA, margin: 0, padding: '0.08em 0.025em', overflowWrap: 'anywhere' }}
          >
            <span style={{ display: 'block' }}>{lead.trim()}</span>
            {accent && (
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: `2px ${ROSA}` }}>{accent.trim()}</span>
            )}
          </motion.h1>

          {hasAside && (
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
            >
              {intro && (
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(1rem, 1.25vw, 1.15rem)', lineHeight: 1.65, color: 'hsl(36 21% 95% / 0.85)', maxWidth: '34ch', margin: children ? '0 0 2.5rem' : 0 }}>
                  {intro}
                </p>
              )}
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default GreenHeader;
