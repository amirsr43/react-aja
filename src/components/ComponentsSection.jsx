// src/components/ComponentsSection.jsx
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Eye, Code2, Layers } from "lucide-react";
import { Mail, Search } from "lucide-react";

import { UIButton } from "./ui/Button";
import { UIBadge } from "./ui/Badge";
import { UICard } from "./ui/Card";
import { UIAlert } from "./ui/Alert";
import { UIInput } from "./ui/Input";
import { UISpinner } from "./ui/Spinner";

// ─── Component Registry ──────────────────────────────────────────────────────

const COMPONENTS = [
  {
    id: "button",
    name: "Button",
    category: "Actions",
    description: "Versatile button with 5 variants, 3 sizes, loading and disabled states.",
    preview: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", justifyContent: "center" }}>
        <UIButton variant="primary">Primary</UIButton>
        <UIButton variant="secondary">Secondary</UIButton>
        <UIButton variant="outline">Outline</UIButton>
        <UIButton variant="ghost">Ghost</UIButton>
        <UIButton variant="danger">Danger</UIButton>
        <UIButton variant="primary" size="sm">Small</UIButton>
        <UIButton variant="primary" size="lg">Large</UIButton>
        <UIButton variant="primary" loading>Loading</UIButton>
        <UIButton variant="ghost" disabled>Disabled</UIButton>
      </div>
    ),
    code: `// Button.jsx
import { useState } from "react";

const sizeStyles = {
  sm: { fontSize: "12px", padding: "6px 14px", borderRadius: "8px", gap: "5px" },
  md: { fontSize: "14px", padding: "9px 20px", borderRadius: "10px", gap: "7px" },
  lg: { fontSize: "16px", padding: "12px 28px", borderRadius: "12px", gap: "8px" },
};

const variantStyles = {
  primary:   { background: "linear-gradient(135deg, #3d7fff, #6366f1)", color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(61,127,255,0.35)" },
  secondary: { background: "rgba(61,127,255,0.08)", color: "#3d7fff", border: "1px solid rgba(61,127,255,0.25)" },
  ghost:     { background: "transparent", color: "#64748b", border: "1px solid #e2e8f0" },
  danger:    { background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(239,68,68,0.35)" },
  outline:   { background: "transparent", color: "#3d7fff", border: "1px solid #3d7fff" },
};

export function Button({ children = "Button", variant = "primary", size = "md", disabled, loading, icon, onClick, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "inherit", fontWeight: 600, cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1, transition: "all 0.2s ease", outline: "none",
        transform: hovered && !disabled ? "translateY(-1px)" : "translateY(0)",
        ...sizeStyles[size], ...variantStyles[variant], ...style,
      }}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {loading && <span style={{ width: 14, height: 14, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />}
      {!loading && icon}
      {children}
      <style>{\`@keyframes spin { to { transform: rotate(360deg); } }\`}</style>
    </button>
  );
}`,
  },
  {
    id: "badge",
    name: "Badge",
    category: "Display",
    description: "Compact badge for status, labels, and tags. 6 color variants with optional dot.",
    preview: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "center" }}>
        <UIBadge variant="default">Default</UIBadge>
        <UIBadge variant="success" dot>Success</UIBadge>
        <UIBadge variant="warning" dot>Warning</UIBadge>
        <UIBadge variant="error" dot>Error</UIBadge>
        <UIBadge variant="info">Info</UIBadge>
        <UIBadge variant="neutral">Neutral</UIBadge>
        <UIBadge variant="success" size="lg">Large</UIBadge>
        <UIBadge variant="error" size="sm">Small</UIBadge>
      </div>
    ),
    code: `// Badge.jsx
const variantStyles = {
  default: { background: "rgba(61,127,255,0.10)",  color: "#3d7fff", border: "1px solid rgba(61,127,255,0.20)" },
  success: { background: "rgba(16,185,129,0.10)",  color: "#10b981", border: "1px solid rgba(16,185,129,0.20)" },
  warning: { background: "rgba(245,158,11,0.10)",  color: "#f59e0b", border: "1px solid rgba(245,158,11,0.20)" },
  error:   { background: "rgba(239,68,68,0.10)",   color: "#ef4444", border: "1px solid rgba(239,68,68,0.20)" },
  info:    { background: "rgba(6,182,212,0.10)",   color: "#06b6d4", border: "1px solid rgba(6,182,212,0.20)" },
  neutral: { background: "rgba(100,116,139,0.10)", color: "#64748b", border: "1px solid rgba(100,116,139,0.20)" },
};

const sizeStyles = {
  sm: { fontSize: "10px", padding: "2px 8px",   borderRadius: "999px" },
  md: { fontSize: "11px", padding: "3px 10px",  borderRadius: "999px" },
  lg: { fontSize: "13px", padding: "4px 14px",  borderRadius: "999px" },
};

export function Badge({ children = "Badge", variant = "default", size = "md", dot = false, style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontWeight: 600, ...sizeStyles[size], ...variantStyles[variant], ...style }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />}
      {children}
    </span>
  );
}`,
  },
  {
    id: "card",
    name: "Card",
    category: "Display",
    description: "Flexible card container with header, body, footer slots and hover lift effect.",
    preview: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", width: "100%" }}>
        <UICard title="Simple Card" description="A clean card with title and description." style={{ width: "200px" }} />
        <UICard
          title="With Footer"
          description="Card body content goes here."
          footer={<UIButton size="sm" variant="primary" style={{ width: "100%" }}>Action</UIButton>}
          style={{ width: "200px" }}
        >
          <UIBadge variant="success" dot>Active</UIBadge>
        </UICard>
      </div>
    ),
    code: `// Card.jsx
import { useState } from "react";

export function Card({ title, description, footer, children, hover = true, padding = "20px", style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        borderRadius: "16px",
        border: "1px solid var(--border, #e2e8f0)",
        background: "var(--card-bg, #fff)",
        boxShadow: hovered ? "0 12px 40px rgba(61,127,255,0.10)" : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.25s ease",
        overflow: "hidden",
        ...style,
      }}
    >
      {(title || description) && (
        <div style={{ padding, borderBottom: children || footer ? "1px solid var(--border, #e2e8f0)" : "none" }}>
          {title && <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: "var(--text, #0f172a)" }}>{title}</p>}
          {description && <p style={{ margin: 0, fontSize: "13px", color: "var(--muted, #64748b)", lineHeight: 1.5 }}>{description}</p>}
        </div>
      )}
      {children && <div style={{ padding }}>{children}</div>}
      {footer && (
        <div style={{ padding: \`12px \${padding}\`, borderTop: "1px solid var(--border, #e2e8f0)", background: "var(--surface-2, #f8fafc)" }}>
          {footer}
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Alert box for info, success, warning and error messages. Supports dismissal.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "380px", margin: "0 auto" }}>
        <UIAlert type="success" title="Success!" message="Your changes have been saved." />
        <UIAlert type="error" title="Error" message="Something went wrong. Please try again." />
        <UIAlert type="warning" message="Your session will expire in 5 minutes." />
        <UIAlert type="info" message="New version available. Refresh to update." dismissible />
      </div>
    ),
    code: `// Alert.jsx
import { useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

const typeConfig = {
  success: { icon: CheckCircle,   color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.20)" },
  error:   { icon: AlertCircle,   color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.20)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.20)" },
  info:    { icon: Info,          color: "#3d7fff", bg: "rgba(61,127,255,0.08)",  border: "rgba(61,127,255,0.20)" },
};

export function Alert({ type = "info", title, message, dismissible, onDismiss, style = {} }) {
  const [visible, setVisible] = useState(true);
  const cfg = typeConfig[type];
  const Icon = cfg.icon;
  if (!visible) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderRadius: "12px", border: \`1px solid \${cfg.border}\`, background: cfg.bg, width: "100%", boxSizing: "border-box", ...style }}>
      <Icon size={18} style={{ color: cfg.color, flexShrink: 0, marginTop: "1px" }} />
      <div style={{ flex: 1 }}>
        {title && <p style={{ margin: "0 0 3px", fontSize: "14px", fontWeight: 700, color: cfg.color }}>{title}</p>}
        <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{message}</p>
      </div>
      {dismissible && (
        <button onClick={() => { setVisible(false); onDismiss?.(); }} style={{ background: "none", border: "none", cursor: "pointer", color: cfg.color, padding: 0, opacity: 0.7 }}>
          <X size={15} />
        </button>
      )}
    </div>
  );
}`,
  },
  {
    id: "input",
    name: "Input",
    category: "Form",
    description: "Input field with label, icon, error state, helper text, and focus ring.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "320px", margin: "0 auto" }}>
        <UIInput label="Email" placeholder="you@example.com" icon={<Mail size={15} />} />
        <UIInput label="Search" placeholder="Search templates..." icon={<Search size={15} />} />
        <UIInput label="Username" placeholder="Enter username" error="Username already taken" />
        <UIInput label="Optional" placeholder="Type here..." helperText="This field is optional." />
      </div>
    ),
    code: `// Input.jsx
import { useState } from "react";

export function Input({ label, placeholder, type = "text", value, onChange, error, helperText, icon, disabled, style = {} }) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? "#ef4444" : focused ? "#3d7fff" : "#e2e8f0";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", ...style }}>
      {label && <label style={{ fontSize: "13px", fontWeight: 600, color: error ? "#ef4444" : "var(--text, #0f172a)" }}>{label}</label>}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && <span style={{ position: "absolute", left: "12px", color: focused ? "#3d7fff" : "#64748b", display: "flex", alignItems: "center", pointerEvents: "none" }}>{icon}</span>}
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: icon ? "10px 12px 10px 38px" : "10px 14px", borderRadius: "10px",
            border: \`1px solid \${borderColor}\`, background: "var(--bg, #f8fafc)", color: "var(--text, #0f172a)",
            fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box",
            opacity: disabled ? 0.5 : 1, transition: "border-color 0.2s",
            boxShadow: focused ? \`0 0 0 3px \${error ? "rgba(239,68,68,0.12)" : "rgba(61,127,255,0.12)"}\` : "none",
          }}
        />
      </div>
      {(error || helperText) && <p style={{ margin: 0, fontSize: "12px", color: error ? "#ef4444" : "#64748b" }}>{error || helperText}</p>}
    </div>
  );
}`,
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Lightweight CSS spinner with multiple sizes and color variants.",
    preview: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "center" }}>
        <UISpinner size="sm" variant="primary" label="Small" />
        <UISpinner size="md" variant="success" label="Success" />
        <UISpinner size="lg" variant="warning" label="Warning" />
        <UISpinner size="xl" variant="danger" label="Danger" />
        <UISpinner size="md" variant="neutral" label="Neutral" />
      </div>
    ),
    code: `// Spinner.jsx
const sizeMap    = { sm: 16, md: 24, lg: 36, xl: 48 };
const colorMap   = { primary: "#3d7fff", success: "#10b981", warning: "#f59e0b", danger: "#ef4444", neutral: "#64748b" };

export function Spinner({ size = "md", variant = "primary", label, style = {} }) {
  const px    = typeof size === "number" ? size : sizeMap[size] ?? 24;
  const color = colorMap[variant] ?? colorMap.primary;
  const t     = px <= 16 ? 2 : px <= 24 ? 2.5 : 3;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "8px", ...style }}>
      <span style={{ display: "inline-block", width: px, height: px, border: \`\${t}px solid \${color}25\`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.75s linear infinite" }} />
      {label && <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>{label}</span>}
      <style>{\`@keyframes spin { to { transform: rotate(360deg); } }\`}</style>
    </div>
  );
}`,
  },
];

