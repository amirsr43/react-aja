// src/components/docs/TestimonialMarqueeCustomizer.jsx
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import TestimonialMarquee from "../ui/animations/TestimonialMarquee";
import CodeHighlight from "../ui/CodeHighlight";
import { docsData } from "../../data/docsData";

const DEFAULT_ROWS = [
  [
    {
      name: "Emily Carter",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      text: "Amazing service! Everything was delivered on time, and the quality exceeded my expectations.",
    },
    {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "The component integration was super smooth. Highly recommended for any React modern project!",
    },
    {
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      text: "Incredible attention to detail. The subtle hover animations make our UI feel premium.",
    },
    {
      name: "David Miller",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      text: "Cleanest animation physics I've used in a long time. Smooth 60fps performance on mobile too.",
    },
  ],
  [
    {
      name: "Jessica Taylor",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
      text: "Saved us weeks of frontend animation work. Will definitely use ReactAja components again!",
    },
    {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop",
      text: "The opposite row movement creates such an engaging visual flow for our landing page.",
    },
    {
      name: "Olivia Zhang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      text: "Top-notch code structure. Easy to adapt to our custom design tokens and dark mode.",
    },
    {
      name: "Liam O'Connor",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      text: "Smooth deceleration physics on hover is chef's kiss. Exactly what we were searching for.",
    },
  ],
];

export default function TestimonialMarqueeCustomizer() {
  const [activeTab, setActiveTab] = useState("preview");
  const [langType, setLangType] = useState("js");
  const [styleType, setStyleType] = useState("css");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Customizable props
  const [speed, setSpeed] = useState(45);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [gap, setGap] = useState("1.5rem");
  const [cardWidth, setCardWidth] = useState("380px");
  const [numRows, setNumRows] = useState(2);
  const [reverseFirstRow, setReverseFirstRow] = useState(false);

  const currentDoc = docsData["testimonial-marquee"];

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const activeRows = DEFAULT_ROWS.slice(0, numRows);

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
                borderRadius: "12px",
                border: "1px solid #0f172a",
                overflow: "hidden",
                background: "#050505",
                minHeight: "260px",
              }}
            >
              <TestimonialMarquee
                rows={activeRows}
                speed={speed}
                pauseOnHover={pauseOnHover}
                gap={gap}
                cardWidth={cardWidth}
                reverseFirstRow={reverseFirstRow}
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

                {/* Speed */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">
                    Speed — <span style={{ color: "#a78bfa" }}>{speed}s / cycle</span>
                  </label>
                  <input
                    type="range" min={15} max={100} step={5} value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    style={{ accentColor: "#a78bfa", width: "100%", marginTop: "6px" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#4a5568" }}>
                    <span>Fast (15s)</span>
                    <span>Slow (100s)</span>
                  </div>
                </div>

                {/* Card Width */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">
                    Card Width — <span style={{ color: "#a78bfa" }}>{cardWidth}</span>
                  </label>
                  <input
                    type="range" min={280} max={500} step={20}
                    value={parseInt(cardWidth)}
                    onChange={(e) => setCardWidth(`${e.target.value}px`)}
                    style={{ accentColor: "#a78bfa", width: "100%", marginTop: "6px" }}
                  />
                </div>

                {/* Gap */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Gap Between Cards</label>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                    {["0.75rem", "1rem", "1.5rem", "2rem"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGap(g)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          border: gap === g ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.1)",
                          background: gap === g ? "rgba(167, 139, 250, 0.15)" : "rgba(255,255,255,0.03)",
                          color: gap === g ? "#a78bfa" : "#64748b",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Number of Rows</label>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    {[1, 2].map((n) => (
                      <button
                        key={n}
                        onClick={() => setNumRows(n)}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          border: numRows === n ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.1)",
                          background: numRows === n ? "rgba(167, 139, 250, 0.15)" : "rgba(255,255,255,0.03)",
                          color: numRows === n ? "#a78bfa" : "#64748b",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {n} Row{n > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pause on Hover */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Pause on Hover</label>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setPauseOnHover(val)}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          border: pauseOnHover === val ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.1)",
                          background: pauseOnHover === val ? "rgba(167, 139, 250, 0.15)" : "rgba(255,255,255,0.03)",
                          color: pauseOnHover === val ? "#a78bfa" : "#64748b",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {val ? "On" : "Off"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reverse Directions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label className="customizer-label">Direction Order</label>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    {[false, true].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setReverseFirstRow(val)}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          border: reverseFirstRow === val ? "1px solid #a78bfa" : "1px solid rgba(255,255,255,0.1)",
                          background: reverseFirstRow === val ? "rgba(167, 139, 250, 0.15)" : "rgba(255,255,255,0.03)",
                          color: reverseFirstRow === val ? "#a78bfa" : "#64748b",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {val ? "Left First" : "Right First"}
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
                    <button onClick={() => setStyleType("css")} className={`selector-btn ${styleType === "css" ? "active" : ""}`}>CSS</button>
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
      `}</style>
    </div>
  );
}
