// src/components/ui/CyberDecoderText.jsx
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";

const DECODER_STYLES = `
.cyber-decoder-showcase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-family: 'Outfit', 'Inter', monospace;
}

.text-cyber-display {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #00ff66; /* cyber green glow */
  text-shadow: 0 0 12px rgba(0, 255, 102, 0.35);
  margin: 12px 0;
}

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
}

.text-control-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}
`;

export default function CyberDecoderText({ text = "DECRYPTING SECTOR 7" }) {
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

  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <div className="cyber-decoder-showcase">
      <style>{DECODER_STYLES}</style>
      <div className="text-cyber-display">{displayText}</div>
      <button className="text-control-btn" onClick={decrypt}>
        <Play size={12} />
        Trigger Reveal
      </button>
    </div>
  );
}
