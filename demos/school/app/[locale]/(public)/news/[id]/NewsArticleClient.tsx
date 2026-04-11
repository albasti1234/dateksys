"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const newsImages = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80",
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1600&q=80",
  "https://images.unsplash.com/photo-1569733078131-bcbce6e22c81?w=1600&q=80",
];

const articleBodiesAr: string[] = [
  `في إنجاز يُضاف إلى سلسلة إنجازات النخلة المتتالية، حصد فريقنا للروبوتات المركز الأول في بطولة الروبوتات الوطنية التي أُقيمت الشهر الماضي في عمّان، بمشاركة أكثر من ٤٥ مدرسة من مختلف محافظات المملكة.\n\nالفريق المكوّن من ستة من طلبة الصف التاسع، بقيادة المعلّم فادي العموش، عمل على تصميم وبرمجة روبوت ذكيّ قادر على أداء مهام متعدّدة في زمن قياسي. التحدّي كان تطوير نظام آلي يستطيع الإبحار في مسار مُعقّد، جمع عناصر مُحدّدة، وإيصالها لمحطّات مُعيّنة خلال أقل من ثلاث دقائق.\n\n"ما يميّز هذا الفريق ليس فقط الذكاء التقني، بل روح العمل الجماعي والمثابرة،" قالت د. سارة حدّاد، المديرة العامة. "هؤلاء الطلبة أمضوا ثلاثة أشهر من التدريب اليومي، بعد ساعات الدوام، وأثبتوا أن التعليم الحقيقي يتجاوز جدران الفصول."\n\nبالتفوّق في هذه البطولة، تأهّل الفريق للمشاركة في البطولة الإقليمية التي ستُقام في دبي الشهر المقبل، وسط توقّعات كبيرة من المجتمع التعليمي الأردني.`,
  `على مدى أسبوع كامل، تحوّل الحرم المدرسي إلى معرض عالمي نابض بألوان الحضارات. أسبوع الثقافات العالمية — حدثنا السنوي الذي ينتظره الجميع — احتفى هذا العام بثراء التنوّع في أكاديمية النخلة، حيث يُمثّل طلبتنا أكثر من ١٥ جنسية مختلفة.\n\nكل صف اختار دولة واحدة ليُعدّ عنها بحثاً موسّعاً، ويُصمّم ركناً يعرض تراثها الفني، أطباقها التقليدية، أزيائها الشعبية، وقصص شعبها. من الصفوف الابتدائية التي قدّمت أغاني فولكلورية، إلى طلبة الثانوية الذين نظّموا ندوات حول الأدب العالمي.\n\nالنقطة الأبرز كانت الحفل الختامي الذي أُقيم في مسرح المدرسة، حيث أدّى أكثر من ١٢٠ طالباً عروضاً تراثية من دول مختلفة، وُزّعت على الحضور بطاقات "جواز سفر ثقافي" تُختم في كل ركن زاره الزائر.`,
  `في خطوة تُعزّز من تجربتنا التعليمية، أطلقت الأكاديمية رسمياً برنامج الإرشاد الأكاديمي الفردي لطلبة المرحلة الثانوية. البرنامج يُخصّص لكل طالب مُرشداً أكاديمياً يُرافقه طوال السنوات الأربع، من الصف التاسع حتى التخرّج.\n\nمهمّة المُرشد لا تقتصر على متابعة العلامات — بل تشمل اختيار التخصّص الجامعي، التحضير لامتحانات القبول الدولية مثل SAT و TOEFL، كتابة رسائل الـ Personal Statement، وحتى إدارة ضغط الدراسة في المرحلة الحرجة.\n\n"كل طالب يحتاج صوتاً يرشده بعيداً عن التقييم والامتحانات،" يقول د. جيمس ويلسون، رئيس المرحلة الثانوية. "المُرشد ليس معلّم مادة — بل صديق أكاديمي يفهم أحلام الطالب ويساعده على تحقيقها."`,
  `بعد موسم رياضي مليء بالتحدّيات، توّج فريق كرة السلة للبنين مسيرته بإنجاز كبير: الفوز بكأس الدوري المدرسي بعد مباراة نهائية مُثيرة أمام فريق مدرسة المشرق الدولية، بنتيجة ٥٨-٥٢ في الوقت الإضافي.\n\nالفريق بقيادة المدرّب يوسف مروف، أنهى الموسم بسجلّ ١٢ فوزاً ومباراتين خسارة. اللاعب المحوري كان الطالب كريم الحوراني من الصف الحادي عشر، الذي أُختير أفضل لاعب في البطولة، بمعدّل ١٨ نقطة و٧ متابعات في كل مباراة.\n\nاحتفلت العائلة المدرسية بالإنجاز في طابور الصباح التالي، حيث رفع اللاعبون الكأس أمام زملائهم، في مشهد عكس قيم العمل الجماعي والانتماء التي نسعى لغرسها.`,
  `في بادرة تُجسّد روح المسؤولية المجتمعية التي نسعى لغرسها، شارك أكثر من ٨٠ طالباً ومعلّماً في حملة التبرّع بالدم السنوية التي نظّمتها المدرسة بالتعاون مع بنك الدم الأردني.\n\nالحملة التي امتدّت على مدار يومين، استقبلت أيضاً عدداً من أولياء الأمور الذين رغبوا في المشاركة. الهدف لم يكن فقط جمع أكبر عدد ممكن من التبرّعات — بل تعليم الطلبة قيمة العطاء، وتعريفهم بأهمية بنك الدم في دعم الحالات الطارئة.\n\n"أكثر ما أسعدني،" قالت إحدى طالبات الصف الحادي عشر، "أنّنا لم نتبرّع فقط، بل عرفنا كيف تُستخدم تبرّعاتنا، ومن هم المرضى الذين سيستفيدون منها. هذا ما يُحوّل العطاء من فعل عشوائي إلى التزام واعٍ."`,
  `في إنجاز نادر وُصف بالاستثنائي، حقّق ثلاثة من طلبة الصف العاشر علامات كاملة في امتحانات IGCSE الدولية في مادّتي الرياضيات والفيزياء.\n\nالطلبة الثلاثة — ليلى الحوراني، يوسف العموش، ومحمد السعيدي — خضعوا لهذه الامتحانات كجزء من برنامج التحضير المبكّر لشهادة IGCSE الذي تُتيحه الأكاديمية لطلبتها المتفوّقين في الرياضيات والعلوم.\n\nالإنجاز لفت أنظار المجتمع التعليمي في الأردن، وحظي بتغطية إعلامية واسعة. الأهل الثلاثة عبّروا عن امتنانهم لفريق التدريس، وخاصّة د. ريم الزعبي وأ. فادي العموش اللذين أشرفا على تدريب الطلبة.`,
  `على مدار يومين، استقبل الحرم المدرسي أكثر من ٢٠٠ زائر من أولياء الأمور وضيوف من المجتمع التعليمي، في معرض العلوم السنوي الذي عرض فيه الطلبة ٤٥ مشروعاً علمياً مُبتكراً.\n\nالمشاريع تراوحت من تجارب فيزيائية بسيطة لطلبة الصفوف الابتدائية، إلى أبحاث مُعمّقة في الكيمياء الحيوية وعلم الأعصاب قدّمها طلبة الثانوية في برنامج البكالوريا الدولية. من أبرز المشاريع: نظام لتنقية المياه بتقنية الطاقة الشمسية، روبوت تعليمي للأطفال ذوي التوحّد، ونموذج لمدينة ذكيّة مستدامة.\n\nالزوّار قيّموا المشاريع عبر بطاقات إلكترونية، واختاروا الفائز بجائزة "اختيار الجمهور" — هذا العام ذهبت للطالبة زينة القضاة عن مشروعها في استخدام الذكاء الاصطناعي للكشف المبكّر عن الأمراض الجلدية.`,
];

