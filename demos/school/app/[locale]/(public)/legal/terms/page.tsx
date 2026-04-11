"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertCircle, Scale, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const sectionsAr = [
  {
    icon: CheckCircle2,
    title: "قبول هذه الشروط",
    body: "باستخدامك لخدمات أكاديمية النخلة الدولية — سواء كموقع إلكتروني، أو بوابة ولي أمر، أو تقديم طلب تسجيل — فإنك توافق على الشروط الواردة في هذه الصفحة. إذا كنت لا توافق على أي منها، نرجو عدم استخدام خدماتنا.",
  },
  {
    icon: Users,
    title: "التسجيل والقبول",
    body: "القبول في الأكاديمية يخضع لسياسات القبول المُعلنة. تقديم الطلب لا يضمن القبول. الرسوم المدفوعة قبل القبول النهائي (رسوم التسجيل) غير مُستردّة. بعد التسجيل، يلتزم ولي الأمر بدفع الرسوم الدراسية حسب الجدول الزمني المتّفق عليه.",
  },
  {
    icon: Scale,
    title: "الالتزامات المتبادلة",
    body: "تلتزم الأكاديمية بتقديم بيئة تعليمية آمنة ومنهاج مُعتمَد من وزارة التربية الأردنية ومنظمة البكالوريا الدولية. يلتزم الطالب وولي الأمر باحترام اللوائح المدرسية، المشاركة بانتظام، والتواصل البنّاء مع الطاقم التربوي.",
  },
  {
    icon: AlertCircle,
    title: "حدود المسؤولية",
    body: "الأكاديمية غير مسؤولة عن: الخسائر الناتجة عن انقطاع الإنترنت في الخدمات الرقمية · الأحداث الطارئة خارج نطاق السيطرة (ظروف جوية، إجراءات حكومية) · الإصابات الطارئة خلال الأنشطة اللاصفية التي أقرّ بها ولي الأمر خطياً.",
  },
  {
    icon: FileText,
    title: "التعديلات على الشروط",
    body: "نحتفظ بحقّ تعديل هذه الشروط في أي وقت، مع إشعار أولياء الأمور قبل ٣٠ يوماً على الأقل من سريان أي تعديل جوهري. الاستمرار في استخدام الخدمات بعد التعديل يُعدّ قبولاً للشروط الجديدة.",
  },
];

const sectionsEn = [
  {
    icon: CheckCircle2,
    title: "Acceptance of Terms",
    body: "By using Al-Nakhla International Academy's services — whether the website, parent portal, or submitting an application — you agree to the terms outlined on this page. If you do not agree to any of them, please do not use our services.",
  },
  {
    icon: Users,
    title: "Enrollment and Admission",
    body: "Admission to the Academy is subject to our published admissions policies. Submitting an application does not guarantee acceptance. Fees paid before final acceptance (registration fees) are non-refundable. Upon enrollment, the parent commits to paying tuition according to the agreed schedule.",
  },
  {
    icon: Scale,
    title: "Mutual Commitments",
    body: "The Academy commits to providing a safe learning environment and a curriculum accredited by the Jordanian Ministry of Education and the International Baccalaureate Organization. The student and parent commit to respecting school regulations, attending regularly, and communicating constructively with the educational team.",
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    body: "The Academy is not responsible for: losses resulting from internet outages in digital services · emergency events beyond our control (weather conditions, government actions) · accidental injuries during extracurricular activities that the parent has acknowledged in writing.",
  },
  {
    icon: FileText,
    title: "Modifications to Terms",
    body: "We reserve the right to modify these terms at any time, with at least 30 days' notice to parents before any substantive change takes effect. Continued use of services after modification constitutes acceptance of the new terms.",
  },
];

export default function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const sections = locale === "ar" ? sectionsAr : sectionsEn;

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-4 leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-4 leading-tight";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={locale === "ar" ? "شروط الاستخدام" : "Terms of Use"}
        title={
          locale === "ar"
            ? "اتّفاق واضح بيننا"
            : "A clear agreement between us"
        }
        subtitle={
          locale === "ar"
            ? "هذه الشروط تحكم علاقتك بأكاديمية النخلة الدولية. اقرأها بعناية."
            : "These terms govern your relationship with Al-Nakhla International Academy. Please read them carefully."
        }
        breadcrumbs={[
          { label: locale === "ar" ? "شروط الاستخدام" : "Terms of Use" },
        ]}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="space-y-12">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                    </div>
                    <div className="flex-1">
                      <h2 className={h1Class}>{s.title}</h2>
                      <p
                        className={`text-[var(--color-ink-soft)] ${
                          isRTL ? "leading-[2]" : "leading-relaxed"
                        }`}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
