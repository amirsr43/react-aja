// src/components/ui/animations/DoubleHoverText.jsx
import React from "react";
import { motion } from "framer-motion";

const DOUBLE_HOVER_STYLES = `
.double-hover-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
}

.double-hover-inner {
  position: relative;
  display: block;
  padding: 0.1em 0;
}

.double-hover-text-primary {
  display: block;
}

.double-hover-text-secondary {
  position: absolute;
  inset: 0;
  display: block;
  color: #a78bfa; /* Accent color for the hover copy */
}
`;

export default function DoubleHoverText({ text = "Hover Me", className = "" }) {
  const transition = {
    duration: 0.45,
    ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
  };

  return (
    <motion.span
      className={`double-hover-wrapper ${className}`}
      initial="initial"
      whileHover="hovered"
    >
      <style>{DOUBLE_HOVER_STYLES}</style>
      <span className="double-hover-inner">
        {/* Layer 1: Normal state */}
        <motion.span
          className="double-hover-text-primary"
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={transition}
        >
          {text}
        </motion.span>

        {/* Layer 2: Hovered state (positioned underneath) */}
        <motion.span
          className="double-hover-text-secondary"
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={transition}
        >
          {text}
        </motion.span>
      </span>
    </motion.span>
  );
}
