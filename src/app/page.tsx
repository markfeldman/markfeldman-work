import Link from "next/link";
import LiveRepoActivity from "@/components/LiveRepoActivity";
import LiveWorkflowStatus from "@/components/LiveWorkflowStatus";
import Reveal from "@/components/Reveal";

const workflow = ["Inception", "Proof", "Development", "Launch", "Post-launch"];

const practices = [
  { number: "01", title: "Parallel work, isolated branches", description: "Agents work concurrently in separate worktrees. Their branches return one at a time for deliberate review and merge." },
  { number: "02", title: "Human-only authority", description: "Credentials, production accounts, live domains, and real spend stop with me. That boundary is part of the architecture." },
  { number: "03", title: "Evidence closes the loop", description: "A passing-looking result is not enough. I read the diff, run the checks, inspect the output, and keep failed gates visible." },
];

const stats = [
  { figure: "6 months", label: "Ad hoc delivery to predictable Scrum", detail: "Two teams inside a 20-person cross-functional organization, moved from non-trackable work to a steady cadence." },
  { figure: "14 / ~50", label: "Direct reports at peak / managed overall", detail: "Across two international teams; personally hired 20+ engineers and owned the full employee lifecycle." },
  { figure: "~$1M", label: "Recurring annual licensing eliminated", detail: "Architected and built an enterprise HL7 integration platform that replaced CorePoint across all clients." },
];

const experience = [
  ["Senior Development Manager", "Dental Intelligence", "2024 - 2026"],
  ["Software Engineer II", "Melaleuca", "2023 - 2024"],
  ["Software Development Manager", "Martin Garage Door", "2022 - 2023"],
  ["Software Development Manager", "ChartLogic / Medsphere", "2015 - 2022"],
  ["Senior Software Engineer", "Echopass / Genesys", "2014 - 2015"],
];

function Arrow() {
  return <span aria-hidden="true">&rarr;</span>;
}

