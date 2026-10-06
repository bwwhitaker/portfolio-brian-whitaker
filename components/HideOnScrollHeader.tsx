'use client';

import { useEffect, useState } from 'react';

// Sticky header that slides out of view on scroll down and returns on scroll up.
export default function HideOnScrollHeader({ children }: { children: React.ReactNode }) {
	const [hidden, setHidden] = useState(false);
	useEffect(() => {
		let lastY = window.scrollY;
		let upDistance = 0;
		function onScroll() {
			const y = window.scrollY;
			const delta = y - lastY;
			lastY = y;
			if (y <= 0) {
				upDistance = 0;
				setHidden(false);
			} else if (delta > 0) {
				upDistance = 0;
				if (y > 80 && delta > 4) setHidden(true);
			} else {
				// Only reappear after a deliberate scroll up, not a small nudge.
				upDistance -= delta;
				if (upDistance > 60) setHidden(false);
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-40 border-b border-rule bg-paper transition-transform duration-500 ease-out motion-reduce:transition-none ${
				hidden ? '-translate-y-full' : 'translate-y-0'
			}`}
			onFocusCapture={() => setHidden(false)}
		>
			{children}
		</header>
	);
}
