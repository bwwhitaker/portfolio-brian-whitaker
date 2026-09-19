import Link from 'next/link';
import ProjectIndex from '@/components/ProjectIndex';
import { projects, site } from '@/content/projects';

export default function Home() {
	return (
		<>
			<section className='mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24'>
				<h1 className='max-w-[16ch] font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em]'>
					I discover the product and I write the code.
				</h1>

				<div className='mt-8 grid gap-8 md:grid-cols-[minmax(0,34rem)_minmax(0,22rem)]'>
					<p className='font-prose text-lg leading-relaxed'>
						Seven-plus years as a product manager, from a two-person marketplace team to a billion dollar supply chain.
						Platform and data at WebOps, procurement transformation at Nike, martech at BombBomb, and nine years at
						Iyuno, promoted through four roles into product. For the last two years I have been building and operating
						the products myself: schema, application, payments, cron jobs, CI/CD pipelines, UX design, and the rest.
					</p>
					<p className='self-end font-prose leading-relaxed text-ink-soft'>
						The three case studies below are things running in production or close to it. Each one shows the decision I
						made, the thing that made it hard, and the code that resolved it.
					</p>
				</div>

				<p className='mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-rule pt-5 font-mono text-sm text-ink-soft'>
					<span>
						Looking for <span className='text-ink'>AI product engineer and senior product roles</span>
					</span>
					<a
						href={`mailto:${site.links.email}`}
						className='text-ink underline decoration-brass decoration-2 underline-offset-4'
					>
						{site.links.email}
					</a>
					<Link href='/about' className='text-ink underline decoration-brass decoration-2 underline-offset-4'>
						The longer version
					</Link>
				</p>
			</section>

			<ProjectIndex projects={projects} />
		</>
	);
}
