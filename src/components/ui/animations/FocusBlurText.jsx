// src/components/ui/FocusBlurText.jsx
import React, { useState, useRef } from "react";

const BLUR_STYLES = `
.text-blur-wrapper {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 40px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  box-sizing: border-box;
  cursor: none; /* Hide default cursor to show magnifying glass */
  user-select: none;
}

.text-container-base {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-blur-content {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.01em;
  font-family: 'Outfit', 'Inter', sans-serif;
  text-align: center;
}

/* Layer A: Blurred Background */
.text-layer-blurred {
  color: rgba(255, 255, 255, 0.2);
  filter: blur(6px);
  transition: filter 0.3s;
}

/* Layer B: Sharp Foreground */
.text-layer-sharp {
  position: absolute;
  inset: 0;
  color: transparent;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  background-clip: text;
  -webkit-background-clip: text;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Circular Magnifying Glass Ring */
.magnifier-lens {
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(59, 130, 246, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.08);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scope crosshair or dot indicator in center */
.magnifier-lens::after {
  content: '';
  width: 4px;
  height: 4px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 8px #3b82f6;
}
`;

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
      <style>{BLUR_STYLES}</style>

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
              clipPath: `circle(55px at ${mousePos.x}px ${mousePos.y}px)`,
              WebkitClipPath: `circle(55px at ${mousePos.x}px ${mousePos.y}px)`,
              transform: "scale(1.04)", /* slight zoom offset refraction */
              transformOrigin: `${mousePos.x}px ${mousePos.y}px`
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
}
