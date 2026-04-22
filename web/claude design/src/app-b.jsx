/* global window, React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ─── COPY ─────────────────────────────────────────────────────────────────────
const COPY_B = {
  ko: {
    nav: [["홈","#"], ["소개","#philosophy"], ["진료안내","#editorial"], ["예약","#visit"]],
    eyebrow: "SINCE 2019 · Gangnam, Seoul",
    h1: ["결을 읽고,", "인상을 설계합니다."],
    heroSub: "기록하는 곳, 기억하는 곳.\n에디브는 결과 인상을 읽고 기록합니다.\n기록이 쌓이면, 변화가 보입니다.",
    portraitLabel: "Portrait — No. 014",
    philKw: "Philosophy",
    philBody: "기록하는 곳, 기억하는 곳.\n에디브는 결과 인상을 읽고 기록합니다.\n오늘 쌓은 한겹이 내일의 모습이 됩니다.\n기록이 쌓이면, 인상이 달라집니다.",
    editorialKw: "Care",
    cards: [
      {
        num: "01",
        title: "높은 기준이\n좋은 결과를 만듭니다.",
        body: "경과가 살아나는 시간,\n나를 진심으로 이해하는 무심한 손길.",
        img: "assets/b/card-01.jpg",
      },
      {
        num: "02",
        title: "인상에서\n차이를 만드는 곳",
        body: "당신의 결과 인상을 읽고,\n섬세하게 설계합니다.",
        img: "assets/b/card-02.jpg",
      },
      {
        num: "03",
        title: "기록이 쌓이면\n인상이 달라집니다.",
        body: "오늘 남긴 한 장이 내일의 표정이 됩니다.\n에디브는 기록으로 기억됩니다.",
        img: "assets/b/card-03.jpg",
      },
    ],
    taglineKw: "ediV clinic",
    tagline: "나를 위한 가장\n섬세한 시간",
    taglineSub: "에디브는 미학과 휴식의 기준부터 세웁니다.",
    visitTitle: "에디브클리닉에\n오시는 길",
    visitAddr: "서울특별시 강남구 청담동 94-6 3층\n+82 2 0000 0000 · hello@ediv.clinic",
    visitCta: "길찾기",
    footDesc: "미학과 휴식의 기준을 세우는\n청담동 피부·에스테틱 클리닉",
    footCols: [
      { h: "Info",     items: ["대표 소개", "멤버십", "아카이브"] },
      { h: "Clinic",   items: ["예약 · 문의", "진료일", "시술 라인", "케어 프로그램"] },
      { h: "고객 지원", items: ["자주 묻는 질문", "오시는 길", "개인정보처리방침"] },
    ],
    footCopy: "© 2026 ediV clinic · All rights reserved.",
  },
  en: {
    nav: [["Home","#"], ["About","#philosophy"], ["Care","#editorial"], ["Book","#visit"]],
    eyebrow: "SINCE 2019 · Gangnam, Seoul",
    h1: ["Read the grain,", "design the impression."],
    heroSub: "A place to record, a place to remember.\nediV reads the grain and the impression.\nAs records accrue, change becomes visible.",
    portraitLabel: "Portrait — No. 014",
    philKw: "Philosophy",
    philBody: "We take away. Then we fill.\nUpon the grain we've recorded,\nwe design an impression that is yours alone.",
    editorialKw: "Care",
    cards: [
      {
        num: "01",
        title: "A high standard\nmakes a fine result.",
        body: "Time in which healing surfaces,\nan unhurried hand that listens to you.",
        img: "assets/b/card-01.jpg",
      },
      {
        num: "02",
        title: "Where difference\nbecomes impression.",
        body: "We read your grain\nand compose it with care.",
        img: "assets/b/card-02.jpg",
      },
      {
        num: "03",
        title: "Impression shifts,\nas records accrue.",
        body: "A frame kept today becomes tomorrow's expression.\nediV remembers through the record.",
        img: "assets/b/card-03.jpg",
      },
    ],
    taglineKw: "ediV clinic",
    tagline: "The most delicate\nhour, for yourself.",
    taglineSub: "ediV begins with the standards of aesthetics and rest.",
    visitTitle: "Finding\nediV clinic.",
    visitAddr: "3F, 94-6 Cheongdam-dong, Gangnam-gu, Seoul\n+82 2 0000 0000 · hello@ediv.clinic",
    visitCta: "Get directions",
    footDesc: "A small archive clinic in Gangnam,\nsetting the standards of aesthetics and rest.",
    footCols: [
      { h: "Info",    items: ["About", "Membership", "Archive"] },
      { h: "Clinic",  items: ["Booking", "Hours", "Procedures", "Care programs"] },
      { h: "Support", items: ["FAQ", "Directions", "Privacy"] },
    ],
    footCopy: "© 2026 ediV clinic · All rights reserved.",
  },
};

// ─── REVEAL ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`rv ${vis ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay * 130}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function NavB({ lang, setLang, t, scrolled }) {
  return (
    <nav className={`nav-b${scrolled ? " scrolled" : ""}`}>
      <a href="#" className="b-logo" aria-label="ediV clinic">
        <img src="assets/b/logo.svg" alt="ediV clinic" />
      </a>
      <ul>
        {t.nav.map(([label, href], i) => (
          <li key={i}><a href={href}>{label}</a></li>
        ))}
      </ul>
      <div className="nav-lang-b">
        <button className={lang === "ko" ? "on" : ""} onClick={() => setLang("ko")}>KO</button>
        <span className="sep">·</span>
        <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroB({ t }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setInView(true), 180);
    return () => clearTimeout(id);
  }, [t]);

  return (
    <section className="hero-b" id="hero">
      <div className="hero-b-copy">
        <div className="hero-b-eyebrow">{t.eyebrow}</div>
        <h1>
          {t.h1.map((line, i) => (
            <span
              key={i}
              className={`h1-line${inView ? " in" : ""}`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className={`hero-b-sub${inView ? " in" : ""}`}>{t.heroSub}</p>
      </div>
      <div className="hero-b-portrait">
        <img src="assets/b/hero-portrait.png" alt="ediV clinic portrait" />
        <div className="hero-b-portrait-label">{t.portraitLabel}</div>
      </div>
    </section>
  );
}

// ─── PHILOSOPHY ───────────────────────────────────────────────────────────────
function PhilB({ t }) {
  return (
    <section id="philosophy">
      <div className="phil-b">
        <Reveal><div className="phil-b-kw">— {t.philKw}</div></Reveal>
        <Reveal delay={1}>
          <p className="phil-b-body">{t.philBody}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── EDITORIAL ────────────────────────────────────────────────────────────────
function EditorialB({ t }) {
  return (
    <section className="editorial-b" id="editorial">
      <Reveal><div className="editorial-b-kw">— {t.editorialKw}</div></Reveal>
      <div className="editorial-b-grid">
        {t.cards.map((c, i) => (
          <Reveal key={i} delay={i} className="card-b">
            <div className="card-b-img-wrap">
              <img src={c.img} alt={c.title} />
            </div>
            <div className="card-b-num">{c.num}</div>
            <h3 className="card-b-title">{c.title}</h3>
            <p className="card-b-body">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── TAGLINE BAND ─────────────────────────────────────────────────────────────
function TaglineB({ t }) {
  return (
    <section className="tagline-b">
      <div className="tagline-b-inner">
        <Reveal><div className="tagline-b-kw">— {t.taglineKw}</div></Reveal>
        <Reveal delay={1}>
          <p className="tagline-b-text">{t.tagline}</p>
        </Reveal>
        <Reveal delay={2}>
          <p className="tagline-b-sub">{t.taglineSub}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── VISIT ────────────────────────────────────────────────────────────────────
function VisitB({ t }) {
  return (
    <section className="visit-b" id="visit">
      <div className="visit-b-inner">
        <div>
          <Reveal>
            <h2>{t.visitTitle}</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="visit-b-addr">{t.visitAddr}</p>
          </Reveal>
          <Reveal delay={2}>
            <button className="visit-b-cta">
              {t.visitCta} <span>→</span>
            </button>
          </Reveal>
        </div>
        <Reveal delay={1} style={{ height: "100%" }}>
          <div className="visit-b-map">
            <div className="map-b-grid" />
            <div className="map-b-pin">
              <div className="map-b-dot" />
              <div className="map-b-label">ediV · Cheongdam</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function FootB({ t }) {
  return (
    <footer className="foot-b">
      <div className="foot-b-inner">
        <div>
          <div className="foot-b-brand-logo">
            <img src="assets/b/logo.svg" alt="ediV clinic" />
          </div>
          <p className="foot-b-desc">{t.footDesc}</p>
          <div className="foot-b-social">
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 1 1 4 0v4M12 10v7"/>
              </svg>
            </a>
            <a href="#" aria-label="X / Twitter">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l16 16M20 4L4 20"/>
              </svg>
            </a>
          </div>
        </div>
        {t.footCols.map((col, i) => (
          <div className="foot-b-col" key={i}>
            <h4>{col.h}</h4>
            <ul>
              {col.items.map((it, j) => (
                <li key={j}><a href="#">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="foot-b-bottom">
        <span>{t.footCopy}</span>
        <span>Seoul · Cheongdam</span>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function AppB() {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("ediv_lang") || "ko"; } catch(e) { return "ko"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("ediv_lang", l); } catch(e) {}
  };

  const t = COPY_B[lang];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ko" ? "ko" : "en";
  }, [lang]);

  return (
    <>
      <NavB lang={lang} setLang={setLang} t={t} scrolled={scrolled} />
      <main>
        <HeroB t={t} />
        <div className="divider-b" />
        <PhilB t={t} />
        <EditorialB t={t} />
        <TaglineB t={t} />
        <VisitB t={t} />
        <FootB t={t} />
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppB />);
