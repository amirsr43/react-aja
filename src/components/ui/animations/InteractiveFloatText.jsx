// src/components/ui/InteractiveFloatText.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const FLOAT_STYLES = `
.text-float-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.text-float-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.01em;
  font-family: 'Outfit', 'Inter', sans-serif;
  user-select: none;
}

.text-float-char {
  display: inline-block;
  cursor: pointer;
  transition: color 0.3s, text-shadow 0.3s;
}
`;

export default function InteractiveFloatText({ text = "Hover cursor over this floating sentence" }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="text-float-wrapper">
      <style>{FLOAT_STYLES}</style>
      <div 
        className="text-float-display"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {text.split("").map((char, i) => {
          if (char === " ") return <span key={i} style={{ width: "8px" }}> </span>;
          
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
}
