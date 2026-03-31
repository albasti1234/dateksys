"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const heroImages = [
  { src: "/images/careers/desk.webp", key: "desk" },
  { src: "/images/careers/fiber.webp", key: "fiber" },
  { src: "/images/careers/cabling.webp", key: "cabling" },
];

export default function CareersPage() {
  const t = useTranslations("careers");
  const [activeImage, setActiveImage] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLElement>(null);

  // Auto-rotate hero images
  const nextImage = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) { setFileName(""); return; }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(t("file_type_error"));
      setFileName("");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(t("file_size_error"));
      setFileName("");
      e.target.value = "";
      return;
    }
    setFileName(file.name);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fileInput = fileRef.current;
    const file = fileInput?.files?.[0];
    if (file) formData.append("attachment", file);
    formData.set("reason", "careers");

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const text = await res.text();
      let json: { message?: string; error?: string };
      try {
        json = JSON.parse(text);
      } catch {
        json = { error: `Server error (${res.status})` };
      }
      if (res.ok) {
        setStatus("success");
        setServerMessage(t("apply_success"));
        form.reset();
        setFileName("");
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setStatus("error");
        setServerMessage(json.error || `Error (${res.status})`);
      }
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Network error.");
    }
  }

  const inputClasses =
    "w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-[20px] py-[16px] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 focus:shadow-[0_0_20px_rgba(14,165,233,0.06)] transition-all duration-300 font-body text-start appearance-none";

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      {/* ═══════════════════════════════════════
          HERO — Full-screen with rotating images
          ═══════════════════════════════════════ */}
      <section className="relative h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden flex items-center">
        {/* Rotating background images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={heroImages[activeImage].src}
              alt={t(`hero_images.${heroImages[activeImage].key}`)}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay — lighter to show images better */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(9,9,11,0.2) 0%,
              rgba(9,9,11,0.4) 40%,
              rgba(9,9,11,0.7) 75%,
              var(--color-base) 100%
            )`,
          }}
        />

        {/* Side vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(9,9,11,0.4) 100%)",
          }}
        />

        {/* Accent glow behind text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] lg:px-[6%] text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label mb-5">{t("label")}</p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6"
              style={{
                letterSpacing: "var(--tracking-tight)",
                textShadow: "0 0 80px rgba(255,255,255,0.08)",
              }}
            >
              <span className="gradient-text">{t("title")}</span>
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary font-body leading-relaxed max-w-2xl mx-auto mb-10">
              {t("subtitle")}
            </p>
            <motion.button
              onClick={scrollToForm}
              className="text-base px-10 py-4 rounded-lg font-semibold cursor-pointer"
              style={{
                background: "#38BDF8",
                color: "#09090B",
                border: "none",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(56,189,248,0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              {t("cta")} →
            </motion.button>
          </motion.div>

          {/* Image indicators */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                style={{
                  width: activeImage === i ? 40 : 16,
                  background: activeImage === i
                    ? "rgba(56,189,248,0.4)"
                    : "rgba(255,255,255,0.15)",
                }}
              >
                {activeImage === i && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "#38BDF8" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    key={`progress-${i}-${activeImage}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-text-muted">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          WHY JOIN + NO OPENINGS
          ═══════════════════════════════════════ */}
      <section className="px-[5%] lg:px-[6%] py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto">
          {/* Why join */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">{t("why_join")}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-10" style={{ letterSpacing: "var(--tracking-tight)" }}>
              <span className="gradient-text">{t("why_join")}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a4 4 0 0 0-8 0v2" strokeLinecap="round" /></svg>,
              ].map((icon, i) => {
                const items = t.raw("why_items") as { title: string; desc: string }[];
                const item = items[i];
                return (
                  <motion.div
                    key={i}
                    className="rounded-2xl p-7 lg:p-8 group"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, borderColor: "rgba(56,189,248,0.15)", transition: { duration: 0.3 } }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-accent transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)" }}>
                      {icon}
                    </div>
                    <h4 className="font-heading font-bold text-text-primary text-base mb-3">{item.title}</h4>
                    <p className="text-sm text-text-muted font-body leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          APPLICATION FORM
          ═══════════════════════════════════════ */}
      <section ref={formRef} className="px-[5%] lg:px-[6%] pb-28 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-[2px] bg-accent rounded-full shadow-[0_0_10px_var(--color-border-glow)]" />
              <span className="section-label">{t("apply_title")}</span>
              <div className="w-10 h-[2px] bg-accent rounded-full shadow-[0_0_10px_var(--color-border-glow)]" />
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5"
              style={{ letterSpacing: "var(--tracking-tight)" }}
            >
              <span className="gradient-text">{t("apply_title")}</span>
            </h2>
            <p className="text-base text-text-secondary font-body leading-relaxed max-w-xl mx-auto">
              {t("apply_sub")}
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            className="rounded-2xl p-8 lg:p-12 relative overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid rgba(56,189,248,0.1)",
              boxShadow: "0 25px 70px -15px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 70%)" }} />

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)" }} />

            {status === "success" ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", boxShadow: "0 0 40px rgba(74,222,128,0.1)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10"><path d="M5 13l4 4L19 7" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-accent text-lg font-heading font-semibold mb-2">{serverMessage}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
                <div className="hidden" aria-hidden="true">
                  <input name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input name="name" required minLength={2} placeholder={t("apply_fields.name")} className={inputClasses} />
                  </div>
                  <div>
                    <input name="email" type="email" required placeholder={t("apply_fields.email")} className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input name="phone" placeholder={t("apply_fields.phone")} className={inputClasses} />
                  </div>
                  <div>
                    <select name="subject" required className={inputClasses} defaultValue="">
                      <option value="" disabled>{t("apply_fields.position_options.placeholder")}</option>
                      <option value="Network Engineer">{t("apply_fields.position_options.network_engineer")}</option>
                      <option value="Fiber Technician">{t("apply_fields.position_options.fiber_technician")}</option>
                      <option value="Security Installer">{t("apply_fields.position_options.security_installer")}</option>
                      <option value="Software Developer">{t("apply_fields.position_options.software_developer")}</option>
                      <option value="Project Manager">{t("apply_fields.position_options.project_manager")}</option>
                      <option value="Other">{t("apply_fields.position_options.other")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea name="message" rows={5} required minLength={10} placeholder={t("apply_fields.message")} className={`${inputClasses} resize-none`} />
                </div>

                {/* File upload */}
                <div>
                  <label htmlFor="cv-file" className="block cursor-pointer group">
                    <div
                      className="flex items-center gap-4 px-6 py-5 rounded-xl border border-dashed transition-all duration-300 group-hover:border-accent/40"
                      style={{
                        borderColor: fileName ? "rgba(56,189,248,0.3)" : "var(--color-border)",
                        background: fileName ? "rgba(56,189,248,0.03)" : "transparent",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                        style={{
                          background: fileName ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                          border: fileName ? "1px solid rgba(56,189,248,0.2)" : "1px solid var(--color-border)",
                        }}
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors">
                          <path d="M10 3v10m0-10L6 7m4-4l4 4M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary font-body truncate">
                          {fileName || t("apply_fields.attachment")}
                        </p>
                        <p className="text-[11px] text-text-muted font-body mt-0.5">
                          {t("apply_fields.attachment_hint")}
                        </p>
                      </div>
                      {fileName && (
                        <span className="text-[11px] text-accent font-heading font-bold tracking-wider uppercase shrink-0">
                          ✓
                        </span>
                      )}
                    </div>
                  </label>
                  <input ref={fileRef} id="cv-file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                  {fileError && <p className="text-red-400 text-[13px] mt-2 text-start">{fileError}</p>}
                </div>

                {status === "error" && (
                  <div className="text-red-400 text-[14px] text-start">{serverMessage}</div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full disabled:opacity-50 text-base py-4 rounded-lg font-semibold cursor-pointer"
                  style={{
                    background: "#38BDF8",
                    color: "#09090B",
                    border: "none",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(56,189,248,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "loading" ? t("apply_fields.sending") : t("apply_fields.submit")}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
