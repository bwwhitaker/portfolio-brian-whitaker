/**
 * Live repo activity, fetched on the server and revalidated hourly.
 *
 * It is small on purpose. The point is not the numbers — it is that a reader
 * looking at your portfolio is watching a server component make a real
 * request and render the result. Fails silently: if GitHub is unreachable or
 * the repo is private, nothing renders and the page is unaffected.
 *
 * Set GITHUB_TOKEN in .env.local to raise the rate limit from 60/hr to 5000/hr.
 */

type Repo = {
  pushed_at: string;
  stargazers_count: number;
  language: string | null;
};

async function getRepo(repo: string): Promise<Repo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as Repo;
  } catch {
    return null;
  }
}

function relative(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "a month ago" : `${months} months ago`;
}

export default async function RepoActivity({ repo }: { repo: string }) {
  const data = await getRepo(repo);
  if (!data) return null;

  return (
    <p className="mt-4 font-mono text-xs leading-relaxed text-ink-soft">
      <span className="text-viridian">●</span> last commit to{" "}
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {repo}
      </a>{" "}
      {relative(data.pushed_at)}
      {data.stargazers_count > 0 ? ` · ${data.stargazers_count} stars` : ""}
    </p>
  );
}
