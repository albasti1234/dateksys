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
    title: t("projects_title"),
    description: t("projects_description"),
    openGraph: {
      title: t("projects_title"),
      description: t("projects_description"),
      url: `${BASE_URL}/${locale}/projects`,
    },
    twitter: {
      title: t("projects_title"),
      description: t("projects_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
      languages: {
        en: `${BASE_URL}/en/projects`,
        ar: `${BASE_URL}/ar/projects`,
        "x-default": `${BASE_URL}/en/projects`,
      },
    },
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
