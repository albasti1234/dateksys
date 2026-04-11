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
    title: t("careers_title"),
    description: t("careers_description"),
    openGraph: {
      title: t("careers_title"),
      description: t("careers_description"),
      url: `${BASE_URL}/${locale}/careers`,
    },
    twitter: {
      title: t("careers_title"),
      description: t("careers_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/careers`,
      languages: {
        en: `${BASE_URL}/en/careers`,
        ar: `${BASE_URL}/ar/careers`,
        "x-default": `${BASE_URL}/en/careers`,
      },
    },
  };
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
