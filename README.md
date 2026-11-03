# MONOLITH

**Your world. Connected.**

Local-first, evidence-backed personal knowledge system. Orloom's real end-to-end engineering acceptance target.

## Monorepo
- apps/web — React foundation entry point
- apps/api — Node API foundation entry point
- apps/worker — worker foundation entry point
- packages/core — domain model
- packages/contracts — shared schemas
- packages/knowledge — extraction, graph and retrieval
- packages/db — persistence
- packages/ui — design system
- packages/config — configuration
- infra — local database scaffold and future migrations
- docs — architecture, decisions, brand direction, development and acceptance
- tests — deterministic validation

Status: initial foundation, not a completed application. The app workspaces do not yet implement product behavior. See [development](docs/development.md) for local setup. No server, worker, or external provider is activated by this scaffold.
