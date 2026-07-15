export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <div
        className="animate-drift absolute -top-[20%] -right-[10%] h-[70vh] w-[70vw] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.09), rgba(0,0,0,0.03) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[30%] -left-[15%] h-[55vh] w-[55vw] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.06), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, transparent 40%)",
        }}
      />
    </div>
  );
}
