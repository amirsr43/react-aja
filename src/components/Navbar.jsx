// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaBookOpen, FaGithub } from "react-icons/fa";

const navLinks = [
  { label: "Home", id: "home", href: "/", icon: FaHome },
  { label: "Docs", id: "docs", href: "/docs", icon: FaBookOpen },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = "dark";

  // Force dark theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState("home");
  const [logoHover, setLogoHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Resize listener
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // tutup menu kalau resize ke desktop
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // deteksi section aktif
      const ids = ["how-it-works"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 90) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu saat scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, scrolled]);

  const scrollTo = (id, href) => {
    if (href) {
      if (href === "/") {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
      setMenuOpen(false);
      return;
    }
    // Kalau sedang di halaman lain, balik ke home dulu lalu scroll
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
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navBg = scrolled ? "var(--nav-bg)" : "transparent";

  const btnBase = {
    padding: "7px 15px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    background: "transparent",
  };

  const darkToggleBtn = {
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "transparent",
    cursor: "pointer",
    color: "var(--text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "13px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          background: navBg,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* ── Left Side Container (Logo + Separator + Links) ── */}
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
                transform: logoHover
                  ? "rotate(18deg) scale(1.15)"
                  : "rotate(0deg) scale(1)",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img 
                src="/logo.png" 
                alt="ReactAja" 
                style={{ width: "24px", height: "24px", objectFit: "contain" }} 
              />
            </div>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "var(--text)",
                opacity: logoHover ? 0.75 : 1,
                transition: "opacity 0.2s",
              }}
            >
              React<span style={{ color: "var(--accent)" }}>Aja</span>
            </span>
          </div>

          {/* Separator / Slash */}
          {!isMobile && (
            <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "14px", userSelect: "none" }}>
              /
            </span>
          )}

          {/* Desktop Nav Links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {navLinks.map(({ label, id, href }) => {
                const isActive = href
                  ? location.pathname === href
                  : activeSection === id;
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--muted)";
                      }
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── GitHub Button (Right Aligned) ── */}
        {!isMobile && (
          <a
            href="https://github.com/amirsr43"
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
          >
            <FaGithub size={14} />
            <span>GitHub</span>
          </a>
        )}
      </nav>

      {/* ── Mobile Bottom Navigation Bar ── */}
      {isMobile && (
        <div className="bottom-nav-bar">
          {navLinks.map(({ label, id, href, icon: Icon }) => {
            const isActive = href
              ? location.pathname === href
              : activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id, href)}
                className={`tab-item ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Style definitions for bottom tab bar */}
      <style>{`
        @media (max-width: 767px) {
          body {
            padding-bottom: 100px !important;
          }
          #support-trigger {
            bottom: 160px !important;
          }
          button[title="Scroll to top"] {
            bottom: 104px !important;
          }
        }

        .bottom-nav-bar {
          position: fixed;
          bottom: 20px;
          left: 20px;
          right: 20px;
          height: 64px;
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--muted);
          font-size: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          gap: 4px;
          width: 33%;
          height: 100%;
        }

        .tab-item.active {
          color: var(--text);
        }

        .tab-item.active svg {
          transform: translateY(-2px);
          color: var(--text);
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.35));
        }

        .tab-item svg {
          transition: transform 0.2s ease, color 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default Navbar;