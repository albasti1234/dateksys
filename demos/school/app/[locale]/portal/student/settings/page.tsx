"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Target,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

export default function StudentSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    homework: true,
    grades: true,
    schedule: false,
    messages: true,
  });
  const [studyGoal, setStudyGoal] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast(
      locale === "ar" ? "تم حفظ الإعدادات بنجاح!" : "Settings saved successfully!"
    );
  };

  const handleChangePassword = () => {
    showToast(
      locale === "ar"
        ? "تم إرسال رابط تغيير كلمة المرور إلى بريدك"
        : "Password reset link sent to your email"
    );
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const studyGoalOptions = [
    { value: 0.5, label: locale === "ar" ? "٣٠ دقيقة" : "30 min" },
    { value: 1, label: locale === "ar" ? "ساعة" : "1 hour" },
    { value: 2, label: locale === "ar" ? "ساعتان" : "2 hours" },
    { value: 3, label: locale === "ar" ? "٣ ساعات" : "3 hours" },
  ];

  const notificationItems: {
    key: keyof typeof notifications;
    label: { ar: string; en: string };
    desc: { ar: string; en: string };
    icon: typeof Bell;
  }[] = [
    {
      key: "homework",
      label: { ar: "تذكير بالواجبات", en: "Homework Reminders" },
      desc: {
        ar: "إشعارات عند وجود واجبات جديدة أو اقتراب موعد التسليم",
        en: "Notifications for new homework or upcoming deadlines",
      },
      icon: Bell,
    },
    {
      key: "grades",
      label: { ar: "تحديثات العلامات", en: "Grade Updates" },
      desc: {
        ar: "إشعارات عند نشر علامات جديدة",
        en: "Notifications when new grades are posted",
      },
      icon: Bell,
    },
    {
      key: "schedule",
      label: { ar: "تغييرات الجدول", en: "Schedule Changes" },
      desc: {
        ar: "إشعارات عند تغيير الجدول الدراسي",
        en: "Notifications when the schedule is updated",
      },
      icon: Bell,
    },
    {
      key: "messages",
      label: { ar: "الرسائل", en: "Messages" },
      desc: {
        ar: "إشعارات عند وصول رسائل جديدة",
        en: "Notifications for new messages",
      },
      icon: Bell,
    },
  ];

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  const sectionTitleClass = isRTL
    ? "font-arabic-display text-lg font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-lg font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 inset-x-0 z-50 flex justify-center"
          >
            <div className="bg-green-600 text-white px-6 py-3 shadow-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-semibold">{toast}</span>
              <button onClick={() => setToast(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <Settings className="w-3 h-3" />
          <span>{locale === "ar" ? "الإعدادات" : "SETTINGS"}</span>
        </div>
        <h1 className={h1Class}>
          {locale === "ar" ? "إعداداتي" : "My Settings"}
        </h1>
      </motion.div>

      <div className="space-y-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-[var(--color-gold)]" />
            <h2 className={sectionTitleClass}>
              {locale === "ar" ? "الملف الشخصي" : "Profile"}
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full bg-cover bg-center shrink-0 border-2 border-[var(--color-gold)]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80')",
              }}
            />
            <div className="flex-1">
              <div className="font-bold text-lg text-[var(--color-navy)]">
                {locale === "ar" ? "ليلى الحوراني" : "Leila Al-Hourani"}
              </div>
              <div className="text-sm text-[var(--color-ink-soft)] mt-1">
                {locale === "ar"
                  ? "الصف السادس — شعبة أ"
                  : "Grade 6 — Section A"}
              </div>
              <div className="text-xs text-[var(--color-ink-soft)] mt-0.5 num">
                {locale === "ar" ? "رقم الطالبة:" : "Student ID:"} 2026-0642
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            {darkMode ? (
              <Moon className="w-4 h-4 text-[var(--color-gold)]" />
            ) : (
              <Sun className="w-4 h-4 text-[var(--color-gold)]" />
            )}
            <h2 className={sectionTitleClass}>
              {locale === "ar" ? "المظهر" : "Appearance"}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                {locale === "ar" ? "الوضع الداكن" : "Dark Mode"}
              </div>
              <div
                className={`text-xs text-[var(--color-ink-soft)] mt-0.5 ${
                  isRTL ? "leading-[1.8]" : ""
                }`}
              >
                {locale === "ar"
                  ? "تبديل بين المظهر الفاتح والداكن"
                  : "Switch between light and dark theme"}
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 rounded-full transition-colors relative ${
                darkMode ? "bg-[var(--color-navy)]" : "bg-gray-300"
              }`}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-white absolute top-1"
                animate={{ x: darkMode ? (isRTL ? 4 : 32) : isRTL ? 32 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-[var(--color-gold)]" />
            <h2 className={sectionTitleClass}>
              {locale === "ar" ? "الإشعارات" : "Notifications"}
            </h2>
          </div>
          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <div className="text-sm font-semibold text-[var(--color-navy)]">
                    {item.label[locale]}
                  </div>
                  <div
                    className={`text-xs text-[var(--color-ink-soft)] mt-0.5 ${
                      isRTL ? "leading-[1.8]" : ""
                    }`}
                  >
                    {item.desc[locale]}
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`w-14 h-7 rounded-full transition-colors relative shrink-0 ${
                    notifications[item.key]
                      ? "bg-[var(--color-gold)]"
                      : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white absolute top-1"
                    animate={{
                      x: notifications[item.key]
                        ? isRTL
                          ? 4
                          : 32
                        : isRTL
                        ? 32
                        : 4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-[var(--color-gold)]" />
            <h2 className={sectionTitleClass}>
              {locale === "ar" ? "اللغة" : "Language"}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                {locale === "ar" ? "لغة العرض" : "Display Language"}
              </div>
              <div className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                {locale === "ar"
                  ? "يمكنك تبديل اللغة من الشريط العلوي"
                  : "You can switch language from the top bar"}
              </div>
            </div>
            <div className="px-4 py-2 bg-[var(--color-cream)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-navy)]">
              {locale === "ar" ? "العربية" : "English"}
            </div>
          </div>
        </motion.div>

        {/* Study goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-4 h-4 text-[var(--color-gold)]" />
            <h2 className={sectionTitleClass}>
              {locale === "ar" ? "أهداف الدراسة" : "Study Goals"}
            </h2>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-navy)] mb-3">
              {locale === "ar"
                ? "هدف الدراسة اليومي"
                : "Daily Study Target"}
            </div>
            <div className="flex gap-3">
              {studyGoalOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStudyGoal(opt.value)}
                  className={`flex-1 py-3 text-sm font-semibold border transition-all ${
                    studyGoal === opt.value
                      ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                      : "bg-white border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-[var(--color-gold)]" />
            <h2 className={sectionTitleClass}>
              {locale === "ar" ? "الخصوصية والأمان" : "Privacy & Security"}
            </h2>
          </div>
          <button
            onClick={handleChangePassword}
            className="px-5 py-2.5 border border-[var(--color-border)] text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-gold)] transition-colors"
          >
            {locale === "ar" ? "تغيير كلمة المرور" : "Change Password"}
          </button>
        </motion.div>

        {/* Save button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-dark)] transition-colors"
          >
            <Save className="w-4 h-4" />
            {locale === "ar" ? "حفظ الإعدادات" : "Save Settings"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
