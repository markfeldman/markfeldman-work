import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  prose,
  thousands,
  roadmap,
  type Gate,
  type KickoffItem,
  type Track,
} from "@/lib/cerberus";

export const metadata: Metadata = {
  title: "Perimeter-Cerberus — Mark Feldman",
  description:
    "The engineering record for Perimeter-Cerberus: 356 design contracts as the sole implementation authority, what blocks the second build, the open findings, and the release gates that are not met yet.",
};

const { derived, kickoff, v1Snapshot, implementationOrder } = roadmap;

const tallies = [
  { label: "Contracts", value: thousands(derived.totals.contracts) },
  { label: "Canonical records", value: thousands(derived.totals.records) },
  {
    label: "Kickoff items done",
    value: `${derived.kickoffDone} of ${derived.kickoffTotal}`,
  },
  { label: "Open findings", value: String(derived.openFindings) },
  {
    label: "Release gates met",
    value: `${derived.gatesMet} of ${derived.gates.length}`,
  },
];

function trackTreatment(track: Track): { color: string; label: string } {
  switch (track.state) {
    case "complete":
      return { color: "#0ca30c", label: "Complete" };
    case "frozen":
      return { color: "#898781", label: "Frozen" };
    default:
      return { color: "#2a78d6", label: "Starting" };
  }
}

function kickoffTreatment(item: KickoffItem): { color: string; label: string } {
  switch (item.state) {
    case "done":
      return {
        color: "#0ca30c",
        label: item.date ? `Done · ${item.date}` : "Done",
      };
    case "blocked":
      return {
        color: "#d03b3b",
        label: item.blockedBy ? `Blocked · ${item.blockedBy}` : "Blocked",
      };
    case "waiting":
      return {
        color: "#fab219",
        label: item.awaiting ? `Waiting · ${item.awaiting}` : "Waiting",
      };
    default:
      return { color: "#fab219", label: "Open" };
  }
}

function gateTreatment(gate: Gate): { color: string; label: string } {
  return gate.met
    ? { color: "#0ca30c", label: "Met" }
    : { color: "#898781", label: "Pending" };
}

/** A status colour is never the only reading — it always carries its word. */
function Status({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="inline-flex h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs font-medium" style={{ color }}>
        {label}
      </span>
    </span>
  );
}

