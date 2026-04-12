import Hero from "@/components/home/Hero";
import ProcessSection from "@/components/home/ProcessSection";
import ShowcaseSpotlight from "@/components/home/ShowcaseSpotlight";
import WhyDatekSys from "@/components/home/WhyDatekSys";
import CapabilitiesBento from "@/components/home/CapabilitiesBento";
import Testimonials from "@/components/home/Testimonials";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <SectionDivider />
      <ShowcaseSpotlight />
      <WhyDatekSys />
      <SectionDivider />
      <CapabilitiesBento />
      <SectionDivider />
      <Testimonials />
    </>
  );
}
