"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// ============================================
// Reusable page hero for inner pages
// ============================================

export default function PageHero({
  label,
  title,
  subtitle,
  breadcrumbs = [],
  image,
}: {
  label: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  image?: string;
}) {
  return (
    <section
      className="relative bg-[var(--color-navy)] text-white overflow-hidden"
      style={{ minHeight: 420 }}
    >
      {/* Background image if provided */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #C19A4B 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold gradient glow */}
      <div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 -translate-y-1/2 pointer-events-none"
        style={{ background: "#C19A4B" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs text-white/50 mb-6"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-[var(--color-gold)]">
            <Home className="w-3 h-3" />
            Home
          </Link>
          {breadcrumbs.map((b) => (
            <span key={b.label} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3" />
              {b.href ? (
                <Link href={b.href} className="hover:text-[var(--color-gold)]">
                  {b.label}
                </Link>
              ) : (
                <span className="text-[var(--color-gold-light)]">{b.label}</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-label !text-[var(--color-gold)] mb-4"
        >
          {label}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 h-px origin-left"
          style={{
            background: "linear-gradient(90deg, #C19A4B, transparent)",
            width: 180,
          }}
        />
      </div>
    </section>
  );
}
