"use client";

import { use } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { BriefcaseBusiness } from "lucide-react";

export default function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  
  // Hardcoded content as it's missing from current dictionary
  const careers = isRTL ? {
    title: "انضم إلى فريقنا",
    subtitle: "نحن نبحث دائماً عن التميز. كن جزءاً من مؤسسة طبية رائدة في الأردن.",
    label: "فرص العمل"
  } : {
    title: "Join Our Team",
    subtitle: "We are always looking for excellence. Be part of a leading medical institution in Jordan.",
    label: "Careers"
  };

  return (
    <>
      <PageHero
        locale={locale}
        label={careers.label}
        title={careers.title}
        subtitle={careers.subtitle}
        imageUrl="/demos/hospital/images/careers/team-hero.webp"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: careers.label },
        ]}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
            <div className="bg-gray-50 rounded-3xl p-12 border border-dashed border-gray-300">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
                    <BriefcaseBusiness className="w-8 h-8 text-teal" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                    {isRTL ? "لا توجد شواغر حالية" : "No Open Positions"}
                </h2>
                <p className="text-ink-soft max-w-lg mx-auto">
                    {isRTL 
                        ? "شكراً لاهتمامكم بالعمل معنا. حالياً لا توجد شواغر معلن عنها، ولكن يمكنك متابعة هذه الصفحة باستمرار."
                        : "Thank you for your interest. We currently have no open positions, but please check back later for updates."}
                </p>
            </div>
        </div>
      </section>
    </>
  );
}
