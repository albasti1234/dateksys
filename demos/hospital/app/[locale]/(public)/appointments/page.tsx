"use client";

import { use, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { departments, doctors } from "@/lib/data";
import { saveAppointment } from "@/lib/hospitalStore";
import {
  Heart,
  Bone,
  Baby,
  HeartHandshake,
  Brain,
  Siren,
  ScanLine,
  Stethoscope,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Building,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart,
  Bone,
  Baby,
  HeartHandshake,
  Brain,
  Siren,
  ScanLine,
  Stethoscope,
};

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h <= 16; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 16) slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

function getNext7Days(): { date: string; dayName: string; dayNum: number }[] {
  const days: { date: string; dayName: string; dayNum: number }[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      date: d.toISOString().split("T")[0],
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
    });
  }
  return days;
}

const STEPS = ["department", "doctor", "dateTime", "confirm"] as const;

export default function AppointmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const a = dict.appointments;

  const [step, setStep] = useState(0);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);
  const [refId, setRefId] = useState("");

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const next7Days = useMemo(() => getNext7Days(), []);

  const filteredDoctors = useMemo(
    () => doctors.filter((d) => d.departmentId === selectedDept),
    [selectedDept]
  );

  const selectedDeptObj = departments.find((d) => d.id === selectedDept);
  const selectedDoctorObj = doctors.find((d) => d.id === selectedDoctor);

  function handleConfirm() {
    const apt = saveAppointment({
      patientName,
      doctorId: selectedDoctor,
      departmentId: selectedDept,
      date: selectedDate,
      time: selectedTime,
      status: "upcoming",
      notes: notes || undefined,
    });
    setRefId(apt.id);
    setBooked(true);
  }

  function resetForm() {
    setStep(0);
    setSelectedDept("");
    setSelectedDoctor("");
    setSelectedDate("");
    setSelectedTime("");
    setPatientName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setBooked(false);
    setRefId("");
  }

  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  // Steps indicator labels
  const stepLabels = [
    a.steps.department,
    a.steps.doctor,
    a.steps.dateTime,
    a.steps.confirm,
  ];

  return (
    <>
      <PageHero
        locale={locale}
        label={a.heroLabel}
        title={a.heroTitle}
        subtitle={a.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: a.heroLabel },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Progress Steps */}
          {!booked && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {stepLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      i === step
                        ? "bg-teal text-white"
                        : i < step
                        ? "bg-teal/10 text-teal"
                        : "bg-gray-100 text-ink-muted"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                      {i < step ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-6 h-0.5 ${
                        i < step ? "bg-teal" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Department */}
            {step === 0 && !booked && (
              <motion.div
                key="dept"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
              >
                <h2
                  className={`text-2xl font-bold text-ink mb-6 text-center ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {a.steps.department}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {departments.map((dept) => {
                    const Icon = iconMap[dept.icon];
                    return (
                      <button
                        key={dept.id}
                        onClick={() => {
                          setSelectedDept(dept.id);
                          setSelectedDoctor("");
                          setStep(1);
                        }}
                        className={`card p-5 text-center cursor-pointer transition-all ${
                          selectedDept === dept.id
                            ? "ring-2 ring-teal"
                            : "hover:ring-1 hover:ring-teal/40"
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                          style={{ backgroundColor: `${dept.color}15` }}
                        >
                          {Icon && (
                            <Icon
                              className="w-6 h-6"
                              style={{ color: dept.color }}
                            />
                          )}
                        </div>
                        <p
                          className={`text-sm font-semibold text-ink ${
                            isRTL ? "font-arabic-display" : "font-heading"
                          }`}
                        >
                          {dept.name[locale]}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Doctor */}
            {step === 1 && !booked && (
              <motion.div
                key="doc"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
              >
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1 text-sm text-teal mb-6 hover:underline"
                >
                  <BackIcon className="w-4 h-4" />
                  {dict.common.back}
                </button>
                <h2
                  className={`text-2xl font-bold text-ink mb-6 text-center ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {a.steps.doctor}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctor(doc.id);
                        setStep(2);
                      }}
                      className={`card p-5 text-start cursor-pointer transition-all ${
                        selectedDoctor === doc.id
                          ? "ring-2 ring-teal"
                          : "hover:ring-1 hover:ring-teal/40"
                      }`}
                    >
                      <p
                        className={`font-bold text-ink mb-1 ${
                          isRTL ? "font-arabic-display" : "font-heading"
                        }`}
                      >
                        {doc.name[locale]}
                      </p>
                      <p className="text-sm text-ink-soft mb-2">
                        {doc.title[locale]}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-ink-muted">
                        <span>
                          {doc.yearsExperience}{" "}
                          {isRTL ? "سنة خبرة" : "yrs exp."}
                        </span>
                        <span>★ {doc.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Date & Time + Patient Info */}
            {step === 2 && !booked && (
              <motion.div
                key="datetime"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
              >
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm text-teal mb-6 hover:underline"
                >
                  <BackIcon className="w-4 h-4" />
                  {dict.common.back}
                </button>
                <h2
                  className={`text-2xl font-bold text-ink mb-6 text-center ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {a.steps.dateTime}
                </h2>

                {/* Date Grid */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-ink mb-3">
                    <Calendar className="w-4 h-4 inline-block me-1.5" />
                    {a.form.selectDate}
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {next7Days.map((day) => (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedDate === day.date
                            ? "bg-teal text-white"
                            : "bg-gray-50 border border-border text-ink hover:border-teal/40"
                        }`}
                      >
                        <div className="text-[10px] font-medium uppercase opacity-70">
                          {day.dayName}
                        </div>
                        <div className="text-lg font-bold">{day.dayNum}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-ink mb-3">
                      <Clock className="w-4 h-4 inline-block me-1.5" />
                      {a.form.selectTime}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            selectedTime === slot
                              ? "bg-teal text-white"
                              : "bg-gray-50 border border-border text-ink hover:border-teal/40"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patient Info */}
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 mt-8 border-t border-border pt-8"
                  >
                    <h3
                      className={`text-lg font-bold text-ink mb-4 ${
                        isRTL ? "font-arabic-display" : "font-heading"
                      }`}
                    >
                      <User className="w-4 h-4 inline-block me-1.5" />
                      {isRTL ? "بيانات المريض" : "Patient Information"}
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        {a.form.patientName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1.5">
                          {a.form.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1.5">
                          {a.form.email}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        {a.form.notes}
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition resize-none"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (patientName && phone) setStep(3);
                      }}
                      disabled={!patientName || !phone}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {dict.common.next}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 3 && !booked && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
              >
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-sm text-teal mb-6 hover:underline"
                >
                  <BackIcon className="w-4 h-4" />
                  {dict.common.back}
                </button>
                <h2
                  className={`text-2xl font-bold text-ink mb-6 text-center ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {a.steps.confirm}
                </h2>

                <div className="card p-6 space-y-4 mb-6">
                  <Row
                    icon={<Building className="w-4 h-4 text-teal" />}
                    label={a.form.department}
                    value={selectedDeptObj?.name[locale] ?? ""}
                  />
                  <Row
                    icon={<User className="w-4 h-4 text-teal" />}
                    label={a.form.doctor}
                    value={selectedDoctorObj?.name[locale] ?? ""}
                  />
                  <Row
                    icon={<Calendar className="w-4 h-4 text-teal" />}
                    label={a.form.date}
                    value={selectedDate}
                  />
                  <Row
                    icon={<Clock className="w-4 h-4 text-teal" />}
                    label={a.form.time}
                    value={selectedTime}
                  />
                  <div className="border-t border-border pt-4" />
                  <Row
                    icon={<User className="w-4 h-4 text-navy" />}
                    label={a.form.patientName}
                    value={patientName}
                  />
                  <Row
                    icon={<User className="w-4 h-4 text-navy" />}
                    label={a.form.phone}
                    value={phone}
                  />
                  {email && (
                    <Row
                      icon={<User className="w-4 h-4 text-navy" />}
                      label={a.form.email}
                      value={email}
                    />
                  )}
                  {notes && (
                    <Row
                      icon={<User className="w-4 h-4 text-navy" />}
                      label={a.form.notes}
                      value={notes}
                    />
                  )}
                </div>

                <button onClick={handleConfirm} className="btn-primary w-full">
                  {dict.common.confirm}
                </button>
              </motion.div>
            )}

            {/* Success */}
            {booked && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald" />
                </div>
                <h2
                  className={`text-2xl font-bold text-ink mb-3 ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {a.confirmation.title}
                </h2>
                <p className="text-ink-soft mb-2">{a.confirmation.subtitle}</p>
                <p className="text-sm text-ink-muted mb-8">
                  {a.confirmation.referenceNumber}:{" "}
                  <span className="font-mono font-bold text-ink">{refId}</span>
                </p>
                <button onClick={resetForm} className="btn-outline">
                  {a.confirmation.bookAnother}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm text-ink-muted w-28 shrink-0">{label}</span>
      <span className="text-sm font-medium text-ink">{value}</span>
    </div>
  );
}
