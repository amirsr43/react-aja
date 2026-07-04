// src/components/ui/components/BatteryLoader.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

/* ─────────────────────────── STYLES ─────────────────────────── */
const BATTERY_STYLES = `
/* ── Battery Loader Core ── */
.battery-showcase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  color: #ffffff;
  width: 100%;
}

/* Variant tab */
.battery-tabs {
  display: flex;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 5px;
  gap: 4px;
}
.battery-tab-btn {
  background: transparent;
  color: rgba(255,255,255,0.45);
  border: none;
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
}
.battery-tab-btn.active {
  background: rgba(255,255,255,0.07);
  color: #ffffff;
}

/* Glass card wrap */
.battery-card {
  background: rgba(10,10,14,0.5);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 40px 32px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 380px;
  position: relative;
  overflow: hidden;
}

/* Soft ambient behind card */
.battery-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(var(--glow-rgb, 74,222,128), 0.08) 0%, transparent 70%);
  pointer-events: none;
  transition: all 0.8s ease;
}

/* ── The Physical Battery ── */
.battery-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
}

.battery-body {
  position: relative;
  width: 140px;
  height: 72px;
  border-radius: 14px;
  border: 2px solid rgba(255,255,255,0.15);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    inset 0 1px 0 rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.4);
}

/* Cap at right */
.battery-cap {
  width: 7px;
  height: 26px;
  border-radius: 0 5px 5px 0;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-left: none;
  flex-shrink: 0;
}

/* Fill bar */
.battery-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 12px 4px 4px 12px;
  transition: width 0.3s linear, background 0.6s ease;
  overflow: hidden;
}

/* Shine overlay inside fill */
.battery-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%);
  border-radius: inherit;
}

/* Wave inside battery */
.battery-wave {
  position: absolute;
  bottom: -6px;
  left: -20px;
  right: -20px;
  height: 28px;
  border-radius: 50% 50% 0 0 / 30% 30% 0 0;
  opacity: 0.35;
  animation: wave-move 2.2s ease-in-out infinite alternate;
}

@keyframes wave-move {
  0% { transform: translateX(0) scaleY(1); }
  100% { transform: translateX(10px) scaleY(1.15); }
}

/* Segment lines inside battery */
.battery-segments {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  pointer-events: none;
}
.battery-seg-line {
  border-left: 1px solid rgba(255,255,255,0.06);
  flex: 1;
}
.battery-seg-line:first-child {
  border-left: none;
}

/* Bolt icon */
.battery-bolt {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* ── Percentage counter ── */
.battery-percent {
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  transition: color 0.6s ease;
}
.battery-percent sup {
  font-size: 22px;
  font-weight: 600;
  margin-left: 2px;
  vertical-align: super;
  opacity: 0.7;
}

.battery-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.45;
  margin-top: -8px;
}

/* ── Glow bar below battery ── */
.battery-glow-bar {
  width: 100px;
  height: 3px;
  border-radius: 99px;
  opacity: 0.6;
  animation: glow-pulse 2s ease-in-out infinite alternate;
  transition: background 0.6s ease;
  filter: blur(2px);
}

@keyframes glow-pulse {
  0% { opacity: 0.4; transform: scaleX(0.8); }
  100% { opacity: 0.9; transform: scaleX(1.1); }
}

/* ── Dot pulse variant ── */
.dot-battery-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.dot-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dot-cell {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.dot-cell.active {
  background: var(--dot-color, #4ade80);
  box-shadow: 0 0 12px var(--dot-color, #4ade80), 0 0 4px var(--dot-color, #4ade80);
  border-color: transparent;
}

.dot-cell.pulsing {
  animation: dot-pulse 0.8s ease-in-out infinite alternate;
}

@keyframes dot-pulse {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.05); opacity: 1; }
}

/* ── Circular battery ── */
.circle-battery-wrap {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-battery-wrap svg {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}

.circle-battery-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  z-index: 1;
}
.circle-pct {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}
.circle-status {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.4;
}
`;

/* ─────────────────────────── HELPERS ─────────────────────────── */
function getColor(pct) {
  if (pct <= 20) return { hex: "#ef4444", rgb: "239,68,68" };
  if (pct <= 50) return { hex: "#f59e0b", rgb: "245,158,11" };
  if (pct <= 80) return { hex: "#3b82f6", rgb: "59,130,246" };
  return { hex: "#4ade80", rgb: "74,222,128" };
}

