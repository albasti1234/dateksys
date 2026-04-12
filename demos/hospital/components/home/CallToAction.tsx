"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, CalendarPlus } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export default function CallToAction({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["cta"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-teal to-teal-dark overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-white/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl lg:text-4xl font-bold text-white mb-4 ${
            isRTL ? "font-arabic-display" : "font-heading"
          }`}
        >
          {dict.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/80 mb-8 max-w-xl mx-auto"
        >
          {dict.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`${prefix}/appointments`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal font-semibold rounded-xl hover:bg-white/90 transition-colors"
          >
            <CalendarPlus className="w-5 h-5" />
            {dict.button}
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-white/70 flex items-center justify-center gap-2 text-sm"
        >
          <Phone className="w-4 h-4" />
          <span>{dict.phone}</span>
        </motion.p>
      </div>
    </section>
  );
}
