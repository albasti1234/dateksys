"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Globe, HeartPulse } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const accreditations = [
  { icon: ShieldCheck, name: "JCI", full: "Joint Commission International" },
  { icon: Globe, name: "WHO", full: "World Health Organization" },
  { icon: Award, name: "MOH", full: "Ministry of Health — Jordan" },
  { icon: HeartPulse, name: "ISO 9001", full: "Quality Management System" },
];

export default function AccreditationsStrip({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";

  return (
    <section className="py-16 border-t border-b border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={fadeUp}
            className="section-label mb-8"
          >
            {isRTL ? "معتمدون ومعترف بنا" : "Recognized & Accredited"}
          </motion.span>

          <motion.div
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {accreditations.map((acc) => (
              <motion.div
                key={acc.name}
                variants={fadeUp}
                className="group flex flex-col items-center gap-2 cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-text-primary/[0.04] flex items-center justify-center opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:bg-primary-subtle">
                  <acc.icon className="w-7 h-7 text-text-secondary group-hover:text-primary transition-colors duration-500" />
                </div>
                <span className="text-xs font-bold text-text-muted group-hover:text-text-primary transition-colors duration-500">
                  {acc.name}
                </span>
                <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center max-w-[120px]">
                  {acc.full}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
