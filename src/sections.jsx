/* global window, React, renderRich, Placeholder, HeroPortraitPlaceholder, Reveal */

const { useEffect, useRef, useState } = React;

// ediV clinic wordmark — inline SVG, inherits currentColor
function Logo({ height = 32, style }) {
  const s = Object.assign({ height: 32, width: 104, display: "block" }, style || {});
  return (
    <svg
      viewBox="0 0 380 103"
      xmlns="http://www.w3.org/2000/svg"
      className="brand-logo"
      aria-label="ediV clinic"
      role="img"
      style={Object.assign({ fill: "rgb(0, 0, 0)", opacity: 5 }, s)}
      fill="currentColor"
    >
      <path d="M60.4975 63.138C60.4975 65.076 60.3442 67.014 60.0887 68.391H13.2338C13.3871 85.068 21.8179 96.237 34.643 96.237C43.8914 96.237 52.3222 90.882 56.6142 81.651V95.829C49.7163 100.215 42.0008 102.051 33.8255 102.051C13.2338 102.051 0 88.128 0 67.881C0 47.634 13.2338 33.864 31.7816 33.864C50.3294 33.864 60.4975 46.257 60.4975 63.24V63.138ZM31.7816 39.576C20.8982 39.576 13.4382 49.776 13.4382 62.883H48.7966C49.052 48.297 42.0519 39.576 31.8327 39.576H31.7816Z"/>
      <path d="M138.112 100.623C134.689 91.596 136.273 26.316 136.273 0H122.17C124.061 4.947 124.418 26.622 124.367 49.572L123.856 48.399C119.973 39.576 111.031 33.813 100.403 33.813C83.695 33.813 71.5342 47.736 71.5342 67.83C71.5342 90.729 85.8922 102 100.557 102C110.776 102 119.973 96.492 123.959 87.414H124.112C124.112 87.414 124.061 97.002 124.061 100.623H138.163H138.112ZM103.418 94.299C91.0017 94.299 84.1038 83.436 84.1038 67.83C84.1038 52.224 91.0017 41.361 103.418 41.361C114.966 41.361 123.192 50.694 124.265 64.515C124.265 66.912 124.265 69.258 124.214 71.553C122.937 85.119 114.915 94.248 103.418 94.248V94.299Z"/>
      <path d="M170.66 15.3C170.66 19.431 167.186 22.746 163.047 22.746C158.908 22.746 155.434 19.431 155.434 15.3C155.434 11.169 158.755 8.00699 163.047 8.00699C167.339 8.00699 170.66 11.322 170.66 15.3Z"/>
      <path d="M171.018 100.623C167.594 91.596 169.178 61.455 169.178 35.19H155.076C158.499 44.217 156.915 74.358 156.915 100.674H171.018V100.623Z"/>
      <path d="M257.063 9.63901H245.056C248.479 18.666 246.538 38.811 238.669 57.324C233.406 69.717 226.763 85.068 226.763 85.068L194.726 9.63901H180.93L219.866 101.286H223.749C243.727 54.876 250.676 38.199 255.019 27.948C261.458 12.801 258.443 10.608 257.114 9.63901H257.063Z"/>
      <path d="M287.45 101.439V73.287C287.45 70.686 287.296 67.881 286.99 63.699H291.997V94.197C291.997 95.88 292.202 99.195 292.457 101.439H287.45Z"/>
      <path d="M307.019 69.411C307.019 70.941 305.742 72.216 304.158 72.216C302.574 72.216 301.297 70.992 301.297 69.411C301.297 67.83 302.523 66.657 304.158 66.657C305.793 66.657 307.019 67.881 307.019 69.411ZM306.406 76.857V94.197C306.406 96.39 306.611 99.756 306.866 101.439H301.859V84.099C301.859 81.702 301.706 79.305 301.399 76.857H306.406Z"/>
      <path d="M320.407 76.857V81.549H320.458C321.939 78.183 325.261 76.347 328.837 76.347C333.794 76.347 337.473 79.407 337.473 86.904V94.197C337.473 96.186 337.677 99.603 337.932 101.439H332.925V87.414C332.925 81.192 330.626 79.203 327.202 79.203C323.217 79.203 320.356 82.008 320.356 87.21V101.439H315.808V86.445C315.808 83.742 315.604 80.121 315.297 76.857H320.356H320.407Z"/>
      <path d="M351.831 69.411C351.831 70.941 350.553 72.216 348.969 72.216C347.385 72.216 346.108 70.992 346.108 69.411C346.108 67.83 347.334 66.657 348.969 66.657C350.604 66.657 351.831 67.881 351.831 69.411ZM351.269 76.857V94.197C351.269 96.39 351.473 99.756 351.728 101.439H346.721V84.099C346.721 81.702 346.568 79.305 346.261 76.857H351.269Z"/>
      <path d="M371.86 101.949C363.991 101.949 359.137 97.104 359.137 89.148C359.137 81.192 364.247 76.398 371.911 76.398C374.773 76.398 377.276 77.112 379.678 78.744V84.048C377.532 80.274 374.926 78.591 372.013 78.591C367.517 78.591 363.991 82.62 363.991 89.25C363.991 95.88 367.517 99.807 372.269 99.807C375.335 99.807 377.889 98.175 379.933 94.401V99.705C377.838 101.184 375.079 102.051 371.86 102.051V101.949Z"/>
      <path d="M271.712 101.949C263.843 101.949 258.989 97.104 258.989 89.148C258.989 81.192 264.099 76.398 271.763 76.398C274.625 76.398 277.128 77.112 279.53 78.744V84.048C277.384 80.274 274.778 78.591 271.866 78.591C267.369 78.591 263.843 82.62 263.843 89.25C263.843 95.88 267.369 99.807 272.121 99.807C275.187 99.807 277.742 98.175 279.785 94.401V99.705C277.69 101.184 274.931 102.051 271.712 102.051V101.949Z"/>
    </svg>
  );
}


