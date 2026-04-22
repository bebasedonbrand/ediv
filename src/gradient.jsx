/* global window, React */
// "덜어내고 채우다" gradient engine — pure CSS-var approach.
// JS sets --fill, --mouse-x, --mouse-y on :root.
// CSS does all the visual work (no React re-renders for gradient).

const { useEffect, useRef, useState } = React;

function GradientStage() {
  // No props needed — CSS reads --fill / --mouse-x / --mouse-y directly
  return (
    <>
      <div className="gradient-stage" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

// Hook: drives CSS vars via rAF loop
function useScrollFill() {
  useEffect(() => {
    const root = document.documentElement;
    let targetFill = 0;
    let currentFill = 0;
    let targetMX = 20, targetMY = 15;
    let currentMX = 20, currentMY = 15;
    let mouseOffsetX = 0, mouseOffsetY = 0;
    let rafId;

    const computeFill = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const raw = Math.min(1, Math.max(0, window.scrollY / max));
      targetFill = Math.pow(raw, 0.92);
    };

    const tick = () => {
      currentFill += (targetFill - currentFill) * 0.09;
      const baseX = 20, baseY = 15;
      const finalX = baseX + mouseOffsetX * 8;
      const finalY = baseY + mouseOffsetY * 5;
      currentMX += (finalX - currentMX) * 0.05;
      currentMY += (finalY - currentMY) * 0.05;
      root.style.setProperty("--fill", currentFill.toFixed(4));
      root.style.setProperty("--mouse-x", currentMX.toFixed(2) + "%");
      root.style.setProperty("--mouse-y", currentMY.toFixed(2) + "%");
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => computeFill();
    const onResize = () => computeFill();
    const onMouse = (e) => {
      mouseOffsetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseOffsetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    computeFill();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

// Scroll-progress hairline
function ScrollProgress() {
  return (
    <div
      className="scroll-progress"
      style={{ width: "calc(var(--fill, 0) * 100%)" }}
      aria-hidden="true"
    />
  );
}

// Generic reveal-on-scroll wrapper
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
      { threshold: 0.18 }
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

window.GradientStage = GradientStage;
window.useScrollFill = useScrollFill;
window.ScrollProgress = ScrollProgress;
window.Reveal = Reveal;
