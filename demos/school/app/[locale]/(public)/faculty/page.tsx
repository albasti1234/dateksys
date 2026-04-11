"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { GraduationCap, Globe, Award } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const portraits = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
  "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&q=80",
];

const statIcons = [GraduationCap, Globe, Award];

export default function FacultyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const f = dict.pages.faculty;
  const isRTL = locale === "ar";

  const [activeDept, setActiveDept] = useState<string>("all");

  const filtered =
    activeDept === "all"
      ? f.members
      : f.members.filter((m) => m.department === activeDept);

  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)] mb-1"
    : "font-serif text-xl font-bold text-[var(--color-navy)] mb-1";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={f.hero.label}
        title={f.hero.title}
        subtitle={f.hero.subtitle}
        breadcrumbs={[{ label: f.hero.breadcrumb }]}
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
      />

      <section className="py-16 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {f.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <div key={s.label} className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[var(--color-navy)] flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-[var(--color-gold)]" />
                </div>
                <div>
                  <div
                    className={`text-4xl font-bold text-[var(--color-navy)] ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm tracking-wider text-[var(--color-ink-soft)]">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setActiveDept("all")}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wider border transition-all ${
                activeDept === "all"
                  ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                  : "bg-white text-[var(--color-ink)] border-[var(--color-border)] hover:bg-[var(--color-navy)] hover:text-white"
              }`}
            >
              {f.departments.all}
            </button>
            {f.departments.items.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveDept(d.key)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider border transition-all ${
                  activeDept === d.key
                    ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                    : "bg-white text-[var(--color-ink)] border-[var(--color-border)] hover:bg-[var(--color-navy)] hover:text-white"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((member, i) => {
              const imgIdx = f.members.indexOf(member);
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                  className="academic-card overflow-hidden group"
                >
                  <div
                    className="h-72 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('${portraits[imgIdx % portraits.length]}')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className={cardTitleClass}>{member.name}</h3>
                    <p className="text-xs tracking-wider text-[var(--color-gold)] font-semibold mb-4">
                      {member.role}
                    </p>
                    <div className="pt-4 border-t border-[var(--color-border-soft)] space-y-2 text-xs text-[var(--color-ink-soft)]">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3 h-3 text-[var(--color-gold)] shrink-0" />
                        {member.education}
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 text-[var(--color-gold)] shrink-0" />
                        {member.experience}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
