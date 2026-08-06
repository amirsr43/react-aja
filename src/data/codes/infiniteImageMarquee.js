// src/data/codes/infiniteImageMarquee.js

export const infiniteImageMarqueeCode = {
  code: {
    js: {
      css: `// InfiniteImageMarquee.jsx  (JavaScript + Custom CSS)
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./InfiniteImageMarquee.css";

// Membungkus nilai v ke rentang [min, max) — untuk seamless looping
function wrap(min, max, v) {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

function MarqueeRow({ images, direction, speed, pauseOnHover, gap, cardHeight }) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1); // 1 = jalan normal, 0 = berhenti

  // Duplikasi gambar agar loop 100% mulus
  const duplicated = [...images, ...images];

  useAnimationFrame((t, delta) => {
    const target = pauseOnHover && isHovered ? 0 : 1;
    // Interpolasi halus menuju target (smooth pause/resume)
    velocity.current += (target - velocity.current) * 0.08;

    const percentPerSecond = 50 / speed; // 50% = satu siklus penuh
    const moveBy = direction * percentPerSecond * velocity.current * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => \`\${wrap(-50, 0, v)}%\`);

  return (
    <div
      className="marquee-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="marquee-track" style={{ x, gap }}>
        {duplicated.map((src, i) => (
          <div className="marquee-card" key={i} style={{ height: cardHeight }}>
            <img src={src} alt={\`marquee-item-\${i}\`} draggable={false} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteImageMarquee({
  rows = [],
  speed = 40,
  pauseOnHover = true,
  gap = "1.5rem",
  cardHeight = "180px",
}) {
  return (
    <div className="marquee-section">
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
}`,
      tailwind: `// InfiniteImageMarquee.jsx  (JavaScript + Tailwind CSS)
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

  const x = useTransform(baseX, (v) => \`\${wrap(-50, 0, v)}%\`);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex w-max" style={{ x, gap }}>
        {duplicated.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:scale-105 hover:brightness-110 cursor-pointer"
            style={{ height: cardHeight }}
          >
            <img
              src={src}
              alt={\`marquee-item-\${i}\`}
              draggable={false}
              className="h-full w-full object-cover select-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteImageMarquee({
  rows = [],
  speed = 40,
  pauseOnHover = true,
  gap = "1.5rem",
  cardHeight = "180px",
}) {
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden bg-[#050505] py-8">
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
}`
    },
    ts: {
      css: `// InfiniteImageMarquee.tsx  (TypeScript + Custom CSS)
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./InfiniteImageMarquee.css";

function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

interface MarqueeRowProps {
  images: string[];
  direction: 1 | -1;
  speed: number;
  pauseOnHover: boolean;
  gap: string | number;
  cardHeight: string;
}

function MarqueeRow({
  images,
  direction,
  speed,
  pauseOnHover,
  gap,
  cardHeight,
}: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1);

  const duplicated = [...images, ...images];

  useAnimationFrame((_t, delta) => {
    const target = pauseOnHover && isHovered ? 0 : 1;
    velocity.current += (target - velocity.current) * 0.08;

    const percentPerSecond = 50 / speed;
    const moveBy = direction * percentPerSecond * velocity.current * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => \`\${wrap(-50, 0, v)}%\`);

  return (
    <div
      className="marquee-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="marquee-track" style={{ x, gap }}>
        {duplicated.map((src, i) => (
          <div className="marquee-card" key={i} style={{ height: cardHeight }}>
            <img src={src} alt={\`marquee-item-\${i}\`} draggable={false} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export interface InfiniteImageMarqueeProps {
  rows: string[][];
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string | number;
  cardHeight?: string;
}

export default function InfiniteImageMarquee({
  rows,
  speed = 40,
  pauseOnHover = true,
  gap = "1.5rem",
  cardHeight = "180px",
}: InfiniteImageMarqueeProps) {
  return (
    <div className="marquee-section">
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
}`,
      tailwind: `// InfiniteImageMarquee.tsx  (TypeScript + Tailwind CSS)
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

interface MarqueeRowProps {
  images: string[];
  direction: 1 | -1;
  speed: number;
  pauseOnHover: boolean;
  gap: string | number;
  cardHeight: string;
}

function MarqueeRow({
  images,
  direction,
  speed,
  pauseOnHover,
  gap,
  cardHeight,
}: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1);

  const duplicated = [...images, ...images];

  useAnimationFrame((_t, delta) => {
    const target = pauseOnHover && isHovered ? 0 : 1;
    velocity.current += (target - velocity.current) * 0.08;

    const percentPerSecond = 50 / speed;
    const moveBy = direction * percentPerSecond * velocity.current * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => \`\${wrap(-50, 0, v)}%\`);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex w-max" style={{ x, gap }}>
        {duplicated.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:scale-105 hover:brightness-110 cursor-pointer"
            style={{ height: cardHeight }}
          >
            <img
              src={src}
              alt={\`marquee-item-\${i}\`}
              draggable={false}
              className="h-full w-full object-cover select-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export interface InfiniteImageMarqueeProps {
  rows: string[][];
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string | number;
  cardHeight?: string;
}

export default function InfiniteImageMarquee({
  rows,
  speed = 40,
  pauseOnHover = true,
  gap = "1.5rem",
  cardHeight = "180px",
}: InfiniteImageMarqueeProps) {
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden bg-[#050505] py-8">
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
}`
    }
  },
  css: `/* InfiniteImageMarquee.css */
.marquee-section {
  background: #050505;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
  width: 100%;
}

.marquee-row {
  overflow: hidden;
  width: 100%;
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.marquee-card {
  position: relative;
  flex-shrink: 0;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s ease, filter 0.35s ease;
  cursor: pointer;
}

.marquee-card:hover {
  transform: scale(1.05);
  filter: brightness(1.15);
  z-index: 2;
}

.marquee-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    transition: none;
  }
}`
};
