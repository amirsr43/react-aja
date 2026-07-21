import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import FallingLetters from "../ui/animations/FallingLetters";
import CodeHighlight from "../ui/CodeHighlight";
import { docsData } from "../../data/docsData";

const PRESET_COLORS = [
  { label: "White",   value: "#ffffff" },
  { label: "Purple",  value: "#a78bfa" },
  { label: "Pink",    value: "#f472b6" },
  { label: "Cyan",    value: "#22d3ee" },
  { label: "Amber",   value: "#fbbf24" },
  { label: "Emerald", value: "#34d399" },
];

export default function FallingLettersCustomizer() {
  const [activeTab, setActiveTab]   = useState("preview");
  const [langType,  setLangType]    = useState("js");
  const [styleType, setStyleType]   = useState("css");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS,  setCopiedCSS]  = useState(false);

  // Customizable props
  const [text,       setText]       = useState("PORTFOLIO");
  const [color,      setColor]      = useState("#ffffff");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [bounciness,  setBounciness]  = useState(0.55);
  const [replayKey,   setReplayKey]   = useState(0);

  const currentDoc = docsData["falling-letters"];

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleColorPick = (val) => {
    setColor(val);
    setCustomColor(val);
    setReplayKey((k) => k + 1);
  };

  const handleTextChange = (e) => {
    const val = e.target.value.toUpperCase().slice(0, 16);
    setText(val || "A");
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 24px 32px",
                background: "#07070a",
                borderRadius: "12px",
                border: "1px solid #0f172a",
                minHeight: "260px",
              }}
            >
              <FallingLetters
                key={replayKey}
                text={text}
                color={color}
                strokeWidth={strokeWidth}
                bounciness={bounciness}
                position="center"
                fontSize="clamp(36px, 8vw, 68px)"
                dropShadow
                showReplay={false}
              />
              <button
                onClick={() => setReplayKey((k) => k + 1)}
                style={{
                  marginTop: "20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "7px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                ↺ Replay
              </button>
            </div>

            {/* Controls Panel — below preview */}
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
                  <label className="customizer-label">Text (max 16 chars)</label>
                  <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    maxLength={16}
                    placeholder="PORTFOLIO"
                    className="customizer-input"
                    style={{ textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}
                  />
                </div>

                {/* Color Presets */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Stroke Color</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", height: "36px" }}>
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.value}
                        title={c.label}
                        onClick={() => handleColorPick(c.value)}
                        style={{
                          width: "24px", height: "24px",
                          borderRadius: "50%",
                          background: c.value,
                          border: color === c.value ? "2px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.15)",
                          cursor: "pointer",
                          transform: color === c.value ? "scale(1.15)" : "scale(1)",
                          transition: "all 0.15s ease",
                          outline: "none",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                    <input
                      type="color"
                      value={customColor}
                      title="Custom color"
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setColor(e.target.value);
                        setReplayKey((k) => k + 1);
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
                    <span style={{ fontSize: "11px", color: "#4a5568", fontFamily: "monospace" }}>{color}</span>
                  </div>
                </div>

                {/* Stroke Width */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">
                    Stroke Width — <span style={{ color: "#a78bfa" }}>{strokeWidth}px</span>
                  </label>
                  <input
                    type="range" min={1} max={4} step={0.5} value={strokeWidth}
                    onChange={(e) => { setStrokeWidth(Number(e.target.value)); setReplayKey((k) => k + 1); }}
                    style={{ accentColor: "#a78bfa", width: "100%", marginTop: "6px" }}
                  />
                </div>

                {/* Bounciness */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">
                    Bounciness — <span style={{ color: "#a78bfa" }}>{bounciness.toFixed(2)}</span>
                  </label>
                  <input
                    type="range" min={0} max={1} step={0.05} value={bounciness}
                    onChange={(e) => { setBounciness(Number(e.target.value)); setReplayKey((k) => k + 1); }}
                    style={{ accentColor: "#a78bfa", width: "100%", marginTop: "6px" }}
                  />
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
