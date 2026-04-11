import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <AnnouncementBar locale={locale} dict={dict.announcementBar} />
      <Navbar locale={locale} dict={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
