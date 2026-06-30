// src/components/ui/animations/CollageAnimator.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

// ─── COLLAGE ASSET MOCKS ─────────────────────────────────────
const PORTRAIT_ORANGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80";
const PORTRAIT_GREY = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80";
const YELLOW_BOX_IMG = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=150&h=150&q=80";

const ITEMS = [
  {
    id: "orange-profile",
    type: "image",
    src: PORTRAIT_ORANGE,
    alt: "Orange Profile",
    theme: "orange",
    baseRotate: 4
  },
  {
    id: "yellow-box",
    type: "image",
    src: YELLOW_BOX_IMG,
    alt: "Yellow Box",
    theme: "yellow",
    baseRotate: -6
  },
  {
    id: "white-letter-o",
    type: "text-card",
    content: "ò",
    theme: "light",
    baseRotate: 10
  },
  {
    id: "skull-card",
    type: "icon-card",
    icon: "💀",
    theme: "dark",
    baseRotate: -4
  },
  {
    id: "rico-card",
    type: "text-card",
    content: "rico",
    theme: "blue",
    baseRotate: 2
  },
  {
    id: "grey-profile",
    type: "image",
    src: PORTRAIT_GREY,
    alt: "Grey Profile",
    theme: "grey",
    baseRotate: -8
  },
  {
    id: "link-card",
    type: "icon-card",
    icon: "🔗",
    theme: "dark",
    baseRotate: 5
  },
  {
    id: "dud-words",
    type: "typography",
    content: ["DUD", "WOR", "212", "598", "5826"],
    theme: "text",
    baseRotate: -3
  }
];

// ─── STYLES ──────────────────────────────────────────────────
const CA_STYLES = `
.ca-card {
  width: 100%;
  max-width: 440px;
  height: 380px;
  background: radial-gradient(circle at 50% 50%, #202026 0%, #111115 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(0,0,0,0.5), inset 0 4px 20px rgba(0,0,0,0.4);
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
  color: #fff;
  user-select: none;
}

.ca-card:hover {
  border-color: rgba(255,255,255,0.12);
  box-shadow: 0 28px 60px rgba(0,0,0,0.6), inset 0 4px 20px rgba(0,0,0,0.4);
}

.ca-card-bg-glow {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: rgba(255,255,255,0.015);
  border: 1.5px dashed rgba(255,255,255,0.06);
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Collage Item Shells */
.ca-item {
  position: absolute;
  will-change: transform, opacity;
  box-shadow: 0 16px 36px rgba(0,0,0,0.35);
  border-radius: 12px;
  pointer-events: none; /* Let hover pass to container */
}

/* Specific item designs */
.ca-img-card {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}
.ca-t-orange { border: 2px solid #ff5a36; }
.ca-t-yellow { border: 2px solid #ffcc00; }
.ca-t-grey { border: 2px solid #666; }

.ca-text-card {
  padding: 12px 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ca-bg-light {
  background: #ffffff;
  color: #000;
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
.ca-bg-blue {
  background: #2563eb;
  color: #fff;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 16px;
}

.ca-icon-card {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #18181c;
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.ca-typo-card {
  background: transparent;
  color: #ffffff;
  font-weight: 900;
  line-height: 0.95;
  font-size: 19px;
  letter-spacing: -0.02em;
  text-align: left;
}

/* Hover Hint Overlay */
.ca-hint {
  position: absolute;
  bottom: 20px;
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 20;
}
.ca-card:hover .ca-hint {
  opacity: 0;
}
`;

// ═════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═════════════════════════════════════════════════════════════
export default function CollageAnimator() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="ca-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <style>{CA_STYLES}</style>

      {/* Decorative dashed background ring */}
      <div
        className="ca-card-bg-glow"
        style={{ transform: `scale(${isHovered ? 1.05 : 0.45})` }}
      />

      {ITEMS.map((item, i) => {
        // Circular orbit angles
        const baseAngle = i * (360 / ITEMS.length);
        const spinOffset = isHovered ? 360 : 0;
        const totalAngleRad = (baseAngle + spinOffset) * (Math.PI / 180);

        // Radius expands from 12px (collapsed) to 110px (hover orbit)
        const R = isHovered ? 112 : 12;

        const ix = R * Math.cos(totalAngleRad);
        const iy = R * Math.sin(totalAngleRad);

        // Self rotation and scale transitions
        const irot = item.baseRotate + (isHovered ? 360 : 0);
        const iscl = isHovered ? 1.05 : 0.85;
        const iop = isHovered ? 1 : 0.75;

        return (
          <motion.div
            key={item.id}
            className="ca-item"
            style={{ zIndex: 10 }}
            animate={{
              x: ix,
              y: iy,
              rotate: irot,
              scale: iscl,
              opacity: iop
            }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 14,
              mass: 0.9
            }}
          >
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.alt}
                className={`ca-img-card ca-t-${item.theme}`}
                draggable={false}
              />
            )}

            {item.type === "text-card" && (
              <div className={`ca-text-card ca-bg-${item.theme}`}>
                {item.content}
              </div>
            )}

            {item.type === "icon-card" && (
              <div className="ca-icon-card">
                {item.icon}
              </div>
            )}

            {item.type === "typography" && (
              <div className="ca-typo-card">
                {item.content.map((w, idx) => (
                  <div key={idx}>{w}</div>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}

      <div className="ca-hint">Hover to explore</div>
    </div>
  );
}
