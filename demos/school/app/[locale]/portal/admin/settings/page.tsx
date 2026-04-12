"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  School,
  Calendar,
  Bell,
  Globe,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Shield,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type SettingsSection = "school" | "academic" | "notifications" | "system";

export default function AdminSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [activeSection, setActiveSection] = useState<SettingsSection>("school");
  const [toast, setToast] = useState<string | null>(null);

  // School info state
  const [schoolName, setSchoolName] = useState({ ar: "أكاديمية النخلة الدولية", en: "Al-Nakhla International Academy" });
  const [schoolPhone, setSchoolPhone] = useState("+962 6 555 1234");
  const [schoolEmail, setSchoolEmail] = useState("info@alnakhla.edu.jo");
  const [schoolAddress, setSchoolAddress] = useState({
    ar: "عمّان، الأردن - شارع المدينة المنورة",
    en: "Amman, Jordan - Al-Madina Al-Munawwara St.",
  });
  const [principalName, setPrincipalName] = useState({
    ar: "د. سميرة الخطيب",
    en: "Dr. Sameera Al-Khatib",
  });

  // Academic year state
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [semester1Start, setSemester1Start] = useState("2025-09-01");
  const [semester1End, setSemester1End] = useState("2026-01-20");
  const [semester2Start, setSemester2Start] = useState("2026-02-01");
  const [semester2End, setSemester2End] = useState("2026-06-20");
  const [gradingSystem, setGradingSystem] = useState("percentage");

  // Notification state
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  const [parentUpdates, setParentUpdates] = useState(false);

  // System state
  const [defaultLang, setDefaultLang] = useState<"ar" | "en">("ar");
  const [timezone, setTimezone] = useState("Asia/Amman");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSave = () => {
    setToast(locale === "ar" ? "تم حفظ الإعدادات بنجاح" : "Settings saved successfully");
  };

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const sectionTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "إعدادات النظام", en: "System Settings" },
    subtitle: { ar: "إدارة إعدادات الأكاديمية والنظام", en: "Manage academy & system settings" },
    save: { ar: "حفظ التغييرات", en: "Save Changes" },
    tabs: {
      school: { ar: "معلومات المدرسة", en: "School Info", icon: School },
      academic: { ar: "العام الدراسي", en: "Academic Year", icon: Calendar },
      notifications: { ar: "الإشعارات", en: "Notifications", icon: Bell },
      system: { ar: "النظام", en: "System", icon: Globe },
    },
    school: {
      title: { ar: "معلومات المدرسة", en: "School Information" },
      nameAr: { ar: "اسم المدرسة (عربي)", en: "School Name (Arabic)" },
      nameEn: { ar: "اسم المدرسة (إنجليزي)", en: "School Name (English)" },
      phone: { ar: "الهاتف", en: "Phone" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      addressAr: { ar: "العنوان (عربي)", en: "Address (Arabic)" },
      addressEn: { ar: "العنوان (إنجليزي)", en: "Address (English)" },
      principal: { ar: "مدير/ة المدرسة", en: "Principal" },
      principalAr: { ar: "الاسم (عربي)", en: "Name (Arabic)" },
      principalEn: { ar: "الاسم (إنجليزي)", en: "Name (English)" },
    },
    academic: {
      title: { ar: "إعدادات العام الدراسي", en: "Academic Year Settings" },
      year: { ar: "العام الدراسي", en: "Academic Year" },
      sem1: { ar: "الفصل الأول", en: "First Semester" },
      sem2: { ar: "الفصل الثاني", en: "Second Semester" },
      start: { ar: "البداية", en: "Start" },
      end: { ar: "النهاية", en: "End" },
      grading: { ar: "نظام التقييم", en: "Grading System" },
      percentage: { ar: "نسبة مئوية", en: "Percentage" },
      letter: { ar: "حرفي (A-F)", en: "Letter (A-F)" },
      gpa: { ar: "معدّل تراكمي", en: "GPA (4.0)" },
    },
    notifications: {
      title: { ar: "إعدادات الإشعارات", en: "Notification Settings" },
      channels: { ar: "قنوات الإشعار", en: "Notification Channels" },
      emailNotif: { ar: "إشعارات البريد الإلكتروني", en: "Email Notifications" },
      smsNotif: { ar: "إشعارات الرسائل النصية", en: "SMS Notifications" },
      types: { ar: "أنواع الإشعارات", en: "Notification Types" },
      attendance: { ar: "تنبيهات الحضور والغياب", en: "Attendance Alerts" },
      payments: { ar: "تذكيرات الدفع", en: "Payment Reminders" },
      exams: { ar: "تذكيرات الامتحانات", en: "Exam Reminders" },
      parentUpdates: { ar: "تحديثات أولياء الأمور", en: "Parent Updates" },
    },
    system: {
      title: { ar: "إعدادات النظام", en: "System Settings" },
      language: { ar: "اللغة الافتراضية", en: "Default Language" },
      arabic: { ar: "العربية", en: "Arabic" },
      english: { ar: "الإنجليزية", en: "English" },
      timezone: { ar: "المنطقة الزمنية", en: "Timezone" },
      dateFormat: { ar: "تنسيق التاريخ", en: "Date Format" },
      maintenance: { ar: "وضع الصيانة", en: "Maintenance Mode" },
      maintenanceDesc: { ar: "تفعيل وضع الصيانة يمنع الوصول للبوابات", en: "Enabling maintenance mode blocks portal access" },
      security: { ar: "الأمان", en: "Security" },
      lastBackup: { ar: "آخر نسخة احتياطية", en: "Last Backup" },
      backupNow: { ar: "نسخ احتياطي الآن", en: "Backup Now" },
      backupStarted: { ar: "بدأ النسخ الاحتياطي...", en: "Backup started..." },
    },
  };

  const sections: { key: SettingsSection; icon: typeof School }[] = [
    { key: "school", icon: School },
    { key: "academic", icon: Calendar },
    { key: "notifications", icon: Bell },
    { key: "system", icon: Globe },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">{T.title[locale]}</p>
          <h1 className={h1Class}>{T.subtitle[locale]}</h1>
        </div>
        <button onClick={handleSave} className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)] inline-flex">
          <Save className="w-4 h-4" />
          {T.save[locale]}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[var(--color-border)] overflow-hidden">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full flex items-center gap-3 p-4 text-sm font-semibold transition-all border-b border-[var(--color-border)] last:border-b-0 ${
                    activeSection === s.key
                      ? "bg-[var(--color-navy)] text-white"
                      : "text-[var(--color-navy)] hover:bg-[var(--color-cream)]"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeSection === s.key ? "text-[var(--color-gold)]" : ""}`} />
                  {T.tabs[s.key][locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="lg:col-span-3 bg-white border border-[var(--color-border)] p-6 md:p-8">
          {/* School Info */}
          {activeSection === "school" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className={sectionTitleClass}>{T.school.title[locale]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FieldGroup label={T.school.nameAr[locale]} icon={School}>
                  <input type="text" value={schoolName.ar} onChange={(e) => setSchoolName({ ...schoolName, ar: e.target.value })} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" dir="rtl" />
                </FieldGroup>
                <FieldGroup label={T.school.nameEn[locale]} icon={School}>
                  <input type="text" value={schoolName.en} onChange={(e) => setSchoolName({ ...schoolName, en: e.target.value })} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                </FieldGroup>
                <FieldGroup label={T.school.phone[locale]} icon={Phone}>
                  <input type="tel" value={schoolPhone} onChange={(e) => setSchoolPhone(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" dir="ltr" />
                </FieldGroup>
                <FieldGroup label={T.school.email[locale]} icon={Mail}>
                  <input type="email" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" dir="ltr" />
                </FieldGroup>
                <FieldGroup label={T.school.addressAr[locale]} icon={MapPin}>
                  <input type="text" value={schoolAddress.ar} onChange={(e) => setSchoolAddress({ ...schoolAddress, ar: e.target.value })} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" dir="rtl" />
                </FieldGroup>
                <FieldGroup label={T.school.addressEn[locale]} icon={MapPin}>
                  <input type="text" value={schoolAddress.en} onChange={(e) => setSchoolAddress({ ...schoolAddress, en: e.target.value })} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                </FieldGroup>
              </div>
              <div className="pt-6 border-t border-[var(--color-border)]">
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.school.principal[locale]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldGroup label={T.school.principalAr[locale]}>
                    <input type="text" value={principalName.ar} onChange={(e) => setPrincipalName({ ...principalName, ar: e.target.value })} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" dir="rtl" />
                  </FieldGroup>
                  <FieldGroup label={T.school.principalEn[locale]}>
                    <input type="text" value={principalName.en} onChange={(e) => setPrincipalName({ ...principalName, en: e.target.value })} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                  </FieldGroup>
                </div>
              </div>
            </motion.div>
          )}

          {/* Academic Year */}
          {activeSection === "academic" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className={sectionTitleClass}>{T.academic.title[locale]}</h2>
              <FieldGroup label={T.academic.year[locale]} icon={Calendar}>
                <input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
              </FieldGroup>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.academic.sem1[locale]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldGroup label={T.academic.start[locale]}>
                    <input type="date" value={semester1Start} onChange={(e) => setSemester1Start(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                  </FieldGroup>
                  <FieldGroup label={T.academic.end[locale]}>
                    <input type="date" value={semester1End} onChange={(e) => setSemester1End(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                  </FieldGroup>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.academic.sem2[locale]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldGroup label={T.academic.start[locale]}>
                    <input type="date" value={semester2Start} onChange={(e) => setSemester2Start(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                  </FieldGroup>
                  <FieldGroup label={T.academic.end[locale]}>
                    <input type="date" value={semester2End} onChange={(e) => setSemester2End(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                  </FieldGroup>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.academic.grading[locale]}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(["percentage", "letter", "gpa"] as const).map((sys) => (
                    <button
                      key={sys}
                      onClick={() => setGradingSystem(sys)}
                      className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                        gradingSystem === sys
                          ? "bg-[var(--color-navy)] text-white"
                          : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
                      }`}
                    >
                      {T.academic[sys][locale]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className={sectionTitleClass}>{T.notifications.title[locale]}</h2>

              <div>
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.notifications.channels[locale]}
                </h3>
                <div className="space-y-3">
                  <ToggleRow label={T.notifications.emailNotif[locale]} checked={emailNotif} onChange={setEmailNotif} icon={Mail} />
                  <ToggleRow label={T.notifications.smsNotif[locale]} checked={smsNotif} onChange={setSmsNotif} icon={Phone} />
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.notifications.types[locale]}
                </h3>
                <div className="space-y-3">
                  <ToggleRow label={T.notifications.attendance[locale]} checked={attendanceAlerts} onChange={setAttendanceAlerts} />
                  <ToggleRow label={T.notifications.payments[locale]} checked={paymentReminders} onChange={setPaymentReminders} />
                  <ToggleRow label={T.notifications.exams[locale]} checked={examReminders} onChange={setExamReminders} />
                  <ToggleRow label={T.notifications.parentUpdates[locale]} checked={parentUpdates} onChange={setParentUpdates} />
                </div>
              </div>
            </motion.div>
          )}

          {/* System */}
          {activeSection === "system" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className={sectionTitleClass}>{T.system.title[locale]}</h2>

              <div>
                <h3 className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-2 font-bold">
                  {T.system.language[locale]}
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDefaultLang("ar")}
                    className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                      defaultLang === "ar"
                        ? "bg-[var(--color-navy)] text-white"
                        : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
                    }`}
                  >
                    {T.system.arabic[locale]}
                  </button>
                  <button
                    onClick={() => setDefaultLang("en")}
                    className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                      defaultLang === "en"
                        ? "bg-[var(--color-navy)] text-white"
                        : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
                    }`}
                  >
                    {T.system.english[locale]}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FieldGroup label={T.system.timezone[locale]} icon={Globe}>
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]">
                    <option value="Asia/Amman">Asia/Amman (GMT+3)</option>
                    <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                  </select>
                </FieldGroup>
                <FieldGroup label={T.system.dateFormat[locale]}>
                  <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </FieldGroup>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <ToggleRow
                  label={T.system.maintenance[locale]}
                  checked={maintenanceMode}
                  onChange={setMaintenanceMode}
                  icon={Settings}
                  description={T.system.maintenanceDesc[locale]}
                  danger
                />
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                  {T.system.security[locale]}
                </h3>
                <div className="flex items-center justify-between p-4 bg-[var(--color-cream)]">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[var(--color-gold)]" />
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-navy)]">{T.system.lastBackup[locale]}</div>
                      <div className="text-xs text-[var(--color-ink-soft)] num">2026-04-11 23:00</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setToast(T.system.backupStarted[locale])}
                    className="btn-outline text-xs"
                  >
                    {T.system.backupNow[locale]}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
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
            <span className="font-semibold">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldGroup({
  label, icon: Icon, children,
}: {
  label: string; icon?: typeof School; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-2 block font-bold flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({
  label, checked, onChange, icon: Icon, description, danger,
}: {
  label: string; checked: boolean; onChange: (v: boolean) => void; icon?: typeof Mail; description?: string; danger?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between p-4 ${danger && checked ? "bg-red-50 border border-red-200" : "bg-[var(--color-cream)]"}`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className={`w-5 h-5 ${danger && checked ? "text-red-600" : "text-[var(--color-gold)]"}`} />}
        <div>
          <div className={`text-sm font-semibold ${danger && checked ? "text-red-700" : "text-[var(--color-navy)]"}`}>{label}</div>
          {description && <div className="text-xs text-[var(--color-ink-soft)] mt-0.5">{description}</div>}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          checked
            ? danger
              ? "bg-red-600"
              : "bg-[var(--color-gold)]"
            : "bg-gray-300"
        }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow"
        />
      </button>
    </div>
  );
}
