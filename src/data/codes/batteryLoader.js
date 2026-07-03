// src/data/codes/batteryLoader.js

/* ─────────────────────────────────────────────────────────────
   CLASSIC BATTERY SNIPPETS
───────────────────────────────────────────────────────────── */
const CLASSIC_JS_CSS = `// ClassicBattery.jsx (JavaScript + Custom CSS)
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ClassicBattery.css";

function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function ClassicBattery({ percent = 75, charging = false }) {
  const { hex, rgb } = getColor(percent);

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb }}>
      <div className="battery-wrap">
        <div className="battery-body">
          <motion.div
            className="battery-fill"
            animate={{ width: \`\${percent}%\` }}
            transition={{ duration: 0.4, ease: "linear" }}
            style={{ background: \`linear-gradient(90deg, \${hex}cc, \${hex})\` }}
          >
            <div className="battery-wave" style={{ background: hex }} />
          </motion.div>
          <div className="battery-segments">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="battery-seg-line" />
            ))}
          </div>
          <AnimatePresence>
            {charging && (
              <motion.div
                className="battery-bolt"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                  <path
                    d="M13 2L3 16h8l-2 10 10-14h-8l2-10z"
                    fill={hex}
                    style={{ filter: \`drop-shadow(0 0 6px \${hex})\` }}
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="battery-cap" />
      </div>

      <div className="battery-percent" style={{ color: hex }}>
        {Math.round(percent)}<sup>%</sup>
      </div>

      <div className="battery-label">
        {charging ? "⚡ Charging..." : percent >= 100 ? "✓ Full" : "Discharging"}
      </div>
      <div className="battery-glow-bar" style={{ background: hex }} />
    </div>
  );
}`;

const CLASSIC_TS_CSS = `// ClassicBattery.tsx (TypeScript + Custom CSS)
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ClassicBattery.css";

interface ClassicBatteryProps {
  percent?: number;
  charging?: boolean;
}

function getColor(pct: number): { hex: string; rgb: string } {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function ClassicBattery({ percent = 75, charging = false }: ClassicBatteryProps) {
  const { hex, rgb } = getColor(percent);

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb } as React.CSSProperties}>
      <div className="battery-wrap">
        <div className="battery-body">
          <motion.div
            className="battery-fill"
            animate={{ width: \`\${percent}%\` }}
            transition={{ duration: 0.4, ease: "linear" }}
            style={{ background: \`linear-gradient(90deg, \${hex}cc, \${hex})\` }}
          >
            <div className="battery-wave" style={{ background: hex }} />
          </motion.div>
          <div className="battery-segments">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="battery-seg-line" />
            ))}
          </div>
          <AnimatePresence>
            {charging && (
              <motion.div
                className="battery-bolt"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                  <path
                    d="M13 2L3 16h8l-2 10 10-14h-8l2-10z"
                    fill={hex}
                    style={{ filter: \`drop-shadow(0 0 6px \${hex})\` }}
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="battery-cap" />
      </div>

      <div className="battery-percent" style={{ color: hex }}>
        {Math.round(percent)}<sup>%</sup>
      </div>

      <div className="battery-label">
        {charging ? "⚡ Charging..." : percent >= 100 ? "✓ Full" : "Discharging"}
      </div>
      <div className="battery-glow-bar" style={{ background: hex }} />
    </div>
  );
}`;

