"use client";

import { use, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload, Send, Bot, RotateCcw } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

// ============================================
// Pedagogical response library
// ============================================
// The "AI" is a smart mock that picks a response based on:
//  1) Keyword detection in the user's message
//  2) The active topic (from the pill buttons)
//  3) Whether this is a first reply or follow-up
// It teaches how to think — never just gives the answer.

type TopicKey =
  | "math"
  | "arabic"
  | "science"
  | "english"
  | "history"
  | "geography"
  | "islamic"
  | "general";

const responsesAr: Record<TopicKey, string[]> = {
  math: [
    `سؤال ممتاز! الرياضيات مش عن حفظ الحل — هي عن فهم الخطوات. قبل ما نحلّ هذه المسألة معاً، أريد أن أسألك:\n\n١. شو المعطيات اللي عندك؟\n٢. شو المطلوب بالضبط؟\n٣. هل تذكر قاعدة شبيهة استعملتها قبل؟\n\nفكّري فيها، ومن ثم نكمل خطوة بخطوة.`,
    `جيّد! هيّا نفكّر بصوت عال معاً. في الرياضيات، دائماً نبدأ بالسؤال: "ما الذي أعرفه؟" و"ما الذي يُطلب منّي؟"\n\nخذي لحظة واكتبي إجابتك على هذين السؤالين. بعدها، فكّري: هل في هذه المسألة عمليات تجميع؟ طرح؟ ضرب؟ قسمة؟\n\nلا تخافي من الخطأ — الخطأ جزء من التعلّم.`,
    `رائع، وصلتِ للخطوة التالية! الآن لنتحقّق: إذا عوّضتِ القيمة التي وجدتِها في المعادلة الأصلية، هل تعطي نتيجة صحيحة؟\n\nهذه أهم عادة في الرياضيات: **التحقّق**. كل مرة تحلّين مسألة، عودي واختبري الحل. إذا صحّ، فأنتِ متأكدة. إذا لا، تعرفين وين لازم تراجعي.\n\nجرّبي، وأخبريني بما وجدتِه.`,
  ],
  arabic: [
    `ما شاء الله، سؤال جميل في اللغة العربية! لغتنا غنيّة، وكل قاعدة فيها لها حكمة. دعينا نفكّر معاً:\n\n- هل الكلمة التي تسألين عنها اسم أم فعل أم حرف؟\n- ما وظيفتها في الجملة؟\n- هل تذكرين قاعدة مشابهة درستِها؟\n\nإذا حددنا هذه الأمور، الجواب يصبح واضحاً.`,
    `بارك الله فيكِ على الاهتمام. اللغة العربية تُفهم بالقراءة والتأمّل، ليس بالحفظ فقط.\n\nعندما تواجهين جملة صعبة، ابدئي دائماً من الفعل (إذا وُجد)، ثم الفاعل، ثم المفعول به. هذا الترتيب يساعدك على فهم المعنى.\n\nاقرئي الجملة مرة ثانية ببطء، وأخبريني: ما هو فعلها؟`,
    `أحسنتِ! تمييز الأنماط في اللغة العربية مهارة مهمّة. لاحظي أن كلمات كثيرة مشتقّة من جذر ثلاثي (ثلاثة حروف أصلية)، ومنه تُبنى عائلة كاملة من الكلمات.\n\nمثلاً: "كَتَبَ" → كاتب، مكتوب، كتاب، مكتبة، كتابة... جميعها من جذر "ك ت ب".\n\nهل تستطيعين أن تجدي جذر الكلمة التي تسألين عنها؟`,
  ],
  science: [
    `سؤال رائع في العلوم! العلم يبدأ دائماً بالملاحظة والسؤال. لنكتشف الإجابة معاً:\n\n١. ماذا تلاحظين في هذه الظاهرة؟\n٢. ما الذي تتوقّعين أن يحدث؟\n٣. كيف يمكنك اختبار توقّعك؟\n\nهذه هي الطريقة العلمية — وهي الطريقة التي استعملها آينشتاين وابن سينا والخوارزمي.`,
    `ممتاز أنكِ تفكّرين في هذا! في العلوم، لا توجد أسئلة "سخيفة" — فقط أسئلة لم نجد إجابتها بعد.\n\nدعيني أرشدك: كل ظاهرة علمية لها سبب (cause) ونتيجة (effect). المفتاح هو: "لماذا يحدث هذا؟" وليس فقط "ماذا يحدث؟"\n\nفكّري في الأسباب المحتملة، واكتبي قائمة بها. ثم نختبرها.`,
    `جيد! الآن لنُفكّر في التجربة: ما المتغيّر الذي ستغيّرينه؟ وما الذي ستبقى عليه ثابتاً؟\n\nهذا يُسمّى "التصميم التجريبي". كل عالم ناجح يبدأ بهذه الخطوة قبل لمس أي أنابيب اختبار.\n\nخذي ورقة وارسمي تجربتك. سأنتظر.`,
  ],
  english: [
    `Good question! English, like any language, is best learned by understanding the patterns — not memorising rules. Let me guide you:\n\n1. What type of word is it? (noun, verb, adjective?)\n2. What tense is the sentence in? (past, present, future?)\n3. Can you think of a similar sentence you've seen before?\n\nThink about these, and we'll work through it together.`,
    `You're thinking well. In English, word order matters a lot: Subject → Verb → Object. Once you identify these three in any sentence, everything becomes clearer.\n\nTry this: in your sentence, who is doing the action? What action? And to whom or what?`,
    `Excellent progress! Now let's check your answer. Read the sentence aloud — does it sound natural? English has rhythm and flow, and your ear can often catch mistakes your eyes miss.\n\nSay it slowly. If something feels off, trust that feeling.`,
  ],
  history: [
    `سؤال مهمّ في التاريخ! التاريخ ليس مجرّد تواريخ وأسماء — هو قصة الناس والأسباب والنتائج. لنفكّر معاً:\n\n١. متى حدث هذا الحدث؟\n٢. ما الأسباب التي أدّت إليه؟\n٣. كيف أثّر على ما جاء بعده؟\n\nإذا فهمت الإجابات الثلاث، تكونين قد فهمتِ الحدث فعلاً، لا حفظتِه فقط.`,
    `التاريخ يُدرّس أحياناً كقائمة تواريخ — لكنّه في الحقيقة مليء بالدراما الإنسانية. كل قرار اتّخذه قائد، كل معركة، كل معاهدة، كانت بسبب أشخاص حقيقيين يواجهون خيارات صعبة.\n\nعندما تدرسين حدثاً تاريخياً، اسألي: "ما الذي كان يفكّر فيه الناس وقتها؟" سيصبح التاريخ أكثر وضوحاً وإثارة.`,
  ],
  geography: [
    `الجغرافيا علم جميل — يربط الأرض بالناس. السؤال الأهم دائماً: **لماذا** يعيش الناس هنا وليس هناك؟\n\nفكّري في: المناخ، الموارد (ماء، تربة)، التضاريس، الطرق التجارية. كلها تُفسّر لماذا تنمو المدن في أماكن معيّنة.\n\nأيّ جانب من هذه العوامل يخصّ سؤالك؟`,
    `ممتاز! الخرائط هي أفضل صديق لطالب الجغرافيا. عندما تدرسين منطقة، ابدئي دائماً بالنظر لخريطتها وسؤال:\n\n- أين تقع بالنسبة للبحار والأنهار؟\n- هل هي جبلية، ساحلية، صحراوية، أم سهلية؟\n- ما الدول المجاورة لها؟\n\nالجواب على هذه الأسئلة يُفسّر الكثير عن حياة الناس في تلك المنطقة.`,
  ],
  islamic: [
    `سؤال قيّم — بارك الله فيكِ على اهتمامك بدينك. في التربية الإسلامية، الهدف ليس الحفظ فقط، بل الفهم والتطبيق.\n\nدعينا نفكّر معاً:\n١. ما المصدر الذي جاء منه الحكم أو المفهوم الذي تسألين عنه (قرآن، سنة، إجماع)؟\n٢. ما الحكمة من ورائه؟\n٣. كيف يمكن تطبيقه في حياتنا اليومية؟\n\nإذا فهمنا الحكمة، أصبح الحكم أعمق في القلب.`,
    `جميل أنك تسألين. قال ﷺ: "طلب العلم فريضة على كل مسلم"، وكل سؤال تسألينه هو خطوة في هذا الطريق.\n\nاقرئي النص أو الحديث بهدوء، وفكّري: ما الرسالة الأساسية؟ ما الذي يعلّمنا إياه عن علاقتنا بالله، أو بالناس، أو بأنفسنا؟`,
  ],
  general: [
    `سؤال مثير للاهتمام! قبل ما نحلّ هذه المسألة معاً، أريد أن أفهم أكثر:\n\n١. ما المادة الدراسية؟\n٢. ما الذي تعرفينه بالفعل عن هذا الموضوع؟\n٣. أين بالضبط شعرتِ أنكِ علقتِ؟\n\nإذا أجبتِ على هذه الأسئلة، سأقدر أساعدك بشكل أدق. تذكّري: السؤال الجيّد نصف الجواب.`,
    `أحسنتِ أنكِ طلبتِ المساعدة — هذه علامة طالبة جادّة. دعيني أرشدك بدل ما أعطيك الجواب مباشرةً:\n\nخذي نفساً عميقاً، واقرئي المسألة ببطء. اكتبي كل المعطيات على الورقة. كثير من المسائل تصبح أسهل بمجرّد أن نكتب ما نعرفه بصوت عال (أو على ورقة).`,
    `ممتاز! كلّ مسألة صعبة تحتوي على مسألة أصغر وأسهل في داخلها. جرّبي هذا:\n\nقسّمي السؤال إلى خطوات صغيرة. ما الذي يمكنك حلّه أولاً بكل سهولة؟ ابدئي من هناك، والباقي سيأتي تدريجياً.\n\nلا تحاولي حلّ كل شيء دفعة واحدة — هذا يُرهق الدماغ.`,
  ],
};

