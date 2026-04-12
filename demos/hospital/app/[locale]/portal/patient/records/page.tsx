"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TestTubes,
  ScanLine,
  Stethoscope,
  FileText,
  ChevronDown,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useMedicalRecords } from "@/lib/hospitalStore";
import { doctors } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const typeIcons: Record<string, LucideIcon> = {
  lab: TestTubes,
  radiology: ScanLine,
  diagnosis: Stethoscope,
  note: FileText,
};

const typeColors: Record<string, string> = {
  lab: "#8B5CF6",
  radiology: "#06B6D4",
  diagnosis: "#F59E0B",
  note: "#6B7280",
};

const statusColors: Record<string, string> = {
  normal: "#10B981",
  abnormal: "#EF4444",
  pending: "#F59E0B",
};

export default function RecordsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.records;
  const cs = dict.portals.common.status;

  const records = useMedicalRecords();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const statusLabels: Record<string, string> = {
    normal: cs.normal,
    abnormal: cs.abnormal,
    pending: cs.pending,
  };

  const typeLabels: Record<string, string> = {
    lab: p.labResults,
    radiology: p.radiologyReports,
    diagnosis: p.diagnoses,
    note: p.notes,
  };

  // Group records by type
  const grouped = records.reduce<Record<string, typeof records>>((acc, rec) => {
    if (!acc[rec.type]) acc[rec.type] = [];
    acc[rec.type].push(rec);
    return acc;
  }, {});

  const typeOrder = ["lab", "radiology", "diagnosis", "note"];

  return (
    <div className="p-5 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-ink">{p.title}</h1>
      </motion.div>

      {records.length === 0 ? (
        <div className="text-center py-16 text-ink-muted">{p.noRecords}</div>
      ) : (
        <div className="space-y-6">
          {typeOrder.map((type) => {
            const items = grouped[type];
            if (!items || items.length === 0) return null;
            const Icon = typeIcons[type] ?? FileText;
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4.5 h-4.5" style={{ color: typeColors[type] }} />
                  <h2 className="font-bold text-ink">{typeLabels[type]}</h2>
                </div>
                <div className="space-y-2">
                  {items
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((rec) => {
                      const doc = doctors.find((d) => d.id === rec.doctorId);
                      const isExpanded = expandedId === rec.id;
                      return (
                        <div
                          key={rec.id}
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : rec.id)
                            }
                            className="w-full p-4 flex items-center gap-4 text-start hover:bg-gray-50 transition-colors"
                          >
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${typeColors[type]}15` }}
                            >
                              <Icon
                                className="w-4.5 h-4.5"
                                style={{ color: typeColors[type] }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-ink truncate">
                                {rec.title[locale]}
                              </div>
                              <div className="text-xs text-ink-muted">
                                {doc?.name[locale]} &middot; {rec.date}
                              </div>
                            </div>
                            <span
                              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shrink-0"
                              style={{ background: statusColors[rec.status] }}
                            >
                              {statusLabels[rec.status]}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-ink-muted transition-transform shrink-0 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-0">
                                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-ink-soft leading-relaxed">
                                    {rec.details}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
