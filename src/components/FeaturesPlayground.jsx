// src/components/FeaturesPlayground.jsx
import React, { useState } from "react";
import { Copy, Check, Terminal, Code, Sparkles, Languages, Settings } from "lucide-react";
import SearchBarShowcase from "./ui/components/SearchBar";
import ModernForm from "./ui/components/ModernForm";
import SpotifyLyrics from "./ui/animations/SpotifyLyrics";
import { searchBarCode } from "../data/codes/searchBar";
import { modernFormCode } from "../data/codes/modernForm";
import { spotifyLyricsCode } from "../data/codes/spotifyLyrics";

const PLAYGROUND_STYLES = `
/* ── FEATURES PLAYGROUND SYSTEM ── */
.features-playground-section {
  padding: 100px 24px 120px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 100%, rgba(124, 58, 237, 0.04) 0%, transparent 60%);
  font-family: 'Outfit', 'Inter', sans-serif;
  color: #ffffff;
}

.playground-header {
  text-align: center;
  margin-bottom: 50px;
}

.playground-tag {
  font-size: 13px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  margin-bottom: 16px;
}

.playground-title {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
}

.playground-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.55);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
}

.playground-widget {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: stretch;
}

@media (min-width: 1024px) {
  .playground-widget {
    grid-template-columns: 1fr 1.15fr;
  }
}

/* Left Panel: Preview & Selectors */
.playground-left-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.component-selectors-bar {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
}

.component-selectors-bar::-webkit-scrollbar {
  display: none;
}

.selector-pill {
  padding: 10px 18px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.selector-pill:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #ffffff;
}

.selector-pill.active {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%);
  border-color: rgba(167, 139, 250, 0.4);
  color: #c084fc;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.1);
}

.preview-display-box {
  flex-grow: 1;
  min-height: 380px;
  border-radius: 24px;
  background: #050505;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
}

.preview-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, transparent 70%);
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Right Panel: Workspace Code Window */
.playground-workspace {
  background: rgba(10, 10, 12, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

.workspace-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.2);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.window-dot.red { background: #ff5f56; }
.window-dot.yellow { background: #ffbd2e; }
.window-dot.green { background: #27c93f; }

.workspace-tabs {
  display: flex;
  gap: 8px;
}

.workspace-tab-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.workspace-tab-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

.workspace-tab-btn.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

/* Control bar under header */
.workspace-controls-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.selectors-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selector-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 700;
}

.selector-btn-group {
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2px;
}

.selector-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.45);
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.selector-btn:hover {
  color: #ffffff;
}

.selector-btn.active {
  background: rgba(255, 255, 255, 0.08);
  color: #a78bfa;
}

.copy-btn-action {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
}

.copy-btn-action:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}

.copy-btn-action.copied {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.2);
  background: rgba(52, 211, 153, 0.05);
}

/* Editor pre / code area */
.editor-code-body {
  padding: 20px;
  overflow-y: auto;
  max-height: 380px;
  background: rgba(0, 0, 0, 0.25);
  flex-grow: 1;
}

.editor-pre {
  margin: 0;
  font-family: 'DM Mono', monospace;
  font-size: 12.5px;
  line-height: 1.6;
  color: #a1a1aa;
  white-space: pre-wrap;
  word-break: break-all;
}

.prompt-terminal-body {
  padding: 24px;
  background: rgba(0, 0, 0, 0.3);
  font-size: 14.5px;
  line-height: 1.6;
  color: #f0f0f5;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 380px;
  overflow-y: auto;
}

.prompt-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(167, 139, 250, 0.15);
  color: #c084fc;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(167, 139, 250, 0.25);
}

.prompt-text-para {
  margin: 0;
  white-space: pre-wrap;
}

.prompt-cursor {
  display: inline-block;
  width: 7px;
  height: 15px;
  background: #a78bfa;
  margin-left: 4px;
  animation: cursor-blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes cursor-blink {
  from, to { background-color: transparent }
  50% { background-color: #a78bfa }
}
`;

const COMPONENTS_LIST = [
  {
    id: "search-bar",
    name: "Interactive SearchBar",
    component: <SearchBarShowcase />,
    code: searchBarCode.code,
    css: searchBarCode.css,
    prompt: "Create an elegant search bar input field in React that expands on focus. It reveals a glassmorphic suggestion dropdown with search history entries (with individual close triggers) and clickable trending tags. The dropdown should display on focus and close on blur, and it should hide the keyboard shortcut badge on mobile screens."
  },
  {
    id: "form",
    name: "Modern Form",
    component: <ModernForm />,
    code: modernFormCode.code,
    css: modernFormCode.css,
    prompt: "Create a dark glassmorphic signup/login form in React with floating labels that lift on focus, input validations with real-time error messages, and a multi-state submit button (idle, submitting, success). Ensure autocomplete autofilled fields remain fully transparent with white text rather than showing browser-default colors."
  },
  {
    id: "spotify-lyrics",
    name: "Spotify-Style Scroll Text",
    component: <SpotifyLyrics />,
    code: spotifyLyricsCode.code,
    css: spotifyLyricsCode.css,
    prompt: "Create an interactive scroll-synchronized text reveal in React. Sentences focus, scale up, and turn bright white as they scroll to the vertical center of the container viewport, while outer lines fade and blur away."
  }
];

