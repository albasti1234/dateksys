"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const phoneRegex = /^(?:\+?\d{1,3})?[ -]?\(?(?:\d{1,4})\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,4}$/;

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const t = useTranslations("contact.form");

  const quoteFormSchema = useMemo(() => z.object({
    companyName: z.string().min(2, t("validation.company_min")).max(150),
    serviceType: z.string().min(2, t("validation.service_min")),
    projectScope: z.string().min(10, t("validation.scope_min")).max(2000),
    budgetRange: z.string().min(2, t("validation.budget_min")),
    timeline: z.string().min(2, t("validation.timeline_min")),
    details: z.string().max(2000).optional(),
    contactName: z.string().min(2, t("validation.name_min")).max(100),
    contactEmail: z.string().email(t("validation.email_invalid")),
    contactPhone: z
      .string()
      .regex(phoneRegex, t("validation.phone_invalid"))
      .optional()
      .or(z.literal("")),
    honeypot: z.string().max(0),
  }), [t]);

  type QuoteFormData = z.infer<typeof quoteFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      companyName: "",
      projectScope: "",
      details: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: QuoteFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(json.message || "Success");
        reset();
      } else {
        setStatus("error");
        setServerMessage(json.error || "Error");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error.");
    }
  }

  const inputClasses =
    "w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-[20px] py-[16px] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 focus:shadow-[0_0_20px_rgba(14,165,233,0.06)] transition-all duration-300 font-body text-start appearance-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[24px]">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-hp">Leave empty</label>
        <input id="quote-hp" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div>
           <input {...register("companyName")} placeholder={t("fields.company")} className={inputClasses} />
           {errors.companyName && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.companyName.message}</p>}
        </div>
        <div className="relative">
          <select {...register("serviceType")} className={inputClasses} defaultValue="">
            <option value="" disabled>{t("options.service.placeholder")}</option>
            <option value="infrastructure">{t("options.service.infrastructure")}</option>
            <option value="security">{t("options.service.security")}</option>
            <option value="software">{t("options.service.software")}</option>
            <option value="consulting">{t("options.service.consulting")}</option>
            <option value="other">{t("options.service.other")}</option>
          </select>
          {errors.serviceType && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.serviceType.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div className="relative">
          <select {...register("budgetRange")} className={inputClasses} defaultValue="">
            <option value="" disabled>{t("options.budget.placeholder")}</option>
            <option value="under_5k">{t("options.budget.under_5k")}</option>
            <option value="5k_15k">{t("options.budget.5k_15k")}</option>
            <option value="15k_50k">{t("options.budget.15k_50k")}</option>
            <option value="50k_plus">{t("options.budget.50k_plus")}</option>
            <option value="not_sure">{t("options.budget.not_sure")}</option>
          </select>
          {errors.budgetRange && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.budgetRange.message}</p>}
        </div>
        <div className="relative">
          <select {...register("timeline")} className={inputClasses} defaultValue="">
            <option value="" disabled>{t("options.timeline.placeholder")}</option>
            <option value="urgent">{t("options.timeline.urgent")}</option>
            <option value="1_3_months">{t("options.timeline.1_3_months")}</option>
            <option value="3_6_months">{t("options.timeline.3_6_months")}</option>
            <option value="flexible">{t("options.timeline.flexible")}</option>
          </select>
          {errors.timeline && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.timeline.message}</p>}
        </div>
      </div>

      <div>
        <textarea
          {...register("projectScope")}
          rows={3}
          placeholder={t("fields.scope")}
          className={`${inputClasses} resize-none`}
        />
        {errors.projectScope && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.projectScope.message}</p>}
      </div>

      <div>
        <textarea
          {...register("details")}
          rows={2}
          placeholder={t("fields.details")}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="border-t border-accent/10 pt-[24px]">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <div>
               <input {...register("contactName")} placeholder={t("fields.name")} className={inputClasses} />
               {errors.contactName && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.contactName.message}</p>}
            </div>
            <div>
               <input {...register("contactEmail")} type="email" placeholder={t("fields.email")} className={inputClasses} />
               {errors.contactEmail && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.contactEmail.message}</p>}
            </div>
            <div>
               <input {...register("contactPhone")} placeholder={t("fields.phone")} className={inputClasses} />
               {errors.contactPhone && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.contactPhone.message}</p>}
            </div>
         </div>
      </div>

      {status === "success" && (
        <div className="text-accent text-[14px] text-start">
          {serverMessage}
        </div>
      )}
      {status === "error" && (
        <div className="text-red-400 text-[14px] text-start">
          {serverMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-50"
        data-magnetic
      >
        {status === "loading" ? t("fields.sending") : t("fields.quote_submit")}
      </button>
    </form>
  );
}

