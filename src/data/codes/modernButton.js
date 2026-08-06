// src/data/codes/modernButton.js

// 1. Primary Button Code
export const primaryButtonCode = {
  code: {
    js: {
      css: `// PrimaryButton.jsx (JavaScript + Custom CSS)
import React from "react";

export default function PrimaryButton({
  colorScheme = "blue", // "blue" | "red" | "purple" | "slate"
  disabled = false,
  children,
  onClick,
  ...props
}) {
  const colorClass = "color-" + colorScheme;
  return (
    <button
      className={"modern-btn-primary " + colorClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}`,
      tailwind: `// PrimaryButton.jsx (JavaScript + Tailwind CSS)
import React from "react";

export default function PrimaryButton({
  colorScheme = "blue", // "blue" | "red" | "purple" | "slate"
  disabled = false,
  children,
  onClick,
  ...props
}) {
  const colors = {
    blue: {
      bg: "from-blue-500 to-blue-700",
      bgHoverBtn: "hover:from-blue-400 hover:to-blue-600",
      shadow: "shadow-[0_4px_14px_rgba(59,130,246,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(59,130,246,0.55)]",
      ring: "focus-visible:ring-blue-500"
    },
    red: {
      bg: "from-red-400 to-red-500",
      bgHoverBtn: "hover:from-red-300 hover:to-red-400",
      shadow: "shadow-[0_4px_14px_rgba(239,68,68,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(239,68,68,0.55)]",
      ring: "focus-visible:ring-red-500"
    },
    purple: {
      bg: "from-purple-400 to-purple-600",
      bgHoverBtn: "hover:from-purple-300 hover:to-purple-500",
      shadow: "shadow-[0_4px_14px_rgba(147,51,234,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(147,51,234,0.55)]",
      ring: "focus-visible:ring-purple-500"
    },
    slate: {
      bg: "from-slate-500 to-slate-700",
      bgHoverBtn: "hover:from-slate-400 hover:to-slate-600",
      shadow: "shadow-[0_4px_14px_rgba(71,85,105,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(71,85,105,0.55)]",
      ring: "focus-visible:ring-slate-500"
    }
  };

  const currentTheme = colors[colorScheme] || colors.blue;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"inline-flex items-center justify-center bg-gradient-to-br " + currentTheme.bg + " " + currentTheme.bgHoverBtn + " text-white font-semibold py-3 px-7 rounded-full transition-all duration-250 ease-out " + currentTheme.shadow + " " + currentTheme.shadowHover + " hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + currentTheme.ring + " disabled:bg-white/8 disabled:text-white/25 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"}
      {...props}
    >
      {children}
    </button>
  );
}`
    },
    ts: {
      css: `// PrimaryButton.tsx (TypeScript + Custom CSS)
import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "blue" | "red" | "purple" | "slate";
}

export default function PrimaryButton({
  colorScheme = "blue",
  disabled = false,
  children,
  onClick,
  ...props
}: PrimaryButtonProps) {
  const colorClass = "color-" + colorScheme;
  return (
    <button
      className={"modern-btn-primary " + colorClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}`,
      tailwind: `// PrimaryButton.tsx (TypeScript + Tailwind CSS)
import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "blue" | "red" | "purple" | "slate";
}

export default function PrimaryButton({
  colorScheme = "blue",
  disabled = false,
  children,
  onClick,
  ...props
}: PrimaryButtonProps) {
  const colors = {
    blue: {
      bg: "from-blue-500 to-blue-700",
      bgHoverBtn: "hover:from-blue-400 hover:to-blue-600",
      shadow: "shadow-[0_4px_14px_rgba(59,130,246,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(59,130,246,0.55)]",
      ring: "focus-visible:ring-blue-500"
    },
    red: {
      bg: "from-red-400 to-red-500",
      bgHoverBtn: "hover:from-red-300 hover:to-red-400",
      shadow: "shadow-[0_4px_14px_rgba(239,68,68,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(239,68,68,0.55)]",
      ring: "focus-visible:ring-red-500"
    },
    purple: {
      bg: "from-purple-400 to-purple-600",
      bgHoverBtn: "hover:from-purple-300 hover:to-purple-500",
      shadow: "shadow-[0_4px_14px_rgba(147,51,234,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(147,51,234,0.55)]",
      ring: "focus-visible:ring-purple-500"
    },
    slate: {
      bg: "from-slate-500 to-slate-700",
      bgHoverBtn: "hover:from-slate-400 hover:to-slate-600",
      shadow: "shadow-[0_4px_14px_rgba(71,85,105,0.35)]",
      shadowHover: "hover:shadow-[0_8px_24px_rgba(71,85,105,0.55)]",
      ring: "focus-visible:ring-slate-500"
    }
  };

  const currentTheme = colors[colorScheme] || colors.blue;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"inline-flex items-center justify-center bg-gradient-to-br " + currentTheme.bg + " " + currentTheme.bgHoverBtn + " text-white font-semibold py-3 px-7 rounded-full transition-all duration-250 ease-out " + currentTheme.shadow + " " + currentTheme.shadowHover + " hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + currentTheme.ring + " disabled:bg-white/8 disabled:text-white/25 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"}
      {...props}
    >
      {children}
    </button>
  );
}`
    }
  },
  css: `/* Primary Button Stylesheet */
.modern-btn-primary {
  --color-light: #3b82f6;
  --color-dark: #1d4ed8;
  --color-hover-light: #60a5fa;
  --color-hover-dark: #2563eb;
  --color-rgb: 59, 130, 246;
  --ring-glow: rgba(59, 130, 246, 0.5);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-light), var(--color-dark));
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 14px rgba(var(--color-rgb), 0.35);
  outline: none;
}

.modern-btn-primary:hover,
.modern-btn-primary.hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, var(--color-hover-light), var(--color-hover-dark));
  box-shadow: 0 8px 24px rgba(var(--color-rgb), 0.55);
}

.modern-btn-primary:active,
.modern-btn-primary.active {
  transform: translateY(0);
  filter: brightness(0.9);
  box-shadow: 0 2px 8px rgba(var(--color-rgb), 0.4);
}

.modern-btn-primary:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 0 0 6px var(--ring-glow);
}

.modern-btn-primary:disabled {
  background: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.25) !important;
  box-shadow: none !important;
  cursor: not-allowed;
  transform: none !important;
}

/* Theme presets */
.color-red {
  --color-light: #ff7e79;
  --color-dark: #ff5b5b;
  --color-hover-light: #ffa8a5;
  --color-hover-dark: #ff6f6f;
  --color-rgb: 255, 91, 91;
  --ring-glow: rgba(255, 91, 91, 0.5);
}

.color-purple {
  --color-light: #c084fc;
  --color-dark: #9333ea;
  --color-hover-light: #d8b4fe;
  --color-hover-dark: #a855f7;
  --color-rgb: 147, 51, 234;
  --ring-glow: rgba(147, 51, 234, 0.5);
}

.color-slate {
  --color-light: #64748b;
  --color-dark: #334155;
  --color-hover-light: #94a3b8;
  --color-hover-dark: #475569;
  --color-rgb: 71, 85, 105;
  --ring-glow: rgba(148, 163, 184, 0.4);
}`
};

