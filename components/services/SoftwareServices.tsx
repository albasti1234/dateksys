"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Code, Layout, Globe, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import GlowCard from "@/components/ui/GlowCard";

interface ServiceItem {
  title: string;
  sub: string;
  desc: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  layout: Layout,
  globe: Globe,
};

export default function SoftwareServices() {
  const t = useTranslations("servicesOverview");
  const softwareData = (t.raw("items") as ServiceItem[]).slice(3, 6);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const variants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      },
    },
  };

  return (
    <motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-6">
      {softwareData.map((service: ServiceItem, i: number) => {
        const IconComponent = iconMap[service.icon] || Code;
        return (
          <motion.div key={i} variants={variants}>
            <GlowCard className="p-6 md:p-8 bg-surface border-border h-full">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                  <IconComponent size={28} />
                </div>
                <div className="flex-1 text-start">
                  <span className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-2 block">{service.sub}</span>
                  <h3 className="text-xl md:text-[22px] font-heading font-bold text-text-primary mb-3">{service.title}</h3>
                  <p className="text-text-secondary text-[15px] leading-relaxed line-clamp-2 md:line-clamp-none">
                    {service.desc}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
