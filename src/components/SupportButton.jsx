// src/components/SupportButton.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ExternalLink, Coffee, Zap, Star } from "lucide-react";

// ── Configure your donation links here ───────────────────────────────────────
const SUPPORT_LINKS = {
  saweria: "https://saweria.co/amirsr",
};
// ─────────────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    id:      "coffee",
    emoji:   "☕",
    icon:    Coffee,
    label:   "Buy me a coffee",
    desc:    "A small cup of thanks!",
    color:   "#f59e0b",
    bg:      "#f59e0b14",
    border:  "#f59e0b40",
    amount:  "Rp 15.000",
  },
  {
    id:      "boost",
    emoji:   "⚡",
    icon:    Zap,
    label:   "Give me a boost",
    desc:    "Keep the components flowing!",
    color:   "#7c3aed",
    bg:      "#7c3aed14",
    border:  "#7c3aed40",
    amount:  "Rp 30.000",
  },
  {
    id:      "star",
    emoji:   "⭐",
    icon:    Star,
    label:   "You're a superstar",
    desc:    "Seriously, you're amazing.",
    color:   "#0ea5e9",
    bg:      "#0ea5e914",
    border:  "#0ea5e940",
    amount:  "Rp 50.000+",
  },
];

const PLATFORMS = [
  {
    id:    "saweria",
    name:  "Saweria",
    emoji: "🇮🇩",
    url:   SUPPORT_LINKS.saweria,
    color: "#FF6B00",
    bg:    "#FF6B0014",
  },
];

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: "-46%" },
  visible: { opacity: 1, scale: 1,   y: "-50%", transition: { type: "spring", damping: 24, stiffness: 300 } },
  exit:    { opacity: 0, scale: 0.96, y: "-47%", transition: { duration: 0.18 } },
};

