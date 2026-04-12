"use client";

import { use } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import PageHero from "@/components/ui/PageHero";
import {
  FileCheck,
  UserCheck,
  AlertTriangle,
  RefreshCw,
  Scale,
  HandshakeIcon,
} from "lucide-react";

const sections = {
  ar: [
    {
      icon: "FileCheck",
      title: "قبول الخدمة",
      content:
        "باستخدامك لموقع مستشفى الحياة الإلكتروني وخدماته، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع أو خدماته.",
    },
    {
      icon: "UserCheck",
      title: "مسؤوليات المريض",
      content:
        "يلتزم المريض بتقديم معلومات دقيقة وكاملة عند التسجيل وحجز المواعيد. يتحمل المريض مسؤولية الحفاظ على سرية بيانات حسابه وعدم مشاركتها مع الغير. كما يلتزم بالحضور في المواعيد المحددة أو الإلغاء قبل ٢٤ ساعة على الأقل.",
    },
    {
      icon: "HandshakeIcon",
      title: "الخدمات الطبية",
      content:
        "المعلومات المقدمة عبر الموقع هي لأغراض إعلامية فقط ولا تُغني عن الاستشارة الطبية المباشرة. لا يُعتبر أي محتوى على الموقع بديلاً عن التشخيص أو العلاج الطبي المتخصص. يجب على المريض دائماً استشارة طبيبه المعالج للحصول على المشورة الطبية المناسبة.",
    },
    {
      icon: "AlertTriangle",
      title: "تحديد المسؤولية",
      content:
        "مستشفى الحياة غير مسؤول عن أي أضرار ناتجة عن استخدام الموقع الإلكتروني أو الاعتماد على المعلومات المقدمة فيه. نبذل قصارى جهدنا لضمان دقة المعلومات، لكن لا نضمن خلوها من الأخطاء. الموقع قد يتعرض لفترات صيانة أو انقطاع مؤقت.",
    },
    {
      icon: "Scale",
      title: "الملكية الفكرية",
      content:
        "جميع المحتويات المنشورة على الموقع بما في ذلك النصوص والصور والشعارات والتصاميم هي ملكية فكرية لمستشفى الحياة ومحمية بموجب قوانين حقوق النشر. يُمنع نسخ أو توزيع أو تعديل أي محتوى دون إذن كتابي مسبق.",
    },
    {
      icon: "RefreshCw",
      title: "التعديلات",
      content:
        "يحتفظ مستشفى الحياة بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. ستكون الشروط المعدّلة سارية فور نشرها على الموقع. استمرارك في استخدام الموقع بعد نشر التعديلات يُعتبر قبولاً للشروط الجديدة.",
    },
  ],
  en: [
    {
      icon: "FileCheck",
      title: "Acceptance of Service",
      content:
        "By using the Al-Hayat Hospital website and its services, you agree to abide by these terms of use. If you do not agree to any of these terms, please do not use the website or its services.",
    },
    {
      icon: "UserCheck",
      title: "Patient Responsibilities",
      content:
        "The patient is responsible for providing accurate and complete information during registration and appointment booking. The patient is responsible for maintaining the confidentiality of their account credentials and not sharing them. Patients must attend scheduled appointments or cancel at least 24 hours in advance.",
    },
    {
      icon: "HandshakeIcon",
      title: "Medical Services",
      content:
        "Information provided on this website is for informational purposes only and does not substitute for direct medical consultation. No content on this website should be considered a replacement for specialized medical diagnosis or treatment. Patients should always consult their treating physician for appropriate medical advice.",
    },
    {
      icon: "AlertTriangle",
      title: "Limitation of Liability",
      content:
        "Al-Hayat Hospital is not responsible for any damages resulting from the use of this website or reliance on the information provided herein. While we make every effort to ensure accuracy, we do not guarantee the information is error-free. The website may experience maintenance periods or temporary interruptions.",
    },
    {
      icon: "Scale",
      title: "Intellectual Property",
      content:
        "All content published on this website including text, images, logos, and designs are the intellectual property of Al-Hayat Hospital and are protected under copyright laws. Copying, distributing, or modifying any content without prior written permission is prohibited.",
    },
    {
      icon: "RefreshCw",
      title: "Modifications",
      content:
        "Al-Hayat Hospital reserves the right to modify these terms at any time without prior notice. Modified terms will be effective immediately upon publication on the website. Your continued use of the website after modifications are published constitutes acceptance of the new terms.",
    },
  ],
};

const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = { FileCheck, UserCheck, AlertTriangle, RefreshCw, Scale, HandshakeIcon };

export default function TermsPage({
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
        label={dict.footer.terms}
        title={dict.footer.terms}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.footer.terms },
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
                  <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-5 h-5 text-navy" />}
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
