<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# markfeldman.work

Personal site for **Mark Feldman** (the "Director" in these notes), positioning him
for a role helping a team adopt agentic AI. He is actively job searching — this site
is a hiring artifact, not a hobby project.

## The one rule everything else follows from

**Evidence over assertion. Never fabricate, stage, or simulate data.**

The site's entire thesis is that it earns its claims. Every "live" or "real" element
is backed by an actual mechanism:

- The commit and CI panels hit GitHub's public REST/Actions APIs at page-view time.
- The CI pipeline (`.github/workflows/ci.yml`) is a real workflow with real runs.
- The Atlas section links to a real public repo of design docs.
- The case study describes a build a reader can inspect.

If a proposed feature has no honest data source, **re-scope it or drop it** — do not
approximate with plausible-looking numbers. This has already killed two ideas (below).
Vocabulary matters too: **"live"** is reserved for data fetched at page-view time from
a verifiable public source. Point-in-time captured data is **"real"** or **"measured"**,
never "live."

## Deploy architecture — the non-obvious parts

- Next.js App Router, TypeScript, Tailwind v4, **`output: "export"`** (fully static).
- Deployed as a **Cloudflare Worker serving static assets** — *not* classic Cloudflare
  Pages. Config is `wrangler.jsonc` with `assets.directory` pointing at `out`. The
  Cloudflare dashboard's build settings are the newer Workers/Wrangler flow: build
  command `npm run build`, deploy command `npx wrangler deploy`. There is no framework-
  preset or output-directory field to look for.
- **Every metadata route needs `export const dynamic = "force-static"`** under
  `output: "export"` — `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`. The OG image
  route *fails the build* without it. This is easy to forget when adding new ones.
- Push to `main` triggers a **real production deploy** via Cloudflare's git integration.
  There is no staging environment. Verify locally first.
- DNS is already on Cloudflare; the custom domain is attached to the Worker.

## Design system

- Monochrome base (black/white/zinc) with **one** accent reused everywhere:
  `#2a78d6` light, `#3987e5` dark (`#6fa8e8` for dark-mode text on dark surfaces).
- **Status colors are fixed and never reused for anything else:** `#0ca30c` passed,
  `#d03b3b` failed, `#fab219` cancelled, `#898781` queued/skipped. Always pair a status
  color with a **text label** — never convey state by hue alone.
- Cards use a glass treatment: `border-black/5 bg-white/60 backdrop-blur-md` /
  `dark:border-white/10 dark:bg-white/5`, with a hover lift and accent glow.
- Page background is a CSS dot-grid (`globals.css`), separate values per theme.
- `Reveal.tsx` wraps sections in an IntersectionObserver fade/slide. It honors
  `prefers-reduced-motion` — keep that.
- Dark mode is **`prefers-color-scheme` only** (Tailwind's default `dark:` variant).
  There is no theme toggle. Write every new utility light-first with an explicit
  `dark:` override.

## Content rules

- First person, plain sentences, concrete claims. **No emoji.** No marketing
  superlatives ("seamless", "cutting-edge", "revolutionary").
- **No email address published anywhere on the site** — LinkedIn is the only contact
  path. This is a deliberate, repeated instruction from the Director.
- Page order is intentional: **AI material leads**, résumé/background supports it
  underneath. An earlier revision buried the AI positioning under the résumé and had
  to be inverted — don't drift back.
- Résumé facts (employers, figures like `~$1M` / `14 / ~50` / `6 months`) come from
  the Director's actual résumé. **Do not invent, extrapolate, or round them.**
- Education is deliberately omitted. Location (`Herriman, UT · Remote`) is deliberately
  included for recruiter filtering.

## Decisions already made — don't relitigate

| Rejected | Why |
|---|---|
| Chatbot / embedded AI assistant | Demonstrates "can call an API," not agentic-systems skill. The build process is the better evidence. |
| Live "pending prompts / token usage" telemetry | No honest public data source exists. Would require fabricating or exposing private session data. |
| Token-caching benchmark (for now) | Shelved mid-build — see uncommitted work below. |

## Uncommitted work currently in the tree

`scripts/token-benchmark.mjs` plus `@anthropic-ai/sdk` in `package.json` /
`package-lock.json` are **intentionally uncommitted**. It's a real, reproducible
prompt-caching cost benchmark (Haiku 4.5, cached vs uncached, with a free
`count_tokens` pre-flight so it aborts before spending money if the context is too
short to cache). It was shelved before ever running.

Do not commit it casually, and do not delete it. If it's revived: **the Director runs
it in his own terminal with his own key** — see below.

## Working conventions

- **Verify before pushing:** `npm run lint && npm run build`, then look at it in a
  browser. A clean build does not prove correct rendering, dark mode, or that a live
  fetch actually succeeds.
- **Show content changes before publishing them.** Biographical and professional
  claims especially — the Director reviews copy before it goes live.
- **Credentials and account actions are the Director's, always.** `git push` prompts,
  `wrangler login`, Cloudflare dashboard clicks, GitHub repo settings — hand those
  back rather than trying to route around them.
- **Never ask him to paste a secret into the chat.** An API key was burned this way
  once: any key typed into the conversation is exposed regardless of whether the
  command succeeds. If a script needs a key, he sets it and runs the script himself
  in his own terminal, and you read the output file.
- Git commit author email should stay off public artifacts — commit metadata is public
  on GitHub, which would contradict the no-email-published rule.

## Related repo

`github.com/markfeldman/atlas-docs` — published design docs for Atlas, the multi-agent
governance system linked from the site. Its implementation lives in a separate private
repo (`C:\repo\atlas`) with its own `CLAUDE.md`.
