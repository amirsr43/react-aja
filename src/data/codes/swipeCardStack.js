// src/data/codes/swipeCardStack.js

// ─────────────────────────────────────────────────────────────
// 1. JavaScript + Custom CSS
// ─────────────────────────────────────────────────────────────
const SWIPE_STACK_JS_CSS = `// SwipeCardStack.jsx (JavaScript + Custom CSS)
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowUpRight, FolderGit2, ArrowLeftRight } from "lucide-react";
import "./SwipeCardStack.css";

export const PORTFOLIO_PROJECTS = [
  {
    id: "project-1",
    title: "Atelier Motion Engine",
    category: "Design System & Canvas Physics",
    tag: "JS + CSS",
    year: "2025",
    description: "Zero-dependency spring physics engine driving fluid drag interactions across web canvas.",
    tags: ["Native DOM", "CSS Variables", "Pointer Events"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-2",
    title: "Chronicle Editorial Suite",
    category: "Publishing Platform & CMS",
    tag: "JS + Tailwind",
    year: "2025",
    description: "Minimalist markdown editor and publishing workflow crafted with utility-first layout tokens.",
    tags: ["Tailwind Utility", "Fluid Typography", "Zero Config"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-3",
    title: "Strata Financial Core",
    category: "Fintech Dashboard & Analytics",
    tag: "TS + CSS",
    year: "2024",
    description: "Type-safe asset portfolio management interface with modular scoped CSS architecture.",
    tags: ["Strict TypeScript", "Modular CSS", "Data Cards"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-4",
    title: "Voxel Studio Platform",
    category: "Creative Workspace & 3D Scene Tool",
    tag: "TS + Tailwind",
    year: "2024",
    description: "Enterprise workspace combining typed design token props and fluid gesture cards.",
    tags: ["Typed Tokens", "Production Ready", "Spring Physics"],
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80"
  }
];

function BackgroundStackCard({ index }) {
  const stackConfigs = [
    { rotate: 6, x: 8, y: 12, scale: 0.98, opacity: 0.28, zIndex: 12 },
    { rotate: -7, x: -8, y: 22, scale: 0.95, opacity: 0.18, zIndex: 10 },
    { rotate: 4.5, x: 5, y: 32, scale: 0.92, opacity: 0.10, zIndex: 8 }
  ];
  const cfg = stackConfigs[index] || stackConfigs[2];

  return (
    <motion.div
      className="portfolio-bg-shadow-card"
      style={{ zIndex: cfg.zIndex }}
      animate={{ rotate: cfg.rotate, x: cfg.x, y: cfg.y, scale: cfg.scale, opacity: cfg.opacity }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    />
  );
}

function PortfolioCard({ project, onSwipe }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-260, 0, 260], [-14, 0, 14]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.4, 1, 1, 1, 0.4]);
  const nextOpacity = useTransform(x, [20, 90], [0, 1], { clamp: true });
  const dismissOpacity = useTransform(x, [-90, -20], [1, 0], { clamp: true });

  const handleDragEnd = (_e, info) => {
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 350;
    if (Math.abs(info.offset.x) > cardWidth * 0.28 || Math.abs(info.velocity.x) > 450) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="portfolio-front-card"
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.div style={{ opacity: nextOpacity }} className="swipe-pill pill-keep">
        <span className="dot-green" /> KEEP
      </motion.div>
      <motion.div style={{ opacity: dismissOpacity }} className="swipe-pill pill-dismiss">
        <span className="dot-red" /> DISMISS
      </motion.div>

      <div className="card-header">
        <div className="header-left">
          <span className="label-dim">Portfolio</span>
          <span className="label-sep">•</span>
          <span className="label-year">{project.year}</span>
        </div>
        <span className="stack-badge">{project.tag}</span>
      </div>

      <div className="image-preview">
        <img src={project.image} alt={project.title} draggable={false} />
        <div className="image-overlay" />
        <span className="category-label">{project.category}</span>
      </div>

      <div className="card-body">
        <div className="title-row">
          <h3>{project.title}</h3>
          <ArrowUpRight size={15} className="arrow-icon" />
        </div>
        <p className="description">{project.description}</p>
        <div className="tags-row">
          {project.tags.map((t, i) => (
            <span key={i} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCardStack({ initialCards = PORTFOLIO_PROJECTS, onDiscard }) {
  const [cards, setCards] = useState(initialCards);

  const discardTop = useCallback((dir) => {
    if (cards.length === 0) return;
    const removed = cards[0];
    setCards((prev) => prev.slice(1));
    if (onDiscard) onDiscard(removed, dir);
  }, [cards, onDiscard]);

  return (
    <div className="portfolio-stack-container">
      <div className="stack-stage">
        {cards.length > 1 && (
          cards.slice(1, 4).map((_, idx) => (
            <BackgroundStackCard key={idx} index={idx} />
          ))
        )}

        <AnimatePresence mode="popLayout">
          {cards.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="empty-box"
            >
              <FolderGit2 size={24} className="empty-icon" />
              <h4>All Projects Reviewed</h4>
              <p>You've explored all 4 portfolio stacks.</p>
              <button onClick={() => setCards(initialCards)} className="replay-btn">
                <RotateCcw size={14} />
                <span>Replay Projects</span>
              </button>
            </motion.div>
          ) : (
            <PortfolioCard
              key={cards[0].id}
              project={cards[0]}
              onSwipe={discardTop}
            />
          )}
        </AnimatePresence>
      </div>

      {cards.length > 0 && (
        <div className="swipe-hint-pill">
          <ArrowLeftRight size={13} className="swipe-hint-icon" />
          <span>Drag atau swipe kartu ke kiri / kanan untuk mencoba</span>
        </div>
      )}
    </div>
  );
}`;

