"use client";

import { use } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { properties, testimonials, journalArticles } from "@/lib/properties";
import HeroSection from "@/components/home/HeroSection";
import StatsMarquee from "@/components/home/StatsMarquee";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ExperienceSection from "@/components/home/ExperienceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import JournalPreview from "@/components/home/JournalPreview";
import CTASection from "@/components/home/CTASection";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict.home.hero} />
      <StatsMarquee locale={locale} dict={dict.home.stats} />
      <FeaturedProperties
        locale={locale}
        dict={dict.home.featured}
        properties={properties}
      />
      <ExperienceSection locale={locale} dict={dict.home.experience} />
      <TestimonialsSection
        locale={locale}
        dict={dict.home.testimonials}
        testimonials={testimonials}
      />
      <JournalPreview
        locale={locale}
        dict={dict.home.journal}
        articles={journalArticles}
      />
      <CTASection locale={locale} dict={dict.home.cta} />
    </>
  );
}