export default function SupportButton() {
  const [open,        setOpen]        = useState(false);
  const [hoveredTier, setHoveredTier] = useState(null);
  const [pulse,       setPulse]       = useState(false);

  const handleOpen = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    setOpen(true);
  };

  return (
    <>
      {/* ── Floating Coffee Button ── */}
      <motion.button
        id="support-trigger"
        onClick={handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position:       "fixed",
          bottom:         "84px",   // stacked cleanly above ScrollToTop (28px)
          right:          "28px",
          width:          "44px",
          height:         "44px",
          borderRadius:   "12px",
          border:         "1px solid var(--border)",
          background:     "var(--surface)",
          color:          "var(--text)",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          zIndex:         99,
          boxShadow:      "0 8px 24px rgba(0,0,0,0.18)",
          backdropFilter:       "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition:     "all 0.2s",
          fontSize:       "20px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background   = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.borderColor  = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.boxShadow    = "0 8px 24px rgba(255, 255, 255, 0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background   = "var(--surface)";
          e.currentTarget.style.borderColor  = "var(--border)";
          e.currentTarget.style.boxShadow    = "0 8px 24px rgba(0,0,0,0.18)";
        }}
        title="Support me ☕"
        aria-label="Open support / donation panel"
      >
        ☕
        {/* Pulse ring animation */}
        <style>{`
          @keyframes supportPulse {
            0%   { transform: scale(1);   opacity: 0.7; }
            100% { transform: scale(1.9); opacity: 0;   }
          }
          #support-trigger::before {
            content: "";
            position: absolute;
            inset: -4px;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.12);
            animation: supportPulse 2.4s ease-out 3;
            pointer-events: none;
          }
        `}</style>
      </motion.button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="support-backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position:   "fixed",
                inset:      0,
                background: "rgba(0,0,0,0.45)",
                zIndex:     200,
                backdropFilter:       "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Panel */}
            <motion.div
              key="support-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="support-title"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position:     "fixed",
                top:          "50%",
                right:        "28px",
                width:        "min(380px, calc(100vw - 32px))",
                maxHeight:    "calc(100vh - 40px)",
                zIndex:       201,
                background:   "var(--surface)",
                border:       "1px solid var(--border)",
                borderRadius: "20px",
                boxShadow:    "0 24px 64px rgba(0,0,0,0.4)",
                overflow:     "hidden",
                display:      "flex",
                flexDirection: "column",
              }}
            >
              {/* ── Header ── */}
              <div style={{
                padding:    "0",
                background: "linear-gradient(135deg, #f59e0b18 0%, #7c3aed10 100%)",
                borderBottom: "1px solid var(--border)",
              }}>
                {/* Close button */}
                <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 14px 0" }}>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    style={{
                      background:   "transparent",
                      border:       "none",
                      cursor:       "pointer",
                      color:        "var(--muted)",
                      display:      "flex",
                      padding:      "4px",
                      borderRadius: "6px",
                      transition:   "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ textAlign: "center", padding: "0 20px 20px" }}>
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: "44px", lineHeight: 1, marginBottom: "10px", display: "inline-block" }}
                  >
                    ☕
                  </motion.div>
                  <h2 id="support-title" style={{
                    margin: "0 0 6px",
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}>
                    Support My Work
                  </h2>
                  <p style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}>
                    All components are <strong style={{ color: "var(--text)" }}>free forever</strong>. If they saved you time,
                    consider buying me a coffee! ❤️
                  </p>
                </div>
              </div>

              {/* ── Body ── */}
              <div style={{ padding: "16px", overflowY: "auto", flex: 1 }}>

                {/* Tiers */}
                <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Choose an amount
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  {TIERS.map((tier) => {
                    const isHovered = hoveredTier === tier.id;
                    return (
                      <motion.div
                        key={tier.id}
                        onHoverStart={() => setHoveredTier(tier.id)}
                        onHoverEnd={() => setHoveredTier(null)}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display:      "flex",
                          alignItems:   "center",
                          gap:          "12px",
                          padding:      "12px 14px",
                          borderRadius: "12px",
                          border:       `1px solid ${isHovered ? tier.border : "var(--border)"}`,
                          background:   isHovered ? tier.bg : "transparent",
                          cursor:       "pointer",
                          transition:   "all 0.18s",
                        }}
                        onClick={() => window.open(SUPPORT_LINKS.saweria, "_blank")}
                      >
                        <span style={{ fontSize: "24px", lineHeight: 1 }}>{tier.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: isHovered ? tier.color : "var(--text)" }}>
                            {tier.label}
                          </p>
                          <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)" }}>
                            {tier.desc}
                          </p>
                        </div>
                        <span style={{
                          fontSize:     "12px",
                          fontWeight:   700,
                          color:        tier.color,
                          background:   tier.bg,
                          padding:      "3px 10px",
                          borderRadius: "999px",
                          border:       `1px solid ${tier.border}`,
                          whiteSpace:   "nowrap",
                        }}>
                          {tier.amount}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div style={{
                  height:     "1px",
                  background: "linear-gradient(90deg, transparent, var(--border), transparent)",
                  margin:     "0 0 14px",
                }} />

                {/* Platform buttons */}
                <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Support via
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {PLATFORMS.map((p) => (
                    <motion.a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display:        "flex",
                        alignItems:     "center",
                        gap:            "10px",
                        padding:        "10px 14px",
                        borderRadius:   "10px",
                        border:         "1px solid var(--border)",
                        background:     "transparent",
                        textDecoration: "none",
                        color:          "var(--text)",
                        transition:     "all 0.18s",
                        cursor:         "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background    = p.bg;
                        e.currentTarget.style.borderColor   = p.color + "50";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background    = "transparent";
                        e.currentTarget.style.borderColor   = "var(--border)";
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{p.emoji}</span>
                      <span style={{ flex: 1, fontSize: "13px", fontWeight: 600 }}>{p.name}</span>
                      <ExternalLink size={13} style={{ color: "var(--muted)" }} />
                    </motion.a>
                  ))}
                </div>

                {/* Footer note */}
                <p style={{
                  margin:    "14px 0 0",
                  fontSize:  "11px",
                  color:     "var(--muted)",
                  textAlign: "center",
                  display:   "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}>
                  <Heart size={11} style={{ color: "#ef4444" }} />
                  Every contribution keeps this project alive. Thank you!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
