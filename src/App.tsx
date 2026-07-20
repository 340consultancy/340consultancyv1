import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import ServicesPackages from "./pages/ServicesPackages";
import ServiceDetail from "./pages/ServiceDetail";
import WorkResults from "./pages/WorkResults";
import CaseStudyPage from "./pages/CaseStudyPage";
import ContactFAQ from "./pages/ContactFAQ";
import Blog from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticlePage";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * /admin → the Strapi admin panel. The CMS is always reachable through the
 * website's own domain: <domain>/admin redirects to {VITE_STRAPI_URL}/admin
 * (locally e.g. localhost:1337/admin), where Strapi asks for the login.
 * Deep admin paths and query strings are preserved. Without a configured
 * CMS URL the route falls back to the home page.
 */
function AdminRedirect() {
  const strapiUrl = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/+$/, "");
  useEffect(() => {
    if (strapiUrl) {
      window.location.replace(`${strapiUrl}${window.location.pathname}${window.location.search}`);
    }
  }, [strapiUrl]);
  if (!strapiUrl) return <Navigate to="/" replace />;
  return null; // blank for the split second until the browser navigates
}

// Order matches the visual nav: HOME | ABOUT US | SERVICES | [340] | OUR WORK | UP2DATE | CONTACT
const PAGE_ORDER = ['/', '/about-us', '/services', '/work', '/about', '/blog', '/contact', '/privacy'];

function getPageIndex(pathname: string) {
  const exact = PAGE_ORDER.indexOf(pathname);
  if (exact !== -1) return exact;
  const base = '/' + pathname.split('/')[1];
  const baseIdx = PAGE_ORDER.indexOf(base);
  return baseIdx !== -1 ? baseIdx : 0;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Let the page render, then scroll to the element
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);
  const directionRef = useRef(0);

  // Only recompute direction when the pathname actually changes (not on every re-render)
  if (location.pathname !== prevPathnameRef.current) {
    directionRef.current =
      getPageIndex(location.pathname) - getPageIndex(prevPathnameRef.current);
    prevPathnameRef.current = location.pathname;
  }

  const direction = directionRef.current;

  return (
    <>
    <ScrollToTop />
    {/* overflow-x: clip contains the horizontal slide transition so the shifted
        page never widens the document (no transient horizontal scrollbar on
        navigation). `clip` — unlike `hidden` — creates no scroll container, so
        position: sticky and scroll-driven animations inside pages keep working. */}
    <div style={{ overflowX: 'clip' }}>
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={location.pathname}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.38, ease: [0.32, 0, 0.18, 1] }}
        style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPackages />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<WorkResults />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/contact" element={<ContactFAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogArticlePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="/admin/*" element={<AdminRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
    </div>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
