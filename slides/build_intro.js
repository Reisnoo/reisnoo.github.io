// Builds slides/english_research_intro.pptx: 8 slides, 16:9 (13.33 x 7.5 in), ~4 min talk, script in notes.
// Rules applied: complete-sentence heads with evidence-matched strength, body text >= 20 pt,
// annotations >= 18 pt, Digital Agency guidebook palette (blue family + gray, red only for caution).
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/mnt/skills/public/pptx/scripts/apply_theme.js");

const THEME = {
  name: "Hesitation (guidebook style)",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1A1A1A", lt1: "FFFFFF", dk2: "0031D8", lt2: "F8F8FB",
    accent1: "0017C1", accent2: "666666", accent3: "626264",
    accent4: "CE0000", accent5: "7096F8", accent6: "E8F1FE",
    hlink: "0017C1", folHlink: "626264",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Understanding Why Users Hesitate";
pres.author = "Reina Ikeda";
const C = pres.SchemeColor;
const GRAY_LINE = "CCCCCC";
const BODY = 20, NOTE = 18;

pres.defineSlideMaster({ title: "COVER", background: { color: C.text2 }, objects: [] });
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { text: { text: "Reina Ikeda", options: { x: 9.9, y: 6.98, w: 2.2, h: 0.32, fontSize: NOTE, color: C.text2, align: "right", margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 6.98, w: 0.45, h: 0.32, fontSize: NOTE, color: C.text1, align: "right" },
  placeholders: [
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.65, w: 11.9, h: 0.8, fontSize: 28, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "" } },
  ],
});
["Overview", "Undergraduate", "Master's"].forEach((t) => pres.addSection({ title: t }));

function content(label, head, section, notes) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(label, { isTextBox: true, x: 0.7, y: 0.28, w: 8, h: 0.36, fontSize: BODY, bold: true, color: C.text2, margin: 0, objectName: "Section label" });
  s.addText(head, { placeholder: "title", x: 0.7, y: 0.65, w: 11.9, h: 0.8, fontSize: 28, bold: true, color: C.text2, valign: "middle", margin: 0 });
  s.addNotes(notes);
  return s;
}
function card(s, name, x, y, w, h, kind = "gray") {
  const k = {
    gray: { fill: C.background2, line: GRAY_LINE }, white: { fill: C.background1, line: GRAY_LINE },
    blue: { fill: C.accent6, line: C.accent5 }, solid: { fill: C.text2, line: C.text2 },
    red: { fill: "FDEEEE", line: "FE3939" },
  }[kind];
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: k.fill }, line: { color: k.line, width: 1 }, objectName: name });
}
function txt(s, name, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0.1, color: C.text1, fontSize: BODY, valign: "top", objectName: name }, o));
}
function line(s, name, x, y, w, h = 0, dash = false) {
  s.addShape(pres.shapes.LINE, { x, y, w, h, line: Object.assign({ color: C.text1, width: 1.5, endArrowType: "triangle" }, dash ? { dashType: "dash", beginArrowType: "triangle" } : {}), objectName: name });
}
const B = (t, o = {}) => ({ text: t, options: Object.assign({ bold: true, breakLine: true }, o) });
const P = (t, o = {}) => ({ text: t, options: o });
const MUTED = C.accent3;

// ---------- 1 Cover ----------
{
  const s = pres.addSlide({ masterName: "COVER", sectionTitle: "Overview" });
  s.addText("Tokyo Metropolitan University", { isTextBox: true, x: 0.3, y: 0.3, w: 7, h: 0.4, fontSize: BODY, bold: true, color: C.background1, margin: 0, objectName: "Affiliation" });
  s.addText("Understanding Why Users Hesitate", { isTextBox: true, x: 1.3, y: 2.0, w: 11, h: 1.4, fontSize: 54, color: C.background1, margin: 0, valign: "middle", objectName: "Title" });
  s.addText("From think-aloud prediction to LLM-based gaze interpretation", { isTextBox: true, x: 1.3, y: 3.6, w: 11, h: 0.6, fontSize: 28, color: C.background1, margin: 0, objectName: "Subtitle" });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.3, y: 5.2, w: 5.6, h: 0.65, fill: { color: C.text2 }, line: { color: C.background1, width: 1 }, objectName: "Byline box" });
  s.addText("Reina Ikeda · Master's student, 1st year", { isTextBox: true, x: 1.3, y: 5.2, w: 5.6, h: 0.65, fontSize: BODY, color: C.background1, align: "center", valign: "middle", margin: 0, objectName: "Byline" });
  s.addNotes("Hello, I'm Reina Ikeda, a first-year master's student at Tokyo Metropolitan University. I'll introduce my research on why users hesitate, from my thesis to my master's work.");
}

