// src/components/LandingFeatures.jsx
import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

const BENTO_STYLES = `
/* ── BENTO GRID FEATURES SYSTEM ── */
.bento-features-section {
  padding: 80px 24px 100px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.02) 0%, transparent 60%);
  font-family: 'Outfit', 'Inter', sans-serif;
  color: #ffffff;
}

.bento-header {
  text-align: left;
  max-width: 1200px;
  margin: 0 auto 40px auto;
}

.bento-tag {
  font-size: 13px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  margin-bottom: 12px;
}

.bento-title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0;
  color: #ffffff;
}

.bento-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 320px;
  }
  
  .bento-card-wide-1 {
    grid-column: span 2;
  }
  
  .bento-card-wide-2 {
    grid-column: span 2;
  }
}

/* Bento Card Base */
.bento-card {
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
}

.bento-card:hover {
  transform: translateY(-4px);
}

/* Bento Card Themes */
.theme-dark-glass {
  background: rgba(15, 15, 20, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
}
.theme-dark-glass:hover {
  border-color: rgba(167, 139, 250, 0.25);
  box-shadow: 0 20px 50px rgba(124, 58, 237, 0.08);
}

/* Layout for Wide Cards with split columns on desktop */
.bento-card-split {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .bento-card-split {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 36px;
  }
  
  .bento-split-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  
  .bento-split-visual {
    width: 280px;
    flex-shrink: 0;
  }
}

/* Card Content Styling */
.bento-title-text {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 10px 0;
  letter-spacing: -0.015em;
  color: #ffffff;
}

.bento-desc-text {
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* Custom visual embeds */
.bento-visual-embed {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 18px;
  padding: 16px;
  font-family: monospace;
  font-size: 11.5px;
  width: 100%;
  box-sizing: border-box;
}

/* Visual 2: Copy Prompt Specs */
.visual-prompt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.visual-prompt-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.visual-prompt-btn.copied {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.2);
  background: rgba(52, 211, 153, 0.05);
}

.visual-prompt-text {
  color: #4ade80;
  font-family: monospace;
  font-size: 11px;
  line-height: 1.4;
  white-space: pre-wrap;
}

/* ── Browser Window Prompt Mockup ── */
.prompt-window-outer {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.prompt-window-inner {
  background: rgba(10, 10, 14, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.prompt-window-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.prompt-window-dots {
  display: flex;
  gap: 5px;
}

.prompt-window-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.prompt-window-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.25);
  font-family: monospace;
}

.prompt-window-body {
  flex: 1;
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.prompt-window-text {
  color: rgba(255, 255, 255, 0.55);
  font-family: monospace;
  font-size: 11.5px;
  line-height: 1.6;
  flex: 1;
  overflow: hidden;
}

.prompt-window-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.prompt-window-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a78bfa;
  position: relative;
  padding-bottom: 4px;
}

.prompt-window-label::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #a78bfa, #818cf8);
  border-radius: 2px;
}

/* Visual 4: Developer Tools — Orbital System */
.orbit-system {
  position: relative;
  width: 106px;
  height: 106px;
  margin: 0 auto;
}

/* Center star / core */
.orbit-core {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(255,255,255,0.06),
              0 0 12px rgba(255,255,255,0.3);
  z-index: 2;
}

/* Orbit ring tracks */
.orbit-ring {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px dashed rgba(255,255,255,0.08);
  pointer-events: none;
}
.orbit-ring-1 { width: 44px;  height: 44px; }
.orbit-ring-2 { width: 72px;  height: 72px; }
.orbit-ring-3 { width: 100px; height: 100px; }

/* Orbit arms — rotate around center */
.orbit-arm {
  position: absolute;
  top: 50%; left: 50%;
  height: 1px;
  transform-origin: left center;
  transform: translate(0, -0.5px);
}
.orbit-arm-1 { width: 22px; animation: planet-orbit 3.5s linear infinite; }
.orbit-arm-2 { width: 36px; animation: planet-orbit 7s  linear infinite reverse; }
.orbit-arm-3 { width: 50px; animation: planet-orbit 12s linear infinite; }

@keyframes planet-orbit {
  from { transform: translate(0, -0.5px) rotate(0deg); }
  to   { transform: translate(0, -0.5px) rotate(360deg); }
}

/* Planet dot — sits at tip of arm */
.orbit-planet {
  position: absolute;
  right: 0; top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
}
.planet-1 {
  width: 6px; height: 6px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 6px rgba(255,255,255,0.5);
}
.planet-2 {
  width: 7px; height: 7px;
  background: rgba(167, 139, 250, 0.95);
  box-shadow: 0 0 6px rgba(167,139,250,0.5);
}
.planet-3 {
  width: 5px; height: 5px;
  background: rgba(148, 163, 184, 0.8);
  box-shadow: 0 0 4px rgba(148,163,184,0.4);
}

/* Legend below orbit */
.orbit-legend {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.orbit-legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9.5px;
  font-weight: 700;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-family: 'DM Mono', 'Fira Code', monospace;
}
.ol-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ol-dot-1 { background: rgba(255,255,255,0.95); }
.ol-dot-2 { background: rgba(167, 139, 250, 0.95); }
.ol-dot-3 { background: rgba(148, 163, 184, 0.8); }

@keyframes prompt-blink {
  50% { opacity: 0; }
}

.prompt-cursor {
  animation: prompt-blink 0.8s infinite;
  color: #34d399;
  font-weight: 700;
  margin-left: 2px;
}

/* ── Tag Marquee ── */
.tag-marquee-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
  margin-bottom: 8px;
}

.tag-marquee-row {
  display: flex;
  gap: 8px;
  width: max-content;
  white-space: nowrap;
}

.marquee-left {
  animation: marquee-left-anim 20s linear infinite;
}

.marquee-right {
  animation: marquee-right-anim 20s linear infinite;
}

.tag-badge {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  font-family: inherit;
  transition: all 0.3s;
}

.tag-badge:hover {
  background: rgba(167, 139, 250, 0.08);
  border-color: rgba(167, 139, 250, 0.25);
  color: #ffffff;
}

@keyframes marquee-left-anim {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right-anim {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* ── Format Stack ── */
.format-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 320px;
}

.format-capsule {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.format-capsule:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateX(4px);
}

.format-capsule.active {
  background: rgba(167, 139, 250, 0.08);
  border-color: rgba(167, 139, 250, 0.45);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.15);
}

.format-capsule-text {
  font-family: 'Space Grotesk', monospace;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.format-capsule.active .format-capsule-text {
  color: #ffffff;
}

.format-capsule-badge {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s;
}

.format-capsule.active .format-capsule-badge {
  background: rgba(167, 139, 250, 0.2);
  color: #a78bfa;
}

/* ── Component Explorer Card ── */
.comp-explorer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, white 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, white 60%, transparent 100%);
}

.comp-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.0);
  background: transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.comp-row.comp-active {
  background: rgba(167, 139, 250, 0.06);
  border-color: rgba(167, 139, 250, 0.2);
}

.comp-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: box-shadow 0.4s ease;
}

.comp-row.comp-active .comp-dot {
  box-shadow: 0 0 6px 2px currentColor;
}

.comp-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  flex: 1;
  letter-spacing: -0.01em;
  transition: color 0.4s ease;
}

.comp-row.comp-active .comp-name {
  color: #ffffff;
}

.comp-cat {
  font-size: 8.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.25);
  transition: all 0.4s ease;
}

.comp-row.comp-active .comp-cat {
  background: rgba(167, 139, 250, 0.15);
  color: #a78bfa;
}

.comp-explorer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comp-explorer-title {
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin: 0;
}

.comp-explorer-count {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  background: rgba(167, 139, 250, 0.12);
  color: #a78bfa;
  letter-spacing: 0.02em;
}
`;

