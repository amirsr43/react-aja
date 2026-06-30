// src/data/codes/scrollHighlightParagraph.js

export const scrollHighlightParagraphCode = {
  code: {
    js: {
      css: `// ScrollHighlightParagraph.jsx (JavaScript + Custom CSS)
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import "./ScrollHighlightParagraph.css"; // Include the CSS stylesheet below

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
  text = "Scroll down to reveal this elegant text. Each word will light up automatically.", 
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
      {localScroll ? (
        <div 
          ref={containerRef} 
          className="scroll-highlight-container" 
          onScroll={handleScroll}
        >
          <div style={{ height: "30px" }} />
          <p className={\`scroll-highlight-para \${className}\`} style={{ margin: 0 }}>
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
          <p className={\`scroll-highlight-para \${className}\`} style={{ margin: 0 }}>
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
}`,
      tailwind: `// ScrollHighlightParagraph.jsx (JavaScript + Tailwind CSS)
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

function WordHighlight({ word, index, total, progress }) {
  const start = index / total;
  const end = (index + 1.5) / total;
  const opacity = useTransform(progress, [start, Math.min(end, 1)], [0, 1]);

  return (
    <span className="relative inline-block mr-[0.25em]">
      <span className="opacity-15 text-white select-none pointer-events-none">{word}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 text-white">
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrollHighlightParagraph({ 
  text = "Scroll down to reveal this elegant text. Each word will light up automatically.", 
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

  const content = (
    <p className={\`flex flex-wrap leading-relaxed \${className}\`} style={{ margin: 0 }}>
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
  );

  if (localScroll) {
    return (
      <div 
        ref={containerRef} 
        className="w-full max-w-[600px] h-[180px] overflow-y-auto p-5 bg-white/2 border border-white/6 rounded-2xl relative scrollbar-thin scrollbar-thumb-white/15"
        onScroll={handleScroll}
      >
        <div style={{ height: "30px" }} />
        {content}
        <div style={{ height: "100px" }} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {content}
    </div>
  );
}`
    },
    ts: {
      css: `// ScrollHighlightParagraph.tsx (TypeScript + Custom CSS)
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
import "./ScrollHighlightParagraph.css";

interface WordHighlightProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function WordHighlight({ word, index, total, progress }: WordHighlightProps) {
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

interface ScrollHighlightParagraphProps {
  text: string;
  className?: string;
  localScroll?: boolean;
}

export default function ScrollHighlightParagraph({ 
  text, 
  className = "",
  localScroll = true 
}: ScrollHighlightParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  // Local scroll progress motion value
  const localScrollProgress = useMotionValue<number>(0);

  // Page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"]
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
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
      {localScroll ? (
        <div 
          ref={containerRef} 
          className="scroll-highlight-container" 
          onScroll={handleScroll}
        >
          <div style={{ height: "30px" }} />
          <p className={\`scroll-highlight-para \${className}\`} style={{ margin: 0 }}>
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
          <p className={\`scroll-highlight-para \${className}\`} style={{ margin: 0 }}>
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
}`,
      tailwind: `// ScrollHighlightParagraph.tsx (TypeScript + Tailwind CSS)
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";

interface WordHighlightProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function WordHighlight({ word, index, total, progress }: WordHighlightProps) {
  const start = index / total;
  const end = (index + 1.5) / total;
  const opacity = useTransform(progress, [start, Math.min(end, 1)], [0, 1]);

  return (
    <span className="relative inline-block mr-[0.25em]">
      <span className="opacity-15 text-white select-none pointer-events-none">{word}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 text-white">
        {word}
      </motion.span>
    </span>
  );
}

interface ScrollHighlightParagraphProps {
  text: string;
  className?: string;
  localScroll?: boolean;
}

export default function ScrollHighlightParagraph({ 
  text, 
  className = "",
  localScroll = true 
}: ScrollHighlightParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  // Local scroll progress motion value
  const localScrollProgress = useMotionValue<number>(0);

  // Page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"]
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
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

  const content = (
    <p className={\`flex flex-wrap leading-relaxed \${className}\`} style={{ margin: 0 }}>
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
  );

  if (localScroll) {
    return (
      <div 
        ref={containerRef} 
        className="w-full max-w-[600px] h-[180px] overflow-y-auto p-5 bg-white/2 border border-white/6 rounded-2xl relative scrollbar-thin scrollbar-thumb-white/15"
        onScroll={handleScroll}
      >
        <div style={{ height: "30px" }} />
        {content}
        <div style={{ height: "100px" }} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {content}
    </div>
  );
}`
    }
  },
  css: `/* ScrollHighlightParagraph.css */
.scroll-highlight-container {
  width: 100%;
  max-width: 600px;
  height: 180px;
  overflow-y: auto;
  padding: 20px;
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
}`
};
