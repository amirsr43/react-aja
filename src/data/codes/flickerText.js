// src/data/codes/flickerText.js

export const flickerTextCode = {
  code: {
    js: {
      css: `// FlickerText.jsx  (JavaScript + Custom CSS)
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./FlickerText.css";

// Pola timing tidak beraturan agar terasa seperti lampu neon asli
const FLICKER_TIMES   = [0, 0.05, 0.08, 0.15, 0.4, 0.43, 0.5, 0.6, 0.75, 0.78, 0.85, 1];
const FLICKER_OPACITY = [1, 1, 0.4, 1, 1, 0.2, 1, 1, 1, 0.1, 1, 1];

export default function FlickerText({
  text,
  as         = "h1",
  color      = "#ffffff",
  glowColor,
  fontSize   = "4rem",
  speed      = 4,
  flicker    = true,
  glow       = true,
  className  = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldFlicker = flicker && !prefersReducedMotion;
  const finalGlowColor = glowColor || color;

  const glowOn  = \`0 0 10px \${finalGlowColor}, 0 0 25px \${finalGlowColor}, 0 0 45px \${finalGlowColor}\`;
  const glowOff = \`0 0 2px \${finalGlowColor}\`;

  const textShadowKeyframes = useMemo(
    () => FLICKER_OPACITY.map((o) => (o === 1 ? glowOn : glowOff)),
    [glowOn, glowOff]
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      className={\`flicker-text \${className}\`}
      style={{ color, fontSize }}
      animate={
        shouldFlicker
          ? {
              opacity: FLICKER_OPACITY,
              ...(glow ? { textShadow: textShadowKeyframes } : {}),
            }
          : { opacity: 1, textShadow: glow ? glowOn : "none" }
      }
      transition={
        shouldFlicker
          ? {
              duration: speed,
              times: FLICKER_TIMES,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }
          : { duration: 0.6 }
      }
    >
      {text}
    </MotionTag>
  );
}`,
      tailwind: `// FlickerText.jsx  (JavaScript + Tailwind CSS)
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FLICKER_TIMES   = [0, 0.05, 0.08, 0.15, 0.4, 0.43, 0.5, 0.6, 0.75, 0.78, 0.85, 1];
const FLICKER_OPACITY = [1, 1, 0.4, 1, 1, 0.2, 1, 1, 1, 0.1, 1, 1];

export default function FlickerText({
  text,
  as        = "h1",
  color     = "#ffffff",
  glowColor,
  fontSize  = "4rem",
  speed     = 4,
  flicker   = true,
  glow      = true,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldFlicker = flicker && !prefersReducedMotion;
  const finalGlowColor = glowColor || color;

  const glowOn  = \`0 0 10px \${finalGlowColor}, 0 0 25px \${finalGlowColor}, 0 0 45px \${finalGlowColor}\`;
  const glowOff = \`0 0 2px \${finalGlowColor}\`;

  const textShadowKeyframes = useMemo(
    () => FLICKER_OPACITY.map((o) => (o === 1 ? glowOn : glowOff)),
    [glowOn, glowOff]
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      className={\`m-0 select-none uppercase tracking-wide font-medium \${className}\`}
      style={{ color, fontSize, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      animate={
        shouldFlicker
          ? {
              opacity: FLICKER_OPACITY,
              ...(glow ? { textShadow: textShadowKeyframes } : {}),
            }
          : { opacity: 1, textShadow: glow ? glowOn : "none" }
      }
      transition={
        shouldFlicker
          ? {
              duration: speed,
              times: FLICKER_TIMES,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }
          : { duration: 0.6 }
      }
    >
      {text}
    </MotionTag>
  );
}`
    },
    ts: {
      css: `// FlickerText.tsx  (TypeScript + Custom CSS)
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./FlickerText.css";

const FLICKER_TIMES   = [0, 0.05, 0.08, 0.15, 0.4, 0.43, 0.5, 0.6, 0.75, 0.78, 0.85, 1];
const FLICKER_OPACITY = [1, 1, 0.4, 1, 1, 0.2, 1, 1, 1, 0.1, 1, 1];

export interface FlickerTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  color?: string;
  glowColor?: string;
  fontSize?: string;
  speed?: number;
  flicker?: boolean;
  glow?: boolean;
  className?: string;
}

export default function FlickerText({
  text,
  as        = "h1",
  color     = "#ffffff",
  glowColor,
  fontSize  = "4rem",
  speed     = 4,
  flicker   = true,
  glow      = true,
  className = "",
}: FlickerTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldFlicker = flicker && !prefersReducedMotion;
  const finalGlowColor = glowColor || color;

  const glowOn  = \`0 0 10px \${finalGlowColor}, 0 0 25px \${finalGlowColor}, 0 0 45px \${finalGlowColor}\`;
  const glowOff = \`0 0 2px \${finalGlowColor}\`;

  const textShadowKeyframes = useMemo(
    () => FLICKER_OPACITY.map((o) => (o === 1 ? glowOn : glowOff)),
    [glowOn, glowOff]
  );

  const MotionTag = motion[as] as typeof motion.h1;

  return (
    <MotionTag
      className={\`flicker-text \${className}\`}
      style={{ color, fontSize }}
      animate={
        shouldFlicker
          ? {
              opacity: FLICKER_OPACITY,
              ...(glow ? { textShadow: textShadowKeyframes } : {}),
            }
          : { opacity: 1, textShadow: glow ? glowOn : "none" }
      }
      transition={
        shouldFlicker
          ? {
              duration: speed,
              times: FLICKER_TIMES,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }
          : { duration: 0.6 }
      }
    >
      {text}
    </MotionTag>
  );
}`,
      tailwind: `// FlickerText.tsx  (TypeScript + Tailwind CSS)
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FLICKER_TIMES   = [0, 0.05, 0.08, 0.15, 0.4, 0.43, 0.5, 0.6, 0.75, 0.78, 0.85, 1];
const FLICKER_OPACITY = [1, 1, 0.4, 1, 1, 0.2, 1, 1, 1, 0.1, 1, 1];

export interface FlickerTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  color?: string;
  glowColor?: string;
  fontSize?: string;
  speed?: number;
  flicker?: boolean;
  glow?: boolean;
  className?: string;
}

export default function FlickerText({
  text,
  as        = "h1",
  color     = "#ffffff",
  glowColor,
  fontSize  = "4rem",
  speed     = 4,
  flicker   = true,
  glow      = true,
  className = "",
}: FlickerTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldFlicker = flicker && !prefersReducedMotion;
  const finalGlowColor = glowColor || color;

  const glowOn  = \`0 0 10px \${finalGlowColor}, 0 0 25px \${finalGlowColor}, 0 0 45px \${finalGlowColor}\`;
  const glowOff = \`0 0 2px \${finalGlowColor}\`;

  const textShadowKeyframes = useMemo(
    () => FLICKER_OPACITY.map((o) => (o === 1 ? glowOn : glowOff)),
    [glowOn, glowOff]
  );

  const MotionTag = motion[as] as typeof motion.h1;

  return (
    <MotionTag
      className={\`m-0 select-none uppercase tracking-wide font-medium \${className}\`}
      style={{ color, fontSize, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      animate={
        shouldFlicker
          ? {
              opacity: FLICKER_OPACITY,
              ...(glow ? { textShadow: textShadowKeyframes } : {}),
            }
          : { opacity: 1, textShadow: glow ? glowOn : "none" }
      }
      transition={
        shouldFlicker
          ? {
              duration: speed,
              times: FLICKER_TIMES,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }
          : { duration: 0.6 }
      }
    >
      {text}
    </MotionTag>
  );
}`
    }
  },
  css: `/* FlickerText.css */
.flicker-text {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
  user-select: none;
  will-change: opacity, text-shadow;
}`
};
