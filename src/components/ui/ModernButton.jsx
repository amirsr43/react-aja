// src/components/ui/ModernButton.jsx
import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const BUTTON_STYLES = `
/* ── CORE BUTTON STYLES ── */
/* CSS Variables & Themes */
.modern-btn-primary,
.modern-btn-outline,
.modern-btn-capsule {
  /* Color Scheme Blue (Default) */
  --color-light: #3b82f6;
  --color-dark: #1d4ed8;
  --color-hover-light: #60a5fa;
  --color-hover-dark: #2563eb;
  --color-rgb: 59, 130, 246;
  --arrow-color: #1d4ed8;
  --border-color: rgba(255, 255, 255, 0.08);
  --capsule-bg: rgba(255, 255, 255, 0.02);
  --text-color: #ffffff;
  --ring-glow: rgba(59, 130, 246, 0.5);
}

.color-red {
  --color-light: #ff7e79;
  --color-dark: #ff5b5b;
  --color-hover-light: #ffa8a5;
  --color-hover-dark: #ff6f6f;
  --color-rgb: 255, 91, 91;
  --arrow-color: #ff5b5b;
  --ring-glow: rgba(255, 91, 91, 0.5);
}

.color-purple {
  --color-light: #c084fc;
  --color-dark: #9333ea;
  --color-hover-light: #d8b4fe;
  --color-hover-dark: #a855f7;
  --color-rgb: 147, 51, 234;
  --arrow-color: #9333ea;
  --ring-glow: rgba(147, 51, 234, 0.5);
}

.color-slate {
  --color-light: #64748b;
  --color-dark: #334155;
  --color-hover-light: #94a3b8;
  --color-hover-dark: #475569;
  --color-rgb: 71, 85, 105;
  --arrow-color: #64748b;
  --ring-glow: rgba(148, 163, 184, 0.4);
}

/* ── 1. Primary Button ── */
.modern-btn-primary {
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

.modern-btn-primary.focused,
.modern-btn-primary:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 0 0 6px var(--ring-glow);
}

.modern-btn-primary.disabled,
.modern-btn-primary:disabled {
  background: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.25) !important;
  box-shadow: none !important;
  cursor: not-allowed;
  transform: none !important;
}

/* ── 2. Outline Button ── */
.modern-btn-outline {
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

.modern-btn-outline.focused,
.modern-btn-outline:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1), 0 0 0 5px var(--ring-glow);
  border-color: var(--color-light);
}

.modern-btn-outline.disabled,
.modern-btn-outline:disabled {
  border-color: rgba(255, 255, 255, 0.05) !important;
  color: rgba(255, 255, 255, 0.15) !important;
  background: transparent !important;
  box-shadow: none !important;
  cursor: not-allowed;
  transform: none !important;
}

/* ── 3. Capsule Action Button ── */
.modern-btn-capsule {
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
  text-decoration: none;
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
.modern-btn-capsule:not(.clicked):not(.active):hover .btn-pill,
.modern-btn-capsule:not(.clicked):not(.active).hover .btn-pill {
  padding-right: 56px;
  transform: translateX(4px);
  background: linear-gradient(135deg, var(--color-hover-light), var(--color-hover-dark));
  box-shadow: 0 6px 18px rgba(var(--color-rgb), 0.45);
}
.modern-btn-capsule:not(.clicked):not(.active):hover .btn-arrow-right,
.modern-btn-capsule:not(.clicked):not(.active).hover .btn-arrow-right {
  color: #ffffff;
  transform: translate(8px, -50%);
}

/* Hover: Pill expands to the left (when pill is on right side) */
.modern-btn-capsule.clicked:hover .btn-pill,
.modern-btn-capsule.clicked.hover .btn-pill,
.modern-btn-capsule.active:hover .btn-pill,
.modern-btn-capsule.active.hover .btn-pill {
  padding-left: 56px;
  transform: translateX(-4px);
  background: linear-gradient(135deg, var(--color-hover-light), var(--color-hover-dark));
  box-shadow: 0 6px 18px rgba(var(--color-rgb), 0.45);
}
.modern-btn-capsule.clicked:hover .btn-arrow-left,
.modern-btn-capsule.clicked.hover .btn-arrow-left,
.modern-btn-capsule.active:hover .btn-arrow-left,
.modern-btn-capsule.active.hover .btn-arrow-left {
  color: #ffffff;
  transform: translate(-8px, -50%);
}

/* Active states */
.modern-btn-capsule:active,
.modern-btn-capsule.active {
  filter: brightness(0.95);
}

/* Active: slight push in the direction of layout */
.modern-btn-capsule:not(.clicked):not(.active):active .btn-pill {
  transform: translateX(2px);
}
.modern-btn-capsule.clicked:active .btn-pill,
.modern-btn-capsule.active:active .btn-pill {
  transform: translateX(-2px);
}

/* Focus states */
.modern-btn-capsule.focused,
.modern-btn-capsule:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1), 0 0 0 6px var(--ring-glow);
  border-color: rgba(var(--color-rgb), 0.5);
}

/* Disabled states */
.modern-btn-capsule.disabled,
.modern-btn-capsule:disabled {
  border-color: rgba(255, 255, 255, 0.05) !important;
  background: rgba(255, 255, 255, 0.01) !important;
  box-shadow: none !important;
  cursor: not-allowed;
  transform: none !important;
}

.modern-btn-capsule.disabled .btn-pill,
.modern-btn-capsule:disabled .btn-pill {
  background: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.25) !important;
  box-shadow: none !important;
  transform: none !important;
}

.modern-btn-capsule.disabled .btn-arrow,
.modern-btn-capsule:disabled .btn-arrow {
  color: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-50%) !important;
}
`;

