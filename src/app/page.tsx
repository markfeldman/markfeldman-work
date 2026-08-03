import Link from "next/link";
import LiveRepoActivity from "@/components/LiveRepoActivity";
import LiveWorkflowStatus from "@/components/LiveWorkflowStatus";
import Reveal from "@/components/Reveal";

const stats = [
  {
    figure: "~$1M",
    label: "Recurring annual licensing eliminated",
    detail:
      "Architected and built an enterprise HL7 integration platform that replaced CorePoint across all clients.",
  },
  {
    figure: "6 months",
    label: "Ad hoc delivery → predictable Scrum",
    detail:
      "Two teams inside a 20-person cross-functional org, moved from non-trackable work to a steady cadence.",
  },
  {
    figure: "Weeks → hours",
    label: "P0/P1 incident recovery",
    detail:
      "Directed resolution of every P0/P1 analytics incident, coordinating Dev, QA, Ops, and release support.",
  },
  {
    figure: "14 / ~50",
    label: "Direct reports at peak / managed overall",
    detail:
      "Across two international teams; personally hired 20+ engineers and owned the full employee lifecycle.",
  },
];

const skills = [
  {
    title: "Installing practice where none exists",
    description:
      "PR standards, SonarCloud analysis, and a 90%+ coverage expectation for net-new code — introduced at a company that had none of it. Adopting agentic AI is the same problem shape: a capable tool nobody has agreed how to use yet.",
  },
  {
    title: "Making adoption stick, not just start",
    description:
      "Built a security and technical-debt program that reserved 20% of every sprint (10% each) with a six-month scheduling requirement. Durable practice beats a pilot that quietly lapses.",
  },
  {
    title: "Governance for high-stakes systems",
    description:
      "Owned engineering interpretation of HIPAA, SOC 2, and ONC on a live EHR platform. The judgment about what an autonomous system may and may not do unsupervised is the same judgment.",
  },
  {
    title: "Hands-on, not just directing",
    description:
      "15+ years of C#/.NET behind the management. I evaluate agent harnesses and orchestration frameworks by building with them — this site included.",
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
            15+ years building software in C#/.NET, 12+ leading the teams that
            ship it. My track record is walking into organizations with no
            engineering practice and installing one that lasts — delivery
            cadence, quality gates, security programs, release governance.
          </p>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I&apos;m looking for a role helping a team adopt agentic AI. It&apos;s
            the same problem I&apos;ve solved repeatedly: a genuinely capable
            new tool, and an organization that hasn&apos;t yet worked out how to
            use it well.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Track record
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1.5 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-3xl font-semibold tracking-tight text-[#2a78d6] dark:text-[#6fa8e8]">
                  {stat.figure}
                </span>
                <span className="font-medium text-black dark:text-zinc-50">
                  {stat.label}
                </span>
                <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Why that translates
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-medium text-black dark:text-zinc-50">
                  {skill.title}
                </h3>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Experience
          </h2>
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
            Enterprise SaaS, healthcare technology, and analytics — including a
            multi-tenant EHR platform under HIPAA, SOC 2, and ONC obligations.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            This site is the work sample
          </h2>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I built this with Claude Code rather than a template — real
            architecture tradeoffs, real deployment friction, and real
            decisions about what to hand to an agent versus keep
            human-controlled. That process is more representative of
            adopting agentic AI on a team than a chatbot widget would be.
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <LiveRepoActivity />
            <LiveWorkflowStatus />
          </div>
          <Link
            href="/how-i-built-this"
            className="w-fit text-base font-medium text-[#2a78d6] underline decoration-[#2a78d6]/40 underline-offset-4 transition-colors hover:decoration-[#2a78d6] dark:text-[#6fa8e8]"
          >
            How I built this →
          </Link>
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
