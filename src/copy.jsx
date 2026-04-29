/* global window */

function _cardSrc(i, fallback) {
  const cfg = window.EDIV_CONFIG;
  return (cfg && cfg.cards && cfg.cards[i]) || fallback;
}

// Copy in KO / EN
const COPY = {
  ko: {
    navHome: "홈",
    navAbout: "소개",
    navCare: "진료안내",
    navBook: "예약",
    eyebrow: "\n",
    heroLine1: ["미학과", "휴식의"],
    heroLine2: ["기준."],
    heroSub: "A New Standard of Care, EDIV.",
    heroMeta: [
      { k: "SINCE", v: "2019 · Gangnam, Seoul" },
      { k: "PHILOSOPHY", v: "덜어내고 채우다 — Less and fill." },
    ],
    portraitLabel: "Portrait — No. 014",
    scrollHint: "Scroll",
    philK: "Philosophy",
    philBody: [
      "에디브는 미학과 휴식,",
      "\n\n고객을 위한 ", ["em", "분명한 기준"], "이 있습니다.\n맑고 선명한 분위기를 위해 과하지 않게,",
      "\n\n그러나 부족함 없이.\n한번의 시술이 아닌 ", ["em", "꾸준한 관리"], "의 기준을 세웁니다.",
    ],
    cards: [
      {
        num: "01",
        title: "미학과 휴식의 시간을\n삶 안에 들이는 것",
        body: "경과가 살아나는 시간, 나를 진심으로 이해하는 무심한 손길.",
        img: { label: "M-mark close-up", cls: "ph", src: _cardSrc(0, "assets/card-01.jpg") },
      },
      {
        num: "02",
        title: "더 건강하게,\n더 나다운 모습으로",
        body: "당신의 결과 인상을 읽고, 섬세하게 설계합니다.",
        img: { label: "Model · side profile", cls: "ph-2", src: _cardSrc(1, "assets/card-02.png") },
      },
      {
        num: "03",
        title: "맑고 우아한\n인상을 만드는 곳",
        body: "오늘 남긴 한 장이 내일의 표정이 됩니다.\n에디브는 기록으로 기억됩니다.",
        img: { label: "Archive · ediV volume", cls: "ph-3", src: _cardSrc(2, "assets/card-03.png") },
      },
    ],
    taglineEyebrow: "\n",
    tagline: [
      "The Standard of Grace",
      "\nskin and soul",
    ],
    visitTitle: ["에디브클리닉에\n", ["em", "오시는길"], "\n"],
    visitAddr: "서울특별시 강남구 청담동 94-6 3층\n+82 2 0000 0000 · hello@ediv.clinic",
    visitCta: "길찾기",
    footBrand: "에디브클리닉",
    footDesc: "미학과 휴식의 기준을 세우는 \n청담동 피부·에스테틱 클리닉",
    footCols: [
      {
        h: "Info",
        items: ["대표 소개", "멤버십", "아카이브"],
      },
      {
        h: "Clinic",
        items: ["예약 · 문의", "진료일", "시술 라인", "케어 프로그램"],
      },
      {
        h: "고객 지원",
        items: ["자주 묻는 질문", "오시는 길", "개인정보처리방침"],
      },
    ],
    footCopy: "© 2026 ediV clinic · All rights reserved.",
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navCare: "Care",
    navBook: "Book",
    eyebrow: "\n",
    heroLine1: ["A New Standard"],
    heroLine2: ["of Care."],
    heroSub: "A New Standard of Care, EDIV.",
    heroMeta: [
      { k: "SINCE", v: "2019 · Gangnam, Seoul" },
      { k: "PHILOSOPHY", v: "Less and fill — 덜어내고 채우다." },
    ],
    portraitLabel: "Portrait — No. 014",
    scrollHint: "Scroll",
    philK: "Philosophy",
    philBody: [
      "ediV holds a ", ["em", "clear standard"],
      "\nfor aesthetics, rest, and care.",
      "\n\nNot excessive, yet never lacking —\nfor a clear and refined atmosphere.",
      "\n\nWe set the standard of ", ["em", "consistent care"],
      ",\nnot a single procedure.",
    ],
    cards: [
      {
        num: "01",
        title: "A high standard makes a fine result.",
        body: "Time in which healing surfaces, an unhurried hand that listens to you.",
        img: { label: "M-mark close-up", cls: "ph", src: _cardSrc(0, "assets/card-01.jpg") },
      },
      {
        num: "02",
        title: "Where difference becomes impression.",
        body: "We read your grain and compose it with care.",
        img: { label: "Model · side profile", cls: "ph-2", src: _cardSrc(1, "assets/card-02.png") },
      },
      {
        num: "03",
        title: "Impression shifts, as records accrue.",
        body: "A frame kept today becomes tomorrow's expression. ediV remembers through the record.",
        img: { label: "Archive · ediV volume", cls: "ph-3", src: _cardSrc(2, "assets/card-03.png") },
      },
    ],
    taglineEyebrow: "\n",
    tagline: [
      "The Standard of Grace",
      "\nskin and soul",
    ],
    visitTitle: ["Finding\n", ["em", "ediV clinic."]],
    visitAddr: "3F, 94-6 Cheongdam-dong, Gangnam-gu, Seoul\n+82 2 0000 0000 · hello@ediv.clinic",
    visitCta: "Get directions",
    footBrand: "ediV clinic",
    footDesc: "A small archive clinic in Gangnam, setting the standards of aesthetics and rest.",
    footCols: [
      {
        h: "Info",
        items: ["About", "Membership", "Archive"],
      },
      {
        h: "Clinic",
        items: ["Booking", "Hours", "Procedures", "Care programs"],
      },
      {
        h: "Support",
        items: ["FAQ", "Directions", "Privacy"],
      },
    ],
    footCopy: "© 2026 ediV clinic · All rights reserved.",
  },
};

// helper: render a "rich" copy array that may contain ["em", "text"] or ["serif", "text"]
function renderRich(arr) {
  if (typeof arr === "string") return arr;
  const out = [];
  arr.forEach((piece, i) => {
    if (typeof piece === "string") {
      const lines = piece.split("\n");
      lines.forEach((line, idx) => {
        out.push(line);
        if (idx < lines.length - 1) {
          out.push(React.createElement("br", { key: "br-" + i + "-" + idx }));
        }
      });
      return;
    }
    if (Array.isArray(piece)) {
      const tag = piece[0];
      const text = piece[1];
      if (tag === "em") { out.push(<em key={i}>{text}</em>); return; }
      if (tag === "serif") { out.push(<span key={i} className="serif">{text}</span>); return; }
    }
  });
  return out;
}

window.COPY = COPY;
window.renderRich = renderRich;
