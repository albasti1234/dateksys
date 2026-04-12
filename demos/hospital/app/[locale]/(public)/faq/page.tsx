"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <>
      <PageHero
        locale={locale}
        label={faq.heroLabel}
        title={faq.heroTitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: faq.heroLabel },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="space-y-4">
            {faq.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center gap-4 p-5 text-start transition-colors ${
                    openIndex === i ? "bg-teal/5" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 text-teal" />
                  </div>
                  <span
                    className={`flex-1 font-semibold text-ink text-sm ${
                      isRTL ? "font-arabic-display" : "font-heading"
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 ps-17">
                        <p className="text-sm text-ink-soft leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="card p-8">
              <MessageSquare className="w-10 h-10 text-teal mx-auto mb-4" />
              <h3
                className={`text-xl font-bold text-ink mb-2 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {isRTL
                  ? "لا تزال لديك أسئلة؟"
                  : "Still have questions?"}
              </h3>
              <p className="text-sm text-ink-soft mb-5">
                {isRTL
                  ? "تواصل معنا وسنكون سعداء بمساعدتك"
                  : "Contact us and we'll be happy to help"}
              </p>
              <Link href={`/${locale}/contact`} className="btn-primary">
                {dict.common.contactUs}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
