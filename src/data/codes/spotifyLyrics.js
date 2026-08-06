// src/data/codes/spotifyLyrics.js

export const spotifyLyricsCode = {
  code: {
    js: {
      css: `// SpotifyLyrics.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect, useRef } from "react";
import "./SpotifyLyrics.css"; // Include the CSS stylesheet below

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

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="scroll-text-container">
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
            className={\`scroll-text-line \${activeIndex === idx ? "active" : ""}\`}
            onClick={() => handleLineClick(idx)}
          >
            <div className="scroll-text-content">{line}</div>
          </div>
        ))}
      </div>
      <div className="scroll-tip-label">
        Scroll inside the box to test animation
      </div>
    </div>
  );
}`,
      tailwind: `// SpotifyLyrics.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect, useRef } from "react";

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

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="relative w-full max-w-[500px] bg-zinc-950/45 border border-white/5 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden box-border font-sans">
      <div 
        className="overflow-y-auto py-24 scroll-smooth no-scrollbar mask-gradient" 
        style={{ height }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <style>{\`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .mask-gradient {
            mask-image: linear-gradient(to bottom, transparent 0%, #000000 25%, #000000 75%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000000 25%, #000000 75%, transparent 100%);
          }
        \`}</style>
        {lines.map((line, idx) => (
          <div
            key={idx}
            ref={(el) => (lineRefs.current[idx] = el)}
            className="py-3.5 px-1.5 text-center cursor-pointer transition-all duration-350 ease-out origin-center group"
            onClick={() => handleLineClick(idx)}
          >
            <div className={\`text-lg font-extrabold leading-snug tracking-tight transition-all duration-350 ease-out \${
              activeIndex === idx 
                ? "text-white blur-none scale-[1.05]" 
                : "text-white/20 blur-[1.5px] scale-[0.96] group-hover:text-white/60 group-hover:blur-none"
            }\`}>
              {line}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-[11px] text-white/30 mt-4 uppercase tracking-wider">
        Scroll inside the box to test animation
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// SpotifyLyrics.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect, useRef } from "react";
import "./SpotifyLyrics.css"; // Include the CSS stylesheet below

interface SpotifyLyricsProps {
  lines?: string[];
  height?: string;
}

const DEFAULT_LINES: string[] = [
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
}: SpotifyLyricsProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (): void => {
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

  const handleLineClick = (idx: number): void => {
    setActiveIndex(idx);
    const targetEl = lineRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="scroll-text-container">
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
            className={\`scroll-text-line \${activeIndex === idx ? "active" : ""}\`}
            onClick={() => handleLineClick(idx)}
          >
            <div className="scroll-text-content">{line}</div>
          </div>
        ))}
      </div>
      <div className="scroll-tip-label">
        Scroll inside the box to test animation
      </div>
    </div>
  );
}`,
      tailwind: `// SpotifyLyrics.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect, useRef } from "react";

interface SpotifyLyricsProps {
  lines?: string[];
  height?: string;
}

const DEFAULT_LINES: string[] = [
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
}: SpotifyLyricsProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (): void => {
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

  const handleLineClick = (idx: number): void => {
    setActiveIndex(idx);
    const targetEl = lineRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="relative w-full max-w-[500px] bg-zinc-950/45 border border-white/5 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden box-border font-sans">
      <div 
        className="overflow-y-auto py-24 scroll-smooth no-scrollbar mask-gradient" 
        style={{ height }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <style>{\`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .mask-gradient {
            mask-image: linear-gradient(to bottom, transparent 0%, #000000 25%, #000000 75%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000000 25%, #000000 75%, transparent 100%);
          }
        \`}</style>
        {lines.map((line, idx) => (
          <div
            key={idx}
            ref={(el) => (lineRefs.current[idx] = el)}
            className="py-3.5 px-1.5 text-center cursor-pointer transition-all duration-350 ease-out origin-center group"
            onClick={() => handleLineClick(idx)}
          >
            <div className={\`text-lg font-extrabold leading-snug tracking-tight transition-all duration-350 ease-out \${
              activeIndex === idx 
                ? "text-white blur-none scale-[1.05]" 
                : "text-white/20 blur-[1.5px] scale-[0.96] group-hover:text-white/60 group-hover:blur-none"
            }\`}>
              {line}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-[11px] text-white/30 mt-4 uppercase tracking-wider">
        Scroll inside the box to test animation
      </div>
    </div>
  );
}`
    }
  },
  css: `/* Spotify-style scrolling text reveal styles */
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
  font-family: sans-serif;
  overflow: hidden;
  position: relative;
}

.scroll-text-viewport {
  overflow-y: auto;
  padding: 100px 0;
  scroll-behavior: smooth;
  position: relative;
  /* Top and bottom fade mask */
  mask-image: linear-gradient(to bottom, transparent 0%, #000000 25%, #000000 75%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000000 25%, #000000 75%, transparent 100%);
}

.scroll-text-viewport::-webkit-scrollbar {
  display: none;
}

.scroll-text-line {
  padding: 14px 6px;
  text-align: center;
  transition: all 0.35s ease-out;
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
  transition: all 0.35s ease-out;
}

.scroll-text-line.active .scroll-text-content {
  color: #ffffff;
  filter: blur(0);
  transform: scale(1.05);
}

.scroll-text-line:hover .scroll-text-content {
  color: rgba(255, 255, 255, 0.6);
  filter: blur(0);
}

.scroll-tip-label {
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`
};
