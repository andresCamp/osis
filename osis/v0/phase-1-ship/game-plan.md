# Phase 1 Game Plan — Ship

**Goal:** Get Osis into the hands of real builders and validate the core loop.
**Target date:** End of Q1 2026 (March 31, 2026)
**Status:** In progress

---

## 1. What This Phase Accomplishes

After Phase 1, a builder can:

1. Install the Osis skill into their project with `npx skills add`
2. Have a bootstrap conversation that produces a digital twin, vision spec, and product spec
3. Continue the build loop — bring signals, get specs, build against them
4. Set up automated maintenance (twin refresh + drift scan) using existing CLI tools

The protocol goes from "tested on one project" (Osis itself) to "used by real builders on real projects." The landing page goes from waitlist funnel to product site that explains what Osis is, how it works, and how to get started.

Phase 1 is about distribution and first experience. The protocol is already built. The skill is already built. This phase packages them for others and validates that the core loop works outside the author's own head.

---

## 2. Constraints

- **Timeline:** Hard — Q1 2026. Two weeks remaining as of 2026-03-16.
- **Resources:** Solo founder. No team. All work is direct or agent-assisted.
- **Budget:** Zero. Open source distribution. No paid infrastructure beyond existing Vercel/Resend/PostHog.
- **Dependencies:**
  - skills.sh must support publishing (it does — `npx skills add` is the distribution path)
  - The skill must work as a standalone install (currently lives in repo + local .claude/skills — needs to be publishable)
  - Landing page is deployed on Vercel — new sections are additive, no infrastructure changes

---

## 3. Systems

| System | Type | Description |
|--------|------|-------------|
| Osis Skill | Changed | Finalize for skills.sh publishing — ensure standalone install works end-to-end |
| Landing Experience | Changed | Add hero, benefits, how-it-works, and docs sections below existing scroll experience |
| Osis Protocol | Validated | Protocol is defined and tested on Osis itself — confirm completeness for external use |
| Bootstrap Flow | Changed | Polish the first-run experience — install to first conversation must be seamless |
| Maintenance Documentation | New | Document `/loop` and cron setup for automated twin refresh and drift scanning |

---

## 4. What Ships

| Component | Tier | System | Notes |
|-----------|------|--------|-------|
| Skill published to skills.sh | T1 | Osis Skill | `npx skills add [owner/osis]` works and produces a functional bootstrap |
| Landing page: hero section | T1 | Landing Experience | Clear value prop below the scroll experience — what Osis is in one screen |
| Landing page: benefits section | T1 | Landing Experience | Why a builder should care — 3-4 concrete benefits |
| Landing page: how it works section | T1 | Landing Experience | Install, Talk, Specs, Build — the pipeline visualized |
| Protocol validated end-to-end | T1 | Osis Protocol | Twin, vision, product spec, phases, system specs all work as designed |
| Bootstrap flow polished | T1 | Bootstrap Flow | First experience tested on a fresh project — no rough edges |
| Maintenance docs: /loop setup | T2 | Maintenance Documentation | How to configure Claude Code `/loop` for automated twin + drift |
| Maintenance docs: Codex cron setup | T2 | Maintenance Documentation | How to configure Codex cron for the same |
| Landing page: docs section | T2 | Landing Experience | Protocol reference, getting started, spec templates — on-page or linked |

---

## 5. What Does NOT Ship

| Deferred Item | Reason | Revisit In |
|---------------|--------|------------|
| Full lifecycle specs (GTM, growth, PMF) | Phase 2 scope — protocol covers build phase only for now | Phase 2 |
| Cloud-native cron (auto-config) | Requires infrastructure; user-configured cron is sufficient for early adopters | Phase 2 |
| Standalone docs site | On-page docs section is sufficient for Phase 1 traffic | Phase 2 |
| Adaptive protocol tiers | Phase 2 — for now, one protocol size fits all | Phase 2 |

---

## 6. Success Criteria

- [ ] 10+ builders install Osis on real projects
- [ ] Builders complete the full loop: install, bootstrap, conversation, specs, build
- [ ] Qualitative signal that the conversation changes how people build
- [ ] The skill installs cleanly from skills.sh on a project the author has never seen
- [ ] Landing page communicates what Osis is without requiring a demo or explanation
- [ ] At least one builder sets up automated maintenance and reports it working

---

## 7. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| skills.sh publishing has friction or undocumented requirements | Blocks distribution entirely | Investigate publishing flow early — this is the first thing to do |
| Bootstrap flow fails on codebases with unusual structures | Bad first impression, users bounce | Test bootstrap on 3-5 diverse projects before publishing |
| The protocol feels like overhead to builders who "just want to code" | Low adoption, negative word of mouth | The landing page and bootstrap must clearly demonstrate value within 5 minutes |
| Solo founder bandwidth — two weeks is tight | Scope creep, incomplete delivery | T1 components only if time is short. T2 can slip to early April. |
| Skill works differently in local .claude/skills vs skills.sh install | Bug reports from first users | Test the skills.sh install path specifically, not just the local copy |

---

## 8. Open Questions

- [ ] What is the exact skills.sh publishing flow? Does the skill need a specific directory structure or metadata format beyond what exists? — *Unresolved*
- [ ] Should the landing page docs section be on-page (accordion/tabs) or a separate /docs route? — *Unresolved*
- [ ] What is the CTA after the scroll hero — keep "Sign Up for Early Access" or switch to "Install Now" with the npx command? — *Unresolved*
- [ ] Does the skill need to bundle its own references/ directory, or does skills.sh handle that? — *Unresolved*
