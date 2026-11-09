/**
 * Builds the docxtemplater template from the original ITEC CV.
 *
 *   input : templates/source/CV_ITEC_WME.docx   (original CV, not committed)
 *   output: public/templates/cv-itec.docx       (template with {placeholders})
 *
 * Only the text content is replaced: page setup, styles, numbering, header
 * (logo + code), footer, table borders and colours are kept byte for byte.
 *
 * Run: npm run template
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import PizZip from "pizzip";

const SRC = "templates/source/CV_ITEC_WME.docx";
const OUT = "public/templates/cv-itec.docx";
const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const XML_NS = "http://www.w3.org/XML/1998/namespace";

if (!existsSync(SRC)) {
  console.error(`Fichier source introuvable : ${SRC}`);
  process.exit(1);
}

const zip = new PizZip(readFileSync(SRC));
const parse = (name) => new DOMParser().parseFromString(zip.file(name).asText(), "text/xml");
const save = (name, doc) => zip.file(name, new XMLSerializer().serializeToString(doc));

// ---------- helpers ----------
const kids = (el, name) =>
  Array.from(el.childNodes).filter((n) => n.nodeType === 1 && (!name || n.nodeName === name));
const textOf = (el) =>
  Array.from(el.getElementsByTagName("w:t"))
    .map((t) => t.textContent)
    .join("");
const runRPrs = (p) =>
  kids(p, "w:r").map((r) => kids(r, "w:rPr")[0] ?? null);

function expectText(el, fragment) {
  const t = textOf(el);
  if (!t.includes(fragment)) {
    throw new Error(`Structure inattendue : "${fragment}" attendu, trouvé "${t.slice(0, 80)}"`);
  }
}

/** Replace all runs of a paragraph by new runs: [{ text, rPr }] */
function setRuns(p, segments) {
  const doc = p.ownerDocument;
  for (const child of kids(p)) {
    if (!["w:pPr", "w:bookmarkStart", "w:bookmarkEnd"].includes(child.nodeName)) p.removeChild(child);
  }
  for (const { text, rPr } of segments) {
    const r = doc.createElementNS(W, "w:r");
    if (rPr) r.appendChild(rPr.cloneNode(true));
    const t = doc.createElementNS(W, "w:t");
    t.setAttributeNS(XML_NS, "xml:space", "preserve");
    t.appendChild(doc.createTextNode(text));
    r.appendChild(t);
    p.appendChild(r);
  }
}
/** Single run, keeping the formatting of the paragraph's run at index `i`. */
const setText = (p, text, i = 0) => setRuns(p, [{ text, rPr: runRPrs(p)[i] }]);

/** A bare paragraph holding only a loop/condition tag (removed by paragraphLoop). */
function tagP(doc, tag) {
  const p = doc.createElementNS(W, "w:p");
  const r = doc.createElementNS(W, "w:r");
  const t = doc.createElementNS(W, "w:t");
  t.appendChild(doc.createTextNode(tag));
  r.appendChild(t);
  p.appendChild(r);
  return p;
}
const before = (ref, node) => ref.parentNode.insertBefore(node, ref);
const after = (ref, node) => ref.parentNode.insertBefore(node, ref.nextSibling);
const remove = (...nodes) => nodes.forEach((n) => n.parentNode.removeChild(n));
const cell = (tbl, r, c) => kids(kids(tbl, "w:tr")[r], "w:tc")[c];

// ---------- document.xml ----------
const doc = parse("word/document.xml");
const body = doc.getElementsByTagName("w:body")[0];
const B = kids(body); // snapshot of the original top-level elements

// Title + years
expectText(B[0], "Product Owner");
setText(B[0], "{title}");
expectText(B[1], "ans d");
setText(B[1], "{yearsLabel}");

