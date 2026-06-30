// src/components/ui/animations/MaskedSlideText.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const MASKED_SLIDE_STYLES = `
.masked-slide-container {
  display: inline-flex;
  flex-wrap: wrap;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  justify-content: center;
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
}
`;

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
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a high-end feel
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <style>{MASKED_SLIDE_STYLES}</style>
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
}

