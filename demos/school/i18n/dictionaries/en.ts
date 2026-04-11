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
    faq: "FAQ",
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

  // ─────── Shared labels ───────
  common: {
    learnMore: "Learn more",
    breadcrumbHome: "Home",
    readMore: "Read more",
    viewAll: "View all",
  },

  // ─────── Public pages ───────
  pages: {
    // ─── About ───
    about: {
      hero: {
        label: "About Us",
        title: "A legacy of excellence since 2003",
        subtitle:
          "For over two decades, Al-Nakhla International Academy has been shaping the minds of young leaders through a world-class education rooted in character and community.",
        breadcrumb: "About",
      },
      pillars: [
        {
          title: "Our Mission",
          text: "To raise confident, compassionate global citizens through rigorous academics and genuine character development.",
        },
        {
          title: "Our Vision",
          text: "To be Jordan's most respected international school, known for educational excellence and community impact.",
        },
        {
          title: "Our Values",
          text: "Integrity, Excellence, Respect, Innovation, and Community — not slogans, but daily practice inside every classroom.",
        },
      ],
      story: {
        label: "Our Story",
        title: "Built on a foundation of purpose",
        titleAccent: "foundation",
        paragraphs: [
          "Founded in 2003 by a group of visionary educators and parents, Al-Nakhla International Academy began as a small school with a big dream: to offer Jordanian families a world-class international education without leaving home.",
          "Today, we welcome over 850 students from 15+ nationalities into our vibrant learning community. Our graduates have gone on to study at Oxford, MIT, Harvard, AUB, and top universities worldwide — and more importantly, they've become leaders in their communities.",
          "What sets us apart isn't our curriculum or our facilities alone — it's our unwavering commitment to every child's individual journey.",
        ],
      },
      leadership: {
        label: "Our Leadership",
        title: "Meet the team shaping futures",
        team: [
          {
            name: "Dr. Sarah Haddad",
            role: "Head of School",
            bio: "15+ years in international education, PhD in Educational Leadership from Columbia University.",
          },
          {
            name: "Mr. Tariq Mansour",
            role: "Deputy Head — Academics",
            bio: "Former IB examiner, specialises in STEM curriculum design and teacher development.",
          },
          {
            name: "Ms. Nadia Khouri",
            role: "Head of Primary",
            bio: "Passionate early childhood educator with 12 years of experience in bilingual instruction.",
          },
          {
            name: "Dr. James Wilson",
            role: "Head of High School",
            bio: "Former university professor who leads our IB Diploma Programme and college counselling.",
          },
        ],
      },
      accreditations: {
        label: "Accreditations",
        title: "Internationally recognised excellence",
        items: [
          "International Baccalaureate Organization (IBO)",
          "Council of International Schools (CIS)",
          "Jordan Ministry of Education",
          "Middle States Association of Colleges and Schools",
          "Cambridge International Education",
        ],
      },
    },

    // ─── Programs ───
    programs: {
      hero: {
        label: "Academics",
        title: "Education designed for every stage",
        subtitle:
          "A complete learning journey from kindergarten through high school that balances academic knowledge, character building, and real-world skills.",
        breadcrumb: "Programs",
      },
      approach: {
        label: "Our Approach",
        title: "Six pillars our students grow on",
        pillars: [
          {
            title: "True bilingual fluency",
            text: "A balanced Arabic-English education that strengthens identity and prepares for the world.",
          },
          {
            title: "Critical thinking",
            text: "We teach students how to ask, analyse, and build solutions — not how to memorise.",
          },
          {
            title: "Character & ethics",
            text: "Character is the heart of our curriculum — not a separate subject, but a culture present in every class.",
          },
          {
            title: "Experiential learning",
            text: "Science labs, real-world projects, and field trips anchor knowledge in experience.",
          },
          {
            title: "Arts & athletics",
            text: "A healthy body and a refined taste — we raise the whole person.",
          },
          {
            title: "Community engagement",
            text: "Service initiatives are part of every academic year.",
          },
        ],
      },
      stages: {
        label: "Academic Stages",
        title: "Four stages, one journey",
        items: [
          {
            name: "Early Years",
            grades: "KG1 – KG2",
            ages: "Ages 4 – 6",
            description:
              "Play-based learning that builds curiosity, confidence, and a love of discovery in a safe, warm environment.",
            highlights: [
              "Social skill development",
              "Early reading in both languages",
              "Hands-on mathematics",
              "Daily arts and music",
            ],
          },
          {
            name: "Primary",
            grades: "Grades 1 – 5",
            ages: "Ages 6 – 11",
            description:
              "A strong foundation in both languages, mathematics, and science — layered with daily reading and early critical thinking.",
            highlights: [
              "Daily reading practice",
              "Hands-on science labs",
              "Classical Arabic language",
              "Physical education and the arts",
            ],
          },
          {
            name: "Middle School",
            grades: "Grades 6 – 8",
            ages: "Ages 11 – 14",
            description:
              "Deeper academic skills, early discovery of interests, and growing independence and leadership through real-world projects.",
            highlights: [
              "Research projects",
              "Academic and cultural clubs",
              "Optional third language",
              "One-to-one mentoring",
            ],
          },
          {
            name: "High School",
            grades: "Grades 9 – 12",
            ages: "Ages 14 – 18",
            description:
              "Full preparation for local and international universities, including the IB Programme with one-to-one academic guidance.",
            highlights: [
              "IB Diploma Programme",
              "Personal university counselling",
              "SAT and TOEFL preparation",
              "Independent research",
            ],
          },
        ],
      },
    },

    // ─── Admissions ───
    admissions: {
      hero: {
        label: "Admissions",
        title: "Begin your Al-Nakhla journey",
        subtitle:
          "Admissions for the 2026–2027 academic year are now open. We welcome you to experience our school from the inside before making your decision.",
        breadcrumb: "Admissions",
      },
      process: {
        label: "The Process",
        title: "Four simple steps",
        steps: [
          {
            title: "Apply online",
            description:
              "Fill out the initial application on our website — it takes less than ten minutes.",
          },
          {
            title: "Visit the campus",
            description:
              "A campus tour and meeting with our leadership lets you and your child meet your potential school.",
          },
          {
            title: "Student interview",
            description:
              "A simple, encouraging conversation that helps us get to know your child — and your child get to know us.",
          },
          {
            title: "Receive your offer",
            description:
              "Within one week, you'll receive your admission letter with the final enrolment details.",
          },
        ],
      },
      fees: {
        label: "Tuition & Fees",
        title: "Complete transparency",
        subtitle:
          "We believe families deserve to know everything upfront. No hidden fees, no surprises.",
        currency: "JOD",
        columns: {
          stage: "Stage",
          tuition: "Annual Tuition",
          registration: "Registration",
        },
        rows: [
          { stage: "Early Years (KG1-KG2)", tuition: "4,200", registration: "300" },
          { stage: "Primary (Grades 1-5)", tuition: "5,800", registration: "300" },
          { stage: "Middle School (6-8)", tuition: "6,500", registration: "400" },
          { stage: "High School (9-12)", tuition: "7,200", registration: "500" },
          { stage: "IB Diploma Programme", tuition: "8,000", registration: "500" },
        ],
        footnote:
          "Tuition includes books and classroom technology. Transportation and meals are billed separately.",
      },
      documents: {
        label: "Required Documents",
        title: "What you'll need to apply",
        items: [
          "Copy of birth certificate",
          "Copy of parent / guardian ID",
          "Previous school reports (last two years)",
          "Conduct report from current school",
          "Two recent passport photos",
          "Health and vaccination records",
          "Passport copy (for non-Jordanian nationals)",
        ],
      },
      cta: {
        title: "Ready for the next step?",
        description:
          "Book a campus visit, or start the online application directly.",
        primary: "Apply Now",
        secondary: "Book a Campus Tour",
      },
      apply: {
        hero: {
          label: "Admission Application",
          title: "Start your application",
          subtitle:
            "Three simple steps — should take no more than five minutes. You can save and return anytime.",
          breadcrumb: "Apply",
        },
        progress: {
          step: "Step",
          of: "of",
        },
        steps: {
          student: {
            title: "Student Details",
            subtitle: "Basic information about your child",
            fields: {
              firstName: "First name",
              lastName: "Last name",
              dateOfBirth: "Date of birth",
              gender: "Gender",
              nationality: "Nationality",
              currentSchool: "Current school",
              applyingFor: "Applying for grade",
            },
            genderOptions: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ],
            gradeOptions: [
              { value: "kg1", label: "KG1 — First Kindergarten" },
              { value: "kg2", label: "KG2 — Second Kindergarten" },
              { value: "g1", label: "Grade 1" },
              { value: "g2", label: "Grade 2" },
              { value: "g3", label: "Grade 3" },
              { value: "g4", label: "Grade 4" },
              { value: "g5", label: "Grade 5" },
              { value: "g6", label: "Grade 6" },
              { value: "g7", label: "Grade 7" },
              { value: "g8", label: "Grade 8" },
              { value: "g9", label: "Grade 9" },
              { value: "g10", label: "Grade 10" },
              { value: "g11", label: "Grade 11" },
              { value: "g12", label: "Grade 12" },
            ],
            next: "Next",
          },
          parent: {
            title: "Parent / Guardian Details",
            subtitle: "Basic contact information",
            fields: {
              parentFirstName: "Parent first name",
              parentLastName: "Parent last name",
              relationship: "Relationship",
              email: "Email",
              phone: "Phone",
              address: "Address",
              preferredContact: "Preferred contact method",
            },
            relationshipOptions: [
              { value: "father", label: "Father" },
              { value: "mother", label: "Mother" },
              { value: "guardian", label: "Guardian" },
            ],
            contactOptions: [
              { value: "phone", label: "Phone" },
              { value: "email", label: "Email" },
              { value: "whatsapp", label: "WhatsApp" },
            ],
            back: "Back",
            next: "Next",
          },
          review: {
            title: "Review your application",
            subtitle: "Please double-check everything before submitting",
            studentSection: "Student Details",
            parentSection: "Parent / Guardian Details",
            agreement:
              "I confirm that all information provided is accurate, and I agree for Al-Nakhla Academy to contact me to complete the admissions process.",
            back: "Back",
            submit: "Submit Application",
          },
        },
        success: {
          title: "Your application has been received",
          subtitle:
            "Thank you for your interest in Al-Nakhla International Academy. Our admissions team will contact you within 48 business hours.",
          reference: "Reference number:",
          nextStepsTitle: "Next steps",
          nextSteps: [
            "A confirmation email will arrive within minutes",
            "Our admissions team will call you within 48 business hours",
            "A campus visit and student interview will be scheduled",
            "You will receive your admission decision within a week of the interview",
          ],
          backHome: "Back to Home",
          viewAdmissions: "Admissions Info",
        },
      },
    },

    // ─── Faculty ───
    faculty: {
      hero: {
        label: "Faculty",
        title: "Meet our teachers",
        subtitle:
          "More than 65 faculty members from Jordan and around the world, teaching with passion and knowing every student by name.",
        breadcrumb: "Faculty",
      },
      stats: [
        { value: "65+", label: "Faculty Members" },
        { value: "12", label: "Nationalities" },
        { value: "72%", label: "Hold Advanced Degrees" },
      ],
      departments: {
        label: "Departments",
        all: "All",
        items: [
          { key: "admin", label: "Leadership" },
          { key: "stem", label: "Math & Sciences" },
          { key: "languages", label: "Languages" },
          { key: "humanities", label: "Humanities" },
          { key: "arts", label: "Arts & PE" },
          { key: "early", label: "Early Years" },
        ],
      },
      members: [
        {
          name: "Dr. Sarah Haddad",
          role: "Head of School",
          department: "admin",
          education: "PhD in Educational Leadership — Columbia University",
          experience: "15+ years",
        },
        {
          name: "Mr. Tariq Mansour",
          role: "Deputy Head — Academics",
          department: "admin",
          education: "MA in Curriculum Design — University of London",
          experience: "20+ years",
        },
        {
          name: "Dr. Reem Al-Zoubi",
          role: "Head of Mathematics",
          department: "stem",
          education: "PhD Applied Mathematics — University of Jordan",
          experience: "13+ years",
        },
        {
          name: "Mr. Fadi Al-Amoush",
          role: "Physics Teacher",
          department: "stem",
          education: "MSc Physics — University of Jordan",
          experience: "9 years",
        },
        {
          name: "Ms. Lama Al-Khatib",
          role: "Head of Arabic Language",
          department: "languages",
          education: "MA Arabic Literature — Yarmouk University",
          experience: "17 years",
        },
        {
          name: "Ms. Emily Carter",
          role: "English Language Lead",
          department: "languages",
          education: "M.Ed TESOL — University of Manchester",
          experience: "11 years",
        },
        {
          name: "Mr. Mahmoud Al-Saeedi",
          role: "History & Geography",
          department: "humanities",
          education: "MA Modern History — Damascus University",
          experience: "14 years",
        },
        {
          name: "Ms. Dima Al-Hourani",
          role: "Civics Teacher",
          department: "humanities",
          education: "BA Political Science — Yarmouk University",
          experience: "6 years",
        },
        {
          name: "Mr. Karim Badr",
          role: "Visual Arts Teacher",
          department: "arts",
          education: "MFA — Academy of Fine Arts",
          experience: "8 years",
        },
        {
          name: "Ms. Hanadi Abu Laban",
          role: "Music Director",
          department: "arts",
          education: "BA Music — National Conservatory",
          experience: "10 years",
        },
        {
          name: "Ms. Nadia Khouri",
          role: "Head of Early Years",
          department: "early",
          education: "MA Early Childhood — University of Jordan",
          experience: "12 years",
        },
        {
          name: "Ms. Rania Ubaidat",
          role: "Kindergarten Teacher",
          department: "early",
          education: "BA Early Childhood — Petra University",
          experience: "7 years",
        },
      ],
    },

    // ─── News ───
    news: {
      hero: {
        label: "News & Events",
        title: "Stories from our community",
        subtitle:
          "The latest from campus — from student achievements to family events.",
        breadcrumb: "News",
      },
      categories: {
        all: "All",
        achievements: "Achievements",
        events: "Events",
        academic: "Academic",
        community: "Community",
        sports: "Sports",
      },
      featured: {
        category: "Achievements",
        date: "March 15, 2026",
        title:
          "Al-Nakhla team takes first place at the National Robotics Championship",
        excerpt:
          "Six of our Grade 9 students have qualified for the regional championship in Dubai next month. This achievement caps a full year of hard work and dedication.",
        readMore: "Read full article",
      },
      items: [
        {
          category: "Events",
          date: "March 8, 2026",
          title: "World Cultures Week delights families and students",
          excerpt:
            "Al-Nakhla celebrated the diversity of its students through heritage performances, global cuisine, and research exhibitions.",
        },
        {
          category: "Academic",
          date: "March 2, 2026",
          title: "Launching the individual academic mentoring programme",
          excerpt:
            "The programme pairs every high school student with an academic mentor who walks with them through their university decisions.",
        },
        {
          category: "Sports",
          date: "February 24, 2026",
          title: "Basketball team crowned school-league champions",
          excerpt:
            "Our team capped a stellar season by lifting the league cup after a thrilling final against Al-Mashriq School.",
        },
        {
          category: "Community",
          date: "February 18, 2026",
          title: "Blood donation drive — Al-Nakhla gives back",
          excerpt:
            "Over 80 students and teachers joined our annual blood donation drive in partnership with the Jordan Blood Bank.",
        },
        {
          category: "Achievements",
          date: "February 5, 2026",
          title:
            "Three of our students achieve perfect scores in IGCSE exams",
          excerpt:
            "In a rare feat, three Grade 10 students scored 100% in mathematics and physics.",
        },
        {
          category: "Events",
          date: "January 28, 2026",
          title: "Annual science fair draws 200 visitors",
          excerpt:
            "Students presented 45 science projects at a fair attended by 200 parents and guests.",
        },
      ],
    },

    // ─── Gallery ───
    gallery: {
      hero: {
        label: "Gallery",
        title: "Life at Al-Nakhla",
        subtitle:
          "Moments from our days — inside classrooms, on the fields, and during events.",
        breadcrumb: "Gallery",
      },
      categories: {
        all: "All",
        campus: "Campus",
        academics: "Academics",
        sports: "Sports",
        arts: "Arts",
        events: "Events",
      },
      items: [
        { title: "Campus entrance", category: "campus" },
        { title: "Digital library", category: "campus" },
        { title: "Physics lab", category: "academics" },
        { title: "Reading class", category: "academics" },
        { title: "Football field", category: "sports" },
        { title: "Sports hall", category: "sports" },
        { title: "Art exhibition", category: "arts" },
        { title: "Music recital", category: "arts" },
        { title: "Graduation ceremony", category: "events" },
        { title: "Family day", category: "events" },
        { title: "Kindergarten classrooms", category: "campus" },
        { title: "Robotics lab", category: "academics" },
      ],
    },

    // ─── FAQ ───
    faq: {
      hero: {
        label: "FAQ",
        title: "What parents want to know",
        subtitle:
          "Clear answers to the questions we hear most from our families. Can't find yours? Reach out directly.",
        breadcrumb: "FAQ",
      },
      searchPlaceholder: "Search questions...",
      categories: [
        {
          key: "admissions",
          label: "Admissions",
          items: [
            {
              q: "When does enrollment for the next academic year start?",
              a: "Enrollment for the 2026-2027 academic year opens in January 2026. We recommend early registration to secure your spot, especially in grades with high demand.",
            },
            {
              q: "Is there an entrance exam?",
              a: "For kindergarten, we rely on a friendly interview with the child and parent. For primary grades and above, students take a short assessment that helps us understand their academic level and learning needs.",
            },
            {
              q: "What is the registration fee and when is it paid?",
              a: "Registration fees range from 300 to 500 JOD depending on the grade, paid upon acceptance. These fees are non-refundable after enrollment.",
            },
            {
              q: "Do you offer scholarships or financial aid?",
              a: "Yes, we offer a limited number of merit-based scholarships for academically excellent students, and sibling discounts for families enrolling more than one child. Scholarship details are announced annually.",
            },
          ],
        },
        {
          key: "academics",
          label: "Academics",
          items: [
            {
              q: "What curriculum do you follow?",
              a: "We follow an integrated curriculum combining the Jordanian national curriculum (per the Ministry of Education) with the International Baccalaureate (IB) programme at the high school level. This ensures students receive both nationally and internationally recognized credentials.",
            },
            {
              q: "What language is used for instruction?",
              a: "We are a bilingual school — Arabic and English are balanced. Science and math are taught in English, while Arabic, Islamic studies, and civics are in Arabic. The goal is native-level fluency in both languages.",
            },
            {
              q: "What is the class size?",
              a: "We cap classes at 20 students. This allows teachers to know each student by name and provide individual attention to those who need additional support.",
            },
            {
              q: "How do you support students with special needs?",
              a: "We have a dedicated learning support team that works with families to create individual education plans. We accept mild to moderate cases, with acceptance subject to individual assessment.",
            },
          ],
        },
        {
          key: "school-life",
          label: "School Life",
          items: [
            {
              q: "What are the school hours?",
              a: "Regular hours are Sunday to Thursday, 8:00 AM to 2:00 PM for lower grades, and until 3:00 PM for high school. Optional after-school activities run until 4:00 PM.",
            },
            {
              q: "Is there a school uniform?",
              a: "Yes, the uniform is mandatory for all grades. Families can purchase it from the school or approved sources. Uniform details and pricing are in the parent handbook.",
            },
            {
              q: "What meals are offered?",
              a: "The school cafeteria serves healthy breakfast and lunch prepared daily in a certified school kitchen. The weekly menu is published on the parent portal.",
            },
            {
              q: "Is school transportation available?",
              a: "Yes, we operate a fleet of buses covering most Amman neighborhoods. Each bus has live tracking, allowing parents to monitor their child's journey through the parent portal.",
            },
          ],
        },
        {
          key: "fees",
          label: "Fees & Payments",
          items: [
            {
              q: "What are the annual tuition fees?",
              a: "Tuition ranges from 4,200 JOD for kindergarten to 8,000 JOD for the IB programme. Fees include textbooks and educational technology.",
            },
            {
              q: "Can tuition be paid in installments?",
              a: "Yes, we offer a three-installment payment plan at the start of each term. Full upfront payment at the start of the year receives a 5% discount.",
            },
            {
              q: "What are the additional fees?",
              a: "Transportation, meals, and uniforms are billed separately. School trips and special activities may require small additional fees, announced to parents in advance.",
            },
          ],
        },
      ],
      noResults: "No questions match your search",
      contactCta: {
        title: "Didn't find your answer?",
        description:
          "Our team is ready to answer any question specific to your child's situation.",
        button: "Contact us directly",
      },
    },

    // ─── Contact ───
    contact: {
      hero: {
        label: "Get in Touch",
        title: "We'd love to hear from you",
        subtitle:
          "We're here to answer your questions — whether you're looking for admissions information or would like to arrange a campus visit.",
        breadcrumb: "Contact",
      },
      form: {
        label: "Write to Us",
        title: "Send a message",
        subtitle: "We'll reply within 24 business hours.",
        fields: {
          firstName: "First name",
          lastName: "Last name",
          email: "Email",
          phone: "Phone",
          subject: "Subject",
          message: "Your message",
        },
        placeholders: {
          firstName: "e.g. Ahmed",
          lastName: "e.g. Al-Hourani",
          email: "name@example.com",
          phone: "+962 7X XXX XXXX",
          message: "Write your message here...",
        },
        subjects: [
          { value: "general", label: "General Inquiry" },
          { value: "admissions", label: "Admissions" },
          { value: "tour", label: "Schedule a Tour" },
          { value: "careers", label: "Careers" },
          { value: "other", label: "Other" },
        ],
        submit: "Send message",
      },
      info: {
        address: {
          label: "Address",
          value: "Queen Rania Street, Abu Nseir, Amman 11947, Jordan",
        },
        phone: { label: "Phone", value: "+962 6 555 1234" },
        email: { label: "Email", value: "info@alnakhla.edu.jo" },
        hours: {
          label: "Office Hours",
          value: "Sun – Thu · 8 AM – 4 PM",
        },
      },
      map: {
        title: "How to reach us",
        subtitle:
          "We're in the heart of Abu Nseir, 10 minutes from downtown Amman.",
      },
    },
  },

  // ─────── Portals ───────
  portals: {
    common: {
      signOut: "Sign out",
      search: "Search students, classes, reports...",
      online: "Online",
      notifications: "Notifications",
      switchLanguageLabel: "العربية",
      roles: {
        admin: "Administrator",
        parent: "Parent",
        student: "Student",
        teacher: "Teacher",
      },
    },

    // Admin portal
    admin: {
      nav: [
        { label: "Overview", href: "/portal/admin" },
        { label: "Students", href: "/portal/admin/students" },
        { label: "Teachers", href: "/portal/admin/teachers" },
        { label: "Classes", href: "/portal/admin/classes" },
        { label: "Finance", href: "/portal/admin/finance" },
        { label: "Analytics", href: "/portal/admin/analytics" },
        { label: "Transportation", href: "/portal/admin/transport" },
        { label: "School Calendar", href: "/portal/admin/calendar" },
        { label: "Settings", href: "/portal/admin/settings" },
      ],
      dashboard: {
        welcome: "School Administration",
        subtitle: "Real-time overview of every school activity.",
        academicYear: "Academic Year 2025–2026",
        kpis: [
          { label: "Total Students", value: "854", trend: "+32 this month" },
          { label: "Total Teachers", value: "67", trend: "+2 this month" },
          { label: "Revenue", value: "485,000", trend: "+12% YoY" },
          { label: "Attendance Rate", value: "96%", trend: "Excellent" },
        ],
        distribution: {
          title: "Student Distribution by Stage",
          grades: [
            { label: "Early Years", value: "120" },
            { label: "Primary", value: "285" },
            { label: "Middle School", value: "210" },
            { label: "High School", value: "239" },
          ],
        },
        alerts: {
          title: "Alerts",
          items: [
            {
              title: "7 new admission applications",
              sub: "Waiting for review by the admissions team",
            },
            {
              title: "Late payments: 12 families",
              sub: "Needs follow-up from the finance office",
            },
            {
              title: "CIS accreditation renewal",
              sub: "Submission due in 3 weeks",
            },
          ],
        },
        enrollments: {
          title: "Recent Enrollments",
          headers: {
            name: "Name",
            grade: "Grade",
            date: "Date",
            status: "Status",
          },
          statusLabels: { active: "Active", pending: "Pending" },
          rows: [
            { name: "Leila Al-Hourani", grade: "Grade 3", date: "Apr 10", status: "active" },
            { name: "Yousef Al-Amoush", grade: "KG2", date: "Apr 09", status: "active" },
            { name: "Miriam Shukri", grade: "Grade 7", date: "Apr 08", status: "pending" },
            { name: "Omar Al-Tarawneh", grade: "Grade 10", date: "Apr 07", status: "pending" },
          ],
        },
      },
    },

    // Parent portal
    parent: {
      nav: [
        { label: "Dashboard", href: "/portal/parent" },
        { label: "Grades & Reports", href: "/portal/parent/grades" },
        { label: "Attendance", href: "/portal/parent/attendance" },
        { label: "Fees & Payments", href: "/portal/parent/fees" },
        { label: "Messages", href: "/portal/parent/messages" },
        { label: "Bus Tracking", href: "/portal/parent/bus" },
        { label: "AI Homework Helper", href: "/portal/parent/homework" },
        { label: "Documents", href: "/portal/parent/documents" },
        { label: "Settings", href: "/portal/parent/settings" },
      ],
      dashboard: {
        welcomeTemplate: "Welcome back, Rania",
        subtitle: "Your daughter's journey at a glance",
        childProfile: {
          viewing: "Viewing profile",
          name: "Leila Al-Hourani",
          grade: "Grade 6",
          status: "Good standing",
        },
        stats: [
          { label: "Overall Average", value: "92%" },
          { label: "Class Rank", value: "3 / 22" },
          { label: "Attendance Rate", value: "98%" },
          { label: "Subjects Passing", value: "8 / 8" },
        ],
        recentGrades: {
          title: "Recent Grades",
          subtitle: "Last five assessments",
          items: [
            { subject: "Mathematics", teacher: "Dr. Reem Al-Zoubi", date: "Apr 10", score: "95" },
            { subject: "Arabic Language", teacher: "Ms. Lama Al-Khatib", date: "Apr 08", score: "92" },
            { subject: "Science", teacher: "Mr. Fadi Al-Amoush", date: "Apr 06", score: "89" },
            { subject: "English", teacher: "Ms. Emily Carter", date: "Apr 04", score: "94" },
            { subject: "Civics", teacher: "Ms. Dima Al-Hourani", date: "Apr 02", score: "97" },
          ],
        },
        upcoming: {
          title: "Upcoming for Leila",
          items: [
            { title: "Maths exam — Chapter 6", date: "Sun Apr 13", time: "9:00 AM" },
            { title: "Arabic project due", date: "Tue Apr 15", time: "Before 2:00 PM" },
            { title: "Parent-teacher meeting", date: "Thu Apr 17", time: "4:00 – 6:00 PM" },
            { title: "Science field trip", date: "Sun Apr 20", time: "All day" },
          ],
        },
        quickActions: {
          title: "Quick actions",
          items: [
            { label: "Pay fees", href: "/portal/parent/fees" },
            { label: "Track bus", href: "/portal/parent/bus" },
            { label: "Messages", href: "/portal/parent/messages" },
            { label: "Homework helper", href: "/portal/parent/homework" },
          ],
        },
        feesDue: {
          title: "Fees payment due soon",
          amount: "2,100 JOD",
          dueDate: "Due by April 30, 2026",
          button: "Pay now",
        },
      },
      attendance: {
        hero: {
          title: "Attendance Record",
          subtitle: "Track your daughter's daily attendance",
          period: "This academic year",
        },
        overall: {
          title: "Overall Attendance",
          value: "96%",
          label: "Excellent standing",
          note: "Top 10% of her class",
        },
        summary: [
          { label: "Present", value: "168" },
          { label: "Absent", value: "5" },
          { label: "Late", value: "3" },
          { label: "Excused", value: "2" },
        ],
        calendar: {
          month: "April 2026",
          weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          legend: {
            present: "Present",
            absent: "Absent",
            late: "Late",
            excused: "Excused",
            holiday: "Holiday",
          },
        },
        recent: {
          title: "Recent notes",
          items: [
            { date: "Apr 03", reason: "Excused — medical appointment", status: "excused" },
            { date: "Mar 26", reason: "Late 15 minutes due to weather", status: "late" },
            { date: "Mar 14", reason: "Unexcused absence", status: "absent" },
          ],
        },
      },
      bus: {
        hero: {
          title: "Live Bus Tracking",
          subtitle: "Bus 07 · Afternoon Route",
          note: "Location refreshed every 10 seconds",
        },
        arrival: {
          label: "Estimated arrival",
          minutes: "In 12 minutes",
          location: "Bus is currently at: Mecca Street intersection",
        },
        details: {
          title: "Bus Details",
          items: [
            { label: "Plate", value: "50080 — Green" },
            { label: "Model", value: "Mercedes-Benz 2022" },
            { label: "Capacity", value: "45 seats" },
            { label: "Current speed", value: "35 km/h" },
          ],
        },
        driver: {
          title: "Driver",
          name: "Mr. Khaled Al-Zubaidi",
          rating: "4.9 / 5 rating",
          experience: "15 years experience",
          callLabel: "Call driver",
        },
        timeline: {
          title: "Route",
          stops: [
            { name: "School", time: "2:30 PM", status: "done" },
            { name: "Sweifieh intersection", time: "2:45 PM", status: "done" },
            { name: "Prince Rashid 8th Circle", time: "2:55 PM", status: "done" },
            { name: "Mecca Street intersection", time: "3:05 PM", status: "current" },
            { name: "Your home", time: "3:17 PM", status: "upcoming" },
          ],
        },
      },
      fees: {
        hero: {
          title: "Fees & Payments",
          subtitle: "A complete view of your financial status this year",
        },
        overview: [
          { label: "Total annual fees", value: "8,400 JOD" },
          { label: "Paid so far", value: "6,300 JOD" },
          { label: "Outstanding", value: "2,100 JOD" },
          { label: "Completion", value: "75%" },
        ],
        dueNotice: {
          title: "Payment due",
          amount: "2,100 JOD",
          dueDate: "By April 30, 2026",
          button: "Pay now",
        },
        methods: {
          title: "Payment methods",
          items: ["Visa / Mastercard", "Bank transfer", "Apple Pay", "Cash at accounts office"],
        },
        history: {
          title: "Invoice history",
          headers: {
            invoice: "Invoice #",
            period: "Period",
            amount: "Amount",
            date: "Payment date",
            status: "Status",
          },
          rows: [
            { invoice: "INV-2026-004", period: "Term 3", amount: "2,100 JOD", date: "—", status: "pending" },
            { invoice: "INV-2026-003", period: "Term 2", amount: "2,100 JOD", date: "Jan 15", status: "paid" },
            { invoice: "INV-2026-002", period: "Term 1", amount: "2,100 JOD", date: "Sep 01", status: "paid" },
            { invoice: "INV-2026-001", period: "Registration", amount: "400 JOD", date: "Aug 20", status: "paid" },
          ],
          statusLabels: { paid: "Paid", pending: "Due" },
        },
      },
      grades: {
        hero: {
          title: "Grades & Reports",
          subtitle: "Leila's academic performance",
        },
        termsLabel: "Term",
        terms: ["Term 1", "Term 2", "Term 3"],
        summary: [
          { label: "Overall average", value: "92%" },
          { label: "Class rank", value: "3 / 22" },
          { label: "Top subject", value: "Mathematics — 95" },
          { label: "Subjects passing", value: "8 / 8" },
        ],
        subjects: [
          { subject: "Mathematics", teacher: "Dr. Reem Al-Zoubi", final: "95", tests: "96", homework: "94", participation: "95" },
          { subject: "Arabic Language", teacher: "Ms. Lama Al-Khatib", final: "92", tests: "90", homework: "94", participation: "93" },
          { subject: "Science", teacher: "Mr. Fadi Al-Amoush", final: "89", tests: "88", homework: "91", participation: "89" },
          { subject: "English", teacher: "Ms. Emily Carter", final: "94", tests: "95", homework: "93", participation: "95" },
          { subject: "Civics", teacher: "Ms. Dima Al-Hourani", final: "97", tests: "96", homework: "98", participation: "99" },
          { subject: "History", teacher: "Mr. Mahmoud Al-Saeedi", final: "90", tests: "89", homework: "92", participation: "90" },
          { subject: "Arts", teacher: "Mr. Karim Badr", final: "93", tests: "—", homework: "93", participation: "95" },
          { subject: "Physical Education", teacher: "Ms. Hanadi Abu Laban", final: "95", tests: "—", homework: "—", participation: "95" },
        ],
        columns: {
          subject: "Subject",
          teacher: "Teacher",
          final: "Final",
          tests: "Tests",
          homework: "Homework",
          participation: "Participation",
        },
      },
      homework: {
        hero: {
          title: "AI Homework Helper",
          subtitle: "A learning companion powered by AI",
          description:
            "Our AI guides your child toward the answer in a pedagogical way — it doesn't give the answer directly, it teaches her how to think.",
        },
        online: "Helper online",
        topicsTitle: "Pick a subject to start",
        topics: [
          "Mathematics",
          "Arabic",
          "Science",
          "English",
          "History",
          "Geography",
          "Islamic Studies",
        ],
        chat: {
          student: "Student: How do I solve 3x + 5 = 20?",
          ai:
            "Great question! I don't want to solve it for you directly — I want us to reach the answer together. First: can you tell me what we're trying to find? What does it mean to find the value of x?",
        },
        input: {
          placeholder: "Type your question...",
          upload: "Upload image",
          send: "Send",
        },
        disclaimer:
          "The Al-Nakhla learning helper walks with your child through the learning journey — it never just hands over answers.",
      },
      messages: {
        hero: {
          title: "Messages",
        },
        searchPlaceholder: "Search conversations...",
        conversations: [
          {
            name: "Dr. Reem Al-Zoubi",
            role: "Mathematics Teacher",
            lastMessage: "Your daughter has made remarkable progress on equations",
            time: "12 min ago",
            unread: 2,
          },
          {
            name: "Ms. Lama Al-Khatib",
            role: "Arabic Language Teacher",
            lastMessage: "I'll send the extra reading list",
            time: "1 hour ago",
            unread: 0,
          },
          {
            name: "Administration",
            role: "Student Affairs",
            lastMessage: "Reminder: parent-teacher meeting on Thursday",
            time: "Yesterday",
            unread: 1,
          },
          {
            name: "Mr. Fadi Al-Amoush",
            role: "Science Teacher",
            lastMessage: "Leila was brilliant in today's experiment",
            time: "Yesterday",
            unread: 0,
          },
          {
            name: "Accounts Office",
            role: "Finance",
            lastMessage: "Receipt for the latest payment is attached",
            time: "2 days ago",
            unread: 0,
          },
        ],
        activeHeader: {
          name: "Dr. Reem Al-Zoubi",
          role: "Mathematics Teacher — Grade 6",
          online: "Online now",
        },
        activeMessages: [
          {
            from: "teacher",
            text: "Good afternoon, Ms. Rania. I wanted to share Leila's progress on the equations unit.",
            time: "2:15 PM",
          },
          {
            from: "parent",
            text: "Thank you so much. How is she doing?",
            time: "2:20 PM",
          },
          {
            from: "teacher",
            text: "Her last two assessments were excellent, and more importantly she's asking deep analytical questions now.",
            time: "2:21 PM",
          },
          {
            from: "parent",
            text: "That's wonderful to hear. Thank you for your attention.",
            time: "2:25 PM",
          },
        ],
        inputPlaceholder: "Type your message...",
      },
    },

    // Teacher portal
    teacher: {
      nav: [
        { label: "Dashboard", href: "/portal/teacher" },
        { label: "My Classes", href: "/portal/teacher/classes" },
        { label: "Gradebook", href: "/portal/teacher/gradebook" },
        { label: "Smart Attendance", href: "/portal/teacher/attendance" },
        { label: "Assignments", href: "/portal/teacher/assignments" },
        { label: "Schedule", href: "/portal/teacher/schedule" },
        { label: "Messages", href: "/portal/teacher/messages" },
        { label: "Analytics", href: "/portal/teacher/analytics" },
        { label: "Settings", href: "/portal/teacher/settings" },
      ],
      dashboard: {
        welcome: "Good morning, Dr. Reem",
        subtitle: "You have 4 classes scheduled today",
        today: "Tuesday, April 11, 2026",
        stats: [
          { label: "Total students", value: "120" },
          { label: "Classes today", value: "4" },
          { label: "Assignments to grade", value: "8" },
          { label: "New messages", value: "5" },
        ],
        classes: {
          title: "Today's Classes",
          viewSchedule: "View full schedule",
          items: [
            { time: "8:00 – 8:45", subject: "Mathematics", grade: "Grade 6 — Section A", room: "Room 203" },
            { time: "9:00 – 9:45", subject: "Mathematics", grade: "Grade 6 — Section B", room: "Room 203" },
            { time: "11:15 – 12:00", subject: "Algebra", grade: "Grade 8 — Section A", room: "Room 301" },
            { time: "1:30 – 2:15", subject: "Numeracy", grade: "Grade 5 — Section C", room: "Room 105" },
          ],
        },
        activities: {
          title: "Recent Activity",
          items: [
            { text: "You graded 23 mathematics homework submissions", time: "30 min ago" },
            { text: "Leila Al-Hourani replied to your message", time: "2 hours ago" },
            { text: "Grades for Chapter 6 test were published", time: "Yesterday" },
            { text: "You added a new Algebra project", time: "2 days ago" },
          ],
        },
        actions: {
          title: "Quick actions",
          items: [
            { label: "Smart attendance", href: "/portal/teacher/attendance" },
            { label: "Gradebook", href: "/portal/teacher/gradebook" },
            { label: "New assignment", href: "/portal/teacher/assignments" },
            { label: "Student list", href: "/portal/teacher/classes" },
          ],
        },
      },
      attendance: {
        hero: {
          label: "AI-powered",
          title: "Smart Attendance",
          subtitle: "Grade 10 — Section A · Mathematics",
          description:
            "Point the camera at the classroom and our AI will automatically recognise student faces and mark attendance.",
        },
        scanButton: "Start smart scan",
        rescanButton: "Scan again",
        confirmButton: "Confirm & save",
        detectionTitle: "Detection results",
        summary: [
          { label: "Present", value: "21" },
          { label: "Absent", value: "3" },
          { label: "Total enrolled", value: "24" },
        ],
        students: [
          { name: "Leila Al-Hourani", status: "present" },
          { name: "Yousef Al-Amoush", status: "present" },
          { name: "Miriam Shukri", status: "present" },
          { name: "Omar Al-Tarawneh", status: "absent" },
          { name: "Zeina Al-Qudah", status: "present" },
          { name: "Mohammad Al-Saeedi", status: "present" },
          { name: "Nour Al-Hourani", status: "absent" },
          { name: "Samer Al-Momani", status: "present" },
        ],
        statusLabels: {
          present: "Detected",
          absent: "Not detected",
        },
      },
      gradebook: {
        hero: {
          title: "Gradebook",
          subtitle: "Manage class and term grades",
        },
        filters: "Filters",
        export: "Export",
        newGrade: "New grade",
        classTabs: [
          { label: "Grade 6 — A · Mathematics" },
          { label: "Grade 6 — B · Mathematics" },
          { label: "Grade 8 — A · Algebra" },
          { label: "Grade 5 — C · Numeracy" },
        ],
        headers: {
          student: "Student",
          test1: "Test 1",
          test2: "Test 2",
          homework: "Homework",
          project: "Project",
          final: "Final",
          grade: "Grade",
        },
        rows: [
          { student: "Leila Al-Hourani", test1: "95", test2: "96", homework: "94", project: "97", final: "95.5", grade: "A+" },
          { student: "Yousef Al-Amoush", test1: "88", test2: "90", homework: "89", project: "91", final: "89.5", grade: "A" },
          { student: "Miriam Shukri", test1: "92", test2: "89", homework: "93", project: "94", final: "92", grade: "A+" },
          { student: "Omar Al-Tarawneh", test1: "78", test2: "82", homework: "80", project: "85", final: "81.2", grade: "B" },
          { student: "Zeina Al-Qudah", test1: "90", test2: "93", homework: "91", project: "95", final: "92.2", grade: "A+" },
          { student: "Mohammad Al-Saeedi", test1: "85", test2: "87", homework: "86", project: "88", final: "86.5", grade: "A" },
          { student: "Nour Al-Hourani", test1: "94", test2: "92", homework: "93", project: "96", final: "93.7", grade: "A+" },
          { student: "Samer Al-Momani", test1: "80", test2: "84", homework: "82", project: "86", final: "83", grade: "A" },
        ],
      },
    },

    // Student portal
    student: {
      nav: [
        { label: "Dashboard", href: "/portal/student" },
        { label: "Homework", href: "/portal/student/homework" },
        { label: "My Grades", href: "/portal/student/grades" },
        { label: "Schedule", href: "/portal/student/schedule" },
        { label: "AI Study Buddy", href: "/portal/student/study-buddy" },
        { label: "Achievements", href: "/portal/student/achievements" },
        { label: "Library", href: "/portal/student/library" },
        { label: "Messages", href: "/portal/student/messages" },
        { label: "Settings", href: "/portal/student/settings" },
      ],
      dashboard: {
        welcome: "Hi Leila 👋",
        subtitle: "New day, new chance",
        today: "Tuesday, April 11, 2026",
        stats: [
          { label: "Overall average", value: "92%" },
          { label: "Achievements", value: "3 / 12" },
          { label: "Daily streak", value: "12 days" },
          { label: "Class rank", value: "3 / 22" },
        ],
        schedule: {
          title: "Today's schedule",
          subtitle: "5 classes today",
          nextUp: "Up next: Science",
          items: [
            { time: "8:00", subject: "Mathematics", room: "Room 203", teacher: "Dr. Reem Al-Zoubi" },
            { time: "9:00", subject: "Arabic Language", room: "Room 110", teacher: "Ms. Lama Al-Khatib" },
            { time: "10:00", subject: "Science", room: "Lab 1", teacher: "Mr. Fadi Al-Amoush" },
            { time: "11:00", subject: "English", room: "Room 210", teacher: "Ms. Emily Carter" },
            { time: "1:30", subject: "Arts", room: "Art Studio", teacher: "Mr. Karim Badr" },
          ],
        },
        achievements: {
          title: "My achievements",
          subtitle: "3 of 12",
          items: [
            { title: "Reading streak", description: "You read 10 books this term" },
            { title: "Math excellence", description: "Perfect score on the algebra test" },
            { title: "Class leader", description: "Elected class representative" },
          ],
        },
        homework: {
          title: "Homework due",
          items: [
            { subject: "Mathematics", task: "Chapter 6 exercises", due: "Tomorrow" },
            { subject: "Arabic Language", task: "Descriptive essay", due: "Wednesday" },
            { subject: "English", task: "Reading Chapter 4", due: "Thursday" },
            { subject: "Science", task: "Chemistry lab report", due: "Next Sunday" },
          ],
        },
      },
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
