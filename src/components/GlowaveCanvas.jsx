import { useEffect, useRef } from "react";

const WAVES = [
  { offset: 0, amplitude: 34, frequency: 0.004, tone: "rgba(255,255,255,0.5)", width: 1.2 },
  { offset: Math.PI / 2, amplitude: 46, frequency: 0.0032, tone: "rgba(200,200,200,0.4)", width: 1 },
  { offset: Math.PI, amplitude: 30, frequency: 0.005, tone: "rgba(255,255,255,0.55)", width: 1.4 },
  { offset: Math.PI * 1.5, amplitude: 50, frequency: 0.0026, tone: "rgba(160,160,160,0.35)", width: 1 },
  { offset: Math.PI * 0.75, amplitude: 38, frequency: 0.0044, tone: "rgba(230,230,230,0.45)", width: 1.2 },
];

export default function GlowaveCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = center;
      targetRef.current = center;
    };

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      time += 1;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      WAVES.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 6) {
          const dx = x - mouseRef.current.x;
          const dy = canvas.height / 2 - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 260);
          const mouseEffect = influence * 40 * Math.sin(time * 0.02 + x * 0.01);

          const y =
            canvas.height / 2 +
            Math.sin(x * w.frequency + time * 0.015 + w.offset) * w.amplitude +
            mouseEffect;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = w.width;
        ctx.strokeStyle = w.tone;
        ctx.shadowBlur = 18;
        ctx.shadowColor = w.tone;
        ctx.stroke();
      });

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}