// src/components/Navbar.jsx
import { Moon, Sun, Code2 } from "lucide-react";

const Navbar = ({ dark, toggleDark }) => {
  return (
    <nav style={{
      padding: "16px 24px",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "var(--surface)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Code2 size={24} style={{ color: "var(--accent)" }} />
        <span style={{ fontWeight: "bold" }}>
          React<span style={{ color: "var(--accent)" }}>Aja</span>
        </span>
      </div>
      
      <button
        onClick={toggleDark}
        style={{
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "transparent",
          cursor: "pointer"
        }}
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  );
};

export default Navbar;