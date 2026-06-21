// src/data/codes/cyberDecoder.js

export const cyberDecoderCode = {
  code: {
    js: {
      css: `// CyberDecoderText.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import "./CyberDecoder.css"; // Include the CSS stylesheet below

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
      <div className="text-cyber-display">{displayText}</div>
      <button className="text-control-btn" onClick={decrypt}>
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}`,
      tailwind: `// CyberDecoderText.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";

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
    <div className="flex flex-col items-center gap-4">
      <div className="text-[26px] font-extrabold font-mono text-[#00ff66] [text-shadow:0_0_12px_rgba(0,255,102,0.35)] my-3 tracking-wide">
        {displayText}
      </div>
      <button 
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 text-xs text-white/70 cursor-pointer flex items-center gap-1.5 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
        onClick={decrypt}
      >
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}`
    },
    ts: {
      css: `// CyberDecoderText.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import "./CyberDecoder.css"; // Include the CSS stylesheet below

interface CyberDecoderTextProps {
  text?: string;
}

export default function CyberDecoderText({ text = "DECRYPTING SECTOR 7" }: CyberDecoderTextProps): React.JSX.Element {
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
      <div className="text-cyber-display">{displayText}</div>
      <button className="text-control-btn" onClick={decrypt}>
        <Play size={12} /> Trigger Reveal
      </button>
    </div>
  );
}`,
      tailwind: `// CyberDecoderText.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";

interface CyberDecoderTextProps {
  text?: string;
}

export default function CyberDecoderText({ text = "DECRYPTING SECTOR 7" }: CyberDecoderTextProps): React.JSX.Element {
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
    <div className="flex flex-col items-center gap-4">
      <div className="text-[26px] font-extrabold font-mono text-[#00ff66] [text-shadow:0_0_12px_rgba(0,255,102,0.35)] my-3 tracking-wide">
        {displayText}
      </div>
      <button 
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 text-xs text-white/70 cursor-pointer flex items-center gap-1.5 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
        onClick={decrypt}
      >
        <Play size={12} /> Trigger Reveal
      </button>
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
  margin: 12px 0;
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
  transition: all 0.2s;
}

.text-control-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}`
};
