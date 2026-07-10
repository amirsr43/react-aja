// src/data/codes/expandingSearch.js

export const expandingSearchCode = {
  code: {
    js: {
      css: `// ExpandingSearch.jsx (JavaScript + Custom CSS)
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import "./ExpandingSearch.css"; // Include the CSS stylesheet below

export default function ExpandingSearch({
  placeholder = "Search components...",
  onSearch,
  className = "",
  ...props
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState("");

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const pillRef = useRef(null);

  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 22,
    mass: 0.7,
  };

  // Focus input when expanding
  useEffect(() => {
    if (isExpanded) {
      requestAnimationFrame(() => {
        if (inputRef.current) inputRef.current.focus();
      });
    }
  }, [isExpanded]);

  // Click outside collapses
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsExpanded(false);
        setValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setValue("");
    }
    if (e.key === "Enter" && onSearch) onSearch(value);
  };

  return (
    <div className={\`exp-search-wrapper \${className}\`} ref={wrapperRef} {...props}>
      <motion.div
        ref={pillRef}
        className={\`exp-search-pill \${isExpanded ? "focused" : ""}\`}
        initial={{ width: 50 }}
        animate={{ width: isExpanded ? 320 : 50 }}
        transition={springTransition}
        onClick={!isExpanded ? handleExpand : undefined}
        onMouseEnter={!isExpanded ? handleExpand : undefined}
      >
        <button className="exp-search-icon-btn" tabIndex={-1} onClick={isExpanded ? undefined : handleExpand}>
          <Search size={18} strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              ref={inputRef}
              key="search-input"
              className="exp-search-input"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && value.length > 0 && (
            <motion.button
              key="clear-btn"
              className="exp-search-clear-btn"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`,
      tailwind: `// ExpandingSearch.jsx (JavaScript + Tailwind CSS)
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export default function ExpandingSearch({
  placeholder = "Search components...",
  onSearch,
  className = "",
  ...props
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState("");

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const pillRef = useRef(null);

  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 22,
    mass: 0.7,
  };

  // Focus input when expanding
  useEffect(() => {
    if (isExpanded) {
      requestAnimationFrame(() => {
        if (inputRef.current) inputRef.current.focus();
      });
    }
  }, [isExpanded]);

  // Click outside collapses
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsExpanded(false);
        setValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setValue("");
    }
    if (e.key === "Enter" && onSearch) onSearch(value);
  };

  return (
    <div className={\`flex items-center justify-center relative font-sans select-none \${className}\`} ref={wrapperRef} {...props}>
      <motion.div
        ref={pillRef}
        className={\`relative flex items-center h-[50px] bg-white/[0.06] border rounded-full overflow-hidden cursor-text shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 \${
          isExpanded ? "border-purple-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_3px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]" : "border-white/10"
        }\`}
        initial={{ width: 50 }}
        animate={{ width: isExpanded ? 320 : 50 }}
        transition={springTransition}
        onClick={!isExpanded ? handleExpand : undefined}
        onMouseEnter={!isExpanded ? handleExpand : undefined}
      >
        <button 
          className={\`w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer border-none bg-transparent hover:text-white \${
            isExpanded ? "text-purple-400" : "text-white/50"
          }\`} 
          tabIndex={-1} 
          onClick={isExpanded ? undefined : handleExpand}
        >
          <Search size={18} strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              ref={inputRef}
              key="search-input"
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-white pl-0.5 caret-purple-400 placeholder:text-white/30 placeholder:font-normal"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && value.length > 0 && (
            <motion.button
              key="clear-btn"
              className="w-9 h-9 mr-1.5 flex-shrink-0 flex items-center justify-center text-white/35 cursor-pointer border-none bg-white/6 rounded-full transition-all duration-200 hover:text-white hover:bg-white/12"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`
    },
    ts: {
      css: `// ExpandingSearch.tsx (TypeScript + Custom CSS)
import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import "./ExpandingSearch.css"; // Include the CSS stylesheet below

interface ExpandingSearchProps {
  placeholder?: string;
  onSearch?: (val: string) => void;
  className?: string;
}

export default function ExpandingSearch({
  placeholder = "Search components...",
  onSearch,
  className = "",
  ...props
}: ExpandingSearchProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 22,
    mass: 0.7,
  };

  // Focus input when expanding
  useEffect(() => {
    if (isExpanded) {
      requestAnimationFrame(() => {
        if (inputRef.current) inputRef.current.focus();
      });
    }
  }, [isExpanded]);

  // Click outside collapses
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setValue("");
    }
    if (e.key === "Enter" && onSearch) onSearch(value);
  };

  return (
    <div className={\`exp-search-wrapper \${className}\`} ref={wrapperRef} {...props}>
      <motion.div
        ref={pillRef}
        className={\`exp-search-pill \${isExpanded ? "focused" : ""}\`}
        initial={{ width: 50 }}
        animate={{ width: isExpanded ? 320 : 50 }}
        transition={springTransition}
        onClick={!isExpanded ? handleExpand : undefined}
        onMouseEnter={!isExpanded ? handleExpand : undefined}
      >
        <button className="exp-search-icon-btn" tabIndex={-1} onClick={isExpanded ? undefined : handleExpand}>
          <Search size={18} strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              ref={inputRef}
              key="search-input"
              className="exp-search-input"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && value.length > 0 && (
            <motion.button
              key="clear-btn"
              className="exp-search-clear-btn"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`,
      tailwind: `// ExpandingSearch.tsx (TypeScript + Tailwind CSS)
import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface ExpandingSearchProps {
  placeholder?: string;
  onSearch?: (val: string) => void;
  className?: string;
}

export default function ExpandingSearch({
  placeholder = "Search components...",
  onSearch,
  className = "",
  ...props
}: ExpandingSearchProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 22,
    mass: 0.7,
  };

  // Focus input when expanding
  useEffect(() => {
    if (isExpanded) {
      requestAnimationFrame(() => {
        if (inputRef.current) inputRef.current.focus();
      });
    }
  }, [isExpanded]);

  // Click outside collapses
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setValue("");
    }
    if (e.key === "Enter" && onSearch) onSearch(value);
  };

  return (
    <div className={\`flex items-center justify-center relative font-sans select-none \${className}\`} ref={wrapperRef} {...props}>
      <motion.div
        ref={pillRef}
        className={\`relative flex items-center h-[50px] bg-white/[0.06] border rounded-full overflow-hidden cursor-text shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 \${
          isExpanded ? "border-purple-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_3px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]" : "border-white/10"
        }\`}
        initial={{ width: 50 }}
        animate={{ width: isExpanded ? 320 : 50 }}
        transition={springTransition}
        onClick={!isExpanded ? handleExpand : undefined}
        onMouseEnter={!isExpanded ? handleExpand : undefined}
      >
        <button 
          className={\`w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer border-none bg-transparent hover:text-white \${
            isExpanded ? "text-purple-400" : "text-white/50"
          }\`} 
          tabIndex={-1} 
          onClick={isExpanded ? undefined : handleExpand}
        >
          <Search size={18} strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              ref={inputRef}
              key="search-input"
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-white pl-0.5 caret-purple-400 placeholder:text-white/30 placeholder:font-normal"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && value.length > 0 && (
            <motion.button
              key="clear-btn"
              className="w-9 h-9 mr-1.5 flex-shrink-0 flex items-center justify-center text-white/35 cursor-pointer border-none bg-white/6 rounded-full transition-all duration-200 hover:text-white hover:bg-white/12"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`
    }
  },
  css: `.exp-search-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.exp-search-pill {
  height: 50px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: text;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(12px);
}

.exp-search-pill.focused {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(139, 92, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.exp-search-icon-btn {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
}

.exp-search-pill.focused .exp-search-icon-btn {
  color: #a78bfa;
}

.exp-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  padding: 0 0 0 2px;
  caret-color: #a78bfa;
}

.exp-search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
}

.exp-search-clear-btn {
  width: 36px;
  height: 36px;
  margin-right: 7px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.exp-search-clear-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}`
};