export default function FeaturesPlayground() {
  const [activeCompIndex, setActiveCompIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("code"); // "code" | "prompt"
  const [lang, setLang] = useState("js"); // "js" | "ts"
  const [style, setStyle] = useState("css"); // "css" | "tailwind"
  const [copied, setCopied] = useState(false);

  const activeComp = COMPONENTS_LIST[activeCompIndex];

  // Resolve code text based on settings
  const getCodeText = () => {
    if (activeTab === "prompt") return activeComp.prompt;

    const componentCode = activeComp.code;
    const activeLang = componentCode[lang] ? lang : "js";
    const activeCodeGroup = componentCode[activeLang] || {};

    if (style === "css") {
      // Include both component code and CSS sheet code separated by a divider
      return `${activeCodeGroup.css || ""}\n\n/* ── CSS Stylesheet ── */\n${activeComp.css || ""}`;
    } else {
      return activeCodeGroup.tailwind || "";
    }
  };

  const handleCopy = () => {
    const textToCopy = getCodeText();
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="features-playground-section" aria-label="Interactive Workspace Playground">
      <style>{PLAYGROUND_STYLES}</style>
      
      <div className="playground-header">
        <span className="playground-tag">Workspace Showcase</span>
        <h2 className="playground-title">Choose Your Tech Stack</h2>
        <p className="playground-desc">
          ReactAja is built for developer productivity. Switch formatting from JavaScript to TypeScript, CSS to Tailwind CSS, or copy the original AI prompt with one single click.
        </p>
      </div>

      <div className="playground-widget">
        
        {/* Left column: Selectors & Live Component Preview */}
        <div className="playground-left-panel">
          <div className="component-selectors-bar" role="tablist">
            {COMPONENTS_LIST.map((comp, idx) => (
              <button
                key={comp.id}
                role="tab"
                aria-selected={activeCompIndex === idx}
                onClick={() => {
                  setActiveCompIndex(idx);
                  setCopied(false);
                }}
                className={`selector-pill ${activeCompIndex === idx ? "active" : ""}`}
              >
                {comp.name}
              </button>
            ))}
          </div>

          <div className="preview-display-box">
            <div className="preview-glow" />
            {activeComp.component}
          </div>
        </div>

        {/* Right column: Interactive Code Window Editor */}
        <div className="playground-workspace">
          <div className="workspace-header">
            <div className="window-dots">
              <div className="window-dot red" />
              <div className="window-dot yellow" />
              <div className="window-dot green" />
            </div>

            <div className="workspace-tabs" role="tablist">
              <button
                onClick={() => { setActiveTab("code"); setCopied(false); }}
                className={`workspace-tab-btn ${activeTab === "code" ? "active" : ""}`}
                role="tab"
                aria-selected={activeTab === "code"}
              >
                <Code size={13} />
                <span>Source Code</span>
              </button>
              <button
                onClick={() => { setActiveTab("prompt"); setCopied(false); }}
                className={`workspace-tab-btn ${activeTab === "prompt" ? "active" : ""}`}
                role="tab"
                aria-selected={activeTab === "prompt"}
              >
                <Sparkles size={13} />
                <span>AI Prompt</span>
              </button>
            </div>
          </div>

          {/* Control Bar (Only show formatting switches when code tab is active) */}
          <div className="workspace-controls-bar">
            {activeTab === "code" ? (
              <>
                <div className="selectors-group">
                  <div className="selectors-group">
                    <span className="selector-label">Language:</span>
                    <div className="selector-btn-group">
                      <button
                        onClick={() => { setLang("js"); setCopied(false); }}
                        className={`selector-btn ${lang === "js" ? "active" : ""}`}
                      >
                        JS
                      </button>
                      <button
                        onClick={() => { setLang("ts"); setCopied(false); }}
                        className={`selector-btn ${lang === "ts" ? "active" : ""}`}
                      >
                        TS
                      </button>
                    </div>
                  </div>

                  <div className="selectors-group">
                    <span className="selector-label">Styling:</span>
                    <div className="selector-btn-group">
                      <button
                        onClick={() => { setStyle("css"); setCopied(false); }}
                        className={`selector-btn ${style === "css" ? "active" : ""}`}
                      >
                        CSS
                      </button>
                      <button
                        onClick={() => { setStyle("tailwind"); setCopied(false); }}
                        className={`selector-btn ${style === "tailwind" ? "active" : ""}`}
                      >
                        Tailwind
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="selectors-group">
                <span className="selector-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Terminal size={12} />
                  AI Prompt Copier
                </span>
              </div>
            )}

            <button
              onClick={handleCopy}
              className={`copy-btn-action ${copied ? "copied" : ""}`}
              aria-label={copied ? "Copied" : "Copy to clipboard"}
            >
              {copied ? (
                <>
                  <Check size={13} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>{activeTab === "code" ? "Copy Code" : "Copy Prompt"}</span>
                </>
              )}
            </button>
          </div>

          {/* Workspace Body Content */}
          {activeTab === "code" ? (
            <div className="editor-code-body">
              <pre className="editor-pre">
                <code>{getCodeText()}</code>
              </pre>
            </div>
          ) : (
            <div className="prompt-terminal-body">
              <div className="prompt-badge">
                <Sparkles size={11} />
                AI Generation Prompt
              </div>
              <p className="prompt-text-para">
                {activeComp.prompt}
                <span className="prompt-cursor" />
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
