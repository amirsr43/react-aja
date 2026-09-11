// src/components/ui/animations/SwipeCardStack.jsx
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowUpRight, FolderGit2, ArrowLeftRight } from "lucide-react";

// Portfolio projects with the 4 stacks (JS+CSS, JS+Tailwind, TS+CSS, TS+Tailwind)
export const PORTFOLIO_PROJECTS = [
  {
    id: "project-1",
    title: "Atelier Motion Engine",
    category: "Design System & Canvas Physics",
    stack: "js+css",
    tag: "JS + CSS",
    year: "2025",
    description: "Zero-dependency spring physics engine driving fluid drag interactions and micro-gestures across web canvas.",
    tags: ["Native DOM", "CSS Variables", "Pointer Events"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-2",
    title: "Chronicle Editorial Suite",
    category: "Publishing Platform & CMS",
    stack: "js+tailwind",
    tag: "JS + Tailwind",
    year: "2025",
    description: "Minimalist markdown editor and publishing workflow crafted with utility-first responsive layout tokens.",
    tags: ["Tailwind Utility", "Fluid Typography", "Zero Config"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-3",
    title: "Strata Financial Core",
    category: "Fintech Dashboard & Analytics",
    stack: "ts+css",
    tag: "TS + CSS",
    year: "2024",
    description: "Type-safe asset portfolio management interface with modular scoped CSS architecture and live metrics.",
    tags: ["Strict TypeScript", "Modular CSS", "Data Cards"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-4",
    title: "Voxel Studio Platform",
    category: "Creative Workspace & 3D Scene Tool",
    stack: "ts+tailwind",
    tag: "TS + Tailwind",
    year: "2024",
    description: "Enterprise workspace combining typed design token props, cloud canvas synchronization, and fluid gesture cards.",
    tags: ["Typed Tokens", "Production Ready", "Spring Physics"],
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80"
  }
];

export function useSwipeCard({ initialCards = PORTFOLIO_PROJECTS, onDiscard, onEmpty } = {}) {
  const [cards, setCards] = useState(initialCards);

  const discardTop = useCallback((direction = "right") => {
    if (cards.length === 0) return;
    const discardedCard = cards[0];
    const remaining = cards.slice(1);
    setCards(remaining);
    if (onDiscard) onDiscard(discardedCard, direction);
    if (remaining.length === 0 && onEmpty) onEmpty();
  }, [cards, onDiscard, onEmpty]);

  const reset = useCallback(() => {
    setCards(initialCards);
  }, [initialCards]);

  return {
    cards,
    discardTop,
    reset,
    isEmpty: cards.length === 0
  };
}

/**
 * Fanned-out shadow silhouette cards behind the active card (matching the stack depth effect)
 */
function BackgroundStackCard({ index }) {
  const stackConfigs = [
    { rotate: 6, x: 8, y: 12, scale: 0.98, opacity: 0.28, zIndex: 12 },
    { rotate: -7, x: -8, y: 22, scale: 0.95, opacity: 0.18, zIndex: 10 },
    { rotate: 4.5, x: 5, y: 32, scale: 0.92, opacity: 0.10, zIndex: 8 }
  ];

  const cfg = stackConfigs[index] || stackConfigs[2];

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "360px",
        height: "480px",
        borderRadius: "18px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
        zIndex: cfg.zIndex,
        pointerEvents: "none"
      }}
      animate={{
        rotate: cfg.rotate,
        x: cfg.x,
        y: cfg.y,
        scale: cfg.scale,
        opacity: cfg.opacity
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26
      }}
    />
  );
}

/**
 * Front active card with clean portfolio content
 */