const articleBodiesEn: string[] = [
  `In another milestone added to Al-Nakhla's growing list of achievements, our robotics team took first place at the National Robotics Championship held last month in Amman, competing against over 45 schools from across the Kingdom.\n\nThe six-student team, led by teacher Mr. Fadi Al-Amoush, designed and programmed an intelligent robot capable of performing multiple tasks in record time. The challenge involved navigating a complex course, collecting specific elements, and delivering them to designated stations in under three minutes.\n\n"What sets this team apart isn't just their technical intelligence — it's their teamwork and perseverance," said Dr. Sarah Haddad, Head of School. "These students spent three months training every day after class, proving that real learning happens beyond the classroom walls."\n\nBy excelling in this championship, the team has qualified for the regional championship to be held in Dubai next month, carrying with them high expectations from the Jordanian educational community.`,
  `For a full week, our campus transformed into a vibrant global exhibition. World Cultures Week — our much-anticipated annual event — celebrated the rich diversity of Al-Nakhla, where our students represent more than 15 different nationalities.\n\nEach class chose one country to research in depth, designing corners showcasing traditional art, cuisine, folk costumes, and stories. From primary school classes performing folk songs, to high school students hosting discussions on world literature.\n\nThe highlight was the closing ceremony in the school theatre, where over 120 students performed heritage pieces from different countries, while attendees received "Cultural Passports" stamped at each corner they visited.`,
  `In a step that strengthens our educational experience, the Academy has officially launched the individual academic mentoring programme for high school students. The programme assigns each student an academic mentor who accompanies them throughout their four years, from Grade 9 to graduation.\n\nThe mentor's role goes beyond tracking grades — it includes choosing a university major, preparing for international admission tests like SAT and TOEFL, writing Personal Statements, and even managing the pressure of studying during this critical period.\n\n"Every student needs a voice guiding them beyond grades and exams," says Dr. James Wilson, Head of High School. "The mentor isn't a subject teacher — they're an academic friend who understands the student's dreams and helps make them real."`,
  `After a challenge-filled season, our boys' basketball team capped their run with a major achievement: winning the school league cup after a thrilling final against Al-Mashriq International School, 58-52 in overtime.\n\nThe team, coached by Mr. Yousef Marouf, finished the season with a 12-2 record. The key player was Grade 11 student Karim Al-Hourani, named MVP of the tournament, averaging 18 points and 7 rebounds per game.\n\nThe school community celebrated the achievement at the following morning's assembly, where the players raised the cup before their classmates — a scene reflecting the teamwork and belonging values we strive to instill.`,
  `In an initiative embodying the community responsibility we strive to cultivate, over 80 students and teachers joined the annual blood donation campaign organised by the school in partnership with the Jordan Blood Bank.\n\nThe two-day campaign also welcomed a number of parents who wished to participate. The goal wasn't simply to collect the largest possible number of donations — but to teach students the value of giving, and to familiarise them with the importance of the blood bank in supporting emergency cases.\n\n"What made me happiest," said one Grade 11 student, "is that we didn't just donate — we learned how our donations are used, and who the patients are who will benefit. That's what transforms giving from a random act into a conscious commitment."`,
  `In a rare achievement described as exceptional, three Grade 10 students achieved perfect scores in the International IGCSE exams in Mathematics and Physics.\n\nThe three students — Leila Al-Hourani, Yousef Al-Amoush, and Mohammad Al-Saeedi — took these exams as part of the early IGCSE certification programme the Academy offers to students who excel in mathematics and sciences.\n\nThe achievement has drawn attention from the educational community in Jordan and received wide media coverage. The three parents expressed their gratitude to the teaching team, particularly Dr. Reem Al-Zoubi and Mr. Fadi Al-Amoush who oversaw the students' training.`,
  `Over two days, our campus welcomed over 200 visitors, including parents and guests from the educational community, for the annual science fair where students presented 45 innovative science projects.\n\nThe projects ranged from simple physics experiments by elementary students, to deep research in biochemistry and neuroscience presented by high school students in the IB Diploma Programme. Notable projects included: a solar-powered water purification system, an educational robot for children with autism, and a model for a sustainable smart city.\n\nVisitors rated the projects via electronic cards and chose the winner of the "People's Choice" award — this year going to student Zeina Al-Qudah for her project using AI for early detection of skin diseases.`,
];

