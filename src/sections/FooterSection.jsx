const SOCIALS = [
  {
    label: "LinkedIn",
    icon: (
      <path
        d="M6.5 8.5h-3v10h3v-10Zm-1.5-1a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM19.5 18.5v-5.6c0-3-1.6-4.4-3.75-4.4-1.73 0-2.5.95-2.93 1.62v-1.4h-3v9.78h3v-5.46c0-.29.02-.58.1-.79.24-.58.78-1.19 1.7-1.19 1.2 0 1.68.91 1.68 2.24v5.2h3Z"
        fill="white"
      />
    ),
  },
  {
    label: "Instagram",
    icon: (
      <path
        d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6.27a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94Zm4.84-6.43a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM20 8.06c-.06-1.28-.35-2.42-1.28-3.35C17.8 3.78 16.66 3.5 15.38 3.44 14.07 3.37 9.93 3.37 8.62 3.44 7.34 3.5 6.2 3.78 5.27 4.7 4.34 5.63 4.06 6.78 4 8.06c-.07 1.32-.07 5.46 0 6.78.06 1.28.34 2.42 1.28 3.36.93.93 2.06 1.21 3.35 1.28 1.3.07 5.44.07 6.75 0 1.28-.06 2.42-.35 3.35-1.28.93-.94 1.21-2.08 1.28-3.36.06-1.32.06-5.46 0-6.78Z"
        fill="white"
      />
    ),
  },
  {
    label: "X",
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
      <div className="rounded-[28px] bg-mist px-8 pt-12 pb-8 md:px-14 md:pt-16">
        <h3 className="mb-10 text-[13vw] leading-[0.9] font-bold tracking-tighter text-ink md:text-[6.2vw]">
          TURKI OMAR GROUP
        </h3>

        <div className="border-t border-line pt-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="text-xs text-slate md:text-sm">
              © 2026 مجموعة تركي عمر. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
