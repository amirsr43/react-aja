// src/data/codes/floatingSpring.js

export const floatingSpringCode = {
  code: {
    js: {
      css: `// InteractiveFloatText.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./FloatingSpring.css"; // Include the CSS stylesheet below

export default function InteractiveFloatText({ text = "Hover cursor over this floating sentence" }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="text-float-wrapper">
      <div 
        className="text-float-display"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {text.split("").map((char, i) => {
          if (char === " ") return <span key={i} className="space-char"> </span>;
          
          let yVal = 0;
          let scaleVal = 1;
          let charColor = "#ffffff";
          let shadowGlow = "none";

          if (hoveredIdx !== null) {
            const distance = Math.abs(i - hoveredIdx);
            if (distance === 0) {
              yVal = -16;
              scaleVal = 1.4;
              charColor = "#a855f7"; // Neon Violet
              shadowGlow = "0 0 15px rgba(168, 85, 247, 0.8)";
            } else if (distance === 1) {
              yVal = -10;
              scaleVal = 1.25;
              charColor = "#ec4899"; // Neon Pink
              shadowGlow = "0 0 10px rgba(236, 72, 153, 0.6)";
            } else if (distance === 2) {
              yVal = -5;
              scaleVal = 1.12;
              charColor = "#3b82f6"; // Neon Blue
              shadowGlow = "0 0 6px rgba(59, 130, 246, 0.4)";
            }
          }

          return (
            <motion.span
              key={i}
              className="text-float-char"
              animate={{ 
                y: yVal, 
                scale: scaleVal,
                color: charColor
              }}
              style={{
                textShadow: shadowGlow,
                padding: "0 1px"
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              onMouseEnter={() => setHoveredIdx(i)}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}`,
      tailwind: `// InteractiveFloatText.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveFloatText({ text = "Hover cursor over this floating sentence" }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="w-full flex justify-center p-6 bg-zinc-950/45 border border-white/5 rounded-[20px] backdrop-blur-xl">
      <div 
        className="flex flex-wrap justify-center text-[26px] font-extrabold tracking-tight select-none"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {text.split("").map((char, i) => {
          if (char === " ") return <span key={i} className="w-2"> </span>;
          
          let yVal = 0;
          let scaleVal = 1;
          let charColor = "#ffffff";
          let shadowGlow = "none";

          if (hoveredIdx !== null) {
            const distance = Math.abs(i - hoveredIdx);
            if (distance === 0) {
              yVal = -16;
              scaleVal = 1.4;
              charColor = "#a855f7"; // Neon Violet
              shadowGlow = "0 0 15px rgba(168, 85, 247, 0.8)";
            } else if (distance === 1) {
              yVal = -10;
              scaleVal = 1.25;
              charColor = "#ec4899"; // Neon Pink
              shadowGlow = "0 0 10px rgba(236, 72, 153, 0.6)";
            } else if (distance === 2) {
              yVal = -5;
              scaleVal = 1.12;
              charColor = "#3b82f6"; // Neon Blue
              shadowGlow = "0 0 6px rgba(59, 130, 246, 0.4)";
            }
          }

          return (
            <motion.span
              key={i}
              className="inline-block cursor-pointer"
              animate={{ 
                y: yVal, 
                scale: scaleVal,
                color: charColor
              }}
              style={{
                textShadow: shadowGlow,
                padding: "0 1px"
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              onMouseEnter={() => setHoveredIdx(i)}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// InteractiveFloatText.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./FloatingSpring.css"; // Include the CSS stylesheet below

interface InteractiveFloatTextProps {
  text?: string;
}

export default function InteractiveFloatText({ text = "Hover cursor over this floating sentence" }: InteractiveFloatTextProps): React.JSX.Element {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="text-float-wrapper">
      <div 
        className="text-float-display"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {text.split("").map((char, i) => {
          if (char === " ") return <span key={i} className="space-char"> </span>;
          
          let yVal = 0;
          let scaleVal = 1;
          let charColor = "#ffffff";
          let shadowGlow = "none";

          if (hoveredIdx !== null) {
            const distance = Math.abs(i - hoveredIdx);
            if (distance === 0) {
              yVal = -16;
              scaleVal = 1.4;
              charColor = "#a855f7"; // Neon Violet
              shadowGlow = "0 0 15px rgba(168, 85, 247, 0.8)";
            } else if (distance === 1) {
              yVal = -10;
              scaleVal = 1.25;
              charColor = "#ec4899"; // Neon Pink
              shadowGlow = "0 0 10px rgba(236, 72, 153, 0.6)";
            } else if (distance === 2) {
              yVal = -5;
              scaleVal = 1.12;
              charColor = "#3b82f6"; // Neon Blue
              shadowGlow = "0 0 6px rgba(59, 130, 246, 0.4)";
            }
          }

          return (
            <motion.span
              key={i}
              className="text-float-char"
              animate={{ 
                y: yVal, 
                scale: scaleVal,
                color: charColor
              }}
              style={{
                textShadow: shadowGlow,
                padding: "0 1px"
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              onMouseEnter={() => setHoveredIdx(i)}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}`,
      tailwind: `// InteractiveFloatText.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveFloatTextProps {
  text?: string;
}

export default function InteractiveFloatText({ text = "Hover cursor over this floating sentence" }: InteractiveFloatTextProps): React.JSX.Element {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full flex justify-center p-6 bg-zinc-950/45 border border-white/5 rounded-[20px] backdrop-blur-xl">
      <div 
        className="flex flex-wrap justify-center text-[26px] font-extrabold tracking-tight select-none"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {text.split("").map((char, i) => {
          if (char === " ") return <span key={i} className="w-2"> </span>;
          
          let yVal = 0;
          let scaleVal = 1;
          let charColor = "#ffffff";
          let shadowGlow = "none";

          if (hoveredIdx !== null) {
            const distance = Math.abs(i - hoveredIdx);
            if (distance === 0) {
              yVal = -16;
              scaleVal = 1.4;
              charColor = "#a855f7"; // Neon Violet
              shadowGlow = "0 0 15px rgba(168, 85, 247, 0.8)";
            } else if (distance === 1) {
              yVal = -10;
              scaleVal = 1.25;
              charColor = "#ec4899"; // Neon Pink
              shadowGlow = "0 0 10px rgba(236, 72, 153, 0.6)";
            } else if (distance === 2) {
              yVal = -5;
              scaleVal = 1.12;
              charColor = "#3b82f6"; // Neon Blue
              shadowGlow = "0 0 6px rgba(59, 130, 246, 0.4)";
            }
          }

          return (
            <motion.span
              key={i}
              className="inline-block cursor-pointer"
              animate={{ 
                y: yVal, 
                scale: scaleVal,
                color: charColor
              }}
              style={{
                textShadow: shadowGlow,
                padding: "0 1px"
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              onMouseEnter={() => setHoveredIdx(i)}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}`
    }
  },
  css: `/* Wave Float wrapper styles */
.text-float-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(12px);
}

.text-float-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.01em;
  user-select: none;
}

.text-float-char {
  display: inline-block;
  cursor: pointer;
}

.space-char {
  width: 8px;
}`
};
