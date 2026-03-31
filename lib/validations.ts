import { z } from "zod";

// ============================================
// Validation Schemas — Zod schemas للفورمات
// ============================================

// --- فورم التواصل ---
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم لازم يكون أكثر من حرفين")
    .max(100, "الاسم طويل جداً"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "رقم الهاتف غير صالح")
    .optional()
    .or(z.literal("")),
  reason: z
    .string()
    .min(1, "يرجى اختيار السبب"),
  subject: z
    .string()
    .min(3, "الموضوع لازم يكون أكثر من 3 حروف")
    .max(200, "الموضوع طويل جداً"),
  message: z
    .string()
    .min(10, "الرسالة لازم تكون أكثر من 10 حروف")
    .max(5000, "الرسالة طويلة جداً"),
  // Honeypot — hidden field, must be empty
  honeypot: z
    .string()
    .max(0)
    .optional(),
});

// --- فورم طلب عرض سعر ---
export const quoteSchema = z.object({
  contactName: z
    .string()
    .min(2, "الاسم لازم يكون أكثر من حرفين")
    .max(100, "الاسم طويل جداً"),
  contactEmail: z
    .string()
    .email("البريد الإلكتروني غير صالح"),
  contactPhone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "رقم الهاتف غير صالح")
    .optional()
    .or(z.literal("")),
  companyName: z
    .string()
    .min(2, "اسم الشركة لازم يكون أكثر من حرفين")
    .max(200, "اسم الشركة طويل جداً"),
  serviceType: z
    .string()
    .min(1, "يرجى اختيار نوع الخدمة"),
  budgetRange: z
    .string()
    .optional()
    .or(z.literal("")),
  timeline: z
    .string()
    .optional()
    .or(z.literal("")),
  projectScope: z
    .string()
    .min(10, "تفاصيل المشروع لازم تكون أكثر من 10 حروف")
    .max(5000, "التفاصيل طويلة جداً"),
  details: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal("")),
  // Honeypot — hidden field, must be empty
  honeypot: z
    .string()
    .max(0)
    .optional(),
});

// --- Types ---
export type ContactFormData = z.infer<typeof contactSchema>;
export type QuoteFormData = z.infer<typeof quoteSchema>;