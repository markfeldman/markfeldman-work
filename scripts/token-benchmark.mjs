#!/usr/bin/env node
// Real, reproducible benchmark comparing Anthropic prompt caching against no
// caching, for the "How I think about token optimization" section of the
// site. Every number in data/token-benchmark.json comes from a real API
// response's `usage` object — nothing here is estimated or fabricated.
//
// Requires ANTHROPIC_API_KEY in the environment (the Anthropic SDK reads it
// automatically). Run manually: `node scripts/token-benchmark.mjs`.

import Anthropic from "@anthropic-ai/sdk";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const MODEL = "claude-haiku-4-5";

// Haiku 4.5 published per-token rates (USD). Cache write is priced at 1.25x
// the base input rate (5-minute TTL, the default); cache read at 0.1x.
const RATES = {
  input: 1 / 1_000_000,
  cacheWrite: 1.25 / 1_000_000,
  cacheRead: 0.1 / 1_000_000,
  output: 5 / 1_000_000,
};

// Real project documentation for markfeldman-work, written to be the kind of
// large, stable context a coding agent would realistically keep resident
// across many turns working on this repo — not filler text.
const STATIC_CONTEXT = `# markfeldman-work — project reference

This document describes the markfeldman-work repository: a personal portfolio
site for Mark Feldman, deployed at markfeldman.work. It exists so that an
agent working repeatedly on this repository has stable, reusable context
about the stack, conventions, and constraints without re-deriving them each
session.

## Purpose and audience

The site is a work sample, not a marketing page. Its explicit thesis is that
the site itself — the decisions made building it, the friction hit along the
way, and how that friction was resolved — is the actual evidence of skill
being presented to a hiring audience of engineering leaders and technical
recruiters. Every "live" or "real" claim on the site is backed by an actual
mechanism (a public API call, a real CI run, a real captured experiment).
Nothing on the site simulates liveness or fabricates data. This constraint is
non-negotiable and should override any temptation to make a section look more
impressive with placeholder or staged content.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS v4.
- Static export (\`output: "export"\` in next.config.ts) — the site ships as
  plain static HTML/CSS/JS, no server runtime.
- Deployed as a Cloudflare Worker serving static assets, configured via
  wrangler.jsonc with an \`assets.directory\` pointing at the Next.js export
  output. This is Cloudflare's current unified Workers-based static hosting
  flow, not the older classic Pages dashboard flow.
- DNS for markfeldman.work is on Cloudflare already, so the custom domain is
  attached via Domains & Routes on the Worker rather than external DNS
  configuration.
- Source lives at github.com/markfeldman/markfeldman-work, public repository.
- A GitHub Actions workflow (.github/workflows/ci.yml) runs \`npm run lint\`
  and \`npm run build\` on every push and pull request against main. Cloudflare's
  own git integration triggers a separate build-and-deploy on push to main;
  the two pipelines are independent of each other.

## Design system

- Base palette is monochrome (black/white/zinc), with a single accent color
  reused everywhere rather than an assorted palette: #2a78d6 in light mode,
  #3987e5 in dark mode. This blue is drawn from a validated categorical
  data-visualization palette (slot 1) and is reused consistently for links,
  gradients, hover glows, and any "in progress" status indicator.
- Status colors (used on the live CI panel) are drawn from a separate, fixed
  status palette, never reused for anything else: good/passed is #0ca30c,
  critical/failed is #d03b3b, warning/cancelled is #fab219. Status is always
  paired with a visible text label, never conveyed by color alone.
- Dark mode is implemented via the \`prefers-color-scheme\` media query
  (Tailwind's default \`dark:\` variant strategy) — there is no manual theme
  toggle on this site. Every new utility class added to a component must be
  written light-mode-first with an explicit \`dark:\` override, matching the
  pattern already established in the initial build.
- Cards use a translucent "glass" treatment: semi-transparent background,
  backdrop blur, a hairline border, and a subtle accent-colored glow on
  hover. A gentle scroll-reveal (fade plus slight upward slide, driven by a
  small IntersectionObserver-based component, no animation library) is
  applied to each major section on first scroll into view, with a
  \`prefers-reduced-motion\` escape hatch that disables it entirely.
- No emoji anywhere on the site. Copy is written in first person, plain
  sentences, no marketing superlatives.

## Content conventions

- The homepage covers: a hero framing the Director as an "Agentic Systems
  Engineer" moving from an engineering-management background; a "What I
  bring" skills grid; a "This site is the work sample" section pairing two
  live data panels (real recent GitHub commits, real CI run status) with a
  link through to a longer case-study page; a "Let's connect" section linking
  only to LinkedIn (no email address is published on the site by request).
- The case-study page ("How I built this") is a first-person narrative of
  the actual build session: the real tradeoffs discussed (host and framework
  choice), a real piece of friction (Cloudflare's dashboard having moved to a
  different build-configuration flow than assumed) and how it was resolved,
  and the explicit boundary that any step touching a live credential or a
  real domain stayed under direct human control rather than being automated
  past.
- Any new "live" or "interactive" feature added to the site must have a real,
  honest data source before it is built. If no honest data source exists for
  an idea (for example, exposing live internal agent/token telemetry, which
  has no public API), the idea should be re-scoped into something that does
  have one, or dropped, rather than approximated with fabricated numbers.

## Deployment and safety conventions

- The agent working on this repo never handles the Director's GitHub or
  Cloudflare credentials directly. Authentication steps (git push requiring a
  credential prompt, \`wrangler login\`, connecting a custom domain in the
  Cloudflare dashboard) are handed back to the Director to run in their own
  terminal or browser session.
- Real financial spend (for example, running a benchmark against the
  Anthropic API that costs real money, however small) requires an explicit,
  separate confirmation from the Director immediately before execution, with
  a stated cost estimate — it is not bundled into a general "go ahead with
  the plan" approval.
- Before any commit that changes the deployed site, the change is verified
  locally first: \`npm run lint\` and \`npm run build\` must both be clean, and
  the change should be visually checked in a browser (both color schemes
  where practical) before pushing, since pushing to main triggers a real
  production deployment via Cloudflare's git integration.

## Testing and verification expectations

There is no unit test suite for this site at present — verification is
build-time type/lint checking plus manual visual review. Any claim of a
completed UI change should be backed by an actual browser check, not just a
clean build, since a clean TypeScript/ESLint build does not guarantee correct
rendering, correct dark-mode behavior, or correct real-data wiring (for
example, a live panel that compiles fine but silently fails its fetch call).
When a live-data component is added or changed, the verification step must
include confirming the real fetch succeeds and displays real data, not just
that the loading/error states render.

## Component inventory

- \`src/app/page.tsx\` — the homepage. Sections in order: hero, "What I
  bring" skills grid, "This site is the work sample" (live panels plus a
  link to the case study), a token-optimization case study, "Let's connect".
- \`src/app/how-i-built-this/page.tsx\` — the case-study page, a single
  first-person narrative with no interactive components, styled consistently
  with the homepage but content-forward rather than card-forward.
- \`src/components/LiveRepoActivity.tsx\` — client component, fetches the
  last 5 commits for this repo from GitHub's public REST API on mount and
  every 60 seconds thereafter, renders author avatar, commit message, short
  SHA, and a relative timestamp. Handles a loading skeleton state and a
  network-failure fallback state that still links out to the real repo.
- \`src/components/LiveWorkflowStatus.tsx\` — client component, fetches the
  last 5 GitHub Actions runs for this repo from GitHub's public Actions API,
  renders each run's real status (queued, running, passed, failed,
  cancelled) using the fixed status-color palette with a paired text label,
  never color alone.
- \`src/components/Reveal.tsx\` — a small client component wrapping section
  content in an IntersectionObserver that toggles a \`data-visible\`
  attribute on first scroll-into-view, driving a CSS fade/slide transition
  defined in globals.css. No animation library dependency.
- \`src/components/TokenCachingBenchmark.tsx\` — reads the static, committed
  \`data/token-benchmark.json\` at build time (a normal import, not a runtime
  fetch) and renders a headline savings statistic plus a per-call comparison
  view. This is historical data from one real, dated experiment run, not a
  live or continuously-refreshed system — it should never be described as
  "live" in copy, only as "real" or "measured."

## Accessibility and browser support notes

- All interactive elements (links, buttons) must have a visible focus state
  and sufficient contrast in both color schemes; the accent blue is chosen
  specifically because it clears contrast checks against both the light and
  dark surface colors used on this site.
- Status and outcome information is always conveyed with both a color and a
  text label together — a colorblind reader or a screen reader user must be
  able to tell "passed" from "failed" without relying on hue alone.
- The scroll-reveal motion respects \`prefers-reduced-motion: reduce\” by
  disabling the transition and rendering content immediately visible; motion
  is a progressive enhancement, never a gate on content being visible at all.
- The site targets evergreen browsers (current Chrome, Firefox, Safari,
  Edge); no polyfills are added for older browsers, consistent with a
  personal portfolio site rather than a product with a broad support matrix.

## Voice and tone guidelines for any new copy

- First person, direct, concrete. Prefer specific verifiable claims ("the CI
  run took about ninety seconds and passed") over vague superlatives ("this
  site showcases cutting-edge engineering excellence").
- No emoji, no exclamation points used for emphasis, no marketing language
  like "revolutionary," "seamless," or "cutting-edge."
- When describing a decision, state the actual tradeoff considered and why
  the chosen option won — not just the conclusion. This mirrors the site's
  own thesis that process, not just outcome, is the evidence being shown.
- Any new section added to the site should be able to answer, honestly, "is
  every specific claim in this copy something that is actually true and
  verifiable," before it ships.

## Decisions carried forward from the original build session

- The site deliberately does not embed a chatbot or AI-assistant widget. The
  reasoning: a wrapped chat interface demonstrates the ability to call an
  API, not the ability to do agentic-systems engineering — the real evidence
  is the build process itself, so features should extend that story (real
  data, real process, real experiments) rather than add a conversational
  gimmick layered on top.
- A "live pending prompts / token usage" concept was considered and
  explicitly rejected earlier in the project's history, because no honest
  public data source exists for a site visitor to see actual internal agent
  telemetry — building it would have meant either fabricating numbers or
  exposing genuinely private session data, and neither was acceptable. The
  token-optimization benchmark exists specifically as the honest replacement
  for that idea: a real, reproducible, once-run experiment with committed
  raw data, rather than a fake "live" feed.
- Featuring the Director's separate multi-agent governance project by name
  on this site was deliberately deferred pending a later decision, and
  should not be referenced by name in any copy on markfeldman-work unless
  that decision changes.

## Roadmap for future iterations

The site is being built iteratively rather than shipped once in a finished
state, so the following are known candidate next steps rather than
commitments. Each should be evaluated against the same honesty constraint as
everything already shipped: no feature should be added that requires
fabricating data or simulating liveness that does not exist.

- A featured-projects/case-study section once a concrete project is chosen
  to showcase in detail — deferred rather than filled with a placeholder.
- Possible expansion of the live GitHub panels to show real deployment
  history (Cloudflare's own deployment API, if a stable and honestly
  presentable way to surface it is found) alongside commits and CI runs.
- Possible addition of a lightweight analytics or uptime indicator, again
  only if backed by a genuinely real, publicly-verifiable data source rather
  than a synthetic number.
- Revisiting whether a resume/experience-timeline section adds value versus
  cluttering a deliberately short, focused page — leaning toward keeping the
  page short unless a hiring-manager audience specifically asks for more.
- Continuing to prefer real, once-run, committed experiments (like the token
  caching benchmark) over live, continuously-polled systems wherever both
  would demonstrate the same underlying point — the former is cheaper,
  simpler, and just as honest as long as it is clearly labeled as a
  point-in-time measurement rather than something ongoing.

## Glossary of terms used across this project's own documentation

- **Director** — the human owner and decision-maker for this project and its
  sibling projects; the one who reviews and approves before anything real
  goes live (a domain connection, a real spend, a merge to main).
- **Live** — reserved for data fetched at page-view time from a real,
  independently-verifiable public source (GitHub's REST API, GitHub's
  Actions API). Never used to describe static or historical data, even if
  that data was real when captured.
- **Real** or **measured** — used for data that was genuinely captured from
  an actual system at a specific point in time, and is now committed as a
  static record rather than being re-fetched live.
- **Glass card** — the site's translucent, blurred-background card treatment
  used for the live panels and skill tiles; a purely visual convention, not
  a technical or architectural term.
- **Emphasis form** — a data-visualization convention where one series
  carries the story's point and is shown in the accent color while the
  contrasting series is shown in a de-emphasized neutral gray, used for the
  token-caching cost comparison since "caching reduces cost" is a single
  claim being illustrated, not two equally-weighted independent series.
`;

