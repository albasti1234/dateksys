// ============================================
// JSON-LD Structured Data — للـ SEO
// بيساعد Google يفهم شو شركتك وشو بتعمل
// ============================================

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DatekSys",
    url: "https://dateksys.com",
    logo: "https://dateksys.com/images/logo.png",
    description:
      "Enterprise-grade networking, data center solutions, security systems, and custom software development.",
    foundingDate: "2013",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@dateksys.com",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      "https://linkedin.com/company/dateksys",
      "https://instagram.com/dateksys",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DatekSys",
    url: "https://dateksys.com",
    image: "https://dateksys.com/images/logo.png",
    description:
      "Enterprise IT infrastructure, security systems, and custom software development in Amman, Jordan.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressRegion: "Amman",
      addressCountry: "JO",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 31.9454,
        longitude: 35.9284,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Network Infrastructure",
            description:
              "Enterprise-grade network design, fiber optic deployment, and LAN/WAN architecture.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Security Systems",
            description:
              "CCTV surveillance, biometric access control, fire alarm systems, and network security.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software Development",
            description:
              "Custom web applications, business platforms, and enterprise software development.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DatekSys",
    url: "https://dateksys.com",
    inLanguage: ["en", "ar"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}