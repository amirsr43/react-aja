// src/components/AnimationsSection.jsx
import { motion } from "framer-motion";
import { Sparkles, Cpu } from "lucide-react";

const AnimationsSection = () => {
  return (
    <section id="animations" style={{ padding: "120px 24px 100px", position: "relative", minHeight: "680px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "600px", width: "100%", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            padding: "50px 32px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            background: "rgba(10, 10, 10, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
          }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "999px",
            border: "1px solid rgba(168, 85, 247, 0.15)",
            background: "rgba(168, 85, 247, 0.04)",
            marginBottom: "24px",
          }}>
            <Sparkles size={12} style={{ color: "#A855F7" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#A855F7", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Under Development
            </span>
          </div>

          {/* Icon with rotating ring animation */}
          <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed rgba(255, 255, 255, 0.08)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Cpu size={20} style={{ color: "var(--muted)" }} />
            </motion.div>
          </div>

          <h2 style={{
            fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800,
            color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.02em",
          }}>
            Animations UI Library
          </h2>
          
          <p style={{
            fontSize: "14px", color: "var(--muted)", margin: "0 0 24px", lineHeight: 1.6,
            maxWidth: "440px", marginInline: "auto"
          }}>
            I am currently crafting a collection of beautiful, copy-paste React animations, transition components, and hover effects. Stay tuned!
          </p>

          {/* Progress Indicator bar */}
          <div style={{ maxWidth: "280px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 600, color: "var(--muted)", marginBottom: "6px" }}>
              <span>Crafting UI Assets</span>
              <span>Coming Soon</span>
            </div>
            <div style={{ height: "4px", width: "100%", background: "rgba(255, 255, 255, 0.06)", borderRadius: "99px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                style={{ height: "100%", background: "linear-gradient(90deg, #A855F7 0%, rgba(255, 255, 255, 0.8) 100%)", borderRadius: "99px" }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AnimationsSection;
