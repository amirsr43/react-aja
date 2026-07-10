// src/components/ui/AnimatedModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Check, X } from "lucide-react";

const MODAL_STYLES = `
/* ── PREMIUM ANIMATED MODAL CORE STYLES ── */
.modal-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.modal-trigger-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 14px 28px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 
    0 10px 25px rgba(139, 92, 246, 0.3),
    0 0 15px rgba(99, 102, 241, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-trigger-btn:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 15px 30px rgba(139, 92, 246, 0.45),
    0 0 25px rgba(99, 102, 241, 0.35);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  perspective: 1200px; /* Crucial for 3D rotation */
  box-sizing: border-box;
}

.modal-card {
  width: 100%;
  max-width: 440px;
  background: rgba(10, 10, 12, 0.85); /* Deep zinc dark glass */
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.6),
    0 0 50px rgba(139, 92, 246, 0.05);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  transform-style: preserve-3d;
}

/* Close action icon */
.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transform: rotate(90deg);
}

/* Modal Content details */
.modal-hero {
  padding: 40px 32px 20px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.modal-badge {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.25);
  color: #8b5cf6;
  font-size: 11px;
  font-weight: 750;
  padding: 5px 12px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.15);
}

.modal-title {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.modal-desc {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.5;
}

.modal-features {
  padding: 0 32px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13.5px;
  font-weight: 600;
}

.modal-feature-icon {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  flex-shrink: 0;
}

/* Modal Actions footer */
.modal-footer {
  padding: 24px 32px 32px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(255, 255, 255, 0.01);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-action-btn {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
}

.modal-action-btn.primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
}

.modal-action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);
}

.modal-action-btn.secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.65);
}

.modal-action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}
`;

export function AnimatedModal({
  isOpen = false,
  onClose,
  title = "Unlock Premium",
  description = "Get access to all dashboard components and visual resources.",
  features = [],
  primaryLabel = "Upgrade Now",
  secondaryLabel = "Cancel",
  onPrimaryAction,
  className = "",
  style = {}
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`modal-overlay ${className}`} style={style} onClick={onClose}>
          <style>{MODAL_STYLES}</style>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 18, y: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotateX: -12, y: 10, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 380, damping: 25 }}
            className="modal-card"
            onClick={(e) => e.stopPropagation()} // prevent closing overlay
          >
            {/* Close cross trigger */}
            <button className="modal-close-btn" onClick={onClose}>
              <X size={14} />
            </button>

            {/* Modal Hero Header */}
            <div className="modal-hero">
              <span className="modal-badge">
                <Sparkles size={11} />
                PRO FEATURES
              </span>
              <h3 className="modal-title">{title}</h3>
              <p className="modal-desc">{description}</p>
            </div>

            {/* Checklist Features */}
            {features.length > 0 && (
              <div className="modal-features">
                {features.map((f, i) => (
                  <div key={i} className="modal-feature-item">
                    <span className="modal-feature-icon">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="modal-footer">
              <button 
                className="modal-action-btn primary"
                onClick={() => {
                  onPrimaryAction && onPrimaryAction();
                  onClose();
                }}
              >
                {primaryLabel}
              </button>
              <button className="modal-action-btn secondary" onClick={onClose}>
                {secondaryLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Showcase Demo ──
export default function AnimatedModalShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  const featureItems = [
    "Full access to 40+ UI animations",
    "Dynamic CSS theme customizer tools",
    "Complete TypeScript definitions",
    "Priority expert Discord assistance"
  ];

  return (
    <div className="modal-showcase">
      <button className="modal-trigger-btn" onClick={() => setIsOpen(true)}>
        <Shield size={16} />
        Open 3D Modal
      </button>

      <AnimatedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        features={featureItems}
        onPrimaryAction={() => alert("Upgrade request triggered!")}
      />
    </div>
  );
}
