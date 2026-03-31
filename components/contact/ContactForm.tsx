"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const phoneRegex = /^(?:\+?\d{1,3})?[ -]?\(?(?:\d{1,4})\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,4}$/;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const t = useTranslations("contact.form");

  const contactFormSchema = useMemo(() => z.object({
    name: z.string().min(2, t("validation.name_min")).max(100),
    email: z.string().email(t("validation.email_invalid")),
    phone: z
      .string()
      .regex(phoneRegex, t("validation.phone_invalid"))
      .optional()
      .or(z.literal("")),
    subject: z.string().min(2, t("validation.subject_min")).max(150),
    message: z.string().min(10, t("validation.message_min")).max(2000),
    honeypot: z.string().max(0),
  }), [t]);

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
      setServerMessage("Network error. Please try again.");
    }
  }

  const inputClasses =
    "w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-[20px] py-[16px] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 focus:shadow-[0_0_20px_rgba(14,165,233,0.06)] transition-all duration-300 font-body text-start";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[24px]">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Leave empty</label>
        <input id="contact-hp" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div>
          <input
            {...register("name")}
            placeholder={t("fields.name")}
            className={inputClasses}
          />
          {errors.name && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder={t("fields.email")}
            className={inputClasses}
          />
          {errors.email && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div>
          <input
            {...register("phone")}
            placeholder={t("fields.phone")}
            className={inputClasses}
          />
          {errors.phone && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.phone.message}</p>}
        </div>
        <div>
          <input
            {...register("subject")}
            placeholder={t("fields.subject")}
            className={inputClasses}
          />
          {errors.subject && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={t("fields.message")}
          className={`${inputClasses} resize-none`}
        />
        {errors.message && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.message.message}</p>}
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
        {status === "loading" ? t("fields.sending") : t("fields.submit")}
      </button>
    </form>
  );
}