const CLASSIC_JS_TW = `// ClassicBattery.jsx (JavaScript + Tailwind CSS)
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function ClassicBattery({ percent = 75, charging = false }) {
  const { hex, rgb } = getColor(percent);

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden w-full max-w-[380px] bg-[rgba(10,10,14,0.5)] border border-white/[0.06] rounded-[24px] px-8 py-10 backdrop-blur-xl gap-7 text-white before:pointer-events-none before:absolute before:inset-0 before:transition-all before:duration-700"
      style={{
        "--glow-rgb": rgb,
        "--tw-before-bg": \`radial-gradient(ellipse at 50% 0%, rgba(\${rgb},0.08) 0%, transparent 70%)\`
      }}
    >
      <style>{\`
        @keyframes wave-move {
          0% { transform: translateX(0) scaleY(1); }
          100% { transform: translateX(10px) scaleY(1.15); }
        }
        @keyframes glow-pulse {
          0% { opacity: 0.4; transform: scaleX(0.8); }
          100% { opacity: 0.9; transform: scaleX(1.1); }
        }
      \`}</style>

      <div className="flex items-center gap-1 relative">
        <div className="relative w-[140px] h-[72px] rounded-2xl border-2 border-white/15 overflow-hidden bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-l-xl overflow-hidden"
            animate={{ width: \`\${percent}%\` }}
            transition={{ duration: 0.4, ease: "linear" }}
            style={{ background: \`linear-gradient(90deg, \${hex}cc, \${hex})\` }}
          >
            <div
              className="absolute -bottom-1.5 -left-5 -right-5 h-7 rounded-[50%_50%_0_0/30%_30%_0_0] opacity-35 animate-[wave-move_2.2s_ease-in-out_infinite_alternate]"
              style={{ background: hex }}
            />
            <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
          <div className="absolute inset-0 flex pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-l border-white/5 flex-1 first:border-l-0" />
            ))}
          </div>
          <AnimatePresence>
            {charging && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                  <path
                    d="M13 2L3 16h8l-2 10 10-14h-8l2-10z"
                    fill={hex}
                    style={{ filter: \`drop-shadow(0 0 6px \${hex})\` }}
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-[7px] h-[26px] rounded-r bg-white/20 border border-l-0 border-white/10 flex-shrink-0" />
      </div>

      <motion.div className="text-[52px] font-extrabold tracking-tight leading-none" style={{ color: hex }}>
        {Math.round(percent)}<sup className="text-[22px] font-semibold ml-0.5 align-super opacity-70">%</sup>
      </motion.div>

      <div className="text-xs font-semibold tracking-widest uppercase opacity-45 -mt-2">
        {charging ? "⚡ Charging..." : percent >= 100 ? "✓ Full" : "Discharging"}
      </div>
      <div
        className="w-[100px] h-[3px] rounded-full opacity-60 animate-[glow-pulse_2s_ease-in-out_infinite_alternate] filter blur-[2px]"
        style={{ background: hex }}
      />
    </div>
  );
}`;

const CLASSIC_TS_TW = `// ClassicBattery.tsx (TypeScript + Tailwind CSS)
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClassicBatteryProps {
  percent?: number;
  charging?: boolean;
}

function getColor(pct: number): { hex: string; rgb: string } {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function ClassicBattery({ percent = 75, charging = false }: ClassicBatteryProps) {
  const { hex, rgb } = getColor(percent);

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden w-full max-w-[380px] bg-[rgba(10,10,14,0.5)] border border-white/[0.06] rounded-[24px] px-8 py-10 backdrop-blur-xl gap-7 text-white before:pointer-events-none before:absolute before:inset-0 before:transition-all before:duration-700"
      style={{
        "--glow-rgb": rgb,
        "--tw-before-bg": \`radial-gradient(ellipse at 50% 0%, rgba(\${rgb},0.08) 0%, transparent 70%)\`
      } as React.CSSProperties}
    >
      <style>{\`
        @keyframes wave-move {
          0% { transform: translateX(0) scaleY(1); }
          100% { transform: translateX(10px) scaleY(1.15); }
        }
        @keyframes glow-pulse {
          0% { opacity: 0.4; transform: scaleX(0.8); }
          100% { opacity: 0.9; transform: scaleX(1.1); }
        }
      \`}</style>

      <div className="flex items-center gap-1 relative">
        <div className="relative w-[140px] h-[72px] rounded-2xl border-2 border-white/15 overflow-hidden bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-l-xl overflow-hidden"
            animate={{ width: \`\${percent}%\` }}
            transition={{ duration: 0.4, ease: "linear" }}
            style={{ background: \`linear-gradient(90deg, \${hex}cc, \${hex})\` }}
          >
            <div
              className="absolute -bottom-1.5 -left-5 -right-5 h-7 rounded-[50%_50%_0_0/30%_30%_0_0] opacity-35 animate-[wave-move_2.2s_ease-in-out_infinite_alternate]"
              style={{ background: hex }}
            />
            <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
          <div className="absolute inset-0 flex pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-l border-white/5 flex-1 first:border-l-0" />
            ))}
          </div>
          <AnimatePresence>
            {charging && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                  <path
                    d="M13 2L3 16h8l-2 10 10-14h-8l2-10z"
                    fill={hex}
                    style={{ filter: \`drop-shadow(0 0 6px \${hex})\` }}
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-[7px] h-[26px] rounded-r bg-white/20 border border-l-0 border-white/10 flex-shrink-0" />
      </div>

      <motion.div className="text-[52px] font-extrabold tracking-tight leading-none" style={{ color: hex }}>
        {Math.round(percent)}<sup className="text-[22px] font-semibold ml-0.5 align-super opacity-70">%</sup>
      </motion.div>

      <div className="text-xs font-semibold tracking-widest uppercase opacity-45 -mt-2">
        {charging ? "⚡ Charging..." : percent >= 100 ? "✓ Full" : "Discharging"}
      </div>
      <div
        className="w-[100px] h-[3px] rounded-full opacity-60 animate-[glow-pulse_2s_ease-in-out_infinite_alternate] filter blur-[2px]"
        style={{ background: hex }}
      />
    </div>
  );
}`;

