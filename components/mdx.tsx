import React from "react";

/** A short aside. Use sparingly — two or three per case study, at most. */
export function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-7 border-l-2 border-brass bg-raised px-4 py-3">
      <p className="font-mono text-xs text-brass">{label}</p>
      <div className="mt-1 font-prose text-[0.95rem] leading-relaxed text-ink-soft [&>*+*]:mt-2">
        {children}
      </div>
    </aside>
  );
}

/**
 * Real code with a one-line reason it is here. If you cannot write the
 * `why`, the snippet is decoration — cut it.
 */
export function CodeSample({
  file,
  language = "ts",
  why,
  code,
}: {
  file: string;
  language?: string;
  why: string;
  code: string;
}) {
  return (
    <figure className="bleed my-8 border border-rule">
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule bg-raised px-4 py-2">
        <code className="font-mono text-xs text-ink">{file}</code>
        <span className="font-mono text-[0.68rem] text-ink-soft">{language}</span>
        <span className="basis-full font-prose text-sm text-ink-soft">{why}</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.78rem] leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </figure>
  );
}

/**
 * The decision record. This is the thing hiring managers actually read on a
 * product-engineer portfolio: what you chose, what you gave up, and why.
 */
export function Decisions({
  rows,
}: {
  rows: { decision: string; instead: string; because: string }[];
}) {
  return (
    <div className="bleed my-8 overflow-x-auto border border-rule">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-rule bg-raised">
            {["Chose", "Over", "Because"].map((h) => (
              <th
                key={h}
                className="px-4 py-2 font-mono text-xs font-normal text-ink-soft"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-prose text-sm">
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-rule last:border-0 align-top">
              <td className="px-4 py-3 font-display text-sm font-semibold">
                {r.decision}
              </td>
              <td className="px-4 py-3 text-ink-soft">{r.instead}</td>
              <td className="px-4 py-3 text-ink-soft">{r.because}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Inline marker for anything still needing your attention. Grep for it. */
export function Revise({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-brass-soft px-1 font-mono text-[0.8em] text-ink">
      REVISE: {children}
    </mark>
  );
}
