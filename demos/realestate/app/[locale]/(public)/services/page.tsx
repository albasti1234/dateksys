"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Home, TrendingUp, Key, FileText, Building2, HandshakeIcon } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const services = [
    { icon: Home, title: { ar: "بيع وشراء العقارات", en: "Property Sales & Acquisition" }, desc: { ar: "نساعدك في بيع أو شراء عقارك بأفضل سعر مع استشارة مجانية كاملة.", en: "We help you sell or buy your property at the best price with full free consultation." } },
    { icon: TrendingUp, title: { ar: "استشارات استثمارية", en: "Investment Advisory" }, desc: { ar: "تحليل سوقي متعمق وتوصيات استثمارية مبنية على بيانات حقيقية.", en: "In-depth market analysis and investment recommendations based on real data." } },
    { icon: Key, title: { ar: "إدارة العقارات", en: "Property Management" }, desc: { ar: "إدارة كاملة لعقاراتك من التأجير والصيانة والتحصيل.", en: "Complete management of your properties from leasing, maintenance, and collection." } },
    { icon: FileText, title: { ar: "تقييم العقارات", en: "Property Valuation" }, desc: { ar: "تقييم دقيق ومعتمد من خبراء معتمدين لتحديد القيمة الحقيقية.", en: "Accurate certified valuation by accredited experts to determine true value." } },
    { icon: Building2, title: { ar: "تطوير عقاري", en: "Property Development" }, desc: { ar: "من المفهوم إلى التسليم — نشرف على كل مرحلة من مراحل التطوير.", en: "From concept to delivery — we oversee every stage of development." } },
    { icon: HandshakeIcon, title: { ar: "استشارات قانونية", en: "Legal Consultation" }, desc: { ar: "فريق قانوني متخصص لضمان سلامة كل معاملة عقارية.", en: "Specialized legal team to ensure the safety of every real estate transaction." } },
  ];

  return (
    <>
      <section className="bg-surface-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: SILK }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{dict.nav.services}</span>
            </div>
            <h1 className={`text-text-on-dark ${fontHeading}`}>
              {isRTL ? "خدمات مصممة " : "Services Designed for "}
              <em className="italic text-gold-light">{isRTL ? "لك" : "You"}</em>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeUp} className="p-8 border border-border hover:border-border-gold transition-colors duration-500 group">
                <div className="w-12 h-12 bg-gold-subtle flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <service.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className={`text-lg mb-3 ${fontHeading}`}>{service.title[locale]}</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-light">{service.desc[locale]}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
