// src/components/ui/components/TabBar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Heart, User, Sliders } from "lucide-react";

const TABS = [
  { id: "music", label: "Music", icon: Music },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Sliders },
];

export default function TabBar({
  tabs = TABS,
  initialActive = "profile",
  activeColor = "#ec4899", // custom active background / text color
  activeBgOpacity = 0.1, // active capsule background opacity
  pillShape = "rounded", // "rounded" (capsule) | "square" (rounded-lg)
  showLabels = true, // toggle text labels inside the active tab
  onTabChange = () => {},
}) {
  const [activeTab, setActiveTab] = useState(initialActive);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const styles = {
    bg: "#0c0c0e",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "rgba(255, 255, 255, 0.45)",
    activeText: activeColor,
    shadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
  };

  const borderRadius = pillShape === "rounded" ? "999px" : "16px";
  const itemBorderRadius = pillShape === "rounded" ? "999px" : "10px";

  // Convert hex color to rgba for active background
  const hexToRgba = (hex, opacity) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${opacity})`;
    }
    return hex; // fallback if not hex
  };

  const activeBg = hexToRgba(activeColor, activeBgOpacity);

  return (
    <div
      className="tabbar-container"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 12px",
        background: styles.bg,
        border: styles.border,
        borderRadius: borderRadius,
        boxShadow: styles.shadow,
        gap: "6px",
        transition: "all 0.3s ease",
      }}
    >
      <style>{`
        @media (max-width: 480px) {
          .tabbar-container {
            padding: 6px 8px !important;
            gap: 4px !important;
          }
          .tabbar-btn {
            padding: 8px 12px !important;
            font-size: 12px !important;
            gap: 6px !important;
          }
        }
      `}</style>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="tabbar-btn"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              border: "none",
              background: "none",
              cursor: "pointer",
              outline: "none",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "13.5px",
              fontWeight: 600,
              color: isActive ? styles.activeText : styles.color,
              borderRadius: itemBorderRadius,
              transition: "color 0.25s ease",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator-dark"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: activeBg,
                  borderRadius: itemBorderRadius,
                  zIndex: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
              <Icon size={18} strokeWidth={2.2} />
            </span>

            {/* Label reveals dynamically if showLabels is active */}
            {showLabels && (
              <motion.span
                style={{
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
                animate={{
                  width: isActive ? "auto" : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "8px" : "0px",
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
              >
                {tab.label}
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Docs Showcase Wrapper
export function TabBarShowcase() {
  const [color, setColor] = useState("#ec4899");
  const [shape, setShape] = useState("rounded");
  const [showLabels, setShowLabels] = useState(true);

  const colorsList = ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "36px",
      width: "100%",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <style>{`
        .showcase-tabbar-preview {
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 150px;
          background: #050508;
          borderRadius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          boxShadow: inset 0 0 40px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        @media (max-width: 480px) {
          .showcase-tabbar-preview {
            padding: 24px 12px !important;
          }
        }
      `}</style>

      {/* Real Interactive TabBar */}
      <div className="showcase-tabbar-preview">
        <TabBar activeColor={color} pillShape={shape} showLabels={showLabels} />
      </div>

      {/* Interactive Customization Controls */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "24px",
        padding: "20px 24px",
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        width: "100%",
        boxSizing: "border-box"
      }}>
        {/* Color pickers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Accent Color</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {colorsList.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: color === c ? "2px solid #ffffff" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
                }}
              />
            ))}
          </div>
        </div>

        {/* Shape select */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Border Radius</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {["rounded", "square"].map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                style={{
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 650,
                  borderRadius: "8px",
                  border: shape === s ? "1px solid rgba(167, 139, 250, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
                  background: shape === s ? "rgba(167, 139, 250, 0.12)" : "rgba(255, 255, 255, 0.03)",
                  color: shape === s ? "#c084fc" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {s === "rounded" ? "Pill Capsule" : "Rounded Rect"}
              </button>
            ))}
          </div>
        </div>

        {/* Show Labels Toggle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Label Mode</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => setShowLabels(val)}
                style={{
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 650,
                  borderRadius: "8px",
                  border: showLabels === val ? "1px solid rgba(167, 139, 250, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
                  background: showLabels === val ? "rgba(167, 139, 250, 0.12)" : "rgba(255, 255, 255, 0.03)",
                  color: showLabels === val ? "#c084fc" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {val ? "Show Active Text" : "Icon Only"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
