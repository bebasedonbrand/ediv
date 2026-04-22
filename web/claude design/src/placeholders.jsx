/* global window */
// Simple placeholder helpers: striped swatches labeled in monospace
// Meant to be swapped out for real uploads later.

function Placeholder({ label, cls = "ph", note }) {
  return (
    <div className={`ph ${cls}`}>
      <div className="ph-label">
        {label}
        {note ? (
          <div style={{ marginTop: 4, opacity: 0.7, fontSize: 9 }}>{note}</div>
        ) : null}
      </div>
    </div>
  );
}

// Hero portrait: slightly more elaborate — a soft silhouette mask + label
function HeroPortraitPlaceholder({ label }) {
  return (
    <div className="ph" style={{
      background:
        "radial-gradient(80% 70% at 65% 35%, #c6dab3 0%, #9ebd84 40%, #7ca464 85%)"
    }}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}>
        <defs>
          <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(29,34,27,0)"/>
            <stop offset="1" stopColor="rgba(29,34,27,0.25)"/>
          </linearGradient>
        </defs>
        {/* suggested silhouette — very simple profile hint */}
        <path d="M 120 500 L 120 260 C 120 170 180 140 230 155
                 C 280 170 300 220 295 260 L 290 320 L 310 340
                 L 290 360 L 300 400 L 260 430 L 260 500 Z"
              fill="url(#pgrad)"/>
      </svg>
      <div className="ph-label" style={{ position: "absolute", left: 20, bottom: 20 }}>
        {label}
      </div>
    </div>
  );
}

window.Placeholder = Placeholder;
window.HeroPortraitPlaceholder = HeroPortraitPlaceholder;
