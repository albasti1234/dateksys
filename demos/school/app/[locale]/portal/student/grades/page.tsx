"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Award,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

interface Assessment {
  name: { ar: string; en: string };
  score: number;
  total: number;
}

interface SubjectGrade {
  subject: { ar: string; en: string };
  teacher: { ar: string; en: string };
  score: number;
  trend: "up" | "down" | "same";
  assessments: Assessment[];
}

const termData: Record<string, { gpa: number; subjects: SubjectGrade[] }> = {
  term1: {
    gpa: 3.7,
    subjects: [
      {
        subject: { ar: "الرياضيات", en: "Mathematics" },
        teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
        score: 92,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 88, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 94, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 45, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 18, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 90, total: 100 },
        ],
      },
      {
        subject: { ar: "اللغة العربية", en: "Arabic" },
        teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
        score: 88,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 85, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 90, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 42, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 17, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 88, total: 100 },
        ],
      },
      {
        subject: { ar: "العلوم", en: "Science" },
        teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
        score: 95,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 92, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 96, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 48, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 19, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 95, total: 100 },
        ],
      },
      {
        subject: { ar: "اللغة الإنجليزية", en: "English" },
        teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
        score: 85,
        trend: "down",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 88, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 82, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 40, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 16, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 85, total: 100 },
        ],
      },
      {
        subject: { ar: "التربية الوطنية", en: "Civics" },
        teacher: { ar: "أ. ديمة الحوراني", en: "Ms. Dima Al-Hourani" },
        score: 90,
        trend: "same",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 90, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 88, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 44, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 18, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 91, total: 100 },
        ],
      },
      {
        subject: { ar: "التاريخ", en: "History" },
        teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
        score: 78,
        trend: "down",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 75, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 80, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 38, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 15, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 78, total: 100 },
        ],
      },
      {
        subject: { ar: "الفنون", en: "Arts" },
        teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
        score: 96,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 95, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 97, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 48, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 20, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 95, total: 100 },
        ],
      },
    ],
  },
  term2: {
    gpa: 3.8,
    subjects: [
      {
        subject: { ar: "الرياضيات", en: "Mathematics" },
        teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
        score: 94,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 92, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 95, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 47, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 19, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 93, total: 100 },
        ],
      },
      {
        subject: { ar: "اللغة العربية", en: "Arabic" },
        teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
        score: 91,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 90, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 92, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 44, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 18, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 91, total: 100 },
        ],
      },
      {
        subject: { ar: "العلوم", en: "Science" },
        teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
        score: 93,
        trend: "down",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 91, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 94, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 46, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 18, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 93, total: 100 },
        ],
      },
      {
        subject: { ar: "اللغة الإنجليزية", en: "English" },
        teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
        score: 87,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 86, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 88, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 43, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 17, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 87, total: 100 },
        ],
      },
      {
        subject: { ar: "التربية الوطنية", en: "Civics" },
        teacher: { ar: "أ. ديمة الحوراني", en: "Ms. Dima Al-Hourani" },
        score: 92,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 91, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 93, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 46, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 18, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 92, total: 100 },
        ],
      },
      {
        subject: { ar: "التاريخ", en: "History" },
        teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
        score: 82,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 80, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 84, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 40, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 16, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 82, total: 100 },
        ],
      },
      {
        subject: { ar: "الفنون", en: "Arts" },
        teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
        score: 98,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 97, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 99, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 49, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 20, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 97, total: 100 },
        ],
      },
    ],
  },
  term3: {
    gpa: 3.9,
    subjects: [
      {
        subject: { ar: "الرياضيات", en: "Mathematics" },
        teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
        score: 96,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 95, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 97, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 48, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 19, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 95, total: 100 },
        ],
      },
      {
        subject: { ar: "اللغة العربية", en: "Arabic" },
        teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
        score: 93,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 92, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 94, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 46, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 19, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 93, total: 100 },
        ],
      },
      {
        subject: { ar: "العلوم", en: "Science" },
        teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
        score: 97,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 96, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 98, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 49, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 20, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 96, total: 100 },
        ],
      },
      {
        subject: { ar: "اللغة الإنجليزية", en: "English" },
        teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
        score: 90,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 89, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 91, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 44, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 18, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 90, total: 100 },
        ],
      },
      {
        subject: { ar: "التربية الوطنية", en: "Civics" },
        teacher: { ar: "أ. ديمة الحوراني", en: "Ms. Dima Al-Hourani" },
        score: 94,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 93, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 95, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 47, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 19, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 94, total: 100 },
        ],
      },
      {
        subject: { ar: "التاريخ", en: "History" },
        teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
        score: 85,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 83, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 87, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 42, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 17, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 85, total: 100 },
        ],
      },
      {
        subject: { ar: "الفنون", en: "Arts" },
        teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
        score: 99,
        trend: "up",
        assessments: [
          { name: { ar: "اختبار ١", en: "Test 1" }, score: 98, total: 100 },
          { name: { ar: "اختبار ٢", en: "Test 2" }, score: 100, total: 100 },
          { name: { ar: "الواجبات", en: "Homework" }, score: 50, total: 50 },
          { name: { ar: "المشروع", en: "Project" }, score: 20, total: 20 },
          { name: { ar: "النهائي", en: "Final" }, score: 98, total: 100 },
        ],
      },
    ],
  },
};

function scoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-[var(--color-gold)]";
  if (score >= 70) return "text-[var(--color-ink)]";
  return "text-red-600";
}

function scoreBg(score: number) {
  if (score >= 90) return "bg-green-50";
  if (score >= 80) return "bg-amber-50";
  if (score >= 70) return "bg-gray-50";
  return "bg-red-50";
}

export default function StudentGradesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [activeTerm, setActiveTerm] = useState("term3");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const data = termData[activeTerm];

  const terms = [
    { key: "term1", label: locale === "ar" ? "الفصل الأول" : "Term 1" },
    { key: "term2", label: locale === "ar" ? "الفصل الثاني" : "Term 2" },
    { key: "term3", label: locale === "ar" ? "الفصل الثالث" : "Term 3" },
  ];

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <GraduationCap className="w-3 h-3" />
          <span>{locale === "ar" ? "العلامات" : "GRADES"}</span>
        </div>
        <h1 className={h1Class}>
          {locale === "ar" ? "علاماتي" : "My Grades"}
        </h1>
      </motion.div>

      {/* Term tabs */}
      <div className="flex gap-2 mb-6">
        {terms.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setActiveTerm(t.key);
              setExpandedIdx(null);
            }}
            className={`px-5 py-2.5 text-xs font-semibold border transition-all ${
              activeTerm === t.key
                ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                : "bg-white border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* GPA card */}
      <motion.div
        key={activeTerm}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-[var(--color-border)] p-8 mb-8 flex items-center gap-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-navy)] flex items-center justify-center">
          <Award className="w-10 h-10 text-white" />
        </div>
        <div>
          <div className="text-xs tracking-widest text-[var(--color-gold)] font-semibold mb-1">
            {locale === "ar" ? "المعدّل التراكمي" : "OVERALL GPA"}
          </div>
          <div
            className={`text-5xl font-bold text-[var(--color-navy)] num ${
              isRTL ? "font-arabic-display" : "font-serif"
            }`}
          >
            {data.gpa.toFixed(1)}
          </div>
          <div className="text-sm text-[var(--color-ink-soft)] mt-1">
            {locale === "ar" ? "من ٤.٠" : "out of 4.0"}
          </div>
        </div>
      </motion.div>

      {/* Subject cards */}
      <div className="space-y-4">
        {data.subjects.map((sub, i) => {
          const isExpanded = expandedIdx === i;
          return (
            <motion.div
              key={sub.subject[locale]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white border border-[var(--color-border)] overflow-hidden"
            >
              <button
                onClick={() => setExpandedIdx(isExpanded ? null : i)}
                className="w-full p-5 flex items-center gap-4 text-start"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center shrink-0 ${scoreBg(
                    sub.score
                  )}`}
                >
                  <span
                    className={`text-xl font-bold num ${scoreColor(sub.score)}`}
                  >
                    {sub.score}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[var(--color-navy)]">
                    {sub.subject[locale]}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                    {sub.teacher[locale]}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {sub.trend === "up" && (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  )}
                  {sub.trend === "down" && (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  {sub.trend === "same" && (
                    <div className="w-5 h-0.5 bg-[var(--color-ink-soft)]" />
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-ink-soft)] transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
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
                    <div className="px-5 pb-5 border-t border-[var(--color-border-soft)]">
                      <div className="mt-4 space-y-3">
                        {sub.assessments.map((a) => (
                          <div
                            key={a.name[locale]}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-[var(--color-ink)]">
                              {a.name[locale]}
                            </span>
                            <div className="flex items-center gap-3">
                              <div className="w-32 h-2 bg-[var(--color-cream)] rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    a.score / a.total >= 0.9
                                      ? "bg-green-500"
                                      : a.score / a.total >= 0.8
                                      ? "bg-[var(--color-gold)]"
                                      : a.score / a.total >= 0.7
                                      ? "bg-gray-400"
                                      : "bg-red-500"
                                  }`}
                                  style={{
                                    width: `${(a.score / a.total) * 100}%`,
                                  }}
                                />
                              </div>
                              <span
                                className={`text-sm font-bold num ${scoreColor(
                                  (a.score / a.total) * 100
                                )}`}
                              >
                                {a.score}/{a.total}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
