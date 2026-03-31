"use client";

import { useState, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const phoneRegex = /^(?:\+?\d{1,3})?[ -]?\(?(?:\d{1,4})\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,4}$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("contact.form");

  const contactFormSchema = useMemo(() => z.object({
    name: z.string().min(2, t("validation.name_min")).max(100),
    email: z.string().email(t("validation.email_invalid")),
    phone: z
      .string()
      .regex(phoneRegex, t("validation.phone_invalid"))
      .optional()
      .or(z.literal("")),
    reason: z.string().min(1, t("validation.subject_min")),
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
      reason: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("");
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("PDF, DOC, DOCX only");
      setFileName("");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("Max 5MB");
      setFileName("");
      e.target.value = "";
      return;
    }
    setFileName(file.name);
  }

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      formData.append("reason", data.reason);
      formData.append("subject", data.subject);
      formData.append("message", data.message);
      formData.append("honeypot", data.honeypot || "");

      // File is read via the stored reference in the event handler (not during render)
      const fileInput = fileRef.current;
      const file = fileInput?.files?.[0];
      if (file) formData.append("attachment", file);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(json.message || "Success");
        reset();
        setFileName("");
        if (fileRef.current) fileRef.current.value = "";
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
    "w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-[20px] py-[16px] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 focus:shadow-[0_0_20px_rgba(14,165,233,0.06)] transition-all duration-300 font-body text-start appearance-none";

  return (
    <form onSubmit={(e) => { handleSubmit(onSubmit)(e); }} className="space-y-[24px]">
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
        <div className="relative">
          <select {...register("reason")} className={inputClasses} defaultValue="">
            <option value="" disabled>{t("fields.reason_options.placeholder")}</option>
            <option value="general">{t("fields.reason_options.general")}</option>
            <option value="project">{t("fields.reason_options.project")}</option>
            <option value="support">{t("fields.reason_options.support")}</option>
            <option value="partnership">{t("fields.reason_options.partnership")}</option>
            <option value="careers">{t("fields.reason_options.careers")}</option>
            <option value="other">{t("fields.reason_options.other")}</option>
          </select>
          {errors.reason && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.reason.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("subject")}
          placeholder={t("fields.subject")}
          className={inputClasses}
        />
        {errors.subject && <p className="text-red-400 text-[13px] mt-[8px] text-start">{errors.subject.message}</p>}
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

      {/* File attachment */}
      <div>
        <label
          htmlFor="contact-file"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed transition-all duration-300 group-hover:border-accent/40"
            style={{
              borderColor: fileName ? "rgba(56,189,248,0.3)" : "var(--color-border)",
              background: fileName ? "rgba(56,189,248,0.04)" : "transparent",
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors">
              <path d="M10 3v10m0-10L6 7m4-4l4 4M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-text-secondary font-body">
              {fileName || t("fields.attachment")}
            </span>
          </div>
          <span className="text-[11px] text-text-muted font-body">
            {t("fields.attachment_hint")}
          </span>
        </label>
        <input
          ref={fileRef}
          id="contact-file"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileError && <p className="text-red-400 text-[13px] mt-[8px] text-start">{fileError}</p>}
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
