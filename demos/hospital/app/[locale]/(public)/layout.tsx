import TopBar from "@/components/layout/TopBar";
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
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar locale={locale} />
        <Navbar locale={locale} dict={dict.nav} />
      </div>
      <main id="main-content" className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
