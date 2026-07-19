import React, { useState } from "react";
import { Copy, Check, ArrowRight, ArrowLeft } from "lucide-react";
import StepProgress from "../ui/components/StepProgress";
import CodeHighlight from "../ui/CodeHighlight";
import { docsData } from "../../data/docsData";

const SCHEMES = ["blue", "indigo", "emerald", "violet", "rose"];

const STEPS = [
  { label: "Account Setup" },
  { label: "Profile Details" },
  { label: "Verification" },
  { label: "Finished" }
];

export default function StepProgressCustomizer() {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code"
  const [langType, setLangType] = useState("js"); // "js" | "ts"
  const [styleType, setStyleType] = useState("tailwind"); // "css" | "tailwind"
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const [currentStep, setCurrentStep] = useState(2);
  const [colorScheme, setColorScheme] = useState("blue");
  const [interactive, setInteractive] = useState(true);

  const currentDoc = docsData["step-progress"];

  const getCustomizedCode = (baseCode) => {
    if (!baseCode) return "";
    let code = baseCode;

    // Replace configurations
    code = code.replace(/currentStep\s*=\s*\d+/g, `currentStep = ${currentStep}`);
    code = code.replace(/interactive\s*=\s*(true|false)/g, `interactive = ${interactive}`);
    code = code.replace(/colorScheme\s*=\s*"[a-z]+"/g, `colorScheme = "${colorScheme}"`);

    return code;
  };

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const SCHEME_DETAILS = {
    blue: { bg: "bg-blue-600", ring: "ring-blue-600/30" },
    indigo: { bg: "bg-indigo-600", ring: "ring-indigo-600/30" },
    emerald: { bg: "bg-emerald-600", ring: "ring-emerald-600/30" },
    violet: { bg: "bg-violet-600", ring: "ring-violet-600/30" },
    rose: { bg: "bg-rose-600", ring: "ring-rose-600/30" }
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
          {currentDoc.prompt && (
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
            <div className="customizer-layout">
              {/* Preview Column */}
              <div className="customizer-preview-col flex flex-col items-center justify-center p-8 bg-[#0a0a0c] rounded-xl border border-slate-900 min-h-[350px]">
                
                {/* Step Progress Component View */}
                <div className="w-full pt-6 pb-2">
                  <StepProgress
                    steps={STEPS}
                    currentStep={currentStep}
                    colorScheme={colorScheme}
                    interactive={interactive}
                    onStepChange={setCurrentStep}
                  />
                </div>

                {/* Step control buttons */}
                <div className="flex items-center gap-3 mt-2 z-20">
                  <button
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-850 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <span className="text-xs text-slate-400 font-mono">
                    Step {currentStep} of {STEPS.length}
                  </span>
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(STEPS.length, prev + 1))}
                    disabled={currentStep === STEPS.length}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-850 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Panel Column */}
              <div className="customizer-panel-col">
                {/* Configuration */}
                <div className="customizer-section-title">Configuration</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Scheme selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="customizer-label">Color Scheme</label>
                    <div className="flex gap-2 h-10 items-center">
                      {SCHEMES.map((scheme) => {
                        const detail = SCHEME_DETAILS[scheme];
                        const isActive = colorScheme === scheme;
                        return (
                          <button
                            key={scheme}
                            type="button"
                            onClick={() => setColorScheme(scheme)}
                            className={`w-6 h-6 rounded-full ${detail.bg} transition-all duration-300 relative group flex items-center justify-center ${
                              isActive 
                                ? `ring-[3px] ${detail.ring} scale-110 border border-white/80` 
                                : "hover:scale-105 opacity-60 hover:opacity-100"
                            }`}
                          >
                            {isActive && <Check size={10} className="text-white stroke-[3.5px]" />}
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 border border-slate-850 text-[9px] text-slate-300 font-bold px-1.5 py-0.5 rounded capitalize whitespace-nowrap z-50 pointer-events-none">
                              {scheme}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive toggle */}
                  <div className="flex flex-col gap-1.5">
                    <label className="customizer-label">Clickable Steps</label>
                    <div className="flex h-10 items-center">
                      <button
                        onClick={() => setInteractive(!interactive)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          interactive
                            ? "bg-slate-900 border-slate-700 text-white"
                            : "bg-transparent border-slate-850 text-slate-400"
                        }`}
                      >
                        {interactive ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "code" ? (
          /* CODE TAB */
          <div className="tab-code-pane">
            <div className="multi-code-container">
              {/* Selectors */}
              <div className="format-selectors-row">
                <div className="selector-group">
                  <span className="selector-label">Lang:</span>
                  <div className="selector-buttons">
                    <button
                      onClick={() => setLangType("js")}
                      className={`selector-btn ${langType === "js" ? "active" : ""}`}
                    >
                      JS
                    </button>
                    <button
                      onClick={() => setLangType("ts")}
                      className={`selector-btn ${langType === "ts" ? "active" : ""}`}
                    >
                      TS
                    </button>
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
                      Tailwind
                    </button>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="code-section-header">
                <span className="section-title">Component Code ({langType.toUpperCase()})</span>
                <button
                  onClick={() => handleCopy(getCustomizedCode(currentDoc.code[langType][styleType]), setCopiedCode)}
                  className="docs-copy-source-btn"
                >
                  {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  <span>{copiedCode ? "Copied!" : "Copy Component"}</span>
                </button>
              </div>
              <CodeHighlight
                code={getCustomizedCode(currentDoc.code[langType][styleType])}
                language={langType}
                className="code-pre-element"
              />

              {/* CSS Code */}
              {styleType === "css" && currentDoc.css && (
                <div className="css-code-section mt-6 pt-6 border-t border-slate-900">
                  <div className="code-section-header">
                    <span className="section-title">CSS Stylesheet</span>
                    <button
                      onClick={() => handleCopy(currentDoc.css, setCopiedCSS)}
                      className="docs-copy-source-btn"
                    >
                      {copiedCSS ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{copiedCSS ? "Copied!" : "Copy CSS"}</span>
                    </button>
                  </div>
                  <CodeHighlight
                    code={currentDoc.css}
                    language="css"
                    className="code-pre-element"
                  />
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
            fontSize: "14.5px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa", padding: "4px 8px", borderRadius: "6px" }}>
                AI Generation Prompt
              </span>
              <button
                onClick={() => handleCopy(currentDoc.prompt, setCopiedCode)}
                className="docs-copy-source-btn"
              >
                {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span>{copiedCode ? "Copied!" : "Copy Prompt"}</span>
              </button>
            </div>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{currentDoc.prompt}</p>
          </div>
        )}
      </div>

      {/* Shared Style overrides */}
      <style>{`
        .customizer-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .customizer-layout {
            grid-template-columns: 1fr 340px;
          }
        }
        .customizer-preview-col {
          border-radius: 12px;
        }
        .customizer-panel-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
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
        }
        .customizer-input:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}
