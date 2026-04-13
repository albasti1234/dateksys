"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  imageUrl,
}: {
  locale: Locale;
  label?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  imageUrl?: string;
}) {
  const isRTL = locale === "ar";
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section className="relative overflow-hidden bg-navy min-h-[40vh] flex items-center">
      {/* Background Image with Parallax */}
      {imageUrl ? (
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-teal to-navy" />
      )}

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy w-full h-full opacity-80" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-white/70">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span className="mx-1 text-white/40">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-accent transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        <div className="max-w-3xl">
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-block text-xs font-bold tracking-[0.15em] uppercase text-accent mb-4"
            >
              {label}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${
              isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
            }`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
