// src/components/ui/FluidSwitch.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Cloud, Star, Settings, Layout, BarChart2 } from "lucide-react";

export const FLUID_SWITCH_STYLES = `
/* ── FLUID SWITCH CORE STYLES ── */
.fluid-switch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  font-family: 'Outfit', 'Inter', sans-serif;
  user-select: none;
}

.switch-section-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: rgba(15, 15, 18, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
}

.switch-card-title {
  font-size: 11px;
  font-weight: 750;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

/* 1. Fluid Segment Switch Styles */
.fluid-segment-wrapper {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4px;
  border-radius: 12px;
  z-index: 1;
}

.fluid-segment-btn {
  position: relative;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13.5px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
  outline: none;
}

.fluid-segment-btn.active {
  color: #ffffff;
}

.fluid-segment-btn:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 480px) {
  .fluid-segment-btn {
    padding: 8px 12px;
    font-size: 12.5px;
    gap: 6px;
  }
}

@media (max-width: 380px) {
  .fluid-segment-btn {
    padding: 8px 10px;
  }
  .fluid-segment-btn span {
    display: none;
  }
}

.fluid-active-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

/* 2. Cosmic Theme Switch Styles */
.cosmic-switch-track {
  position: relative;
  width: 78px;
  height: 42px;
  border-radius: 9999px;
  cursor: pointer;
  padding: 4px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
  transition: border-color 0.4s ease;
}

.cosmic-switch-track.light {
  background: linear-gradient(to bottom, #7dd3fc, #38bdf8);
  border-color: rgba(56, 189, 248, 0.3);
}

.cosmic-switch-track.dark {
  background: linear-gradient(to bottom, #09090b, #030712);
  border-color: rgba(255, 255, 255, 0.04);
}

/* Sky clouds and stars details */
.cosmic-sky-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sky-cloud {
  position: absolute;
  color: rgba(255, 255, 255, 0.85);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
}

.sky-star {
  position: absolute;
  color: #ffffff;
  fill: #ffffff;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
}

.cosmic-thumb {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.cosmic-thumb.light {
  background: radial-gradient(circle at 30% 30%, #fef08a 0%, #eab308 70%);
  border: 1px solid #fef08a;
  box-shadow: 0 0 16px rgba(234, 179, 8, 0.6);
}

.cosmic-thumb.dark {
  background: radial-gradient(circle at 30% 30%, #e2e8f0 0%, #94a3b8 70%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 0 12px rgba(255, 255, 255, 0.15),
    inset -2px -2px 4px rgba(0, 0, 0, 0.4);
}

/* Craters inside moon */
.moon-crater {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.2);
}

/* 3. Tactile 3D Switch Styles */
.tactile-3d-wrapper {
  position: relative;
  cursor: pointer;
  outline: none;
}

.tactile-3d-depth {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: #18181b; /* 3D depth background */
  transform: translateY(4px);
  transition: transform 0.1s ease;
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.tactile-3d-face {
  position: relative;
  width: 84px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #27272a 0%, #1f1f23 100%);
  border: 1px solid #3f3f46;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 6px;
  box-sizing: border-box;
  transform: translateY(0);
  transition: transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tactile-3d-wrapper:hover .tactile-3d-face {
  transform: translateY(-1px);
}
.tactile-3d-wrapper:hover .tactile-3d-depth {
  transform: translateY(5px);
}

.tactile-3d-wrapper:active .tactile-3d-face {
  transform: translateY(3px);
}
.tactile-3d-wrapper:active .tactile-3d-depth {
  transform: translateY(3px);
}

.tactile-3d-handle {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(to bottom, #3f3f46, #27272a);
  border: 1px solid #52525b;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Tactile LED Indicator slots */
.tactile-led {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 6px;
  border-radius: 9999px;
  background: #18181b;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.led-light {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.led-light.active {
  background: #10b981; /* Neon green active */
  box-shadow: 
    0 0 6px #10b981,
    0 0 12px #10b981;
}

.led-light.inactive {
  background: #ef4444; /* Neon red inactive */
  box-shadow: 
    0 0 6px #ef4444,
    0 0 12px #ef4444;
}
`;

