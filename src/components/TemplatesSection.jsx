// src/components/TemplatesSection.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaDownload, 
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaReact,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaDatabase,
  FaCloud,
  FaPalette,
  FaShoppingCart,
  FaChartLine,
  FaMobileAlt,
  FaWordpress,
  FaVuejs,
  FaAngular,
  FaBootstrap,
  FaNpm,
  FaServer,
  FaCode,
  FaSearch
} from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiTypescript, SiNextdotjs, SiVuedotjs, SiFirebase, SiMongodb, SiExpress, SiPostgresql, SiGraphql } from "react-icons/si";
import portfolioV1Img from "../assets/portfolio_v1.png";

const templates = [
  {
    id: 1,
    name: "Portfolio v1",
    category: "Portfolio",
    color: "#E6F1FB",
    accent: "#378ADD",
    image: portfolioV1Img,
    description: "Portfolio v1 dengan React.js, Tailwind CSS, dan Framer Motion. Modern, responsif, dan interaktif.",
    downloadUrl: "https://github.com/amirsr43/portofolio_v1/archive/refs/heads/main.zip",
    demoUrl: "https://portofv1.netlify.app/",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    // size: "2.4 MB",
    // version: "v2.1.0",
  },
];

const categories = ["Semua", "Dashboard", "Landing Page", "Portfolio", "E-Commerce"];

// Tech stack icon mapping
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

function BadgePill({ badge }) {
  if (!badge) return null;
  const styles = {
    popular: { bg: "#EEEDFE", color: "#3C3489", label: <><FaChartLine size={10} style={{ marginRight: "4px" }} /> Popular</> },
    new: { bg: "#E1F5EE", color: "#085041", label: <><FaCheckCircle size={10} style={{ marginRight: "4px" }} /> New</> },
  };
  const s = styles[badge];
  return (
    <span
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        fontSize: "11px",
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: "999px",
        background: s.bg,
        color: s.color,
        letterSpacing: "0.02em",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {s.label}
    </span>
  );
}

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
            background: "#F0F0F0",
            color: "#444",
            letterSpacing: "0.01em",
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
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        zIndex: 1000,
        minWidth: "260px",
      }}
    >
      <FaCheckCircle style={{ fontSize: "20px", color: "#4CAF50" }} />
      <div>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
          Download dimulai!
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)" }}>
          {name} sedang diunduh dari GitHub...
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
      style={{
        borderRadius: "16px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Preview Area with Image */}
      <div
        style={{
          height: "180px",
          position: "relative",
          overflow: "hidden",
          background: template.color,
        }}
      >
        <BadgePill badge={template.badge} />
        
        {/* Gambar Template */}
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

        {/* Version tag */}
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.9)",
            color: "#444",
            fontWeight: 500,
            backdropFilter: "blur(4px)",
            zIndex: 2,
          }}
        >
          {template.version}
        </span>
      </div>

      {/* Card Body */}
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
            }}
          >
            {template.category}
          </span>
        </div>

        <p
          style={{
            margin: "0 0 12px",
            fontSize: "13px",
            color: "var(--muted)",
            lineHeight: 1.5,
          }}
        >
          {template.description}
        </p>

        {/* Tech Stack Badges */}
        <TechStackBadges techStack={template.techStack} />

        {/* Footer */}
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
          <span style={{ fontSize: "12px", color: "var(--muted)" }}>
            {template.size}
          </span>

          <div style={{ display: "flex", gap: "8px" }}>
            <motion.button
              onClick={handleDemo}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "transparent",
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
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: downloading ? "#ccc" : template.accent,
                color: "#fff",
                cursor: downloading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
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
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [toast, setToast] = useState(null);

  const filtered =
    activeFilter === "Semua"
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  const showToast = (name) => {
    setToast(name);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <section style={{ padding: "80px 24px", position: "relative" }}>
      <style>{`
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>
            Template Library
          </p>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--text)",
              margin: "0 0 12px",
            }}
          >
            Pilih Template Favoritmu
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", margin: 0 }}>
            Mulai lebih cepat — pilih, demo, download, langsung pakai.
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
                fontWeight: 500,
                padding: "7px 18px",
                borderRadius: "999px",
                border: "1px solid",
                borderColor: activeFilter === cat ? "var(--text)" : "var(--border)",
                background: activeFilter === cat ? "var(--text)" : "transparent",
                color: activeFilter === cat ? "var(--surface)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
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
                background: "rgba(0,0,0,0.05)",
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
                Tidak Ada Template Ditemukan
              </p>
              <p style={{ 
                fontSize: "14px", 
                margin: 0,
                color: "var(--muted)"
              }}>
                Tidak ada template untuk kategori "{activeFilter}"
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