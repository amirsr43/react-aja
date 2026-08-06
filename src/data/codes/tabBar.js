// src/data/codes/tabBar.js

export const tabBarCode = {
  code: {
    js: {
      css: `// TabBar.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Heart, User, Sliders } from "lucide-react";
import "./TabBar.css"; // Include the CSS stylesheet below

const TABS = [
  { id: "music", label: "Music", icon: Music },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Sliders },
];

export default function TabBar({
  tabs = TABS,
  initialActive = "profile",
  activeColor = "#ec4899",
  activeBgOpacity = 0.1,
  pillShape = "rounded",
  showLabels = true,
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

  const hexToRgba = (hex, opacity) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = "0x" + c.join("");
      return \`rgba(\${(c >> 16) & 255}, \${(c >> 8) & 255}, \${c & 255}, \${opacity})\`;
    }
    return hex;
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
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
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
}`,
      tailwind: `// TabBar.jsx (JavaScript + Tailwind CSS)
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
  activeColor = "#ec4899",
  activeBgOpacity = 0.1,
  pillShape = "rounded",
  showLabels = true,
  onTabChange = () => {},
}) {
  const [activeTab, setActiveTab] = useState(initialActive);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const borderRadiusClass = pillShape === "rounded" ? "rounded-full" : "rounded-2xl";
  const itemBorderRadiusClass = pillShape === "rounded" ? "rounded-full" : "rounded-xl";

  const hexToRgba = (hex, opacity) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = "0x" + c.join("");
      return \`rgba(\${(c >> 16) & 255}, \${(c >> 8) & 255}, \${c & 255}, \${opacity})\`;
    }
    return hex;
  };

  const activeBg = hexToRgba(activeColor, activeBgOpacity);

  return (
    <div className={\`inline-flex items-center p-2 gap-1.5 transition-all duration-300 bg-[#0c0c0e] border border-white/8 text-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] \${borderRadiusClass}\`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={\`relative flex items-center gap-2 px-4.5 py-2.5 border-none bg-none cursor-pointer outline-none font-semibold text-[13.5px] transition-colors duration-250 select-none \${itemBorderRadiusClass} \${
              isActive ? "text-white" : "text-inherit"
            }\`}
            style={{
              color: isActive ? activeColor : undefined,
              WebkitTapHighlightColor: "transparent"
            }}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator-dark"
                className={\`absolute inset-0 z-0 \${itemBorderRadiusClass}\`}
                style={{ background: activeBg }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            
            <span className="relative z-10 flex items-center">
              <Icon size={18} strokeWidth={2.2} />
            </span>

            {showLabels && (
              <motion.span
                className="relative z-10 overflow-hidden whitespace-nowrap inline-block"
                animate={{
                  width: isActive ? "auto" : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "8px" : "0px",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {tab.label}
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}`
    },
    ts: {
      css: `// TabBar.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Heart, User, Sliders } from "lucide-react";
import "./TabBar.css"; // Include the CSS stylesheet below

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface TabBarProps {
  tabs?: TabItem[];
  initialActive?: string;
  activeColor?: string;
  activeBgOpacity?: number;
  pillShape?: "rounded" | "square";
  showLabels?: boolean;
  onTabChange?: (tabId: string) => void;
}

const TABS: TabItem[] = [
  { id: "music", label: "Music", icon: Music },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Sliders },
];

export default function TabBar({
  tabs = TABS,
  initialActive = "profile",
  activeColor = "#ec4899",
  activeBgOpacity = 0.1,
  pillShape = "rounded",
  showLabels = true,
  onTabChange = () => {},
}: TabBarProps) {
  const [activeTab, setActiveTab] = useState<string>(initialActive);

  const handleTabClick = (tabId: string) => {
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

  const hexToRgba = (hex: string, opacity: number): string => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = "0x" + c.join("");
      return \`rgba(\${(c >> 16) & 255}, \${(c >> 8) & 255}, \${c & 255}, \${opacity})\`;
    }
    return hex;
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
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
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
}`,
      tailwind: `// TabBar.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Heart, User, Sliders } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface TabBarProps {
  tabs?: TabItem[];
  initialActive?: string;
  activeColor?: string;
  activeBgOpacity?: number;
  pillShape?: "rounded" | "square";
  showLabels?: boolean;
  onTabChange?: (tabId: string) => void;
}

const TABS: TabItem[] = [
  { id: "music", label: "Music", icon: Music },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Sliders },
];

export default function TabBar({
  tabs = TABS,
  initialActive = "profile",
  activeColor = "#ec4899",
  activeBgOpacity = 0.1,
  pillShape = "rounded",
  showLabels = true,
  onTabChange = () => {},
}: TabBarProps) {
  const [activeTab, setActiveTab] = useState<string>(initialActive);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const borderRadiusClass = pillShape === "rounded" ? "rounded-full" : "rounded-2xl";
  const itemBorderRadiusClass = pillShape === "rounded" ? "rounded-full" : "rounded-xl";

  const hexToRgba = (hex: string, opacity: number): string => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = "0x" + c.join("");
      return \`rgba(\${(c >> 16) & 255}, \${(c >> 8) & 255}, \${c & 255}, \${opacity})\`;
    }
    return hex;
  };

  const activeBg = hexToRgba(activeColor, activeBgOpacity);

  return (
    <div className={\`inline-flex items-center p-2 gap-1.5 transition-all duration-300 bg-[#0c0c0e] border border-white/8 text-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] \${borderRadiusClass}\`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={\`relative flex items-center gap-2 px-4.5 py-2.5 border-none bg-none cursor-pointer outline-none font-semibold text-[13.5px] transition-colors duration-250 select-none \${itemBorderRadiusClass} \${
              isActive ? "text-white" : "text-inherit"
            }\`}
            style={{
              color: isActive ? activeColor : undefined,
              WebkitTapHighlightColor: "transparent"
            }}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator-dark"
                className={\`absolute inset-0 z-0 \${itemBorderRadiusClass}\`}
                style={{ background: activeBg }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            
            <span className="relative z-10 flex items-center">
              <Icon size={18} strokeWidth={2.2} />
            </span>

            {showLabels && (
              <motion.span
                className="relative z-10 overflow-hidden whitespace-nowrap inline-block"
                animate={{
                  width: isActive ? "auto" : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "8px" : "0px",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {tab.label}
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}`
    }
  },
  css: `/* TabBar.css */
.tabbar-container {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  gap: 6px;
  transition: all 0.3s ease;
}

.tabbar-container button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  transition: color 0.25s ease;
  -webkit-tap-highlight-color: transparent;
}
`
};
