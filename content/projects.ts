// ---------------------------------------------------------------------------
// EDIT ME FIRST.
// Everything structural about the site lives here: your details, the project
// list, the credits rail on each case study. Prose lives in
// content/case-studies/*.mdx. Media placeholders live inline in that prose.
// ---------------------------------------------------------------------------

export const site = {
	name: 'Brian Whitaker',
	role: 'Product Engineer',
	/** Matches the resume summary — keep these two in sync. */
	tagline:
		'Senior product manager with 7+ years delivering enterprise SaaS, and hands-on full-stack delivery of consumer web apps.',
	url: 'https://brianwhitaker.dev',
	description: 'Product engineer and former PM. I design systems, write the code, and run them in production.',
	links: {
		email: 'bwwhitaker@gmail.com',
		github: 'https://github.com/bwwhitaker',
		linkedin: 'https://www.linkedin.com/in/bwwhitaker',
		resume: '/Brian_Whitaker_Product_and_Engineering.pdf', // drop the PDF in /public
		portfolioRepo: 'https://github.com/bwwhitaker/portfolio-brian-whitaker',
	},
};

export type Project = {
	slug: string;
	name: string;
	/** One line, shown in the index. Say what it does, not how it is built. */
	tagline: string;
	/** Your role, in credit form. */
	role: string;
	period: string;
	/** Status shown as a small marker in the index. */
	status: 'Live' | 'In development' | 'Shipped' | 'Archived';
	/** Ordered, most load-bearing first. Keep to ~7 so the rail stays readable. */
	stack: string[];
	links: { label: string; href: string }[];
	/** GitHub repo in owner/name form. Enables the live commit/stars strip. */
	repo?: string;
	/** Two or three lines under the title on the case study page. */
	standfirst: string;
	/** The "so what" — revise these with real numbers once you have them. */
	outcomes: string[];
	/** Roles this project is evidence for. Used to filter on the index page. */
	evidence: ('product' | 'engineering' | 'ai')[];
	featured: boolean;
};

export const projects: Project[] = [
	{
		slug: 'show-scout',
		name: 'Show Scout',
		tagline: 'Tells theatre fans when a show they care about is playing near them.',
		role: 'Solo — product, design, engineering',
		period: '2025 – present',
		status: 'In development',
		stack: ['Next.js App Router', 'TypeScript', 'Supabase / Postgres', 'pg_cron', 'Claude API', 'Twilio', 'SendGrid'],
		links: [
			{ label: 'Live site', href: 'https://show-scout.com' },
			{ label: 'Source', href: 'https://github.com/bwwhitaker/show-scout' },
		],
		repo: 'bwwhitaker/show-scout',
		standfirst:
			'Regional theatre programming is announced in a hundred places and indexed in none. Show Scout watches for the shows you want to see and tells you when one lands in a city you care about.',
		outcomes: [
			'REVISE: waitlist signups since the coming-soon page went up',
			'REVISE: performances indexed / venues scraped',
			'Matching runs unattended on a schedule — no manual curation step',
		],
		evidence: ['product', 'engineering', 'ai'],
		featured: true,
	},
	{
		slug: 'paper-doc-tutoring',
		name: 'Paper Doc Tutoring',
		tagline: "A tutoring business's whole operation: lesson packages, proctored tests, grading.",
		role: 'Fractional Product & Engineering Lead',
		period: 'June 2025 – present',
		status: 'In development',
		stack: ['Next.js App Router', 'Supabase (RLS, Edge Functions)', 'Stripe', 'Mux', 'Tailwind v4', 'React Compiler'],
		links: [
			{ label: 'Live app', href: 'https://app.paperdoctutoring.com' },
			{ label: 'Source', href: 'https://github.com/bwwhitaker/paper-doc-app' },
		],
		repo: 'bwwhitaker/paper-doc-app',
		standfirst:
			'My co-founder tutors. Everything around that — selling hours, tracking them, authoring tests, proctoring them, grading them — is software I built so a two-person business can run like a bigger one.',
		outcomes: [
			'REVISE: hours sold / students enrolled since launch',
			'REVISE: time to author a full practice test, before vs. after the Word importer',
			'Scope cut to lesson packages for launch; tests and video deferred behind feature flags',
		],
		evidence: ['product', 'engineering'],
		featured: true,
	},

	{
		slug: 'paper-doc-social-poller',
		name: 'Paper Doc Social Poller',
		tagline: 'Records how our TikTok marketing performs over time, because the API only gives you today.',
		role: 'Solo — product, engineering',
		period: '2026 – present',
		status: 'In development',
		stack: ['Go', 'TikTok Display API', 'OAuth 2.0', 'Supabase / Postgres', 'GitHub Actions', 'Next.js (dashboard)'],
		links: [
			{ label: 'Source', href: 'https://github.com/bwwhitaker/paper-doc-social-poller' },
		],
		repo: 'bwwhitaker/paper-doc-social-poller',
		standfirst:
			'Social is the marketing channel Paper Doc Tutoring is betting on for now, and social APIs only report current totals. A small Go job takes a daily snapshot so there is a history to learn from, and the admin dashboard charts it.',
		outcomes: [
			'REVISE: days of history recorded / posts tracked',
			'REVISE: a decision the data changed (what to post more or less of)',
			'Runs unattended daily, and one failing account never blocks the others',
		],
		evidence: ['product', 'engineering'],
		featured: false,
	},

	{
		slug: 'cloaked',
		name: 'Cloaked',
		tagline: 'A browser game, and an excuse to get the engineering hygiene right.',
		role: 'Solo — engineering',
		period: '2025',
		status: 'Shipped',
		stack: ['React', 'Vite', 'Vitest', 'GitHub Actions', 'GitHub Pages'],
		links: [
			{ label: 'Play it', href: 'https://bwwhitaker.github.io/cloaked/' },
			{ label: 'Source', href: 'https://github.com/bwwhitaker/cloaked' },
		],
		repo: 'bwwhitaker/cloaked',
		standfirst:
			'A Battleship inspired game. The interesting part is underneath: the game logic is a pure, injectable-RNG module with a real test suite, and nothing deploys unless those tests pass.',
		outcomes: [
			'74 tests over deterministic game logic with an injectable RNG',
			'Keyboard and screen reader accessible: roving-tabindex grid, radio-group modes, live announcements, icon plus colour for every state',
			'CI/CD gate — a failing test blocks the Pages deploy',
			'Create React App to Vite migration',
		],
		evidence: ['engineering'],
		featured: false,
	},
];

