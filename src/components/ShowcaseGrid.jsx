// src/components/ShowcaseGrid.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Navigation, ToggleRight, Calendar, Eye, Type, Users } from "lucide-react";
import { motion } from "framer-motion";

// Import interactive components
import ExpandingSearch from "./ui/animations/ExpandingSearch";
import { CosmicThemeSwitch, FLUID_SWITCH_STYLES } from "./ui/animations/FluidSwitch";
import InteractiveTimeline from "./ui/animations/InteractiveTimeline";
import FocusBlurText from "./ui/animations/FocusBlurText";
import { CyberDecoderText, TEXT_ANIM_STYLES } from "./ui/animations/TextAnimation";
import AnimatedProfileStack from "./ui/animations/AnimatedProfileStack";

const SHOWCASE_STYLES = `
/* ── SHOWCASE GRID PREMIUM SYSTEM ── */
.showcase-grid-section {
  padding: 120px 24px 140px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.05) 0%, transparent 50%);
  font-family: 'Outfit', 'Inter', sans-serif;
}

.showcase-grid-header {
  text-align: center;
  margin-bottom: 70px;
}

.showcase-grid-tag {
  font-size: 13px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  margin-bottom: 16px;
}

.showcase-grid-title {
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.025em;
  margin-bottom: 18px;
}

.showcase-grid-desc {
  font-size: 16.5px;
  color: rgba(255, 255, 255, 0.55);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.65;
}

.showcase-grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .showcase-grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .showcase-grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Card Styling */
.showcase-card {
  background: rgba(15, 15, 20, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 28px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 440px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.showcase-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(124, 58, 237, 0.12);
  background: rgba(20, 20, 26, 0.45);
}

/* Hover Spotlight light beam */
.showcase-card::after {
  content: "";
  position: absolute;
  inset: 0px;
  border-radius: inherit;
  background: radial-gradient(
    450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
    rgba(255, 255, 255, 0.07),
    transparent 45%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 3;
}

.showcase-card:hover::after {
  opacity: 1;
}

/* Component Sandbox preview box */
.showcase-card-preview {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 5, 8, 0.55);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  margin-bottom: 24px;
  position: relative;
  z-index: 10;
  overflow: visible;
  padding: 16px;
  box-sizing: border-box;
}

.showcase-card-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  position: relative;
  z-index: 5;
}

.showcase-card-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.showcase-card-tag {
  font-size: 11px;
  font-weight: 750;
  color: #818cf8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 5px;
}

.showcase-card-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.showcase-card-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.48);
  line-height: 1.55;
  margin-bottom: 20px;
}

/* Card Link & Footer */
.showcase-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 18px;
  position: relative;
  z-index: 5;
}

.showcase-card-link {
  font-size: 13.5px;
  font-weight: 600;
  color: #a78bfa;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  text-decoration: none;
}

.showcase-card:hover .showcase-card-link {
  color: #c084fc;
}

.showcase-card-link svg {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase-card:hover .showcase-card-link svg {
  transform: translateX(4px);
}
`;

export default function ShowcaseGrid() {
  const navigate = useNavigate();

  // Switch state for Card 2 Fluid cosmic theme
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Spotlight mouse track
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const cards = [
    {
      id: "expanding-search",
      tag: "Navigation",
      icon: <Navigation size={12} />,
      title: "Expanding Search Bar",
      desc: "Minimal search icon that expands into a full glassmorphic input on hover, featuring live suggestion filters.",
      path: "/docs/expanding-search",
      preview: (
        <div style={{ transform: "scale(0.95)" }}>
          <ExpandingSearch onSearch={(val) => console.log(val)} placeholder="Search elements..." />
        </div>
      )
    },
    {
      id: "fluid-switch",
      tag: "Inputs",
      icon: <ToggleRight size={12} />,
      title: "Cosmic Theme Switch",
      desc: "Interactive spring-loaded theme toggle switch transitioning celestial icons from day sun to night moon.",
      path: "/docs/fluid-switch",
      preview: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <CosmicThemeSwitch isDark={isDarkTheme} onChange={setIsDarkTheme} />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
            Active: <strong style={{ color: "#ffffff" }}>{isDarkTheme ? "Cosmic Night" : "Daylight"}</strong>
          </span>
        </div>
      )
    },
    {
      id: "interactive-timeline",
      tag: "UI Animations",
      icon: <Calendar size={12} />,
      title: "Interactive Arc Timeline",
      desc: "Futuristic curved timeline scrolling years along a circular arc path with drag snap physics and neon highlight guides.",
      path: "/docs/interactive-timeline",
      preview: (
        <div style={{ transform: "scale(0.55)", display: "flex", justifyContent: "center", width: "100%" }}>
          <InteractiveTimeline />
        </div>
      )
    },
    {
      id: "focus-blur-text",
      tag: "Typography",
      icon: <Eye size={12} />,
      title: "Spotlight Focus Blur",
      desc: "Futuristic magnifying scope that sharpens blurred underlying text on mouse move.",
      path: "/docs/focus-blur-text",
      preview: (
        <div style={{ transform: "scale(0.9)", width: "100%", display: "flex", justifyContent: "center" }}>
          <FocusBlurText text="HOVER CURSOR OVER ME" />
        </div>
      )
    },
    {
      id: "text-animation",
      tag: "Typography",
      icon: <Type size={12} />,
      title: "Cyber Decoder Text",
      desc: "Matrix decryption reveal cycle that randomizes letters before settling on the final readable word.",
      path: "/docs/text-animation",
      preview: (
        <div style={{ transform: "scale(0.95)" }}>
          <CyberDecoderText text="SYSTEM ACTIVE" />
        </div>
      )
    },
    {
      id: "profile-stack",
      tag: "Social",
      icon: <Users size={12} />,
      title: "Animated Profile Stack",
      desc: "A glassmorphic profile stack avatar pill that expands to spread out list items and online flags on hover.",
      path: "/docs/profile-stack",
      preview: (
        <div style={{ transform: "scale(0.95)" }}>
          <AnimatedProfileStack pulse={true} />
        </div>
      )
    }
  ];

  return (
    <section className="showcase-grid-section">
      <style>{SHOWCASE_STYLES}</style>
      <style>{FLUID_SWITCH_STYLES}</style>
      <style>{TEXT_ANIM_STYLES}</style>

      <div className="showcase-grid-header">
        <span className="showcase-grid-tag">Interactive Gallery</span>
        <h2 className="showcase-grid-title">Explore Premium UI Animations</h2>
        <p className="showcase-grid-desc">
          Interact with these components directly inside their previews. Hover, toggle, or trigger updates, then click the card to copy the code.
        </p>
      </div>

      <div className="showcase-grid-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="showcase-card"
            onMouseMove={handleMouseMove}
            onClick={() => navigate(card.path)}
          >
            {/* Component Sandbox (e.stopPropagation prevents card navigation on preview clicks) */}
            <div className="showcase-card-preview" onClick={(e) => e.stopPropagation()}>
              {card.preview}
            </div>

            <div className="showcase-card-meta">
              <div className="showcase-card-topbar">
                <span className="showcase-card-tag">
                  {card.icon}
                  {card.tag}
                </span>
              </div>
              <h3 className="showcase-card-title">{card.title}</h3>
              <p className="showcase-card-desc">{card.desc}</p>
            </div>

            <div className="showcase-card-footer">
              <span className="showcase-card-link">
                View Docs & Prompt
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
