// src/data/codes/focusBlurText.js

export const focusBlurTextCode = {
  code: {
    js: {
      css: `// FocusBlurText.jsx (JavaScript + Custom CSS)
import React, { useState, useRef } from "react";
import "./FocusBlurText.css"; // Include the CSS stylesheet below

export default function FocusBlurText({ text = "Hover mouse to magnifying glass focus letters" }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="text-blur-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-container-base">
        {/* Layer 1: Blurred background text */}
        <div className="text-blur-content text-layer-blurred">
          {text}
        </div>

        {/* Layer 2: Sharp, colored, clip-path text */}
        {isHovered && (
          <div 
            className="text-blur-content text-layer-sharp"
            style={{
              clipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              WebkitClipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              transform: "scale(1.04)",
              transformOrigin: \`\${mousePos.x}px \${mousePos.y}px\`
            }}
          >
            {text}
          </div>
        )}

        {/* Magnifying Glass Outer Scope Ring */}
        {isHovered && (
          <div 
            className="magnifier-lens"
            style={{
              left: mousePos.x,
              top: mousePos.y
            }}
          />
        )}
      </div>
    </div>
  );
}`,
      tailwind: `// FocusBlurText.jsx (JavaScript + Tailwind CSS)
import React, { useState, useRef } from "react";

export default function FocusBlurText({ text = "Hover mouse to magnifying glass focus letters" }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="relative w-full max-w-[480px] bg-zinc-950/45 border border-white/5 rounded-3xl p-10 backdrop-blur-xl overflow-hidden cursor-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full select-none">
        {/* Layer 1: Blurred background text */}
        <div className="text-[26px] font-extrabold leading-snug tracking-tight text-center text-white/20 blur-[6px]">
          {text}
        </div>

        {/* Layer 2: Sharp, colored, clip-path text */}
        {isHovered && (
          <div 
            className="text-[26px] font-extrabold leading-snug tracking-tight text-center absolute inset-0 text-white pointer-events-none"
            style={{
              clipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              WebkitClipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              transform: "scale(1.04)",
              transformOrigin: \`\${mousePos.x}px \${mousePos.y}px\`
            }}
          >
            {text}
          </div>
        )}

        {/* Magnifying Glass Outer Scope Ring */}
        {isHovered && (
          <div 
            className="absolute w-[110px] h-[110px] rounded-full border-2 border-blue-500/50 bg-white/2 backdrop-blur-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(59,130,246,0.3),inset_0_0_15px_rgba(255,255,255,0.08)] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
            style={{
              left: mousePos.x,
              top: mousePos.y
            }}
          >
            <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
          </div>
        )}
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// FocusBlurText.tsx (TypeScript + Custom CSS)
import React, { useState, useRef, MouseEvent } from "react";
import "./FocusBlurText.css"; // Include the CSS stylesheet below

interface FocusBlurTextProps {
  text?: string;
}

export default function FocusBlurText({ text = "Hover mouse to magnifying glass focus letters" }: FocusBlurTextProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="text-blur-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-container-base">
        {/* Layer 1: Blurred background text */}
        <div className="text-blur-content text-layer-blurred">
          {text}
        </div>

        {/* Layer 2: Sharp, colored, clip-path text */}
        {isHovered && (
          <div 
            className="text-blur-content text-layer-sharp"
            style={{
              clipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              WebkitClipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              transform: "scale(1.04)",
              transformOrigin: \`\${mousePos.x}px \${mousePos.y}px\`
            }}
          >
            {text}
          </div>
        )}

        {/* Magnifying Glass Outer Scope Ring */}
        {isHovered && (
          <div 
            className="magnifier-lens"
            style={{
              left: mousePos.x,
              top: mousePos.y
            }}
          />
        )}
      </div>
    </div>
  );
}`,
      tailwind: `// FocusBlurText.tsx (TypeScript + Tailwind CSS)
import React, { useState, useRef, MouseEvent } from "react";

interface FocusBlurTextProps {
  text?: string;
}

export default function FocusBlurText({ text = "Hover mouse to magnifying glass focus letters" }: FocusBlurTextProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="relative w-full max-w-[480px] bg-zinc-950/45 border border-white/5 rounded-3xl p-10 backdrop-blur-xl overflow-hidden cursor-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full select-none">
        {/* Layer 1: Blurred background text */}
        <div className="text-[26px] font-extrabold leading-snug tracking-tight text-center text-white/20 blur-[6px]">
          {text}
        </div>

        {/* Layer 2: Sharp, colored, clip-path text */}
        {isHovered && (
          <div 
            className="text-[26px] font-extrabold leading-snug tracking-tight text-center absolute inset-0 text-white pointer-events-none"
            style={{
              clipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              WebkitClipPath: \`circle(55px at \${mousePos.x}px \${mousePos.y}px)\`,
              transform: "scale(1.04)",
              transformOrigin: \`\${mousePos.x}px \${mousePos.y}px\`
            }}
          >
            {text}
          </div>
        )}

        {/* Magnifying Glass Outer Scope Ring */}
        {isHovered && (
          <div 
            className="absolute w-[110px] h-[110px] rounded-full border-2 border-blue-500/50 bg-white/2 backdrop-blur-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(59,130,246,0.3),inset_0_0_15px_rgba(255,255,255,0.08)] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
            style={{
              left: mousePos.x,
              top: mousePos.y
            }}
          >
            <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
          </div>
        )}
      </div>
    </div>
  );
}`
    }
  },
  css: `/* Magnifier Wrapper Card */
.text-blur-wrapper {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 40px;
  backdrop-filter: blur(12px);
  overflow: hidden;
  cursor: none; /* Hide default cursor */
}

.text-container-base {
  position: relative;
  width: 100%;
}

.text-blur-content {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-align: center;
}

/* Layer A: Blurred Background */
.text-layer-blurred {
  color: rgba(255, 255, 255, 0.2);
  filter: blur(6px);
}

/* Layer B: Sharp Foreground */
.text-layer-sharp {
  position: absolute;
  inset: 0;
  color: #ffffff;
  pointer-events: none;
}

/* Magnifying Glass outer ring */
.magnifier-lens {
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(1px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(59, 130, 246, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.08);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.magnifier-lens::after {
  content: '';
  width: 4px;
  height: 4px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 8px #3b82f6;
}`
};
