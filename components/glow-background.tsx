// Theme-tuned edge washes and fine grain give the glass surfaces depth.
export function GlowBackground() {
  return (
    <div
      aria-hidden
      className="glow-background pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg className="absolute inset-0 size-full opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
