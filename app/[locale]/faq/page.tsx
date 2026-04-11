"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-[var(--color-border)]"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-6 text-start group cursor-pointer"
      >
        <span className="text-base lg:text-lg font-heading font-semibold text-text-primary pe-8 group-hover:text-accent transition-colors duration-300">
          {item.question}
        </span>

        {/* Plus/Minus icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${isOpen ? "rgba(56,189,248,0.25)" : "var(--color-border)"}`,
          }}
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <path
              d="M7 1v12M1 7h12"
              stroke={isOpen ? "#38BDF8" : "rgba(255,255,255,0.4)"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-text-muted leading-relaxed font-body max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="min-h-screen pt-32 pb-24 px-[5%] lg:px-[6%]">
      {/* Background glow */}
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-label mb-4">{t("label")}</p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          <span className="gradient-text">{t("title")}</span>
        </h1>
      </motion.div>

      {/* Accordion */}
      <div className="max-w-3xl">
        {items.map((item, i) => (
          <FAQAccordionItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-16 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p className="text-text-secondary font-body mb-4">
            {t("still_have_questions")}
          </p>
          <Link href="/contact" className="btn-primary">
            {t("contact_cta")} →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}