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

// 2. Concentric Gyroscope Spinner
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

// 2. Concentric Gyroscope Spinner
export function AuraSpinner() {
  return (
    <div className="flex flex-col items-center justify-center relative p-5">
      <style>{\`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes core-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .spin-cw { animation: spin-clockwise 1.6s infinite cubic-bezier(0.5, 0.2, 0.3, 0.8); }
        .spin-ccw { animation: spin-counter 1.2s infinite cubic-bezier(0.5, 0.2, 0.3, 0.8); }
        .pulse-core { animation: core-pulse 1.5s infinite ease-in-out; }
      \`}</style>
      <div className="relative w-[80px] h-[80px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400 border-b-violet-400/15 spin-cw" />
        <div className="absolute w-[50px] h-[50px] rounded-full border-2 border-transparent border-l-violet-400/50 border-r-violet-400/10 spin-ccw" />
        <div className="absolute w-3.5 h-3.5 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.6)] pulse-core" />
      </div>
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

// 2. Concentric Gyroscope Spinner
export function AuraSpinner(): React.JSX.Element {
  return (
    <div className="gyro-container">
      <div className="gyro-loader">
        <div className="gyro-ring ring-1" />
        <div className="gyro-ring ring-2" />
        <div className="gyro-core" />
      </div>
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

// 2. Concentric Gyroscope Spinner
export function AuraSpinner(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center relative p-5">
      <style>{\`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes core-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .spin-cw { animation: spin-clockwise 1.6s infinite cubic-bezier(0.5, 0.2, 0.3, 0.8); }
        .spin-ccw { animation: spin-counter 1.2s infinite cubic-bezier(0.5, 0.2, 0.3, 0.8); }
        .pulse-core { animation: core-pulse 1.5s infinite ease-in-out; }
      \`}</style>
      <div className="relative w-[80px] h-[80px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400 border-b-violet-400/15 spin-cw" />
        <div className="absolute w-[50px] h-[50px] rounded-full border-2 border-transparent border-l-violet-400/50 border-r-violet-400/10 spin-ccw" />
        <div className="absolute w-3.5 h-3.5 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.6)] pulse-core" />
      </div>
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
}`
};
