# Phase 1 — Implementation Spec

## Status

| Phase | Status | Notes |
|-------|--------|-------|
| 1. Skill publishing | Not started | Unblocks everything — do first |
| 2. Bootstrap polish | Not started | Test on fresh projects after skill is publishable |
| 3. Landing page update | Not started | Hero, benefits, how-it-works, docs sections |
| 4. Protocol validation | In progress | Being dogfooded on Osis itself right now |
| 5. Maintenance documentation | Not started | Document /loop and cron — no code to write |

---

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Distribution channel | skills.sh via `npx skills add` | Aligns with shadcn model — files you own, no SaaS dependency |
| Landing page approach | Add sections below existing scroll hero | Preserve the visual impact of the scroll experience, extend with content |
| Docs location | On the landing page (Phase 1), standalone later if needed | One page to maintain, no routing complexity, sufficient for early traffic |
| Maintenance approach | Documentation only, no new tooling | `/loop` and cron already exist — users just need setup instructions |
| Protocol scope | Build phase only | Full lifecycle (GTM, growth, PMF) deferred to Phase 2 |

---

## Build Phases

Ordered by dependency. Each phase is independently testable.

### Phase 1: Skill Publishing

**Scope:** Get the skill from its current state (local directory + repo copy) to a published, installable package on skills.sh.

**Validates:** Can a stranger install Osis with one command and have it work?

**Current state:**
- Skill lives in two places: `/Users/andrescampos/.claude/skills/osis/` (local) and `skill/osis/` (repo)
- SKILL.md is complete — persona, modes, conversational patterns, behavioral rules, file structure
- References exist: `protocol.md`, `templates.md`, `drift-scan.md`
- Init script exists: `scripts/init.sh`
- No skills.sh-specific packaging or metadata beyond the SKILL.md frontmatter

**Work:**

1. **Research skills.sh publishing requirements.** What directory structure does skills.sh expect? What metadata? Is the current SKILL.md frontmatter sufficient? Does the references/ directory get bundled?

2. **Reconcile the two skill copies.** The repo copy (`skill/osis/`) and the local copy (`.claude/skills/osis/`) should be the same. Decide which is the source of truth. The repo copy should be publishable; the local copy is for dogfooding.

3. **Package the skill for publishing.** Adjust directory structure, metadata, or naming to meet skills.sh requirements. The skill should include:
   - `SKILL.md` — the full skill definition
   - `references/protocol.md` — protocol reference
   - `references/templates.md` — all spec templates
   - `references/drift-scan.md` — automated scan prompt
   - `scripts/init.sh` — scaffolding script

4. **Test the install.** On a fresh project (not the Osis repo), run `npx skills add [owner/osis]`. Verify:
   - Skill files land in the expected location
   - Running `osis` triggers the bootstrap flow
   - Bootstrap produces twin.md, seeds vision.md and product-spec.md, creates osis.json
   - The assessment is coherent and product-level

5. **Publish.** Push to skills.sh. Confirm the listing is live and the install command works.

**Depends on:** Nothing. Do this first.

---

### Phase 2: Bootstrap Polish

**Scope:** Ensure the first-run experience is clean and impressive on projects the author has never seen.

**Validates:** Does the bootstrap produce useful output on diverse codebases? Does the conversation feel like talking to a product expert, not a template filler?

**Work:**

1. **Test bootstrap on 3-5 diverse projects.** Pick projects with different stacks, sizes, and maturity levels:
   - A fresh Next.js project (minimal codebase)
   - A mature open-source project (large codebase, many systems)
   - A Python/Django or Rails project (non-JS stack)
   - A mobile app project (React Native or Swift)
   - A project with existing documentation (README, wiki, etc.)

2. **Evaluate each bootstrap output against these criteria:**
   - Does the twin accurately describe the product's systems? (Not files, not code — systems)
   - Does the master diagram make sense to someone who hasn't seen the code?
   - Are the seeded spec notes useful starting points for conversation?
   - Does the assessment end with a question that drives toward real product thinking?
   - Does the whole thing complete in a reasonable time (under 3 minutes)?

3. **Fix issues found during testing.** Common problems to watch for:
   - Twin is too code-level (listing files instead of describing systems)
   - Assessment is generic (could apply to any project)
   - Bootstrap chokes on large codebases (needs scoping guidance in the skill)
   - Init script fails on non-standard directory structures

