// src/components/PromoSection.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCubes, FaLaptopCode, FaArrowRight, FaCheck } from "react-icons/fa";

const PromoSection = () => {
  const navigate = useNavigate();

  const handleNavigateTemplates = () => {
    navigate("/templates");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateAnimations = () => {
    navigate("/animations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "40px 24px 80px", position: "relative" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "10px",
            }}
          >
            Explore Library
          </p>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--text)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Build Faster with Curated Assets
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "600px", margin: "0 auto" }}>
            Get production-ready React templates or copy-paste beautiful animations and hover effects to power up your web application.
          </p>
        </motion.div>

        {/* Promo Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {/* Card 1: Templates */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              padding: "32px",
              borderRadius: "24px",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "440px",
            }}
            className="promo-card"
          >
            <div>
              {/* Icon Box */}
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <FaLaptopCode size={24} style={{ color: "#ffffff" }} />
              </div>

              {/* Title & Desc */}
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 750,
                  color: "var(--text)",
                  margin: "0 0 10px",
                }}
              >
                React Templates
              </h3>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                Fully structured websites with animations, navigation, responsive layouts, and clean codebase configurations.
              </p>

              {/* Bullet Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {[
                  "Clean folder structure & configurations",
                  "Vite + React.js + Tailwind CSS stacks",
                  "Responsive on all screen devices",
                ].map((bullet, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <FaCheck size={9} style={{ color: "#ffffff" }} />
                    </div>
                    <span style={{ fontSize: "13.5px", color: "var(--text)", fontWeight: 500 }}>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Preview & Button Container */}
            <div>
              {/* Mini Template Preview */}
              <div style={{
                background: "rgba(255, 255, 255, 0.015)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "12px",
                marginBottom: "24px",
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "8px",
              }}>
                <div style={{ background: "rgba(255, 255, 255, 0.04)", borderRadius: "8px", height: "45px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", justifyContent: "center" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.1)", height: "8px", borderRadius: "4px", width: "80%" }} />
                  <div style={{ background: "rgba(255, 255, 255, 0.06)", height: "6px", borderRadius: "3px", width: "50%" }} />
                  <div style={{ background: "rgba(255, 255, 255, 0.04)", height: "4px", borderRadius: "2px", width: "30%" }} />
                </div>
              </div>

              <button
                onClick={handleNavigateTemplates}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#ffffff",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "14.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(255, 255, 255, 0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                className="promo-btn"
              >
                Browse Templates
                <FaArrowRight size={13} />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Animation UI */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              padding: "32px",
              borderRadius: "24px",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "440px",
            }}
            className="promo-card"
          >
            <div>
              {/* Icon Box */}
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <FaCubes size={24} style={{ color: "#ffffff" }} />
              </div>

              {/* Title & Desc */}
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 750,
                  color: "var(--text)",
                  margin: "0 0 10px",
                }}
              >
                Animation UI
              </h3>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                Beautiful, modular Framer Motion code blocks for animations. Simply copy the code and insert into your workspace.
              </p>

              {/* Bullet Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {[
                  "Framer Motion & CSS customized presets",
                  "Copy-paste friendly animation code",
                  "Active live animation interactive previews",
                ].map((bullet, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <FaCheck size={9} style={{ color: "#ffffff" }} />
                    </div>
                    <span style={{ fontSize: "13.5px", color: "var(--text)", fontWeight: 500 }}>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Preview & Button Container */}
            <div>
              {/* Mini Animations Preview */}
              <div style={{
                background: "rgba(255, 255, 255, 0.015)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "10px 14px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}>
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  Float
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "#ffffff",
                    color: "#000000",
                    boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  Pulse
                </motion.div>
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  Fade
                </motion.div>
              </div>

              <button
                onClick={handleNavigateAnimations}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "transparent",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "14.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "transform 0.2s, background-color 0.2s, border-color 0.2s",
                }}
                className="promo-btn-outline"
              >
                Browse Animations
                <FaArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styled hover transitions */}
      <style>{`
        .promo-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .promo-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
        }
        .promo-btn {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .promo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
        }
        .promo-btn:active {
          transform: translateY(0);
        }
        .promo-btn-outline {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .promo-btn-outline:hover {
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.35);
        }
        .promo-btn-outline:active {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default PromoSection;
