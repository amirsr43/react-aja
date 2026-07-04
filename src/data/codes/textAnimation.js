// src/data/codes/textAnimation.js

export const textAnimationCode = {
  code: {
    js: {
      css: `// TextAnimation.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import "./TextAnimation.css"; // Include the CSS stylesheet below

// ── 1. Cyber Decoder Text Component ──
export function CyberDecoderText({ text = "CYBERNETIC SYSTEM" }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "$%#@&?*01[]/{}<>-+";

  const decrypt = () => {
    let iterations = 0;
    const targetText = text;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1 / 3;

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 30);
  };

  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <div className="cyber-decoder-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div className="text-cyber-display">{displayText}</div>
      <button className="text-control-btn" onClick={decrypt}>
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}

// ── 2. Interactive Letter Float Component ──
export function InteractiveFloatText({ text = "Hover over this sentence" }) {
  return (
    <div className="text-float-display">
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="space-char"> </span>;
        return (
          <motion.span
            key={i}
            className="text-float-char"
            whileHover={{ 
              y: -8, 
              scale: 1.15,
              textShadow: "0 0 10px rgba(139, 92, 246, 0.6)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}`,
      tailwind: `// TextAnimation.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// ── 1. Cyber Decoder Text Component ──
export function CyberDecoderText({ text = "CYBERNETIC SYSTEM" }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "$%#@&?*01[]/{}<>-+";

  const decrypt = () => {
    let iterations = 0;
    const targetText = text;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1 / 3;

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 30);
  };

  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#00ff66] drop-shadow-[0_0_12px_rgba(0,255,102,0.35)] my-4">
        {displayText}
      </div>
      <button 
        className="bg-white/3 border border-white/6 rounded-xl px-4 py-2 text-xs text-white/70 hover:bg-white/6 hover:text-white transition flex items-center gap-1.5 cursor-pointer" 
        onClick={decrypt}
      >
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}

// ── 2. Interactive Letter Float Component ──
export function InteractiveFloatText({ text = "Hover over this sentence" }) {
  return (
    <div className="flex flex-wrap justify-center text-xl sm:text-2xl font-extrabold my-4">
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="w-2"> </span>;
        return (
          <motion.span
            key={i}
            className="inline-block cursor-pointer text-white hover:text-violet-500 transition-colors duration-150"
            whileHover={{ 
              y: -8, 
              scale: 1.15,
              textShadow: "0 0 10px rgba(139, 92, 246, 0.6)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}`
    },
    ts: {
      css: `// TextAnimation.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import "./TextAnimation.css"; // Include the CSS stylesheet below

interface TextProps {
  text?: string;
}

// ── 1. Cyber Decoder Text Component ──
export function CyberDecoderText({ text = "CYBERNETIC SYSTEM" }: TextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const chars = "$%#@&?*01[]/{}<>-+";

  const decrypt = () => {
    let iterations = 0;
    const targetText = text;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1 / 3;

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 30);
  };

  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <div className="cyber-decoder-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div className="text-cyber-display">{displayText}</div>
      <button className="text-control-btn" onClick={decrypt}>
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}

// ── 2. Interactive Letter Float Component ──
export function InteractiveFloatText({ text = "Hover over this sentence" }: TextProps) {
  return (
    <div className="text-float-display">
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="space-char"> </span>;
        return (
          <motion.span
            key={i}
            className="text-float-char"
            whileHover={{ 
              y: -8, 
              scale: 1.15,
              textShadow: "0 0 10px rgba(139, 92, 246, 0.6)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}`,
      tailwind: `// TextAnimation.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface TextProps {
  text?: string;
}

// ── 1. Cyber Decoder Text Component ──
export function CyberDecoderText({ text = "CYBERNETIC SYSTEM" }: TextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const chars = "$%#@&?*01[]/{}<>-+";

  const decrypt = () => {
    let iterations = 0;
    const targetText = text;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1 / 3;

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 30);
  };

  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#00ff66] drop-shadow-[0_0_12px_rgba(0,255,102,0.35)] my-4">
        {displayText}
      </div>
      <button 
        className="bg-white/3 border border-white/6 rounded-xl px-4 py-2 text-xs text-white/70 hover:bg-white/6 hover:text-white transition flex items-center gap-1.5 cursor-pointer" 
        onClick={decrypt}
      >
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}

// ── 2. Interactive Letter Float Component ──
export function InteractiveFloatText({ text = "Hover over this sentence" }: TextProps) {
  return (
    <div className="flex flex-wrap justify-center text-xl sm:text-2xl font-extrabold my-4">
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="w-2"> </span>;
        return (
          <motion.span
            key={i}
            className="inline-block cursor-pointer text-white hover:text-violet-500 transition-colors duration-150"
            whileHover={{ 
              y: -8, 
              scale: 1.15,
              textShadow: "0 0 10px rgba(139, 92, 246, 0.6)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}`
    }
  },
  css: `/* Cyber Green Glow Text display */
.text-cyber-display {
  font-size: 26px;
  font-weight: 800;
  font-family: monospace;
  color: #00ff66;
  text-shadow: 0 0 12px rgba(0, 255, 102, 0.35);
  margin: 16px 0;
}

.text-control-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.text-control-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

/* Staggered Letter Float Layout */
.text-float-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  margin: 16px 0;
}

.text-float-char {
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  transition: color 0.15s;
}

.text-float-char:hover {
  color: #8b5cf6;
}

.space-char {
  width: 8px;
}`
};
