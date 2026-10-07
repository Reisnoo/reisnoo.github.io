// Builds slides/english_research_intro.pptx (9 slides, 16:9, script in notes)
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/mnt/skills/public/pptx/scripts/apply_theme.js");

const THEME = {
  name: "Hesitation",
  headFontFace: "Georgia",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F2937", lt1: "FFFFFF", dk2: "14213D", lt2: "F3F6F9",
    accent1: "0F8B8D", accent2: "E8A33D", accent3: "6B7280",
    accent4: "C8553D", accent5: "3A6EA5", accent6: "D8EEEE",
    hlink: "0F8B8D", folHlink: "6B7280",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Understanding Why Users Hesitate";
pres.author = "Reina Ikeda";
const C = pres.SchemeColor;

pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: C.text2 },
  objects: [],
  slideNumber: undefined,
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background2 },
  objects: [
    { text: { text: "Understanding Why Users Hesitate · R. Ikeda", options: { x: 0.5, y: 5.28, w: 6, h: 0.25, fontSize: 9, color: C.accent3, margin: 0 } } },
  ],
  slideNumber: { x: 9.0, y: 5.28, w: 0.5, h: 0.25, fontSize: 9, color: C.accent3, align: "right" },
  placeholders: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.text2, fontFace: THEME.headFontFace, valign: "middle", margin: 0 }, text: "" } },
  ],
});

["Intro","Undergraduate","Bridge","Master's"].forEach(t => pres.addSection({ title: t }));
function content(title, section, notes) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title", x: 0.5, y: 0.3, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.text2, fontFace: THEME.headFontFace, valign: "middle", margin: 0 });
  s.addNotes(notes);
  return s;
}
function card(s, name, x, y, w, h, fill = C.background1, line = null) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: fill }, line: line ? { color: line, width: 1 } : { color: C.background2, width: 0 },
    objectName: name,
  });
}
function txt(s, name, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0.08, color: C.text1, fontSize: 13, valign: "top", objectName: name }, o));
}
function arrow(s, name, x, y, w = 0.4) {
  s.addShape(pres.shapes.RIGHT_ARROW, { x, y, w, h: 0.3, fill: { color: C.accent3 }, line: { color: C.accent3, width: 0 }, objectName: name });
}
function chip(s, name, text, x, y, w, color = C.accent1) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.32, rectRadius: 0.16, fill: { color }, line: { color, width: 0 }, objectName: name });
  s.addText(text, { isTextBox: true, x, y, w, h: 0.32, fontSize: 11, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, objectName: name + " text" });
}

const UG = "Undergraduate", MS = "Master's";

// ---------- 1 Title ----------
{
  const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Intro" });
  s.addShape(pres.shapes.OVAL, { x: 7.4, y: -1.2, w: 4.4, h: 4.4, fill: { color: C.accent1, transparency: 70 }, line: { color: C.accent1, width: 0 }, objectName: "Gaze ring outer" });
  s.addShape(pres.shapes.OVAL, { x: 8.3, y: -0.3, w: 2.6, h: 2.6, fill: { color: C.accent2, transparency: 55 }, line: { color: C.accent2, width: 0 }, objectName: "Gaze ring inner" });
  s.addText("Understanding Why Users Hesitate", { isTextBox: true, x: 0.6, y: 1.2, w: 8.2, h: 1.5, fontFace: THEME.headFontFace, fontSize: 36, bold: true, color: C.background1, margin: 0, valign: "top", objectName: "Title" });
  s.addText("From think-aloud prediction to LLM-based gaze interpretation", { isTextBox: true, x: 0.6, y: 2.9, w: 7.6, h: 0.8, fontSize: 20, color: C.accent6, margin: 0, valign: "top", objectName: "Subtitle" });
  s.addText("Reina Ikeda · Master's student (1st year), Tokyo Metropolitan University", { isTextBox: true, x: 0.6, y: 4.5, w: 8, h: 0.35, fontSize: 14, color: C.background1, margin: 0, objectName: "Byline" });
  s.addNotes("Hello, I'm Reina Ikeda, a first-year master's student at Tokyo Metropolitan University. I'll introduce my research on understanding why users hesitate, from my undergraduate thesis to my master's work.");
}