const responsesEn: Record<TopicKey, string[]> = {
  math: [
    `Great question! Math isn't about memorising solutions — it's about understanding steps. Before we solve this together, I want to ask you:\n\n1. What information do you already have?\n2. What exactly is being asked?\n3. Can you think of a similar problem you've solved before?\n\nThink about these, and we'll work through it step by step.`,
    `Good! Let's think out loud together. In math, we always start with: "What do I know?" and "What am I asked to find?"\n\nTake a moment to write your answer to those two questions. Then think: does this problem involve addition? Subtraction? Multiplication? Division?\n\nDon't be afraid to try — mistakes are part of learning.`,
    `Excellent, you're making progress! Now let's check: if you substitute the value you found back into the original equation, does it give a correct result?\n\nThis is the most important habit in math: **verifying**. Every time you solve a problem, go back and test your answer. If it checks out, you're confident. If not, you know exactly where to review.\n\nTry it, and tell me what you find.`,
  ],
  arabic: [
    `Great question about Arabic! Our language is rich, and every rule has wisdom behind it. Let's think together:\n\n- Is the word you're asking about a noun, verb, or particle?\n- What is its function in the sentence?\n- Do you remember a similar rule you've studied?\n\nOnce we identify these, the answer becomes clear.`,
    `Arabic is best understood through reading and reflection — not just memorisation. When you encounter a difficult sentence, always start from the verb (if there is one), then the subject, then the object. This order helps you grasp the meaning.\n\nRead the sentence slowly again, and tell me: what is its verb?`,
  ],
  science: [
    `Wonderful science question! Science always begins with observation and inquiry. Let's discover the answer together:\n\n1. What do you observe in this phenomenon?\n2. What do you predict will happen?\n3. How could you test your prediction?\n\nThis is the scientific method — the same one used by Einstein, Ibn Sina, and Al-Khwarizmi.`,
    `I love that you're thinking about this. In science, there are no "silly" questions — only questions whose answers we haven't found yet.\n\nLet me guide you: every scientific phenomenon has a cause and an effect. The key question is "Why does this happen?" — not just "What happens?"\n\nThink about the possible causes, and list them. Then we'll test them.`,
  ],
  english: [
    `Good question! English, like any language, is best learned by spotting patterns — not memorising rules. Let me guide you:\n\n1. What type of word is it? (noun, verb, adjective?)\n2. What tense is the sentence in? (past, present, future?)\n3. Can you think of a similar sentence you've seen before?\n\nWork through those, and we'll tackle it together.`,
    `You're thinking well. In English, word order matters: Subject → Verb → Object. Once you identify these three in any sentence, everything becomes clearer.\n\nTry this: in your sentence, who is doing the action? What action? To whom?`,
  ],
  history: [
    `Great history question! History isn't just dates and names — it's a story of people, causes, and consequences. Let's think:\n\n1. When did this event happen?\n2. What caused it?\n3. How did it shape what came after?\n\nIf you can answer all three, you've truly understood the event — not just memorised it.`,
  ],
  geography: [
    `Geography is a beautiful science — it connects land and people. The most important question is always: **why** do people live here and not there?\n\nThink about: climate, resources (water, soil), terrain, trade routes. All of these explain why cities grow where they do.\n\nWhich aspect is your question about?`,
  ],
  islamic: [
    `A meaningful question. In Islamic studies, the goal isn't just memorisation — it's understanding and application.\n\nLet's think together:\n1. What is the source of the ruling or concept (Qur'an, Sunnah, consensus)?\n2. What is the wisdom behind it?\n3. How can it be applied in our daily lives?\n\nOnce we grasp the wisdom, the ruling sinks deeper into the heart.`,
  ],
  general: [
    `Interesting question! Before we solve this together, I want to understand more:\n\n1. Which subject is this?\n2. What do you already know about this topic?\n3. Where exactly did you feel stuck?\n\nIf you answer these, I can help you more precisely. Remember: a good question is half the answer.`,
    `Good of you to ask for help — that's the mark of a serious student. Let me guide you rather than just hand you the answer:\n\nTake a deep breath and read the problem slowly. Write all the known information on paper. Many problems become easier just by writing down what we know — out loud or on paper.`,
    `Every hard problem contains a smaller, easier problem inside it. Try this:\n\nBreak your question into tiny steps. What's the easiest part you can solve first? Start there, and the rest will come gradually.\n\nDon't try to solve everything at once — that overwhelms the brain.`,
  ],
};