export default function Home() {
  return (
    <div className="site-shell flex min-h-screen flex-col font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-28 px-6 py-10 sm:px-8 sm:py-16 lg:px-10">
        <Reveal className="hero-grid relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/65 p-7 shadow-2xl shadow-[#2a78d6]/10 backdrop-blur-xl sm:p-10 lg:p-14 dark:border-white/10 dark:bg-black/35">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="relative z-10 flex max-w-3xl flex-col gap-7">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
              <span>Mark Feldman</span><span className="h-px w-8 bg-[#2a78d6]" /><span>Herriman, UT</span><span>Remote</span>
            </div>
            <h1 className="max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.055em] text-black sm:text-7xl lg:text-8xl dark:text-white">
              I&apos;m building a studio
              <span className="block text-[#2a78d6] dark:text-[#6fa8e8]">and the system behind it.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl dark:text-zinc-300">
              Haunted Game Studio is where the work ships. MACK is the control plane I&apos;m building to make a growing team of specialist agents repeatable, reviewable, and safe to direct.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#headliners" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/20 dark:bg-white dark:text-black">See the work <Arrow /></a>
              <a href="https://hauntingsoftware.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#2a78d6]/35 bg-[#2a78d6]/8 px-6 py-3 text-sm font-semibold text-[#1c5cab] transition-all hover:-translate-y-0.5 hover:border-[#2a78d6] dark:text-[#86b6ef]">Visit Haunted Game Studio <Arrow /></a>
            </div>
          </div>
          <div className="relative z-10 mt-14 grid gap-3 border-t border-black/8 pt-6 sm:grid-cols-3 dark:border-white/10">
            {[["HGS", "Products and player feedback"], ["MACK", "Direction and coordination"], ["MARK", "Judgment and authority"]].map(([label, detail]) => (
              <div key={label} className="flex items-center gap-3"><span className="font-mono text-xs font-bold tracking-[0.2em] text-[#2a78d6] dark:text-[#6fa8e8]">{label}</span><span className="text-sm text-zinc-500 dark:text-zinc-400">{detail}</span></div>
            ))}
          </div>
        </Reveal>

        <section id="headliners" className="flex scroll-mt-10 flex-col gap-6">
          <Reveal className="flex items-end justify-between gap-6">
            <div><p className="section-kicker">The headliners</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white">One makes the work real. The other makes it repeatable.</h2></div>
            <span className="hidden font-mono text-7xl font-semibold tracking-[-0.08em] text-black/[0.035] lg:block dark:text-white/[0.045]">HGS/MACK</span>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className="feature-card studio-card flex h-full flex-col justify-between gap-12 overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 p-7 backdrop-blur-xl sm:p-9 dark:border-white/10 dark:bg-white/5">
                <div className="studio-sigil" aria-hidden="true"><span>HGS</span></div>
                <div className="relative z-10 flex flex-col gap-5">
                  <div><p className="section-kicker">Haunted Game Studio</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">A real studio, built in public where it counts.</h3></div>
                  <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">I use a working game studio as the proving ground for agentic delivery: design, engineering, builds, testing, launch operations, audio, art, and the systems connecting them.</p>
                  <div className="rounded-2xl border border-[#2a78d6]/25 bg-[#2a78d6]/8 p-5">
                    <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#2a78d6] uppercase dark:text-[#6fa8e8]">Shipped</p>
                    <p className="mt-2 text-xl font-semibold text-black dark:text-white">Mushrooms vs Skulls is live on Android.</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Released under Haunted Game Studio, with iOS work still ahead. A product people can install is a stronger claim than a polished agent demo.</p>
                  </div>
                  <a href="https://hauntingsoftware.com" target="_blank" rel="noopener noreferrer" className="w-fit text-sm font-semibold text-[#2a78d6] underline decoration-[#2a78d6]/40 underline-offset-4 hover:decoration-[#2a78d6] dark:text-[#6fa8e8]">Enter the studio <Arrow /></a>
                </div>
              </article>
            </Reveal>
            <Reveal className="h-full">
              <article className="feature-card blueprint-card flex h-full flex-col gap-8 rounded-[2rem] border border-black/5 bg-zinc-950 p-7 text-white shadow-2xl shadow-[#2a78d6]/10 sm:p-9 dark:border-white/10">
                <div><p className="font-mono text-xs font-semibold tracking-[0.18em] text-[#6fa8e8] uppercase">MACK / in development</p><h3 className="mt-3 text-3xl font-semibold tracking-tight">Master Agent Control Kiosk</h3><p className="mt-4 text-lg leading-8 text-zinc-300">MACK is the studio control plane I&apos;m designing: one place to direct specialist agents, expose the state of a game, enforce handoffs, and keep the human Director in control.</p></div>
                <div className="mack-console rounded-2xl border border-white/10 bg-black/35 p-5">
                  <div className="mb-5 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase"><span>Studio pipeline</span><span>Design target</span></div>
                  <ol className="relative flex flex-col gap-3">
                    {workflow.map((stage, index) => (<li key={stage} className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3987e5]/50 font-mono text-[10px] text-[#6fa8e8]">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium">{stage}</span><span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#3987e5] shadow-[0_0_12px_#3987e5]" /></li>))}
                  </ol>
                </div>
                <p className="text-sm leading-6 text-zinc-400">This is the system being built, not a fake operations dashboard. The studio&apos;s current agents and tools exist; MACK is the layer intended to coordinate them.</p>
              </article>
            </Reveal>
          </div>
        </section>

        <Reveal className="flex flex-col gap-8">
          <div><p className="section-kicker">Operating practice</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">The interesting part is not that the agents can code.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {practices.map((practice) => (<article key={practice.number} className="feature-card rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5"><span className="font-mono text-xs font-semibold text-[#2a78d6] dark:text-[#6fa8e8]">{practice.number}</span><h3 className="mt-6 text-lg font-semibold text-black dark:text-white">{practice.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{practice.description}</p></article>))}
          </div>
        </Reveal>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="flex flex-col gap-5"><p className="section-kicker">Pressure test</p><h2 className="text-3xl font-semibold tracking-tight text-black dark:text-white">Perimeter-Cerberus made guessing visible.</h2><p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">A game built against 356 frozen design contracts. When a value was missing, the agents had to expose the gap instead of filling it with something plausible. Twenty-six sprints, a Windows build, an Android APK, and two registers of what the contracts got wrong.</p><Link href="/perimeter-cerberus" className="w-fit text-sm font-semibold text-[#2a78d6] underline decoration-[#2a78d6]/40 underline-offset-4 hover:decoration-[#2a78d6] dark:text-[#6fa8e8]">Inspect the engineering record <Arrow /></Link></Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5"><p className="font-mono text-xs text-[#2a78d6] dark:text-[#6fa8e8]">1,569 tests</p><h3 className="mt-3 font-semibold text-black dark:text-white">The frozen v1 baseline passes.</h3><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">CI runs the same suite on Linux, Windows, and macOS. It is a baseline for the next build, not a claim that the next build is done.</p></div>
            <div className="rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5"><p className="font-mono text-xs text-[#2a78d6] dark:text-[#6fa8e8]">2 / 18 gates</p><h3 className="mt-3 font-semibold text-black dark:text-white">Pending means pending.</h3><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">The remaining release gates stay visible instead of being deferred out of sight to make the project look further along.</p></div>
          </Reveal>
        </section>

        <Reveal className="flex flex-col gap-6">
          <div><p className="section-kicker">Evidence, now</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">This site proves its own claims.</h2><p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">These panels fetch this repository&apos;s public GitHub activity and CI runs at page-view time. They are live data, not captured screenshots.</p></div>
          <div className="grid gap-4 lg:grid-cols-2"><LiveRepoActivity /><LiveWorkflowStatus /></div>
          <Link href="/how-i-built-this" className="w-fit text-sm font-semibold text-[#2a78d6] underline decoration-[#2a78d6]/40 underline-offset-4 hover:decoration-[#2a78d6] dark:text-[#6fa8e8]">Read how this site was built <Arrow /></Link>
        </Reveal>

        <Reveal className="archive-strip rounded-2xl border border-dashed border-zinc-300/80 p-6 dark:border-zinc-700">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr_1fr] lg:items-start">
            <div><p className="font-mono text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">The archive</p><h2 className="mt-2 text-xl font-semibold text-black dark:text-white">The prototypes had names. The lessons stayed.</h2></div>
            <div><h3 className="font-semibold text-black dark:text-white">Foundry</h3><p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">An earlier operating-layer concept that clarified durable workflows, explicit authority, checkpoints, and provider boundaries.</p><Link href="/foundry" className="mt-3 inline-block text-sm text-zinc-600 underline underline-offset-4 dark:text-zinc-300">Open the old workshop <Arrow /></Link></div>
            <div><h3 className="font-semibold text-black dark:text-white">Atlas</h3><p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">The governance experiment that taught me enforcement belongs in task shape and validated state, not reassuring prompt language.</p><a href="https://github.com/markfeldman/atlas-docs" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-zinc-600 underline underline-offset-4 dark:text-zinc-300">Browse the design record <Arrow /></a></div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <div><p className="section-kicker">The operator behind it</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">15+ years building software. 12+ leading the teams that ship it.</h2><p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">My track record is walking into organizations with no durable engineering practice and installing one that lasts. Adopting agentic AI well is the same kind of organizational problem.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">{stats.map((stat) => (<article key={stat.label} className="rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5"><p className="text-2xl font-semibold tracking-tight text-[#2a78d6] dark:text-[#6fa8e8]">{stat.figure}</p><p className="mt-2 text-sm font-semibold text-black dark:text-white">{stat.label}</p><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{stat.detail}</p></article>))}</div>
          <ul>{experience.map(([role, org, period]) => (<li key={`${org}-${period}`} className="flex flex-col gap-1 border-b border-zinc-200 py-4 last:border-0 sm:flex-row sm:items-baseline sm:justify-between dark:border-zinc-800"><p><span className="font-medium text-black dark:text-white">{role}</span><span className="text-zinc-500"> / {org}</span></p><span className="font-mono text-sm text-zinc-500">{period}</span></li>))}</ul>
        </Reveal>

        <Reveal className="cta-panel flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] border border-[#2a78d6]/20 bg-[#2a78d6]/8 p-8 sm:flex-row sm:items-end sm:p-10">
          <div><p className="section-kicker">What comes next</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">I&apos;m looking for the team ready to make agentic work operational.</h2></div>
          <a href="https://www.linkedin.com/in/mark-feldman-61657151/" target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/20 dark:bg-white dark:text-black">Connect on LinkedIn <Arrow /></a>
        </Reveal>
      </main>
      <footer className="mx-auto w-full max-w-6xl px-6 pb-8 text-sm text-zinc-500 sm:px-8 lg:px-10">&copy; {new Date().getFullYear()} Mark Feldman</footer>
    </div>
  );
}
