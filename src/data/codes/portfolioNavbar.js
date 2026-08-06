// src/data/codes/portfolioNavbar.js

export const portfolioNavbarCode = {
  code: {
    js: {
      css: `// PortfolioNavbar.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PortfolioNavbar.css"; // Include the CSS stylesheet below

const LINKS = [
  { label: "Home",    href: "#home"    },
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioNavbar({
  logo            = "amir.",
  links           = LINKS,
  ctaLabel        = "Hire Me",
  onCtaClick      = () => {},
  onLinkClick     = () => {},
  onMenuOpenChange = () => {},
  fixed           = true
}) {
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    onMenuOpenChange(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixed]);

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

  const handleLink = (e, link) => {
    if (!fixed) {
      e.preventDefault();
    }
    setActive(link.href.replace("#", ""));
    setMenuOpen(false);
    onLinkClick(link);
  };

  return (
    <div className="pnav-root" ref={rootRef}>
      <div className={\`pnav-bar\${scrolled ? " scrolled" : ""}\`}>
        {/* Logo */}
        <a className="pnav-logo" href="#home" onClick={() => setActive("home")}>
          <div className="pnav-logo-dot" />
          {logo}
        </a>

        {/* Desktop Links */}
        <nav className="pnav-links">
          {links.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={\`pnav-link\${isActive ? " active" : ""}\`}
                onClick={(e) => handleLink(e, link)}
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

        {/* Mobile Hamburger */}
        <button
          className={\`pnav-hamburger\${menuOpen ? " open" : ""}\`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Dropdown */}
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
              {links.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={\`pnav-mobile-link\${isActive ? " active" : ""}\`}
                    onClick={(e) => handleLink(e, link)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="pnav-mobile-pill"
                        className="pnav-mobile-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span style={{ position: "relative" }}>{link.label}</span>
                  </a>
                );
              })}
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
}`,
      tailwind: `// PortfolioNavbar.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home",    href: "#home"    },
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioNavbar({
  logo            = "amir.",
  links           = LINKS,
  ctaLabel        = "Hire Me",
  onCtaClick      = () => {},
  onLinkClick     = () => {},
  onMenuOpenChange = () => {},
  fixed           = true
}) {
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    onMenuOpenChange(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixed]);

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

  const handleLink = (e, link) => {
    if (!fixed) {
      e.preventDefault();
    }
    setActive(link.href.replace("#", ""));
    setMenuOpen(false);
    onLinkClick(link);
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-5 box-border pointer-events-none" ref={rootRef} style={!fixed ? { position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 10, width: "100%", maxWidth: "680px", padding: "0 20px", boxSizing: "border-box" } : {}}>
      <div className={\`flex items-center justify-between gap-3 p-2.5 pl-5 rounded-[20px] pointer-events-auto transition-all duration-300 \${
        scrolled 
          ? "bg-[#08080e]/88 border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]" 
          : "bg-[#0c0c12]/72 border border-white/8 backdrop-blur-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]"
      }\`}>
        {/* Logo */}
        <a className="flex items-center gap-2 font-bold text-[17px] tracking-[-0.3px] text-white no-underline" href="#home" onClick={() => setActive("home")}>
          <div className="w-[7px] height-[7px] rounded-full bg-gradient-to-r from-[#a78bfa] to-[#ec4899] shadow-[0_0_8px_rgba(167,139,250,0.7)]" />
          {logo}
        </a>

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={\`relative px-3.5 py-1.5 rounded-xl text-[13.5px] font-medium no-underline transition-colors duration-200 \${
                  isActive ? "text-white font-semibold" : "text-white/60 hover:text-white hover:bg-white/5"
                }\`}
                onClick={(e) => handleLink(e, link)}
              >
                {isActive && (
                  <motion.div
                    layoutId="pnav-pill"
                    className="absolute inset-0 rounded-xl bg-white/8 border border-white/7 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <button 
          className="hidden sm:block px-4.5 py-2.5 rounded-ebd rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] bg-[length:200%_100%] bg-[position:0%_0%] hover:bg-[position:100%_0%] text-xs font-semibold text-white cursor-pointer transition-all duration-300 shadow-[0_2px_12px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.55)] hover:-translate-y-0.5 active:translate-y-0"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </button>

        {/* Mobile Hamburger */}
        <button
          className={\`sm:hidden flex flex-col gap-[5px] p-2 rounded-lg border-none bg-white/5 cursor-pointer pointer-events-auto hover:bg-white/10\`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className={\`block w-[18px] h-[1.5px] bg-white/80 rounded-sm transition-all duration-300 transform-gpu origin-center \${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}\`} />
          <span className={\`block w-[18px] h-[1.5px] bg-white/80 rounded-sm transition-all duration-300 transform-gpu origin-center \${menuOpen ? "opacity-0 scale-x-0" : ""}\`} />
          <span className={\`block w-[18px] h-[1.5px] bg-white/80 rounded-sm transition-all duration-300 transform-gpu origin-center \${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}\`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-[calc(100%+10px)] left-5 right-5 rounded-2xl bg-[#0a0a10]/95 backdrop-blur-[20px] border border-white/8 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] pointer-events-auto"
            initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          >
            <div className="flex flex-col p-2.5 gap-0.5">
              {links.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={\`relative px-4 py-3.5 rounded-xl font-medium text-[14.5px] no-underline text-left cursor-pointer transition-colors \${
                      isActive ? "text-white font-semibold" : "text-white/70 hover:text-white hover:bg-white/5"
                    }\`}
                    onClick={(e) => handleLink(e, link)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="pnav-mobile-pill"
                        className="absolute inset-0 rounded-xl bg-white/8 border border-white/[0.07] pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="h-[1px] bg-white/5 mx-4 my-1.5" />
            <button 
              className="block w-[calc(100%-20px)] box-border m-2.5 mt-1 px-3 py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] font-semibold text-sm text-white text-center cursor-pointer border-none"
              onClick={() => { setMenuOpen(false); onCtaClick(); }}
            >
              {ctaLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`
    },
    ts: {
      css: `// PortfolioNavbar.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PortfolioNavbar.css";

interface NavLink {
  label: string;
  href: string;
}

interface PortfolioNavbarProps {
  logo?: string;
  links?: NavLink[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  onLinkClick?: (link: NavLink) => void;
  onMenuOpenChange?: (open: boolean) => void;
  fixed?: boolean;
}

const LINKS: NavLink[] = [
  { label: "Home",    href: "#home"    },
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioNavbar({
  logo            = "amir.",
  links           = LINKS,
  ctaLabel        = "Hire Me",
  onCtaClick      = () => {},
  onLinkClick     = () => {},
  onMenuOpenChange = () => {},
  fixed           = true
}: PortfolioNavbarProps) {
  const [active,    setActive]    = useState<string>("home");
  const [scrolled,  setScrolled]  = useState<boolean>(false);
  const [menuOpen,  setMenuOpen]  = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMenuOpenChange(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixed]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLink = (e: React.MouseEvent, link: NavLink) => {
    if (!fixed) {
      e.preventDefault();
    }
    setActive(link.href.replace("#", ""));
    setMenuOpen(false);
    onLinkClick(link);
  };

  return (
    <div className="pnav-root" ref={rootRef}>
      <div className={\`pnav-bar\${scrolled ? " scrolled" : ""}\`}>
        {/* Logo */}
        <a className="pnav-logo" href="#home" onClick={() => setActive("home")}>
          <div className="pnav-logo-dot" />
          {logo}
        </a>

        {/* Desktop Links */}
        <nav className="pnav-links">
          {links.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={\`pnav-link\${isActive ? " active" : ""}\`}
                onClick={(e) => handleLink(e, link)}
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

        {/* Mobile Hamburger */}
        <button
          className={\`pnav-hamburger\${menuOpen ? " open" : ""}\`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Dropdown */}
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
              {links.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={\`pnav-mobile-link\${isActive ? " active" : ""}\`}
                    onClick={(e) => handleLink(e, link)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="pnav-mobile-pill"
                        className="pnav-mobile-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span style={{ position: "relative" }}>{link.label}</span>
                  </a>
                );
              })}
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
}`,
      tailwind: `// PortfolioNavbar.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface PortfolioNavbarProps {
  logo?: string;
  links?: NavLink[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  onLinkClick?: (link: NavLink) => void;
  onMenuOpenChange?: (open: boolean) => void;
  fixed?: boolean;
}

const LINKS: NavLink[] = [
  { label: "Home",    href: "#home"    },
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioNavbar({
  logo            = "amir.",
  links           = LINKS,
  ctaLabel        = "Hire Me",
  onCtaClick      = () => {},
  onLinkClick     = () => {},
  onMenuOpenChange = () => {},
  fixed           = true
}: PortfolioNavbarProps) {
  const [active,    setActive]    = useState<string>("home");
  const [scrolled,  setScrolled]  = useState<boolean>(false);
  const [menuOpen,  setMenuOpen]  = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMenuOpenChange(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixed]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLink = (e: React.MouseEvent, link: NavLink) => {
    if (!fixed) {
      e.preventDefault();
    }
    setActive(link.href.replace("#", ""));
    setMenuOpen(false);
    onLinkClick(link);
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[680px] px-5 box-border pointer-events-none" ref={rootRef} style={!fixed ? { position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 10, width: "100%", maxWidth: "680px", padding: "0 20px", boxSizing: "border-box" } : {}}>
      <div className={\`flex items-center justify-between gap-3 p-2.5 pl-5 rounded-[20px] pointer-events-auto transition-all duration-300 \${
        scrolled 
          ? "bg-[#08080e]/88 border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]" 
          : "bg-[#0c0c12]/72 border border-white/8 backdrop-blur-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]"
      }\`}>
        {/* Logo */}
        <a className="flex items-center gap-2 font-bold text-[17px] tracking-[-0.3px] text-white no-underline" href="#home" onClick={() => setActive("home")}>
          <div className="w-[7px] height-[7px] rounded-full bg-gradient-to-r from-[#a78bfa] to-[#ec4899] shadow-[0_0_8px_rgba(167,139,250,0.7)]" />
          {logo}
        </a>

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={\`relative px-3.5 py-1.5 rounded-xl text-[13.5px] font-medium no-underline transition-colors duration-200 \${
                  isActive ? "text-white font-semibold" : "text-white/60 hover:text-white hover:bg-white/5"
                }\`}
                onClick={(e) => handleLink(e, link)}
              >
                {isActive && (
                  <motion.div
                    layoutId="pnav-pill"
                    className="absolute inset-0 rounded-xl bg-white/8 border border-white/7 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <button 
          className="hidden sm:block px-4.5 py-2.5 rounded-ebd rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] bg-[length:200%_100%] bg-[position:0%_0%] hover:bg-[position:100%_0%] text-xs font-semibold text-white cursor-pointer transition-all duration-300 shadow-[0_2px_12px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.55)] hover:-translate-y-0.5 active:translate-y-0"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </button>

        {/* Mobile Hamburger */}
        <button
          className={\`sm:hidden flex flex-col gap-[5px] p-2 rounded-lg border-none bg-white/5 cursor-pointer pointer-events-auto hover:bg-white/10\`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className={\`block w-[18px] h-[1.5px] bg-white/80 rounded-sm transition-all duration-300 transform-gpu origin-center \${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}\`} />
          <span className={\`block w-[18px] h-[1.5px] bg-white/80 rounded-sm transition-all duration-300 transform-gpu origin-center \${menuOpen ? "opacity-0 scale-x-0" : ""}\`} />
          <span className={\`block w-[18px] h-[1.5px] bg-white/80 rounded-sm transition-all duration-300 transform-gpu origin-center \${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}\`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-[calc(100%+10px)] left-5 right-5 rounded-2xl bg-[#0a0a10]/95 backdrop-blur-[20px] border border-white/8 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] pointer-events-auto"
            initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          >
            <div className="flex flex-col p-2.5 gap-0.5">
              {links.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={\`relative px-4 py-3.5 rounded-xl font-medium text-[14.5px] no-underline text-left cursor-pointer transition-colors \${
                      isActive ? "text-white font-semibold" : "text-white/70 hover:text-white hover:bg-white/5"
                    }\`}
                    onClick={(e) => handleLink(e, link)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="pnav-mobile-pill"
                        className="absolute inset-0 rounded-xl bg-white/8 border border-white/[0.07] pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="h-[1px] bg-white/5 mx-4 my-1.5" />
            <button 
              className="block w-[calc(100%-20px)] box-border m-2.5 mt-1 px-3 py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] font-semibold text-sm text-white text-center cursor-pointer border-none"
              onClick={() => { setMenuOpen(false); onCtaClick(); }}
            >
              {ctaLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`
    }
  },
  css: `/* PortfolioNavbar.css */
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
  width: 100%;
  box-sizing: border-box;
}

.pnav-bar.scrolled {
  background: rgba(8, 8, 14, 0.88);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.55),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
  border-color: rgba(255, 255, 255, 0.05);
}

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

.pnav-active-pill {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
}

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

.pnav-mobile-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 20px;
  right: 20px;
  border-radius: 18px;
  background: rgba(10, 10, 16, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  pointer-events: all;
}

.pnav-mobile-links {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 2px;
}

.pnav-mobile-link {
  position: relative;
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

.pnav-mobile-link.active {
  color: #ffffff;
  font-weight: 600;
}

.pnav-mobile-active-pill {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
}

.pnav-mobile-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 6px 16px;
}

.pnav-mobile-cta {
  display: block;
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
  width: calc(100% - 20px);
  box-sizing: border-box;
}

.pnav-mobile-cta:hover { opacity: 0.9; transform: scale(0.99); }

@media (max-width: 640px) {
  .pnav-links,
  .pnav-cta { display: none; }
  .pnav-hamburger { display: flex; }
}`
};
