// src/components/TemplatesSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDownload,
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaReact,
  FaJs,
  FaNodeJs,
  FaPalette,
  FaWordpress,
  FaVuejs,
  FaAngular,
  FaBootstrap,
  FaCode,
  FaSearch
} from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiTypescript, SiNextdotjs, SiVuedotjs, SiFirebase, SiMongodb, SiExpress, SiPostgresql, SiGraphql } from "react-icons/si";
import portfolioV1Img from "../assets/portfolio_v1.png";
import portfolioV2Img from "../assets/portfolio_v2.png";
import portfolioV3Img from "../assets/portfolio_v3.png";
import dashboardV1Img from "../assets/dashboard_v1.png";
import dashboardV2Img from "../assets/dashboard_v2.png";
import landingPageV1Img from "../assets/landingpage_v1.png";
import landingPageV2Img from "../assets/landingpage_v2.png";
import EcommerceV1Img from "../assets/ecommerce_v1.png";

export const templates = [
  {
    id: 1,
    name: "Portfolio v1",
    category: "Portfolio",
    color: "rgba(61,127,255,0.10)",
    accent: "#3d7fff",
    image: portfolioV1Img,
    description: "Portfolio v1 built with React.js, Tailwind CSS, and Framer Motion. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/portofolio_v1/archive/refs/heads/main.zip",
    demoUrl: "https://portofv1.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 2,
    name: "Dashboard v1",
    category: "Dashboard",
    color: "rgba(99,102,241,0.10)",
    accent: "#6366f1",
    image: dashboardV1Img,
    description: "Dashboard v1 built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/dashboard_v1/archive/refs/heads/main.zip",
    demoUrl: "https://dashbv1.netlify.app/",
    techStack: ["React", "Tailwind CSS"],
  },
  {
    id: 3,
    name: "Foodfolio",
    category: "Landing Page",
    color: "rgba(6,182,212,0.10)",
    accent: "#06b6d4",
    image: landingPageV1Img,
    description: "Landing Page v1 built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/landing-page-v1/archive/refs/heads/main.zip",
    demoUrl: "https://foodpolio.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 4,
    name: "ZestifyCart",
    category: "E-Commerce",
    color: "rgba(56,189,248,0.10)",
    accent: "#38bdf8",
    image: EcommerceV1Img,
    description: "E-Commerce v1 built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/ecommerce-v1/archive/refs/heads/main.zip",
    demoUrl: "https://zestifycart.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 5,
    name: "Dashboard v2",
    category: "Dashboard",
    color: "rgba(99,102,241,0.10)",
    accent: "#6366f1",
    image: dashboardV2Img,
    description: "Dashboard v2 built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/dashboard_v2/archive/refs/heads/main.zip",
    demoUrl: "https://dashbv2.netlify.app/",
    techStack: ["React", "Tailwind CSS"],
  },
  {
    id: 6,
    name: "Portfolio v2",
    category: "Portfolio",
    color: "rgba(61,127,255,0.10)",
    accent: "#3d7fff",
    image: portfolioV2Img,
    description: "Portfolio v2 built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/portofolio_v2/archive/refs/heads/main.zip",
    demoUrl: "https://portofv2.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 7,
    name: "Portfolio v3",
    category: "Portfolio",
    color: "rgba(61,127,255,0.10)",
    accent: "#3d7fff",
    image: portfolioV3Img,
    description: "Portfolio v3 built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/portofolio_v3/archive/refs/heads/main.zip",
    demoUrl: "https://portofv3.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 8,
    name: "Vitecomp",
    category: "Landing Page",
    color: "rgba(61,127,255,0.10)",
    accent: "#3d7fff",
    image: landingPageV2Img,
    description: "Vitecomp landing page built with React.js and Tailwind CSS. Modern, responsive, and interactive.",
    downloadUrl: "https://github.com/amirsr43/landing-page-v2/archive/refs/heads/main.zip",
    demoUrl: "https://vitecomp.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
];

const categories = ["All", "Dashboard", "Landing Page", "Portfolio", "E-Commerce"];

const getTechIcon = (tech) => {
  const icons = {
    "React": <FaReact size={12} />,
    "Tailwind CSS": <SiTailwindcss size={12} />,
    "Framer Motion": <SiFramer size={12} />,
    "TypeScript": <SiTypescript size={12} />,
    "Next.js": <SiNextdotjs size={12} />,
    "Vue.js": <SiVuedotjs size={12} />,
    "Angular": <FaAngular size={12} />,
    "Node.js": <FaNodeJs size={12} />,
    "Express": <SiExpress size={12} />,
    "MongoDB": <SiMongodb size={12} />,
    "PostgreSQL": <SiPostgresql size={12} />,
    "GraphQL": <SiGraphql size={12} />,
    "Firebase": <SiFirebase size={12} />,
    "Bootstrap": <FaBootstrap size={12} />,
    "jQuery": <FaJs size={12} />,
    "WordPress": <FaWordpress size={12} />,
    "Vue": <FaVuejs size={12} />,
  };
  return icons[tech] || <FaCode size={12} />;
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function TechStackBadges({ techStack }) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginBottom: "12px",
      alignItems: "center"
    }}>
      {techStack.map((tech, index) => (
        <span
          key={index}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "10px",
            fontWeight: 500,
            padding: "3px 8px",
            borderRadius: "6px",
            background: "rgba(61,127,255,0.12)",
            color: "#7eb8ff",
            letterSpacing: "0.01em",
            border: "1px solid rgba(61,127,255,0.20)",
          }}
        >
          {getTechIcon(tech)}
          <span>{tech}</span>
        </span>
      ))}
    </div>
  );
}

