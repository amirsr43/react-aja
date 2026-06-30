// src/components/ui/LoadingShowcase.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, RefreshCw } from "lucide-react";

const LOADING_STYLES = `
/* ── LOADING CORE STYLES ── */
.loading-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  font-family: 'Outfit', 'Inter', sans-serif;
  color: #ffffff;
}

.loading-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  max-width: 480px;
}

@media(min-width: 640px) {
  .loading-grid {
    grid-template-columns: 1fr;
  }
}

/* Glass Card */
.loading-card {
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

/* Shimmer Keyframes */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer-bg {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 37%,
    rgba(255, 255, 255, 0.03) 63%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite linear;
}

/* Skeleton items */
.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.skeleton-title {
  width: 60%;
  height: 20px;
  border-radius: 6px;
}

.skeleton-subtitle {
  width: 40%;
  height: 12px;
  border-radius: 4px;
  margin-top: 6px;
}

.skeleton-line {
  width: 100%;
  height: 12px;
  border-radius: 4px;
}

.skeleton-line.short {
  width: 80%;
}

.skeleton-btn {
  width: 100px;
  height: 36px;
  border-radius: 8px;
}

/* Concentric Gyroscope Spinner */
/* Concentric Gyroscope Spinner (Minimalist Violet Theme) */
.gyro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.gyro-loader {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gyro-core {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #a78bfa;
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
  animation: core-pulse 1.5s infinite ease-in-out;
  position: absolute;
}

@keyframes core-pulse {
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.gyro-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}

.gyro-ring.ring-1 {
  width: 70px;
  height: 70px;
  border-top-color: #a78bfa;
  border-bottom-color: rgba(167, 139, 250, 0.15);
  animation: spin-clockwise 1.6s infinite cubic-bezier(0.5, 0.2, 0.3, 0.8);
}

.gyro-ring.ring-2 {
  width: 50px;
  height: 50px;
  border-left-color: rgba(167, 139, 250, 0.5);
  border-right-color: rgba(167, 139, 250, 0.1);
  animation: spin-counter 1.2s infinite cubic-bezier(0.5, 0.2, 0.3, 0.8);
}

@keyframes spin-clockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-counter {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
`;

export function SkeletonLoader() {
  return (
    <div className="loading-card">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div className="shimmer-bg skeleton-avatar" />
        <div style={{ flex: 1 }}>
          <div className="shimmer-bg skeleton-title" />
          <div className="shimmer-bg skeleton-subtitle" />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
        <div className="shimmer-bg skeleton-line" />
        <div className="shimmer-bg skeleton-line" />
        <div className="shimmer-bg skeleton-line short" />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
        <div className="shimmer-bg skeleton-btn" />
      </div>
    </div>
  );
}

export function AuraSpinner() {
  return (
    <div className="gyro-container">
      <div className="gyro-loader">
        <div className="gyro-ring ring-1" />
        <div className="gyro-ring ring-2" />
        <div className="gyro-core" />
      </div>
    </div>
  );
}

// ── Showcase Demo ──
export default function LoadingShowcase() {
  const [activeVariant, setActiveVariant] = useState("skeleton"); // "skeleton" | "spinner"

  return (
    <div className="loading-showcase">
      <style>{LOADING_STYLES}</style>

      {/* Tabs */}
      <div 
        style={{
          display: "flex",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "4px",
          gap: "4px"
        }}
      >
        <button
          onClick={() => setActiveVariant("skeleton")}
          style={{
            background: activeVariant === "skeleton" ? "rgba(255, 255, 255, 0.06)" : "transparent",
            color: activeVariant === "skeleton" ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "12.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Skeleton Shimmer
        </button>
        <button
          onClick={() => setActiveVariant("spinner")}
          style={{
            background: activeVariant === "spinner" ? "rgba(255, 255, 255, 0.06)" : "transparent",
            color: activeVariant === "spinner" ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "12.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Glowing Spinner
        </button>
      </div>

      {/* Main Display container */}
      <div className="loading-grid">
        {activeVariant === "skeleton" ? (
          <SkeletonLoader />
        ) : (
          <div 
            className="loading-card" 
            style={{ 
              alignItems: "center", 
              justifyContent: "center", 
              minHeight: "220px", 
              padding: "40px" 
            }}
          >
            <AuraSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
