import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BAR_COUNT = 48;

function seededHeights(count) {
  // deterministic pseudo-random pattern for an equalizer look
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

export default function BlackoutTransitionSection() {
  const sectionRef = useRef(null);
  const vignetteRef = useRef(null);
  const headingRef = useRef(null);
  const barsWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(vignetteRef.current, { scaleX: 0 });
      gsap.set(headingRef.current, { color: "#5a5a5a", opacity: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(vignetteRef.current, { scaleX: 1, ease: "none" }, 0).to(
        headingRef.current,
        { color: "#ffffff", opacity: 1, ease: "none" },
        0,
      ).to(
        barsWrapRef.current,
        { opacity: 0, ease: "none" },
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div ref={barsWrapRef} className="absolute inset-0 flex items-end">
        {HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${h}%`,
              background: TONES[i],
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      <div
        ref={vignetteRef}
        className="absolute inset-0 origin-center bg-black"
        style={{
          transform: "scaleX(0)",
          maskImage:
            "radial-gradient(ellipse 60% 90% at 50% 50%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 90% at 50% 50%, black 55%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-0" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <h2
          ref={headingRef}
          className="max-w-3xl text-center text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Excellence, Engineered
        </h2>
      </div>
    </section>
  );
}
