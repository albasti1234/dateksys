"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Star,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

// Icons 
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart, Bone, Baby, HeartHandshake, Brain, Siren, ScanLine, Stethoscope,
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

const formSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

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
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [step, setStep] = useState(0);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState(false);
  const [refId, setRefId] = useState("");

  const { register, handleSubmit, formState: { errors }, trigger, getValues, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { patientName: "", phone: "", email: "", notes: "" }
  });

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const next7Days = useMemo(() => getNext7Days(), []);

  const filteredDoctors = useMemo(
    () => doctors.filter((d) => d.departmentId === selectedDept),
    [selectedDept]
  );

  const selectedDeptObj = departments.find((d) => d.id === selectedDept);
  const selectedDoctorObj = doctors.find((d) => d.id === selectedDoctor);

  async function handleNextToConfirm() {
    // Manually trigger validation on step 3 before proceeding
    const isValid = await trigger(["patientName", "phone", "email"]);
    if (isValid && selectedDate && selectedTime) {
      setStep(3);
    }
  }

  function handleConfirm(data: FormData) {
    const apt = saveAppointment({
      patientName: data.patientName,
      doctorId: selectedDoctor,
      departmentId: selectedDept,
      date: selectedDate,
      time: selectedTime,
      status: "upcoming",
      notes: data.notes || undefined,
    });
    setRefId(apt.id);
    setBooked(true);
  }

  function resetFlow() {
    setStep(0);
    setSelectedDept("");
    setSelectedDoctor("");
    setSelectedDate("");
    setSelectedTime("");
    setBooked(false);
    setRefId("");
    reset();
  }

  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

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
        imageUrl="/demos/hospital/images/hospital_hero.png"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: a.heroLabel },
        ]}
      />

      <section className="py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          
          {/* Progress Steps */}
          {!booked && (
            <div className="flex items-center justify-between mb-16 relative">
              {/* Backing Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-teal -z-0 transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />

              {stepLabels.map((label, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                      i === step
                        ? "bg-navy text-white ring-4 ring-navy/10"
                        : i < step
                        ? "bg-teal text-white"
                        : "bg-white text-ink-muted border border-gray-200"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`hidden sm:block text-sm font-semibold ${i <= step ? "text-navy" : "text-ink-muted"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-gray-100 p-8 lg:p-12 min-h-[500px] relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" />

            <AnimatePresence mode="wait">
              {/* Step 1: Department */}
              {step === 0 && !booked && (
                <motion.div
                  key="dept"
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  className="relative z-10"
                >
                  <h2 className={`text-3xl font-bold text-navy mb-8 text-center ${fontHeading}`}>
                    {a.steps.department}
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                          className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group ${
                            selectedDept === dept.id
                              ? "border-teal bg-teal/5 shadow-md shadow-teal/10"
                              : "border-gray-100 bg-white hover:border-teal/30 hover:shadow-lg hover:shadow-navy/5"
                          }`}
                        >
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                            style={{ backgroundColor: `${dept.color}15` }}
                          >
                            {Icon && <Icon className="w-8 h-8" style={{ color: dept.color }} />}
                          </div>
                          <p className={`text-base font-bold text-navy text-center ${fontHeading}`}>
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
                  className="relative z-10"
                >
                  <button onClick={() => setStep(0)} className="absolute top-0 flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-teal transition-colors">
                    <BackIcon className="w-4 h-4" /> {dict.common.back}
                  </button>
                  <h2 className={`text-3xl font-bold text-navy mb-8 mt-10 text-center ${fontHeading}`}>
                    {a.steps.doctor}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDoctors.map((doc, i) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setSelectedDoctor(doc.id);
                          setStep(2);
                        }}
                        className={`flex items-start gap-5 p-6 rounded-2xl border text-start transition-all duration-300 cursor-pointer group ${
                          selectedDoctor === doc.id
                            ? "border-teal bg-teal/5 shadow-md shadow-teal/10"
                            : "border-gray-100 bg-white hover:border-teal/30 hover:shadow-lg"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                          <Image
                            src={i % 2 === 0 ? "/demos/hospital/images/doctor_male.png" : "/demos/hospital/images/doctor_female.png"}
                            alt={doc.name[locale]}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <p className={`text-lg font-bold text-navy mb-1 ${fontHeading}`}>
                            {doc.name[locale]}
                          </p>
                          <p className="text-sm font-medium text-ink-muted mb-3">{doc.title[locale]}</p>
                          <div className="flex items-center gap-4 text-xs font-semibold text-ink-soft">
                            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {doc.rating}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time + Patient Info Form */}
              {step === 2 && !booked && (
                <motion.div
                  key="datetimeform"
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  className="relative z-10"
                >
                  <button onClick={() => setStep(1)} className="absolute top-0 flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-teal transition-colors">
                    <BackIcon className="w-4 h-4" /> {dict.common.back}
                  </button>
                  <h2 className={`text-3xl font-bold text-navy mb-8 mt-10 text-center ${fontHeading}`}>
                    {a.steps.dateTime}
                  </h2>

                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Date/Time Selection */}
                    <div>
                      <div className="mb-8">
                        <label className="flex items-center gap-2 text-base font-bold text-navy mb-4">
                          <Calendar className="w-5 h-5 text-teal" /> {a.form.selectDate}
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {next7Days.map((day) => (
                            <button
                              key={day.date}
                              onClick={() => setSelectedDate(day.date)}
                              className={`p-3 rounded-xl text-center transition-all duration-300 shadow-sm ${
                                selectedDate === day.date
                                  ? "bg-navy text-white shadow-navy/20"
                                  : "bg-gray-50 border border-gray-100 text-ink hover:border-teal/30 hover:bg-white"
                              }`}
                            >
                              <div className="text-xs font-semibold uppercase opacity-70 mb-1">{day.dayName}</div>
                              <div className="text-xl font-bold">{day.dayNum}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedDate && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <label className="flex items-center gap-2 text-base font-bold text-navy mb-4">
                              <Clock className="w-5 h-5 text-teal" /> {a.form.selectTime}
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(slot)}
                                  className={`px-3 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                                    selectedTime === slot
                                      ? "bg-teal text-white shadow-teal/20"
                                      : "bg-gray-50 border border-gray-100 text-ink hover:border-teal/30 hover:bg-white"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right: Patient Form */}
                    <div className="bg-gray-50/50 p-6 sm:p-8 rounded-2xl border border-gray-100">
                      <h3 className={`flex items-center gap-2 text-xl font-bold text-navy mb-6 ${fontHeading}`}>
                        <User className="w-5 h-5 text-teal" />
                        {isRTL ? "بيانات المريض" : "Patient Information"}
                      </h3>

                      <form className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-2">{a.form.patientName} *</label>
                          <div className="relative">
                            <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                              {...register("patientName")}
                              className={`w-full bg-white border ${errors.patientName ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                            />
                          </div>
                          {errors.patientName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.patientName.message}</p>}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-navy mb-2">{a.form.phone} *</label>
                            <div className="relative">
                              <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                              <input
                                {...register("phone")}
                                type="tel"
                                className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                              />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-navy mb-2">{a.form.email}</label>
                            <div className="relative">
                              <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                              <input
                                {...register("email")}
                                type="email"
                                className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                              />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-navy mb-2">{a.form.notes}</label>
                          <div className="relative">
                            <FileText className={`absolute top-4 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                            <textarea
                              {...register("notes")}
                              rows={3}
                              className={`w-full bg-white border border-gray-200 rounded-xl py-3 shadow-sm focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleNextToConfirm}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full py-3.5 px-6 rounded-xl bg-navy text-white font-bold tracking-wide hover:bg-accent hover:text-navy transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md shadow-navy/20 mt-4 outline-none"
                        >
                          {dict.common.next}
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 3 && !booked && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  className="relative z-10 max-w-3xl mx-auto"
                >
                  <button onClick={() => setStep(2)} className="absolute top-0 flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-teal transition-colors">
                    <BackIcon className="w-4 h-4" /> {dict.common.back}
                  </button>
                  <h2 className={`text-3xl font-bold text-navy mb-8 mt-10 text-center ${fontHeading}`}>
                    {a.steps.confirm}
                  </h2>

                  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-8 space-y-6 shadow-sm">
                    <h3 className={`text-xl font-bold text-navy border-b border-gray-200 pb-4 mb-6 ${fontHeading}`}>
                      {isRTL ? "ملخص الموعد" : "Appointment Summary"}
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                      <Row icon={<Building className="w-5 h-5 text-teal" />} label={a.form.department} value={selectedDeptObj?.name[locale] ?? ""} />
                      <Row icon={<Stethoscope className="w-5 h-5 text-teal" />} label={a.form.doctor} value={selectedDoctorObj?.name[locale] ?? ""} />
                      <Row icon={<Calendar className="w-5 h-5 text-teal" />} label={a.form.date} value={selectedDate} />
                      <Row icon={<Clock className="w-5 h-5 text-teal" />} label={a.form.time} value={selectedTime} />
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className={`text-lg font-bold text-navy mb-6 ${fontHeading}`}>
                        {isRTL ? "بيانات المريض" : "Patient Details"}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                        <Row icon={<User className="w-5 h-5 text-accent" />} label={a.form.patientName} value={getValues("patientName")} />
                        <Row icon={<Phone className="w-5 h-5 text-accent" />} label={a.form.phone} value={getValues("phone")} />
                        {getValues("email") && <Row icon={<Mail className="w-5 h-5 text-accent" />} label={a.form.email} value={getValues("email")!} />}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmit(handleConfirm)} 
                    className="w-full py-4 px-6 rounded-2xl bg-teal text-white font-bold text-lg tracking-wide hover:bg-teal-dark transition-colors duration-300 shadow-xl shadow-teal/20"
                  >
                    {dict.common.confirm}
                  </button>
                </motion.div>
              )}

              {/* Success Screen */}
              {booked && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 relative z-10 max-w-xl mx-auto"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald/10 border-4 border-emerald/20 flex items-center justify-center mx-auto mb-8 relative">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}>
                      <CheckCircle2 className="w-12 h-12 text-emerald" />
                    </motion.div>
                  </div>
                  <h2 className={`text-4xl font-bold text-navy mb-4 ${fontHeading}`}>
                    {a.confirmation.title}
                  </h2>
                  <p className="text-lg text-ink-soft mb-8 leading-relaxed">
                    {a.confirmation.subtitle}
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-10 inline-block font-mono text-lg font-bold text-navy shadow-inner min-w-[250px]">
                    <span className="block text-xs font-sans text-ink-muted uppercase tracking-widest mb-1">{a.confirmation.referenceNumber}</span>
                    {refId}
                  </div>
                  
                  <div>
                    <button onClick={resetFlow} className="px-8 py-3 rounded-full border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all duration-300">
                      {a.confirmation.bookAnother}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-ink-muted mb-1">{label}</p>
        <p className="text-base font-bold text-navy">{value}</p>
      </div>
    </div>
  );
}
