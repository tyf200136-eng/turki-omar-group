import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- الأيقونات: كل عنصر مهم عليه data-role عشان نقدر نحركه بشكل مخصص بعدين ---

const IconStartupManagement = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g data-role="gear" style={{ transformOrigin: "50px 75px" }}>
      <circle cx="50" cy="75" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 60 L50 65 M50 85 L50 90 M35 75 L40 75 M60 75 L65 75 M40 65 L44 69 M56 81 L60 85 M40 85 L44 81 M56 69 L60 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <rect x="35" y="22" width="30" height="43" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="42" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="42" y1="38" x2="46" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="42" y1="46" x2="46" y2="46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="54" y1="30" x2="58" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="54" y1="38" x2="58" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="54" y1="46" x2="58" y2="46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M46 65 L46 58 L54 58 L54 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <g data-role="rocket">
      <path d="M15 65 C 25 55, 30 35, 80 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M72 15 L80 15 L80 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
));
IconStartupManagement.displayName = "IconStartupManagement";

const IconStrategicPartnerships = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 35 H35 C35 27, 41 22, 47 22 C53 22, 59 27, 59 35 H65 V50 C58 50, 53 55, 53 62 C53 69, 58 74, 65 74 V80 H15 V35 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M85 65 H65 C65 73, 59 78, 53 78 C47 78, 41 73, 41 65 H35 V50 C42 50, 47 45, 47 38 C47 31, 42 26, 35 26 V20 H85 V65 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path data-role="spark" d="M50 42 L52 47 L57 49 L52 51 L50 56 L48 51 L43 49 L48 47 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" style={{ transformOrigin: "50px 49px" }} />
  </svg>
));
IconStrategicPartnerships.displayName = "IconStrategicPartnerships";

const IconScalableOperations = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect data-role="node" x="15" y="42" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="50" x2="26" y2="50" stroke="currentColor" strokeWidth="1.5" />
    <g data-role="connector">
      <path d="M31 50 L42 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 47 L41 50 L38 53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <circle data-role="node" cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 38 L50 42 M50 58 L50 62 M38 50 L42 50 M58 50 L62 50 M41 41 L44 44 M56 56 L59 59 M41 59 L44 56 M56 41 L59 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <g data-role="connector">
      <path d="M58 50 L69 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M65 47 L68 50 L65 53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <rect data-role="node" x="69" y="42" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path data-role="node" d="M74 38 H89 V53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path data-role="node" d="M79 34 H94 V49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));
IconScalableOperations.displayName = "IconScalableOperations";

const IconInvestmentGrowth = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 80 C 35 80, 45 40, 85 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <line data-role="bar" x1="30" y1="80" x2="30" y2="70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transformOrigin: "30px 80px" }} />
    <line data-role="bar" x1="50" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transformOrigin: "50px 80px" }} />
    <line data-role="bar" x1="70" y1="80" x2="70" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transformOrigin: "70px 80px" }} />
    <circle data-role="node" cx="85" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.5" style={{ transformOrigin: "85px 20px" }} />
    <line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M40 65 L52 48 L65 35 L82 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M74 18 L82 18 L82 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));
IconInvestmentGrowth.displayName = "IconInvestmentGrowth";

const IconGovernanceOversight = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path data-role="shield" d="M25 20 H75 C75 20, 75 55, 50 78 C25 55, 25 20, 25 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformOrigin: "50px 20px" }} />
    <g data-role="key">
      <line x1="50" y1="30" x2="50" y2="62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="36" x2="64" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 36 L31 48 H41 L36 36 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M64 36 L59 48 H69 L64 36 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
));
IconGovernanceOversight.displayName = "IconGovernanceOversight";

