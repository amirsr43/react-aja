// src/components/ui/ModernForm.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const FORM_STYLES = `
/* ── MODERN FORM CORE STYLES ── */
.form-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 32px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 50px rgba(59, 130, 246, 0.03);
  box-sizing: border-box;
}

.form-header {
  text-align: center;
  margin-bottom: 28px;
}

.form-title {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}

.form-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 4px 14px;
}

.form-input-container.focused {
  border-color: #3b82f6;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.15);
  background: rgba(255, 255, 255, 0.04);
}

.form-input-container.error {
  border-color: #ef4444;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.1);
}

.form-icon {
  color: rgba(255, 255, 255, 0.3);
  margin-right: 12px;
  transition: color 0.3s;
  flex-shrink: 0;
}

.form-input-container.focused .form-icon {
  color: #3b82f6;
}

.form-input-container.error .form-icon {
  color: #ef4444;
}

.form-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 14.5px;
  height: 44px;
  outline: none;
  width: 100%;
}

/* Floating Label styling */
.form-label {
  position: absolute;
  left: 42px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.35);
  font-size: 14.5px;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: transparent;
}

.form-label.floating {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  left: 12px;
  padding: 0 6px;
  background: #09090b; /* Mask behind label floating on border */
  color: #3b82f6;
  font-weight: 600;
  border-radius: 4px;
}

.form-label.floating.error {
  color: #ef4444;
}

.form-error-msg {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ef4444;
  font-size: 11.5px;
  font-weight: 500;
  margin-top: 6px;
  padding-left: 4px;
}

/* Animated Submit Button */
.form-submit-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.form-submit-btn.idle {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.form-submit-btn.idle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.45);
}

.form-submit-btn.submitting {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  cursor: not-allowed;
}

.form-submit-btn.success {
  background: #10b981;
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
}
`;

export default function ModernForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [focusedFields, setFocusedFields] = useState({ name: false, email: false, password: false });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  
  // Submit state: "idle" | "submitting" | "success"
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleFocus = (field) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("submitting");

    // Simulate database post timeout
    setTimeout(() => {
      setSubmitStatus("success");

      // Reset form after a brief display of the success indicator
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setSubmitStatus("idle");
      }, 2000);
    }, 1800);
  };

  return (
    <div className="form-showcase">
      <style>{FORM_STYLES}</style>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3 className="form-title">Create Account</h3>
          <p className="form-subtitle">Join us to access the premium dashboards</p>
        </div>

        {/* Name input */}
        <div className="form-group">
          <div 
            className={`form-input-container ${focusedFields.name || formData.name ? "focused" : ""} ${errors.name ? "error" : ""}`}
          >
            <User size={16} className="form-icon" />
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <span 
            className={`form-label ${(focusedFields.name || formData.name) ? "floating" : ""} ${errors.name ? "error" : ""}`}
          >
            Full Name
          </span>
          <AnimatePresence>
            {errors.name && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="form-error-msg"
              >
                <AlertCircle size={12} />
                {errors.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Email input */}
        <div className="form-group">
          <div 
            className={`form-input-container ${focusedFields.email || formData.email ? "focused" : ""} ${errors.email ? "error" : ""}`}
          >
            <Mail size={16} className="form-icon" />
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <span 
            className={`form-label ${(focusedFields.email || formData.email) ? "floating" : ""} ${errors.email ? "error" : ""}`}
          >
            Email Address
          </span>
          <AnimatePresence>
            {errors.email && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="form-error-msg"
              >
                <AlertCircle size={12} />
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Password input */}
        <div className="form-group">
          <div 
            className={`form-input-container ${focusedFields.password || formData.password ? "focused" : ""} ${errors.password ? "error" : ""}`}
          >
            <Lock size={16} className="form-icon" />
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <span 
            className={`form-label ${(focusedFields.password || formData.password) ? "floating" : ""} ${errors.password ? "error" : ""}`}
          >
            Password
          </span>
          <AnimatePresence>
            {errors.password && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="form-error-msg"
              >
                <AlertCircle size={12} />
                {errors.password}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Multi-State Submit button */}
        <button 
          type="submit" 
          disabled={submitStatus === "submitting"}
          className={`form-submit-btn ${submitStatus}`}
        >
          {submitStatus === "idle" && (
            <>Get Started</>
          )}
          {submitStatus === "submitting" && (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating account...
            </>
          )}
          {submitStatus === "success" && (
            <>
              <CheckCircle2 size={16} />
              Account Created!
            </>
          )}
        </button>
      </form>
    </div>
  );
}
