// src/components/TemplatesSection.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const templates = [
  {
    id: 1,
    name: "NexaDash",
    category: "Dashboard",
    badge: "popular",
    rating: 4.8,
    reviews: 214,
    color: "#E6F1FB",
    accent: "#378ADD",
    icon: "📊",
    description: "Analytics dashboard dengan chart interaktif dan dark mode.",
    downloadUrl: "https://github.com/username/nama-repo/archive/refs/heads/main.zip",
    demoUrl: "https://nexadash-demo.netlify.app",
    size: "2.4 MB",
    version: "v2.1.0",
  },
  {
    id: 2,
    name: "LaunchKit",
    category: "Landing Page",
    badge: "new",
    rating: 4.6,
    reviews: 89,
    color: "#E1F5EE",
    accent: "#1D9E75",
    icon: "🚀",
    description: "Landing page modern untuk startup dengan animasi smooth.",
    downloadUrl: "https://github.com/username/launchkit/archive/refs/heads/main.zip",
    demoUrl: "https://launchkit-demo.netlify.app",
    size: "1.8 MB",
    version: "v1.0.3",
  },
  {
    id: 3,
    name: "FolioX",
    category: "Portfolio",
    badge: null,
    rating: 4.5,
    reviews: 142,
    color: "#EEEDFE",
    accent: "#7F77DD",
    icon: "🎨",
    description: "Portfolio minimalis untuk desainer dan developer kreatif.",
    downloadUrl: "https://github.com/username/foliox/archive/refs/heads/main.zip",
    demoUrl: "https://foliox-demo.netlify.app",
    size: "1.2 MB",
    version: "v3.0.1",
  },
  {
    id: 4,
    name: "ShopEase",
    category: "E-Commerce",
    badge: "new",
    rating: 4.7,
    reviews: 63,
    color: "#FAEEDA",
    accent: "#BA7517",
    icon: "🛒",
    description: "Template toko online lengkap dengan keranjang dan checkout.",
    downloadUrl: "https://github.com/username/shopease/archive/refs/heads/main.zip",
    demoUrl: "https://shopease-demo.netlify.app",
    size: "3.1 MB",
    version: "v1.2.0",
  },
  {
    id: 5,
    name: "AdminPro",
    category: "Dashboard",
    badge: null,
    rating: 4.9,
    reviews: 381,
    color: "#FCEBEB",
    accent: "#E24B4A",
    icon: "⚙️",
    description: "Admin panel lengkap dengan manajemen user dan role.",
    downloadUrl: "https://github.com/username/adminpro/archive/refs/heads/main.zip",
    demoUrl: "https://adminpro-demo.netlify.app",
    size: "4.2 MB",
    version: "v4.0.0",
  },
  {
    id: 6,
    name: "CreativeMe",
    category: "Portfolio",
    badge: "popular",
    rating: 4.4,
    reviews: 97,
    color: "#FBEAF0",
    accent: "#D4537E",
    icon: "✦",
    description: "Portfolio bold dan ekspresif untuk seniman dan fotografer.",
    downloadUrl: "https://github.com/username/creativeme/archive/refs/heads/main.zip",
    demoUrl: "https://creativeme-demo.netlify.app",
    size: "2.0 MB",
    version: "v2.3.1",
  },
];

const categories = ["Semua", "Dashboard", "Landing Page", "Portfolio", "E-Commerce"];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: "11px",
            color: i < Math.round(rating) ? "#EF9F27" : "#D1D0CB",
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "4px" }}>
        {rating} ({rating >= 100 ? rating : rating})
      </span>
    </div>
  );
}

function BadgePill({ badge }) {
  if (!badge) return null;
  const styles = {
    popular: { bg: "#EEEDFE", color: "#3C3489", label: "⭐ Popular" },
    new: { bg: "#E1F5EE", color: "#085041", label: "✦ New" },
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
      }}
    >
      {s.label}
    </span>
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
      <span style={{ fontSize: "20px" }}>✅</span>
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
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}

function TemplateCard({ template, onDownload }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    setDownloading(true);

    // Trigger download file dari GitHub
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
    // Buka demo di tab baru
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
      {/* Preview Area */}
      <div
        style={{
          height: "160px",
          background: template.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <BadgePill badge={template.badge} />
        <span style={{ fontSize: "56px", opacity: 0.75 }}>{template.icon}</span>

        {/* Version tag */}
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.7)",
            color: "#444",
            fontWeight: 500,
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

        <Stars rating={template.rating} />

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
            📦 {template.size}
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
              👁️ Demo
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
                  ↓ Download
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
        @keyframes spin { to { transform: rotate(360deg); } }
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
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
            <p style={{ fontSize: "16px" }}>Tidak ada template untuk kategori ini.</p>
          </div>
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