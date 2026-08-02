"use client";

import { useEffect, useState } from "react";

type Commit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string };
  };
  author: { avatar_url: string; login: string } | null;
};

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function LiveRepoActivity() {
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/markfeldman/markfeldman-work/commits?per_page=5",
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) {
          setCommits(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    const interval = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0ca30c] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0ca30c]" />
        </span>
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Live from GitHub — this repo, right now
        </span>
        <a
          href="https://github.com/markfeldman/markfeldman-work/commits/main"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-black dark:text-zinc-500 dark:decoration-zinc-700 dark:hover:text-zinc-50"
        >
          View repo →
        </a>
      </div>

      {error && !commits && (
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Couldn&apos;t reach GitHub right now — the commit history is real,
          just not visible this second. Try{" "}
          <a
            href="https://github.com/markfeldman/markfeldman-work/commits/main"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            viewing it directly
          </a>
          .
        </p>
      )}

      {!error && !commits && (
        <ul className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="h-10 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900"
            />
          ))}
        </ul>
      )}

      {commits && commits.length > 0 && (
        <ul className="flex flex-col gap-3">
          {commits.map((c) => (
            <li key={c.sha} className="flex items-center gap-3">
              {c.author?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.author.avatar_url}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-full"
                />
              ) : (
                <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              )}
              <div className="flex min-w-0 flex-col">
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-sm font-medium text-black hover:underline dark:text-zinc-50"
                >
                  {c.commit.message.split("\n")[0]}
                </a>
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  {c.sha.slice(0, 7)} · {timeAgo(c.commit.author.date)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
