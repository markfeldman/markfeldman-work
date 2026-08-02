"use client";

import { useEffect, useState } from "react";

type WorkflowRun = {
  id: number;
  name: string | null;
  display_title: string;
  status: "queued" | "in_progress" | "completed" | string;
  conclusion:
    | "success"
    | "failure"
    | "cancelled"
    | "timed_out"
    | "skipped"
    | null;
  html_url: string;
  run_number: number;
  updated_at: string;
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

function statusTreatment(run: WorkflowRun): {
  color: string;
  label: string;
  pulsing: boolean;
} {
  if (run.status === "queued") {
    return { color: "#898781", label: "Queued", pulsing: false };
  }
  if (run.status === "in_progress") {
    return { color: "#2a78d6", label: "Running", pulsing: true };
  }
  switch (run.conclusion) {
    case "success":
      return { color: "#0ca30c", label: "Passed", pulsing: false };
    case "failure":
      return { color: "#d03b3b", label: "Failed", pulsing: false };
    case "timed_out":
      return { color: "#d03b3b", label: "Timed out", pulsing: false };
    case "cancelled":
      return { color: "#fab219", label: "Cancelled", pulsing: false };
    case "skipped":
      return { color: "#898781", label: "Skipped", pulsing: false };
    default:
      return { color: "#898781", label: run.conclusion ?? "Unknown", pulsing: false };
  }
}

export default function LiveWorkflowStatus() {
  const [runs, setRuns] = useState<WorkflowRun[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/markfeldman/markfeldman-work/actions/runs?per_page=5",
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) {
          setRuns(data.workflow_runs ?? []);
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
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0ca30c] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0ca30c]" />
        </span>
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          CI pipeline — real build/lint runs
        </span>
        <a
          href="https://github.com/markfeldman/markfeldman-work/actions"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-black dark:text-zinc-500 dark:decoration-zinc-700 dark:hover:text-zinc-50"
        >
          View runs →
        </a>
      </div>

      {error && !runs && (
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Couldn&apos;t reach GitHub Actions right now — try{" "}
          <a
            href="https://github.com/markfeldman/markfeldman-work/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            viewing it directly
          </a>
          .
        </p>
      )}

      {!error && !runs && (
        <ul className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="h-10 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900"
            />
          ))}
        </ul>
      )}

      {runs && runs.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          No workflow runs yet — the first push after this pipeline was
          added will show up here.
        </p>
      )}

      {runs && runs.length > 0 && (
        <ul className="flex flex-col gap-3">
          {runs.map((run) => {
            const treatment = statusTreatment(run);
            return (
              <li key={run.id} className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  {treatment.pulsing && (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ backgroundColor: treatment.color }}
                    />
                  )}
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: treatment.color }}
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <a
                    href={run.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm font-medium text-black hover:underline dark:text-zinc-50"
                  >
                    {run.display_title}
                  </a>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    #{run.run_number} · {timeAgo(run.updated_at)}
                  </span>
                </div>
                <span
                  className="shrink-0 text-xs font-medium"
                  style={{ color: treatment.color }}
                >
                  {treatment.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
