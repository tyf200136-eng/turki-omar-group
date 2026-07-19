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
  const rightGroupRef = useRef(null);
  const leftGroupRef = useRef(null);
  const pathsTlRef = useRef(null);

  useEffect(() => {
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
      gsap.set(linesRef.current, { opacity: 1 });
      gsap.set([rightGroupRef.current, leftGroupRef.current], { opacity: 0.15 });

      const companies = document.getElementById("companies");
      const services = document.getElementById("services");
      const approach = document.getElementById("approach");
      const contact = document.getElementById("contact");
      let wasZero = false;

      const clamp01 = (v) => Math.min(1, Math.max(0, v));
      // تقدّم محلي داخل القسم نفسه (0→1) بالاعتماد على ارتفاعه الحالي هو فقط،
      // مش على طول الصفحة الكلي. هذا يمنع مشكلة كروت الخدمات اللي تتمدد
      // تدريجيًا وتخلي "طول الصفحة" يتغيّر لحظيًا ويشوّه أي حساب مبني عليه.
      const localProgress = (rect, mid) =>
        rect ? clamp01((mid - rect.top) / rect.height) : 0;

      const updateIntensity = () => {
        if (!companies || !services) return;
        const mid = window.innerHeight / 2;
        const cRect = companies.getBoundingClientRect();
        const sRect = services.getBoundingClientRect();
        const aRect = approach?.getBoundingClientRect();
        const ctRect = contact?.getBoundingClientRect();

        // choreography اتجاهية: كل مجموعة (يمين/يسار) لها مسار شدة مستقل بدل ما
        // تتحركا سوا بنفس الشدة — كل قسم كبير يعطي دور لجهة ويخفت الثانية
        // (بدون ما تختفي بالكامل) عشان يصير له "توقيع" بصري خاص بدل التكرار.
        let containerTarget = 1;
        let rightTarget;
        let leftTarget;

        if (cRect.top < mid && cRect.bottom > mid) {
          containerTarget = 0; // قسم الشركات له خلفيته الخاصة
          rightTarget = 0;
          leftTarget = 0;
        } else if (sRect.top > mid) {
          containerTarget = 0.15; // قبل الخدمات (الهيرو)
          rightTarget = 0.15;
          leftTarget = 0.15;
        } else if (!aRect || aRect.top > mid) {
          // داخل الخدمات: الجهتين متساويتين، تصعدان سوا
          const v = 0.35 + localProgress(sRect, mid) * 0.2; // 0.35 → 0.55
          rightTarget = v;
          leftTarget = v;
        } else if (!ctRect || ctRect.top > mid) {
          // "لماذا نحن": اليمين ياخذ الدور ويتصاعد، اليسار يخفت (بدون اختفاء كامل)
          const p = localProgress(aRect, mid);
          rightTarget = 0.55 + p * 0.35; // 0.55 → 0.9
          leftTarget = 0.55 - p * 0.4; // 0.55 → 0.15
        } else {
          // من التواصل للفوتر: اليسار ياخذ الدور، اليمين يخفت لحضور خفيف بس
          const p = localProgress(ctRect, mid);
          leftTarget = 0.15 + p * 0.75; // 0.15 → 0.9
          rightTarget = 0.9 - p * 0.75; // 0.9 → 0.15
        }

        gsap.to(linesRef.current, {
          opacity: containerTarget,
          duration: 0.4,
          ease: "sine.out",
          overwrite: true,
        });
        gsap.to(rightGroupRef.current, {
          opacity: rightTarget,
          duration: 0.6,
          ease: "sine.out",
          overwrite: true,
        });
        gsap.to(leftGroupRef.current, {
          opacity: leftTarget,
          duration: 0.6,
          ease: "sine.out",
          overwrite: true,
        });

        const zeroNow = containerTarget === 0;
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
  const rightPaths = buildPaths(initCount, 1);
  const leftPaths = buildPaths(initCount, -1);

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
          <g ref={rightGroupRef}>
            {rightPaths.map((path) => (
              <path
                key={path.id}
                d={path.d}
                stroke="currentColor"
                strokeWidth={path.width}
                strokeOpacity={path.opacity}
              />
            ))}
          </g>
          <g ref={leftGroupRef}>
            {leftPaths.map((path) => (
              <path
                key={path.id}
                d={path.d}
                stroke="currentColor"
                strokeWidth={path.width}
                strokeOpacity={path.opacity}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}