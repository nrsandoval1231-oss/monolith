# Foundation packet

- Base: `5ed0ec59343472772a4ba66c194e861ef47229fc`; node: `foundation`; branch: `main`.
- Scope: missing application/package folders, workspace configuration, deterministic tests, local infrastructure scaffolding, docs and CI.
- Dependencies: all nine workspace manifests and entrypoints must exist before final validation.
- Invariants: retain existing architecture/acceptance; no credentials, provider calls, production schema application, deployment or unrelated changes.
- Acceptance: `npm install`, `npm ci`, `npm run check`; independent Astra review; normal fast-forward push, remote head verification and CI status.
- Retry limit: two materially different repairs, then scoped escalation.
- Roles: Luna builders (low), Astra critic (high); lead integrates. Timing/token measurements unavailable unless explicitly recorded; no performance claims.
- Next action: validate integrated source, repair material findings, push authorized foundation.
