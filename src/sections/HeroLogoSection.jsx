import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoMark from "../components/LogoMark.jsx";

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
    body: `أن ﻧﺼﻨﻊ الفرص وﻧﺪﻳﺮ اﻟﻤﺸﺎرﻳﻊ وﻧﻄﻮر اﻟﺤﻠﻮل وﺗﺤﻮﻳﻞ اﻷﻓﻜﺎر إﻟـﻰ ﻛﻴـﺎﻧـﺎت ﻧـﺎﺟﺤﺔ ونُمكن اﻟﺸﺮﻛـﺎت واﻟﻤﺸﺎرﻳـﻊ ﻣــن ﺗﺤـﻘـﻴـﻖ اﻟﻨـﻤـﻮ اﻟﻤـﺴﺘـﺪام ﻣــن ﺧــﻼل ﺗــﻘـﺪﻳـﻢ إدارة إﺣـﺘﺮاﻓـﻴﺔ ، ﺑﻨﻴـﺔ ﺗﺸﻐﻴﻠﻴﺔ ﻣـﺮﻧﺔ ، اﺳﺘﺜﻤﺎرات ذﻛـﻴﺔ ﺗﺴﻬﻢ ﻓﻲ ﺑﻨﺎء إﻗﺘﺼﺎد وﻃﻨﻲ ﻣﺴﺘﺪام.`,
  },
  {
    key: "focus",
    heading: "تركيزنا",
    body: "يتمحور تركيزنا حول دفع عجلة الابتكار من خلال تبني التكنولوجيا المتقدمة والاستراتيجيات الموجهة نحو المستقبل، وبناء شراكات استراتيجية قوية تخلق قيمة متبادلة وفرص نمو مستدامة، إلى جانب تقديم حلول تحول رقمي شاملة تُمكّن الشركات الحديثة والمؤسسات من تحقيق تطلعاتها.",
  },
];



// بس تغيّر بالحجم والسرعة بين الحالات — بدون أي حركة 3D (لا x/y ولا rotateY/rotateZ)
const ORBIT_STATES = [
  { scale: 1.0, speed: 40 },
  { scale: 1.4, speed: 90 },
  { scale: 0.75, speed: 20 },
];

export default function HeroLogoSection() {
  const sectionRef = useRef(null);
  const rotorRef = useRef(null);
  const scaleRef = useRef(null);
  const textRefs = useRef([]);
  const cardRef = useRef(null);
  const speedRef = useRef(ORBIT_STATES[0].speed);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // دوران مستمر حول نفسه، دايمًا شغال، سرعته تتغير حسب موضع السكرول
    const rotation = { angle: 0 };
    const tickerFn = (_time, deltaTime) => {
      const dt = deltaTime / 1000;
      rotation.angle += dt * speedRef.current;
      if (rotorRef.current) {
        rotorRef.current.style.transform = `rotate(${rotation.angle}deg)`;
      }
    };
    gsap.ticker.add(tickerFn);

    const ctx = gsap.context(() => {
      // الكرت الزجاجي مخفي بالبداية، يظهر تدريجيًا مع أول نص بس، مو من أول تحميل
      gsap.set(cardRef.current, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      ORBIT_STATES.slice(0, -1).forEach((state, i) => {
        const next = ORBIT_STATES[i + 1];
        const segStart = i / (ORBIT_STATES.length - 1);
        const segDuration = 1 / (ORBIT_STATES.length - 1);

        tl.to(
          scaleRef.current,
          {
            scale: next.scale,
            duration: segDuration,
            ease: "none",
            onUpdate: function () {
              const p = this.progress();
              speedRef.current = gsap.utils.interpolate(
                state.speed,
                next.speed,
                p,
              );
            },
          },
          segStart,
        );
      });

      const isLast = (i) => i === STATES.length - 1;
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const segStart = i / STATES.length;
        const segMid = (i + 0.5) / STATES.length;
        const segEnd = (i + 1) / STATES.length;

        // الكرت نفسه يظهر مع أول نص بس (i === 0)، وبعدها يفضل ظاهر
        if (i === 0) {
          tl.to(
            cardRef.current,
            { autoAlpha: 1, y: 0, duration: segMid - segStart, ease: "none" },
            segStart,
          );
        }

        tl.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: segMid - segStart, ease: "none" },
          segStart,
        );

        if (!isLast(i)) {
          tl.to(
            el,
            { autoAlpha: 0, y: -24, duration: segEnd - segMid, ease: "none" },
            segMid,
          );
        }
      });
    }, section);

    return () => {
      gsap.ticker.remove(tickerFn);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* اللوقو: أسود كامل، بمنتصف الشاشة، يدور حول نفسه بس (بدون أي حركة 3D) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={scaleRef}>
          <LogoMark
            rotorRef={rotorRef}
            scaleRef={scaleRef}
            idleSpin={false}
            className="h-[70vh] w-auto md:h-[88vh]"
          />
        </div>
      </div>

      {/* كرت زجاجي (Frosted) فوق اللوقو، يحمل كل النصوص */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
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
                <span className="font-arabic mb-3 text-sm tracking-[0.25em] text-white/60 uppercase">
                  {s.eyebrow}
                </span>
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-slate-light uppercase">
        Scroll
      </div>
    </section>
  );
}