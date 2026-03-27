# Changelog

## [2026-03-27] — Monorepo support
- Added org-level osis.json (`type: "org"`) as a router to product-level osis directories
- Org layer is flat (twin.md, vision.md, symlinks to products) — no versions, no phases, no changelog. The org doesn't ship; products ship.
- Bootstrap detects monorepo structure (multiple apps/workspaces) and scaffolds org + product separately
- Product-level osis is completely unchanged — same protocol, same structure, standalone or monorepo
- Updated: protocol.md, SKILL.md (mode detection + bootstrap), templates.md (org twin), init.sh (--org flag)
- Signal source: cloudnine monorepo setup (serdna + onc9 as products under one org)

## [2026-03-22] — Versioning restructure
- Renamed from v1 to v0 as part of the full product arc: v0 (skill) → v1 (local app) → v2 (cloud memory) → v3 (managed agent)
- Root vision.md now covers the overarching product arc
- v0 vision and product spec remain accurate for this version's scope

## [2026-03-16] — Phase 1 Game Plan + Implementation Spec
- Created phase-1-ship/game-plan.md: strategic overview for the Ship phase
- Created phase-1-ship/implementation-spec.md: 5 build phases covering skill publishing, bootstrap polish, landing page update, protocol validation, and maintenance docs
- Phase 1 target: end of Q1 2026. Success = 10+ builders using Osis on real projects.

## [2026-03-16] — Product Spec v1
- Locked product spec: protocol + skill + pipeline + roadmap
- Phase 1: ship to real builders via skills.sh
- Phase 2: full lifecycle from idea to PMF

## 2026-03-16 — Vision Spec v1
- Locked vision spec: product management for the agentic coding era
- Core thesis: democratize product management via an open protocol + agent skill
- Distribution: install-into-codebase (shadcn model), you own your data
