// src/data/codes/stepProgress.js

export const stepProgressCode = {
  code: {
    js: {
      css: `// StepProgress.jsx (JavaScript + Custom CSS)
import React from "react";
import { Check } from "lucide-react";

export default function StepProgress({
  steps = [
    { label: "Account Setup" },
    { label: "Profile Details" },
    { label: "Confirmation" }
  ],
  currentStep = 2,
  interactive = true,
  onStepChange = null,
  colorScheme = "blue"
}) {
  const handleStepClick = (index) => {
    if (interactive && onStepChange) {
      onStepChange(index + 1);
    }
  };

  return (
    <div className="sp-wrapper">
      <div className="sp-container">
        {/* Track Line */}
        <div className="sp-track" />
        
        {/* Progress Line */}
        <div 
          className={\`sp-progress-line sp-theme-\${colorScheme}\`}
          style={{ 
            width: \`\${((Math.max(1, Math.min(currentStep, steps.length)) - 1) / (steps.length - 1)) * 100}%\` 
          }}
        />

        {/* Steps */}
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          
          let circleClass = "sp-circle-upcoming";
          if (isCompleted) circleClass = "sp-circle-completed";
          else if (isActive) circleClass = "sp-circle-active";

          return (
            <div 
              key={idx}
              className={\`sp-step \${interactive ? "sp-interactive" : ""}\`}
              onClick={() => handleStepClick(idx)}
            >
              <div className={\`sp-circle \${circleClass} sp-theme-\${colorScheme} \${isActive ? "sp-active-scale" : ""}\`}>
                {isCompleted ? (
                  <Check className="sp-check-icon" strokeWidth={2.5} />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
              <div className="sp-labels">
                <span className={\`sp-label \${isActive ? \`sp-text-active sp-theme-\${colorScheme}\` : isCompleted ? "sp-text-completed" : "sp-text-upcoming"}\`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
      tailwind: `// StepProgress.jsx (JavaScript + Tailwind CSS)
import React from "react";
import { Check } from "lucide-react";

export default function StepProgress({
  steps = [
    { label: "Account Setup" },
    { label: "Profile Details" },
    { label: "Confirmation" }
  ],
  currentStep = 2,
  interactive = true,
  onStepChange = null,
  colorScheme = "blue"
}) {
  const themes = {
    blue: {
      lineActive: "bg-blue-600",
      circleActive: "bg-blue-600 border-blue-600 text-white ring-slate-100/50",
      circleCompleted: "bg-white border-blue-600 text-blue-600",
      textActive: "text-blue-600"
    },
    indigo: {
      lineActive: "bg-indigo-600",
      circleActive: "bg-indigo-600 border-indigo-600 text-white ring-slate-100/50",
      circleCompleted: "bg-white border-indigo-600 text-indigo-600",
      textActive: "text-indigo-600"
    },
    emerald: {
      lineActive: "bg-emerald-600",
      circleActive: "bg-emerald-600 border-emerald-600 text-white ring-slate-100/50",
      circleCompleted: "bg-white border-emerald-600 text-emerald-600",
      textActive: "text-emerald-600"
    }
  };

  const currentTheme = themes[colorScheme] || themes.blue;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="relative flex items-center justify-between">
        {/* Track Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-slate-100 rounded-full z-0" />

        {/* Progress Line */}
        <div 
          className={\`absolute left-0 top-1/2 -translate-y-1/2 h-[3px] transition-all duration-500 ease-in-out z-0 rounded-full \${currentTheme.lineActive}\`}
          style={{ width: \`\${((Math.max(1, Math.min(currentStep, steps.length)) - 1) / (steps.length - 1)) * 100}%\` }}
        />

        {/* Steps */}
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div 
              key={idx}
              className={\`relative z-10 flex flex-col items-center \${interactive ? "cursor-pointer" : ""}\`}
              onClick={() => interactive && onStepChange && onStepChange(stepNum)}
            >
              <div 
                className={\`w-10 h-10 md:w-12 md:h-12 rounded-full border-[2.5px] flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 shadow-sm \${
                  isCompleted 
                    ? currentTheme.circleCompleted 
                    : isActive 
                      ? \`\${currentTheme.circleActive} scale-110 shadow-md ring-4\`
                      : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                }\`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>

              <div className="absolute top-12 md:top-14 w-20 md:w-36 text-center flex flex-col items-center">
                <span className={\`font-semibold text-[10px] md:text-xs tracking-tight leading-tight transition-colors duration-300 \${
                  isActive ? currentTheme.textActive : isCompleted ? "text-slate-700" : "text-slate-400"
                }\`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// StepProgress.tsx (TypeScript + Custom CSS)
import React from "react";
import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepProgressProps {
  steps?: Step[];
  currentStep?: number;
  interactive?: boolean;
  onStepChange?: (step: number) => void;
  colorScheme?: "blue" | "indigo" | "emerald" | "violet" | "rose";
}

export default function StepProgress({
  steps = [
    { label: "Account Setup" },
    { label: "Profile Details" },
    { label: "Confirmation" }
  ],
  currentStep = 2,
  interactive = true,
  onStepChange,
  colorScheme = "blue"
}: StepProgressProps) {
  const handleStepClick = (index: number) => {
    if (interactive && onStepChange) {
      onStepChange(index + 1);
    }
  };

  return (
    <div className="sp-wrapper">
      <div className="sp-container">
        <div className="sp-track" />
        <div 
          className={\`sp-progress-line sp-theme-\${colorScheme}\`}
          style={{ width: \`\${((Math.max(1, Math.min(currentStep, steps.length)) - 1) / (steps.length - 1)) * 100}%\` }}
        />
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          
          let circleClass = "sp-circle-upcoming";
          if (isCompleted) circleClass = "sp-circle-completed";
          else if (isActive) circleClass = "sp-circle-active";

          return (
            <div key={idx} className={\`sp-step \${interactive ? "sp-interactive" : ""}\`} onClick={() => handleStepClick(idx)}>
              <div className={\`sp-circle \${circleClass} sp-theme-\${colorScheme} \${isActive ? "sp-active-scale" : ""}\`}>
                {isCompleted ? <Check className="sp-check-icon" strokeWidth={2.5} /> : <span>{stepNum}</span>}
              </div>
              <div className="sp-labels">
                <span className={\`sp-label \${isActive ? \`sp-text-active sp-theme-\${colorScheme}\` : isCompleted ? "sp-text-completed" : "sp-text-upcoming"}\`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
      tailwind: `// StepProgress.tsx (TypeScript + Tailwind CSS)
import React from "react";
import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepProgressProps {
  steps?: Step[];
  currentStep?: number;
  interactive?: boolean;
  onStepChange?: (step: number) => void;
  colorScheme?: "blue" | "indigo" | "emerald";
}

export default function StepProgress({
  steps = [
    { label: "Account Setup" },
    { label: "Profile Details" },
    { label: "Confirmation" }
  ],
  currentStep = 2,
  interactive = true,
  onStepChange,
  colorScheme = "blue"
}: StepProgressProps) {
  const themes = {
    blue: {
      lineActive: "bg-blue-600",
      circleActive: "bg-blue-600 border-blue-600 text-white ring-slate-100/50",
      circleCompleted: "bg-white border-blue-600 text-blue-600",
      textActive: "text-blue-600"
    },
    indigo: {
      lineActive: "bg-indigo-600",
      circleActive: "bg-indigo-600 border-indigo-600 text-white ring-slate-100/50",
      circleCompleted: "bg-white border-indigo-600 text-indigo-600",
      textActive: "text-indigo-600"
    },
    emerald: {
      lineActive: "bg-emerald-600",
      circleActive: "bg-emerald-600 border-emerald-600 text-white ring-slate-100/50",
      circleCompleted: "bg-white border-emerald-600 text-emerald-600",
      textActive: "text-emerald-600"
    }
  };

  const currentTheme = themes[colorScheme] || themes.blue;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-slate-100 rounded-full z-0" />
        <div 
          className={\`absolute left-0 top-1/2 -translate-y-1/2 h-[3px] transition-all duration-500 ease-in-out z-0 rounded-full \${currentTheme.lineActive}\`}
          style={{ width: \`\${((Math.max(1, Math.min(currentStep, steps.length)) - 1) / (steps.length - 1)) * 100}%\` }}
        />
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={idx} className={\`relative z-10 flex flex-col items-center \${interactive ? "cursor-pointer" : ""}\`} onClick={() => interactive && onStepChange && onStepChange(stepNum)}>
              <div className={\`w-10 h-10 md:w-12 md:h-12 rounded-full border-[2.5px] flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 shadow-sm \${
                isCompleted ? currentTheme.circleCompleted : isActive ? \`\${currentTheme.circleActive} scale-110 shadow-md ring-4\` : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
              }\`}>
                {isCompleted ? <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> : <span>{stepNum}</span>}
              </div>
              <div className="absolute top-12 md:top-14 w-20 md:w-36 text-center flex flex-col items-center">
                <span className={\`font-semibold text-[10px] md:text-xs tracking-tight leading-tight transition-colors duration-300 \${isActive ? currentTheme.textActive : isCompleted ? "text-slate-700" : "text-slate-400"}\`}>{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
    }
  },
  css: `.sp-wrapper {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 32px 16px;
}
.sp-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sp-track {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 3px;
  background-color: #f1f5f9;
  border-radius: 9999px;
  z-index: 0;
}
.sp-progress-line {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 9999px;
  z-index: 0;
}
.sp-step {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sp-interactive {
  cursor: pointer;
}
.sp-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
@media (min-width: 768px) {
  .sp-circle {
    width: 48px;
    height: 48px;
    font-size: 16px;
  }
}
.sp-circle-upcoming {
  background-color: #ffffff;
  border-color: #e2e8f0;
  color: #94a3b8;
}
.sp-circle-upcoming:hover {
  border-color: #cbd5e1;
}
.sp-circle-completed {
  background-color: #ffffff;
}
.sp-circle-active {
  color: #ffffff;
}
.sp-active-scale {
  transform: scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 4px rgba(241, 245, 249, 0.5);
}
.sp-check-icon {
  width: 20px;
  height: 20px;
}
@media (min-width: 768px) {
  .sp-check-icon {
    width: 24px;
    height: 24px;
  }
}
.sp-labels {
  position: absolute;
  top: 48px;
  width: 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 768px) {
  .sp-labels {
    top: 56px;
    width: 144px;
  }
}
.sp-label {
  font-weight: 600;
  font-size: 10px;
  line-height: 1.25;
  letter-spacing: -0.025em;
  transition: color 0.3s ease;
}
@media (min-width: 768px) {
  .sp-label {
    font-size: 12px;
  }
}

/* Color Themes */
/* Blue */
.sp-theme-blue.sp-progress-line { background-color: #2563eb; }
.sp-theme-blue.sp-circle-completed { border-color: #2563eb; color: #2563eb; }
.sp-theme-blue.sp-circle-active { background-color: #2563eb; border-color: #2563eb; }
.sp-text-active.sp-theme-blue { color: #2563eb; }

/* Indigo */
.sp-theme-indigo.sp-progress-line { background-color: #4f46e5; }
.sp-theme-indigo.sp-circle-completed { border-color: #4f46e5; color: #4f46e5; }
.sp-theme-indigo.sp-circle-active { background-color: #4f46e5; border-color: #4f46e5; }
.sp-text-active.sp-theme-indigo { color: #4f46e5; }

/* Emerald */
.sp-theme-emerald.sp-progress-line { background-color: #059669; }
.sp-theme-emerald.sp-circle-completed { border-color: #059669; color: #059669; }
.sp-theme-emerald.sp-circle-active { background-color: #059669; border-color: #059669; }
.sp-text-active.sp-theme-emerald { color: #059669; }

.sp-text-completed { color: #334155; }
.sp-text-upcoming { color: #94a3b8; }`
};
