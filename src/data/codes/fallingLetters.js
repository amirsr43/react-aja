// src/data/codes/fallingLetters.js

export const fallingLettersCode = {
  code: {
    js: {
      css: `// FallingLetters.jsx  (JavaScript + Custom CSS)
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FallingLetters.css"; // Include the CSS stylesheet below

// --- Seeded RNG for reproducible randomness ---
function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

function generateLetterConfigs(text, seed) {
  const rng = seed != null ? seededRng(seed) : Math.random;
  return text.split("").map(() => ({
    rotation:      -12 + rng() * 24,
    xJitter:        -6 + rng() * 12,
    yJitter:        -4 + rng() * 8,
    startX:        -40 + rng() * 80,
    startRotation: -120 + rng() * 240,
  }));
}

function FallingLetter({ char, index, config, staggerDelay, fallDuration, bounciness, dropShadow }) {
  const damping   = Math.max(6, 30 - bounciness * 20);
  const stiffness = 180 + bounciness * 120;

  return (
    <div className="fl-letter-wrap" style={{ marginLeft: index === 0 ? 0 : "-0.08em" }}>
      <motion.div
        initial={{ y: -600, x: config.startX, rotate: config.startRotation, opacity: 0 }}
        animate={{ y: config.yJitter, x: config.xJitter, rotate: config.rotation, opacity: 1 }}
        transition={{
          delay: index * staggerDelay,
          duration: fallDuration,
          type: "spring",
          damping, stiffness, mass: 0.9,
          opacity: { duration: 0.01, delay: index * staggerDelay },
        }}
        style={{ display: "block", position: "relative" }}
      >
        {dropShadow && (
          <motion.span
            className="fl-shadow"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * staggerDelay + fallDuration * 0.7, duration: 0.4 }}
          />
        )}
        <span className="fl-letter">{char}</span>
      </motion.div>
    </div>
  );
}

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
  position        = "bottom-right",
  dropShadow      = true,
  seed            = undefined,
  showReplay      = true,
  className       = "",
}) {
  const [key, setKey] = useState(0);
  const configs = useMemo(() => generateLetterConfigs(text, seed), [text, seed, key]);
  const handleReplay = useCallback(() => setKey((k) => k + 1), []);

  const stageClass =
    position === "center"     ? "fl-stage-center" :
    position === "bottom-left"? "fl-stage-left"   : "fl-stage";

  return (
    <div className={\`fl-wrapper \${className}\`}>
      <div className={stageClass}>
        <AnimatePresence mode="wait">
          <div key={key} style={{ display: "flex", alignItems: "flex-end", flexWrap: "nowrap" }}>
            {text.split("").map((char, i) => (
              <FallingLetter
                key={i} char={char} index={i} config={configs[i]}
                staggerDelay={staggerDelay} fallDuration={fallDuration}
                bounciness={bounciness} dropShadow={dropShadow}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
      {showReplay && (
        <button className="fl-replay-btn" onClick={handleReplay} aria-label="Replay animation">
          ↺ Replay
        </button>
      )}
    </div>
  );
}`,
      tailwind: `// FallingLetters.jsx  (JavaScript + Tailwind CSS)
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

function generateLetterConfigs(text, seed) {
  const rng = seed != null ? seededRng(seed) : Math.random;
  return text.split("").map(() => ({
    rotation:      -12 + rng() * 24,
    xJitter:        -6 + rng() * 12,
    yJitter:        -4 + rng() * 8,
    startX:        -40 + rng() * 80,
    startRotation: -120 + rng() * 240,
  }));
}

function FallingLetter({ char, index, config, staggerDelay, fallDuration, bounciness, dropShadow, color, strokeWidth, fontSize, fontFamily }) {
  const damping   = Math.max(6, 30 - bounciness * 20);
  const stiffness = 180 + bounciness * 120;

  return (
    <div className="relative inline-block leading-none" style={{ marginLeft: index === 0 ? 0 : "-0.08em" }}>
      <motion.div
        initial={{ y: -600, x: config.startX, rotate: config.startRotation, opacity: 0 }}
        animate={{ y: config.yJitter, x: config.xJitter, rotate: config.rotation, opacity: 1 }}
        transition={{
          delay: index * staggerDelay, duration: fallDuration,
          type: "spring", damping, stiffness, mass: 0.9,
          opacity: { duration: 0.01, delay: index * staggerDelay },
        }}
        style={{ display: "block", position: "relative" }}
      >
        {dropShadow && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 block"
            style={{
              fontSize, fontFamily, fontWeight: 900, color: "transparent",
              WebkitTextStroke: \`\${strokeWidth}px \${color}\`,
              filter: "blur(18px)", opacity: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: index * staggerDelay + fallDuration * 0.7, duration: 0.4 }}
          >{char}</motion.span>
        )}
        <span
          className="block"
          style={{
            fontSize, fontFamily, fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: \`\${strokeWidth}px \${color}\`,
            userSelect: "none",
          }}
        >{char}</span>
      </motion.div>
    </div>
  );
}

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
  position        = "bottom-right",
  dropShadow      = true,
  seed            = undefined,
  showReplay      = true,
  className       = "",
}) {
  const [key, setKey] = useState(0);
  const configs = useMemo(() => generateLetterConfigs(text, seed), [text, seed, key]);
  const handleReplay = useCallback(() => setKey((k) => k + 1), []);

  const positionClass =
    position === "center"      ? "items-center justify-center" :
    position === "bottom-left" ? "items-end justify-start p-4 sm:p-8" :
                                 "items-end justify-end p-4 sm:p-8";

  return (
    <div
      className={\`relative w-full rounded-[28px] overflow-hidden \${className}\`}
      style={{ background: backgroundColor, aspectRatio: "4/3", minHeight: 300 }}
    >
      <div className={\`absolute inset-0 flex pointer-events-none \${positionClass}\`}>
        <AnimatePresence mode="wait">
          <div key={key} className="flex items-end flex-nowrap">
            {text.split("").map((char, i) => (
              <FallingLetter
                key={i} char={char} index={i} config={configs[i]}
                staggerDelay={staggerDelay} fallDuration={fallDuration}
                bounciness={bounciness} dropShadow={dropShadow}
                color={color} strokeWidth={strokeWidth} fontSize={fontSize} fontFamily={fontFamily}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
      {showReplay && (
        <button
          className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/6 text-xs font-semibold text-white/70 hover:bg-white/12 hover:text-white hover:border-white/20 transition-all duration-200 pointer-events-auto"
          onClick={handleReplay}
          aria-label="Replay animation"
        >
          ↺ Replay
        </button>
      )}
    </div>
  );
}`
    },
    ts: {
      css: `// FallingLetters.tsx  (TypeScript + Custom CSS)
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FallingLetters.css"; // Include the CSS stylesheet below

interface FallingLettersProps {
  text?: string;
  color?: string;
  strokeWidth?: number;
  fontSize?: number | string;
  fontFamily?: string;
  backgroundColor?: string;
  staggerDelay?: number;
  fallDuration?: number;
  bounciness?: number;
  position?: "bottom-right" | "bottom-left" | "center" | "custom";
  dropShadow?: boolean;
  seed?: number;
  showReplay?: boolean;
  className?: string;
}

interface LetterConfig {
  rotation: number;
  xJitter: number;
  yJitter: number;
  startX: number;
  startRotation: number;
}

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

function generateLetterConfigs(text: string, seed?: number): LetterConfig[] {
  const rng = seed != null ? seededRng(seed) : Math.random;
  return text.split("").map(() => ({
    rotation:      -20 + rng() * 45,
    xJitter:       -18 + rng() * 36,
    yJitter:        -8 + rng() * 16,
    startX:        -60 + rng() * 120,
    startRotation: -180 + rng() * 360,
  }));
}

interface FallingLetterProps {
  char: string;
  index: number;
  config: LetterConfig;
  staggerDelay: number;
  fallDuration: number;
  bounciness: number;
  dropShadow: boolean;
}

function FallingLetter({ char, index, config, staggerDelay, fallDuration, bounciness, dropShadow }: FallingLetterProps) {
  const damping   = Math.max(6, 30 - bounciness * 20);
  const stiffness = 180 + bounciness * 120;

  return (
    <div className="fl-letter-wrap" style={{ marginLeft: index === 0 ? 0 : "-0.08em" }}>
      <motion.div
        initial={{ y: -600, x: config.startX, rotate: config.startRotation, opacity: 0 }}
        animate={{ y: config.yJitter, x: config.xJitter, rotate: config.rotation, opacity: 1 }}
        transition={{
          delay: index * staggerDelay, duration: fallDuration,
          type: "spring", damping, stiffness, mass: 0.9,
          opacity: { duration: 0.01, delay: index * staggerDelay },
        }}
        style={{ display: "block", position: "relative" }}
      >
        {dropShadow && (
          <motion.span
            className="fl-shadow"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * staggerDelay + fallDuration * 0.7, duration: 0.4 }}
          />
        )}
        <span className="fl-letter">{char}</span>
      </motion.div>
    </div>
  );
}

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
  position        = "bottom-right",
  dropShadow      = true,
  seed,
  showReplay      = true,
  className       = "",
}: FallingLettersProps) {
  const [key, setKey] = useState<number>(0);
  const configs = useMemo<LetterConfig[]>(() => generateLetterConfigs(text, seed), [text, seed, key]);
  const handleReplay = useCallback(() => setKey((k) => k + 1), []);

  const stageClass =
    position === "center"      ? "fl-stage-center" :
    position === "bottom-left" ? "fl-stage-left"   : "fl-stage";

  return (
    <div className={\`fl-wrapper \${className}\`}>
      <div className={stageClass}>
        <AnimatePresence mode="wait">
          <div key={key} style={{ display: "flex", alignItems: "flex-end", flexWrap: "nowrap" }}>
            {text.split("").map((char, i) => (
              <FallingLetter
                key={i} char={char} index={i} config={configs[i]}
                staggerDelay={staggerDelay} fallDuration={fallDuration}
                bounciness={bounciness} dropShadow={dropShadow}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
      {showReplay && (
        <button className="fl-replay-btn" onClick={handleReplay} aria-label="Replay animation">
          ↺ Replay
        </button>
      )}
    </div>
  );
}`,
      tailwind: `// FallingLetters.tsx  (TypeScript + Tailwind CSS)
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingLettersProps {
  text?: string;
  color?: string;
  strokeWidth?: number;
  fontSize?: number | string;
  fontFamily?: string;
  backgroundColor?: string;
  staggerDelay?: number;
  fallDuration?: number;
  bounciness?: number;
  position?: "bottom-right" | "bottom-left" | "center" | "custom";
  dropShadow?: boolean;
  seed?: number;
  showReplay?: boolean;
  className?: string;
}

interface LetterConfig {
  rotation: number;
  xJitter: number;
  yJitter: number;
  startX: number;
  startRotation: number;
}

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

function generateLetterConfigs(text: string, seed?: number): LetterConfig[] {
  const rng = seed != null ? seededRng(seed) : Math.random;
  return text.split("").map(() => ({
    rotation:      -20 + rng() * 45,
    xJitter:       -18 + rng() * 36,
    yJitter:        -8 + rng() * 16,
    startX:        -60 + rng() * 120,
    startRotation: -180 + rng() * 360,
  }));
}

function FallingLetter({
  char, index, config, staggerDelay, fallDuration, bounciness, dropShadow, color, strokeWidth, fontSize, fontFamily
}: { char: string; index: number; config: LetterConfig; staggerDelay: number; fallDuration: number; bounciness: number; dropShadow: boolean; color: string; strokeWidth: number; fontSize: number | string; fontFamily: string; }) {
  const damping   = Math.max(6, 30 - bounciness * 20);
  const stiffness = 180 + bounciness * 120;

  return (
    <div className="relative inline-block leading-none" style={{ marginLeft: index === 0 ? 0 : "-0.08em" }}>
      <motion.div
        initial={{ y: -600, x: config.startX, rotate: config.startRotation, opacity: 0 }}
        animate={{ y: config.yJitter, x: config.xJitter, rotate: config.rotation, opacity: 1 }}
        transition={{
          delay: index * staggerDelay, duration: fallDuration,
          type: "spring", damping, stiffness, mass: 0.9,
          opacity: { duration: 0.01, delay: index * staggerDelay },
        }}
        style={{ display: "block", position: "relative" }}
      >
        {dropShadow && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 block"
            style={{
              fontSize, fontFamily, fontWeight: 900, color: "transparent",
              WebkitTextStroke: \`\${strokeWidth}px \${color}\`,
              filter: "blur(18px)", opacity: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: index * staggerDelay + fallDuration * 0.7, duration: 0.4 }}
          >{char}</motion.span>
        )}
        <span
          className="block"
          style={{
            fontSize, fontFamily, fontWeight: 900, color: "transparent",
            WebkitTextStroke: \`\${strokeWidth}px \${color}\`,
            userSelect: "none",
          }}
        >{char}</span>
      </motion.div>
    </div>
  );
}

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
  position        = "bottom-right",
  dropShadow      = true,
  seed,
  showReplay      = true,
  className       = "",
}: FallingLettersProps) {
  const [key, setKey] = useState<number>(0);
  const configs = useMemo<LetterConfig[]>(() => generateLetterConfigs(text, seed), [text, seed, key]);
  const handleReplay = useCallback(() => setKey((k) => k + 1), []);

  const positionClass =
    position === "center"      ? "items-center justify-center" :
    position === "bottom-left" ? "items-end justify-start p-4 sm:p-8" :
                                 "items-end justify-end p-4 sm:p-8";

  return (
    <div
      className={\`relative w-full rounded-[28px] overflow-hidden \${className}\`}
      style={{ background: backgroundColor, aspectRatio: "4/3", minHeight: 300 }}
    >
      <div className={\`absolute inset-0 flex pointer-events-none \${positionClass}\`}>
        <AnimatePresence mode="wait">
          <div key={key} className="flex items-end flex-nowrap">
            {text.split("").map((char, i) => (
              <FallingLetter
                key={i} char={char} index={i} config={configs[i]}
                staggerDelay={staggerDelay} fallDuration={fallDuration}
                bounciness={bounciness} dropShadow={dropShadow}
                color={color} strokeWidth={strokeWidth} fontSize={fontSize} fontFamily={fontFamily}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
      {showReplay && (
        <button
          className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/6 text-xs font-semibold text-white/70 hover:bg-white/12 hover:text-white hover:border-white/20 transition-all duration-200 pointer-events-auto"
          onClick={handleReplay}
          aria-label="Replay animation"
        >
          ↺ Replay
        </button>
      )}
    </div>
  );
}`
    }
  },
  css: `/* FallingLetters.css */
.fl-wrapper {
  position: relative;
  width: 100%;
  border-radius: 28px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  min-height: 300px;
}

/* Bottom-right (default) */
.fl-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: clamp(12px, 4%, 32px);
  pointer-events: none;
}

/* Center */
.fl-stage-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* Bottom-left */
.fl-stage-left {
  position: absolute;
  inset: 0;
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
  font-weight: 900;
  line-height: 1;
  color: transparent;
  user-select: none;
  letter-spacing: -0.01em;
}

.fl-shadow {
  position: absolute;
  inset: 0;
  display: block;
  font-weight: 900;
  line-height: 1;
  color: transparent;
  filter: blur(18px);
  opacity: 0.25;
  pointer-events: none;
  z-index: -1;
}

.fl-replay-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-family: inherit;
  z-index: 10;
  pointer-events: all;
}

.fl-replay-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.2);
}`
};