// ---------- 2 Overview ----------
{
  const s = content("Background and objective", "Think-aloud explains hesitation, but it burdens users.", "Overview",
    "Usability tests often use think-aloud: users speak their thoughts while operating a product. It reveals why people struggle, but talking while acting is a burden and can change behavior. My idea is to combine gaze, screen information and a large language model. My thesis predicted think-aloud; my master's research explains where and why users get stuck. I would especially like advice on the evaluation design and the sample size.");
  const xs = [0.7, 4.85, 9.0], w = 3.63;
  card(s, "Problem card", xs[0], 1.75, w, 3.4, "gray");
  txt(s, "Problem text", [B("Problem", { color: C.text2, fontSize: 24 }), B("Think-aloud shows why users struggle.", {}), P("Speaking while acting is a burden and can change behavior.", { color: MUTED })], { x: xs[0] + 0.1, y: 1.85, w: w - 0.2, h: 3.2 });
  line(s, "Arrow 1", xs[0] + w + 0.05, 3.45, 0.42);
  card(s, "Idea card", xs[1], 1.75, w, 3.4, "blue");
  txt(s, "Idea text", [B("Idea", { color: C.text2, fontSize: 24 }), B("Gaze + UI information + LLM", {}), P("Understand hesitation without asking users to speak.", { color: MUTED })], { x: xs[1] + 0.1, y: 1.85, w: w - 0.2, h: 3.2 });
  line(s, "Arrow 2", xs[1] + w + 0.05, 3.45, 0.42);
  card(s, "Stages card", xs[2], 1.75, w, 3.4, "gray");
  txt(s, "Stages label", "Two stages", { x: xs[2] + 0.1, y: 1.85, w: w - 0.2, h: 0.45, fontSize: 24, bold: true, color: C.text2 });
  card(s, "Stage 1", xs[2] + 0.2, 2.4, w - 0.4, 1.0, "white");
  txt(s, "Stage 1 text", [B("Undergraduate"), P("Predict think-aloud", { color: MUTED })], { x: xs[2] + 0.25, y: 2.4, w: w - 0.5, h: 1.0, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: xs[2] + w / 2, y: 3.45, w: 0, h: 0.3, line: { color: C.text1, width: 1.5, endArrowType: "triangle" }, objectName: "Stage arrow" });
  card(s, "Stage 2", xs[2] + 0.2, 3.8, w - 0.4, 1.2, "solid");
  txt(s, "Stage 2 text", [B("Master's"), P("Explain where and why")], { x: xs[2] + 0.25, y: 3.8, w: w - 0.5, h: 1.2, valign: "middle", color: C.background1 });
  card(s, "Advice box", 0.7, 5.6, 11.93, 0.85, "red");
  txt(s, "Advice text", [P("Advice wanted: ", { bold: true, color: C.accent4 }), P("evaluation design and sample size")], { x: 0.85, y: 5.6, w: 11.6, h: 0.85, valign: "middle" });
}

