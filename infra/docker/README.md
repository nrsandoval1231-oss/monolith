# Local database scaffold

The local PostgreSQL/pgvector Compose definition is maintained at
[`../compose.yaml`](../compose.yaml), one level above this directory. Run it
from the repository root with `docker compose -f infra/compose.yaml up -d`.
This directory is reserved for future local container support files; it does
not define production deployment infrastructure.
