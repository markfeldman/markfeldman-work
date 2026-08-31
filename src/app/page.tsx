import Link from "next/link";
import LiveRepoActivity from "@/components/LiveRepoActivity";
import LiveWorkflowStatus from "@/components/LiveWorkflowStatus";
import Reveal from "@/components/Reveal";

const practices = [
  {
    title: "Parallel dispatch, isolated worktrees",
    description:
      "I run multiple agents concurrently, each in its own git worktree, so simultaneous work can't collide. Branches come back one at a time to be reviewed and merged deliberately.",
  },
  {
    title: "Every agent branch gets read before it lands",
    description:
      "Not spot-checked — read. On my current project that caught an unvalidated shell interpolation in agent-written dispatch code: a real injection vector, fixed before merge. Agents produce plausible code; plausible is not the same as correct.",
  },
  {
    title: "Model tier matched to stakes",
    description:
      "Cheaper, faster models for mechanical subtasks; stronger ones where judgment actually decides the outcome. Cost control that doesn't quietly degrade the work that matters.",
  },
  {
    title: "Hard human-only boundaries",
    description:
      "Credentials, live domains, and real spend stay with me. When an agent hits an authentication wall, the right behavior is to hand it back — not to route around it. That boundary is a design decision, not an accident.",
  },
  {
    title: "\"Done\" requires evidence",
    description:
      "A dependency once blocked real end-to-end verification on my governance project. That shipped as a documented known limitation rather than a passing gate. Adoption fails fastest when a system is trusted past what it has actually proven.",
  },
];

const stats = [
  {
    figure: "6 months",
    label: "Ad hoc delivery → predictable Scrum",
    detail:
      "Two teams inside a 20-person cross-functional org, moved from non-trackable work to a steady cadence.",
  },
  {
    figure: "14 / ~50",
    label: "Direct reports at peak / managed overall",
    detail:
      "Across two international teams; personally hired 20+ engineers and owned the full employee lifecycle.",
  },
  {
    figure: "~$1M",
    label: "Recurring annual licensing eliminated",
    detail:
      "Architected and built an enterprise HL7 integration platform that replaced CorePoint across all clients.",
  },
];

