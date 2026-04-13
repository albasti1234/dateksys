"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { SILK, viewport } from "@/lib/animations";

export default function CTASection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["cta"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <section className="relative min-h-[60vh] flex items-center bg-surface-dark overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 opacity-[0.15]">
        <Image
          src="/demos/realestate/images/cta-bg.webp"
          alt=""
          fill
          className="object-cover blur-sm"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-8 md:px-16 lg:px-24 text-center py-32">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: SILK }}
          className={`text-text-on-dark mb-6 ${fontHeading}`}
        >
          {dict.title}{" "}
          <em className="italic text-gold-light">{dict.titleAccent}.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: SILK }}
          className="text-text-on-dark-muted text-lg mb-10 font-light leading-relaxed"
        >
          {dict.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.2, ease: SILK }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href={`${prefix}/contact`} className="btn-primary">
            {dict.button}
          </Link>
          <a
            href={`tel:${dict.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-gold text-sm font-light hover:text-gold-light transition-colors"
            dir="ltr"
          >
            <Phone className="w-4 h-4" />
            {dict.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
