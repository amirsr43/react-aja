// src/data/codes/modernForm.js

export const modernFormCode = {
  code: {
    js: {
      css: `// ModernForm.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { User, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./ModernForm.css"; // Include the CSS stylesheet below

export default function ModernForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [focusedFields, setFocusedFields] = useState({ name: false, email: false, password: false });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState("idle"); // "idle" | "submitting" | "success"

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
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
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

    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setSubmitStatus("idle");
      }, 2000);
    }, 1800);
  };

  return (
    <div className="form-showcase">
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3 className="form-title">Create Account</h3>
          <p className="form-subtitle">Join us to access the premium dashboards</p>
        </div>

        {/* Name input */}
        <div className="form-group">
          <div className={\`form-input-container \${focusedFields.name || formData.name ? "focused" : ""} \${errors.name ? "error" : ""}\`}>
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
          <span className={\`form-label \${(focusedFields.name || formData.name) ? "floating" : ""} \${errors.name ? "error" : ""}\`}>
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
          <div className={\`form-input-container \${focusedFields.email || formData.email ? "focused" : ""} \${errors.email ? "error" : ""}\`}>
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
          <span className={\`form-label \${(focusedFields.email || formData.email) ? "floating" : ""} \${errors.email ? "error" : ""}\`}>
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
          <div className={\`form-input-container \${focusedFields.password || formData.password ? "focused" : ""} \${errors.password ? "error" : ""}\`}>
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
          <span className={\`form-label \${(focusedFields.password || formData.password) ? "floating" : ""} \${errors.password ? "error" : ""}\`}>
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

        {/* Submit button */}
        <button type="submit" disabled={submitStatus === "submitting"} className={\`form-submit-btn \${submitStatus}\`}>
          {submitStatus === "idle" && <>Get Started</>}
          {submitStatus === "submitting" && <><Loader2 size={16} className="animate-spin" /> Creating account...</>}
          {submitStatus === "success" && <><CheckCircle2 size={16} /> Account Created!</>}
        </button>
      </form>
    </div>
  );
}`,
      tailwind: `// ModernForm.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { User, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModernForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [focusedFields, setFocusedFields] = useState({ name: false, email: false, password: false });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
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
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
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

    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setSubmitStatus("idle");
      }, 2000);
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px] bg-zinc-950/45 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_50px_rgba(59,130,246,0.03)]">
        <div className="text-center mb-7">
          <h3 className="text-2xl font-extrabold text-white mb-1.5 tracking-tight">Create Account</h3>
          <p className="text-xs text-white/40">Join us to access the premium dashboards</p>
        </div>

        {/* Name input */}
        <div className="relative mb-5">
          <div className={\`flex items-center bg-white/[0.02] border rounded-xl px-3.5 py-1 transition-all duration-300 \${
            errors.name ? "border-red-500/50 bg-red-500/[0.02]" : focusedFields.name || formData.name ? "border-blue-500 bg-white/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10"
          }\`}>
            <User size={16} className={\`mr-3 transition-colors duration-300 \${errors.name ? "text-red-500" : focusedFields.name ? "text-blue-500" : "text-white/30"}\`} />
            <input
              type="text"
              className="flex-1 bg-transparent border-none text-white text-[14.5px] h-11 outline-none w-full"
              value={formData.name}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <span className={\`absolute pointer-events-none transition-all duration-250 \${
            focusedFields.name || formData.name 
              ? "top-0 -translate-y-1/2 scale-[0.85] left-3 px-1.5 bg-[#09090b] font-semibold text-blue-500" 
              : "left-[42px] top-1/2 -translate-y-1/2 text-white/35 text-[14.5px] font-medium"
          } \${errors.name ? "!text-red-500" : ""}\`}>
            Full Name
          </span>
          <AnimatePresence>
            {errors.name && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-500 text-[11.5px] font-medium mt-1.5 pl-1"
              >
                <AlertCircle size={12} />
                {errors.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Email input */}
        <div className="relative mb-5">
          <div className={\`flex items-center bg-white/[0.02] border rounded-xl px-3.5 py-1 transition-all duration-300 \${
            errors.email ? "border-red-500/50 bg-red-500/[0.02]" : focusedFields.email || formData.email ? "border-blue-500 bg-white/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10"
          }\`}>
            <Mail size={16} className={\`mr-3 transition-colors duration-300 \${errors.email ? "text-red-500" : focusedFields.email ? "text-blue-500" : "text-white/30"}\`} />
            <input
              type="email"
              className="flex-1 bg-transparent border-none text-white text-[14.5px] h-11 outline-none w-full"
              value={formData.email}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <span className={\`absolute pointer-events-none transition-all duration-250 \${
            focusedFields.email || formData.email 
              ? "top-0 -translate-y-1/2 scale-[0.85] left-3 px-1.5 bg-[#09090b] font-semibold text-blue-500" 
              : "left-[42px] top-1/2 -translate-y-1/2 text-white/35 text-[14.5px] font-medium"
          } \${errors.email ? "!text-red-500" : ""}\`}>
            Email Address
          </span>
          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-500 text-[11.5px] font-medium mt-1.5 pl-1"
              >
                <AlertCircle size={12} />
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Password input */}
        <div className="relative mb-5">
          <div className={\`flex items-center bg-white/[0.02] border rounded-xl px-3.5 py-1 transition-all duration-300 \${
            errors.password ? "border-red-500/50 bg-red-500/[0.02]" : focusedFields.password || formData.password ? "border-blue-500 bg-white/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10"
          }\`}>
            <Lock size={16} className={\`mr-3 transition-colors duration-300 \${errors.password ? "text-red-500" : focusedFields.password ? "text-blue-500" : "text-white/30"}\`} />
            <input
              type="password"
              className="flex-1 bg-transparent border-none text-white text-[14.5px] h-11 outline-none w-full"
              value={formData.password}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <span className={\`absolute pointer-events-none transition-all duration-250 \${
            focusedFields.password || formData.password 
              ? "top-0 -translate-y-1/2 scale-[0.85] left-3 px-1.5 bg-[#09090b] font-semibold text-blue-500" 
              : "left-[42px] top-1/2 -translate-y-1/2 text-white/35 text-[14.5px] font-medium"
          } \${errors.password ? "!text-red-500" : ""}\`}>
            Password
          </span>
          <AnimatePresence>
            {errors.password && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-500 text-[11.5px] font-medium mt-1.5 pl-1"
              >
                <AlertCircle size={12} />
                {errors.password}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className={\`w-full h-12 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 \${
            submitStatus === "submitting" 
              ? "bg-white/5 border border-white/10 text-white/60 cursor-not-allowed" 
              : submitStatus === "success" 
                ? "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]" 
                : "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(59,130,246,0.45)] cursor-pointer"
          }\`}
        >
          {submitStatus === "idle" && <>Get Started</>}
          {submitStatus === "submitting" && <><Loader2 size={16} className="animate-spin" /> Creating account...</>}
          {submitStatus === "success" && <><CheckCircle2 size={16} /> Account Created!</>}
        </button>
      </form>
    </div>
  );
}`
    },
    ts: {
      css: `// ModernForm.tsx (TypeScript + Custom CSS)
import React, { useState, FocusEvent, FormEvent } from "react";
import { User, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./ModernForm.css"; // Include the CSS stylesheet below

export default function ModernForm(): React.JSX.Element {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [focusedFields, setFocusedFields] = useState({ name: false, email: false, password: false });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleFocus = (field: "name" | "email" | "password") => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field: "name" | "email" | "password") => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: "name" | "email" | "password", val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("submitting");

    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setSubmitStatus("idle");
      }, 2000);
    }, 1800);
  };

  return (
    <div className="form-showcase">
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3 className="form-title">Create Account</h3>
          <p className="form-subtitle">Join us to access the premium dashboards</p>
        </div>

        {/* Name input */}
        <div className="form-group">
          <div className={\`form-input-container \${focusedFields.name || formData.name ? "focused" : ""} \${errors.name ? "error" : ""}\`}>
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
          <span className={\`form-label \${(focusedFields.name || formData.name) ? "floating" : ""} \${errors.name ? "error" : ""}\`}>
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
          <div className={\`form-input-container \${focusedFields.email || formData.email ? "focused" : ""} \${errors.email ? "error" : ""}\`}>
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
          <span className={\`form-label \${(focusedFields.email || formData.email) ? "floating" : ""} \${errors.email ? "error" : ""}\`}>
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
          <div className={\`form-input-container \${focusedFields.password || formData.password ? "focused" : ""} \${errors.password ? "error" : ""}\`}>
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
          <span className={\`form-label \${(focusedFields.password || formData.password) ? "floating" : ""} \${errors.password ? "error" : ""}\`}>
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

        {/* Submit button */}
        <button type="submit" disabled={submitStatus === "submitting"} className={\`form-submit-btn \${submitStatus}\`}>
          {submitStatus === "idle" && <>Get Started</>}
          {submitStatus === "submitting" && <><Loader2 size={16} className="animate-spin" /> Creating account...</>}
          {submitStatus === "success" && <><CheckCircle2 size={16} /> Account Created!</>}
        </button>
      </form>
    </div>
  );
}`,
      tailwind: `// ModernForm.tsx (TypeScript + Tailwind CSS)
import React, { useState, FormEvent } from "react";
import { User, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModernForm(): React.JSX.Element {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [focusedFields, setFocusedFields] = useState({ name: false, email: false, password: false });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleFocus = (field: "name" | "email" | "password") => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field: "name" | "email" | "password") => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: "name" | "email" | "password", val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("submitting");

    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setSubmitStatus("idle");
      }, 2000);
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px] bg-zinc-950/45 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_50px_rgba(59,130,246,0.03)]">
        <div className="text-center mb-7">
          <h3 className="text-2xl font-extrabold text-white mb-1.5 tracking-tight">Create Account</h3>
          <p className="text-xs text-white/40">Join us to access the premium dashboards</p>
        </div>

        {/* Name input */}
        <div className="relative mb-5">
          <div className={\`flex items-center bg-white/[0.02] border rounded-xl px-3.5 py-1 transition-all duration-300 \${
            errors.name ? "border-red-500/50 bg-red-500/[0.02]" : focusedFields.name || formData.name ? "border-blue-500 bg-white/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10"
          }\`}>
            <User size={16} className={\`mr-3 transition-colors duration-300 \${errors.name ? "text-red-500" : focusedFields.name ? "text-blue-500" : "text-white/30"}\`} />
            <input
              type="text"
              className="flex-1 bg-transparent border-none text-white text-[14.5px] h-11 outline-none w-full"
              value={formData.name}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <span className={\`absolute pointer-events-none transition-all duration-250 \${
            focusedFields.name || formData.name 
              ? "top-0 -translate-y-1/2 scale-[0.85] left-3 px-1.5 bg-[#09090b] font-semibold text-blue-500" 
              : "left-[42px] top-1/2 -translate-y-1/2 text-white/35 text-[14.5px] font-medium"
          } \${errors.name ? "!text-red-500" : ""}\`}>
            Full Name
          </span>
          <AnimatePresence>
            {errors.name && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-500 text-[11.5px] font-medium mt-1.5 pl-1"
              >
                <AlertCircle size={12} />
                {errors.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Email input */}
        <div className="relative mb-5">
          <div className={\`flex items-center bg-white/[0.02] border rounded-xl px-3.5 py-1 transition-all duration-300 \${
            errors.email ? "border-red-500/50 bg-red-500/[0.02]" : focusedFields.email || formData.email ? "border-blue-500 bg-white/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10"
          }\`}>
            <Mail size={16} className={\`mr-3 transition-colors duration-300 \${errors.email ? "text-red-500" : focusedFields.email ? "text-blue-500" : "text-white/30"}\`} />
            <input
              type="email"
              className="flex-1 bg-transparent border-none text-white text-[14.5px] h-11 outline-none w-full"
              value={formData.email}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <span className={\`absolute pointer-events-none transition-all duration-250 \${
            focusedFields.email || formData.email 
              ? "top-0 -translate-y-1/2 scale-[0.85] left-3 px-1.5 bg-[#09090b] font-semibold text-blue-500" 
              : "left-[42px] top-1/2 -translate-y-1/2 text-white/35 text-[14.5px] font-medium"
          } \${errors.email ? "!text-red-500" : ""}\`}>
            Email Address
          </span>
          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-500 text-[11.5px] font-medium mt-1.5 pl-1"
              >
                <AlertCircle size={12} />
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Password input */}
        <div className="relative mb-5">
          <div className={\`flex items-center bg-white/[0.02] border rounded-xl px-3.5 py-1 transition-all duration-300 \${
            errors.password ? "border-red-500/50 bg-red-500/[0.02]" : focusedFields.password || formData.password ? "border-blue-500 bg-white/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10"
          }\`}>
            <Lock size={16} className={\`mr-3 transition-colors duration-300 \${errors.password ? "text-red-500" : focusedFields.password ? "text-blue-500" : "text-white/30"}\`} />
            <input
              type="password"
              className="flex-1 bg-transparent border-none text-white text-[14.5px] h-11 outline-none w-full"
              value={formData.password}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <span className={\`absolute pointer-events-none transition-all duration-250 \${
            focusedFields.password || formData.password 
              ? "top-0 -translate-y-1/2 scale-[0.85] left-3 px-1.5 bg-[#09090b] font-semibold text-blue-500" 
              : "left-[42px] top-1/2 -translate-y-1/2 text-white/35 text-[14.5px] font-medium"
          } \${errors.password ? "!text-red-500" : ""}\`}>
            Password
          </span>
          <AnimatePresence>
            {errors.password && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-500 text-[11.5px] font-medium mt-1.5 pl-1"
              >
                <AlertCircle size={12} />
                {errors.password}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className={\`w-full h-12 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 \${
            submitStatus === "submitting" 
              ? "bg-white/5 border border-white/10 text-white/60 cursor-not-allowed" 
              : submitStatus === "success" 
                ? "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]" 
                : "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(59,130,246,0.45)] cursor-pointer"
          }\`}
        >
          {submitStatus === "idle" && <>Get Started</>}
          {submitStatus === "submitting" && <><Loader2 size={16} className="animate-spin" /> Creating account...</>}
          {submitStatus === "success" && <><CheckCircle2 size={16} /> Account Created!</>}
        </button>
      </form>
    </div>
  );
}`
    }
  },
  css: `/* Core Form Card */
.form-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 32px;
  backdrop-filter: blur(16px);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 50px rgba(59, 130, 246, 0.03);
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
  font-size: 14.5px;
  height: 44px;
  outline: none;
  width: 100%;
}

/* Floating Label Transition */
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
}

.form-label.floating {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  left: 12px;
  padding: 0 6px;
  background: #09090b;
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

/* Button States */
.form-submit-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
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
}`
};
