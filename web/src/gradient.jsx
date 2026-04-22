/* global window, React */
/*
 * ediV gradient engine — 덜어내고 채우다
 *
 * Three distinct phases as the user scrolls:
 *
 *  Phase A (0 → 40%)   FULL   — warm wash floods the field.  Dense, present.
 *  Phase B (35 → 65%)  EMPTY  — wash retreats to near-zero.  Pure 지백색. Breath held.
 *  Phase C (60 → 100%) FILL   — a new quality of light builds back in from below,
 *                                warmer & more concentrated, with 석간주색 bleeding through.
 *                                The vessel was emptied so it could be filled with intention.
 *
 * useScrollFill() returns raw scroll progress 0→1 (smoothed).
 * GradientStage maps that onto the three layers internally.
 * ScrollProgress uses it directly as a true progress indicator.
 */

const { useEffect, useRef, useState } = React;

// ── Easing helpers ──────────────────────────────────────────────────────────
// Smooth-step: ease in+out within a [lo, hi] range → 0..1
function smoothstep(lo, hi, x) {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
}

// ── GradientStage ───────────────────────────────────────────────────────────
function GradientStage({ fill: raw }) {
  // raw = scroll progress 0→1

  // Phase A wash: full at 0, fades out by 0.52
  const washOut   = smoothstep(0.20, 0.52, raw);       // 0→1 = wash leaving
  const washOpacity = 1 - washOut * 0.94;              // 1 → 0.06

  // Phase B empty marker: appears in the "held breath" window
  const emptyIn   = smoothstep(0.36, 0.52, raw);
  const emptyOut  = smoothstep(0.58, 0.72, raw);
  const emptyOpacity = emptyIn * (1 - emptyOut);       // bell curve, peaks ~0.52

  // Phase C fill: builds from 0.60 onward
  const fillOpacity = smoothstep(0.58, 0.92, raw);     // 0→1

  // Phase C accent (石間硃): a warmer second accent layer, slightly delayed
  const accentOpacity = smoothstep(0.70, 1.00, raw) * 0.55;

  // Subtle vignette depth that arrives with the fill — adds weight/intention
  const vignetteOpacity = smoothstep(0.65, 1.00, raw) * 0.12;

  return (
    <div className="gradient-stage" aria-hidden="true">

      {/* A — the initial warm flood */}
      <div className="g-wash" style={{ opacity: washOpacity }} />

      {/* C — the intentional refill, from a different origin */}
      <div className="g-fill" style={{ opacity: fillOpacity }} />

      {/* C accent — 석간주색 bleed */}
      <div className="g-accent" style={{ opacity: accentOpacity }} />

      {/* depth vignette */}
      <div className="g-vignette" style={{ opacity: vignetteOpacity }} />

      {/* B — empty-state typography marker */}
      <div
        className={`gradient-empty-mark ${emptyOpacity > 0.01 ? "is-visible" : ""}`}
        style={{ opacity: emptyOpacity }}
      >
        <span className="em-ko">덜어내고</span>
        <span className="em-sep">·</span>
        <span className="em-en">less</span>
      </div>

    </div>
  );
}

// ── useScrollFill ────────────────────────────────────────────────────────────
// Returns raw scroll progress 0→1, smoothed with lerp.
function useScrollFill() {
  const [fill, setFill] = useState(0);
  const targetRef  = useRef(0);
  const currentRef = useRef(0);
  const rafRef     = useRef(0);

  useEffect(() => {
    const compute = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetRef.current = Math.min(1, Math.max(0, window.scrollY / max));
    };

    const tick = () => {
      // Slightly slower lerp for breath-like smoothness
      const dt = 0.09;
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) < 0.0004) {
        currentRef.current = targetRef.current;
      } else {
        currentRef.current += diff * dt;
      }
      setFill(currentRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return fill;
}

// ── ScrollProgress ───────────────────────────────────────────────────────────
// Hairline at top — true scroll progress indicator.
function ScrollProgress({ fill }) {
  return (
    <div
      className="scroll-progress"
      style={{ width: `${fill * 100}%` }}
    />
  );
}

// ── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, as, className = "" }) {
  const Tag = as || "div";
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setOn(true); io.disconnect(); }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const dly = delay ? `d${delay}` : "";
  return (
    <Tag ref={ref} className={`reveal ${dly} ${on ? "in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

window.GradientStage  = GradientStage;
window.useScrollFill  = useScrollFill;
window.ScrollProgress = ScrollProgress;
window.Reveal         = Reveal;
