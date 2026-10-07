// Builds slides/english_research_intro.pptx (9 slides, 16:9, script in notes)
// Visual style follows the Digital Agency "Dashboard Design Guidebook":
// blue cover, white pages with bold blue titles, rounded gray / light-blue cards,
// thin arrow connectors, and the guidebook's Blue / Solid Gray / Red palette.
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/mnt/skills/public/pptx/scripts/apply_theme.js");

const THEME = {
  name: "Hesitation (guidebook style)",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1A1A1A", lt1: "FFFFFF", dk2: "0031D8", lt2: "F8F8FB",
    accent1: "0017C1", // Blue 900: emphasis in charts
    accent2: "D2A400", // Yellow 600
    accent3: "626264", // label gray
    accent4: "CE0000", // red: caution / over-claim
    accent5: "7096F8", // Blue 400: highlight border
    accent6: "E8F1FE", // Blue 50: highlight fill
    hlink: "0017C1", folHlink: "626264",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Understanding Why Users Hesitate";
pres.author = "Reina Ikeda";
const C = pres.SchemeColor;
const GRAY_LINE = "CCCCCC";

pres.defineSlideMaster({ title: "COVER", background: { color: C.text2 }, objects: [] });
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { text: { text: "Reina Ikeda", options: { x: 7.6, y: 5.25, w: 1.4, h: 0.25, fontSize: 9, color: C.text2, align: "right", margin: 0 } } },
  ],
  slideNumber: { x: 9.1, y: 5.25, w: 0.4, h: 0.25, fontSize: 9, color: C.text1, align: "right" },
  placeholders: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.5, w: 9, h: 0.65, fontSize: 26, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "" } },
  ],
});

["Overview", "Undergraduate", "Bridge", "Master's"].forEach((t) => pres.addSection({ title: t }));

function content(label, title, section, notes) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(label, { isTextBox: true, x: 0.5, y: 0.24, w: 6, h: 0.26, fontSize: 12, bold: true, color: C.text2, margin: 0, objectName: "Section label" });
  s.addText(title, { placeholder: "title", x: 0.5, y: 0.5, w: 9, h: 0.65, fontSize: 26, bold: true, color: C.text2, valign: "middle", margin: 0 });
  s.addNotes(notes);
  return s;
}
// kind: gray | blue (highlight) | solid (blue fill) | red (caution) | white
function card(s, name, x, y, w, h, kind = "gray") {
  const k = {
    gray: { fill: C.background2, line: GRAY_LINE },
    white: { fill: C.background1, line: GRAY_LINE },
    blue: { fill: C.accent6, line: C.accent5 },
    solid: { fill: C.text2, line: C.text2 },
    red: { fill: "FDEEEE", line: "FE3939" },
  }[kind];
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: k.fill }, line: { color: k.line, width: 0.75 }, objectName: name });
}
function txt(s, name, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0.08, color: C.text1, fontSize: 14, valign: "top", objectName: name }, o));
}
function line(s, name, x, y, w, h = 0) {
  s.addShape(pres.shapes.LINE, { x, y, w, h, line: { color: C.text1, width: 1.25, endArrowType: "triangle" }, objectName: name });
}
const B = (t, o = {}) => ({ text: t, options: Object.assign({ bold: true, breakLine: true }, o) });
const P = (t, o = {}) => ({ text: t, options: o });

// ---------- 1 Cover ----------
{
  const s = pres.addSlide({ masterName: "COVER", sectionTitle: "Overview" });
  s.addText("Tokyo Metropolitan University", { isTextBox: true, x: 0.2, y: 0.2, w: 5, h: 0.3, fontSize: 12, bold: true, color: C.background1, margin: 0, objectName: "Affiliation" });
  s.addText("Understanding Why Users Hesitate", { isTextBox: true, x: 1.0, y: 1.45, w: 8.2, h: 1.5, fontSize: 40, color: C.background1, margin: 0, valign: "middle", objectName: "Title" });
  s.addText("From think-aloud prediction to LLM-based gaze interpretation", { isTextBox: true, x: 1.0, y: 3.0, w: 8, h: 0.45, fontSize: 20, color: C.background1, margin: 0, objectName: "Subtitle" });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 4.0, w: 3.25, h: 0.5, fill: { color: C.text2 }, line: { color: C.background1, width: 1 }, objectName: "Byline box" });
  s.addText("Reina Ikeda · Master's student, 1st year", { isTextBox: true, x: 1.0, y: 4.0, w: 3.25, h: 0.5, fontSize: 13, color: C.background1, align: "center", valign: "middle", margin: 0, objectName: "Byline" });
  s.addNotes("Hello, I'm Reina Ikeda, a first-year master's student at Tokyo Metropolitan University. I'll introduce my research on understanding why users hesitate, from my undergraduate thesis to my master's work.");
}

