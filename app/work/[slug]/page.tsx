import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CreditsRail from '@/components/CreditsRail';
import { getProject, projects } from '@/content/projects';

import ShowScout from '@/content/case-studies/show-scout.mdx';
import PaperDoc from '@/content/case-studies/paper-doc-tutoring.mdx';
import SocialPoller from '@/content/case-studies/paper-doc-social-poller.mdx';
import Cloaked from '@/content/case-studies/cloaked.mdx';

const BODIES: Record<string, React.ComponentType> = {
	'show-scout': ShowScout,
	'paper-doc-tutoring': PaperDoc,
	'paper-doc-social-poller': SocialPoller,
	cloaked: Cloaked,
};

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return {};
	return { title: project.name, description: project.tagline };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = getProject(slug);
	const Body = BODIES[slug];
	if (!project || !Body) notFound();

	const index = projects.findIndex((p) => p.slug === slug);
	const next = projects[(index + 1) % projects.length];

	return (
		<article className='mx-auto max-w-6xl px-5 pt-14 sm:px-8'>
			<header className='border-b border-rule pb-10'>
				<p className='font-mono text-xs text-ink-soft'>
					<Link href='/#work' className='hover:text-brass'>
						Work
					</Link>
				</p>
				<h1 className='mt-3 font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em]'>
					{project.name}
				</h1>
				<p className='mt-5 max-w-[54ch] font-prose text-lg leading-relaxed'>{project.standfirst}</p>
			</header>

			<div className='grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16'>
				<div className='prose order-2 lg:order-1'>
					<Body />

					<h2>Where it landed</h2>
					<ul>
						{project.outcomes.map((o) => (
							<li key={o}>{o}</li>
						))}
					</ul>
				</div>

				<div className='order-1 lg:order-2'>
					<CreditsRail project={project} />
				</div>
			</div>

			<nav className='mt-20 border-t border-rule pt-6'>
				<p className='font-mono text-xs text-ink-soft'>Next</p>
				<Link
					href={`/work/${next.slug}`}
					className='mt-1 inline-block font-display text-3xl font-bold tracking-tight hover:text-brass'
				>
					{next.name}
				</Link>
			</nav>
		</article>
	);
}
