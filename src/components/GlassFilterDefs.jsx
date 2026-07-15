export default function GlassFilterDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
    </svg>
  );
}
