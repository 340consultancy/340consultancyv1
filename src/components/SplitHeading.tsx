import React from 'react';

interface Props {
  line1: string;
  line2: string;
  size?: string;
  align?: 'left' | 'center' | 'right';
  strokeColor?: string;
  solidColor?: string;
  className?: string;
}

/**
 * Hero-style split heading: line 1 solid off-white, line 2 outlined pink.
 * Static (no enter animation) for reliable rendering inside scroll-based parents.
 */
const SplitHeading: React.FC<Props> = ({
  line1,
  line2,
  size = 'clamp(2.5rem, 6vw, 5.5rem)',
  align = 'left',
  strokeColor = 'hsl(354 100% 87%)',
  solidColor = 'hsl(36 21% 95%)',
  className,
}) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: "'Kelson Sans BG', sans-serif",
    fontWeight: 700,
    fontSize: size,
    lineHeight: 0.9,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
    textAlign: align,
    margin: 0,
  };

  return (
    <div className={className} style={{ textAlign: align }}>
      <h2 style={{ ...baseStyle, color: solidColor }}>{line1}</h2>
      <h2
        style={{
          ...baseStyle,
          color: 'transparent',
          WebkitTextStroke: `1.5px ${strokeColor}`,
        }}
      >
        {line2}
      </h2>
    </div>
  );
};

export default SplitHeading;
