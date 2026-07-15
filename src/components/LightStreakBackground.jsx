const STREAKS = [
  { top: "12%", width: "140%", left: "-20%", rot: -8, dur: 26, delay: 0, size: 90, tone: "rgba(255,255,255,0.55)" },
  { top: "22%", width: "160%", left: "-30%", rot: 6, dur: 32, delay: -4, size: 60, tone: "rgba(200,200,200,0.4)" },
  { top: "34%", width: "150%", left: "-25%", rot: -4, dur: 22, delay: -10, size: 110, tone: "rgba(255,255,255,0.6)" },
  { top: "44%", width: "170%", left: "-35%", rot: 10, dur: 36, delay: -6, size: 50, tone: "rgba(160,160,160,0.35)" },
  { top: "54%", width: "145%", left: "-22%", rot: -10, dur: 28, delay: -14, size: 80, tone: "rgba(230,230,230,0.5)" },
  { top: "64%", width: "160%", left: "-28%", rot: 5, dur: 24, delay: -2, size: 70, tone: "rgba(180,180,180,0.4)" },
  { top: "74%", width: "155%", left: "-26%", rot: -6, dur: 30, delay: -18, size: 100, tone: "rgba(255,255,255,0.5)" },
  { top: "84%", width: "165%", left: "-32%", rot: 8, dur: 34, delay: -8, size: 55, tone: "rgba(150,150,150,0.35)" },
];

export default function LightStreakBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-90">
        {STREAKS.map((s, i) => (
          <div
            key={i}
            className="absolute animate-streak"
            style={{
              top: s.top,
              left: s.left,
              width: s.width,
              height: `${s.size}px`,
              "--rot": `${s.rot}deg`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              background: `linear-gradient(90deg, transparent 0%, ${s.tone} 45%, rgba(255,255,255,0.9) 50%, ${s.tone} 55%, transparent 100%)`,
              filter: `blur(${s.size / 4}px)`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-1/4"
        style={{ background: "linear-gradient(90deg, #000 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/4"
        style={{ background: "linear-gradient(270deg, #000 0%, transparent 100%)" }}
      />
    </div>
  );
}
