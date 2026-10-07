import { ImageResponse } from "next/og";
import { site } from "@/content/projects";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#14181b";
const ink = "#e6e3da";
const inkSoft = "#949da5";
const brass = "#d5a854";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          padding: 80,
        }}
      >
        <svg width="240" height="154" viewBox="-2 0 50 32">
          <path
            d="M11.5 2 H14 A5 6 0 0 1 14 14 H11.5 M11.5 14 H15 A6 8 0 0 1 15 30 H11.5"
            fill="none"
            stroke={ink}
            strokeWidth="4"
          />
          <g fill={brass}>
            <rect x="3.5" y="0" width="5" height="32" />
            <rect x="-1" y="0" width="5" height="3" transform="rotate(-30 3.5 1.5)" />
            <rect x="0" y="29" width="8.5" height="3" />
          </g>
          <g transform="translate(27.5 0)" fill={ink}>
            <polygon points="0,0 4.35,0 5.85,16.1 7.51,7 11.49,7 13.15,16.1 14.65,0 19,0 16.03,32 11.68,32 9.5,20 7.32,32 2.97,32" />
            <rect x="-1.5" y="0" width="8" height="3" />
            <rect x="12.5" y="0" width="8" height="3" />
          </g>
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: ink, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 44, color: brass, marginTop: 8 }}>{site.role}</div>
          <div style={{ fontSize: 30, color: inkSoft, marginTop: 24, maxWidth: 900 }}>
            {site.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
