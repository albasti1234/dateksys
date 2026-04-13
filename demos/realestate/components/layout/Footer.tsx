"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { fadeUp, stagger, viewport } from "@/lib/animations";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["footer"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <footer className="bg-charcoal text-text-on-dark">
      {/* Gold accent line */}
      <div className="h-px bg-gold/20" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20 lg:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="mb-6">
              <div className={`text-2xl font-medium tracking-tight ${fontHeading}`}>
                {isRTL ? "دار" : "DAR"}
              </div>
              <div className="text-[9px] font-light tracking-[0.4em] uppercase text-text-on-dark-muted">
                {isRTL ? "المسكن" : "AL-MASKAN"}
              </div>
            </div>
            <p className="text-sm text-text-on-dark-muted leading-relaxed max-w-xs">
              {dict.tagline}
            </p>
          </motion.div>

          {/* Properties */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-text-on-dark-muted mb-6">
              {dict.properties}
            </h4>
            <div className="flex flex-col gap-3">
              <Link href={`${prefix}/properties`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "جميع العقارات" : "All Properties"}
              </Link>
              <Link href={`${prefix}/properties`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "فلل" : "Villas"}
              </Link>
              <Link href={`${prefix}/properties`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "شقق" : "Apartments"}
              </Link>
              <Link href={`${prefix}/properties`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "بنتهاوس" : "Penthouses"}
              </Link>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-text-on-dark-muted mb-6">
              {dict.company}
            </h4>
            <div className="flex flex-col gap-3">
              <Link href={`${prefix}/about`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "عن الدار" : "About Us"}
              </Link>
              <Link href={`${prefix}/services`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "خدماتنا" : "Services"}
              </Link>
              <Link href={`${prefix}/journal`} className="text-sm text-text-on-dark/70 hover:text-gold transition-colors">
                {isRTL ? "المجلة" : "Journal"}
              </Link>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-text-on-dark-muted mb-6">
              {dict.contact}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-text-on-dark/70">
              <p>{dict.address}</p>
              <a href="tel:+96265550000" className="hover:text-gold transition-colors" dir="ltr">
                +962 6 555 0000
              </a>
              <a href="mailto:hello@darmaskan.jo" className="hover:text-gold transition-colors" dir="ltr">
                hello@darmaskan.jo
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-on-dark flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-on-dark-muted">
            © {new Date().getFullYear()} Dar Al-Maskan. {dict.rights}.
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
              <button key={i} className="text-text-on-dark-muted hover:text-gold transition-colors">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
