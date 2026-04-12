import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { doctors, departments } from "@/lib/data";
import DoctorProfileClient from "@/components/doctors/DoctorProfileClient";
import PageHero from "@/components/ui/PageHero";

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    for (const doctor of doctors) {
      params.push({ locale, id: doctor.id });
    }
  }
  return params;
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) {
    notFound();
  }

  const department = departments.find((d) => d.id === doctor.departmentId);

  return (
    <>
      <PageHero
        locale={locale}
        title={doctor.name[locale]}
        subtitle={doctor.title[locale]}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.doctors.heroLabel, href: `/${locale}/doctors` },
          { label: doctor.name[locale] },
        ]}
      />
      <DoctorProfileClient
        locale={locale}
        dict={dict}
        doctor={doctor}
        department={department}
      />
    </>
  );
}
