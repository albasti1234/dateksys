"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Star, Lock, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";

type AchievementCategory = "all" | "academic" | "attendance" | "social" | "special";

interface Achievement {
  id: number;
  emoji: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  category: AchievementCategory;
  unlocked: boolean;
  progress: number;
  total: number;
  xp: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    emoji: "📚",
    title: { ar: "قارئة نهمة", en: "Reading Streak" },
    description: { ar: "اقرئي ١٠ كتب خلال الفصل", en: "Read 10 books this term" },
    category: "academic",
    unlocked: false,
    progress: 7,
    total: 10,
    xp: 200,
  },
  {
    id: 2,
    emoji: "🏆",
    title: { ar: "تفوّق في الرياضيات", en: "Math Excellence" },
    description: { ar: "احصلي على ٩٠+ في ثلاثة اختبارات متتالية", en: "Score 90+ on 3 consecutive tests" },
    category: "academic",
    unlocked: true,
    progress: 3,
    total: 3,
    xp: 300,
  },
  {
    id: 3,
    emoji: "🌅",
    title: { ar: "حضور مثالي", en: "Perfect Attendance" },
    description: { ar: "لا غياب لمدة شهر كامل", en: "No absences for a full month" },
    category: "attendance",
    unlocked: true,
    progress: 30,
    total: 30,
    xp: 250,
  },
  {
    id: 4,
    emoji: "👑",
    title: { ar: "قائدة الصف", en: "Class Leader" },
    description: { ar: "قودي نشاطاً صفياً بنجاح", en: "Successfully lead a class activity" },
    category: "social",
    unlocked: true,
    progress: 1,
    total: 1,
    xp: 200,
  },
  {
    id: 5,
    emoji: "🔬",
    title: { ar: "فائزة بمعرض العلوم", en: "Science Fair Winner" },
    description: { ar: "شاركي وفوزي في معرض العلوم", en: "Participate and win in the science fair" },
    category: "special",
    unlocked: false,
    progress: 0,
    total: 1,
    xp: 500,
  },
  {
    id: 6,
    emoji: "🤝",
    title: { ar: "زميلة مساعدة", en: "Helpful Peer" },
    description: { ar: "ساعدي ٥ زملاء في واجباتهم", en: "Help 5 classmates with their homework" },
    category: "social",
    unlocked: true,
    progress: 5,
    total: 5,
    xp: 150,
  },
  {
    id: 7,
    emoji: "⏰",
    title: { ar: "الطالبة المبكرة", en: "Early Bird" },
    description: { ar: "وصلي قبل الجرس ٢٠ يوماً", en: "Arrive before the bell 20 days" },
    category: "attendance",
    unlocked: false,
    progress: 15,
    total: 20,
    xp: 200,
  },
  {
    id: 8,
    emoji: "✍️",
    title: { ar: "كاتبة مبدعة", en: "Creative Writer" },
    description: { ar: "اكتبي ٣ مقالات تحصل على تقدير ممتاز", en: "Write 3 essays that earn excellent grades" },
    category: "academic",
    unlocked: false,
    progress: 2,
    total: 3,
    xp: 250,
  },
  {
    id: 9,
    emoji: "⚽",
    title: { ar: "نجمة الرياضة", en: "Sports Star" },
    description: { ar: "شاركي في بطولة رياضية مدرسية", en: "Participate in a school sports tournament" },
    category: "special",
    unlocked: false,
    progress: 0,
    total: 1,
    xp: 300,
  },
  {
    id: 10,
    emoji: "💻",
    title: { ar: "خبيرة التقنية", en: "Tech Wizard" },
    description: { ar: "أنجزي مشروعاً تقنياً في الحاسوب", en: "Complete a tech project in computer class" },
    category: "academic",
    unlocked: false,
    progress: 0,
    total: 1,
    xp: 250,
  },
  {
    id: 11,
    emoji: "🎵",
    title: { ar: "عازفة ماهرة", en: "Music Maestro" },
    description: { ar: "قدّمي عرضاً موسيقياً أمام المدرسة", en: "Perform a musical piece in front of school" },
    category: "special",
    unlocked: false,
    progress: 0,
    total: 1,
    xp: 300,
  },
  {
    id: 12,
    emoji: "🌍",
    title: { ar: "بطلة اللغات", en: "Language Champion" },
    description: { ar: "احصلي على ٩٥+ في العربية والإنجليزية", en: "Score 95+ in both Arabic and English" },
    category: "academic",
    unlocked: false,
    progress: 1,
    total: 2,
    xp: 350,
  },
  {
    id: 13,
    emoji: "🎨",
    title: { ar: "فنانة مبدعة", en: "Art Prodigy" },
    description: { ar: "فوزي بمسابقة الرسم المدرسية", en: "Win the school drawing competition" },
    category: "special",
    unlocked: true,
    progress: 1,
    total: 1,
    xp: 300,
  },
  {
    id: 14,
    emoji: "📝",
    title: { ar: "واجبات كاملة", en: "Homework Hero" },
    description: { ar: "سلّمي كل الواجبات لأسبوعين متتاليين", en: "Submit all homework for 2 consecutive weeks" },
    category: "academic",
    unlocked: false,
    progress: 8,
    total: 10,
    xp: 200,
  },
  {
    id: 15,
    emoji: "🌟",
    title: { ar: "نجمة الشهر", en: "Star of the Month" },
    description: { ar: "كوني الطالبة المثالية لشهر واحد", en: "Be the model student for one month" },
    category: "special",
    unlocked: false,
    progress: 0,
    total: 1,
    xp: 500,
  },
];