const QUESTIONS = [
  "What hosting platform does this project deploy to, and why was it chosen over the alternatives?",
  "What's the accent color strategy across light and dark mode, and where does the color come from?",
  "How does this project avoid staged or fabricated data on 'live' sections of the site?",
  "Walk through what happens between a git push and the change being live in production.",
  "What must be true before a UI change is considered verified and ready to push?",
];

const client = new Anthropic();

function costForUsage(usage) {
  const input = (usage.input_tokens ?? 0) * RATES.input;
  const cacheWrite = (usage.cache_creation_input_tokens ?? 0) * RATES.cacheWrite;
  const cacheRead = (usage.cache_read_input_tokens ?? 0) * RATES.cacheRead;
  const output = (usage.output_tokens ?? 0) * RATES.output;
  return {
    input_usd: input,
    cache_write_usd: cacheWrite,
    cache_read_usd: cacheRead,
    output_usd: output,
    total_usd: input + cacheWrite + cacheRead + output,
  };
}

async function runUncached(question) {
  return client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system: STATIC_CONTEXT,
    messages: [{ role: "user", content: question }],
  });
}

async function runCached(question) {
  return client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system: [
      {
        type: "text",
        text: STATIC_CONTEXT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: question }],
  });
}

// Haiku 4.5's prompt-caching minimum is 4096 tokens. count_tokens is free —
// verify the real token count clears that with margin before spending any
// money on the paid benchmark calls below. A context that's too short would
// silently produce zero cache reads and an honest-looking but meaningless
// "no savings" result.
async function verifyCacheable() {
  const count = await client.messages.countTokens({
    model: MODEL,
    system: STATIC_CONTEXT,
    messages: [{ role: "user", content: "placeholder" }],
  });
  const MARGIN_TARGET = 4300; // 4096 minimum + safety margin
  console.log(`Real token count for static context: ${count.input_tokens} tokens`);
  if (count.input_tokens < MARGIN_TARGET) {
    throw new Error(
      `Static context is only ${count.input_tokens} tokens — below the ${MARGIN_TARGET}-token safety margin for Haiku 4.5's 4096-token cache minimum. Expand STATIC_CONTEXT before running the paid benchmark.`,
    );
  }
  return count.input_tokens;
}

