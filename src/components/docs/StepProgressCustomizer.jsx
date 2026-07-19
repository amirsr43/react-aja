import React, { useState } from "react";
import { Copy, Check, Trash2, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import StepProgress from "../ui/components/StepProgress";
import CodeHighlight from "../ui/CodeHighlight";
import { docsData } from "../../data/docsData";

const SCHEMES = ["blue", "indigo", "emerald", "violet", "rose"];

export default function StepProgressCustomizer() {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code"
  const [langType, setLangType] = useState("js"); // "js" | "ts"
  const [styleType, setStyleType] = useState("tailwind"); // "css" | "tailwind"
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Customizer States
  const [steps, setSteps] = useState([
    { label: "Account Setup" },
    { label: "Profile Details" },
    { label: "Verification" },
    { label: "Finished" }
  ]);
  const [currentStep, setCurrentStep] = useState(2);
  const [colorScheme, setColorScheme] = useState("blue");
  const [interactive, setInteractive] = useState(true);

  // Temp form for adding step
  const [newLabel, setNewLabel] = useState("");

  const currentDoc = docsData["step-progress"];

  const handleAddStep = (e) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setSteps([...steps, { label: newLabel.trim() }]);
    setNewLabel("");
  };

  const handleRemoveStep = (index) => {
    if (steps.length <= 2) return; // Keep at least 2 steps
    const newSteps = steps.filter((_, idx) => idx !== index);
    setSteps(newSteps);
    if (currentStep > newSteps.length) {
      setCurrentStep(newSteps.length);
    }
  };

  const handleStepValueChange = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const getCustomizedCode = (baseCode) => {
    if (!baseCode) return "";
    let code = baseCode;

    // Stringify the steps list format for injection
    const stepsString = JSON.stringify(steps, null, 4)
      .replace(/"label"/g, "label");

    // Replace the default steps array
    code = code.replace(
      /steps\s*=\s*\[[\s\S]*?\s*\]/g,
      `steps = ${stepsString}`
    );

    // Replace other configs
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
                    steps={steps}
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
                    Step {currentStep} of {steps.length}
                  </span>
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                    disabled={currentStep === steps.length}
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

                {/* Edit Steps List */}
                <div className="customizer-section-title">Modify Steps</div>
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-2 items-center bg-[#0a0a0c] p-2 rounded-lg border border-slate-900">
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={step.label}
                          onChange={(e) => handleStepValueChange(index, "label", e.target.value)}
                          className="customizer-input text-xs py-1 px-2 w-full"
                          placeholder="Label"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveStep(index)}
                        disabled={steps.length <= 2}
                        className="p-1.5 rounded-md hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Step Form */}
                <form onSubmit={handleAddStep} className="mt-2 p-3 bg-[#0a0a0c] border border-slate-900 rounded-lg flex flex-col gap-2">
                  <div className="text-xs font-bold text-slate-400">Add New Step</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Step Label (e.g. Finish)"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="customizer-input text-xs py-1 px-2 flex-1"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-850 text-slate-200 text-xs font-semibold border border-slate-800 transition-all flex-shrink-0"
                    >
                      <Plus size={14} /> Add Step
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        ) : (
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
        .customizer-textarea {
          background-color: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          color: #f8fafc;
          padding: 8px 12px;
          font-size: 13px;
          outline: none;
          resize: none;
          font-family: inherit;
        }
        .customizer-textarea:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}
