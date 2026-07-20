import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// حط هنا مسارات صور الأعمال — لازم تكون داخل مجلد public
// (مثال: لو الصورة بالمسار public/work/1.jpg، اكتب هنا "/work/1.jpg")
const WORK_IMAGES = [
  "/work/1.png",
  "/work/2.png",
  "/work/3.png",
  "/work/4.png",
  "/work/5.png",
  "/work/6.png",
];

// عروض متفاوتة للصور (بوحدة svh) عشان تجي متفاوتة القياس زي الإلهام، مو صف موحّد
const WIDTHS = [24, 17, 27, 15, 22, 19];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper py-20 md:py-28"
    >
      {/* الاسم الكبير خلف الصور — طبقة خلفية تنكشف فوق وتحت شريط الصور وتختفي وراها */}
      <h3
        ref={headingRef}
        aria-hidden="true"
        className="font-display pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 text-center leading-none font-bold tracking-tighter whitespace-nowrap text-ink select-none"
        style={{ fontSize: "clamp(3.5rem, 19vw, 18rem)" }}
      >
        أعمالنا
      </h3>

      {/* شريط الصور — يتكرر بلا نهاية بدون أي قفزة أو فراغ، وبفراغات بين الصور
          عشان كلمة "أعمالنا" تنقرأ من بينها وهي تتحرك. الفراغ margin على كل صورة
          (مو gap على الحاوية) عشان كل نسخة توصّل بحافتها بحافة الثانية بالضبط،
          وانتقال -50% يطابق نهاية النسخة الأولى تمامًا وتصير الحلقة سلسة */}
      <div className="relative z-10 overflow-hidden">
        <div className="animate-marquee flex w-max">
          {[...WORK_IMAGES, ...WORK_IMAGES].map((src, i) => (
            <div
              key={i}
              className="me-6 h-[38vh] flex-shrink-0 md:me-10 md:h-[52vh]"
              style={{ width: `${WIDTHS[i % WIDTHS.length]}vh` }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
