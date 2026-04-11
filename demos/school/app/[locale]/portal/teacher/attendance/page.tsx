"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, XCircle, Sparkles, Users, Scan } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { saveAttendanceRecord } from "@/lib/schoolStore";

const portraits = [
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
];

const summaryIcons = [CheckCircle2, XCircle, Users];

export default function SmartAttendancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.portals.teacher.attendance;
  const isRTL = locale === "ar";
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  const handleSave = () => {
    const present = a.students
      .filter((s) => s.status === "present")
      .map((s) => s.name);
    const absent = a.students
      .filter((s) => s.status === "absent")
      .map((s) => s.name);

    saveAttendanceRecord({
      classId: "grade-10-a-math",
      date: new Date().toISOString(),
      present,
      absent,
      savedAt: new Date().toISOString(),
    });

    setSaved(true);
    setToast(
      locale === "ar"
        ? `تمّ حفظ الحضور بنجاح · ${present.length} حاضر، ${absent.length} غائب`
        : `Attendance saved · ${present.length} present, ${absent.length} absent`
    );

    setTimeout(() => setToast(null), 3500);
    setTimeout(() => {
      setScanned(false);
      setSaved(false);
    }, 3500);
  };

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const bigHeadingClass = isRTL
    ? "font-arabic-display text-4xl font-bold mb-4 leading-[1.4]"
    : "font-serif text-4xl font-bold mb-4";

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
          <p className="section-label">{a.hero.label}</p>
        </div>
        <h1 className={h1Class}>{a.hero.title}</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">{a.hero.subtitle}</p>
      </div>

      {!scanned ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-navy)] text-white p-10 lg:p-16 text-center relative overflow-hidden mb-8"
        >
          <div
            className="absolute top-0 end-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
            style={{ background: "#C19A4B" }}
          />
          <div className="relative max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 border-4 border-[var(--color-gold)] flex items-center justify-center">
              <Camera className="w-10 h-10 text-[var(--color-gold)]" />
            </div>
            <h2 className={bigHeadingClass}>{a.hero.title}</h2>
            <p
              className={`text-white/70 mb-10 ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {a.hero.description}
            </p>
            <button
              onClick={handleScan}
              disabled={scanning}
              className="px-10 py-4 bg-[var(--color-gold)] text-white font-bold tracking-wider text-sm hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50 inline-flex items-center gap-3"
            >
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ...
                </>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  {a.scanButton}
                </>
              )}
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-5 mb-8"
          >
            {a.summary.map((s, i) => {
              const Icon = summaryIcons[i];
              const bg = i === 0 ? "bg-green-600" : i === 1 ? "bg-red-600" : "bg-[var(--color-navy)]";
              return (
                <div key={s.label} className={`${bg} text-white p-6`}>
                  <Icon className="w-6 h-6 mb-3" />
                  <div
                    className={`text-4xl font-bold ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs tracking-wider">{s.label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Students grid */}
          <div className="bg-white border border-[var(--color-border)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-xl font-bold text-[var(--color-navy)] ${
                  isRTL ? "font-arabic-display" : "font-serif"
                }`}
              >
                {a.detectionTitle}
              </h3>
              <button
                onClick={() => setScanned(false)}
                className="text-xs font-semibold tracking-wider text-[var(--color-gold)]"
              >
                {a.rescanButton}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {a.students.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <div
                    className="aspect-square bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${portraits[i % portraits.length]}')`,
                    }}
                  >
                    <div
                      className={`absolute inset-0 ${
                        s.status === "present"
                          ? "bg-green-500/20"
                          : "bg-red-500/40"
                      }`}
                    />
                    <div
                      className={`absolute top-2 end-2 w-8 h-8 rounded-full flex items-center justify-center ${
                        s.status === "present" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {s.status === "present" ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-[var(--color-border)] border-t-0">
                    <div className="text-sm font-semibold text-[var(--color-navy)] truncate">
                      {s.name}
                    </div>
                    <div
                      className={`text-[10px] font-bold tracking-wider ${
                        s.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {a.statusLabels[s.status as "present" | "absent"]}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleSave}
              disabled={saved}
              className={`mt-6 w-full justify-center ${
                saved
                  ? "btn-outline !border-green-500 !text-green-700"
                  : "btn-primary"
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {locale === "ar" ? "تمّ الحفظ" : "Saved"}
                </>
              ) : (
                a.confirmButton
              )}
            </button>
          </div>
        </>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[60] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3 max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
