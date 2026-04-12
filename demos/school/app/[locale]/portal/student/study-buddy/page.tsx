"use client";

import { use, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, RotateCcw, User } from "lucide-react";
import type { Locale } from "@/i18n/config";

type TopicKey =
  | "math"
  | "arabic"
  | "science"
  | "english"
  | "civics"
  | "history"
  | "arts"
  | "general";

const responsesAr: Record<TopicKey, string[]> = {
  math: [
    `سؤال ممتاز يا ليلى! الرياضيات مش عن حفظ الحل — هي عن فهم الخطوات. قبل ما نحلّ هذه المسألة معاً:\n\n١. شو المعطيات اللي عندك؟\n٢. شو المطلوب بالضبط؟\n٣. هل تذكرين قاعدة شبيهة؟\n\nفكّري فيها، ومن ثم نكمل خطوة بخطوة.`,
    `جيّد! هيّا نفكّر بصوت عال معاً. في الرياضيات، دائماً نبدأ بالسؤال: "ما الذي أعرفه؟" و"ما الذي يُطلب منّي؟"\n\nخذي لحظة واكتبي إجابتك. بعدها، فكّري: هل في هذه المسألة جمع؟ طرح؟ ضرب؟ قسمة؟\n\nلا تخافي من الخطأ — الخطأ جزء من التعلّم!`,
    `رائع، وصلتِ للخطوة التالية! الآن لنتحقّق: إذا عوّضتِ القيمة في المعادلة الأصلية، هل تعطي نتيجة صحيحة؟\n\nهذه أهم عادة في الرياضيات: **التحقّق**. جرّبي وأخبريني بما وجدتِه.`,
    `ممتاز! أنتِ تتقدمين بشكل رائع. الآن فكّري بهذا السؤال: هل يمكن حلّ هذه المسألة بطريقة أخرى؟ أحياناً الطريقة الثانية أسرع وأسهل.\n\nتذكّري: الرياضيات مثل اللغز — كل قطعة تقودك للقطعة التالية.`,
  ],
  arabic: [
    `ما شاء الله، سؤال جميل في اللغة العربية! لغتنا غنيّة وكل قاعدة فيها لها حكمة. دعينا نفكّر معاً:\n\n- هل الكلمة اسم أم فعل أم حرف؟\n- ما وظيفتها في الجملة؟\n- هل تذكرين قاعدة مشابهة؟\n\nإذا حددنا هذه الأمور، الجواب يصبح واضحاً.`,
    `بارك الله فيكِ على الاهتمام. اللغة العربية تُفهم بالقراءة والتأمّل.\n\nعندما تواجهين جملة صعبة، ابدئي دائماً من الفعل، ثم الفاعل، ثم المفعول به.\n\nاقرئي الجملة ببطء وأخبريني: ما هو فعلها؟`,
    `أحسنتِ! لاحظي أن كلمات كثيرة مشتقّة من جذر ثلاثي. مثلاً: "كَتَبَ" ← كاتب، مكتوب، كتاب، مكتبة.\n\nهل تستطيعين أن تجدي جذر الكلمة التي تسألين عنها؟ هذا يساعدك على فهم معناها.`,
  ],
  science: [
    `سؤال رائع في العلوم! العلم يبدأ دائماً بالملاحظة والسؤال:\n\n١. ماذا تلاحظين في هذه الظاهرة؟\n٢. ما الذي تتوقّعين أن يحدث؟\n٣. كيف يمكنك اختبار توقّعك؟\n\nهذه هي الطريقة العلمية — وهي نفسها التي استعملها ابن سينا والخوارزمي!`,
    `ممتاز أنكِ تفكّرين في هذا! كل ظاهرة علمية لها سبب ونتيجة. المفتاح هو: "لماذا يحدث هذا؟" وليس فقط "ماذا يحدث؟"\n\nفكّري في الأسباب المحتملة واكتبي قائمة بها.`,
    `جيد! الآن لنُفكّر في التجربة: ما المتغيّر الذي ستغيّرينه؟ وما الذي سيبقى ثابتاً؟\n\nهذا يُسمّى "التصميم التجريبي". خذي ورقة وارسمي تجربتك!`,
  ],
  english: [
    `Good question, Leila! English is best learned by spotting patterns, not memorising rules. Let me help:\n\n1. What type of word is it? (noun, verb, adjective?)\n2. What tense is the sentence in?\n3. Can you think of a similar sentence?\n\nWork through those, and we'll tackle it together!`,
    `You're on the right track! In English, word order matters: Subject → Verb → Object.\n\nTry this: in your sentence, who is doing the action? What action? To whom?\n\nOnce you identify these three parts, the sentence becomes much clearer.`,
    `Excellent progress! Now read the sentence aloud. Does it sound natural? English has rhythm, and your ear can often catch mistakes your eyes miss.\n\nSay it slowly — if something feels off, trust that feeling!`,
  ],
  civics: [
    `سؤال مهم في التربية الوطنية! المواطنة الصالحة تبدأ بفهم حقوقنا وواجباتنا.\n\nفكّري: ما الحق الذي تسألين عنه؟ ومن المسؤول عن حمايته؟\n\nالجواب دائماً يبدأ من الفهم — ثم التطبيق في حياتنا اليومية.`,
    `أحسنتِ! المواطنة ليست فقط حقوق — هي أيضاً مسؤوليات. فكّري: كيف يمكنك كطالبة أن تساهمي في مجتمعك؟\n\nكل خطوة صغيرة تُحدث فرقاً كبيراً.`,
    `رائع أنك تفكّرين في هذا! القانون موجود لحماية الجميع. عندما نفهم لماذا وُضع قانون معيّن، نفهم أهمية احترامه.\n\nما رأيك: لماذا وُضع هذا القانون برأيك؟`,
  ],
  history: [
    `سؤال مهمّ في التاريخ! التاريخ ليس مجرّد تواريخ — هو قصة الناس والأسباب والنتائج:\n\n١. متى حدث هذا الحدث؟\n٢. ما الأسباب التي أدّت إليه؟\n٣. كيف أثّر على ما جاء بعده?\n\nإذا فهمتِ هذه الثلاث، تكونين قد فهمتِ الحدث فعلاً.`,
    `التاريخ مليء بالدراما الإنسانية! كل قرار اتّخذه قائد كان بسبب أشخاص حقيقيين يواجهون خيارات صعبة.\n\nاسألي: "ما الذي كان يفكّر فيه الناس وقتها؟" — سيصبح التاريخ أكثر وضوحاً وإثارة!`,
    `ممتاز! التاريخ يُعلّمنا أن لا نكرّر أخطاء الماضي. فكّري: هل هناك درس من هذا الحدث يمكننا تطبيقه اليوم؟`,
  ],
  arts: [
    `سؤال جميل في الفنون! الفن هو التعبير عن المشاعر بطريقة إبداعية. لا يوجد جواب "صح" أو "غلط" في الفن.\n\nفكّري: ما الذي تريدين التعبير عنه؟ ما المشاعر التي تريدين أن يشعر بها المشاهد؟`,
    `رائع! كل فنان يبدأ بالملاحظة. انظري حولك — الألوان، الأشكال، الظلال. الطبيعة هي أفضل معلّم للفن.\n\nجرّبي أن ترسمي ما تراه بدون تفكير كثير. الحرية في الرسم تُنتج أجمل الأعمال!`,
    `أحسنتِ! تذكّري أن الفن مهارة تتطوّر بالممارسة. كل رسمة تعملينها تجعلك أفضل.\n\nالنصيحة الذهبية: لا تقارني عملك بعمل غيرك — قارنيه بعملك السابق فقط!`,
  ],
  general: [
    `سؤال مثير للاهتمام يا ليلى! قبل ما نحلّ هذا معاً:\n\n١. ما المادة الدراسية؟\n٢. ما الذي تعرفينه بالفعل؟\n٣. أين بالضبط شعرتِ أنك علقتِ؟\n\nتذكّري: السؤال الجيّد نصف الجواب!`,
    `أحسنتِ أنكِ طلبتِ المساعدة — هذه علامة طالبة جادّة. خذي نفساً عميقاً واقرئي المسألة ببطء.\n\nاكتبي كل المعطيات على الورقة — كثير من المسائل تصبح أسهل بمجرّد الكتابة!`,
    `ممتاز! كلّ مسألة صعبة تحتوي على مسألة أصغر وأسهل. جرّبي هذا:\n\nقسّمي السؤال إلى خطوات صغيرة. ما الجزء الأسهل؟ ابدئي منه!\n\nلا تحاولي حلّ كل شيء دفعة واحدة — هذا يُرهق الدماغ.`,
  ],
};

