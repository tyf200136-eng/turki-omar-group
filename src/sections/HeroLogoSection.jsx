import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoScene from "../components/LogoScene.jsx";

gsap.registerPlugin(ScrollTrigger);

const STATES = [
  {
    key: "about",
    eyebrow: "من نحن",
    heading: "About Us",
    body: "Turki Omar Group is a diversified holding company built on discipline, precision and a long-term view — investing where craftsmanship and scale meet.",
  },
  {
    key: "vision",
    eyebrow: "رؤيتنا",
    heading: "Our Vision",
    body: "To be the region's most trusted name in building enduring ventures — where every company we hold reflects the same standard of excellence.",
  },
  {
    key: "focus",
    eyebrow: "تركيزنا",
    heading: "Our Focus",
    body: "We concentrate capital and expertise on real estate, industry, and hospitality — sectors where patient ownership compounds into lasting value.",
  },
];

export default function HeroLogoSection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const textRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      const isLast = (i) => i === STATES.length - 1;
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const segStart = i / STATES.length;
        const segMid = (i + 0.5) / STATES.length;
        const segEnd = (i + 1) / STATES.length;

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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      <LogoScene progressRef={progressRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 md:grid-cols-2 md:px-12">
          <div className="relative h-[220px] md:h-[260px]">
            {STATES.map((s, i) => (
              <div
                key={s.key}
                ref={(el) => (textRefs.current[i] = el)}
                className="absolute inset-0 flex flex-col justify-center opacity-0"
              >
                <span className="font-arabic mb-3 text-sm tracking-[0.25em] text-slate uppercase">
                  {s.eyebrow}
                </span>
                <h2 className="mb-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  {s.heading}
                </h2>
                <p className="max-w-md text-base leading-relaxed text-slate md:text-lg">
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
