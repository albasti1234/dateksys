"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Property, Agent } from "@/lib/types";
import PropertyHero from "@/components/property/PropertyHero";
import PropertyStory from "@/components/property/PropertyStory";
import PropertySpecs from "@/components/property/PropertySpecs";
import MortgageCalculator from "@/components/property/MortgageCalculator";
import AgentCard from "@/components/property/AgentCard";
import SimilarProperties from "@/components/property/SimilarProperties";

export default function PropertyDetailClient({
  locale,
  dict,
  property,
  agent,
  similar,
}: {
  locale: Locale;
  dict: Dictionary;
  property: Property | undefined;
  agent: Agent | undefined;
  similar: Property[];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {isRTL ? "العقار غير موجود" : "Property Not Found"}
          </h1>
          <Link href={`${prefix}/properties`} className="text-gold hover:underline">
            {isRTL ? "العودة للعقارات" : "Back to Properties"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-24 start-8 md:start-16 lg:start-24 z-20">
        <Link
          href={`${prefix}/properties`}
          className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          {dict.common.back}
        </Link>
      </div>

      <PropertyHero locale={locale} property={property} />
      <PropertyStory locale={locale} dict={dict.propertyDetail} property={property} />
      <PropertySpecs locale={locale} dict={dict.propertyDetail} property={property} />
      <MortgageCalculator locale={locale} dict={dict.propertyDetail} propertyPrice={property.price} />
      {agent && <AgentCard locale={locale} dict={dict.propertyDetail} agent={agent} />}
      <SimilarProperties locale={locale} dict={dict.propertyDetail} properties={similar} />
    </>
  );
}
