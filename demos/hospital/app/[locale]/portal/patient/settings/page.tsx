"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

const SETTINGS_KEY = "alhayat:patient-settings";

type Settings = {
  appointmentReminders: boolean;
  labResults: boolean;
  prescriptions: boolean;
  messages: boolean;
  billing: boolean;
  language: string;
};

const defaultSettings: Settings = {
  appointmentReminders: true,
  labResults: true,
  prescriptions: true,
  messages: true,
  billing: false,
  language: "ar",
};

export default function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.settings;

  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) setSettings(JSON.parse(stored));
    } catch {
      /* noop */
    }
  }, []);

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setToast(locale === "ar" ? "تم حفظ الإعدادات بنجاح" : "Settings saved successfully");
    setTimeout(() => setToast(null), 3000);
  };

  const toggleItems: { key: keyof Settings; label: string }[] = [
    { key: "appointmentReminders", label: p.appointmentReminders },
    { key: "labResults", label: locale === "ar" ? "نتائج المختبر" : "Lab Results" },
    { key: "prescriptions", label: locale === "ar" ? "الوصفات الطبية" : "Prescriptions" },
    { key: "messages", label: locale === "ar" ? "الرسائل" : "Messages" },
    { key: "billing", label: locale === "ar" ? "الفواتير" : "Billing" },
  ];

  return (
    <div className="p-5 lg:p-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-ink">{p.title}</h1>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      >
        <h2 className="font-bold text-ink mb-4">{p.notifications}</h2>
        <div className="space-y-4">
          {toggleItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-ink">{item.label}</span>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings[item.key] ? "bg-teal" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    settings[item.key]
                      ? locale === "ar"
                        ? "start-0.5"
                        : "start-[1.375rem]"
                      : locale === "ar"
                        ? "start-[1.375rem]"
                        : "start-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Language preference (cosmetic) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      >
        <h2 className="font-bold text-ink mb-4">{p.language}</h2>
        <select
          value={settings.language}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, language: e.target.value }))
          }
          className="w-full max-w-xs bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-teal transition-colors"
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </motion.div>

      <button onClick={handleSave} className="btn-primary text-sm">
        <Save className="w-4 h-4" />
        {dict.common.save}
      </button>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 bg-teal text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
