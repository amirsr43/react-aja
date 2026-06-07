// src/components/FeedbackButton.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bug, Lightbulb, CheckCircle, Loader } from "lucide-react";

const TYPES = [
  { id: "bug",        label: "Bug Report",  icon: Bug,        color: "#ef4444", bg: "#ef444415" },
  { id: "suggestion", label: "Suggestion",  icon: Lightbulb,  color: "#f59e0b", bg: "#f59e0b15" },
];

// ── Replace with your own Formspree endpoint ──────────────────────────────────
// Sign up free at https://formspree.io → New Form → copy your form ID
const FORMSPREE_URL = "https://formspree.io/f/mqeopqko";
// ─────────────────────────────────────────────────────────────────────────────

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { type: "spring", damping: 24, stiffness: 300 } },
  exit:    { opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.18 } },
};

export default function FeedbackButton() {
  const [open,    setOpen]    = useState(false);
  const [type,    setType]    = useState("bug");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState("idle"); // idle | loading | success | error

  const selected = TYPES.find((t) => t.id === type);

  const reset = () => {
    setType("bug");
    setEmail("");
    setMessage("");
    setStatus("idle");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ type, email, message }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <motion.button
        id="feedback-trigger"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position:       "fixed",
          bottom:         "84px",      // just above the ScrollToTop button
          right:          "28px",
          width:          "44px",
          height:         "44px",
          borderRadius:   "12px",
          border:         "1px solid var(--border)",
          background:     "var(--surface)",
          color:          "var(--muted)",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          zIndex:         99,
          boxShadow:      "0 8px 24px rgba(0,0,0,0.18)",
          backdropFilter:       "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition:     "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        title="Send feedback"
        aria-label="Open feedback form"
      >
        <MessageSquare size={18} />
      </motion.button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="fb-backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              style={{
                position:   "fixed",
                inset:      0,
                background: "rgba(0,0,0,0.45)",
                zIndex:     200,
                backdropFilter:       "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Panel */}
            <motion.div
              key="fb-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="fb-title"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position:     "fixed",
                bottom:       "84px",
                right:        "28px",
                width:        "min(420px, calc(100vw - 32px))",
                zIndex:       201,
                background:   "var(--surface)",
                border:       "1px solid var(--border)",
                borderRadius: "20px",
                boxShadow:    "0 24px 64px rgba(0,0,0,0.4)",
                overflow:     "hidden",
              }}
            >
              {/* Header */}
              <div style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                padding:        "18px 20px 14px",
                borderBottom:   "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width:          "34px",
                    height:         "34px",
                    borderRadius:   "10px",
                    background:     "rgba(124,58,237,0.12)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                  }}>
                    <MessageSquare size={16} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p id="fb-title" style={{ margin: 0, fontWeight: 700, fontSize: "15px", color: "var(--text)" }}>
                      Send Feedback
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)" }}>
                      Report a bug or share a suggestion
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close feedback form"
                  style={{
                    background: "transparent",
                    border:     "none",
                    cursor:     "pointer",
                    color:      "var(--muted)",
                    display:    "flex",
                    padding:    "4px",
                    borderRadius: "6px",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: "20px" }}>
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    /* Success State */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        textAlign:      "center",
                        padding:        "24px 0",
                        display:        "flex",
                        flexDirection:  "column",
                        alignItems:     "center",
                        gap:            "12px",
                      }}
                    >
                      <div style={{
                        width:          "56px",
                        height:         "56px",
                        borderRadius:   "50%",
                        background:     "#10b98120",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                      }}>
                        <CheckCircle size={28} style={{ color: "#10b981" }} />
                      </div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: "16px", color: "var(--text)" }}>
                        Thanks for your feedback!
                      </p>
                      <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", maxWidth: "260px" }}>
                        Your message has been received. We'll look into it as soon as possible.
                      </p>
                      <button
                        onClick={handleClose}
                        style={{
                          marginTop:    "8px",
                          padding:      "8px 24px",
                          borderRadius: "10px",
                          border:       "none",
                          background:   "linear-gradient(135deg, #7c3aed, #0ea5e9)",
                          color:        "#fff",
                          fontWeight:   600,
                          fontSize:     "13px",
                          cursor:       "pointer",
                        }}
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    /* Form */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                      {/* Type Selector */}
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Type
                        </label>
                        <div style={{ display: "flex", gap: "8px" }}>
                          {TYPES.map((t) => {
                            const Icon = t.icon;
                            const isActive = type === t.id;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => setType(t.id)}
                                style={{
                                  flex:         1,
                                  display:      "flex",
                                  alignItems:   "center",
                                  justifyContent: "center",
                                  gap:          "6px",
                                  padding:      "9px 12px",
                                  borderRadius: "10px",
                                  border:       `1px solid ${isActive ? t.color + "60" : "var(--border)"}`,
                                  background:   isActive ? t.bg : "transparent",
                                  color:        isActive ? t.color : "var(--muted)",
                                  fontSize:     "13px",
                                  fontWeight:   isActive ? 600 : 500,
                                  cursor:       "pointer",
                                  transition:   "all 0.18s",
                                }}
                              >
                                <Icon size={14} />
                                {t.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="fb-message" style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Message <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <textarea
                          id="fb-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={4}
                          placeholder={
                            type === "bug"
                              ? "Describe the bug you encountered..."
                              : "Share your idea or suggestion..."
                          }
                          style={{
                            width:        "100%",
                            padding:      "10px 12px",
                            borderRadius: "10px",
                            border:       "1px solid var(--border)",
                            background:   "var(--bg)",
                            color:        "var(--text)",
                            fontSize:     "13px",
                            lineHeight:   1.6,
                            resize:       "vertical",
                            minHeight:    "96px",
                            outline:      "none",
                            boxSizing:    "border-box",
                            fontFamily:   "inherit",
                            transition:   "border-color 0.2s",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                          onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="fb-email" style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Your Email <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                          id="fb-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          style={{
                            width:        "100%",
                            padding:      "10px 12px",
                            borderRadius: "10px",
                            border:       "1px solid var(--border)",
                            background:   "var(--bg)",
                            color:        "var(--text)",
                            fontSize:     "13px",
                            outline:      "none",
                            boxSizing:    "border-box",
                            fontFamily:   "inherit",
                            transition:   "border-color 0.2s",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                          onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
                        />
                      </div>

                      {/* Error */}
                      {status === "error" && (
                        <p style={{ margin: 0, fontSize: "12px", color: "#ef4444", background: "#ef444412", padding: "8px 12px", borderRadius: "8px", border: "1px solid #ef444430" }}>
                          Something went wrong. Please try again later.
                        </p>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "loading" || !message.trim()}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          gap:            "8px",
                          padding:        "11px 20px",
                          borderRadius:   "10px",
                          border:         "none",
                          background:     (status === "loading" || !message.trim())
                            ? "var(--border)"
                            : "linear-gradient(135deg, #7c3aed, #0ea5e9)",
                          color:          (status === "loading" || !message.trim()) ? "var(--muted)" : "#fff",
                          fontWeight:     600,
                          fontSize:       "14px",
                          cursor:         (status === "loading" || !message.trim()) ? "not-allowed" : "pointer",
                          transition:     "all 0.2s",
                        }}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader size={15} style={{ animation: "spin 0.8s linear infinite" }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Feedback
                          </>
                        )}
                      </motion.button>

                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
