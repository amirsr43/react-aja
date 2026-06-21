// src/data/codes/interactiveTimeline.js

export const interactiveTimelineCode = {
  code: {
    js: {
      css: `import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

// Include this CSS in your styles/stylesheet
const TIMELINE_STYLES = \`
.interactive-timeline-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  user-select: none;
  box-sizing: border-box;
  --accent-color: #3b82f6;
}
.timeline-scroll-viewport {
  position: relative;
  width: 220px;
  height: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.timeline-svg-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
}
.timeline-draggable-area {
  position: absolute;
  inset: 0;
  z-index: 10;
  cursor: grab;
}
.timeline-draggable-area:active { cursor: grabbing; }
.timeline-years-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
.timeline-year-item {
  position: absolute;
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 56px;
}
.timeline-year-text {
  font-size: 26px;
  font-weight: 800;
  color: #8e8e93;
  transition: color 0.35s ease;
  font-family: 'Outfit', 'Inter', sans-serif;
  letter-spacing: -0.02em;
}
.timeline-year-item.active .timeline-year-text { color: #ffffff; }
.timeline-indicator-light {
  position: absolute;
  left: 32px;
  top: calc(50% - 5px);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid var(--accent-color);
  box-shadow: 0 0 8px var(--accent-color);
  z-index: 5;
  pointer-events: none;
}
\`;

export default function InteractiveTimeline({
  years = ["2021", "2022", "2023", "2024", "2025", "2026"],
  initialYear,
  accentColor = "#3b82f6",
  onChange,
  className = ""
}) {
  const VIEWPORT_HEIGHT = 320;
  const ITEM_HEIGHT = 60;
  const CENTER_Y = VIEWPORT_HEIGHT / 2;

  const getInitialIndex = () => {
    if (!initialYear) return 0;
    const idx = years.findIndex((y) => String(y) === String(initialYear));
    return idx !== -1 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const viewportRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollOffsetVal = useMotionValue(getInitialIndex() * ITEM_HEIGHT);
  const springConfig = { damping: 20, stiffness: 130, mass: 0.8 };
  const smoothOffset = useSpring(scrollOffsetVal, springConfig);
  const [currentOffset, setCurrentOffset] = useState(scrollOffsetVal.get());
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on("change", (latest) => setCurrentOffset(latest));
    return () => unsubscribe();
  }, [smoothOffset]);

  useEffect(() => {
    const idx = Math.min(years.length - 1, Math.max(0, Math.round(currentOffset / ITEM_HEIGHT)));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      if (onChange) onChange(years[idx]);
    }
  }, [currentOffset, years, activeIndex, onChange]);

  const isTransitioning = useRef(false);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();
      if (isTransitioning.current) return;

      const direction = Math.sign(e.deltaY);
      const targetIdx = Math.min(
        years.length - 1,
        Math.max(0, activeIndexRef.current + direction)
      );

      if (targetIdx !== activeIndexRef.current) {
        isTransitioning.current = true;
        animate(scrollOffsetVal, targetIdx * ITEM_HEIGHT, {
          type: "spring",
          ...springConfig,
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    };

    viewportEl.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => viewportEl.removeEventListener("wheel", handleNativeWheel);
  }, [years, scrollOffsetVal, springConfig]);

  const handleYearClick = (idx) => {
    animate(scrollOffsetVal, idx * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const handleDrag = (event, info) => {
    const current = scrollOffsetVal.get();
    scrollOffsetVal.set(current - info.delta.y * 0.85);
  };

  const handleDragEnd = () => {
    const current = scrollOffsetVal.get();
    const nearestIndex = Math.min(years.length - 1, Math.max(0, Math.round(current / ITEM_HEIGHT)));
    animate(scrollOffsetVal, nearestIndex * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const getPositionStyles = (idx) => {
    const itemCenterY = idx * ITEM_HEIGHT - currentOffset + CENTER_Y;
    const t = itemCenterY / VIEWPORT_HEIGHT;
    let x = 10;
    if (t >= 0 && t <= 1) {
      x = 10 + 110 * t * (1 - t);
    }
    const distFromCenter = Math.abs(t - 0.5);
    const opacity = Math.max(0.08, 1 - distFromCenter * 2.2);
    const scale = Math.max(0.75, 1.25 - distFromCenter * 1.3);

    return {
      transform: \`translate3d(\${x}px, \${itemCenterY - ITEM_HEIGHT / 2}px, 0) scale(\${scale})\`,
      opacity
    };
  };

  return (
    <div 
      className={\`interactive-timeline-container \${className}\`}
      style={{ '--accent-color': accentColor }}
    >
      <style>{\`\${TIMELINE_STYLES}\`}</style>
      <div ref={viewportRef} className="timeline-scroll-viewport">
        <svg className="timeline-svg-track" viewBox="0 0 200 320">
          <path d="M 10 0 Q 65 160 10 320" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div className="timeline-indicator-light" />
        <motion.div className="timeline-draggable-area" drag="y" dragElastic={0.1} dragMomentum={false} onDrag={handleDrag} onDragEnd={handleDragEnd} />
        <div className="timeline-years-list">
          {years.map((year, idx) => (
            <div key={idx} className={\`timeline-year-item \${idx === activeIndex ? "active" : ""}\`} style={getPositionStyles(idx)} onClick={() => handleYearClick(idx)}>
              <span className="timeline-year-text">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

export default function InteractiveTimeline({
  years = ["2021", "2022", "2023", "2024", "2025", "2026"],
  initialYear,
  accentColor = "#3b82f6",
  onChange,
  className = ""
}) {
  const VIEWPORT_HEIGHT = 320;
  const ITEM_HEIGHT = 60;
  const CENTER_Y = VIEWPORT_HEIGHT / 2;

  const getInitialIndex = () => {
    if (!initialYear) return 0;
    const idx = years.findIndex((y) => String(y) === String(initialYear));
    return idx !== -1 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const viewportRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollOffsetVal = useMotionValue(getInitialIndex() * ITEM_HEIGHT);
  const springConfig = { damping: 20, stiffness: 130, mass: 0.8 };
  const smoothOffset = useSpring(scrollOffsetVal, springConfig);
  const [currentOffset, setCurrentOffset] = useState(scrollOffsetVal.get());
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on("change", (latest) => setCurrentOffset(latest));
    return () => unsubscribe();
  }, [smoothOffset]);

  useEffect(() => {
    const idx = Math.min(years.length - 1, Math.max(0, Math.round(currentOffset / ITEM_HEIGHT)));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      if (onChange) onChange(years[idx]);
    }
  }, [currentOffset, years, activeIndex, onChange]);

  const isTransitioning = useRef(false);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();
      if (isTransitioning.current) return;

      const direction = Math.sign(e.deltaY);
      const targetIdx = Math.min(
        years.length - 1,
        Math.max(0, activeIndexRef.current + direction)
      );

      if (targetIdx !== activeIndexRef.current) {
        isTransitioning.current = true;
        animate(scrollOffsetVal, targetIdx * ITEM_HEIGHT, {
          type: "spring",
          ...springConfig,
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    };

    viewportEl.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => viewportEl.removeEventListener("wheel", handleNativeWheel);
  }, [years, scrollOffsetVal, springConfig]);

  const handleYearClick = (idx) => {
    animate(scrollOffsetVal, idx * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const handleDrag = (event, info) => {
    const current = scrollOffsetVal.get();
    scrollOffsetVal.set(current - info.delta.y * 0.85);
  };

  const handleDragEnd = () => {
    const current = scrollOffsetVal.get();
    const nearestIndex = Math.min(years.length - 1, Math.max(0, Math.round(current / ITEM_HEIGHT)));
    animate(scrollOffsetVal, nearestIndex * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const getPositionStyles = (idx) => {
    const itemCenterY = idx * ITEM_HEIGHT - currentOffset + CENTER_Y;
    const t = itemCenterY / VIEWPORT_HEIGHT;
    let x = 10;
    if (t >= 0 && t <= 1) {
      x = 10 + 110 * t * (1 - t);
    }
    const distFromCenter = Math.abs(t - 0.5);
    const opacity = Math.max(0.08, 1 - distFromCenter * 2.2);
    const scale = Math.max(0.75, 1.25 - distFromCenter * 1.3);

    return {
      transform: \`translate3d(\${x}px, \${itemCenterY - ITEM_HEIGHT / 2}px, 0) scale(\${scale})\`,
      opacity
    };
  };

  return (
    <div 
      className={\`inline-flex justify-center items-center bg-transparent select-none box-border \${className}\`}
      style={{ '--accent-color': accentColor }}
    >
      <div ref={viewportRef} className="relative w-[220px] h-[320px] overflow-hidden flex items-center">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-12" viewBox="0 0 200 320">
          <path d="M 10 0 Q 65 160 10 320" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div 
          className="absolute left-[32px] top-[calc(50%-5px)] w-2.5 h-2.5 rounded-full bg-white z-[5] pointer-events-none"
          style={{ border: '2px solid var(--accent-color)', boxShadow: '0 0 8px var(--accent-color)' }}
        />
        <motion.div className="absolute inset-0 z-[10] cursor-grab active:cursor-grabbing" drag="y" dragElastic={0.1} dragMomentum={false} onDrag={handleDrag} onDragEnd={handleDragEnd} />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]">
          {years.map((year, idx) => (
            <div key={idx} className="absolute h-[60px] flex items-center w-full pointer-events-auto cursor-pointer pl-[56px]" style={getPositionStyles(idx)} onClick={() => handleYearClick(idx)}>
              <span className={\`text-[26px] font-extrabold transition-all duration-355 tracking-tight \${idx === activeIndex ? "text-white" : "text-[#8e8e93]"}\`}>{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

interface InteractiveTimelineProps {
  years?: (string | number)[];
  initialYear?: string | number;
  accentColor?: string;
  onChange?: (year: string | number) => void;
  className?: string;
}

const TIMELINE_STYLES = \`
.interactive-timeline-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  user-select: none;
  box-sizing: border-box;
  --accent-color: #3b82f6;
}
.timeline-scroll-viewport {
  position: relative;
  width: 220px;
  height: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.timeline-svg-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
}
.timeline-draggable-area {
  position: absolute;
  inset: 0;
  z-index: 10;
  cursor: grab;
}
.timeline-draggable-area:active { cursor: grabbing; }
.timeline-years-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
.timeline-year-item {
  position: absolute;
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 56px;
}
.timeline-year-text {
  font-size: 26px;
  font-weight: 800;
  color: #8e8e93;
  transition: color 0.35s ease;
  font-family: 'Outfit', 'Inter', sans-serif;
  letter-spacing: -0.02em;
}
.timeline-year-item.active .timeline-year-text { color: #ffffff; }
.timeline-indicator-light {
  position: absolute;
  left: 32px;
  top: calc(50% - 5px);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid var(--accent-color);
  box-shadow: 0 0 8px var(--accent-color);
  z-index: 5;
  pointer-events: none;
}
\`;

export default function InteractiveTimeline({
  years = ["2021", "2022", "2023", "2024", "2025", "2026"],
  initialYear,
  accentColor = "#3b82f6",
  onChange,
  className = ""
}: InteractiveTimelineProps) {
  const VIEWPORT_HEIGHT = 320;
  const ITEM_HEIGHT = 60;
  const CENTER_Y = VIEWPORT_HEIGHT / 2;

  const getInitialIndex = () => {
    if (!initialYear) return 0;
    const idx = years.findIndex((y) => String(y) === String(initialYear));
    return idx !== -1 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollOffsetVal = useMotionValue(getInitialIndex() * ITEM_HEIGHT);
  const springConfig = { damping: 20, stiffness: 130, mass: 0.8 };
  const smoothOffset = useSpring(scrollOffsetVal, springConfig);
  const [currentOffset, setCurrentOffset] = useState(scrollOffsetVal.get());
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on("change", (latest: number) => setCurrentOffset(latest));
    return () => unsubscribe();
  }, [smoothOffset]);

  useEffect(() => {
    const idx = Math.min(years.length - 1, Math.max(0, Math.round(currentOffset / ITEM_HEIGHT)));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      if (onChange) onChange(years[idx]);
    }
  }, [currentOffset, years, activeIndex, onChange]);

  const isTransitioning = useRef(false);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current) return;

      const direction = Math.sign(e.deltaY);
      const targetIdx = Math.min(
        years.length - 1,
        Math.max(0, activeIndexRef.current + direction)
      );

      if (targetIdx !== activeIndexRef.current) {
        isTransitioning.current = true;
        animate(scrollOffsetVal, targetIdx * ITEM_HEIGHT, {
          type: "spring",
          ...springConfig,
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    };

    viewportEl.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => viewportEl.removeEventListener("wheel", handleNativeWheel);
  }, [years, scrollOffsetVal, springConfig]);

  const handleYearClick = (idx: number) => {
    animate(scrollOffsetVal, idx * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const handleDrag = (event: any, info: any) => {
    const current = scrollOffsetVal.get();
    scrollOffsetVal.set(current - info.delta.y * 0.85);
  };

  const handleDragEnd = () => {
    const current = scrollOffsetVal.get();
    const nearestIndex = Math.min(years.length - 1, Math.max(0, Math.round(current / ITEM_HEIGHT)));
    animate(scrollOffsetVal, nearestIndex * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const getPositionStyles = (idx: number) => {
    const itemCenterY = idx * ITEM_HEIGHT - currentOffset + CENTER_Y;
    const t = itemCenterY / VIEWPORT_HEIGHT;
    let x = 10;
    if (t >= 0 && t <= 1) {
      x = 10 + 110 * t * (1 - t);
    }
    const distFromCenter = Math.abs(t - 0.5);
    const opacity = Math.max(0.08, 1 - distFromCenter * 2.2);
    const scale = Math.max(0.75, 1.25 - distFromCenter * 1.3);

    return {
      transform: \`translate3d(\${x}px, \${itemCenterY - ITEM_HEIGHT / 2}px, 0) scale(\${scale})\`,
      opacity
    };
  };

  return (
    <div 
      className={\`interactive-timeline-container \${className}\`}
      style={{ '--accent-color': accentColor }}
    >
      <style>{\`\${TIMELINE_STYLES}\`}</style>
      <div ref={viewportRef} className="timeline-scroll-viewport">
        <svg className="timeline-svg-track" viewBox="0 0 200 320">
          <path d="M 10 0 Q 65 160 10 320" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div className="timeline-indicator-light" />
        <motion.div className="timeline-draggable-area" drag="y" dragElastic={0.1} dragMomentum={false} onDrag={handleDrag} onDragEnd={handleDragEnd} />
        <div className="timeline-years-list">
          {years.map((year, idx) => (
            <div key={idx} className={\`timeline-year-item \${idx === activeIndex ? "active" : ""}\`} style={getPositionStyles(idx)} onClick={() => handleYearClick(idx)}>
              <span className="timeline-year-text">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

interface InteractiveTimelineProps {
  years?: (string | number)[];
  initialYear?: string | number;
  accentColor?: string;
  onChange?: (year: string | number) => void;
  className?: string;
}

export default function InteractiveTimeline({
  years = ["2021", "2022", "2023", "2024", "2025", "2026"],
  initialYear,
  accentColor = "#3b82f6",
  onChange,
  className = ""
}: InteractiveTimelineProps) {
  const VIEWPORT_HEIGHT = 320;
  const ITEM_HEIGHT = 60;
  const CENTER_Y = VIEWPORT_HEIGHT / 2;

  const getInitialIndex = () => {
    if (!initialYear) return 0;
    const idx = years.findIndex((y) => String(y) === String(initialYear));
    return idx !== -1 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollOffsetVal = useMotionValue(getInitialIndex() * ITEM_HEIGHT);
  const springConfig = { damping: 20, stiffness: 130, mass: 0.8 };
  const smoothOffset = useSpring(scrollOffsetVal, springConfig);
  const [currentOffset, setCurrentOffset] = useState(scrollOffsetVal.get());
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on("change", (latest: number) => setCurrentOffset(latest));
    return () => unsubscribe();
  }, [smoothOffset]);

  useEffect(() => {
    const idx = Math.min(years.length - 1, Math.max(0, Math.round(currentOffset / ITEM_HEIGHT)));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      if (onChange) onChange(years[idx]);
    }
  }, [currentOffset, years, activeIndex, onChange]);

  const isTransitioning = useRef(false);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current) return;

      const direction = Math.sign(e.deltaY);
      const targetIdx = Math.min(
        years.length - 1,
        Math.max(0, activeIndexRef.current + direction)
      );

      if (targetIdx !== activeIndexRef.current) {
        isTransitioning.current = true;
        animate(scrollOffsetVal, targetIdx * ITEM_HEIGHT, {
          type: "spring",
          ...springConfig,
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    };

    viewportEl.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => viewportEl.removeEventListener("wheel", handleNativeWheel);
  }, [years, scrollOffsetVal, springConfig]);

  const handleYearClick = (idx: number) => {
    animate(scrollOffsetVal, idx * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const handleDrag = (event: any, info: any) => {
    const current = scrollOffsetVal.get();
    scrollOffsetVal.set(current - info.delta.y * 0.85);
  };

  const handleDragEnd = () => {
    const current = scrollOffsetVal.get();
    const nearestIndex = Math.min(years.length - 1, Math.max(0, Math.round(current / ITEM_HEIGHT)));
    animate(scrollOffsetVal, nearestIndex * ITEM_HEIGHT, { type: "spring", ...springConfig });
  };

  const getPositionStyles = (idx: number) => {
    const itemCenterY = idx * ITEM_HEIGHT - currentOffset + CENTER_Y;
    const t = itemCenterY / VIEWPORT_HEIGHT;
    let x = 10;
    if (t >= 0 && t <= 1) {
      x = 10 + 110 * t * (1 - t);
    }
    const distFromCenter = Math.abs(t - 0.5);
    const opacity = Math.max(0.08, 1 - distFromCenter * 2.2);
    const scale = Math.max(0.75, 1.25 - distFromCenter * 1.3);

    return {
      transform: \`translate3d(\${x}px, \${itemCenterY - ITEM_HEIGHT / 2}px, 0) scale(\${scale})\`,
      opacity
    };
  };

  return (
    <div 
      className={\`inline-flex justify-center items-center bg-transparent select-none box-border \${className}\`}
      style={{ '--accent-color': accentColor }}
    >
      <div ref={viewportRef} className="relative w-[220px] h-[320px] overflow-hidden flex items-center">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-12" viewBox="0 0 200 320">
          <path d="M 10 0 Q 65 160 10 320" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div 
          className="absolute left-[32px] top-[calc(50%-5px)] w-2.5 h-2.5 rounded-full bg-white z-[5] pointer-events-none"
          style={{ border: '2px solid var(--accent-color)', boxShadow: '0 0 8px var(--accent-color)' }}
        />
        <motion.div className="absolute inset-0 z-[10] cursor-grab active:cursor-grabbing" drag="y" dragElastic={0.1} dragMomentum={false} onDrag={handleDrag} onDragEnd={handleDragEnd} />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]">
          {years.map((year, idx) => (
            <div key={idx} className="absolute h-[60px] flex items-center w-full pointer-events-auto cursor-pointer pl-[56px]" style={getPositionStyles(idx)} onClick={() => handleYearClick(idx)}>
              <span className={\`text-[26px] font-extrabold transition-all duration-355 tracking-tight \${idx === activeIndex ? "text-white" : "text-[#8e8e93]"}\`}>{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
    }
  },
  css: `.interactive-timeline-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  user-select: none;
  box-sizing: border-box;
  --accent-color: #3b82f6;
}
.timeline-scroll-viewport {
  position: relative;
  width: 220px;
  height: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.timeline-svg-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
}
.timeline-draggable-area {
  position: absolute;
  inset: 0;
  z-index: 10;
  cursor: grab;
}
.timeline-draggable-area:active { cursor: grabbing; }
.timeline-years-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
.timeline-year-item {
  position: absolute;
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 56px;
}
.timeline-year-text {
  font-size: 26px;
  font-weight: 800;
  color: #8e8e93;
  transition: color 0.35s ease;
  font-family: 'Outfit', 'Inter', sans-serif;
  letter-spacing: -0.02em;
}
.timeline-year-item.active .timeline-year-text { color: #ffffff; }
.timeline-indicator-light {
  position: absolute;
  left: 32px;
  top: calc(50% - 5px);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid var(--accent-color);
  box-shadow: 0 0 8px var(--accent-color);
  z-index: 5;
  pointer-events: none;
}`
};
