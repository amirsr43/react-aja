// src/components/ui/animations/Interactive3DText.jsx
import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";

// Build side-face extrusion using relative 'em' units so it scales with font size
function buildExtrusion(depthColor, layers = 18) {
  const shadows = [];
  for (let i = 1; i <= layers; i++) {
    shadows.push(`${i * 0.008}em ${i * 0.008}em 0px ${depthColor}`);
  }
  return shadows.join(", ");
}

const LETTER_FONT = `'Outfit', 'Plus Jakarta Sans', 'Arial Black', sans-serif`;

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap');

  .t3d-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    background: #080808;
    border-radius: 24px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .t3d-scene {
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 900px;
    gap: 0px;
    font-size: clamp(48px, 13vw, 128px);
  }

  .t3d-letter-root {
    position: relative;
    display: inline-block;
    margin: 0 -0.04em;
    cursor: pointer;
    user-select: none;
    transform-style: preserve-3d;
  }

  .t3d-depth {
    font-family: ${LETTER_FONT};
    font-weight: 900;
    font-size: inherit;
    line-height: 1;
    display: block;
    position: relative;
    z-index: 1;
  }

  .t3d-face {
    position: absolute;
    inset: 0;
    font-family: ${LETTER_FONT};
    font-weight: 900;
    font-size: inherit;
    line-height: 1;
    display: block;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 2;
  }

  .t3d-gloss {
    position: absolute;
    inset: 0;
    font-family: ${LETTER_FONT};
    font-weight: 900;
    font-size: inherit;
    line-height: 1;
    display: block;
    background: linear-gradient(
      175deg,
      rgba(255,255,255,0.72) 0%,
      rgba(255,255,255,0.32) 18%,
      rgba(255,255,255,0.04) 38%,
      transparent 55%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 3;
    pointer-events: none;
  }

  .t3d-ground-shadow {
    position: absolute;
    bottom: -0.15em;
    left: 50%;
    transform: translateX(-50%) scaleY(0.35);
    width: 85%;
    height: 0.3em;
    border-radius: 50%;
    filter: blur(0.14em);
    opacity: 0.65;
    pointer-events: none;
  }
`;

// Per-letter color definitions
const DEFAULT_COLORS = [
  {
    gradient:      "linear-gradient(160deg, #c4b0ff 0%, #a78bfa 40%, #8b5cf6 100%)",
    depthGradient: "linear-gradient(160deg, #5b21b6 0%, #4c1d95 100%)",
    depth:         "#4c1d95",
    glow:          "rgba(139, 92, 246, 0.55)",
  },
  {
    gradient:      "linear-gradient(160deg, #ff9ef8 0%, #f472e8 40%, #e879f9 100%)",
    depthGradient: "linear-gradient(160deg, #9d174d 0%, #86198f 100%)",
    depth:         "#86198f",
    glow:          "rgba(232, 121, 249, 0.55)",
  },
  {
    gradient:      "linear-gradient(160deg, #ff9ef8 0%, #f472e8 40%, #e879f9 100%)",
    depthGradient: "linear-gradient(160deg, #9d174d 0%, #86198f 100%)",
    depth:         "#86198f",
    glow:          "rgba(232, 121, 249, 0.55)",
  },
  {
    gradient:      "linear-gradient(160deg, #c4b0ff 0%, #a78bfa 40%, #8b5cf6 100%)",
    depthGradient: "linear-gradient(160deg, #5b21b6 0%, #4c1d95 100%)",
    depth:         "#4c1d95",
    glow:          "rgba(139, 92, 246, 0.55)",
  },
];

function InteractiveLetter({ char, index, colors }) {
  const ref = useRef(null);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.6 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const z = useSpring(0, springConfig);

  const color = colors[index % colors.length];
  const extrusion = buildExtrusion(color.depth, 18);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    rotateX.set(-(mouseY / (rect.height / 2)) * 28);
    rotateY.set((mouseX / (rect.width / 2)) * 28);
  };

  const handleMouseEnter = () => z.set(30);

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="t3d-letter-root"
      style={{ rotateX, rotateY, z }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ground glow shadow */}
      <span
        className="t3d-ground-shadow"
        style={{
          boxShadow: `0 30px 40px ${color.glow}`,
        }}
        aria-hidden="true"
      />

      {/* Extrusion depth layer */}
      <span
        className="t3d-depth"
        style={{
          color: color.depth,
          textShadow: extrusion,
        }}
        aria-hidden="true"
      >
        {char}
      </span>

      {/* Depth offset duplicate for visible side face */}
      <span
        style={{
          position: "absolute",
          top: 0, left: 0,
          fontFamily: LETTER_FONT,
          fontWeight: 900,
          fontSize: "inherit",
          lineHeight: 1,
          backgroundImage: color.depthGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: "translate(0.045em, 0.055em)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.95,
        }}
        aria-hidden="true"
      >
        {char}
      </span>

      {/* Face gradient */}
      <span
        className="t3d-face"
        style={{ backgroundImage: color.gradient }}
      >
        {char}
      </span>

      {/* Gloss shine */}
      <span className="t3d-gloss" aria-hidden="true">{char}</span>
    </motion.div>
  );
}

export default function Interactive3DText({
  text   = "LOOP",
  colors = DEFAULT_COLORS,
}) {
  const chars = text.split("");

  return (
    <div className="t3d-wrapper">
      <style>{STYLES}</style>
      <div className="t3d-scene">
        {chars.map((char, i) => (
          <InteractiveLetter key={i} char={char} index={i} colors={colors} />
        ))}
      </div>
    </div>
  );
}
