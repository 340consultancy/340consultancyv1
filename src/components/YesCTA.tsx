import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SplitHeading from '@/components/SplitHeading';
import { cta } from '@/content';

type Step = 'idle' | 'confirming' | 'input';

const AnimatedCheck = () => (
  <motion.svg
    width="22" height="22" viewBox="0 0 22 22" fill="none"
    style={{ display: 'inline-block', marginLeft: 14, verticalAlign: 'middle', marginBottom: 3 }}
  >
    <motion.path
      d="M3.5 11.5L9 17L18.5 5.5"
      stroke="hsl(354 100% 87%)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
    />
  </motion.svg>
);

const YesCTA: React.FC = () => {
  const [step, setStep] = useState<Step>('idle');
  const [hovered, setHovered] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // Magnetic spring values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 130, damping: 14, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 130, damping: 14, mass: 0.6 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }, [mx, my]);

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }, [mx, my]);

  const handleYes = () => {
    if (step !== 'idle') return;
    setStep('confirming');
    setTimeout(() => {
      setStep('input');
      setTimeout(() => inputRef.current?.focus(), 60);
    }, 1000);
  };

  const handleGo = () => {
    if (!name.trim()) return;
    navigate('/contact', { state: { name: name.trim() } });
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'hsl(0 0% 13%)',
        paddingTop: 'clamp(1.75rem, 3.5vw, 2.75rem)',
        paddingBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
      }}
    >
      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', maxWidth: 640, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, hsl(36 21% 95% / 0.08) 50%, transparent 100%)',
          marginBottom: 'clamp(1rem, 2vw, 1.6rem)',
          transformOrigin: 'center',
        }}
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700, fontSize: '0.5rem',
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'hsl(354 100% 87%)',
          marginBottom: '1.25rem',
        }}
      >
        {cta.eyebrow}
      </motion.p>

      {/* Headline — half white solid, half pink outlined */}
      <div style={{ marginBottom: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>
        <SplitHeading
          line1={cta.headline.line1}
          line2={cta.headline.line2}
          size="clamp(2.6rem, 6vw, 5rem)"
          align="center"
        />
      </div>

      {/* Interaction area */}
      <div style={{ position: 'relative', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Ambient glow — follows button state */}
        <motion.div
          animate={{
            opacity: step === 'confirming' ? 1 : hovered ? 0.8 : 0.35,
          }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 560, height: 220,
            borderRadius: '50%',
            background: step === 'confirming'
              ? 'radial-gradient(ellipse, hsl(89 71% 15% / 0.22) 0%, transparent 68%)'
              : hovered
              ? 'radial-gradient(ellipse, hsl(89 71% 15% / 0.14) 0%, transparent 68%)'
              : 'radial-gradient(ellipse, hsl(354 100% 87% / 0.22) 0%, transparent 68%)',
            filter: 'blur(1px)',
            pointerEvents: 'none',
            transition: 'background 0.8s ease',
            zIndex: 0,
          }}
        />

        <AnimatePresence mode="wait">
          {step !== 'input' ? (
            /* Magnetic wrapper */
            <motion.div
              key="yes-magnetic"
              ref={btnRef}
              style={{ x: sx, y: sy, zIndex: 1 }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              initial={{ opacity: 0, y: 24, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, y: -20, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <motion.button
                onClick={handleYes}
                onMouseEnter={() => setHovered(true)}
                animate={
                  step === 'confirming'
                    ? { scale: [1, 1.1, 0.94, 1.05, 1] }
                    : { scale: 1 }
                }
                transition={
                  step === 'confirming'
                    ? { duration: 0.85, times: [0, 0.22, 0.5, 0.72, 1], ease: 'easeInOut' }
                    : { type: 'spring', stiffness: 260, damping: 22 }
                }
                style={{
                  borderRadius: 9999,
                  padding: '24px 72px',
                  cursor: step === 'idle' ? 'pointer' : 'default',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700, fontSize: '1.25rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  outline: 'none',
                  border: 'none',
                  background: (step === 'confirming' || hovered)
                    ? 'hsl(89 71% 15%)'
                    : 'hsl(354 100% 87%)',
                  color: (step === 'confirming' || hovered)
                    ? 'hsl(354 100% 87%)'
                    : 'hsl(89 71% 15%)',
                  boxShadow: (step === 'confirming' || hovered)
                    ? '0 6px 32px -4px hsl(89 71% 15% / 0.45)'
                    : '0 4px 28px -4px hsl(354 100% 87% / 0.5)',
                  transition: 'background 0.42s ease, color 0.42s ease, box-shadow 0.42s ease',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnimatePresence mode="wait">
                    {step === 'confirming' ? (
                      <motion.span
                        key="yes-check"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        {cta.yesLabel} <AnimatedCheck />
                      </motion.span>
                    ) : (
                      <motion.span key="yes-label">{cta.yesLabel}</motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="input-row"
              initial={{ opacity: 0, scale: 0.95, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28, delay: 0.04 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', zIndex: 1 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                <motion.label
                  htmlFor="yes-cta-name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700, fontSize: '0.6rem',
                    letterSpacing: '0.32em', textTransform: 'uppercase',
                    color: 'hsl(36 21% 95% / 0.3)',
                  }}
                >
                  {cta.nameLabel}
                </motion.label>
                <input
                  id="yes-cta-name"
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGo()}
                  placeholder={cta.namePlaceholder}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid hsl(36 21% 95% / 0.16)',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                    color: 'hsl(36 21% 95%)',
                    outline: 'none',
                    textAlign: 'center',
                    minWidth: 'min(380px, 80vw)',
                    paddingBottom: '0.55rem',
                    letterSpacing: '-0.01em',
                    caretColor: 'hsl(354 100% 87%)',
                  }}
                />
              </div>

              <motion.button
                onClick={handleGo}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'hsl(89 71% 15%)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'hsl(354 100% 87%)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px -4px hsl(89 71% 15% / 0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'hsl(354 100% 87%)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'hsl(89 71% 15%)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 22px -4px hsl(354 100% 87% / 0.45)';
                }}
                style={{
                  borderRadius: 9999,
                  padding: '18px 52px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700, fontSize: '0.8rem',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'hsl(89 71% 15%)',
                  background: 'hsl(354 100% 87%)',
                  border: 'none',
                  boxShadow: '0 4px 22px -4px hsl(354 100% 87% / 0.45)',
                  cursor: 'pointer', outline: 'none',
                  transition: 'background 0.38s ease, color 0.38s ease, box-shadow 0.38s ease',
                }}
              >
                {cta.goLabel}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          width: '100%', maxWidth: 640, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, hsl(36 21% 95% / 0.08) 50%, transparent 100%)',
          marginTop: 'clamp(1rem, 2vw, 1.6rem)',
          transformOrigin: 'center',
        }}
      />
    </section>
  );
};

export default YesCTA;
