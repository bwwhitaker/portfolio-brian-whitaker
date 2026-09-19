"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";

const LENSES = [
  { id: "all", label: "Everything" },
  { id: "product", label: "Product decisions" },
  { id: "engineering", label: "Engineering" },
  { id: "ai", label: "AI in the product" },
] as const;

type Lens = (typeof LENSES)[number]["id"];

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [lens, setLens] = useState<Lens>("all");

  const shown =
    lens === "all"
      ? projects
      : projects.filter((p) => p.evidence.includes(lens));

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-3">
        <h2 className="font-display text-lg font-bold tracking-tight">
          Things I built and ran
        </h2>
        <div
          className="flex flex-wrap gap-1"
          role="group"
          aria-label="Filter projects by what they demonstrate"
        >
          {LENSES.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLens(l.id)}
              aria-pressed={lens === l.id}
              className={`border px-2.5 py-1 font-mono text-xs ${
                lens === l.id
                  ? "border-brass bg-brass-soft text-ink"
                  : "border-rule text-ink-soft hover:border-rule-strong hover:text-ink"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <ul>
        {shown.map((p) => (
          <li key={p.slug} className="border-b border-rule">
            <Link
              href={`/work/${p.slug}`}
              className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-[minmax(0,1fr)_15rem]"
            >
              <div>
                <h3 className="font-display text-3xl font-bold leading-none tracking-tight group-hover:text-brass sm:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-2 max-w-[52ch] font-prose text-[1.02rem] leading-snug text-ink-soft">
                  {p.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="self-end text-sm md:text-right">
                <p className="font-mono text-xs text-brass">{p.status}</p>
                <p className="mt-1 font-display font-semibold">{p.period}</p>
                <p className="mt-1 font-prose text-ink-soft">{p.role}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {shown.length === 0 ? (
        <p className="py-10 font-prose text-ink-soft">
          Nothing tagged that way yet. Try another lens.
        </p>
      ) : null}
    </section>
  );
}
