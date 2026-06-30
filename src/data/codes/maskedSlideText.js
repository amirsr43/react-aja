// src/data/codes/maskedSlideText.js

export const maskedSlideTextCode = {
  code: {
    js: {
      css: `// MaskedSlideText.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import "./MaskedSlideText.css"; // Include the CSS stylesheet below

export default function MaskedSlideText({ 
  text = "Sleek Editorial Text Animation", 
  once = true, 
  showReplay = true 
}) {
  const [triggerKey, setTriggerKey] = useState(0);
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier
      },
    },
  };

  return (
    <div className="masked-slide-outer">
      <motion.span
        key={triggerKey}
        className="masked-slide-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {words.map((word, index) => (
          <span key={index} className="masked-slide-word-wrapper">
            <motion.span className="masked-slide-word" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
      {showReplay && (
        <button className="text-replay-btn" onClick={() => setTriggerKey(prev => prev + 1)}>
          <Play size={12} fill="currentColor" /> Replay
        </button>
      )}
    </div>
  );
}`,
      tailwind: `// MaskedSlideText.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function MaskedSlideText({ 
  text = "Sleek Editorial Text Animation", 
  once = true, 
  showReplay = true 
}) {
  const [triggerKey, setTriggerKey] = useState(0);
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.span
        key={triggerKey}
        className="inline-flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] pb-[0.055em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
      {showReplay && (
        <button 
          className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 text-xs font-semibold text-white/75 hover:bg-white/10 hover:text-white hover:border-white/15 transition-all duration-200"
          onClick={() => setTriggerKey(prev => prev + 1)}
        >
          <Play size={12} fill="currentColor" /> Replay
        </button>
      )}
    </div>
  );
}`
    },
    ts: {
      css: `// MaskedSlideText.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";
import "./MaskedSlideText.css"; // Include the CSS stylesheet below

interface MaskedSlideTextProps {
  text: string;
  once?: boolean;
  showReplay?: boolean;
}

export default function MaskedSlideText({ 
  text = "Sleek Editorial Text Animation", 
  once = true, 
  showReplay = true 
}: MaskedSlideTextProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="masked-slide-outer">
      <motion.span
        key={triggerKey}
        className="masked-slide-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {words.map((word, index) => (
          <span key={index} className="masked-slide-word-wrapper">
            <motion.span className="masked-slide-word" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
      {showReplay && (
        <button className="text-replay-btn" onClick={() => setTriggerKey(prev => prev + 1)}>
          <Play size={12} fill="currentColor" /> Replay
        </button>
      )}
    </div>
  );
}`,
      tailwind: `// MaskedSlideText.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";

interface MaskedSlideTextProps {
  text: string;
  once?: boolean;
  showReplay?: boolean;
}

export default function MaskedSlideText({ 
  text = "Sleek Editorial Text Animation", 
  once = true, 
  showReplay = true 
}: MaskedSlideTextProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.span
        key={triggerKey}
        className="inline-flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] pb-[0.055em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
      {showReplay && (
        <button 
          className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 text-xs font-semibold text-white/75 hover:bg-white/10 hover:text-white hover:border-white/15 transition-all duration-200"
          onClick={() => setTriggerKey(prev => prev + 1)}
        >
          <Play size={12} fill="currentColor" /> Replay
        </button>
      )}
    </div>
  );
}`
    }
  },
  css: `/* MaskedSlideText.css */
.masked-slide-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.masked-slide-container {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
}

.masked-slide-word-wrapper {
  display: inline-block;
  overflow: hidden;
  margin-right: 0.25em;
  padding-bottom: 0.05em;
}

.masked-slide-word {
  display: inline-block;
}

.text-replay-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.text-replay-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.15);
}`,
  tailwind: `/* Tailwind configuration utilities are not strictly required since it uses default inline spacing and utility classes */`
};