export function ModernButton({
  variant = "primary", // "primary" | "outline" | "action"
  colorScheme = "blue", // "blue" | "red" | "purple" | "slate"
  disabled = false,
  focused = false,
  active = false,
  activeText = "Close",
  children,
  onClick,
  style = {},
  className = "",
  ...props
}) {
  const [internalClicked, setInternalClicked] = useState(false);
  const isClicked = active || internalClicked;

  const handleClick = (e) => {
    if (disabled) return;
    setInternalClicked((prev) => !prev);
    if (onClick) onClick(e);
  };

  const colorClass = `color-${colorScheme}`;
  const stateClasses = [
    disabled ? "disabled" : "",
    focused ? "focused" : "",
    isClicked ? "clicked active" : "",
  ].filter(Boolean).join(" ");

  const combinedStyles = {
    ...style,
  };

  let element = null;

  if (variant === "primary") {
    element = (
      <button
        className={`modern-btn-primary ${colorClass} ${stateClasses} ${className}`}
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
        style={combinedStyles}
        {...props}
      >
        {children}
      </button>
    );
  } else if (variant === "outline") {
    element = (
      <button
        className={`modern-btn-outline ${colorClass} ${stateClasses} ${className}`}
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
        style={combinedStyles}
        {...props}
      >
        {children}
      </button>
    );
  } else if (variant === "action" || variant === "action-left" || variant === "action-right") {
    const buttonLabel = isClicked && activeText ? activeText : children;
    element = (
      <button
        className={`modern-btn-capsule ${stateClasses} ${className}`}
        disabled={disabled}
        onClick={handleClick}
        style={combinedStyles}
        {...props}
      >
        <ArrowLeft size={14} className="btn-arrow btn-arrow-left" />
        <span className="btn-pill">{buttonLabel}</span>
        <ArrowRight size={14} className="btn-arrow btn-arrow-right" />
      </button>
    );
  }

  if (!element) return null;

  return (
    <>
      <style>{BUTTON_STYLES}</style>
      {element}
    </>
  );
}

