import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import HideOnScrollHeader from "@/components/HideOnScrollHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/content/projects";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    // TODO: add /public/og.png (1200x630). See MEDIA-CHECKLIST.md.
    images: ["/og.png"],
  },
};

// Sets the theme before paint so there is no flash of the wrong palette.
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${bricolage.variable} ${newsreader.variable} ${plexMono.variable} min-h-screen antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-raised focus:px-3 focus:py-2 focus:border focus:border-rule"
        >
          Skip to content
        </a>

        <HideOnScrollHeader>
          <div className="mx-auto flex max-w-6xl items-baseline gap-6 px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="font-display text-[0.95rem] font-bold tracking-tight"
            >
              <svg
                viewBox="-2 0 50 32"
                aria-hidden="true"
                className="mr-2 inline-block h-4 w-auto align-[-0.1em]"
              >
                <path
                  d="M11.5 2 H14 A5 6 0 0 1 14 14 H11.5 M11.5 14 H15 A6 8 0 0 1 15 30 H11.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <g fill="var(--brass)">
                  <rect x="3.5" y="0" width="5" height="32" />
                  <rect x="-1" y="0" width="5" height="3" transform="rotate(-30 3.5 1.5)" />
                  <rect x="0" y="29" width="8.5" height="3" />
                </g>
                <g transform="translate(27.5 0)" fill="currentColor">
                  <polygon points="0,0 4.35,0 5.85,16.1 7.51,7 11.49,7 13.15,16.1 14.65,0 19,0 16.03,32 11.68,32 9.5,20 7.32,32 2.97,32" />
                  <rect x="-1.5" y="0" width="8" height="3" />
                  <rect x="12.5" y="0" width="8" height="3" />
                </g>
              </svg>
              {site.name}
            </Link>
            <nav className="flex items-baseline gap-5 text-sm text-ink-soft">
              <Link href="/#work" className="hover:text-ink">
                Work
              </Link>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
              <a href={site.links.github} className="hover:text-ink">
                GitHub
              </a>
            </nav>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </HideOnScrollHeader>

        <main id="main">{children}</main>

        <footer className="mt-24 border-t border-rule">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:px-8">
            <p>
              Built with Next.js, TypeScript and Tailwind. The source for this
              site is{" "}
              <a
                href={site.links.portfolioRepo}
                className="text-ink underline decoration-brass decoration-2 underline-offset-4"
              >
                on GitHub
              </a>
              .
            </p>
            <p className="sm:ml-auto">
              <a
                href={`mailto:${site.links.email}`}
                className="text-ink underline decoration-brass decoration-2 underline-offset-4"
              >
                {site.links.email}
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