// Detect topic from user input keywords (falls back to active topic)
function detectTopic(text: string, active: TopicKey | null): TopicKey {
  const t = text.toLowerCase();

  // Math detection
  if (
    /[0-9]\s*[+\-*/×÷=]|[+\-*/×÷=]\s*[0-9]/.test(t) ||
    /\b(solve|equation|algebra|fraction|جبر|معادلة|رياضيات|حسا|كسور|جمع|طرح|ضرب|قسمة)\b/i.test(
      t
    )
  ) {
    return "math";
  }

  // Arabic
  if (
    /\b(arabic|nahw|إعراب|نحو|صرف|عربية|مفرد|جمع|مذكّر|مؤنث|فاعل|مفعول|جذر)\b/i.test(
      t
    )
  ) {
    return "arabic";
  }

  // Science
  if (
    /\b(experiment|atom|cell|physics|chemistry|biology|تجربة|ذرة|خلية|فيزياء|كيمياء|أحياء|علوم|طاقة|جاذبية)\b/i.test(
      t
    )
  ) {
    return "science";
  }

  // English
  if (
    /\b(english|tense|verb|grammar|إنجليزي|زمن|فعل|قواعد)\b/i.test(t) ||
    /\b(past|present|future|perfect|continuous)\b/i.test(t)
  ) {
    return "english";
  }

  // History
  if (
    /\b(history|war|civilization|تاريخ|حضارة|معركة|عصر|قرن|دولة|خلافة)\b/i.test(
      t
    )
  ) {
    return "history";
  }

  // Geography
  if (
    /\b(geography|map|capital|river|mountain|جغرافيا|خريطة|عاصمة|نهر|جبل|قارة|مناخ)\b/i.test(
      t
    )
  ) {
    return "geography";
  }

  // Islamic studies
  if (
    /\b(islam|quran|hadith|salah|إسلام|قرآن|حديث|صلاة|صيام|فقه|عقيدة|تفسير)\b/i.test(
      t
    )
  ) {
    return "islamic";
  }

  // Fall back to active topic if set, otherwise general
  return active ?? "general";
}

