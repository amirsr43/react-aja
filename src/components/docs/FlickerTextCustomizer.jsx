// src/components/docs/FlickerTextCustomizer.jsx
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import FlickerText from "../ui/animations/FlickerText";
import CodeHighlight from "../ui/CodeHighlight";
import { docsData } from "../../data/docsData";

const PRESET_COLORS = [
  { label: "White",   value: "#ffffff", glow: "#ffffff" },
  { label: "Purple",  value: "#a78bfa", glow: "#a78bfa" },
  { label: "Cyan",    value: "#22d3ee", glow: "#22d3ee" },
  { label: "Red",     value: "#f87171", glow: "#ef4444" },
  { label: "Amber",   value: "#fbbf24", glow: "#f59e0b" },
  { label: "Green",   value: "#4ade80", glow: "#22c55e" },
];

export default function FlickerTextCustomizer() {
  const [activeTab, setActiveTab] = useState("preview");
  const [langType,  setLangType]  = useState("js");
  const [styleType, setStyleType] = useState("css");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS,  setCopiedCSS]  = useState(false);

  // Customizable props
  const [text,        setText]        = useState("PROJECTS");
  const [colorPreset, setColorPreset] = useState(PRESET_COLORS[0]);
  const [customColor, setCustomColor] = useState("#ffffff");
  const [fontSize,    setFontSize]    = useState(56);
  const [speed,       setSpeed]       = useState(4);
  const [flickerOn,   setFlickerOn]   = useState(true);
  const [glowOn,      setGlowOn]      = useState(true);

  const currentDoc = docsData["flicker-text"];

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleColorSelect = (preset) => {
    setColorPreset(preset);
    setCustomColor(preset.value);
  };

  return (
    <div className="docs-component-body">
      {/* Tab Controls */}
      <div className="docs-tabs-header">
        <div className="docs-tabs-triggers">
          <button
            onClick={() => setActiveTab("preview")}
            className={`docs-tab-trigger ${activeTab === "preview" ? "active" : ""}`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`docs-tab-trigger ${activeTab === "code" ? "active" : ""}`}
          >
            Source Code
          </button>
          {currentDoc?.prompt && (
            <button
              onClick={() => setActiveTab("prompt")}
              className={`docs-tab-trigger ${activeTab === "prompt" ? "active" : ""}`}
            >
              AI Prompt
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="docs-tabs-content">
        {activeTab === "preview" ? (
          <div className="tab-preview-pane">

            {/* Preview Area */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 24px",
                background: "#07070a",
                borderRadius: "12px",
                border: "1px solid #0f172a",
                minHeight: "200px",
              }}
            >
              <FlickerText
                text={text}
                color={customColor}
                glowColor={colorPreset.glow || customColor}
                fontSize={`${fontSize}px`}
                speed={speed}
                flicker={flickerOn}
                glow={glowOn}
              />
            </div>

            {/* Controls Panel */}
            <div style={{
              marginTop: "16px",
              padding: "20px",
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
            }}>
              <div className="customizer-section-title" style={{ marginBottom: "16px" }}>Configuration</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Text</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase().slice(0, 20) || "A")}
                    maxLength={20}
                    placeholder="PROJECTS"
                    className="customizer-input"
                    style={{ textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}
                  />
                </div>

                {/* Color Presets */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Glow Color</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.value}
                        title={c.label}
                        onClick={() => handleColorSelect(c)}
                        style={{
                          width: "24px", height: "24px",
                          borderRadius: "50%",
                          background: c.value,
                          border: customColor === c.value
                            ? "2px solid rgba(255,255,255,0.9)"
                            : "2px solid rgba(255,255,255,0.15)",
                          cursor: "pointer",
                          transform: customColor === c.value ? "scale(1.2)" : "scale(1)",
                          transition: "all 0.15s ease",
                          flexShrink: 0,
                          boxShadow: customColor === c.value ? `0 0 8px ${c.value}` : "none",
                        }}
                      />
                    ))}
                    <input
                      type="color"
                      value={customColor}
                      title="Custom color"
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setColorPreset({ value: e.target.value, glow: e.target.value });
                      }}
                      style={{
                        width: "24px", height: "24px",
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.25)",
                        cursor: "pointer",
                        padding: 0,
                        background: "transparent",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "11px", color: "#4a5568", fontFamily: "monospace" }}>{customColor}</span>
                  </div>
                </div>

                {/* Font Size */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">
                    Font Size — <span style={{ color: "#a78bfa" }}>{fontSize}px</span>
                  </label>
                  <input
                    type="range" min={24} max={100} step={2} value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    style={{ accentColor: "#a78bfa", width: "100%", marginTop: "6px" }}
                  />
                </div>

                {/* Speed */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">
                    Flicker Speed — <span style={{ color: "#a78bfa" }}>{speed}s / cycle</span>
                  </label>
                  <input
                    type="range" min={1} max={10} step={0.5} value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    style={{ accentColor: "#a78bfa", width: "100%", marginTop: "6px" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#4a5568" }}>
                    <span>Fast (1s)</span>
                    <span>Slow (10s)</span>
                  </div>
                </div>

                {/* Flicker Toggle */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Flicker Effect</label>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setFlickerOn(val)}
                        style={{
                          padding: "5px 16px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          border: flickerOn === val ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.1)",
                          background: flickerOn === val ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.03)",
                          color: flickerOn === val ? "#a78bfa" : "#64748b",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {val ? "On" : "Off"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glow Toggle */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Glow Effect</label>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setGlowOn(val)}
                        style={{
                          padding: "5px 16px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          border: glowOn === val ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.1)",
                          background: glowOn === val ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.03)",
                          color: glowOn === val ? "#a78bfa" : "#64748b",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {val ? "On" : "Off"}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        ) : activeTab === "code" ? (
          /* CODE TAB */
          <div className="tab-code-pane">
            <div className="multi-code-container">
              <div className="format-selectors-row">
                <div className="selector-group">
                  <span className="selector-label">Lang:</span>
                  <div className="selector-buttons">
                    <button onClick={() => setLangType("js")} className={`selector-btn ${langType === "js" ? "active" : ""}`}>JS</button>
                    <button onClick={() => setLangType("ts")} className={`selector-btn ${langType === "ts" ? "active" : ""}`}>TS</button>
                  </div>
                </div>
                <div className="selector-group">
                  <span className="selector-label">Style:</span>
                  <div className="selector-buttons">
                    <button onClick={() => setStyleType("css")}     className={`selector-btn ${styleType === "css"     ? "active" : ""}`}>CSS</button>
                    <button onClick={() => setStyleType("tailwind")} className={`selector-btn ${styleType === "tailwind" ? "active" : ""}`}>TW</button>
                  </div>
                </div>
              </div>

              <div className="code-section-header">
                <span className="section-title">Component Code ({langType.toUpperCase()})</span>
                <button
                  onClick={() => handleCopy(currentDoc?.code?.[langType]?.[styleType] ?? "", setCopiedCode)}
                  className="docs-copy-source-btn"
                >
                  {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  <span>{copiedCode ? "Copied!" : "Copy Component"}</span>
                </button>
              </div>
              <CodeHighlight
                code={currentDoc?.code?.[langType]?.[styleType] ?? ""}
                language={langType}
                className="code-pre-element"
              />

              {styleType === "css" && currentDoc?.css && (
                <div className="css-code-section mt-6 pt-6 border-t border-slate-900">
                  <div className="code-section-header">
                    <span className="section-title">CSS Stylesheet</span>
                    <button onClick={() => handleCopy(currentDoc.css, setCopiedCSS)} className="docs-copy-source-btn">
                      {copiedCSS ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{copiedCSS ? "Copied!" : "Copy CSS"}</span>
                    </button>
                  </div>
                  <CodeHighlight code={currentDoc.css} language="css" className="code-pre-element" />
                </div>
              )}
            </div>
          </div>

        ) : (
          /* PROMPT TAB */
          <div className="tab-prompt-pane" style={{
            padding: "24px",
            background: "rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            color: "#f0f0f5",
            lineHeight: "1.6",
            fontSize: "14.5px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{
                fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.05em", background: "rgba(139, 92, 246, 0.15)",
                color: "#a78bfa", padding: "4px 8px", borderRadius: "6px",
              }}>
                AI Generation Prompt
              </span>
              <button onClick={() => handleCopy(currentDoc?.prompt ?? "", setCopiedCode)} className="docs-copy-source-btn">
                {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span>{copiedCode ? "Copied!" : "Copy Prompt"}</span>
              </button>
            </div>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{currentDoc?.prompt}</p>
          </div>
        )}
      </div>

      <style>{`
        .customizer-section-title {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 6px;
        }
        .customizer-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
        }
        .customizer-input {
          background-color: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          color: #f8fafc;
          padding: 8px 12px;
          font-size: 13px;
          outline: none;
          transition: all 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .customizer-input:focus {
          border-color: #a78bfa;
        }
      `}</style>
    </div>
  );
}
