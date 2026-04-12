"use client";

import { motion } from "framer-motion";
import {
  Award,
  Cpu,
  Building2,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

const icons = [Award, Cpu, Building2, Clock, Shield, Sparkles];
const accents = [
  "text-teal",
  "text-navy",
  "text-teal",
  "text-navy",
  "text-teal",
  "text-navy",
];
const bgAccents = [
  "bg-teal/10",
  "bg-navy/10",
  "bg-teal/10",
  "bg-navy/10",
  "bg-teal/10",
  "bg-navy/10",
];

export default function WhyChooseUs({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["whyUs"];
}) {
  const isRTL = locale === "ar";

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">{dict.label}</span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-ink ${
              isRTL ? "font-arabic-display" : "font-heading"
            }`}
          >
            {dict.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bgAccents[i % bgAccents.length]}`}
                >
                  <Icon
                    className={`w-6 h-6 ${accents[i % accents.length]}`}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold text-ink mb-2 ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
