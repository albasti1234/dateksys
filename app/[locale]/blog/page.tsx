"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

// مقالات مؤقتة — لما تبني CMS بتستبدلهم
const articles: BlogArticle[] = [
  {
    slug: "choosing-right-network-for-business",
    title: "How to Choose the Right Network Architecture for Your Business",
    excerpt: "A practical guide to selecting between LAN, WAN, SD-WAN, and hybrid architectures based on your business size, budget, and growth plans.",
    date: "2026-03-15",
    readTime: "8 min",
    category: "Networking",
    image: "/images/projects/network.webp",
  },
  {
    slug: "data-center-setup-mistakes",
    title: "5 Common Mistakes in Data Center Setup (And How to Avoid Them)",
    excerpt: "From poor cable management to inadequate cooling — learn the costly mistakes businesses make when building their first data center.",
    date: "2026-03-10",
    readTime: "6 min",
    category: "Data Center",
    image: "/images/projects/datacenter.webp",
  },
  {
    slug: "ip-vs-analog-cctv",
    title: "IP vs Analog CCTV: Which Security System is Right for You?",
    excerpt: "A detailed comparison of IP and analog surveillance systems covering cost, image quality, scalability, and remote monitoring capabilities.",
    date: "2026-03-05",
    readTime: "7 min",
    category: "Security",
    image: "/images/projects/security.webp",
  },
  {
    slug: "why-custom-web-application",
    title: "Why Your Business Needs a Custom Web Application, Not Just a Website",
    excerpt: "The difference between a static website and a custom web application — and why investing in the right one can transform your operations.",
    date: "2026-02-28",
    readTime: "5 min",
    category: "Software",
    image: "/images/projects/software.webp",
  },
];

const articlesAr: BlogArticle[] = [
  {
    slug: "choosing-right-network-for-business",
    title: "كيف تختار بنية الشبكة المناسبة لشركتك",
    excerpt: "دليل عملي لاختيار بين LAN و WAN و SD-WAN والبنى الهجينة بناءً على حجم شركتك وميزانيتك وخطط النمو.",
    date: "2026-03-15",
    readTime: "8 دقائق",
    category: "شبكات",
    image: "/images/projects/network.webp",
  },
  {
    slug: "data-center-setup-mistakes",
    title: "5 أخطاء شائعة في إعداد مراكز البيانات (وكيف تتجنبها)",
    excerpt: "من سوء إدارة الكابلات إلى التبريد غير الكافي — تعرّف على الأخطاء المكلفة التي ترتكبها الشركات عند بناء أول مركز بيانات.",
    date: "2026-03-10",
    readTime: "6 دقائق",
    category: "مراكز بيانات",
    image: "/images/projects/datacenter.webp",
  },
  {
    slug: "ip-vs-analog-cctv",
    title: "كاميرات IP مقابل Analog: أي نظام مراقبة مناسب لك؟",
    excerpt: "مقارنة تفصيلية بين أنظمة المراقبة IP و Analog تغطي التكلفة وجودة الصورة والتوسع والمراقبة عن بُعد.",
    date: "2026-03-05",
    readTime: "7 دقائق",
    category: "حماية",
    image: "/images/projects/security.webp",
  },
  {
    slug: "why-custom-web-application",
    title: "لماذا شركتك تحتاج تطبيق ويب مخصص وليس مجرد موقع",
    excerpt: "الفرق بين الموقع الثابت وتطبيق الويب المخصص — ولماذا الاستثمار بالخيار الصحيح يمكن أن يحوّل عملياتك.",
    date: "2026-02-28",
    readTime: "5 دقائق",
    category: "برمجيات",
    image: "/images/projects/software.webp",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ArticleCard({ article, index, readMoreLabel }: { article: BlogArticle; index: number; readMoreLabel: string }) {
  const isFeatured = index === 0;

  return (
    <motion.div
      variants={fadeUp}
      className={`group ${isFeatured ? "md:col-span-2" : ""}`}
    >
      <div
        className="relative overflow-hidden rounded-2xl h-full cursor-pointer transition-all duration-500 hover:border-accent/20"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Image */}
        <div className={`relative w-full overflow-hidden ${isFeatured ? "h-[280px]" : "h-[200px]"}`}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(9,9,11,0.1) 0%, rgba(9,9,11,0.8) 100%)",
            }}
          />

          {/* Category badge */}
          <div className="absolute top-4 start-4">
            <span
              className="px-3 py-1 rounded-full text-[10px] font-heading font-bold tracking-widest uppercase"
              style={{
                background: "rgba(56,189,248,0.15)",
                border: "1px solid rgba(56,189,248,0.25)",
                color: "#38BDF8",
                backdropFilter: "blur(8px)",
              }}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-text-muted font-body mb-3">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className={`font-heading font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300 ${isFeatured ? "text-xl" : "text-base"}`}>
            {article.title}
          </h3>

          <p className="text-sm text-text-muted leading-relaxed font-body line-clamp-2">
            {article.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-text-muted group-hover:text-accent transition-colors duration-300 font-body">
            <span>{readMoreLabel}</span>
            <span className="inline-block group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const displayArticles = locale === "ar" ? articlesAr : articles;

  return (
    <section className="min-h-screen pt-32 pb-24 px-[5%] lg:px-[6%]">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <p className="section-label mb-4">{t("label")}</p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          <span className="gradient-text">{t("title")}</span>
        </h1>
        <p className="text-base text-text-secondary font-body leading-relaxed max-w-xl">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {displayArticles.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} readMoreLabel={t("read_more")} />
        ))}
      </motion.div>
    </section>
  );
}