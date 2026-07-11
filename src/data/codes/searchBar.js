// src/data/codes/searchBar.js

export const searchBarCode = {
  code: {
    js: {
      css: `// SearchBar.jsx (JavaScript + Custom CSS)
import React, { useState, useRef, useEffect } from "react";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./SearchBar.css"; // Include the CSS stylesheet below

export default function SearchBar({
  placeholder = "Search documents, components...",
  recentQueries = [],
  suggestedTags = [],
  onSearch,
  onDeleteRecent,
  alwaysOpen = false,
  onFocus,
  onBlur
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (alwaysOpen) return;
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        if (onBlur) onBlur();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [alwaysOpen, onBlur]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (query.trim() && onSearch) {
        onSearch(query.trim());
      }
      setIsFocused(false);
      if (onBlur) onBlur();
    }
  };

  const handleSelectRecent = (val) => {
    setQuery(val);
    if (onSearch) onSearch(val);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleSelectTag = (tag) => {
    setQuery(tag);
    if (onSearch) onSearch(tag);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="search-wrapper" ref={containerRef}>
      {/* Search Input Box */}
      <div className={\`search-input-box \${(isFocused || alwaysOpen) ? "focused" : ""}\`}>
        <Search size={18} className="search-icon-left" />
        <input
          type="text"
          className="search-input-field"
          placeholder={placeholder}
          value={query}
          onFocus={() => {
            setIsFocused(true);
            if (onFocus) onFocus();
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button className="search-clear-btn" onClick={() => setQuery("")}>
            <X size={15} />
          </button>
        ) : (
          <span className="search-shortcut-badge">⌘ K</span>
        )}
      </div>

      {/* Suggestion Dropdown panel */}
      <AnimatePresence>
        {(isFocused || alwaysOpen) && (recentQueries.length > 0 || suggestedTags.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="search-dropdown"
          >
            {recentQueries.length > 0 && (
              <div className="search-dropdown-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "12px", marginBottom: "8px" }}>
                <span className="search-section-title">Recent Searches</span>
                <div className="search-recent-list">
                  {recentQueries.map((q) => (
                    <div key={q} className="search-recent-item" onClick={() => handleSelectRecent(q)}>
                      <div className="search-recent-left">
                        <Clock size={14} className="search-recent-icon" />
                        <span>{q}</span>
                      </div>
                      <button
                        className="search-recent-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRecent && onDeleteRecent(q);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {suggestedTags.length > 0 && (
              <div className="search-dropdown-section">
                <span className="search-section-title">Trending Tags</span>
                <div className="search-tags-row">
                  {suggestedTags.map((tag) => (
                    <span key={tag} className="search-tag-badge" onClick={() => handleSelectTag(tag)}>
                      <Sparkles size={11} className="text-blue-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`,
      tailwind: `// SearchBar.jsx (JavaScript + Tailwind CSS)
import React, { useState, useRef, useEffect } from "react";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({
  placeholder = "Search documents, components...",
  recentQueries = [],
  suggestedTags = [],
  onSearch,
  onDeleteRecent,
  alwaysOpen = false,
  onFocus,
  onBlur
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (alwaysOpen) return;
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        if (onBlur) onBlur();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [alwaysOpen, onBlur]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (query.trim() && onSearch) {
        onSearch(query.trim());
      }
      setIsFocused(false);
      if (onBlur) onBlur();
    }
  };

  const handleSelectRecent = (val) => {
    setQuery(val);
    if (onSearch) onSearch(val);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleSelectTag = (tag) => {
    setQuery(tag);
    if (onSearch) onSearch(tag);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="relative w-full max-w-[440px]" ref={containerRef}>
      {/* Search Input Box */}
      <div className={\`flex items-center bg-zinc-950/45 border rounded-2xl px-[18px] py-1.5 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] backdrop-blur-md \${
        (isFocused || alwaysOpen) ? "border-blue-500 bg-zinc-950/75 shadow-[0_15px_30px_rgba(0,0,0,0.4),0_0_25px_rgba(59,130,246,0.2)]" : "border-white/5"
      }\`}>
        <Search size={18} className="text-white/30 mr-3" />
        <input
          type="text"
          className="flex-grow bg-transparent border-none text-white outline-none h-12 w-full text-sm"
          placeholder={placeholder}
          value={query}
          onFocus={() => {
            setIsFocused(true);
            if (onFocus) onFocus();
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button className="text-white/30 hover:text-white transition-colors duration-200 cursor-pointer" onClick={() => setQuery("")}>
            <X size={15} />
          </button>
        ) : (
          <span className="text-[10px] font-bold text-white/30 bg-white/3 border border-white/6 px-1.5 py-0.5 rounded-md">⌘ K</span>
        )}
      </div>

      {/* Suggestion Dropdown panel */}
      <AnimatePresence>
        {(isFocused || alwaysOpen) && (recentQueries.length > 0 || suggestedTags.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-full left-0 right-0 mt-3 bg-zinc-950/85 border border-white/6 rounded-2xl backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.03)] z-[5] p-3"
          >
            {recentQueries.length > 0 && (
              <div className="p-1.5 border-b border-white/5 pb-3 mb-2">
                <span className="text-[11px] font-extrabold text-white/25 uppercase tracking-widest">Recent Searches</span>
                <div className="flex flex-col gap-1 mt-2">
                  {recentQueries.map((q) => (
                    <div 
                      key={q} 
                      className="flex items-center justify-between p-2.5 rounded-lg cursor-pointer text-white/65 transition-all duration-200 hover:bg-white/3 hover:text-white hover:translate-x-0.5" 
                      onClick={() => handleSelectRecent(q)}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-white/40" />
                        <span className="text-sm">{q}</span>
                      </div>
                      <button
                        className="text-white/30 hover:text-white transition-colors duration-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRecent && onDeleteRecent(q);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {suggestedTags.length > 0 && (
              <div className="p-1.5">
                <span className="text-[11px] font-extrabold text-white/25 uppercase tracking-widest">Trending Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-white/2 border border-white/5 text-white/60 text-[11.5px] font-semibold px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex items-center gap-1.5 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500/35 hover:text-blue-500 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]" 
                      onClick={() => handleSelectTag(tag)}
                    >
                      <Sparkles size={11} className="text-blue-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`
    },
    ts: {
      css: `// SearchBar.tsx (TypeScript + Custom CSS)
import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./SearchBar.css"; // Include the CSS stylesheet below

interface SearchBarProps {
  placeholder?: string;
  recentQueries?: string[];
  suggestedTags?: string[];
  onSearch?: (query: string) => void;
  onDeleteRecent?: (query: string) => void;
  alwaysOpen?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  placeholder = "Search documents, components...",
  recentQueries = [],
  suggestedTags = [],
  onSearch,
  onDeleteRecent,
  alwaysOpen = false,
  onFocus,
  onBlur
}: SearchBarProps): React.JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alwaysOpen) return;
    const handleOutsideClick = (e: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        if (onBlur) onBlur();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [alwaysOpen, onBlur]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim() && onSearch) {
        onSearch(query.trim());
      }
      setIsFocused(false);
      if (onBlur) onBlur();
    }
  };

  const handleSelectRecent = (val: string) => {
    setQuery(val);
    if (onSearch) onSearch(val);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    if (onSearch) onSearch(tag);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="search-wrapper" ref={containerRef}>
      {/* Search Input Box */}
      <div className={\`search-input-box \${(isFocused || alwaysOpen) ? "focused" : ""}\`}>
        <Search size={18} className="search-icon-left" />
        <input
          type="text"
          className="search-input-field"
          placeholder={placeholder}
          value={query}
          onFocus={() => {
            setIsFocused(true);
            if (onFocus) onFocus();
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button className="search-clear-btn" onClick={() => setQuery("")}>
            <X size={15} />
          </button>
        ) : (
          <span className="search-shortcut-badge">⌘ K</span>
        )}
      </div>

      {/* Suggestion Dropdown panel */}
      <AnimatePresence>
        {(isFocused || alwaysOpen) && (recentQueries.length > 0 || suggestedTags.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="search-dropdown"
          >
            {recentQueries.length > 0 && (
              <div className="search-dropdown-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "12px", marginBottom: "8px" }}>
                <span className="search-section-title">Recent Searches</span>
                <div className="search-recent-list">
                  {recentQueries.map((q) => (
                    <div key={q} className="search-recent-item" onClick={() => handleSelectRecent(q)}>
                      <div className="search-recent-left">
                        <Clock size={14} className="search-recent-icon" />
                        <span>{q}</span>
                      </div>
                      <button
                        className="search-recent-delete"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          onDeleteRecent && onDeleteRecent(q);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {suggestedTags.length > 0 && (
              <div className="search-dropdown-section">
                <span className="search-section-title">Trending Tags</span>
                <div className="search-tags-row">
                  {suggestedTags.map((tag) => (
                    <span key={tag} className="search-tag-badge" onClick={() => handleSelectTag(tag)}>
                      <Sparkles size={11} className="text-blue-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`,
      tailwind: `// SearchBar.tsx (TypeScript + Tailwind CSS)
import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  placeholder?: string;
  recentQueries?: string[];
  suggestedTags?: string[];
  onSearch?: (query: string) => void;
  onDeleteRecent?: (query: string) => void;
  alwaysOpen?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  placeholder = "Search documents, components...",
  recentQueries = [],
  suggestedTags = [],
  onSearch,
  onDeleteRecent,
  alwaysOpen = false,
  onFocus,
  onBlur
}: SearchBarProps): React.JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alwaysOpen) return;
    const handleOutsideClick = (e: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        if (onBlur) onBlur();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [alwaysOpen, onBlur]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim() && onSearch) {
        onSearch(query.trim());
      }
      setIsFocused(false);
      if (onBlur) onBlur();
    }
  };

  const handleSelectRecent = (val: string) => {
    setQuery(val);
    if (onSearch) onSearch(val);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    if (onSearch) onSearch(tag);
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="relative w-full max-w-[440px]" ref={containerRef}>
      {/* Search Input Box */}
      <div className={\`flex items-center bg-zinc-950/45 border rounded-2xl px-[18px] py-1.5 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] backdrop-blur-md \${
        (isFocused || alwaysOpen) ? "border-blue-500 bg-zinc-950/75 shadow-[0_15px_30px_rgba(0,0,0,0.4),0_0_25px_rgba(59,130,246,0.2)]" : "border-white/5"
      }\`}>
        <Search size={18} className="text-white/30 mr-3" />
        <input
          type="text"
          className="flex-grow bg-transparent border-none text-white outline-none h-12 w-full text-sm"
          placeholder={placeholder}
          value={query}
          onFocus={() => {
            setIsFocused(true);
            if (onFocus) onFocus();
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button className="text-white/30 hover:text-white transition-colors duration-200 cursor-pointer" onClick={() => setQuery("")}>
            <X size={15} />
          </button>
        ) : (
          <span className="text-[10px] font-bold text-white/30 bg-white/3 border border-white/6 px-1.5 py-0.5 rounded-md">⌘ K</span>
        )}
      </div>

      {/* Suggestion Dropdown panel */}
      <AnimatePresence>
        {(isFocused || alwaysOpen) && (recentQueries.length > 0 || suggestedTags.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-full left-0 right-0 mt-3 bg-zinc-950/85 border border-white/6 rounded-2xl backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.03)] z-[5] p-3"
          >
            {recentQueries.length > 0 && (
              <div className="p-1.5 border-b border-white/5 pb-3 mb-2">
                <span className="text-[11px] font-extrabold text-white/25 uppercase tracking-widest">Recent Searches</span>
                <div className="flex flex-col gap-1 mt-2">
                  {recentQueries.map((q) => (
                    <div 
                      key={q} 
                      className="flex items-center justify-between p-2.5 rounded-lg cursor-pointer text-white/65 transition-all duration-200 hover:bg-white/3 hover:text-white hover:translate-x-0.5" 
                      onClick={() => handleSelectRecent(q)}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-white/40" />
                        <span className="text-sm">{q}</span>
                      </div>
                      <button
                        className="text-white/30 hover:text-white transition-colors duration-200 cursor-pointer"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          onDeleteRecent && onDeleteRecent(q);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {suggestedTags.length > 0 && (
              <div className="p-1.5">
                <span className="text-[11px] font-extrabold text-white/25 uppercase tracking-widest">Trending Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-white/2 border border-white/5 text-white/60 text-[11.5px] font-semibold px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex items-center gap-1.5 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500/35 hover:text-blue-500 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]" 
                      onClick={() => handleSelectTag(tag)}
                    >
                      <Sparkles size={11} className="text-blue-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`
    }
  },
  css: `/* Search Box Container */
.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
}

.search-input-box {
  display: flex;
  align-items: center;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 4px 18px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(8px);
}

.search-input-box.focused {
  border-color: #3b82f6;
  background: rgba(10, 10, 12, 0.75);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(59, 130, 246, 0.2);
}

.search-input-field {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  outline: none;
  height: 48px;
}

.search-shortcut-badge {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3px 6px;
  border-radius: 6px;
}

@media (max-width: 640px) {
  .search-shortcut-badge {
    display: none;
  }
}

/* Glassmorphic Dropdown overlay */
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 12px;
  background: rgba(10, 10, 12, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  backdrop-filter: blur(24px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.03);
  z-index: 5;
  padding: 12px;
}

.search-dropdown-section {
  padding: 8px 6px;
}

.search-section-title {
  font-size: 11px;
  font-weight: 750;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.search-recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.2s ease;
}

.search-recent-item:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  transform: translateX(2px);
}

.search-tag-badge {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  font-size: 11.5px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-tag-badge:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-color: rgba(59, 130, 246, 0.35);
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.1);
}`
};