// ---------- 2 Overview ----------
{
  const s = content("Overview", "Think-aloud explains why, but at a cost", "Overview",
    "Usability tests often use the think-aloud method: users speak their thoughts while operating a product. It reveals why people struggle, but talking while acting is a burden and can change natural behavior. My idea is to use eye movements and screen information, together with a large language model, to understand hesitation without that burden. My thesis predicted think-aloud; my master's research explains where and why users get stuck.");
  card(s, "Problem card", 0.5, 1.45, 2.75, 3.3, "gray");
  txt(s, "Problem text", [
    B("Problem", { color: C.text2, fontSize: 18 }), B(" ", { fontSize: 6 }),
    B("Think-aloud shows why users struggle.", { fontSize: 15 }), B(" ", { fontSize: 6 }),
    P("But talking while acting is a burden and can change natural behavior.", { fontSize: 14, color: C.accent3 }),
  ], { x: 0.65, y: 1.6, w: 2.45, h: 3.0 });
  line(s, "Arrow problem-idea", 3.3, 3.1, 0.4);
  card(s, "Idea card", 3.75, 1.45, 2.75, 3.3, "blue");
  txt(s, "Idea text", [
    B("Idea", { color: C.text2, fontSize: 18 }), B(" ", { fontSize: 6 }),
    B("Gaze + UI information + LLM", { fontSize: 15 }), B(" ", { fontSize: 6 }),
    P("Understand hesitation without asking users to speak.", { fontSize: 14, color: C.accent3 }),
  ], { x: 3.9, y: 1.6, w: 2.45, h: 3.0 });
  line(s, "Arrow idea-stages", 6.55, 3.1, 0.4);
  card(s, "Stages card", 7.0, 1.45, 2.5, 3.3, "gray");
  txt(s, "Stages label", "Two stages", { x: 7.15, y: 1.6, w: 2.2, h: 0.35, fontSize: 18, bold: true, color: C.text2 });
  card(s, "Stage 1", 7.15, 2.15, 2.2, 1.05, "white");
  txt(s, "Stage 1 text", [B("Undergraduate", { fontSize: 14 }), P("Predict think-aloud", { fontSize: 13, color: C.accent3 })], { x: 7.2, y: 2.15, w: 2.1, h: 1.05, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: 8.25, y: 3.25, w: 0, h: 0.35, line: { color: C.text1, width: 1.25, endArrowType: "triangle" }, objectName: "Stage arrow" });
  card(s, "Stage 2", 7.15, 3.65, 2.2, 1.0, "solid");
  txt(s, "Stage 2 text", [B("Master's", { fontSize: 14 }), P("Explain where and why", { fontSize: 13 })], { x: 7.2, y: 3.65, w: 2.1, h: 1.0, valign: "middle", color: C.background1 });
}

