const STATS = [
  { value: "6+", label: "Portfolio Companies" },
  { value: "20+", label: "Years of Combined Experience" },
  { value: "3", label: "Core Sectors" },
  { value: "1", label: "Standard, Always" },
];

export default function ApproachSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <span className="mb-4 block text-xs tracking-[0.3em] text-slate uppercase">
            Our Approach
          </span>
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Precision in Every Decision
          </h2>
          <p className="text-base leading-relaxed text-slate md:text-lg">
            Every company under the Turki Omar Group name shares a common
            thread: careful judgment, patient capital, and a refusal to
            compromise on quality. We measure success in decades, not
            fiscal quarters.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-line pt-4">
              <div className="mb-1 text-3xl font-semibold text-ink md:text-4xl">
                {s.value}
              </div>
              <div className="text-sm text-slate">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
