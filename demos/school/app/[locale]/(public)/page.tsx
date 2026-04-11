import Hero from "@/components/home/Hero";
import WelcomeStrip from "@/components/home/WelcomeStrip";
import ProgramsPreview from "@/components/home/ProgramsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import NewsPreview from "@/components/home/NewsPreview";
import CallToAction from "@/components/home/CallToAction";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict.home.hero} />
      <WelcomeStrip locale={locale} dict={dict.home.welcome} />
      <ProgramsPreview locale={locale} dict={dict.home.programs} />
      <WhyChooseUs locale={locale} dict={dict.home.why} />
      <Testimonials locale={locale} dict={dict.home.testimonials} />
      <NewsPreview locale={locale} dict={dict.home.news} />
      <CallToAction locale={locale} dict={dict.home.cta} />
    </>
  );
}
