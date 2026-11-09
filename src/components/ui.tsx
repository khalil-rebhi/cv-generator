"use client";

import { forwardRef, type ReactNode, type TextareaHTMLAttributes, type InputHTMLAttributes } from "react";

export function Section({
  title,
  hint,
  children,
  defaultOpen = true,
  count,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  count?: number;
}) {
  return (
    <details open={defaultOpen} className="group rounded-lg border border-slate-200 bg-white shadow-sm">
      <summary className="flex cursor-pointer select-none list-none items-center gap-2 rounded-lg px-4 py-3 hover:bg-slate-50">
        <Chevron className="h-4 w-4 text-slate-400 transition group-open:rotate-90" />
        <span className="font-semibold text-itec-dark">{title}</span>
        {count !== undefined && (
          <span className="rounded-full bg-itec-light px-2 py-0.5 text-xs font-medium text-itec-dark">{count}</span>
        )}
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3">
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
        {children}
      </div>
    </details>
  );
}

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return <input ref={ref} {...props} className={`input ${props.className ?? ""}`} />;
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea(
  props,
  ref
) {
  return <textarea ref={ref} rows={3} {...props} className={`input ${props.className ?? ""}`} />;
});

/** Card wrapping one item of a repeatable list, with move / duplicate / delete actions. */
export function ItemCard({
  title,
  index,
  total,
  onMove,
  onDuplicate,
  onRemove,
  children,
  collapsible = false,
}: {
  title: ReactNode;
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onDuplicate?: () => void;
  onRemove: () => void;
  children: ReactNode;
  collapsible?: boolean;
}) {
  const actions = (
    <div className="ml-auto flex shrink-0 items-center" onClick={(e) => e.preventDefault()}>
      <button type="button" className="icon-btn" title="Monter" disabled={index === 0} onClick={() => onMove(index, index - 1)}>
        <Arrow up />
      </button>
      <button type="button" className="icon-btn" title="Descendre" disabled={index === total - 1} onClick={() => onMove(index, index + 1)}>
        <Arrow />
      </button>
      {onDuplicate && (
        <button type="button" className="icon-btn" title="Dupliquer" onClick={onDuplicate}>
          <CopyIcon />
        </button>
      )}
      <button
        type="button"
        className="icon-btn hover:!bg-red-50 hover:!text-red-600"
        title="Supprimer"
        onClick={onRemove}
      >
        <TrashIcon />
      </button>
    </div>
  );

  if (collapsible) {
    return (
      <details open className="group/item rounded-md border border-slate-200 bg-slate-50/60">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2">
          <Chevron className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-open/item:rotate-90" />
          <span className="truncate text-sm font-medium text-slate-700">{title}</span>
          {actions}
        </summary>
        <div className="space-y-3 border-t border-slate-200 p-3">{children}</div>
      </details>
    );
  }
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/60 p-3">
      <div className="mb-2 flex items-center gap-2">
        <span className="truncate text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</span>
        {actions}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 py-2 text-sm text-slate-500 transition hover:border-itec hover:bg-itec-light hover:text-itec-dark"
    >
      <span className="text-base leading-none">+</span> {children}
    </button>
  );
}

/* ---------- icons ---------- */
const svg = "h-4 w-4";
export const Chevron = ({ className = svg }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M7.2 4.2a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L11.5 10 7.2 5.6a1 1 0 0 1 0-1.4Z" /></svg>
);
const Arrow = ({ up = false }: { up?: boolean }) => (
  <svg className={`${svg} ${up ? "" : "rotate-180"}`} viewBox="0 0 20 20" fill="currentColor"><path d="M10 4a1 1 0 0 1 .7.3l5 5a1 1 0 0 1-1.4 1.4L11 7.4V15a1 1 0 1 1-2 0V7.4l-3.3 3.3a1 1 0 0 1-1.4-1.4l5-5A1 1 0 0 1 10 4Z" /></svg>
);
const CopyIcon = () => (
  <svg className={svg} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3h-7A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H7" /></svg>
);
const TrashIcon = () => (
  <svg className={svg} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h12M8 6V4h4v2m-6 0 .7 10.1a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9L14 6" /></svg>
);
