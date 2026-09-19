import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
      <p className="font-mono text-xs text-brass">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
        Nothing at this address.
      </h1>
      <p className="mt-3 max-w-[46ch] font-prose text-lg text-ink-soft">
        The page you asked for is not here. The work is.
      </p>
      <Link
        href="/#work"
        className="mt-6 inline-block font-display font-semibold underline decoration-brass decoration-2 underline-offset-4"
      >
        Go to the case studies
      </Link>
    </div>
  );
}
