"use client";

import { use } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import NewsPreview from "@/components/home/NewsPreview";

export default function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  
  const news = isRTL ? {
    title: "المركز الإعلامي",
    subtitle: "آخر الأخبار والمقالات الطبية والنشاطات في مستشفى الحياة.",
    label: "الأخبار"
  } : {
    title: "News & Articles",
    subtitle: "Latest news, medical articles, and activities at Al-Hayat Hospital.",
    label: "News"
  };

  return (
    <>
      <PageHero
        locale={locale}
        label={news.label}
        title={news.title}
        subtitle={news.subtitle}
        imageUrl="/demos/hospital/images/news/heart-health.webp"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: news.label },
        ]}
      />

      {/* Reuse the NewsPreview for the listing for now */}
      <div className="py-12">
        <NewsPreview locale={locale} />
      </div>
    </>
  );
}