async function main() {
  const records = [];

  console.log(`Model: ${MODEL}`);
  console.log(`Static context: ${STATIC_CONTEXT.length} characters`);
  const realTokenCount = await verifyCacheable();
  console.log("");

  console.log("Condition: uncached (5 sequential calls, full context every call)");
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const response = await runUncached(question);
    const cost = costForUsage(response.usage);
    records.push({ condition: "uncached", index: i, question, usage: response.usage, cost });
    console.log(
      `  [${i + 1}/5] input=${response.usage.input_tokens} output=${response.usage.output_tokens} cost=$${cost.total_usd.toFixed(6)}`,
    );
  }

  console.log("\nCondition: cached (5 sequential calls, ephemeral prompt cache)");
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const response = await runCached(question);
    const cost = costForUsage(response.usage);
    records.push({ condition: "cached", index: i, question, usage: response.usage, cost });
    console.log(
      `  [${i + 1}/5] input=${response.usage.input_tokens} cache_write=${response.usage.cache_creation_input_tokens} cache_read=${response.usage.cache_read_input_tokens} output=${response.usage.output_tokens} cost=$${cost.total_usd.toFixed(6)}`,
    );
  }

  const uncachedTotal = records
    .filter((r) => r.condition === "uncached")
    .reduce((sum, r) => sum + r.cost.total_usd, 0);
  const cachedTotal = records
    .filter((r) => r.condition === "cached")
    .reduce((sum, r) => sum + r.cost.total_usd, 0);
  const savingsUsd = uncachedTotal - cachedTotal;
  const savingsPct = (savingsUsd / uncachedTotal) * 100;

  const output = {
    generated_at: new Date().toISOString(),
    model: MODEL,
    methodology:
      "5 sequential calls reusing a static ~3-4K token context with no prompt caching, compared against 5 sequential calls reusing the same context with Anthropic ephemeral prompt caching (cache_control: {type: 'ephemeral'} on the system block). Every usage/cost figure is read directly from the real API response's `usage` object, not estimated.",
    rates_per_token_usd: RATES,
    static_context_char_length: STATIC_CONTEXT.length,
    static_context_token_count: realTokenCount,
    records,
    aggregate: {
      uncached_total_cost_usd: uncachedTotal,
      cached_total_cost_usd: cachedTotal,
      savings_usd: savingsUsd,
      savings_pct: savingsPct,
    },
  };

  const outPath = fileURLToPath(new URL("../data/token-benchmark.json", import.meta.url));
  await writeFile(outPath, JSON.stringify(output, null, 2));

  console.log(
    `\nDone. Uncached total: $${uncachedTotal.toFixed(6)}  Cached total: $${cachedTotal.toFixed(6)}  Savings: ${savingsPct.toFixed(1)}%`,
  );
  console.log(`Written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
