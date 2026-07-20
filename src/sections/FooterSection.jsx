// TODO: عدّل الروابط تحت لما تكون روابط حسابات الشركة الفعلية جاهزة
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://sa.linkedin.com/company/turkiomargroup",
    icon: (
      <path
        d="M6.5 8.5h-3v10h3v-10Zm-1.5-1a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM19.5 18.5v-5.6c0-3-1.6-4.4-3.75-4.4-1.73 0-2.5.95-2.93 1.62v-1.4h-3v9.78h3v-5.46c0-.29.02-.58.1-.79.24-.58.78-1.19 1.7-1.19 1.2 0 1.68.91 1.68 2.24v5.2h3Z"
        fill="white"
      />
    ),
  },
  {
    label: "Behance",
    href: "https://www.behance.net/turkooturkoo",
    icon: (
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="white"
      >
        Be
      </text>
    ),
  },
  {
    label: "X",
    href: "https://x.com/turkiomargroup?s=11&t=0LImuPj9HcQBhxQQnwIK0g",
    icon: (
      <path
        d="M6 5h3.6l3.05 4.34L16.5 5H19l-4.9 6.3L19.3 19H15.7l-3.35-4.76L8.4 19H5.9l5.2-6.68L6 5Z"
        fill="white"
      />
    ),
  },
];

export default function FooterSection() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pt-8 pb-16 md:px-12">
      <div className="rounded-[40px] bg-gradient-to-b from-white to-[#ececec] px-8 pt-12 pb-8 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.22),0_15px_35px_-15px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.8)] md:px-14 md:pt-16">
        <h3
          className="mb-10 leading-[0.9] font-bold tracking-tighter text-ink"
          style={{ fontSize: "clamp(2.2rem, 13vw, 6rem)" }}
        >
          TURKI OMAR GROUP
        </h3>

        <div className="border-t border-line pt-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="text-xs text-slate md:text-sm">
              © 2026 مجموعة تركي عمر. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
