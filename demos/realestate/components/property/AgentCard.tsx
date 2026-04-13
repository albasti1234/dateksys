"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Briefcase } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Agent } from "@/lib/types";
import { fadeUp, stagger, viewport } from "@/lib/animations";

export default function AgentCard({
  locale,
  dict,
  agent,
}: {
  locale: Locale;
  dict: Dictionary["propertyDetail"];
  agent: Agent;
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <section className="py-24 lg:py-32 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Agent info */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{isRTL ? "مستشارك العقاري" : "Your Property Advisor"}</span>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-charcoal-light border-2 border-gold/20" />
              <div>
                <h3 className={`text-xl text-text-on-dark ${fontHeading}`}>
                  {agent.name[locale]}
                </h3>
                <p className="text-text-on-dark-muted text-sm">{agent.title[locale]}</p>
              </div>
            </div>

            <p className="text-text-on-dark-muted text-sm leading-relaxed mb-8 font-light">
              {agent.bio[locale]}
            </p>

            <div className="flex items-center gap-2 text-text-on-dark-muted text-sm mb-8">
              <Briefcase className="w-4 h-4 text-gold" />
              {agent.yearsExperience} {isRTL ? "سنة خبرة" : "years experience"}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="btn-outline text-text-on-dark border-border-on-dark hover:bg-gold hover:border-gold hover:text-white flex items-center gap-2" dir="ltr">
                <Phone className="w-3.5 h-3.5" />
                {isRTL ? "اتصل" : "Call"}
              </a>
              <a href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, "")}`} className="btn-outline text-text-on-dark border-border-on-dark hover:bg-emerald-600 hover:border-emerald-600 hover:text-white flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a href={`mailto:${agent.email}`} className="btn-outline text-text-on-dark border-border-on-dark hover:bg-gold hover:border-gold hover:text-white flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>
          </motion.div>

          {/* Schedule form */}
          <motion.div variants={fadeUp}>
            <div className="bg-charcoal-light p-8 lg:p-10 border border-border-on-dark">
              <h3 className={`text-xl text-text-on-dark mb-8 ${fontHeading}`}>
                {dict.scheduleViewing}
              </h3>
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder={isRTL ? "الاسم الكامل" : "Full Name"}
                  className="w-full bg-transparent border border-border-on-dark px-4 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-muted focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder={isRTL ? "البريد الإلكتروني" : "Email Address"}
                  className="w-full bg-transparent border border-border-on-dark px-4 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-muted focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder={isRTL ? "رقم الهاتف" : "Phone Number"}
                  className="w-full bg-transparent border border-border-on-dark px-4 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-muted focus:border-gold focus:outline-none transition-colors"
                  dir="ltr"
                />
                <textarea
                  rows={4}
                  placeholder={isRTL ? "رسالتك (اختياري)" : "Your Message (optional)"}
                  className="w-full bg-transparent border border-border-on-dark px-4 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-muted focus:border-gold focus:outline-none transition-colors resize-none"
                />
                <button className="btn-primary w-full justify-center">
                  {dict.scheduleViewing}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
