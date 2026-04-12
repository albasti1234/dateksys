"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["hero"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-gradient-to-br from-navy via-navy-dark to-teal-dark overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-sky/10 blur-3xl" />
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-white/5" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border border-white/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          {/* Emergency badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/15 border border-rose/30 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose" />
            </span>
            <ShieldCheck className="w-4 h-4 text-rose" />
            <span className="text-sm font-semibold text-rose">
              {dict.emergencyLabel}
            </span>
            <span className="text-sm font-bold text-white" dir="ltr">
              {dict.emergencyPhone}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 ${
              isRTL ? "font-arabic-display" : "font-heading"
            }`}
          >
            {dict.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            {dict.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`${prefix}/appointments`}
              className="btn-primary text-base px-8 py-4"
            >
              {dict.ctaPrimary}
            </Link>
            <Link
              href={`${prefix}/doctors`}
              className="btn-outline text-base px-8 py-4 !text-white !border-white/40 hover:!bg-white hover:!text-navy"
            >
              {dict.ctaSecondary}
            </Link>
          </motion.div>

          {/* Phone line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-2 text-white/60"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm" dir="ltr">
              {dict.emergencyPhone}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
