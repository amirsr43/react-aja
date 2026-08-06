// src/data/codes/cinematicBlurText.js

export const cinematicBlurTextCode = {
  code: {
    js: {
      css: `// CinematicBlurText.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import "./CinematicBlurText.css"; // Include the CSS stylesheet below

export default function CinematicBlurText({ 
  text = "Atmospheric Cinematic Blur", 
  once = true,
  showReplay = true
}) {
  const [triggerKey, setTriggerKey] = useState(0);
  const characters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 4,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="cinematic-blur-outer">
      <motion.span
        key={triggerKey}
        className="cinematic-blur-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="cinematic-blur-char"
            variants={charVariants}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
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
      tailwind: `// CinematicBlurText.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function CinematicBlurText({ 
  text = "Atmospheric Cinematic Blur", 
  once = true,
  showReplay = true
}) {
  const [triggerKey, setTriggerKey] = useState(0);
  const characters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 4,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.span
        key={triggerKey}
        className="inline text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block whitespace-pre"
            variants={charVariants}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
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
      css: `// CinematicBlurText.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";
import "./CinematicBlurText.css"; // Include the CSS stylesheet below

interface CinematicBlurTextProps {
  text: string;
  once?: boolean;
  showReplay?: boolean;
}

export default function CinematicBlurText({ 
  text = "Atmospheric Cinematic Blur", 
  once = true,
  showReplay = true
}: CinematicBlurTextProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const characters = text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 4,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="cinematic-blur-outer">
      <motion.span
        key={triggerKey}
        className="cinematic-blur-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="cinematic-blur-char"
            variants={charVariants}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
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
      tailwind: `// CinematicBlurText.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";

interface CinematicBlurTextProps {
  text: string;
  once?: boolean;
  showReplay?: boolean;
}

export default function CinematicBlurText({ 
  text = "Atmospheric Cinematic Blur", 
  once = true,
  showReplay = true
}: CinematicBlurTextProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const characters = text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 4,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.span
        key={triggerKey}
        className="inline text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block whitespace-pre"
            variants={charVariants}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
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
  css: `/* CinematicBlurText.css */
.cinematic-blur-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cinematic-blur-container {
  display: inline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  text-align: center;
}

.cinematic-blur-char {
  display: inline-block;
  white-space: pre;
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
}`
};
