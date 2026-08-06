// src/components/ui/animations/InfiniteImageMarquee.jsx
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Membungkus nilai v ke rentang [min, max) — untuk seamless looping
function wrap(min, max, v) {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

// Sample images pakai Unsplash untuk preview
const DEFAULT_ROWS = [
  [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=480&h=270&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=270&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=480&h=270&fit=crop",
  ],
];

function MarqueeRow({ images, direction, speed, pauseOnHover, gap, cardHeight }) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1);

  const duplicated = [...images, ...images];

  useAnimationFrame((t, delta) => {
    const target = pauseOnHover && isHovered ? 0 : 1;
    velocity.current += (target - velocity.current) * 0.08;

    const percentPerSecond = 50 / speed;
    const moveBy = direction * percentPerSecond * velocity.current * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          x,
          gap,
        }}
      >
        {duplicated.map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              flexShrink: 0,
              aspectRatio: "16 / 9",
              height: cardHeight,
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 8px 24px rgba(0, 0, 0, 0.4)",
              cursor: "pointer",
              transition: "transform 0.35s ease, filter 0.35s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.filter = "brightness(1.15)";
              e.currentTarget.style.zIndex = "2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.zIndex = "1";
            }}
          >
            <img
              src={src}
              alt={`marquee-item-${i}`}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteImageMarquee({
  rows = DEFAULT_ROWS,
  speed = 40,
  pauseOnHover = true,
  gap = "1.5rem",
  cardHeight = "180px",
}) {
  return (
    <div
      style={{
        background: "#050505",
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {rows.map((images, index) => (
        <MarqueeRow
          key={index}
          images={images}
          direction={index % 2 === 0 ? -1 : 1}
          speed={speed}
          pauseOnHover={pauseOnHover}
          gap={gap}
          cardHeight={cardHeight}
        />
      ))}
    </div>
  );
}
