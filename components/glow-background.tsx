// A CSS stand-in for the jr7.dev shader gradient: blurred colour fields plus grain,
// so the glass surfaces have something to frost without shipping WebGL.
export function GlowBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-(--glow-opacity) blur-3xl">
        <div className="absolute -top-1/4 -left-1/4 size-[70vmax] rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)] motion-safe:animate-[drift_24s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-1/4 -right-1/4 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)] motion-safe:animate-[drift_30s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute -bottom-1/3 left-1/5 size-[65vmax] rounded-full bg-[radial-gradient(closest-side,var(--glow-3),transparent)] motion-safe:animate-[drift_36s_ease-in-out_infinite_alternate]" />
      </div>
      <svg className="absolute inset-0 size-full opacity-[0.07] mix-blend-overlay dark:opacity-[0.12]">
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
