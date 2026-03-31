"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

export default function OfficeLocations() {
  const t = useTranslations("contact.info");
  
  const info = [
    { icon: MapPin, label: t("address"), value: t("address_val") },
    { icon: Phone, label: t("phone"), value: t("phone_val") },
    { icon: Mail, label: t("email"), value: t("email_val") },
    { icon: Clock, label: t("hours"), value: t("hours_val") },
  ];

  return (
    <GlowCard className="p-[32px] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <h3 className="text-[18px] font-heading font-bold text-[var(--color-text-primary)] mb-6 text-start">
        {t("label") || "Contact Information"}
      </h3>
      <div className="space-y-6">
        {info.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0">
              <item.icon size={20} />
            </div>
            <div className="text-start">
              <p className="text-[12px] font-bold text-accent uppercase tracking-[0.1em] mb-1">
                {item.label}
              </p>
              <p className="text-[15px] font-medium text-[var(--color-text-secondary)]">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}
