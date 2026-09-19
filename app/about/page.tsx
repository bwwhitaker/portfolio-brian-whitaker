import type { Metadata } from "next";
import { education, roles, site, skills } from "@/content/projects";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
      <h1 className="max-w-[18ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em]">
        Seven years deciding what to build, then learning to build it.
      </h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="prose">
          <p>
            I spent most of my career as a product manager in B2B SaaS &mdash;
            MedTech logistics at WebOps, procurement transformation at Nike,
            martech at BombBomb, and nine years at Iyuno, where I was promoted
            through four roles before landing in product. Good problems, real
            constraints, and a recurring frustration: the distance between
            deciding what to build and being able to build it.
          </p>
          <p>
            So I closed it. The projects on this site are ones I designed, wrote,
            deployed and now operate &mdash; schema through to cron jobs through
            to the emails that land in someone&rsquo;s inbox at 6am. Not
            prototypes. Things with paying users, or close to it.
          </p>
          <p>
            The clearest version of the arc is at Iyuno. I started in 2012 doing
            production scheduling by hand. In 2014 I beta-tested the scheduling
            application and trained the coordinators who rolled it out. In 2018,
            as QA Manager, I restructured its database to kill duplicate data
            entry. In 2020, as Product Manager, I consolidated it into a
            centralized React/SQL platform. I spent eight years productizing the
            tool I started my career using.
          </p>

          <h2>What I am looking for</h2>
          <p>
            AI product engineer roles, and senior or lead product roles where
            writing code is an asset rather than a curiosity. I am most useful on
            products where the hard part is the system &mdash; scheduling,
            entitlements, data that arrives messy and has to come out clean.
          </p>

          <h2>How I work</h2>
          <ul>
            <li>
              Ship the revenue path first and flag everything else off. Paper Doc
              launched considerably narrower than it was built.
            </li>
            <li>
              Put logic where it belongs, not where it is easiest. Matching lives
              in Postgres; game rules live outside React; parsers are
              deterministic.
            </li>
            <li>
              Models propose, people publish. Anything an LLM produces in my
              products goes through a review queue before a user sees it.
            </li>
          </ul>

          <h2>Skills</h2>
          <dl className="not-prose mt-4 divide-y divide-rule border-y border-rule">
            {skills.map((s) => (
              <div key={s.label} className="py-2.5 sm:flex sm:gap-4">
                <dt className="font-mono text-xs text-brass sm:w-24 sm:shrink-0 sm:pt-0.5">
                  {s.label}
                </dt>
                <dd className="font-prose text-sm leading-relaxed">{s.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <h2 className="font-display text-sm font-bold">Previously</h2>
          <ol className="mt-3 divide-y divide-rule border-y border-rule">
            {roles.map((r) => (
              <li key={r.company} className="py-4">
                <p className="font-display text-sm font-semibold">{r.company}</p>
                <p className="font-mono text-xs text-ink-soft">{r.period}</p>
                {r.context ? (
                  <p className="mt-1 font-prose text-sm leading-snug text-ink-soft">
                    {r.context}
                  </p>
                ) : null}
                <ol className="mt-2 space-y-2">
                  {r.titles.map((t) => (
                    <li key={t.title}>
                      <p className="font-display text-sm font-semibold">
                        {t.title}
                      </p>
                      <p className="font-mono text-[0.7rem] text-ink-soft">
                        {t.period}
                      </p>
                      {t.note ? (
                        <p className="mt-1 font-prose text-sm leading-snug text-ink-soft">
                          {t.note}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>

          <h2 className="mt-8 font-display text-sm font-bold">Education</h2>
          <ol className="mt-3 divide-y divide-rule border-y border-rule">
            {education.map((e) => (
              <li key={e.credential} className="py-2.5">
                <p className="font-display text-sm font-semibold">
                  {e.credential}
                </p>
                <p className="font-mono text-xs text-ink-soft">
                  {e.institution}, {e.year}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-4 font-mono text-xs">
            <a
              href={site.links.resume}
              className="underline decoration-brass decoration-2 underline-offset-4"
            >
              Resume, as a PDF
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
}