4. **Polish the welcome message.** The first thing users see should communicate value immediately:
   - Welcome message is clear and confident
   - The "you just installed a world-class product team" line lands (or replace it if it doesn't)
   - The transition from setup to scan to assessment feels smooth

**Depends on:** Phase 1 (skill must be installable to test properly)

---

### Phase 3: Landing Page Update

**Scope:** Transform the landing page from a waitlist funnel into a product site that explains what Osis is and how to get started.

**Validates:** Can someone land on osis.dev and understand the product without any prior context?

**Current state:**
- Next.js 15 with App Router, deployed on Vercel
- Full-screen stacked scroll hero with 4 manifesto-style screens
- Nav bar with brand and "Sign Up for Early Access" CTA
- Intercepting route for waitlist modal (dialog on desktop, sheet on mobile)
- Waitlist system with Resend email + PostHog analytics
- Component library: shadcn patterns, Radix primitives, custom sheet-modal

**Architecture — no changes needed:**
```
apps/osis-landing-v2/
├── app/
│   ├── page.tsx              ← Add new sections here (below StackedScreens)
│   ├── layout.tsx            ← No changes
│   ├── @waitlist/            ← Keep as-is
│   └── api/waitlist/         ← Keep as-is
├── components/
│   ├── stacked-screens.client.tsx  ← Keep as-is
│   ├── nav-bar.tsx                 ← Update CTA text when ready
│   ├── hero-section.tsx            ← NEW: value prop section
│   ├── benefits-section.tsx        ← NEW: why builders should care
│   ├── how-it-works-section.tsx    ← NEW: the pipeline
│   └── docs-section.tsx            ← NEW (T2): protocol reference
```

**Work:**

1. **Hero section** (below the scroll experience). One screen. Clear value prop.
   - Headline: What Osis is in one sentence
   - Subhead: The analogy — "Think of what shadcn does for UI components, but for product management"
   - CTA: Install command (`npx skills add [owner/osis]`) with copy button
   - Keep it minimal. Black background, white text, consistent with the scroll aesthetic.

2. **Benefits section.** 3-4 concrete benefits with short descriptions.
   - Product clarity from day one (no more vibe coding)
   - Specs your agents can actually use (context layer for AI)
   - You own everything (files in your repo, no SaaS)
   - Zero learning curve (install and talk — that's it)

3. **How it works section.** The four-step pipeline visualized.
   - Install: `npx skills add` — one command
   - Talk: Bring signals, have a conversation — the agent asks hard questions
   - Specs: Structured specs that flow down as constraints
   - Build: Human or AI builds against specs — discoveries feed back in
   - Could be a horizontal stepper, vertical timeline, or simple cards. Match the site's aesthetic.

4. **Docs section (T2).** Protocol reference for users who want to understand the system.
   - Getting started (install, bootstrap, first conversation)
   - Protocol overview (twin, specs, the hierarchy)
   - Spec templates (what each doc type is for)
   - Maintenance setup (/loop, cron)
   - This could be an accordion on the page, tabs, or a link to a /docs route.

5. **CTA update.** When the skill is published:
   - Change "Sign Up for Early Access" to "Get Started" or "Install Now"
   - Keep the waitlist modal as a secondary CTA or remove if no longer needed
   - Add the `npx skills add` command prominently

6. **Footer.** Simple footer with links to GitHub repo, docs section, and contact.

**Depends on:** Phase 1 (need the published skill for the install command in the CTA). Can start design/copy work in parallel.

---

### Phase 4: Protocol Validation

**Scope:** Confirm the protocol is complete and coherent enough for external use by verifying it works on Osis itself.

**Validates:** Can the full spec hierarchy be produced and maintained through conversation? Do specs at each level actually constrain the level below?

**Current state:**
- osis.json: populated with product name, version, last twin update
- twin.md: complete — systems, architecture, routes, dependencies
- v1/vision.md: complete — full manifesto
- v1/product-spec.md: complete — pipeline, data model, actors, loops, roadmap
- v1/changelog.md: exists with initial entries
- v1/phase-1-ship/: being created right now (this document)
- No system specs yet — Phase 1 systems don't need them (the work is packaging + content, not system-level engineering)

**Work:**

1. **Verify the spec hierarchy is complete for Phase 1:**
   - [x] osis.json — populated
   - [x] twin.md — reflects current codebase
   - [x] vision.md — locked
   - [x] product-spec.md — locked with roadmap
   - [x] changelog.md — active
   - [ ] phase-1-ship/game-plan.md — this phase's strategic overview
   - [ ] phase-1-ship/implementation-spec.md — this document

2. **Update osis.json** to reflect the active phase:
   ```json
   {
     "activePhase": "phase-1-ship"
   }
   ```

3. **Run a drift scan** on the existing specs. Compare twin.md against the codebase. Flag any mismatches. This also tests the drift scan prompt from `references/drift-scan.md`.

4. **Confirm the protocol is self-documenting.** A new user reading osis/README.md, then twin.md, then the active phase specs should be able to understand: what the product is, where it's going, and what's being worked on right now.

**Depends on:** Nothing. Can run in parallel with other phases. Already in progress.

---

### Phase 5: Maintenance Documentation

**Scope:** Document how users set up automated twin refresh and drift scanning using existing tools.

**Validates:** Can a user follow the docs and have working automation?

**Work:**

1. **Write a maintenance guide.** Location: either in the docs section of the landing page, in the skill's references, or both. Cover:

   **Claude Code `/loop` setup:**
   - What `/loop` is and how it works
   - Recommended prompt for twin refresh: "Read all code on main, regenerate osis/twin.md"
   - Recommended prompt for drift scan: the prompt from `references/drift-scan.md`
   - Recommended frequency: daily during active development, weekly otherwise

   **Codex cron setup:**
   - How to configure a recurring Codex task
   - Same prompts as above
   - Cron schedule recommendations

2. **Add a "Maintenance" section to the skill's SKILL.md** (or confirm it's already covered). The drift-scan.md reference already has the prompt. The skill already has a Twin mode. Document the connection: "To automate, set up a cron that triggers the Twin mode periodically."

3. **Test the documented setup.** Configure `/loop` on the Osis project itself. Run it. Verify the twin refreshes and drift findings appear in the changelog.

**Depends on:** Phase 4 (need validated protocol to test maintenance against). Can start writing docs in parallel.

---

## Directory Structure

After Phase 1 is complete:

```
osis/
  osis.json                          ← updated with activePhase
  twin.md                            ← refreshed
  v1/
    vision.md                        ← locked
    product-spec.md                  ← locked, points to phase-1-ship
    changelog.md                     ← updated with Phase 1 entries
    phase-1-ship/
      game-plan.md                   ← this phase's strategy
      implementation-spec.md         ← this document
      signals/                       ← raw inputs during Phase 1

skill/osis/                          ← published to skills.sh
  SKILL.md
  references/
    protocol.md
    templates.md
    drift-scan.md
  scripts/
    init.sh

apps/osis-landing-v2/
  components/
    hero-section.tsx                  ← NEW
    benefits-section.tsx              ← NEW
    how-it-works-section.tsx          ← NEW
    docs-section.tsx                  ← NEW (T2)
  app/
    page.tsx                          ← Updated to include new sections
```

---

## Engineering Notes

- 2026-03-16 — Phase 1 spec created. Protocol is being dogfooded (this document is itself a protocol artifact). Skill exists in two locations (repo + local .claude/skills) — need to reconcile before publishing.
- 2026-03-16 — Landing page is purely a scroll hero + waitlist funnel today. New sections are additive Server Components below the existing StackedScreens component in page.tsx. No architectural changes needed.
- 2026-03-16 — The biggest unknown is skills.sh publishing requirements. This is the first dependency to resolve.

---

## Open Questions

- [ ] Does skills.sh require a specific package.json, manifest, or metadata file beyond SKILL.md frontmatter? — *Unresolved*
- [ ] What happens to the skill's references/ and scripts/ directories during skills.sh install — do they get copied into the user's project? — *Unresolved*
- [ ] Should the landing page new sections be Server Components or Client Components? Server Components are simpler unless interactivity is needed. — *Leaning Server Components*
- [ ] What's the right order for the page: scroll hero, then hero section, then benefits, then how-it-works, then docs? Or should benefits come before the value prop? — *Unresolved*
