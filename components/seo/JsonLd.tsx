// ============================================
// JSON-LD Structured Data — للـ SEO
// بيساعد Google يفهم شو شركتك وشو بتعمل
// ============================================

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dateksys.com/#organization",
    name: "DatekSys",
    url: "https://dateksys.com",
    logo: {
      "@type": "ImageObject",
      url: "https://dateksys.com/images/logo.png",
      width: 512,
      height: 512,
    },
    description:
      "Enterprise-grade networking, data center solutions, security systems, and custom software development.",
    foundingDate: "2013",
    telephone: "+962780104920",
    email: "info@dateksys.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Amman",
      addressLocality: "Amman",
      addressRegion: "Amman Governorate",
      addressCountry: "JO",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+962780104920",
        email: "info@dateksys.com",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: [
      "https://linkedin.com/company/dateksys",
      "https://instagram.com/dateksys",
    ],
    areaServed: {
      "@type": "Country",
      name: "Jordan",
    },
    knowsAbout: [
      "Network Infrastructure",
      "Fiber Optic Installation",
      "Data Center Solutions",
      "CCTV Security Systems",
      "Web Development",
      "Enterprise IT Solutions",
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
    "@id": "https://dateksys.com/#localbusiness",
    name: "DatekSys",
    url: "https://dateksys.com",
    image: "https://dateksys.com/images/logo.png",
    description:
      "Enterprise IT infrastructure, security systems, and custom software development in Amman, Jordan.",
    telephone: "+962780104920",
    email: "info@dateksys.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Amman",
      addressLocality: "Amman",
      addressRegion: "Amman Governorate",
      addressCountry: "JO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.9454,
      longitude: 35.9284,
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fiber Optic Installation",
            description:
              "Professional fiber optic cable deployment, splicing, and testing for enterprise networks.",
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
    "@id": "https://dateksys.com/#website",
    name: "DatekSys",
    url: "https://dateksys.com",
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": "https://dateksys.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
