const skills = [
  {
    title: "Leading teams through platform change",
    description:
      "Years managing software development teams through significant tooling and process shifts — the same muscle now pointed at agentic AI adoption.",
  },
  {
    title: "Evaluating agentic AI tooling",
    description:
      "Hands-on with agent harnesses, orchestration frameworks, and the practical tradeoffs between them — not just reading about them.",
  },
  {
    title: "Building adoption playbooks",
    description:
      "Turning a promising capability into practices a team can actually run with: workflows, guardrails, and the judgment calls in between.",
  },
  {
    title: "Change management for AI-assisted development",
    description:
      "Helping engineers get comfortable delegating real work to agents — where it earns trust, and where it still needs a human in the loop.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-24 px-6 py-24 sm:px-8">
        <section className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Mark Feldman
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            Agentic Systems Engineer
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I&apos;m a senior software development manager moving deeper into
            agentic AI — architecting agent workflows, evaluating the tools
            that make them work, and building the practices that help
            engineering teams put them to real use.
          </p>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I&apos;m looking for a role helping a team adopt agentic AI —
            somewhere my engineering leadership background and hands-on
            agentic AI work both matter.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            What I bring
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.title} className="flex flex-col gap-2">
                <h3 className="font-medium text-black dark:text-zinc-50">
                  {skill.title}
                </h3>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Let&apos;s connect
          </h2>
          <a
            href="https://www.linkedin.com/in/mark-feldman-61657151/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full bg-black px-5 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Connect on LinkedIn
          </a>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 pb-8 text-sm text-zinc-500 sm:px-8 dark:text-zinc-500">
        © {new Date().getFullYear()} Mark Feldman
      </footer>
    </div>
  );
}