function PortfolioCard({ project, onSwipe }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Natural physics: subtle rotation and fade
  const rotate = useTransform(x, [-260, 0, 260], [-14, 0, 14]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.4, 1, 1, 1, 0.4]);

  // Subtle directional cues
  const nextOpacity = useTransform(x, [20, 90], [0, 1], { clamp: true });
  const dismissOpacity = useTransform(x, [-90, -20], [1, 0], { clamp: true });

  const handleDragEnd = (_e, info) => {
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 350;
    const threshold = cardWidth * 0.28;
    const velocity = info.velocity.x;

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 450) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="portfolio-swipe-card"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "360px",
        height: "480px",
        borderRadius: "18px",
        overflow: "hidden",
        backgroundColor: "#131316",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(255, 255, 255, 0.05)",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        zIndex: 20,
        willChange: "transform",
        x,
        y,
        rotate,
        opacity
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 26
      }}
    >
      {/* Minimalist Swipe Cues */}
      <motion.div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 30,
          opacity: nextOpacity,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "rgba(24, 24, 27, 0.9)",
          border: "1px solid rgba(52, 211, 153, 0.4)",
          color: "#34d399",
          padding: "5px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.03em",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
        }}
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#34d399" }} />
        KEEP
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 30,
          opacity: dismissOpacity,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "rgba(24, 24, 27, 0.9)",
          border: "1px solid rgba(248, 113, 113, 0.4)",
          color: "#f87171",
          padding: "5px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.03em",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
        }}
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f87171" }} />
        DISMISS
      </motion.div>

      {/* Card Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px 14px 20px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          }}>
            Portfolio
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
          <span style={{
            fontSize: "11.5px",
            color: "rgba(255, 255, 255, 0.4)"
          }}>
            {project.year}
          </span>
        </div>

        {/* Stack Badge */}
        <span style={{
          fontSize: "11.5px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.9)",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "3px 9px",
          borderRadius: "6px"
        }}>
          {project.tag}
        </span>
      </div>

      {/* Project Image Preview */}
      <div style={{
        position: "relative",
        margin: "14px 16px 0 16px",
        height: "210px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#1c1c21",
        border: "1px solid rgba(255, 255, 255, 0.06)"
      }}>
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none"
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(19, 19, 22, 0.75) 0%, transparent 50%)"
        }} />

        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "12px",
          fontSize: "11px",
          color: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <span>{project.category}</span>
        </div>
      </div>

      {/* Project Info */}
      <div style={{ padding: "16px 20px 18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <h3 style={{
            margin: 0,
            fontSize: "17px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.015em"
          }}>
            {project.title}
          </h3>
          <ArrowUpRight size={15} color="rgba(255, 255, 255, 0.35)" />
        </div>

        <p style={{
          margin: "0 0 14px 0",
          fontSize: "12.5px",
          color: "rgba(255, 255, 255, 0.55)",
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {project.description}
        </p>

        {/* Feature Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tags.map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                padding: "3px 8px",
                borderRadius: "5px"
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      style={{
        width: "100%",
        maxWidth: "360px",
        height: "480px",
        borderRadius: "18px",
        backgroundColor: "#131316",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        textAlign: "center",
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
      }}
    >
      <div style={{
        width: "52px",
        height: "52px",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "16px",
        color: "rgba(255, 255, 255, 0.75)"
      }}>
        <FolderGit2 size={24} />
      </div>

      <h4 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 600, color: "#ffffff" }}>
        All Projects Reviewed
      </h4>
      <p style={{
        margin: "0 0 20px 0",
        fontSize: "13px",
        color: "rgba(255, 255, 255, 0.5)",
        lineHeight: "1.4"
      }}>
        You've explored all 4 stack implementations in this showcase.
      </p>

      <button
        onClick={onReset}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 18px",
          backgroundColor: "#ffffff",
          color: "#09090b",
          fontWeight: 600,
          fontSize: "13px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "opacity 0.2s"
        }}
      >
        <RotateCcw size={14} />
        <span>Replay Projects</span>
      </button>
    </motion.div>
  );
}

export default function SwipeCardStack({
  initialCards = PORTFOLIO_PROJECTS,
  onDiscard,
  onEmpty
}) {
  const { cards, discardTop, reset, isEmpty } = useSwipeCard({
    initialCards,
    onDiscard,
    onEmpty
  });

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      width: "100%"
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "360px",
        height: "480px"
      }}>
        {/* Realistic fanned-out background stack cards matching reference */}
        {!isEmpty && cards.length > 1 && (
          cards.slice(1, 4).map((_, idx) => (
            <BackgroundStackCard key={`bg-stack-${idx}`} index={idx} />
          ))
        )}

        {/* Front active card */}
        <AnimatePresence mode="popLayout">
          {isEmpty ? (
            <EmptyState key="empty" onReset={reset} />
          ) : (
            <PortfolioCard
              key={cards[0].id}
              project={cards[0]}
              onSwipe={(dir) => discardTop(dir)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Swipe Gesture Instruction Notice */}
      {!isEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            userSelect: "none"
          }}
        >
          <motion.span
            animate={{ x: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <ArrowLeftRight size={13} color="rgba(255, 255, 255, 0.7)" />
          </motion.span>
          <span>Drag atau swipe kartu ke kiri / kanan untuk mencoba</span>
        </motion.div>
      )}
    </div>
  );
}