// --- Compétences / Secteurs table ---
{
  const tbl = B[3];
  const c0 = kids(cell(tbl, 1, 0), "w:p");
  expectText(c0[0], "Compétences techniques");
  expectText(c0[38], "Compétences fonctionnelles");
  expectText(c0[48], "Reporting décisionnel");

  // Technical skills: category (bold bullet) + items (sub bullets)
  before(c0[0], tagP(doc, "{#hasTechSkills}"));
  before(c0[1], tagP(doc, "{#techSkills}"));
  setText(c0[1], "{category} :");
  setText(c0[2], "{-w:p items}{.}{/items}");
  after(c0[2], tagP(doc, "{/techSkills}"));
  remove(...c0.slice(3, 37));
  after(c0[37], tagP(doc, "{/hasTechSkills}")); // keeps the spacer paragraph inside the condition

  // Functional skills: "Label : description" (label bold)
  const [bold, normal] = [runRPrs(c0[48])[0], runRPrs(c0[48])[1]];
  setRuns(c0[48], [
    { text: "{-w:p funcSkills}{label}{#hasDescription} :", rPr: bold },
    { text: " {description}{/hasDescription}{/funcSkills}", rPr: normal },
  ]);
  before(c0[38], tagP(doc, "{#hasFuncSkills}"));
  before(c0[39], c0[48]);
  remove(...c0.slice(39, 55).filter((p) => p !== c0[48]));
  before(c0[55], tagP(doc, "{/hasFuncSkills}"));

  // Sectors (right column): the 16 empty paragraphs above are the original spacing
  const c1 = kids(cell(tbl, 1, 1), "w:p");
  expectText(c1[16], "Assurance");
  setText(c1[16], "{-w:p sectors}{.}{/sectors}");
  remove(...c1.slice(17));
}

// --- Formations / Langues table ---
{
  const tbl = B[6];
  const c0 = kids(cell(tbl, 1, 0), "w:p");
  expectText(c0[0], "Diplômes");
  expectText(c0[4], "Certifications");
  expectText(c0[10], "Formations");

  // Diplomas: "2011 : Degree : School" (degree bold)
  const normal = runRPrs(c0[2]).at(-1);
  const bold = runRPrs(c0[1])[1];
  setRuns(c0[1], [
    { text: "{-w:p diplomas}{#hasYear}{year} : {/hasYear}", rPr: runRPrs(c0[1])[0] },
    { text: "{degree}", rPr: bold },
    { text: "{#hasSchool} : {school}{/hasSchool}{/diplomas}", rPr: normal },
  ]);
  remove(c0[2]);
  before(c0[0], tagP(doc, "{#hasDiplomas}"));
  after(c0[3], tagP(doc, "{/hasDiplomas}"));

  // Certifications: "CODE : description"
  setText(c0[5], "{-w:p certifications}{name}{#hasDescription} : {description}{/hasDescription}{/certifications}");
  remove(...c0.slice(6, 9));
  before(c0[4], tagP(doc, "{#hasCertifications}"));
  after(c0[9], tagP(doc, "{/hasCertifications}"));

  // Trainings: one bullet each (trailing empty paragraph kept so the cell is never empty)
  setText(c0[11], "{-w:p trainings}{.}{/trainings}");
  remove(...c0.slice(12, 19));
  before(c0[10], tagP(doc, "{#hasTrainings}"));
  before(c0[19], tagP(doc, "{/hasTrainings}"));

  // Languages
  const c1 = kids(cell(tbl, 1, 1), "w:p");
  expectText(c1[1], "Anglais");
  setText(c1[1], "{-w:p languages}{name}{#hasLevel} {level}{/hasLevel}{/languages}");
}

// --- Résumé de carrière table: one row repeated per experience ---
{
  const tbl = B[12];
  const rows = kids(tbl, "w:tr");
  expectText(rows[0], "Années");
  const [c0, c1, c2] = kids(rows[1], "w:tc").map((tc) => kids(tc, "w:p")[0]);
  setText(c0, "{#career}{period}");
  setText(c1, "{company}");
  setText(c2, "{role}{/career}");
  remove(...rows.slice(2));
}

