// src/data/codes/interactive3DText.js

const SNIPPET_JS_CSS = `// Interactive3DText.jsx (JavaScript + Custom CSS)
import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import "./Interactive3DText.css"; // Include the CSS stylesheet below

const LETTER_FONT = "'Outfit', 'Plus Jakarta Sans', 'Arial Black', sans-serif";

function buildExtrusion(depthTop, depthBot, steps = 26) {
  const layers = [];
  for (let i = 1; i <= steps; i++) {
    layers.push(\`\${i * 1.2}px \${i * 0.9}px 0 \${i < 4 ? depthTop : depthBot}\`);
  }
  return layers.join(", ");
}

const DEFAULT_COLORS = [
  {
    faceGradient: "linear-gradient(160deg, #dbbfff 0%, #a78bfa 38%, #7c3aed 80%, #5b21b6 100%)",
    depthTop: "#a78bfa", depthBot: "#3b0f8c",
    glowColor: "rgba(124, 58, 237, 0.6)", groundSize: { w: "90%", h: "28px" },
  },
  {
    faceGradient: "linear-gradient(160deg, #ffbef9 0%, #f472e8 38%, #db2777 75%, #9d174d 100%)",
    depthTop: "#f472e8", depthBot: "#831843",
    glowColor: "rgba(219, 39, 119, 0.65)", groundSize: { w: "80%", h: "28px" },
  },
  {
    faceGradient: "linear-gradient(160deg, #ffbef9 0%, #f472e8 38%, #db2777 75%, #9d174d 100%)",
    depthTop: "#f472e8", depthBot: "#831843",
    glowColor: "rgba(219, 39, 119, 0.65)", groundSize: { w: "80%", h: "28px" },
  },
  {
    faceGradient: "linear-gradient(160deg, #dbbfff 0%, #a78bfa 38%, #7c3aed 80%, #5b21b6 100%)",
    depthTop: "#a78bfa", depthBot: "#3b0f8c",
    glowColor: "rgba(124, 58, 237, 0.6)", groundSize: { w: "75%", h: "28px" },
  },
];

function InteractiveLetter({ char, index, colors }) {
  const ref = useRef(null);
  const springCfg = { stiffness: 200, damping: 16, mass: 0.55 };
  const rotateX = useSpring(-8, springCfg);
  const rotateY = useSpring(0, springCfg);
  const scale   = useSpring(1, springCfg);
  const color   = colors[index % colors.length];
  const extrusion = buildExtrusion(color.depthTop, color.depthBot, 26);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const cy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    rotateX.set(-8 + (-cy * 20));
    rotateY.set(cx * 20);
  };

  return (
    <motion.div
      ref={ref}
      className="i3d-letter-root"
      style={{ rotateX, rotateY, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => scale.set(1.06)}
      onMouseLeave={() => { rotateX.set(-8); rotateY.set(0); scale.set(1); }}
    >
      <div className="i3d-ground" style={{ width: color.groundSize.w, height: color.groundSize.h, background: color.glowColor }} />
      <span className="i3d-depth" style={{ color: color.depthTop, textShadow: extrusion }} aria-hidden="true">{char}</span>
      <span className="i3d-face"  style={{ backgroundImage: color.faceGradient }}>{char}</span>
      <span className="i3d-gloss" aria-hidden="true">{char}</span>
      <span className="i3d-rim"   aria-hidden="true">{char}</span>
    </motion.div>
  );
}

export default function Interactive3DText({ text = "LOOP", colors = DEFAULT_COLORS }) {
  return (
    <div className="i3d-wrapper">
      <div className="i3d-ambient" />
      <div className="i3d-scene">
        {text.split("").map((char, i) => (
          <InteractiveLetter key={i} char={char} index={i} colors={colors} />
        ))}
      </div>
    </div>
  );
}`;