function DownloadToast({ name, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(61,127,255,0.15)",
        zIndex: 1000,
        minWidth: "260px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <FaCheckCircle style={{ fontSize: "20px", color: "#4CAF50" }} />
      <div>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
          Download started!
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)" }}>
          {name} is being downloaded from GitHub...
        </p>
      </div>
      <button
        onClick={onClose}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--muted)",
          fontSize: "16px",
          padding: "0",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaTimes />
      </button>
    </motion.div>
  );
}

function TemplateCard({ template, onDownload }) {
  const [downloading, setDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    setDownloading(true);

    const link = document.createElement("a");
    link.href = template.downloadUrl;
    link.download = `${template.name.toLowerCase()}.zip`;
    link.click();

    setTimeout(() => {
      setDownloading(false);
      onDownload(template.name);
    }, 800);
  };

  const handleDemo = (e) => {
    e.stopPropagation();
    window.open(template.demoUrl, "_blank");
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "18px",
        border: "1px solid var(--border)",
        background: isHovered
          ? `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, ${template.accent}12, var(--card-bg) 70%)`
          : "var(--card-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        boxShadow: "0 10px 30px rgba(42, 107, 242, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        style={{
          height: "180px",
          position: "relative",
          overflow: "hidden",
          background: template.color,
        }}
      >
        {template.image && !imageError ? (
          <img
            src={template.image}
            alt={template.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: template.color,
            }}
          >
            <FaPalette style={{ fontSize: "56px", opacity: 0.6 }} />
          </div>
        )}
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "6px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
            {template.name}
          </h3>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 10px",
              borderRadius: "999px",
              background: template.color,
              color: template.accent,
              fontWeight: 600,
              whiteSpace: "nowrap",
              marginLeft: "8px",
              border: `1px solid ${template.accent}40`,
            }}
          >
            {template.category}
          </span>
        </div>

        <p
          style={{
            margin: "12px 0 12px",
            fontSize: "13px",
            color: "var(--muted)",
            lineHeight: 1.5,
          }}
        >
          {template.description}
        </p>

        <TechStackBadges techStack={template.techStack} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "14px",
            paddingTop: "12px",
            borderTop: "1px solid var(--border)",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <motion.button
              onClick={handleDemo}
              whileTap={{ scale: 0.96 }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border-glow)",
                background: "rgba(61,127,255,0.06)",
                color: "var(--text)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <FaEye size={14} />
              Demo
            </motion.button>

            <motion.button
              onClick={handleDownload}
              whileTap={{ scale: 0.96 }}
              disabled={downloading}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: downloading ? "rgba(99,102,241,0.4)" : `linear-gradient(135deg, ${template.accent}, ${template.accent}cc)`,
                color: "#fff",
                cursor: downloading ? "not-allowed" : "pointer",
                boxShadow: downloading ? "none" : `0 4px 16px ${template.accent}50`,
                transition: "all 0.2s",
              }}
            >
              {downloading ? (
                <>
                  <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>⟳</span>
                  Downloading...
                </>
              ) : (
                <>
                  <FaDownload size={12} />
                  Download
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const TemplatesSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState(null);

  const filtered =
    activeFilter === "All"
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  const showToast = (name) => {
    setToast(name);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <section id="templates" style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>

      {/* Background glow effects */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px", opacity: 0.85 }}>
            Template Library
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Pick Your Favorite Template
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", margin: 0 }}>
            Start faster — browse, preview, download, and use right away.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                fontSize: "13px",
                fontWeight: 600,
                padding: "7px 18px",
                borderRadius: "999px",
                border: "1px solid",
                borderColor: activeFilter === cat ? "var(--accent)" : "var(--border)",
                background: activeFilter === cat
                  ? "linear-gradient(135deg, #3d7fff, #6366f1)"
                  : "rgba(61,127,255,0.04)",
                color: activeFilter === cat ? "#fff" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeFilter === cat ? "0 4px 16px rgba(61,127,255,0.35)" : "none",
              }}
              onMouseEnter={e => { if (activeFilter !== cat) { e.currentTarget.style.background = "rgba(61,127,255,0.10)"; e.currentTarget.style.color = "var(--text)"; } }}
              onMouseLeave={e => { if (activeFilter !== cat) { e.currentTarget.style.background = "rgba(61,127,255,0.04)"; e.currentTarget.style.color = "var(--muted)"; } }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onDownload={showToast}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "var(--muted)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px"
            }}
          >
            {/* Icon Search di Tengah */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(61,127,255,0.08)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <FaSearch style={{ fontSize: "40px", opacity: 0.6 }} />
            </div>

            {/* Tulisan Tidak Ada Template */}
            <div>
              <p style={{
                fontSize: "18px",
                fontWeight: 600,
                margin: "0 0 8px 0",
                color: "var(--text)"
              }}>
                No Templates Found
              </p>
              <p style={{
                fontSize: "14px",
                margin: 0,
                color: "var(--muted)"
              }}>
                No templates available for the "{activeFilter}" category.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <DownloadToast name={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default TemplatesSection;