// src/components/ui/animations/FallingLetters.jsx
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Seeded RNG for reproducible randomness ---
function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

// --- Generate per-letter config (rotation + offsets) ---
function generateLetterConfigs(text, seed) {
  const rng = seed != null ? seededRng(seed) : Math.random;
  return text.split("").map(() => ({
    rotation:      -12 + rng() * 24,        // -12° to +12° — terbaca tapi berasa miring
    xJitter:        -6 + rng() * 12,        // ±6px — sedikit geser, tidak merusak jarak antar huruf
    yJitter:        -4 + rng() * 8,         // ±4px — sedikit naik/turun dari baseline
    startX:        -40 + rng() * 80,        // x drift saat jatuh
    startRotation: -120 + rng() * 240,      // spin awal saat jatuh (lebih moderate)
  }));
}

// --- Styles (scoped to component, self-contained) ---
const BASE_STYLES = (
  color,
  strokeWidth,
  fontSize,
  fontFamily
) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

  .fl-wrapper {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .fl-stage {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: clamp(12px, 4%, 32px);
    pointer-events: none;
  }

  .fl-stage-center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    pointer-events: none;
  }

  .fl-stage-left {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: clamp(12px, 4%, 32px);
    pointer-events: none;
  }

  .fl-letter-wrap {
    position: relative;
    display: inline-block;
    line-height: 1;
    will-change: transform;
  }

  .fl-letter {
    display: block;
    font-size: ${typeof fontSize === "number" ? fontSize + "px" : fontSize};
    font-family: ${fontFamily};
    font-weight: 900;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: ${strokeWidth}px ${color};
    text-stroke: ${strokeWidth}px ${color};
    user-select: none;
    letter-spacing: -0.01em;
  }

  .fl-shadow {
    position: absolute;
    inset: 0;
    display: block;
    font-size: ${typeof fontSize === "number" ? fontSize + "px" : fontSize};
    font-family: ${fontFamily};
    font-weight: 900;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: ${strokeWidth}px ${color};
    text-stroke: ${strokeWidth}px ${color};
    filter: blur(18px);
    opacity: 0.25;
    pointer-events: none;
    z-index: -1;
  }

  .fl-replay-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    transition: all 0.2s ease;
    font-family: inherit;
    pointer-events: all;
  }

  .fl-replay-btn:hover {
    background: rgba(255,255,255,0.12);
    color: #fff;
    border-color: rgba(255,255,255,0.2);
  }
`;

// --- Individual animated letter ---
function FallingLetter({ char, index, config, staggerDelay, fallDuration, bounciness, color, strokeWidth, fontSize, fontFamily, dropShadow }) {
  // Spring params: higher bounciness → lower damping (more bounce)
  const damping = Math.max(6, 30 - bounciness * 20);
  const stiffness = 180 + bounciness * 120;

  return (
    <div
      className="fl-letter-wrap"
      style={{ marginLeft: index === 0 ? 0 : "-0.08em" }}
    >
      <motion.div
        initial={{
          y: -600,
          x: config.startX,
          rotate: config.startRotation,
          opacity: 0,
        }}
        animate={{
          y: config.yJitter,
          x: config.xJitter,
          rotate: config.rotation,
          opacity: 1,
        }}
        transition={{
          delay: index * staggerDelay,
          duration: fallDuration,
          type: "spring",
          damping,
          stiffness,
          mass: 0.9,
          opacity: { duration: 0.01, delay: index * staggerDelay },
        }}
        style={{ display: "block", position: "relative" }}
      >
        {/* Drop shadow blur layer */}
        {dropShadow && (
          <motion.span
            className="fl-shadow"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * staggerDelay + fallDuration * 0.7,
              duration: 0.4,
            }}
          >
            {char}
          </motion.span>
        )}
        <span className="fl-letter">{char}</span>
      </motion.div>
    </div>
  );
}

// --- Main component ---
export default function FallingLetters({
  text            = "PORTFOLIO",
  color           = "#ffffff",
  strokeWidth     = 2,
  fontSize        = "clamp(52px, 12vw, 96px)",
  fontFamily      = "'Inter', 'Helvetica Neue', Arial Black, sans-serif",
  backgroundColor = "#000000",
  staggerDelay    = 0.12,
  fallDuration    = 0.6,
  bounciness      = 0.5,
  position        = "center",
  dropShadow      = true,
  seed            = undefined,
  showReplay      = true,
  className       = "",
}) {
  const [key, setKey] = useState(0);

  const configs = useMemo(
    () => generateLetterConfigs(text, seed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, seed, key]
  );

  const handleReplay = useCallback(() => setKey((k) => k + 1), []);

  const stageClass =
    position === "center"
      ? "fl-stage-center"
      : position === "bottom-left"
      ? "fl-stage-left"
      : "fl-stage"; // default: bottom-right

  const styleTag = BASE_STYLES(
    color, strokeWidth, fontSize, fontFamily
  );

  return (
    <div className={`fl-wrapper ${className}`}>
      <style>{styleTag}</style>

      <div className={stageClass} style={{ flexWrap: "wrap" }}>
        <AnimatePresence mode="wait">
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexWrap: "nowrap",
            }}
          >
            {text.split("").map((char, i) => (
              <FallingLetter
                key={i}
                char={char}
                index={i}
                config={configs[i]}
                staggerDelay={staggerDelay}
                fallDuration={fallDuration}
                bounciness={bounciness}
                color={color}
                strokeWidth={strokeWidth}
                fontSize={fontSize}
                fontFamily={fontFamily}
                dropShadow={dropShadow}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>

      {showReplay && (
        <button
          className="fl-replay-btn"
          onClick={handleReplay}
          aria-label="Replay animation"
        >
          ↺ Replay
        </button>
      )}
    </div>
  );
}
