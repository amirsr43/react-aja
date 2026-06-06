// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

const Hero = () => {
  const handleExplore = () => {
    const section = document.getElementById("templates");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 12px",
          borderRadius: "999px",
          border: "1px solid var(--accent)",
          background: "var(--accent-bg)",
          marginBottom: "24px"
        }}>
          <Zap size={12} style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: "12px", color: "var(--accent)" }}>
            Free & Open Source Templates
          </span>
        </div>

        <h1 style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "var(--text)"
        }}>
          Modern React
          <span style={{
            background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {" "}Templates
          </span>
        </h1>

        <p style={{
          fontSize: "18px",
          color: "var(--muted)",
          maxWidth: "500px",
          margin: "0 auto 32px"
        }}>
          Koleksi template React modern, responsif, dan siap pakai.
        </p>

        <button
          onClick={handleExplore}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          Explore Templates <ArrowRight size={15} />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;