const CLASSIC_CSS = `/* ClassicBattery.css */
.battery-card {
  background: rgba(10,10,14,0.5);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 40px 32px;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 380px;
  position: relative;
  overflow: hidden;
}
.battery-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(var(--glow-rgb,74,222,128),0.08) 0%, transparent 70%);
  pointer-events: none;
  transition: all 0.8s ease;
}
.battery-wrap { display: flex; align-items: center; gap: 4px; }
.battery-body {
  position: relative;
  width: 140px; height: 72px;
  border-radius: 14px;
  border: 2px solid rgba(255,255,255,0.15);
  overflow: hidden;
  background: rgba(0,0,0,0.4);
}
.battery-cap {
  width: 7px; height: 26px;
  border-radius: 0 5px 5px 0;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-left: none;
  flex-shrink: 0;
}
.battery-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  border-radius: 12px 4px 4px 12px;
  overflow: hidden;
}
.battery-fill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 40%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%);
}
.battery-wave {
  position: absolute;
  bottom: -6px; left: -20px; right: -20px;
  height: 28px;
  border-radius: 50% 50% 0 0 / 30% 30% 0 0;
  opacity: 0.35;
  animation: wave-move 2.2s ease-in-out infinite alternate;
}
@keyframes wave-move {
  0% { transform: translateX(0) scaleY(1); }
  100% { transform: translateX(10px) scaleY(1.15); }
}
.battery-segments {
  position: absolute; inset: 0;
  display: flex; align-items: stretch;
  pointer-events: none;
}
.battery-seg-line { border-left: 1px solid rgba(255,255,255,0.06); flex: 1; }
.battery-seg-line:first-child { border-left: none; }
.battery-bolt {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.battery-percent {
  font-size: 52px; font-weight: 800;
  letter-spacing: -0.04em; line-height: 1;
  transition: color 0.6s ease;
}
.battery-percent sup {
  font-size: 22px; font-weight: 600;
  margin-left: 2px; vertical-align: super; opacity: 0.7;
}
.battery-label {
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  opacity: 0.45; margin-top: -8px;
}
.battery-glow-bar {
  width: 100px; height: 3px; border-radius: 99px;
  opacity: 0.6;
  animation: glow-pulse 2s ease-in-out infinite alternate;
  filter: blur(2px);
}
@keyframes glow-pulse {
  0% { opacity: 0.4; transform: scaleX(0.8); }
  100% { opacity: 0.9; transform: scaleX(1.1); }
}`;


