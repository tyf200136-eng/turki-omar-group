import { motion } from "framer-motion";

export default function ContactSection() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-8 md:px-12">
      <div className="rounded-[28px] bg-mist p-8 md:p-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              <span className="font-bold text-ink">لنبني معاً</span>{" "}
              <span className="font-normal text-slate">قيمة تدوم.</span>
            </h2>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate md:text-base">
              سواء كنت تدرس فرصة للشراكة أو ترغب ببساطة في معرفة المزيد عن المجموعة، يسعدنا دائماً تواصلك معنا.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="الاسم الكامل"
                className="w-full rounded-full border border-line bg-paper px-6 py-3.5 text-sm text-ink placeholder:text-slate-light focus:border-ink focus:outline-none"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full rounded-full border border-line bg-paper px-6 py-3.5 text-sm text-ink placeholder:text-slate-light focus:border-ink focus:outline-none"
              />
              <textarea
                placeholder="حدثنا عن مشروعك…"
                rows={5}
                className="w-full resize-none rounded-3xl border border-line bg-paper px-6 py-4 text-sm text-ink placeholder:text-slate-light focus:border-ink focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="mt-2 w-full rounded-full bg-ink py-4 text-sm font-medium tracking-wide text-paper"
              >
                إرسال
              </motion.button>
            </form>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[24px] md:min-h-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(155deg, #3d3d3d 0%, #1c1c1c 55%, #060606 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 55%)",
              }}
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/45 px-5 py-3 text-xs font-medium text-white backdrop-blur-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3.5l4 3V7.5l-4 3Z"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              Book a Call
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
