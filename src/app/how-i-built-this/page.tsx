import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How I Built This — Mark Feldman",
  description:
    "How this site was built working with Claude Code — real tradeoffs, real deployment friction, and real decisions about what to delegate to an agent versus keep human-controlled.",
};

export default function HowIBuiltThis() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-24 sm:px-8">
        <Reveal className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-zinc-500 transition-colors hover:text-[#2a78d6] dark:text-zinc-400 dark:hover:text-[#6fa8e8]"
          >
            ← Back
          </Link>
          <h1 className="bg-gradient-to-br from-[#2a78d6] via-black to-black bg-clip-text text-3xl font-semibold tracking-tighter text-transparent sm:text-4xl dark:from-[#3987e5] dark:via-white dark:to-white">
            How I built this
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This site was built working with Claude Code — not generated
            from a single prompt. The build itself is a better sample of
            agentic-AI skill than anything I could write on a résumé, so
            here&apos;s what actually happened.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Real tradeoffs, not defaults
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Before any code, we worked through the actual decisions: which
            host, which framework. Cloudflare Pages over Vercel or GitHub
            Pages, specifically because DNS for markfeldman.work was already
            on Cloudflare. Next.js over a plain static build, specifically
            because I wanted room to grow the site iteratively without a
            rewrite. Neither was the first option offered — both were a
            recommendation plus the reasoning behind it, mine to accept,
            reject, or push back on.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
            When the plan met reality
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The original plan assumed Cloudflare&apos;s classic Pages build
            settings — a framework preset dropdown, a build-output-directory
            field. Cloudflare had since moved new projects onto a unified
            Workers/Wrangler flow instead, and none of those fields existed
            on my screen. Rather than guess at a UI neither of us could see
            clearly, we stopped, looked at the actual fields in front of me
            (a build command and a deploy command), and worked backward to
            what Cloudflare was really asking for: a{" "}
            <code className="rounded bg-[#2a78d6]/10 px-1.5 py-0.5 text-sm text-[#1c5cab] dark:bg-[#2a78d6]/15 dark:text-[#86b6ef]">
              wrangler.jsonc
            </code>{" "}
            declaring the Next.js static export as the assets directory for{" "}
            <code className="rounded bg-[#2a78d6]/10 px-1.5 py-0.5 text-sm text-[#1c5cab] dark:bg-[#2a78d6]/15 dark:text-[#86b6ef]">
              wrangler deploy
            </code>{" "}
            to serve. We verified it locally with a dry run before pushing
            anything.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Where the agent stopped and I didn&apos;t
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Every point that touched a real credential or a live, public
            asset stayed mine to do. GitHub authentication and Cloudflare
            login happened in my own terminal and my own browser session,
            not through the agent. When I said &ldquo;go ahead, connect the
            domain&rdquo; and the agent&apos;s browser session turned out
            not to be signed into my Cloudflare account, it said so plainly
            and handed the actual click back to me — rather than trying to
            work around it. Connecting the real domain to a live site is
            exactly the kind of step that should require a person, not get
            automated past.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Why this matters for a team adopting agentic AI
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            This is what I think responsible adoption actually looks like
            day to day: iterative delivery, tradeoffs made out loud instead
            of defaulted past, plans that adjust when reality doesn&apos;t
            match assumptions, and clear boundaries around what an agent
            should do unsupervised versus what stays with a person. Not a
            slick demo — a working process a team can actually run with.
          </p>
        </Reveal>
      </main>
    </div>
  );
}
