// src/pages/Docs.jsx
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Copy, Check, ChevronRight, Trash2 } from "lucide-react";
import { docsData } from "../data/docsData";
import DocsSidebar from "../components/DocsSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalStyles from "../styles/GlobalStyles";
import ProfileCardCustomizer from "../components/docs/ProfileCardCustomizer";

const Docs = () => {
  const { docId } = useParams();
  const activeId = docId || "introduction";

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

  // Handle invalid doc ID
  if (!docsData[activeId]) {
    return <Navigate to="/docs/introduction" replace />;
  }

  const currentDoc = docsData[activeId];

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

          {/* Mobile Navigation Header */}
          <div className="docs-mobile-nav-bar">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="docs-mobile-toggle-btn"
            >
              <Menu size={18} />
              <span>Menu</span>
            </button>
            <span className="docs-mobile-active-title">
              {currentDoc.category} <ChevronRight size={12} className="inline mx-1" /> {currentDoc.title}
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
                </div>

                {/* Tab Content Display */}
                <div className="docs-tabs-content">
                  {activeTab === "preview" ? (
                    <div className="tab-preview-pane">
                      {currentDoc.preview}
                    </div>
                  ) : (
                    <div className="tab-code-pane">
                      <pre className="code-pre-element">
                        <code>{currentDoc.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
      
      <Footer />

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
          justify-content: space-between;
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 12px 16px;
          border-radius: 12px;
          margin-top: 16px;
        }

        @media (min-width: 1024px) {
          .docs-mobile-nav-bar {
            display: none;
          }
        }

        .docs-mobile-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .docs-mobile-active-title {
          font-size: 13px;
          color: #8e8e93;
          font-weight: 500;
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
      `}</style>
    </>
  );
};

export default Docs;