const SNIPPET_JS_TW = `// Interactive3DText.jsx (JavaScript + Tailwind CSS)
import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";

const LETTER_FONT = "'Outfit', 'Plus Jakarta Sans', 'Arial Black', sans-serif";

function buildExtrusion(depthTop, depthBot, steps = 26) {
  const layers = [];
  for (let i = 1; i <= steps; i++) {
    layers.push(\`\${i * 1.2}px \${i * 0.9}px 0 \${i < 4 ? depthTop : depthBot}\`);
  }
  return layers.join(", ");
}

const DEFAULT_COLORS = [
  {
    faceGradient: "linear-gradient(160deg, #dbbfff 0%, #a78bfa 38%, #7c3aed 80%, #5b21b6 100%)",
    depthTop: "#a78bfa", depthBot: "#3b0f8c",
    glowColor: "rgba(124, 58, 237, 0.6)", groundSize: { w: "90%", h: "28px" },
  },
  {
    faceGradient: "linear-gradient(160deg, #ffbef9 0%, #f472e8 38%, #db2777 75%, #9d174d 100%)",
    depthTop: "#f472e8", depthBot: "#831843",
    glowColor: "rgba(219, 39, 119, 0.65)", groundSize: { w: "80%", h: "28px" },
  },
  {
    faceGradient: "linear-gradient(160deg, #ffbef9 0%, #f472e8 38%, #db2777 75%, #9d174d 100%)",
    depthTop: "#f472e8", depthBot: "#831843",
    glowColor: "rgba(219, 39, 119, 0.65)", groundSize: { w: "80%", h: "28px" },
  },
  {
    faceGradient: "linear-gradient(160deg, #dbbfff 0%, #a78bfa 38%, #7c3aed 80%, #5b21b6 100%)",
    depthTop: "#a78bfa", depthBot: "#3b0f8c",
    glowColor: "rgba(124, 58, 237, 0.6)", groundSize: { w: "75%", h: "28px" },
  },
];

const LETTER_SIZE = "text-[clamp(80px,18vw,128px)] leading-none font-black";

function InteractiveLetter({ char, index, colors }) {
  const ref = useRef(null);
  const springCfg = { stiffness: 200, damping: 16, mass: 0.55 };
  const rotateX = useSpring(-8, springCfg);
  const rotateY = useSpring(0, springCfg);
  const scale   = useSpring(1, springCfg);
  const color   = colors[index % colors.length];
  const extrusion = buildExtrusion(color.depthTop, color.depthBot, 26);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rotateX.set(-8 + (-(e.clientY - r.top  - r.height/2) / (r.height/2)) * 20);
    rotateY.set(((e.clientX - r.left - r.width/2) / (r.width/2)) * 20);
  };

  return (
    <motion.div
      ref={ref}
      className="relative inline-block cursor-pointer select-none md:-mx-[0.05em] -mx-[0.11em] [transform-style:preserve-3d] hover:brightness-105"
      style={{ rotateX, rotateY, scale, fontFamily: LETTER_FONT }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => scale.set(1.06)}
      onMouseLeave={() => { rotateX.set(-8); rotateY.set(0); scale.set(1); }}
    >
      {/* Ground glow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-55 pointer-events-none"
           style={{ width: color.groundSize.w, height: color.groundSize.h, background: color.glowColor }} />
      {/* Extrusion depth */}
      <span className={\`block relative z-10 \${LETTER_SIZE}\`}
            style={{ color: color.depthTop, textShadow: extrusion, fontFamily: LETTER_FONT }} aria-hidden="true">{char}</span>
      {/* Face gradient */}
      <span className={\`absolute inset-0 block bg-clip-text text-transparent z-20 \${LETTER_SIZE}\`}
            style={{ backgroundImage: color.faceGradient, fontFamily: LETTER_FONT }}>{char}</span>
      {/* Gloss highlight */}
      <span className={\`absolute inset-0 block bg-clip-text text-transparent z-30 pointer-events-none \${LETTER_SIZE}\`}
            style={{ backgroundImage: "linear-gradient(175deg,rgba(255,255,255,.72) 0%,rgba(255,255,255,.32) 18%,rgba(255,255,255,.04) 38%,transparent 55%)", fontFamily: LETTER_FONT }} aria-hidden="true">{char}</span>
      {/* Rim light */}
      <span className={\`absolute inset-0 block bg-clip-text text-transparent z-30 pointer-events-none \${LETTER_SIZE}\`}
            style={{ backgroundImage: "linear-gradient(175deg,transparent 60%,rgba(255,255,255,.22) 90%,rgba(255,255,255,.12) 100%)", fontFamily: LETTER_FONT }} aria-hidden="true">{char}</span>
    </motion.div>
  );
}

export default function Interactive3DText({ text = "LOOP", colors = DEFAULT_COLORS }) {
  return (
    <div className="relative w-full flex items-center justify-center py-16 px-6 rounded-3xl overflow-hidden"
         style={{ background: "radial-gradient(ellipse at 50% 40%, #1a0e2e 0%, #080810 60%, #050508 100%)" }}>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 rounded-full pointer-events-none opacity-100"
           style={{ background: "radial-gradient(ellipse,rgba(167,100,255,.18) 0%,transparent 70%)", filter: "blur(40px)" }} />
      <div className="flex items-end justify-center [perspective:700px] [transform-style:preserve-3d] relative">
        {text.split("").map((char, i) => (
          <InteractiveLetter key={i} char={char} index={i} colors={colors} />
        ))}
      </div>
    </div>
  );
}`;

