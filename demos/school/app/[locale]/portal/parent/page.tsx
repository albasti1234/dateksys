"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Calendar,
  BookOpen,
  Bus,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const statIcons = [TrendingUp, Calendar, BookOpen, Clock];
const statColors = ["#2D8659", "#4A90E2", "#C19A4B", "#0F2C5C"];
const quickActionIcons = [CreditCard, Bus, MessageSquare, Sparkles];
const quickActionColors = ["#C19A4B", "#4A90E2", "#2D8659", "#0F2C5C"];

export default function ParentDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.parent.dashboard;
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

  const childAvatar =
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80";

  return (
    <div className="p-6 lg:p-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <Sparkles className="w-3 h-3" />
          <span>{p.welcomeTemplate}</span>
        </div>
        <h1 className={h1Class}>{p.subtitle}</h1>
      </motion.div>

      {/* Child card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[var(--color-navy)] text-white p-8 mb-8 relative overflow-hidden"
      >
        <div
          className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "#C19A4B" }}
        />
        <div className="absolute top-0 start-0 w-20 h-20 border-t-2 border-s-2 border-[var(--color-gold)] pointer-events-none" />
        <div className="relative flex items-center gap-6 flex-wrap">
          <div
            className="w-24 h-24 rounded-full bg-cover bg-center border-4 shrink-0"
            style={{
              backgroundImage: `url('${childAvatar}')`,
              borderColor: "#C19A4B",
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="section-label !text-[var(--color-gold)] mb-2">
              {p.childProfile.viewing}
            </p>
            <h2
              className={`text-3xl font-bold mb-1 ${
                isRTL ? "font-arabic-display" : "font-serif"
              }`}
            >
              {p.childProfile.name}
            </h2>
            <div className="flex items-center gap-3 text-sm text-white/70 flex-wrap">
              <span>{p.childProfile.grade}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="inline-flex items-center gap-1 text-[var(--color-gold-light)]">
                <CheckCircle2 className="w-3 h-3" /> {p.childProfile.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {p.stats.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden group hover:shadow-xl transition-all"
            >
              <div
                className="absolute top-0 end-0 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: statColors[i] }}
              />
              <div className="relative flex items-start justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: statColors[i] }} />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: statColors[i] }}
                />
              </div>
              <div className="relative">
                <div className={bigNumClass}>{stat.value}</div>
                <div className="text-xs tracking-wider font-semibold text-[var(--color-ink)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent grades */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <div>
              <h3 className={cardTitleClass}>{p.recentGrades.title}</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                {p.recentGrades.subtitle}
              </p>
            </div>
            <Link
              href={`/${locale}/portal/parent/grades`}
              className="text-xs font-semibold tracking-wider text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] flex items-center gap-1"
            >
              {dict.common.viewAll}{" "}
              <ArrowRight
                className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`}
              />
            </Link>
          </div>
          <div>
            {p.recentGrades.items.map((g, i) => (
              <div
                key={g.subject}
                className={`p-5 flex items-center justify-between gap-4 ${
                  i < p.recentGrades.items.length - 1
                    ? "border-b border-[var(--color-border-soft)]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className="w-12 h-12 flex items-center justify-center font-serif text-lg font-bold shrink-0"
                    style={{ background: "#2D8659", color: "white" }}
                  >
                    <span className="num">{g.score}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[var(--color-navy)] truncate">
                      {g.subject}
                    </div>
                    <div className="text-xs text-[var(--color-ink-soft)] truncate">
                      {g.teacher}
                    </div>
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <div className="text-[10px] tracking-wider text-[var(--color-ink-soft)]">
                    {g.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className={cardTitleClass}>{p.upcoming.title}</h3>
          </div>
          <div className="p-4 space-y-3">
            {p.upcoming.items.map((e) => (
              <div
                key={e.title}
                className="p-4 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]"
              >
                <div className="font-semibold text-sm text-[var(--color-navy)] mb-1">
                  {e.title}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)] flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {e.date} · {e.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h3 className={`${cardTitleClass} mb-4`}>{p.quickActions.title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {p.quickActions.items.map((action, i) => {
            const Icon = quickActionIcons[i];
            return (
              <Link
                key={action.label}
                href={`/${locale}${action.href}`}
                className="p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all flex flex-col items-center text-center group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ background: quickActionColors[i] }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-sm text-[var(--color-navy)]">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Notification banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-navy-light)] text-white flex items-center gap-5 flex-wrap"
      >
        <div className="w-12 h-12 bg-[var(--color-gold)] flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-lg font-bold mb-1 ${
              isRTL ? "font-arabic-display" : "font-serif"
            }`}
          >
            {p.feesDue.title}
          </div>
          <p className="text-sm text-white/70">
            <span className="font-semibold">{p.feesDue.amount}</span> · {p.feesDue.dueDate}
          </p>
        </div>
        <Link
          href={`/${locale}/portal/parent/fees`}
          className="btn-gold !border-[var(--color-gold)] !bg-[var(--color-gold)] !text-white"
        >
          {p.feesDue.button}
        </Link>
      </motion.div>
    </div>
  );
}
