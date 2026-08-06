import React from "react";
import { Link } from "react-router-dom";
import { FileCode, Palette, Ruler, ArrowRight } from "lucide-react";
import SvgToJsxConverter from "../../components/developer-tools/SvgToJsxConverter";
import ThemeGenerator from "../../components/developer-tools/ThemeGenerator";
import PxToRemConverter from "../../components/developer-tools/PxToRemConverter";

export const developerToolsDocs = {
  "developer-tools": {
    id: "developer-tools",
    title: "Developer Tools",
    description: "Accelerate your frontend workflow with our premium developer utilities and design tools.",
    category: "Developer Tools",
    isGuide: true,
    content: (
      <div className="category-landing-page">
        <style>{`
          .category-card {
            display: flex;
            flex-direction: column;
            padding: 24px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          .category-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.04) !important;
            border-color: rgba(167, 139, 250, 0.3) !important;
            box-shadow: 0 12px 30px rgba(124, 58, 237, 0.08);
          }
        `}</style>
        <div className="category-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "24px"
        }}>
          {[
            { id: "svg-to-jsx", name: "SVG to JSX Converter", desc: "Instantly clean raw SVG markup and export it as an optimized React component.", icon: <FileCode size={20} /> },
            { id: "theme-generator", name: "Theme & Color Generator", desc: "Build tailored HSL/HEX color schemes, test live, and copy CSS vars.", icon: <Palette size={20} /> },
            { id: "px-to-rem", name: "Px to Rem Calculator", desc: "Convert pixels to REM units and copy Tailwind spacing configurations.", icon: <Ruler size={20} /> },
          ].map((item) => (
            <Link to={`/docs/${item.id}`} key={item.id} className="category-card">
              <div className="category-card-icon" style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#a78bfa"
              }}>
                {item.icon}
              </div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 700 }}>{item.name}</h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#8e8e93", lineHeight: "1.5", flexGrow: 1 }}>{item.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", fontWeight: 600, color: "#a78bfa" }}>
                <span>Launch Tool</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  },
  "svg-to-jsx": {
    id: "svg-to-jsx",
    title: "SVG to JSX Converter",
    description: "Convert raw SVG code into dynamic, clean, copy-paste React components.",
    category: "Developer Tools",
    isGuide: true,
    content: <SvgToJsxConverter />
  },

  "theme-generator": {
    id: "theme-generator",
    title: "Theme & Color Generator",
    description: "Create premium HSL/HEX color schemes, test on standard components, and copy CSS Variables or Tailwind config.",
    category: "Developer Tools",
    isGuide: true,
    content: <ThemeGenerator />
  },

  "px-to-rem": {
    id: "px-to-rem",
    title: "Px to Rem Spacing Calculator",
    description: "Convert pixel sizes to REM units and Tailwind spacing scales instantly.",
    category: "Developer Tools",
    isGuide: true,
    content: <PxToRemConverter />
  }
};