const responsesEn: Record<TopicKey, string[]> = {
  math: [
    `Great question, Leila! Math isn't about memorising — it's about understanding steps. Before we solve this together:\n\n1. What information do you have?\n2. What exactly is being asked?\n3. Can you think of a similar problem?\n\nThink about these, and we'll work through it step by step!`,
    `Good thinking! Let's work out loud together. In math, we start with: "What do I know?" and "What am I asked to find?"\n\nWrite your answers to those. Then think: does this involve addition? Subtraction? Multiplication? Division?\n\nDon't be afraid of mistakes — they're part of learning!`,
    `Excellent progress! Now let's verify: if you substitute your answer back into the original equation, does it work?\n\nThis is the most important math habit: **checking your work**. Try it and tell me what you find!`,
    `You're doing great! Now think: can this problem be solved a different way? Sometimes the second method is faster and easier.\n\nRemember: math is like a puzzle — each piece leads to the next.`,
  ],
  arabic: [
    `Great Arabic question! Our language is rich, and every rule has wisdom. Let's think:\n\n- Is the word a noun, verb, or particle?\n- What's its function in the sentence?\n- Do you remember a similar rule?\n\nOnce we identify these, the answer becomes clear.`,
    `Arabic is best understood through reading and reflection. When facing a difficult sentence, start from the verb, then the subject, then the object.\n\nRead the sentence slowly again and tell me: what is its verb?`,
    `Well done! Notice that many Arabic words come from a three-letter root. For example: "kataba" → writer, written, book, library.\n\nCan you find the root of the word you're asking about?`,
  ],
  science: [
    `Wonderful science question! Science starts with observation:\n\n1. What do you observe?\n2. What do you predict will happen?\n3. How could you test your prediction?\n\nThis is the scientific method — the same one used by Ibn Sina and Al-Khwarizmi!`,
    `I love that you're thinking about this! Every phenomenon has a cause and effect. The key question is "Why does this happen?" not just "What happens?"\n\nList the possible causes, and we'll test them together.`,
    `Good! Now let's think about the experiment: what variable will you change? What stays constant?\n\nThis is "experimental design." Grab some paper and sketch your experiment!`,
  ],
  english: [
    `Good question, Leila! English is best learned by spotting patterns. Let me help:\n\n1. What type of word is it? (noun, verb, adjective?)\n2. What tense is the sentence in?\n3. Can you think of a similar sentence?\n\nLet's work through those together!`,
    `You're on the right track! Remember: Subject → Verb → Object.\n\nIn your sentence, who is doing the action? What action? To whom?\n\nIdentify these three parts and the sentence becomes clear.`,
    `Great progress! Read it aloud — does it sound natural? English has rhythm, and your ear can catch mistakes your eyes miss.\n\nSay it slowly. If something feels off, trust that feeling!`,
  ],
  civics: [
    `Important civics question! Good citizenship starts with understanding our rights and responsibilities.\n\nThink: what right are you asking about? Who is responsible for protecting it?\n\nThe answer always starts with understanding — then applying it in daily life.`,
    `Well said! Citizenship isn't just about rights — it's also about responsibilities. How can you as a student contribute to your community?\n\nEvery small step makes a big difference.`,
    `Great thinking! Laws exist to protect everyone. When we understand why a law was created, we understand why it matters.\n\nWhat do you think: why was this particular law created?`,
  ],
  history: [
    `Great history question! History isn't just dates — it's the story of people, causes, and consequences:\n\n1. When did this happen?\n2. What caused it?\n3. How did it shape what came after?\n\nAnswer all three and you've truly understood the event!`,
    `History is full of human drama! Every decision by a leader was made by real people facing tough choices.\n\nAsk: "What were people thinking at that time?" — history becomes much more vivid!`,
    `Excellent! History teaches us not to repeat past mistakes. Think: is there a lesson from this event we can apply today?`,
  ],
  arts: [
    `Beautiful arts question! Art is about expressing feelings creatively. There's no "right" or "wrong" answer in art.\n\nThink: what do you want to express? What feelings do you want the viewer to feel?`,
    `Wonderful! Every artist starts by observing. Look around you — colors, shapes, shadows. Nature is the best art teacher.\n\nTry drawing what you see without overthinking. Freedom in drawing creates the most beautiful work!`,
    `Well done! Remember that art is a skill that improves with practice. Every drawing you make makes you better.\n\nGolden rule: don't compare your work to others — compare it only to your previous work!`,
  ],
  general: [
    `Interesting question, Leila! Before we solve this together:\n\n1. Which subject is this?\n2. What do you already know about it?\n3. Where exactly did you get stuck?\n\nRemember: a good question is half the answer!`,
    `Good for you asking for help — that shows you're a serious student. Take a deep breath and read the problem slowly.\n\nWrite down everything you know — many problems become easier just by writing things out!`,
    `Every hard problem has a smaller, easier problem inside it. Try this:\n\nBreak your question into tiny steps. What's the easiest part? Start there!\n\nDon't try solving everything at once — that overwhelms the brain.`,
  ],
};