// ---------- 2 Overview ----------
{
  const s = content("Think-aloud explains why, but at a cost", "Intro",
    "Usability tests often use the think-aloud method: users speak their thoughts while operating a product. It reveals why people struggle, but talking while acting is a burden and can change natural behavior. My idea is to use eye movements and screen information, together with a large language model, to understand hesitation without that burden. My thesis predicted think-aloud; my master's research explains where and why users get stuck.");
  const cols = [
    ["Problem", "Think-aloud shows why users struggle.", "But talking while acting is a burden and can change natural behavior."],
    ["Idea", "Gaze + UI information + LLM.", "Understand hesitation without asking users to speak."],
    ["Two stages", "", ""],
  ];
  const xs = [0.5, 3.6, 6.7];
  cols.forEach((c, i) => {
    card(s, `Card ${c[0]}`, xs[i], 1.35, 2.8, 3.2);
    s.addText(c[0].toUpperCase(), { isTextBox: true, x: xs[i] + 0.2, y: 1.5, w: 2.4, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 2, margin: 0, objectName: `Label ${c[0]}` });
  });
  txt(s, "Problem body", [
    { text: "Think-aloud shows why users struggle.", options: { breakLine: true, bold: true, fontSize: 16 } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "But talking while acting is a burden and can change natural behavior.", options: { fontSize: 14 } },
  ], { x: 0.7, y: 1.9, w: 2.4, h: 2.5 });
  txt(s, "Idea body", [
    { text: "Gaze + UI information + LLM", options: { breakLine: true, bold: true, fontSize: 16 } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "Understand hesitation without asking users to speak.", options: { fontSize: 14 } },
  ], { x: 3.8, y: 1.9, w: 2.4, h: 2.5 });
  // two stages
  card(s, "Stage 1", 6.9, 1.95, 2.4, 1.1, C.accent6);
  txt(s, "Stage 1 text", [
    { text: "Undergraduate", options: { bold: true, breakLine: true } },
    { text: "Predict think-aloud", options: { fontSize: 13 } },
  ], { x: 7.0, y: 2.0, w: 2.2, h: 1.0, fontSize: 15, valign: "middle" });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 7.95, y: 3.1, w: 0.3, h: 0.35, fill: { color: C.accent3 }, line: { color: C.accent3, width: 0 }, objectName: "Stage arrow" });
  card(s, "Stage 2", 6.9, 3.5, 2.4, 1.0, C.accent2);
  txt(s, "Stage 2 text", [
    { text: "Master's", options: { bold: true, breakLine: true } },
    { text: "Explain where and why", options: { fontSize: 13 } },
  ], { x: 7.0, y: 3.55, w: 2.2, h: 0.9, fontSize: 15, valign: "middle", color: C.text2 });
}

