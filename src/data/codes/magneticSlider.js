// src/data/codes/magneticSlider.js

export const magneticSliderCode = {
  code: {
    js: {
      css: `// MagneticSlider.jsx (JavaScript + Custom CSS)
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Briefcase, User } from "lucide-react";
import "./MagneticSlider.css"; // Include the CSS stylesheet below

export default function MagneticSlider({
  initialState = "idle",
  sleepLabel = "Sleep",
  workLabel = "Work",
  sleepIcon: SleepIcon = Moon,
  workIcon: WorkIcon = Briefcase,
  idleIcon: IdleIcon = User,
  onChange
}) {
  const [state, setState] = useState(initialState); // "sleep" | "idle" | "work"
  const [driftX, setDriftX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const SLEEP_X = -95;
  const WORK_X = 95;
  const IDLE_X = 0;

  const getTargetX = () => {
    if (state === "sleep") return SLEEP_X;
    if (state === "work") return WORK_X;
    return IDLE_X;
  };

  const updateState = (newState) => {
    setState(newState);
    if (onChange) onChange(newState);
  };

  const handleMouseMove = (e) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = e.clientX - centerX;
    const maxRange = rect.width / 2;
    const normalized = Math.max(-1, Math.min(1, relativeX / maxRange));
    setDriftX(normalized * 12); // Magnetic drift
  };

  const activeTargetX = getTargetX();
  const currentX = activeTargetX + (isDragging ? 0 : driftX);

  return (
    <div className="magnetic-slider-container">
      <div
        ref={containerRef}
        className={"magnetic-slider-capsule state-" + state}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setDriftX(0)}
      >
        <div className={"magnetic-slider-glow state-" + state} />

        <div className="magnetic-slider-channel">
          <span
            className={"magnetic-slider-label label-sleep " + (state === "sleep" ? "active" : "")}
            onClick={() => updateState("sleep")}
          >
            {sleepLabel}
          </span>
          <span
            className={"magnetic-slider-label label-work " + (state === "work" ? "active" : "")}
            onClick={() => updateState("work")}
          >
            {workLabel}
          </span>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: SLEEP_X, right: WORK_X }}
          dragElastic={0.15}
          dragMomentum={false}
          animate={{ x: currentX }}
          transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.8 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const relativeReleaseX = info.point.x - centerX;

            if (relativeReleaseX < -45) {
              updateState("sleep");
            } else if (relativeReleaseX > 45) {
              updateState("work");
            } else {
              updateState("idle");
            }
          }}
          className="magnetic-slider-sphere"
        >
          {state === "sleep" && <SleepIcon size={18} className="magnetic-slider-sphere-icon" />}
          {state === "work" && <WorkIcon size={18} className="magnetic-slider-sphere-icon" />}
          {state === "idle" && <IdleIcon size={18} className="magnetic-slider-sphere-icon" />}
        </motion.div>
      </div>
    </div>
  );
}`,
      tailwind: `// MagneticSlider.jsx (JavaScript + Tailwind CSS)
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Briefcase, User } from "lucide-react";

export default function MagneticSlider({
  initialState = "idle",
  sleepLabel = "Sleep",
  workLabel = "Work",
  sleepIcon: SleepIcon = Moon,
  workIcon: WorkIcon = Briefcase,
  idleIcon: IdleIcon = User,
  onChange
}) {
  const [state, setState] = useState(initialState);
  const [driftX, setDriftX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const SLEEP_X = -95;
  const WORK_X = 95;
  const IDLE_X = 0;

  const getTargetX = () => {
    if (state === "sleep") return SLEEP_X;
    if (state === "work") return WORK_X;
    return IDLE_X;
  };

  const updateState = (newState) => {
    setState(newState);
    if (onChange) onChange(newState);
  };

  const handleMouseMove = (e) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = e.clientX - centerX;
    const maxRange = rect.width / 2;
    const normalized = Math.max(-1, Math.min(1, relativeX / maxRange));
    setDriftX(normalized * 12);
  };

  const activeTargetX = getTargetX();
  const currentX = activeTargetX + (isDragging ? 0 : driftX);

  const glowGradients = {
    idle: "bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.22)_0%,rgba(147,51,234,0.08)_40%,transparent_70%)]",
    sleep: "bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.38)_0%,rgba(147,51,234,0.12)_45%,transparent_75%)]",
    work: "bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.42)_0%,rgba(147,51,234,0.15)_45%,transparent_75%)]"
  };

  return (
    <div className="flex flex-col items-center gap-5 select-none font-sans">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setDriftX(0)}
        className="relative w-[320px] h-[80px] rounded-full bg-white/2 border border-white/6 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-1px_1px_rgba(0,0,0,0.3)] backdrop-blur-xl overflow-hidden flex items-center p-2 box-border cursor-pointer"
      >
        {/* Glow indicator */}
        <div className={"absolute inset-0 rounded-full opacity-80 transition-all duration-700 ease-out pointer-events-none z-0 " + glowGradients[state] + (state === "idle" ? " animate-pulse" : "")} />

        {/* Track channel */}
        <div className="absolute inset-[6px] rounded-full bg-black/35 border border-white/3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-between px-7 z-[1] box-border pointer-events-none">
          <span
            onClick={() => updateState("sleep")}
            className={"text-[15px] font-semibold tracking-wider uppercase transition-all duration-400 z-10 pointer-events-auto cursor-pointer " + (state === "sleep" ? "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "text-white/25")}
          >
            {sleepLabel}
          </span>
          <span
            onClick={() => updateState("work")}
            className={"text-[15px] font-semibold tracking-wider uppercase transition-all duration-400 z-10 pointer-events-auto cursor-pointer " + (state === "work" ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "text-white/25")}
          >
            {workLabel}
          </span>
        </div>

        {/* Sphere slider handle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: SLEEP_X, right: WORK_X }}
          dragElastic={0.15}
          dragMomentum={false}
          animate={{ x: currentX }}
          transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.8 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const relativeReleaseX = info.point.x - centerX;

            if (relativeReleaseX < -45) {
              updateState("sleep");
            } else if (relativeReleaseX > 45) {
              updateState("work");
            } else {
              updateState("idle");
            }
          }}
          className="absolute w-[50px] h-[50px] rounded-full left-[calc(50%-25px)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.02)_50%,rgba(0,0,0,0.45)_100%)] backdrop-blur-md border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.3),inset_-2px_-2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-grab active:cursor-grabbing z-[3] before:content-[''] before:absolute before:top-[2px] before:left-[6px] before:right-[6px] before:h-[40%] before:bg-gradient-to-b before:from-white/35 before:to-transparent before:rounded-full before:pointer-events-none"
        >
          {state === "sleep" && <SleepIcon size={18} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" />}
          {state === "work" && <WorkIcon size={18} className="text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]" />}
          {state === "idle" && <IdleIcon size={18} className="text-white/65" />}
        </motion.div>
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// MagneticSlider.tsx (TypeScript + Custom CSS)
import React, { useState, useRef, ComponentType } from "react";
import { motion, PanInfo } from "framer-motion";
import { Moon, Briefcase, User } from "lucide-react";
import "./MagneticSlider.css";

interface MagneticSliderProps {
  initialState?: "sleep" | "idle" | "work";
  sleepLabel?: string;
  workLabel?: string;
  sleepIcon?: ComponentType<{ size?: number | string; className?: string }>;
  workIcon?: ComponentType<{ size?: number | string; className?: string }>;
  idleIcon?: ComponentType<{ size?: number | string; className?: string }>;
  onChange?: (state: "sleep" | "idle" | "work") => void;
}

export default function MagneticSlider({
  initialState = "idle",
  sleepLabel = "Sleep",
  workLabel = "Work",
  sleepIcon: SleepIcon = Moon,
  workIcon: WorkIcon = Briefcase,
  idleIcon: IdleIcon = User,
  onChange
}: MagneticSliderProps) {
  const [state, setState] = useState<"sleep" | "idle" | "work">(initialState);
  const [driftX, setDriftX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const SLEEP_X = -95;
  const WORK_X = 95;
  const IDLE_X = 0;

  const getTargetX = (): number => {
    if (state === "sleep") return SLEEP_X;
    if (state === "work") return WORK_X;
    return IDLE_X;
  };

  const updateState = (newState: "sleep" | "idle" | "work") => {
    setState(newState);
    if (onChange) onChange(newState);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = e.clientX - centerX;
    const maxRange = rect.width / 2;
    const normalized = Math.max(-1, Math.min(1, relativeX / maxRange));
    setDriftX(normalized * 12);
  };

  const activeTargetX = getTargetX();
  const currentX = activeTargetX + (isDragging ? 0 : driftX);

  return (
    <div className="magnetic-slider-container">
      <div
        ref={containerRef}
        className={"magnetic-slider-capsule state-" + state}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setDriftX(0)}
      >
        <div className={"magnetic-slider-glow state-" + state} />

        <div className="magnetic-slider-channel">
          <span
            className={"magnetic-slider-label label-sleep " + (state === "sleep" ? "active" : "")}
            onClick={() => updateState("sleep")}
          >
            {sleepLabel}
          </span>
          <span
            className={"magnetic-slider-label label-work " + (state === "work" ? "active" : "")}
            onClick={() => updateState("work")}
          >
            {workLabel}
          </span>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: SLEEP_X, right: WORK_X }}
          dragElastic={0.15}
          dragMomentum={false}
          animate={{ x: currentX }}
          transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.8 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info: PanInfo) => {
            setIsDragging(false);
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const relativeReleaseX = info.point.x - centerX;

            if (relativeReleaseX < -45) {
              updateState("sleep");
            } else if (relativeReleaseX > 45) {
              updateState("work");
            } else {
              updateState("idle");
            }
          }}
          className="magnetic-slider-sphere"
        >
          {state === "sleep" && <SleepIcon size={18} className="magnetic-slider-sphere-icon" />}
          {state === "work" && <WorkIcon size={18} className="magnetic-slider-sphere-icon" />}
          {state === "idle" && <IdleIcon size={18} className="magnetic-slider-sphere-icon" />}
        </motion.div>
      </div>
    </div>
  );
}`,
      tailwind: `// MagneticSlider.tsx (TypeScript + Tailwind CSS)
import React, { useState, useRef, ComponentType } from "react";
import { motion, PanInfo } from "framer-motion";
import { Moon, Briefcase, User } from "lucide-react";

interface MagneticSliderProps {
  initialState?: "sleep" | "idle" | "work";
  sleepLabel?: string;
  workLabel?: string;
  sleepIcon?: ComponentType<{ size?: number | string; className?: string }>;
  workIcon?: ComponentType<{ size?: number | string; className?: string }>;
  idleIcon?: ComponentType<{ size?: number | string; className?: string }>;
  onChange?: (state: "sleep" | "idle" | "work") => void;
}

export default function MagneticSlider({
  initialState = "idle",
  sleepLabel = "Sleep",
  workLabel = "Work",
  sleepIcon: SleepIcon = Moon,
  workIcon: WorkIcon = Briefcase,
  idleIcon: IdleIcon = User,
  onChange
}: MagneticSliderProps) {
  const [state, setState] = useState<"sleep" | "idle" | "work">(initialState);
  const [driftX, setDriftX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const SLEEP_X = -95;
  const WORK_X = 95;
  const IDLE_X = 0;

  const getTargetX = (): number => {
    if (state === "sleep") return SLEEP_X;
    if (state === "work") return WORK_X;
    return IDLE_X;
  };

  const updateState = (newState: "sleep" | "idle" | "work") => {
    setState(newState);
    if (onChange) onChange(newState);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = e.clientX - centerX;
    const maxRange = rect.width / 2;
    const normalized = Math.max(-1, Math.min(1, relativeX / maxRange));
    setDriftX(normalized * 12);
  };

  const activeTargetX = getTargetX();
  const currentX = activeTargetX + (isDragging ? 0 : driftX);

  const glowGradients = {
    idle: "bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.22)_0%,rgba(147,51,234,0.08)_40%,transparent_70%)]",
    sleep: "bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.38)_0%,rgba(147,51,234,0.12)_45%,transparent_75%)]",
    work: "bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.42)_0%,rgba(147,51,234,0.15)_45%,transparent_75%)]"
  };

  return (
    <div className="flex flex-col items-center gap-5 select-none font-sans">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setDriftX(0)}
        className="relative w-[320px] h-[80px] rounded-full bg-white/2 border border-white/6 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-1px_1px_rgba(0,0,0,0.3)] backdrop-blur-xl overflow-hidden flex items-center p-2 box-border cursor-pointer"
      >
        {/* Glow indicator */}
        <div className={"absolute inset-0 rounded-full opacity-80 transition-all duration-700 ease-out pointer-events-none z-0 " + glowGradients[state] + (state === "idle" ? " animate-pulse" : "")} />

        {/* Track channel */}
        <div className="absolute inset-[6px] rounded-full bg-black/35 border border-white/3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-between px-7 z-[1] box-border pointer-events-none">
          <span
            onClick={() => updateState("sleep")}
            className={"text-[15px] font-semibold tracking-wider uppercase transition-all duration-400 z-10 pointer-events-auto cursor-pointer " + (state === "sleep" ? "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "text-white/25")}
          >
            {sleepLabel}
          </span>
          <span
            onClick={() => updateState("work")}
            className={"text-[15px] font-semibold tracking-wider uppercase transition-all duration-400 z-10 pointer-events-auto cursor-pointer " + (state === "work" ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "text-white/25")}
          >
            {workLabel}
          </span>
        </div>

        {/* Sphere slider handle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: SLEEP_X, right: WORK_X }}
          dragElastic={0.15}
          dragMomentum={false}
          animate={{ x: currentX }}
          transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.8 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info: PanInfo) => {
            setIsDragging(false);
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const relativeReleaseX = info.point.x - centerX;

            if (relativeReleaseX < -45) {
              updateState("sleep");
            } else if (relativeReleaseX > 45) {
              updateState("work");
            } else {
              updateState("idle");
            }
          }}
          className="absolute w-[50px] h-[50px] rounded-full left-[calc(50%-25px)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.02)_50%,rgba(0,0,0,0.45)_100%)] backdrop-blur-md border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.3),inset_-2px_-2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-grab active:cursor-grabbing z-[3] before:content-[''] before:absolute before:top-[2px] before:left-[6px] before:right-[6px] before:h-[40%] before:bg-gradient-to-b before:from-white/35 before:to-transparent before:rounded-full before:pointer-events-none"
        >
          {state === "sleep" && <SleepIcon size={18} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" />}
          {state === "work" && <WorkIcon size={18} className="text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]" />}
          {state === "idle" && <IdleIcon size={18} className="text-white/65" />}
        </motion.div>
      </div>
    </div>
  );
}`
    }
  },
  css: `/* MagneticSlider.css */

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
  width: 320px;
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
  left: calc(50% - 25px);
  
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.45) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.4),
    inset 0 2px 3px rgba(255, 255, 255, 0.3),
    inset -2px -2px 6px rgba(0, 0, 0, 0.3);
}

.magnetic-slider-sphere:active {
  cursor: grabbing;
}

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
}`
};
