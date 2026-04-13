"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Stethoscope, Cpu, HeartHandshake, Siren, CheckCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { fadeUp, stagger, imageReveal, viewport, getSlideDirection } from "@/lib/animations";

const features = [
  { icon: Stethoscope, key: "specialists" as const },
  { icon: Cpu, key: "technology" as const },
  { icon: HeartHandshake, key: "patientFirst" as const },
  { icon: Siren, key: "emergency" as const },
];

export default function WhyChooseUs({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["whyUs"];
}) {
  const isRTL = locale === "ar";
  const slideDir = getSlideDirection(isRTL);

  return (
    <section className="py-24 lg:py-32 bg-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image — left on LTR, right on RTL */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <Image
              src="/demos/hospital/images/doctor-patient.webp"
              alt={isRTL ? "طبيب يشرح لمريضة" : "Doctor explaining to patient"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Accent overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy/60 to-transparent" />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-6 start-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <div className="text-sm font-bold text-text-primary">30+</div>
                  <div className="text-xs text-text-secondary">
                    {isRTL ? "سنوات من التميز" : "Years of Excellence"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content — right on LTR, left on RTL */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.span variants={fadeUp} className="section-label">
              {dict.label}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className={`text-3xl lg:text-4xl font-bold text-text-primary mb-4 ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {dict.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-text-body mb-10 leading-relaxed"
            >
              {dict.subtitle}
            </motion.p>

            <div className="space-y-6">
              {features.map((feat) => {
                const Icon = feat.icon;
                const item = dict.features[feat.key];
                return (
                  <motion.div
                    key={feat.key}
                    variants={fadeUp}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-text-primary mb-1 ${
                        isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
