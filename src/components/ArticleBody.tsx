import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PtBlock } from '@/lib/sanity/portable-text';

// Moved from BlogArticlePage.tsx with the legacy plain-text renderer.
const headingStyle: React.CSSProperties = {
  fontFamily: "'Kelson Sans BG', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
  lineHeight: 1.15,
  textTransform: 'uppercase',
  color: 'hsl(36 21% 95%)',
  margin: 'clamp(1.8rem, 3vw, 2.4rem) 0 0.9rem',
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 'clamp(0.92rem, 1.15vw, 1.02rem)',
  lineHeight: 1.9,
  color: 'hsl(36 21% 95% / 0.68)',
  margin: '0 0 1.1rem',
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p style={paragraphStyle}>{children}</p>,
    h2: ({ children }) => <h2 style={headingStyle}>{children}</h2>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  },
};

/** Article body written in the Sanity rich-text editor. */
const ArticleBody: React.FC<{ body: PtBlock[] }> = ({ body }) => (
  <PortableText value={body} components={components} />
);

export default ArticleBody;
