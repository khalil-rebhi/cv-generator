import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import type { CvData } from "./types";
import { toTemplateData } from "./format";

export const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Fills the ITEC Word template with the CV data and returns the .docx bytes. */
export function renderDocx(template: ArrayBuffer | Uint8Array, cv: CvData): Uint8Array {
  const zip = new PizZip(template);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
  });
  doc.render(toTemplateData(cv));
  return doc.getZip().generate({ type: "uint8array", compression: "DEFLATE" });
}

let templateCache: Promise<ArrayBuffer> | null = null;

/** Loads the template once (browser). */
export function loadTemplate(): Promise<ArrayBuffer> {
  if (!templateCache) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    templateCache = fetch(`${base}/templates/cv-itec.docx`).then((r) => {
      if (!r.ok) throw new Error(`Modèle introuvable (${r.status})`);
      return r.arrayBuffer();
    });
    templateCache.catch(() => (templateCache = null));
  }
  return templateCache;
}

export async function generateDocxBlob(cv: CvData): Promise<Blob> {
  const bytes = renderDocx(await loadTemplate(), cv);
  return new Blob([bytes as BlobPart], { type: DOCX_MIME });
}
