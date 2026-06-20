// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { ColorBends } from "./ColorBends";

const words = ["UI Component", "React JS", "Tailwind CSS", "Open Source"];

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    navigate("/docs");
  };

  return (
    <section className="hero-section">
      {/* ColorBends Background Animation */}
      <div className="hero-animation-wrapper">
        <ColorBends
          color="#A855F7"
          speed={0.2}
          frequency={1.0}
          noise={0.15}
          bandWidth={0.14}
          rotation={90}
          fadeTop={0.75}
          iterations={1}
          intensity={1.3}
        />
      </div>

      {/* Abstract Dotted Grid Background */}
      <div className="hero-dot-grid" />
      
      {/* Background Soft Glow Blobs */}
      <div className="hero-glow-blob-1" />
      <div className="hero-glow-blob-2" />

      <div className="hero-container">
        {/* Left Column: Text & CTA */}
        <div className="hero-text-side">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hero-badge"
          >
            <Zap size={12} style={{ color: "var(--accent)" }} />
            <span>npm i reactaja-ui - 100% Free & Open Source</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-heading"
          >
            Premium{" "}
            <span className="heading-accent-wrapper">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="heading-word"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            Library
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle"
          >
            Accelerate your web development workflow with a curated library of clean, 
            responsive, and animated React components. Install via npm and start importing components in seconds.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4"
          >
            <button 
              onClick={handleStart}
              className="cta-button"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Code Editor Mockup Showcase */}
        <div className="hero-showcase-side">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              scale: { duration: 0.6, delay: 0.3 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="showcase-card-wrapper"
          >
            <div className="code-mockup-card">
              {/* Window Header */}
              <div className="code-mockup-header">
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
                <span className="window-tab">Button.jsx</span>
              </div>
              
              {/* Window Content */}
              <div className="code-mockup-body">
                <pre className="code-mockup-pre">
                  <code>
                    <span className="code-keyword">import</span>{" "}
                    <span className="code-variable">React</span>{" "}
                    <span className="code-keyword">from</span>{" "}
                    <span className="code-string">"react"</span>;
                    {"\n\n"}
                    <span className="code-keyword">export const</span>{" "}
                    <span className="code-function">Button</span> = ({"{"}{" "}
                    <span className="code-variable">children</span>{" "}{"}"}) =&gt; {"{"}
                    {"\n"}
                    {"  "}
                    <span className="code-keyword">return</span> (
                    {"\n"}
                    {"    "}&lt;<span className="code-tag">button</span>{" "}
                    <span className="code-attr">className</span>=
                    <span className="code-string">"px-4 py-2 bg-indigo-600 rounded-lg hover:scale-105 transition"</span>&gt;
                    {"\n"}
                    {"      "}
                    <span className="code-variable">{"{children}"}</span>
                    {"\n"}
                    {"    "}&lt;/<span className="code-tag">button</span>&gt;
                    {"\n"}
                    {"  "});
                    {"\n"}
                    {"}"};
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 100px 24px 80px;
          position: relative;
          overflow: hidden;
          background: var(--gradient-hero);
          min-height: 600px;
          display: flex;
          align-items: center;
        }

        .hero-animation-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero-animation-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, #000000 0%, transparent 15%, transparent 85%, #000000 100%);
          pointer-events: none;
          z-index: 1;
        }

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
          background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
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
          background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: left;
        }

        @media (min-width: 1024px) {
          .hero-container {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 40px;
          }
        }

        .hero-text-side {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          margin-bottom: 20px;
        }

        .hero-badge span {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-heading {
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--text);
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .heading-accent-wrapper {
          display: inline-block;
          min-width: 260px;
          vertical-align: bottom;
        }

        .heading-word {
          display: inline-block;
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-2) 100%);
          WebkitBackgroundClip: text;
          WebkitTextFillColor: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(14.5px, 2vw, 16.5px);
          color: var(--muted);
          max-width: 520px;
          margin: 0 0 36px;
          line-height: 1.6;
          font-weight: 400;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #ffffff;
          color: #000000;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.08);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
          background: #f4f4f5;
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* Right column mockup editor */
        .hero-showcase-side {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .showcase-card-wrapper {
          width: 100%;
          max-width: 420px;
          z-index: 10;
        }

        .code-mockup-card {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .code-mockup-header {
          height: 36px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 16px;
          position: relative;
        }

        .code-mockup-header .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .code-mockup-header .dot.red { background: #ff5f56; }
        .code-mockup-header .dot.yellow { background: #ffbd2e; }
        .code-mockup-header .dot.green { background: #27c93f; }

        .window-tab {
          font-size: 11px;
          color: #8e8e93;
          font-weight: 500;
          margin-left: 12px;
          font-family: inherit;
        }

        .code-mockup-body {
          padding: 24px;
          text-align: left;
          background: #050505;
        }

        .code-mockup-pre {
          margin: 0;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
        }

        .code-keyword { color: #f43f5e; }
        .code-variable { color: #e4e4e7; }
        .code-string { color: #10b981; }
        .code-function { color: #60a5fa; }
        .code-tag { color: #a855f7; }
        .code-attr { color: #fb923c; }
        .code-value { color: #f43f5e; }
      `}</style>
    </section>
  );
};

export default Hero;