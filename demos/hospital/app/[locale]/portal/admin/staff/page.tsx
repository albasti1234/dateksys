"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { departments, doctors } from "@/lib/data";

type StaffStatus = "available" | "busy" | "off";

const staffStatuses: Record<string, StaffStatus> = {
  "dr-ahmad-mansour": "available",
  "dr-lina-husseini": "busy",
  "dr-khaled-abu-zeid": "available",
  "dr-rania-qasem": "busy",
  "dr-omar-nabulsi": "available",
  "dr-sara-khatib": "busy",
  "dr-faisal-tarawneh": "available",
  "dr-nour-haddad": "off",
  "dr-mahmoud-za3bi": "available",
  "dr-hala-masri": "available",
  "dr-yousef-batayneh": "off",
  "dr-dina-ajlouni": "busy",
};

const statusColors: Record<StaffStatus, string> = {
  available: "bg-emerald-100 text-emerald-700",
  busy: "bg-amber-100 text-amber-700",
  off: "bg-gray-100 text-gray-500",
};

const statusDot: Record<StaffStatus, string> = {
  available: "bg-emerald-500",
  busy: "bg-amber-500",
  off: "bg-gray-400",
};

export default function AdminStaff({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.staff;

  const [activeDept, setActiveDept] = useState<string>("all");
  const [toast, setToast] = useState<string | null>(null);

  const filtered =
    activeDept === "all"
      ? doctors
      : doctors.filter((d) => d.departmentId === activeDept);

  const statusLabels: Record<StaffStatus, string> = {
    available: t.onDuty,
    busy: locale === "ar" ? "مشغول" : "Busy",
    off: t.offDuty,
  };

  const handleContact = (name: string) => {
    const msg = locale === "ar" ? `جارٍ الاتصال بـ ${name}...` : `Contacting ${name}...`;
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
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

      {/* Department Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-ink-muted shrink-0" />
        <button
          onClick={() => setActiveDept("all")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            activeDept === "all"
              ? "bg-navy text-white"
              : "bg-gray-100 text-ink-soft hover:bg-gray-200"
          }`}
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveDept(dept.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              activeDept === dept.id
                ? "bg-navy text-white"
                : "bg-gray-100 text-ink-soft hover:bg-gray-200"
            }`}
          >
            {dept.name[locale]}
          </button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((doc, i) => {
          const dept = departments.find((d) => d.id === doc.departmentId);
          const status = staffStatuses[doc.id] || "off";
          const initials = doc.name[locale]
            .replace(/^(د\.\s*|Dr\.\s*)/, "")
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("");

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="relative mb-3">
                <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-lg">
                  {initials}
                </div>
                <span
                  className={`absolute -bottom-0.5 -end-0.5 w-4 h-4 rounded-full border-2 border-white ${statusDot[status]}`}
                />
              </div>

              <h3 className="text-sm font-semibold text-ink">{doc.name[locale]}</h3>
              <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">{doc.title[locale]}</p>
              <p className="text-xs text-ink-muted mt-0.5">{dept?.name[locale]}</p>

              <span
                className={`mt-3 px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${statusColors[status]}`}
              >
                {statusLabels[status]}
              </span>

              <button
                onClick={() => handleContact(doc.name[locale])}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy/5 transition-colors"
              >
                <Phone className="w-3 h-3" />
                {locale === "ar" ? "تواصل" : "Contact"}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 start-1/2 -translate-x-1/2 bg-navy text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium z-50"
          style={{ transform: "translateX(-50%)" }}
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}
