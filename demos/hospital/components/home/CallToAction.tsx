"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { viewport, CINEMATIC } from "@/lib/animations";

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
    <section className="relative min-h-[400px] py-28 lg:py-36 overflow-hidden flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/demos/hospital/images/cta-bg.webp"
          alt="Al-Hayat Hospital Interior"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-navy/95" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: CINEMATIC }}
          className={`text-4xl md:text-5xl font-bold text-white mb-6 ${
            isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
          }`}
        >
          {dict.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: CINEMATIC }}
          className="text-xl text-white/80 mb-12 max-w-xl mx-auto"
        >
          {dict.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.2, ease: CINEMATIC }}
        >
          <Link
            href={`${prefix}/appointments`}
            className="btn-primary text-lg px-12 py-5 shadow-xl hover:shadow-2xl transition-shadow"
          >
            {dict.button}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
