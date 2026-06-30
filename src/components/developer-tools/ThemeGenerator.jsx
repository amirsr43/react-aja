import { useState } from "react";
import { Copy, Check, Palette, Sparkles } from "lucide-react";

export default function ThemeGenerator() {
  const presets = {
    indigoCyber: {
      name: "Indigo Cyber (Default)",
      primary: "#6366f1",
      secondary: "#a5b4fc",
      accent: "#818cf8",
      success: "#10b981",
      background: "#09090b",
    },
    emeraldForest: {
      name: "Emerald Forest",
      primary: "#10b981",
      secondary: "#6ee7b7",
      accent: "#34d399",
      success: "#059669",
      background: "#022c22",
    },
    amberRetro: {
      name: "Amber Cyber",
      primary: "#f59e0b",
      secondary: "#fde047",
      accent: "#fbbf24",
      success: "#10b981",
      background: "#1c1917",
    },
    roseQuartz: {
      name: "Rose Aura",
      primary: "#ec4899",
      secondary: "#fbcfe8",
      accent: "#f472b6",
      success: "#10b981",
      background: "#1c0d16",
    },
    crimsonNeon: {
      name: "Crimson Eclipse",
      primary: "#f43f5e",
      secondary: "#fda4af",
      accent: "#fb7185",
      success: "#10b981",
      background: "#0f0505",
    },
    slateMinimal: {
      name: "Slate Minimalist",
      primary: "#ffffff",
      secondary: "#94a3b8",
      accent: "#cbd5e1",
      success: "#10b981",
      background: "#0f172a",
    },
  };

  const [colors, setColors] = useState(presets.indigoCyber);
  const [copiedType, setCopiedType] = useState(""); // "" | "css" | "tailwind"

  const handleColorChange = (key, value) => {
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const loadPreset = (presetName) => {
    if (presets[presetName]) {
      setColors(presets[presetName]);
    }
  };

  const getCssOutput = () => {
    return `:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --success: ${colors.success};
  --background: ${colors.background};
}`;
  };

  const getTailwindOutput = () => {
    return `// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: "${colors.primary}",
        secondary: "${colors.secondary}",
        accent: "${colors.accent}",
        success: "${colors.success}",
        background: "${colors.background}",
      }
    }
  }
}`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(""), 2000);
  };

  return (
    <div className="theme-generator-container text-zinc-100 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Description header */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Theme & Color Generator</span>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-zinc-300 font-normal">Utility</span>
        </h2>
        <p className="text-sm text-zinc-400">
          Design color palettes, preview them instantly in standard UI components, and generate matching CSS Custom Variables or Tailwind CSS configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Pickers & Presets (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Preset selector */}
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-indigo-400" />
              <span>Theme Presets</span>
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => loadPreset(key)}
                  className="text-xs py-2 px-3 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 text-left transition flex items-center gap-2 group"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-white/10"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <span className="truncate group-hover:text-white text-zinc-300">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color pickers */}
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Palette size={13} className="text-indigo-400" />
              <span>Customize Colors</span>
            </span>

            <div className="flex flex-col gap-3.5 mt-1">
              {[
                { label: "Primary (Brand)", key: "primary" },
                { label: "Secondary (Subtle)", key: "secondary" },
                { label: "Accent / Glow", key: "accent" },
                { label: "Success / Positive", key: "success" },
                { label: "Background", key: "background" },
              ].map((colorItem) => (
                <div key={colorItem.key} className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-200">{colorItem.label}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{colors[colorItem.key].toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={colors[colorItem.key]}
                      onChange={(e) => handleColorChange(colorItem.key, e.target.value)}
                      className="bg-zinc-900/60 border border-white/5 rounded-lg px-2 py-1 font-mono text-xs w-20 text-center focus:outline-none focus:border-white/20"
                    />
                    <input
                      type="color"
                      value={colors[colorItem.key]}
                      onChange={(e) => handleColorChange(colorItem.key, e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-white/10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Preview & Code (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Live component preview sandbox */}
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Preview Sandbox</span>

            <div
              className="p-6 rounded-xl border border-white/5 transition duration-300 relative overflow-hidden flex flex-col gap-6 min-h-[250px]"
              style={{ backgroundColor: colors.background }}
            >
              {/* Decorative light ambient glow */}
              <div
                className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none transition duration-300"
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none transition duration-300"
                style={{ backgroundColor: colors.accent }}
              />

              {/* Navigation Header mockup */}
              <div className="flex justify-between items-center border-b pb-3" style={{ borderBottomColor: `${colors.primary}15` }}>
                <span className="text-sm font-bold tracking-wider" style={{ color: colors.primary }}>
                  APP_PREVIEW
                </span>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.secondary }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }} />
                </div>
              </div>

              {/* Card & Details mockup */}
              <div className="flex flex-col gap-4 relative z-10">
                <div
                  className="p-4 rounded-xl border transition duration-300 flex flex-col gap-3 backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderColor: `${colors.primary}1a`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Storage Analytics</h4>
                      <h3 className="text-lg font-bold mt-1 text-white">Dynamic User Theme</h3>
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold transition duration-300"
                      style={{
                        backgroundColor: `${colors.success}15`,
                        color: colors.success,
                        border: `1px solid ${colors.success}30`,
                      }}
                    >
                      Active Theme
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Notice how changing colors in the left panel updates the primary buttons, shadows, gradients, and active badge status text instantly.
                  </p>

                  {/* Progress bar mockup */}
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Server Status: Online</span>
                      <span style={{ color: colors.primary }}>75% Used</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: "75%",
                          backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons row */}
                <div className="flex flex-wrap gap-3 mt-1">
                  <button
                    className="text-xs px-4 py-2 rounded-lg font-semibold shadow-lg transition-transform active:scale-95 duration-200"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.background === "#ffffff" ? "#000000" : "#ffffff",
                      boxShadow: `0 4px 14px ${colors.primary}30`,
                    }}
                  >
                    Primary Button
                  </button>

                  <button
                    className="text-xs px-4 py-2 rounded-lg font-semibold border transition duration-300 hover:bg-white/5 active:scale-95"
                    style={{
                      borderColor: `${colors.primary}50`,
                      color: colors.primary,
                    }}
                  >
                    Outline Style
                  </button>

                  <span
                    className="text-xs px-3 py-2 rounded-lg font-mono"
                    style={{
                      color: colors.secondary,
                    }}
                  >
                    Secondary Text
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code Output tabs */}
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Export Configuration</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CSS Variables card */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-300">CSS Custom Variables</span>
                  <button
                    onClick={() => copyToClipboard(getCssOutput(), "css")}
                    className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition flex items-center gap-1"
                  >
                    {copiedType === "css" ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                    <span>{copiedType === "css" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <pre className="bg-zinc-900/60 border border-white/5 rounded-xl p-3 font-mono text-[10px] text-zinc-400 overflow-x-auto whitespace-pre leading-relaxed select-all">
                  {getCssOutput()}
                </pre>
              </div>

              {/* Tailwind config extend card */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-300">Tailwind Config Extend</span>
                  <button
                    onClick={() => copyToClipboard(getTailwindOutput(), "tailwind")}
                    className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition flex items-center gap-1"
                  >
                    {copiedType === "tailwind" ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                    <span>{copiedType === "tailwind" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <pre className="bg-zinc-900/60 border border-white/5 rounded-xl p-3 font-mono text-[10px] text-zinc-400 overflow-x-auto whitespace-pre leading-relaxed select-all">
                  {getTailwindOutput()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
