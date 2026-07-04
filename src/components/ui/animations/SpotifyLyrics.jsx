// src/components/ui/animations/SpotifyLyrics.jsx
import React, { useState, useEffect, useRef } from "react";

const SCROLL_LYRICS_STYLES = `
/* ── SPOTIFY-STYLE SCROLL TEXT REVEAL ── */
.scroll-text-container {
  width: 100%;
  max-width: 500px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 30px 24px;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  font-family: 'Outfit', 'Inter', sans-serif;
  overflow: hidden;
  position: relative;
}

.scroll-text-viewport {
  height: 260px;
  overflow-y: auto;
  padding: 100px 0; /* Ensures first and last lines can be centered */
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
  /* Top and bottom fade mask */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #000000 25%,
    #000000 75%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #000000 25%,
    #000000 75%,
    transparent 100%
  );
}

.scroll-text-viewport::-webkit-scrollbar {
  display: none;
}

.scroll-text-line {
  padding: 14px 6px;
  text-align: center;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center center;
  cursor: pointer;
}

.scroll-text-content {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.2);
  filter: blur(1.5px);
  transform: scale(0.96);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Active centered line styling */
.scroll-text-line.active .scroll-text-content {
  color: #ffffff;
  filter: blur(0);
  transform: scale(1.05);
}

/* Hover fallback for accessibility */
.scroll-text-line:hover .scroll-text-content {
  color: rgba(255, 255, 255, 0.6);
  filter: blur(0);
}

.scroll-text-line.active:hover .scroll-text-content {
  color: #ffffff;
}

.scroll-tip-label {
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
`;

const DEFAULT_LINES = [
  "This is a scroll-highlight text animation.",
  "As you scroll down the page or container,",
  "each sentence reveals itself with focus.",
  "The active text transitions to sharp white,",
  "while other lines fade and blur away.",
  "Perfect for storytelling landing pages,",
  "interactive biography sections,",
  "or displaying song lyrics on your site.",
  "Try scrolling or clicking a line to focus it!"
];

export default function SpotifyLyrics({
  lines = DEFAULT_LINES,
  height = "260px"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    lineRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const lineCenter = rect.top + rect.height / 2;
      const distance = Math.abs(lineCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const handleLineClick = (idx) => {
    setActiveIndex(idx);
    if (lineRefs.current[idx]) {
      lineRefs.current[idx].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  // Trigger once on mount to establish active line centering
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="scroll-text-container">
      <style>{SCROLL_LYRICS_STYLES}</style>

      <div 
        className="scroll-text-viewport" 
        style={{ height }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            ref={(el) => (lineRefs.current[idx] = el)}
            className={`scroll-text-line ${activeIndex === idx ? "active" : ""}`}
            onClick={() => handleLineClick(idx)}
          >
            <div className="scroll-text-content">
              {line}
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-tip-label">
        Scroll inside the box to test animation
      </div>
    </div>
  );
}
