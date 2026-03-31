"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import ContactForm from "@/components/contact/ContactForm";
import QuoteForm from "@/components/contact/QuoteForm";
import ServiceSelector from "@/components/contact/ServiceSelector";
import OfficeLocations from "@/components/contact/OfficeLocations";
import SectionDivider from "@/components/ui/SectionDivider";

export default function ContactPage() {
  const [useQuoteForm, setUseQuoteForm] = useState(false);
  const locale = useLocale();
  const t = useTranslations("contact");

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      {/* ───── Hero Section ───── */}
      <section className="relative pt-[120px] pb-[80px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-[5%] lg:px-[6%] relative z-10">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-accent rounded-full shadow-[0_0_10px_var(--color-border-glow)]" />
              <span className="section-label">{t("label")}</span>
              <div className="w-8 h-[2px] bg-accent rounded-full shadow-[0_0_10px_var(--color-border-glow)]" />
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[clamp(44px,7vw,88px)] font-heading font-black tracking-[var(--tracking-tight)] leading-[1.05] text-[var(--color-text-primary)] mb-8"
            >
              {t("title")}
            </motion.h1>

            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[var(--color-text-secondary)] text-[18px] leading-[1.7] mb-12"
            >
              {t("sub")}
            </motion.p>

            {/* Glass Form Switcher */}
            <div className="flex p-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full relative mb-12">
              <motion.div
                className="absolute inset-y-1.5 rounded-full bg-accent shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                initial={false}
                animate={{
                   x: locale === 'ar' 
                      ? (useQuoteForm ? '0%' : '100%')
                      : (useQuoteForm ? '100%' : '0%'),
                  width: '50%'
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              <button 
                onClick={() => setUseQuoteForm(false)}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${!useQuoteForm ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                {t("form.generalBtn")}
              </button>
              <button 
                onClick={() => setUseQuoteForm(true)}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${useQuoteForm ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                {t("form.quoteBtn")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Form & Info Section ───── */}
      <section className="section-wrapper pt-0">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,450px)] gap-[64px] items-start">
          
          {/* Left: Dynamic Form */}
          <div className="relative">
             <AnimatePresence mode="wait">
                <motion.div
                  key={useQuoteForm ? 'quote' : 'general'}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                   {useQuoteForm ? <QuoteForm /> : <ContactForm />}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Right: Info Panels */}
          <div className="space-y-[32px] lg:sticky lg:top-[120px]">
            <ServiceSelector />
            <OfficeLocations />
          </div>
        </div>
      </section>

      <SectionDivider />
    </div>
  );
}
