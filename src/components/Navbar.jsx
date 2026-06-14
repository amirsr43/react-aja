// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Templates", id: "templates" },
  { label: "How It Works", id: "how-it-works" },
];

const Navbar = () => {
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
      const ids = ["how-it-works", "templates"];
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
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
        {/* ── Logo ── */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

        {/* ── Desktop Nav Links (Top Right Corner) ── */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {navLinks.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: isActive ? "var(--accent)" : "var(--muted)",
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

        {/* ── Mobile Right Controls ── */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                ...darkToggleBtn,
                color: menuOpen ? "var(--accent)" : "var(--text)",
                borderColor: menuOpen ? "var(--accent)" : "var(--border)",
              }}
            >
              {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        )}
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 98,
                background: "rgba(0,0,0,0.3)",
              }}
            />

            {/* Menu Panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "57px",
                left: 0,
                right: 0,
                zIndex: 99,
                background: "var(--nav-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--border)",
                padding: "12px 20px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {navLinks.map(({ label, id }, i) => {
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "none",
                      background: isActive ? "rgba(61,127,255,0.10)" : "transparent",
                      color: isActive ? "var(--accent)" : "var(--text)",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;