// src/data/codes/doubleHoverText.js

export const doubleHoverTextCode = {
  code: {
    js: {
      css: `// DoubleHoverText.jsx (JavaScript + Custom CSS)
import React from "react";
import { motion } from "framer-motion";
import "./DoubleHoverText.css"; // Include the CSS stylesheet below

export default function DoubleHoverText({ text = "Hover Me", className = "" }) {
  const transition = {
    duration: 0.45,
    ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
  };

  return (
    <motion.span
      className={\`double-hover-wrapper \${className}\`}
      initial="initial"
      whileHover="hovered"
    >
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

        {/* Layer 2: Hovered state */}
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
}`,
      tailwind: `// DoubleHoverText.jsx (JavaScript + Tailwind CSS)
import React from "react";
import { motion } from "framer-motion";

export default function DoubleHoverText({ text = "Hover Me", className = "" }) {
  const transition = {
    duration: 0.45,
    ease: [0.215, 0.61, 0.355, 1],
  };

  return (
    <motion.span
      className={\`relative inline-block overflow-hidden cursor-pointer \${className}\`}
      initial="initial"
      whileHover="hovered"
    >
      <span className="relative block py-[0.1em]">
        {/* Layer 1: Normal state */}
        <motion.span
          className="block"
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={transition}
        >
          {text}
        </motion.span>

        {/* Layer 2: Hovered state */}
        <motion.span
          className="absolute inset-0 block text-purple-400"
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
}`
    },
    ts: {
      css: `// DoubleHoverText.tsx (TypeScript + Custom CSS)
import React from "react";
import { motion } from "framer-motion";
import "./DoubleHoverText.css";

interface DoubleHoverTextProps {
  text: string;
  className?: string;
}

export default function DoubleHoverText({ text = "Hover Me", className = "" }: DoubleHoverTextProps) {
  const transition = {
    duration: 0.45,
    ease: [0.215, 0.61, 0.355, 1],
  };

  return (
    <motion.span
      className={\`double-hover-wrapper \${className}\`}
      initial="initial"
      whileHover="hovered"
    >
      <span className="double-hover-inner">
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
}`,
      tailwind: `// DoubleHoverText.tsx (TypeScript + Tailwind CSS)
import React from "react";
import { motion } from "framer-motion";

interface DoubleHoverTextProps {
  text: string;
  className?: string;
}

export default function DoubleHoverText({ text = "Hover Me", className = "" }: DoubleHoverTextProps) {
  const transition = {
    duration: 0.45,
    ease: [0.215, 0.61, 0.355, 1],
  };

  return (
    <motion.span
      className={\`relative inline-block overflow-hidden cursor-pointer \${className}\`}
      initial="initial"
      whileHover="hovered"
    >
      <span className="relative block py-[0.1em]">
        <motion.span
          className="block"
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={transition}
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute inset-0 block text-purple-400"
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
}`
    }
  },
  css: `/* DoubleHoverText.css */
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
  color: #a78bfa; /* Accent color for the hover state */
}`
};