// ---------- 3 UG 1/3 ----------
{
  const s = content("Undergraduate (1/3): EsTA predicts think-aloud", UG,
    "In my thesis I proposed EsTA, which predicts think-aloud from gaze and UI information. A 120-hertz eye tracker records fixations, saccades and pupil size, and we add element coordinates and HTML code. GPT-4 receives both and writes the think-aloud as natural text, including doubt. As a baseline, InTA uses UI information only. Twenty university students performed four conditions: good or bad UI, on shopping and video sites. The bad UIs deliberately violated Nielsen's heuristics.");
  card(s, "Gaze box", 0.5, 1.4, 2.7, 1.1, C.accent6);
  txt(s, "Gaze text", [
    { text: "Gaze (Tobii, 120 Hz)", options: { bold: true, breakLine: true } },
    { text: "fixations · saccades · pupil size", options: { fontSize: 12 } },
  ], { x: 0.6, y: 1.45, w: 2.5, h: 1.0, valign: "middle" });
  card(s, "UI box", 0.5, 2.7, 2.7, 1.1, C.accent6);
  txt(s, "UI text", [
    { text: "UI information", options: { bold: true, breakLine: true } },
    { text: "element coordinates · HTML", options: { fontSize: 12 } },
  ], { x: 0.6, y: 2.75, w: 2.5, h: 1.0, valign: "middle" });
  arrow(s, "Arrow in", 3.35, 2.55);
  card(s, "LLM box", 3.9, 1.9, 1.9, 1.3, C.text2);
  txt(s, "LLM text", "GPT-4", { x: 3.9, y: 1.9, w: 1.9, h: 1.3, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle", fontFace: THEME.headFontFace });
  arrow(s, "Arrow out", 5.95, 2.4);
  card(s, "Output box", 6.5, 1.9, 3.0, 1.3, C.accent2);
  txt(s, "Output text", [
    { text: "Predicted think-aloud", options: { bold: true, breakLine: true } },
    { text: "natural text, including doubt", options: { fontSize: 12 } },
  ], { x: 6.6, y: 1.95, w: 2.8, h: 1.2, valign: "middle", color: C.text2 });
  card(s, "Baseline note", 0.5, 4.05, 9.0, 0.95, C.background1);
  txt(s, "Baseline text", [
    { text: "Baseline InTA: ", options: { bold: true, color: C.accent4 } },
    { text: "UI information only (no gaze).   ", options: {} },
    { text: "Study: ", options: { bold: true, color: C.accent1 } },
    { text: "20 students × 4 conditions (Good/Bad UI × shopping/video). Bad UIs violate Nielsen's heuristics.", options: {} },
  ], { x: 0.65, y: 4.1, w: 8.7, h: 0.85, fontSize: 13, valign: "middle" });
}

// ---------- 4 UG 2/3 ----------
{
  const s = content("Undergraduate (2/3): similar, but EsTA says more", UG,
    "We measured similarity to what participants actually said, using BERTScore. Both methods exceeded 0.617, a machine-translation benchmark, in every condition. EsTA was slightly lower in three of four conditions. Reading the outputs showed why: EsTA wrote thoughts users never voiced, which the metric counts as saying too much.");
  s.addChart(pres.charts.BAR, [
    { name: "InTA (UI only)", labels: ["Good A", "Bad A", "Good B", "Bad B"], values: [0.680, 0.683, 0.691, 0.670] },
    { name: "EsTA (gaze + UI)", labels: ["Good A", "Bad A", "Good B", "Bad B"], values: [0.673, 0.677, 0.688, 0.682] },
  ], {
    x: 0.4, y: 1.25, w: 5.9, h: 3.65, barDir: "col", barGrouping: "clustered",
    chartColors: ["6B7280", "0F8B8D"],
    showTitle: true, title: "BERTScore vs. actual utterances (axis starts at 0.60)", titleFontSize: 12, titleColor: "14213D", titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 10, dataLabelFormatCode: "0.000", dataLabelFontFace: "+mn-lt", dataLabelColor: "1F2937",
    valAxisMinVal: 0.6, valAxisMaxVal: 0.71, valAxisMajorUnit: 0.02, valAxisLabelFormatCode: "0.00",
    valAxisLabelColor: "6B7280", catAxisLabelColor: "1F2937", valAxisLabelFontFace: "+mn-lt", catAxisLabelFontFace: "+mn-lt", valAxisLabelFontSize: 10, catAxisLabelFontSize: 11,
    valGridLine: { color: "D9DEE5", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: "1F2937",
  });
  card(s, "Callout 1", 6.6, 1.4, 2.9, 1.0, C.background1);
  txt(s, "Callout 1 text", [
    { text: "All above 0.617", options: { bold: true, fontSize: 18, color: C.accent1, breakLine: true } },
    { text: "WMT24 benchmark, every condition", options: { fontSize: 12 } },
  ], { x: 6.7, y: 1.45, w: 2.7, h: 0.9, valign: "middle" });
  card(s, "Callout 2", 6.6, 2.6, 2.9, 1.0, C.background1);
  txt(s, "Callout 2 text", [
    { text: "EsTA lower in 3 of 4", options: { bold: true, fontSize: 18, color: C.accent3, breakLine: true } },
    { text: "Good A, Bad A, Good B", options: { fontSize: 12 } },
  ], { x: 6.7, y: 2.65, w: 2.7, h: 0.9, valign: "middle" });
  card(s, "Callout 3", 6.6, 3.8, 2.9, 1.2, C.accent2);
  txt(s, "Callout 3 text", [
    { text: "Why? \"Saying too much\"", options: { bold: true, fontSize: 16, breakLine: true } },
    { text: "EsTA wrote thoughts users never voiced.", options: { fontSize: 12 } },
  ], { x: 6.7, y: 3.85, w: 2.7, h: 1.1, valign: "middle", color: C.text2 });
  txt(s, "Axis note", "A = e-commerce, B = video streaming", { x: 0.5, y: 5.0, w: 5.5, h: 0.25, fontSize: 9, color: C.accent3, margin: 0 });
}

// ---------- 5 UG 3/3 ----------
{
  const s = content("Undergraduate (3/3): gaze recovered an unspoken calculation", UG,
    "Here is a cart-checking scene. The participant said they would now check the cart. The UI-only output skipped the checking and said the budget comes later. EsTA described adding shipping to reach 12,900 yen and confirming it fit the budget, which matched the gaze moving through the prices. So gaze recovered a calculation that was never spoken. This was presented at the Japan Ergonomics Society last December.");
  const quotes = [
    ["ACTUAL UTTERANCE", C.accent3, "“Now I have all four items, so let me check the cart.”"],
    ["InTA (UI only)", C.accent5, "“…items complete, I’ll check the budget later.”"],
    ["EsTA (gaze + UI)", C.accent1, "“…¥12,400, plus ¥500 shipping makes ¥12,900, within the ¥14,000 budget.”"],
  ];
  quotes.forEach((q, i) => {
    const x = 0.5 + i * 3.05;
    card(s, `Quote card ${i + 1}`, x, 1.4, 2.9, 2.6, C.background1);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 2.9, h: 0.45, fill: { color: q[1] }, line: { color: q[1], width: 0 }, objectName: `Quote head ${i + 1}` });
    txt(s, `Quote label ${i + 1}`, q[0], { x: x + 0.1, y: 1.4, w: 2.7, h: 0.45, fontSize: 12, bold: true, color: C.background1, valign: "middle" });
    txt(s, `Quote body ${i + 1}`, q[2], { x: x + 0.1, y: 2.0, w: 2.7, h: 1.9, fontSize: 15, italic: true });
  });
  card(s, "Takeaway", 0.5, 4.2, 9.0, 0.5, C.accent6);
  txt(s, "Takeaway text", "Gaze moving through the prices matched the unspoken budget check.", { x: 0.6, y: 4.2, w: 8.8, h: 0.5, fontSize: 14, bold: true, valign: "middle", color: C.text2 });
  txt(s, "Venue", "Presented at the Japan Ergonomics Society Kanto Branch, Dec 2025. Excerpts translated from Japanese.", { x: 0.5, y: 4.85, w: 9, h: 0.3, fontSize: 10, color: C.accent3, margin: 0 });
}

// ---------- 6 Bridge ----------
{
  const s = content("Bridge: from “saying too much” to a measurable goal", "Bridge",
    "The thesis left two challenges: the model sometimes says too much, and time order is weakly handled. So in my master's research I changed the goal and the evaluation. The tool now explains what users struggle with, and I check it against key points made by a human analyst. Saying too much becomes a number: the over-claim rate.");
  card(s, "Challenge 1", 0.5, 1.4, 3.6, 1.45, C.background1);
  txt(s, "Challenge 1 text", [
    { text: "Challenge 1", options: { bold: true, color: C.accent4, fontSize: 12, breakLine: true } },
    { text: "Overstatement", options: { bold: true, fontSize: 20, breakLine: true } },
    { text: "The model sometimes says too much.", options: { fontSize: 13 } },
  ], { x: 0.6, y: 1.45, w: 3.4, h: 1.35, valign: "middle" });
  card(s, "Challenge 2", 0.5, 3.1, 3.6, 1.45, C.background1);
  txt(s, "Challenge 2 text", [
    { text: "Challenge 2", options: { bold: true, color: C.accent4, fontSize: 12, breakLine: true } },
    { text: "Time order", options: { bold: true, fontSize: 20, breakLine: true } },
    { text: "Weakly handled in the thesis.", options: { fontSize: 13 } },
  ], { x: 0.6, y: 3.15, w: 3.4, h: 1.35, valign: "middle" });
  arrow(s, "Bridge arrow", 4.3, 2.85, 0.6);
  card(s, "New goal", 5.1, 1.4, 4.4, 1.45, C.accent1);
  txt(s, "New goal text", [
    { text: "New goal", options: { bold: true, fontSize: 12, color: C.accent6, breakLine: true } },
    { text: "Explain what users struggle with", options: { bold: true, fontSize: 18, breakLine: true } },
    { text: "where, when and why", options: { fontSize: 13 } },
  ], { x: 5.2, y: 1.45, w: 4.2, h: 1.35, valign: "middle", color: C.background1 });
  card(s, "New evaluation", 5.1, 3.1, 4.4, 1.45, C.accent2);
  txt(s, "New evaluation text", [
    { text: "New evaluation", options: { bold: true, fontSize: 12, breakLine: true } },
    { text: "Check against human key points", options: { bold: true, fontSize: 18, breakLine: true } },
    { text: "“Saying too much” → over-claim rate", options: { fontSize: 13 } },
  ], { x: 5.2, y: 3.15, w: 4.2, h: 1.35, valign: "middle", color: C.text2 });
}

// ---------- 7 MS 1/3 ----------
{
  const s = content("Master's (1/3): a tool that explains, checked against humans", MS,
    "The tool takes two inputs. From gaze: dwell time and visit counts for each design technique, compared between good and bad versions. From the UI: which screen contains which technique, the HTML and CSS, and the task context. The LLM writes, for each technique, which element, on which screen, and why it caused trouble, plus a summary and suggestions. The core value is integrating two different modalities and explaining them; judging hesitation itself is not the goal. I evaluate against human key points, covering where, when and why, using recall and over-claim rate. These key points are never given to the LLM.");
  card(s, "Input gaze", 0.5, 1.35, 2.6, 1.15, C.accent6);
  txt(s, "Input gaze text", [
    { text: "Gaze metrics", options: { bold: true, breakLine: true } },
    { text: "dwell time · visits, per technique, Good vs. Bad", options: { fontSize: 11 } },
  ], { x: 0.55, y: 1.38, w: 2.5, h: 1.1, valign: "middle" });
  card(s, "Input UI", 0.5, 2.7, 2.6, 1.15, C.accent6);
  txt(s, "Input UI text", [
    { text: "UI structure", options: { bold: true, breakLine: true } },
    { text: "screen ↔ technique · HTML/CSS · task", options: { fontSize: 11 } },
  ], { x: 0.55, y: 2.73, w: 2.5, h: 1.1, valign: "middle" });
  arrow(s, "Arrow 1", 3.2, 2.5, 0.35);
  card(s, "LLM", 3.65, 1.9, 1.3, 1.3, C.text2);
  txt(s, "LLM text", "LLM", { x: 3.65, y: 1.9, w: 1.3, h: 1.3, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle", fontFace: THEME.headFontFace });
  arrow(s, "Arrow 2", 5.05, 2.4, 0.35);
  card(s, "Output", 5.5, 1.35, 2.2, 2.5, C.accent2);
  txt(s, "Output text", [
    { text: "Output", options: { bold: true, breakLine: true } },
    { text: "Per technique: which element, which screen, why it caused trouble", options: { fontSize: 12, breakLine: true } },
    { text: "+ summary", options: { fontSize: 12, breakLine: true } },
    { text: "+ suggestions", options: { fontSize: 12 } },
  ], { x: 5.55, y: 1.4, w: 2.1, h: 2.4, valign: "middle", color: C.text2 });
  arrow(s, "Arrow 3", 7.8, 2.4, 0.35);
  card(s, "Human key points", 8.25, 1.35, 1.25, 2.5, C.background1, C.accent4);
  txt(s, "Human key points text", [
    { text: "Human key points", options: { bold: true, breakLine: true } },
    { text: "Where\nWhen\nWhy", options: { fontSize: 11 } },
  ], { x: 8.28, y: 1.4, w: 1.2, h: 2.4, valign: "middle", fontSize: 12, align: "center" });
  card(s, "Metrics strip", 0.5, 4.1, 9.0, 0.85, C.background1);
  txt(s, "Metrics text", [
    { text: "Metrics: ", options: { bold: true, color: C.accent1 } },
    { text: "recall, and over-claim rate.  ", options: {} },
    { text: "Key points are never given to the LLM.", options: { bold: true, color: C.accent4 } },
  ], { x: 0.65, y: 4.12, w: 8.7, h: 0.8, fontSize: 14, valign: "middle" });
}

// ---------- 8 MS 2/3 ----------
{
  const s = content("Master's (2/3): five literature-grounded bad-UI techniques", MS,
    "The test sites are mock shopping and job-search sites. The bad versions embed five techniques, each grounded in the literature: decoys with similar names, decorative noise, shifting button positions, inconsistent design, and a low-contrast progress indicator. Each technique has its own version, so effects can be separated, plus one version with all five. Nothing scrolls, so gaze coordinates stay reliable, and twenty areas of interest are defined on every site.");
  const T = [
    ["T1", "Similar-name decoys", "Duncan & Humphreys 1989"],
    ["T2", "Decorative noise", "Burke et al. 2005"],
    ["T3", "Shifting button positions", "McCarthy et al. 2003"],
    ["T4", "Inconsistent design", "Mendel 2010/2012 etc."],
    ["T5", "Low-contrast progress indicator", "Yu et al. 2022; Legge et al. 1997"],
  ];
  const w = 1.68, gap = 0.15;
  T.forEach((t, i) => {
    const x = 0.5 + i * (w + gap);
    card(s, `Technique card ${t[0]}`, x, 1.35, w, 2.3, C.background1);
    s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 }, objectName: `Badge ${t[0]}` });
    txt(s, `Badge text ${t[0]}`, t[0], { x: x + 0.12, y: 1.5, w: 0.5, h: 0.5, fontSize: 13, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
    txt(s, `Technique name ${t[0]}`, t[1], { x: x + 0.05, y: 2.1, w: w - 0.1, h: 0.8, fontSize: 14, bold: true });
    txt(s, `Technique ref ${t[0]}`, t[2], { x: x + 0.05, y: 2.95, w: w - 0.1, h: 0.65, fontSize: 10.5, color: C.accent3 });
  });
  const facts = [["7", "versions per site: G, B-T1…T5, B-all"], ["2", "genres: shopping, job search"], ["0", "scrolling, so gaze stays reliable"], ["20", "areas of interest per site"]];
  facts.forEach((f, i) => {
    const x = 0.5 + i * 2.28;
    card(s, `Fact ${i + 1}`, x, 3.9, 2.13, 1.1, C.accent6);
    txt(s, `Fact num ${i + 1}`, f[0], { x: x + 0.05, y: 3.95, w: 0.7, h: 1.0, fontSize: 28, bold: true, color: C.accent1, valign: "middle", fontFace: THEME.headFontFace });
    txt(s, `Fact label ${i + 1}`, f[1], { x: x + 0.75, y: 3.95, w: 1.35, h: 1.0, fontSize: 11, valign: "middle" });
  });
}

// ---------- 9 MS 3/3 ----------
{
  const s = content("Master's (3/3): status and take-away", MS,
    "Prototypes for both sites are complete, and a six-person pilot is planned. So far I only have a three-person preliminary study and a wiring check with mock LLM responses, so I cannot claim results yet; the main study will recruit forty to sixty-four participants. Whatever the outcome, showing where an LLM's interpretation breaks down is itself a useful finding. My goal is to help UX teams find where and why users hesitate, with less burden on users. Thank you.");
  const steps = [
    ["Done", "Prototypes", "Both sites complete", C.accent1, C.background1],
    ["Planned", "Pilot", "N = 6", C.accent2, C.text2],
    ["Planned", "Main study", "N = 40–64", C.accent2, C.text2],
  ];
  steps.forEach((p, i) => {
    const x = 0.5 + i * 3.1;
    card(s, `Step ${i + 1}`, x, 1.4, 2.7, 1.3, p[3]);
    txt(s, `Step text ${i + 1}`, [
      { text: p[0].toUpperCase(), options: { bold: true, fontSize: 11, breakLine: true } },
      { text: p[1], options: { bold: true, fontSize: 20, breakLine: true } },
      { text: p[2], options: { fontSize: 13 } },
    ], { x: x + 0.1, y: 1.45, w: 2.5, h: 1.2, valign: "middle", color: p[4] });
    if (i < 2) arrow(s, `Step arrow ${i + 1}`, x + 2.75, 1.95, 0.3);
  });
  card(s, "Honesty box", 0.5, 2.95, 9.0, 0.85, C.background1, C.accent4);
  txt(s, "Honesty text", [
    { text: "So far: ", options: { bold: true, color: C.accent4 } },
    { text: "N = 3 preliminary study and a wiring check with mock LLM responses. No results are claimed yet.", options: {} },
  ], { x: 0.65, y: 2.98, w: 8.7, h: 0.8, fontSize: 14, valign: "middle" });
  card(s, "Take-away", 0.5, 4.0, 9.0, 1.0, C.text2);
  txt(s, "Take-away text", [
    { text: "Help UX teams find where and why users hesitate, with less burden on users.", options: { bold: true, fontSize: 16, breakLine: true } },
    { text: "Showing where an LLM's interpretation breaks down is itself a useful finding.", options: { fontSize: 12, color: C.accent6 } },
  ], { x: 0.65, y: 4.03, w: 8.7, h: 0.95, valign: "middle", color: C.background1 });
}

(async () => {
  const out = __dirname + "/english_research_intro.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
})();
