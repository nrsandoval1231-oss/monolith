# Development

Requirements: Node.js 22 or newer and npm. Copy `.env.example` to an ignored
local `.env` only if you need the local database connection.

Install dependencies with `npm install`. Run deterministic checks with
`npm run check`, which runs the repository's configured test, TypeScript
no-emit, and build steps.

The three app workspaces currently contain type-safe foundation exports only.
They do not implement product behavior, start an HTTP server, schedule jobs,
or activate external providers. This setup has not been runtime-verified.

For local PostgreSQL with pgvector, run `docker compose -f infra/compose.yaml up -d`.
The database port is bound to loopback only. Compose credentials are disposable
local-development examples; replace them with a secure setup before any shared
or remote use. No production schema or migrations exist yet.
