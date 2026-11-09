"use client";

import { useEffect, useRef, useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import type { CvData } from "@/lib/types";
import { generateDocxBlob } from "@/lib/generate";

const DEBOUNCE_MS = 500;

/** Renders the real generated .docx (same file as the download) with docx-preview. */
export default function LivePreview({ control }: { control: Control<CvData> }) {
  const values = useWatch({ control }) as CvData;
  const hostRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "rendering" | "error">("idle");
  const [error, setError] = useState("");
  const runId = useRef(0);

  useEffect(() => {
    const id = ++runId.current;
    const timer = setTimeout(async () => {
      setStatus("rendering");
      try {
        const [{ renderAsync }, blob] = await Promise.all([import("docx-preview"), generateDocxBlob(values)]);
        if (id !== runId.current || !hostRef.current || !styleRef.current) return;
        // Render off-screen then swap, so the preview doesn't flicker or lose scroll position.
        const body = document.createElement("div");
        const styles = document.createElement("div");
        await renderAsync(blob, body, styles, {
          className: "docx",
          inWrapper: true,
          breakPages: true,
          renderHeaders: true,
          renderFooters: true,
          ignoreLastRenderedPageBreak: false,
          useBase64URL: true,
        });
        if (id !== runId.current) return;
        hostRef.current.replaceChildren(...Array.from(body.childNodes));
        styleRef.current.replaceChildren(...Array.from(styles.childNodes));
        setStatus("idle");
        setError("");
      } catch (e) {
        if (id !== runId.current) return;
        setStatus("error");
        setError(describeError(e));
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [values]);

  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute right-3 top-3 z-10">
        {status === "rendering" && (
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs text-slate-500 shadow">Mise à jour…</span>
        )}
      </div>
      {status === "error" && (
        <div className="m-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Impossible de générer l’aperçu : {error}
        </div>
      )}
      <div ref={styleRef} />
      <div ref={hostRef} className="preview-host origin-top" />
    </div>
  );
}

function describeError(e: unknown): string {
  const err = e as { message?: string; properties?: { errors?: { properties?: { explanation?: string } }[] } };
  const details = err?.properties?.errors?.map((x) => x.properties?.explanation).filter(Boolean);
  return details?.length ? details.join(" ; ") : err?.message ?? String(e);
}