// ---------- 3 UG method ----------
{
  const s = content("Undergraduate thesis · method", "EsTA asks an LLM to write think-aloud from gaze and UI information.", "Undergraduate",
    "In my thesis, EsTA gives GPT-4 two inputs: gaze from a 120-hertz eye tracker, and UI information such as element coordinates and HTML. GPT-4 writes the think-aloud. The baseline, InTA, uses UI information only. Twenty students used good and bad UIs on shopping and video sites.");
  card(s, "Gaze card", 0.7, 1.75, 4.2, 1.5, "gray");
  txt(s, "Gaze text", [B("Gaze (Tobii, 120 Hz)"), P("fixations, saccades, pupil size", { color: MUTED })], { x: 0.8, y: 1.75, w: 4.0, h: 1.5, valign: "middle" });
  card(s, "UI card", 0.7, 3.5, 4.2, 1.5, "gray");
  txt(s, "UI text", [B("UI information"), P("element coordinates, HTML", { color: MUTED })], { x: 0.8, y: 3.5, w: 4.0, h: 1.5, valign: "middle" });
  line(s, "Gaze to LLM", 4.95, 2.5, 0.65, 0.65);
  line(s, "UI to LLM", 4.95, 4.25, 0.65, -0.65);
  card(s, "LLM card", 5.65, 2.55, 2.0, 1.7, "solid");
  txt(s, "LLM text", "GPT-4", { x: 5.65, y: 2.55, w: 2.0, h: 1.7, fontSize: 28, bold: true, color: C.background1, align: "center", valign: "middle" });
  line(s, "LLM to output", 7.7, 3.4, 0.65);
  card(s, "Output card", 8.4, 2.4, 4.23, 2.0, "blue");
  txt(s, "Output text", [B("Predicted think-aloud", { color: C.text2 }), P("natural text, including doubt", { color: MUTED })], { x: 8.5, y: 2.4, w: 4.0, h: 2.0, valign: "middle" });
  card(s, "Baseline card", 0.7, 5.3, 5.9, 1.2, "white");
  txt(s, "Baseline text", [P("Baseline InTA: ", { bold: true, color: C.accent4 }), P("UI information only")], { x: 0.85, y: 5.3, w: 5.6, h: 1.2, valign: "middle" });
  card(s, "Study card", 6.75, 5.3, 5.88, 1.2, "white");
  txt(s, "Study text", [P("20 students: ", { bold: true, color: C.text2 }), P("Good/Bad UI × shopping/video")], { x: 6.9, y: 5.3, w: 5.6, h: 1.2, valign: "middle" });
}

// ---------- 4 UG result ----------
{
  const s = content("Undergraduate thesis · result", "Adding gaze changed BERTScore by no more than 0.012 in any condition.", "Undergraduate",
    "We compared the output with what participants actually said, using BERTScore. Every score exceeded 0.617, a machine-translation benchmark. Adding gaze changed the score by at most 0.012, and EsTA was slightly lower in three of four conditions. Reading the outputs, EsTA sometimes wrote thoughts that users never voiced.");
  const hdr = (t, a = "center") => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, align: a, valign: "middle", fontSize: BODY } });
  const cell = (t, o = {}) => ({ text: t, options: Object.assign({ align: "center", valign: "middle", fontSize: BODY, color: C.text1, fill: { color: C.background1 } }, o) });
  const rows = [
    [hdr("BERTScore", "left"), hdr("InTA"), hdr("EsTA"), hdr("EsTA − InTA")],
    ["Good A", "0.680", "0.673", "−0.007"], ["Bad A", "0.683", "0.677", "−0.006"],
    ["Good B", "0.691", "0.688", "−0.003"], ["Bad B", "0.670", "0.682", "+0.012"],
  ].map((r, i) => i === 0 ? r : r.map((t, j) => cell(t, j === 0 ? { align: "left", bold: true } : j === 3 ? { bold: true, color: t.startsWith("+") ? C.accent1 : C.accent4 } : {})));
  s.addTable(rows, { x: 0.7, y: 1.75, w: 7.4, colW: [2.0, 1.7, 1.7, 2.0], rowH: 0.75, border: { type: "solid", pt: 1, color: GRAY_LINE }, objectName: "BERTScore table" });
  txt(s, "Table note", "A = e-commerce, B = video streaming. n = 20 students.", { x: 0.7, y: 5.6, w: 7.4, h: 0.4, fontSize: NOTE, color: MUTED, margin: 0 });
  card(s, "Callout 1", 8.5, 1.75, 4.13, 1.7, "gray");
  txt(s, "Callout 1 text", [B("All scores above 0.617", { color: C.text2 }), P("WMT24 benchmark", { color: MUTED })], { x: 8.6, y: 1.75, w: 3.93, h: 1.7, valign: "middle" });
  card(s, "Callout 2", 8.5, 3.7, 4.13, 2.05, "blue");
  txt(s, "Callout 2 text", [B("EsTA sometimes wrote thoughts users never voiced.", { color: C.text1 })], { x: 8.6, y: 3.7, w: 3.93, h: 2.05, valign: "middle" });
}

