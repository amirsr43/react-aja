// src/components/Footer.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: "Docs", href: "/docs/introduction" },
    { name: "Components", href: "/docs/profile-card" },
    { name: "Animations", href: "/docs/interactive-timeline" }
  ];

  const communityLinks = [
    { name: "GitHub", href: "https://github.com/amirsr43/react-aja" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/amir-syahrul-ramadhan-9a61b124a" },
    { name: "Instagram", href: "https://www.instagram.com/amirsyahrulramadhan" }
  ];

  return (
    <footer className="site-footer">
      {/* Subtle background glow */}
      <div className="footer-glow" />

      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top-grid">
          {/* Brand Info (Left) */}
          <div className="footer-brand-side">
            <Link to="/" className="footer-logo-wrapper">
              <div className="footer-logo-box">
                <img 
                  src="/logo.png" 
                  alt="ReactAja Logo" 
                  className="footer-logo-img" 
                />
              </div>
              <span className="footer-brand-name">
                React<span className="brand-accent">Aja</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Premium React UI components and animations library.
            </p>
          </div>

          {/* Links Columns (Right) */}
          <div className="footer-links-side">
            {/* Product Column */}
            <div className="footer-links-column">
              <h5 className="column-title">Product</h5>
              <ul className="column-links-list">
                {productLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.href} className="column-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Column */}
            <div className="footer-links-column">
              <h5 className="column-title">Community</h5>
              <ul className="column-links-list">
                {communityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="column-link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom-row">
          <span className="footer-credit">
            Created with <span className="heart-icon">🤍</span> by{" "}
            <a 
              href="https://amir.reactaja.my.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="creator-link"
            >
              Amir
            </a>
          </span>
          <span className="footer-copyright">
            © {currentYear} ReactAja
          </span>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #050508;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding: 64px 24px 32px;
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }

        .footer-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 100px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            align-items: flex-start;
          }
        }

        /* Left Side Brand */
        .footer-brand-side {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .footer-logo-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #ffffff;
        }

        .footer-logo-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-logo-img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }

        .footer-brand-name {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .brand-accent {
          color: var(--accent-2);
        }

        .footer-tagline {
          font-size: 13.5px;
          color: #8e8e93;
          margin: 0;
          max-width: 320px;
          line-height: 1.5;
          font-weight: 400;
        }

        /* Right Side Links */
        .footer-links-side {
          display: flex;
          gap: 60px;
        }

        @media (min-width: 768px) {
          .footer-links-side {
            justify-content: flex-end;
          }
        }

        .footer-links-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .column-title {
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }

        .column-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .column-link {
          font-size: 13px;
          color: #8e8e93;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s ease;
        }

        .column-link:hover {
          color: #ffffff;
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.04);
          margin-bottom: 24px;
        }

        /* Bottom Row */
        .footer-bottom-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
          font-weight: 450;
        }

        @media (min-width: 768px) {
          .footer-bottom-row {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer-credit {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .heart-icon {
          color: rgba(255, 255, 255, 0.4);
        }

        .creator-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .creator-link:hover {
          color: #ffffff;
        }

        .footer-copyright {
          letter-spacing: 0.02em;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
