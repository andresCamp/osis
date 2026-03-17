# Osis — Product Spec

Last updated: 2026-03-16

> See [vision.md](vision.md) for the "why." This is the "what" and "when."

---

## 1. What We're Building

Osis is product management as an open protocol that lives in your codebase, maintained through conversation with a your cli agent of choice. You install it like a dependency. You talk to it like a cofounder. It produces structured specs that tell you and your agents exactly what to build next.

There is no dashboard. No SaaS. No configuration. The product is a folder of markdown files and a skill that knows how to maintain them.

### The Analogy

"Think of what shadcn does for UI components, but for product management. You install it into your codebase, you own the files, and instead of copy-pasting components, you have conversations that produce structured specs."

**The test:** A builder installs Osis, has a 30-minute conversation, and walks away with a vision spec, product spec, and clear next steps — without reading any documentation or watching any tutorials.

**The constraint:** Solo founder. No revenue. Open-source distribution. The only resource is attention, and the only leverage is the protocol being genuinely useful.

---

## 2. Core Concepts

**Protocol** — The structured spec hierarchy that lives in `osis/`. Vision flows down to product spec, product spec flows down to phases, phases flow down to system specs. Each level constrains the one below it. Discoveries flow back up.

**Digital Twin** — The `twin.md` file. A mechanical, present-tense compression of the entire codebase into product-level natural language. What systems exist, what they do, how they connect. The first thing any agent reads before touching the code.

**Skill** — The agent interface. Distributed via skills.sh, installed with `npx skills add`. The skill is what makes the protocol conversational instead of just another set of templates. It carries the product expertise, the conversational patterns, and the protocol mechanics.

**Signal** — Any input that might inform a product decision. A user interview transcript, a shower thought, a broken test, a competitor launch. Signals arrive in any shape. The agent's job is to extract insight, route it to the right spec, and maintain coherence.

**Drift** — When the codebase and the specs diverge. Code gets ahead of specs, or specs describe features that were never built, or built differently. Drift is natural. Undetected drift is the problem. The maintenance loop exists to catch it.

**Canon** — The durable layer of the protocol. Vision spec and product spec are canon — they change rarely and only through deliberate conversation. Everything below them (phases, system specs) rotates as the product evolves.

---

## 3. The Pipeline

How a builder goes from zero to spec-driven building.

### 3.1 Install

```
npx skills add [owner/osis]
```

The skill lands in the codebase. No configuration. No accounts. The files are yours.

### 3.2 Bootstrap

The agent scans the codebase and produces three things automatically:

1. **Digital twin** — a mechanical description of what exists today
2. **Seeded specs** — vision and product spec with observation notes, not drafts
3. **Assessment** — a product-level master diagram, key observations, one recommendation

The bootstrap ends with a question: "Want to start there?" The conversation begins.

### 3.3 Conversation

The user brings signals. The agent asks questions, challenges assumptions, surfaces tensions, and drives toward first principles. This is where the value lives — not in the documents, but in the thinking the conversation forces.

The agent does not write until both sides are aligned. "I think we're aligned. The changes are: [list]. Ready to write?"

### 3.4 Specs

When alignment is reached, the agent writes structured specs. Vision first, then product spec, then phases, then system specs. One document at a time. Each conversation produces a single, clear artifact.

Specs flow downward as constraints. A system spec cannot contradict the product spec. A feature cannot contradict its system spec. The hierarchy is the enforcement mechanism.

### 3.5 Build

The builder (human or AI agent) executes against specs. The twin says "here's what we have." The protocol says "here's where we're going." The delta is the work.

During building, discoveries happen — things that were harder than expected, user behavior that surprised you, technical constraints that change the plan. These discoveries are signals. They feed back into conversations.

### 3.6 Maintain

The twin updates to reflect what was built. Drift scans compare specs to code. The builder is informed of divergences. Specs update to reflect reality. The loop closes.

