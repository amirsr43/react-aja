// src/components/ui/components/PortfolioNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  .pnav-root {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: 100%;
    max-width: 680px;
    padding: 0 20px;
    box-sizing: border-box;
    pointer-events: none;
  }

  .pnav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 10px 10px 20px;
    border-radius: 20px;
    background: rgba(12, 12, 18, 0.72);
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.35),
      0 1px 0 rgba(255, 255, 255, 0.06) inset;
    pointer-events: all;
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .pnav-bar.scrolled {
    background: rgba(8, 8, 14, 0.88);
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.55),
      0 1px 0 rgba(255, 255, 255, 0.05) inset;
    border-color: rgba(255, 255, 255, 0.05);
  }

  /* ── Logo ── */
  .pnav-logo {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -0.3px;
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .pnav-logo-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a78bfa, #ec4899);
    flex-shrink: 0;
    box-shadow: 0 0 8px rgba(167, 139, 250, 0.7);
  }

  /* ── Links ── */
  .pnav-links {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .pnav-link {
    position: relative;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    padding: 7px 14px;
    border-radius: 12px;
    transition: color 0.2s ease, background 0.2s ease;
    cursor: pointer;
    border: none;
    background: none;
    white-space: nowrap;
  }

  .pnav-link:hover {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.06);
  }

  .pnav-link.active {
    color: #ffffff;
    font-weight: 600;
  }

  /* Active pill indicator */
  .pnav-active-pill {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.07);
    pointer-events: none;
  }

  /* ── CTA Button ── */
  .pnav-cta {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    padding: 9px 18px;
    border-radius: 14px;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%);
    background-size: 200% 100%;
    background-position: 0% 0%;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 12px rgba(124, 58, 237, 0.35);
    white-space: nowrap;
  }

  .pnav-cta:hover {
    background-position: 100% 0%;
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.55);
    transform: translateY(-1px);
  }

  .pnav-cta:active {
    transform: translateY(0px);
  }

  /* ── Mobile hamburger ── */
  .pnav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    pointer-events: all;
    transition: background 0.2s;
  }

  .pnav-hamburger:hover { background: rgba(255, 255, 255, 0.1); }

  .pnav-hamburger span {
    display: block;
    width: 18px;
    height: 1.5px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .pnav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .pnav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .pnav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* ── Mobile menu dropdown ── */
  .pnav-mobile-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    border-radius: 18px;
    background: rgba(10, 10, 16, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  }

  .pnav-mobile-links {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 2px;
  }

  .pnav-mobile-link {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14.5px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding: 13px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background: none;
    text-align: left;
  }

  .pnav-mobile-link:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }

  .pnav-mobile-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 6px 16px;
  }

  .pnav-mobile-cta {
    margin: 4px 10px 12px;
    padding: 13px;
    border-radius: 14px;
    background: linear-gradient(135deg, #7c3aed, #a855f7 50%, #ec4899);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s, transform 0.2s;
  }

  .pnav-mobile-cta:hover { opacity: 0.9; transform: scale(0.99); }

  @media (max-width: 640px) {
    .pnav-links,
    .pnav-cta { display: none; }
    .pnav-hamburger { display: flex; }
  }
`;

const LINKS = [
  { label: "Home",    href: "#home"    },
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioNavbar({
  logo        = "amir.",
  links       = LINKS,
  ctaLabel    = "Hire Me",
  onCtaClick  = () => {},
  onLinkClick = () => {},
  fixed       = true
}) {
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const rootRef = useRef(null);

  // Scroll detection for frosted glass depth change
  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixed]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLink = (link) => {
    setActive(link.href.replace("#", ""));
    setMenuOpen(false);
    onLinkClick(link);
  };

  return (
    <div 
      className="pnav-root" 
      ref={rootRef}
      style={!fixed ? { position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 10 } : {}}
    >
      <style>{NAV_STYLES}</style>

      <div className={`pnav-bar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <a className="pnav-logo" href="#home" onClick={() => setActive("home")}>
          <div className="pnav-logo-dot" />
          {logo}
        </a>

        {/* Desktop nav links with animated active pill */}
        <nav className="pnav-links">
          {links.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`pnav-link${isActive ? " active" : ""}`}
                onClick={() => handleLink(link)}
              >
                {isActive && (
                  <motion.div
                    layoutId="pnav-pill"
                    className="pnav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span style={{ position: "relative" }}>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <button className="pnav-cta" onClick={onCtaClick}>
          {ctaLabel}
        </button>

        {/* Mobile hamburger */}
        <button
          className={`pnav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="pnav-mobile-menu"
            initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          >
            <div className="pnav-mobile-links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="pnav-mobile-link"
                  onClick={() => handleLink(link)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pnav-mobile-divider" />
            <button className="pnav-mobile-cta" onClick={() => { setMenuOpen(false); onCtaClick(); }}>
              {ctaLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
