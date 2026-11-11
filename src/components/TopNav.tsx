import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { nav, img } from '@/content';

const NAV_H = 88; // px — tall enough for oversized logo

const ALL_LINKS = [...nav.leftLinks, ...nav.rightLinks];

// Services submenu — content-driven (each links to its own service page).
const SERVICE_LINKS = nav.serviceLinks;

const isActive = (href: string, pathname: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

/* ─── Nav link ──────────────────────────────────────────────────────────── */
const NavLink: React.FC<{ href: string; label: string; onClick?: () => void }> = ({
  href, label, onClick,
}) => {
  const { pathname } = useLocation();
  const [hov, setHov] = useState(false);
  const active = isActive(href, pathname);

  return (
    <Link
      to={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: '0.56rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: active ? 'hsl(354 100% 87%)' : hov ? 'hsl(36 21% 95%)' : 'hsl(36 21% 95% / 0.48)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        paddingBottom: 3,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 1,
        width: active ? '100%' : hov ? '100%' : '0%',
        background: active ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95% / 0.4)',
        transition: 'width 0.32s cubic-bezier(0.16,1,0.3,1)',
        display: 'block',
      }} />
    </Link>
  );
};

/* ─── Services dropdown (desktop) ───────────────────────────────────────── */
const DropdownLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const { pathname } = useLocation();
  const [hov, setHov] = useState(false);
  const active = pathname === href;
  return (
    <Link
      to={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        padding: '0.62rem 1.4rem',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: '0.56rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: active || hov ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95% / 0.6)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.18s ease',
      }}
    >
      {label}
    </Link>
  );
};

const ServicesNavItem: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink href="/services" label={nav.servicesLabel} />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            /* paddingTop bridges the gap so hover doesn't drop between label and panel */
            style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 14, zIndex: 60 }}
          >
            <div
              style={{
                minWidth: 250,
                background: 'hsl(89 71% 15% / 0.98)',
                backdropFilter: 'blur(18px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
                border: '1px solid hsl(354 100% 87% / 0.12)',
                padding: '0.5rem 0',
              }}
            >
              {SERVICE_LINKS.map((s) => (
                <DropdownLink key={s.href} href={s.href} label={s.label} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Pip separator ─────────────────────────────────────────────────────── */
const Pip = () => (
  <span aria-hidden style={{
    display: 'inline-block', width: 3, height: 3, borderRadius: '50%',
    background: 'hsl(36 21% 95% / 0.16)', flexShrink: 0,
  }} />
);

/* ─── BOOK NOW ──────────────────────────────────────────────────────────── */
const BookNow: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={nav.bookNow.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 9999,
        background: hov ? 'hsl(354 100% 87%)' : 'transparent',
        color: hov ? 'hsl(89 71% 15%)' : 'hsl(354 100% 87%)',
        border: hov ? '1px solid hsl(354 100% 87%)' : '1px solid hsl(354 100% 87% / 0.6)',
        padding: mobile ? '14px 44px' : '9px 22px',
        fontFamily: "'Kelson Sans BG', sans-serif",
        fontWeight: 700,
        fontSize: '0.58rem',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'all 0.22s ease',
        boxShadow: hov ? '0 4px 20px hsl(354 100% 87% / 0.3)' : 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {nav.bookNow.label}
    </Link>
  );
};

/* ─── Center Logo ───────────────────────────────────────────────────────── */
const LogoLink: React.FC<{ height?: number }> = ({ height = NAV_H + 28 }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/"
      aria-label={nav.logo.ariaLabel}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: hov ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          height: height,
          width: height,
          backgroundColor: 'hsl(354 100% 87%)',
          WebkitMaskImage: `url(${img(nav.logo.src)})`,
          maskImage: `url(${img(nav.logo.src)})`,
          // 59.2% = the wordmark's share of the old 500×500 canvas (296/500).
          // The asset is now trimmed to the mark itself; this keeps the nav
          // logo at exactly the size it always rendered.
          WebkitMaskSize: '59.2% auto',
          maskSize: '59.2% auto',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </Link>
  );
};

/* ─── Mobile menu link ──────────────────────────────────────────────────── */
const MobileLink: React.FC<{
  href: string; label: string; index: number; pathname: string; onClose: () => void;
}> = ({ href, label, index, pathname, onClose }) => {
  const active = isActive(href, pathname);
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ delay: 0.05 + index * 0.05, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={href}
        onClick={onClose}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1rem',
          textDecoration: 'none',
          padding: '0.85rem clamp(2rem,6vw,4rem)',
          borderBottom: '1px solid hsl(36 21% 95% / 0.06)',
        }}
      >
        <span style={{
          fontFamily: "'Kelson Sans BG', sans-serif",
          fontWeight: 700,
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: active ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95% / 0.25)',
          minWidth: '2rem',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontFamily: "'Kelson Sans BG', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.9rem, 6.5vw, 3.2rem)',
          lineHeight: 1,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: active ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95%)',
        }}>
          {label}
        </span>
        {active && (
          <span style={{
            marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
            background: 'hsl(354 100% 87%)', flexShrink: 0, alignSelf: 'center',
          }} />
        )}
      </Link>
    </motion.div>
  );
};