// ---------- 3 UG 1/3 ----------
{
  const s = content("Undergraduate · 1/3", "EsTA predicts think-aloud from gaze + UI", "Undergraduate",
    "In my thesis I proposed EsTA, which predicts think-aloud from gaze and UI information. A 120-hertz eye tracker records fixations, saccades and pupil size, and we add element coordinates and HTML code. GPT-4 receives both and writes the think-aloud as natural text, including doubt. As a baseline, InTA uses UI information only. Twenty university students performed four conditions: good or bad UI, on shopping and video sites. The bad UIs deliberately violated Nielsen's heuristics.");
  card(s, "Gaze card", 0.5, 1.4, 2.9, 1.2, "gray");
  txt(s, "Gaze text", [B("Gaze (Tobii, 120 Hz)"), P("fixations · saccades · pupil size", { fontSize: 13, color: C.accent3 })], { x: 0.6, y: 1.4, w: 2.7, h: 1.2, valign: "middle" });
  card(s, "UI card", 0.5, 2.8, 2.9, 1.2, "gray");
  txt(s, "UI text", [B("UI information"), P("element coordinates · HTML", { fontSize: 13, color: C.accent3 })], { x: 0.6, y: 2.8, w: 2.7, h: 1.2, valign: "middle" });
  line(s, "Gaze to LLM", 3.45, 2.0, 0.6, 0.45);
  line(s, "UI to LLM", 3.45, 3.4, 0.6, -0.45);
  card(s, "LLM card", 4.1, 2.0, 1.7, 1.4, "solid");
  txt(s, "LLM text", "GPT-4", { x: 4.1, y: 2.0, w: 1.7, h: 1.4, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle" });
  line(s, "LLM to output", 5.85, 2.7, 0.45);
  card(s, "Output card", 6.35, 1.9, 3.15, 1.6, "blue");
  txt(s, "Output text", [B("Predicted think-aloud", { color: C.text2 }), P("natural text, including doubt", { fontSize: 13, color: C.accent3 })], { x: 6.45, y: 1.9, w: 2.95, h: 1.6, valign: "middle" });
  card(s, "Baseline card", 0.5, 4.2, 4.4, 0.85, "white");
  txt(s, "Baseline text", [P("Baseline InTA: ", { bold: true, color: C.accent4 }), P("UI information only, no gaze")], { x: 0.6, y: 4.2, w: 4.2, h: 0.85, fontSize: 14, valign: "middle" });
  card(s, "Study card", 5.1, 4.2, 4.4, 0.85, "white");
  txt(s, "Study text", [P("Study: ", { bold: true, color: C.text2 }), P("20 students × 4 conditions (Good/Bad UI × shopping/video)")], { x: 5.2, y: 4.2, w: 4.2, h: 0.85, fontSize: 13, valign: "middle" });
}

// ---------- 4 UG 2/3 ----------
{
  const s = content("Undergraduate · 2/3", "Close to real speech, but EsTA says more", "Undergraduate",
    "We measured similarity to what participants actually said, using BERTScore. Both methods exceeded 0.617, a machine-translation benchmark, in every condition. EsTA was slightly lower in three of four conditions. Reading the outputs showed why: EsTA wrote thoughts users never voiced, which the metric counts as saying too much.");
  const labels = ["Good A", "Bad A", "Good B", "Bad B"];
  s.addChart(pres.charts.BAR, [
    { name: "InTA (UI only)", labels, values: [0.680, 0.683, 0.691, 0.670] },
    { name: "EsTA (gaze + UI)", labels, values: [0.673, 0.677, 0.688, 0.682] },
  ], {
    x: 0.4, y: 1.3, w: 5.9, h: 3.85, barDir: "col", barGrouping: "clustered", barGapWidthPct: 60,
    chartColors: ["999999", "0017C1"],
    showTitle: true, title: "BERTScore against what participants actually said", titleFontSize: 12, titleColor: "1A1A1A", titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 10, dataLabelFormatCode: "0.000", dataLabelFontFace: "+mn-lt", dataLabelColor: "1A1A1A",
    valAxisMinVal: 0, valAxisMaxVal: 1, valAxisMajorUnit: 0.2, valAxisLabelFormatCode: "0.0",
    valAxisLabelColor: "626264", catAxisLabelColor: "1A1A1A", valAxisLabelFontFace: "+mn-lt", catAxisLabelFontFace: "+mn-lt", valAxisLabelFontSize: 10, catAxisLabelFontSize: 11,
    showValAxisTitle: true, valAxisTitle: "BERTScore", valAxisTitleFontSize: 10, valAxisTitleColor: "626264", valAxisTitleFontFace: "+mn-lt",
    showCatAxisTitle: true, catAxisTitle: "Condition (A = e-commerce, B = video streaming)", catAxisTitleFontSize: 10, catAxisTitleColor: "626264", catAxisTitleFontFace: "+mn-lt",
    valGridLine: { color: "E5E5E5", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "t", legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: "1A1A1A",
  });
  card(s, "Callout 1", 6.6, 1.4, 2.9, 1.05, "gray");
  txt(s, "Callout 1 text", [B("All above 0.617", { fontSize: 18, color: C.text2 }), P("WMT24 benchmark, every condition", { fontSize: 12, color: C.accent3 })], { x: 6.7, y: 1.4, w: 2.7, h: 1.05, valign: "middle" });
  card(s, "Callout 2", 6.6, 2.65, 2.9, 1.05, "gray");
  txt(s, "Callout 2 text", [B("EsTA lower in 3 of 4", { fontSize: 18, color: C.text2 }), P("Good A, Bad A, Good B", { fontSize: 12, color: C.accent3 })], { x: 6.7, y: 2.65, w: 2.7, h: 1.05, valign: "middle" });
  card(s, "Callout 3", 6.6, 3.9, 2.9, 1.2, "blue");
  txt(s, "Callout 3 text", [B("Why? “Saying too much”", { fontSize: 16, color: C.text2 }), P("EsTA wrote thoughts users never voiced.", { fontSize: 12 })], { x: 6.7, y: 3.9, w: 2.7, h: 1.2, valign: "middle" });
}

// ---------- 5 UG 3/3 ----------
{
  const s = content("Undergraduate · 3/3", "Gaze recovered an unspoken calculation", "Undergraduate",
    "Here is a cart-checking scene. The participant said they would now check the cart. The UI-only output skipped the checking and said the budget comes later. EsTA described adding shipping to reach 12,900 yen and confirming it fit the budget, which matched the gaze moving through the prices. So gaze recovered a calculation that was never spoken. This was presented at the Japan Ergonomics Society last December.");
  const quotes = [
    ["Actual utterance", "gray", "“Now I have all four items, so let me check the cart.”"],
    ["InTA (UI only)", "gray", "“…items complete, I’ll check the budget later.”"],
    ["EsTA (gaze + UI)", "blue", "“…¥12,400, plus ¥500 shipping makes ¥12,900, within the ¥14,000 budget.”"],
  ];
  quotes.forEach((q, i) => {
    const x = 0.5 + i * 3.05;
    card(s, `Quote card ${i + 1}`, x, 1.4, 2.9, 2.5, q[1]);
    txt(s, `Quote label ${i + 1}`, q[0], { x: x + 0.12, y: 1.5, w: 2.66, h: 0.4, fontSize: 15, bold: true, color: q[1] === "blue" ? C.text2 : C.text1 });
    txt(s, `Quote body ${i + 1}`, q[2], { x: x + 0.12, y: 2.0, w: 2.66, h: 1.8, fontSize: 16, italic: true });
  });
  card(s, "Takeaway card", 0.5, 4.1, 9.0, 0.6, "solid");
  txt(s, "Takeaway text", "Gaze moving through the prices matched the unspoken budget check.", { x: 0.65, y: 4.1, w: 8.7, h: 0.6, fontSize: 15, bold: true, color: C.background1, valign: "middle" });
  txt(s, "Venue", "Presented at the Japan Ergonomics Society Kanto Branch, Dec 2025. Excerpts translated from Japanese.", { x: 0.5, y: 4.85, w: 9, h: 0.3, fontSize: 10, color: C.accent3, margin: 0 });
}

// ---------- 6 Bridge ----------
{
  const s = content("Bridge", "From “saying too much” to a measurable goal", "Bridge",
    "The thesis left two challenges: the model sometimes says too much, and time order is weakly handled. So in my master's research I changed the goal and the evaluation. The tool now explains what users struggle with, and I check it against key points made by a human analyst. Saying too much becomes a number: the over-claim rate.");
  txt(s, "Left header", "Challenges from the thesis", { x: 0.5, y: 1.3, w: 3.8, h: 0.3, fontSize: 13, bold: true, color: C.accent3, margin: 0 });
  txt(s, "Right header", "Master's research", { x: 5.2, y: 1.3, w: 4.3, h: 0.3, fontSize: 13, bold: true, color: C.text2, margin: 0 });
  card(s, "Challenge 1", 0.5, 1.7, 3.8, 1.4, "gray");
  txt(s, "Challenge 1 text", [B("Overstatement", { fontSize: 20 }), P("The model sometimes says too much.", { fontSize: 14, color: C.accent3 })], { x: 0.65, y: 1.7, w: 3.5, h: 1.4, valign: "middle" });
  card(s, "Challenge 2", 0.5, 3.3, 3.8, 1.4, "gray");
  txt(s, "Challenge 2 text", [B("Time order", { fontSize: 20 }), P("Weakly handled in the thesis.", { fontSize: 14, color: C.accent3 })], { x: 0.65, y: 3.3, w: 3.5, h: 1.4, valign: "middle" });
  line(s, "Arrow goal", 4.4, 2.4, 0.7);
  line(s, "Arrow eval", 4.4, 4.0, 0.7);
  card(s, "New goal", 5.2, 1.7, 4.3, 1.4, "blue");
  txt(s, "New goal text", [B("New goal", { fontSize: 12, color: C.text2 }), B("Explain what users struggle with", { fontSize: 18 }), P("where, when and why", { fontSize: 14, color: C.accent3 })], { x: 5.35, y: 1.7, w: 4.0, h: 1.4, valign: "middle" });
  card(s, "New evaluation", 5.2, 3.3, 4.3, 1.4, "blue");
  txt(s, "New evaluation text", [B("New evaluation", { fontSize: 12, color: C.text2 }), B("Check against human key points", { fontSize: 18 }), P("“Saying too much” → over-claim rate", { fontSize: 14, color: C.accent4, bold: true })], { x: 5.35, y: 3.3, w: 4.0, h: 1.4, valign: "middle" });
}

// ---------- 7 MS 1/3 ----------
{
  const s = content("Master's · 1/3", "A tool that explains, checked against humans", "Master's",
    "The tool takes two inputs. From gaze: dwell time and visit counts for each design technique, compared between good and bad versions. From the UI: which screen contains which technique, the HTML and CSS, and the task context. The LLM writes, for each technique, which element, on which screen, and why it caused trouble, plus a summary and suggestions. The core value is integrating two different modalities and explaining them; judging hesitation itself is not the goal. I evaluate against human key points, covering where, when and why, using recall and over-claim rate. These key points are never given to the LLM.");
  card(s, "Input gaze", 0.5, 1.4, 2.6, 1.2, "gray");
  txt(s, "Input gaze text", [B("Gaze metrics", { fontSize: 14 }), P("dwell time · visits, per technique, Good vs. Bad", { fontSize: 12, color: C.accent3 })], { x: 0.58, y: 1.4, w: 2.45, h: 1.2, valign: "middle" });
  card(s, "Input UI", 0.5, 2.8, 2.6, 1.2, "gray");
  txt(s, "Input UI text", [B("UI structure", { fontSize: 14 }), P("screen ↔ technique · HTML/CSS · task", { fontSize: 12, color: C.accent3 })], { x: 0.58, y: 2.8, w: 2.45, h: 1.2, valign: "middle" });
  line(s, "Gaze to LLM", 3.15, 2.0, 0.4, 0.3);
  line(s, "UI to LLM", 3.15, 3.4, 0.4, -0.3);
  card(s, "LLM", 3.6, 2.0, 1.2, 1.4, "solid");
  txt(s, "LLM text", "LLM", { x: 3.6, y: 2.0, w: 1.2, h: 1.4, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle" });
  line(s, "LLM to output", 4.85, 2.7, 0.35);
  card(s, "Output", 5.25, 1.4, 2.4, 2.6, "blue");
  txt(s, "Output text", [
    B("Output", { fontSize: 14, color: C.text2 }),
    P("Per technique: which element, which screen, why it caused trouble", { fontSize: 12, breakLine: true }),
    P("+ summary", { fontSize: 12, breakLine: true }), P("+ suggestions", { fontSize: 12 }),
  ], { x: 5.33, y: 1.4, w: 2.25, h: 2.6, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: 7.7, y: 2.7, w: 0.4, h: 0, line: { color: C.text1, width: 1.25, dashType: "dash", beginArrowType: "triangle", endArrowType: "triangle" }, objectName: "Compare arrow" });
  card(s, "Human key points", 8.15, 1.4, 1.35, 2.6, "white");
  txt(s, "Human key points text", [B("Human key points", { fontSize: 13 }), P("Where\nWhen\nWhy", { fontSize: 12, color: C.accent3 })], { x: 8.17, y: 1.4, w: 1.31, h: 2.6, valign: "middle", align: "center" });
  card(s, "Metrics strip", 0.5, 4.2, 9.0, 0.85, "gray");
  txt(s, "Metrics text", [P("Metrics: ", { bold: true, color: C.text2 }), P("recall and over-claim rate.   "), P("Key points are never given to the LLM.", { bold: true, color: C.accent4 })], { x: 0.65, y: 4.2, w: 8.7, h: 0.85, fontSize: 15, valign: "middle" });
}

// ---------- 8 MS 2/3 ----------
{
  const s = content("Master's · 2/3", "Five literature-grounded bad-UI techniques", "Master's",
    "The test sites are mock shopping and job-search sites. The bad versions embed five techniques, each grounded in the literature: decoys with similar names, decorative noise, shifting button positions, inconsistent design, and a low-contrast progress indicator. Each technique has its own version, so effects can be separated, plus one version with all five. Nothing scrolls, so gaze coordinates stay reliable, and twenty areas of interest are defined on every site.");
  const T = [
    ["T1", "Similar-name decoys", "Duncan & Humphreys 1989"],
    ["T2", "Decorative noise", "Burke et al. 2005"],
    ["T3", "Shifting button positions", "McCarthy et al. 2003"],
    ["T4", "Inconsistent design", "Mendel 2010/2012 etc."],
    ["T5", "Low-contrast progress indicator", "Yu et al. 2022; Legge et al. 1997"],
  ];
  const w = 1.7, gap = 0.125;
  T.forEach((t, i) => {
    const x = 0.5 + i * (w + gap);
    card(s, `Technique card ${t[0]}`, x, 1.35, w, 2.3, "gray");
    s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.text2 }, line: { color: C.text2, width: 0 }, objectName: `Badge ${t[0]}` });
    txt(s, `Badge text ${t[0]}`, t[0], { x: x + 0.12, y: 1.5, w: 0.5, h: 0.5, fontSize: 13, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
    txt(s, `Technique name ${t[0]}`, t[1], { x: x + 0.05, y: 2.1, w: w - 0.1, h: 0.8, fontSize: 14, bold: true });
    txt(s, `Technique ref ${t[0]}`, t[2], { x: x + 0.05, y: 2.95, w: w - 0.1, h: 0.65, fontSize: 11, color: C.accent3 });
  });
  const facts = [["7", "versions per site: G, B-T1…T5, B-all"], ["2", "genres: shopping, job search"], ["0", "scrolling, so gaze stays reliable"], ["20", "areas of interest per site"]];
  facts.forEach((f, i) => {
    const x = 0.5 + i * 2.28;
    card(s, `Fact ${i + 1}`, x, 3.9, 2.13, 1.15, "blue");
    txt(s, `Fact num ${i + 1}`, f[0], { x: x + 0.05, y: 3.9, w: 0.75, h: 1.15, fontSize: 30, bold: true, color: C.text2, valign: "middle" });
    txt(s, `Fact label ${i + 1}`, f[1], { x: x + 0.8, y: 3.9, w: 1.3, h: 1.15, fontSize: 12, valign: "middle" });
  });
}

// ---------- 9 MS 3/3 ----------
{
  const s = content("Master's · 3/3", "Status and take-away", "Master's",
    "Prototypes for both sites are complete, and a six-person pilot is planned. So far I only have a three-person preliminary study and a wiring check with mock LLM responses, so I cannot claim results yet; the main study will recruit forty to sixty-four participants. Whatever the outcome, showing where an LLM's interpretation breaks down is itself a useful finding. My goal is to help UX teams find where and why users hesitate, with less burden on users. Thank you.");
  const steps = [
    ["DONE", "Prototypes", "Both sites complete", "solid"],
    ["PLANNED", "Pilot", "N = 6", "blue"],
    ["PLANNED", "Main study", "N = 40–64", "blue"],
  ];
  steps.forEach((p, i) => {
    const x = 0.5 + i * 3.15;
    card(s, `Step ${i + 1}`, x, 1.4, 2.7, 1.3, p[3]);
    txt(s, `Step text ${i + 1}`, [B(p[0], { fontSize: 11 }), B(p[1], { fontSize: 20 }), P(p[2], { fontSize: 14 })], { x: x + 0.12, y: 1.4, w: 2.5, h: 1.3, valign: "middle", color: p[3] === "solid" ? C.background1 : C.text1 });
    if (i < 2) line(s, `Step arrow ${i + 1}`, x + 2.75, 2.05, 0.35);
  });
  card(s, "Status box", 0.5, 2.95, 9.0, 0.85, "red");
  txt(s, "Status text", [P("So far: ", { bold: true, color: C.accent4 }), P("N = 3 preliminary study and a wiring check with mock LLM responses. No results are claimed yet.")], { x: 0.65, y: 2.95, w: 8.7, h: 0.85, fontSize: 15, valign: "middle" });
  card(s, "Take-away", 0.5, 4.0, 9.0, 1.05, "solid");
  txt(s, "Take-away text", [B("Help UX teams find where and why users hesitate, with less burden on users.", { fontSize: 17 }), P("Showing where an LLM's interpretation breaks down is itself a useful finding.", { fontSize: 13 })], { x: 0.65, y: 4.0, w: 8.7, h: 1.05, valign: "middle", color: C.background1 });
}

(async () => {
  const out = __dirname + "/english_research_intro.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
})();