const categoryTabs: { key: AchievementCategory; label: { ar: string; en: string } }[] = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "academic", label: { ar: "أكاديمي", en: "Academic" } },
  { key: "attendance", label: { ar: "الحضور", en: "Attendance" } },
  { key: "social", label: { ar: "اجتماعي", en: "Social" } },
  { key: "special", label: { ar: "مميّز", en: "Special" } },
];

export default function StudentAchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [activeCategory, setActiveCategory] = useState<AchievementCategory>("all");

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXP = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.xp, 0);

  const filtered =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  const stats = [
    {
      icon: Trophy,
      value: `${unlockedCount}/${achievements.length}`,
      label: locale === "ar" ? "مفتوح" : "Unlocked",
      color: "#C19A4B",
    },
    {
      icon: Flame,
      value: "12",
      label: locale === "ar" ? "أيام متتالية" : "Day Streak",
      color: "#DC2626",
    },
    {
      icon: Star,
      value: totalXP.toLocaleString(),
      label: locale === "ar" ? "نقاط الخبرة" : "Total XP",
      color: "#4A90E2",
    },
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <Trophy className="w-3 h-3" />
          <span>{locale === "ar" ? "الإنجازات" : "ACHIEVEMENTS"}</span>
        </div>
        <h1 className={h1Class}>
          {locale === "ar" ? "إنجازاتي" : "My Achievements"}
        </h1>
      </motion.div>

      {/* Stats header */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)] text-center"
            >
              <Icon
                className="w-6 h-6 mx-auto mb-2"
                style={{ color: stat.color }}
              />
              <div
                className={`text-2xl font-bold text-[var(--color-navy)] num ${
                  isRTL ? "font-arabic-display" : "font-serif"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)] mt-1">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-4 py-2 text-xs font-semibold border transition-all whitespace-nowrap ${
              activeCategory === tab.key
                ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                : "bg-white border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]"
            }`}
          >
            {tab.label[locale]}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ach, i) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`relative p-5 border overflow-hidden transition-all ${
              ach.unlocked
                ? "bg-white border-[var(--color-gold)] shadow-sm"
                : "bg-gray-50 border-[var(--color-border)] opacity-70"
            }`}
          >
            {/* Unlocked checkmark */}
            {ach.unlocked && (
              <div className="absolute top-3 end-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            )}
            {!ach.unlocked && (
              <div className="absolute top-3 end-3">
                <Lock className="w-4 h-4 text-[var(--color-ink-soft)]" />
              </div>
            )}

            <div className="flex items-start gap-3 mb-3">
              <div
                className={`text-3xl ${ach.unlocked ? "" : "grayscale"}`}
              >
                {ach.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-semibold text-sm ${
                    ach.unlocked
                      ? "text-[var(--color-navy)]"
                      : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {ach.title[locale]}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    isRTL ? "leading-[1.8]" : "leading-relaxed"
                  } text-[var(--color-ink-soft)]`}
                >
                  {ach.description[locale]}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-[var(--color-ink-soft)]">
                  <span className="num">{ach.progress}</span> /{" "}
                  <span className="num">{ach.total}</span>
                </span>
                <span className="text-[10px] font-bold text-[var(--color-gold)]">
                  <span className="num">{ach.xp}</span> XP
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--color-cream)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    ach.unlocked
                      ? "bg-gradient-to-r from-[var(--color-gold)] to-green-500"
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: `${(ach.progress / ach.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
