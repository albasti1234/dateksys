"use client";

import { use } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { departments, doctors } from "@/lib/data";
import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import DepartmentsPreview from "@/components/home/DepartmentsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DoctorHighlights from "@/components/home/DoctorHighlights";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

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
      <Hero locale={locale} dict={dict.home.hero} />
      <StatsStrip locale={locale} stats={dict.home.stats} />
      <DepartmentsPreview
        locale={locale}
        dict={dict.home.departments}
        departments={departments}
      />
      <WhyChooseUs locale={locale} dict={dict.home.whyUs} />
      <DoctorHighlights
        locale={locale}
        dict={dict.home.doctors}
        doctors={doctors}
        departments={departments}
      />
      <Testimonials locale={locale} dict={dict.home.testimonials} />
      <CallToAction locale={locale} dict={dict.home.cta} />
    </>
  );
}