export default function NewsArticleClient({
  locale,
  articleIndex,
}: {
  locale: Locale;
  articleIndex: number;
}) {
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  const featured = dict.pages.news.featured;
  const item =
    articleIndex === 0 ? featured : dict.pages.news.items[articleIndex - 1];

  if (!item) {
    return (
      <div className="py-32 text-center">
        <p className="text-[var(--color-ink-soft)]">
          {locale === "ar" ? "المقال غير موجود" : "Article not found"}
        </p>
        <Link
          href={`/${locale}/news`}
          className="mt-6 btn-outline inline-flex"
        >
          {locale === "ar" ? "العودة للأخبار" : "Back to News"}
        </Link>
      </div>
    );
  }

  const bodies = locale === "ar" ? articleBodiesAr : articleBodiesEn;
  const body = bodies[articleIndex] || "";
  const image = newsImages[articleIndex];

  const titleClass = isRTL
    ? "font-arabic-display text-3xl md:text-5xl font-bold text-[var(--color-navy)] leading-[1.4] mb-6"
    : "font-serif text-3xl md:text-5xl font-bold text-[var(--color-navy)] leading-tight mb-6";
  const bodyClass = isRTL
    ? "font-arabic text-lg text-[var(--color-ink)] leading-[2] whitespace-pre-line"
    : "text-lg text-[var(--color-ink)] leading-relaxed whitespace-pre-line";

  const related = [0, 1, 2, 3, 4, 5, 6]
    .filter((i) => i !== articleIndex)
    .slice(0, 3);

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={item.category}
        title={item.title}
        breadcrumbs={[
          { label: dict.pages.news.hero.breadcrumb, href: "/news" },
        ]}
        image={image}
      />

      <article className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10 pb-10 border-b border-[var(--color-border)] flex-wrap"
          >
            <div className="flex items-center gap-2 text-[var(--color-ink-soft)] text-sm">
              <Calendar className="w-4 h-4 text-[var(--color-gold)]" />
              {item.date}
            </div>
            <div className="h-4 w-px bg-[var(--color-border)]" />
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider bg-[var(--color-gold)] text-white">
              {item.category}
            </span>
            <div className="ms-auto flex items-center gap-3 text-[var(--color-ink-soft)]">
              <Share2 className="w-4 h-4" />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="hover:text-[var(--color-gold)]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="hover:text-[var(--color-gold)]"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="hover:text-[var(--color-gold)]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className={titleClass}>{item.title}</h1>
            <p
              className={`text-xl text-[var(--color-ink-soft)] mb-10 ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {item.excerpt}
            </p>
            <div className={bodyClass}>{body}</div>
          </motion.div>

          <div className="mt-16 pt-10 border-t border-[var(--color-border)]">
            <Link
              href={`/${locale}/news`}
              className="btn-outline inline-flex group"
            >
              <ArrowLeft
                className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${
                  isRTL ? "rotate-180" : ""
                }`}
              />
              {locale === "ar" ? "كل الأخبار" : "All News"}
            </Link>
          </div>
        </div>
      </article>

      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h2
            className={`text-center mb-12 ${
              isRTL
                ? "font-arabic-display text-3xl font-bold text-[var(--color-navy)]"
                : "font-serif text-3xl font-bold text-[var(--color-navy)]"
            }`}
          >
            {locale === "ar" ? "مقالات ذات صلة" : "Related Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((idx) => {
              const rel =
                idx === 0 ? featured : dict.pages.news.items[idx - 1];
              return (
                <Link
                  key={idx}
                  href={`/${locale}/news/${idx + 1}`}
                  className="academic-card overflow-hidden group block"
                >
                  <div
                    className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${newsImages[idx]}')` }}
                  />
                  <div className="p-6">
                    <div className="text-xs text-[var(--color-gold)] font-bold mb-2">
                      {rel.category}
                    </div>
                    <h3
                      className={`text-lg font-bold text-[var(--color-navy)] ${
                        isRTL
                          ? "font-arabic-display leading-[1.6]"
                          : "font-serif leading-snug"
                      }`}
                    >
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
