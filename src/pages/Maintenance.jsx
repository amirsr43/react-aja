// src/pages/Maintenance.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  Mail, 
  Copy, 
  Check, 
  Lock, 
  ChevronRight
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BYPASS_KEY } from "../config";
import GlobalStyles from "../styles/GlobalStyles";

const Maintenance = () => {
  const [copied, setCopied] = useState(false);
  const [showBypass, setShowBypass] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [bypassError, setBypassError] = useState(false);
  const email = "amirsyahrulramadhan43@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBypassSubmit = (e) => {
    e.preventDefault();
    if (passcode === BYPASS_KEY) {
      localStorage.setItem("maintenance_bypass", "true");
      // Reload page to apply changes
      window.location.reload();
    } else {
      setBypassError(true);
      setTimeout(() => setBypassError(false), 2000);
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="maintenance-wrapper">
        {/* Ambient background glows */}
        <div className="glow-orb glow-purple" />
        <div className="glow-orb glow-blue" />
        
        {/* Brand logo at top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="brand-header"
        >
          <div className="brand-logo-container">
            <img src="/logo.png" alt="ReactAja Logo" className="brand-logo" />
          </div>
          <span className="brand-name">
            React<span className="brand-accent">Aja</span>
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="maintenance-card"
        >
          {/* Decorative Corner Light */}
          <div className="card-light-refraction" />

          {/* Animated Graphic Header */}
          <div className="graphic-container">
            {/* Spinning tech orbits */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="orbit-ring outer"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="orbit-ring inner"
            />
            {/* Pulsing center icon */}
            <motion.div 
              animate={{ 
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.05)",
                  "0 0 35px rgba(255,255,255,0.15)",
                  "0 0 20px rgba(255,255,255,0.05)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="icon-core"
            >
              <Wrench size={32} className="core-wrench-icon" />
            </motion.div>

            {/* Orbiting particles */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="orbiting-particle-container"
            >
              <div className="orbiting-dot dot-1" />
            </motion.div>
          </div>

          {/* Status Badge */}
          <div className="status-badge">
            <span className="status-dot animate-pulse" />
            <span>SISTEM SEDANG DIPERBARUI</span>
          </div>

          {/* Heading & Intro */}
          <h1 className="maintenance-heading">
            Under Maintenance
          </h1>
          <p className="maintenance-text">
            Halo! Kami sedang melakukan pemeliharaan sistem rutin, 
            Proses ini tidak akan berlangsung lama. Terima kasih atas kesabaran Anda!
          </p>

          {/* Progress Indicator */}
          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">Upgrade Kemajuan</span>
              <span className="progress-percent">85%</span>
            </div>
            <div className="progress-track">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="progress-fill"
              />
            </div>
          </div>

          
        </motion.div>

        {/* Developer Bypass Area */}
        <div className="bypass-container">
          <AnimatePresence mode="wait">
            {!showBypass ? (
              <motion.button
                key="lock-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                whileHover={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBypass(true)}
                className="bypass-toggle-btn"
                title="Bypass Halaman"
              >
                <Lock size={14} />
                <span>Bypass</span>
              </motion.button>
            ) : (
              <motion.form
                key="bypass-form"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                onSubmit={handleBypassSubmit}
                className="bypass-form"
              >
                <Lock size={14} className="bypass-form-lock" />
                <input
                  type="password"
                  placeholder="Masukkan Kunci Bypass..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`bypass-input ${bypassError ? "error" : ""}`}
                  autoFocus
                />
                <button type="submit" className="bypass-submit-btn">
                  <ChevronRight size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowBypass(false);
                    setPasscode("");
                  }} 
                  className="bypass-cancel-btn"
                >
                  Batal
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .maintenance-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
          z-index: 10;
          overflow: hidden;
          background: #000000;
        }

        /* Background Light Orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          z-index: -1;
          pointer-events: none;
        }

        .glow-purple {
          top: 15%;
          left: 20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 80%);
        }

        .glow-blue {
          bottom: 15%;
          right: 20%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 80%);
        }

        /* Brand Header */
        .brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .brand-logo-container {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 850;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .brand-accent {
          color: var(--accent-2);
        }

        /* Maintenance Card */
        .maintenance-card {
          background: rgba(10, 10, 10, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 28px;
          padding: 48px 40px;
          max-width: 580px;
          width: 100%;
          text-align: center;
          position: relative;
          box-shadow: 
            0 30px 70px rgba(0, 0, 0, 0.6), 
            0 0 50px rgba(255, 255, 255, 0.01),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .card-light-refraction {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        }

        /* Graphic/Icon styling */
        .graphic-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px dashed rgba(255, 255, 255, 0.08);
        }

        .orbit-ring.outer {
          width: 110px;
          height: 110px;
          border-color: rgba(255, 255, 255, 0.06);
        }

        .orbit-ring.inner {
          width: 80px;
          height: 80px;
          border-style: dotted;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .icon-core {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          color: #ffffff;
        }

        .core-wrench-icon {
          color: rgba(255, 255, 255, 0.9);
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
        }

        .orbiting-particle-container {
          position: absolute;
          width: 95px;
          height: 95px;
          z-index: 3;
          pointer-events: none;
        }

        .orbiting-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px #ffffff;
        }

        .dot-1 {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(234, 179, 8, 0.04);
          border: 1px solid rgba(234, 179, 8, 0.15);
          border-radius: 999px;
          font-size: 10px;
          font-weight: 750;
          color: #eab308;
          letter-spacing: 0.06em;
          margin-bottom: 24px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #eab308;
          box-shadow: 0 0 8px #eab308;
        }

        /* Texts */
        .maintenance-heading {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 16px;
          color: #ffffff;
          background: linear-gradient(135deg, #ffffff 30%, #a1a1aa 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill_color: transparent;
          WebkitBackgroundClip: text;
          WebkitTextFillColor: transparent;
        }

        .maintenance-text {
          font-size: 14.5px;
          line-height: 1.6;
          color: #8e8e93;
          margin: 0 0 36px;
          font-weight: 400;
        }

        /* Progress section */
        .progress-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 16px 20px;
          margin-bottom: 36px;
          text-align: left;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .progress-label {
          font-size: 12px;
          font-weight: 500;
          color: #8e8e93;
        }

        .progress-percent {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
        }

        .progress-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0.7) 0%, #ffffff 100%);
          border-radius: 3px;
          box-shadow: 0 0 8px rgba(255,255,255,0.2);
        }

        /* Actions */
        .actions-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 28px;
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          max-width: 260px;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.12);
          background: #f4f4f5;
        }

        .action-button:active {
          transform: translateY(0);
        }

        .copy-icon-subtle {
          opacity: 0.4;
          margin-left: 2px;
        }

        .social-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .social-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #8e8e93;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-icon-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Bypass system at the bottom */
        .bypass-container {
          margin-top: 40px;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bypass-toggle-btn {
          background: transparent;
          border: none;
          color: #8e8e93;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .bypass-form {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 4px 4px 12px;
          border-radius: 10px;
          gap: 8px;
        }

        .bypass-form-lock {
          color: #8e8e93;
        }

        .bypass-input {
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 12px;
          width: 160px;
          font-family: inherit;
        }

        .bypass-input.error {
          color: #ef4444;
          animation: shake 0.2s ease-in-out;
        }

        .bypass-submit-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .bypass-submit-btn:hover {
          background: #ffffff;
          color: #000000;
        }

        .bypass-cancel-btn {
          background: transparent;
          border: none;
          color: #8e8e93;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          padding: 0 8px;
        }

        .bypass-cancel-btn:hover {
          color: #ffffff;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        @media (max-width: 640px) {
          .maintenance-card {
            padding: 36px 24px;
          }
          .maintenance-heading {
            font-size: 26px;
          }
          .maintenance-text {
            font-size: 13.5px;
            margin-bottom: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Maintenance;
