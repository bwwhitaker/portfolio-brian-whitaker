import type { Project } from "@/content/projects";
import RepoActivity from "@/components/RepoActivity";

export default function CreditsRail({ project }: { project: Project }) {
  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <dl className="divide-y divide-rule border-y border-rule text-sm">
        <div className="py-3">
          <dt className="font-mono text-xs text-ink-soft">Role</dt>
          <dd className="mt-1 font-display font-semibold">{project.role}</dd>
        </div>
        <div className="py-3">
          <dt className="font-mono text-xs text-ink-soft">Running</dt>
          <dd className="mt-1 font-display font-semibold">
            {project.period}
            <span className="ml-2 font-mono text-xs font-normal text-brass">
              {project.status}
            </span>
          </dd>
        </div>
        <div className="py-3">
          <dt className="font-mono text-xs text-ink-soft">Built with</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </dd>
        </div>
        <div className="py-3">
          <dt className="font-mono text-xs text-ink-soft">Go and look</dt>
          <dd className="mt-1 flex flex-col gap-1">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-display font-semibold underline decoration-brass decoration-2 underline-offset-4 hover:text-brass"
              >
                {l.label}
              </a>
            ))}
          </dd>
        </div>
      </dl>

      {project.repo ? <RepoActivity repo={project.repo} /> : null}
    </aside>
  );
}