const IconTechSolutions = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g data-role="frame" style={{ transformOrigin: "54px 40px" }}>
      <path d="M50 18 C33 18, 30 35, 38 48 C42 53, 42 58, 42 63 H50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 18 C62 18, 66 26, 64 34 M61 44 C60 48, 58 53, 58 63 H50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 68 H58 M44 73 H56 M46 78 H54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path data-role="spark" d="M47 48 L50 38 L53 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <line data-role="pulseline" x1="50" y1="18" x2="70" y2="25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle data-role="node" cx="70" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <line data-role="pulseline" x1="64" y1="34" x2="74" y2="38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle data-role="node" cx="74" cy="38" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <line data-role="pulseline" x1="61" y1="44" x2="71" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle data-role="node" cx="71" cy="50" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
));
IconTechSolutions.displayName = "IconTechSolutions";

const SERVICES = [
  {
    title: "تأسيس وتشغيل وإدارة الشركات",
    icon: IconStartupManagement,
    desc: "تأسيس وتشغيل وإدارة الشركات الناشئة والمتوسطة لضمان استمراريتها ونموها التجاري بكفاءة.",
  },
  {
    title: "بناء الشراكات والاستحواذ",
    icon: IconStrategicPartnerships,
    desc: "بناء الشراكات الاستراتيجية المتينة والاستحواذ المباشر على الفرص الاستثمارية الواعدة في السوق.",
  },
  {
    title: "نماذج تشغيل مرنة وقابلة للتوسع",
    icon: IconScalableOperations,
    desc: "تصميم وتطبيق نماذج تشغيلية فعالة وقابلة للتوسع السريع تخدم متطلبات العصر الجديد للشركات والمؤسسات.",
  },
  {
    title: "الخطط الاستثمارية والنمو المؤسسي",
    icon: IconInvestmentGrowth,
    desc: "تطوير خطط استثمارية دقيقة ودعم بنية النمو المؤسسي لتحقيق قيمة وأصول مستدامة وطويلة المدى.",
  },
  {
    title: "الإشراف الكامل والحوكمة",
    icon: IconGovernanceOversight,
    desc: "الإشراف على الحوكمة الرشيدة، والإدارات المالية والتشغيلية الصارمة لحماية وحفظ قيم الكيانات التابعة.",
  },
  {
    title: "الحلول الإبداعية والتقنية",
    icon: IconTechSolutions,
    desc: "تقديم وتطبيق حزمة متكاملة من الحلول الإبداعية والتقنية من خلال منظومة شركاتنا المتخصصة والمحترفة.",
  },
];

