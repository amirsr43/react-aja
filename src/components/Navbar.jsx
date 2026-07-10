// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", id: "home", href: "/" },
  { label: "Docs", id: "docs", href: "/docs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  // Is the user on the Docs page?
  const isDocsPage = location.pathname.startsWith("/docs");

  // Resize listener
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click (only used on home page)
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest(".navbar-root")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const scrollTo = (id, href) => {
    if (href) {
      if (href === "/") {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
      setMenuOpen(false);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className="navbar-root"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: isMobile ? "16px" : (scrolled ? "16px" : "0px"),
          left: "50%",
          transform: "translateX(-50%)",
          width: isMobile ? "calc(100% - 32px)" : (scrolled ? "calc(100% - 40px)" : "100%"),
          maxWidth: isMobile ? "100%" : (scrolled ? "1200px" : "100%"),
          zIndex: 100,
          padding: isMobile ? "10px 18px" : (scrolled ? "10px 24px" : "13px 20px"),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: isMobile || scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
          borderRadius: isMobile ? "16px" : (scrolled ? "20px" : "0px"),
          background: isMobile || scrolled ? "rgba(8, 8, 10, 0.75)" : "transparent",
          backdropFilter: isMobile || scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: isMobile || scrolled ? "blur(16px)" : "none",
          boxShadow: isMobile || scrolled ? "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)" : "none",
          transition: isMobile ? "none" : "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* ── Left: Logo + Desktop Links ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            onClick={handleLogoClick}
          >
            <div
              style={{
                transform: logoHover ? "rotate(18deg) scale(1.15)" : "rotate(0deg) scale(1)",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src="/logo.png" alt="ReactAja" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
            </div>
            <span
              style={{
                fontWeight: "800",
                fontSize: "17px",
                fontFamily: "'Space Grotesk', 'Outfit', sans-serif",
                letterSpacing: "-0.03em",
                color: "var(--text)",
                opacity: logoHover ? 0.75 : 1,
                transition: "opacity 0.2s",
              }}
            >
              React<span style={{ color: "var(--accent)" }}>Aja</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <>
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "14px", userSelect: "none" }}>/</span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {navLinks.map(({ label, id, href }) => {
                  const isActive = href === "/docs" ? isDocsPage : (location.pathname === "/" && href === "/");
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id, href)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: isActive ? "var(--text)" : "var(--muted)",
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "14px",
                        cursor: "pointer",
                        padding: "6px 12px",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--muted)"; }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Right: GitHub (desktop) or Hamburger (mobile) ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isMobile && (
            <a
              href="https://github.com/amirsr43/react-aja.git"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)",
                color: "var(--text)",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-label="GitHub Repository"
            >
              <FaGithub size={14} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}

          {/* Hamburger button — mobile only */}
          {isMobile && (
            <button
              onClick={() => {
                if (isDocsPage) {
                  // On docs page: open docs sidebar via event
                  window.dispatchEvent(new CustomEvent("openDocsSidebar"));
                } else {
                  // On home page: toggle nav dropdown
                  setMenuOpen((o) => !o);
                }
              }}
              style={{
                background: menuOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen && !isDocsPage ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    <X size={18} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    <Menu size={18} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>
      </nav>

      {/* ── Mobile Dropdown — only on home page ── */}
      <AnimatePresence>
        {isMobile && menuOpen && !isDocsPage && (
          <motion.div
            className="navbar-root"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: isMobile ? "72px" : (scrolled ? "72px" : "64px"),
              right: isMobile ? "20px" : (scrolled ? "20px" : "16px"),
              zIndex: 99,
              background: "rgba(8, 8, 10, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "8px",
              minWidth: "190px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
              transition: isMobile ? "none" : "top 0.4s cubic-bezier(0.16, 1, 0.3, 1), right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {navLinks.map(({ label, id, href }) => {
              const isActive = href === "/docs" ? isDocsPage : (location.pathname === "/" && href === "/");
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id, href)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "11px 14px",
                    background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                    border: "none",
                    borderRadius: "10px",
                    color: isActive ? "#ffffff" : "#8e8e93",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isActive ? "rgba(255,255,255,0.07)" : "transparent";
                    e.currentTarget.style.color = isActive ? "#ffffff" : "#8e8e93";
                  }}
                >
                  {label}
                </button>
              );
            })}

            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "6px 0" }} />

            <a
              href="https://github.com/amirsr43/react-aja.git"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 14px",
                background: "transparent",
                border: "none",
                borderRadius: "10px",
                color: "#8e8e93",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.15s ease",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#8e8e93";
              }}
            >
              <FaGithub size={14} />
              <span>GitHub</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global responsive overrides */}
      <style>{`
        body { padding-bottom: 0 !important; }
        #support-trigger { bottom: 24px !important; }
        button[title="Scroll to top"] { bottom: 80px !important; }

        @media (max-width: 767px) {
          .hero-section { padding-top: 70px !important; }
          .hero-showcase-side { display: none !important; }
          .hero-heading { font-size: clamp(28px, 8vw, 42px) !important; }
          .heading-accent-wrapper { min-width: unset !important; }
          .hero-subtitle { font-size: 14px !important; }
          .cta-button { padding: 12px 22px !important; font-size: 13.5px !important; }
        }

        @media (max-width: 480px) {
          .docs-page-layout { padding-top: 100px !important; }
          .docs-container { padding: 0 14px 60px !important; gap: 20px !important; }
          .docs-title { font-size: 26px !important; }
          .docs-description { font-size: 13.5px !important; }
          .docs-tabs-header { flex-wrap: wrap; gap: 8px; }
          .docs-tabs-triggers { flex-wrap: wrap; }
          .docs-tab-trigger { padding: 5px 10px !important; font-size: 11.5px !important; }
          .docs-copy-source-btn { font-size: 11px !important; padding: 5px 9px !important; }
          .format-selectors-row { gap: 12px !important; }
          .tab-code-pane { padding: 14px !important; }
          .code-pre-element { font-size: 11px !important; }
          .doc-variant-section { padding: 16px !important; }
          .site-footer { padding: 40px 16px 24px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
