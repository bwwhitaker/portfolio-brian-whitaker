"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="border border-rule px-2 py-1 font-mono text-xs text-ink-soft hover:border-brass hover:text-ink"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark === null ? "theme" : dark ? "light" : "dark"}
    </button>
  );
}
