# Monolith foundation

Objective: complete and push the missing foundation on top of `5ed0ec59343472772a4ba66c194e861ef47229fc`, preserving original architecture and acceptance criteria.

Repository: `nrsandoval1231-oss/monolith`; branch: `main`; checkout: fresh clone under this chat's `work/monolith`.

Canonical intent: [architecture](../docs/architecture.md), [product acceptance](../docs/acceptance.md). Foundation is scaffolding only; no product feature, provider, service activation or deployment is implied.

The prior conversation's ZIP is unavailable in this Windows environment. Reconstruction follows the referenced conversation's nine-workspace folder tree and the original six committed files.

Plan: three nonoverlapping Luna builders cover root tooling/tests/CI, shared packages, and apps/infrastructure/docs. Lead integrates and runs install, clean install, tests, typecheck and build; Astra independently reviews the actual diff before push.

Node: `foundation`; status: locally validated and independently reviewed. `npm install` and `npm ci` passed with zero reported vulnerabilities; `npm run check` passed typecheck, build and 5 tests; Compose configuration and diff checks passed. Astra PASS on staged implementation tree `03a7ed4700d6ba00a32df23f97d9cfdf4284db8f`. Next: commit and fast-forward push, verify GitHub CI. Unknown: database startup, browser/product behavior and deployment. Workspace exports target TypeScript source; future runtime tooling must handle TSX.
