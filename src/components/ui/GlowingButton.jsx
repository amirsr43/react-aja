// src/components/ui/GlowingButton.jsx
import React, { useState } from "react";
import { Sparkles, ArrowRight, Zap, RefreshCw, Copy, Check } from "lucide-react";

const GLOWING_BUTTON_STYLES = `
/* ── GLOWING BUTTON CORE STYLES ── */
.glowing-btn-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  user-select: none;
  text-decoration: none;
  box-sizing: border-box;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: visible;
}

.glowing-btn-wrapper:hover:not(:disabled) {
  transform: scale(1.025);
}

.glowing-btn-wrapper:active:not(:disabled) {
  transform: scale(0.97);
}

.glowing-btn-wrapper:disabled {
  cursor: not-allowed;
}

/* Background border track (defines outline region) */
.glowing-btn-border-track {
  position: absolute;
  inset: 0;
  padding: 1.5px; /* Border thickness */
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

/* Shape styles */
.shape-pill,
.shape-pill .glowing-btn-border-track,
.shape-pill .glowing-btn-content,
.shape-pill .glowing-btn-glow-layer {
  border-radius: 9999px;
}

.shape-rounded,
.shape-rounded .glowing-btn-border-track,
.shape-rounded .glowing-btn-glow-layer {
  border-radius: 12px;
}
.shape-rounded .glowing-btn-content {
  border-radius: 10.5px; /* slightly smaller to fit inside border */
}

/* Rotating conic-gradient spinner */
.glowing-btn-spinner {
  position: absolute;
  top: -150%;
  left: -150%;
  width: 400%;
  height: 400%;
  transform-origin: center;
}

/* Keyframe rotating animation */
@keyframes glowing-btn-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Speed levels */
.speed-slow .glowing-btn-spinner {
  animation: glowing-btn-spin 8s linear infinite;
}
.speed-normal .glowing-btn-spinner {
  animation: glowing-btn-spin 4s linear infinite;
}
.speed-fast .glowing-btn-spinner {
  animation: glowing-btn-spin 1.8s linear infinite;
}

/* Presets gradient color maps */
.preset-aurora .glowing-btn-spinner {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #3b82f6 60deg,
    #d946ef 120deg,
    #8b5cf6 180deg,
    #06b6d4 240deg,
    #3b82f6 300deg,
    transparent 360deg
  );
}

.preset-cyber .glowing-btn-spinner {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #10b981 30deg, /* neon green */
    transparent 70deg,
    transparent 180deg,
    #06b6d4 210deg, /* neon cyan */
    transparent 250deg,
    transparent 360deg
  );
}

.preset-ember .glowing-btn-spinner {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #f97316 45deg, /* warm orange */
    #ef4444 135deg, /* crimson red */
    #eab308 225deg, /* amber yellow */
    #f97316 315deg,
    transparent 360deg
  );
}

.preset-glass .glowing-btn-spinner {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(255, 255, 255, 0.05) 90deg,
    rgba(255, 255, 255, 0.7) 180deg,
    rgba(255, 255, 255, 0.05) 270deg,
    rgba(255, 255, 255, 0.7) 360deg
  );
}

/* Ambient Glow Layer */
.glowing-btn-glow-layer {
  position: absolute;
  inset: -2px;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

/* Glow blur intensity presets */
.glow-none {
  display: none;
}
.glow-low {
  filter: blur(8px);
  opacity: 0.35;
}
.glow-medium {
  filter: blur(16px);
  opacity: 0.6;
}
.glow-high {
  filter: blur(28px);
  opacity: 0.85;
}

/* Hover scales glow intensity */
.glowing-btn-wrapper:hover:not(:disabled) .glow-low {
  opacity: 0.65;
}
.glowing-btn-wrapper:hover:not(:disabled) .glow-medium {
  opacity: 0.85;
}
.glowing-btn-wrapper:hover:not(:disabled) .glow-high {
  opacity: 1;
}

/* Inner content mask */
.glowing-btn-content {
  position: relative;
  z-index: 2;
  margin: 1.5px; /* Offset border padding */
  padding: 12px 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #09090b; /* Deep zinc-950 backdrop */
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.preset-glass .glowing-btn-content {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.glowing-btn-wrapper:hover:not(:disabled) .glowing-btn-content {
  background: #121215;
}

.preset-glass.glowing-btn-wrapper:hover:not(:disabled) .glowing-btn-content {
  background: rgba(255, 255, 255, 0.07);
}

/* Focus outline rings */
.glowing-btn-wrapper:focus-visible {
  box-shadow: 0 0 0 3px #000000, 0 0 0 5px rgba(255, 255, 255, 0.55);
}

/* Disabled state styling overrides */
.glowing-btn-wrapper:disabled .glowing-btn-border-track {
  background: rgba(255, 255, 255, 0.05) !important;
}
.glowing-btn-wrapper:disabled .glowing-btn-spinner {
  display: none !important;
}
.glowing-btn-wrapper:disabled .glowing-btn-glow-layer {
  display: none !important;
}
.glowing-btn-wrapper:disabled .glowing-btn-content {
  background: rgba(255, 255, 255, 0.02) !important;
  color: rgba(255, 255, 255, 0.2) !important;
}
`;

