"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  BookOpen,
  Percent,
  ToggleLeft,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function TeacherSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  // Notification toggles
  const [notifySubmissions, setNotifySubmissions] = useState(true);
  const [notifyGradeReminders, setNotifyGradeReminders] = useState(true);
  const [notifyParentMessages, setNotifyParentMessages] = useState(true);
  const [notifyScheduleChanges, setNotifyScheduleChanges] = useState(false);
  const [notifyStaffAnnouncements, setNotifyStaffAnnouncements] = useState(true);

  // Preferred channel
  const [channel, setChannel] = useState<"app" | "email" | "whatsapp" | "sms">("app");

  // Grading preferences
  const [gradingScale, setGradingScale] = useState<"percentage" | "letter">("percentage");
  const [autoCalcFinal, setAutoCalcFinal] = useState(true);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSave = () => {
    setToast(
      locale === "ar"
        ? "تمّ حفظ التفضيلات بنجاح"
        : "Preferences saved successfully"
    );
  };

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "الإعدادات", en: "Settings" },
    subtitle: {
      ar: "تحكّم في تفضيلاتك وإعدادات حسابك",
      en: "Manage your preferences and account settings",
    },
    account: { ar: "بيانات الحساب", en: "Account" },
    teacherName: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
    email: { ar: "r.alzoubi@nakhla.edu.jo", en: "r.alzoubi@nakhla.edu.jo" },
    department: { ar: "قسم الرياضيات", en: "Mathematics Department" },
    role: { ar: "معلمة رياضيات", en: "Mathematics Teacher" },
    notifications: { ar: "الإشعارات", en: "Notifications" },
    notificationsDesc: {
      ar: "اختر الإشعارات التي تريد استقبالها",
      en: "Choose which notifications you want to receive",
    },
    channel: { ar: "طريقة التواصل المفضّلة", en: "Preferred Channel" },
    grading: { ar: "تفضيلات التقييم", en: "Grading Preferences" },
    gradingScale: { ar: "مقياس العلامات", en: "Grading Scale" },
    scalePercentage: { ar: "نسبة مئوية", en: "Percentage" },
    scaleLetter: { ar: "حرفي (A-F)", en: "Letter (A-F)" },
    autoCalc: {
      ar: "حساب العلامة النهائية تلقائياً",
      en: "Auto-calculate final grade",
    },
    privacy: { ar: "الخصوصية والأمان", en: "Privacy & Security" },
    changePassword: { ar: "تغيير كلمة المرور", en: "Change password" },
    twoFactor: { ar: "المصادقة الثنائية", en: "Two-factor authentication" },
    enable: { ar: "تفعيل", en: "Enable" },
    save: { ar: "حفظ التغييرات", en: "Save changes" },
    notifyOptions: [
      {
        key: "submissions",
        ar: "تسليمات الواجبات",
        en: "Assignment submissions",
      },
      {
        key: "gradeReminders",
        ar: "تذكيرات التصحيح",
        en: "Grade reminders",
      },
      {
        key: "parentMessages",
        ar: "رسائل أولياء الأمور",
        en: "Parent messages",
      },
      {
        key: "scheduleChanges",
        ar: "تغييرات الجدول",
        en: "Schedule changes",
      },
      {
        key: "staffAnnouncements",
        ar: "إعلانات الكادر",
        en: "Staff announcements",
      },
    ],
    channels: [
      { value: "app", ar: "تطبيق النخلة", en: "Al-Nakhla app" },
      { value: "email", ar: "البريد الإلكتروني", en: "Email" },
      { value: "whatsapp", ar: "واتساب", en: "WhatsApp" },
      { value: "sms", ar: "رسائل SMS", en: "SMS" },
    ] as const,
  };

  const toggleMap: Record<string, [boolean, (v: boolean) => void]> = {
    submissions: [notifySubmissions, setNotifySubmissions],
    gradeReminders: [notifyGradeReminders, setNotifyGradeReminders],
    parentMessages: [notifyParentMessages, setNotifyParentMessages],
    scheduleChanges: [notifyScheduleChanges, setNotifyScheduleChanges],
    staffAnnouncements: [notifyStaffAnnouncements, setNotifyStaffAnnouncements],
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Account card */}
        <div className="bg-white border border-[var(--color-border)] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <h3 className={cardTitleClass}>{T.account[locale]}</h3>
          </div>
          <div className="p-4 bg-[var(--color-cream)] space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-[var(--color-gold)]"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face')`,
                }}
              />
              <div>
                <div
                  className={`font-semibold text-[var(--color-navy)] ${
                    isRTL ? "font-arabic-display" : "font-serif"
                  }`}
                >
                  {T.teacherName[locale]}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)]">
                  {T.role[locale]}
                </div>
              </div>
            </div>
            <div className="text-sm text-[var(--color-ink)] mt-2">
              <span className="text-[var(--color-ink-soft)] text-xs">
                {locale === "ar" ? "البريد:" : "Email:"}
              </span>{" "}
              <span dir="ltr" className="num">
                {T.email[locale]}
              </span>
            </div>
            <div className="text-sm text-[var(--color-ink)]">
              <span className="text-[var(--color-ink-soft)] text-xs">
                {locale === "ar" ? "القسم:" : "Dept:"}
              </span>{" "}
              {T.department[locale]}
            </div>
          </div>
        </div>

        {/* Notifications card */}
        <div className="bg-white border border-[var(--color-border)] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <h3 className={cardTitleClass}>{T.notifications[locale]}</h3>
          </div>
          <p className="text-sm text-[var(--color-ink-soft)] mb-6 ps-13">
            {T.notificationsDesc[locale]}
          </p>
          <div className="space-y-3">
            {T.notifyOptions.map((opt) => {
              const [value, setValue] = toggleMap[opt.key];
              return (
                <label
                  key={opt.key}
                  className="flex items-center gap-4 p-4 bg-[var(--color-cream)] cursor-pointer hover:bg-[var(--color-cream-warm)] transition-colors"
                >
                  <div className="flex-1 font-medium text-[var(--color-navy)]">
                    {opt[locale]}
                  </div>
                  <button
                    type="button"
                    onClick={() => setValue(!value)}
                    className={`relative w-12 h-6 transition-colors ${
                      value
                        ? "bg-[var(--color-gold)]"
                        : "bg-[var(--color-border)]"
                    }`}
                    role="switch"
                    aria-checked={value}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white shadow-md"
                      animate={{
                        x: value ? (isRTL ? -24 : 26) : isRTL ? -2 : 2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                </label>
              );
            })}
          </div>

          {/* Channel */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <div className="text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-3">
              {T.channel[locale]}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {T.channels.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setChannel(c.value)}
                  className={`px-4 py-3 text-xs font-semibold border transition-all ${
                    channel === c.value
                      ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                      : "bg-white border-[var(--color-border)] hover:border-[var(--color-gold)]"
                  }`}
                >
                  {c[locale]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grading preferences card */}
        <div className="bg-white border border-[var(--color-border)] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <h3 className={cardTitleClass}>{T.grading[locale]}</h3>
          </div>

          {/* Scale selector */}
          <div className="mb-4">
            <div className="text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-3">
              {T.gradingScale[locale]}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGradingScale("percentage")}
                className={`px-4 py-3 text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                  gradingScale === "percentage"
                    ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                    : "bg-white border-[var(--color-border)] hover:border-[var(--color-gold)]"
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                {T.scalePercentage[locale]}
              </button>
              <button
                onClick={() => setGradingScale("letter")}
                className={`px-4 py-3 text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                  gradingScale === "letter"
                    ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                    : "bg-white border-[var(--color-border)] hover:border-[var(--color-gold)]"
                }`}
              >
                <span className="font-bold">A</span>
                {T.scaleLetter[locale]}
              </button>
            </div>
          </div>

          {/* Auto-calculate toggle */}
          <label className="flex items-center gap-4 p-4 bg-[var(--color-cream)] cursor-pointer hover:bg-[var(--color-cream-warm)] transition-colors">
            <div className="flex-1 font-medium text-[var(--color-navy)]">
              {T.autoCalc[locale]}
            </div>
            <button
              type="button"
              onClick={() => setAutoCalcFinal(!autoCalcFinal)}
              className={`relative w-12 h-6 transition-colors ${
                autoCalcFinal
                  ? "bg-[var(--color-gold)]"
                  : "bg-[var(--color-border)]"
              }`}
              role="switch"
              aria-checked={autoCalcFinal}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white shadow-md"
                animate={{
                  x: autoCalcFinal ? (isRTL ? -24 : 26) : isRTL ? -2 : 2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </button>
          </label>
        </div>

        {/* Security card */}
        <div className="bg-white border border-[var(--color-border)] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <h3 className={cardTitleClass}>{T.privacy[locale]}</h3>
          </div>
          <div className="space-y-3">
            <button
              onClick={() =>
                setToast(
                  locale === "ar"
                    ? "ستتوفر خاصية تغيير كلمة المرور قريباً"
                    : "Password change coming soon"
                )
              }
              className="w-full flex items-center justify-between p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors"
            >
              <span className="font-medium text-[var(--color-navy)]">
                {T.changePassword[locale]}
              </span>
              <Lock className="w-4 h-4 text-[var(--color-ink-soft)]" />
            </button>
            <button
              onClick={() =>
                setToast(
                  locale === "ar"
                    ? "ستتوفر المصادقة الثنائية قريباً"
                    : "Two-factor authentication coming soon"
                )
              }
              className="w-full flex items-center justify-between p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors"
            >
              <span className="font-medium text-[var(--color-navy)]">
                {T.twoFactor[locale]}
              </span>
              <span className="text-xs font-semibold text-[var(--color-gold)]">
                {T.enable[locale]}
              </span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)]"
          >
            <Save className="w-4 h-4" />
            {T.save[locale]}
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[60] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