```
Install → Bootstrap → Conversation → Specs → Build → Maintain
                          ↑                       |
                          +--- discoveries --------+
```

---

## 4. The Data Model (Conceptual)

Everything is files. There is no database. The data model is the directory structure.

```
osis/
  osis.json              ← machine state (product name, version, active phase, timestamps)
  twin.md                ← what the product IS (regenerated, not hand-edited)
  {version}/             ← what the product is BECOMING
    vision.md            ← canon — why this exists
    product-spec.md      ← canon — what we're building and when
    changelog.md         ← chronological record of decisions
    phase-{N}-{slug}/    ← rotating — the current unit of work
      game-plan.md
      {system}--product-spec.md
      {system}--design-spec.md
      {system}--implementation-spec.md
      signals/           ← raw inputs that informed decisions
    archive/             ← completed phases
```

**What grows:** Phases accumulate and archive. Signals accumulate within phases. The changelog grows monotonically. The twin gets rewritten (not appended) on each update.

**What's static:** The directory structure. The spec hierarchy. The protocol itself.

**What's owned by the user:** Everything. These are markdown files in a git repo. Fork them, edit them, delete them. No vendor lock-in. No sync to worry about.

---

## 5. The Actors

| Actor | Role | Faces User? | The Job |
|-------|------|-------------|---------|
| Builder | The human. Solo founder, small team, student, anyone building. | Yes — they are the user | Bring signals, make decisions, build the product |
| Agent | The Osis skill running inside Claude Code, Codex, or any compatible host | Yes — conversational interface | Product authority. Asks questions, challenges, writes specs, maintains protocol |
| Codebase | The source code | No | Source of truth for what IS. The twin is derived from it |
| Protocol | The osis/ folder | No | Source of truth for what's BECOMING. Specs constrain what gets built |

### What Flows Between Them

```
Builder ──signals──→ Agent ──specs──→ Protocol
                                         |
                                    constraints
                                         |
                                         v
Builder ←──discovers── Codebase ←──builds── Builder (guided by specs)
                          |
                          v
                  Agent ──twin──→ Protocol (twin.md)
```

The builder talks to the agent. The agent writes specs. Specs constrain what gets built. Building produces discoveries. Discoveries become new signals. The agent updates the twin from the codebase. The loop is closed.

---

## 6. The Product Loop

### Primary: The Build Loop

```
Builder has idea/feedback/discovery
  → Talks to Osis
  → Agent asks questions, challenges, clarifies
  → Alignment reached
  → Agent writes/updates specs
  → Builder builds against specs
  → Discoveries during build
  → Talks to Osis again
```

This is the heartbeat. Every cycle produces clearer specs and better code. The conversation is not overhead — it is the mechanism that converts fuzzy thinking into buildable clarity.

### Secondary: The Maintenance Loop

```
Cron triggers (or builder runs /twin)
  → Agent scans codebase
  → Twin regenerates
  → Drift detected between specs and reality
  → Builder informed
  → Conversation about what to update
  → Specs adjust to reflect truth
```

This loop runs on a slower cadence. Its job is to prevent the protocol from going stale. The twin is the anchor — it always reflects the code, and when it diverges from the specs, someone needs to decide which side is right.

### The Crossover

Discoveries during building feed the build loop. Drift detection during maintenance feeds the build loop. The maintenance loop keeps the system honest. The build loop keeps the system moving. They reinforce each other.

When the product is actively under construction, the build loop dominates. When the product is stable, the maintenance loop dominates. A healthy product alternates between the two.

---

## 7. Screens

Osis is a CLI product. There is no GUI application. The "screens" are surfaces where the product is experienced.

| Surface | Stage | Key Elements |
|---------|-------|--------------|
| Landing page (osis.dev) | Acquisition | Scroll-driven hero, manifesto copy, "Sign Up for Early Access" CTA, waitlist modal |
| Terminal (Claude Code / Codex) | Core product | Conversational interface. The agent IS the product experience |
| osis/ folder | Artifact | Human-readable and agent-readable specs. The thing you actually produce and use |
| Docs | Reference | Protocol reference, spec templates, getting started. On landing page or standalone |

