import { useState, useEffect } from "react";
import { Copy, Check, Search, Hash, Minimize2 } from "lucide-react";

export default function PxToRemConverter() {
  const [pxValue, setPxValue] = useState("16");
  const [remValue, setRemValue] = useState("1");
  const [twValue, setTwValue] = useState("4");
  const [basePx, setBasePx] = useState("16"); // Default root font-size (16px)

  const [searchQuery, setSearchQuery] = useState("");
  const [copiedRowId, setCopiedRowId] = useState("");

  // Recalculations from Pixels
  const handlePxChange = (val) => {
    setPxValue(val);
    const num = parseFloat(val);
    const base = parseFloat(basePx) || 16;
    if (!isNaN(num) && base > 0) {
      setRemValue(String(Math.round((num / base) * 1000) / 1000));
      setTwValue(String(Math.round((num / 4) * 100) / 100));
    } else {
      setRemValue("");
      setTwValue("");
    }
  };

  // Recalculations from REM
  const handleRemChange = (val) => {
    setRemValue(val);
    const num = parseFloat(val);
    const base = parseFloat(basePx) || 16;
    if (!isNaN(num) && base > 0) {
      const computedPx = Math.round(num * base * 100) / 100;
      setPxValue(String(computedPx));
      setTwValue(String(Math.round((computedPx / 4) * 100) / 100));
    } else {
      setPxValue("");
      setTwValue("");
    }
  };

  // Recalculations from Tailwind Scale
  const handleTwChange = (val) => {
    setTwValue(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const computedPx = Math.round(num * 4 * 100) / 100;
      const base = parseFloat(basePx) || 16;
      setPxValue(String(computedPx));
      setRemValue(String(Math.round((computedPx / base) * 1000) / 1000));
    } else {
      setPxValue("");
      setRemValue("");
    }
  };

  // Adjusting base px size recalculates values
  useEffect(() => {
    const num = parseFloat(pxValue);
    const base = parseFloat(basePx) || 16;
    if (!isNaN(num) && base > 0) {
      setRemValue(String(Math.round((num / base) * 1000) / 1000));
    }
  }, [basePx]);

  // Standard Tailwind Spacing scale definitions
  const tailwindSpacingScale = [
    { tw: "0", px: 0, rem: 0 },
    { tw: "0.5", px: 2, rem: 0.125 },
    { tw: "1", px: 4, rem: 0.25 },
    { tw: "1.5", px: 6, rem: 0.375 },
    { tw: "2", px: 8, rem: 0.5 },
    { tw: "2.5", px: 10, rem: 0.625 },
    { tw: "3", px: 12, rem: 0.75 },
    { tw: "3.5", px: 14, rem: 0.875 },
    { tw: "4", px: 16, rem: 1 },
    { tw: "5", px: 20, rem: 1.25 },
    { tw: "6", px: 24, rem: 1.5 },
    { tw: "7", px: 28, rem: 1.75 },
    { tw: "8", px: 32, rem: 2 },
    { tw: "9", px: 36, rem: 2.25 },
    { tw: "10", px: 40, rem: 2.5 },
    { tw: "11", px: 44, rem: 2.75 },
    { tw: "12", px: 48, rem: 3 },
    { tw: "14", px: 56, rem: 3.5 },
    { tw: "16", px: 64, rem: 4 },
    { tw: "20", px: 80, rem: 5 },
    { tw: "24", px: 96, rem: 6 },
    { tw: "28", px: 112, rem: 7 },
    { tw: "32", px: 128, rem: 8 },
    { tw: "36", px: 144, rem: 9 },
    { tw: "40", px: 160, rem: 10 },
    { tw: "44", px: 176, rem: 11 },
    { tw: "48", px: 192, rem: 12 },
    { tw: "52", px: 208, rem: 13 },
    { tw: "56", px: 224, rem: 14 },
    { tw: "60", px: 240, rem: 15 },
    { tw: "64", px: 256, rem: 16 },
    { tw: "72", px: 288, rem: 18 },
    { tw: "80", px: 320, rem: 20 },
    { tw: "96", px: 384, rem: 24 },
  ];

  const filteredScale = tailwindSpacingScale.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.tw.includes(q) ||
      String(item.px).includes(q) ||
      String(item.rem).includes(q)
    );
  });

  const handleCopyClass = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedRowId(id);
    setTimeout(() => setCopiedRowId(""), 1500);
  };

  return (
    <div className="px-to-rem-container text-zinc-100 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Panel */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Px to Rem & Tailwind Calculator</span>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-zinc-300 font-normal">Utility</span>
        </h2>
        <p className="text-sm text-zinc-400">
          Convert pixel measurements to REM units and Tailwind spacing classes instantly. Type in any field to recalculate the others dynamically.
        </p>
      </div>

      {/* SECTION 1: CONVERTER BOX */}
      <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Minimize2 size={13} className="text-indigo-400" />
            <span>Interactive Converter</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400">Base Root Font-size:</span>
            <input
              type="number"
              value={basePx}
              onChange={(e) => setBasePx(e.target.value)}
              className="w-12 bg-zinc-900/60 border border-white/5 rounded px-2 py-0.5 font-mono text-xs text-center text-white focus:outline-none focus:border-white/20"
            />
            <span className="text-[10px] text-zinc-500">px</span>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pixel Card */}
          <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
            <label className="text-xs text-zinc-300 font-semibold">Pixels (px)</label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={pxValue}
                onChange={(e) => handlePxChange(e.target.value)}
                placeholder="0"
                className="w-full bg-zinc-900/60 border border-white/5 rounded-lg pl-3 pr-8 py-2 font-mono text-sm text-white focus:outline-none focus:border-white/20"
              />
              <span className="absolute right-3 text-xs text-zinc-500 font-mono">px</span>
            </div>
            <span className="text-[10px] text-zinc-500">Traditional CSS designs metric.</span>
          </div>

          {/* REM Card */}
          <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
            <label className="text-xs text-zinc-300 font-semibold">REM (rem)</label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={remValue}
                onChange={(e) => handleRemChange(e.target.value)}
                placeholder="0"
                className="w-full bg-zinc-900/60 border border-white/5 rounded-lg pl-3 pr-10 py-2 font-mono text-sm text-white focus:outline-none focus:border-white/20"
              />
              <span className="absolute right-3 text-xs text-zinc-500 font-mono">rem</span>
            </div>
            <span className="text-[10px] text-zinc-500">Relative browser font root metric.</span>
          </div>

          {/* Tailwind Card */}
          <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
            <label className="text-xs text-zinc-300 font-semibold">Tailwind Spacing Value</label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={twValue}
                onChange={(e) => handleTwChange(e.target.value)}
                placeholder="0"
                className="w-full bg-zinc-900/60 border border-white/5 rounded-lg pl-3 pr-10 py-2 font-mono text-sm text-white focus:outline-none focus:border-white/20"
              />
              <span className="absolute right-3 text-xs text-zinc-500 font-mono">scale</span>
            </div>
            <span className="text-[10px] text-zinc-500">Equivalent spacing index (e.g. `p-4` = 4).</span>
          </div>
        </div>

        {/* Dynamic Class Output Suggestion Box */}
        <div className="border-t border-white/5 pt-4 mt-1 flex flex-col gap-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Suggested Tailwind Classes</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { type: "Width / Height", prefix: "w-", prefix2: "h-" },
              { type: "Padding", prefix: "p-", prefix2: "px-" },
              { type: "Margin", prefix: "m-", prefix2: "my-" },
              { type: "Border Radius", prefix: "rounded-" },
            ].map((item, idx) => {
              // Check if twValue is an integer/half to map directly
              const isStandard =
                twValue && parseFloat(twValue) % 0.5 === 0 && parseFloat(twValue) <= 96;
              const classStr = isStandard
                ? `${item.prefix}${twValue}`
                : `${item.prefix}[${pxValue}px]`;

              return (
                <div
                  key={idx}
                  className="bg-zinc-900/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2 relative group hover:border-white/10 transition"
                >
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{item.type}</span>
                  <div className="flex justify-between items-center">
                    <code className="text-xs text-white font-mono">{classStr}</code>
                    <button
                      onClick={() => handleCopyClass(classStr, `suggest-${idx}`)}
                      className="text-zinc-500 hover:text-white transition"
                    >
                      {copiedRowId === `suggest-${idx}` ? (
                        <Check size={12} className="text-green-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: CHEAT SHEET TABLE */}
      <div className="bg-zinc-950/70 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Hash size={13} className="text-indigo-400" />
            <span>Tailwind Spacing Chart</span>
          </span>
          {/* Search bar */}
          <div className="relative flex items-center w-full sm:w-64">
            <Search size={13} className="absolute left-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search scale (e.g. 16px, 1.5rem, 4)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        {/* Cheat sheet table */}
        <div className="w-full overflow-x-auto rounded-xl border border-white/5 max-h-[360px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-900/80 text-zinc-400 border-b border-white/5 font-semibold">
                <th className="p-3">Tailwind Scale</th>
                <th className="p-3">Pixels (px)</th>
                <th className="p-3">REM (rem)</th>
                <th className="p-3">Sample Classes</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredScale.length > 0 ? (
                filteredScale.map((item, index) => {
                  const exampleClass = `p-${item.tw}`;
                  return (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/2 transition bg-zinc-900/10"
                    >
                      <td className="p-3 font-mono font-bold text-white">{item.tw}</td>
                      <td className="p-3 font-mono text-zinc-300">{item.px}px</td>
                      <td className="p-3 font-mono text-zinc-300">{item.rem}rem</td>
                      <td className="p-3 font-mono text-zinc-400">
                        <code>{`w-${item.tw} | p-${item.tw} | m-${item.tw}`}</code>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleCopyClass(exampleClass, `row-${index}`)}
                          className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/5 transition inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                        >
                          {copiedRowId === `row-${index}` ? (
                            <>
                              <Check size={10} className="text-green-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={10} />
                              <span>Copy p-{item.tw}</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-zinc-500">
                    No spacing scales found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
