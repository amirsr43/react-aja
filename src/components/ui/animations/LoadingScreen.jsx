// src/components/ui/LoadingScreen.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ isFirstLoad }) {
  const [progress, setProgress] = useState(0);

  // Animate progress bar simulation
  useEffect(() => {
    const duration = isFirstLoad ? 1500 : 700;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isFirstLoad]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="loader-overlay"
    >
      {/* Abstract background grid */}
      <div className="loader-grid" />
      <div className="loader-ambient-glow" />

      <div className="loader-container">
        {/* Animated Logo Wrapper */}
        <div className="logo-glow-wrapper">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: [0.8, 1.05, 1], rotate: [0, 10, 0] }}
            transition={{
              duration: isFirstLoad ? 1.5 : 0.7,
              ease: "easeInOut",
            }}
            className="loader-logo-circle"
          >
            <img src="/logo.png" alt="ReactAja" className="loader-logo-img" />
          </motion.div>
          {/* Pulsing ring aura */}
          <div className="loader-ring-aura" />
        </div>

        {/* Subtitle / Status */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.25 }}
          className="loader-status"
        >
          {isFirstLoad ? "Initializing premium interface..." : "Loading content..."}
        </motion.span>

        {/* Progress Bar Container */}
        <div className="loader-progress-track">
          <motion.div
            style={{ width: `${progress}%` }}
            className="loader-progress-fill"
          />
        </div>
      </div>

      <style>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: #000000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .loader-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 1;
        }

        .loader-ambient-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 1;
          pointer-events: none;
          animation: ambient-pulse 3s infinite alternate ease-in-out;
        }

        .loader-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .logo-glow-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .loader-logo-circle {
          width: 80px;
          height: 80px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 2;
        }

        .loader-logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
        }

        /* Pulsing ring in background */
        .loader-ring-aura {
          position: absolute;
          width: 96px;
          height: 96px;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          animation: ring-pulse 2s infinite ease-out;
          pointer-events: none;
          z-index: 1;
        }

        .loader-brand {
          font-size: 24px;
          font-weight: 800;
          font-family: 'Space Grotesk', 'Outfit', sans-serif;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .brand-accent {
          color: #a1a1aa;
        }

        .loader-status {
          font-size: 12px;
          color: #8e8e93;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-transform: uppercase;
        }

        /* Progress Bar styles */
        .loader-progress-track {
          width: 140px;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 4px;
        }

        .loader-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffffff 0%, #a1a1aa 100%);
          border-radius: 99px;
        }

        @keyframes ring-pulse {
          0% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }

        @keyframes ambient-pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }
      `}</style>
    </motion.div>
  );
}
