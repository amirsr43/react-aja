// src/data/codes/gradientSweepText.js

export const gradientSweepTextCode = {
  code: {
    js: {
      css: `// GradientSweepText.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import "./GradientSweepText.css"; // Include the CSS stylesheet below

export default function GradientSweepText({ 
  text = "Premium Gradient Sweep Reveal", 
  once = true,
  showReplay = true,
  colors = ["#a78bfa", "#ec4899"],
  baseColor = "rgba(255, 255, 255, 0.15)",
  duration = 1.2
}) {
  const [triggerKey, setTriggerKey] = useState(0);

  const buildGradient = (colorsList, base) => {
    const segmentCount = colorsList.length;
    const stops = colorsList.map((color, index) => {
      const percentage = (index / Math.max(segmentCount - 1, 1)) * 50;
      return \`\${color} \${percentage}%\`;
    });
    return \`linear-gradient(90deg, \${stops.join(", ")}, \${base} 50.01%, \${base} 100%)\`;
  };

  return (
    <div className="gradient-sweep-wrapper">
      <motion.span
        key={triggerKey}
        className="gradient-sweep-text"
        style={{
          backgroundImage: buildGradient(colors, baseColor),
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0",
        }}
        initial={{ backgroundPosition: "100% 0" }}
        whileInView={{ backgroundPosition: "0% 0" }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once, margin: "-10%" }}
        transition={{
          backgroundPosition: { duration, ease: [0.25, 1, 0.5, 1] },
          scale: { duration: 0.2 }
        }}
      >
        {text}
      </motion.span>
      {showReplay && (
        <button className="text-replay-btn" onClick={() => setTriggerKey(prev => prev + 1)}>
          <Play size={12} fill="currentColor" /> Replay
        </button>
      )}
    </div>
  );
}`,
      tailwind: `// GradientSweepText.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function GradientSweepText({ 
  text = "Premium Gradient Sweep Reveal", 
  once = true,
  showReplay = true,
  colors = ["#a78bfa", "#ec4899"],
  baseColor = "rgba(255, 255, 255, 0.15)",
  duration = 1.2
}) {
  const [triggerKey, setTriggerKey] = useState(0);

  const buildGradient = (colorsList, base) => {
    const segmentCount = colorsList.length;
    const stops = colorsList.map((color, index) => {
      const percentage = (index / Math.max(segmentCount - 1, 1)) * 50;
      return \`\${color} \${percentage}%\`;
    });
    return \`linear-gradient(90deg, \${stops.join(", ")}, \${base} 50.01%, \${base} 100%)\`;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.span
        key={triggerKey}
        className="cursor-pointer text-center bg-clip-text text-transparent"
        style={{
          backgroundImage: buildGradient(colors, baseColor),
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0"
        }}
        initial={{ backgroundPosition: "100% 0" }}
        whileInView={{ backgroundPosition: "0% 0" }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once, margin: "-10%" }}
        transition={{
          backgroundPosition: { duration, ease: [0.25, 1, 0.5, 1] },
          scale: { duration: 0.2 }
        }}
      >
        {text}
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
      css: `// GradientSweepText.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";
import "./GradientSweepText.css";

interface GradientSweepTextProps {
  text: string;
  once?: boolean;
  showReplay?: boolean;
  colors?: string[];
  baseColor?: string;
  duration?: number;
}

export default function GradientSweepText({ 
  text, 
  once = true,
  showReplay = true,
  colors = ["#a78bfa", "#ec4899"],
  baseColor = "rgba(255, 255, 255, 0.15)",
  duration = 1.2
}: GradientSweepTextProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);

  const buildGradient = (colorsList: string[], base: string) => {
    const segmentCount = colorsList.length;
    const stops = colorsList.map((color, index) => {
      const percentage = (index / Math.max(segmentCount - 1, 1)) * 50;
      return \`\${color} \${percentage}%\`;
    });
    return \`linear-gradient(90deg, \${stops.join(", ")}, \${base} 50.01%, \${base} 100%)\`;
  };

  return (
    <div className="gradient-sweep-wrapper">
      <motion.span
        key={triggerKey}
        className="gradient-sweep-text"
        style={{
          backgroundImage: buildGradient(colors, baseColor),
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0",
        }}
        initial={{ backgroundPosition: "100% 0" }}
        whileInView={{ backgroundPosition: "0% 0" }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once, margin: "-10%" }}
        transition={{
          backgroundPosition: { duration, ease: [0.25, 1, 0.5, 1] },
          scale: { duration: 0.2 }
        }}
      >
        {text}
      </motion.span>
      {showReplay && (
        <button className="text-replay-btn" onClick={() => setTriggerKey(prev => prev + 1)}>
          <Play size={12} fill="currentColor" /> Replay
        </button>
      )}
    </div>
  );
}`,
      tailwind: `// GradientSweepText.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";

interface GradientSweepTextProps {
  text: string;
  once?: boolean;
  showReplay?: boolean;
  colors?: string[];
  baseColor?: string;
  duration?: number;
}

export default function GradientSweepText({ 
  text, 
  once = true,
  showReplay = true,
  colors = ["#a78bfa", "#ec4899"],
  baseColor = "rgba(255, 255, 255, 0.15)",
  duration = 1.2
}: GradientSweepTextProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);

  const buildGradient = (colorsList: string[], base: string) => {
    const segmentCount = colorsList.length;
    const stops = colorsList.map((color, index) => {
      const percentage = (index / Math.max(segmentCount - 1, 1)) * 50;
      return \`\${color} \${percentage}%\`;
    });
    return \`linear-gradient(90deg, \${stops.join(", ")}, \${base} 50.01%, \${base} 100%)\`;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.span
        key={triggerKey}
        className="cursor-pointer text-center bg-clip-text text-transparent"
        style={{
          backgroundImage: buildGradient(colors, baseColor),
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0"
        }}
        initial={{ backgroundPosition: "100% 0" }}
        whileInView={{ backgroundPosition: "0% 0" }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once, margin: "-10%" }}
        transition={{
          backgroundPosition: { duration, ease: [0.25, 1, 0.5, 1] },
          scale: { duration: 0.2 }
        }}
      >
        {text}
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
  css: `/* GradientSweepText.css */
.gradient-sweep-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.gradient-sweep-text {
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  -webkit-background-clip: text;
  -webkit-text-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  cursor: pointer;
  text-align: center;
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
