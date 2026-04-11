"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Flame, Clock, Sparkles, ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const statIcons = [Trophy, Trophy, Flame, Trophy];
const statColors = ["#C19A4B", "#DC2626", "#4A90E2", "#2D8659"];
const badges = [
  { icon: "🏆", unlocked: true },
  { icon: "🌅", unlocked: true },
  { icon: "📚", unlocked: true },
];

export default function StudentDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const s = dict.portals.student.dashboard;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-4xl font-bold text-[var(--color-navy)]"
    : "font-serif text-4xl font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <Sparkles className="w-3 h-3" />
          <span>{s.welcome}</span>
        </div>
        <h1 className={h1Class}>{s.subtitle}</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">{s.today}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {s.stats.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden"
            >
              <div
                className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10"
                style={{ background: statColors[i] }}
              />
              <div className="relative">
                <Icon className="w-5 h-5 mb-3" style={{ color: statColors[i] }} />
                <div className={bigNumClass}>{stat.value}</div>
                <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)] mt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today schedule */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className={cardTitleClass}>{s.schedule.title}</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">
              {s.schedule.subtitle} · {s.schedule.nextUp}
            </p>
          </div>
          <div>
            {s.schedule.items.map((c, i) => (
              <div
                key={c.time + c.subject}
                className={`p-5 flex items-center gap-5 ${
                  i < s.schedule.items.length - 1
                    ? "border-b border-[var(--color-border-soft)]"
                    : ""
                }`}
              >
                <div className="w-14 h-14 flex flex-col items-center justify-center shrink-0 bg-[var(--color-cream)]">
                  <div
                    className={`text-sm font-bold text-[var(--color-navy)] ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    <span className="num">{c.time}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[var(--color-navy)]">
                    {c.subject}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)]">
                    {c.room} · {c.teacher}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className={cardTitleClass}>{s.achievements.title}</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">
              {s.achievements.subtitle}
            </p>
          </div>
          <div className="p-4 space-y-3">
            {s.achievements.items.map((a, i) => (
              <div
                key={a.title}
                className="p-4 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0">{badges[i]?.icon}</div>
                  <div>
                    <div className="font-semibold text-sm text-[var(--color-navy)]">
                      {a.title}
                    </div>
                    <div className="text-[10px] text-[var(--color-ink-soft)] mt-1">
                      {a.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homework */}
      <div className="mt-8 bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className={cardTitleClass}>{s.homework.title}</h3>
          <Link
            href={`/${locale}/portal/student/homework`}
            className="text-xs font-semibold tracking-wider text-[var(--color-gold)] flex items-center gap-1"
          >
            {dict.common.viewAll}{" "}
            <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
        <div>
          {s.homework.items.map((h, i) => (
            <div
              key={i}
              className={`p-5 flex items-center gap-5 ${
                i < s.homework.items.length - 1
                  ? "border-b border-[var(--color-border-soft)]"
                  : ""
              }`}
            >
              <div className="w-1 h-12 bg-[var(--color-gold)]" />
              <div className="flex-1">
                <div className="text-xs font-bold tracking-wider text-[var(--color-gold)] mb-1">
                  {h.subject}
                </div>
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  {h.task}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] shrink-0">
                <Clock className="w-3 h-3" />
                {h.due}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
