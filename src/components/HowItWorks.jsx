// src/components/HowItWorks.jsx
import { motion } from "framer-motion";
import { Search, Download, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Pilih Template",
    desc: "Browse koleksi template, lihat preview langsung di demo, pilih yang paling cocok.",
    color: "#7c3aed",
  },
  {
    icon: Download,
    step: "02",
    title: "Download ZIP",
    desc: "Klik tombol download, file ZIP langsung dari GitHub. Ga perlu akun, ga perlu login.",
    color: "#0ea5e9",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Langsung Jalan",
    desc: "Extract → npm install → npm run dev. Kurang dari satu menit udah jalan di localhost.",
    color: "#10b981",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
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
            Cara Pakai
          </p>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--text)",
              margin: "0 0 12px",
            }}
          >
            3 Langkah, Beres
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", margin: 0 }}>
            Ga ada yang ribet. Serius.
          </p>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Step number watermark */}
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "16px",
                    fontSize: "88px",
                    fontWeight: "900",
                    color: step.color,
                    opacity: 0.06,
                    lineHeight: 1,
                    userSelect: "none",
                    fontFamily: "monospace",
                    pointerEvents: "none",
                  }}
                >
                  {step.step}
                </span>

                {/* Icon box */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: step.color + "1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                  }}
                >
                  <Icon size={22} style={{ color: step.color }} />
                </div>

                {/* Step label */}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: step.color,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Langkah {step.step}
                </span>

                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