/* ─────────────────────────────────────────────────────────────
   DOT BATTERY SNIPPETS
───────────────────────────────────────────────────────────── */
const DOT_JS_CSS = `// DotBattery.jsx (JavaScript + Custom CSS)
import React from "react";
import { motion } from "framer-motion";
import "./DotBattery.css";

function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function DotBattery({ percent = 75, charging = false }) {
  const TOTAL = 20;
  const filled = Math.round((percent / 100) * TOTAL);
  const { hex, rgb } = getColor(percent);

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb }}>
      <div className="dot-battery-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isActive = i < filled;
            const isPulsing = charging && i === filled - 1;
            return (
              <motion.div
                key={i}
                className={\`dot-cell\${isActive ? " active" : ""}\${isPulsing ? " pulsing" : ""}\`}
                style={{
                  "--dot-color": hex,
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              />
            );
          })}
        </div>
      </div>

      <div className="battery-percent" style={{ color: hex }}>
        {Math.round(percent)}<sup>%</sup>
      </div>

      <div className="battery-label">
        {charging ? "⚡ Charging..." : "Battery"}
      </div>
      <div className="battery-glow-bar" style={{ background: hex }} />
    </div>
  );
}`;

const DOT_TS_CSS = `// DotBattery.tsx (TypeScript + Custom CSS)
import React from "react";
import { motion } from "framer-motion";
import "./DotBattery.css";

interface DotBatteryProps {
  percent?: number;
  charging?: boolean;
}

function getColor(pct: number): { hex: string; rgb: string } {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function DotBattery({ percent = 75, charging = false }: DotBatteryProps) {
  const TOTAL = 20;
  const filled = Math.round((percent / 100) * TOTAL);
  const { hex, rgb } = getColor(percent);

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb } as React.CSSProperties}>
      <div className="dot-battery-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isActive = i < filled;
            const isPulsing = charging && i === filled - 1;
            return (
              <motion.div
                key={i}
                className={\`dot-cell\${isActive ? " active" : ""}\${isPulsing ? " pulsing" : ""}\`}
                style={{
                  "--dot-color": hex,
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                } as React.CSSProperties}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              />
            );
          })}
        </div>
      </div>

      <div className="battery-percent" style={{ color: hex }}>
        {Math.round(percent)}<sup>%</sup>
      </div>

      <div className="battery-label">
        {charging ? "⚡ Charging..." : "Battery"}
      </div>
      <div className="battery-glow-bar" style={{ background: hex }} />
    </div>
  );
}`;

const DOT_JS_TW = `// DotBattery.jsx (JavaScript + Tailwind CSS)
import React from "react";
import { motion } from "framer-motion";

function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function DotBattery({ percent = 75, charging = false }) {
  const TOTAL = 20;
  const filled = Math.round((percent / 100) * TOTAL);
  const { hex, rgb } = getColor(percent);

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden w-full max-w-[380px] bg-[rgba(10,10,14,0.5)] border border-white/[0.06] rounded-[24px] px-8 py-10 backdrop-blur-xl gap-7 text-white"
      style={{ "--glow-rgb": rgb }}
    >
      <style>{\`
        @keyframes dot-pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }
      \`}</style>
      <div className="pointer-events-none absolute inset-0" style={{ background: \`radial-gradient(ellipse at 50% 0%, rgba(\${rgb},0.08) 0%, transparent 70%)\` }} />
      <div className="flex flex-col items-center gap-5">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isActive = i < filled;
            const isPulsing = charging && i === filled - 1;
            return (
              <motion.div
                key={i}
                className={\`w-[18px] h-[18px] rounded-md transition-all duration-300 \${isActive ? "border-transparent" : "bg-white/[0.06] border border-white/10"} \${isPulsing ? "animate-[dot-pulse_0.8s_ease-in-out_infinite_alternate]" : ""}\`}
                style={isActive ? { background: hex, boxShadow: \`0 0 12px \${hex}, 0 0 4px \${hex}\` } : {}}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              />
            );
          })}
        </div>
      </div>

      <div className="text-[52px] font-extrabold tracking-tight leading-none" style={{ color: hex }}>
        {Math.round(percent)}<sup className="text-[22px] font-semibold ml-0.5 align-super opacity-70">%</sup>
      </div>

      <div className="text-xs font-semibold tracking-widest uppercase opacity-45 -mt-2">
        {charging ? "⚡ Charging..." : "Battery"}
      </div>
      <div className="w-[100px] h-[3px] rounded-full opacity-60 filter blur-[2px]" style={{ background: hex }} />
    </div>
  );
}`;

