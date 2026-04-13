"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const stats = [
    { value: 250, suffix: "+", label: isRTL ? "عقار فاخر" : "Premium Properties" },
    { value: 15, suffix: "", label: isRTL ? "سنة من التميز" : "Years of Excellence" },
    { value: 98, suffix: "%", label: isRTL ? "رضا العملاء" : "Client Satisfaction" },
    { value: 12, suffix: "", label: isRTL ? "مستشار عقاري" : "Property Advisors" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: SILK }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{isRTL ? "عن الدار" : "About"}</span>
            </div>
            <h1 className={`text-text-on-dark max-w-3xl ${fontHeading}`}>
              {isRTL ? "نحن لا نبيع عقارات. نحن نختار " : "We Don't Sell Properties. We Curate "}
              <em className="italic text-gold-light">{isRTL ? "حياة." : "Lives."}</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.p variants={fadeUp} className="text-xl text-text-body leading-relaxed font-light mb-12">
              {isRTL
                ? "تأسست دار المسكن عام ٢٠١١ في عمّان بهدف واحد: تغيير الطريقة التي يبحث بها الناس عن منازلهم. نؤمن أن المنزل ليس مجرد جدران وسقف — بل هو المكان الذي تُصنع فيه الذكريات، وتبدأ منه القصص."
                : "Dar Al-Maskan was founded in 2011 in Amman with a single purpose: to change the way people search for their homes. We believe a home isn't just walls and a roof — it's where memories are made and stories begin."}
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-text-secondary leading-relaxed font-light">
              {isRTL
                ? "على مدار ١٥ عاماً، ساعدنا مئات العائلات في العثور على المكان المثالي. فريقنا من المستشارين العقاريين المحترفين يعمل بشغف لفهم احتياجاتك وتقديم تجربة استثنائية من أول زيارة حتى استلام المفتاح."
                : "Over 15 years, we've helped hundreds of families find their perfect place. Our team of professional property advisors works passionately to understand your needs and deliver an exceptional experience from the first visit to handing over the keys."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-surface-warm">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-4xl lg:text-5xl text-gold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-text-secondary uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