// ─────────────────────────────────────────────────────────────
// 2. JavaScript + Tailwind CSS
// ─────────────────────────────────────────────────────────────
const SWIPE_STACK_JS_TAILWIND = `// SwipeCardStack.jsx (JavaScript + Tailwind CSS)
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowUpRight, FolderGit2, ArrowLeftRight } from "lucide-react";

export const PORTFOLIO_PROJECTS = [
  {
    id: "project-1",
    title: "Atelier Motion Engine",
    category: "Design System & Canvas Physics",
    tag: "JS + CSS",
    year: "2025",
    description: "Zero-dependency spring physics engine driving fluid drag interactions across web canvas.",
    tags: ["Native DOM", "CSS Variables", "Pointer Events"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-2",
    title: "Chronicle Editorial Suite",
    category: "Publishing Platform & CMS",
    tag: "JS + Tailwind",
    year: "2025",
    description: "Minimalist markdown editor and publishing workflow crafted with utility-first layout tokens.",
    tags: ["Tailwind Utility", "Fluid Typography", "Zero Config"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-3",
    title: "Strata Financial Core",
    category: "Fintech Dashboard & Analytics",
    tag: "TS + CSS",
    year: "2024",
    description: "Type-safe asset portfolio management interface with modular scoped CSS architecture.",
    tags: ["Strict TypeScript", "Modular CSS", "Data Cards"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-4",
    title: "Voxel Studio Platform",
    category: "Creative Workspace & 3D Scene Tool",
    tag: "TS + Tailwind",
    year: "2024",
    description: "Enterprise workspace combining typed design token props and fluid gesture cards.",
    tags: ["Typed Tokens", "Production Ready", "Spring Physics"],
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80"
  }
];

function BackgroundStackCard({ index }) {
  const stackConfigs = [
    { rotate: 6, x: 8, y: 12, scale: 0.98, opacity: 0.28, zIndex: 12 },
    { rotate: -7, x: -8, y: 22, scale: 0.95, opacity: 0.18, zIndex: 10 },
    { rotate: 4.5, x: 5, y: 32, scale: 0.92, opacity: 0.10, zIndex: 8 }
  ];
  const cfg = stackConfigs[index] || stackConfigs[2];

  return (
    <motion.div
      className="absolute top-0 left-0 w-full max-w-[360px] h-[480px] rounded-[18px]
                 bg-white/20 border border-white/30 shadow-2xl pointer-events-none"
      style={{ zIndex: cfg.zIndex }}
      animate={{ rotate: cfg.rotate, x: cfg.x, y: cfg.y, scale: cfg.scale, opacity: cfg.opacity }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    />
  );
}

function PortfolioCard({ project, onSwipe }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-260, 0, 260], [-14, 0, 14]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.4, 1, 1, 1, 0.4]);
  const nextOpacity = useTransform(x, [20, 90], [0, 1], { clamp: true });
  const dismissOpacity = useTransform(x, [-90, -20], [1, 0], { clamp: true });

  const handleDragEnd = (_e, info) => {
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 350;
    if (Math.abs(info.offset.x) > cardWidth * 0.28 || Math.abs(info.velocity.x) > 450) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute top-0 left-0 w-full max-w-[360px] h-[480px] rounded-[18px] overflow-hidden
                 bg-[#131316] border border-white/[0.08] shadow-2xl select-none touch-none z-20 will-change-transform cursor-grab"
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.div
        style={{ opacity: nextOpacity }}
        className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full
                   bg-zinc-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-semibold backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> KEEP
      </motion.div>
      <motion.div
        style={{ opacity: dismissOpacity }}
        className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full
                   bg-zinc-900/90 border border-rose-500/40 text-rose-400 text-xs font-semibold backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> DISMISS
      </motion.div>

      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="font-semibold uppercase tracking-wider text-white/45 text-[11px]">Portfolio</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
        <span className="font-mono text-xs font-semibold text-white/90 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-md">
          {project.tag}
        </span>
      </div>

      <div className="relative mx-4 mt-3.5 h-[210px] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.06]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131316]/80 via-transparent to-transparent" />
        <span className="absolute bottom-2.5 left-3 text-[11px] text-white/70">{project.category}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-[17px] font-semibold text-white tracking-tight">{project.title}</h3>
          <ArrowUpRight size={15} className="text-white/35" />
        </div>
        <p className="text-xs text-white/55 leading-relaxed line-clamp-2 mb-3.5">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t, i) => (
            <span key={i} className="text-[11px] text-white/50 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCardStack({ initialCards = PORTFOLIO_PROJECTS, onDiscard }) {
  const [cards, setCards] = useState(initialCards);

  const discardTop = useCallback((dir) => {
    if (cards.length === 0) return;
    const removed = cards[0];
    setCards((prev) => prev.slice(1));
    if (onDiscard) onDiscard(removed, dir);
  }, [cards, onDiscard]);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <div className="relative w-full max-w-[360px] h-[480px]">
        {cards.length > 1 && (
          cards.slice(1, 4).map((_, idx) => (
            <BackgroundStackCard key={idx} index={idx} />
          ))
        )}

        <AnimatePresence mode="popLayout">
          {cards.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full rounded-[18px] bg-[#131316] border border-white/[0.08]
                         flex flex-col items-center justify-center p-8 text-center"
            >
              <FolderGit2 size={24} className="text-white/75 mb-3" />
              <h4 className="text-[17px] font-semibold text-white mb-1">All Projects Reviewed</h4>
              <p className="text-xs text-white/50 mb-5">You've explored all 4 portfolio stacks.</p>
              <button
                onClick={() => setCards(initialCards)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-zinc-950
                           rounded-lg text-xs font-semibold transition-opacity"
              >
                <RotateCcw size={14} />
                <span>Replay Projects</span>
              </button>
            </motion.div>
          ) : (
            <PortfolioCard key={cards[0].id} project={cards[0]} onSwipe={discardTop} />
          )}
        </AnimatePresence>
      </div>

      {cards.length > 0 && (
        <div className="mt-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs font-medium select-none">
          <ArrowLeftRight size={13} className="text-white/70" />
          <span>Drag atau swipe kartu ke kiri / kanan untuk mencoba</span>
        </div>
      )}
    </div>
  );
}`;

