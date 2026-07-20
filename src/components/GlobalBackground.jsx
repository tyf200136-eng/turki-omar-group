import { useEffect, useRef } from "react";

// شبكة نقاط متصلة (particle network) — نفس فكرة مرجع "NeuralMesh"،
// بس بلون مونوكروم واحد (أسود) يطابق هوية المجموعة بدل الألوان الحيوية،
// وبدون حاجة لـ three.js أو WebGL — canvas عادي ثنائي الأبعاد وخفيف على الأداء.
const AREA_DIVISOR = 15000; // كثافة النقاط (رقم أكبر = نقاط أقل)
const MAX_PARTICLES = 90;
const BASE_LINK_DIST = 125; // أقصى مسافة يترسم فيها خط بين نقطتين
const MOUSE_LINK_DIST = 150;
const DOT_COLOR = "10,10,10"; // يطابق --color-ink

export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const companies = document.getElementById("companies");
    const services = document.getElementById("services");

    const mouse = { x: -9999, y: -9999 };
    let scrollEnergy = 0;
    let targetOpacity = 0;
    let displayOpacity = 0;
    let particles = [];
    let width = 0;
    let height = 0;
    let rafId = null;
    let running = true;

    const setupSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.min(
        Math.round((width * height) / AREA_DIVISOR),
        MAX_PARTICLES,
      );
      const target = Math.max(count, 18);

      if (particles.length < target) {
        for (let i = particles.length; i < target; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: 1.5 + Math.random() * 0.5,
          });
        }
      } else if (particles.length > target) {
        particles = particles.slice(0, target);
      }
    };
    setupSize();
    window.addEventListener("resize", setupSize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    const handleScroll = () => {
      if (!prefersReducedMotion) {
        scrollEnergy = Math.min(scrollEnergy + 0.15, 1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    // الشدة تتحدد حسب موقعك بالصفحة: صفر بالهيرو (يبقى اللوقو ثلاثي الأبعاد هو
    // النجم بدون أي إزعاج خلفه) وصفر بالشركات (خلفيتها الخاصة الغامقة)،
    // وتظهر بثبات من الخدمات لين الفوتر بدون ما تختفي أبد — نفس المرجع تمامًا
    // (عندهم الشبكة مستثناة من قسم الهيرو لأن له فيديو خاص فيه).
    const updateTargetOpacity = () => {
      if (!companies || !services) {
        targetOpacity = 0;
        return;
      }
      const mid = window.innerHeight / 2;
      const cRect = companies.getBoundingClientRect();
      const sRect = services.getBoundingClientRect();

      if (cRect.top < mid && cRect.bottom > mid) {
        targetOpacity = 0; // قسم الشركات
      } else if (sRect.top > mid) {
        targetOpacity = 0; // الهيرو: مستثنى تمامًا
      } else {
        const p = clamp01((mid - sRect.top) / sRect.height);
        targetOpacity = Math.min(1, 0.55 + p * 0.45); // يتصاعد بالخدمات ويثبت لين الفوتر
      }
    };

    const loop = () => {
      if (!running) return;
      updateTargetOpacity();
      displayOpacity += (targetOpacity - displayOpacity) * 0.05;

      ctx.clearRect(0, 0, width, height);

      if (displayOpacity > 0.01) {
        scrollEnergy *= 0.94;
        const linkDist = BASE_LINK_DIST + scrollEnergy * 45;
        const energyBoost = 1 + scrollEnergy * 0.7;

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) {
            p.x = 0;
            p.vx *= -1;
          } else if (p.x > width) {
            p.x = width;
            p.vx *= -1;
          }
          if (p.y < 0) {
            p.y = 0;
            p.vy *= -1;
          } else if (p.y > height) {
            p.y = height;
            p.vy *= -1;
          }
        });

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDist) {
              const alpha =
                (1 - dist / linkDist) * 0.16 * energyBoost * displayOpacity;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${DOT_COLOR},${Math.min(alpha, 0.45)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          if (mouse.x >= 0) {
            const dxm = p1.x - mouse.x;
            const dym = p1.y - mouse.y;
            const dm = Math.sqrt(dxm * dxm + dym * dym);
            if (dm < MOUSE_LINK_DIST) {
              const alpha = (1 - dm / MOUSE_LINK_DIST) * 0.4 * displayOpacity;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${DOT_COLOR},${alpha})`;
              ctx.lineWidth = 1.1;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT_COLOR},${0.45 * displayOpacity})`;
          ctx.fill();
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      // إطار ثابت واحد بدون حلقة تحريك — احترامًا لتفضيل تقليل الحركة
      updateTargetOpacity();
      displayOpacity = targetOpacity;
      ctx.clearRect(0, 0, width, height);
    } else {
      loop();
    }

    return () => {
      running = false;
      window.removeEventListener("resize", setupSize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}