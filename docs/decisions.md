# Decision record

## Foundation scope

Start as a TypeScript monorepo with three private app workspaces: a React web
interface, a Node API, and a background worker, plus six shared packages. Keep each workspace's public
entry point intentionally small until a product capability is specified and
accepted. Importing an entry point must not start a listener, job loop, or
provider integration.

Use PostgreSQL with pgvector as the intended local persistence foundation.
The local Compose service binds its port to loopback. There is no production
schema or deployment decision in this scaffold.
