import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FAN_CARDS = [
  { id: 3, left: "55%", fromX: "-70%", rotate: 30, zIndex: 1 },
  { id: 2, left: "36%", fromX: "0%", rotate: -3, zIndex: 2 },
  { id: 1, left: "14%", fromX: "80%", rotate: -20, zIndex: 3 }
];

const SPRING = { type: "spring", stiffness: 180, damping: 16, mass: 0.8 };

const CARD_FAN_STYLES = `
  .cfan-demo {
    width: min(100%, 900px);
    margin: 0 auto;
    color: #f4f2f7;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .cfan-stage {
    position: relative;
    width: 100%;
    aspect-ratio: 1.5;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      radial-gradient(ellipse at 52% 42%, rgba(124, 88, 165, 0.12), transparent 56%),
      #111116;
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
  }
`;

export default function CardFan() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const replay = () => {
    setSelectedId(null);
    setHoveredId(null);
    setAnimationKey((key) => key + 1);
  };

  return (
    <div className="cfan-demo">
      <style>{CARD_FAN_STYLES}</style>
      <div className="cfan-stage">
        {FAN_CARDS.map((card, index) => {
          const isSelected = selectedId === card.id;
          const isDimmed = selectedId !== null && !isSelected;
          const isHovered = hoveredId === card.id;

          return (
            <motion.button
              key={`${card.id}-${animationKey}`}
              type="button"
              className="cfan-card"
              aria-label={`Select card ${card.id}`}
              aria-pressed={isSelected}
              initial={shouldReduceMotion
                ? false
                : { x: card.fromX, y: "8%", rotate: 0, opacity: 1 }}
              animate={{
                x: isHovered
                  ? 0
                  : hoveredId !== null
                    ? (card.id < hoveredId ? -8 : 8)
                    : 0,
                y: isHovered ? -12 : 0,
                rotate: isHovered ? card.rotate * 0.7 : card.rotate,
                scale: isSelected ? 1.05 : 1,
                opacity: isDimmed ? 0.6 : 1,
                boxShadow: isHovered || isSelected
                  ? "0 18px 34px rgba(0, 0, 0, 0.48)"
                  : "0 12px 24px rgba(0, 0, 0, 0.36)"
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      ...SPRING,
                      delay: selectedId === null && !isHovered ? index * 0.08 : 0
                    }
              }
              onHoverStart={() => setHoveredId(card.id)}
              onHoverEnd={() => setHoveredId(null)}
              onFocus={() => setHoveredId(card.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setSelectedId(isSelected ? null : card.id)}
              style={{
                left: card.left,
                zIndex: isSelected ? 5 : card.zIndex,
                transformOrigin: "50% 50%"
              }}
            >
              <span className="cfan-card-image" aria-hidden="true" />
              <span className="cfan-dot">
                {!shouldReduceMotion && (
                  <motion.span
                    className="cfan-dot-ring"
                    aria-hidden="true"
                    animate={{ scale: [1, 1.7], opacity: [0.45, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: index * 0.2
                    }}
                  />
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
      <div className="cfan-controls">
        <button className="cfan-replay" type="button" onClick={replay}>
          Replay animation
        </button>
      </div>
    </div>
  );
}
