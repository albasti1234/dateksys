"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";

type Breadcrumb = {
  label: string;
  href?: string;
};

export default function PageHero({
  locale,
  label,
  title,
  subtitle,
  breadcrumbs,
}: {
  locale: Locale;
  label?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
}) {
  const isRTL = locale === "ar";

  return (
    <section className="relative bg-gradient-to-br from-teal to-navy overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-white/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="mb-6"
        >
          <ol className="flex items-center gap-2 text-sm text-white/70">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className={isRTL ? "rotate-180" : ""}>/</span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {label && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-light mb-3"
          >
            {label}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`text-3xl lg:text-5xl font-bold text-white mb-4 ${
            isRTL ? "font-arabic-display" : "font-heading"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-white/80 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
