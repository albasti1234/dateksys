"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export default function Testimonials({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["testimonials"];
}) {
  const isRTL = locale === "ar";

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">{dict.label}</span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-ink ${
              isRTL ? "font-arabic-display" : "font-heading"
            }`}
          >
            {dict.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dict.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 relative"
            >
              <Quote className="w-8 h-8 text-teal/20 absolute top-4 end-4" />
              <p className="text-ink-soft leading-relaxed mb-5 text-sm">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p
                    className={`font-semibold text-ink text-sm ${
                      isRTL ? "font-arabic-display" : "font-heading"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-ink-muted">{item.condition}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
