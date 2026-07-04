// src/components/ui/SearchBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEARCH_STYLES = `
/* ── PREMIUM SEARCH BAR CORE STYLES ── */
.search-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
}

/* Glassmorphic input container */
.search-input-box {
  display: flex;
  align-items: center;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 4px 18px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.search-input-box.focused {
  border-color: #3b82f6;
  background: rgba(10, 10, 12, 0.75);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.4),
    0 0 25px rgba(59, 130, 246, 0.2);
}

.search-icon-left {
  color: rgba(255, 255, 255, 0.35);
  margin-right: 12px;
  transition: color 0.3s;
  flex-shrink: 0;
}

.search-input-box.focused .search-icon-left {
  color: #3b82f6;
  transform: scale(1.05);
}

.search-input-field {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 14.5px;
  height: 48px;
  outline: none;
  width: 100%;
}

.search-input-field::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.search-shortcut-badge {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3px 6px;
  border-radius: 6px;
  user-select: none;
  transition: all 0.3s;
}

.search-input-box.focused .search-shortcut-badge {
  border-color: rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

@media (max-width: 640px) {
  .search-shortcut-badge {
    display: none;
  }
}

.search-clear-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: 8px;
}

.search-clear-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

/* Glassmorphic Dropdown suggestion menu */
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 12px;
  background: rgba(10, 10, 12, 0.85); /* Dark Glassmorphic */
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(59, 130, 246, 0.03);
  z-index: 5;
  overflow: hidden;
  padding: 12px;
  box-sizing: border-box;
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
  margin-bottom: 10px;
  display: block;
}

/* Recent queries list */
.search-recent-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.search-recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13.5px;
  font-weight: 600;
  transition: all 0.2s ease;
  background: transparent;
}

.search-recent-item:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  transform: translateX(2px);
}

.search-recent-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-recent-icon {
  color: rgba(255, 255, 255, 0.2);
  transition: color 0.2s;
}

.search-recent-item:hover .search-recent-icon {
  color: #3b82f6;
}

.search-recent-delete {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  padding: 3px;
  border-radius: 6px;
  opacity: 0;
  transition: all 0.2s;
}

.search-recent-item:hover .search-recent-delete {
  opacity: 1;
}

.search-recent-delete:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Suggested Premium Tags */
.search-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
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
}
`;

export function SearchBar({
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

  // Close suggestions on outside click
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
      <style>{SEARCH_STYLES}</style>
      
      {/* Input Field box wrapper */}
      <div className={`search-input-box ${(isFocused || alwaysOpen) ? "focused" : ""}`}>
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

      {/* Suggested drop overlay */}
      <AnimatePresence>
        {(isFocused || alwaysOpen) && (recentQueries.length > 0 || suggestedTags.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="search-dropdown"
          >
            {/* Recent Searches */}
            {recentQueries.length > 0 && (
              <div className="search-dropdown-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "12px", marginBottom: "8px" }}>
                <span className="search-section-title">Recent Searches</span>
                <div className="search-recent-list">
                  {recentQueries.map((q) => (
                    <div 
                      key={q} 
                      className="search-recent-item"
                      onClick={() => handleSelectRecent(q)}
                    >
                      <div className="search-recent-left">
                        <Clock size={14} className="search-recent-icon" />
                        <span>{q}</span>
                      </div>
                      <button
                        className="search-recent-delete"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent select trigger
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

            {/* Popular Tags */}
            {suggestedTags.length > 0 && (
              <div className="search-dropdown-section">
                <span className="search-section-title">Trending Tags</span>
                <div className="search-tags-row">
                  {suggestedTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="search-tag-badge"
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
}

// ── Showcase Demo ──
export default function SearchBarShowcase() {
  const [history, setHistory] = useState([
    "React design templates",
    "Framer motion spring animation",
    "Glassmorphism gradients cards"
  ]);
  const [lastQuery, setLastQuery] = useState("None yet");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchTrigger = (val) => {
    setLastQuery(val);
    if (val && !history.includes(val)) {
      setHistory((prev) => [val, ...prev.slice(0, 3)]);
    }
  };

  const handleHistoryDelete = (val) => {
    setHistory((prev) => prev.filter((item) => item !== val));
  };

  return (
    <div 
      className="search-showcase" 
      style={{ 
        paddingBottom: isFocused ? "330px" : "15px",
        transition: "padding-bottom 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
      }}
    >
      <SearchBar
        alwaysOpen={false}
        recentQueries={history}
        suggestedTags={["Tailwind", "Framer Motion", "Glassmorphic Cards"]}
        onSearch={handleSearchTrigger}
        onDeleteRecent={handleHistoryDelete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
