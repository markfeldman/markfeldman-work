import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Foundry — Mark Feldman",
  description:
    "Foundry is a provider-neutral operating layer for repeatable AI work: durable workflows, explicit authority, traceable context, human gates, and measurable outcomes.",
};

const chapters = [
  ["00", "Foundation", "Complete", "Validated state, append-only events, contracts, and a tested command surface."],
  ["01", "One real cycle", "Complete", "A bounded, human-approved build cycle with decisions, artifacts, and a recorded outcome."],
  ["02", "Hardened harness", "Complete", "Provider-neutral model calls, tool authorization, recoverable transitions, and exact provenance."],
  ["03", "Context that earns trust", "Complete", "Source-hashed retrieval, bounded cited context, and measured grounding instead of prompt stuffing."],
  ["04", "Durable work", "Complete", "Checkpointed workflows, retries, budgets, parallel joins, authorized effects, and human gates."],
  ["05", "Reusable capabilities", "Active", "Promoting proven procedures into portable Skills without smuggling data or authority with them."],
  ["06", "Generalization", "Next", "Prove the system transfers to a second, unlike product and remove assumptions that do not travel."],
] as const;

const comparisons = [
  ["A model can attempt a sequence", "Foundry checkpoints it and resumes without replaying completed work"],
  ["A model can call a tool", "Foundry decides whether that tool is allowed here, now, for this job"],
  ["A model knows the conversation", "Foundry assembles approved, source-traceable context"],
  ["A model produces an answer", "Foundry records evidence, cost, decisions, quality checks, and outcome"],
  ["A provider supplies judgment", "Foundry keeps the work portable when the provider changes"],
];

function Arrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-1 text-[#2a78d6] md:px-1 md:py-0">
      <span className="rotate-90 font-mono text-xl md:rotate-0">→</span>
    </div>
  );
}

