import React, { useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  tag?: string;
}

const HoverEyes: React.FC<Props> = ({ children, style, className, onClick, tag }) => {
  const [visible, setVisible] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Track the pointer directly (no spring) so the eyes don't bounce or trail.
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  const onMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      lastPos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    },
    [x, y],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      lastPos.current = { x: e.clientX, y: e.clientY };
    },
    [x, y],
  );

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <div
        style={{ position: 'relative', cursor: 'none', ...style }}
        className={className}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {children}
      </div>

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              key="hover-eyes-overlay"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x,
                y,
                translateX: '-50%',
                translateY: '-60%',
                translateZ: 0,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                pointerEvents: 'none',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
            >
              <span
                style={{
                  fontSize: 72,
                  lineHeight: 1,
                  display: 'block',
                  userSelect: 'none',
                  filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.45))',
                }}
                aria-hidden="true"
              >
                👀
              </span>

              {tag && (
                <div
                  style={{
                    background: 'hsl(354 100% 87%)',
                    padding: '5px 10px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.52rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tag}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default HoverEyes;