// ─────────────────────────────────────────────────────────────
// 3. TypeScript + Custom CSS
// ─────────────────────────────────────────────────────────────
const SWIPE_STACK_TS_CSS = `// SwipeCardStack.tsx (TypeScript + Custom CSS)
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from "framer-motion";
import { RotateCcw, ArrowUpRight, FolderGit2, ArrowLeftRight } from "lucide-react";
import "./SwipeCardStack.css";

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
}

export interface SwipeCardStackProps {
  initialCards?: PortfolioProject[];
  onDiscard?: (project: PortfolioProject, direction: "left" | "right") => void;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-1",
    title: "Atelier Motion Engine",
    category: "Design System & Canvas Physics",
    tag: "JS + CSS",
    year: "2025",
    description: "Zero-dependency spring physics engine driving fluid drag interactions across web canvas.",
    tags: ["Native DOM", "CSS Variables", "Pointer Events"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-2",
    title: "Chronicle Editorial Suite",
    category: "Publishing Platform & CMS",
    tag: "JS + Tailwind",
    year: "2025",
    description: "Minimalist markdown editor and publishing workflow crafted with utility-first layout tokens.",
    tags: ["Tailwind Utility", "Fluid Typography", "Zero Config"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-3",
    title: "Strata Financial Core",
    category: "Fintech Dashboard & Analytics",
    tag: "TS + CSS",
    year: "2024",
    description: "Type-safe asset portfolio management interface with modular scoped CSS architecture.",
    tags: ["Strict TypeScript", "Modular CSS", "Data Cards"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-4",
    title: "Voxel Studio Platform",
    category: "Creative Workspace & 3D Scene Tool",
    tag: "TS + Tailwind",
    year: "2024",
    description: "Enterprise workspace combining typed design token props and fluid gesture cards.",
    tags: ["Typed Tokens", "Production Ready", "Spring Physics"],
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80"
  }
];

function BackgroundStackCard({ index }: { index: number }) {
  const stackConfigs = [
    { rotate: 6, x: 8, y: 12, scale: 0.98, opacity: 0.28, zIndex: 12 },
    { rotate: -7, x: -8, y: 22, scale: 0.95, opacity: 0.18, zIndex: 10 },
    { rotate: 4.5, x: 5, y: 32, scale: 0.92, opacity: 0.10, zIndex: 8 }
  ];
  const cfg = stackConfigs[index] || stackConfigs[2];

  return (
    <motion.div
      className="portfolio-bg-shadow-card"
      style={{ zIndex: cfg.zIndex }}
      animate={{ rotate: cfg.rotate, x: cfg.x, y: cfg.y, scale: cfg.scale, opacity: cfg.opacity }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    />
  );
}

function PortfolioCard({
  project,
  onSwipe
}: {
  project: PortfolioProject;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-260, 0, 260], [-14, 0, 14]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.4, 1, 1, 1, 0.4]);
  const nextOpacity = useTransform(x, [20, 90], [0, 1], { clamp: true });
  const dismissOpacity = useTransform(x, [-90, -20], [1, 0], { clamp: true });

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 350;
    if (Math.abs(info.offset.x) > cardWidth * 0.28 || Math.abs(info.velocity.x) > 450) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="portfolio-front-card"
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.div style={{ opacity: nextOpacity }} className="swipe-pill pill-keep">
        <span className="dot-green" /> KEEP
      </motion.div>
      <motion.div style={{ opacity: dismissOpacity }} className="swipe-pill pill-dismiss">
        <span className="dot-red" /> DISMISS
      </motion.div>

      <div className="card-header">
        <div className="header-left">
          <span className="label-dim">Portfolio</span>
          <span className="label-sep">•</span>
          <span className="label-year">{project.year}</span>
        </div>
        <span className="stack-badge">{project.tag}</span>
      </div>

      <div className="image-preview">
        <img src={project.image} alt={project.title} draggable={false} />
        <div className="image-overlay" />
        <span className="category-label">{project.category}</span>
      </div>

      <div className="card-body">
        <div className="title-row">
          <h3>{project.title}</h3>
          <ArrowUpRight size={15} className="arrow-icon" />
        </div>
        <p className="description">{project.description}</p>
        <div className="tags-row">
          {project.tags.map((t, i) => (
            <span key={i} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCardStack({
  initialCards = PORTFOLIO_PROJECTS,
  onDiscard
}: SwipeCardStackProps) {
  const [cards, setCards] = useState<PortfolioProject[]>(initialCards);

  const discardTop = useCallback((dir: "left" | "right") => {
    if (cards.length === 0) return;
    const removed = cards[0];
    setCards((prev) => prev.slice(1));
    if (onDiscard) onDiscard(removed, dir);
  }, [cards, onDiscard]);

  return (
    <div className="portfolio-stack-container">
      <div className="stack-stage">
        {cards.length > 1 && (
          cards.slice(1, 4).map((_, idx) => (
            <BackgroundStackCard key={idx} index={idx} />
          ))
        )}

        <AnimatePresence mode="popLayout">
          {cards.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="empty-box"
            >
              <FolderGit2 size={24} className="empty-icon" />
              <h4>All Projects Reviewed</h4>
              <p>You've explored all 4 portfolio stacks.</p>
              <button onClick={() => setCards(initialCards)} className="replay-btn">
                <RotateCcw size={14} />
                <span>Replay Projects</span>
              </button>
            </motion.div>
          ) : (
            <PortfolioCard
              key={cards[0].id}
              project={cards[0]}
              onSwipe={discardTop}
            />
          )}
        </AnimatePresence>
      </div>

      {cards.length > 0 && (
        <div className="swipe-hint-pill">
          <ArrowLeftRight size={13} className="swipe-hint-icon" />
          <span>Drag atau swipe kartu ke kiri / kanan untuk mencoba</span>
        </div>
      )}
    </div>
  );
}`;

