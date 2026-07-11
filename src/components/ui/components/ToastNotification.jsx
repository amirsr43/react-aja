// src/components/ui/ToastNotification.jsx
import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOAST_STYLES = `
/* ── PREMIUM TOAST CORE STYLES ── */
.toast-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.toast-btn-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 440px;
}

@media(min-width: 640px) {
  .toast-btn-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 560px;
  }
}

/* Premium Glass Trigger Buttons */
.toast-spawn-btn {
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 12px 18px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.toast-spawn-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.toast-spawn-btn:hover::after {
  opacity: 1;
}

.toast-spawn-btn:hover {
  transform: translateY(-3px);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.12);
}

/* Specific glows */
.toast-spawn-btn.success:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  border-color: rgba(16, 185, 129, 0.4);
}
.toast-spawn-btn.warning:hover {
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.25);
  text-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
  border-color: rgba(245, 158, 11, 0.4);
}
.toast-spawn-btn.info:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
  border-color: rgba(59, 130, 246, 0.4);
}
.toast-spawn-btn.error:hover {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.25);
  text-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
  border-color: rgba(239, 68, 68, 0.4);
}

/* Stack Queue Container */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  width: 340px;
  pointer-events: none;
}

/* Premium Glow Toast Card */
.toast-card {
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(10, 10, 12, 0.85); /* Dark Glassmorphic */
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transition: border-color 0.3s;
}

/* Specific left border stripe & glow overlay */
.toast-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
}

.toast-card.success::before { background: #10b981; }
.toast-card.warning::before { background: #f59e0b; }
.toast-card.info::before { background: #3b82f6; }
.toast-card.error::before { background: #ef4444; }

/* Dynamic Shadow Glows based on type */
.toast-card.success { box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.25), 0 20px 40px rgba(0,0,0,0.5); border-color: rgba(16, 185, 129, 0.15); }
.toast-card.warning { box-shadow: 0 10px 30px -10px rgba(245, 158, 11, 0.25), 0 20px 40px rgba(0,0,0,0.5); border-color: rgba(245, 158, 11, 0.15); }
.toast-card.info { box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.25), 0 20px 40px rgba(0,0,0,0.5); border-color: rgba(59, 130, 246, 0.15); }
.toast-card.error { box-shadow: 0 10px 30px -10px rgba(239, 68, 68, 0.25), 0 20px 40px rgba(0,0,0,0.5); border-color: rgba(239, 68, 68, 0.15); }

.toast-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.toast-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.toast-title {
  font-size: 13.5px;
  font-weight: 750;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.toast-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.45;
}

.toast-close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 3px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toast-close-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transform: rotate(90deg);
}

/* Linear neon progress timer bar */
.toast-timer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
}

.toast-timer-bar.success { background: #10b981; box-shadow: 0 0 8px #10b981; }
.toast-timer-bar.warning { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.toast-timer-bar.info { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
.toast-timer-bar.error { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
`;

export function Toast({
  id,
  type = "info",
  title = "Notification",
  description = "Detailed alert content goes here.",
  duration = 4000,
  onClose
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onClose(id);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [duration, id, onClose]);

  // Icon mapping
  let IconComponent = Info;
  let iconColor = "#3b82f6";
  if (type === "success") {
    IconComponent = CheckCircle2;
    iconColor = "#10b981";
  } else if (type === "warning") {
    IconComponent = AlertTriangle;
    iconColor = "#f59e0b";
  } else if (type === "error") {
    IconComponent = XCircle;
    iconColor = "#ef4444";
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={`toast-card ${type}`}
    >
      <IconComponent size={18} color={iconColor} className="toast-icon" />
      <div className="toast-content-wrapper">
        <h5 className="toast-title">{title}</h5>
        <p className="toast-description">{description}</p>
      </div>
      <button className="toast-close-btn" onClick={() => onClose(id)}>
        <X size={14} />
      </button>

      {/* Progress Timed Bar */}
      <div 
        className={`toast-timer-bar ${type}`} 
        style={{ width: `${progress}%` }} 
      />
    </motion.div>
  );
}

// ── Showcase Demo ──
export default function ToastNotificationShowcase() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type) => {
    const descriptiveMessages = {
      success: "Your dashboard update compiled successfully without warnings.",
      warning: "Disk utilization threshold reached 88%. Please clear unused node dependencies.",
      info: "New updates to your user profile settings are available to apply.",
      error: "Failed to establish a secure database connection. Connection timed out."
    };

    const newToast = {
      id: Date.now().toString(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1) + " Alert",
      description: descriptiveMessages[type],
      duration: 4000
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-showcase">
      <style>{TOAST_STYLES}</style>

      <div className="toast-btn-grid">
        <button className="toast-spawn-btn success" onClick={() => addToast("success")}>
          <CheckCircle2 size={14} style={{ marginRight: "4px" }} />
          Success
        </button>
        <button className="toast-spawn-btn warning" onClick={() => addToast("warning")}>
          <AlertTriangle size={14} style={{ marginRight: "4px" }} />
          Warning
        </button>
        <button className="toast-spawn-btn info" onClick={() => addToast("info")}>
          <Info size={14} style={{ marginRight: "4px" }} />
          Info
        </button>
        <button className="toast-spawn-btn error" onClick={() => addToast("error")}>
          <XCircle size={14} style={{ marginRight: "4px" }} />
          Error
        </button>
      </div>

      {/* Toast floating queue */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              type={t.type}
              title={t.title}
              description={t.description}
              duration={t.duration}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
