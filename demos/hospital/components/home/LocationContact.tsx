"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport, getSlideDirection } from "@/lib/animations";

export default function LocationContact({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const slideDir = getSlideDirection(isRTL);

  const contactItems = [
    {
      icon: MapPin,
      label: isRTL ? "العنوان" : "Address",
      value: isRTL
        ? "شارع المدينة المنورة، عمّان، الأردن"
        : "Al-Madina Al-Munawwara St, Amman, Jordan",
    },
    {
      icon: Phone,
      label: isRTL ? "الهاتف" : "Phone",
      value: "+962 6 500 0000",
      href: "tel:+96265000000",
    },
    {
      icon: Mail,
      label: isRTL ? "البريد الإلكتروني" : "Email",
      value: "info@royalmedical.jo",
      href: "mailto:info@royalmedical.jo",
    },
    {
      icon: Clock,
      label: isRTL ? "ساعات العمل" : "Working Hours",
      value: isRTL ? "السبت-الخميس: ٨ صباحاً - ٨ مساءً" : "Sat–Thu: 8:00 AM – 8:00 PM",
      extra: isRTL ? "الطوارئ: ٢٤ ساعة / ٧ أيام" : "Emergency: 24/7",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            variants={slideDir}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] lg:aspect-auto lg:min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.8!2d35.87!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTInMTIuMCJF!5e0!3m2!1sen!2sjo!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isRTL ? "موقع المركز الطبي الملكي" : "Royal Medical Center Location"}
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.span variants={fadeUp} className="section-label">
              {isRTL ? "موقعنا" : "Find Us"}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className={`text-3xl lg:text-4xl font-bold text-text-primary mb-8 ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {isRTL ? "زورونا في عمّان" : "Visit Us in Amman"}
            </motion.h2>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary mb-0.5">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-text-body hover:text-primary transition-colors"
                        dir={item.label === "Phone" || item.label === "الهاتف" ? "ltr" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-text-body">{item.value}</div>
                    )}
                    {item.extra && (
                      <div className="text-sm text-danger font-medium mt-1">
                        {item.extra}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {isRTL ? "احصل على الاتجاهات" : "Get Directions"}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
