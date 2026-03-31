import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import WhyDatekSys from "@/components/home/WhyDatekSys";
import Testimonials from "@/components/home/Testimonials";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
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
      <section className="px-[5%] lg:px-[6%] py-24 lg:py-32">
        <ProjectsGrid preview />
      </section>
      <SectionDivider />
      <Testimonials />
    </>
  );
}