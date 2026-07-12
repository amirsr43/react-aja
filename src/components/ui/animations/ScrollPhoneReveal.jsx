// src/components/ui/animations/ScrollPhoneReveal.jsx
import React, { useRef, useState, useEffect } from "react";

// ── Customizable content stages ──────────────────────────────────────────────
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

// ── Palette ──────────────────────────────────────────────────────────────────
const COLORS = {
  outer:       "#06060a",
  inner:       "#0d0d1a",
  phoneBorder: "#1e1e3a",
  phoneScreen: "#0b0b18",
  accent:      "#7c5cfc",
  text:        "#f0eeff",
  muted:       "rgba(240,238,255,0.45)",
};

// ── Math helpers ──────────────────────────────────────────────────────────────
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function mapRange(v, inMin, inMax, outMin, outMax) {
  return outMin + ((clamp(v, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin);
}
function easeIn(t) { return t * t * t; }

// ── Keyframes (injected once) ─────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

  @keyframes spr-fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spr-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Hide scrollbar but keep scrollable */
  .spr-scroll-container::-webkit-scrollbar { display: none; }
  .spr-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }

  @media (prefers-reduced-motion: reduce) {
    .spr-phone-wrap { transform: none !important; }
    .spr-text-layer  { opacity: 1 !important; }
  }
`;

// ── Phone mockup dimensions ───────────────────────────────────────────────────
const PHONE_W = 220;
const PHONE_H = 440;
const CORNER  = 36;

/**
 * ScrollPhoneReveal
 *
 * Self-contained scroll-driven portal animation.
 * Uses its own internal scrollable container — scroll is fully isolated
 * from the page. Scrolling inside the component drives the animation;
 * scrolling outside the component moves the page normally.
 *
 * @param {string} height  - Height of the visible viewport area. Default "520px".
 *                           Use "100vh" for full-page use.
 */
export default function ScrollPhoneReveal({ height = "520px" }) {
  const containerRef = useRef(null); // the scrollable div
  const [prog, setProgress]   = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [stageKey, setStageKey] = useState(0);

  // ── Listen to internal container scroll (not window) ─────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      setProgress(clamp(el.scrollTop / maxScroll, 0, 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // ── Stage tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const raw = mapRange(prog, 0.55, 1.0, 0, STAGES.length);
    const idx = Math.min(Math.floor(raw), STAGES.length - 1);
    if (idx !== stageIdx) {
      setStageIdx(idx);
      setStageKey(k => k + 1);
    }
  }, [prog, stageIdx]);

  // ── Derived animation values ──────────────────────────────────────────────
  const rotateDeg = mapRange(prog, 0, 0.35, 0, -90);
  const zoomRaw   = mapRange(prog, 0.35, 0.6, 0, 1);
  const scale     = 1 + easeIn(zoomRaw) * 13;
  const frameFade = 1 - mapRange(prog, 0.32, 0.55, 0, 1);
  const shellFade = 1 - mapRange(prog, 0.45, 0.62, 0, 1);
  const captionOp = 1 - mapRange(prog, 0.18, 0.38, 0, 1);
  const bgAlpha   = mapRange(prog, 0.4, 0.65, 0, 1);
  const textOp    = mapRange(prog, 0.58, 0.72, 0, 1);
  const stage     = STAGES[stageIdx];

  return (
    <>
      <style>{STYLES}</style>

      {/*
        Outer wrapper: fixed visible height, clips overflow.
        position: relative so the sticky child is relative to it.
      */}
      <div style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: "16px",
        background: COLORS.outer,
      }}>

        {/*
          Inner scroll container: 400vh tall, hidden scrollbar.
          Scroll events here drive the animation progress.
        */}
        <div
          ref={containerRef}
          className="spr-scroll-container"
          style={{
            position: "absolute",
            inset: 0,
            overflowY: "scroll",
          }}
        >
          {/* Scroll room — 400% of the container's height */}
          <div style={{ height: "400%" }} />
        </div>

        {/*
          Sticky viewport — sits on top of the scroll container, covers it entirely.
          pointer-events: none on wrapper so scroll events pass through to the
          scroll container underneath; children that need clicks get pointer-events: auto.
        */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>

          {/* Background crossfade */}
          <div style={{
            position: "absolute", inset: 0,
            background: COLORS.inner,
            opacity: bgAlpha,
            pointerEvents: "none",
          }} />
          {/* Ambient glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,92,252,${bgAlpha * 0.18}) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* ── Phone ──────────────────────────────────────────────────────── */}
          <div
            className="spr-phone-wrap"
            style={{
              position: "relative",
              zIndex: 2,
              transform: `rotate(${rotateDeg}deg) scale(${scale})`,
              transformOrigin: "center center",
              willChange: "transform",
              pointerEvents: "none",
            }}
          >
            {/* Shell */}
            <div style={{
              position: "relative",
              width: `${PHONE_W}px`,
              height: `${PHONE_H}px`,
              borderRadius: `${CORNER}px`,
              background: COLORS.phoneBorder,
              opacity: shellFade,
              boxShadow: `
                0 0 0 2px rgba(255,255,255,0.06),
                0 30px 60px rgba(0,0,0,0.7),
                inset 0 0 0 1px rgba(255,255,255,0.04)
              `,
              overflow: "hidden",
            }}>
              {/* Screen */}
              <div style={{
                position: "absolute", inset: "6px",
                borderRadius: `${CORNER - 6}px`,
                background: COLORS.phoneScreen,
                overflow: "hidden",
              }}>
                {/* Notch */}
                <div style={{
                  position: "absolute", top: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px", height: "24px",
                  background: COLORS.phoneBorder,
                  borderBottomLeftRadius: "14px", borderBottomRightRadius: "14px",
                  zIndex: 3, opacity: frameFade,
                }} />

                {/* Mini content */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "8px", padding: "0 20px",
                  opacity: frameFade,
                }}>
                  <div style={{ width: "60%", height: "8px", borderRadius: "4px", background: "rgba(124,92,252,0.35)" }} />
                  <div style={{ width: "80%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.08)" }} />
                  <div style={{ width: "70%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.05)" }} />
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%", marginTop: "12px",
                    background: `radial-gradient(circle, ${COLORS.accent} 0%, rgba(124,92,252,0.3) 70%)`,
                    boxShadow: "0 0 20px rgba(124,92,252,0.5)",
                  }} />
                  <div style={{ width: "50%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.07)", marginTop: "8px" }} />
                  <div style={{ width: "40%", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.04)" }} />
                </div>
              </div>

              {/* Side buttons */}
              <div style={{ position: "absolute", right: "-3px", top: "90px",  width: "4px", height: "50px", borderRadius: "2px", background: "rgba(255,255,255,0.08)", opacity: frameFade }} />
              <div style={{ position: "absolute", left:  "-3px", top: "80px",  width: "4px", height: "36px", borderRadius: "2px", background: "rgba(255,255,255,0.06)", opacity: frameFade }} />
              <div style={{ position: "absolute", left:  "-3px", top: "126px", width: "4px", height: "36px", borderRadius: "2px", background: "rgba(255,255,255,0.06)", opacity: frameFade }} />
            </div>

            {/* Caption */}
            <div style={{
              position: "absolute", bottom: "-40px", left: "50%",
              transform: "translateX(-50%)",
              opacity: captionOp, whiteSpace: "nowrap",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px", color: COLORS.muted,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              scroll to step inside ↓
            </div>
          </div>

          {/* ── Phase 3: text reveal ────────────────────────────────────────── */}
          <div
            className="spr-text-layer"
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "0 24px", zIndex: 10,
              opacity: textOp,
              pointerEvents: "none", // pass scroll through to container
            }}
          >
            <div
              key={stageKey}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "16px", textAlign: "center",
                animation: "spr-fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: "0.18em", color: COLORS.accent,
                textTransform: "uppercase", fontWeight: 500,
                animation: "spr-fadeIn 0.4s ease both",
              }}>
                {stage.eyebrow}
              </span>
              <h2 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(28px, 5vw, 72px)",
                fontWeight: 900, lineHeight: 1.05,
                letterSpacing: "-0.03em", color: COLORS.text,
                margin: 0, maxWidth: "640px",
              }}>
                {stage.heading}
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.8vw, 16px)",
                lineHeight: 1.65, color: COLORS.muted,
                maxWidth: "440px", margin: 0, fontWeight: 400,
              }}>
                {stage.body}
              </p>
            </div>

            {/* Progress dots */}
            <div style={{
              position: "absolute", bottom: "32px",
              left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: "8px",
              animation: "spr-fadeIn 0.5s ease both",
            }}>
              {STAGES.map((_, i) => (
                <div key={i} style={{
                  width: i === stageIdx ? "22px" : "6px",
                  height: "6px", borderRadius: "3px",
                  background: i === stageIdx ? COLORS.accent : "rgba(255,255,255,0.18)",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                }} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
