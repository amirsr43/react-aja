// src/components/FAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Apakah semua template di ReactAja benar-benar gratis?",
    answer: "Ya, 100% gratis! Semua template yang ada di library ReactAja bersifat Open Source dan dapat Anda unduh secara langsung tanpa perlu mendaftar akun atau login.",
  },
  {
    question: "Bagaimana cara menginstal dan menjalankan template yang sudah diunduh?",
    answer: "Caranya sangat mudah: 1) Ekstrak file ZIP yang diunduh. 2) Buka terminal di direktori tersebut lalu ketik 'npm install' untuk mengunduh dependensi. 3) Jalankan 'npm run dev' untuk memulai server lokal dan buka localhost di browser Anda.",
  },
  {
    question: "Bolehkah saya menggunakan template ini untuk proyek komersial?",
    answer: "Tentu saja! Anda bebas menggunakan, memodifikasi, dan mengkustomisasi template kami untuk portofolio pribadi, website klien, proyek komersial, maupun startup tanpa batasan lisensi.",
  },
  {
    question: "Apakah saya wajib mencantumkan kredit atau atribusi?",
    answer: "Tidak wajib. Anda bebas menggunakannya secara mandiri. Namun, kami akan sangat berterima kasih jika Anda membagikan link ReactAja kepada rekan developer lainnya!",
  },
  {
    question: "Teknologi apa saja yang digunakan pada template di ReactAja?",
    answer: "Sebagian besar template kami dibangun menggunakan React.js yang dipadukan dengan Tailwind CSS untuk styling modern dan Framer Motion untuk animasi micro-interactions yang premium.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{ padding: "80px 24px 100px", background: "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>
            Pertanyaan Umum
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: "15px", color: "var(--muted)", margin: 0 }}>
            Segala hal yang perlu Anda ketahui tentang template gratis dari ReactAja.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: "var(--card-bg)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--text)",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.01em", paddingRight: "16px" }}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", alignItems: "center", color: isOpen ? "var(--accent)" : "var(--muted)" }}
                  >
                    <FaChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div
                        style={{
                          padding: "0 24px 20px",
                          fontSize: "14px",
                          color: "var(--muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
