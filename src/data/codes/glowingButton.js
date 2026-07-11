// src/data/codes/glowingButton.js

export const glowingButtonCode = {
  code: {
    js: {
      css: `// GlowingButton.jsx (JavaScript + Custom CSS)
import React from "react";
import "./GlowingButton.css"; // Save the CSS below into this file

export default function GlowingButton({
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
  const speedClass = "speed-" + speed;
  const presetClass = "preset-" + preset;
  const glowClass = "glow-" + glowIntensity;
  const shapeClass = "shape-" + shape;

  return (
    <button
      className={\`glowing-btn-wrapper \${shapeClass} \${speedClass} \${presetClass} \${className}\`}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      style={style}
      {...props}
    >
      {/* Outer ambient glow element */}
      <div className={\`glowing-btn-glow-layer \${glowClass}\`}>
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
  );
}`,
      tailwind: `// GlowingButton.jsx (JavaScript + Tailwind CSS)
import React from "react";

export default function GlowingButton({
  preset = "aurora", // "aurora" | "cyber" | "ember" | "glass"
  speed = "normal", // "slow" | "normal" | "fast"
  glowIntensity = "medium", // "none" | "low" | "medium" | "high"
  shape = "pill", // "pill" | "rounded"
  disabled = false,
  onClick,
  children,
  icon: Icon,
  ...props
}) {
  // Presets gradient mapping
  const gradients = {
    aurora: "conic-gradient(from 0deg, transparent 0deg, #3b82f6 60deg, #d946ef 120deg, #8b5cf6 180deg, #06b6d4 240deg, #3b82f6 300deg, transparent 360deg)",
    cyber: "conic-gradient(from 0deg, transparent 0deg, #10b981 30deg, transparent 70deg, transparent 180deg, #06b6d4 210deg, transparent 250deg, transparent 360deg)",
    ember: "conic-gradient(from 0deg, transparent 0deg, #f97316 45deg, #ef4444 135deg, #eab308 225deg, #f97316 315deg, transparent 360deg)",
    glass: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.05) 90deg, rgba(255,255,255,0.7) 180deg, rgba(255,255,255,0.05) 270deg, rgba(255,255,255,0.7) 360deg)"
  };

  const animationSpeeds = {
    slow: "animate-[spin_8s_linear_infinite]",
    normal: "animate-[spin_4s_linear_infinite]",
    fast: "animate-[spin_1.8s_linear_infinite]"
  };

  const glows = {
    none: "hidden",
    low: "blur-[8px] opacity-35 group-hover:opacity-55",
    medium: "blur-[16px] opacity-60 group-hover:opacity-85",
    high: "blur-[28px] opacity-85 group-hover:opacity-100"
  };

  const shapes = {
    pill: {
      wrapper: "rounded-full",
      inner: "rounded-full"
    },
    rounded: {
      wrapper: "rounded-xl",
      inner: "rounded-[10.5px]"
    }
  };

  const selectedGradient = gradients[preset] || gradients.aurora;
  const selectedSpeed = animationSpeeds[speed] || animationSpeeds.normal;
  const selectedGlow = glows[glowIntensity] || glows.medium;
  const selectedShape = shapes[shape] || shapes.pill;

  const innerBg = preset === "glass" 
    ? "bg-white/[0.03] backdrop-blur-md group-hover:bg-white/[0.07]" 
    : "bg-[#09090b] group-hover:bg-[#121215]";

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={\`relative inline-flex items-center justify-center p-0 border-none bg-transparent cursor-pointer outline-none select-none transition-transform duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:scale-[1.025] active:scale-[0.97] disabled:cursor-not-allowed group \${selectedShape.wrapper}\`}
      {...props}
    >
      {/* Outer Ambient Glow */}
      {!disabled && glowIntensity !== "none" && (
        <div className={\`absolute inset-[-2px] -z-10 pointer-events-none transition-opacity duration-300 overflow-hidden \${selectedShape.wrapper} \${selectedGlow}\`}>
          <div 
            style={{ backgroundImage: selectedGradient }}
            className={\`absolute top-[-150%] left-[-150%] w-[400%] h-[400%] origin-center \${selectedSpeed}\`} 
          />
        </div>
      )}

      {/* Rotating Border Outline */}
      <div className={\`absolute inset-0 p-[1.5px] overflow-hidden -z-10 pointer-events-none \${selectedShape.wrapper} \${disabled ? "bg-white/5" : ""}\`}>
        {!disabled && (
          <div 
            style={{ backgroundImage: selectedGradient }}
            className={\`absolute top-[-150%] left-[-150%] w-[400%] h-[400%] origin-center \${selectedSpeed}\`} 
          />
        )}
      </div>

      {/* Inner Mask Content */}
      <span className={\`relative z-10 m-[1.5px] py-3 px-7 inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold text-white transition-all duration-300 \${selectedShape.inner} \${disabled ? "bg-white/2 text-white/20" : innerBg}\`}>
        {Icon && <Icon size={16} className="opacity-80" />}
        {children}
      </span>
    </button>
  );
}`
    },
    ts: {
      css: `// GlowingButton.tsx (TypeScript + Custom CSS)
import React, { ButtonHTMLAttributes, ComponentType } from "react";
import "./GlowingButton.css"; // Save the CSS below into this file

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  preset?: "aurora" | "cyber" | "ember" | "glass";
  speed?: "slow" | "normal" | "fast";
  glowIntensity?: "none" | "low" | "medium" | "high";
  shape?: "pill" | "rounded";
  icon?: ComponentType<{ size?: number; className?: string }>;
}

export default function GlowingButton({
  preset = "aurora",
  speed = "normal",
  glowIntensity = "medium",
  shape = "pill",
  disabled = false,
  onClick,
  children,
  icon: Icon,
  className = "",
  style = {},
  ...props
}: GlowingButtonProps) {
  const speedClass = "speed-" + speed;
  const presetClass = "preset-" + preset;
  const glowClass = "glow-" + glowIntensity;
  const shapeClass = "shape-" + shape;

  return (
    <button
      className={\`glowing-btn-wrapper \${shapeClass} \${speedClass} \${presetClass} \${className}\`}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      style={style}
      {...props}
    >
      {/* Outer ambient glow element */}
      <div className={\`glowing-btn-glow-layer \${glowClass}\`}>
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
  );
}`,
      tailwind: `// GlowingButton.tsx (TypeScript + Tailwind CSS)
import React, { ButtonHTMLAttributes, ComponentType } from "react";

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  preset?: "aurora" | "cyber" | "ember" | "glass";
  speed?: "slow" | "normal" | "fast";
  glowIntensity?: "none" | "low" | "medium" | "high";
  shape?: "pill" | "rounded";
  icon?: ComponentType<{ size?: number; className?: string }>;
}

export default function GlowingButton({
  preset = "aurora",
  speed = "normal",
  glowIntensity = "medium",
  shape = "pill",
  disabled = false,
  onClick,
  children,
  icon: Icon,
  ...props
}: GlowingButtonProps) {
  // Presets gradient mapping
  const gradients = {
    aurora: "conic-gradient(from 0deg, transparent 0deg, #3b82f6 60deg, #d946ef 120deg, #8b5cf6 180deg, #06b6d4 240deg, #3b82f6 300deg, transparent 360deg)",
    cyber: "conic-gradient(from 0deg, transparent 0deg, #10b981 30deg, transparent 70deg, transparent 180deg, #06b6d4 210deg, transparent 250deg, transparent 360deg)",
    ember: "conic-gradient(from 0deg, transparent 0deg, #f97316 45deg, #ef4444 135deg, #eab308 225deg, #f97316 315deg, transparent 360deg)",
    glass: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.05) 90deg, rgba(255,255,255,0.7) 180deg, rgba(255,255,255,0.05) 270deg, rgba(255,255,255,0.7) 360deg)"
  };

  const animationSpeeds = {
    slow: "animate-[spin_8s_linear_infinite]",
    normal: "animate-[spin_4s_linear_infinite]",
    fast: "animate-[spin_1.8s_linear_infinite]"
  };

  const glows = {
    none: "hidden",
    low: "blur-[8px] opacity-35 group-hover:opacity-55",
    medium: "blur-[16px] opacity-60 group-hover:opacity-85",
    high: "blur-[28px] opacity-85 group-hover:opacity-100"
  };

  const shapes = {
    pill: {
      wrapper: "rounded-full",
      inner: "rounded-full"
    },
    rounded: {
      wrapper: "rounded-xl",
      inner: "rounded-[10.5px]"
    }
  };

  const selectedGradient = gradients[preset] || gradients.aurora;
  const selectedSpeed = animationSpeeds[speed] || animationSpeeds.normal;
  const selectedGlow = glows[glowIntensity] || glows.medium;
  const selectedShape = shapes[shape] || shapes.pill;

  const innerBg = preset === "glass" 
    ? "bg-white/[0.03] backdrop-blur-md group-hover:bg-white/[0.07]" 
    : "bg-[#09090b] group-hover:bg-[#121215]";

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={\`relative inline-flex items-center justify-center p-0 border-none bg-transparent cursor-pointer outline-none select-none transition-transform duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:scale-[1.025] active:scale-[0.97] disabled:cursor-not-allowed group \${selectedShape.wrapper}\`}
      {...props}
    >
      {/* Outer Ambient Glow */}
      {!disabled && glowIntensity !== "none" && (
        <div className={\`absolute inset-[-2px] -z-10 pointer-events-none transition-opacity duration-300 overflow-hidden \${selectedShape.wrapper} \${selectedGlow}\`}>
          <div 
            style={{ backgroundImage: selectedGradient }}
            className={\`absolute top-[-150%] left-[-150%] w-[400%] h-[400%] origin-center \${selectedSpeed}\`} 
          />
        </div>
      )}

      {/* Rotating Border Outline */}
      <div className={\`absolute inset-0 p-[1.5px] overflow-hidden -z-10 pointer-events-none \${selectedShape.wrapper} \${disabled ? "bg-white/5" : ""}\`}>
        {!disabled && (
          <div 
            style={{ backgroundImage: selectedGradient }}
            className={\`absolute top-[-150%] left-[-150%] w-[400%] h-[400%] origin-center \${selectedSpeed}\`} 
          />
        )}
      </div>

      {/* Inner Mask Content */}
      <span className={\`relative z-10 m-[1.5px] py-3 px-7 inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold text-white transition-all duration-300 \${selectedShape.inner} \${disabled ? "bg-white/2 text-white/20" : innerBg}\`}>
        {Icon && <Icon size={16} className="opacity-80" />}
        {children}
      </span>
    </button>
  );
}`
    }
  },
  css: `/* GlowingButton.css */

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
  padding: 1.5px;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

/* Shapes configuration */
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
  border-radius: 10.5px;
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

/* Presets color mappings */
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
    #10b981 30deg,
    transparent 70deg,
    transparent 180deg,
    #06b6d4 210deg,
    transparent 250deg,
    transparent 360deg
  );
}

.preset-ember .glowing-btn-spinner {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #f97316 45deg,
    #ef4444 135deg,
    #eab308 225deg,
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

/* Ambient glow layer blur sizing */
.glowing-btn-glow-layer {
  position: absolute;
  inset: -2px;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

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
  margin: 1.5px;
  padding: 12px 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #09090b;
  transition: background 0.3s ease, color 0.3s ease;
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

/* Focus indicator */
.glowing-btn-wrapper:focus-visible {
  box-shadow: 0 0 0 3px #000000, 0 0 0 5px rgba(255, 255, 255, 0.55);
}

/* Disabled State Overrides */
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
}`
};