// ---------- 5 UG example ----------
{
  const s = content("Undergraduate thesis · example", "In one cart scene, EsTA wrote a budget check consistent with the gaze.", "Undergraduate",
    "Here is one cart-checking scene. The user said they would check the cart. The UI-only output skipped ahead to the budget. EsTA described adding shipping and confirming the budget, which was consistent with the gaze moving through the prices. This is a single example. It also shows the problem: EsTA can say too much, and time order was weakly handled.");
  const quotes = [
    ["Actual utterance", "gray", "“Now I have all four items, so let me check the cart.”"],
    ["InTA (UI only)", "gray", "“…items complete, I’ll check the budget later.”"],
    ["EsTA (gaze + UI)", "blue", "“…¥12,400, plus ¥500 shipping makes ¥12,900, within the ¥14,000 budget.”"],
  ];
  quotes.forEach((q, i) => {
    const x = 0.7 + i * 4.05;
    card(s, `Quote card ${i + 1}`, x, 1.75, 3.83, 3.6, q[1]);
    txt(s, `Quote label ${i + 1}`, q[0], { x: x + 0.15, y: 1.9, w: 3.53, h: 0.5, bold: true, color: q[1] === "blue" ? C.text2 : C.text1 });
    txt(s, `Quote body ${i + 1}`, q[2], { x: x + 0.15, y: 2.5, w: 3.53, h: 2.7, italic: true });
  });
  txt(s, "Example note", "Single example, not a general result. Excerpts translated from Japanese. Presented at the Japan Ergonomics Society Kanto Branch, Dec 2025.", { x: 0.7, y: 5.6, w: 11.9, h: 0.8, fontSize: NOTE, color: MUTED, margin: 0 });
}

// ---------- 6 MS method ----------
{
  const s = content("Master's research · method", "The LLM's explanation is scored against human key points it never sees.", "Master's",
    "So in my master's research, the tool explains what users struggle with, and I measure how well. The input is gaze metrics, dwell time and visits per design technique, plus UI structure: HTML, CSS and task. The LLM writes which element, on which screen, and why it caused trouble. A human analyst's key points, covering where, when and why, are never given to the LLM. I score recall, and the over-claim rate, which makes saying too much measurable.");
  card(s, "Input gaze", 0.7, 1.75, 3.6, 1.55, "gray");
  txt(s, "Input gaze text", [B("Gaze metrics"), P("dwell time, visits per technique", { color: MUTED })], { x: 0.8, y: 1.75, w: 3.4, h: 1.55, valign: "middle" });
  card(s, "Input UI", 0.7, 3.5, 3.6, 1.55, "gray");
  txt(s, "Input UI text", [B("UI structure"), P("screen, HTML/CSS, task", { color: MUTED })], { x: 0.8, y: 3.5, w: 3.4, h: 1.55, valign: "middle" });
  line(s, "Gaze to LLM", 4.35, 2.55, 0.45, 0.6);
  line(s, "UI to LLM", 4.35, 4.25, 0.45, -0.6);
  card(s, "LLM", 4.85, 2.5, 1.4, 1.7, "solid");
  txt(s, "LLM text", "LLM", { x: 4.85, y: 2.5, w: 1.4, h: 1.7, fontSize: 28, bold: true, color: C.background1, align: "center", valign: "middle" });
  line(s, "LLM to output", 6.3, 3.35, 0.4);
  card(s, "Output", 6.75, 1.75, 3.0, 3.3, "blue");
  txt(s, "Output text", [B("Per technique", { color: C.text2 }), P("element, screen, reason", { breakLine: true }), P("+ summary, suggestions")], { x: 6.85, y: 1.75, w: 2.8, h: 3.3, valign: "middle" });
  line(s, "Compare", 9.8, 3.4, 0.4, 0, true);
  card(s, "Human key points", 10.25, 1.75, 2.38, 3.3, "white");
  txt(s, "Human key points text", [B("Human key points", { align: "center" }), P("where, when, why", { color: MUTED, align: "center" })], { x: 10.3, y: 1.75, w: 2.28, h: 3.3, valign: "middle" });
  card(s, "Metrics strip", 0.7, 5.35, 11.93, 1.2, "gray");
  txt(s, "Metrics text", [P("Scored by recall and over-claim rate. ", { bold: true, color: C.text2 }), P("Key points are never given to the LLM.", { bold: true, color: C.accent4 })], { x: 0.85, y: 5.35, w: 11.6, h: 1.2, valign: "middle" });
}

