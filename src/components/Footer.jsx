// src/components/Footer.jsx
import { motion } from "framer-motion";

import { FaLinkedin, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/amir-syahrul-ramadhan-9a61b124a", color: "#0077b5" },
    { name: "GitHub", icon: FaGithub, href: "https://github.com/amirsr43", color: "#6e5494" },
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/amirsyahrulramadhan", color: "#E4405F" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface-2)",
        padding: "60px 24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          right: "-10%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo and Social Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(61,127,255,0.10)",
                padding: "10px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img 
                src="/logo.png" 
                alt="ReactAja" 
                style={{ width: "28px", height: "28px", objectFit: "contain" }} 
              />
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              React<span style={{ color: "var(--accent)", background: "none", WebkitTextFillColor: "initial" }}>Aja</span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              margin: 0,
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            Building awesome web experiences with React
          </motion.p>

          {/* Social Media Icons with Real Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  textDecoration: "none",
                  color: "var(--muted)",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = social.color + "20";
                  e.currentTarget.style.color = social.color;
                  e.currentTarget.style.borderColor = social.color + "40";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider with gradient */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border-glow), var(--accent), var(--border-glow), transparent)",
            marginBottom: "32px",
          }}
        />

        {/* Copyright - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            © {currentYear} ReactAja. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
