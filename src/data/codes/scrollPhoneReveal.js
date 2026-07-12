// src/data/codes/scrollPhoneReveal.js

const SNIPPET_JS_CSS = `// ScrollPhoneReveal.jsx (JavaScript + Custom CSS)
// Add to index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">

import React, { useRef, useState, useEffect } from "react";
import "./ScrollPhoneReveal.css";

const STAGES = [
  {
    eyebrow: "01 / DISCOVERY",
    heading: "Design that breathes.",
    body: "Every pixel crafted with intention. We turn abstract ideas into experiences people remember.",
  },
  {
    eyebrow: "02 / SYSTEMS",
    heading: "Built to scale.",
    body: "From startup to enterprise, our components grow with your product without slowing you down.",
  },
  {
    eyebrow: "03 / DELIVERY",
    heading: "Ship with confidence.",
    body: "Production-ready React components, fully responsive, accessible by default.",
  },
];

const COLORS = {
  outer: "#06060a",
  inner: "#0d0d1a",
  phoneBorder: "#1e1e3a",
  phoneScreen: "#0b0b18",
  accent: "#7c5cfc",
  text: "#f0eeff",
  muted: "rgba(240,238,255,0.45)",
};

const PHONE_W = 220;
const PHONE_H = 440;
const NOTCH_W = 80;
const NOTCH_H = 24;
const CORNER  = 36;

function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function mapRange(v, inMin, inMax, outMin, outMax) {
  return outMin + ((clamp(v, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin);
}
function easeIn(t) { return t * t * t; }

export default function ScrollPhoneReveal() {
  const sectionRef = useRef(null);
  const [prog, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [stageKey, setStageKey] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollRoom = rect.height - window.innerHeight;
      setProgress(clamp(-rect.top / scrollRoom, 0, 1));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const raw = mapRange(prog, 0.55, 1.0, 0, STAGES.length);
    const idx = Math.min(Math.floor(raw), STAGES.length - 1);
    if (idx !== stageIdx) { setStageIdx(idx); setStageKey(k => k + 1); }
  }, [prog]);

  const rotateDeg = mapRange(prog, 0, 0.35, 0, -90);
  const zoomRaw   = mapRange(prog, 0.35, 0.6, 0, 1);
  const scale     = 1 + (zoomRaw * zoomRaw * zoomRaw) * 13;
  const frameFade = 1 - mapRange(prog, 0.32, 0.55, 0, 1);
  const shellFade = 1 - mapRange(prog, 0.45, 0.62, 0, 1);
  const captionOp = 1 - mapRange(prog, 0.18, 0.38, 0, 1);
  const bgAlpha   = mapRange(prog, 0.4, 0.65, 0, 1);
  const textOp    = mapRange(prog, 0.58, 0.72, 0, 1);
  const stage     = STAGES[stageIdx];

  return (
    <section ref={sectionRef} className="spr-section">
      <div className="spr-sticky">
        <div className="spr-bg-blend" style={{ opacity: bgAlpha }} />
        <div className="spr-bg-glow"  style={{ opacity: bgAlpha }} />

        <div className="spr-phone-wrap"
          style={{ transform: \`rotate(\${rotateDeg}deg) scale(\${scale})\` }}>
          <div className="spr-shell" style={{ opacity: shellFade }}>
            <div className="spr-screen">
              <div className="spr-notch" style={{ opacity: frameFade }} />
              <div className="spr-screen-content" style={{ opacity: frameFade }}>
                <div className="spr-bar spr-bar--accent" />
                <div className="spr-bar" style={{ width: "80%" }} />
                <div className="spr-bar" style={{ width: "70%", opacity: 0.6 }} />
                <div className="spr-orb" />
                <div className="spr-bar" style={{ marginTop: "8px", width: "50%" }} />
                <div className="spr-bar" style={{ width: "40%", opacity: 0.5 }} />
              </div>
            </div>
            <div className="spr-btn spr-btn--right" style={{ opacity: frameFade }} />
            <div className="spr-btn spr-btn--left1" style={{ opacity: frameFade }} />
            <div className="spr-btn spr-btn--left2" style={{ opacity: frameFade }} />
          </div>
          <div className="spr-caption" style={{ opacity: captionOp }}>
            scroll to step inside ↓
          </div>
        </div>

        <div className="spr-text-layer" style={{ opacity: textOp, pointerEvents: textOp > 0.1 ? "auto" : "none" }}>
          <div key={stageKey} className="spr-stage">
            <span className="spr-eyebrow">{stage.eyebrow}</span>
            <h2 className="spr-heading">{stage.heading}</h2>
            <p className="spr-body">{stage.body}</p>
          </div>
          <div className="spr-dots">
            {STAGES.map((_, i) => (
              <div key={i} className={\`spr-dot \${i === stageIdx ? "spr-dot--active" : ""}\`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`;

