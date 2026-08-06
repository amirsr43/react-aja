// src/components/ui/animations/FlickerText.jsx
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FLICKER_TIMES = [0, 0.05, 0.08, 0.15, 0.4, 0.43, 0.5, 0.6, 0.75, 0.78, 0.85, 1];
const FLICKER_OPACITY = [1, 1, 0.4, 1, 1, 0.2, 1, 1, 1, 0.1, 1, 1];

export default function FlickerText({
  text,
  as = "h1",
  color = "#ffffff",
  glowColor,
  fontSize = "4rem",
  speed = 4,
  flicker = true,
  glow = true,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldFlicker = flicker && !prefersReducedMotion;
  const finalGlowColor = glowColor || color;

  const glowOn = `0 0 10px ${finalGlowColor}, 0 0 25px ${finalGlowColor}, 0 0 45px ${finalGlowColor}`;
  const glowOff = `0 0 2px ${finalGlowColor}`;

  const textShadowKeyframes = useMemo(
    () => FLICKER_OPACITY.map((o) => (o === 1 ? glowOn : glowOff)),
    [glowOn, glowOff]
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      className={`flicker-text-preview ${className}`}
      style={{
        color,
        fontSize,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        margin: 0,
        userSelect: "none",
      }}
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
}
