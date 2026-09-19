import Image from "next/image";

/**
 * A placeholder that turns into real media the moment you give it a `src`.
 *
 * While `src` is empty it renders a hatched frame telling you exactly what to
 * capture — so the site is presentable in a half-finished state and you can
 * see your remaining shot list by scrolling the page. Every slot has an `id`
 * that matches a line in MEDIA-CHECKLIST.md.
 *
 *   <MediaSlot
 *     id="SS-02"
 *     kind="recording"
 *     what="Adding a show to the watchlist with a deliberate typo"
 *     framing="Screen only, ~12s, no cursor trails. Type 'Sweeny Todd' slowly."
 *     src="/media/show-scout/watchlist-search.mp4"
 *   />
 */

type Props = {
  id: string;
  kind: "screenshot" | "recording" | "diagram" | "asset";
  /** What is in the shot. */
  what: string;
  /** How to shoot it: crop, length, state to set up first. */
  framing?: string;
  /** Why it earns its place — cut the slot if you can't answer this. */
  purpose?: string;
  /** Path under /public once captured. */
  src?: string;
  /** Required whenever src is set and kind is screenshot. */
  alt?: string;
  /** Poster frame for recordings. */
  poster?: string;
  /** CSS aspect ratio, e.g. "16 / 9", "4 / 3", "9 / 16" for mobile captures. */
  aspect?: string;
  /** Caption shown under real media. */
  caption?: string;
};

const KIND_LABEL: Record<Props["kind"], string> = {
  screenshot: "Screenshot",
  recording: "Screen recording",
  diagram: "Diagram export",
  asset: "Asset",
};

export default function MediaSlot({
  id,
  kind,
  what,
  framing,
  purpose,
  src,
  alt,
  poster,
  aspect = "16 / 9",
  caption,
}: Props) {
  if (src) {
    const isVideo = /\.(mp4|webm|mov)$/i.test(src);
    return (
      <figure className="bleed my-8">
        <div
          className="overflow-hidden border border-rule bg-raised"
          style={{ aspectRatio: aspect }}
        >
          {isVideo ? (
            <video
              className="h-full w-full object-cover"
              src={src}
              poster={poster}
              controls
              muted
              loop
              playsInline
              aria-label={alt ?? what}
            />
          ) : (
            <Image
              src={src}
              alt={alt ?? what}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {caption ? (
          <figcaption className="mt-2 font-prose text-sm text-ink-soft">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="bleed my-8" data-media-slot={id}>
      <div
        className="hatch flex flex-col justify-end border border-dashed border-rule-strong p-4"
        style={{ aspectRatio: aspect }}
      >
        <div className="max-w-[52ch] bg-paper/95 p-3">
          <p className="font-mono text-xs text-brass">
            {id} — {KIND_LABEL[kind]} to capture
          </p>
          <p className="mt-1 font-display text-sm font-semibold leading-snug">
            {what}
          </p>
          {framing ? (
            <p className="mt-1.5 font-prose text-sm leading-snug text-ink-soft">
              <span className="font-mono text-xs">framing </span>
              {framing}
            </p>
          ) : null}
          {purpose ? (
            <p className="mt-1 font-prose text-sm leading-snug text-ink-soft">
              <span className="font-mono text-xs">why </span>
              {purpose}
            </p>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
