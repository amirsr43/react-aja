// src/components/docs/GradientSweepCustomizer.jsx
import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import GradientSweepText from "../ui/animations/GradientSweepText";
import CodeHighlight from "../ui/CodeHighlight";
import { docsData } from "../../data/docsData";

const PRESETS = [
  { name: "Royal Sunset", colors: ["#a78bfa", "#ec4899"] },
  { name: "Cyber Aurora", colors: ["#00ffcc", "#3b82f6"] },
  { name: "Ember Gold", colors: ["#f97316", "#eab308"] },
  { name: "Ocean Breeze", colors: ["#06b6d4", "#3b82f6"] },
  { name: "Clean Silver", colors: ["#ffffff", "#94a3b8"] }
];

export default function GradientSweepCustomizer() {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code" | "prompt"
  const [langType, setLangType] = useState("js"); // "js" | "ts"
  const [styleType, setStyleType] = useState("css"); // "css" | "tailwind"
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Customizer States
  const [text, setText] = useState("Crafting Digital Aesthetics");
  const [colorStart, setColorStart] = useState("#a78bfa");
  const [colorEnd, setColorEnd] = useState("#ec4899");
  const [baseColor, setBaseColor] = useState("rgba(255, 255, 255, 0.15)");
  const [duration, setDuration] = useState(1.2);
  const [showReplay, setShowReplay] = useState(true);
  const [selectedPresetName, setSelectedPresetName] = useState("Royal Sunset");

  const currentDoc = docsData["gradient-sweep-text"];

  const applyPreset = (preset) => {
    setColorStart(preset.colors[0]);
    setColorEnd(preset.colors[1]);
    setSelectedPresetName(preset.name);
  };

  const handleColorChange = (type, val) => {
    if (type === "start") setColorStart(val);
    if (type === "end") setColorEnd(val);
    setSelectedPresetName("Custom");
  };

  const getCustomizedCode = (baseCode) => {
    if (!baseCode) return "";
    let code = baseCode;

    // Replace the default props
    code = code.replace(/text = ".*"/g, `text = "${text}"`);
    code = code.replace(/colors = \[.*\]/g, `colors = ["${colorStart}", "${colorEnd}"]`);
    code = code.replace(/baseColor = ".*"/g, `baseColor = "${baseColor}"`);
    code = code.replace(/duration = \d+\.?\d*/g, `duration = ${duration}`);
    code = code.replace(/showReplay = (true|false)/g, `showReplay = ${showReplay}`);

    // Replace inline styles hexes in Tailwind version
    code = code.replace(/#a78bfa/g, colorStart);
    code = code.replace(/#ec4899/g, colorEnd);
    code = code.replace(/rgba\(255, 255, 255, 0.15\)/g, baseColor);

    return code;
  };

  const getCustomizedCSS = (baseCSS) => {
    if (!baseCSS) return "";
    let css = baseCSS;
    css = css.replace(/#a78bfa/g, colorStart);
    css = css.replace(/#ec4899/g, colorEnd);
    css = css.replace(/rgba\(255, 255, 255, 0.15\)/g, baseColor);
    return css;
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCSS = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  const handleCopyPrompt = (promptText) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Find active code group
  const activeLang = currentDoc && currentDoc.code && currentDoc.code[langType] ? langType : "js";
  const activeCodeGroup = currentDoc && currentDoc.code ? (currentDoc.code[activeLang] || {}) : {};

  return (
    <div className="docs-component-body">
      {/* Tab Controls */}
      <div className="docs-tabs-header">
        <div className="docs-tabs-triggers">
          <button 
            onClick={() => setActiveTab("preview")}
            className={`docs-tab-trigger ${activeTab === "preview" ? "active" : ""}`}
          >
            Interactive Sandbox
          </button>
          <button 
            onClick={() => setActiveTab("code")}
            className={`docs-tab-trigger ${activeTab === "code" ? "active" : ""}`}
          >
            Source Code
          </button>
          {currentDoc.prompt && (
            <button 
              onClick={() => setActiveTab("prompt")}
              className={`docs-tab-trigger ${activeTab === "prompt" ? "active" : ""}`}
            >
              AI Prompt
            </button>
          )}
        </div>
        {activeTab === "prompt" && currentDoc.prompt && (
          <button 
            onClick={() => handleCopyPrompt(currentDoc.prompt)}
            className="docs-copy-source-btn"
          >
            {copiedPrompt ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            <span>{copiedPrompt ? "Copied!" : "Copy Prompt"}</span>
          </button>
        )}
      </div>

      {/* Tab Content Display */}
      <div className="docs-tabs-content">
        {activeTab === "preview" ? (
          <div className="tab-preview-pane">
            <div className="customizer-layout">
              {/* Preview Box */}
              <div className="customizer-preview-col" style={{ minHeight: "220px", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505", borderRadius: "16px", padding: "32px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em", width: "100%" }}>
                  <GradientSweepText 
                    text={text}
                    colors={[colorStart, colorEnd]}
                    baseColor={baseColor}
                    duration={duration}
                    showReplay={showReplay}
                  />
                </div>
              </div>
              
              {/* Controls Column */}
              <div className="customizer-panel-col">
                <div className="customizer-section-title">Configure Sweep Effect</div>
                <div className="customizer-input-grid">
                  {/* Text Input */}
                  <div className="customizer-field-span-2">
                    <label className="customizer-label">Custom Text</label>
                    <input 
                      type="text" 
                      value={text} 
                      onChange={(e) => setText(e.target.value)} 
                      className="customizer-input" 
                    />
                  </div>

                  {/* Gradient Presets */}
                  <div className="customizer-field-span-2">
                    <label className="customizer-label">Color Presets</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                      {PRESETS.map((p) => (
                        <button
                          key={p.name}
                          onClick={() => applyPreset(p)}
                          style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: `1px solid ${selectedPresetName === p.name ? "#a78bfa" : "rgba(255,255,255,0.08)"}`,
                            borderRadius: "8px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            color: selectedPresetName === p.name ? "#a78bfa" : "#ffffff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            transition: "all 0.2s"
                          }}
                        >
                          <div style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`
                          }} />
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="customizer-field">
                    <label className="customizer-label">Gradient Start</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input 
                        type="color" 
                        value={colorStart} 
                        onChange={(e) => handleColorChange("start", e.target.value)} 
                        style={{ background: "none", border: "none", width: "36px", height: "36px", cursor: "pointer", padding: 0 }}
                      />
                      <input 
                        type="text" 
                        value={colorStart} 
                        onChange={(e) => handleColorChange("start", e.target.value)} 
                        className="customizer-input" 
                        style={{ width: "90px" }}
                      />
                    </div>
                  </div>

                  <div className="customizer-field">
                    <label className="customizer-label">Gradient End</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input 
                        type="color" 
                        value={colorEnd} 
                        onChange={(e) => handleColorChange("end", e.target.value)} 
                        style={{ background: "none", border: "none", width: "36px", height: "36px", cursor: "pointer", padding: 0 }}
                      />
                      <input 
                        type="text" 
                        value={colorEnd} 
                        onChange={(e) => handleColorChange("end", e.target.value)} 
                        className="customizer-input" 
                        style={{ width: "90px" }}
                      />
                    </div>
                  </div>

                  {/* Duration Slider */}
                  <div className="customizer-field">
                    <label className="customizer-label">Sweep Duration (Seconds)</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                      <input 
                        type="range" 
                        min="0.3" 
                        max="3.5" 
                        step="0.1" 
                        value={duration} 
                        onChange={(e) => setDuration(parseFloat(e.target.value))} 
                        style={{ flex: 1, accentColor: "#a78bfa", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "13px", fontWeight: "700", minWidth: "32px", textAlign: "right" }}>{duration}s</span>
                    </div>
                  </div>

                  {/* Base Color Picker */}
                  <div className="customizer-field">
                    <label className="customizer-label">Muted Base Color</label>
                    <input 
                      type="text" 
                      value={baseColor} 
                      onChange={(e) => setBaseColor(e.target.value)} 
                      className="customizer-input" 
                    />
                  </div>

                  {/* Replay Button Toggle */}
                  <div className="customizer-field-span-2">
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>
                      <input 
                        type="checkbox" 
                        checked={showReplay} 
                        onChange={(e) => setShowReplay(e.target.checked)} 
                        style={{ width: "16px", height: "16px", accentColor: "#a78bfa", cursor: "pointer" }}
                      />
                      Show Replay / Restart Trigger Button
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "code" ? (
          <div className="tab-code-pane">
            <div className="multi-code-container">
              {/* Format selectors row */}
              <div className="format-selectors-row">
                <div className="selector-group">
                  <span className="selector-label">Lang:</span>
                  <div className="selector-buttons">
                    <button
                      onClick={() => setLangType("js")}
                      className={`selector-btn ${activeLang === "js" ? "active" : ""}`}
                    >
                      JS
                    </button>
                    {currentDoc.code && currentDoc.code.ts && (
                      <button
                        onClick={() => setLangType("ts")}
                        className={`selector-btn ${activeLang === "ts" ? "active" : ""}`}
                      >
                        TS
                      </button>
                    )}
                  </div>
                </div>

                <div className="selector-group">
                  <span className="selector-label">Style:</span>
                  <div className="selector-buttons">
                    <button
                      onClick={() => setStyleType("css")}
                      className={`selector-btn ${styleType === "css" ? "active" : ""}`}
                    >
                      CSS
                    </button>
                    <button
                      onClick={() => setStyleType("tailwind")}
                      className={`selector-btn ${styleType === "tailwind" ? "active" : ""}`}
                    >
                      TW
                    </button>
                  </div>
                </div>
              </div>

              {/* Usage code display block */}
              <div className="code-section-header" style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "16px" }}>
                <span className="section-title">Component Usage</span>
                <button
                  onClick={() => handleCopyCode(
                    `<GradientSweepText\n  text="${text}"\n  colors={["${colorStart}", "${colorEnd}"]}\n  duration={${duration}}\n  baseColor="${baseColor}"\n  showReplay={${showReplay}}\n/>`
                  )}
                  className="docs-copy-source-btn"
                >
                  {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  <span>{copiedCode ? "Copied!" : "Copy Usage JSX"}</span>
                </button>
              </div>
              <CodeHighlight
                code={`<GradientSweepText
  text="${text}"
  colors={["${colorStart}", "${colorEnd}"]}
  duration={${duration}}
  baseColor="${baseColor}"
  showReplay={${showReplay}}
/>`}
                language="javascript"
                className="code-pre-element"
                style={{ marginBottom: "28px" }}
              />

              {/* Component Code Section */}
              <div className="code-section-header">
                <span className="section-title">Component Implementation ({activeLang.toUpperCase()})</span>
                <button
                  onClick={() => handleCopyCode(getCustomizedCode(activeCodeGroup[styleType] || ""))}
                  className="docs-copy-source-btn"
                >
                  {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  <span>{copiedCode ? "Copied!" : "Copy Implementation"}</span>
                </button>
              </div>
              <CodeHighlight
                code={getCustomizedCode(activeCodeGroup[styleType] || "")}
                language={activeLang}
                className="code-pre-element"
              />

              {/* CSS Section (Only show if styleType === 'css') */}
              {styleType === "css" && currentDoc.css && (
                <div className="css-code-section" style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="code-section-header">
                    <span className="section-title">CSS Stylesheet</span>
                    <button
                      onClick={() => handleCopyCSS(getCustomizedCSS(currentDoc.css))}
                      className="docs-copy-source-btn"
                    >
                      {copiedCSS ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{copiedCSS ? "Copied!" : "Copy CSS"}</span>
                    </button>
                  </div>
                  <CodeHighlight
                    code={getCustomizedCSS(currentDoc.css)}
                    language="css"
                    className="code-pre-element"
                  />
                </div>
              )}

              {styleType === "tailwind" && (
                <div className="tailwind-info-note" style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", fontSize: "12.5px", color: "var(--muted)" }}>
                  💡 <strong>Note:</strong> Tailwind utility classes are applied directly to the component markup. No separate CSS stylesheet is needed!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="tab-prompt-pane" style={{
            padding: "24px",
            background: "rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            color: "#f0f0f5",
            lineHeight: "1.6",
            fontSize: "14.5px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa", padding: "4px 8px", borderRadius: "6px" }}>
                AI Generation Prompt
              </span>
            </div>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{currentDoc.prompt}</p>
          </div>
        )}
      </div>

      <style>{`
        /* Customizer side-by-side layout styling */
        .customizer-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          padding: 12px 0;
        }

        .customizer-preview-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(0,0,0,0.25);
          border-radius: 16px;
          border: 1px dashed rgba(255,255,255,0.06);
          min-height: 200px;
        }

        .customizer-panel-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 16px;
          padding: 20px;
        }

        .customizer-section-title {
          font-size: 11px;
          font-weight: 750;
          color: #8e8e93;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 6px;
          margin-bottom: 4px;
        }

        .customizer-input-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .customizer-input-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .customizer-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .customizer-field-span-2 {
          display: flex;
          flex-direction: column;
          gap: 6px;
          grid-column: 1 / -1;
        }

        .customizer-label {
          font-size: 11px;
          font-weight: 600;
          color: #8e8e93;
          margin-bottom: 2px;
        }

        .customizer-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #ffffff;
          padding: 8px 12px;
          font-size: 13px;
          transition: all 0.2s ease;
          outline: none;
        }

        .customizer-input:focus {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
        }
      `}</style>
    </div>
  );
}
