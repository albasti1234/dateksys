"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

export default function OfficeLocations() {
  const t = useTranslations("contact.info");

  return (
    <GlowCard className="p-[32px] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <h3 className="text-[18px] font-heading font-bold text-[var(--color-text-primary)] mb-6 text-start">
        {t("label") || "Contact Information"}
      </h3>
      <div className="space-y-6">
        {/* Location */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0">
            <MapPin size={20} />
          </div>
          <div className="text-start">
            <p className="text-[12px] font-bold text-accent uppercase tracking-[0.1em] mb-1">
              {t("address")}
            </p>
            <p className="text-[15px] font-medium text-[var(--color-text-secondary)]">
              {t("address_val")}
            </p>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.1)", color: "#25D366" }}>
            <MessageCircle size={20} />
          </div>
          <div className="text-start">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: "#25D366" }}>
              {t("whatsapp")}
            </p>
            <a
              href="https://wa.me/962780104920"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300"
              dir="ltr"
            >
              {t("whatsapp_val")}
            </a>
          </div>
        </div>

        {/* Phone (Landline) */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0">
            <Phone size={20} />
          </div>
          <div className="text-start">
            <p className="text-[12px] font-bold text-accent uppercase tracking-[0.1em] mb-1">
              {t("phone")}
            </p>
            <a
              href="tel:+96265249036"
              className="text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300"
              dir="ltr"
            >
              {t("phone_val")}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0">
            <Mail size={20} />
          </div>
          <div className="text-start">
            <p className="text-[12px] font-bold text-accent uppercase tracking-[0.1em] mb-1">
              {t("email")}
            </p>
            <a
              href="mailto:info@dateksys.com"
              className="text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300"
            >
              {t("email_val")}
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0">
            <Clock size={20} />
          </div>
          <div className="text-start">
            <p className="text-[12px] font-bold text-accent uppercase tracking-[0.1em] mb-1">
              {t("hours")}
            </p>
            <p className="text-[15px] font-medium text-[var(--color-text-secondary)]">
              {t("hours_val")}
            </p>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
