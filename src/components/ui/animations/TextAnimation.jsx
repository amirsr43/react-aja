// src/components/ui/TextAnimation.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export const TEXT_ANIM_STYLES = `
/* ── PREMIUM TEXT ANIMATION CORE STYLES ── */
.text-anim-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  font-family: 'Outfit', 'Inter', sans-serif;
  color: #ffffff;
}

.text-anim-card {
  width: 100%;
  max-width: 460px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  text-align: center;
  box-sizing: border-box;
}

.text-cyber-display {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-family: monospace;
  color: #00ff66; /* cyber green glow */
  text-shadow: 0 0 12px rgba(0, 255, 102, 0.35);
  margin: 16px 0;
}

.text-float-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 16px 0;
  user-select: none;
}

.text-float-char {
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  transition: color 0.15s;
}

.text-float-char:hover {
  color: #8b5cf6; /* hover purple scale */
}

/* Control button triggers */
.text-control-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 8px 16px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  margin-top: 12px;
}

.text-control-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}
`;

// 1. Cyber Decoder Text Component
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
            if (index < iterations) {
              return targetText[index];
            }
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

  // Run on mount
  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="text-cyber-display">{displayText}</div>
      <button className="text-control-btn" onClick={decrypt}>
        <Play size={12} />
        Trigger Reveal
      </button>
    </div>
  );
}

// 2. Interactive Letter Float component
export function InteractiveFloatText({ text = "Hover over this sentence" }) {
  return (
    <div className="text-float-display">
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} style={{ width: "8px" }}> </span>;
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
}

// ── Showcase Demo ──
export default function TextAnimationShowcase() {
  const [effect, setEffect] = useState("decoder"); // "decoder" | "float"

  return (
    <div className="text-anim-showcase">
      <style>{TEXT_ANIM_STYLES}</style>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "4px",
          gap: "4px"
        }}
      >
        <button
          onClick={() => setEffect("decoder")}
          style={{
            background: effect === "decoder" ? "rgba(255, 255, 255, 0.06)" : "transparent",
            color: effect === "decoder" ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "12.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Cyber Decoder
        </button>
        <button
          onClick={() => setEffect("float")}
          style={{
            background: effect === "float" ? "rgba(255, 255, 255, 0.06)" : "transparent",
            color: effect === "float" ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "12.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Floating Spring
        </button>
      </div>

      {/* Showcase area */}
      <div className="text-anim-card">
        {effect === "decoder" ? (
          <CyberDecoderText text="DECRYPTING SECTOR 7" />
        ) : (
          <InteractiveFloatText text="Hover or drag over these characters" />
        )}
      </div>
    </div>
  );
}
