import { getTranslations } from "next-intl/server";

const BASE_URL = process.env.SITE_URL || "https://dateksys.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("services_title"),
    description: t("services_description"),
    openGraph: {
      title: t("services_title"),
      description: t("services_description"),
      url: `${BASE_URL}/${locale}/services`,
    },
    twitter: {
      title: t("services_title"),
      description: t("services_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        en: `${BASE_URL}/en/services`,
        ar: `${BASE_URL}/ar/services`,
        "x-default": `${BASE_URL}/en/services`,
      },
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
