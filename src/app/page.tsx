"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";
import CvForm from "@/components/CvForm";
import LivePreview from "@/components/LivePreview";
import { emptyCv, type CvData } from "@/lib/types";
import { sampleCv } from "@/lib/sample";
import { generateDocxBlob } from "@/lib/generate";
import { safeFileName } from "@/lib/format";

const DRAFT_KEY = "cv-itec-draft-v1";

function readDraft(): CvData | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

/** Fills missing keys (old drafts / imported JSON) with defaults. */
function normalize(data: Partial<CvData>): CvData {
  const base = emptyCv();
  return { ...base, ...data } as CvData;
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function Home() {
  const { control, register, reset, getValues } = useForm<CvData>({ defaultValues: emptyCv() });
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  // Restore the auto-saved draft once on load.
  useEffect(() => {
    const draft = readDraft();
    if (draft) reset(draft);
    setReady(true);
  }, [reset]);

  const flash = (type: "ok" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const onDownload = async () => {
    const cv = getValues();
    const name = safeFileName(cv.fileName, safeFileName(cv.cvCode, "CV"));
    setBusy(true);
    try {
      download(await generateDocxBlob(cv), `${name}.docx`);
      flash("ok", `${name}.docx téléchargé`);
    } catch (e) {
      flash("error", `Erreur : ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const onNew = () => {
    if (confirm("Commencer un nouveau CV ? Le contenu actuel sera effacé (pensez à l’exporter en JSON si besoin).")) reset(emptyCv());
  };
  const onSample = () => {
    if (confirm("Charger le CV d’exemple ? Le contenu actuel sera remplacé.")) reset(structuredClone(sampleCv));
  };
  const onExport = () => {
    const cv = getValues();
    const name = safeFileName(cv.fileName, safeFileName(cv.cvCode, "CV"));
    download(new Blob([JSON.stringify(cv, null, 2)], { type: "application/json" }), `${name}.json`);
  };
  const onImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      reset(normalize(JSON.parse(await file.text())));
      flash("ok", `« ${file.name} » importé`);
    } catch {
      flash("error", "Fichier JSON invalide");
    } finally {
      if (importRef.current) importRef.current.value = "";
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Top bar */}
      <header className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-itec.png" alt="ITEC" className="h-7 w-auto" />
        <h1 className="mr-auto text-base font-semibold text-itec-dark">Générateur de CV</h1>

        <div className="flex flex-wrap items-center gap-1">
          <button type="button" className="btn-ghost" onClick={onNew}>Nouveau</button>
          <button type="button" className="btn-ghost" onClick={onSample}>Exemple</button>
          <button type="button" className="btn-ghost" onClick={() => importRef.current?.click()} title="Reprendre un CV enregistré en JSON">
            Importer
          </button>
          <button type="button" className="btn-ghost" onClick={onExport} title="Enregistrer les données du CV pour les réutiliser plus tard">
            Exporter
          </button>
          <input ref={importRef} type="file" accept="application/json,.json" hidden onChange={(e) => onImport(e.target.files?.[0])} />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-slate-300 bg-white focus-within:border-itec focus-within:ring-2 focus-within:ring-itec/20">
            <input
              {...register("fileName")}
              placeholder="Nom du fichier"
              className="w-48 rounded-l-md bg-transparent px-2.5 py-1.5 text-sm outline-none"
              aria-label="Nom du fichier"
            />
            <span className="pr-2.5 text-sm text-slate-400">.docx</span>
          </div>
          <button type="button" className="btn-primary" onClick={onDownload} disabled={busy || !ready}>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 0 1 1 1v7.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L9 11.6V4a1 1 0 0 1 1-1ZM4 15a1 1 0 0 1 1 1h10a1 1 0 1 1 2 0 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 1 1 0 0 1 1-1Z" /></svg>
            Télécharger Word
          </button>
        </div>
      </header>

      {message && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-sm text-white shadow-lg ${
            message.type === "ok" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form | Preview */}
      <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(420px,1fr)_minmax(0,1.15fr)]">
        <div className="min-h-0 overflow-y-auto p-4">
          {ready && <CvForm control={control} register={register} />}
          <p className="mt-6 text-center text-xs text-slate-400">
            Pour obtenir le PDF : ouvrez le fichier Word puis <b>Fichier → Enregistrer sous → PDF</b>.
            <br />
            Vos saisies sont enregistrées automatiquement dans ce navigateur.
          </p>
        </div>
        <div className="hidden min-h-0 overflow-y-auto border-l border-slate-200 bg-slate-200/70 lg:block">
          {ready && <LivePreview control={control} />}
        </div>
      </main>

      {ready && <AutoSave control={control} />}
    </div>
  );
}

/** Saves the form to localStorage (debounced). */
function AutoSave({ control }: { control: Control<CvData> }) {
  const values = useWatch({ control });
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      } catch {
        /* storage unavailable (private mode…) */
      }
    }, 800);
    return () => clearTimeout(t);
  }, [values]);
  return null;
}
