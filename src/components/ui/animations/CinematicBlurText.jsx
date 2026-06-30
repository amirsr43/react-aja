// src/components/ui/animations/CinematicBlurText.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const CINEMATIC_BLUR_STYLES = `
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
}
`;

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <style>{CINEMATIC_BLUR_STYLES}</style>
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
            {char === " " ? "\u00A0" : char}
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
}

