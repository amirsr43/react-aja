import React, { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import ProfileCard from "../ui/ProfileCard";
import { docsData } from "../../data/docsData";

const THEME_PRESETS = [
  {
    name: "Midnight Obsidian",
    theme: {
      cardBg: "#1a1a1f",
      accentColor: "#ffffff",
      btnTextColor: "#111113",
      badgeColor: "#22c55e",
      textPrimary: "#f0f0f5",
      textSecondary: "rgba(255, 255, 255, 0.45)"
    }
  },
  {
    name: "Royal Indigo",
    theme: {
      cardBg: "#121021",
      accentColor: "#6366f1",
      btnTextColor: "#ffffff",
      badgeColor: "#6366f1",
      textPrimary: "#f0f0f5",
      textSecondary: "rgba(255, 255, 255, 0.45)"
    }
  },
  {
    name: "Cyber Emerald",
    theme: {
      cardBg: "#04120a",
      accentColor: "#10b981",
      btnTextColor: "#ffffff",
      badgeColor: "#10b981",
      textPrimary: "#f0f0f5",
      textSecondary: "rgba(255, 255, 255, 0.45)"
    }
  },
  {
    name: "Crimson Rose",
    theme: {
      cardBg: "#1b0e12",
      accentColor: "#f43f5e",
      btnTextColor: "#ffffff",
      badgeColor: "#f43f5e",
      textPrimary: "#f0f0f5",
      textSecondary: "rgba(255, 255, 255, 0.45)"
    }
  },
  {
    name: "Amber Glow",
    theme: {
      cardBg: "#1c150c",
      accentColor: "#f59e0b",
      btnTextColor: "#111113",
      badgeColor: "#f59e0b",
      textPrimary: "#f0f0f5",
      textSecondary: "rgba(255, 255, 255, 0.45)"
    }
  }
];

export default function ProfileCardCustomizer() {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code"
  const [langType, setLangType] = useState("js"); // "js" | "ts"
  const [styleType, setStyleType] = useState("css"); // "css" | "tailwind"
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Customizer States
  const [name, setName] = useState("Amir.");
  const [bio, setBio] = useState("A Frontend Developer focused on building beautiful & intuitive user experiences.");
  const [followers, setFollowers] = useState("12.5k");
  const [posts, setPosts] = useState("148");
  const [customImg, setCustomImg] = useState("");
  const [theme, setTheme] = useState({
    cardBg: "#1a1a1f",
    accentColor: "#ffffff",
    btnTextColor: "#111113",
    badgeColor: "#22c55e",
    textPrimary: "#f0f0f5",
    textSecondary: "rgba(255, 255, 255, 0.45)"
  });
  const [selectedPresetName, setSelectedPresetName] = useState("Midnight Obsidian");

  const currentDoc = docsData["profile-card"];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImg(url);
    }
  };

  const applyThemePreset = (preset) => {
    setTheme(preset.theme);
    setSelectedPresetName(preset.name);
  };

  const handleColorChange = (key, value) => {
    setTheme((prev) => {
      const next = { ...prev, [key]: value };
      
      // Auto adjust button text color for accent color change based on brightness
      if (key === "accentColor") {
        const hex = value.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        next.btnTextColor = brightness > 140 ? "#111113" : "#ffffff";
      }
      
      return next;
    });
    setSelectedPresetName("Custom");
  };

  const getCustomizedCode = (baseCode) => {
    if (!baseCode) return "";
    let code = baseCode;
    
    // Replace content fields (only if it's a valid remote URL)
    if (customImg && !customImg.startsWith("blob:")) {
      code = code.replace(/const profileImg = ".*";/, `const profileImg = "${customImg}";`);
      code = code.replace(/image = profileImg/g, `image = "${customImg}"`);
      code = code.replace(/defaultProfileImg = ".*";/, `defaultProfileImg = "${customImg}";`);
      code = code.replace(/image = defaultProfileImg/g, `image = "${customImg}"`);
    }
    code = code.replace(/name = "Amir."/g, `name = "${name}"`);
    code = code.replace(/bio = "A Frontend Developer focused on building beautiful & intuitive user experiences."/g, `bio = "${bio}"`);
    code = code.replace(/followers = "12.5k"/g, `followers = "${followers}"`);
    code = code.replace(/posts = "148"/g, `posts = "${posts}"`);
    
    // Replace CSS variables theme defaults
    code = code.replace(/"--card-bg": theme.cardBg \|\| "#1a1a1f"/g, `"--card-bg": theme.cardBg || "${theme.cardBg}"`);
    code = code.replace(/"--accent-color": theme.accentColor \|\| "#ffffff"/g, `"--accent-color": theme.accentColor || "${theme.accentColor}"`);
    code = code.replace(/"--btn-text-color": theme.btnTextColor \|\| "#111113"/g, `"--btn-text-color": theme.btnTextColor || "${theme.btnTextColor}"`);
    code = code.replace(/"--badge-color": theme.badgeColor \|\| "#22c55e"/g, `"--badge-color": theme.badgeColor || "${theme.badgeColor}"`);
    
    // Replace hexes in stylesheet if it's CSS
    code = code.replace(/background: var\(--card-bg, #1a1a1f\);/g, `background: var(--card-bg, ${theme.cardBg});`);
    code = code.replace(/background: linear-gradient\(to bottom, transparent, var\(--card-bg, #1a1a1f\)\);/g, `background: linear-gradient(to bottom, transparent, var(--card-bg, ${theme.cardBg}));`);
    code = code.replace(/background: var\(--accent-color, #fff\);/g, `background: var(--accent-color, ${theme.accentColor});`);
    code = code.replace(/color: var\(--btn-text-color, #111113\);/g, `color: var(--btn-text-color, ${theme.btnTextColor});`);
    code = code.replace(/background: var\(--badge-color, #22c55e\);/g, `background: var(--badge-color, ${theme.badgeColor});`);
    
    // Replace hexes in Tailwind styles
    code = code.replace(/bg-\[#1a1a1f\]/g, `bg-[${theme.cardBg}]`);
    code = code.replace(/to-\[#1a1a1f\]/g, `to-[${theme.cardBg}]`);
    code = code.replace(/bg-\[#22c55e\]/g, `bg-[${theme.badgeColor}]`);
    code = code.replace(/bg-white/g, `bg-[${theme.accentColor}]`);
    code = code.replace(/text-\[#111113\]/g, `text-[${theme.btnTextColor}]`);
    code = code.replace(/hover:bg-\[#e8e8f0\]/g, `hover:opacity-90`);
    
    return code;
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

      {/* Tab Content Display */}
      <div className="docs-tabs-content">
        {activeTab === "preview" ? (
          <div className="tab-preview-pane">
            <div className="customizer-layout">
              <div className="customizer-preview-col">
                <ProfileCard 
                  image={customImg || undefined}
                  name={name}
                  bio={bio}
                  followers={followers}
                  posts={posts}
                  theme={theme}
                />
              </div>
              
              <div className="customizer-panel-col">
                <div className="customizer-section-title">Card Content</div>
                <div className="customizer-input-grid">
                  <div className="customizer-field">
                    <label className="customizer-label">Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="customizer-input" 
                    />
                  </div>
                  <div className="customizer-field-span-2">
                    <label className="customizer-label">Avatar Photo</label>
                    <div className="customizer-image-input-group" style={{ display: "flex", gap: "8px" }}>
                      <input 
                        type="text" 
                        value={customImg.startsWith("blob:") ? "Local Upload" : customImg} 
                        placeholder="Paste URL or upload..."
                        onChange={(e) => setCustomImg(e.target.value)} 
                        className="customizer-input" 
                        style={{ flex: 1 }}
                        disabled={customImg.startsWith("blob:")}
                      />
                      <label className="customizer-upload-btn">
                        Upload
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          style={{ display: "none" }}
                        />
                      </label>
                      {customImg && (
                        <button 
                          onClick={() => setCustomImg("")}
                          className="customizer-trash-btn"
                          title="Reset photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="customizer-field-span-2">
                    <label className="customizer-label">Bio Description</label>
                    <textarea 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      className="customizer-textarea" 
                      rows={2}
                    />
                  </div>
                  <div className="customizer-field">
                    <label className="customizer-label">Followers Count</label>
                    <input 
                      type="text" 
                      value={followers} 
                      onChange={(e) => setFollowers(e.target.value)} 
                      className="customizer-input" 
                    />
                  </div>
                  <div className="customizer-field">
                    <label className="customizer-label">Posts Count</label>
                    <input 
                      type="text" 
                      value={posts} 
                      onChange={(e) => setPosts(e.target.value)} 
                      className="customizer-input" 
                    />
                  </div>
                </div>

                <div className="customizer-section-title" style={{ marginTop: "24px" }}>Theme Presets</div>
                <div className="theme-presets-row">
                  {THEME_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyThemePreset(preset)}
                      className={`theme-preset-btn ${selectedPresetName === preset.name ? "active" : ""}`}
                      style={{ borderLeft: `4px solid ${preset.theme.accentColor}` }}
                    >
                      <div className="preset-btn-name">{preset.name}</div>
                    </button>
                  ))}
                </div>

                <div className="customizer-section-title" style={{ marginTop: "24px" }}>Custom Colors</div>
                <div className="customizer-colors-grid">
                  <div className="customizer-color-field">
                    <label className="color-field-label">Card BG</label>
                    <div className="color-picker-wrapper">
                      <input 
                        type="color" 
                        value={theme.cardBg} 
                        onChange={(e) => handleColorChange("cardBg", e.target.value)} 
                        className="customizer-color-input"
                      />
                      <span className="color-hex-text">{theme.cardBg.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="customizer-color-field">
                    <label className="color-field-label">Button Accent</label>
                    <div className="color-picker-wrapper">
                      <input 
                        type="color" 
                        value={theme.accentColor} 
                        onChange={(e) => handleColorChange("accentColor", e.target.value)} 
                        className="customizer-color-input"
                      />
                      <span className="color-hex-text">{theme.accentColor.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="customizer-color-field">
                    <label className="color-field-label">Badge Accent</label>
                    <div className="color-picker-wrapper">
                      <input 
                        type="color" 
                        value={theme.badgeColor} 
                        onChange={(e) => handleColorChange("badgeColor", e.target.value)} 
                        className="customizer-color-input"
                      />
                      <span className="color-hex-text">{theme.badgeColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="tab-code-pane">
            <div className="multi-code-container">
              {/* Format selectors row */}
              <div className="format-selectors-row">
                <div className="selector-group">
                  <span className="selector-label">Language:</span>
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
                  <span className="selector-label">Styling:</span>
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

              {/* Component Code Section */}
              <div className="code-section-header">
                <span className="section-title">Component Code ({langType.toUpperCase()})</span>
                <button
                  onClick={() => handleCopyCode(getCustomizedCode(currentDoc.code[langType][styleType]))}
                  className="docs-copy-source-btn"
                >
                  {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  <span>{copiedCode ? "Copied!" : "Copy Component"}</span>
                </button>
              </div>
              <pre className="code-pre-element">
                <code>{getCustomizedCode(currentDoc.code[langType][styleType])}</code>
              </pre>

              {/* CSS Section (Only show if styleType === 'css') */}
              {styleType === "css" && currentDoc.css && (
                <div className="css-code-section" style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="code-section-header">
                    <span className="section-title">CSS Stylesheet</span>
                    <button
                      onClick={() => handleCopyCSS(getCustomizedCode(currentDoc.css))}
                      className="docs-copy-source-btn"
                    >
                      {copiedCSS ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{copiedCSS ? "Copied!" : "Copy CSS"}</span>
                    </button>
                  </div>
                  <pre className="code-pre-element">
                    <code>{getCustomizedCode(currentDoc.css)}</code>
                  </pre>
                </div>
              )}

              {styleType === "tailwind" && (
                <div className="tailwind-info-note" style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", fontSize: "12.5px", color: "var(--muted)" }}>
                  💡 <strong>Note:</strong> Tailwind utility classes are applied directly to the component markup. No separate CSS stylesheet is needed!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* Customizer side-by-side layout styling */
        .customizer-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          padding: 24px;
          background: rgba(255,255,255,0.01);
        }

        @media (min-width: 768px) {
          .customizer-layout {
            grid-template-columns: 320px 1fr;
          }
        }

        .customizer-preview-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
          background: rgba(0,0,0,0.2);
          border-radius: 16px;
          border: 1px dashed rgba(255,255,255,0.06);
          min-height: 500px;
        }

        .customizer-panel-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
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

        @media (min-width: 1024px) {
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

        .customizer-textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #ffffff;
          padding: 8px 12px;
          font-size: 13px;
          transition: all 0.2s ease;
          outline: none;
          resize: none;
          font-family: inherit;
        }

        .customizer-textarea:focus {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
        }

        .customizer-upload-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #ffffff;
          padding: 8px 12px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .customizer-upload-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }

        .customizer-trash-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          color: #ef4444;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .customizer-trash-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .theme-presets-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .theme-preset-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          color: #ffffff;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .theme-preset-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
        }

        .theme-preset-btn.active {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .customizer-colors-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .customizer-color-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 120px;
        }

        .color-field-label {
          font-size: 11px;
          font-weight: 600;
          color: #8e8e93;
        }

        .color-picker-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 4px 10px 4px 6px;
        }

        .customizer-color-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
          border: none;
          width: 28px;
          height: 28px;
          cursor: pointer;
          padding: 0;
        }

        .customizer-color-input::-webkit-color-swatch {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          padding: 0;
        }

        .customizer-color-input::-moz-color-swatch {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          padding: 0;
        }

        .color-hex-text {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
