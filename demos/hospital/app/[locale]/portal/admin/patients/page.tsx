"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Phone, Calendar, User } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

type Patient = {
  id: string;
  name: { ar: string; en: string };
  phone: string;
  lastVisit: string;
  status: "active" | "discharged";
  dob: string;
  nationalId: string;
  bloodType: string;
  insurance: { ar: string; en: string };
};

const mockPatients: Patient[] = [
  { id: "P-1001", name: { ar: "أحمد الخالدي", en: "Ahmad Al-Khalidi" }, phone: "079-123-4567", lastVisit: "2026-04-10", status: "active", dob: "1980-03-15", nationalId: "9801234567", bloodType: "A+", insurance: { ar: "التأمين الأردنية", en: "Jordan Insurance" } },
  { id: "P-1002", name: { ar: "فاطمة العمري", en: "Fatima Al-Omari" }, phone: "078-234-5678", lastVisit: "2026-04-08", status: "active", dob: "1992-07-22", nationalId: "9921234567", bloodType: "O+", insurance: { ar: "المجموعة العربية", en: "Arab Orient" } },
  { id: "P-1003", name: { ar: "سمير العبادي", en: "Samir Al-Abadi" }, phone: "077-345-6789", lastVisit: "2026-04-05", status: "active", dob: "1975-11-03", nationalId: "9751234567", bloodType: "B+", insurance: { ar: "الشرق الأوسط", en: "Middle East Insurance" } },
  { id: "P-1004", name: { ar: "ليلى الحسن", en: "Layla Al-Hassan" }, phone: "079-456-7890", lastVisit: "2026-03-28", status: "active", dob: "1988-01-19", nationalId: "9881234567", bloodType: "AB+", insurance: { ar: "التضامن", en: "Solidarity" } },
  { id: "P-1005", name: { ar: "عمر الصالح", en: "Omar Al-Saleh" }, phone: "078-567-8901", lastVisit: "2026-03-20", status: "discharged", dob: "1965-09-07", nationalId: "9651234567", bloodType: "A-", insurance: { ar: "الوطنية", en: "National Insurance" } },
  { id: "P-1006", name: { ar: "نادية البكري", en: "Nadia Al-Bakri" }, phone: "077-678-9012", lastVisit: "2026-04-11", status: "active", dob: "1995-04-30", nationalId: "9951234567", bloodType: "O-", insurance: { ar: "دلتا", en: "Delta Insurance" } },
  { id: "P-1007", name: { ar: "خالد الطراونة", en: "Khaled Al-Tarawneh" }, phone: "079-789-0123", lastVisit: "2026-03-15", status: "discharged", dob: "1970-12-11", nationalId: "9701234567", bloodType: "B-", insurance: { ar: "مدنت", en: "MedNet" } },
  { id: "P-1008", name: { ar: "هند الشمايلة", en: "Hind Al-Shamayleh" }, phone: "078-890-1234", lastVisit: "2026-04-09", status: "active", dob: "1983-06-25", nationalId: "9831234567", bloodType: "A+", insurance: { ar: "التأمين الأردنية", en: "Jordan Insurance" } },
  { id: "P-1009", name: { ar: "ماجد القضاة", en: "Majed Al-Qudah" }, phone: "077-901-2345", lastVisit: "2026-02-28", status: "discharged", dob: "1958-08-14", nationalId: "9581234567", bloodType: "O+", insurance: { ar: "المجموعة العربية", en: "Arab Orient" } },
  { id: "P-1010", name: { ar: "رنا الزعبي", en: "Rana Al-Zaabi" }, phone: "079-012-3456", lastVisit: "2026-04-12", status: "active", dob: "1990-02-08", nationalId: "9901234567", bloodType: "AB-", insurance: { ar: "التضامن", en: "Solidarity" } },
];

export default function AdminPatients({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.patients;

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);

  const filtered = mockPatients.filter((p) =>
    p.name[locale].toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  const statusLabel = (s: string) =>
    s === "active"
      ? locale === "ar" ? "فعّال" : "Active"
      : locale === "ar" ? "خرج" : "Discharged";

  return (
    <div className="p-5 lg:p-8 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-ink"
      >
        {t.title}
      </motion.h1>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
        <input
          type="text"
          placeholder={dict.common.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ps-10 pe-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-ink"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-start font-semibold text-ink-soft">{t.patientId}</th>
                <th className="px-4 py-3 text-start font-semibold text-ink-soft">{t.name}</th>
                <th className="px-4 py-3 text-start font-semibold text-ink-soft">{t.phone}</th>
                <th className="px-4 py-3 text-start font-semibold text-ink-soft">{t.lastVisit}</th>
                <th className="px-4 py-3 text-start font-semibold text-ink-soft">{t.status}</th>
                <th className="px-4 py-3 text-start font-semibold text-ink-soft">{dict.portals.common.table.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-ink-muted text-xs">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-ink">{p.name[locale]}</td>
                  <td className="px-4 py-3 text-ink-soft" dir="ltr">{p.phone}</td>
                  <td className="px-4 py-3 text-ink-soft">{p.lastVisit}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                        p.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {statusLabel(p.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(p)}
                      className="text-xs font-medium text-navy hover:underline"
                    >
                      {t.viewRecord}
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-ink-muted">
                    {dict.common.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">{selected.name[locale]}</h3>
                <button onClick={() => setSelected(null)} className="text-ink-muted hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-ink-soft">
                  <User className="w-4 h-4 text-ink-muted" />
                  <span>{t.patientId}: {selected.id}</span>
                </div>
                <div className="flex items-center gap-3 text-ink-soft">
                  <Phone className="w-4 h-4 text-ink-muted" />
                  <span dir="ltr">{selected.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-ink-soft">
                  <Calendar className="w-4 h-4 text-ink-muted" />
                  <span>{locale === "ar" ? "تاريخ الميلاد" : "Date of Birth"}: {selected.dob}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-ink-muted">{locale === "ar" ? "الرقم الوطني" : "National ID"}</p>
                    <p className="font-medium text-ink">{selected.nationalId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{locale === "ar" ? "فصيلة الدم" : "Blood Type"}</p>
                    <p className="font-medium text-ink">{selected.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{locale === "ar" ? "التأمين" : "Insurance"}</p>
                    <p className="font-medium text-ink">{selected.insurance[locale]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{t.status}</p>
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                        selected.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {statusLabel(selected.status)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="w-full py-2.5 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-navy-dark transition-colors"
              >
                {dict.common.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
