// src/data/codes/testimonialMarquee.js

export const testimonialMarqueeCode = {
  code: {
    js: {
      css: `// TestimonialMarquee.jsx (JavaScript + Custom CSS)
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./TestimonialMarquee.css";

function wrap(min, max, v) {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

function TestimonialCard({ name, avatar, text, cardWidth, avatarSize }) {
  return (
    <div className="testimonial-card" style={{ width: cardWidth }}>
      <img
        className="testimonial-avatar"
        src={avatar}
        alt={name}
        style={{ width: avatarSize, height: avatarSize }}
        draggable={false}
      />
      <div className="testimonial-content">
        <p className="testimonial-name">{name}</p>
        <p className="testimonial-text">{text}</p>
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

  const x = useTransform(baseX, (v) => \`\${wrap(-50, 0, v)}%\`);

  return (
    <div
      className="marquee-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="marquee-track" style={{ x, gap }}>
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
  cardWidth = "420px",
  avatarSize = "64px",
  reverseFirstRow = false,
}) {
  return (
    <div className="marquee-section">
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
}`,
      tailwind: `// TestimonialMarquee.jsx (JavaScript + Tailwind CSS)
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
      className="flex flex-shrink-0 items-center gap-4 rounded-full border border-white/35 bg-black px-6 py-5 transition-colors duration-300 hover:border-white/70 hover:-translate-y-0.5"
      style={{ width: cardWidth }}
    >
      <img
        src={avatar}
        alt={name}
        draggable={false}
        className="flex-shrink-0 rounded-full object-cover"
        style={{ width: avatarSize, height: avatarSize }}
      />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="m-0 text-base font-bold text-white">{name}</p>
        <p className="m-0 text-sm leading-snug text-white/75">{text}</p>
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

  const x = useTransform(baseX, (v) => \`\${wrap(-50, 0, v)}%\`);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex w-max" style={{ x, gap }}>
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
  cardWidth = "420px",
  avatarSize = "64px",
  reverseFirstRow = false,
}) {
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden bg-black py-8">
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
}`
    },
    ts: {
      css: `// TestimonialMarquee.tsx (TypeScript + Custom CSS)
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./TestimonialMarquee.css";

function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return (((v - min) % rangeSize) + rangeSize) % rangeSize + min;
}

export interface Testimonial {
  name: string;
  avatar: string;
  text: string;
}

interface TestimonialCardProps {
  name: string;
  avatar: string;
  text: string;
  cardWidth: string;
  avatarSize: string;
}

function TestimonialCard({ name, avatar, text, cardWidth, avatarSize }: TestimonialCardProps) {
  return (
    <div className="testimonial-card" style={{ width: cardWidth }}>
      <img
        className="testimonial-avatar"
        src={avatar}
        alt={name}
        style={{ width: avatarSize, height: avatarSize }}
        draggable={false}
      />
      <div className="testimonial-content">
        <p className="testimonial-name">{name}</p>
        <p className="testimonial-text">{text}</p>
      </div>
    </div>
  );
}

interface MarqueeRowProps {
  items: Testimonial[];
  direction: 1 | -1;
  speed: number;
  pauseOnHover: boolean;
  gap: string | number;
  cardWidth: string;
  avatarSize: string;
}

function MarqueeRow({
  items,
  direction,
  speed,
  pauseOnHover,
  gap,
  cardWidth,
  avatarSize,
}: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1);

  const duplicated = [...items, ...items];

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

export interface TestimonialMarqueeProps {
  rows: Testimonial[][];
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string | number;
  cardWidth?: string;
  avatarSize?: string;
  reverseFirstRow?: boolean;
}

export default function TestimonialMarquee({
  rows,
  speed = 45,
  pauseOnHover = true,
  gap = "1.5rem",
  cardWidth = "420px",
  avatarSize = "64px",
  reverseFirstRow = false,
}: TestimonialMarqueeProps) {
  return (
    <div className="marquee-section">
      {rows.map((items, index) => {
        const baseDirection: 1 | -1 = index % 2 === 0 ? 1 : -1;
        const direction: 1 | -1 = reverseFirstRow
          ? ((-baseDirection) as 1 | -1)
          : baseDirection;
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
}`,
      tailwind: `// TestimonialMarquee.tsx (TypeScript + Tailwind CSS)
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

export interface Testimonial {
  name: string;
  avatar: string;
  text: string;
}

interface TestimonialCardProps {
  name: string;
  avatar: string;
  text: string;
  cardWidth: string;
  avatarSize: string;
}

function TestimonialCard({ name, avatar, text, cardWidth, avatarSize }: TestimonialCardProps) {
  return (
    <div
      className="flex flex-shrink-0 items-center gap-4 rounded-full border border-white/35 bg-black px-6 py-5 transition-colors duration-300 hover:border-white/70 hover:-translate-y-0.5"
      style={{ width: cardWidth }}
    >
      <img
        src={avatar}
        alt={name}
        draggable={false}
        className="flex-shrink-0 rounded-full object-cover"
        style={{ width: avatarSize, height: avatarSize }}
      />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="m-0 text-base font-bold text-white">{name}</p>
        <p className="m-0 text-sm leading-snug text-white/75">{text}</p>
      </div>
    </div>
  );
}

interface MarqueeRowProps {
  items: Testimonial[];
  direction: 1 | -1;
  speed: number;
  pauseOnHover: boolean;
  gap: string | number;
  cardWidth: string;
  avatarSize: string;
}

function MarqueeRow({
  items,
  direction,
  speed,
  pauseOnHover,
  gap,
  cardWidth,
  avatarSize,
}: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef(1);

  const duplicated = [...items, ...items];

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

export interface TestimonialMarqueeProps {
  rows: Testimonial[][];
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string | number;
  cardWidth?: string;
  avatarSize?: string;
  reverseFirstRow?: boolean;
}

export default function TestimonialMarquee({
  rows,
  speed = 45,
  pauseOnHover = true,
  gap = "1.5rem",
  cardWidth = "420px",
  avatarSize = "64px",
  reverseFirstRow = false,
}: TestimonialMarqueeProps) {
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden bg-black py-8">
      {rows.map((items, index) => {
        const baseDirection: 1 | -1 = index % 2 === 0 ? 1 : -1;
        const direction: 1 | -1 = reverseFirstRow
          ? ((-baseDirection) as 1 | -1)
          : baseDirection;
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
}`
    }
  },
  css: `/* TestimonialMarquee.css */
.marquee-section {
  background: #000000;
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

.testimonial-card {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 9999px;
  cursor: pointer;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.testimonial-card:hover {
  border-color: rgba(255, 255, 255, 0.7);
  transform: translateY(-2px);
}

.testimonial-avatar {
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.testimonial-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.testimonial-name {
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
}

.testimonial-text {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  white-space: normal;
}`
};
