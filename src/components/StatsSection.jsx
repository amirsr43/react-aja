// src/components/StatsSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCubes, FaGift, FaCode, FaBolt } from "react-icons/fa";

const stats = [
  { value: 5, suffix: "+", label: "Templates", icon: FaCubes, color: "#3d7fff" },
  { value: 100, suffix: "%", label: "Free", icon: FaGift, color: "#06b6d4" },
  { value: 3, suffix: "", label: "Tech Stacks", icon: FaCode, color: "#6366f1" },
  { value: 1, suffix: " min", label: "Setup Time", icon: FaBolt, color: "#38bdf8" },
];

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1000;
          const totalFrames = Math.round(duration / 16);
          let frame = 0;
          const timer = setInterval(() => {
            frame++;
            // Ease out quad
            const progress = 1 - Math.pow(1 - frame / totalFrames, 2);
            const current = Math.round(progress * value);
            setCount(current);
            if (frame >= totalFrames) {
              setCount(value);
              clearInterval(timer);
            }
          }, 16);
        }
      },
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const StatsSection = () => {
  return (
    <section style={{ padding: "0 24px 72px" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{
              padding: "24px 20px",
              borderRadius: "18px",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(42, 107, 242, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: stat.color + "1a",
              margin: "0 auto 12px",
            }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: "var(--text)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 500 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
