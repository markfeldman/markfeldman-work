import raw from "../../data/cerberus-roadmap.json";

/**
 * Typed view over the roadmap snapshot emitted by `tools/emit-roadmap.py --json`
 * in the Perimeter-Cerberus v2 repo. Regenerate rather than hand-editing the JSON.
 *
 * `links.contractOverview` in the source data points at a private artifact, so it
 * is deliberately absent from this type — nothing on a public page may link to it.
 */

export type TrackState = "complete" | "frozen" | "starting";

export type Track = {
  id: string;
  name: string;
  state: TrackState;
  line: string;
  detail: string;
};

export type KickoffState = "done" | "blocked" | "open";

export type KickoffItem = {
  n: number;
  title: string;
  state: KickoffState;
  note: string;
  date?: string;
  blockedBy?: string;
};

export type Finding = {
  id: string;
  title: string;
  kind: string;
  source: string;
  status: string;
  open: boolean;
};

export type Gate = { statement: string; met: boolean };

export type Phase = {
  id: string;
  name: string;
  purpose: string;
  outcome: string;
};

export type OrderSprint = {
  n: number;
  goal: string;
  areas: string;
  exit: string;
};

export type V1Row = {
  system: string;
  authored: number;
  built: number;
  note: string;
};

export type Roadmap = {
  title: string;
  subtitle: string;
  updated: string;
  tracks: Track[];
  kickoff: { source: string; items: KickoffItem[] };
  v1Snapshot: {
    source: string;
    date: string;
    caveat: string;
    rows: V1Row[];
  };
  implementationOrder: {
    source: string;
    basis: string;
    sprints: OrderSprint[];
    note: string;
  };
  gatesNote: string;
  derived: {
    totals: { contracts: number; records: number };
    phases: Phase[];
    gates: Gate[];
    gatesMet: number;
    sprints: { n: number; title: string }[];
    findings: Finding[];
    openFindings: number;
    kickoffDone: number;
    kickoffTotal: number;
  };
};

export const roadmap = raw as unknown as Roadmap;

/**
 * The roadmap's authored prose writes an em-dash as " -- ". Normalise it for
 * display only — the data file stays exactly as the emitter wrote it. The rule
 * is deliberately narrow: a hyphen pair with a space on both sides never occurs
 * inside a CLI flag, a rule ID, or a path.
 */
export function prose(text: string): string {
  return text.replace(/ -- /g, " — ");
}

/**
 * Group thousands with a comma, deterministically.
 *
 * `Number.prototype.toLocaleString()` cannot be used here: it formats with the
 * build machine's locale during static export and with the visitor's locale in
 * the browser. A visitor whose locale groups differently ("2.078") gets markup
 * that disagrees with the server's ("2,078"), and the hydration mismatch can
 * take the client bundle down with it — which on this site means every Reveal
 * stays at opacity 0 and the page renders blank.
 */
export function thousands(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