const SNIPPET_TS_CSS = SNIPPET_JS_CSS
  .replace("import React, { useRef } from", "import React, { useRef } from")
  .replace("// Interactive3DText.jsx (JavaScript + Custom CSS)", "// Interactive3DText.tsx (TypeScript + Custom CSS)")
  .replace(
    "function InteractiveLetter({ char, index, colors }) {",
    `interface ColorDef {
  faceGradient: string; depthTop: string; depthBot: string;
  glowColor: string; groundSize: { w: string; h: string };
}
function InteractiveLetter({ char, index, colors }: { char: string; index: number; colors: ColorDef[] }) {`
  )
  .replace(
    "export default function Interactive3DText({ text = \"LOOP\", colors = DEFAULT_COLORS }) {",
    "export default function Interactive3DText({ text = \"LOOP\", colors = DEFAULT_COLORS }: { text?: string; colors?: ColorDef[] }) {"
  );

const SNIPPET_TS_TW = SNIPPET_JS_TW
  .replace("// Interactive3DText.jsx (JavaScript + Tailwind CSS)", "// Interactive3DText.tsx (TypeScript + Tailwind CSS)")
  .replace(
    "function InteractiveLetter({ char, index, colors }) {",
    `interface ColorDef {
  faceGradient: string; depthTop: string; depthBot: string;
  glowColor: string; groundSize: { w: string; h: string };
}
function InteractiveLetter({ char, index, colors }: { char: string; index: number; colors: ColorDef[] }) {`
  )
  .replace(
    "export default function Interactive3DText({ text = \"LOOP\", colors = DEFAULT_COLORS }) {",
    "export default function Interactive3DText({ text = \"LOOP\", colors = DEFAULT_COLORS }: { text?: string; colors?: ColorDef[] }) {"
  );

export const interactive3DTextCode = {
  code: {
    js: {
      css: SNIPPET_JS_CSS,
      tailwind: SNIPPET_JS_TW,
    },
    ts: {
      css: SNIPPET_TS_CSS,
      tailwind: SNIPPET_TS_TW,
    },
  },
  css: `/* Interactive3DText.css */
.i3d-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px 72px;
  background: radial-gradient(ellipse at 50% 40%, #1a0e2e 0%, #080810 60%, #050508 100%);
  border-radius: 24px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.i3d-ambient {
  position: absolute;
  top: 20%; left: 50%;
  transform: translate(-50%, -50%);
  width: 65%; height: 55%;
  background: radial-gradient(ellipse, rgba(167,100,255,0.18) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(40px);
}

.i3d-scene {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  perspective: 700px;
  transform-style: preserve-3d;
  position: relative;
  font-size: clamp(80px, 18vw, 128px);
}

.i3d-letter-root {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin: 0 -0.05em;
  transform-style: preserve-3d;
  transition: filter 0.3s ease;
}

@media (max-width: 768px) {
  .i3d-letter-root {
    margin: 0 -0.11em;
  }
}

.i3d-letter-root:hover { filter: brightness(1.08); }

.i3d-depth, .i3d-face, .i3d-gloss, .i3d-rim {
  font-family: 'Outfit', 'Plus Jakarta Sans', 'Arial Black', sans-serif;
  font-weight: 900;
  font-size: inherit;
  line-height: 1;
  display: block;
}

.i3d-depth { position: relative; z-index: 1; }

.i3d-face {
  position: absolute; inset: 0; z-index: 2;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.i3d-gloss {
  position: absolute; inset: 0; z-index: 3; pointer-events: none;
  background: linear-gradient(175deg,rgba(255,255,255,.72) 0%,rgba(255,255,255,.32) 18%,rgba(255,255,255,.04) 38%,transparent 55%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.i3d-rim {
  position: absolute; inset: 0; z-index: 3; pointer-events: none;
  background: linear-gradient(175deg,transparent 60%,rgba(255,255,255,.22) 90%,rgba(255,255,255,.12) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.i3d-ground {
  position: absolute;
  bottom: -24px; left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(0.9);
  border-radius: 50%;
  filter: blur(22px);
  opacity: 0.55;
  pointer-events: none;
  z-index: 0;
}`,
};
