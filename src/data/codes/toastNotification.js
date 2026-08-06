// src/data/codes/toastNotification.js

export const toastNotificationCode = {
  code: {
    js: {
      css: `// ToastNotification.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./ToastNotification.css"; // Include the CSS stylesheet below

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
      className={\`toast-card \${type}\`}
    >
      <IconComponent size={18} color={iconColor} className="toast-icon" />
      <div className="toast-content-wrapper">
        <h5 className="toast-title">{title}</h5>
        <p className="toast-description">{description}</p>
      </div>
      <button className="toast-close-btn" onClick={() => onClose(id)}>
        <X size={14} />
      </button>

      <div 
        className={\`toast-timer-bar \${type}\`} 
        style={{ width: \`\${progress}%\` }} 
      />
    </motion.div>
  );
}

export default function ToastManager() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, description) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            title={t.title}
            description={t.description}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}`,
      tailwind: `// ToastNotification.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const borderStyles = {
    success: "border-emerald-500/15 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25),0_20px_40px_rgba(0,0,0,0.5)]",
    warning: "border-amber-500/15 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.25),0_20px_40px_rgba(0,0,0,0.5)]",
    info: "border-blue-500/15 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25),0_20px_40px_rgba(0,0,0,0.5)]",
    error: "border-red-500/15 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.25),0_20px_40px_rgba(0,0,0,0.5)]"
  };

  const stripStyles = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    error: "bg-red-500"
  };

  const timerStyles = {
    success: "bg-emerald-500 shadow-[0_0_8px_#10b981]",
    warning: "bg-amber-500 shadow-[0_0_8px_#f59e0b]",
    info: "bg-blue-500 shadow-[0_0_8px_#3b82f6]",
    error: "bg-red-500 shadow-[0_0_8px_#ef4444]"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.18 } }}
      className={\`pointer-events-auto relative flex items-start gap-3.5 p-4 pr-[18px] pl-[18px] rounded-2xl bg-zinc-950/85 border backdrop-blur-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] \${borderStyles[type]}\`}
    >
      <div className={\`absolute top-0 left-0 bottom-0 w-1 \${stripStyles[type]}\`} />
      <IconComponent size={18} color={iconColor} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 flex flex-col gap-0.5">
        <h5 className="text-[13.5px] font-bold text-white">{title}</h5>
        <p className="text-xs text-white/60 leading-relaxed">{description}</p>
      </div>
      <button 
        className="bg-transparent border-none text-white/30 cursor-pointer flex items-center transition-all duration-200 hover:text-white hover:rotate-90"
        onClick={() => onClose(id)}
      >
        <X size={14} />
      </button>

      <div 
        className={\`absolute bottom-0 left-0 h-[3px] \${timerStyles[type]}\`}
        style={{ width: \`\${progress}%\` }} 
      />
    </motion.div>
  );
}

export default function ToastManager() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, description) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999] w-[340px] pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            title={t.title}
            description={t.description}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}`
    },
    ts: {
      css: `// ToastNotification.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./ToastNotification.css"; // Include the CSS stylesheet below

interface ToastProps {
  id: string;
  type?: "success" | "warning" | "info" | "error";
  title?: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

interface ToastData {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  description: string;
}

export function Toast({
  id,
  type = "info",
  title = "Notification",
  description = "Detailed alert content goes here.",
  duration = 4000,
  onClose
}: ToastProps): React.JSX.Element {
  const [progress, setProgress] = useState<number>(100);

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
      className={\`toast-card \${type}\`}
    >
      <IconComponent size={18} color={iconColor} className="toast-icon" />
      <div className="toast-content-wrapper">
        <h5 className="toast-title">{title}</h5>
        <p className="toast-description">{description}</p>
      </div>
      <button className="toast-close-btn" onClick={() => onClose(id)}>
        <X size={14} />
      </button>

      <div 
        className={\`toast-timer-bar \${type}\`} 
        style={{ width: \`\${progress}%\` }} 
      />
    </motion.div>
  );
}

export default function ToastManager(): React.JSX.Element {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: "success" | "warning" | "info" | "error", title: string, description: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            title={t.title}
            description={t.description}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}`,
      tailwind: `// ToastNotification.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  id: string;
  type?: "success" | "warning" | "info" | "error";
  title?: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

interface ToastData {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  description: string;
}

export function Toast({
  id,
  type = "info",
  title = "Notification",
  description = "Detailed alert content goes here.",
  duration = 4000,
  onClose
}: ToastProps): React.JSX.Element {
  const [progress, setProgress] = useState<number>(100);

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

  const borderStyles = {
    success: "border-emerald-500/15 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25),0_20px_40px_rgba(0,0,0,0.5)]",
    warning: "border-amber-500/15 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.25),0_20px_40px_rgba(0,0,0,0.5)]",
    info: "border-blue-500/15 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25),0_20px_40px_rgba(0,0,0,0.5)]",
    error: "border-red-500/15 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.25),0_20px_40px_rgba(0,0,0,0.5)]"
  };

  const stripStyles = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    error: "bg-red-500"
  };

  const timerStyles = {
    success: "bg-emerald-500 shadow-[0_0_8px_#10b981]",
    warning: "bg-amber-500 shadow-[0_0_8px_#f59e0b]",
    info: "bg-blue-500 shadow-[0_0_8px_#3b82f6]",
    error: "bg-red-500 shadow-[0_0_8px_#ef4444]"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.18 } }}
      className={\`pointer-events-auto relative flex items-start gap-3.5 p-4 pr-[18px] pl-[18px] rounded-2xl bg-zinc-950/85 border backdrop-blur-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] \${borderStyles[type]}\`}
    >
      <div className={\`absolute top-0 left-0 bottom-0 w-1 \${stripStyles[type]}\`} />
      <IconComponent size={18} color={iconColor} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 flex flex-col gap-0.5">
        <h5 className="text-[13.5px] font-bold text-white">{title}</h5>
        <p className="text-xs text-white/60 leading-relaxed">{description}</p>
      </div>
      <button 
        className="bg-transparent border-none text-white/30 cursor-pointer flex items-center transition-all duration-200 hover:text-white hover:rotate-90"
        onClick={() => onClose(id)}
      >
        <X size={14} />
      </button>

      <div 
        className={\`absolute bottom-0 left-0 h-[3px] \${timerStyles[type]}\`}
        style={{ width: \`\${progress}%\` }} 
      />
    </motion.div>
  );
}

export default function ToastManager(): React.JSX.Element {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: "success" | "warning" | "info" | "error", title: string, description: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999] w-[340px] pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            title={t.title}
            description={t.description}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}`
    }
  },
  css: `/* Toast Manager Container fixed layout */
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

.toast-card {
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(10, 10, 12, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

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

/* Dynamic Shadow Glows */
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
  font-weight: 700;
  color: #ffffff;
}

.toast-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.45;
}

.toast-close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.toast-close-btn:hover {
  color: #ffffff;
  transform: rotate(90deg);
}

/* Linear progress timer bar */
.toast-timer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
}

.toast-timer-bar.success { background: #10b981; box-shadow: 0 0 8px #10b981; }
.toast-timer-bar.warning { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.toast-timer-bar.info { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
.toast-timer-bar.error { background: #ef4444; box-shadow: 0 0 8px #ef4444; }`
};
