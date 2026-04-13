"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { fadeUp, viewport, CINEMATIC } from "@/lib/animations";

const testimonials = [
  {
    id: "1",
    name: { ar: "أحمد الشمايلة", en: "Ahmad Al-Shamayleh" },
    treatment: { ar: "جراحة القلب", en: "Heart Surgery" },
    quote: {
      ar: "الفريق الطبي في المركز الطبي الملكي أنقذ حياتي. من لحظة دخولي كان الجميع محترفين ومتعاطفين. أنصح بشدة بهذا المركز.",
      en: "The medical team at Royal Medical Center saved my life. From the moment I walked in, everyone was professional and compassionate. I highly recommend this center.",
    },
    rating: 5,
  },
  {
    id: "2",
    name: { ar: "سارة الخالدي", en: "Sara Al-Khalidi" },
    treatment: { ar: "طب الأطفال", en: "Pediatrics" },
    quote: {
      ar: "د. لينا الحسيني اعتنت بابنتي كأنها ابنتها. الاهتمام والرعاية التي تلقيناها كانت استثنائية بكل المقاييس.",
      en: "Dr. Lina Al-Husseini cared for my daughter as if she were her own. The attention and care we received was exceptional by every measure.",
    },
    rating: 5,
  },
  {
    id: "3",
    name: { ar: "محمد العبادي", en: "Mohammad Al-Abbadi" },
    treatment: { ar: "جراحة العظام", en: "Orthopedic Surgery" },
    quote: {
      ar: "بعد عملية استبدال الركبة، عدت للمشي خلال أسابيع. الدكتور خالد والفريق كانوا رائعين من التشخيص حتى إعادة التأهيل.",
      en: "After my knee replacement, I was walking again within weeks. Dr. Khaled and the team were amazing from diagnosis through rehabilitation.",
    },
    rating: 5,
  },
];

export default function Testimonials({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["testimonials"];
}) {
  const isRTL = locale === "ar";
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-24 lg:py-32 bg-surface-dark overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: CINEMATIC }}
          className="text-center"
        >
          <span className="section-label-on-dark">{dict.label}</span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-text-on-dark mb-16 ${
              isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
            }`}
          >
            {dict.title}
          </h2>
        </motion.div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: CINEMATIC }}
              className="text-center"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />

              {/* Quote text */}
              <blockquote
                className={`text-xl md:text-2xl lg:text-3xl text-text-on-dark leading-relaxed mb-8 max-w-3xl mx-auto ${
                  isRTL
                    ? "font-[var(--font-arabic-heading)]"
                    : "font-[var(--font-serif)] italic"
                }`}
              >
                &ldquo;{t.quote[locale]}&rdquo;
              </blockquote>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Patient info */}
              <div className="text-text-on-dark font-semibold">
                {t.name[locale]}
              </div>
              <div className="text-text-on-dark-secondary text-sm">
                {t.treatment[locale]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