type Message = {
  from: "user" | "ai";
  text: string;
};

export default function HomeworkHelperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const h = dict.portals.parent.homework;
  const isRTL = locale === "ar";

  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState<TopicKey | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { from: "user", text: h.chat.student },
    { from: "ai", text: h.chat.ai },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message or typing
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Map topic label (from dict) to internal TopicKey
  const topicKeyForLabel = (label: string): TopicKey => {
    const l = label.toLowerCase();
    if (l.includes("رياض") || l.includes("math")) return "math";
    if (l.includes("عرب") || l.includes("arabic")) return "arabic";
    if (l.includes("علوم") || l.includes("science")) return "science";
    if (l.includes("english") || l.includes("إنجليز")) return "english";
    if (l.includes("تاريخ") || l.includes("history")) return "history";
    if (l.includes("جغراف") || l.includes("geography")) return "geography";
    if (l.includes("إسلام") || l.includes("islam")) return "islamic";
    return "general";
  };

  const handleSend = (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || isTyping) return;

    const userMsg: Message = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const topic = detectTopic(text, activeTopic);
    setIsTyping(true);

    // Simulate thinking time (1.2 – 2 s)
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const library = locale === "ar" ? responsesAr : responsesEn;
      const pool = library[topic] || library.general;
      const reply = pool[responseIndex % pool.length];
      setResponseIndex((i) => i + 1);

      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
      setIsTyping(false);

      // Return focus to input
      setTimeout(() => inputRef.current?.focus(), 100);
    }, delay);
  };

  const handleTopicClick = (label: string) => {
    const key = topicKeyForLabel(label);
    setActiveTopic(key);
    // Auto-insert a starter question
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
    setMessages([
      { from: "user", text: h.chat.student },
      { from: "ai", text: h.chat.ai },
    ]);
    setActiveTopic(null);
    setResponseIndex(0);
    setInput("");
  };

  const parentAvatar =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80";

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
              <p className="section-label">{h.hero.title}</p>
            </div>
            <h1 className={h1Class}>{h.hero.subtitle}</h1>
            <p
              className={`text-sm text-[var(--color-ink-soft)] mt-1 max-w-2xl ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {h.hero.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-navy)] border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors"
              aria-label="Reset chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {locale === "ar" ? "محادثة جديدة" : "New chat"}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-cream)] border border-[var(--color-border)]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider">
                {h.online}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick topics */}
      <div className="bg-white border-b border-[var(--color-border)] px-6 lg:px-8 py-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs tracking-wider text-[var(--color-ink-soft)] me-2">
            {h.topicsTitle}:
          </span>
          {h.topics.map((s) => {
            const key = topicKeyForLabel(s);
            const active = activeTopic === key;
            return (
              <button
                key={s}
                onClick={() => handleTopicClick(s)}
                disabled={isTyping}
                className={`px-4 py-1.5 text-xs font-semibold border transition-all disabled:opacity-50 ${
                  active
                    ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                    : "bg-[var(--color-cream)] border-[var(--color-border)] hover:bg-[var(--color-navy)] hover:text-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat */}
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
                    style={{ backgroundImage: `url('${parentAvatar}')` }}
                  />
                )}
              </motion.div>
            ))}

            {/* Typing indicator */}
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
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[var(--color-gold)]"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.2,
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
          <button
            className="p-3 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors"
            aria-label={h.input.upload}
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder={h.input.placeholder}
            className="flex-1 px-5 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm disabled:opacity-60"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={h.input.send}
          >
            <Send className={`w-5 h-5 ${isRTL ? "-scale-x-100" : ""}`} />
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-ink-soft)] text-center mt-3 max-w-4xl mx-auto">
          {h.disclaimer}
        </p>
      </div>
    </div>
  );
}
