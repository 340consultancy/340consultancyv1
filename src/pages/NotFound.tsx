import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { notFound } from "@/content";

const ROSA = "hsl(354 100% 87%)";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "hsl(0 0% 13%)",
        color: "hsl(36 21% 95%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 6vw, 4rem)",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", maxWidth: 520, width: "100%" }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "0.55rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: ROSA,
            marginBottom: "1.5rem",
          }}
        >
          {notFound.eyebrow}
        </p>

        <h1
          style={{
            fontFamily: "'Kelson Sans BG', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(5rem, 26vw, 11rem)",
            lineHeight: 0.85,
            letterSpacing: "0.02em",
            color: "transparent",
            WebkitTextStroke: "1.5px hsl(354 100% 87%)",
            margin: 0,
          }}
        >
          {notFound.code}
        </h1>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
            color: "hsl(36 21% 95% / 0.7)",
            marginTop: "1.5rem",
            marginBottom: "2.5rem",
            lineHeight: 1.5,
          }}
        >
          {notFound.message}
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            minHeight: 48,
            padding: "0 1.75rem",
            background: ROSA,
            color: "hsl(0 0% 8%)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={13} />
          {notFound.backLabel}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
