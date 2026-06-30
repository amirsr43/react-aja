import { useState, useEffect } from "react";
import { Copy, Check, Info, RefreshCw } from "lucide-react";

export default function SvgToJsxConverter() {
  const [rawSvg, setRawSvg] = useState("");
  const [componentName, setComponentName] = useState("MyIcon");
  const [replaceColors, setReplaceColors] = useState(true);
  const [wrapComponent, setWrapComponent] = useState(true);
  const [outputCode, setOutputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
</svg>`;

  useEffect(() => {
    if (!rawSvg.trim()) {
      setOutputCode("");
      setError("");
      return;
    }

    try {
      // 1. Clean SVG & detect script tags to prevent trivial exploits
      if (/<script/i.test(rawSvg)) {
        throw new Error("Script tags are not allowed inside SVG code.");
      }

      // Find SVG tag
      const svgMatch = rawSvg.match(/<svg[\s\S]*?>[\s\S]*?<\/svg>/i);
      if (!svgMatch) {
        throw new Error("Could not find a valid <svg> tag in the input.");
      }

      let svgBody = svgMatch[0];

      // Convert standard SVG attributes to camelCase React attributes
      const replacements = [
        { regex: /class=/g, replacement: "className=" },
        { regex: /stroke-width=/g, replacement: "strokeWidth=" },
        { regex: /stroke-linecap=/g, replacement: "strokeLinecap=" },
        { regex: /stroke-linejoin=/g, replacement: "strokeLinejoin=" },
        { regex: /stroke-miterlimit=/g, replacement: "strokeMiterlimit=" },
        { regex: /stroke-dasharray=/g, replacement: "strokeDasharray=" },
        { regex: /stroke-dashoffset=/g, replacement: "strokeDashoffset=" },
        { regex: /fill-rule=/g, replacement: "fillRule=" },
        { regex: /clip-rule=/g, replacement: "clipRule=" },
        { regex: /fill-opacity=/g, replacement: "fillOpacity=" },
        { regex: /stroke-opacity=/g, replacement: "strokeOpacity=" },
        { regex: /stop-color=/g, replacement: "stopColor=" },
        { regex: /stop-opacity=/g, replacement: "stopOpacity=" },
        { regex: /font-family=/g, replacement: "fontFamily=" },
        { regex: /font-size=/g, replacement: "fontSize=" },
        { regex: /font-weight=/g, replacement: "fontWeight=" },
        { regex: /xml:space=/g, replacement: "xmlSpace=" },
        { regex: /xmlns:xlink=/g, replacement: "xmlnsXlink=" },
        { regex: /xlink:href=/g, replacement: "xlinkHref=" },
      ];

      replacements.forEach(({ regex, replacement }) => {
        svgBody = svgBody.replace(regex, replacement);
      });

      // Handle color replacements if enabled
      if (replaceColors) {
        // Replace absolute hex/rgb/color names inside fill/stroke properties with currentColor
        // Skips fill="none" or stroke="none"
        svgBody = svgBody.replace(/fill="(?!none|currentColor)[^"]+"/gi, 'fill="currentColor"');
        svgBody = svgBody.replace(/stroke="(?!none|currentColor)[^"]+"/gi, 'stroke="currentColor"');
      }

      // Add className={className} and {...props} dynamically into <svg ...>
      // First check if there's already a className attribute
      if (/className=/i.test(svgBody)) {
        svgBody = svgBody.replace(/<svg([\s\S]*?)className="([^"]*)"([\s\S]*?)>/i, (match, before, classes, after) => {
          return `<svg${before}className={\`\${className} ${classes}\`}${after} {...props}>`;
        });
      } else {
        svgBody = svgBody.replace(/<svg([\s\S]*?)>/i, '<svg$1 className={className} {...props}>');
      }

      // Generate output React Component
      let finalCode = "";
      if (wrapComponent) {
        const cleanCompName = componentName.trim().replace(/[^a-zA-Z0-9]/g, "") || "MyIcon";
        finalCode = `import React from "react";

export default function ${cleanCompName}({ className = "w-6 h-6", ...props }) {
  return (
    ${svgBody.split("\n").map((line, i) => (i === 0 ? line : "    " + line)).join("\n")}
  );
}`;
      } else {
        finalCode = svgBody;
      }

      setOutputCode(finalCode);
      setError("");
    } catch (err) {
      setError(err.message || "Invalid SVG code. Please check your syntax.");
      setOutputCode("");
    }
  }, [rawSvg, componentName, replaceColors, wrapComponent]);

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setRawSvg(sampleSvg);
  };

  const clearInput = () => {
    setRawSvg("");
  };

  return (
    <div className="svg-converter-container text-zinc-100 flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>SVG to JSX Converter</span>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-zinc-300 font-normal">Utility</span>
        </h2>
        <p className="text-sm text-zinc-400">
          Paste your raw SVG code (from Figma, Illustrator, or Heroicons) and instantly convert it into a clean, customizable React component.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Inputs & Options */}
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-300">Paste raw SVG here:</label>
              <div className="flex gap-2">
                <button
                  onClick={loadSample}
                  className="text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition"
                >
                  Load Sample
                </button>
                <button
                  onClick={clearInput}
                  className="text-xs px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={rawSvg}
              onChange={(e) => setRawSvg(e.target.value)}
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" ... > ... </svg>'
              className="w-full h-64 bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-xs font-mono focus:outline-none focus:border-white/20 text-zinc-200 resize-y"
            />

            {/* Customizer Options */}
            <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Conversion Settings</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-300">Component Name</label>
                  <input
                    type="text"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    disabled={!wrapComponent}
                    className="bg-zinc-900/50 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-white/20 disabled:opacity-40"
                  />
                </div>

                <div className="flex flex-col justify-end gap-2.5 py-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none">
                    <input
                      type="checkbox"
                      checked={replaceColors}
                      onChange={(e) => setReplaceColors(e.target.checked)}
                      className="rounded border-white/10 bg-zinc-900 text-white focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Replace colors with <code className="bg-white/5 px-1 rounded text-zinc-200">currentColor</code></span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none">
                    <input
                      type="checkbox"
                      checked={wrapComponent}
                      onChange={(e) => setWrapComponent(e.target.checked)}
                      className="rounded border-white/10 bg-zinc-900 text-white focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Wrap in React Component</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Render Preview */}
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Preview</span>
            <div className="w-full h-32 bg-zinc-900/30 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              {error ? (
                <span className="text-xs text-red-400 px-4 text-center">{error}</span>
              ) : rawSvg ? (
                <div 
                  className="w-16 h-16 text-white flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: rawSvg }}
                />
              ) : (
                <span className="text-xs text-zinc-500">Awaiting SVG input...</span>
              )}
            </div>
            <div className="flex items-start gap-2 text-[11px] text-zinc-400 mt-1">
              <Info size={14} className="text-zinc-500 shrink-0 mt-0.5" />
              <span>In preview mode, the SVG renders exactly as pasted. In output mode, width, height, colors, and responsive styles will be dynamically wrapped.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Output JSX */}
        <div className="flex flex-col">
          <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-300">Generated React Code:</label>
              <button
                onClick={handleCopy}
                disabled={!outputCode}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition disabled:opacity-40 disabled:pointer-events-none"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy JSX"}</span>
              </button>
            </div>

            <div className="w-full flex-grow bg-zinc-900/50 border border-white/5 rounded-xl p-4 font-mono text-xs overflow-auto max-h-[480px] min-h-[300px] relative text-zinc-300">
              {outputCode ? (
                <pre className="whitespace-pre">{outputCode}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2">
                  <RefreshCw size={24} className="animate-spin text-zinc-600" />
                  <span>Waiting for valid SVG code...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
