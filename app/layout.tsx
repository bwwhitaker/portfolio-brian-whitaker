import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
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

        <header className="border-b border-rule">
          <div className="mx-auto flex max-w-6xl items-baseline gap-6 px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="font-display text-[0.95rem] font-bold tracking-tight"
            >
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
        </header>

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
