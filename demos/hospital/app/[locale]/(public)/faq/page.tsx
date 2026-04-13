"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { fadeUp, stagger } from "@/lib/animations";
import { ChevronDown, MessageSquare, PhoneCall, HandHeart } from "lucide-react";

export default function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const faq = dict.faq;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <>
      <PageHero
        locale={locale}
        label={faq.heroLabel}
        title={faq.heroTitle}
        imageUrl="/demos/hospital/images/hospital_about.png"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: faq.heroLabel },
        ]}
      />

      <section className="py-24 bg-gray-50 min-h-[60vh] relative">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-teal/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-12">
            
            {/* Sidebar Intro Context */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8"
            >
              <motion.div variants={fadeUp}>
                <div className="w-16 h-16 rounded-2xl bg-teal flex items-center justify-center mb-8 shadow-lg shadow-teal/20">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold text-navy mb-4 ${fontHeading}`}>
                  {isRTL ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
                </h2>
                <p className="text-lg text-ink-soft leading-relaxed">
                  {isRTL 
                    ? "لقد قمنا بتجميع الإجابات على الأسئلة الأكثر شيوعاً. إذا لم تجد ما تبحث عنه، فلا تتردد في التواصل معنا مباشرة." 
                    : "We have compiled answers to the most common questions. If you can't find what you're looking for, feel free to contact us directly."}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-navy/5">
                <h3 className={`text-xl font-bold text-navy mb-6 ${fontHeading}`}>
                  {isRTL ? "ابحث عن المزيد من الدعم" : "Need More Support?"}
                </h3>
                <div className="space-y-4">
                  <Link href={`/${locale}/contact`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">{dict.common.contactUs}</p>
                      <p className="text-sm text-ink-muted group-hover:text-teal transition-colors">
                        {isRTL ? "تحدث إلى فريق المساعدة" : "Speak to our help desk"}
                      </p>
                    </div>
                  </Link>

                  <Link href={`/${locale}/departments`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-accent group-hover:text-navy transition-all duration-300">
                      <HandHeart className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">{isRTL ? "الأقسام والخدمات" : "Departments & Services"}</p>
                      <p className="text-sm text-ink-muted group-hover:text-accent transition-colors">
                        {isRTL ? "تصفح خدماتنا الطبية" : "Browse our medical services"}
                      </p>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Accordions */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {faq.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                      openIndex === i ? "border-teal shadow-lg shadow-teal/5" : "border-gray-100 hover:border-teal/30 hover:shadow-md"
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-6 sm:p-8 text-start"
                    >
                      <span
                        className={`text-lg sm:text-xl font-bold pr-4 ${openIndex === i ? "text-teal" : "text-navy group-hover:text-teal transition-colors"} ${fontHeading}`}
                      >
                        {item.question}
                      </span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        openIndex === i ? "bg-teal text-white" : "bg-gray-50 text-ink-muted"
                      }`}>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-500 ${
                            openIndex === i ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-8 pt-0">
                            <p className="text-base sm:text-lg text-ink-soft leading-relaxed border-t border-gray-100 pt-6">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
