import LogoMark from "./LogoMark.jsx";
export default function Header() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 text-white md:px-12 md:py-6"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="flex items-center gap-2.5">
        <svg width="30" height="30" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="10 6"
            opacity="0.5"
          />
          <path
            d="M20 20H44"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M32 20V46"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm font-semibold tracking-tight">
          Turki Omar Group
        </span>
      </div>

      <nav className="hidden items-center gap-8 text-sm opacity-80 md:flex">
        <a href="#companies" className="transition-opacity hover:opacity-100">
          Companies
        </a>
        <a href="#services" className="transition-opacity hover:opacity-100">
          Services
        </a>
        <a href="#contact" className="transition-opacity hover:opacity-100">
          Contact
        </a>
      </nav>
    </header>
  );
}
