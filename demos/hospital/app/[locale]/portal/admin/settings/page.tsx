"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { departments } from "@/lib/data";

const defaultHospitalInfo = {
  name: { ar: "مستشفى الحياة", en: "Al-Hayat Hospital" },
  address: { ar: "شارع المدينة المنورة، عمّان، الأردن", en: "Al-Madinah Al-Munawwarah St, Amman, Jordan" },
  phone: "+962 6 500 0000",
  email: "info@alhayat.jo",
};

const dayKeys = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;

const defaultHours: Record<string, { start: string; end: string; enabled: boolean }> = {
  sat: { start: "08:00", end: "20:00", enabled: true },
  sun: { start: "08:00", end: "20:00", enabled: true },
  mon: { start: "08:00", end: "20:00", enabled: true },
  tue: { start: "08:00", end: "20:00", enabled: true },
  wed: { start: "08:00", end: "20:00", enabled: true },
  thu: { start: "08:00", end: "20:00", enabled: true },
  fri: { start: "00:00", end: "00:00", enabled: false },
};

export default function AdminSettings({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.settings;
  const dayLabels = dict.portals.common.days;

  const [hospitalName, setHospitalName] = useState(defaultHospitalInfo.name[locale]);
  const [address, setAddress] = useState(defaultHospitalInfo.address[locale]);
  const [phone, setPhone] = useState(defaultHospitalInfo.phone);
  const [email, setEmail] = useState(defaultHospitalInfo.email);

  const [deptEnabled, setDeptEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(departments.map((d) => [d.id, true]))
  );

  const [hours, setHours] = useState(defaultHours);
  const [toast, setToast] = useState(false);

  const toggleDept = (id: string) => {
    setDeptEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateHour = (day: string, field: "start" | "end", value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const toggleDay = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleSave = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="p-5 lg:p-8 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-ink"
      >
        {t.title}
      </motion.h1>

      {/* Hospital Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-5"
      >
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-ink-muted" />
          {t.hospitalInfo}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1">
              {locale === "ar" ? "اسم المستشفى" : "Hospital Name"}
            </label>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-ink bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1">
              {locale === "ar" ? "العنوان" : "Address"}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-ink bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1">
              {locale === "ar" ? "الهاتف" : "Phone"}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-ink bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1">
              {locale === "ar" ? "البريد الإلكتروني" : "Email"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-ink bg-white"
            />
          </div>
        </div>
      </motion.div>

      {/* Department Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 p-5"
      >
        <h2 className="text-lg font-semibold text-ink mb-4">
          {locale === "ar" ? "إدارة الأقسام" : "Department Management"}
        </h2>
        <div className="space-y-2">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dept.color }}
                />
                <span className="text-sm font-medium text-ink">{dept.name[locale]}</span>
              </div>
              <button
                onClick={() => toggleDept(dept.id)}
                className="text-ink-muted hover:text-ink transition-colors"
                aria-label={`Toggle ${dept.name.en}`}
              >
                {deptEnabled[dept.id] ? (
                  <ToggleRight className="w-7 h-7 text-emerald" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-gray-300" />
                )}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Working Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-5"
      >
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-ink-muted" />
          {t.workingHours}
        </h2>
        <div className="space-y-2">
          {dayKeys.map((day) => {
            const dayLabel = dayLabels[day as keyof typeof dayLabels];
            const h = hours[day];
            return (
              <div
                key={day}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  h.enabled ? "bg-gray-50" : "bg-gray-50/50 opacity-50"
                }`}
              >
                <button
                  onClick={() => toggleDay(day)}
                  className="shrink-0"
                  aria-label={`Toggle ${day}`}
                >
                  {h.enabled ? (
                    <ToggleRight className="w-6 h-6 text-emerald" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-300" />
                  )}
                </button>
                <span className="text-sm font-medium text-ink w-24 shrink-0">{dayLabel}</span>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={h.start}
                    onChange={(e) => updateHour(day, "start", e.target.value)}
                    disabled={!h.enabled}
                    className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-ink bg-white disabled:opacity-40"
                  />
                  <span className="text-ink-muted text-xs">-</span>
                  <input
                    type="time"
                    value={h.end}
                    onChange={(e) => updateHour(day, "end", e.target.value)}
                    disabled={!h.enabled}
                    className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-ink bg-white disabled:opacity-40"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleSave}
          className="px-8 py-3 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-navy-dark transition-colors"
        >
          {dict.common.save}
        </button>
      </motion.div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 start-1/2 bg-emerald text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium z-50"
          style={{ transform: "translateX(-50%)" }}
        >
          {locale === "ar" ? "تم حفظ الإعدادات بنجاح" : "Settings saved successfully"}
        </motion.div>
      )}
    </div>
  );
}