export function GlowingButton({
  preset = "aurora", // "aurora" | "cyber" | "ember" | "glass"
  speed = "normal", // "slow" | "normal" | "fast"
  glowIntensity = "medium", // "none" | "low" | "medium" | "high"
  shape = "pill", // "pill" | "rounded"
  disabled = false,
  onClick,
  children,
  icon: Icon,
  className = "",
  style = {},
  ...props
}) {
  const speedClass = `speed-${speed}`;
  const presetClass = `preset-${preset}`;
  const glowClass = `glow-${glowIntensity}`;
  const shapeClass = `shape-${shape}`;

  return (
    <>
      <style>{GLOWING_BUTTON_STYLES}</style>
      <button
        className={`glowing-btn-wrapper ${shapeClass} ${speedClass} ${presetClass} ${className}`}
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
        style={style}
        {...props}
      >
        {/* Outer ambient glow element */}
        <div className={`glowing-btn-glow-layer ${glowClass}`}>
          <div className="glowing-btn-spinner" />
        </div>

        {/* Rotating border outline container */}
        <div className="glowing-btn-border-track">
          <div className="glowing-btn-spinner" />
        </div>

        {/* Masked content container */}
        <span className="glowing-btn-content">
          {Icon && <Icon size={16} className="opacity-80" />}
          {children}
        </span>
      </button>
    </>
  );
}

