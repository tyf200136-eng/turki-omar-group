import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 500);

    // إعادة حساب ScrollTrigger لما يتغيّر العرض فعليًا (تدوير الجهاز، تغيير
    // حجم نافذة سطح المكتب) — بس نتجاهل تغيّر الطول لحاله، لأنه هذا اللي يصير
    // لما شريط عنوان المتصفح بالجوال يظهر/يختفي أثناء السكرول، وإعادة الحساب
    // في هذي اللحظة بالذات تكسر أقسام الـ pin وتسبب قفزة مفاجئة
    let lastWidth = window.innerWidth;
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        if (width === lastWidth) return;
        lastWidth = width;
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(t);
      clearTimeout(resizeTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);
}