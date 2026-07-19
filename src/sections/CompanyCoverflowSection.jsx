import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightStreakBackground from "../components/LightStreakBackground.jsx";
import companies from "../utils/companies.js";

gsap.registerPlugin(ScrollTrigger);

const BAR_COUNT = 48;

function seededHeights(count) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, i) => {
    const base = 30 + rand() * 70;
    const wobble = Math.sin(i * 0.7) * 15;
    return Math.max(12, Math.min(100, base + wobble));
  });
}

const HEIGHTS = seededHeights(BAR_COUNT);
const TONES = HEIGHTS.map((_, i) => {
  const shades = ["#2b2b2b", "#4a4a4a", "#6f6f6f", "#9a9a9a", "#c7c7c7", "#e9e9e9"];
  return shades[i % shades.length];
});

export default function CompanyCoverflowSection() {
  const sectionRef = useRef(null);
  const barsWrapRef = useRef(null);
  const vignetteRef = useRef(null);
  const headingWrapRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const n = cards.length;

      // الصندوق يبدأ بمنتصف الشاشة (مركزي)، والعنوان والفقرة كل واحد يظهر بلحظته الخاصة
      gsap.set(vignetteRef.current, { scaleX: 0 });
      gsap.set(headingWrapRef.current, { y: "34vh" });
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.set(paragraphRef.current, { opacity: 0 });
      gsap.set(cards, {
        rotateY: -85,
        xPercent: 140,
        scale: 0.08,
        opacity: 0,
        force3D: true,
      });

      // وحدة سكرول واحدة للمقدمة (الأضواء + ظهور العنوان وارتفاعه)
      // + وحدة كاملة لكل شركة (تبادل الكروت)
      const INTRO_UNITS = 1;
      const totalUnits = INTRO_UNITS + n;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalUnits * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // --- المرحلة 1 (0 → 1): الأضواء تتوهج، الخلفية تسود ---
      tl.to(vignetteRef.current, { scaleX: 1, duration: 0.55 }, 0);

      // العنوان "شركاتنا التابعة" يظهر أول وهو بمنتصف الشاشة
      tl.to(titleRef.current, { opacity: 1, duration: 0.3 }, 0.1);

      tl.to(barsWrapRef.current, { opacity: 0, duration: 0.4 }, 0.45);

      // بعدين الصندوق (العنوان) يرتفع لمكانه بالأعلى
      tl.to(headingWrapRef.current, { y: 0, duration: 0.3 }, 0.5);

      // وبعد ما يستقر بالأعلى، تظهر الفقرة تحته
      tl.to(paragraphRef.current, { opacity: 1, duration: 0.2 }, 0.8);

      // --- المرحلة 2 (بعد الوحدة الأولى): كل شركة تاخذ وحدة كاملة، تظهر ثم تختفي للي بعدها ---
      cards.forEach((card, i) => {
        const appearAt = INTRO_UNITS + i + 0.5;

        // الكرت يمشي بمسار أفقي مستوي (بدون رجوع بمحور العمق) — يدخل من
        // اليمين وهو مدوّر تقريبًا 85° ومصغّر، ويتفتح نحو المشاهد بالتدريج
        tl.fromTo(
          card,
          { rotateY: -85, xPercent: 140, scale: 0.08, opacity: 0 },
          { rotateY: 0, xPercent: 0, scale: 1.18, opacity: 1, duration: 0.5 },
          appearAt,
        );

        // بعد الذروة يرتاح لحجمه الطبيعي بالمنتصف
        tl.to(card, { scale: 1, duration: 0.2 }, appearAt + 0.5);

        if (i < n - 1) {
          const disappearAt = INTRO_UNITS + i + 1.5;
          // يدور بالاتجاه المعاكس ويصغر ويكمل مساره لليسار، بنفس المستوى بدون رجوع للخلف
          tl.to(
            card,
            { rotateY: 85, xPercent: -140, scale: 0.08, opacity: 0, duration: 0.5 },
            disappearAt,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-paper"
    >
      <div className="absolute inset-4 overflow-hidden rounded-[28px] bg-black md:inset-8">
        <LightStreakBackground />

        {/* أعمدة الأضواء المتوهجة (تظهر بالمقدمة ثم تختفي) */}
        <div ref={barsWrapRef} className="absolute inset-0 z-0 flex items-end px-2">
          {HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="light-bar mx-[1px] flex-1"
              style={{
                height: `${h}%`,
                background: TONES[i],
                boxShadow: `0 0 16px 2px ${TONES[i]}`,
                animationDuration: `${2.4 + (i % 5) * 0.6}s`,
                animationDelay: `${(i % 9) * -0.35}s`,
              }}
            />
          ))}
        </div>

        <div
          ref={vignetteRef}
          className="absolute inset-0 z-0 origin-center bg-black"
          style={{
            transform: "scaleX(0)",
            maskImage:
              "radial-gradient(ellipse 60% 90% at 50% 50%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 90% at 50% 50%, black 55%, transparent 100%)",
            filter: "blur(40px)",
          }}
        />

        {/* العنوان: يبدأ بمنتصف الشاشة، وبعدين يرتفع لموقعه بالأعلى (تحت الهيدر) ويثبت هناك طول باقي السكرول */}
        <div
          ref={headingWrapRef}
          className="absolute top-28 left-1/2 z-30 -translate-x-1/2 px-6 text-center md:top-32"
        >
          <h2
            ref={titleRef}
            className="text-3xl font-semibold tracking-tight text-white md:text-5xl"
          >
            ﴍﻛﺎﺗﻨﺎ اﻟﺘﺎﺑﻌﺔ
          </h2>
          <p
            ref={paragraphRef}
            className="font-arabic mx-auto mt-4 max-w-md text-sm text-white/50 md:text-base"
          >
            محفظة متنوعة من الشركات المبتكرة التي تدفع النمو عبر القطاعات المختلفة
          </p>
        </div>
      </div>

      {/* الكروت: برا الصندوق الأسود المدوّر تمامًا — تتحرك بعرض الشاشة الحقيقي
          بدون أي قص، فتدخل/تطلع من خارج حدود الشاشة زي المرجع */}
      <div
        className="absolute inset-0 z-20 flex h-full w-full items-center justify-center pt-44 md:pt-36"
        style={{ perspective: "1000px" }}
      >
        {/* طبقة التوهج: ثابتة بمكانها، ما تتحرك ولا تدور ولا تصغر مع الكروت.
            تمتد أفقيًا وراء مسار الكروت بالكامل (خط منتصف الشاشة) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[50vh] -translate-y-1/2 md:h-[58vh]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,255,255,0.45) 0%, rgba(230,230,230,0.26) 30%, rgba(200,200,200,0.14) 50%, rgba(180,180,180,0.06) 68%, transparent 82%)",
          }}
        />

        {companies.map((c, i) => (
          <div
            key={c.name}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute z-10 h-[52vh] w-[86vw] max-w-md overflow-hidden rounded-2xl md:h-[58vh] md:w-[36vw]"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "inset 0 0 2px 1px rgba(255,255,255,0.2)",
            }}
          >
            <div className="absolute inset-0" style={{ background: c.gradient }} />
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                background: "rgba(255,255,255,0.04)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 32%, transparent 60%)",
              }}
            />

<div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                <div>
                  <span className="mb-2 block text-[11px] tracking-[0.25em] text-white/60 uppercase">
                    {c.sector}
                  </span>
                  <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
                    {c.name}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-white/70">
                    {c.desc}
                  </p>
                </div>

                {/* مساحة اللوقو: تملأ الفراغ المتبقي بالكرت وتتمركز فيه.
                    لوحة بيضاء خلف اللوقو عشان النص الأسود يبين فوق الخلفية الغامقة
                    بدون أي تغيير على ألوان اللوقو الأصلية */}
                {c.logo && (
                  <div className="mt-auto flex flex-1 items-end justify-center pb-2">
                    <div className="rounded-lg bg-white/85 px-5 py-3 backdrop-blur-sm">
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="max-h-16 w-auto object-contain md:max-h-24"
                      />
                    </div>
                  </div>
                )}
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}