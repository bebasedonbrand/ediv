/* global window */
// Copy in KO / EN
const COPY = {
  ko: {
    navHome: "홈",
    navAbout: "소개",
    navCare: "진료안내",
    navBook: "예약",
    eyebrow: "\n",
    heroLine1: ["결을", "읽고,"],
    heroLine2: ["인상을 설계합니다."],
    heroSub:
      "기록하는 곳, 기억하는 곳.\n에디브는 결과 인상을 읽고 기록합니다.\n기록이 쌓이면, 변화가 보입니다.",
    heroMeta: [
      { k: "SINCE", v: "2019 · Gangnam, Seoul" },
      { k: "PHILOSOPHY", v: "덜어내고 채우다 — Less and fill." },
    ],
    portraitLabel: "Portrait — No. 014",
    scrollHint: "Scroll",
    philK: "Philosophy",
    philBody: [
      "기록하는 곳, 기억하는 곳.",
      "\n에디브는 결과 인상을 읽고 기록합니다.",
      "\n오늘 쌓은 ", ["em", "한겹"], "이 내일의 모습이 됩니다.",
      "\n기록이 쌓이면, 변화가 보입니다.",
      "\n기록이 쌓이면, ", ["em", "인상"], "이 달라집니다.",
    ],
    cards: [
      {
        num: "01",
        title: "높은 기준이 좋은 결과를 만듭니다.",
        body: "경과가 살아나는 시간, 나를 진심으로 이해하는 무심한 손길.",
        img: { label: "M-mark close-up", cls: "ph", src: "assets/card-01.jpg?v=2" },
      },
      {
        num: "02",
        title: "인상에서 차이를 만드는 곳",
        body: "당신의 결과 인상을 읽고, 섬세하게 설계합니다.",
        img: { label: "Model · side profile", cls: "ph-2", src: "assets/card-02.png" },
      },
      {
        num: "03",
        title: "기록이 쌓이면 인상이 달라집니다.",
        body: "오늘 남긴 한 장이 내일의 표정이 됩니다.\n에디브는 기록으로 기억됩니다.",
        img: { label: "Archive · ediV volume", cls: "ph-3", src: "assets/card-03.png" },
      },
    ],
    taglineEyebrow: "\n",
    tagline: [
      "나를 위한 가장 ", ["em", "섬세한"], " 시간",
      "\n에디브는 미학과 휴식의 기준부터 세웁니다.",
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
    heroLine1: ["Read", "the"],
    heroLine2: ["grain,", ["serif", "design"], "the impression."],
    heroSub:
      "A place to record, a place to remember.\nediV reads the grain and the impression.\nAs records accrue, change becomes visible.",
    heroMeta: [
      { k: "SINCE", v: "2019 · Gangnam, Seoul" },
      { k: "PHILOSOPHY", v: "Less and fill — 덜어내고 채우다." },
    ],
    portraitLabel: "Portrait — No. 014",
    scrollHint: "Scroll",
    philK: "Philosophy",
    philBody: [
      "We ", ["em", "take away"], ". Then we fill. ",
      "Upon the grain we've recorded, we ", ["em", "design"], " an impression that is yours alone.",
    ],
    cards: [
      {
        num: "01",
        title: "A high standard makes a fine result.",
        body: "Time in which healing surfaces, an unhurried hand that listens to you.",
        img: { label: "M-mark close-up", cls: "ph", src: "assets/card-01.jpg?v=2" },
      },
      {
        num: "02",
        title: "Where difference becomes impression.",
        body: "We read your grain and compose it with care.",
        img: { label: "Model · side profile", cls: "ph-2", src: "assets/card-02.png" },
      },
      {
        num: "03",
        title: "Impression shifts, as records accrue.",
        body: "A frame kept today becomes tomorrow's expression. ediV remembers through the record.",
        img: { label: "Archive · ediV volume", cls: "ph-3", src: "assets/card-03.png" },
      },
    ],
    taglineEyebrow: "\n",
    tagline: [
      "The most ", ["em", "delicate"], " hour, for yourself.",
      "\nediV begins with the standards of aesthetics and rest.",
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