// ── Showcase Playground & Grid ──
export default function ModernButtonShowcase() {
  const [activeTab, setActiveTab] = useState("playground"); // "playground" | "spec-sheet"
  const [color, setColor] = useState("blue");
  const [buttonText, setButtonText] = useState("Button");
  const [closeText, setCloseText] = useState("Close");

  return (
    <div className="button-showcase-container">
      <style>{`
        .button-showcase-container {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ── Toggle Tabs ── */
        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }

        .showcase-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
        }

        .showcase-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3px;
          border-radius: 10px;
          gap: 2px;
        }

        .showcase-tab-btn {
          background: transparent;
          border: none;
          color: #8e8e93;
          font-size: 12.5px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .showcase-tab-btn:hover {
          color: #ffffff;
        }

        .showcase-tab-btn.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* ── Controls Section ── */
        .playground-controls {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 20px;
        }

        @media (min-width: 768px) {
          .playground-controls {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-label {
          font-size: 11px;
          font-weight: 700;
          color: #8e8e93;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .control-inputs {
          display: flex;
          gap: 8px;
        }

        .control-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .control-btn.active {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          font-weight: 600;
        }

        .control-input-text {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
          transition: all 0.2s;
        }

        .control-input-text:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.25);
        }

        /* ── Sandbox Preview Panel ── */
        .sandbox-panel {
          background: rgba(5, 5, 5, 0.3);
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          min-height: 220px;
        }

        .sandbox-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 24px;
        }

        /* ── Specs Sheet Grid ── */
        .specs-grid-wrapper {
          overflow-x: auto;
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 24px;
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }

        .specs-table th {
          text-align: left;
          padding: 12px 16px;
          font-size: 11px;
          font-weight: 700;
          color: #8e8e93;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .specs-table td {
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          vertical-align: middle;
        }

        .specs-table tr:last-child td {
          border-bottom: none;
        }

        .row-title-column {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }
      `}</style>

      {/* Header controls for switching view */}
      <div className="showcase-header">
        <span className="showcase-title">Inspired Button Set</span>
        <div className="showcase-tabs">
          <button
            onClick={() => setActiveTab("playground")}
            className={`showcase-tab-btn ${activeTab === "playground" ? "active" : ""}`}
          >
            Playground Sandbox
          </button>
          <button
            onClick={() => setActiveTab("spec-sheet")}
            className={`showcase-tab-btn ${activeTab === "spec-sheet" ? "active" : ""}`}
          >
            All States Grid
          </button>
        </div>
      </div>

      {activeTab === "playground" ? (
        <>
          {/* Controls */}
          <div className="playground-controls">
            <div className="control-group">
              <span className="control-label">Theme Color</span>
              <div className="control-inputs">
                {["blue", "red", "purple", "slate"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`control-btn ${color === c ? "active" : ""}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <span className="control-label">Button Label</span>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="control-input-text"
                placeholder="e.g. Button"
              />
            </div>

            <div className="control-group">
              <span className="control-label">Close Label</span>
              <input
                type="text"
                value={closeText}
                onChange={(e) => setCloseText(e.target.value)}
                className="control-input-text"
                placeholder="e.g. Close"
              />
            </div>
          </div>

          {/* Sandbox Live Grid */}
          <div className="sandbox-panel">
            <div className="sandbox-row">
              <div className="control-label" style={{ minWidth: "120px" }}>Primary</div>
              <ModernButton variant="primary" colorScheme={color}>
                {buttonText}
              </ModernButton>
              <ModernButton variant="primary" colorScheme={color} hover>
                Hover
              </ModernButton>
              <ModernButton variant="primary" colorScheme={color} active>
                Active
              </ModernButton>
              <ModernButton variant="primary" colorScheme={color} focused>
                Focused
              </ModernButton>
              <ModernButton variant="primary" colorScheme={color} disabled>
                Disabled
              </ModernButton>
            </div>

            <div className="sandbox-row">
              <div className="control-label" style={{ minWidth: "120px" }}>Outline</div>
              <ModernButton variant="outline" colorScheme={color}>
                Outline
              </ModernButton>
              <ModernButton variant="outline" colorScheme={color} hover>
                Outline
              </ModernButton>
              <ModernButton variant="outline" colorScheme={color} disabled>
                Disabled
              </ModernButton>
            </div>

            <div className="sandbox-row">
              <div className="control-label" style={{ minWidth: "120px" }}>Action Button</div>
              <ModernButton variant="action" activeText={closeText}>
                {buttonText}
              </ModernButton>
            </div>
          </div>
        </>
      ) : (
        /* Specs Sheet Grid */
        <div className="specs-grid-wrapper">
          <table className="specs-table">
            <thead>
              <tr>
                <th>Variant Style</th>
                <th>Default State</th>
                <th>Hover State</th>
                <th>Active / Pressed</th>
                <th>Focused State</th>
                <th>Disabled State</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Primary */}
              <tr>
                <td className="row-title-column">Primary Pill</td>
                <td>
                  <ModernButton variant="primary" colorScheme="blue">
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="primary" colorScheme="blue" className="hover">
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="primary" colorScheme="blue" active>
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="primary" colorScheme="blue" focused>
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="primary" colorScheme="blue" disabled>
                    Button
                  </ModernButton>
                </td>
              </tr>

              {/* Row 2: Outline */}
              <tr>
                <td className="row-title-column">Outline Pill</td>
                <td>
                  <ModernButton variant="outline" colorScheme="blue">
                    Outline
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="outline" colorScheme="blue" className="hover">
                    Outline
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="outline" colorScheme="blue" active>
                    Outline
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="outline" colorScheme="blue" focused>
                    Outline
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="outline" colorScheme="blue" disabled>
                    Disabled
                  </ModernButton>
                </td>
              </tr>

              {/* Row 3: Action Button */}
              <tr>
                <td className="row-title-column">Action Button</td>
                <td>
                  <ModernButton variant="action" activeText="Close">
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="action" activeText="Close" className="hover">
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="action" activeText="Close" active>
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="action" activeText="Close" focused>
                    Button
                  </ModernButton>
                </td>
                <td>
                  <ModernButton variant="action" activeText="Close" disabled>
                    Button
                  </ModernButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
