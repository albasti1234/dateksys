"use client";

import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

const avatarColors = [
  "bg-teal",
  "bg-navy",
  "bg-sky",
  "bg-emerald",
  "bg-rose",
  "bg-amber-500",
];

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
          {dict.items.map((item, i) => {
            const initials = item.name
              .split(" ")
              .filter((w) => w.length > 1)
              .map((w) => w[0])
              .slice(0, 2)
              .join("");

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6 relative"
              >
                <Quote className="w-8 h-8 text-teal/30 absolute top-4 end-4" />

                {/* Star rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <p className="text-ink-soft leading-relaxed mb-5 text-sm">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        avatarColors[i % avatarColors.length]
                      }`}
                    >
                      {initials}
                    </div>
                    <div>
                      <p
                        className={`font-semibold text-ink text-sm ${
                          isRTL ? "font-arabic-display" : "font-heading"
                        }`}
                      >
                        {item.name}
                      </p>
                      <p className="text-sm text-teal font-medium">
                        {item.condition}
                      </p>
                    </div>
                  </div>
                  {/* Verified badge */}
                  <div className="flex items-center gap-1 text-teal text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isRTL ? "مريض موثق" : "Verified Patient"}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
