"use client";

import { useMemo, useState } from "react";
import type { Diagram, DiagramNode } from "@/content/diagrams";
import { diagrams } from "@/content/diagrams";

const BOX_W = 148;
const BOX_H = 58;
const GAP_X = 62;
const GAP_Y = 34;
const PAD = 8;

const KIND_STYLE: Record<DiagramNode["kind"], { fill: string; stroke: string; note: string }> = {
  input: { fill: "var(--paper-raised)", stroke: "var(--rule-strong)", note: "Input" },
  ui: { fill: "var(--paper-raised)", stroke: "var(--rule-strong)", note: "Interface" },
  job: { fill: "var(--viridian-soft)", stroke: "var(--viridian)", note: "Runs on a schedule" },
  store: { fill: "var(--paper)", stroke: "var(--ink-soft)", note: "Persistence" },
  out: { fill: "var(--brass-soft)", stroke: "var(--brass)", note: "Reaches the user" },
};

function position(node: DiagramNode) {
  return {
    x: PAD + node.col * (BOX_W + GAP_X),
    y: PAD + node.row * (BOX_H + GAP_Y),
  };
}

export default function FlowDiagram({ id }: { id: string }) {
  const diagram: Diagram | undefined = diagrams[id];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, DiagramNode>();
    diagram?.nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [diagram]);

  if (!diagram) {
    return (
      <p className="border border-rule bg-raised p-4 font-mono text-sm">
        No diagram registered with id “{id}”. Add it to content/diagrams.ts.
      </p>
    );
  }

  const current = pinnedId ?? activeId;
  const currentNode = current ? nodeMap.get(current) : null;

  const width = PAD * 2 + diagram.cols * BOX_W + (diagram.cols - 1) * GAP_X;
  const height = PAD * 2 + diagram.rows * BOX_H + (diagram.rows - 1) * GAP_Y;

  const isDim = (nodeId: string) => {
    if (!current) return false;
    if (nodeId === current) return false;
    return !diagram.edges.some(
      (e) =>
        (e.from === current && e.to === nodeId) ||
        (e.to === current && e.from === nodeId)
    );
  };

  return (
    <figure className="bleed my-8 border border-rule bg-paper">
      <figcaption className="border-b border-rule px-4 py-3">
        <h3 className="font-display text-base font-bold tracking-tight">
          {diagram.title}
        </h3>
        <p className="mt-1 font-prose text-sm leading-snug text-ink-soft">
          {diagram.caption}
        </p>
      </figcaption>

      {/* Wide screens: the drawing. */}
      <div className="hidden overflow-x-auto p-4 sm:block">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          style={{ minWidth: 560, maxWidth: width * 1.15 }}
          role="group"
          aria-label={diagram.title}
        >
          <defs>
            <marker
              id={`${diagram.id}-arrow`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--rule-strong)" />
            </marker>
            <marker
              id={`${diagram.id}-arrow-live`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--brass)" />
            </marker>
          </defs>

          {diagram.edges.map((edge, i) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;
            const a = position(from);
            const b = position(to);
            const live =
              current !== null && (edge.from === current || edge.to === current);

            let d: string;
            let labelX: number;
            let labelY: number;

            if (to.col === from.col) {
              const x = a.x + BOX_W / 2;
              const y1 = to.row > from.row ? a.y + BOX_H : a.y;
              const y2 = to.row > from.row ? b.y : b.y + BOX_H;
              d = `M ${x} ${y1} L ${x} ${y2}`;
              labelX = x + 6;
              labelY = (y1 + y2) / 2;
            } else {
              const forward = to.col > from.col;
              const x1 = forward ? a.x + BOX_W : a.x;
              const x2 = forward ? b.x : b.x + BOX_W;
              const y1 = a.y + BOX_H / 2;
              const y2 = b.y + BOX_H / 2;
              const midX = (x1 + x2) / 2;
              d = `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;
              labelX = midX + 5;
              labelY = (y1 + y2) / 2 - 5;
            }

            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke={live ? "var(--brass)" : "var(--rule-strong)"}
                  strokeWidth={live ? 2 : 1.25}
                  strokeDasharray={edge.scheduled ? "5 4" : undefined}
                  markerEnd={`url(#${diagram.id}-arrow${live ? "-live" : ""})`}
                  opacity={current && !live ? 0.3 : 1}
                />
                {edge.label ? (
                  <text
                    x={labelX}
                    y={labelY}
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fill="var(--ink-soft)"
                    opacity={current && !live ? 0.3 : 1}
                  >
                    {edge.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {diagram.nodes.map((node) => {
            const { x, y } = position(node);
            const style = KIND_STYLE[node.kind];
            const selected = node.id === current;
            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-pressed={pinnedId === node.id}
                aria-label={`${node.label}. ${node.detail}`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveId(node.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(node.id)}
                onBlur={() => setActiveId(null)}
                onClick={() =>
                  setPinnedId((p) => (p === node.id ? null : node.id))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPinnedId((p) => (p === node.id ? null : node.id));
                  }
                }}
              >
                <rect
                  x={x}
                  y={y}
                  width={BOX_W}
                  height={BOX_H}
                  fill={style.fill}
                  stroke={selected ? "var(--brass)" : style.stroke}
                  strokeWidth={selected ? 2 : 1}
                  opacity={isDim(node.id) ? 0.35 : 1}
                />
                <text
                  x={x + 12}
                  y={y + 24}
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="var(--font-display)"
                  fill="var(--ink)"
                  opacity={isDim(node.id) ? 0.35 : 1}
                >
                  {node.label}
                </text>
                {node.meta ? (
                  <text
                    x={x + 12}
                    y={y + 41}
                    fontSize="10.5"
                    fontFamily="var(--font-mono)"
                    fill="var(--ink-soft)"
                    opacity={isDim(node.id) ? 0.35 : 1}
                  >
                    {node.meta}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel, wide screens only — the small-screen version lists it all. */}
      <div className="hidden border-t border-rule px-4 py-3 sm:block">
        {currentNode ? (
          <div>
            <p className="font-mono text-xs text-brass">
              {KIND_STYLE[currentNode.kind].note}
            </p>
            <p className="mt-1 font-display text-sm font-semibold">
              {currentNode.label}
            </p>
            <p className="mt-1 max-w-[64ch] font-prose text-sm leading-relaxed text-ink-soft">
              {currentNode.detail}
            </p>
          </div>
        ) : (
          <p className="font-prose text-sm text-ink-soft">
            Hover, tab to, or click any box. Dashed lines run on a schedule
            rather than on request.
          </p>
        )}
      </div>

      {/* Narrow screens: the same information, read top to bottom. */}
      <ol className="divide-y divide-rule sm:hidden">
        {diagram.nodes.map((node) => (
          <li key={node.id} className="px-4 py-3">
            <p className="font-mono text-xs text-brass">
              {KIND_STYLE[node.kind].note}
            </p>
            <p className="mt-0.5 font-display text-sm font-semibold">
              {node.label}
              {node.meta ? (
                <span className="ml-2 font-mono text-xs font-normal text-ink-soft">
                  {node.meta}
                </span>
              ) : null}
            </p>
            <p className="mt-1 font-prose text-sm leading-relaxed text-ink-soft">
              {node.detail}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
