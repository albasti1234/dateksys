"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { fadeUp, stagger } from "@/lib/animations";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const c = dict.contact;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    // Simulate API call
    console.log("Contact form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <>
      <PageHero
        locale={locale}
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        imageUrl="/demos/hospital/images/hospital_hero.png"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: c.heroLabel },
        ]}
      />

      <section className="py-24 bg-gray-50 min-h-[60vh] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-bl-full pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-12">
            
            {/* Contact Form */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-navy/5 border border-gray-100">
                <motion.div variants={fadeUp} className="mb-8">
                  <h2 className={`text-3xl font-bold text-navy mb-3 ${fontHeading}`}>
                    {c.form.send}
                  </h2>
                  <p className="text-ink-soft">
                    {isRTL ? "نحن هنا للإجابة على استفساراتك. يرجى ملء النموذج أدناه وسنتواصل معك قريباً." : "We are here to answer your questions. Please fill out the form below and we will get back to you shortly."}
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald" />
                      </div>
                      <h3 className={`text-2xl font-bold text-navy mb-2 ${fontHeading}`}>
                        {c.form.success}
                      </h3>
                      <p className="text-ink-soft">
                        {isRTL ? "شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن." : "Thank you for reaching out. We will respond to you as soon as possible."}
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        className="mt-8 text-teal font-semibold hover:underline"
                      >
                        {isRTL ? "إرسال رسالة أخرى" : "Send another message"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      variants={fadeUp}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-2">{c.form.name} *</label>
                          <div className="relative">
                            <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                              {...register("name")}
                              className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-navy mb-2">{c.form.phone} *</label>
                          <div className="relative">
                            <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                              {...register("phone")}
                              type="tel"
                              className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">{c.form.email} *</label>
                        <div className="relative">
                          <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                          <input
                            {...register("email")}
                            type="email"
                            className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">{c.form.message} *</label>
                        <div className="relative">
                          <MessageSquare className={`absolute top-4 w-4 h-4 text-ink-muted ${isRTL ? 'right-4' : 'left-4'}`} />
                          <textarea
                            {...register("message")}
                            rows={5}
                            className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl py-3 shadow-sm focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                          />
                        </div>
                        {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-navy text-white font-bold tracking-wide hover:bg-accent hover:text-navy transition-all duration-300 shadow-xl shadow-navy/20 flex items-center justify-center gap-2 outline-none disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        <Send className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        {isSubmitting ? (isRTL ? "جاري الإرسال..." : "Sending...") : c.form.send}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 order-1 lg:order-2 space-y-8"
            >
              <div className="bg-navy text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
                
                <motion.h2 variants={fadeUp} className={`text-2xl font-bold mb-8 ${fontHeading}`}>
                  {c.info.title}
                </motion.h2>

                <div className="space-y-8">
                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-1">{isRTL ? "العنوان" : "Address"}</p>
                      <p className="text-white/90 leading-relaxed font-medium">{c.info.address}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-1">{isRTL ? "الهاتف" : "Phone"}</p>
                      <a href="tel:065249036" className="text-lg font-bold hover:text-accent transition-colors" dir="ltr">{c.info.phone}</a>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-1">{isRTL ? "البريد الإلكتروني" : "Email"}</p>
                      <a href={`mailto:${c.info.email}`} className="text-base font-medium hover:text-accent transition-colors" dir="ltr">{c.info.email}</a>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-1">{isRTL ? "واتساب" : "WhatsApp"}</p>
                      <a href="https://wa.me/962780104920" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-emerald-400 transition-colors" dir="ltr">{c.info.whatsapp}</a>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="pt-8 border-t border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-1">{isRTL ? "ساعات العمل" : "Working Hours"}</p>
                        <p className="text-white font-medium mb-1">{c.info.workingHours}</p>
                        <p className="text-accent font-bold">{c.info.emergencyHours}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