function detectTopic(text: string, active: TopicKey | null): TopicKey {
  const t = text.toLowerCase();
  if (/[0-9]\s*[+\-*/×÷=]|رياضيات|كسور|جبر|معادلة|math|fraction|equation|algebra/i.test(t)) return "math";
  if (/عربية|نحو|إعراب|صرف|arabic|grammar/i.test(t)) return "arabic";
  if (/علوم|تجربة|فيزياء|كيمياء|أحياء|science|experiment|physics|chemistry|biology/i.test(t)) return "science";
  if (/english|إنجليزي|tense|verb/i.test(t)) return "english";
  if (/وطنية|مواطنة|حقوق|civics|citizenship|rights/i.test(t)) return "civics";
  if (/تاريخ|حضارة|history|civilization/i.test(t)) return "history";
  if (/فنون|رسم|arts|drawing|painting/i.test(t)) return "arts";
  return active ?? "general";
}

type Message = { from: "user" | "ai"; text: string };

const topicPills: { key: TopicKey; label: { ar: string; en: string } }[] = [
  { key: "math", label: { ar: "الرياضيات", en: "Math" } },
  { key: "arabic", label: { ar: "العربية", en: "Arabic" } },
  { key: "science", label: { ar: "العلوم", en: "Science" } },
  { key: "english", label: { ar: "الإنجليزية", en: "English" } },
  { key: "civics", label: { ar: "التربية الوطنية", en: "Civics" } },
  { key: "history", label: { ar: "التاريخ", en: "History" } },
  { key: "arts", label: { ar: "الفنون", en: "Arts" } },
];

