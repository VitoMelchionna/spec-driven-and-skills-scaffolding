# AGENTS.md — Backend (`apps/backend`)

Next.js Route Handler API app. Port **3001**.

## Scope

- REST-style route handlers under `app/api/`.
- Minimal pages only for dev ergonomics (e.g. linking to `/api/health`).

## Active Feature: 001-service-health-status

**Spec:** `.agents/specify/specs/001-service-health-status/spec.md` (Story 1)
**Contract:** `.agents/specify/specs/001-service-health-status/contracts/api-spec.md`
**Tasks:** Phase 1.2 in `tasks.md`

### Target behavior (tests define completion)

| Requirement | FR / AC |
|-------------|---------|
| `GET /api/health` → 200 JSON | Story 1 |
| `Cache-Control: no-store` header | Clarification |
| `POST /api/health` → 405 | Story 1 error case |

## Testing

```bash
pnpm --filter @repo/backend test
```

- Framework: **Vitest**
- Tests: `__tests__/*.test.ts`
- Import route handlers directly (`import { GET, POST } from '../app/api/health/route'`).

## Conventions

- Use `@repo/shared` for response shapes — never duplicate `HealthStatus` type.
- Return `NextResponse.json()` with explicit headers.
- Export HTTP method handlers by name (`GET`, `POST`, …).

## Do

- Match `contracts/api-spec.md` exactly.
- Add integration tests before changing route behavior.

## Don't

- Add database or auth middleware in baseline scaffold.
- Return environment variables or secrets in health responses.
