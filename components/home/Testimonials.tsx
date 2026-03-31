"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// ✅ مؤقتاً — اقتباس من المؤسس عن رؤية الشركة
// لما يصير عندك عملاء حقيقيين — بدّلهم بشهاداتهم
const testimonials = {
  en: [
    {
      quote: "We started DatekSys because we saw too many businesses stuck with unreliable infrastructure and generic solutions. Every network we build, every system we deploy — it's designed to work when it matters most.",
      name: "DatekSys Founder",
      role: "Our Mission",
    },
    {
      quote: "After 12 years in the field — deploying fiber, configuring OLTs, building sites from scratch — we know what works and what doesn't. That hands-on experience is something no textbook can teach.",
      name: "DatekSys Team",
      role: "Our Experience",
    },
    {
      quote: "We don't just sell technology. We partner with businesses to understand their challenges first, then build solutions that actually solve them. No upselling, no unnecessary complexity.",
      name: "DatekSys",
      role: "Our Approach",
    },
  ],
  ar: [
    {
      quote: "أسسنا DatekSys لأننا رأينا شركات كثيرة عالقة مع بنية تحتية غير موثوقة وحلول عامة. كل شبكة نبنيها، كل نظام ننشره — مصمم ليعمل عندما يكون الأمر أهم.",
      name: "مؤسس DatekSys",
      role: "مهمتنا",
    },
    {
      quote: "بعد 12 سنة في الميدان — نشر ألياف ضوئية، إعداد OLT، بناء مواقع من الصفر — نعرف ما يعمل وما لا يعمل. تلك الخبرة العملية شيء لا يمكن لأي كتاب تعليمه.",
      name: "فريق DatekSys",
      role: "خبرتنا",
    },
    {
      quote: "نحن لا نبيع تقنية فقط. نتشارك مع الشركات لفهم تحدياتهم أولاً، ثم نبني حلولاً تحلها فعلاً. بدون رفع أسعار، بدون تعقيد غير ضروري.",
      name: "DatekSys",
      role: "نهجنا",
    },
  ],
};

export default function Testimonials() {
  const t = useTranslations("hero");
  const isArabic = t("badge") !== "Enterprise IT Infrastructure Partner";
  const items = isArabic ? testimonials.ar : testimonials.en;

  return (
    <section className="section-wrapper overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px]" />

      <div className="w-full">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <p className="section-label mb-4">
            {isArabic ? "ما نؤمن به" : "What We Believe"}
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            <span className="gradient-text">
              {isArabic ? "بكلماتنا" : "In Our Words"}
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="relative group"
            >
              <div
                className="relative rounded-2xl p-8 lg:p-9 h-full flex flex-col transition-all duration-500 hover:border-accent/15"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="text-4xl font-heading font-black leading-none mb-4"
                  style={{ color: "rgba(56,189,248,0.2)" }}
                >
                  "
                </div>

                {/* Quote */}
                <p className="text-text-secondary text-sm lg:text-base leading-relaxed font-body flex-1 mb-6">
                  {item.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  {/* Avatar placeholder */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-bold"
                    style={{
                      background: "rgba(56,189,248,0.08)",
                      border: "1px solid rgba(56,189,248,0.15)",
                      color: "#38BDF8",
                    }}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-text-primary">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-muted font-body">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}