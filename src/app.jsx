/* global window, React, ReactDOM */
/* global COPY, GradientStage, useScrollFill, ScrollProgress,
          Nav, Hero, Philosophy, Editorial, TaglineBand, Visit, Foot,
          TweaksPanel */

const { useEffect, useState } = React;

function App() {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("ediv_lang") || "ko"; } catch(e) { return "ko"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("ediv_lang", l); } catch(e) {}
  };

  const t = COPY[lang];

  // Drive CSS vars — no fill state needed in React
  useScrollFill();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ko" ? "ko" : "en";
  }, [lang]);

  return (
    <>
      <GradientStage />
      <ScrollProgress />
      <Nav lang={lang} setLang={setLang} t={t} scrolled={scrolled} />
      <main className="stage">
        <Hero t={t} />
        <Philosophy t={t} />
        <Editorial t={t} />
        <TaglineBand t={t} />
        <Visit t={t} />
        <Foot t={t} />
      </main>
      <TweaksPanel />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
