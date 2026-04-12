"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { insuranceCompanies } from "@/lib/data";

const PROFILE_KEY = "alhayat:patient-profile";

type PatientProfile = {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string;
  insuranceCompany: string;
  insuranceNumber: string;
};

const defaultProfile: PatientProfile = {
  fullName: "",
  phone: "0795551234",
  email: "fatima.omari@email.com",
  nationalId: "9901234567",
  dateOfBirth: "1985-03-15",
  bloodType: "A+",
  allergies: "",
  insuranceCompany: "jordan-insurance",
  insuranceNumber: "JIC-2024-55678",
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.profile;

  const [profile, setProfile] = useState<PatientProfile>({
    ...defaultProfile,
    fullName: locale === "ar" ? "فاطمة العمري" : "Fatima Al-Omari",
    allergies: locale === "ar" ? "بنسلين" : "Penicillin",
  });
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch {
      /* noop */
    }
  }, []);

  const handleChange = (field: keyof PatientProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setToast(locale === "ar" ? "تم حفظ الملف الشخصي بنجاح" : "Profile saved successfully");
    setTimeout(() => setToast(null), 3000);
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-muted focus:outline-none focus:border-teal transition-colors";

  return (
    <div className="p-5 lg:p-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-ink">{p.title}</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.fullName}</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={inputClass}
            />
          </div>
          {/* National ID */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.nationalId}</label>
            <input
              type="text"
              value={profile.nationalId}
              onChange={(e) => handleChange("nationalId", e.target.value)}
              className={inputClass}
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.phone}</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass}
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.email}</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass}
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.dateOfBirth}</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className={inputClass}
            />
          </div>
          {/* Blood Type */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.bloodType}</label>
            <select
              value={profile.bloodType}
              onChange={(e) => handleChange("bloodType", e.target.value)}
              className={inputClass}
            >
              {bloodTypes.map((bt) => (
                <option key={bt} value={bt}>
                  {bt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.allergies}</label>
          <textarea
            value={profile.allergies}
            onChange={(e) => handleChange("allergies", e.target.value)}
            rows={2}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Insurance Company */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.insuranceCompany}</label>
            <select
              value={profile.insuranceCompany}
              onChange={(e) => handleChange("insuranceCompany", e.target.value)}
              className={inputClass}
            >
              <option value="">---</option>
              {insuranceCompanies.map((ic) => (
                <option key={ic.id} value={ic.id}>
                  {ic.name[locale]}
                </option>
              ))}
            </select>
          </div>
          {/* Insurance Number */}
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1.5">{p.insuranceNumber}</label>
            <input
              type="text"
              value={profile.insuranceNumber}
              onChange={(e) => handleChange("insuranceNumber", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="pt-2">
          <button onClick={handleSave} className="btn-primary text-sm">
            <Save className="w-4 h-4" />
            {dict.common.save}
          </button>
        </div>
      </motion.div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 bg-teal text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
