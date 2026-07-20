import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: "خبرات متكاملة",
    text: "نجمع بين التكنولوجيا والإبداع والمحتوى والقانون لتقديم قيمة حقيقية وملموسة.",
  },
  {
    title: "حلول شاملة ومتكاملة",
    text: "نقدم حلولًا متكاملة للشركات، من الفكرة إلى التنفيذ والنمو.",
  },
  {
    title: "مرونة في التصميم والتشغيل",
    text: "نتميز بنموذج تشغيل مرن، صُمم خصيصاً ليتناسب مع التوسع والتطور المستمر.",
  },
  {
    title: "خبرة مثبتة",
    text: "نملك خبرة قوية في التشغيل والاستثمار عبر عدة قطاعات.",
  },
  {
    title: "شراكات قوية",
    text: "نحن نعتمد على فرق مؤهلة وتعاون فعال مع المبدعين والمؤثرين.",
  },
];

const WORD_LISTS = REASONS.map((r) => r.text.split(" "));

export default function ApproachSection() {
  const wrapperRef = useRef(null);
  const wordRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const n = REASONS.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const globalP = self.progress * n;
          const idx = Math.min(n - 1, Math.floor(globalP));
          const local = Math.min(1, Math.max(0, globalP - idx));

          // نغيّر الـ state بس لما رقم الخطوة يتغيّر فعليًا (نادر: 5 مرات بكل الصفحة)
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
          }

          // تلوين الكلمات مباشرة عبر الـ ref، بدون إعادة رسم React (يشتغل كل فريم بسلاسة)
          const words = wordRefs.current;
          const revealCount = local * words.length;
          words.forEach((el, i) => {
            if (!el) return;
            el.style.color =
              i < revealCount ? "var(--color-ink)" : "var(--color-slate-light)";
          });
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const currentWords = WORD_LISTS[activeIndex];

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${REASONS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-dvh w-full items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-12">
          {/* العمود الشمال: البادج الثابت + العنوان اللي يتبدل مع كل خطوة */}
          <div>
            <span className="mb-4 block text-xs tracking-[0.3em] text-slate uppercase">
              لماذا نحن
            </span>
            <h2 className="flex items-baseline gap-3 text-4xl leading-snug font-semibold tracking-tight text-ink md:text-5xl md:leading-snug">
              <span className="text-slate-light">/</span>
              {REASONS[activeIndex].title}
            </h2>
          </div>

          {/* العمود اليمين: مؤشر الخطوات 01-05 + الفقرة اللي تتوهج كلمة كلمة */}
          <div>
            <div className="mb-10 flex items-center gap-3">
              {REASONS.map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      i === activeIndex ? "text-ink" : "text-slate-light"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < REASONS.length - 1 && (
                    <span
                      className="h-px w-6 transition-colors duration-300"
                      style={{
                        backgroundColor:
                          i < activeIndex ? "var(--color-ink)" : "var(--color-line)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <p className="text-2xl leading-relaxed font-medium md:text-3xl">
              {currentWords.map((w, i) => (
                <span
                  key={i}
                  ref={(el) => (wordRefs.current[i] = el)}
                  className="text-slate-light"
                >
                  {w}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}