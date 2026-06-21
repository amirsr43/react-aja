// src/data/codes/fluidSwitch.js

export const fluidSwitchCode = {
  code: {
    js: {
      css: `// FluidSwitch.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Cloud, Star } from "lucide-react";
import "./FluidSwitch.css"; // Include the CSS stylesheet below

// ── 1. Fluid Segment Control ──
export function FluidSegmentSwitch({
  options = ["Tab 1", "Tab 2", "Tab 3"],
  icons = [],
  activeIdx = 0,
  onChange
}) {
  return (
    <div className="fluid-segment-wrapper">
      {options.map((opt, idx) => {
        const Icon = icons[idx];
        const isActive = activeIdx === idx;
        return (
          <button
            key={idx}
            className={"fluid-segment-btn " + (isActive ? "active" : "")}
            onClick={() => onChange && onChange(idx)}
          >
            {Icon && <Icon size={14} />}
            <span>{opt}</span>

            {isActive && (
              <motion.div
                layoutId="segment-active-pill"
                className="fluid-active-pill"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.8 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── 2. Cosmic Theme Switch ──
export function CosmicThemeSwitch({ isDark = true, onChange }) {
  return (
    <div
      onClick={() => onChange && onChange(!isDark)}
      className={"cosmic-switch-track " + (isDark ? "dark" : "light")}
    >
      <div className="cosmic-sky-layer">
        <AnimatePresence>
          {!isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10, y: 4 }}
                animate={{ opacity: 0.8, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="sky-cloud"
                style={{ left: 32, top: 4 }}
              >
                <Cloud size={10} fill="#ffffff" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15, y: 12 }}
                animate={{ opacity: 0.9, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="sky-cloud"
                style={{ left: 38, top: 16 }}
              >
                <Cloud size={14} fill="#ffffff" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="sky-star"
                style={{ left: 14, top: 8 }}
              >
                <Star size={4} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.8, 0.3, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                className="sky-star"
                style={{ left: 24, top: 18 }}
              >
                <Star size={3} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className={"cosmic-thumb " + (isDark ? "dark" : "light")}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ marginLeft: isDark ? "34px" : "0px" }}
      >
        {isDark && (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div className="moon-crater" style={{ width: 4, height: 4, left: 8, top: 8 }} />
            <div className="moon-crater" style={{ width: 6, height: 6, left: 14, top: 16 }} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ── 3. Tactile 3D Switch ──
export function Tactile3DToggle({ checked = false, onChange }) {
  return (
    <div onClick={() => onChange && onChange(!checked)} className="tactile-3d-wrapper">
      <div className="tactile-3d-depth" />
      <div className="tactile-3d-face">
        <motion.div
          className="tactile-3d-handle"
          layout
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{ marginLeft: checked ? "38px" : "0px" }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(0,0,0,0.3)" }} />
            <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(0,0,0,0.3)" }} />
          </div>
        </motion.div>

        <div className="tactile-led">
          <div className={"led-light " + (checked ? "active" : "inactive")} />
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `// FluidSwitch.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Cloud, Star } from "lucide-react";

// ── 1. Fluid Segment Control ──
export function FluidSegmentSwitch({
  options = ["Tab 1", "Tab 2", "Tab 3"],
  icons = [],
  activeIdx = 0,
  onChange
}) {
  return (
    <div className="relative flex bg-white/2 border border-white/6 p-1 rounded-xl">
      {options.map((opt, idx) => {
        const Icon = icons[idx];
        const isActive = activeIdx === idx;
        return (
          <button
            key={idx}
            className={"relative bg-transparent border-none py-2.5 px-5 rounded-lg cursor-pointer z-10 flex items-center gap-2 transition-colors duration-300 outline-none " + (isActive ? "text-white" : "text-white/50 hover:text-white/80")}
            onClick={() => onChange && onChange(idx)}
          >
            {Icon && <Icon size={14} />}
            <span>{opt}</span>

            {isActive && (
              <motion.div
                layoutId="segment-active-pill"
                className="absolute inset-0 w-full h-full bg-white/[0.06] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.8 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── 2. Cosmic Theme Switch ──
export function CosmicThemeSwitch({ isDark = true, onChange }) {
  return (
    <div
      onClick={() => onChange && onChange(!isDark)}
      className={"relative w-[78px] h-[42px] rounded-full cursor-pointer p-1 overflow-hidden border transition-colors duration-400 select-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_10px_25px_-5px_rgba(0,0,0,0.4)] " + (isDark ? "bg-gradient-to-b from-zinc-950 to-gray-950 border-white/5" : "bg-gradient-to-b from-sky-300 to-sky-400 border-sky-400/30")}
    >
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {!isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10, y: 4 }}
                animate={{ opacity: 0.8, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-8 top-1 text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              >
                <Cloud size={10} fill="#ffffff" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15, y: 12 }}
                animate={{ opacity: 0.9, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="absolute left-9 top-4 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              >
                <Cloud size={14} fill="#ffffff" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute left-3.5 top-2 text-white fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              >
                <Star size={4} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.8, 0.3, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                className="absolute left-6 top-4.5 text-white fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              >
                <Star size={3} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ marginLeft: isDark ? "36px" : "0px" }}
        className={"relative w-8 h-8 rounded-full shadow-lg z-20 flex items-center justify-center " + (isDark ? "bg-[radial-gradient(circle_at_30%_30%,#e2e8f0_0%,#94a3b8_70%)] border border-white/20 shadow-white/10" : "bg-[radial-gradient(circle_at_30%_30%,#fef08a_0%,#eab308_70%)] border border-yellow-200 shadow-yellow-500/60")}
      >
        {isDark && (
          <div className="relative w-full h-full">
            <div className="absolute rounded-full bg-black/12 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.2)] w-1 h-1 left-2 top-2" />
            <div className="absolute rounded-full bg-black/12 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.2)] w-1.5 h-1.5 left-3.5 top-4" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ── 3. Tactile 3D Switch ──
export function Tactile3DToggle({ checked = false, onChange }) {
  return (
    <div onClick={() => onChange && onChange(!checked)} className="relative cursor-pointer select-none group">
      <div className="absolute inset-0 rounded-xl bg-zinc-900 border border-black/40 translate-y-1 transition-transform duration-100 group-hover:translate-y-[5px] group-active:translate-y-[3px]" />
      <div className="relative w-[84px] h-[44px] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center p-1.5 box-border translate-y-0 transition-transform duration-150 group-hover:-translate-y-[1px] group-active:translate-y-[3px]">
        <motion.div
          className="w-8 h-8 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 border border-zinc-600 shadow-[0_4px_6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center"
          layout
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{ marginLeft: checked ? "38px" : "0px" }}
        >
          <div className="flex gap-0.5">
            <div className="width-[2px] h-3 bg-white/[0.06] border-l border-black/30" />
            <div className="width-[2px] h-3 bg-white/[0.06] border-l border-black/30" />
          </div>
        </motion.div>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-1.5 rounded-full bg-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className={"w-full h-full rounded-full transition-all duration-300 " + (checked ? "bg-emerald-500 shadow-[0_0_6px_#10b981]" : "bg-red-500 shadow-[0_0_6px_#ef4444]")} />
        </div>
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// FluidSwitch.tsx (TypeScript + Custom CSS)
import React, { useState, ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Cloud, Star } from "lucide-react";
import "./FluidSwitch.css";

interface FluidSegmentSwitchProps {
  options?: string[];
  icons?: ComponentType<{ size?: number }>[];
  activeIdx?: number;
  onChange?: (idx: number) => void;
}

export function FluidSegmentSwitch({
  options = ["Tab 1", "Tab 2", "Tab 3"],
  icons = [],
  activeIdx = 0,
  onChange
}: FluidSegmentSwitchProps) {
  return (
    <div className="fluid-segment-wrapper">
      {options.map((opt, idx) => {
        const Icon = icons[idx];
        const isActive = activeIdx === idx;
        return (
          <button
            key={idx}
            className={\`fluid-segment-btn \${isActive ? "active" : ""}\`}
            onClick={() => onChange && onChange(idx)}
          >
            {Icon && <Icon size={14} />}
            <span>{opt}</span>

            {isActive && (
              <motion.div
                layoutId="segment-active-pill"
                className="fluid-active-pill"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.8 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface CosmicThemeSwitchProps {
  isDark?: boolean;
  onChange?: (isDark: boolean) => void;
}

export function CosmicThemeSwitch({ isDark = true, onChange }: CosmicThemeSwitchProps) {
  return (
    <div
      onClick={() => onChange && onChange(!isDark)}
      className={\`cosmic-switch-track \${isDark ? "dark" : "light"}\`}
    >
      <div className="cosmic-sky-layer">
        <AnimatePresence>
          {!isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10, y: 4 }}
                animate={{ opacity: 0.8, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="sky-cloud"
                style={{ left: 32, top: 4 }}
              >
                <Cloud size={10} fill="#ffffff" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15, y: 12 }}
                animate={{ opacity: 0.9, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="sky-cloud"
                style={{ left: 38, top: 16 }}
              >
                <Cloud size={14} fill="#ffffff" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="sky-star"
                style={{ left: 14, top: 8 }}
              >
                <Star size={4} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.8, 0.3, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                className="sky-star"
                style={{ left: 24, top: 18 }}
              >
                <Star size={3} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className={\`cosmic-thumb \${isDark ? "dark" : "light"}\`}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ marginLeft: isDark ? "34px" : "0px" }}
      >
        {isDark && (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div className="moon-crater" style={{ width: 4, height: 4, left: 8, top: 8 }} />
            <div className="moon-crater" style={{ width: 6, height: 6, left: 14, top: 16 }} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface Tactile3DToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Tactile3DToggle({ checked = false, onChange }: Tactile3DToggleProps) {
  return (
    <div onClick={() => onChange && onChange(!checked)} className="tactile-3d-wrapper">
      <div className="tactile-3d-depth" />
      <div className="tactile-3d-face">
        <motion.div
          className="tactile-3d-handle"
          layout
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{ marginLeft: checked ? "38px" : "0px" }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(0,0,0,0.3)" }} />
            <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(0,0,0,0.3)" }} />
          </div>
        </motion.div>

        <div className="tactile-led">
          <div className={\`led-light \${checked ? "active" : "inactive"}\`} />
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `// FluidSwitch.tsx (TypeScript + Tailwind CSS)
import React, { ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Cloud, Star } from "lucide-react";

interface FluidSegmentSwitchProps {
  options?: string[];
  icons?: ComponentType<{ size?: number }>[];
  activeIdx?: number;
  onChange?: (idx: number) => void;
}

export function FluidSegmentSwitch({
  options = ["Tab 1", "Tab 2", "Tab 3"],
  icons = [],
  activeIdx = 0,
  onChange
}: FluidSegmentSwitchProps) {
  return (
    <div className="relative flex bg-white/2 border border-white/6 p-1 rounded-xl">
      {options.map((opt, idx) => {
        const Icon = icons[idx];
        const isActive = activeIdx === idx;
        return (
          <button
            key={idx}
            className={\`relative bg-transparent border-none py-2.5 px-5 rounded-lg cursor-pointer z-10 flex items-center gap-2 transition-colors duration-300 outline-none \${isActive ? "text-white" : "text-white/50 hover:text-white/80"}\`}
            onClick={() => onChange && onChange(idx)}
          >
            {Icon && <Icon size={14} />}
            <span>{opt}</span>

            {isActive && (
              <motion.div
                layoutId="segment-active-pill"
                className="absolute inset-0 w-full h-full bg-white/[0.06] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.8 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface CosmicThemeSwitchProps {
  isDark?: boolean;
  onChange?: (isDark: boolean) => void;
}

export function CosmicThemeSwitch({ isDark = true, onChange }: CosmicThemeSwitchProps) {
  return (
    <div
      onClick={() => onChange && onChange(!isDark)}
      className={\`relative w-[78px] h-[42px] rounded-full cursor-pointer p-1 overflow-hidden border transition-colors duration-400 select-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_10px_25px_-5px_rgba(0,0,0,0.4)] \${isDark ? "bg-gradient-to-b from-zinc-950 to-gray-950 border-white/5" : "bg-gradient-to-b from-sky-300 to-sky-400 border-sky-400/30"}\`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {!isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10, y: 4 }}
                animate={{ opacity: 0.8, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-8 top-1 text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              >
                <Cloud size={10} fill="#ffffff" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15, y: 12 }}
                animate={{ opacity: 0.9, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="absolute left-9 top-4 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              >
                <Cloud size={14} fill="#ffffff" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute left-3.5 top-2 text-white fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              >
                <Star size={4} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.8, 0.3, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                className="absolute left-6 top-4.5 text-white fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              >
                <Star size={3} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ marginLeft: isDark ? "36px" : "0px" }}
        className={\`relative w-8 h-8 rounded-full shadow-lg z-20 flex items-center justify-center \${isDark ? "bg-[radial-gradient(circle_at_30%_30%,#e2e8f0_0%,#94a3b8_70%)] border border-white/20 shadow-white/10" : "bg-[radial-gradient(circle_at_30%_30%,#fef08a_0%,#eab308_70%)] border border-yellow-200 shadow-yellow-500/60"}\`}
      >
        {isDark && (
          <div className="relative w-full h-full">
            <div className="absolute rounded-full bg-black/12 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.2)] w-1 h-1 left-2 top-2" />
            <div className="absolute rounded-full bg-black/12 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.2)] w-1.5 h-1.5 left-3.5 top-4" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface Tactile3DToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Tactile3DToggle({ checked = false, onChange }: Tactile3DToggleProps) {
  return (
    <div onClick={() => onChange && onChange(!checked)} className="relative cursor-pointer select-none group">
      <div className="absolute inset-0 rounded-xl bg-zinc-900 border border-black/40 translate-y-1 transition-transform duration-100 group-hover:translate-y-[5px] group-active:translate-y-[3px]" />
      <div className="relative w-[84px] h-[44px] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center p-1.5 box-border translate-y-0 transition-transform duration-150 group-hover:-translate-y-[1px] group-active:translate-y-[3px]">
        <motion.div
          className="w-8 h-8 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 border border-zinc-600 shadow-[0_4px_6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center"
          layout
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{ marginLeft: checked ? "38px" : "0px" }}
        >
          <div className="flex gap-0.5">
            <div className="width-[2px] h-3 bg-white/[0.06] border-l border-black/30" />
            <div className="width-[2px] h-3 bg-white/[0.06] border-l border-black/30" />
          </div>
        </motion.div>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-1.5 rounded-full bg-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className={\`w-full h-full rounded-full transition-all duration-300 \${checked ? "bg-emerald-500 shadow-[0_0_6px_#10b981]" : "bg-red-500 shadow-[0_0_6px_#ef4444]"}\`} />
        </div>
      </div>
    </div>
  );
}`
    }
  },
  css: `/* FluidSwitch.css */

/* 1. Fluid Segment Control */
.fluid-segment-wrapper {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4px;
  border-radius: 12px;
  z-index: 1;
}

.fluid-segment-btn {
  position: relative;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13.5px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
  outline: none;
}

.fluid-segment-btn.active {
  color: #ffffff;
}

.fluid-segment-btn:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

.fluid-active-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

/* 2. Cosmic Theme Switch */
.cosmic-switch-track {
  position: relative;
  width: 78px;
  height: 42px;
  border-radius: 9999px;
  cursor: pointer;
  padding: 4px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
}

.cosmic-switch-track.light {
  background: linear-gradient(to bottom, #7dd3fc, #38bdf8);
  border-color: rgba(56, 189, 248, 0.3);
}

.cosmic-switch-track.dark {
  background: linear-gradient(to bottom, #09090b, #030712);
  border-color: rgba(255, 255, 255, 0.04);
}

.cosmic-sky-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sky-cloud {
  position: absolute;
  color: rgba(255, 255, 255, 0.85);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
}

.sky-star {
  position: absolute;
  color: #ffffff;
  fill: #ffffff;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
}

.cosmic-thumb {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.cosmic-thumb.light {
  background: radial-gradient(circle at 30% 30%, #fef08a 0%, #eab308 70%);
  border: 1px solid #fef08a;
  box-shadow: 0 0 16px rgba(234, 179, 8, 0.6);
}

.cosmic-thumb.dark {
  background: radial-gradient(circle at 30% 30%, #e2e8f0 0%, #94a3b8 70%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 0 12px rgba(255, 255, 255, 0.15),
    inset -2px -2px 4px rgba(0, 0, 0, 0.4);
}

.moon-crater {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.2);
}

/* 3. Tactile 3D Switch */
.tactile-3d-wrapper {
  position: relative;
  cursor: pointer;
  outline: none;
}

.tactile-3d-depth {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: #18181b;
  transform: translateY(4px);
  transition: transform 0.1s ease;
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.tactile-3d-face {
  position: relative;
  width: 84px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #27272a 0%, #1f1f23 100%);
  border: 1px solid #3f3f46;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 6px;
  box-sizing: border-box;
  transform: translateY(0);
  transition: transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tactile-3d-handle {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(to bottom, #3f3f46, #27272a);
  border: 1px solid #52525b;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tactile-led {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 6px;
  border-radius: 9999px;
  background: #18181b;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.led-light {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.led-light.active {
  background: #10b981;
  box-shadow: 
    0 0 6px #10b981,
    0 0 12px #10b981;
}

.led-light.inactive {
  background: #ef4444;
  box-shadow: 
    0 0 6px #ef4444,
    0 0 12px #ef4444;
}`
};