// ediV symbol mark (leaf/petal)
function EdivSymbol({ height = 28, style }) {
  const cfg = window.EDIV_CONFIG || {};
  const src = cfg.symbol || "assets/symbol.svg";
  const s = Object.assign({ height, width: "auto", display: "block" }, style || {});
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="brand-symbol"
      style={s}
    />
  );
}

// ---------- Nav ----------
function Nav({ lang, setLang, t, scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#" aria-label="ediV clinic">
          <Logo height={32} />
        </a>
        <div className="nav-pill">
          <a href="#" className="active" style={{ backgroundColor: "rgb(156, 199, 177)" }}>{t.navHome}</a>
          <a href="#philosophy">{t.navAbout}</a>
          <a href="#editorial">{t.navCare}</a>
          <a href="#visit">{t.navBook}</a>
        </div>
        <div className="nav-utility">
          <div className="lang-toggle">
            <button className={lang === "ko" ? "on" : ""} onClick={() => setLang("ko")} style={{ backgroundColor: "rgb(156, 199, 177)" }}>KO</button>
            <span className="sep">·</span>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className={`nav-burger${open ? " is-open" : ""}`} onClick={() => setOpen(!open)} aria-label="메뉴">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="nav-mobile-overlay" onClick={() => setOpen(false)}>
          <div className="nav-mobile-links" onClick={e => e.stopPropagation()}>
            <a href="#" onClick={() => setOpen(false)}>{t.navHome}</a>
            <a href="#philosophy" onClick={() => setOpen(false)}>{t.navAbout}</a>
            <a href="#editorial" onClick={() => setOpen(false)}>{t.navCare}</a>
            <a href="#visit" onClick={() => setOpen(false)}>{t.navBook}</a>
            <div className="nav-mobile-lang">
              <button className={lang === "ko" ? "on" : ""} onClick={() => { setLang("ko"); setOpen(false); }}>KO</button>
              <span>·</span>
              <button className={lang === "en" ? "on" : ""} onClick={() => { setLang("en"); setOpen(false); }}>EN</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---------- Hero ----------
function Hero({ t }) {
  const cfg = window.EDIV_CONFIG || {};
  const heroImages = cfg.heroImages || (cfg.heroSrc ? [cfg.heroSrc] : []);

  // Stagger-in words
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setInView(true), 200);
    return () => clearTimeout(id);
  }, [t]); // re-trigger on lang change

  // Slideshow
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(() => setSlideIdx(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  const renderWords = (line) => {
    const parts = [];
    line.forEach((piece, i) => {
      if (typeof piece === "string") {
        parts.push(<span key={`w${i}`} className={`word ${inView ? "in" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>{piece}</span>);
        parts.push(<span key={`s${i}`}> </span>);
      } else if (Array.isArray(piece)) {
        const [tag, text] = piece;
        parts.push(
          <span
            key={`w${i}`}
            className={`word ${tag === "serif" ? "serif" : ""} ${inView ? "in" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {text}
          </span>
        );
        parts.push(<span key={`s${i}`}> </span>);
      }
    });
    return parts;
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-copy" style={{ padding: "0 0 0 40px" }}>
        <h1 style={{ width: "353px", height: "100px" }}>
          {renderWords(t.heroLine1)}
          <br />
          {renderWords(t.heroLine2)}
        </h1>
        <p className="hero-sub" style={{ whiteSpace: "pre-line", width: "300px" }}>{t.heroSub}</p>
      </div>

      <div className={`hero-portrait ${inView ? "in" : ""} ${cfg.heroType === "image" ? "is-image" : "is-video"}`}>
        <div className="portrait-frame">
          {cfg.heroType === "image" ? (
            heroImages.map((src, i) => (
              <img
                key={src}
                src={src}
                className={`hero-portrait-img${i === slideIdx ? " slide-active" : ""}`}
                alt={`ediV clinic · model portrait ${i + 1}`}
              />
            ))
          ) : (
            <video
              src={cfg.heroSrc || "assets/ediv_a_hero.mp4"}
              className="hero-portrait-img"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="ediV clinic · model portrait"
            />
          )}
        </div>
        <div className="portrait-label">{t.portraitLabel}</div>
      </div>

    </section>
  );
}

// ---------- Philosophy band ----------
function Philosophy({ t }) {
  return (
    <section className="philosophy" id="philosophy">
      <div className="philosophy-inner">
        <Reveal className="phil-k">— {t.philK}</Reveal>
        <Reveal delay={1} className="phil-body">
          {renderRich(t.philBody)}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Editorial cards ----------
function Editorial({ t }) {
  return (
    <section className="editorial" id="editorial">
      <div className="editorial-grid">
        {t.cards.map((c, i) => (
          <Reveal key={i} delay={i + 1} className="card">
            <div className="card-media">
              <div className="inner">
                {c.img.src ? (
                  <img src={c.img.src} alt={c.img.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <Placeholder label={c.img.label} cls={c.img.cls} />
                )}
              </div>
            </div>
            <div>
              <div className="card-num">{c.num}</div>
            </div>
            <h3 className="card-title">{c.title}</h3>
            <p className="card-body">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Tagline band ----------
function TaglineBand({ t }) {
  return (
    <section className="tagline-band">
      <div className="tagline-inner">
        <Reveal className="tagline-eyebrow">{t.taglineEyebrow}</Reveal>
        <Reveal delay={1} className="tagline" as="p" style={{ whiteSpace: "pre-line" }}>
          {renderRich(t.tagline)}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Visit ----------
function Visit({ t }) {
  return (
    <section className="visit" id="visit">
      <div className="visit-inner">
        <div>
          <Reveal>
            <h2 style={{ whiteSpace: "pre-line", color: "rgb(0, 0, 0)" }}>{renderRich(t.visitTitle)}</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="visit-addr" style={{ whiteSpace: "pre-line" }}>{t.visitAddr}</p>
          </Reveal>
          <Reveal delay={2}>
            <button className="visit-cta" style={{ backgroundColor: "rgb(156, 199, 177)", borderColor: "rgb(255, 255, 255)", color: "rgb(255, 255, 255)" }}>
              {t.visitCta}
              <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
        <Reveal delay={1}>
          <div className="visit-map">
            <div className="grid-lines" />
            <div className="pin">
              <div className="dot" />
              <div className="label">ediV · Cheongdam</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Foot({ t }) {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <div className="brand-mark"><Logo height={26} /></div>
          <p style={{ whiteSpace: "pre-line" }}>{t.footDesc}</p>
          <div className="foot-social">
            <a href="#" aria-label="Instagram">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 1 1 4 0v4M12 10v7"/>
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4l16 16M20 4L4 20"/>
              </svg>
            </a>
          </div>
        </div>
        {t.footCols.map((col, i) => (
          <div className="foot-col" key={i}>
            <h4>{col.h}</h4>
            <ul>
              {col.items.map((it, j) => (
                <li key={j} style={{ color: "rgb(179, 179, 179)" }}><a href="#" style={{ color: "rgb(26, 35, 32)" }}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="foot-bottom">
        <div className="foot-bottom-left">
          <EdivSymbol height={18} style={{ opacity: 0.5 }} />
          <span>{t.footCopy}</span>
        </div>
        <div>Seoul · Cheongdam</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Philosophy, Editorial, TaglineBand, Visit, Foot, Logo, EdivSymbol });
