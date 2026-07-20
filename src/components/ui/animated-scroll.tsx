import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface SplitTransitionProps {
  leftImage?: string;
  rightImage?: string;
  leftImagePosition?: string;
  rightImagePosition?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const SplitTransition: React.FC<SplitTransitionProps> = ({
  leftImage,
  rightImage,
  leftImagePosition = 'center',
  rightImagePosition = 'center',
  leftContent,
  rightContent,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-12% 0px -12% 0px' });
  const reduced = useReducedMotion();

  const reveal = (fromLeft: boolean) => ({
    initial: { clipPath: fromLeft ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
    animate: inView ? { clipPath: 'inset(0 0% 0 0%)' } : {},
    transition: { duration: reduced ? 0 : 1.2, ease: EASE, delay: reduced ? 0 : 0.05 },
  });

  const imgScale = reduced
    ? {}
    : {
        initial: { scale: 1.12 },
        animate: inView ? { scale: 1 } : { scale: 1.12 },
        transition: { duration: 1.6, ease: EASE, delay: 0.05 },
      };

  const textVariants = {
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
  };

  const renderImageSide = (img: string, side: 'left' | 'right') => (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ willChange: 'clip-path' }}
      {...reveal(side === 'left')}
    >
      <motion.img
        src={img}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          filter: 'brightness(0.98) saturate(1.02)',
          willChange: 'transform',
          objectPosition: side === 'left' ? leftImagePosition : rightImagePosition,
        }}
        {...imgScale}
      />
      {/* Soft warm vignette to nestle into the off-white page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 50%, transparent 55%, hsl(0 0% 0% / 0.18) 100%)',
        }}
      />
    </motion.div>
  );

  const renderTextSide = (content: React.ReactNode, delay: number) => (
    <motion.div
      className="relative z-10 flex items-center justify-center h-full px-6 sm:px-10 md:px-14 lg:px-20 py-16 md:py-24"
      variants={textVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: reduced ? 0 : 0.95, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {content}
    </motion.div>
  );

  return (
    <section
      ref={containerRef}
      className={`relative grid grid-cols-1 md:grid-cols-2 ${className}`}
      style={{ minHeight: className?.includes('flex-1') ? undefined : 'clamp(460px, 56vh, 640px)' }}
    >
      {/* LEFT */}
      <div className="relative overflow-hidden bg-foreground" style={{ minHeight: className?.includes('flex-1') ? undefined : 'clamp(280px, 56vh, 640px)' }}>
        {leftImage && renderImageSide(leftImage, 'left')}
        {leftContent && renderTextSide(leftContent, 0.18)}
      </div>

      {/* RIGHT */}
      <div className="relative overflow-hidden bg-foreground" style={{ minHeight: className?.includes('flex-1') ? undefined : 'clamp(280px, 56vh, 640px)' }}>
        {rightImage && renderImageSide(rightImage, 'right')}
        {rightContent && renderTextSide(rightContent, 0.32)}
      </div>
    </section>
  );
};

export { SplitTransition };
export default SplitTransition;
