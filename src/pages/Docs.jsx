// src/pages/Docs.jsx
import { useState, useEffect, cloneElement } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ChevronRight, Trash2 } from "lucide-react";
import { docsData } from "../data/docsData";
import DocsSidebar from "../components/DocsSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalStyles from "../styles/GlobalStyles";
import ProfileCardCustomizer from "../components/docs/ProfileCardCustomizer";

const Docs = () => {
  const { docId } = useParams();
  const activeId = docId || "introduction";
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code"
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Format selectors
  const [langType, setLangType] = useState("js"); // "js" | "ts"
  const [styleType, setStyleType] = useState("css"); // "css" | "tailwind"
  const [copiedCSS, setCopiedCSS] = useState(false);



  // Auto scroll to top on doc change, reset tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("preview");
    setCopiedCode(false);
    setCopiedCSS(false);
  }, [activeId]);

  // Listen for sidebar toggle event dispatched by Navbar hamburger on docs page
  useEffect(() => {
    const handler = () => setMobileMenuOpen(true);
    window.addEventListener("openDocsSidebar", handler);
    return () => window.removeEventListener("openDocsSidebar", handler);
  }, []);

  // Handle invalid doc ID
  if (!docsData[activeId]) {
    return <Navigate to="/docs/introduction" replace />;
  }

  const currentDoc = docsData[activeId];

  // Dynamic SEO Title and Description
  useEffect(() => {
    if (currentDoc) {
      document.title = `${currentDoc.title} - ReactAja Docs`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", currentDoc.description || "ReactAja component documentation.");
      }
    }
  }, [currentDoc]);

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCSS = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };


  return (
    <>
      <GlobalStyles />
      <Navbar />
      
      <div className="docs-page-layout">
        <div className="docs-container">
          
          {/* Desktop Sidebar (Sticky left) */}
          <aside className="docs-sidebar-desktop">
            <DocsSidebar />
          </aside>

          {/* Mobile Breadcrumb — shows current page, no menu button (handled by Navbar) */}
          <div className="docs-mobile-nav-bar">
            <span className="docs-mobile-active-title">
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {currentDoc.category}
              </span>
              <ChevronRight size={11} style={{ display: "inline", margin: "0 4px", opacity: 0.35 }} />
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600 }}>
                {currentDoc.title}
              </span>
            </span>
          </div>

          {/* Mobile Sidebar Overlay Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="docs-mobile-backdrop"
                />
                
                {/* Drawer Body */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="docs-mobile-drawer"
                >
                  <div className="drawer-header">
                    <span className="drawer-title">Navigation</span>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="drawer-close-btn"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="drawer-content">
                    <DocsSidebar onClose={() => setMobileMenuOpen(false)} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <main className="docs-main-content">
            <header className="docs-content-header">
              <span className="docs-category-badge">{currentDoc.category}</span>
              <h1 className="docs-title">{currentDoc.title}</h1>
              <p className="docs-description">{currentDoc.description}</p>
            </header>

            <div className="docs-content-divider" />

            {/* Render details */}
            {currentDoc.isGuide ? (
              // Renders static HTML/React elements for guides
              <div className="docs-guide-body">
                {currentDoc.content}
              </div>
            ) : activeId === "profile-card" ? (
              <ProfileCardCustomizer />
            ) : currentDoc.variants ? (
              // Renders a list of component variants vertically down the page
              <div className="docs-variants-list" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                {currentDoc.variants.map((variant, index) => (
                  <DocVariantBlock 
                    key={index}
                    variant={variant}
                    langType={langType}
                    setLangType={setLangType}
                    styleType={styleType}
                    setStyleType={setStyleType}
                  />
                ))}
              </div>
            ) : (
              // Renders interactive components/animations with Preview / Code Tabs
              <div className="docs-component-body">
                
                {/* Tab Controls */}
                <div className="docs-tabs-header">
                  <div className="docs-tabs-triggers">
                    <button 
                      onClick={() => setActiveTab("preview")}
                      className={`docs-tab-trigger ${activeTab === "preview" ? "active" : ""}`}
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => setActiveTab("code")}
                      className={`docs-tab-trigger ${activeTab === "code" ? "active" : ""}`}
                    >
                      Source Code
                    </button>
                    {currentDoc.prompt && (
                      <button 
                        onClick={() => setActiveTab("prompt")}
                        className={`docs-tab-trigger ${activeTab === "prompt" ? "active" : ""}`}
                      >
                        AI Prompt
                      </button>
                    )}
                  </div>

                  {activeTab === "code" && typeof currentDoc.code === "string" && (
                    <button 
                      onClick={() => handleCopyCode(currentDoc.code)}
                      className="docs-copy-source-btn"
                    >
                      {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                    </button>
                  )}

                  {activeTab === "prompt" && currentDoc.prompt && (
                    <button 
                      onClick={() => handleCopyCode(currentDoc.prompt)}
                      className="docs-copy-source-btn"
                    >
                      {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{copiedCode ? "Copied!" : "Copy Prompt"}</span>
                    </button>
                  )}
                </div>

                {/* Tab Content Display */}
                <div className="docs-tabs-content">
                  {activeTab === "preview" ? (
                    <div className="tab-preview-pane">
                      {activeId === "expanding-search" ? (
                        cloneElement(currentDoc.preview, {}, 
                          cloneElement(currentDoc.preview.props.children, {
                            onSearch: (label) => {
                              const mapping = {
                                "Introduction": "introduction",
                                "Installation": "installation",
                                "Button": "button",
                                "Profile Card": "profile-card",
                                "Loading Indicators": "loading",
                                "Modern Form": "form",
                                "Product Card": "product-card",
                                "Toast Notifications": "toast-notification",
                                "Interactive SearchBar": "search-bar",
                                "Magnetic Slider": "magnetic-slider",
                                "Animated Profile Stack": "profile-stack",
                                "Interactive Timeline": "interactive-timeline",
                                "Glowing Outline Button": "glowing-button",
                                "Interactive Fluid Switch": "fluid-switch",
                                "Text Animation": "text-animation",
                                "Spotlight Focus Blur": "focus-blur-text",
                                "Expanding Search Bar": "expanding-search"
                              };
                              const id = mapping[label] || label.toLowerCase().replace(/\s+/g, "-");
                              navigate(`/docs/${id}`);
                            }
                          })
                        )
                      ) : currentDoc.preview}
                    </div>
                  ) : activeTab === "code" ? (
                    <div className="tab-code-pane">
                      {typeof currentDoc.code === "object" ? (
                        <div className="multi-code-container">
                          {/* Format selectors row */}
                          <div className="format-selectors-row">
                            <div className="selector-group">
                              <span className="selector-label">Language:</span>
                              <div className="selector-buttons">
                                <button
                                  onClick={() => setLangType("js")}
                                  className={`selector-btn ${langType === "js" ? "active" : ""}`}
                                >
                                  JS
                                </button>
                                <button
                                  onClick={() => setLangType("ts")}
                                  className={`selector-btn ${langType === "ts" ? "active" : ""}`}
                                >
                                  TS
                                </button>
                              </div>
                            </div>

                            <div className="selector-group">
                              <span className="selector-label">Styling:</span>
                              <div className="selector-buttons">
                                <button
                                  onClick={() => setStyleType("css")}
                                  className={`selector-btn ${styleType === "css" ? "active" : ""}`}
                                >
                                  CSS
                                </button>
                                <button
                                  onClick={() => setStyleType("tailwind")}
                                  className={`selector-btn ${styleType === "tailwind" ? "active" : ""}`}
                                >
                                  Tailwind
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Component Code Section */}
                          <div className="code-section-header">
                            <span className="section-title">Component Code ({langType.toUpperCase()})</span>
                            <button
                              onClick={() => handleCopyCode(currentDoc.code[langType][styleType])}
                              className="docs-copy-source-btn"
                            >
                              {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                              <span>{copiedCode ? "Copied!" : "Copy Component"}</span>
                            </button>
                          </div>
                          <pre className="code-pre-element">
                            <code>{currentDoc.code[langType][styleType]}</code>
                          </pre>

                          {/* CSS Section (Only show if styleType === 'css') */}
                          {styleType === "css" && currentDoc.css && (
                            <div className="css-code-section" style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                              <div className="code-section-header">
                                <span className="section-title">CSS Stylesheet</span>
                                <button
                                  onClick={() => handleCopyCSS(currentDoc.css)}
                                  className="docs-copy-source-btn"
                                >
                                  {copiedCSS ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                  <span>{copiedCSS ? "Copied!" : "Copy CSS"}</span>
                                </button>
                              </div>
                              <pre className="code-pre-element">
                                <code>{currentDoc.css}</code>
                              </pre>
                            </div>
                          )}

                          {styleType === "tailwind" && (
                            <div className="tailwind-info-note" style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", fontSize: "12.5px", color: "var(--muted)" }}>
                              💡 <strong>Note:</strong> Tailwind utility classes are applied directly to the component markup. No separate CSS stylesheet is needed!
                            </div>
                          )}
                        </div>
                      ) : (
                        <pre className="code-pre-element">
                          <code>{currentDoc.code}</code>
                        </pre>
                      )}
                    </div>
                  ) : (
                    <div className="tab-prompt-pane" style={{
                      padding: "24px",
                      background: "rgba(0, 0, 0, 0.25)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: "12px",
                      color: "#f0f0f5",
                      lineHeight: "1.6",
                      fontSize: "14.5px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa", padding: "4px 8px", borderRadius: "6px" }}>
                          AI Generation Prompt
                        </span>
                      </div>
                      <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{currentDoc.prompt}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* API Specification Section (Props & Dependencies) */}
            {!currentDoc.isGuide && (
              <div className="docs-api-specifications">
                
                {/* Dependencies Segment */}
                {currentDoc.dependencies && currentDoc.dependencies.length > 0 && (
                  <div className="docs-dependencies-section">
                    <h3 className="api-section-subtitle">
                      Dependencies
                    </h3>
                    <div className="dependencies-badges">
                      {currentDoc.dependencies.map((dep) => (
                        <span 
                          key={dep} 
                          className="dependency-badge"
                        >
                          <span className="dependency-dot" />
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Props Table Segment */}
                {currentDoc.props && currentDoc.props.length > 0 && (
                  <div className="docs-props-section">
                    <h3 className="api-section-subtitle">
                      Props Reference
                    </h3>
                    <div className="props-table-wrapper">
                      <table className="props-table">
                        <thead>
                          <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentDoc.props.map((prop, idx) => {
                            // Pick a color for type badge
                            let typeClass = "type-string";
                            if (prop.type === "boolean") {
                              typeClass = "type-boolean";
                            } else if (prop.type === "number") {
                              typeClass = "type-number";
                            } else if (prop.type === "function") {
                              typeClass = "type-function";
                            } else if (prop.type === "object") {
                              typeClass = "type-object";
                            } else if (prop.type === "array") {
                              typeClass = "type-array";
                            }

                            return (
                              <tr key={idx} className="prop-row">
                                <td className="prop-name-cell">
                                  {prop.name}
                                </td>
                                <td data-label="Type" className="prop-type-cell">
                                  <span className={`type-badge ${typeClass}`}>
                                    {prop.type}
                                  </span>
                                </td>
                                <td data-label="Default" className="prop-default-cell">
                                  <code>
                                    {prop.default}
                                  </code>
                                </td>
                                <td data-label="Description" className="prop-desc-cell">
                                  {prop.description}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}
          </main>

        </div>
      </div>

      <style>{`
        .docs-page-layout {
          min-height: 100vh;
          background: #000000;
          padding-top: 80px; /* Space for fixed Navbar */
          display: flex;
          flex-direction: column;
          color: #ffffff;
        }

        .docs-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          padding: 0 24px 60px;
          gap: 40px;
          position: relative;
        }

        @media (min-width: 1024px) {
          .docs-container {
            grid-template-columns: 240px 1fr;
          }
        }

        /* Desktop Sidebar sticky positioning */
        .docs-sidebar-desktop {
          display: none;
          position: sticky;
          top: 100px;
          height: calc(100vh - 140px);
          overflow-y: auto;
          padding-right: 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (min-width: 1024px) {
          .docs-sidebar-desktop {
            display: block;
          }
        }

        /* Mobile Nav Header bar */
        .docs-mobile-nav-bar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: rgba(10, 10, 10, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 10px 14px;
          border-radius: 12px;
          margin-top: 8px;
          gap: 12px;
        }

        @media (min-width: 1024px) {
          .docs-mobile-nav-bar {
            display: none;
          }
        }

        .docs-mobile-toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #ffffff;
          padding: 6px 11px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .docs-mobile-active-title {
          font-size: 13px;
          color: #8e8e93;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        /* Mobile sidebar overlays */
        .docs-mobile-backdrop {
          position: fixed;
          inset: 0;
          background: #000000;
          z-index: 990;
        }

        .docs-mobile-drawer {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          width: 280px;
          background: #0a0a0a;
          border-right: 1px solid rgba(255,255,255,0.08);
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .drawer-title {
          font-size: 15px;
          font-weight: 750;
        }

        .drawer-close-btn {
          background: transparent;
          border: none;
          color: #8e8e93;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }

        /* Main Content Styling */
        .docs-main-content {
          padding-top: 16px;
          max-width: 820px;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .docs-main-content {
            padding-top: 0;
          }
        }

        .docs-content-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .docs-category-badge {
          font-size: 11px;
          font-weight: 750;
          color: #8e8e93;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .docs-title {
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 40%, #a1a1aa 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          WebkitBackgroundClip: text;
          WebkitTextFillColor: transparent;
        }

        .docs-description {
          font-size: 15.5px;
          line-height: 1.6;
          color: #8e8e93;
          margin: 0;
          font-weight: 400;
        }

        .docs-content-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 24px 0 32px;
        }

        /* Guide contents */
        .docs-guide-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .guide-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .guide-p {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }

        .guide-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 16px 0 4px;
        }

        .guide-list {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .guide-list li {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(255,255,255,0.75);
        }

        /* Tab panels for component previews */
        .docs-tabs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .docs-tabs-triggers {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 3px;
          border-radius: 10px;
          gap: 2px;
        }

        .docs-tab-trigger {
          background: transparent;
          border: none;
          color: #8e8e93;
          font-size: 12.5px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .docs-tab-trigger:hover {
          color: #ffffff;
        }

        .docs-tab-trigger.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .docs-copy-source-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          color: #8e8e93;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .docs-copy-source-btn:hover {
          color: #ffffff;
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.02);
        }

        /* Tabs panes display */
        .docs-tabs-content {
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(10, 10, 10, 0.35);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .tab-preview-pane {
          padding: 1px; /* Let preview element control layout */
        }

        .tab-code-pane {
          padding: 20px;
          background: #080808;
          max-height: 480px;
          overflow-y: auto;
        }

        .code-pre-element {
          margin: 0;
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          line-height: 1.6;
          color: #e4e4e7;
          white-space: pre-wrap;
          word-break: break-all;
        }



        /* Format selectors style */
        .format-selectors-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .selector-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .selector-label {
          font-size: 13px;
          font-weight: 600;
          color: #8e8e93;
        }

        .selector-buttons {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2px;
          border-radius: 8px;
          gap: 2px;
        }

        .selector-btn {
          background: transparent;
          border: none;
          color: #8e8e93;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .selector-btn:hover {
          color: #ffffff;
        }

        .selector-btn.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .code-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          margin-top: 16px;
        }

        .section-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        /* API Specifications (Props & Dependencies) */
        .docs-api-specifications {
          margin-top: 48px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 32px;
          animation: fadeIn 0.4s ease-out;
        }

        .api-section-subtitle {
          font-size: 15px;
          font-weight: 750;
          color: #ffffff;
          letter-spacing: -0.015em;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          font-family: 'Outfit', 'Inter', sans-serif;
          letter-spacing: 0.05em;
        }

        .docs-dependencies-section {
          margin-bottom: 36px;
        }

        .dependencies-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dependency-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          font-size: 12.5px;
          font-family: 'DM Mono', monospace;
          color: #a1a1aa;
          cursor: default;
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .dependency-badge:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .dependency-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.5);
        }

        /* Props Reference Table */
        .props-table-wrapper {
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          background: rgba(10, 10, 10, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .props-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13.5px;
        }

        .props-table th {
          padding: 14px 16px;
          font-weight: 700;
          color: #8e8e93;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.015);
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.05em;
        }

        .prop-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: background-color 0.2s ease;
        }

        .prop-row:last-child {
          border-bottom: none;
        }

        .prop-row:hover {
          background: rgba(255, 255, 255, 0.01);
        }

        .prop-name-cell {
          padding: 14px 16px;
          font-family: 'DM Mono', monospace;
          font-weight: 600;
          color: #ffffff;
        }

        .prop-type-cell {
          padding: 14px 16px;
        }

        .type-badge {
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .type-string {
          background: rgba(96, 165, 250, 0.08);
          color: #60a5fa;
          border: 1px solid rgba(96, 165, 250, 0.15);
        }

        .type-boolean {
          background: rgba(244, 63, 94, 0.08);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.15);
        }

        .type-number {
          background: rgba(245, 158, 11, 0.08);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.15);
        }

        .type-function {
          background: rgba(147, 51, 234, 0.08);
          color: #c084fc;
          border: 1px solid rgba(147, 51, 234, 0.15);
        }

        .type-object {
          background: rgba(16, 185, 129, 0.08);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }

        .type-array {
          background: rgba(6, 182, 212, 0.08);
          color: #22d3ee;
          border: 1px solid rgba(6, 182, 212, 0.15);
        }

        .prop-default-cell {
          padding: 14px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #a1a1aa;
        }

        .prop-default-cell code {
          background: rgba(255, 255, 255, 0.03);
          padding: 2.5px 6px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .prop-desc-cell {
          padding: 14px 16px;
          color: #a1a1aa;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive styling for Props Table */
        @media (max-width: 640px) {
          .props-table thead {
            display: none;
          }
          
          .props-table, 
          .props-table tbody, 
          .prop-row, 
          .props-table td {
            display: block;
            width: 100%;
            box-sizing: border-box;
          }

          .prop-row {
            padding: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .props-table td {
            padding: 5px 0 !important;
            border: none !important;
            display: flex;
            align-items: center;
          }

          .prop-name-cell {
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 4px;
          }

          .props-table td::before {
            content: attr(data-label);
            font-weight: 700;
            color: #8e8e93;
            display: inline-block;
            width: 90px;
            font-size: 10.5px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            flex-shrink: 0;
          }

          .prop-name-cell::before {
            content: "Prop";
            display: inline-block;
            width: 90px;
            font-weight: 700;
            color: #8e8e93;
            font-size: 10.5px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .prop-desc-cell {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
};

const DocVariantBlock = ({
  variant,
  langType,
  setLangType,
  styleType,
  setStyleType
}) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const onCopyCode = (codeText) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const onCopyCSS = (codeText) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  return (
    <div className="doc-variant-section" style={{
      border: "1px solid rgba(255, 255, 255, 0.06)",
      background: "rgba(10, 10, 10, 0.2)",
      borderRadius: "20px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      textAlign: "left"
    }}>
      <div className="variant-info" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h3 className="variant-title" style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
          {variant.name}
        </h3>
        {variant.description && (
          <p className="variant-desc" style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
            {variant.description}
          </p>
        )}
      </div>

      {/* Mini tabs */}
      <div className="docs-tabs-header" style={{ marginBottom: 0 }}>
        <div className="docs-tabs-triggers">
          <button 
            onClick={() => setActiveTab("preview")}
            className={`docs-tab-trigger ${activeTab === "preview" ? "active" : ""}`}
          >
            Preview
          </button>
          <button 
            onClick={() => setActiveTab("code")}
            className={`docs-tab-trigger ${activeTab === "code" ? "active" : ""}`}
          >
            Source Code
          </button>
          {variant.prompt && (
            <button 
              onClick={() => setActiveTab("prompt")}
              className={`docs-tab-trigger ${activeTab === "prompt" ? "active" : ""}`}
            >
              AI Prompt
            </button>
          )}
        </div>
        {activeTab === "prompt" && variant.prompt && (
          <button 
            onClick={() => onCopyCode(variant.prompt)}
            className="docs-copy-source-btn"
          >
            {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            <span>{copiedCode ? "Copied!" : "Copy Prompt"}</span>
          </button>
        )}
      </div>

      <div className="docs-tabs-content" style={{ marginBottom: 0 }}>
        {activeTab === "preview" ? (
          <div className="tab-preview-pane" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 24px",
            background: "rgba(0, 0, 0, 0.25)",
            border: "1px dashed rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            minHeight: "140px",
            width: "100%"
          }}>
            {variant.preview}
          </div>
        ) : activeTab === "code" ? (
          <div className="tab-code-pane" style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
            {typeof variant.code === "object" ? (
              <div className="multi-code-container">
                <div className="format-selectors-row" style={{ marginBottom: "16px" }}>
                  <div className="selector-group">
                    <span className="selector-label">Language:</span>
                    <div className="selector-buttons">
                      <button
                        onClick={() => setLangType("js")}
                        className={`selector-btn ${langType === "js" ? "active" : ""}`}
                      >
                        JS
                      </button>
                      <button
                        onClick={() => setLangType("ts")}
                        className={`selector-btn ${langType === "ts" ? "active" : ""}`}
                      >
                        TS
                      </button>
                    </div>
                  </div>

                  <div className="selector-group">
                    <span className="selector-label">Styling:</span>
                    <div className="selector-buttons">
                      <button
                        onClick={() => setStyleType("css")}
                        className={`selector-btn ${styleType === "css" ? "active" : ""}`}
                      >
                        CSS
                      </button>
                      <button
                        onClick={() => setStyleType("tailwind")}
                        className={`selector-btn ${styleType === "tailwind" ? "active" : ""}`}
                      >
                        Tailwind
                      </button>
                    </div>
                  </div>
                </div>

                <div className="code-section-header">
                  <span className="section-title">Component Code ({langType.toUpperCase()})</span>
                  <button
                    onClick={() => onCopyCode(variant.code[langType][styleType])}
                    className="docs-copy-source-btn"
                  >
                    {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    <span>{copiedCode ? "Copied!" : "Copy Component"}</span>
                  </button>
                </div>
                <pre className="code-pre-element">
                  <code>{variant.code[langType][styleType]}</code>
                </pre>

                {styleType === "css" && variant.css && (
                  <div className="css-code-section" style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="code-section-header">
                      <span className="section-title">CSS Stylesheet</span>
                      <button
                        onClick={() => onCopyCSS(variant.css)}
                        className="docs-copy-source-btn"
                      >
                        {copiedCSS ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        <span>{copiedCSS ? "Copied!" : "Copy CSS"}</span>
                      </button>
                    </div>
                    <pre className="code-pre-element">
                      <code>{variant.css}</code>
                    </pre>
                  </div>
                )}

                {styleType === "tailwind" && (
                  <div className="tailwind-info-note" style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", fontSize: "12.5px", color: "var(--muted)" }}>
                    💡 <strong>Note:</strong> Tailwind utility classes are applied directly to the component markup. No separate CSS stylesheet is needed!
                  </div>
                )}
              </div>
            ) : (
              <div className="single-code-container">
                <div className="code-section-header">
                  <span className="section-title">Source Code</span>
                  <button
                    onClick={() => onCopyCode(variant.code)}
                    className="docs-copy-source-btn"
                  >
                    {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
                <pre className="code-pre-element">
                  <code>{variant.code}</code>
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="tab-prompt-pane" style={{
            padding: "24px",
            background: "rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            color: "#f0f0f5",
            lineHeight: "1.6",
            fontSize: "14px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa", padding: "4px 8px", borderRadius: "6px" }}>
                AI Generation Prompt
              </span>
            </div>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{variant.prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Docs;
