"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, ChevronDown, Calendar, Clock, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { CINEMATIC, wordRevealContainer, wordReveal } from "@/lib/animations";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["hero"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const stats = [
    {
      value: 250,
      suffix: "+",
      label: isRTL ? "أخصائي" : "Specialists",
    },
    {
      value: 45,
      suffix: "",
      label: isRTL ? "قسم طبي" : "Departments",
    },
    {
      value: 24,
      suffix: "/7",
      label: isRTL ? "طوارئ" : "Emergency",
    },
    {
      value: 98,
      suffix: "%",
      label: isRTL ? "رضا المرضى" : "Satisfaction",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 -top-20">
        <Image
          src="/demos/hospital/images/hero-bg.webp"
          alt={isRTL ? "مستشفى الحياة" : "Al-Hayat Hospital"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic Gradient Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              ${isRTL ? "225deg" : "135deg"},
              rgba(11, 27, 43, 0.92) 0%,
              rgba(11, 27, 43, 0.7) 40%,
              rgba(11, 27, 43, 0.4) 70%,
              rgba(11, 27, 43, 0.25) 100%
            )`,
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content — 3 cols */}
          <div className="lg:col-span-3">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: CINEMATIC }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                {isRTL ? "◆ مستشفى معتمد من JCI" : "◆ JCI Accredited Hospital"}
              </span>
            </motion.div>

            {/* Heading — word-by-word reveal */}
            <motion.h1
              variants={wordRevealContainer}
              initial="hidden"
              animate="visible"
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {isRTL ? (
                <>
                  <motion.span variants={wordReveal} className="inline-block me-3">
                    رعاية
                  </motion.span>
                  <motion.span variants={wordReveal} className="inline-block me-3">
                    متقدمة،
                  </motion.span>
                  <br />
                  <motion.span
                    variants={wordReveal}
                    className="inline-block me-3 font-[var(--font-serif)] italic bg-gradient-to-l from-accent to-[#E8B960] bg-clip-text text-transparent"
                  >
                    بلمسة
                  </motion.span>
                  <motion.span variants={wordReveal} className="inline-block">
                    إنسانية.
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.span variants={wordReveal} className="inline-block me-3">
                    Advanced
                  </motion.span>
                  <motion.span variants={wordReveal} className="inline-block me-3">
                    Care,
                  </motion.span>
                  <br />
                  <motion.span
                    variants={wordReveal}
                    className="inline-block me-3 font-[var(--font-serif)] italic bg-gradient-to-r from-accent to-[#E8B960] bg-clip-text text-transparent"
                  >
                    Compassionate
                  </motion.span>
                  <motion.span variants={wordReveal} className="inline-block">
                    Touch.
                  </motion.span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: CINEMATIC }}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
            >
              {dict.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: CINEMATIC }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={`${prefix}/appointments`}
                className="btn-primary text-base px-8 py-4"
              >
                {dict.ctaPrimary}
              </Link>
              <Link
                href={`${prefix}/departments`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                {isRTL ? "أقسامنا" : "Our Departments"}
              </Link>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: CINEMATIC }}
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-xl px-4 py-3 text-center"
                >
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <div className="text-xs text-white/70 mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating Appointment Card — 2 cols, desktop only */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: CINEMATIC }}
            className="hidden lg:block lg:col-span-2"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-6 shadow-2xl"
            >
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                {isRTL ? "الموعد المتاح التالي" : "Next Available"}
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center overflow-hidden">
                  <Image
                    src="/demos/hospital/images/doctors/dr-ahmad-mansour.webp"
                    alt="Doctor"
                    width={56}
                    height={56}
                    className="rounded-xl object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {isRTL ? "د. أحمد منصور" : "Dr. Ahmad Mansour"}
                  </div>
                  <div className="text-white/70 text-xs">
                    {isRTL ? "طب القلب" : "Cardiology"}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-accent text-xs font-medium">4.9</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{isRTL ? "الأحد، ٢٠ نيسان ٢٠٢٦" : "Sunday, Apr 20, 2026"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{isRTL ? "٩:٣٠ صباحاً" : "9:30 AM"}</span>
                </div>
              </div>
              <Link
                href={`${prefix}/appointments`}
                className="btn-primary w-full text-sm justify-center"
              >
                {isRTL ? "احجز الآن" : "Book Now"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          {isRTL ? "اكتشف المزيد" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