const DOT_TS_TW = `// DotBattery.tsx (TypeScript + Tailwind CSS)
import React from "react";
import { motion } from "framer-motion";

interface DotBatteryProps {
  percent?: number;
  charging?: boolean;
}

function getColor(pct: number): { hex: string; rgb: string } {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function DotBattery({ percent = 75, charging = false }: DotBatteryProps) {
  const TOTAL = 20;
  const filled = Math.round((percent / 100) * TOTAL);
  const { hex, rgb } = getColor(percent);

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden w-full max-w-[380px] bg-[rgba(10,10,14,0.5)] border border-white/[0.06] rounded-[24px] px-8 py-10 backdrop-blur-xl gap-7 text-white"
      style={{ "--glow-rgb": rgb } as React.CSSProperties}
    >
      <style>{\`
        @keyframes dot-pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }
      \`}</style>
      <div className="pointer-events-none absolute inset-0" style={{ background: \`radial-gradient(ellipse at 50% 0%, rgba(\${rgb},0.08) 0%, transparent 70%)\` }} />
      <div className="flex flex-col items-center gap-5">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isActive = i < filled;
            const isPulsing = charging && i === filled - 1;
            return (
              <motion.div
                key={i}
                className={\`w-[18px] h-[18px] rounded-md transition-all duration-300 \${isActive ? "border-transparent" : "bg-white/[0.06] border border-white/10"} \${isPulsing ? "animate-[dot-pulse_0.8s_ease-in-out_infinite_alternate]" : ""}\`}
                style={isActive ? { background: hex, boxShadow: \`0 0 12px \${hex}, 0 0 4px \${hex}\` } : {}}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              />
            );
          })}
        </div>
      </div>

      <div className="text-[52px] font-extrabold tracking-tight leading-none" style={{ color: hex }}>
        {Math.round(percent)}<sup className="text-[22px] font-semibold ml-0.5 align-super opacity-70">%</sup>
      </div>

      <div className="text-xs font-semibold tracking-widest uppercase opacity-45 -mt-2">
        {charging ? "⚡ Charging..." : "Battery"}
      </div>
      <div className="w-[100px] h-[3px] rounded-full opacity-60 filter blur-[2px]" style={{ background: hex }} />
    </div>
  );
}`;

const DOT_CSS = `/* DotBattery.css */
.battery-card {
  background: rgba(10,10,14,0.5);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 40px 32px;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 380px;
  position: relative;
  overflow: hidden;
}
.battery-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(var(--glow-rgb,74,222,128),0.08) 0%, transparent 70%);
  pointer-events: none;
  transition: all 0.8s ease;
}
.dot-battery-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.dot-cell {
  width: 18px; height: 18px; border-radius: 5px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.dot-cell.active {
  background: var(--dot-color, #4ade80);
  box-shadow: 0 0 12px var(--dot-color, #4ade80);
  border-color: transparent;
}
.dot-cell.pulsing {
  animation: dot-pulse 0.8s ease-in-out infinite alternate;
}
@keyframes dot-pulse {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.05); opacity: 1; }
}
.battery-percent {
  font-size: 52px; font-weight: 800;
  letter-spacing: -0.04em; line-height: 1;
  transition: color 0.6s ease;
}
.battery-percent sup {
  font-size: 22px; font-weight: 600;
  margin-left: 2px; vertical-align: super; opacity: 0.7;
}
.battery-label {
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  opacity: 0.45; margin-top: -8px;
}
.battery-glow-bar {
  width: 100px; height: 3px; border-radius: 99px;
  opacity: 0.6;
  background: var(--dot-color, #4ade80);
  filter: blur(2px);
}`;


