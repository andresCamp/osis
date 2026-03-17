# Osis

Build products people love, faster with product management that lives in your codebase.

Osis is an open protocol and AI skill that brings structured product thinking to any project. Install it, talk to it, get specs that tell you exactly what to build next.

## Install

```bash
npx skills add andresCamp/osis
```

Then say "osis" in any Claude Code conversation.

## What You Get

**Digital Twin** — A living, product-level description of your entire codebase. What systems exist, what they do, how they connect. The first thing any agent reads before touching your code.

**Structured Specs** — Vision, product spec, phases, system specs. A layered hierarchy where each level constrains the one below it. Discoveries flow back up.

**Conversational Interface** — You don't fill out templates. You have conversations. The agent asks questions, challenges assumptions, and writes specs when you're aligned.

## How It Works

```
Install → Talk → Specs → Build → Maintain
                   ↑                  |
                   +-- discoveries ---+
```

1. **Install** — `npx skills add andresCamp/osis`. No config, no accounts.
2. **Bootstrap** — The agent scans your codebase and produces a digital twin and assessment.
3. **Conversation** — Bring signals (ideas, feedback, discoveries). The agent drives toward first principles.
4. **Specs** — When aligned, the agent writes structured specs. One doc at a time.
5. **Build** — Build against specs. The delta between twin and protocol is the work.
6. **Maintain** — Twin updates to reflect what's built. Drift scans keep specs honest.

## Repo Structure

```
apps/
  landing/             Landing page (Next.js, deployed on Vercel)
osis/                  Product documentation (protocol + twin)
skills/
  osis/                The Osis skill
packages/              Shared configs and UI
```

## Development

```bash
pnpm install
pnpm dev
pnpm build
```

## License

[MIT](LICENSE)
