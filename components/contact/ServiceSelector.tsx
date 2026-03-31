"use client";

import { useTranslations } from "next-intl";
import { Network, Shield, Code } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

export default function ServiceSelector() {
  const t = useTranslations("contact.form.options.service");

  const services = [
    { id: "infrastructure", icon: Network, label: t("infrastructure") },
    { id: "security", icon: Shield, label: t("security") },
    { id: "software", icon: Code, label: t("software") },
  ];

  return (
    <GlowCard className="p-[32px] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <h3 className="text-[18px] font-heading font-bold text-[var(--color-text-primary)] mb-6 text-start">
        {t("placeholder")}
      </h3>
      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/50 hover:border-accent/40 transition-all duration-300 group cursor-default"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              <service.icon size={20} />
            </div>
            <span className="text-[15px] font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
              {service.label}
            </span>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}