import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "#companies", label: "شركاتنا" },
  { href: "#services", label: "خدماتنا" },
  { href: "#approach", label: "لماذا نحن" },
  { href: "#work", label: "أعمالنا" },
  { href: "#contact", label: "اتصل بنا" },
];

export default function Header() {
  const barRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // نقفل القائمة تلقائيًا لو الشاشة كبرت لعرض سطح المكتب (مثلاً تدوير الجوال
  // لآيباد بالعرض) عشان ما تظل القائمة مفتوحة فوق نافبار سطح المكتب
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setMenuOpen(false);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

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
      <div
        className={`relative mx-auto max-w-6xl overflow-hidden border border-black/10 shadow-2xl transition-[border-radius] duration-200 ${
          menuOpen ? "rounded-[28px]" : "rounded-full"
        }`}
      >
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
          <a href="#hero" className="flex min-w-0 shrink items-center gap-2.5">
            {/* لوقو الشركة — يبقى بلونه الأصلي الأسود بدون أي فلتر */}
            <img
              src="/logos/logo-header.png"
              alt="Turki Omar Group"
              className="h-11 w-auto max-w-[55vw] md:h-14 md:max-w-none"
            />
          </a>

          <nav className="hidden items-center gap-8 text-sm text-ink/80 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-opacity hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* زر القائمة — يظهر بعرض الجوال/الآيباد بس */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            className="relative flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className="h-px w-5 bg-ink transition-transform duration-300"
              style={
                menuOpen
                  ? { transform: "translateY(3.5px) rotate(45deg)" }
                  : undefined
              }
            />
            <span
              className="h-px w-5 bg-ink transition-transform duration-300"
              style={
                menuOpen
                  ? { transform: "translateY(-3.5px) rotate(-45deg)" }
                  : undefined
              }
            />
          </button>
        </div>

        {/* القائمة المنسدلة للجوال/الآيباد */}
        <div
          className="relative grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden"
          style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
        >
          <div className="min-h-0">
            <nav className="flex flex-col gap-1 border-t border-black/10 px-6 py-4 text-ink/80">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-black/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}