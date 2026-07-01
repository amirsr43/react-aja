// src/components/ui/ExpandingSearch.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const EXPANDING_SEARCH_STYLES = `
/* ── EXPANDING SEARCH BAR STYLES ── */
.exp-search-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', 'Inter', sans-serif;
  user-select: none;
}

/* The outer pill container */
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
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.exp-search-pill.focused {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.3),
    0 0 0 3px rgba(139, 92, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Icon button on the left */
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

/* Text input field */
.exp-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: -0.01em;
  padding: 0 0 0 2px;
  caret-color: #a78bfa;
  white-space: nowrap;
}

.exp-search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
}

/* Clear button on the right */
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
}
`;

export function ExpandingSearch({
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
    <div
      className={`exp-search-wrapper ${className}`}
      ref={wrapperRef}
      {...props}
    >
      <style>{EXPANDING_SEARCH_STYLES}</style>

      <motion.div
        ref={pillRef}
        className={`exp-search-pill ${isExpanded ? "focused" : ""}`}
        initial={{ width: 50 }}
        animate={{ width: isExpanded ? 320 : 50 }}
        transition={springTransition}
        onClick={!isExpanded ? handleExpand : undefined}
        onMouseEnter={!isExpanded ? handleExpand : undefined}
      >
        {/* Search Icon */}
        <button
          className="exp-search-icon-btn"
          tabIndex={-1}
          onClick={isExpanded ? undefined : handleExpand}
          aria-label="Search"
          type="button"
        >
          <Search size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>

        {/* Input field */}
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

        {/* Clear button */}
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
}

export default ExpandingSearch;
