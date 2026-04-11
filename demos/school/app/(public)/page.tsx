import Hero from "@/components/home/Hero";
import WelcomeStrip from "@/components/home/WelcomeStrip";
import ProgramsPreview from "@/components/home/ProgramsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import NewsPreview from "@/components/home/NewsPreview";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeStrip />
      <ProgramsPreview />
      <WhyChooseUs />
      <Testimonials />
      <NewsPreview />
      <CallToAction />
    </>
  );
}