function Scroller({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-x-auto">{children}</div>;
}

const th =
  "border-b border-zinc-300 px-3 py-2 text-left font-mono text-[11px] font-medium tracking-wide text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-500";
const td =
  "border-b border-zinc-200 px-3 py-3 align-top text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400";
const tdStrong = `${td} text-black dark:text-zinc-50`;

export default function PerimeterCerberus() {
  const openFindings = derived.findings.filter((f) => f.open);

  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-16 px-6 py-24 sm:px-8">
        <Reveal className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-zinc-500 transition-colors hover:text-[#2a78d6] dark:text-zinc-400 dark:hover:text-[#6fa8e8]"
          >
            ← Back
          </Link>
          <p className="font-mono text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Project roadmap
            <span className="text-zinc-400 dark:text-zinc-600"> · </span>
            measured {roadmap.updated}
          </p>
          <h1 className="bg-gradient-to-br from-[#2a78d6] via-black to-black bg-clip-text text-3xl font-semibold tracking-tighter text-transparent sm:text-4xl dark:from-[#3987e5] dark:via-white dark:to-white">
            {roadmap.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            An Android tower-defence game built against a frozen set of{" "}
            {derived.totals.contracts} design contracts. The contracts are the
            sole authority: no gameplay value, ID, pool member, reward or UI
            state may be chosen or inferred outside them. That constraint is the
            point — it is the closest thing I have to a controlled experiment in
            what agents do when they are not allowed to invent.
          </p>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            This page is generated. Every count on it is read from the file that
            owns it — the phase arc from the planned-phases record, the release
            gates from the P14 checklist, the findings from two defect
            registers, the totals from the contract set itself. It is a snapshot
            measured on {roadmap.updated}, not a live feed. The implementation
            repository is private, so what is published here is the engineering
            record rather than the game design.
          </p>
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {tallies.map((tally) => (
              <div
                key={tally.label}
                className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5"
              >
                <dt className="font-mono text-[11px] tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
                  {tally.label}
                </dt>
                <dd className="text-2xl font-semibold tracking-tight text-[#2a78d6] tabular-nums dark:text-[#6fa8e8]">
                  {tally.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Where things stand
            </h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Three things are in play at once, and they are at very different
              stages.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {roadmap.tracks.map((track) => {
              const treatment = trackTreatment(track);
              return (
                <div
                  key={track.id}
                  className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2a78d6]/10 dark:border-white/10 dark:bg-white/5"
                >
                  <Status color={treatment.color} label={treatment.label} />
                  <h3 className="font-medium text-black dark:text-zinc-50">
                    {track.name}
                  </h3>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {prose(track.line)}
                  </p>
                  <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-500">
                    {prose(track.detail)}
                  </p>
                </div>
              );
            })}
          </div>
          <RoutingDiagram />
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            The register underneath
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {derived.totals.contracts} contracts and{" "}
            {thousands(derived.totals.records)} canonical records, entered
            through a consolidated authority index that defines reading order
            and supersession rules. Underneath it sits a per-contract register:
            the scope each one declares, the rule IDs it defines, who cites it,
            and which amendment or defect touches it — plus a change ledger
            carrying the additions, revisions and removals that a snapshot of
            the current text would hide.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/perimeter-cerberus/roadmap/"
              className="rounded-full border border-[#2a78d6]/40 bg-[#2a78d6]/10 px-4 py-2 text-sm font-medium text-[#1c5cab] transition-colors hover:border-[#2a78d6] dark:text-[#86b6ef]"
            >
              Open the full roadmap →
            </Link>
            <Link
              href="/perimeter-cerberus/contract-overview/"
              className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-black transition-colors hover:border-[#2a78d6] dark:border-white/15 dark:bg-white/5 dark:text-zinc-50"
            >
              Explore all contracts →
            </Link>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            What stands in the way
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The kickoff items for the second build. Four are complete; the
            asset-package work is unblocked but unfinished, and the Design audit
            is waiting on a reachable project.
          </p>
          <Scroller>
            <table className="w-full min-w-[46rem] border-collapse">
              <thead>
                <tr>
                  <th className={`${th} w-10`}>#</th>
                  <th className={th}>Item</th>
                  <th className={th}>State</th>
                  <th className={th}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {kickoff.items.map((item) => {
                  const treatment = kickoffTreatment(item);
                  return (
                    <tr key={item.n}>
                      <td className={`${td} font-mono tabular-nums`}>
                        {item.n}
                      </td>
                      <td className={tdStrong}>{item.title}</td>
                      <td className={td}>
                        <Status
                          color={treatment.color}
                          label={treatment.label}
                        />
                      </td>
                      <td className={td}>{prose(item.note)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Scroller>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Open findings
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {openFindings.length} contract-level questions that have to be
            answered rather than implemented around. A defect is a place the set
            contradicts itself or cannot be executed as written; a how-gap is a
            place it states a requirement without authoring the mechanism.
            Closed entries stay in their registers as evidence and drop off this
            list on the next build, so nothing has to be remembered.
          </p>
          <Scroller>
            <table className="w-full min-w-[46rem] border-collapse">
              <thead>
                <tr>
                  <th className={`${th} w-24`}>ID</th>
                  <th className={th}>Finding</th>
                  <th className={`${th} w-24`}>Register</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {openFindings.map((finding) => (
                  <tr key={finding.id}>
                    <td
                      className={`${td} font-mono text-[#2a78d6] dark:text-[#6fa8e8]`}
                    >
                      {finding.id}
                    </td>
                    <td className={tdStrong}>{finding.title}</td>
                    <td className={`${td} font-mono text-xs`}>{finding.kind}</td>
                    <td className={td}>{prose(finding.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroller>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Release gates
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {prose(roadmap.gatesNote)}
          </p>
          <Scroller>
            <table className="w-full min-w-[40rem] border-collapse">
              <thead>
                <tr>
                  <th className={`${th} w-28`}>State</th>
                  <th className={th}>Gate</th>
                </tr>
              </thead>
              <tbody>
                {derived.gates.map((gate) => {
                  const treatment = gateTreatment(gate);
                  return (
                    <tr key={gate.statement}>
                      <td className={td}>
                        <Status
                          color={treatment.color}
                          label={treatment.label}
                        />
                      </td>
                      <td className={gate.met ? tdStrong : td}>
                        {gate.statement}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Scroller>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            v1 — authored against built
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The last full count on record, from {v1Snapshot.source},{" "}
            {v1Snapshot.date}. {prose(v1Snapshot.caveat)}
          </p>
          <Scroller>
            <table className="w-full min-w-[44rem] border-collapse">
              <thead>
                <tr>
                  <th className={th}>System</th>
                  <th className={`${th} w-44`}>Built / authored</th>
                  <th className={th}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {v1Snapshot.rows.map((row) => (
                  <tr key={row.system}>
                    <td className={tdStrong}>{row.system}</td>
                    <td className={td}>
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                          {row.built} / {row.authored}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-full max-w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
                        >
                          <span
                            className="block h-full rounded-full bg-[#2a78d6] dark:bg-[#3987e5]"
                            style={{
                              width: `${Math.round((row.built / row.authored) * 100)}%`,
                            }}
                          />
                        </span>
                      </span>
                    </td>
                    <td className={td}>{prose(row.note)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroller>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            v1&apos;s suite is 1,569 tests. On the most recent CI run all three
            platforms reported 1,555 passing and 14 failing. Every one of the 14
            looks for a generated content file that is not committed to the
            repository, so they fail identically on Linux, Windows and macOS — a
            fixture-provisioning gap rather than a logic regression. It is named
            here rather than rounded up.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Implementation order
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {prose(implementationOrder.basis)}
          </p>
          <Scroller>
            <table className="w-full min-w-[46rem] border-collapse">
              <thead>
                <tr>
                  <th className={`${th} w-16`}>Sprint</th>
                  <th className={th}>Goal</th>
                  <th className={`${th} w-20`}>Areas</th>
                  <th className={th}>Exit evidence</th>
                </tr>
              </thead>
              <tbody>
                {implementationOrder.sprints.map((sprint) => (
                  <tr key={sprint.n}>
                    <td className={`${td} font-mono tabular-nums`}>
                      {sprint.n}
                    </td>
                    <td className={tdStrong}>{sprint.goal}</td>
                    <td className={`${td} font-mono text-xs`}>{sprint.areas}</td>
                    <td className={td}>{prose(sprint.exit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroller>
          <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-500">
            {prose(implementationOrder.note)}
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            The whole arc
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            P00 through P14 author the design and hand it off; P15 onward build
            and ship it. The contract set is the output of the first half.
          </p>
          <Scroller>
            <table className="w-full min-w-[46rem] border-collapse">
              <thead>
                <tr>
                  <th className={th}>Phase</th>
                  <th className={th}>Purpose</th>
                  <th className={th}>Required outcome</th>
                </tr>
              </thead>
              <tbody>
                {derived.phases.map((phase) => (
                  <tr key={phase.id}>
                    <td className={tdStrong}>
                      <span className="font-mono text-xs text-[#2a78d6] dark:text-[#6fa8e8]">
                        {phase.id}
                      </span>{" "}
                      {phase.name}
                    </td>
                    <td className={td}>{phase.purpose}</td>
                    <td className={td}>{prose(phase.outcome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroller>
        </Reveal>

        <Reveal className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-500">
            Generated from the roadmap emitter in the Perimeter-Cerberus
            repository and committed here as a dated snapshot. Narrative and
            status are authored; every count is read from the file that owns it.
            Nothing on this page is authority — on any disagreement the contract
            wins.
          </p>
        </Reveal>
      </main>
    </div>
  );
}

/**
 * The one figure worth drawing: a gap found while building routes back into a
 * register and then an amendment to the contract set, never into a local fix.
 */
function RoutingDiagram() {
  const accent = "stroke-[#2a78d6] dark:stroke-[#3987e5]";
  const accentFill = "fill-[#2a78d6] dark:fill-[#3987e5]";
  const accentText = "fill-[#2a78d6] dark:fill-[#6fa8e8]";

  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="w-full overflow-x-auto rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <svg
          viewBox="0 0 700 250"
          role="img"
          aria-label="The contract set feeds both builds. v1 is frozen; v2 is building from the contracts. A gap found while building routes back into a register and then into an amendment to the contract set, never into a local fix."
          className="h-auto w-full min-w-[34rem] text-zinc-500 dark:text-zinc-400"
        >
          <defs>
            <marker
              id="pc-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <marker
              id="pc-arrow-accent"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className={accentFill} />
            </marker>
          </defs>

          <g fill="none" stroke="currentColor" strokeWidth="1.25">
            <rect
              x="10"
              y="86"
              width="150"
              height="72"
              rx="3"
              className={accent}
              strokeWidth="1.75"
            />
            <rect
              x="268"
              y="14"
              width="140"
              height="60"
              rx="3"
              strokeDasharray="4 3"
            />
            <rect x="268" y="170" width="140" height="60" rx="3" />
            <rect x="500" y="170" width="190" height="60" rx="3" />
          </g>

          <g
            stroke="currentColor"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#pc-arrow)"
          >
            <path d="M 160 110 L 210 110 L 210 44 L 262 44" />
            <path d="M 160 134 L 210 134 L 210 200 L 262 200" />
            <path d="M 408 200 L 494 200" />
          </g>

          <path
            d="M 595 170 L 595 122 L 166 122"
            className={accent}
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#pc-arrow-accent)"
          />

          <g className="font-mono" fontSize="12" fill="currentColor">
            <text x="85" y="116" textAnchor="middle" className={accentText}>
              contract set
            </text>
            <text x="338" y="40" textAnchor="middle">
              v1
            </text>
            <text x="338" y="196" textAnchor="middle">
              v2
            </text>
            <text x="595" y="196" textAnchor="middle">
              register entry
            </text>
          </g>

          <g
            className="font-sans"
            fontSize="11"
            fill="currentColor"
            opacity="0.75"
          >
            <text x="85" y="134" textAnchor="middle" className={accentText}>
              {derived.totals.contracts} contracts
            </text>
            <text x="338" y="58" textAnchor="middle">
              frozen
            </text>
            <text x="338" y="214" textAnchor="middle">
              building
            </text>
            <text x="595" y="214" textAnchor="middle">
              defect or how-gap
            </text>
            <text x="451" y="192" textAnchor="middle">
              gap found
            </text>
            <text x="380" y="116" textAnchor="middle" className={accentText}>
              amendment
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-500">
        v1 is drawn dashed because nothing flows out of it any more. The return
        path is the part that matters: a gap found while building becomes a
        register entry and then an amendment to the contract set, rather than a
        fix in the code that found it.
      </figcaption>
    </figure>
  );
}
