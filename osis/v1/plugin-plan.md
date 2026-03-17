# Osis Claude Code Plugin — Plan

Status: **parked** — waiting for Anthropic to ship plugin distribution.

## Decision

When Claude Code plugin distribution ships, package osis as a standalone plugin.

## Architecture: Single Source of Truth

The skill definition lives in `skills/osis/` (the current location). The plugin structure symlinks into it — no duplication.

```
osis-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   └── osis.md
├── skills/
│   └── osis -> ../../../skills/osis   # symlink to SST
└── README.md
```

`skills/osis/` remains the canonical source. The plugin is a packaging layer, not a fork.

## Open Questions

- Should the plugin include scaffolding scripts, templates, and drift-scan cron, or just the skill?
- Own repo or publishable subdirectory within the monorepo?
- Slash commands to expose beyond `/osis`?

## Trigger

Revisit when Anthropic announces plugin registry or `claude plugin install` support.
