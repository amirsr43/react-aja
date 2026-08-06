// src/components/ui/InteractiveTimeline.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const TIMELINE_STYLES = `
/* ── INTERACTIVE TIMELINE STYLES ── */
.interactive-timeline-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  user-select: none;
  box-sizing: border-box;
}

/* Viewport for scrolling years along arc */
.timeline-scroll-viewport {
  position: relative;
  width: 220px;
  height: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Curved path track behind years */
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

/* Draggable track wrapper */
.timeline-draggable-area {
  position: absolute;
  inset: 0;
  z-index: 10;
  cursor: grab;
}
.timeline-draggable-area:active {
  cursor: grabbing;
}

.timeline-years-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

/* Single year label container */
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

.timeline-year-item.active .timeline-year-text {
  color: #ffffff;
}

/* Glowing indicator light styling */
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
`;

const DEFAULT_YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"];

export function InteractiveTimeline({
  years = DEFAULT_YEARS,
  initialYear,
  accentColor = "#3b82f6",
  onChange,
  className = "",
  ...props
}) {
  const VIEWPORT_HEIGHT = 320;
  const ITEM_HEIGHT = 60;
  const CENTER_Y = VIEWPORT_HEIGHT / 2; // 160

  // Find index of initialYear
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

  // Motion Value for the current scrolling offset
  const scrollOffsetVal = useMotionValue(getInitialIndex() * ITEM_HEIGHT);
  
  // Spring settings for smooth physics tracking
  const springConfig = { damping: 20, stiffness: 130, mass: 0.8 };
  const smoothOffset = useSpring(scrollOffsetVal, springConfig);

  // Re-calculate when state triggers
  const [currentOffset, setCurrentOffset] = useState(scrollOffsetVal.get());
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on("change", (latest) => {
      setCurrentOffset(latest);
    });
    return () => unsubscribe();
  }, [smoothOffset]);

  // Keep track of active index based on closest item to viewport center
  useEffect(() => {
    const idx = Math.min(
      years.length - 1,
      Math.max(0, Math.round(currentOffset / ITEM_HEIGHT))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      if (onChange) onChange(years[idx]);
    }
  }, [currentOffset, years, activeIndex, onChange]);

  // Wheel Scroll handler (with native non-passive listener)
  const isTransitioning = useRef(false);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const handleNativeWheel = (e) => {
      e.preventDefault(); // Lock scroll focus here
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
    return () => {
      viewportEl.removeEventListener("wheel", handleNativeWheel);
    };
  }, [years, scrollOffsetVal, springConfig]);

  // Click direct to year
  const handleYearClick = (idx) => {
    animate(scrollOffsetVal, idx * ITEM_HEIGHT, {
      type: "spring",
      ...springConfig
    });
  };

  // Drag handler on viewport
  const handleDrag = (event, info) => {
    const current = scrollOffsetVal.get();
    scrollOffsetVal.set(current - info.delta.y * 0.85);
  };

  const handleDragEnd = () => {
    const current = scrollOffsetVal.get();
    const nearestIndex = Math.min(
      years.length - 1,
      Math.max(0, Math.round(current / ITEM_HEIGHT))
    );
    animate(scrollOffsetVal, nearestIndex * ITEM_HEIGHT, {
      type: "spring",
      ...springConfig
    });
  };

  // Math to position years along arc path:
  // t_i ranges from 0 to 1 as item moves from top to bottom of viewport
  const getPositionStyles = (idx) => {
    const itemCenterY = idx * ITEM_HEIGHT - currentOffset + CENTER_Y;
    const t = itemCenterY / VIEWPORT_HEIGHT;
    
    // SVG quadratic bezier curve representation:
    // x = 10 + 110 * t * (1 - t)
    let x = 10;
    if (t >= 0 && t <= 1) {
      x = 10 + 110 * t * (1 - t);
    }
    
    // Scale and opacity equations relative to distance from center (t = 0.5)
    const distFromCenter = Math.abs(t - 0.5);
    const opacity = Math.max(0.08, 1 - distFromCenter * 2.2);
    const scale = Math.max(0.75, 1.25 - distFromCenter * 1.3);

    return {
      transform: `translate3d(${x}px, ${itemCenterY - ITEM_HEIGHT / 2}px, 0) scale(${scale})`,
      opacity
    };
  };

  return (
    <div 
      className={`interactive-timeline-container ${className}`} 
      style={{ '--accent-color': accentColor }}
      {...props}
    >
      <style>{TIMELINE_STYLES}</style>

      {/* Viewport: Arc Wheel of Years */}
      <div 
        ref={viewportRef}
        className="timeline-scroll-viewport"
      >
        {/* Track Line SVG */}
        <svg className="timeline-svg-track" viewBox="0 0 200 320">
          <path 
            d="M 10 0 Q 65 160 10 320" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
        </svg>

        {/* Glowing Indicator Light */}
        <div className="timeline-indicator-light" />

        {/* Drag Interaction Layer */}
        <motion.div 
          className="timeline-draggable-area"
          drag="y"
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />

        {/* Years container */}
        <div className="timeline-years-list">
          {years.map((year, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={idx}
                className={`timeline-year-item ${isSelected ? "active" : ""}`}
                style={getPositionStyles(idx)}
                onClick={() => handleYearClick(idx)}
              >
                <span className="timeline-year-text">
                  {year}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractiveTimeline;