const experience = [
  {
    role: "Senior Development Manager",
    org: "Dental Intelligence",
    period: "2024 – 2026",
  },
  {
    role: "Software Engineer II",
    org: "Melaleuca",
    period: "2023 – 2024",
  },
  {
    role: "Software Development Manager",
    org: "Martin Garage Door",
    period: "2022 – 2023",
  },
  {
    role: "Software Development Manager",
    org: "ChartLogic / Medsphere",
    period: "2015 – 2022",
  },
  {
    role: "Senior Software Engineer",
    org: "Echopass / Genesys",
    period: "2014 – 2015",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-24 px-6 py-24 sm:px-8">
        <Reveal className="flex flex-col gap-4">
          <p className="font-mono text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Mark Feldman
            <span className="text-zinc-400 dark:text-zinc-600"> · </span>
            Herriman, UT
            <span className="text-zinc-400 dark:text-zinc-600"> · </span>
            Remote
          </p>
          <h1 className="bg-gradient-to-br from-[#2a78d6] via-black to-black bg-clip-text text-5xl font-semibold tracking-tighter text-transparent sm:text-6xl dark:from-[#3987e5] dark:via-white dark:to-white">
            Agentic Systems Engineer
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I build systems where AI agents do real engineering work under
            real constraints — multi-agent orchestration, permission and
            authorization boundaries, and the review discipline that makes
            agent output safe to merge.
          </p>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I&apos;m looking for a role helping a team adopt agentic AI. I
            spent 12+ years leading engineering teams before this, and the
            hard part was never the tool — it was getting an organization to
            use a capable new thing well, and making the practice stick.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              How I actually work with agents
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Most &ldquo;AI experience&rdquo; means prompting a chat window.
              This is the operating practice I run instead.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {practices.map((practice) => (
              <div
                key={practice.title}
                className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-medium text-black dark:text-zinc-50">
                  {practice.title}
                </h3>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Current projects
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Foundry is the operating layer I am building for repeatable,
            governed AI work. Cerberus is the large contract-driven build that
            keeps pressure-testing how agents behave when invention is forbidden.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full border border-[#2a78d6]/30 bg-[#2a78d6]/10 px-3 py-1 font-mono text-xs tracking-wide text-[#1c5cab] uppercase dark:text-[#86b6ef]">
              In progress
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Foundry — the operating layer for dependable AI work
            </h3>
          </div>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            General agents can reason, code, and use tools. Foundry makes a
            repeated job survive the chat window: the work is versioned,
            context is traceable, progress is checkpointed, authority is
            explicit, and consequential outcomes still stop at a human gate.
          </p>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Five chapters are implemented through durable workflows. Chapter
            5 is active: turning a proven repository-inspection procedure into
            a reusable Skill that carries instructions without carrying data,
            credentials, or authority with it.
          </p>
          <a
            href="/foundry"
            className="w-fit rounded-full border border-[#2a78d6]/40 bg-[#2a78d6]/10 px-5 py-2.5 text-base font-medium text-[#1c5cab] transition-all hover:-translate-y-0.5 hover:border-[#2a78d6] hover:shadow-lg hover:shadow-[#2a78d6]/15 dark:text-[#86b6ef]"
          >
            Explore the Foundry concept and build →
          </a>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <h4 className="font-medium text-black dark:text-zinc-50">
                Judgment moves. Authority does not.
              </h4>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Deterministic software keeps the books, AI handles bounded
                judgment, and a model cannot approve its own consequential
                result. Permission is a validated contract, not reassuring
                prose in a prompt.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <h4 className="font-medium text-black dark:text-zinc-50">
                It is designed to outlive a provider
              </h4>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Hosted and local models sit behind one inference boundary.
                Workflows, approvals, evidence, budgets, and run history stay
                with Foundry instead of disappearing when the model changes.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <h4 className="font-medium text-black dark:text-zinc-50">
                151 tests, 149 subtests, and a stricter red gate
              </h4>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                The current working tree passes the full suite. A recent
                Steward run also proved that safe execution was not enough:
                its answer quality failed. The evaluation now separates those
                claims, and a fresh end-to-end quality proof remains open.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full border border-[#2a78d6]/30 bg-[#2a78d6]/10 px-3 py-1 font-mono text-xs tracking-wide text-[#1c5cab] uppercase dark:text-[#86b6ef]">
              In progress
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Perimeter-Cerberus — agents under a frozen contract set
            </h3>
          </div>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A game built against 356 design contracts that are the sole
            authority: no gameplay value, ID, reward or UI state may be chosen
            or inferred outside them. It is the closest thing I have to a
            controlled experiment in what agents do when guessing is forbidden
            — because every time one wanted to fill a gap, the gap got written
            down instead.
          </p>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Twenty-six sprints, a shipped Windows build and Android APK, and
            two registers of everything the contracts got wrong. The
            implementation stays private — it is an unreleased game — but the
            engineering record is published here.
          </p>
          <Link
            href="/perimeter-cerberus"
            className="w-fit rounded-full border border-[#2a78d6]/40 bg-[#2a78d6]/10 px-5 py-2.5 text-base font-medium text-[#1c5cab] transition-all hover:-translate-y-0.5 hover:border-[#2a78d6] hover:shadow-lg hover:shadow-[#2a78d6]/15 dark:text-[#86b6ef]"
          >
            Read the project roadmap →
          </Link>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <h4 className="font-medium text-black dark:text-zinc-50">
                It refused to invent a value nobody wrote
              </h4>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Career Rounds 1 through 3 set a minimum spawn separation of
                20°, 18°, 16°. Rounds 4 and 5 state none. The obvious
                continuation is 14 and 12, and that is exactly the problem —
                it would put a spawn rule into the game under a citation that
                never mentions one. The generator emits zero, prints a warning,
                and the gap is filed as a defect awaiting an amendment.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <h4 className="font-medium text-black dark:text-zinc-50">
                A success that was silently wrong
              </h4>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                A generator&apos;s pattern matched letters followed by at least
                one digit, so three letters-only skill keystones never matched
                and never became nodes. Nothing failed. The output was
                well-formed and 33 nodes is a perfectly plausible number. It
                surfaced only because a second, independent reading of the same
                contracts was cross-checked against the first — which is the
                only reason anyone found it at all.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <h4 className="font-medium text-black dark:text-zinc-50">
                Two of eighteen release gates met
              </h4>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                The other sixteen are listed as pending rather than deferred
                out of sight. At the frozen v1 tag, all 1,569 tests pass; CI
                runs the same suite on Linux, Windows, and macOS. That is the
                baseline the second build has to preserve, not a claim that v2
                already exists.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-6 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 font-mono text-xs tracking-wide text-zinc-600 uppercase dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
              Earlier project · maintained
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Atlas — a governance layer for multi-agent work
            </h3>
          </div>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Atlas explored authorization and decision structure for teams of
            agents: a human director authorizes, an executive agent plans,
            specialized advisors inform hard calls, and bounded operators act.
            Its most important lesson now feeds Foundry: enforcement belongs in
            task shape and validated state, not in prompt language alone.
          </p>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The implementation remains private. The public record includes the
            architecture decisions, phased plan, risk register, and the gaps
            that were deliberately left visible.
          </p>
          <a
            href="https://github.com/markfeldman/atlas-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-base font-medium text-[#2a78d6] underline decoration-[#2a78d6]/40 underline-offset-4 transition-colors hover:decoration-[#2a78d6] dark:text-[#6fa8e8]"
          >
            Read the Atlas design record →
          </a>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            This site is a work sample too
          </h2>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Built with Claude Code, not a template — real architecture
            tradeoffs, real deployment friction, and real decisions about
            what to delegate versus keep human-controlled. The panels below
            are live from this repo&apos;s own GitHub API and CI, not
            screenshots.
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <LiveRepoActivity />
            <LiveWorkflowStatus />
          </div>
          <Link
            href="/how-i-built-this"
            className="w-fit text-base font-medium text-[#2a78d6] underline decoration-[#2a78d6]/40 underline-offset-4 transition-colors hover:decoration-[#2a78d6] dark:text-[#6fa8e8]"
          >
            Read how it was built →
          </Link>
        </Reveal>

        <Reveal className="flex flex-col gap-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              The background this rests on
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              15+ years in C#/.NET, 12+ leading the teams that ship it. My
              track record is walking into organizations with no engineering
              practice and installing one that lasts — which is the same
              problem as adopting agentic AI well.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1.5 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-2xl font-semibold tracking-tight text-[#2a78d6] dark:text-[#6fa8e8]">
                  {stat.figure}
                </span>
                <span className="text-sm font-medium text-black dark:text-zinc-50">
                  {stat.label}
                </span>
                <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
          <ul className="flex flex-col">
            {experience.map((job) => (
              <li
                key={`${job.org}-${job.period}`}
                className="flex flex-col gap-0.5 border-b border-zinc-200 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 dark:border-zinc-800"
              >
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="font-medium text-black dark:text-zinc-50">
                    {job.role}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {job.org}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-sm text-zinc-500 dark:text-zinc-500">
                  {job.period}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Enterprise SaaS, healthcare technology, and analytics — including
            a multi-tenant EHR platform under HIPAA, SOC 2, and ONC
            obligations.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Let&apos;s connect
          </h2>
          <a
            href="https://www.linkedin.com/in/mark-feldman-61657151/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full bg-black px-5 py-3 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg hover:shadow-[#2a78d6]/20 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Connect on LinkedIn
          </a>
        </Reveal>
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 pb-8 text-sm text-zinc-500 sm:px-8 dark:text-zinc-500">
        © {new Date().getFullYear()} Mark Feldman
      </footer>
    </div>
  );
}
