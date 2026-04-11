// ============================================
// Al-Nakhla International Academy — English Content
// Originally written — not translated from Arabic
// ============================================

import type { Dictionary } from "./ar";

const dict: Dictionary = {
  meta: {
    title: "Al-Nakhla International Academy — Where Excellence Takes Root",
    description:
      "A premier international academy in Amman, Jordan. Bilingual education rooted in Arabic heritage and shaped by world-class academics. From kindergarten through high school.",
    keywords: [
      "Al-Nakhla Academy",
      "International school Amman",
      "Private school Jordan",
      "Bilingual education Jordan",
      "IB school Amman",
    ],
  },

  // ─────── Announcement Bar ───────
  announcementBar: {
    phoneLabel: "Call us",
    hoursLabel: "Sun – Thu · 8 AM – 4 PM",
    rotating: [
      "🎓 Admissions for the 2026–2027 academic year are now open — apply today",
      "📅 Open House Event — Saturday, May 3rd · 10 AM to 2 PM",
      "🏆 Al-Nakhla ranked among the top 5 international schools in Jordan · 2025",
    ],
    closeLabel: "Close announcement",
  },

  // ─────── Navigation ───────
  nav: {
    home: "Home",
    about: {
      label: "About",
      items: [
        { label: "Our Story", href: "/about" },
        { label: "Leadership", href: "/about#leadership" },
        { label: "Campus", href: "/about#campus" },
        { label: "Accreditations", href: "/about#accreditation" },
      ],
    },
    academics: {
      label: "Academics",
      items: [
        { label: "Early Years (KG1 – KG2)", href: "/programs#early" },
        { label: "Primary (Grades 1 – 5)", href: "/programs#primary" },
        { label: "Middle School (Grades 6 – 8)", href: "/programs#middle" },
        { label: "High School (Grades 9 – 12)", href: "/programs#high" },
        { label: "IB Programme", href: "/programs#ib" },
      ],
    },
    admissions: "Admissions",
    faculty: "Faculty",
    news: "News",
    contact: "Contact",
    portalLogin: "Portals",
    portals: [
      { label: "Parent Portal", href: "/portal/parent" },
      { label: "Teacher Portal", href: "/portal/teacher" },
      { label: "Student Portal", href: "/portal/student" },
      { label: "Admin Dashboard", href: "/portal/admin" },
    ],
    toggleMenu: "Menu",
    switchLanguage: "العربية",
  },

  // ─────── Home Page ───────
  home: {
    // Hero
    hero: {
      badge: "Top 5 International Schools in Jordan · 2025",
      headlineTop: "Where",
      headlineMid: "Excellence",
      headlineAccent: "Takes Root.",
      subtitle:
        "An international academy in the heart of Amman, rooted in the Arabic tradition and shaped by world-class academics. We raise students who honour where they come from and speak confidently to the world.",
      ctaPrimary: "Apply for Admission",
      ctaSecondary: "Watch Campus Tour",
      stats: [
        { num: "850+", label: "Students" },
        { num: "65+", label: "Faculty" },
        { num: "22", label: "Years" },
      ],
      floatingBadge: {
        value: "98%",
        label: "University acceptance rate",
      },
    },

    // Welcome strip
    welcome: {
      eyebrow: "A Message from Our Leadership",
      title: "A school that truly sees every child",
      body: "At Al-Nakhla, we don't just teach children — we walk with them as they discover who they are. We believe every child carries a seed of their own, and our role is to offer the fertile soil, the honest care, and the wide open space where that seed can grow and bloom. Here, students learn how to think — not what to think.",
      signature: "Dr. Rasha Al-Khatib — Head of School",
    },

    // Programs preview
    programs: {
      eyebrow: "The Academic Journey",
      title: "Four stages, one continuous journey",
      subtitle:
        "We walk alongside each student from their first day in kindergarten to their graduation, with a curriculum that balances knowledge, character, and real skill.",
      items: [
        {
          stage: "Early Years",
          grades: "KG1 – KG2",
          description:
            "A safe, stimulating environment where children learn through play and discovery — and fall in love with learning from their very first day.",
        },
        {
          stage: "Primary",
          grades: "Grades 1 – 5",
          description:
            "A strong foundation in Arabic, English, mathematics, and science — layered with daily reading habits and early critical thinking.",
        },
        {
          stage: "Middle School",
          grades: "Grades 6 – 8",
          description:
            "Deeper academic skills, early discovery of interests, and growing independence and leadership through real-world projects.",
        },
        {
          stage: "High School",
          grades: "Grades 9 – 12",
          description:
            "Full preparation for local and international universities, including the IB Programme, with one-to-one academic guidance for every student.",
        },
      ],
      cta: "Explore Full Curriculum",
    },

    // Why choose us
    why: {
      eyebrow: "Why Al-Nakhla",
      title: "Excellence isn't a slogan — it's a daily practice",
      features: [
        {
          title: "An elite teaching faculty",
          description:
            "More than 65 educators with international and local experience, teaching with passion and knowing every student by name.",
        },
        {
          title: "A complete campus",
          description:
            "Modern science labs, a digital library, certified sports courts, dedicated arts and music halls, and a 300-seat performance theatre.",
        },
        {
          title: "Genuine bilingual education",
          description:
            "We teach Arabic with pride and English to native-speaker fluency — because language is an identity before it's a tool.",
        },
        {
          title: "Internationally accredited curriculum",
          description:
            "Fully licensed by the Jordanian Ministry of Education and authorised to offer the IB Programme, recognised in over 150 countries.",
        },
        {
          title: "Personal attention",
          description:
            "Class sizes capped at 20 students, with a dedicated academic mentor for every group — because every child deserves to be seen and heard.",
        },
        {
          title: "A vibrant school community",
          description:
            "More than 30 extracurricular activities, field trips, regional and international competitions, and community initiatives that shape character.",
        },
      ],
    },

    // Testimonials
    testimonials: {
      eyebrow: "From Our Families",
      title: "The voices of those who live the Al-Nakhla experience",
      items: [
        {
          quote:
            "We chose Al-Nakhla for our son because we wanted a school that cares about his character before his grades. Four years later, we feel he hasn't just gained knowledge — he's found himself.",
          author: "Mr. Mohammad Al-Atoum",
          role: "Parent of an 8th grader",
        },
        {
          quote:
            "My daughter loves her school, and that's the most precious thing a mother can hear. The teachers here treat children with honesty and respect, and the atmosphere feels like home.",
          author: "Dr. Lina Al-Hourani",
          role: "Parent of a 5th grader",
        },
        {
          quote:
            "I graduated from Al-Nakhla five years ago, and I'm now studying medicine at King Saud University. What the school gave me wasn't just lessons — it was a way of thinking.",
          author: "Ms. Sara Al-Qudah",
          role: "Class of 2020",
        },
      ],
    },

    // News preview
    news: {
      eyebrow: "Academy News",
      title: "What's happening at Al-Nakhla",
      items: [
        {
          category: "Achievements",
          date: "March 15, 2026",
          title:
            "Al-Nakhla team takes first place in the national robotics championship",
          excerpt:
            "Six of our students have qualified for the regional championship, taking place in Dubai next month.",
        },
        {
          category: "Events",
          date: "March 8, 2026",
          title:
            "World Cultures Week — a trip around the world, inside campus",
          excerpt:
            "Al-Nakhla celebrated the diversity of its students through heritage performances, global cuisine, and research exhibitions.",
        },
        {
          category: "Academic",
          date: "March 2, 2026",
          title:
            "Launching the individual academic mentoring programme for high school",
          excerpt:
            "The programme pairs every student with an academic mentor who walks with them through their university track decisions.",
        },
      ],
      cta: "All News",
    },

    // Final CTA
    cta: {
      eyebrow: "Join Our Community",
      title: "Your child's place is waiting",
      body: "Admissions for the 2026–2027 academic year are now open. Book a campus tour, or submit your application online in a few simple steps.",
      ctaPrimary: "Apply for Admission",
      ctaSecondary: "Book a Campus Tour",
    },
  },

  // ─────── Footer ───────
  footer: {
    schoolName: "Al-Nakhla International Academy",
    tagline: "Where Excellence Takes Root",
    about:
      "An international academy in Abu Nseir, Amman, offering bilingual education that brings together the authenticity of the Jordanian national curriculum and the depth of a world-class international programme.",
    columns: {
      academy: {
        title: "The Academy",
        links: [
          { label: "Our Story", href: "/about" },
          { label: "Leadership", href: "/about#leadership" },
          { label: "Accreditations", href: "/about#accreditation" },
          { label: "Campus", href: "/about#campus" },
          { label: "Careers", href: "/about#careers" },
        ],
      },
      academics: {
        title: "Academics",
        links: [
          { label: "Curriculum & Programmes", href: "/programs" },
          { label: "Faculty", href: "/faculty" },
          { label: "Extracurriculars", href: "/programs#activities" },
          { label: "IB Programme", href: "/programs#ib" },
        ],
      },
      parents: {
        title: "For Parents",
        links: [
          { label: "Admissions", href: "/admissions" },
          { label: "Fees", href: "/admissions#fees" },
          { label: "Scholarships", href: "/admissions#scholarships" },
          { label: "Parent Portal", href: "/portal/parent" },
        ],
      },
      connect: {
        title: "Get in Touch",
        items: [
          { label: "Phone", value: "+962 6 555 1234" },
          { label: "Email", value: "info@alnakhla.edu.jo" },
          {
            label: "Address",
            value: "Queen Rania Street, Abu Nseir, Amman, Jordan",
          },
        ],
      },
    },
    bottomBar: {
      copyright: "© 2026 Al-Nakhla International Academy. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      sitemap: "Sitemap",
    },
  },
};

export default dict;
