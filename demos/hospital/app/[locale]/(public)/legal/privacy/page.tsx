"use client";

import { use } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import PageHero from "@/components/ui/PageHero";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Mail,
} from "lucide-react";

const sections = {
  ar: [
    {
      icon: "FileText",
      title: "جمع المعلومات",
      content:
        "نقوم بجمع المعلومات الشخصية والطبية اللازمة لتقديم الرعاية الصحية المناسبة، بما في ذلك الاسم ومعلومات الاتصال والتاريخ الطبي والتأمين الصحي. يتم جمع هذه المعلومات بموافقة المريض أو وليّه.",
    },
    {
      icon: "Lock",
      title: "حماية البيانات",
      content:
        "نطبق أعلى معايير الأمان لحماية بياناتكم الشخصية والطبية. نستخدم تقنيات التشفير المتقدمة وأنظمة الحماية الإلكترونية، بالإضافة إلى تدريب جميع الموظفين على سياسات الخصوصية والسرية.",
    },
    {
      icon: "Eye",
      title: "استخدام المعلومات",
      content:
        "نستخدم المعلومات الشخصية فقط لأغراض تقديم الرعاية الصحية وتحسين خدماتنا والتواصل معكم بخصوص مواعيدكم ونتائج فحوصاتكم. لا نشارك المعلومات مع أطراف ثالثة دون موافقتكم إلا في الحالات التي يتطلبها القانون.",
    },
    {
      icon: "Users",
      title: "حقوق المريض",
      content:
        "يحق لكم الاطلاع على سجلاتكم الطبية وطلب تعديل أي معلومات غير دقيقة. كما يحق لكم طلب حذف بياناتكم الشخصية وفقاً للأنظمة والقوانين المعمول بها، مع الاحتفاظ بالحد الأدنى من البيانات المطلوبة قانونياً.",
    },
    {
      icon: "Shield",
      title: "مشاركة المعلومات",
      content:
        "قد نشارك معلوماتكم مع شركات التأمين الصحي لغرض الفوترة المباشرة، ومع المختبرات ومراكز الأشعة المعتمدة لإجراء الفحوصات اللازمة. تتم جميع عمليات المشاركة وفق اتفاقيات سرية صارمة.",
    },
    {
      icon: "Mail",
      title: "التواصل بخصوص الخصوصية",
      content:
        "لأي استفسار يتعلق بسياسة الخصوصية أو لممارسة حقوقكم، يرجى التواصل مع مسؤول حماية البيانات عبر البريد الإلكتروني: privacy@alhayat-hospital.jo أو زيارة مكتب الاستقبال.",
    },
  ],
  en: [
    {
      icon: "FileText",
      title: "Information Collection",
      content:
        "We collect personal and medical information necessary to provide appropriate healthcare, including name, contact information, medical history, and health insurance details. This information is collected with the consent of the patient or their guardian.",
    },
    {
      icon: "Lock",
      title: "Data Protection",
      content:
        "We apply the highest security standards to protect your personal and medical data. We use advanced encryption technologies and electronic protection systems, in addition to training all staff on privacy and confidentiality policies.",
    },
    {
      icon: "Eye",
      title: "Use of Information",
      content:
        "We use personal information solely for the purposes of providing healthcare, improving our services, and communicating with you regarding your appointments and test results. We do not share information with third parties without your consent except as required by law.",
    },
    {
      icon: "Users",
      title: "Patient Rights",
      content:
        "You have the right to access your medical records and request correction of any inaccurate information. You also have the right to request deletion of your personal data in accordance with applicable laws and regulations, while retaining the minimum data required by law.",
    },
    {
      icon: "Shield",
      title: "Information Sharing",
      content:
        "We may share your information with health insurance companies for direct billing purposes, and with approved laboratories and imaging centers for necessary tests. All sharing is conducted under strict confidentiality agreements.",
    },
    {
      icon: "Mail",
      title: "Privacy Contact",
      content:
        "For any questions regarding our privacy policy or to exercise your rights, please contact our Data Protection Officer at privacy@alhayat-hospital.jo or visit the reception desk.",
    },
  ],
};

const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = { Shield, Lock, Eye, FileText, Users, Mail };

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const items = sections[locale];

  return (
    <>
      <PageHero
        locale={locale}
        label={dict.footer.privacy}
        title={dict.footer.privacy}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.footer.privacy },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-8">
          {items.map((item, i) => {
            const Icon = iconComponents[item.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-5 h-5 text-teal" />}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold text-ink mb-2 ${
                        isRTL ? "font-arabic-display" : "font-heading"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
