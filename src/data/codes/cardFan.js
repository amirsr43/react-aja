const CARD_FAN_CSS = `.cfan-demo {
  width: min(100%, 900px);
  margin: 0 auto;
}

.cfan-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1.5;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: radial-gradient(ellipse at 52% 42%, rgba(124, 88, 165, 0.12), transparent 56%), #111116;
  isolation: isolate;
}

.cfan-card {
  position: absolute;
  top: 17%;
  width: 27%;
  height: 64%;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: clamp(8px, 1.5vw, 13px);
  background: #eeecf1;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.36);
  cursor: pointer;
  transform-origin: 50% 50%;
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}

.cfan-card:focus-visible,
.cfan-replay:focus-visible {
  outline: 2px solid #c4a7ff;
  outline-offset: 4px;
}

.cfan-card-image {
  position: absolute;
  top: 15%;
  left: 12%;
  width: 76%;
  height: 70%;
  border-radius: 2px;
  background: linear-gradient(145deg, #d9d7de, #cfccd4);
}

.cfan-dot {
  position: absolute;
  top: 4%;
  right: 8%;
  width: clamp(6px, 0.85vw, 10px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #17151b;
}

.cfan-dot-ring {
  position: absolute;
  inset: -4px;
  border: 1px solid rgba(23, 21, 27, 0.55);
  border-radius: 50%;
  pointer-events: none;
}

.cfan-controls {
  display: flex;
  justify-content: flex-end;
  padding: 12px 2px 0;
}

.cfan-replay {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: #25232b;
  color: #f4f2f7;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.cfan-replay:hover {
  background: #302d37;
}

@media (prefers-reduced-motion: reduce) {
  .cfan-card {
    will-change: auto;
  }
}`;

const TAILWIND_CARD_CLASSES = {
  wrapper: "mx-auto w-full max-w-[900px]",
  stage: "relative aspect-[3/2] w-full overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#111116]",
  card: "absolute top-[17%] h-[64%] w-[27%] rounded-[13px] border border-white/[0.82] bg-[#eeecf1] p-0 shadow-[0_12px_24px_rgba(0,0,0,0.36)] [transform-origin:50%_50%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a7ff] [-webkit-tap-highlight-color:transparent]",
  image: "absolute left-[12%] top-[15%] h-[70%] w-[76%] rounded-[2px] bg-gradient-to-br from-[#d9d7de] to-[#cfccd4]",
  dot: "absolute right-[8%] top-[4%] aspect-square w-[clamp(6px,0.85vw,10px)] rounded-full bg-[#17151b]",
  ring: "absolute -inset-1 rounded-full border border-[#17151b]/55",
  controls: "flex justify-end px-[2px] pt-3",
  replay: "rounded-full border border-white/[0.12] bg-[#25232b] px-3 py-2 text-xs text-[#f4f2f7] hover:bg-[#302d37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a7ff]"
};

function createComponentCode({ typescript, tailwind }) {
  const cssImport = tailwind ? "" : 'import "./CardFan.css";\n';
  const cardType = typescript
    ? `type FanCard = { id: number; left: string; fromX: string; rotate: number; zIndex: number };

`
    : "";
  const selectedState = typescript ? "useState<number | null>(null)" : "useState(null)";
  const hoveredState = typescript ? "useState<number | null>(null)" : "useState(null)";
  const classes = tailwind
    ? TAILWIND_CARD_CLASSES
    : {
        wrapper: "cfan-demo",
        stage: "cfan-stage",
        card: "cfan-card",
        image: "cfan-card-image",
        dot: "cfan-dot",
        ring: "cfan-dot-ring",
        controls: "cfan-controls",
        replay: "cfan-replay"
      };

  return `import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
${cssImport}
${cardType}const CARDS${typescript ? ": FanCard[]" : ""} = [
  { id: 3, left: "55%", fromX: "-70%", rotate: 30, zIndex: 1 },
  { id: 2, left: "36%", fromX: "0%", rotate: -3, zIndex: 2 },
  { id: 1, left: "14%", fromX: "80%", rotate: -20, zIndex: 3 }
];

const SPRING = { type: "spring", stiffness: 180, damping: 16, mass: 0.8 };

export default function CardFan() {
  const [selectedId, setSelectedId] = ${selectedState};
  const [hoveredId, setHoveredId] = ${hoveredState};
  const [animationKey, setAnimationKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="${classes.wrapper}">
      <div className="${classes.stage}">
        {CARDS.map((card, index) => {
          const isSelected = selectedId === card.id;
          const isHovered = hoveredId === card.id;
          const isDimmed = selectedId !== null && !isSelected;

          return (
            <motion.button
              key={\`\${card.id}-\${animationKey}\`}
              type="button"
              aria-label={\`Select card \${card.id}\`}
              aria-pressed={isSelected}
              className="${classes.card}"
              initial={shouldReduceMotion ? false : { x: card.fromX, y: "8%", rotate: 0 }}
              animate={{
                x: isHovered ? 0 : hoveredId !== null ? (card.id < hoveredId ? -8 : 8) : 0,
                y: isHovered ? -12 : 0,
                rotate: isHovered ? card.rotate * 0.7 : card.rotate,
                scale: isSelected ? 1.05 : 1,
                opacity: isDimmed ? 0.6 : 1,
                boxShadow: isHovered || isSelected
                  ? "0 18px 34px rgba(0, 0, 0, 0.48)"
                  : "0 12px 24px rgba(0, 0, 0, 0.36)"
              }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...SPRING, delay: index * 0.08 }}
              onHoverStart={() => setHoveredId(card.id)}
              onHoverEnd={() => setHoveredId(null)}
              onFocus={() => setHoveredId(card.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setSelectedId(isSelected ? null : card.id)}
              style={{ left: card.left, zIndex: isSelected ? 5 : card.zIndex }}
            >
              <span className="${classes.image}" aria-hidden="true" />
              <span className="${classes.dot}">
                {!shouldReduceMotion && (
                  <motion.span
                    className="${classes.ring}"
                    aria-hidden="true"
                    animate={{ scale: [1, 1.7], opacity: [0.45, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: index * 0.2 }}
                  />
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="${classes.controls}">
        <button
          className="${classes.replay}"
          type="button"
          onClick={() => {
            setSelectedId(null);
            setHoveredId(null);
            setAnimationKey((key) => key + 1);
          }}
        >
          Replay animation
        </button>
      </div>
    </div>
  );
}`;
}

const JAVASCRIPT_CSS = createComponentCode({ typescript: false, tailwind: false });
const JAVASCRIPT_TAILWIND = createComponentCode({ typescript: false, tailwind: true });
const TYPESCRIPT_CSS = createComponentCode({ typescript: true, tailwind: false });
const TYPESCRIPT_TAILWIND = createComponentCode({ typescript: true, tailwind: true });

export const cardFanCode = {
  code: {
    js: { css: JAVASCRIPT_CSS, tailwind: JAVASCRIPT_TAILWIND },
    ts: { css: TYPESCRIPT_CSS, tailwind: TYPESCRIPT_TAILWIND }
  },
  css: CARD_FAN_CSS
};
