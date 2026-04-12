"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { services } from "@/lib/data";
import {
  Siren,
  TestTubes,
  ScanLine,
  Pill,
  HeartPulse,
  Scissors,
  Dumbbell,
  Droplets,
  Apple,
  Truck,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Siren,
  TestTubes,
  ScanLine,
  Pill,
  HeartPulse,
  Scissors,
  Dumbbell,
  Droplets,
  Apple,
  Truck,
};

export default function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const s = dict.services;

  return (
    <>
      <PageHero
        locale={locale}
        label={s.heroLabel}
        title={s.heroTitle}
        subtitle={s.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: s.heroLabel },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-6 relative"
                >
                  {service.available24h && (
                    <span className="absolute top-4 end-4 text-xs font-semibold bg-rose/10 text-rose px-2.5 py-1 rounded-full">
                      {s.available24h}
                    </span>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                    {Icon && <Icon className="w-6 h-6 text-teal" />}
                  </div>

                  <h3
                    className={`text-lg font-bold text-ink mb-2 ${
                      isRTL ? "font-arabic-display" : "font-heading"
                    }`}
                  >
                    {service.name[locale]}
                  </h3>

                  <p className="text-ink-soft text-sm leading-relaxed">
                    {service.description[locale]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