/* ─── TopNav ────────────────────────────────────────────────────────────── */
const TopNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Bar ── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: NAV_H,
          zIndex: 50,
          overflow: 'visible', // allows logo to extend beyond bar height
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 'clamp(1.25rem, 3.5vw, 2.5rem)',
          paddingRight: 'clamp(1.25rem, 3.5vw, 2.5rem)',
          background: scrolled ? 'hsl(89 71% 15% / 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid hsl(354 100% 87% / 0.1)' : '1px solid transparent',
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* ── Desktop ── */}
        <div
          className="hidden md:flex"
          style={{ width: '100%', alignItems: 'center', minWidth: 0 }}
        >
          {/* Left links */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center',
            gap: 'clamp(0.9rem, 2vw, 1.6rem)', minWidth: 0,
          }}>
            {nav.leftLinks.map((l) => (
              <React.Fragment key={l.href}>
                {l.href === '/services'
                  ? <ServicesNavItem />
                  : <NavLink href={l.href} label={l.label} />}
              </React.Fragment>
            ))}
          </div>

          {/* Center logo — overflows nav bar top+bottom */}
          <div style={{
            flexShrink: 0,
            paddingLeft: 'clamp(1rem, 2.5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 2.5vw, 2.5rem)',
            display: 'flex', alignItems: 'center',
            position: 'relative', zIndex: 2,
          }}>
            <LogoLink />
          </div>

          {/* Right links + BOOK NOW */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'clamp(0.9rem, 2vw, 1.6rem)', minWidth: 0,
          }}>
            {nav.rightLinks.map((l, i) => (
              <React.Fragment key={l.href}>
                {null}
                <NavLink href={l.href} label={l.label} />
              </React.Fragment>
            ))}
            <span style={{
              width: 1, height: 18,
              background: 'hsl(36 21% 95% / 0.1)',
              display: 'block', flexShrink: 0,
            }} />
            <BookNow />
          </div>
        </div>

        {/* ── Mobile ── */}
        <div
          className="flex md:hidden"
          style={{ width: '100%', alignItems: 'center', position: 'relative' }}
        >
          {/* Logo centred */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <LogoLink height={NAV_H + 16} />
          </div>
          <div style={{ flex: 1 }} />
          {/* Burger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? nav.closeMenuLabel : nav.openMenuLabel}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', display: 'flex', alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    fontFamily: "'Kelson Sans BG', sans-serif",
                    fontWeight: 700, fontSize: '0.65rem',
                    letterSpacing: '0.22em', color: 'hsl(354 100% 87%)',
                    textTransform: 'uppercase',
                  }}
                >
                  {nav.closeLabel}
                </motion.span>
              ) : (
                <motion.div
                  key="burger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                >
                  <span style={{ display: 'block', width: 22, height: 1.5, background: 'hsl(36 21% 95%)' }} />
                  <span style={{ display: 'block', width: 14, height: 1.5, background: 'hsl(36 21% 95%)', marginLeft: 'auto' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'hsl(89 71% 15% / 0.99)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ height: NAV_H }} />
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, hsl(354 100% 87% / 0.22) 50%, transparent)' }} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '1.5rem' }}>
              {ALL_LINKS.map((l, i) => (
                <React.Fragment key={l.href}>
                  <MobileLink
                    href={l.href}
                    label={l.label}
                    index={i}
                    pathname={pathname}
                    onClose={() => setMenuOpen(false)}
                  />
                  {l.href === '/services' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.2rem clamp(2rem,6vw,4rem) 0.7rem calc(clamp(2rem,6vw,4rem) + 3rem)' }}>
                      {SERVICE_LINKS.map((s) => (
                        <Link
                          key={s.href}
                          to={s.href}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600,
                            fontSize: '0.72rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: pathname === s.href ? 'hsl(354 100% 87%)' : 'hsl(36 21% 95% / 0.55)',
                            textDecoration: 'none',
                          }}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + ALL_LINKS.length * 0.05 + 0.08 }}
                style={{ padding: '1.5rem clamp(2rem,6vw,4rem) 0' }}
              >
                <BookNow mobile />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{
                fontFamily: "'Montserrat', serif",
                fontStyle: 'italic',
                fontSize: '0.82rem',
                color: 'hsl(36 21% 95% / 0.18)',
                textAlign: 'center',
                paddingBottom: 'clamp(1.5rem,4vh,2.5rem)',
                letterSpacing: '0.04em',
              }}
            >
              {nav.mobileTagline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNav;
