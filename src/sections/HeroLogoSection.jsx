import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene3D from "../components/HeroScene3D.jsx";

gsap.registerPlugin(ScrollTrigger);

const STATES = [
  {
    key: "about",
    heading: "من نحن",
    body: "مجموعة تركي عمر هي شركة استثمار وتمويل رائدة تركز على بناء وتشغيل شركات مبتكرة في قطاعات مختلفة. نتخصص في التحول الرقمي والحلول التكنولوجية والشراكات الاستراتيجية التي تدفع النمو المستدام وتخلق قيمة دائمة.",
  },
  {
    key: "vision",
    heading: "رؤيتنا",
    body: "أن نصنع الفرص وندير المشاريع ونطور الحلول وتحويل الأفكار إلى كيانات ناجحة، ونُمكّن الشركات والمشاريع من تحقيق النمو المستدام من خلال إدارة احترافية، وبنية تشغيلية مرنة، واستثمارات ذكية تسهم في بناء اقتصاد وطني مستدام.",
  },
  {
    key: "focus",
    heading: "تركيزنا",
    body: "يتمحور تركيزنا حول دفع عجلة الابتكار من خلال تبني التكنولوجيا المتقدمة والاستراتيجيات الموجهة نحو المستقبل، وبناء شراكات استراتيجية قوية تخلق قيمة متبادلة وفرص نمو مستدامة.",
  },
];

export default function HeroLogoSection() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const introRef = useRef(null);
  const cardRef = useRef(null);
  const textRefs = useRef([]);
  const progressDotRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            sceneRef.current?.setProgress(self.progress);
            if (progressDotRef.current) {
              progressDotRef.current.style.top = `${self.progress * 100}%`;
            }
          },
        },
      });

      // المرحلة 1: العنوان الكبير (اسم الشركة + السلوقن) يتصغر ويرتفع ويختفي،
      // يفسح المجال للوقو الكامل يبين خلفه
      tl.to(introRef.current, { scale: 0.55, y: -140, duration: 0.12, ease: "none" }, 0).to(
        introRef.current,
        { autoAlpha: 0, duration: 0.05, ease: "none" },
        0.12,
      );

      // المرحلة 2: الكرت الزجاجي يظهر، وتتبادل نصوص من نحن/رؤيتنا/تركيزنا
      const introEnd = 0.17;
      const remaining = 1 - introEnd;
      const per = remaining / STATES.length;

      tl.to(
        cardRef.current,
        { autoAlpha: 1, y: 0, duration: per * 0.4, ease: "none" },
        introEnd,
      );

      const isLast = (i) => i === STATES.length - 1;
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const segStart = introEnd + i * per;
        const segMid = segStart + per * 0.5;
        const segEnd = segStart + per;

        tl.fromTo(
          el,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: segMid - segStart, ease: "none" },
          segStart,
        );

        if (!isLast(i)) {
          tl.to(
            el,
            { autoAlpha: 0, y: -20, duration: segEnd - segMid, ease: "none" },
            segMid,
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
      {/* خلفية المشهد ثلاثي الأبعاد (شفافة، تكشف خلفية الصفحة) */}
      <HeroScene3D ref={sceneRef} className="absolute inset-0 z-0" />

      {/* العنوان الافتتاحي — يتصغر ويرتفع ويختفي مع أول سكرول */}
      <div
        ref={introRef}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          Turki Omar Group
        </h1>
        <p className="max-w-md text-base text-slate md:text-lg">
          الدقة طبيعتنا، والاستدامة جوهر عملنا
        </p>
      </div>

      {/* الكرت الزجاجي: يحمل نصوص من نحن / رؤيتنا / تركيزنا */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        <div
          ref={cardRef}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/55" />
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(26px)",
              WebkitBackdropFilter: "blur(26px)",
              filter: "url(#liquid-glass)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 45%)",
            }}
          />

          <div className="relative h-[260px] px-8 py-10 md:h-[300px] md:px-12">
            {STATES.map((s, i) => (
              <div
                key={s.key}
                ref={(el) => (textRefs.current[i] = el)}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center opacity-0"
              >
                <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {s.heading}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* مؤشر تقدم جانبي (يمين الشاشة) */}
      <div className="pointer-events-none absolute top-1/2 right-8 z-10 hidden h-40 w-px -translate-y-1/2 bg-line md:block">
        <div
          ref={progressDotRef}
          className="absolute right-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          style={{ top: "0%" }}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.3em] text-slate-light uppercase">
        Scroll
      </div>
    </section>
  );
}