// 2. Outline Button Code
export const outlineButtonCode = {
  code: {
    js: {
      css: `// OutlineButton.jsx (JavaScript + Custom CSS)
import React from "react";

export default function OutlineButton({
  colorScheme = "blue", // "blue" | "red" | "purple" | "slate"
  disabled = false,
  children,
  onClick,
  ...props
}) {
  const colorClass = "color-" + colorScheme;
  return (
    <button
      className={"modern-btn-outline " + colorClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}`,
      tailwind: `// OutlineButton.jsx (JavaScript + Tailwind CSS)
import React from "react";

export default function OutlineButton({
  colorScheme = "blue", // "blue" | "red" | "purple" | "slate"
  disabled = false,
  children,
  onClick,
  ...props
}) {
  const colors = {
    blue: {
      text: "text-blue-500",
      ring: "focus-visible:ring-blue-500"
    },
    red: {
      text: "text-red-400",
      ring: "focus-visible:ring-red-500"
    },
    purple: {
      text: "text-purple-400",
      ring: "focus-visible:ring-purple-500"
    },
    slate: {
      text: "text-slate-400",
      ring: "focus-visible:ring-slate-500"
    }
  };

  const currentTheme = colors[colorScheme] || colors.blue;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"inline-flex items-center justify-center bg-transparent " + currentTheme.text + " font-semibold py-[11px] px-7 rounded-full border border-white/8 hover:border-current hover:text-white hover:bg-white/3 transition-all duration-250 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + currentTheme.ring + " disabled:border-white/5 disabled:text-white/15 disabled:bg-transparent disabled:cursor-not-allowed"}
      {...props}
    >
      {children}
    </button>
  );
}`
    },
    ts: {
      css: `// OutlineButton.tsx (TypeScript + Custom CSS)
import React, { ButtonHTMLAttributes } from "react";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "blue" | "red" | "purple" | "slate";
}

export default function OutlineButton({
  colorScheme = "blue",
  disabled = false,
  children,
  onClick,
  ...props
}: OutlineButtonProps) {
  const colorClass = "color-" + colorScheme;
  return (
    <button
      className={"modern-btn-outline " + colorClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}`,
      tailwind: `// OutlineButton.tsx (TypeScript + Tailwind CSS)
import React, { ButtonHTMLAttributes } from "react";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "blue" | "red" | "purple" | "slate";
}

export default function OutlineButton({
  colorScheme = "blue",
  disabled = false,
  children,
  onClick,
  ...props
}: OutlineButtonProps) {
  const colors = {
    blue: {
      text: "text-blue-500",
      ring: "focus-visible:ring-blue-500"
    },
    red: {
      text: "text-red-400",
      ring: "focus-visible:ring-red-500"
    },
    purple: {
      text: "text-purple-400",
      ring: "focus-visible:ring-purple-500"
    },
    slate: {
      text: "text-slate-400",
      ring: "focus-visible:ring-slate-500"
    }
  };

  const currentTheme = colors[colorScheme] || colors.blue;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"inline-flex items-center justify-center bg-transparent " + currentTheme.text + " font-semibold py-[11px] px-7 rounded-full border border-white/8 hover:border-current hover:text-white hover:bg-white/3 transition-all duration-250 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + currentTheme.ring + " disabled:border-white/5 disabled:text-white/15 disabled:bg-transparent disabled:cursor-not-allowed"}
      {...props}
    >
      {children}
    </button>
  );
}`
    }
  },
  css: `/* Outline Button Stylesheet */
.modern-btn-outline {
  --color-light: #3b82f6;
  --color-dark: #1d4ed8;
  --color-rgb: 59, 130, 246;
  --border-color: rgba(255, 255, 255, 0.08);
  --ring-glow: rgba(59, 130, 246, 0.5);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--color-light);
  font-size: 14px;
  font-weight: 600;
  padding: 11px 28px;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  outline: none;
}

.modern-btn-outline:hover,
.modern-btn-outline.hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--color-light);
  color: #ffffff;
  box-shadow: 0 0 16px rgba(var(--color-rgb), 0.15);
}

.modern-btn-outline:active,
.modern-btn-outline.active {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--color-dark);
}

.modern-btn-outline:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1), 0 0 0 5px var(--ring-glow);
  border-color: var(--color-light);
}

.modern-btn-outline:disabled {
  border-color: rgba(255, 255, 255, 0.05) !important;
  color: rgba(255, 255, 255, 0.15) !important;
  background: transparent !important;
  box-shadow: none !important;
  cursor: not-allowed;
  transform: none !important;
}

/* Theme presets */
.color-red {
  --color-light: #ff7e79;
  --color-dark: #ff5b5b;
  --color-rgb: 255, 91, 91;
  --ring-glow: rgba(255, 91, 91, 0.5);
}

.color-purple {
  --color-light: #c084fc;
  --color-dark: #9333ea;
  --color-rgb: 147, 51, 234;
  --ring-glow: rgba(147, 51, 234, 0.5);
}

.color-slate {
  --color-light: #64748b;
  --color-dark: #334155;
  --color-rgb: 71, 85, 105;
  --ring-glow: rgba(148, 163, 184, 0.4);
}`
};

