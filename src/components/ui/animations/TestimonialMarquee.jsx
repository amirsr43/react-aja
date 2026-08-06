// src/components/ui/animations/TestimonialMarquee.jsx
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

function wrap(min, max, v) {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

function TestimonialCard({ name, avatar, text, cardWidth, avatarSize }) {
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 1.25rem",
        background: "#050508",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        borderRadius: "9999px",
        cursor: "pointer",
        transition: "border-color 0.3s ease, transform 0.3s ease",
        width: cardWidth,
        boxSizing: "border-box",
      }}
    >
      <img
        src={avatar}
        alt={name}
        draggable={false}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }}>
        <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>{name}</p>
        <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "0.825rem", lineHeight: 1.35, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction, speed, pauseOnHover, gap, cardWidth, avatarSize }) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1);

  const duplicated = [...items, ...items];

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
      <motion.div style={{ display: "flex", width: "max-content", x, gap }}>
        {duplicated.map((item, i) => (
          <TestimonialCard
            key={i}
            name={item.name}
            avatar={item.avatar}
            text={item.text}
            cardWidth={cardWidth}
            avatarSize={avatarSize}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialMarquee({
  rows = [],
  speed = 45,
  pauseOnHover = true,
  gap = "1.5rem",
  cardWidth = "400px",
  avatarSize = "52px",
  reverseFirstRow = false,
}) {
  return (
    <div
      style={{
        background: "#000000",
        padding: "1.5rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {rows.map((items, index) => {
        const baseDirection = index % 2 === 0 ? 1 : -1;
        const direction = reverseFirstRow ? -baseDirection : baseDirection;
        return (
          <MarqueeRow
            key={index}
            items={items}
            direction={direction}
            speed={speed}
            pauseOnHover={pauseOnHover}
            gap={gap}
            cardWidth={cardWidth}
            avatarSize={avatarSize}
          />
        );
      })}
    </div>
  );
}
