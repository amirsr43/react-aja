// src/components/ui/MagneticSlider.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Moon, Briefcase, User, Sparkles } from "lucide-react";

const SLIDER_STYLES = `
/* ── MAGNETIC SLIDER COMPONENT STYLES ── */
.magnetic-slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: 'Outfit', 'Inter', sans-serif;
  user-select: none;
}

/* Outer anti-reflective glass shell */
.magnetic-slider-capsule {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 80px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    inset 0 -1px 1px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Frictionless slider channel (Inner track) */
.magnetic-slider-channel {
  position: absolute;
  inset: 6px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  z-index: 1;
  box-sizing: border-box;
}

/* OLED light guide (Dynamic radial glow background) */
.magnetic-slider-glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.8;
  transition: background 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.magnetic-slider-glow.state-idle {
  background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.22) 0%, rgba(147, 51, 234, 0.08) 40%, rgba(0, 0, 0, 0) 70%);
  animation: light-guide-pulse 3s infinite alternate ease-in-out;
}

.magnetic-slider-glow.state-sleep {
  background: radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.38) 0%, rgba(147, 51, 234, 0.12) 45%, rgba(0, 0, 0, 0) 75%);
}

.magnetic-slider-glow.state-work {
  background: radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.42) 0%, rgba(147, 51, 234, 0.15) 45%, rgba(0, 0, 0, 0) 75%);
}

@keyframes light-guide-pulse {
  0% {
    transform: scale(0.96);
    opacity: 0.65;
  }
  100% {
    transform: scale(1.04);
    opacity: 0.9;
  }
}

/* Labels styling */
.magnetic-slider-label {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
  pointer-events: auto;
}

.magnetic-slider-label.label-sleep.active {
  color: #ff7e79;
  text-shadow: 
    0 0 8px rgba(255, 126, 121, 0.6),
    0 0 20px rgba(255, 126, 121, 0.2);
}

.magnetic-slider-label.label-work.active {
  color: #ffffff;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(59, 130, 246, 0.5);
}

/* Draggable glass sphere slider handle */
.magnetic-slider-sphere {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 3;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  left: calc(50% - 25px); /* Initially centered */
  
  /* Spherical glass highlight shading */
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.45) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.4),
    inset 0 2px 3px rgba(255, 255, 255, 0.3),
    inset -2px -2px 6px rgba(0, 0, 0, 0.3);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.magnetic-slider-sphere:active {
  cursor: grabbing;
}

/* Glass glare reflection overlay */
.magnetic-slider-sphere::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  right: 6px;
  height: 40%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 9999px;
  pointer-events: none;
}

.magnetic-slider-sphere-icon {
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.4s ease;
}

.state-sleep .magnetic-slider-sphere-icon {
  color: #ff7e79;
  filter: drop-shadow(0 0 6px rgba(255, 126, 121, 0.7));
}

.state-work .magnetic-slider-sphere-icon {
  color: #60a5fa;
  filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.8));
}

/* Showcase dashboard layout */
.slider-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: rgba(10, 10, 10, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 14px 20px;
  min-width: 260px;
}

.dashboard-title {
  font-size: 11px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8e8e93;
}

.dashboard-status {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff7e79;
}

.status-dot.sleep {
  background: #ff7e79;
  box-shadow: 0 0 8px #ff7e79;
}

.status-dot.work {
  background: #60a5fa;
  box-shadow: 0 0 8px #60a5fa;
}

.status-dot.idle {
  background: #a1a1aa;
  box-shadow: 0 0 8px #a1a1aa;
}
`;

export function MagneticSlider({
  initialState = "idle", // "sleep" | "idle" | "work"
  sleepLabel = "Sleep",
  workLabel = "Work",
  sleepIcon: SleepIcon = Moon,
  workIcon: WorkIcon = Briefcase,
  idleIcon: IdleIcon = User,
  onChange,
  className = "",
  ...props
}) {
  const [state, setState] = useState(initialState); // "sleep" | "idle" | "work"
  const [driftX, setDriftX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const [capsuleWidth, setCapsuleWidth] = useState(320);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCapsuleWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const dragRange = Math.max(30, (capsuleWidth / 2) - 65);
  const SLEEP_X = -dragRange;
  const WORK_X = dragRange;
  const IDLE_X = 0;

  const getTargetX = () => {
    if (state === "sleep") return SLEEP_X;
    if (state === "work") return WORK_X;
    return IDLE_X;
  };

  // Trigger state changes
  const updateState = (newState) => {
    setState(newState);
    if (onChange) onChange(newState);
  };

  // Hover drift calculation
  const handleMouseMove = (e) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = e.clientX - centerX;
    const maxRange = rect.width / 2;
    
    // Normalized offset from -1 to +1
    const normalized = Math.max(-1, Math.min(1, relativeX / maxRange));
    
    // Apply a maximum magnetic attraction drift of 12px
    setDriftX(normalized * 12);
  };

  const handleMouseLeave = () => {
    setDriftX(0);
  };

  // Dynamic values
  const activeTargetX = getTargetX();
  const currentX = activeTargetX + (isDragging ? 0 : driftX);

  // Icon mapping
  const renderIcon = () => {
    if (state === "sleep") return <SleepIcon size={18} className="magnetic-slider-sphere-icon" />;
    if (state === "work") return <WorkIcon size={18} className="magnetic-slider-sphere-icon" />;
    return <IdleIcon size={18} className="magnetic-slider-sphere-icon" />;
  };

  return (
    <div className={`magnetic-slider-container ${className}`} {...props}>
      <style>{SLIDER_STYLES}</style>

      {/* Glass capsule wrapper */}
      <div
        ref={containerRef}
        className={`magnetic-slider-capsule state-${state}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow indicator */}
        <div className={`magnetic-slider-glow state-${state}`} />

        {/* Inner track channel */}
        <div className="magnetic-slider-channel">
          <span
            className={`magnetic-slider-label label-sleep ${state === "sleep" ? "active" : ""}`}
            onClick={() => updateState("sleep")}
          >
            {sleepLabel}
          </span>
          <span
            className={`magnetic-slider-label label-work ${state === "work" ? "active" : ""}`}
            onClick={() => updateState("work")}
          >
            {workLabel}
          </span>
        </div>

        {/* Floating magnetic sphere */}
        <motion.div
          drag="x"
          dragConstraints={{ left: SLEEP_X, right: WORK_X }}
          dragElastic={0.15}
          dragMomentum={false}
          animate={{ x: currentX }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
            mass: 0.8
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            if (!containerRef.current) return;
            
            // Get center position relative to page scroll
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const absoluteReleaseX = info.point.x;
            const relativeReleaseX = absoluteReleaseX - centerX;

            // Snap zones based on half of the active drag range
            const snapThreshold = dragRange * 0.5;
            if (relativeReleaseX < -snapThreshold) {
              updateState("sleep");
            } else if (relativeReleaseX > snapThreshold) {
              updateState("work");
            } else {
              updateState("idle");
            }
          }}
          className="magnetic-slider-sphere"
        >
          {renderIcon()}
        </motion.div>
      </div>

      {/* Showcase Dashboard readout */}
      <div className="slider-dashboard">
        <span className="dashboard-title">System status</span>
        <div className="dashboard-status">
          <span className={`status-dot ${state}`} />
          {state === "sleep" && `Cozy ${sleepLabel} Mode Active`}
          {state === "work" && `Focused ${workLabel} Mode Active`}
          {state === "idle" && "System In Standby (Idle)"}
        </div>
      </div>
    </div>
  );
}

export default MagneticSlider;
