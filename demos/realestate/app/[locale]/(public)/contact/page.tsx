"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const c = dict.contact;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: SILK }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{c.heroLabel}</span>
            </div>
            <h1 className={`text-text-on-dark ${fontHeading}`}>{c.heroTitle}</h1>
            <p className="text-text-on-dark-muted text-lg mt-4 font-light max-w-2xl">{c.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <h2 className={`text-2xl mb-8 ${fontHeading}`}>{c.form.send}</h2>
              {sent ? (
                <div className="py-16 text-center">
                  <p className="text-gold text-lg">{c.form.success}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <input type="text" placeholder={c.form.name} className="w-full bg-transparent border border-border px-4 py-3.5 text-sm focus:border-gold focus:outline-none transition-colors" />
                    <input type="tel" placeholder={c.form.phone} dir="ltr" className="w-full bg-transparent border border-border px-4 py-3.5 text-sm focus:border-gold focus:outline-none transition-colors" />
                  </div>
                  <input type="email" placeholder={c.form.email} className="w-full bg-transparent border border-border px-4 py-3.5 text-sm focus:border-gold focus:outline-none transition-colors" />
                  <textarea rows={5} placeholder={c.form.message} className="w-full bg-transparent border border-border px-4 py-3.5 text-sm focus:border-gold focus:outline-none transition-colors resize-none" />
                  <button onClick={() => setSent(true)} className="btn-primary flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {c.form.send}
                  </button>
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-charcoal text-text-on-dark p-8 lg:p-10">
                <h3 className={`text-xl mb-8 ${fontHeading}`}>{c.info.title}</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: isRTL ? "العنوان" : "Address", value: c.info.address },
                    { icon: Phone, label: isRTL ? "الهاتف" : "Phone", value: c.info.phone },
                    { icon: Mail, label: isRTL ? "البريد" : "Email", value: c.info.email },
                    { icon: MessageCircle, label: "WhatsApp", value: c.info.whatsapp },
                    { icon: Clock, label: isRTL ? "ساعات العمل" : "Hours", value: c.info.hours },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/5 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-text-on-dark-muted mb-1">{item.label}</p>
                        <p className="text-sm text-text-on-dark/80">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
