// src/components/ui/animations/ScrollHighlightParagraph.jsx
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const HIGHLIGHT_STYLES = `
.scroll-highlight-container {
  width: 100%;
  max-width: 600px;
  height: 180px;
  overflow-y: auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}

.scroll-highlight-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-highlight-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-highlight-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}

.scroll-highlight-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.scroll-highlight-para {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.6;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
}

.scroll-highlight-word-box {
  position: relative;
  display: inline-block;
  margin-right: 0.25em;
}

.scroll-highlight-word-bg {
  opacity: 0.15;
  color: #ffffff;
  user-select: none;
  pointer-events: none;
}

.scroll-highlight-word-fg {
  position: absolute;
  inset: 0;
  color: #ffffff;
}
`;

function WordHighlight({ word, index, total, progress }) {
  const start = index / total;
  const end = (index + 1.5) / total;
  const opacity = useTransform(progress, [start, Math.min(end, 1)], [0, 1]);

  return (
    <span className="scroll-highlight-word-box">
      <span className="scroll-highlight-word-bg">{word}</span>
      <motion.span style={{ opacity }} className="scroll-highlight-word-fg">
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrollHighlightParagraph({ 
  text = "Scroll down to reveal this elegant text. Each word will light up automatically as it enters your reading viewport, creating a highly polished scroll experience.", 
  className = "",
  localScroll = true
}) {
  const containerRef = useRef(null);
  const words = text.split(" ");

  // Local scroll progress motion value
  const localScrollProgress = useMotionValue(0);

  // Page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"]
  });

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = scrollTop / (scrollHeight - clientHeight);
    localScrollProgress.set(isNaN(progress) ? 0 : progress);
  };

  useEffect(() => {
    if (localScroll && containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      localScrollProgress.set(isNaN(progress) ? 0 : progress);
    }
  }, [localScroll, text]);

  const activeProgress = localScroll ? localScrollProgress : scrollYProgress;

  return (
    <>
      <style>{HIGHLIGHT_STYLES}</style>
      {localScroll ? (
        <div 
          ref={containerRef} 
          className="scroll-highlight-container" 
          onScroll={handleScroll}
        >
          <div style={{ height: "30px" }} />
          <p className={`scroll-highlight-para ${className}`} style={{ margin: 0 }}>
            {words.map((word, i) => (
              <WordHighlight 
                key={i} 
                word={word} 
                index={i} 
                total={words.length} 
                progress={activeProgress} 
              />
            ))}
          </p>
          <div style={{ height: "120px" }} />
        </div>
      ) : (
        <div ref={containerRef} style={{ position: "relative" }}>
          <p className={`scroll-highlight-para ${className}`} style={{ margin: 0 }}>
            {words.map((word, i) => (
              <WordHighlight 
                key={i} 
                word={word} 
                index={i} 
                total={words.length} 
                progress={activeProgress} 
              />
            ))}
          </p>
        </div>
      )}
    </>
  );
}