const SNIPPET_JS_TW = `// ScrollPhoneReveal.jsx (JavaScript + Tailwind CSS)
// Add to index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">

import React, { useRef, useState, useEffect } from "react";

const STAGES = [
  {
    eyebrow: "01 / DISCOVERY",
    heading: "Design that breathes.",
    body: "Every pixel crafted with intention. We turn abstract ideas into experiences people remember.",
  },
  {
    eyebrow: "02 / SYSTEMS",
    heading: "Built to scale.",
    body: "From startup to enterprise, our components grow with your product without slowing you down.",
  },
  {
    eyebrow: "03 / DELIVERY",
    heading: "Ship with confidence.",
    body: "Production-ready React components, fully responsive, accessible by default.",
  },
];

const PHONE_W = 220;
const PHONE_H = 440;

function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function mapRange(v, inMin, inMax, outMin, outMax) {
  return outMin + ((clamp(v, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin);
}
function easeIn(t) { return t * t * t; }

export default function ScrollPhoneReveal() {
  const sectionRef = useRef(null);
  const [prog, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [stageKey, setStageKey] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setProgress(clamp(-rect.top / (rect.height - window.innerHeight), 0, 1));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const idx = Math.min(Math.floor(mapRange(prog, 0.55, 1, 0, STAGES.length)), STAGES.length - 1);
    if (idx !== stageIdx) { setStageIdx(idx); setStageKey(k => k + 1); }
  }, [prog]);

  const rotateDeg = mapRange(prog, 0, 0.35, 0, -90);
  const scale     = 1 + easeIn(mapRange(prog, 0.35, 0.6, 0, 1)) * 13;
  const frameFade = 1 - mapRange(prog, 0.32, 0.55, 0, 1);
  const shellFade = 1 - mapRange(prog, 0.45, 0.62, 0, 1);
  const captionOp = 1 - mapRange(prog, 0.18, 0.38, 0, 1);
  const bgAlpha   = mapRange(prog, 0.4, 0.65, 0, 1);
  const textOp    = mapRange(prog, 0.58, 0.72, 0, 1);
  const stage     = STAGES[stageIdx];

  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh", background: "#06060a" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* BG blends */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "#0d0d1a", opacity: bgAlpha }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,92,252,0.18) 0%, transparent 70%)", opacity: bgAlpha }} />

        {/* Phone */}
        <div className="relative z-[2] motion-reduce:transform-none" style={{ transform: \`rotate(\${rotateDeg}deg) scale(\${scale})\`, transformOrigin: "center", willChange: "transform" }}>
          <div className="relative overflow-hidden" style={{ width: \`\${PHONE_W}px\`, height: \`\${PHONE_H}px\`, borderRadius: "36px", background: "#1e1e3a", opacity: shellFade, boxShadow: "0 0 0 2px rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
            <div className="absolute" style={{ inset: "6px", borderRadius: "30px", background: "#0b0b18", overflow: "hidden" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: "80px", height: "24px", background: "#1e1e3a", borderBottomLeftRadius: "14px", borderBottomRightRadius: "14px", zIndex: 3, opacity: frameFade }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5" style={{ opacity: frameFade }}>
                <div className="h-2 rounded-full" style={{ width: "60%", background: "rgba(124,92,252,0.35)" }} />
                <div className="h-1.5 rounded-full" style={{ width: "80%", background: "rgba(255,255,255,0.08)" }} />
                <div className="h-1.5 rounded-full" style={{ width: "70%", background: "rgba(255,255,255,0.05)" }} />
                <div className="w-12 h-12 rounded-full mt-3" style={{ background: "radial-gradient(circle, #7c5cfc 0%, rgba(124,92,252,0.3) 70%)", boxShadow: "0 0 20px rgba(124,92,252,0.5)" }} />
                <div className="h-1.5 rounded-full mt-2" style={{ width: "50%", background: "rgba(255,255,255,0.07)" }} />
                <div className="h-1 rounded-full" style={{ width: "40%", background: "rgba(255,255,255,0.04)" }} />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center" style={{ bottom: "-40px", opacity: captionOp, fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "rgba(240,238,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            scroll to step inside ↓
          </div>
        </div>

        {/* Text layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10" style={{ opacity: textOp, pointerEvents: textOp > 0.1 ? "auto" : "none" }}>
          <div key={stageKey} className="flex flex-col items-center gap-4 text-center" style={{ animation: "spr-fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(10px,2vw,12px)", letterSpacing: "0.18em", color: "#7c5cfc", textTransform: "uppercase" }}>{stage.eyebrow}</span>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(36px,7vw,88px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f0eeff", margin: 0, maxWidth: "720px" }}>{stage.heading}</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.65, color: "rgba(240,238,255,0.45)", maxWidth: "480px", margin: 0 }}>{stage.body}</p>
          </div>
          <div className="absolute flex gap-2" style={{ bottom: "48px" }}>
            {STAGES.map((_, i) => (
              <div key={i} style={{ width: i === stageIdx ? "22px" : "6px", height: "6px", borderRadius: "3px", background: i === stageIdx ? "#7c5cfc" : "rgba(255,255,255,0.18)", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
            ))}
          </div>
        </div>

        {/* Keyframes */}
        <style>{\`
          @keyframes spr-fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes spr-fadeIn { from { opacity: 0; } to   { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) { .motion-reduce\\:transform-none { transform: none !important; } }
        \`}</style>
      </div>
    </section>
  );
}`;

