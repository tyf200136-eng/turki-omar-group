const SERVICES = [
  {
    num: "01",
    title: "Strategic Investment",
    desc: "Disciplined capital allocation across sectors we understand deeply, held for decades rather than quarters.",
  },
  {
    num: "02",
    title: "Operational Excellence",
    desc: "Hands-on stewardship of every portfolio company, with shared standards for quality and governance.",
  },
  {
    num: "03",
    title: "Long-Term Partnership",
    desc: "We build with founders and operators as partners, not just capital — aligned for the long run.",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
      <div className="mb-16 flex flex-col gap-4 md:mb-24 md:max-w-xl">
        <span className="text-xs tracking-[0.3em] text-slate uppercase">
          What We Do
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          A Disciplined Approach to Building Value
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {SERVICES.map((s) => (
          <div
            key={s.num}
            className="border-t border-line pt-6 transition-colors"
          >
            <span className="mb-6 block text-sm text-slate-light">
              {s.num}
            </span>
            <h3 className="mb-3 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="text-sm leading-relaxed text-slate">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