// المشاهد المخصصة لكل أيقونة — تشتغل مرة وحدة بعد ما يخلص الرسم، وتستمر لحالها للأبد
const ICON_SCENES = [
  // 0: تأسيس الشركات — الترس يدور، الصاروخ يرتفع ويستقر
  (svg) => {
    const gear = svg.querySelector('[data-role="gear"]');
    const rocket = svg.querySelector('[data-role="rocket"]');
    if (gear) gear.classList.add("icon-gear-spin");
    if (rocket) {
      gsap.to(rocket, {
        y: -3.5,
        x: 1.5,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  },
  // 1: الشراكات — الشرارة/نقطة الربط تنبض وتكبر شوي
  (svg) => {
    const spark = svg.querySelector('[data-role="spark"]');
    if (spark) {
      gsap.to(spark, {
        scale: 1.35,
        opacity: 0.45,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  },
  // 2: نماذج التشغيل — المكعبات تنبض بهدوء، أسهم الربط تومض
  (svg) => {
    const nodes = svg.querySelectorAll('[data-role="node"]');
    const connectors = svg.querySelectorAll('[data-role="connector"]');
    if (nodes.length) {
      gsap.to(nodes, {
        opacity: 0.45,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }
    if (connectors.length) {
      gsap.to(connectors, {
        opacity: 0.3,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }
  },
  // 3: النمو الاستثماري — الأعمدة "تتنفس" لفوق، والنقطة بالقمة تنبض
  (svg) => {
    const bars = svg.querySelectorAll('[data-role="bar"]');
    const node = svg.querySelector('[data-role="node"]');
    if (bars.length) {
      gsap.to(bars, {
        scaleY: 1.08,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }
    if (node) {
      gsap.to(node, {
        scale: 1.25,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  },
  // 4: الحوكمة — الدرع يميل بهدوء، المفتاح ينبض
  (svg) => {
    const shield = svg.querySelector('[data-role="shield"]');
    const key = svg.querySelector('[data-role="key"]');
    if (shield) {
      gsap.to(shield, {
        rotate: 2.5,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
    if (key) {
      gsap.to(key, {
        opacity: 0.4,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  },
  // 5: الحلول التقنية — إشارات تسري بالخطوط، الإطار يتنفس بهدوء
  (svg) => {
    const frame = svg.querySelector('[data-role="frame"]');
    const nodes = svg.querySelectorAll('[data-role="node"]');
    const pulseLines = svg.querySelectorAll('[data-role="pulseline"]');

    if (frame) {
      gsap.to(frame, {
        scale: 1.03,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
    if (nodes.length) {
      gsap.to(nodes, {
        opacity: 0.4,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.25,
      });
    }
    pulseLines.forEach((el, idx) => {
      let len = 20;
      try {
        len = el.getTotalLength();
      } catch {
        // تجاهل
      }
      el.style.strokeDasharray = `${len * 0.35} ${len}`;
      gsap.to(el, {
        strokeDashoffset: -len,
        duration: 1.4,
        ease: "none",
        repeat: -1,
        delay: idx * 0.35,
      });
    });
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);
  const bodyRefs = useRef([]);
  const iconRefs = useRef([]);
  const iconShapesRef = useRef([]);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      iconRefs.current.forEach((svg, i) => {
        if (!svg) return;
        const shapes = svg.querySelectorAll("path, circle, line, rect");
        const list = [];
        shapes.forEach((el) => {
          let length = 40;
          try {
            length = el.getTotalLength();
          } catch {
            // fallback
          }
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;

          const isNode =
            el.tagName === "circle" && parseFloat(el.getAttribute("r")) <= 3.5;

          list.push({ el, length, isNode });
        });
        iconShapesRef.current[i] = list;
      });

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

      // الرسم التدريجي، وبعده مباشرة تشغيل المشهد المخصص لكل أيقونة
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const shapes = iconShapesRef.current[i] || [];
        if (!shapes.length) return;
        const svg = iconRefs.current[i];

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const nodes = shapes.filter((s) => s.isNode).map((s) => s.el);
            const lines = shapes.filter((s) => !s.isNode).map((s) => s.el);
            const sortedLines = [...lines].sort((a, b) => {
              const lenA = shapes.find((s) => s.el === a)?.length || 0;
              const lenB = shapes.find((s) => s.el === b)?.length || 0;
              return lenB - lenA;
            });

            const tl = gsap.timeline({
              onComplete: () => {
                const scene = ICON_SCENES[i];
                if (scene && svg) scene(svg);
              },
            });

            tl.to(sortedLines, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power3.out",
              stagger: 0.06,
            });

            if (nodes.length) {
              tl.to(
                nodes,
                {
                  strokeDashoffset: 0,
                  duration: 0.45,
                  ease: "back.out(1.7)",
                  stagger: 0.07,
                },
                "-=0.6",
              );
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
      dir="rtl"
    >
      <div className="mb-16 flex flex-col gap-4 md:mb-24 md:max-w-xl text-right">
        <span className="text-xs tracking-[0.3em] text-slate uppercase">
          ماذا نقدم
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          الابتكار الهندسي المتكامل
        </h2>
      </div>

      <div ref={timelineRef} className="relative">
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-line md:block" />

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
                className={`relative md:w-[46%] text-right ${
                  isRight ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                <div
                  className="absolute top-1 hidden h-2.5 w-2.5 rounded-full bg-ink md:block"
                  style={isRight ? { right: "-1.45rem" } : { left: "-1.45rem" }}
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