// ─────────────────────────────────────────────────────────────
// 4. TypeScript + Tailwind CSS
// ─────────────────────────────────────────────────────────────
const SWIPE_STACK_TS_TAILWIND = `// SwipeCardStack.tsx (TypeScript + Tailwind CSS)
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from "framer-motion";
import { RotateCcw, ArrowUpRight, FolderGit2, ArrowLeftRight } from "lucide-react";

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
}

export interface SwipeCardStackProps {
  initialCards?: PortfolioProject[];
  onDiscard?: (project: PortfolioProject, direction: "left" | "right") => void;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-1",
    title: "Atelier Motion Engine",
    category: "Design System & Canvas Physics",
    tag: "JS + CSS",
    year: "2025",
    description: "Zero-dependency spring physics engine driving fluid drag interactions across web canvas.",
    tags: ["Native DOM", "CSS Variables", "Pointer Events"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-2",
    title: "Chronicle Editorial Suite",
    category: "Publishing Platform & CMS",
    tag: "JS + Tailwind",
    year: "2025",
    description: "Minimalist markdown editor and publishing workflow crafted with utility-first layout tokens.",
    tags: ["Tailwind Utility", "Fluid Typography", "Zero Config"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-3",
    title: "Strata Financial Core",
    category: "Fintech Dashboard & Analytics",
    tag: "TS + CSS",
    year: "2024",
    description: "Type-safe asset portfolio management interface with modular scoped CSS architecture.",
    tags: ["Strict TypeScript", "Modular CSS", "Data Cards"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-4",
    title: "Voxel Studio Platform",
    category: "Creative Workspace & 3D Scene Tool",
    tag: "TS + Tailwind",
    year: "2024",
    description: "Enterprise workspace combining typed design token props and fluid gesture cards.",
    tags: ["Typed Tokens", "Production Ready", "Spring Physics"],
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80"
  }
];

function BackgroundStackCard({ index }: { index: number }) {
  const stackConfigs = [
    { rotate: 6, x: 8, y: 12, scale: 0.98, opacity: 0.28, zIndex: 12 },
    { rotate: -7, x: -8, y: 22, scale: 0.95, opacity: 0.18, zIndex: 10 },
    { rotate: 4.5, x: 5, y: 32, scale: 0.92, opacity: 0.10, zIndex: 8 }
  ];
  const cfg = stackConfigs[index] || stackConfigs[2];

  return (
    <motion.div
      className="absolute top-0 left-0 w-full max-w-[360px] h-[480px] rounded-[18px]
                 bg-white/20 border border-white/30 shadow-2xl pointer-events-none"
      style={{ zIndex: cfg.zIndex }}
      animate={{ rotate: cfg.rotate, x: cfg.x, y: cfg.y, scale: cfg.scale, opacity: cfg.opacity }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    />
  );
}

function PortfolioCard({
  project,
  onSwipe
}: {
  project: PortfolioProject;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-260, 0, 260], [-14, 0, 14]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.4, 1, 1, 1, 0.4]);
  const nextOpacity = useTransform(x, [20, 90], [0, 1], { clamp: true });
  const dismissOpacity = useTransform(x, [-90, -20], [1, 0], { clamp: true });

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 350;
    if (Math.abs(info.offset.x) > cardWidth * 0.28 || Math.abs(info.velocity.x) > 450) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute top-0 left-0 w-full max-w-[360px] h-[480px] rounded-[18px] overflow-hidden
                 bg-[#131316] border border-white/[0.08] shadow-2xl select-none touch-none z-20 will-change-transform cursor-grab"
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.div
        style={{ opacity: nextOpacity }}
        className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full
                   bg-zinc-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-semibold backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> KEEP
      </motion.div>
      <motion.div
        style={{ opacity: dismissOpacity }}
        className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full
                   bg-zinc-900/90 border border-rose-500/40 text-rose-400 text-xs font-semibold backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> DISMISS
      </motion.div>

      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="font-semibold uppercase tracking-wider text-white/45 text-[11px]">Portfolio</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
        <span className="font-mono text-xs font-semibold text-white/90 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-md">
          {project.tag}
        </span>
      </div>

      <div className="relative mx-4 mt-3.5 h-[210px] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.06]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131316]/80 via-transparent to-transparent" />
        <span className="absolute bottom-2.5 left-3 text-[11px] text-white/70">{project.category}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-[17px] font-semibold text-white tracking-tight">{project.title}</h3>
          <ArrowUpRight size={15} className="text-white/35" />
        </div>
        <p className="text-xs text-white/55 leading-relaxed line-clamp-2 mb-3.5">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t, i) => (
            <span key={i} className="text-[11px] text-white/50 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCardStack({
  initialCards = PORTFOLIO_PROJECTS,
  onDiscard
}: SwipeCardStackProps) {
  const [cards, setCards] = useState<PortfolioProject[]>(initialCards);

  const discardTop = useCallback((dir: "left" | "right") => {
    if (cards.length === 0) return;
    const removed = cards[0];
    setCards((prev) => prev.slice(1));
    if (onDiscard) onDiscard(removed, dir);
  }, [cards, onDiscard]);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <div className="relative w-full max-w-[360px] h-[480px]">
        {cards.length > 1 && (
          cards.slice(1, 4).map((_, idx) => (
            <BackgroundStackCard key={idx} index={idx} />
          ))
        )}

        <AnimatePresence mode="popLayout">
          {cards.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full rounded-[18px] bg-[#131316] border border-white/[0.08]
                         flex flex-col items-center justify-center p-8 text-center"
            >
              <FolderGit2 size={24} className="text-white/75 mb-3" />
              <h4 className="text-[17px] font-semibold text-white mb-1">All Projects Reviewed</h4>
              <p className="text-xs text-white/50 mb-5">You've explored all 4 portfolio stacks.</p>
              <button
                onClick={() => setCards(initialCards)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-zinc-950
                           rounded-lg text-xs font-semibold transition-opacity"
              >
                <RotateCcw size={14} />
                <span>Replay Projects</span>
              </button>
            </motion.div>
          ) : (
            <PortfolioCard key={cards[0].id} project={cards[0]} onSwipe={discardTop} />
          )}
        </AnimatePresence>
      </div>

      {cards.length > 0 && (
        <div className="mt-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs font-medium select-none">
          <ArrowLeftRight size={13} className="text-white/70" />
          <span>Drag atau swipe kartu ke kiri / kanan untuk mencoba</span>
        </div>
      )}
    </div>
  );
}`;