The terminal is the primary interface. Everything else exists to get people into the terminal or to make the artifacts produced there useful.

---

## 8. Editorial / Design Philosophy

**Conversation over configuration.** The agent IS the interface. There are no forms to fill out, no settings to configure, no workflows to set up. You talk. That's it.

**Files over SaaS.** You own everything. It lives in your repo. It's versioned by git. It works offline. It survives if Osis disappears tomorrow. No platform dependency.

**Clarity over completeness.** A short spec that's accurate beats a long one that's stale. The protocol is lean by design. If a spec isn't being used to make decisions, it shouldn't exist.

**Challenge over compliance.** The agent pushes back. It asks hard questions. It surfaces contradictions. It does not generate documents on demand like a template filler. The friction is the feature — it forces the thinking that produces good products.

**Product altitude.** Always think at the product level, not the code level. The twin describes systems, not files. Specs describe behavior, not implementation. Conversations are about what users experience, not what functions to call.

---

## 9. Roadmap

### Phase 1 — Ship (Target: Q1 2026)

> See [phase-1-ship/game-plan.md](phase-1-ship/game-plan.md) for the full game plan and [phase-1-ship/implementation-spec.md](phase-1-ship/implementation-spec.md) for the implementation spec.

**Goal:** Get Osis into the hands of real builders and validate the core loop.

| Component | Tier | Notes |
|-----------|------|-------|
| Skill finalized and published to skills.sh | T1 | Distribution via `npx skills add` |
| Landing page updated: hero + benefits + how it works + docs | T1 | On top of existing scroll experience |
| Protocol complete: twin, vision, product spec, phases, system specs | T1 | The spec hierarchy is defined and tested on Osis itself |
| Bootstrap flow polished | T1 | First experience matters most — install, scan, twin, assessment, first conversation |
| Automated maintenance documented | T2 | `/loop` for Claude Code, cron for Codex — requires user config |
| Docs section on landing page or standalone | T2 | Protocol reference for users |

**Does not ship:** Full lifecycle specs (GTM, growth, PMF), cloud-native cron (auto-config), multi-repo support.

**Success looks like:** 10+ builders using Osis on real projects, completing the full install, talk, specs, build loop. Qualitative signal that the conversation changes how they build.

### Phase 2 — Full Lifecycle (Target: Q2-Q3 2026)

**Goal:** Expand the protocol from build-phase-only to the full product lifecycle: idea through build through GTM through PMF.

| Component | Tier | Notes |
|-----------|------|-------|
| New spec types: GTM spec, growth spec, PMF tracker | T1 | Expand protocol coverage beyond the build phase |
| Protocol guides from 0 to 1,000,000 | T1 | The system guides you from "I have an idea" to tracking product-market fit |
| Adaptive protocol tiers | T1 | Protocol scales to project ambition — light (twin + vision + product spec), standard (full hierarchy), full (lifecycle through PMF). Agent infers the right tier at bootstrap, user can upgrade as the project grows |
| Automated maintenance improvements | T2 | Move toward zero-config — less manual setup, smarter triggers |

**Does not ship:** Team collaboration features, multi-product management, web interface.

**Success looks like:** A builder can go from "I have an idea" to tracking PMF using only Osis. The protocol covers the full journey, not just the building part.

### Phase 3 — Ecosystem

**Goal:** Osis becomes the standard for product management in codebases.

This is the long horizon from the vision: installing Osis becomes as natural as `git init`. Open source projects ship with an `osis/` folder. Agents expect structured specs. Product discipline stops being a competitive advantage and becomes a baseline.

No fixed timeline. This phase is earned by Phase 1 and Phase 2 working.

---

*Osis — 2026-03-16*