const SNIPPET_TS_CSS = SNIPPET_JS_CSS
  .replace("// ScrollPhoneReveal.jsx (JavaScript + Custom CSS)", "// ScrollPhoneReveal.tsx (TypeScript + Custom CSS)")
  .replace(
    "export default function ScrollPhoneReveal() {",
    "export default function ScrollPhoneReveal(): JSX.Element {"
  );

const SNIPPET_TS_TW = SNIPPET_JS_TW
  .replace("// ScrollPhoneReveal.jsx (JavaScript + Tailwind CSS)", "// ScrollPhoneReveal.tsx (TypeScript + Tailwind CSS)")
  .replace(
    "export default function ScrollPhoneReveal() {",
    "export default function ScrollPhoneReveal(): JSX.Element {"
  );

export const scrollPhoneRevealCode = {
  code: {
    js: {
      css:     SNIPPET_JS_CSS,
      tailwind: SNIPPET_JS_TW,
    },
    ts: {
      css:     SNIPPET_TS_CSS,
      tailwind: SNIPPET_TS_TW,
    },
  },
  css: `/* ScrollPhoneReveal.css */
@keyframes spr-fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spr-fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.spr-section {
  position: relative;
  height: 400vh;
  background: #06060a;
}

.spr-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spr-bg-blend {
  position: absolute;
  inset: 0;
  background: #0d0d1a;
  pointer-events: none;
  transition: opacity 0.05s linear;
}

.spr-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,92,252,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.spr-phone-wrap {
  position: relative;
  z-index: 2;
  transform-origin: center center;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .spr-phone-wrap { transform: none !important; }
}

.spr-shell {
  position: relative;
  width: 220px;
  height: 440px;
  border-radius: 36px;
  background: #1e1e3a;
  box-shadow:
    0 0 0 2px rgba(255,255,255,0.06),
    0 30px 60px rgba(0,0,0,0.7),
    inset 0 0 0 1px rgba(255,255,255,0.04);
  overflow: hidden;
}

.spr-screen {
  position: absolute;
  inset: 6px;
  border-radius: 30px;
  background: #0b0b18;
  overflow: hidden;
}

.spr-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 24px;
  background: #1e1e3a;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  z-index: 3;
}

.spr-screen-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
}

.spr-bar {
  width: 60%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.08);
}

.spr-bar--accent {
  height: 8px;
  border-radius: 4px;
  background: rgba(124,92,252,0.35);
}

.spr-orb {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-top: 12px;
  background: radial-gradient(circle, #7c5cfc 0%, rgba(124,92,252,0.3) 70%);
  box-shadow: 0 0 20px rgba(124,92,252,0.5);
}

.spr-btn {
  position: absolute;
  width: 4px;
  height: 36px;
  border-radius: 2px;
  background: rgba(255,255,255,0.06);
}

.spr-btn--right  { right: -3px; top: 90px; height: 50px; background: rgba(255,255,255,0.08); }
.spr-btn--left1  { left: -3px;  top: 80px; }
.spr-btn--left2  { left: -3px;  top: 126px; }

.spr-caption {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: rgba(240,238,255,0.45);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.spr-text-layer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  z-index: 10;
}

.spr-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  animation: spr-fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
}

.spr-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(10px, 2vw, 12px);
  letter-spacing: 0.18em;
  color: #7c5cfc;
  text-transform: uppercase;
  font-weight: 500;
  animation: spr-fadeIn 0.4s ease both;
}

.spr-heading {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(36px, 7vw, 88px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #f0eeff;
  margin: 0;
  max-width: 720px;
}

.spr-body {
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 2vw, 17px);
  line-height: 1.65;
  color: rgba(240,238,255,0.45);
  max-width: 480px;
  margin: 0;
}

.spr-dots {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  animation: spr-fadeIn 0.5s ease both;
}

.spr-dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.18);
  transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
}

.spr-dot--active {
  width: 22px;
  background: #7c5cfc;
}`,
};
