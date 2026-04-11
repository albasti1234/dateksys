"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Mail, Calendar } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const sectionsAr = [
  {
    icon: Database,
    title: "البيانات التي نجمعها",
    body: "عندما تُقدّم طلب تسجيل أو تتواصل معنا، نجمع المعلومات الضرورية فقط: اسم الطالب، تاريخ الميلاد، معلومات التواصل مع ولي الأمر، والبيانات الأكاديمية السابقة. لا نطلب أي معلومات لا علاقة لها بالخدمة التعليمية.",
  },
  {
    icon: Lock,
    title: "كيف نحمي بياناتك",
    body: "جميع البيانات مُخزّنة في قواعد بيانات آمنة مُعتمدة وفق معايير ISO 27001. الوصول محدود بالطاقم المسؤول فقط، ويتمّ تدقيق كل عملية قراءة أو تعديل. نستخدم التشفير من النهاية إلى النهاية لأي بيانات حساسة.",
  },
  {
    icon: Eye,
    title: "حقوقك",
    body: "لك الحق في: الاطّلاع على بياناتك وبيانات طفلك في أي وقت · طلب تصحيح أي خطأ · طلب حذف بياناتك بعد انتهاء الخدمة · معرفة أي جهة خارجية (بنك، وزارة تربية، إلخ) شاركنا معها معلوماتك ولماذا.",
  },
  {
    icon: Mail,
    title: "طرق التواصل معنا",
    body: "لأي استفسار يتعلّق بالخصوصية، تواصل مع مسؤول حماية البيانات: privacy@alnakhla.edu.jo · نلتزم بالردّ خلال ٤٨ ساعة عمل.",
  },
];

const sectionsEn = [
  {
    icon: Database,
    title: "Data We Collect",
    body: "When you submit an admission application or contact us, we collect only the information necessary for our educational service: student name, date of birth, parent contact information, and previous academic records. We do not request any information unrelated to the educational service.",
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    body: "All data is stored in secure databases certified to ISO 27001 standards. Access is restricted to authorized personnel only, and every read or write operation is audited. We use end-to-end encryption for any sensitive data.",
  },
  {
    icon: Eye,
    title: "Your Rights",
    body: "You have the right to: access your data and your child's data at any time · request correction of any error · request deletion of your data after our service ends · know any third party (bank, ministry of education, etc.) with whom we have shared your information and why.",
  },
  {
    icon: Mail,
    title: "Contact Us",
    body: "For any privacy-related inquiry, contact our Data Protection Officer: privacy@alnakhla.edu.jo · We commit to responding within 48 business hours.",
  },
];

export default function PrivacyPage({
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
        label={locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        title={
          locale === "ar" ? "خصوصيّتك مسؤوليّتنا" : "Your Privacy Matters"
        }
        subtitle={
          locale === "ar"
            ? "هذه السياسة توضّح كيف نجمع بياناتك، كيف نحميها، وما هي حقوقك."
            : "This policy explains how we collect your data, how we protect it, and what your rights are."
        }
        breadcrumbs={[
          { label: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy" },
        ]}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-sm text-[var(--color-ink-soft)] mb-12 pb-6 border-b border-[var(--color-border)]"
          >
            <Shield className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="font-semibold">
              {locale === "ar"
                ? "آخر تحديث: ٠١ كانون الثاني ٢٠٢٦"
                : "Last updated: January 1, 2026"}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <Calendar className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="font-semibold">
              {locale === "ar" ? "دخول حيّز التنفيذ" : "Effective"}
            </span>
          </motion.div>

          <div className="space-y-12">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
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
