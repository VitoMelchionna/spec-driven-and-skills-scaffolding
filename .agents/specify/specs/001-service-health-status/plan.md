# Implementation Plan: Service Health Status

**Spec:** `001-service-health-status/spec.md`
**Status:** Approved

---

## Tech Stack

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Frontend | Next.js (App Router) | 15.3.x | `apps/frontend`, port 3000 |
| Backend | Next.js Route Handlers | 15.3.x | `apps/backend`, port 3001 |
| Shared | TypeScript package | 5.8.x | `packages/shared` |
| Testing | Vitest | 3.x | Unit + route integration |
| UI Testing | React Testing Library | 16.x | Frontend component tests |
| Monorepo | pnpm + Turborepo | 10.x / 2.x | Workspace orchestration |

**Key Libraries:**

- `vitest@^3.2.4` — test runner for all packages
- `@testing-library/react@^16.3.0` — frontend component tests
- `@testing-library/jest-dom@^6.6.3` — DOM matchers

---

## Architecture Overview

```
┌─────────────────────┐     ┌─────────────────────┐
│  apps/frontend      │     │  apps/backend       │
│  HealthStatusCard   │     │  GET /api/health    │
│  (Server Component) │     │  route handler      │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           └───────────┬───────────────┘
                       ▼
            ┌─────────────────────┐
            │  packages/shared    │
            │  HealthStatus type  │
            │  createHealthStatus │
            └─────────────────────┘
```

---

## Data Model

### Entity: HealthStatus (in-memory, no persistence)

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `status` | `"ok"` | Required, literal | Extensible in future specs |
| `service` | `string` | Required, non-empty | e.g. `"frontend"`, `"backend"` |
| `timestamp` | `string` | Required, ISO-8601 | Generated at call time |

### Relationships

- None. Health status is ephemeral and not stored.

---

## API Design

See `contracts/api-spec.md` for the full contract.

### `GET /api/health`

- **Auth:** Public
- **Success:** `200 OK` + JSON body + `Cache-Control: no-store`
- **Errors:** `405` for non-GET methods

---

## Component / Module Structure

```
packages/shared/
└── src/
    ├── index.ts
    └── health.ts                    ← createHealthStatus + validation

apps/backend/
├── app/api/health/route.ts
└── __tests__/
    └── health.route.test.ts

apps/frontend/
├── app/page.tsx                     ← consumes HealthStatusCard
├── components/health/
│   └── HealthStatusCard.tsx         ← FR-004 (not yet implemented)
└── __tests__/
    └── health-status-card.test.tsx
```

---

## Implementation Phases

### Phase 1: Shared contract + tests

- Extend `createHealthStatus` with empty-string validation.
- Unit tests in `packages/shared/__tests__/`.

**Deliverable:** Shared tests pass; invalid input rejected.

### Phase 2: Backend route + tests

- Add `Cache-Control: no-store` header.
- Add `405` handling for unsupported methods.
- Route integration tests.

**Deliverable:** All backend health tests pass.

### Phase 3: Frontend component + tests

- Extract `HealthStatusCard` component.
- Wire home page to use component.
- Component tests for Story 2 acceptance criteria.

**Deliverable:** Frontend tests pass; home page uses component.

---

## Research Notes

| Topic | Question | Status |
|---|---|---|
| Vitest + Next.js route handlers | Import route handlers directly vs HTTP simulation | Resolved: import `GET` directly |
| Server Components in RTL | Test via render of extracted presentational component | Resolved: test `HealthStatusCard` with props |

---

## Open Questions

- [ ] None for baseline scaffold.

---

## Constitution Compliance Notes

- **TDD:** Tests written in Phase 0 (this PR) before full implementation.
- **Shared package:** All health shape logic centralized in `@repo/shared`.
- **Performance:** No I/O in health path; meets < 50ms budget.
