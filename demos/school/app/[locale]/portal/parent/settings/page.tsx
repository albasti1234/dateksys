"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Globe,
  Lock,
  Palette,
  Save,
  CheckCircle2,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { useActiveChild } from "@/lib/parentStore";

export default function ParentSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const [activeChild] = useActiveChild();

  // Local (per-session) preferences
  const [notifyGrades, setNotifyGrades] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyFees, setNotifyFees] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(false);
  const [notifyBus, setNotifyBus] = useState(true);
  const [channel, setChannel] = useState<"email" | "sms" | "whatsapp" | "app">(
    "app"
  );
  const [emergencyContact, setEmergencyContact] = useState("");
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
      ar: "تحكّم في تفضيلاتك وطريقة تواصلنا معك",
      en: "Manage your preferences and how we contact you",
    },
    account: { ar: "بيانات الحساب", en: "Account" },
    viewingChild: { ar: "الطفل النشط", en: "Active child" },
    notifications: { ar: "الإشعارات", en: "Notifications" },
    notificationsDesc: {
      ar: "اختر ما تريد أن نخبرك عنه",
      en: "Choose what you want to be notified about",
    },
    channel: {
      ar: "طريقة التواصل المفضّلة",
      en: "Preferred channel",
    },
    emergency: { ar: "رقم الطوارئ", en: "Emergency contact" },
    emergencyPlaceholder: {
      ar: "+962 7X XXX XXXX",
      en: "+962 7X XXX XXXX",
    },
    privacy: { ar: "الخصوصية والأمان", en: "Privacy & Security" },
    changePassword: { ar: "تغيير كلمة المرور", en: "Change password" },
    twoFactor: {
      ar: "المصادقة الثنائية",
      en: "Two-factor authentication",
    },
    enable: { ar: "تفعيل", en: "Enable" },
    save: { ar: "حفظ التغييرات", en: "Save changes" },
    notifyOptions: [
      {
        key: "grades",
        icon: Palette,
        ar: "العلامات والتقارير",
        en: "Grades and reports",
      },
      {
        key: "attendance",
        icon: Bell,
        ar: "الحضور والغياب",
        en: "Attendance updates",
      },
      {
        key: "fees",
        icon: Bell,
        ar: "الرسوم والمستحقات",
        en: "Fees and payments",
      },
      {
        key: "events",
        icon: Bell,
        ar: "الفعاليات والاجتماعات",
        en: "Events and meetings",
      },
      {
        key: "bus",
        icon: Bell,
        ar: "تتبّع الباص والتأخيرات",
        en: "Bus tracking and delays",
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
    grades: [notifyGrades, setNotifyGrades],
    attendance: [notifyAttendance, setNotifyAttendance],
    fees: [notifyFees, setNotifyFees],
    events: [notifyEvents, setNotifyEvents],
    bus: [notifyBus, setNotifyBus],
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
          <div className="flex items-center gap-4 p-4 bg-[var(--color-cream)]">
            <div
              className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-[var(--color-gold)]"
              style={{ backgroundImage: `url('${activeChild.avatar}')` }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-0.5">
                {T.viewingChild[locale]}
              </div>
              <div
                className={`font-semibold text-[var(--color-navy)] ${
                  isRTL ? "font-arabic-display" : "font-serif"
                }`}
              >
                {activeChild.firstName[locale]} {activeChild.lastName[locale]}
              </div>
              <div className="text-xs text-[var(--color-ink-soft)]">
                {activeChild.grade[locale]}
              </div>
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
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
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

          {/* Emergency */}
          <div className="mt-6">
            <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
              {T.emergency[locale]}
            </label>
            <input
              type="tel"
              dir="ltr"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder={T.emergencyPlaceholder[locale]}
              className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors font-mono text-sm"
            />
          </div>
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
            <button className="w-full flex items-center justify-between p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors">
              <span className="font-medium text-[var(--color-navy)]">
                {T.changePassword[locale]}
              </span>
              <Lock className="w-4 h-4 text-[var(--color-ink-soft)]" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors">
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