export default function FoundryPage() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 py-16 sm:px-8 sm:py-24">
        <Reveal className="flex flex-col gap-8">
          <Link href="/" className="w-fit font-mono text-sm text-zinc-500 transition-colors hover:text-[#2a78d6] dark:text-zinc-400 dark:hover:text-[#6fa8e8]">
            ← Mark Feldman
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <span className="w-fit rounded-full border border-[#2a78d6]/30 bg-[#2a78d6]/10 px-3 py-1 font-mono text-xs tracking-wide text-[#1c5cab] uppercase dark:text-[#86b6ef]">
                Active build · v0.1
              </span>
              <h1 className="max-w-3xl bg-gradient-to-br from-[#2a78d6] via-black to-black bg-clip-text text-5xl font-semibold tracking-tighter text-transparent sm:text-7xl dark:from-[#3987e5] dark:via-white dark:to-white">
                AI can do the work. Foundry makes the work dependable.
              </h1>
              <p className="max-w-2xl text-xl leading-9 text-zinc-600 dark:text-zinc-300">
                Foundry is a provider-neutral operating layer for repeatable AI work: explicit authority, durable workflows, traceable context, human approval, and evidence that survives the chat window.
              </p>
            </div>
            <div className="rounded-3xl border border-[#2a78d6]/20 bg-[#2a78d6]/5 p-6 shadow-2xl shadow-[#2a78d6]/10 dark:border-[#3987e5]/30 dark:bg-[#3987e5]/10">
              <p className="font-mono text-xs tracking-widest text-[#1c5cab] uppercase dark:text-[#86b6ef]">The concept in one line</p>
              <p className="mt-3 text-lg font-medium leading-8 text-black dark:text-zinc-50">
                Deterministic software keeps the books. AI handles judgment. Humans retain consequential authority.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">Why it exists</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">A capable agent is not yet a reliable way of working.</h2>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              General agents are excellent at adaptable judgment. Repeated workplace tasks need something else around them: a defined job, approved knowledge, bounded tools, recoverable state, measurable quality, and a person who still owns the decision.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <div className="grid grid-cols-[0.8fr_1.2fr] border-b border-black/5 bg-black/[0.025] px-5 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/5 sm:grid-cols-2">
              <span className="text-zinc-500 dark:text-zinc-400">General agent</span>
              <span className="text-[#1c5cab] dark:text-[#86b6ef]">Foundry adds the operating layer</span>
            </div>
            {comparisons.map(([agent, foundry]) => (
              <div key={agent} className="grid grid-cols-[0.8fr_1.2fr] gap-5 border-b border-black/5 px-5 py-4 text-sm leading-6 last:border-b-0 dark:border-white/10 sm:grid-cols-2 sm:text-base">
                <span className="text-zinc-500 dark:text-zinc-400">{agent}</span>
                <span className="font-medium text-black dark:text-zinc-100">{foundry}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">The governed work loop</p>
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">Judgment moves. Authority does not.</h2>
          </div>
          <div className="grid items-stretch md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {[
              ["01", "Define the job", "Mission, scope, evidence, tools, budgets, and success are versioned before the run."],
              ["02", "Assemble context", "Only approved, bounded, source-traceable material crosses into model judgment."],
              ["03", "Run and checkpoint", "Deterministic steps and AI decisions are recorded. Interrupted work resumes safely."],
              ["04", "Human gate", "Consequential effects stay blocked until an authorized person approves the exact outcome."],
            ].map(([number, title, body], index) => (
              <div key={number} className="contents">
                <div className="flex min-h-56 flex-col justify-between rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                  <span className="font-mono text-sm text-[#2a78d6] dark:text-[#6fa8e8]">{number}</span>
                  <div className="mt-8 flex flex-col gap-2">
                    <h3 className="font-semibold text-black dark:text-zinc-50">{title}</h3>
                    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{body}</p>
                  </div>
                </div>
                {index < 3 ? <Arrow /> : null}
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-dashed border-[#2a78d6]/40 bg-[#2a78d6]/5 px-5 py-4 text-center font-mono text-sm text-[#1c5cab] dark:text-[#86b6ef]">
            Every step leaves durable state, evidence, cost, decisions, and an observable outcome.
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">The architecture</p>
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">Reuse the procedure. Keep trust local.</h2>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Foundry separates portable machinery from private context and from the model providing judgment. A reusable Skill carries instructions—not repository access, credentials, approval power, or a hidden data destination.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ["Portable core", "The operating machinery", "Contracts, workflow execution, checkpoints, adapters, evaluations, budgets, and event history."],
              ["Isolated workspace", "The trust boundary", "Agents, approved knowledge, installed Skills, resource grants, private state, and local runtime policy."],
              ["Replaceable runtime", "The judgment engine", "Hosted or local models sit behind one validated boundary. The provider does not own the workflow."],
            ].map(([eyebrow, title, body], index) => (
              <div key={title} className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                <span className="absolute right-4 top-2 font-mono text-6xl font-semibold text-[#2a78d6]/10">{index + 1}</span>
                <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">{eyebrow}</p>
                <h3 className="mt-10 text-xl font-semibold tracking-tight text-black dark:text-zinc-50">{title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">{body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Default deny", "No secrets in state", "No model self-approval"].map((rule) => (
              <div key={rule} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-black/[0.025] px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-[#2a78d6]/10 font-mono text-xs text-[#2a78d6]">✓</span>
                <span className="text-sm font-medium text-black dark:text-zinc-100">{rule}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">Where it stands</p>
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">Five chapters built. The sixth is being proven.</h2>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Foundry is not a finished platform. It is an executable research-and-build program with complete foundations through durable workflows, and active work turning one proven procedure into a capability that transfers cleanly.
            </p>
          </div>
          <ol className="relative flex flex-col before:absolute before:bottom-6 before:left-[1.18rem] before:top-6 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
            {chapters.map(([number, title, status, detail]) => (
              <li key={number} className="relative grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                <span className={`z-10 flex size-10 items-center justify-center rounded-full border font-mono text-xs ${status === "Complete" ? "border-[#2a78d6]/40 bg-[#2a78d6] text-white" : status === "Active" ? "border-[#2a78d6] bg-white text-[#2a78d6] ring-4 ring-[#2a78d6]/10 dark:bg-[#0a0a0a]" : "border-zinc-300 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-[#0a0a0a]"}`}>
                  {number}
                </span>
                <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-md sm:flex-row sm:items-start sm:justify-between sm:gap-6 dark:border-white/10 dark:bg-white/5">
                  <div><h3 className="font-semibold text-black dark:text-zinc-50">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{detail}</p></div>
                  <span className={`mt-2 shrink-0 font-mono text-xs uppercase sm:mt-0 ${status === "Complete" || status === "Active" ? "text-[#2a78d6] dark:text-[#6fa8e8]" : "text-zinc-500"}`}>{status}</span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">Evidence, not theater</p>
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">The system is allowed to find itself wrong.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["151 + 149", "Tests and subtests passing", "Verified against the current working tree on August 31, 2026."],
              ["8 / 8", "Frozen Skill-routing cases", "The first run scored 7/8. The false positive became a tighter boundary; the identical rerun passed all eight."],
              ["0", "Model-owned human approvals", "A model result cannot approve itself, even when its structure is valid."],
            ].map(([figure, title, detail]) => (
              <div key={title} className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md first:border-[#2a78d6]/20 first:bg-[#2a78d6]/5 dark:border-white/10 dark:bg-white/5 dark:first:border-[#3987e5]/30 dark:first:bg-[#3987e5]/10">
                <span className="text-4xl font-semibold tracking-tight text-[#2a78d6] dark:text-[#6fa8e8]">{figure}</span>
                <h3 className="mt-3 font-semibold text-black dark:text-zinc-50">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">A recent correction</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">Safe execution was not the same as a good answer.</h3>
              </div>
              <div className="flex flex-col gap-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <p>A read-only Steward run passed structural checks but produced an answer that was not grounded or coherent enough to trust. Human approval exposed that the evaluation had measured execution safety without adequately measuring answer quality.</p>
                <p>Foundry now separates those scores, blocks approval unless both pass, rejects several deterministic failure patterns before the human gate, and accounts for failed or rejected model calls instead of making their cost disappear.</p>
                <p className="font-medium text-black dark:text-zinc-100">The new gate is implemented and tested. A fresh end-to-end model result that earns the stricter quality proof is still outstanding.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="grid gap-6 rounded-3xl border border-[#2a78d6]/20 bg-gradient-to-br from-[#2a78d6]/10 to-transparent p-7 sm:p-10 lg:grid-cols-[1fr_0.8fr] dark:border-[#3987e5]/30">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-widest text-[#2a78d6] uppercase dark:text-[#6fa8e8]">What remains</p>
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">Prove transfer, then broaden.</h2>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              The immediate work is to re-earn the Steward quality proof under the stronger gate, generalize output evaluation beyond one repository, and run the complete capability against an unlike codebase. After that, a second private product will test whether Foundry&apos;s procedures travel beyond software-project stewardship.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 rounded-2xl border border-black/5 bg-white/70 p-5 dark:border-white/10 dark:bg-black/20">
            {["Re-earn end-to-end answer quality", "Transfer to an unlike repository", "Generalize through a second product", "Add standards only where they earn their keep"].map((item, index) => (
              <div key={item} className="flex items-start gap-3"><span className="mt-0.5 font-mono text-xs text-[#2a78d6]">0{index + 1}</span><span className="text-sm font-medium leading-6 text-black dark:text-zinc-100">{item}</span></div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">The assessment</p>
          <p className="max-w-4xl text-xl leading-9 text-zinc-700 dark:text-zinc-300">
            Foundry is already more than a concept: its core boundaries, retrieval, workflow durability, workspace isolation, evaluation machinery, and first reusable Skill are executable and tested. It is not yet a generally proven platform. Its strongest quality is that the remaining distance is visible in contracts, tests, recorded decisions, and gates that are allowed to stay red.
          </p>
          <Link href="/" className="mt-2 w-fit rounded-full bg-black px-5 py-3 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg hover:shadow-[#2a78d6]/20 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Back to current projects</Link>
        </Reveal>
      </main>
      <footer className="mx-auto w-full max-w-6xl px-6 pb-8 text-sm text-zinc-500 sm:px-8">© {new Date().getFullYear()} Mark Feldman</footer>
    </div>
  );
}
