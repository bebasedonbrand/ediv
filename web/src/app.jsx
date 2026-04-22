/* global window, React, ReactDOM */
/* global COPY, GradientStage, useScrollFill, ScrollProgress,
          Nav, Hero, Philosophy, Editorial, TaglineBand, Visit, Foot,
          TweaksPanel */

const { useEffect, useState } = React;

function App() {
  // Language — persisted
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("ediv_lang") || "ko"; } catch(e) { return "ko"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("ediv_lang", l); } catch(e) {}
  };

  const t = COPY[lang];
  const fill = useScrollFill();

  // Nav scrolled state
  // "scrolled" = has scrolled past the hero bar → fade nav to transparent
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Set <html lang> for correct rendering
  useEffect(() => {
    document.documentElement.lang = lang === "ko" ? "ko" : "en";
  }, [lang]);

  return (
    <>
      <GradientStage fill={fill} />
      <ScrollProgress fill={fill} />
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