// ── 1. Fluid Segment Switch ──
export function FluidSegmentSwitch({
  options = ["Option 1", "Option 2", "Option 3"],
  icons = [],
  activeIdx = 0,
  onChange,
  className = "",
  style = {}
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div 
      className={`fluid-segment-wrapper ${className}`}
      style={style}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {options.map((opt, idx) => {
        const Icon = icons[idx];
        const isActive = activeIdx === idx;
        return (
          <button
            key={idx}
            className={`fluid-segment-btn ${isActive ? "active" : ""}`}
            onClick={() => onChange && onChange(idx)}
            onMouseEnter={() => setHoveredIdx(idx)}
          >
            {Icon && <Icon size={14} />}
            <span>{opt}</span>

            {/* Elastic Sliding Pill Backdrop */}
            {isActive && (
              <motion.div
                layoutId="segment-active-pill"
                className="fluid-active-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 26,
                  mass: 0.8
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── 2. Cosmic Theme Switch ──
export function CosmicThemeSwitch({
  isDark = true,
  onChange,
  className = "",
  style = {}
}) {
  const toggleState = () => {
    if (onChange) onChange(!isDark);
  };

  return (
    <div
      onClick={toggleState}
      className={`cosmic-switch-track ${isDark ? "dark" : "light"} ${className}`}
      style={style}
    >
      {/* Sky/Atmosphere Layer */}
      <div className="cosmic-sky-layer">
        {/* Light Mode: Clouds */}
        <AnimatePresence>
          {!isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10, y: 4 }}
                animate={{ opacity: 0.8, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="sky-cloud"
                style={{ left: 32, top: 4 }}
              >
                <Cloud size={10} fill="#ffffff" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15, y: 12 }}
                animate={{ opacity: 0.9, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="sky-cloud"
                style={{ left: 38, top: 16 }}
              >
                <Cloud size={14} fill="#ffffff" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Dark Mode: Stars */}
        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="sky-star"
                style={{ left: 14, top: 8 }}
              >
                <Star size={4} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.8, 0.3, 0.8], scale: [1, 0.7, 1] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.4 }}
                className="sky-star"
                style={{ left: 24, top: 18 }}
              >
                <Star size={3} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.7, 1.1, 0.7] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.8 }}
                className="sky-star"
                style={{ left: 16, top: 26 }}
              >
                <Star size={2} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Sliding Morphing Thumb */}
      <motion.div
        className={`cosmic-thumb ${isDark ? "dark" : "light"}`}
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          marginLeft: isDark ? "34px" : "0px",
        }}
      >
        {isDark ? (
          // Craters on Moon
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div className="moon-crater" style={{ width: 4, height: 4, left: 8, top: 8 }} />
            <div className="moon-crater" style={{ width: 6, height: 6, left: 14, top: 16 }} />
            <div className="moon-crater" style={{ width: 3, height: 3, left: 20, top: 10 }} />
          </div>
        ) : (
          // Glow center of sun
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffffff" }} />
        )}
      </motion.div>
    </div>
  );
}

// ── 3. Tactile 3D Switch ──
export function Tactile3DToggle({
  checked = false,
  onChange,
  className = "",
  style = {}
}) {
  const toggle = () => {
    if (onChange) onChange(!checked);
  };

  return (
    <div
      onClick={toggle}
      className={`tactile-3d-wrapper ${className}`}
      style={style}
    >
      {/* Behind Shadow Depth */}
      <div className="tactile-3d-depth" />

      {/* Button Front Face */}
      <div className="tactile-3d-face">
        {/* Toggle sliding handle */}
        <motion.div
          className="tactile-3d-handle"
          layout
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 24
          }}
          style={{
            marginLeft: checked ? "38px" : "0px"
          }}
        >
          {/* Inner metallic design ridges */}
          <div style={{ display: "flex", gap: "2px" }}>
            <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(0,0,0,0.3)" }} />
            <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(0,0,0,0.3)" }} />
          </div>
        </motion.div>

        {/* LED Indicator Slot */}
        <div className="tactile-led">
          <div className={`led-light ${checked ? "active" : "inactive"}`} />
        </div>
      </div>
    </div>
  );
}

// ── Interactive Switch Suite Showcase ──
export default function FluidSwitchShowcase() {
  // States for demo components
  const [segIdx, setSegIdx] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [is3DOn, setIs3DOn] = useState(false);

  return (
    <div className="fluid-switch-showcase-container">
      <style>{FLUID_SWITCH_STYLES}</style>
      <style>{`
        .fluid-switch-showcase-container {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .showcase-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }

        .showcase-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
        }

        .switch-playground-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .switch-playground-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .switch-section-card {
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: center;
        }

        .switch-card-title {
          font-size: 11px;
          font-weight: 700;
          color: #8e8e93;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          align-self: flex-start;
        }
      `}</style>

      {/* Header controls for switching view */}
      
   

      <div className="switch-playground-grid">
        {/* Card 1: Segment Switcher */}
        <div className="switch-section-card">
          <span className="switch-card-title">Fluid Segment Switch</span>
          <div style={{ height: "80px", display: "flex", alignItems: "center" }}>
            <FluidSegmentSwitch
              options={["Dashboard", "Analytics", "Settings"]}
              icons={[Layout, BarChart2, Settings]}
              activeIdx={segIdx}
              onChange={(i) => setSegIdx(i)}
            />
          </div>
          <div style={{ fontSize: "12.5px", color: "#8e8e93", textAlign: "center" }}>
            Selected: <strong style={{ color: "#ffffff" }}>{["Dashboard", "Analytics", "Settings"][segIdx]}</strong>
          </div>
        </div>

        {/* Card 2: Cosmic Theme Switcher */}
        <div className="switch-section-card">
          <span className="switch-card-title">Cosmic Theme Switch</span>
          <div style={{ height: "80px", display: "flex", alignItems: "center" }}>
            <CosmicThemeSwitch
              isDark={isDarkTheme}
              onChange={(val) => setIsDarkTheme(val)}
            />
          </div>
          <div style={{ fontSize: "12.5px", color: "#8e8e93", textAlign: "center" }}>
            Theme: <strong style={{ color: "#ffffff" }}>{isDarkTheme ? "Dark (Cosmic Night)" : "Light (Drifting Skies)"}</strong>
          </div>
        </div>

        {/* Card 3: Tactile 3D Switch */}
        <div className="switch-section-card">
          <span className="switch-card-title">Tactile 3D Toggle</span>
          <div style={{ height: "80px", display: "flex", alignItems: "center" }}>
            <Tactile3DToggle
              checked={is3DOn}
              onChange={(val) => setIs3DOn(val)}
            />
          </div>
          <div style={{ fontSize: "12.5px", color: "#8e8e93", textAlign: "center" }}>
            System LED: <strong style={{ color: is3DOn ? "#10b981" : "#ef4444" }}>{is3DOn ? "ON (Green)" : "OFF (Red)"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

