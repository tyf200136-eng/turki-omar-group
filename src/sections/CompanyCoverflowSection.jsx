import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightStreakBackground from "../components/LightStreakBackground.jsx";
import GlassFilterDefs from "../components/GlassFilterDefs.jsx";
import companies from "../utils/companies.js";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyCoverflowSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const n = cards.length;

      cards.forEach((card, i) => {
        gsap.set(card, {
          rotateY: 70,
          xPercent: 60,
          scale: 0.62,
          opacity: 0,
          z: -500,
          force3D: true,
        });
        if (i === 0) {
          gsap.set(card, { rotateY: 0, xPercent: 0, scale: 1, opacity: 1, z: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${n * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      tl.to(headingRef.current, { opacity: 0, duration: 0.35 }, 0.05);

      cards.forEach((card, i) => {
        if (i > 0) {
          tl.fromTo(
            card,
            { rotateY: 70, xPercent: 60, scale: 0.62, opacity: 0, z: -500 },
            { rotateY: 0, xPercent: 0, scale: 1, opacity: 1, z: 0, duration: 0.5 },
            i - 1 + 0.5,
          );
        }
        if (i < n - 1) {
          tl.to(
            card,
            { rotateY: -70, xPercent: -60, scale: 0.62, opacity: 0, z: -500, duration: 0.5 },
            i + 0.5,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <GlassFilterDefs />
      <LightStreakBackground />

      <div
        ref={headingRef}
        className="absolute top-16 left-1/2 z-20 -translate-x-1/2 text-center"
      >
        <span className="mb-2 block text-xs tracking-[0.3em] text-white/50 uppercase">
          Our Companies
        </span>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          A Portfolio Built to Endure
        </h2>
      </div>

      <div
        className="relative z-10 flex h-full w-full items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {companies.map((c, i) => (
          <div
            key={c.name}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute h-[64vh] w-[86vw] max-w-md overflow-hidden rounded-2xl md:h-[70vh] md:w-[36vw]"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "inset 0 0 2px 1px rgba(255,255,255,0.2)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: c.gradient }}
            />
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                filter: "url(#liquid-glass)",
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

            <div className="relative z-10 flex h-full flex-col justify-start p-6 md:p-8">
              <span className="mb-2 text-[11px] tracking-[0.25em] text-white/60 uppercase">
                {c.sector}
              </span>
              <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
                {c.name}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-white/70">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