// ─────────────────────────────────────────────────────────────
// CSS Stylesheet
// ─────────────────────────────────────────────────────────────
const SWIPE_STACK_CSS = `/* SwipeCardStack.css */
.portfolio-stack-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 16px;
}

.stack-stage {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 480px;
}

/* Front active card */
.portfolio-front-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 360px;
  height: 480px;
  border-radius: 18px;
  overflow: hidden;
  background-color: #131316;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(255, 255, 255, 0.05);
  user-select: none;
  touch-action: none;
  cursor: grab;
  z-index: 20;
  will-change: transform;
}

/* Fanned-out background stack cards */
.portfolio-bg-shadow-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 360px;
  height: 480px;
  border-radius: 18px;
  background-color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.swipe-pill {
  position: absolute;
  top: 18px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(24, 24, 27, 0.9);
  padding: 5px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  backdrop-filter: blur(8px);
}

.pill-keep {
  left: 18px;
  border: 1px solid rgba(52, 211, 153, 0.4);
  color: #34d399;
}

.pill-dismiss {
  right: 18px;
  border: 1px solid rgba(248, 113, 113, 0.4);
  color: #f87171;
}

.dot-green {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #34d399;
}

.dot-red {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #f87171;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-dim {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.label-sep {
  color: rgba(255, 255, 255, 0.2);
}

.label-year {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.4);
}

.stack-badge {
  font-size: 11.5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3px 9px;
  border-radius: 6px;
}

.image-preview {
  position: relative;
  margin: 14px 16px 0 16px;
  height: 210px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #1c1c21;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(19, 19, 22, 0.75) 0%, transparent 50%);
}

.category-label {
  position: absolute;
  bottom: 10px;
  left: 12px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
}

.card-body {
  padding: 16px 20px 18px 20px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.title-row h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.015em;
}

.arrow-icon {
  color: rgba(255, 255, 255, 0.35);
}

.description {
  margin: 0 0 14px 0;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3px 8px;
  border-radius: 5px;
}

.empty-box {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background-color: #131316;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
}

.empty-icon {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
}

.empty-box h4 {
  margin: 0 0 6px 0;
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
}

.empty-box p {
  margin: 0 0 20px 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.replay-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  background-color: #ffffff;
  color: #09090b;
  font-weight: 600;
  font-size: 13px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.replay-btn:hover {
  opacity: 0.9;
}

.swipe-hint-pill {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  user-select: none;
}

.swipe-hint-icon {
  color: rgba(255, 255, 255, 0.7);
}`;

export const swipeCardStackCode = {
  code: {
    js: {
      css: SWIPE_STACK_JS_CSS,
      tailwind: SWIPE_STACK_JS_TAILWIND
    },
    ts: {
      css: SWIPE_STACK_TS_CSS,
      tailwind: SWIPE_STACK_TS_TAILWIND
    }
  },
  css: SWIPE_STACK_CSS
};