/* ─────────────────────────────────────────────────────────────
   CIRCULAR BATTERY SNIPPETS
───────────────────────────────────────────────────────────── */
const CIRCULAR_JS_CSS = `// CircularBattery.jsx (JavaScript + Custom CSS)
import React from "react";
import { motion } from "framer-motion";
import "./CircularBattery.css";

function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function CircularBattery({ percent = 75, charging = false }) {
  const { hex, rgb } = getColor(percent);
  const RADIUS = 58;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb }}>
      <div className="circle-battery-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="70" cy="70" r={RADIUS} fill="none" stroke={hex} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE - dash }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ filter: \`drop-shadow(0 0 8px \${hex})\` }}
          />
        </svg>

        <div className="circle-battery-center">
          <motion.div className="circle-pct" style={{ color: hex }}>
            {Math.round(percent)}%
          </motion.div>
          <div className="circle-status">
            {charging ? "⚡ Charging" : "Battery"}
          </div>
        </div>
      </div>

      <div className="battery-label">
        {percent <= 20 ? "🔴 Low battery" : percent <= 50 ? "🟡 Medium" : percent <= 80 ? "🔵 Good" : "🟢 Excellent"}
      </div>
      <div className="battery-glow-bar" style={{ background: hex }} />
    </div>
  );
}`;

const CIRCULAR_TS_CSS = `// CircularBattery.tsx (TypeScript + Custom CSS)
import React from "react";
import { motion } from "framer-motion";
import "./CircularBattery.css";

interface CircularBatteryProps {
  percent?: number;
  charging?: boolean;
}

function getColor(pct: number): { hex: string; rgb: string } {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function CircularBattery({ percent = 75, charging = false }: CircularBatteryProps) {
  const { hex, rgb } = getColor(percent);
  const RADIUS = 58;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb } as React.CSSProperties}>
      <div className="circle-battery-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="70" cy="70" r={RADIUS} fill="none" stroke={hex} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE - dash }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ filter: \`drop-shadow(0 0 8px \${hex})\` }}
          />
        </svg>

        <div className="circle-battery-center">
          <motion.div className="circle-pct" style={{ color: hex }}>
            {Math.round(percent)}%
          </motion.div>
          <div className="circle-status">
            {charging ? "⚡ Charging" : "Battery"}
          </div>
        </div>
      </div>

      <div className="battery-label">
        {percent <= 20 ? "🔴 Low battery" : percent <= 50 ? "🟡 Medium" : percent <= 80 ? "🔵 Good" : "🟢 Excellent"}
      </div>
      <div className="battery-glow-bar" style={{ background: hex }} />
    </div>
  );
}`;

const CIRCULAR_JS_TW = `// CircularBattery.jsx (JavaScript + Tailwind CSS)
import React from "react";
import { motion } from "framer-motion";

function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function CircularBattery({ percent = 75, charging = false }) {
  const { hex, rgb } = getColor(percent);
  const RADIUS = 58;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = (percent / 100) * CIRCUMFERENCE;

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden w-full max-w-[380px] bg-[rgba(10,10,14,0.5)] border border-white/[0.06] rounded-[24px] px-8 py-10 backdrop-blur-xl gap-7 text-white"
      style={{ "--glow-rgb": rgb }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: \`radial-gradient(ellipse at 50% 0%, rgba(\${rgb},0.08) 0%, transparent 70%)\` }} />
      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" className="absolute inset-0 -rotate-90">
          <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="70" cy="70" r={RADIUS} fill="none" stroke={hex} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE - dash }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ filter: \`drop-shadow(0 0 8px \${hex})\` }}
          />
        </svg>

        <div className="flex flex-col items-center gap-0.5 z-10">
          <div className="text-3xl font-extrabold tracking-tight leading-none" style={{ color: hex }}>
            {Math.round(percent)}%
          </div>
          <div className="text-[10px] font-semibold tracking-wider uppercase opacity-40">
            {charging ? "⚡ Charging" : "Battery"}
          </div>
        </div>
      </div>

      <div className="text-xs font-semibold tracking-widest uppercase opacity-45 -mt-2">
        {percent <= 20 ? "🔴 Low battery" : percent <= 50 ? "🟡 Medium" : percent <= 80 ? "🔵 Good" : "🟢 Excellent"}
      </div>
      <div className="w-[100px] h-[3px] rounded-full opacity-60 filter blur-[2px]" style={{ background: hex }} />
    </div>
  );
}`;

