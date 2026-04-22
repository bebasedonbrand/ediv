/* global window, React */
// Tweaks: weight + tracking controls. Exposed via the toolbar toggle.

const { useEffect, useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bodyWeight": 350,
  "headingWeight": 300,
  "tracking": -1
}/*EDITMODE-END*/;

function applyTweaks(tweaks) {
  const root = document.documentElement;
  root.style.setProperty("--w-body", tweaks.bodyWeight);
  root.style.setProperty("--w-heading", tweaks.headingWeight);
  // tracking in 0.001em steps: -30 → -0.030em, 10 → 0.010em
  root.style.setProperty("--tracking", `${tweaks.tracking / 1000}em`);
}

function TweaksPanel() {
  const [visible, setVisible] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  // Apply on change
  useEffect(() => applyTweaks(tweaks), [tweaks]);

  // Listen for host activate/deactivate messages
  useEffect(() => {
    const handler = (e) => {
      if (!e || !e.data) return;
      if (e.data.type === "__activate_edit_mode") setVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setVisible(false);
    };
    window.addEventListener("message", handler);
    // Only AFTER listener is live, announce availability.
    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch (err) {}
    return () => window.removeEventListener("message", handler);
  }, []);

  const update = (k, v) => {
    const next = Object.assign({}, tweaks, { [k]: v });
    setTweaks(next);
    try {
      window.parent.postMessage(
        { type: "__edit_mode_set_keys", edits: { [k]: v } },
        "*"
      );
    } catch (e) {}
  };

  if (!visible) return null;

  return (
    <div className="tweaks-panel">
      <h5>Tweaks · Typography</h5>
      <div className="tw-row">
        <label>Body weight</label>
        <input
          type="range"
          min="100" max="600" step="50"
          value={tweaks.bodyWeight}
          onChange={(e) => update("bodyWeight", +e.target.value)}
        />
        <span className="tw-val">{tweaks.bodyWeight}</span>
      </div>
      <div className="tw-row">
        <label>Heading weight</label>
        <input
          type="range"
          min="100" max="600" step="50"
          value={tweaks.headingWeight}
          onChange={(e) => update("headingWeight", +e.target.value)}
        />
        <span className="tw-val">{tweaks.headingWeight}</span>
      </div>
      <div className="tw-row">
        <label>Letter-spacing</label>
        <input
          type="range"
          min="-40" max="20" step="1"
          value={tweaks.tracking}
          onChange={(e) => update("tracking", +e.target.value)}
        />
        <span className="tw-val">{(tweaks.tracking / 1000).toFixed(3)}em</span>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
