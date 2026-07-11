// src/data/codes/animatedModal.js

export const animatedModalCode = {
  code: `import React, { useState } from "react";
import { Shield, Sparkles, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedModal({
  isOpen = false,
  onClose,
  title = "Unlock Premium",
  description = "Get access to all dashboard components and visual resources.",
  features = [],
  primaryLabel = "Upgrade Now",
  secondaryLabel = "Cancel",
  onPrimaryAction
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 18, y: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotateX: -12, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Cross icon */}
            <button className="modal-close-btn" onClick={onClose}>
              <X size={14} />
            </button>

            {/* Modal Header */}
            <div className="modal-hero">
              <span className="modal-badge">
                <Sparkles size={11} /> PRO FEATURES
              </span>
              <h3 className="modal-title">{title}</h3>
              <p className="modal-desc">{description}</p>
            </div>

            {/* Checklist */}
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

            {/* Actions Footer */}
            <div className="modal-footer">
              <button className="modal-action-btn primary" onClick={onPrimaryAction}>
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
}`,
  css: `/* Overlay backdrop containing perspective */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  perspective: 1200px; /* Crucial for 3D perspective tilt */
}

/* Glassmorphic Modal Card */
.modal-card {
  width: 100%;
  max-width: 440px;
  background: rgba(10, 10, 12, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  position: relative;
  transform-style: preserve-3d;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(139, 92, 246, 0.05);
}

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
  transition: all 0.25s;
}

.modal-close-btn:hover {
  color: #ffffff;
  transform: rotate(90deg);
}

.modal-hero {
  padding: 40px 32px 20px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-badge {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.25);
  color: #8b5cf6;
  font-size: 11px;
  padding: 5px 12px;
  border-radius: 9999px;
  text-transform: uppercase;
}

.modal-title {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
}

.modal-desc {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.5);
}

/* Feature Grid checklist */
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
}

/* Actions block */
.modal-footer {
  padding: 24px 32px 32px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.modal-action-btn {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
}

.modal-action-btn.primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: #ffffff;
}

.modal-action-btn.secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.65);
}`
};
