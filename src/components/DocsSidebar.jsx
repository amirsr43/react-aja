// src/components/DocsSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { docsCategories } from "../data/docsData";
import { Home } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const DocsSidebar = ({ onClose }) => {
  const location = useLocation();
  const currentId = location.pathname.split("/").pop() || "introduction";

  return (
    <aside className="docs-sidebar-container">
      <div className="docs-sidebar-inner">
        {/* Mobile Main Navigation */}
        <div className="sidebar-group mobile-main-nav">

          <ul className="sidebar-links-list">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="sidebar-link"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Home size={14} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/amirsr43/react-aja.git"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="sidebar-link"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FaGithub size={14} />
                <span>GitHub</span>
              </a>
            </li>

          </ul>
        </div>

        {docsCategories.map((category, catIdx) => (
          <div key={catIdx} className="sidebar-group">
            <h4 className="sidebar-group-title">
              {category.id ? (
                <Link
                  to={`/docs/${category.id}`}
                  onClick={onClose}
                  className={`sidebar-category-link ${currentId === category.id ? "active" : ""}`}
                >
                  {category.title}
                </Link>
              ) : (
                category.title
              )}
            </h4>
            <ul className="sidebar-links-list">
              {category.items.map((item) => {
                const isActive = currentId === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      to={`/docs/${item.id}`}
                      onClick={onClose}
                      className={`sidebar-link ${isActive ? "active" : ""}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .docs-sidebar-container {
          width: 100%;
          padding: 12px 0;
        }

        .docs-sidebar-inner {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .sidebar-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sidebar-group-title {
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #ffffff;
          margin: 0;
          padding: 0 16px;
          opacity: 0.95;
        }

        .sidebar-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-main-nav {
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 16px;
        }

        @media (min-width: 1024px) {
          .mobile-main-nav {
            display: none;
          }
        }

        .sidebar-link {
          display: block;
          padding: 8px 16px;
          font-size: 14px;
          color: #8e8e93;
          text-decoration: none;
          border-left: 2px solid transparent;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .sidebar-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
          border-left-color: rgba(255, 255, 255, 0.15);
        }

        .sidebar-link.active {
          color: #ffffff;
          font-weight: 650;
          background: rgba(255, 255, 255, 0.03);
          border-left-color: #ffffff;
        }

        .sidebar-category-link {
          color: #ffffff;
          text-decoration: none;
          opacity: 0.95;
          transition: all 0.2s ease;
          display: inline-block;
          width: 100%;
        }

        .sidebar-category-link:hover {
          color: #a78bfa;
        }

        .sidebar-category-link.active {
          color: #a78bfa;
          font-weight: 750;
        }
      `}</style>
    </aside>
  );
};

export default DocsSidebar;
