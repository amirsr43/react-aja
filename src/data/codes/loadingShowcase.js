// src/data/codes/loadingShowcase.js

export const loadingShowcaseCode = {
  code: {
    js: {
      css: `// LoadingShowcase.jsx (JavaScript + Custom CSS)
import React from "react";
import "./LoadingShowcase.css"; // Include the CSS stylesheet below

// 1. Skeleton Loader Card
export function SkeletonLoader() {
  return (
    <div className="loading-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar shimmer-bg" />
        <div className="skeleton-text-group">
          <div className="skeleton-title shimmer-bg" />
          <div className="skeleton-subtitle shimmer-bg" />
        </div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-line shimmer-bg" />
        <div className="skeleton-line shimmer-bg" />
        <div className="skeleton-line short shimmer-bg" />
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-btn shimmer-bg" />
      </div>
    </div>
  );
}

// 2. Cosmic Aura Spinner
export function AuraSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner-ambient-glow" />
      <div className="spinner-track" />
      <span className="spinner-label">Loading Dashboard...</span>
    </div>
  );
}`,
      tailwind: `// LoadingShowcase.jsx (JavaScript + Tailwind CSS)
import React from "react";

// 1. Skeleton Loader Card
export function SkeletonLoader() {
  return (
    <div className="relative overflow-hidden w-full max-w-sm bg-zinc-900/45 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-5 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
      <style>{\`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-anim {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 37%, rgba(255,255,255,0.03) 63\u0025);
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
        }
      \`}</style>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full shimmer-anim" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-3/5 h-5 rounded-md shimmer-anim" />
          <div className="w-2/5 h-3 rounded-md shimmer-anim" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-full h-3 rounded-md shimmer-anim" />
        <div className="w-full h-3 rounded-md shimmer-anim" />
        <div className="w-4/5 h-3 rounded-md shimmer-anim" />
      </div>
      <div className="flex justify-start">
        <div className="w-[100px] h-9 rounded-lg shimmer-anim" />
      </div>
    </div>
  );
}

// 2. Cosmic Aura Spinner
export function AuraSpinner() {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <style>{\`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .spin-anim {
          animation: spin 1s infinite linear;
        }
        .pulse-anim {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      \`}</style>
      <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-md -z-10 pulse-anim" />
      <div className="w-20 h-20 rounded-full border-4 border-white/5 border-t-blue-500 border-r-purple-500 spin-anim shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
      <span className="mt-4 text-xs font-semibold text-white/70 tracking-widest uppercase">Loading Dashboard...</span>
    </div>
  );
}`
    },
    ts: {
      css: `// LoadingShowcase.tsx (TypeScript + Custom CSS)
import React from "react";
import "./LoadingShowcase.css"; // Include the CSS stylesheet below

// 1. Skeleton Loader Card
export function SkeletonLoader(): React.JSX.Element {
  return (
    <div className="loading-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar shimmer-bg" />
        <div className="skeleton-text-group">
          <div className="skeleton-title shimmer-bg" />
          <div className="skeleton-subtitle shimmer-bg" />
        </div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-line shimmer-bg" />
        <div className="skeleton-line shimmer-bg" />
        <div className="skeleton-line short shimmer-bg" />
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-btn shimmer-bg" />
      </div>
    </div>
  );
}

// 2. Cosmic Aura Spinner
export function AuraSpinner(): React.JSX.Element {
  return (
    <div className="spinner-container">
      <div className="spinner-ambient-glow" />
      <div className="spinner-track" />
      <span className="spinner-label">Loading Dashboard...</span>
    </div>
  );
}`,
      tailwind: `// LoadingShowcase.tsx (TypeScript + Tailwind CSS)
import React from "react";

// 1. Skeleton Loader Card
export function SkeletonLoader(): React.JSX.Element {
  return (
    <div className="relative overflow-hidden w-full max-w-sm bg-zinc-900/45 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-5 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
      <style>{\`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-anim {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 37%, rgba(255,255,255,0.03) 63\u0025);
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
        }
      \`}</style>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full shimmer-anim" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-3/5 h-5 rounded-md shimmer-anim" />
          <div className="w-2/5 h-3 rounded-md shimmer-anim" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-full h-3 rounded-md shimmer-anim" />
        <div className="w-full h-3 rounded-md shimmer-anim" />
        <div className="w-4/5 h-3 rounded-md shimmer-anim" />
      </div>
      <div className="flex justify-start">
        <div className="w-[100px] h-9 rounded-lg shimmer-anim" />
      </div>
    </div>
  );
}

// 2. Cosmic Aura Spinner
export function AuraSpinner(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <style>{\`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .spin-anim {
          animation: spin 1s infinite linear;
        }
        .pulse-anim {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      \`}</style>
      <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-md -z-10 pulse-anim" />
      <div className="w-20 h-20 rounded-full border-4 border-white/5 border-t-blue-500 border-r-purple-500 spin-anim shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
      <span className="mt-4 text-xs font-semibold text-white/70 tracking-widest uppercase">Loading Dashboard...</span>
    </div>
  );
}`
    }
  },
  css: `/* Glass Card Layout */
.loading-card {
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Shimmer Animation Effect */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
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

/* Spinner Custom Track Styles */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.spinner-track {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.03);
  border-top-color: #3b82f6;
  border-right-color: #8b5cf6;
  animation: spin 1s infinite linear;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner-ambient-glow {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%);
  filter: blur(8px);
  z-index: -1;
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.15); opacity: 1; }
}

.spinner-label {
  margin-top: 16px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}`
};
