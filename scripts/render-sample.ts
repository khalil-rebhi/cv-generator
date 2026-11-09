/**
 * Renders the example CV with the template, without the browser.
 * Run: npm run sample   ->  out-sample/CV_ITEC_WME.docx
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { renderDocx } from "../src/lib/generate";
import { sampleCv } from "../src/lib/sample";

const template = readFileSync("public/templates/cv-itec.docx");
mkdirSync("out-sample", { recursive: true });
const out = `out-sample/${sampleCv.fileName}.docx`;
writeFileSync(out, renderDocx(template, sampleCv));
console.log(`OK -> ${out}`);