const CATEGORIES = ["All", "Actions", "Display", "Feedback", "Form"];

// ─── CopyButton ──────────────────────────────────────────────────────────────

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      title="Copy code"
      style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)",
        background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.08)",
        color: copied ? "#10b981" : "rgba(255,255,255,0.7)",
        fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
        transition: "all 0.2s",
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// ─── ComponentCard ───────────────────────────────────────────────────────────

function ComponentCard({ component }) {
  const [activeTab, setActiveTab] = useState("preview");

  const tabStyle = (tab) => ({
    padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
    border: "none", cursor: "pointer", fontFamily: "inherit",
    background: activeTab === tab ? "var(--card-bg)" : "transparent",
    color: activeTab === tab ? "var(--accent)" : "var(--muted)",
    boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.18s",
  });

  const categoryColors = {
    Actions: { color: "#ffffff", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.10)" },
    Display: { color: "#ffffff", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.10)" },
    Feedback: { color: "#ffffff", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.10)" },
    Form: { color: "#ffffff", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.10)" },
  };
  const cat = categoryColors[component.category] || categoryColors.Actions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      style={{
        borderRadius: "18px", border: "1px solid var(--border)",
        background: "var(--card-bg)", overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      }}
    >
      {/* Header */}
      <div style={{ padding: "18px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
            {component.name}
          </h3>
          <span style={{
            fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px",
            background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
          }}>
            {component.category}
          </span>
        </div>
        <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>
          {component.description}
        </p>

        {/* Tab switcher */}
        <div style={{
          display: "inline-flex", gap: "2px", padding: "3px",
          background: "rgba(255, 255, 255, 0.03)", borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          marginBottom: "14px",
        }}>
          <button style={tabStyle("preview")} onClick={() => setActiveTab("preview")}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Eye size={12} /> Preview
            </span>
          </button>
          <button style={tabStyle("code")} onClick={() => setActiveTab("code")}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Code2 size={12} /> Code
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              padding: "24px 20px",
              background: "var(--surface-2)",
              borderTop: "1px solid var(--border)",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {component.preview}
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ position: "relative", borderTop: "1px solid var(--border)" }}
          >
            {/* Code toolbar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px",
              background: "#0d1117",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                {component.name.toLowerCase()}.jsx
              </span>
              <CopyButton code={component.code} />
            </div>

            {/* Code block */}
            <pre style={{
              margin: 0, padding: "18px 20px",
              background: "#0d1117",
              color: "#e6edf3",
              fontSize: "12px",
              lineHeight: 1.75,
              overflowX: "auto",
              fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              maxHeight: "320px",
              overflowY: "auto",
            }}>
              <code>{component.code}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── ComponentsSection ───────────────────────────────────────────────────────

const ComponentsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? COMPONENTS
    : COMPONENTS.filter((c) => c.category === activeCategory);

  return (
    <section id="components" style={{ padding: "80px 24px", position: "relative" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "5%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "999px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(255, 255, 255, 0.03)",
            marginBottom: "16px",
          }}>
            <Layers size={13} style={{ color: "#ffffff" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              UI Components
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
            color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.02em",
          }}>
            Copy-Paste Components
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", margin: 0, maxWidth: "520px", marginInline: "auto" }}>
            Accessible, customizable UI components. Copy the code and drop it into your project — no dependencies needed.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize: "13px", fontWeight: 600, padding: "7px 18px",
                borderRadius: "999px", border: "1px solid",
                borderColor: activeCategory === cat ? "rgba(255, 255, 255, 0.25)" : "var(--border)",
                background: activeCategory === cat
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.04)",
                color: activeCategory === cat ? "#000000" : "var(--muted)",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: activeCategory === cat ? "0 4px 16px rgba(255, 255, 255, 0.15)" : "none",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { if (activeCategory !== cat) { e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"; e.currentTarget.style.color = "var(--text)"; }}}
              onMouseLeave={(e) => { if (activeCategory !== cat) { e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"; e.currentTarget.style.color = "var(--muted)"; }}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Component Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: "64px", textAlign: "center",
            padding: "40px 32px", borderRadius: "20px",
            border: "1px solid var(--border)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--text)" }}>
            More components coming soon 🚀
          </h3>
          <p style={{ margin: "0 0 20px", fontSize: "14px", color: "var(--muted)" }}>
            Modal, Tooltip, Dropdown, Table, Tabs, and more are on the way.
          </p>
          <UIButton
            variant="secondary"
            onClick={() => window.open("https://github.com/amirsr43", "_blank")}
          >
            Follow on GitHub
          </UIButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentsSection;
