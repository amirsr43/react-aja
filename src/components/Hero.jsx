// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Zap, ArrowDown } from "lucide-react";

const Hero = () => {
  const handleScrollToTemplates = () => {
    const el = document.getElementById("templates");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      style={{ 
        padding: "120px 24px 100px", 
        position: "relative", 
        overflow: "hidden",
        textAlign: "center",
        background: "var(--gradient-hero)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "440px"
      }}
    >
      {/* Abstract Dotted Grid Background */}
      <div className="hero-dot-grid" />
      
      {/* Background Soft Glow Blobs */}
      <div className="hero-glow-blob-1" />
      <div className="hero-glow-blob-2" />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(42, 107, 242, 0.15)",
            background: "rgba(42, 107, 242, 0.04)",
            backdropFilter: "blur(10px)",
            marginBottom: "28px",
            boxShadow: "0 4px 12px rgba(42, 107, 242, 0.03)"
          }}
        >
          <Zap size={12} style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            100% Free & Open Source
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: "clamp(38px, 6vw, 56px)",
            fontWeight: 800,
            marginBottom: "20px",
            color: "var(--text)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em"
          }}
        >
          Find & Download{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Free React
          </span>
          {" "}Templates
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            color: "var(--muted)",
            maxWidth: "580px",
            margin: "0 auto 36px",
            lineHeight: 1.6,
            fontWeight: 450
          }}
        >
          A curated library of responsive, high-performance, and beautiful React.js templates. Download ZIP source files directly from GitHub with zero friction.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            onClick={handleScrollToTemplates}
            className="cta-button"
          >
            Explore Templates
            <ArrowDown size={16} />
          </button>
        </motion.div>
      </div>

      {/* Styled class definitions */}
      <style>{`
        .hero-dot-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          z-index: 0;
        }

        .hero-glow-blob-1 {
          position: absolute;
          top: -20px;
          left: 15%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(42, 107, 242, 0.06) 0%, transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-glow-blob-2 {
          position: absolute;
          bottom: 20px;
          right: 15%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          z-index: 0;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(42, 107, 242, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(42, 107, 242, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        @media (max-width: 767px) {
          .cta-button {
            padding: 12px 24px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;