// 3. Action Button Code
export const actionButtonCode = {
  code: {
    js: {
      css: `// ActionButton.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ActionButton({
  activeText = "Close",
  disabled = false,
  children = "Button",
  onClick,
  ...props
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    setClicked((prev) => !prev);
    if (onClick) onClick(e);
  };

  const stateClasses = [
    disabled ? "disabled" : "",
    clicked ? "clicked active" : "",
  ].filter(Boolean).join(" ");

  const buttonLabel = clicked && activeText ? activeText : children;

  return (
    <button
      className={"modern-btn-capsule " + stateClasses}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <ArrowLeft size={14} className="btn-arrow btn-arrow-left" />
      <span className="btn-pill">{buttonLabel}</span>
      <ArrowRight size={14} className="btn-arrow btn-arrow-right" />
    </button>
  );
}`,
      tailwind: `// ActionButton.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ActionButton({
  activeText = "Close",
  disabled = false,
  children = "Button",
  onClick,
  ...props
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    setClicked((prev) => !prev);
    if (onClick) onClick(e);
  };

  const colors = {
    blue: {
      bg: "from-blue-500 to-blue-700",
      bgHover: "group-hover:from-blue-400 group-hover:to-blue-600",
      shadow: "shadow-[0_4px_14px_rgba(59,130,246,0.35)]",
      shadowPillHover: "group-hover:shadow-[0_6px_18px_rgba(59,130,246,0.45)]",
      arrow: "text-blue-500",
      borderHover: "hover:border-blue-500/30",
      ring: "focus-visible:ring-blue-500"
    },
    red: {
      bg: "from-red-400 to-red-500",
      bgHover: "group-hover:from-red-300 group-hover:to-red-400",
      shadow: "shadow-[0_4px_14px_rgba(239,68,68,0.35)]",
      shadowPillHover: "group-hover:shadow-[0_6px_18px_rgba(239,68,68,0.45)]",
      arrow: "text-red-500",
      borderHover: "hover:border-red-500/30",
      ring: "focus-visible:ring-red-500"
    }
  };

  const currentTheme = clicked ? colors.red : colors.blue;
  const showPillOnLeft = !clicked;
  const buttonLabel = clicked && activeText ? activeText : children;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={"relative inline-flex items-center bg-white/2 border border-white/8 rounded-full p-1 cursor-pointer transition-all duration-400 ease-out overflow-hidden select-none " + (showPillOnLeft ? "pr-12 pl-1" : "pl-12 pr-1") + " " + currentTheme.borderHover + " hover:shadow-[0_4px_20px_rgba(var(--color-rgb),0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + currentTheme.ring + " disabled:border-white/5 disabled:bg-white/1 disabled:cursor-not-allowed group"}
      {...props}
    >
      <ArrowLeft size={14} className={"absolute left-[18px] top-1/2 -translate-y-1/2 " + currentTheme.arrow + " transition-all duration-350 " + (showPillOnLeft ? "opacity-0 -translate-x-[10px]" : "opacity-1 translate-x-0")} />
      
      <span className={"inline-flex items-center justify-center bg-gradient-to-br " + currentTheme.bg + " " + currentTheme.bgHover + " " + currentTheme.shadow + " " + (showPillOnLeft ? "group-hover:pr-14 group-hover:translate-x-1" : "group-hover:pl-14 group-hover:-translate-x-1") + " " + currentTheme.shadowPillHover + " group-active:translate-x-0.5 group-active:brightness-95 group-disabled:bg-white/8 group-disabled:text-white/25 group-disabled:shadow-none group-disabled:translate-x-0 text-white py-2.5 px-6 rounded-full font-semibold text-sm transition-all duration-400 ease-out z-[1]"}>
        {buttonLabel}
      </span>
      
      <ArrowRight size={14} className={"absolute right-[18px] top-1/2 -translate-y-1/2 " + currentTheme.arrow + " transition-all duration-350 " + (showPillOnLeft ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[10px]")} />
    </button>
  );
}`
    },
    ts: {
      css: `// ActionButton.tsx (TypeScript + Custom CSS)
import React, { useState, ButtonHTMLAttributes } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  activeText?: string;
}

export default function ActionButton({
  activeText = "Close",
  disabled = false,
  children = "Button",
  onClick,
  ...props
}: ActionButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setClicked((prev) => !prev);
    if (onClick) onClick(e);
  };

  const stateClasses = [
    disabled ? "disabled" : "",
    clicked ? "clicked active" : "",
  ].filter(Boolean).join(" ");

  const buttonLabel = clicked && activeText ? activeText : children;

  return (
    <button
      className={"modern-btn-capsule " + stateClasses}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <ArrowLeft size={14} className="btn-arrow btn-arrow-left" />
      <span className="btn-pill">{buttonLabel}</span>
      <ArrowRight size={14} className="btn-arrow btn-arrow-right" />
    </button>
  );
}`,
      tailwind: `// ActionButton.tsx (TypeScript + Tailwind CSS)
import React, { useState, ButtonHTMLAttributes } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  activeText?: string;
}

export default function ActionButton({
  activeText = "Close",
  disabled = false,
  children = "Button",
  onClick,
  ...props
}: ActionButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setClicked((prev) => !prev);
    if (onClick) onClick(e);
  };

  const colors = {
    blue: {
      bg: "from-blue-500 to-blue-700",
      bgHover: "group-hover:from-blue-400 group-hover:to-blue-600",
      shadow: "shadow-[0_4px_14px_rgba(59,130,246,0.35)]",
      shadowPillHover: "group-hover:shadow-[0_6px_18px_rgba(59,130,246,0.45)]",
      arrow: "text-blue-500",
      borderHover: "hover:border-blue-500/30",
      ring: "focus-visible:ring-blue-500"
    },
    red: {
      bg: "from-red-400 to-red-500",
      bgHover: "group-hover:from-red-300 group-hover:to-red-400",
      shadow: "shadow-[0_4px_14px_rgba(239,68,68,0.35)]",
      shadowPillHover: "group-hover:shadow-[0_6px_18px_rgba(239,68,68,0.45)]",
      arrow: "text-red-500",
      borderHover: "hover:border-red-500/30",
      ring: "focus-visible:ring-red-500"
    }
  };

  const currentTheme = clicked ? colors.red : colors.blue;
  const showPillOnLeft = !clicked;
  const buttonLabel = clicked && activeText ? activeText : children;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={"relative inline-flex items-center bg-white/2 border border-white/8 rounded-full p-1 cursor-pointer transition-all duration-400 ease-out overflow-hidden select-none " + (showPillOnLeft ? "pr-12 pl-1" : "pl-12 pr-1") + " " + currentTheme.borderHover + " hover:shadow-[0_4px_20px_rgba(var(--color-rgb),0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + currentTheme.ring + " disabled:border-white/5 disabled:bg-white/1 disabled:cursor-not-allowed group"}
      {...props}
    >
      <ArrowLeft size={14} className={"absolute left-[18px] top-1/2 -translate-y-1/2 " + currentTheme.arrow + " transition-all duration-350 " + (showPillOnLeft ? "opacity-0 -translate-x-[10px]" : "opacity-1 translate-x-0")} />
      
      <span className={"inline-flex items-center justify-center bg-gradient-to-br " + currentTheme.bg + " " + currentTheme.bgHover + " " + currentTheme.shadow + " " + (showPillOnLeft ? "group-hover:pr-14 group-hover:translate-x-1" : "group-hover:pl-14 group-hover:-translate-x-1") + " " + currentTheme.shadowPillHover + " group-active:translate-x-0.5 group-active:brightness-95 group-disabled:bg-white/8 group-disabled:text-white/25 group-disabled:shadow-none group-disabled:translate-x-0 text-white py-2.5 px-6 rounded-full font-semibold text-sm transition-all duration-400 ease-out z-[1]"}>
        {buttonLabel}
      </span>
      
      <ArrowRight size={14} className={"absolute right-[18px] top-1/2 -translate-y-1/2 " + currentTheme.arrow + " transition-all duration-350 " + (showPillOnLeft ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[10px]")} />
    </button>
  );
}`
    }
  },
  css: `/* Capsule Action Button Stylesheet */
.modern-btn-capsule {
  --color-light: #3b82f6;
  --color-dark: #1d4ed8;
  --color-hover-light: #60a5fa;
  --color-hover-dark: #2563eb;
  --color-rgb: 59, 130, 246;
  --arrow-color: #1d4ed8;
  --border-color: rgba(255, 255, 255, 0.08);
  --capsule-bg: rgba(255, 255, 255, 0.02);
  --ring-glow: rgba(59, 130, 246, 0.5);

  position: relative;
  display: inline-flex;
  align-items: center;
  background: var(--capsule-bg);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 4px;
  padding-left: 4px;
  padding-right: 48px;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s, padding 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  user-select: none;
}

.modern-btn-capsule.clicked,
.modern-btn-capsule.active {
  padding-left: 48px;
  padding-right: 4px;
  /* Override CSS variables for dynamic color switch to red */
  --color-light: #ff7e79;
  --color-dark: #ff5b5b;
  --color-hover-light: #ffa8a5;
  --color-hover-dark: #ff6f6f;
  --color-rgb: 255, 91, 91;
  --arrow-color: #ff5b5b;
  --ring-glow: rgba(255, 91, 91, 0.5);
}

.modern-btn-capsule .btn-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-light), var(--color-dark));
  color: #ffffff;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 12px rgba(var(--color-rgb), 0.35);
  z-index: 1;
}

.modern-btn-capsule .btn-arrow {
  color: var(--arrow-color);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
  pointer-events: none;
  flex-shrink: 0;
  position: absolute;
  top: 50%;
}

.modern-btn-capsule .btn-arrow-left {
  left: 18px;
  opacity: 0;
  transform: translate(-10px, -50%);
}
.modern-btn-capsule.clicked .btn-arrow-left,
.modern-btn-capsule.active .btn-arrow-left {
  opacity: 1;
  transform: translate(0, -50%);
}

.modern-btn-capsule .btn-arrow-right {
  right: 18px;
  opacity: 1;
  transform: translate(0, -50%);
}
.modern-btn-capsule.clicked .btn-arrow-right,
.modern-btn-capsule.active .btn-arrow-right {
  opacity: 0;
  transform: translate(10px, -50%);
}

/* Hover states */
.modern-btn-capsule:hover,
.modern-btn-capsule.hover {
  border-color: rgba(var(--color-rgb), 0.3);
  box-shadow: 0 4px 20px rgba(var(--color-rgb), 0.12);
}

/* Hover: Pill expands to the right (when pill is on left side) */
.modern-btn-capsule:not(.clicked):not(.active):hover .btn-pill {
  padding-right: 56px;
  transform: translateX(4px);
  background: linear-gradient(135deg, var(--color-hover-light), var(--color-hover-dark));
  box-shadow: 0 6px 18px rgba(var(--color-rgb), 0.45);
}
.modern-btn-capsule:not(.clicked):not(.active):hover .btn-arrow-right {
  color: #ffffff;
  transform: translate(8px, -50%);
}

/* Hover: Pill expands to the left (when pill is on right side) */
.modern-btn-capsule.clicked:hover .btn-pill,
.modern-btn-capsule.active:hover .btn-pill {
  padding-left: 56px;
  transform: translateX(-4px);
  background: linear-gradient(135deg, var(--color-hover-light), var(--color-hover-dark));
  box-shadow: 0 6px 18px rgba(var(--color-rgb), 0.45);
}
.modern-btn-capsule.clicked:hover .btn-arrow-left,
.modern-btn-capsule.active:hover .btn-arrow-left {
  color: #ffffff;
  transform: translate(-8px, -50%);
}

.modern-btn-capsule:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1), 0 0 0 6px var(--ring-glow);
  border-color: rgba(var(--color-rgb), 0.5);
}

.modern-btn-capsule:disabled {
  border-color: rgba(255, 255, 255, 0.05) !important;
  background: rgba(255, 255, 255, 0.01) !important;
  box-shadow: none !important;
  cursor: not-allowed;
}

.modern-btn-capsule:disabled .btn-pill {
  background: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.25) !important;
  box-shadow: none !important;
  transform: none !important;
}

.modern-btn-capsule:disabled .btn-arrow {
  color: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-50%) !important;
}`
};
