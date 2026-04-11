"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Camera,
  TrendingUp,
  ClipboardList,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const statIcons = [Users, Calendar, ClipboardList, BookOpen];
const statColors = ["#4A90E2", "#C19A4B", "#2D8659", "#0F2C5C"];
const quickIcons = [Camera, BookOpen, ClipboardList, Users];

export default function TeacherDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.teacher.dashboard;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-4xl font-bold text-[var(--color-navy)] mb-1"
    : "font-serif text-4xl font-bold text-[var(--color-navy)] mb-1";

  return (
    <div className="p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="section-label mb-3">{t.welcome}</p>
        <h1 className={h1Class}>{t.subtitle}</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">{t.today}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {t.stats.map((s, i) => {
          const Icon = statIcons[i];
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)]"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: statColors[i] }} />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: statColors[i] }}
                />
              </div>
              <div className={bigNumClass}>{s.value}</div>
              <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink)]">
                {s.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's classes */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className={cardTitleClass}>{t.classes.title}</h3>
            <Link
              href={`/${locale}/portal/teacher`}
              className="text-xs font-semibold tracking-wider text-[var(--color-gold)] flex items-center gap-1"
            >
              {t.classes.viewSchedule}{" "}
              <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
          <div>
            {t.classes.items.map((c, i) => (
              <div
                key={c.time}
                className={`p-5 flex items-center gap-5 ${
                  i < t.classes.items.length - 1
                    ? "border-b border-[var(--color-border-soft)]"
                    : ""
                }`}
              >
                <div className="text-center shrink-0">
                  <div
                    className={`text-lg font-bold text-[var(--color-navy)] ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    <span className="num">{c.time.split(" ")[0]}</span>
                  </div>
                </div>
                <div className="w-px h-12 bg-[var(--color-border)]" />
                <div className="flex-1">
                  <div className="font-semibold text-[var(--color-navy)] mb-1">
                    {c.subject}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)]">
                    {c.grade} · {c.room}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className={cardTitleClass}>{t.activities.title}</h3>
          </div>
          <div className="p-4 space-y-3">
            {t.activities.items.map((a, i) => (
              <div
                key={i}
                className="p-4 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]"
              >
                <div className="text-sm text-[var(--color-navy)] mb-1">
                  {a.text}
                </div>
                <div className="text-[10px] text-[var(--color-ink-soft)]">
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h3 className={`${cardTitleClass} mb-4`}>{t.actions.title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.actions.items.map((a, i) => {
            const Icon = quickIcons[i];
            return (
              <Link
                key={a.label}
                href={`/${locale}${a.href}`}
                className="p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                </div>
                <span className="font-semibold text-sm text-[var(--color-navy)]">
                  {a.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