const CIRCULAR_TS_TW = `// CircularBattery.tsx (TypeScript + Tailwind CSS)
import React from "react";
import { motion } from "framer-motion";

interface CircularBatteryProps {
  percent?: number;
  charging?: boolean;
}

function getColor(pct: number): { hex: string; rgb: string } {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

export default function CircularBattery({ percent = 75, charging = false }: CircularBatteryProps) {
  const { hex, rgb } = getColor(percent);
  const RADIUS = 58;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = (percent / 100) * CIRCUMFERENCE;

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden w-full max-w-[380px] bg-[rgba(10,10,14,0.5)] border border-white/[0.06] rounded-[24px] px-8 py-10 backdrop-blur-xl gap-7 text-white"
      style={{ "--glow-rgb": rgb } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: \`radial-gradient(ellipse at 50% 0%, rgba(\${rgb},0.08) 0%, transparent 70%)\` }} />
      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" className="absolute inset-0 -rotate-90">
          <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="70" cy="70" r={RADIUS} fill="none" stroke={hex} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE - dash }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ filter: \`drop-shadow(0 0 8px \${hex})\` }}
          />
        </svg>

        <div className="flex flex-col items-center gap-0.5 z-10">
          <div className="text-3xl font-extrabold tracking-tight leading-none" style={{ color: hex }}>
            {Math.round(percent)}%
          </div>
          <div className="text-[10px] font-semibold tracking-wider uppercase opacity-40">
            {charging ? "⚡ Charging" : "Battery"}
          </div>
        </div>
      </div>

      <div className="text-xs font-semibold tracking-widest uppercase opacity-45 -mt-2">
        {percent <= 20 ? "🔴 Low battery" : percent <= 50 ? "🟡 Medium" : percent <= 80 ? "🔵 Good" : "🟢 Excellent"}
      </div>
      <div className="w-[100px] h-[3px] rounded-full opacity-60 filter blur-[2px]" style={{ background: hex }} />
    </div>
  );
}`;

const CIRCULAR_CSS = `/* CircularBattery.css */
.battery-card {
  background: rgba(10,10,14,0.5);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 40px 32px;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 380px;
  position: relative;
  overflow: hidden;
}
.battery-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(var(--glow-rgb,74,222,128),0.08) 0%, transparent 70%);
  pointer-events: none;
  transition: all 0.8s ease;
}
.circle-battery-wrap {
  position: relative; width: 140px; height: 140px;
  display: flex; align-items: center; justify-content: center;
}
.circle-battery-wrap svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.circle-battery-center {
  display: flex; flex-direction: column;
  align-items: center; gap: 2px; z-index: 1;
}
.circle-pct {
  font-size: 32px; font-weight: 800;
  letter-spacing: -0.04em; line-height: 1;
}
.circle-status {
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.4;
}
.battery-label {
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  opacity: 0.45; margin-top: -8px;
}
.battery-glow-bar {
  width: 100px; height: 3px; border-radius: 99px;
  opacity: 0.6;
  filter: blur(2px);
}`;

/* ─────────────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────────────── */
export const batteryLoaderCode = {
  classic: {
    code: {
      js: { css: CLASSIC_JS_CSS, tailwind: CLASSIC_JS_TW },
      ts: { css: CLASSIC_TS_CSS, tailwind: CLASSIC_TS_TW }
    },
    css: CLASSIC_CSS
  },
  dot: {
    code: {
      js: { css: DOT_JS_CSS, tailwind: DOT_JS_TW },
      ts: { css: DOT_TS_CSS, tailwind: DOT_TS_TW }
    },
    css: DOT_CSS
  },
  circular: {
    code: {
      js: { css: CIRCULAR_JS_CSS, tailwind: CIRCULAR_JS_TW },
      ts: { css: CIRCULAR_TS_CSS, tailwind: CIRCULAR_TS_TW }
    },
    css: CIRCULAR_CSS
  }
};
