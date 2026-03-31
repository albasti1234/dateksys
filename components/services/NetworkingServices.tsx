"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Network, Zap, Server, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import GlowCard from "@/components/ui/GlowCard";

interface ServiceItem {
  title: string;
  sub: string;
  desc: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = { 
  network: Network, 
  zap: Zap, 
  server: Server 
};

export default function NetworkingServices() {
  const t = useTranslations("servicesOverview");
  const networkingData = (t.raw("items") as ServiceItem[]).slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: { transition: { staggerChildren: 0.09 } }
  };

  return (
    <motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-[24px]">
      {networkingData.map((service: ServiceItem, i: number) => {
        const IconComponent = iconMap[service.icon] || Network;
        return (
          <motion.div key={i} variants={variants}>
            <GlowCard className="bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="flex flex-col md:flex-row items-start gap-[32px] md:gap-[48px]">
                <div className="shrink-0">
                  <div className="w-[64px] h-[64px] rounded-2xl border border-accent/15 bg-accent/5 flex items-center justify-center group-hover:border-accent/30 transition-colors duration-500">
                    <IconComponent size={28} className="text-accent" />
                  </div>
                </div>
                <div className="text-start">
                  <h3 className="font-heading font-bold text-[24px] text-[var(--color-text-primary)] mb-[8px]">{service.title}</h3>
                  <p className="text-accent text-[13px] font-medium tracking-wide mb-[16px] uppercase">{service.sub}</p>
                  <p className="text-[var(--color-text-secondary)] text-[16px] leading-[1.75] max-w-[600px]">{service.desc}</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

