// src/data/codes/heroWordSwapper.js

export const heroWordSwapperCode = {
  code: {
    js: {
      css: `// HeroWordSwapper.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroWordSwapper.css"; // Include the CSS stylesheet below

export default function HeroWordSwapper({ 
  words = ["Experiences", "Interfaces", "Platforms", "Solutions"], 
  interval = 3000,
  className = "" 
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={\`word-swapper-container \${className}\`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="word-swapper-item"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1], // Ultra-smooth ease out expo
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}`,
      tailwind: `// HeroWordSwapper.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroWordSwapper({ 
  words = ["Experiences", "Interfaces", "Platforms", "Solutions"], 
  interval = 3000,
  className = "" 
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={\`inline-block relative overflow-hidden h-[1.2em] vertical-align-middle \${className}\`} style={{ verticalAlign: "middle" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}`
    },
    ts: {
      css: `// HeroWordSwapper.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroWordSwapper.css";

interface HeroWordSwapperProps {
  words?: string[];
  interval?: number;
  className?: string;
}

export default function HeroWordSwapper({ 
  words = ["Experiences", "Interfaces", "Platforms", "Solutions"], 
  interval = 3000,
  className = "" 
}: HeroWordSwapperProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={\`word-swapper-container \${className}\`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="word-swapper-item"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}`,
      tailwind: `// HeroWordSwapper.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroWordSwapperProps {
  words?: string[];
  interval?: number;
  className?: string;
}

export default function HeroWordSwapper({ 
  words = ["Experiences", "Interfaces", "Platforms", "Solutions"], 
  interval = 3000,
  className = "" 
}: HeroWordSwapperProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={\`inline-block relative overflow-hidden h-[1.2em] vertical-align-middle \${className}\`} style={{ verticalAlign: "middle" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}`
    }
  },
  css: `/* HeroWordSwapper.css */
.word-swapper-container {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  height: 1.2em;
  line-height: 1.2;
}

.word-swapper-item {
  display: inline-block;
}`
};