export default function StudyBuddyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const initialGreeting: Message = {
    from: "ai",
    text:
      locale === "ar"
        ? "مرحباً ليلى! كيف أقدر أساعدك اليوم؟ اختاري مادة أو اسأليني أي سؤال!"
        : "Hi Leila! How can I help you today? Pick a subject or ask me anything!",
  };

  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState<TopicKey | null>(null);
  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || isTyping) return;

    const userMsg: Message = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const topic = detectTopic(text, activeTopic);
    setIsTyping(true);

    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const library = locale === "ar" ? responsesAr : responsesEn;
      const pool = library[topic] || library.general;
      const reply = pool[responseIndex % pool.length];
      setResponseIndex((i) => i + 1);
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, delay);
  };

  const handleTopicClick = (key: TopicKey, label: string) => {
    setActiveTopic(key);
    const starter =
      locale === "ar"
        ? `عندي سؤال في مادة ${label}`
        : `I have a ${label} question`;
    handleSend(starter);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([initialGreeting]);
    setActiveTopic(null);
    setResponseIndex(0);
    setInput("");
  };

  const studentAvatar =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80";

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)] p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs tracking-widest text-[var(--color-gold)] font-semibold">
                {locale === "ar"
                  ? "صديق التعلّم الذكي"
                  : "AI STUDY BUDDY"}
              </p>
            </div>
            <h1 className={h1Class}>
              {locale === "ar"
                ? "صديقك الذكي للدراسة"
                : "Your Smart Study Companion"}
            </h1>
            <p
              className={`text-sm text-[var(--color-ink-soft)] mt-1 max-w-2xl ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {locale === "ar"
                ? "اسأليني أي سؤال في أي مادة وسأساعدك تفهمين — مش أعطيك الجواب!"
                : "Ask me anything about any subject and I'll help you understand — not just give you the answer!"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {locale === "ar" ? "محادثة جديدة" : "New chat"}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-cream)] border border-[var(--color-border)]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider">
                {locale === "ar" ? "متصل" : "Online"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic pills */}
      <div className="bg-white border-b border-[var(--color-border)] px-6 lg:px-8 py-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs tracking-wider text-[var(--color-ink-soft)] me-2">
            {locale === "ar" ? "المواد:" : "Subjects:"}
          </span>
          {topicPills.map((pill) => {
            const active = activeTopic === pill.key;
            return (
              <button
                key={pill.key}
                onClick={() => handleTopicClick(pill.key, pill.label[locale])}
                disabled={isTyping}
                className={`px-4 py-1.5 text-xs font-semibold border transition-all disabled:opacity-50 ${
                  active
                    ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                    : "bg-[var(--color-cream)] border-[var(--color-border)] hover:bg-[var(--color-navy)] hover:text-white"
                }`}
              >
                {pill.label[locale]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${
                  m.from === "user" ? "justify-end" : ""
                }`}
              >
                {m.from === "ai" && (
                  <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-5 ${
                    m.from === "user"
                      ? "bg-[var(--color-navy)] text-white"
                      : "bg-white border border-[var(--color-border)]"
                  }`}
                >
                  <p
                    className={`text-sm whitespace-pre-line ${
                      isRTL ? "leading-[2]" : "leading-relaxed"
                    } ${
                      m.from === "user"
                        ? "text-white"
                        : "text-[var(--color-ink)]"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
                {m.from === "user" && (
                  <div
                    className="w-10 h-10 shrink-0 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${studentAvatar}')` }}
                  />
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-[var(--color-border)] p-5 flex items-center gap-1.5">
                  {[0, 1, 2].map((j) => (
                    <motion.div
                      key={j}
                      className="w-2 h-2 rounded-full bg-[var(--color-gold)]"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: j * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[var(--color-border)] p-5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder={
              locale === "ar"
                ? "اكتبي سؤالك هنا..."
                : "Type your question here..."
            }
            className="flex-1 px-5 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm disabled:opacity-60"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className={`w-5 h-5 ${isRTL ? "-scale-x-100" : ""}`} />
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-ink-soft)] text-center mt-3 max-w-4xl mx-auto">
          {locale === "ar"
            ? "صديق التعلّم الذكي مساعد تعليمي يرشدك للفهم — لا يعطيك الإجابات الجاهزة. هذه نسخة تجريبية."
            : "AI Study Buddy is an educational assistant that guides you to understanding — it does not give ready answers. This is a demo version."}
        </p>
      </div>
    </div>
  );
}
