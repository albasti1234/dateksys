import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { properties, getPropertyBySlug, getAgent } from "@/lib/properties";
import PropertyDetailClient from "./PropertyDetailClient";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    properties.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const property = getPropertyBySlug(slug);
  const agent = property ? getAgent(property.agent) : undefined;
  const similar = property
    ? properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3)
    : [];

  return (
    <PropertyDetailClient
      locale={locale}
      dict={dict}
      property={property}
      agent={agent}
      similar={similar}
    />
  );
}
