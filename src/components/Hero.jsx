// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Code, Sparkles } from "lucide-react";

// Import some light floating preview components
import { CosmicThemeSwitch } from "./ui/animations/FluidSwitch";
import AnimatedProfileStack from "./ui/animations/AnimatedProfileStack";

const words = ["UI Components", "Animations", "Tailwind CSS", "Vanilla CSS"];

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isSwitchDark, setIsSwitchDark] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    navigate("/docs");
  };

  return (
    <section className="hero-section" aria-label="Hero section">
      {/* Abstract Dotted Grid Background — decorative, hidden from screen readers */}
      <div className="hero-dot-grid" aria-hidden="true" />
      
      {/* Background Soft Glow Blobs — decorative */}
      <div className="hero-glow-blob-1" aria-hidden="true" />
      <div className="hero-glow-blob-2" aria-hidden="true" />
      <div className="hero-glow-blob-3" aria-hidden="true" />

      <div className="hero-container">
        {/* Left Column: Text & CTA */}
        <div className="hero-text-side">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hero-badge"
          >
            <Zap size={13} className="hero-badge-icon" />
            <span>Open Source</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="hero-heading"
          >
            Build Beautiful Interfaces
            <br />
            With Premium{" "}
            <span className="heading-accent-wrapper">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="heading-word"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="hero-subtitle"
          >
            Accelerate your web design workflow. A premium catalog of highly polished, responsive React components. 
            Customize with prompts, copy the source code, and drop them directly into your project.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="hero-btn-row"
          >
            <button 
              onClick={handleStart}
              className="cta-button primary"
              aria-label="Explore React components library"
            >
              Explore Components
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            
            <button 
              onClick={() => navigate("/docs/installation")}
              className="cta-button secondary"
              aria-label="View installation and setup guide"
            >
              <Code size={16} aria-hidden="true" />
              Setup Guide
            </button>
          </motion.div>
        </div>

        {/* Right Column: Code Editor Mockup & Floating Previews */}
        <div className="hero-showcase-side">
          <div className="showcase-card-wrapper">
            
            {/* Floating Component 1: Segment Switch / Cosmic Switch */}
            <motion.div 
              className="floating-el float-el-1"
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="floating-el-header">
                <Sparkles size={11} color="#a78bfa" />
                <span>Cosmic Toggle</span>
              </div>
              <CosmicThemeSwitch isDark={isSwitchDark} onChange={setIsSwitchDark} />
            </motion.div>

            {/* Floating Component 2: Profile Stack */}
            <motion.div 
              className="floating-el float-el-2"
              initial={{ opacity: 0, x: 30, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <AnimatedProfileStack pulse={true} />
            </motion.div>

            {/* Main Code Editor mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0]
              }}
              transition={{ 
                scale: { duration: 0.6, delay: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="code-mockup-card"
            >
              {/* Window Header */}
              <div className="code-mockup-header">
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
                <span className="window-tab">AnimatedPill.jsx</span>
              </div>
              
              {/* Window Content */}
              <div className="code-mockup-body">
                <pre className="code-mockup-pre">
                  <code>
                    <span className="code-keyword">import</span>{" "}
                    <span className="code-variable">React</span>{" "}
                    <span className="code-keyword">from</span>{" "}
                    <span className="code-string">"react"</span>;
                    {"\n"}
                    <span className="code-keyword">import</span>{" "}
                    <span className="code-keyword">{"{"}</span>{" "}
                    <span className="code-variable">motion</span>{" "}
                    <span className="code-keyword">{"}"}</span>{" "}
                    <span className="code-keyword">from</span>{" "}
                    <span className="code-string">"framer-motion"</span>;
                    {"\n\n"}
                    <span className="code-keyword">export default function</span>{" "}
                    <span className="code-function">ProfileStack</span>() {"{"}
                    {"\n"}
                    {"  "}
                    <span className="code-keyword">return</span> (
                    {"\n"}
                    {"    "}&lt;<span className="code-tag">motion.div</span>{" "}
                    <span className="code-attr">whileHover</span>=
                    <span className="code-keyword">{"{ "}</span>
                    <span className="code-attr">scale</span>: <span className="code-number">1.05</span>
                    <span className="code-keyword">{" }"}</span>
                    {"\n"}
                    {"      "}
                    <span className="code-attr">className</span>=
                    <span className="code-string">"glass-pill shadow-lg"</span>&gt;
                    {"\n"}
                    {"      "}&lt;<span className="code-tag">span</span>&gt;Active Users&lt;/<span className="code-tag">span</span>&gt;
                    {"\n"}
                    {"    "}&lt;/<span className="code-tag">motion.div</span>&gt;
                    {"\n"}
                    {"  "});
                    {"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 140px 24px 100px;
          position: relative;
          overflow: hidden;
          background: #000000;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Dotted grid pattern with center radial mask */
        .hero-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px);
          background-size: 32px 32px;
          mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 85%);
          pointer-events: none;
          z-index: 1;
        }

        /* Floating Aurora Gradient Blobs — GPU-composited via will-change */
        .hero-glow-blob-1 {
          position: absolute;
          top: -10%;
          left: 10%;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          contain: layout style paint;
          animation: hero-blob-anim-1 16s infinite alternate ease-in-out;
        }

        .hero-glow-blob-2 {
          position: absolute;
          bottom: 5%;
          right: 5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          contain: layout style paint;
          animation: hero-blob-anim-2 20s infinite alternate ease-in-out;
        }

        .hero-glow-blob-3 {
          position: absolute;
          top: 30%;
          right: 35%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          contain: layout style paint;
          animation: hero-blob-anim-1 12s infinite alternate-reverse ease-in-out;
        }

        @keyframes hero-blob-anim-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.1); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }

        @keyframes hero-blob-anim-2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-50px, 40px) scale(0.9); }
          100% { transform: translate(30px, -30px) scale(1.05); }
        }

        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .hero-container {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 40px;
          }
        }

        .hero-text-side {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        /* Custom premium gradient badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border-radius: 99px;
          border: 1px solid rgba(167, 139, 250, 0.2);
          background: linear-gradient(135deg, rgba(167, 139, 250, 0.08) 0%, rgba(129, 140, 248, 0.03) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          margin-bottom: 24px;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.05);
        }

        .hero-badge-icon {
          color: #a78bfa;
          filter: drop-shadow(0 0 4px rgba(167, 139, 250, 0.6));
        }

        .hero-badge span {
          font-size: 11px;
          font-weight: 750;
          color: #c084fc;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-heading {
          font-size: clamp(34px, 4.5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.03em;
          font-family: 'Space Grotesk', 'Outfit', sans-serif;
        }

        .heading-accent-wrapper {
          display: inline-block;
          min-width: 220px;
          vertical-align: bottom;
        }

        .heading-word {
          display: inline-block;
          background: linear-gradient(135deg, #a78bfa 0%, #6366f1 50%, #3b82f6 100%);
          WebkitBackgroundClip: text;
          WebkitTextFillColor: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(15px, 2.2vw, 17px);
          color: rgba(255, 255, 255, 0.55);
          max-width: 580px;
          margin: 0 0 40px;
          line-height: 1.65;
          font-weight: 400;
        }

        .hero-btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          width: 100%;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 30px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
        }

        .cta-button.primary {
          background: #ffffff;
          color: #000000;
          border: none;
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(255, 255, 255, 0.18);
          background: #f4f4f5;
        }

        .cta-button.secondary {
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
        }

        .cta-button.secondary:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* Right column mockup & floating tags */
        .hero-showcase-side {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .showcase-card-wrapper {
          width: 100%;
          max-width: 440px;
          position: relative;
        }

        /* Floating Components */
        .floating-el {
          position: absolute;
          z-index: 25;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          padding: 12px 16px;
        }

        .float-el-1 {
          top: -30px;
          left: -40px;
          background: rgba(15, 15, 20, 0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: hero-drift-1 6s infinite alternate ease-in-out;
        }

        .floating-el-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 750;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .float-el-2 {
          bottom: -20px;
          right: -25px;
          background: rgba(255, 255, 255, 0.95);
          color: #000000;
          animation: hero-drift-2 7s infinite alternate ease-in-out;
        }
        
        /* Force correct white bg styling for animated stack inside floating white pill */
        .float-el-2 .profile-stack-pill {
          background: rgba(0, 0, 0, 0.04) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: none !important;
        }
        .float-el-2 .stack-avatar {
          border-color: #f4f4f5 !important;
        }
        .float-el-2 .audio-pulse-circle {
          background: rgba(0, 0, 0, 0.05) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          color: #000 !important;
        }

        @keyframes hero-drift-1 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-14px) rotate(1.5deg); }
        }

        @keyframes hero-drift-2 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(12px) rotate(-1.5deg); }
        }

        /* Mockup Editor styling */
        .code-mockup-card {
          background: rgba(12, 12, 16, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 
            0 30px 70px rgba(0, 0, 0, 0.55), 
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 40px rgba(124, 58, 237, 0.04);
          width: 100%;
        }

        .code-mockup-header {
          height: 40px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 20px;
          position: relative;
        }

        .code-mockup-header .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .code-mockup-header .dot.red { background: #ef4444; }
        .code-mockup-header .dot.yellow { background: #f59e0b; }
        .code-mockup-header .dot.green { background: #10b981; }

        .window-tab {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 600;
          margin-left: 14px;
          font-family: inherit;
        }

        .code-mockup-body {
          padding: 28px;
          text-align: left;
          background: rgba(5, 5, 5, 0.4);
        }

        .code-mockup-pre {
          margin: 0;
          font-family: 'DM Mono', 'Fira Code', monospace;
          font-size: 13.5px;
          line-height: 1.6;
        }

        .code-keyword { color: #f43f5e; font-weight: 600; }
        .code-variable { color: #e4e4e7; }
        .code-string { color: #10b981; }
        .code-function { color: #60a5fa; }
        .code-tag { color: #c084fc; }
        .code-attr { color: #fb923c; }
        .code-number { color: #3b82f6; }
      `}</style>
    </section>
  );
};

export default Hero;