export default function LandingFeatures() {
  // Format selector states (Card 1) — auto-cycles
  const [activeFormat, setActiveFormat] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveFormat(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(cycle);
  }, []);

  // Component explorer active row — auto-cycles (Card 3)
  const [activeComp, setActiveComp] = useState(0);
  const COMP_LIST = [
    { name: "Fluid Switch", cat: "UI", color: "#a78bfa" },
    { name: "Expanding Search", cat: "UI", color: "#818cf8" },
    { name: "Modern Form", cat: "UI", color: "#a78bfa" },
    { name: "Battery Loader", cat: "UI", color: "#818cf8" },
    { name: "Cyber Decoder", cat: "ANIM", color: "#34d399" },
    { name: "3D Letters", cat: "ANIM", color: "#34d399" },
    { name: "Spotify Scroll", cat: "ANIM", color: "#34d399" },
  ];

  useEffect(() => {
    const compCycle = setInterval(() => {
      setActiveComp(prev => (prev + 1) % COMP_LIST.length);
    }, 1200);
    return () => clearInterval(compCycle);
  }, []);

  // Prompt states (Card 4)
  const [copied, setCopied] = useState(false);
  const promptText = "Create an elegant search bar input field in React that expands on focus. It reveals a glassmorphic suggestion dropdown with tags and search history triggers...";

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIdx = 0;
    let isWaiting = false;

    const interval = setInterval(() => {
      if (isWaiting) return;

      currentIdx++;
      setDisplayedText(promptText.slice(0, currentIdx));

      if (currentIdx >= promptText.length) {
        isWaiting = true;
        setTimeout(() => {
          currentIdx = 0;
          isWaiting = false;
        }, 3000); // Pause for 3s at the end before repeating
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bento-features-section" aria-label="Bento Features Grid">
      <style>{BENTO_STYLES}</style>

      {/* Left aligned header */}
      <div className="bento-header">
        <span className="bento-tag">Features Grid</span>
        <h2 className="bento-title">Engineered for Developers</h2>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="bento-grid">

        {/* ROW 1 - CARD 1: Wide - Stacked Formats Only */}
        <div
          className="bento-card bento-card-wide-1 theme-dark-glass"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div className="format-stack" style={{ maxWidth: "560px" }}>
              <div className={`format-capsule ${activeFormat === 0 ? "active" : ""}`}>
                <span className="format-capsule-text">JS + CSS</span>
                <span className="format-capsule-badge">Vanilla</span>
              </div>

              <div className={`format-capsule ${activeFormat === 1 ? "active" : ""}`}>
                <span className="format-capsule-text">TS + CSS</span>
                <span className="format-capsule-badge">Vanilla</span>
              </div>

              <div className={`format-capsule ${activeFormat === 2 ? "active" : ""}`}>
                <span className="format-capsule-text">JS + Tailwind</span>
                <span className="format-capsule-badge">Utility</span>
              </div>

              <div className={`format-capsule ${activeFormat === 3 ? "active" : ""}`}>
                <span className="format-capsule-text">TS + Tailwind</span>
                <span className="format-capsule-badge">Utility</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 1 - CARD 2: Narrow - Developer Tools */}
        <div className="bento-card theme-dark-glass" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
            {/* Orbital system */}
            <div className="orbit-system">
              <div className="orbit-core" />
              <div className="orbit-ring orbit-ring-1" />
              <div className="orbit-ring orbit-ring-2" />
              <div className="orbit-ring orbit-ring-3" />
              <div className="orbit-arm orbit-arm-1">
                <div className="orbit-planet planet-1" />
              </div>
              <div className="orbit-arm orbit-arm-2">
                <div className="orbit-planet planet-2" />
              </div>
              <div className="orbit-arm orbit-arm-3">
                <div className="orbit-planet planet-3" />
              </div>
            </div>
            {/* Legend */}
            <div className="orbit-legend">
              <span className="orbit-legend-item"><span className="ol-dot ol-dot-1" />SVG to JSX</span>
              <span className="orbit-legend-item"><span className="ol-dot ol-dot-2" />Theme Gen</span>
              <span className="orbit-legend-item"><span className="ol-dot ol-dot-3" />Px to Rem</span>
            </div>
          </div>

          <div style={{ marginTop: "12px" }}>
            <h3 className="bento-title-text" style={{ marginBottom: "6px" }}>Developer Tools</h3>
            <p className="bento-desc-text">
              Accelerate your workflow with custom SVG to JSX converters, color generators, and Px to Rem calculators.
            </p>
          </div>
        </div>

        {/* ROW 2 - CARD 3: Narrow - Component Explorer */}
        <div className="bento-card theme-dark-glass" style={{ display: "flex", flexDirection: "column", padding: "28px" }}>
          <div className="comp-explorer-header">
            <p className="comp-explorer-title">Library</p>
            <span className="comp-explorer-count">11+ items</span>
          </div>

          <div className="comp-explorer">
            {COMP_LIST.map((item, i) => (
              <div key={i} className={`comp-row ${activeComp === i ? "comp-active" : ""}`}>
                <div className="comp-dot" style={{ background: item.color, color: item.color }} />
                <span className="comp-name">{item.name}</span>
                <span className="comp-cat">{item.cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 - CARD 4: Wide - Browser Window Prompt Mockup */}
        <div
          className="bento-card bento-card-wide-2 theme-dark-glass"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px" }}
        >
          <div className="prompt-window-outer">
            <div className="prompt-window-inner">
              {/* Top bar */}
              <div className="prompt-window-topbar">
                <div className="prompt-window-dots">
                  <div className="prompt-window-dot" style={{ background: "rgba(239,68,68,0.5)" }} />
                  <div className="prompt-window-dot" style={{ background: "rgba(234,179,8,0.5)" }} />
                  <div className="prompt-window-dot" style={{ background: "rgba(34,197,94,0.5)" }} />
                </div>
                <span className="prompt-window-tag">&lt;/&gt;</span>
              </div>

              {/* Body */}
              <div className="prompt-window-body">
                <div className="prompt-window-text">
                  {displayedText}<span className="prompt-cursor">|</span>
                </div>

                <div className="prompt-window-footer">
                  <span className="prompt-window-label">AI Prompt</span>
                  <button
                    onClick={handleCopyPrompt}
                    className={`visual-prompt-btn ${copied ? "copied" : ""}`}
                    style={{ fontSize: "10px" }}
                  >
                    {copied ? <Check size={10} /> : <Copy size={10} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
