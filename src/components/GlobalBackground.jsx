import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// خطوط منحنية متدفقة — نفس فكرة "FloatingPaths" (مسارات SVG متعددة الطبقات)
// بس معاد بناؤها بـ GSAP بدل framer-motion، ومونوكروم يطابق باقي هوية الموقع
function buildPaths(count, position) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${position}-${i}`,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    opacity: 0.08 + i * 0.025,
    width: 0.5 + i * 0.03,
  }));
}

export default function GlobalBackground() {
  const linesRef = useRef(null);
  const pathsTlRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 7 : 14;
    const paths = [...buildPaths(count, 1), ...buildPaths(count, -1)];

    const ctx = gsap.context(() => {
      const pathEls = linesRef.current.querySelectorAll("path");

      // كل خط يرسم نفسه ببطء ويتنفس، بحلقة لا نهائية — نفس روح المرجع الأصلي
      const tl = gsap.timeline({ repeat: -1 });
      pathEls.forEach((el, i) => {
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len * 0.7}`;
        tl.to(
          el,
          {
            strokeDashoffset: -len * 0.3,
            duration: 22 + (i % 7) * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          i * 0.15,
        );
      });
      pathsTlRef.current = tl;

      // شدة الخلفية حسب القسم: خفيفة بالهيرو، صفر بقسم الشركات (خلفيته الخاصة غامقة)،
      // وتتصاعد تدريجيًا من قسم الخدمات لين نهاية الصفحة.
      // نقيس مواقع الأقسام مباشرة من الـ DOM كل فريم بدل الاعتماد على start/end
      // محسوبة مسبقًا من ScrollTrigger، لأن أقسام الهيرو والشركات نفسها pinned
      // وتغيّر ارتفاع الصفحة ديناميكيًا — القياس المباشر أوثق وما يتصادم معها.
      gsap.set(linesRef.current, { opacity: 0.15 });

      const companies = document.getElementById("companies");
      const services = document.getElementById("services");
      let wasZero = false;

      const updateIntensity = () => {
        if (!companies || !services) return;
        const mid = window.innerHeight / 2;
        const cRect = companies.getBoundingClientRect();
        const sRect = services.getBoundingClientRect();

        let target;
        if (cRect.top < mid && cRect.bottom > mid) {
          target = 0;
        } else if (sRect.top > mid) {
          target = 0.15;
        } else {
          const vh = window.innerHeight;
          const total = document.documentElement.scrollHeight - vh;
          const startY = window.scrollY + sRect.top;
          const progress =
            total > startY
              ? Math.min(1, Math.max(0, (window.scrollY - startY) / (total - startY)))
              : 1;
          target = 0.35 + progress * 0.55;
        }

        gsap.to(linesRef.current, {
          opacity: target,
          duration: 0.4,
          ease: "sine.out",
          overwrite: true,
        });

        const zeroNow = target === 0;
        if (zeroNow && !wasZero) pathsTlRef.current?.pause();
        if (!zeroNow && wasZero) pathsTlRef.current?.play();
        wasZero = zeroNow;
      };

      gsap.ticker.add(updateIntensity);

      const handleVisibility = () => {
        if (document.hidden) {
          pathsTlRef.current?.pause();
        } else if (linesRef.current && gsap.getProperty(linesRef.current, "opacity") > 0) {
          pathsTlRef.current?.play();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        gsap.ticker.remove(updateIntensity);
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    });

    return () => ctx.revert();
  }, []);

  const isMobileInit = typeof window !== "undefined" && window.innerWidth < 768;
  const initCount = isMobileInit ? 7 : 14;
  const initialPaths = [...buildPaths(initCount, 1), ...buildPaths(initCount, -1)];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <div
        className="animate-drift absolute -top-[20%] -right-[10%] h-[70vh] w-[70vw] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.09), rgba(0,0,0,0.03) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[30%] -left-[15%] h-[55vh] w-[55vw] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.06), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, transparent 40%)",
        }}
      />

      <div ref={linesRef} className="absolute inset-0 text-ink">
        <svg
          className="h-full w-full"
          viewBox="0 0 696 316"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {initialPaths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