/* ─────────────────────────── VARIANT 1: Classic Bar Battery ─────────────────────────── */
export function ClassicBattery({ percent, charging }) {
  const { hex, rgb } = getColor(percent);

  const boltSvg = (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path
        d="M13 2L3 16h8l-2 10 10-14h-8l2-10z"
        fill={hex}
        style={{ filter: `drop-shadow(0 0 6px ${hex})` }}
      />
    </svg>
  );

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb }}>
      <style>{BATTERY_STYLES}</style>
      <div className="battery-wrap">
        <div className="battery-body">
          {/* Fill */}
          <motion.div
            className="battery-fill"
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.4, ease: "linear" }}
            style={{
              background: `linear-gradient(90deg, ${hex}cc, ${hex})`,
            }}
          >
            {/* Wave */}
            <div
              className="battery-wave"
              style={{ background: hex }}
            />
          </motion.div>
          {/* Segments */}
          <div className="battery-segments">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="battery-seg-line" />
            ))}
          </div>
          {/* Bolt */}
          <AnimatePresence>
            {charging && (
              <motion.div
                className="battery-bolt"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {boltSvg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Cap */}
        <div className="battery-cap" />
      </div>

      {/* Percent */}
      <motion.div
        className="battery-percent"
        style={{ color: hex }}
        key={Math.floor(percent)}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        {Math.round(percent)}<sup>%</sup>
      </motion.div>

      <div className="battery-label">
        {charging ? "⚡ Charging..." : percent >= 100 ? "✓ Full" : "Discharging"}
      </div>

      {/* Glow bar */}
      <div
        className="battery-glow-bar"
        style={{ background: hex }}
      />
    </div>
  );
}

/* ─────────────────────────── VARIANT 2: Dot Grid Battery ─────────────────────────── */
export function DotBattery({ percent, charging }) {
  const TOTAL = 20;
  const filled = Math.round((percent / 100) * TOTAL);
  const { hex, rgb } = getColor(percent);

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb }}>
      <style>{BATTERY_STYLES}</style>
      <div className="dot-battery-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isActive = i < filled;
            const isPulsing = charging && i === filled - 1;
            return (
              <motion.div
                key={i}
                className={`dot-cell${isActive ? " active" : ""}${isPulsing ? " pulsing" : ""}`}
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

      <motion.div
        className="battery-percent"
        style={{ color: hex }}
      >
        {Math.round(percent)}<sup>%</sup>
      </motion.div>

      <div className="battery-label">
        {charging ? "⚡ Charging..." : "Battery"}
      </div>

      <div
        className="battery-glow-bar"
        style={{ background: hex }}
      />
    </div>
  );
}

/* ─────────────────────────── VARIANT 3: Circular Ring Battery ─────────────────────────── */
export function CircularBattery({ percent, charging }) {
  const { hex, rgb } = getColor(percent);
  const RADIUS = 58;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="battery-card" style={{ "--glow-rgb": rgb }}>
      <style>{BATTERY_STYLES}</style>
      <div className="circle-battery-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Track */}
          <circle
            cx="70" cy="70" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Fill arc */}
          <motion.circle
            cx="70" cy="70" r={RADIUS}
            fill="none"
            stroke={hex}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE - dash }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${hex})`,
            }}
          />
        </svg>

        <div className="circle-battery-center">
          <motion.div
            className="circle-pct"
            style={{ color: hex }}
          >
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

      <div
        className="battery-glow-bar"
        style={{ background: hex }}
      />
    </div>
  );
}

/* ─────────────────────────── MAIN SHOWCASE ─────────────────────────── */
const VARIANTS = ["Classic", "Dot Grid", "Circular"];

export default function BatteryLoader({ onVariantChange, hideTabs = false }) {
  const [activeVariant, setActiveVariant] = useState("Classic");
  const [percent, setPercent] = useState(15);
  const [charging, setCharging] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = charging, -1 = draining
  const animRef = useRef(null);

  useEffect(() => {
    if (onVariantChange) {
      onVariantChange(activeVariant);
    }
  }, []);

  const handleVariantChange = (v) => {
    setActiveVariant(v);
    if (onVariantChange) {
      onVariantChange(v);
    }
  };

  useEffect(() => {
    let p = percent;
    let dir = direction;

    const tick = () => {
      p = p + dir * 0.4;
      if (p >= 100) { p = 100; dir = -1; setCharging(false); }
      if (p <= 5) { p = 5; dir = 1; setCharging(true); }
      setDirection(dir);
      setPercent(p);
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []); // eslint-disable-line

  return (
    <div className="battery-showcase">
      <style>{BATTERY_STYLES}</style>

      {/* Variant tabs */}
      {!hideTabs && (
        <div className="battery-tabs">
          {VARIANTS.map((v) => (
            <button
              key={v}
              className={`battery-tab-btn${activeVariant === v ? " active" : ""}`}
              onClick={() => handleVariantChange(v)}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {/* Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {activeVariant === "Classic" && (
            <ClassicBattery percent={percent} charging={charging} />
          )}
          {activeVariant === "Dot Grid" && (
            <DotBattery percent={percent} charging={charging} />
          )}
          {activeVariant === "Circular" && (
            <CircularBattery percent={percent} charging={charging} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
