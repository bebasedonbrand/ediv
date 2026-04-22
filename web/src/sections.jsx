/* global window, React, renderRich, Placeholder, HeroPortraitPlaceholder, Reveal */

const { useEffect, useRef, useState } = React;

// ediV clinic wordmark — inline SVG, inherits currentColor
function Logo({ height = 32, style }) {
  const s = Object.assign({ height: 32, width: 104, objectFit: "contain", display: "block" }, style || {});
  return (
    <img
      src="assets/logo.svg"
      alt="ediV clinic"
      className="brand-logo"
      style={s}
    />
  );
}

// ediV symbol mark (leaf/petal)
function EdivSymbol({ height = 28, style }) {
  const s = Object.assign({ height, width: "auto", display: "block" }, style || {});
  return (
    <img
      src="assets/symbol.svg"
      alt=""
      aria-hidden="true"
      className="brand-symbol"
      style={s}
    />
  );
}

// ---------- Nav ----------
function Nav({ lang, setLang, t, scrolled }) {
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#" aria-label="ediV clinic">
        <Logo height={24} />
      </a>
      <div className="nav-links">
        <a href="#philosophy">{t.navHome}</a>
        <a href="#editorial">{t.navAbout}</a>
        <a href="#visit">{t.navCare}</a>
        <a href="#visit">{t.navBook}</a>
      </div>
      <div className="nav-utility">
        <div className="lang-toggle" role="group" aria-label="Language">
          <button className={lang === "ko" ? "on" : ""} onClick={() => setLang("ko")}>KO</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
function Hero({ t }) {
  const [inView, setInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(0);
  const scrollRef = useRef(0);
  const currentRef = useRef(0);

  // 입장 애니메이션
  useEffect(() => {
    const id = setTimeout(() => setInView(true), 200);
    return () => clearTimeout(id);
  }, [t]);

  // 스크롤 패럴랙스 — RAF + lerp으로 부드럽게
  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const tick = () => {
      const diff = scrollRef.current - currentRef.current;
      if (Math.abs(diff) > 0.3) {
        currentRef.current += diff * 0.1;
        setScrollY(currentRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 포트레이트: 스크롤 내릴수록 위로 (0.28 ratio)
  // 카피: 반대 방향으로 미세하게 (-0.07 ratio)
  const portraitY = -(scrollY * 0.28);
  const copyY     = scrollY * 0.07;

  // 스크롤힌트: 스크롤 시작하면 페이드아웃
  const hintOpacity = Math.max(0, 1 - scrollY / 160);

  const renderWords = (line) => {
    const parts = [];
    line.forEach((piece, i) => {
      if (typeof piece === "string") {
        parts.push(
          <span
            key={`w${i}`}
            className={`word ${inView ? "in" : ""}`}
            style={{ transitionDelay: `${i * 130}ms` }}
          >
            {piece}
          </span>
        );
        parts.push(<span key={`s${i}`}> </span>);
      } else if (Array.isArray(piece)) {
        const [tag, text] = piece;
        parts.push(
          <span
            key={`w${i}`}
            className={`word ${tag === "serif" ? "serif" : ""} ${inView ? "in" : ""}`}
            style={{ transitionDelay: `${i * 130}ms` }}
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

      {/* 카피 — 스크롤 시 살짝 아래로 밀림 */}
      <div
        className="hero-copy"
        style={{ transform: `translateY(${copyY}px)` }}
      >
        <h1>
          {renderWords(t.heroLine1)}
          <br />
          {renderWords(t.heroLine2)}
        </h1>
        <p className="hero-sub" style={{ whiteSpace: "pre-line" }}>{t.heroSub}</p>

        {t.heroMeta && t.heroMeta.length > 0 && (
          <div className="hero-meta">
            {t.heroMeta.map((m, i) => (
              <div className="hero-meta-item" key={i}>
                <span className="mk">{m.k}</span>
                <span className="mv">{m.v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 포트레이트 — 스크롤 시 더 빠르게 위로 올라감 */}
      <div
        className="hero-portrait"
        style={{ transform: `translateY(${portraitY}px)` }}
      >
        <div className="portrait-frame">
          <img
            src="assets/hero-portrait.png"
            alt="ediV clinic · model portrait"
            className="hero-portrait-img"
          />
        </div>
        <div className="portrait-label">{t.portraitLabel}</div>
      </div>

      {/* 스크롤 힌트 — 내리기 시작하면 사라짐 */}
      <div className="scroll-hint" style={{ opacity: hintOpacity }}>
        <div>{t.scrollHint}</div>
        <div className="bar" />
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
                  <img
                    src={c.img.src}
                    alt={c.img.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <Placeholder label={c.img.label} cls={c.img.cls} />
                )}
              </div>
            </div>
            <div className="card-num">{c.num} ——</div>
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
            <h2 style={{ whiteSpace: "pre-line" }}>{renderRich(t.visitTitle)}</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="visit-addr" style={{ whiteSpace: "pre-line" }}>{t.visitAddr}</p>
          </Reveal>
          <Reveal delay={2}>
            <button className="visit-cta">
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
                <li key={j}><a href="#">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="foot-bottom">
        <div className="foot-bottom-left">
          <EdivSymbol height={18} style={{ opacity: 0.4 }} />
          <span>{t.footCopy}</span>
        </div>
        <div>Seoul · Cheongdam</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Philosophy, Editorial, TaglineBand, Visit, Foot, Logo, EdivSymbol });
