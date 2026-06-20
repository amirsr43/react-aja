// src/components/DocsSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { docsCategories } from "../data/docsData";

const DocsSidebar = ({ onClose }) => {
  const location = useLocation();
  const currentId = location.pathname.split("/").pop() || "introduction";

  return (
    <aside className="docs-sidebar-container">
      <div className="docs-sidebar-inner">
        {docsCategories.map((category, catIdx) => (
          <div key={catIdx} className="sidebar-group">
            <h4 className="sidebar-group-title">{category.title}</h4>
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
      `}</style>
    </aside>
  );
};

export default DocsSidebar;