// --- Expériences professionnelles: one block repeated per experience ---
{
  expectText(B[16], "EXPERIENCES PROFESSIONNELLES");
  const [T, E19, P20, E21, P22, P23, P24, E25, P26, P27, P107, PB] = [
    B[18], B[19], B[20], B[21], B[22], B[23], B[24], B[25], B[26], B[27], B[107], B[147],
  ];
  expectText(cell(T, 0, 0), "Ajusteo");
  expectText(P20, "Clients");
  expectText(P22, "Projet");
  expectText(P26, "Tâches effectuées");
  expectText(P107, "Environnement technique");
  if (!PB.getElementsByTagName("w:br").length) throw new Error("Saut de page attendu (élément 147)");

  setText(kids(cell(T, 0, 0), "w:p")[0], "{company}");
  setText(kids(cell(T, 0, 1), "w:p")[0], "{period}");
  setText(kids(cell(T, 1, 0), "w:p")[0], "{role}");
  setText(P20, "{clientsLabel} : {clients}");
  setRuns(P22, [
    { text: "Projet : ", rPr: runRPrs(P22)[0] },
    { text: "{project}", rPr: runRPrs(P22)[2] },
  ]);
  setText(P24, "{title}");
  setText(P27, "{-w:p tasks}{.}{/tasks}");
  setRuns(P107, [
    { text: "Environnement technique : ", rPr: runRPrs(P107)[0] },
    { text: "{environment}", rPr: runRPrs(P107)[2] },
  ]);

  const anchor = B[181]; // trailing empty paragraph before sectPr
  remove(...B.slice(18, 181));
  const t = (tag) => tagP(doc, tag);
  const sequence = [
    t("{#experiences}"),
    t("{#pageBreakBefore}"), PB, t("{/pageBreakBefore}"),
    T, E19,
    t("{#hasClients}"), P20, E21, t("{/hasClients}"),
    t("{#hasProject}"), P22, P23, t("{/hasProject}"),
    t("{#roles}"),
    t("{#hasTitle}"), P24, E25, t("{/hasTitle}"),
    t("{#hasTasks}"), P26, P27, t("{/hasTasks}"),
    t("{/roles}"),
    t("{#hasEnvironment}"), P107, t("{/hasEnvironment}"),
    t("{/experiences}"),
  ];
  for (const node of sequence) before(anchor, node);
}
save("word/document.xml", doc);

// ---------- header: CV code ----------
{
  const hdr = parse("word/header1.xml");
  const p = Array.from(hdr.getElementsByTagName("w:p")).find((x) => textOf(x).trim() === "CV_ITEC_WME");
  if (!p) throw new Error("Code CV introuvable dans l'en-tête");
  const ts = Array.from(p.getElementsByTagName("w:t"));
  ts.forEach((t, i) => {
    while (t.firstChild) t.removeChild(t.firstChild);
    t.appendChild(hdr.createTextNode(i === 0 ? "{cvCode}" : ""));
  });
  save("word/header1.xml", hdr);
}

// No automatic hyphenation: the original CVs avoided it with manual line breaks,
// generated text wraps naturally so hyphenation would cut words everywhere.
{
  const settings = parse("word/settings.xml");
  for (const el of Array.from(settings.getElementsByTagName("w:autoHyphenation"))) el.parentNode.removeChild(el);
  save("word/settings.xml", settings);
}

// Clean metadata of the source file
{
  const core = parse("docProps/core.xml");
  for (const tag of ["dc:creator", "cp:lastModifiedBy"]) {
    const el = core.getElementsByTagName(tag)[0];
    if (el) {
      while (el.firstChild) el.removeChild(el.firstChild);
      el.appendChild(core.createTextNode("ITEC"));
    }
  }
  save("docProps/core.xml", core);
}

writeFileSync(OUT, zip.generate({ type: "nodebuffer", compression: "DEFLATE" }));
console.log(`Modèle généré : ${OUT}`);