// ---------- 7 MS design ----------
{
  const s = content("Master's research · experiment design", "Each bad-UI technique is embedded alone and combined on mock sites.", "Master's",
    "I built mock shopping and job-search sites. Each bad technique is grounded in the literature, for example decoys with similar names, shifting button positions, and low-contrast progress indicators. Each technique has its own version, plus one with all of them, so effects can be separated. Nothing scrolls, so gaze coordinates stay reliable.");
  const T = [
    ["T1", "Similar-name decoys", "Duncan & Humphreys 1989"],
    ["T2", "Decorative noise", "Burke et al. 2005"],
    ["T3", "Shifting button positions", "McCarthy et al. 2003"],
    ["T4", "Inconsistent design", "Mendel 2010/2012 etc."],
    ["T5", "Low-contrast progress indicator", "Yu et al. 2022; Legge et al. 1997"],
  ];
  const w = 2.3, gap = 0.1075;
  T.forEach((t, i) => {
    const x = 0.7 + i * (w + gap);
    card(s, `Technique card ${t[0]}`, x, 1.7, w, 3.15, "gray");
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: 1.85, w: 0.6, h: 0.6, fill: { color: C.text2 }, line: { color: C.text2, width: 0 }, objectName: `Badge ${t[0]}` });
    txt(s, `Badge text ${t[0]}`, t[0], { x: x + 0.15, y: 1.85, w: 0.6, h: 0.6, fontSize: BODY, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
    txt(s, `Technique name ${t[0]}`, t[1], { x: x + 0.05, y: 2.55, w: w - 0.1, h: 1.2, bold: true });
    txt(s, `Technique ref ${t[0]}`, t[2], { x: x + 0.05, y: 3.75, w: w - 0.1, h: 1.0, fontSize: NOTE, color: MUTED });
  });
  const facts = [["7", "versions per site: G, B-T1–T5, B-all"], ["2", "genres: shopping, job search"], ["0", "scrolling, so gaze stays reliable"], ["20", "areas of interest per site"]];
  facts.forEach((f, i) => {
    const x = 0.7 + i * 3.0;
    card(s, `Fact ${i + 1}`, x, 5.05, 2.9, 1.65, "blue");
    txt(s, `Fact num ${i + 1}`, f[0], { x: x + 0.05, y: 5.05, w: 0.85, h: 1.65, fontSize: 36, bold: true, color: C.text2, valign: "middle" });
    txt(s, `Fact label ${i + 1}`, f[1], { x: x + 0.9, y: 5.05, w: 1.95, h: 1.65, valign: "middle" });
  });
}

// ---------- 8 MS status ----------
{
  const s = content("Master's research · status, limits, advice", "No results exist yet, so the evaluation design remains untested.", "Master's",
    "Prototypes for both sites are done and a six-person pilot is planned. So far I only have a three-person preliminary study and a wiring check with mock LLM responses, so I cannot claim results. The main study will recruit forty to sixty-four participants. I would welcome advice on the evaluation design and the sample size. Thank you.");
  const steps = [["DONE", "Prototypes", "both sites", "solid"], ["PLANNED", "Pilot", "N = 6", "blue"], ["PLANNED", "Main study", "N = 40–64", "blue"]];
  steps.forEach((p, i) => {
    const x = 0.7 + i * 4.15;
    card(s, `Step ${i + 1}`, x, 1.7, 3.63, 1.35, p[3]);
    txt(s, `Step text ${i + 1}`, [B(p[0], { fontSize: NOTE }), P(p[1] + "  ", { bold: true, fontSize: 24 }), P(p[2])], { x: x + 0.1, y: 1.7, w: 3.43, h: 1.35, valign: "middle", color: p[3] === "solid" ? C.background1 : C.text1 });
    if (i < 2) line(s, `Step arrow ${i + 1}`, x + 3.68, 2.35, 0.42);
  });
  card(s, "Status box", 0.7, 3.25, 11.93, 1.55, "red");
  txt(s, "Status text", [
    P("So far: ", { bold: true, color: C.accent4 }), P("N = 3 preliminary study and a wiring check with mock LLM responses. No results are claimed.", { breakLine: true }),
    P("Limits: ", { bold: true, color: C.accent4 }), P("two mock-site genres and non-scrolling pages limit generalization."),
  ], { x: 0.85, y: 3.25, w: 11.6, h: 1.55, valign: "middle" });
  card(s, "Advice box", 0.7, 5.0, 11.93, 1.75, "solid");
  txt(s, "Advice text", [
    B("Advice wanted", { fontSize: 24 }),
    P("1. Is recall and over-claim rate against human key points a sound evaluation?", { breakLine: true }),
    P("2. Is N = 40–64 adequate for the planned versions per site?"),
  ], { x: 0.85, y: 5.0, w: 11.6, h: 1.75, valign: "middle", color: C.background1 });
}

(async () => {
  const out = __dirname + "/english_research_intro.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
})();
