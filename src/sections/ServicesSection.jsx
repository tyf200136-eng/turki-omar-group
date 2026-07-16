import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconStrategicInvestment,
  IconOperationalExcellence,
  IconLongTermPartnership,
  IconRiskGovernance,
  IconTalentLeadership,
  IconRegionalExpansion,
} from "../components/ServiceIcons.jsx";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Strategic Investment",
    icon: IconStrategicInvestment,
    desc: "Disciplined capital allocation across sectors we understand deeply, held for decades rather than quarters.",
  },
  {
    title: "Operational Excellence",
    icon: IconOperationalExcellence,
    desc: "Hands-on stewardship of every portfolio company, with shared standards for quality and governance.",
  },
  {
    title: "Long-Term Partnership",
    icon: IconLongTermPartnership,
    desc: "We build with founders and operators as partners, not just capital — aligned for the long run.",
  },
  {
    title: "Risk & Governance",
    icon: IconRiskGovernance,
    desc: "Rigorous oversight frameworks that protect value across every entity in the group, at every stage of growth.",
  },
  {
    title: "Talent & Leadership",
    icon: IconTalentLeadership,
    desc: "Identifying and empowering the operators who run our companies day to day, with clear accountability.",
  },
  {
    title: "Regional Expansion",
    icon: IconRegionalExpansion,
    desc: "Scaling proven models into new markets across the region, without compromising on quality or brand.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);
  const bodyRefs = useRef([]);
  const iconRefs = useRef([]);
  const iconShapesRef = useRef([]); // كل عنصر: [{ el, length }, ...] لكل أيقونة
  const progressLineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      // نحسب طول كل خط/شكل داخل كل أيقونة مرة وحدة، ونهيئها مخفية (جاهزة للرسم)
      iconRefs.current.forEach((svg, i) => {
        if (!svg) return;
        const shapes = svg.querySelectorAll("path, circle, line");
        const list = [];
        shapes.forEach((el) => {
          let length = 40; // قيمة احتياطية لو getTotalLength غير مدعومة
          try {
            length = el.getTotalLength();
          } catch {
            // تجاهل، نستخدم القيمة الاحتياطية
          }
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;

          // النقاط الصغيرة (دوائر نصف قطرها صغير) نعتبرها "nodes" تنبض بعد الرسم
          const isNode =
            el.tagName === "circle" && parseFloat(el.getAttribute("r")) <= 3.5;

          list.push({ el, length, isNode });
        });
        iconShapesRef.current[i] = list;
      });

      // خط التقدم العام: نسبة من كامل القسم (يمتلئ تدريجيًا، مستقل عن الكروت)
      ScrollTrigger.create({
        trigger: timeline,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.4,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            progressLineRef.current.style.height = `${self.progress * 100}%`;
          }
        },
      });

// كل كرت له ScrollTrigger مستقل مربوط بموضعه هو بالذات:
      // النص/الارتفاع يبقى مربوط بالسكرول (يفتح ويقفل حسب موضعك، قابل للعكس)
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const body = bodyRefs.current[i];
        if (!body) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 78%",
          end: "top 30%",
          scrub: 0.4,
          onUpdate: (self) => {
            body.style.height = `${self.progress * 17}em`;
          },
        });
      });

      // أنيميشن الأيقونة: "مشهد" يشتغل مرة وحدة أول ما توصل الكرت، ويكمل لحاله
      // بدون علاقة بالسكرول بعدها (رسم متتابع، وبعده نبض مستمر بالنقاط)
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const shapes = iconShapesRef.current[i] || [];
        if (!shapes.length) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const lines = shapes.filter((s) => !s.isNode).map((s) => s.el);
            const nodes = shapes.filter((s) => s.isNode).map((s) => s.el);

            const tl = gsap.timeline();

            tl.to(lines, {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.out",
              stagger: 0.1,
            });

            if (nodes.length) {
              tl.to(
                nodes,
                {
                  strokeDashoffset: 0,
                  duration: 0.4,
                  ease: "back.out(2)",
                  stagger: 0.08,
                },
                "-=0.5",
              );

              // بعد ما يخلص الرسم، النقاط تنبض بشكل مستمر ولا نهائي
              tl.to(nodes, {
                opacity: 0.35,
                duration: 0.9,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                stagger: 0.25,
              });
            }
          },
        });
      });
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-16 flex flex-col gap-4 md:mb-24 md:max-w-xl">
        <span className="text-xs tracking-[0.3em] text-slate uppercase">
          What We Do
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          Innovation, Engineered
        </h2>
      </div>

      <div ref={timelineRef} className="relative">
        {/* الخط المنقط الثابت، يمتد طول القسم كامل */}
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-line md:block" />

        {/* خط التقدم: يمتلئ تدريجيًا حسب السكرول، فوق الخط المنقط */}
        <div
          ref={progressLineRef}
          className="absolute top-0 left-1/2 hidden w-px -translate-x-1/2 bg-ink md:block"
          style={{ height: "0%" }}
        />

        <div className="flex flex-col gap-24 md:gap-[70px]">
          {SERVICES.map((s, i) => {
            const isRight = i % 2 === 1;
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`relative md:w-[46%] ${
                  isRight ? "md:ml-auto md:pl-10" : "md:mr-auto md:pr-10"
                }`}
              >
                {/* نقطة على الخط المنتصف */}
                <div
                  className="absolute top-1 hidden h-2.5 w-2.5 rounded-full bg-ink md:block"
                  style={isRight ? { left: "-1.45rem" } : { right: "-1.45rem" }}
                />

                <span className="mb-3 block text-sm text-slate-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-2xl font-semibold text-ink">
                  {s.title}
                </h3>

                <div className="h-[17em]">
                  <div
                    ref={(el) => (bodyRefs.current[i] = el)}
                    className="overflow-hidden transition-none"
                    style={{ height: "0em" }}
                  >
                    <div className="mb-4 flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-mist">
                      <Icon
                        ref={(el) => (iconRefs.current[i] = el)}
                        className="h-24 w-24 text-ink md:h-28 md:w-28"
                      />
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-slate">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}