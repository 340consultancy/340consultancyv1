import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScrollPage {
  leftBgImage: string | null;
  rightBgImage: string | null;
  leftBgImagePosition?: string;
  rightBgImagePosition?: string;
  /** Start grayscale, reveal colour on hover */
  leftBgImageGrayscale?: boolean;
  leftContent: React.ReactNode | null;
  rightContent: React.ReactNode | null;
}

interface ScrollAdventureProps {
  pages: ScrollPage[];
}

const DELTA_THRESHOLD = 200;
const IDLE_RESET_MS = 400;

const ScrollAdventure: React.FC<ScrollAdventureProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);
  const animTime = 1600;
  const isInView = useRef(false);
  const isMobile = useIsMobile();

  // Delta accumulator for desktop scroll threshold
  const deltaAccum = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Grace period after arriving at a boundary page — blocks pass-through scroll
  const boundaryLock = useRef(false);
  const boundaryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateUp = useCallback(() => {
    setCurrentPage(p => {
      const next = p > 0 ? p - 1 : p;
      if (next === 0) {
        boundaryLock.current = true;
        if (boundaryTimer.current) clearTimeout(boundaryTimer.current);
        boundaryTimer.current = setTimeout(() => { boundaryLock.current = false; }, animTime + 600);
      }
      return next;
    });
  }, []);

  const navigateDown = useCallback(() => {
    setCurrentPage(p => {
      const next = p < pages.length - 1 ? p + 1 : p;
      if (next === pages.length - 1) {
        boundaryLock.current = true;
        if (boundaryTimer.current) clearTimeout(boundaryTimer.current);
        boundaryTimer.current = setTimeout(() => { boundaryLock.current = false; }, animTime + 600);
      }
      return next;
    });
  }, [pages.length]);

  // Track if component is in viewport — only hijack scroll when nearly fully visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isInView.current = entry.intersectionRatio > 0.85; },
      { threshold: [0.3, 0.5, 0.85, 1.0] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // On mobile, skip scroll hijacking entirely
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isInView.current) return;

      // At boundaries, let normal scroll happen — but only after grace period
      if (currentPage === 0 && e.deltaY < 0) {
        if (boundaryLock.current) { e.preventDefault(); deltaAccum.current = 0; return; }
        deltaAccum.current = 0; return;
      }
      if (currentPage === pages.length - 1 && e.deltaY > 0) {
        if (boundaryLock.current) { e.preventDefault(); deltaAccum.current = 0; return; }
        deltaAccum.current = 0; return;
      }

      e.preventDefault();

      if (scrolling.current) return;

      // Accumulate delta
      deltaAccum.current += e.deltaY;

      // Reset accumulator after idle
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => { deltaAccum.current = 0; }, IDLE_RESET_MS);

      // Only navigate when threshold exceeded
      if (Math.abs(deltaAccum.current) >= DELTA_THRESHOLD) {
        scrolling.current = true;
        deltaAccum.current > 0 ? navigateDown() : navigateUp();
        deltaAccum.current = 0;
        setTimeout(() => (scrolling.current = false), animTime);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView.current || scrolling.current) return;
      if (e.key === 'ArrowDown') {
        if (currentPage === pages.length - 1) return;
        e.preventDefault();
        scrolling.current = true;
        navigateDown();
        setTimeout(() => (scrolling.current = false), animTime);
      } else if (e.key === 'ArrowUp') {
        if (currentPage === 0) return;
        e.preventDefault();
        scrolling.current = true;
        navigateUp();
        setTimeout(() => (scrolling.current = false), animTime);
      }
    };

    // Touch support (kept for desktop touchscreens)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isInView.current || scrolling.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;
      if (currentPage === 0 && deltaY < 0) return;
      if (currentPage === pages.length - 1 && deltaY > 0) return;
      scrolling.current = true;
      deltaY > 0 ? navigateDown() : navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [currentPage, pages.length, navigateDown, navigateUp, isMobile]);

  // ── Mobile: no scroll-hijack, no split. Stack every page vertically so all
  //    content is reachable and full-width instead of trapped in a 50% column. ──
  if (isMobile) {
    return (
      <div className="bg-foreground">
        {pages.map((page, i) => {
          const img = page.leftBgImage || page.rightBgImage;
          const imgPos = page.leftBgImage ? page.leftBgImagePosition : page.rightBgImagePosition;
          const content = page.leftContent || page.rightContent;
          return (
            <section key={i} className="relative w-full">
              {img && (
                <div className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 42vh, 360px)' }}>
                  <img
                    src={img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: imgPos ?? 'center' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent 50%, hsl(0 0% 5% / 0.55) 100%)' }}
                  />
                </div>
              )}
              {content && (
                <div
                  className="px-6 sm:px-10"
                  style={{ paddingTop: 'clamp(2rem, 7vw, 3rem)', paddingBottom: 'clamp(2rem, 7vw, 3rem)' }}
                >
                  {content}
                </div>
              )}
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-foreground">
      {pages.map((page, i) => {
        const isActive = currentPage === i;
        const isPast = i < currentPage;
        const leftTransform = isActive
          ? 'translateY(0)'
          : isPast
          ? 'translateY(-100%)'
          : 'translateY(100%)';
        const rightTransform = isActive
          ? 'translateY(0)'
          : isPast
          ? 'translateY(100%)'
          : 'translateY(-100%)';

        return (
          <div key={i} className="absolute inset-0 flex" style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
            {/* Left Half */}
            <div
              className="w-1/2 h-full relative overflow-hidden transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: leftTransform,
                transitionDuration: `${animTime}ms`,
                willChange: 'transform',
              }}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center${page.leftBgImageGrayscale ? ' group' : ''}`}
              >
                {page.leftBgImage && (
                  <img
                    src={page.leftBgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: page.leftBgImagePosition ?? 'center',
                      ...(page.leftBgImageGrayscale
                        ? {
                            filter: 'grayscale(1)',
                            transition: 'filter 0.7s cubic-bezier(0.16,1,0.3,1)',
                          }
                        : {}),
                    }}
                    onMouseEnter={page.leftBgImageGrayscale ? (e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0)'; } : undefined}
                    onMouseLeave={page.leftBgImageGrayscale ? (e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1)'; } : undefined}
                  />
                )}
                <div className="relative z-10 p-8 md:p-12 lg:p-16 w-full">
                  {page.leftContent}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="w-1/2 h-full relative overflow-hidden transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: rightTransform,
                transitionDuration: `${animTime}ms`,
                willChange: 'transform',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {page.rightBgImage && (
                  <img
                    src={page.rightBgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: page.rightBgImagePosition ?? 'center' }}
                  />
                )}
                <div className="relative z-10 p-8 md:p-12 lg:p-16 w-full">
                  {page.rightContent}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Page indicator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!scrolling.current) {
                scrolling.current = true;
                setCurrentPage(i);
                setTimeout(() => (scrolling.current = false), animTime);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentPage === i
                ? 'bg-primary scale-125'
                : 'bg-background/30 hover:bg-background/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollAdventure;