export function getProject(slug: string) {
	return projects.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Employment, education and skills. Shown on /about.
// These mirror the resume — when you change one, change the other.
// ---------------------------------------------------------------------------

export type Role = {
	company: string;
	/** Company one-liner, as it reads on the resume. */
	context?: string;
	period: string;
	/** Most recent first. Sub-roles let the Iyuno progression show properly. */
	titles: { title: string; period: string; note?: string }[];
};

export const roles: Role[] = [
	{
		company: 'WebOps',
		context: 'B2B SaaS MedTech logistics — last-mile distribution and inventory management in a two-sided marketplace.',
		period: 'Aug 2025 – present',
		titles: [
			{
				title: 'Product Manager, Platform & Data',
				period: 'Aug 2025 – present',
				note: 'Platform roadmap for marketplace workflows, plus the data roadmap driving SAP, Databricks, Redshift and Salesforce integrations. Currently shaping a HIPAA-compliant, AI-driven order creation tool with text and voice cart building.',
			},
		],
	},
	{
		company: 'Nike',
		period: 'Aug 2023 – Jun 2025',
		titles: [
			{
				title: 'Product Manager',
				period: 'Aug 2023 – Jun 2025',
				note: 'Zero-to-one internal procurement platform supporting a $25M/year internal supply chain. Led SAP integration testing and PO data migration across multiple geographies; cut support ticket volume 35%.',
			},
		],
	},
	{
		company: 'BombBomb',
		context: 'B2C and B2B martech — personalized video messaging for financial services teams.',
		period: 'Jul 2022 – Jul 2023',
		titles: [
			{
				title: 'Product Manager',
				period: 'Jul 2022 – Jul 2023',
				note: 'Raised adoption 20% and retention 15% by removing friction in enterprise onboarding. Resolved compliance and security objections for regulated institutions, unlocking $1–2M in enterprise deals.',
			},
		],
	},
	{
		company: 'Iyuno',
		context: "Formerly SDI Media, acquired 2021. World's largest localization company. Promoted through four roles.",
		period: 'Oct 2012 – Jul 2022',
		titles: [
			{
				title: 'Product Manager',
				period: 'Nov 2019 – Jul 2022',
				note: 'Owned the cloud subtitling platform used daily by 10,000+ users across 100 language teams. Wrote requirements for a subtitle auto-timing engine, ran code reviews with the implementing engineer, and analyzed outcomes — 30% cost savings. Automated MT across 20 languages on AWS Lambda.',
			},
			{
				title: 'Quality Assurance Manager',
				period: 'Aug 2017 – Nov 2019',
				note: 'Led a team of 4 converting rejection analysis into prioritized tool requirements. Specified validation rules that cut subtitle timing defects 90%.',
			},
			{
				title: 'Production Supervisor',
				period: 'Mar 2014 – Aug 2017',
				note: 'Oversaw 27 language teams. Beta-tested the scheduling application and trained 20 coordinators through rollout — the same system I later rebuilt as PM.',
			},
			{ title: 'Production Scheduler', period: 'Oct 2012 – Mar 2014' },
		],
	},
];

export const education = [
	{
		credential: 'Master of Professional Writing',
		institution: 'University of Southern California',
		year: '2014',
	},
	{
		credential: 'Bachelor of Arts',
		institution: 'Washington University in St. Louis',
		year: '2010',
	},
	{
		credential: 'Front-End Developer Professional Certificate; Python Data Analytics',
		institution: 'Meta',
		year: '2024',
	},
];

/** Mirrors the resume skills block. Keep the two in sync. */
export const skills: { label: string; items: string }[] = [
	{
		label: 'Product',
		items:
			'Roadmap ownership, technical discovery & requirements definition, 0 to 1 delivery, pricing and monetization design, A/B testing, Agile facilitation',
	},
	{ label: 'Languages', items: 'TypeScript, JavaScript, Python, SQL' },
	{
		label: 'Frameworks',
		items: 'React, Next.js (App Router), React Native/Expo, Node/Express, Tailwind, Vitest',
	},
	{
		label: 'Data',
		items: 'PostgreSQL (row-level security, scheduled jobs, JSONB, trigram search, pg_cron)',
	},
	{
		label: 'Backend',
		items: 'Supabase, AWS (Lambda, S3), Databricks, REST API design',
	},
	{
		label: 'AI',
		items:
			'Claude API integration, LLM-assisted workflows with human-in-the-loop review, AI-assisted prototyping and discovery',
	},
	{
		label: 'Platforms',
		items: 'Stripe, Salesforce, SAP, HubSpot, Auth0, SendGrid/Resend, Vercel, GitHub Actions CI/CD',
	},
];