// ── Interactive Customizer Playground Showcase ──
export default function GlowingButtonShowcase() {
  const [preset, setPreset] = useState("aurora");
  const [speed, setSpeed] = useState("normal");
  const [glowIntensity, setGlowIntensity] = useState("medium");
  const [shape, setShape] = useState("pill");
  const [disabled, setDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState("playground"); // "playground" | "spec-sheet"
  const [buttonText, setButtonText] = useState("Glow Button");
  const [hasIcon, setHasIcon] = useState(true);

  // Icon picking mapping
  const iconMap = {
    aurora: Sparkles,
    cyber: Zap,
    ember: RefreshCw,
    glass: ArrowRight,
  };

  const IconComponent = hasIcon ? iconMap[preset] || Sparkles : null;

  return (
    <div className="glow-showcase-container">
      <style>{`
        .glow-showcase-container {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .glow-showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }

        .glow-showcase-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
        }

        .glow-showcase-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3px;
          border-radius: 10px;
          gap: 2px;
        }

        .glow-tab-btn {
          background: transparent;
          border: none;
          color: #8e8e93;
          font-size: 12.5px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .glow-tab-btn:hover {
          color: #ffffff;
        }

        .glow-tab-btn.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* ── Controls Section ── */
        .glow-controls {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          background: rgba(10, 10, 10, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
        }

        @media (min-width: 768px) {
          .glow-controls {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .glow-controls {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .glow-control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .glow-control-label {
          font-size: 11px;
          font-weight: 700;
          color: #8e8e93;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .glow-control-inputs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .glow-control-btn {
          flex: 1;
          min-width: 70px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          text-transform: capitalize;
        }

        .glow-control-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .glow-control-btn.active {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          font-weight: 600;
        }

        .glow-text-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s;
        }

        .glow-text-input:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* ── Sandbox Panel ── */
        .glow-sandbox {
          background: radial-gradient(circle at center, rgba(15, 15, 20, 0.2) 0%, rgba(5, 5, 5, 0.6) 100%);
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 50px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 240px;
          position: relative;
        }

        /* Grid specifications mapping */
        .glow-specs-wrapper {
          overflow-x: auto;
          background: rgba(10, 10, 10, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 24px;
        }

        .glow-specs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .glow-specs-table th {
          text-align: left;
          padding: 12px 16px;
          font-size: 11px;
          font-weight: 750;
          color: #8e8e93;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          letter-spacing: 0.05em;
        }

        .glow-specs-table td {
          padding: 24px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          vertical-align: middle;
        }

        .glow-specs-table tr:last-child td {
          border-bottom: none;
        }

        .glow-specs-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #ffffff;
        }

        .glow-specs-description {
          font-size: 12px;
          color: #8e8e93;
          margin-top: 4px;
          font-weight: 400;
        }
      `}</style>

      {/* Showcase layout buttons */}
      <div className="glow-showcase-header">
        <span className="glow-showcase-title">Glowing Outline Buttons</span>
        <div className="glow-showcase-tabs">
          <button
            onClick={() => setActiveTab("playground")}
            className={`glow-tab-btn ${activeTab === "playground" ? "active" : ""}`}
          >
            Customizer Playground
          </button>
          <button
            onClick={() => setActiveTab("spec-sheet")}
            className={`glow-tab-btn ${activeTab === "spec-sheet" ? "active" : ""}`}
          >
            Preset Matrix
          </button>
        </div>
      </div>

      {activeTab === "playground" ? (
        <>
          {/* Controls settings dashboard */}
          <div className="glow-controls">
            <div className="glow-control-group">
              <span className="glow-control-label">Design Preset</span>
              <div className="glow-control-inputs">
                {["aurora", "cyber", "ember", "glass"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPreset(p)}
                    className={`glow-control-btn ${preset === p ? "active" : ""}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-control-group">
              <span className="glow-control-label">Rotation Speed</span>
              <div className="glow-control-inputs">
                {["slow", "normal", "fast"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`glow-control-btn ${speed === s ? "active" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-control-group">
              <span className="glow-control-label">Glow Intensity</span>
              <div className="glow-control-inputs">
                {["none", "low", "medium", "high"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGlowIntensity(g)}
                    className={`glow-control-btn ${glowIntensity === g ? "active" : ""}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-control-group">
              <span className="glow-control-label">Border Shape</span>
              <div className="glow-control-inputs">
                {["pill", "rounded"].map((sh) => (
                  <button
                    key={sh}
                    onClick={() => setShape(sh)}
                    className={`glow-control-btn ${shape === sh ? "active" : ""}`}
                  >
                    {sh}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional custom text and toggle properties */}
            <div className="glow-control-group" style={{ gridColumn: "span 2" }}>
              <span className="glow-control-label">Button Label</span>
              <input
                type="text"
                className="glow-text-input"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="e.g. Glowing Outline"
              />
            </div>

            <div className="glow-control-group">
              <span className="glow-control-label">Prefix Icon</span>
              <div className="glow-control-inputs">
                <button
                  onClick={() => setHasIcon(true)}
                  className={`glow-control-btn ${hasIcon ? "active" : ""}`}
                >
                  Enabled
                </button>
                <button
                  onClick={() => setHasIcon(false)}
                  className={`glow-control-btn ${!hasIcon ? "active" : ""}`}
                >
                  None
                </button>
              </div>
            </div>

            <div className="glow-control-group">
              <span className="glow-control-label">Interactive State</span>
              <div className="glow-control-inputs">
                <button
                  onClick={() => setDisabled(false)}
                  className={`glow-control-btn ${!disabled ? "active" : ""}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setDisabled(true)}
                  className={`glow-control-btn ${disabled ? "active" : ""}`}
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>

          {/* Playground render sandbox */}
          <div className="glow-sandbox">
            <GlowingButton
              preset={preset}
              speed={speed}
              glowIntensity={glowIntensity}
              shape={shape}
              disabled={disabled}
              icon={IconComponent}
            >
              {buttonText}
            </GlowingButton>
          </div>
        </>
      ) : (
        /* Spec-sheet grids */
        <div className="glow-specs-wrapper">
          <table className="glow-specs-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Preset Style</th>
                <th>Pill Shape</th>
                <th>Rounded Corners</th>
                <th>No Ambient Glow</th>
                <th>Disabled State</th>
              </tr>
            </thead>
            <tbody>
              {/* Aurora Row */}
              <tr>
                <td>
                  <span className="glow-specs-title">Aurora Neon</span>
                  <div className="glow-specs-description">Rich vibrant rainbow cycling gradients</div>
                </td>
                <td>
                  <GlowingButton preset="aurora" shape="pill" icon={Sparkles}>
                    Aurora Pill
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="aurora" shape="rounded" icon={Sparkles}>
                    Aurora Rounded
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="aurora" glowIntensity="none" icon={Sparkles}>
                    Minimal
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="aurora" disabled icon={Sparkles}>
                    Disabled
                  </GlowingButton>
                </td>
              </tr>

              {/* Cyber Row */}
              <tr>
                <td>
                  <span className="glow-specs-title">Cyber Radar</span>
                  <div className="glow-specs-description">Sleek emerald-cyan beam sweep radar</div>
                </td>
                <td>
                  <GlowingButton preset="cyber" shape="pill" icon={Zap}>
                    Cyber Pill
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="cyber" shape="rounded" icon={Zap}>
                    Cyber Rounded
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="cyber" glowIntensity="none" icon={Zap}>
                    Minimal
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="cyber" disabled icon={Zap}>
                    Disabled
                  </GlowingButton>
                </td>
              </tr>

              {/* Ember Row */}
              <tr>
                <td>
                  <span className="glow-specs-title">Volcanic Ember</span>
                  <div className="glow-specs-description">Deep lava orange-red amber glow pulses</div>
                </td>
                <td>
                  <GlowingButton preset="ember" shape="pill" icon={RefreshCw}>
                    Ember Pill
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="ember" shape="rounded" icon={RefreshCw}>
                    Ember Rounded
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="ember" glowIntensity="none" icon={RefreshCw}>
                    Minimal
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="ember" disabled icon={RefreshCw}>
                    Disabled
                  </GlowingButton>
                </td>
              </tr>

              {/* Glass Row */}
              <tr>
                <td>
                  <span className="glow-specs-title">Glassmorphic Silver</span>
                  <div className="glow-specs-description">Minimalist silver lines on frosted translucency</div>
                </td>
                <td>
                  <GlowingButton preset="glass" shape="pill" icon={ArrowRight}>
                    Silver Pill
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="glass" shape="rounded" icon={ArrowRight}>
                    Silver Rounded
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="glass" glowIntensity="none" icon={ArrowRight}>
                    Minimal
                  </GlowingButton>
                </td>
                <td>
                  <GlowingButton preset="glass" disabled icon={ArrowRight}>
                    Disabled
                  </GlowingButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
