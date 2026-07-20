import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const barRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || !barRef.current) return;

    gsap.set(barRef.current, { autoAlpha: 0, y: -12 });

    const ctx = gsap.context(() => {
      // نفس مدة سكرول الهيرو بالضبط (+=350%)، والهيدر يظهر بنفس لحظة
      // اختفاء السلوقن وبداية "من نحن" (0.10 -> 0.17)
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=350%",
        scrub: 0.3,
        onUpdate: (self) => {
          const local = gsap.utils.clamp(
            0,
            1,
            (self.progress - 0.1) / (0.17 - 0.1),
          );
          gsap.set(barRef.current, {
            autoAlpha: local,
            y: -12 * (1 - local),
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header ref={barRef} className="fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-full border border-black/10 shadow-2xl">
        <div className="absolute inset-0 bg-white/55" />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            filter: "url(#liquid-glass)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(255, 255, 255, 0.73), rgba(255,255,255,0) 45%)",
          }}
        />

        <div className="relative flex items-center justify-between px-6 py-2.5 text-ink md:px-8 md:py-3">
          <a href="#hero" className="flex items-center gap-2.5">
            {/* لوقو الشركة — يبقى بلونه الأصلي الأسود بدون أي فلتر */}
            <img
              src="/logos/logo-header.png"
              alt="Turki Omar Group"
              className="h-11 w-auto md:h-14"
            />
          </a>

          <nav className="hidden items-center gap-8 text-sm text-ink/80 md:flex">
            <a href="#approach" className="transition-opacity hover:opacity-100">
              لماذا نحن
            </a>
            <a href="#companies" className="transition-opacity hover:opacity-100">
              شركاتنا
            </a>
            <a href="#services" className="transition-opacity hover:opacity-100">
              خدماتنا
            </a>
            <a href="#contact" className="transition-opacity hover:opacity-100">
              اتصل بنا
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}