// src/components/ui/InteractiveAlert.jsx
import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, ChevronDown, ChevronUp, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALERT_STYLES = `
/* ── PREMIUM INTERACTIVE ALERT CORE STYLES ── */
.alert-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.alert-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.alert-card {
  width: 100%;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s;
}

/* Left neon stripe indicator */
.alert-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
}

.alert-card.success::before { background: #10b981; }
.alert-card.warning::before { background: #f59e0b; }
.alert-card.info::before { background: #3b82f6; }
.alert-card.error::before { background: #ef4444; }

/* Custom glow borders & shadows */
.alert-card.success { box-shadow: 0 4px 20px -5px rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.1); }
.alert-card.warning { box-shadow: 0 4px 20px -5px rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.1); }
.alert-card.info { box-shadow: 0 4px 20px -5px rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.1); }
.alert-card.error { box-shadow: 0 4px 20px -5px rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.1); }

.alert-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 18px;
}

.alert-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-title-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.alert-title {
  font-size: 13.5px;
  font-weight: 750;
  color: #ffffff;
  margin: 0;
}

.alert-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.4;
}

.alert-actions-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  flex-shrink: 0;
}

.alert-action-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.alert-action-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
}

/* Roll-down details panel */
.alert-details-panel {
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(0, 0, 0, 0.15);
  padding: 14px 18px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  box-sizing: border-box;
}

.alert-details-title {
  font-size: 10px;
  font-weight: 750;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  display: block;
}

.alert-footer-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.alert-footer-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.alert-footer-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.alert-footer-btn.accent-btn {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.25);
  color: #3b82f6;
}

.alert-footer-btn.accent-btn:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}
`;

export function InteractiveAlert({
  type = "info",
  title = "System Update",
  description = "A new software release is available for your node controller.",
  details = "",
  showActionButtons = false,
  actionLabel = "Retry",
  onAction,
  onDismiss,
  className = "",
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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

  if (!isVisible) return null;

  return (
    <div className={`alert-card ${type} ${className}`} style={style}>
      <style>{ALERT_STYLES}</style>
      
      {/* Alert Header */}
      <div className="alert-header">
        <IconComponent size={18} color={iconColor} className="alert-icon" />
        
        <div className="alert-title-box">
          <h5 className="alert-title">{title}</h5>
          <p className="alert-description">{description}</p>
        </div>

        <div className="alert-actions-right">
          {details && (
            <button className="alert-action-btn" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          )}
          <button 
            className="alert-action-btn"
            onClick={() => {
              setIsVisible(false);
              onDismiss && onDismiss();
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Slide down detailed panel */}
      <AnimatePresence initial={false}>
        {isOpen && details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="alert-details-panel">
              <span className="alert-details-title">TECHNICAL LOGS & REMEDIES</span>
              <div>{details}</div>
              
              {showActionButtons && (
                <div className="alert-footer-actions">
                  <button 
                    className="alert-footer-btn accent-btn" 
                    onClick={() => {
                      onAction && onAction();
                      setIsOpen(false);
                    }}
                  >
                    <RefreshCw size={10} style={{ display: "inline-block", marginRight: "4px" }} />
                    {actionLabel}
                  </button>
                  <button className="alert-footer-btn" onClick={() => setIsVisible(false)}>
                    Dismiss Banner
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Showcase Demo ──
export default function InteractiveAlertShowcase() {
  return (
    <div className="alert-showcase">
      <div className="alert-wrapper">
        {/* Banner A: Success info */}
        <InteractiveAlert
          type="success"
          title="Deployment Complete"
          description="Build assets optimized and deployed successfully to cluster-03."
          details="All 4 staging containers report healthy probes. Target load balance points configured. Propagation status is active."
        />

        {/* Banner B: Error alert with actions */}
        <InteractiveAlert
          type="error"
          title="Database Connection Lost"
          description="Failed to ping main postgres cluster. Reconnect attempts timed out."
          details="Error Code: ERR_PG_TIMEDOUT. Reason: Handshake failed due to client side authentication limits. Please verify TLS credentials."
          showActionButtons={true}
          actionLabel="Retry Connection"
          onAction={() => alert("Re-establishing cluster connections...")}
        />
      </div>
    </div>
  );
}
