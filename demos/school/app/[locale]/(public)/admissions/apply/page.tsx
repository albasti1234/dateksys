"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import {
  User,
  Users,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { saveApplication } from "@/lib/applicationsStorage";

type StudentData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  currentSchool: string;
  applyingFor: string;
};

type ParentData = {
  parentFirstName: string;
  parentLastName: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: string;
};

const stepIcons = [User, Users, FileCheck];

export default function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.pages.admissions.apply;
  const isRTL = locale === "ar";

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const [student, setStudent] = useState<StudentData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    currentSchool: "",
    applyingFor: "",
  });

  const [parent, setParent] = useState<ParentData>({
    parentFirstName: "",
    parentLastName: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    preferredContact: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateStudent = () => {
    const e: Record<string, boolean> = {};
    if (!student.firstName) e.firstName = true;
    if (!student.lastName) e.lastName = true;
    if (!student.dateOfBirth) e.dateOfBirth = true;
    if (!student.gender) e.gender = true;
    if (!student.nationality) e.nationality = true;
    if (!student.applyingFor) e.applyingFor = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateParent = () => {
    const e: Record<string, boolean> = {};
    if (!parent.parentFirstName) e.parentFirstName = true;
    if (!parent.parentLastName) e.parentLastName = true;
    if (!parent.relationship) e.relationship = true;
    if (!parent.email || !/\S+@\S+\.\S+/.test(parent.email)) e.email = true;
    if (!parent.phone) e.phone = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStudent()) return;
    if (step === 2 && !validateParent()) return;
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    const application = saveApplication(student, parent);
    setRefNumber(application.ref);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const h2Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-3 leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-3 leading-tight";
  const stepTitleClass = isRTL
    ? "font-arabic-display text-2xl font-bold text-[var(--color-navy)] mb-2"
    : "font-serif text-2xl font-bold text-[var(--color-navy)] mb-2";

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 bg-[var(--color-cream)] border focus:outline-none transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-[var(--color-border)] focus:border-[var(--color-gold)]"
    }`;

  const labelClass =
    "block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2";

  if (submitted) {
    return (
      <>
        <PageHero
          locale={locale}
          homeLabel={dict.common.breadcrumbHome}
          label={a.hero.label}
          title={a.success.title}
          breadcrumbs={[
            { label: dict.pages.admissions.hero.breadcrumb, href: "/admissions" },
            { label: a.hero.breadcrumb },
          ]}
        />

        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className={h2Class}>{a.success.title}</h2>
              <p
                className={`text-[var(--color-ink-soft)] max-w-xl mx-auto ${
                  isRTL ? "leading-[2]" : "leading-relaxed"
                }`}
              >
                {a.success.subtitle}
              </p>

              <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-cream)] border border-[var(--color-gold)]">
                <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                <span className="text-sm text-[var(--color-ink-soft)]">
                  {a.success.reference}
                </span>
                <span className="font-mono font-bold text-[var(--color-navy)]">
                  {refNumber}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--color-cream)] border border-[var(--color-border)] p-8 md:p-10"
            >
              <h3
                className={`text-xl font-bold text-[var(--color-navy)] mb-6 ${
                  isRTL ? "font-arabic-display" : "font-serif"
                }`}
              >
                {a.success.nextStepsTitle}
              </h3>
              <ol className="space-y-4">
                {a.success.nextSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-navy)] text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <p
                      className={`text-[var(--color-ink)] ${
                        isRTL ? "leading-[2] pt-1" : "leading-relaxed pt-1"
                      }`}
                    >
                      {s}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center mt-12"
            >
              <Link href={`/${locale}`} className="btn-outline inline-flex">
                {a.success.backHome}
              </Link>
              <Link
                href={`/${locale}/admissions`}
                className="btn-primary inline-flex"
              >
                {a.success.viewAdmissions}
              </Link>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={a.hero.label}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        breadcrumbs={[
          { label: dict.pages.admissions.hero.breadcrumb, href: "/admissions" },
          { label: a.hero.breadcrumb },
        ]}
      />

      <section className="py-16 lg:py-24 bg-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              {[1, 2, 3].map((s) => {
                const Icon = stepIcons[s - 1];
                const active = step >= s;
                const current = step === s;
                return (
                  <div
                    key={s}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {s > 1 && (
                      <div
                        className={`absolute top-6 end-1/2 w-full h-0.5 transition-colors ${
                          step >= s
                            ? "bg-[var(--color-gold)]"
                            : "bg-[var(--color-border)]"
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 w-12 h-12 flex items-center justify-center transition-all ${
                        active
                          ? "bg-[var(--color-gold)] text-white"
                          : "bg-white text-[var(--color-ink-soft)] border border-[var(--color-border)]"
                      } ${current ? "scale-110 shadow-lg" : ""}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p
                      className={`mt-3 text-xs font-semibold text-center ${
                        active
                          ? "text-[var(--color-navy)]"
                          : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      {s === 1 && a.steps.student.title}
                      {s === 2 && a.steps.parent.title}
                      {s === 3 && a.steps.review.title}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs text-[var(--color-ink-soft)] mt-6">
              {a.progress.step} {step} {a.progress.of} 3
            </p>
          </div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-[var(--color-border)] p-8 md:p-12 shadow-sm"
          >
            {step === 1 && (
              <>
                <h2 className={stepTitleClass}>{a.steps.student.title}</h2>
                <p className="text-sm text-[var(--color-ink-soft)] mb-8">
                  {a.steps.student.subtitle}
                </p>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      {a.steps.student.fields.firstName} *
                    </label>
                    <input
                      type="text"
                      value={student.firstName}
                      onChange={(e) =>
                        setStudent({ ...student, firstName: e.target.value })
                      }
                      className={inputClass(!!errors.firstName)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.student.fields.lastName} *
                    </label>
                    <input
                      type="text"
                      value={student.lastName}
                      onChange={(e) =>
                        setStudent({ ...student, lastName: e.target.value })
                      }
                      className={inputClass(!!errors.lastName)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.student.fields.dateOfBirth} *
                    </label>
                    <input
                      type="date"
                      value={student.dateOfBirth}
                      onChange={(e) =>
                        setStudent({ ...student, dateOfBirth: e.target.value })
                      }
                      className={inputClass(!!errors.dateOfBirth)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.student.fields.gender} *
                    </label>
                    <select
                      value={student.gender}
                      onChange={(e) =>
                        setStudent({ ...student, gender: e.target.value })
                      }
                      className={inputClass(!!errors.gender)}
                    >
                      <option value="">—</option>
                      {a.steps.student.genderOptions.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.student.fields.nationality} *
                    </label>
                    <input
                      type="text"
                      value={student.nationality}
                      onChange={(e) =>
                        setStudent({ ...student, nationality: e.target.value })
                      }
                      className={inputClass(!!errors.nationality)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.student.fields.currentSchool}
                    </label>
                    <input
                      type="text"
                      value={student.currentSchool}
                      onChange={(e) =>
                        setStudent({ ...student, currentSchool: e.target.value })
                      }
                      className={inputClass(false)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      {a.steps.student.fields.applyingFor} *
                    </label>
                    <select
                      value={student.applyingFor}
                      onChange={(e) =>
                        setStudent({ ...student, applyingFor: e.target.value })
                      }
                      className={inputClass(!!errors.applyingFor)}
                    >
                      <option value="">—</option>
                      {a.steps.student.gradeOptions.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="btn-primary inline-flex group"
                  >
                    {a.steps.student.next}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isRTL ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className={stepTitleClass}>{a.steps.parent.title}</h2>
                <p className="text-sm text-[var(--color-ink-soft)] mb-8">
                  {a.steps.parent.subtitle}
                </p>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      {a.steps.parent.fields.parentFirstName} *
                    </label>
                    <input
                      type="text"
                      value={parent.parentFirstName}
                      onChange={(e) =>
                        setParent({
                          ...parent,
                          parentFirstName: e.target.value,
                        })
                      }
                      className={inputClass(!!errors.parentFirstName)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.parent.fields.parentLastName} *
                    </label>
                    <input
                      type="text"
                      value={parent.parentLastName}
                      onChange={(e) =>
                        setParent({
                          ...parent,
                          parentLastName: e.target.value,
                        })
                      }
                      className={inputClass(!!errors.parentLastName)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.parent.fields.relationship} *
                    </label>
                    <select
                      value={parent.relationship}
                      onChange={(e) =>
                        setParent({ ...parent, relationship: e.target.value })
                      }
                      className={inputClass(!!errors.relationship)}
                    >
                      <option value="">—</option>
                      {a.steps.parent.relationshipOptions.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.parent.fields.preferredContact}
                    </label>
                    <select
                      value={parent.preferredContact}
                      onChange={(e) =>
                        setParent({
                          ...parent,
                          preferredContact: e.target.value,
                        })
                      }
                      className={inputClass(false)}
                    >
                      <option value="">—</option>
                      {a.steps.parent.contactOptions.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.parent.fields.email} *
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={parent.email}
                      onChange={(e) =>
                        setParent({ ...parent, email: e.target.value })
                      }
                      className={inputClass(!!errors.email)}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {a.steps.parent.fields.phone} *
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={parent.phone}
                      onChange={(e) =>
                        setParent({ ...parent, phone: e.target.value })
                      }
                      className={inputClass(!!errors.phone)}
                      placeholder="+962 7X XXX XXXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      {a.steps.parent.fields.address}
                    </label>
                    <input
                      type="text"
                      value={parent.address}
                      onChange={(e) =>
                        setParent({ ...parent, address: e.target.value })
                      }
                      className={inputClass(false)}
                    />
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
                  <button
                    onClick={handleBack}
                    className="btn-outline inline-flex group"
                  >
                    <ArrowLeft
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                    {a.steps.parent.back}
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn-primary inline-flex group"
                  >
                    {a.steps.parent.next}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isRTL ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className={stepTitleClass}>{a.steps.review.title}</h2>
                <p className="text-sm text-[var(--color-ink-soft)] mb-8">
                  {a.steps.review.subtitle}
                </p>

                <div className="space-y-6">
                  {/* Student summary */}
                  <div className="border border-[var(--color-border)] p-6 bg-[var(--color-cream)]/50">
                    <h3
                      className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                        isRTL ? "font-arabic" : "uppercase"
                      }`}
                    >
                      {a.steps.review.studentSection}
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <ReviewRow
                        label={a.steps.student.fields.firstName}
                        value={`${student.firstName} ${student.lastName}`}
                      />
                      <ReviewRow
                        label={a.steps.student.fields.dateOfBirth}
                        value={student.dateOfBirth}
                      />
                      <ReviewRow
                        label={a.steps.student.fields.nationality}
                        value={student.nationality}
                      />
                      <ReviewRow
                        label={a.steps.student.fields.applyingFor}
                        value={
                          a.steps.student.gradeOptions.find(
                            (g) => g.value === student.applyingFor
                          )?.label || "—"
                        }
                      />
                      <ReviewRow
                        label={a.steps.student.fields.currentSchool}
                        value={student.currentSchool || "—"}
                      />
                      <ReviewRow
                        label={a.steps.student.fields.gender}
                        value={
                          a.steps.student.genderOptions.find(
                            (g) => g.value === student.gender
                          )?.label || "—"
                        }
                      />
                    </dl>
                  </div>

                  {/* Parent summary */}
                  <div className="border border-[var(--color-border)] p-6 bg-[var(--color-cream)]/50">
                    <h3
                      className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                        isRTL ? "font-arabic" : "uppercase"
                      }`}
                    >
                      {a.steps.review.parentSection}
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <ReviewRow
                        label={a.steps.parent.fields.parentFirstName}
                        value={`${parent.parentFirstName} ${parent.parentLastName}`}
                      />
                      <ReviewRow
                        label={a.steps.parent.fields.relationship}
                        value={
                          a.steps.parent.relationshipOptions.find(
                            (r) => r.value === parent.relationship
                          )?.label || "—"
                        }
                      />
                      <ReviewRow
                        label={a.steps.parent.fields.email}
                        value={parent.email}
                      />
                      <ReviewRow
                        label={a.steps.parent.fields.phone}
                        value={parent.phone}
                      />
                    </dl>
                  </div>

                  {/* Agreement */}
                  <div className="p-5 bg-[var(--color-gold)]/10 border-s-4 border-[var(--color-gold)]">
                    <p
                      className={`text-sm text-[var(--color-ink)] ${
                        isRTL ? "leading-[2]" : "leading-relaxed"
                      }`}
                    >
                      {a.steps.review.agreement}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
                  <button
                    onClick={handleBack}
                    className="btn-outline inline-flex group"
                  >
                    <ArrowLeft
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                    {a.steps.review.back}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn-primary inline-flex group !bg-[var(--color-gold)] !border-[var(--color-gold)] !text-white"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {a.steps.review.submit}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-1">
        {label}
      </dt>
      <dd className="font-semibold text-[var(--color-navy)]">{value || "—"}</dd>
    </div>
  );
}
