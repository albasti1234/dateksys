import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import WhyDatekSys from "@/components/home/WhyDatekSys";
import Testimonials from "@/components/home/Testimonials";
import CapabilitiesBento from "@/components/home/CapabilitiesBento";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <StatsBar />
      <SectionDivider />
      <ServicesOverview />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider />
      <WhyDatekSys />
      <SectionDivider />
      <CapabilitiesBento />
      <SectionDivider />
      <Testimonials />
    </>
  );
}