import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowDown } from "lucide-react";
import { ColorBends } from "./ColorBends";

// Import template screenshots
import portfolioV1Img from "../assets/portfolio_v1.png";
import portfolioV2Img from "../assets/portfolio_v2.png";
import portfolioV3Img from "../assets/portfolio_v3.png";

const words = ["Free React", "Tailwind CSS", "Animation UI", "Open Source"];

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTemplates = () => {
    navigate("/templates");
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
            <span>100% Free & Open Source</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-heading"
          >
            Find & Download{" "}
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
            Assets
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle"
          >
            A curated library of responsive React.js templates and copy-paste UI animations. Build your next web application in minutes with zero friction.
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
            </button>
          </motion.div>
        </div>

        {/* Right Column: Premium Mockup Stack */}
        <div className="hero-showcase-side">
          {/* Mockup 1 (Portfolio v1 - Back Left) */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0,
              translateY: [0, -10, 0] 
            }}
            transition={{ 
              x: { duration: 0.6, delay: 0.2 },
              y: { duration: 0.6, delay: 0.2 },
              translateY: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.05, zIndex: 30, rotate: -3 }}
            className="browser-mockup mockup-1"
          >
            <div className="browser-header">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="mockup-img-container">
              <img src={portfolioV1Img} alt="Portfolio V1 Screenshot" />
            </div>
          </motion.div>

          {/* Mockup 2 (Portfolio v2 - Back Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0,
              translateY: [0, -12, 0]
            }}
            transition={{ 
              x: { duration: 0.6, delay: 0.3 },
              y: { duration: 0.6, delay: 0.3 },
              translateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            whileHover={{ scale: 1.05, zIndex: 30, rotate: 3 }}
            className="browser-mockup mockup-2"
          >
            <div className="browser-header">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="mockup-img-container">
              <img src={portfolioV2Img} alt="Portfolio V2 Screenshot" />
            </div>
          </motion.div>

          {/* Mockup 3 (Portfolio v3 - Front Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              translateY: [0, -8, 0]
            }}
            transition={{ 
              scale: { duration: 0.6, delay: 0.4 },
              y: { duration: 0.6, delay: 0.4 },
              translateY: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
            whileHover={{ scale: 1.06, zIndex: 35, rotate: 0 }}
            className="browser-mockup mockup-3"
          >
            <div className="browser-header">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="mockup-img-container">
              <img src={portfolioV3Img} alt="Portfolio V3 Screenshot" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styled class definitions */}
      <style>{`
        .hero-section {
          padding: 90px 24px 80px;
          position: relative;
          overflow: hidden;
          background: var(--gradient-hero);
          min-height: 640px;
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
          gap: 60px;
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
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.01);
        }

        .hero-badge span {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-heading {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--text);
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .heading-accent-wrapper {
          display: inline-block;
          min-width: 200px;
          vertical-align: bottom;
        }

        .heading-word {
          display: inline-block;
          background: linear-gradient(135deg, var(--text) 0%, var(--accent-2) 100%);
          WebkitBackgroundClip: text;
          WebkitTextFillColor: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(15px, 2vw, 17px);
          color: var(--muted);
          max-width: 540px;
          margin: 0 0 36px;
          line-height: 1.6;
          font-weight: 450;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: #ffffff;
          color: #000000;
          font-size: 15px;
          font-weight: 600;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* Right Column Showcase Layout */
        .hero-showcase-side {
          position: relative;
          width: 100%;
          height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
        }

        @media (min-width: 1024px) {
          .hero-showcase-side {
            height: 480px;
            margin-top: 0;
          }
        }

        /* Browser Mockup Shell */
        .browser-mockup {
          position: absolute;
          background: rgba(10, 10, 10, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(8px);
          transition: border-color 0.3s;
        }

        .browser-mockup:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .browser-header {
          height: 24px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 12px;
        }

        .browser-header .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .mockup-img-container {
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #121212;
        }

        .mockup-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.8s ease;
        }

        .browser-mockup:hover .mockup-img-container img {
          transform: scale(1.03);
        }

        /* Mockup Stacking Position coordinates */
        .mockup-1 {
          width: 150px;
          left: 5%;
          top: 15%;
          z-index: 10;
          transform: rotate(-6deg);
        }

        .mockup-2 {
          width: 150px;
          right: 5%;
          top: 25%;
          z-index: 12;
          transform: rotate(6deg);
        }

        .mockup-3 {
          width: 190px;
          bottom: 8%;
          z-index: 15;
          transform: rotate(-2deg);
        }

        @media (min-width: 640px) {
          .mockup-1 { width: 240px; left: 10%; }
          .mockup-2 { width: 240px; right: 10%; }
          .mockup-3 { width: 290px; }
        }

        @media (min-width: 1024px) {
          .mockup-1 { width: 250px; left: 0%; top: 12%; }
          .mockup-2 { width: 250px; right: 0%; top: 20%; }
          .mockup-3 { width: 310px; bottom: 8%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;