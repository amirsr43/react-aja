import React from "react";
import { Check } from "lucide-react";

export default function StepProgress({
  steps = [
    { label: "Account Setup" },
    { label: "Profile Details" },
    { label: "Confirmation" }
  ],
  currentStep = 2, // 1-based index (1, 2, 3...)
  onStepChange = null,
  interactive = true,
  colorScheme = "blue" // "blue" | "indigo" | "emerald" | "violet" | "rose"
}) {
  // Define themes
  const themes = {
    blue: {
      lineActive: "bg-blue-600",
      circleActive: "bg-blue-600 border-blue-600 text-white",
      circleCompleted: "bg-white border-blue-600 text-blue-600",
      circleUpcoming: "bg-white border-slate-200 text-slate-400 hover:border-slate-300",
      textActive: "text-blue-600",
      textCompleted: "text-slate-700",
      iconColor: "stroke-blue-600"
    },
    indigo: {
      lineActive: "bg-indigo-600",
      circleActive: "bg-indigo-600 border-indigo-600 text-white",
      circleCompleted: "bg-white border-indigo-600 text-indigo-600",
      circleUpcoming: "bg-white border-slate-200 text-slate-400 hover:border-slate-300",
      textActive: "text-indigo-600",
      textCompleted: "text-slate-700",
      iconColor: "stroke-indigo-600"
    },
    emerald: {
      lineActive: "bg-emerald-600",
      circleActive: "bg-emerald-600 border-emerald-600 text-white",
      circleCompleted: "bg-white border-emerald-600 text-emerald-600",
      circleUpcoming: "bg-white border-slate-200 text-slate-400 hover:border-slate-300",
      textActive: "text-emerald-600",
      textCompleted: "text-slate-700",
      iconColor: "stroke-emerald-600"
    },
    violet: {
      lineActive: "bg-violet-600",
      circleActive: "bg-violet-600 border-violet-600 text-white",
      circleCompleted: "bg-white border-violet-600 text-violet-600",
      circleUpcoming: "bg-white border-slate-200 text-slate-400 hover:border-slate-300",
      textActive: "text-violet-600",
      textCompleted: "text-slate-700",
      iconColor: "stroke-violet-600"
    },
    rose: {
      lineActive: "bg-rose-600",
      circleActive: "bg-rose-600 border-rose-600 text-white",
      circleCompleted: "bg-white border-rose-600 text-rose-600",
      circleUpcoming: "bg-white border-slate-200 text-slate-400 hover:border-slate-300",
      textActive: "text-rose-600",
      textCompleted: "text-slate-700",
      iconColor: "stroke-rose-600"
    }
  };

  const currentTheme = themes[colorScheme] || themes.blue;

  const handleStepClick = (index) => {
    if (interactive && onStepChange) {
      onStepChange(index + 1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Progress container */}
      <div className="relative flex items-center justify-between">
        
        {/* Background track line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-slate-100 rounded-full z-0" />

        {/* Active progress fill line */}
        <div 
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-[3px] transition-all duration-500 ease-in-out z-0 rounded-full ${currentTheme.lineActive}`}
          style={{ 
            width: `${((Math.max(1, Math.min(currentStep, steps.length)) - 1) / (steps.length - 1)) * 100}%` 
          }}
        />

        {/* Steps */}
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isUpcoming = stepNum > currentStep;

          let circleClass = "";
          if (isCompleted) circleClass = currentTheme.circleCompleted;
          else if (isActive) circleClass = currentTheme.circleActive;
          else circleClass = currentTheme.circleUpcoming;

          return (
            <div 
              key={idx}
              className={`relative z-10 flex flex-col items-center ${interactive ? "cursor-pointer" : ""}`}
              onClick={() => handleStepClick(idx)}
            >
              {/* Step Circle */}
              <div 
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-[2.5px] flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 shadow-sm ${circleClass} ${
                  isActive ? "scale-110 shadow-md ring-4 ring-slate-100/50" : ""
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>

              {/* Labels below steps */}
              <div className="absolute top-12 md:top-14 w-20 md:w-36 text-center flex flex-col items-center">
                <span 
                  className={`font-semibold text-[10px] md:text-xs tracking-tight leading-tight transition-colors duration-300 ${
                    isActive 
                      ? currentTheme.textActive 
                      : isCompleted 
                        ? "text-slate-800" 
                        : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
