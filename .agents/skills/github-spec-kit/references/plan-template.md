# plan-template.md — Low-Level Technical Implementation Plan

> Copy this template to `.agents/specify/specs/<NNN>-<feature-slug>/plan.md`
> Produced after spec.md is approved. Now you can talk tech stack.

---

# Implementation Plan: [Feature Name]

**Spec:** `NNN-feature-slug/spec.md`
**Status:** Draft | Reviewed | Approved

---

## Tech Stack

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Frontend | [React / Vue / Blazor / etc.] | [x.y.z] | |
| Backend | [Node / .NET / Python / etc.] | [x.y.z] | |
| Database | [Postgres / SQLite / etc.] | [x.y.z] | |
| Auth | [JWT / OAuth / session] | | |
| Cache | [Redis / in-memory] | [x.y.z] | Optional |
| Queue | [SQS / BullMQ / etc.] | [x.y.z] | Optional |

**Key Libraries:**
- `library-name@x.y.z` — [purpose]
- `library-name@x.y.z` — [purpose]

---

## Architecture Overview

[Describe the high-level architecture. Use ASCII diagram or prose.]

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   API Layer │────▶│  Database   │
│  (React)    │     │  (REST/gRPC)│     │  (Postgres) │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │  Service    │
                    │  Layer      │
                    └─────────────┘
```

---

## Data Model

### Entity: [EntityName]

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID | PK, auto-generated | |
| `created_at` | timestamp | NOT NULL, default now() | |
| `updated_at` | timestamp | NOT NULL, auto-update | |
| `[field]` | [type] | [NOT NULL / nullable] | |

### Entity: [EntityName2]

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID | PK | |
| `[entity1]_id` | UUID | FK → entity1.id | CASCADE DELETE |

### Relationships

- `EntityA` → `EntityB`: one-to-many (EntityA.id = EntityB.entity_a_id)
- `EntityB` ↔ `EntityC`: many-to-many via `entity_b_c` join table

---

## API Design

### `POST /api/[resource]`
- **Auth:** Required — role: [admin / user / public]
- **Request body:**
  ```json
  {
    "field": "string (required, max 255)",
    "other": "number (optional)"
  }
  ```
- **Success:** `201 Created`
  ```json
  { "id": "uuid", "field": "string" }
  ```
- **Errors:**
  - `400` — validation failure (body: `{ "errors": [...] }`)
  - `401` — unauthenticated
  - `403` — unauthorized

### `GET /api/[resource]`
- **Auth:** Required
- **Query params:** `page`, `limit`, `sort`, `filter`
- **Success:** `200 OK`
  ```json
  {
    "data": [...],
    "pagination": { "total": 100, "page": 1, "limit": 20 }
  }
  ```

### `GET /api/[resource]/:id`
- **Auth:** Required
- **Errors:** `404` if not found or not owned by caller

### `PATCH /api/[resource]/:id`
- **Auth:** Required, must own resource
- **Request:** Partial update (only changed fields)
- **Errors:** `404`, `409` if concurrent conflict

### `DELETE /api/[resource]/:id`
- **Auth:** Required, must own resource
- **Success:** `204 No Content`

---

## Component / Module Structure

```
src/
├── components/
│   └── [FeatureName]/
│       ├── index.tsx                 ← public export
│       ├── [FeatureName].tsx         ← main component
│       ├── [FeatureName].test.tsx    ← unit tests
│       └── [SubComponent].tsx
├── services/
│   └── [featureName]Service.ts       ← business logic
├── repositories/
│   └── [featureName]Repository.ts    ← data access
├── api/
│   └── [featureName].ts              ← route handlers
└── types/
    └── [featureName].ts              ← shared types
```

---

## Implementation Phases

### Phase 1: Data Layer
Goal: Working database schema and data access.

- DB migrations for [entities]
- Repository layer with CRUD
- Unit tests for repository

**Deliverable:** Data layer tested in isolation.

### Phase 2: Service & API Layer
Goal: Working endpoints with business logic.

- Service layer implementing business rules
- REST endpoints with auth
- Integration tests for API

**Deliverable:** API testable via Postman/curl.

### Phase 3: UI Components
Goal: Working UI connected to API.

- [List components to build]
- State management
- Error and loading states
- Component tests

**Deliverable:** Feature usable end-to-end in dev.

### Phase 4: Polish & Edge Cases
Goal: Production-ready quality.

- Handle all edge cases from spec
- Performance optimizations
- Accessibility pass
- E2E tests

**Deliverable:** Feature meets all acceptance criteria.

---

## Research Notes

*(Areas of uncertainty to investigate before/during implementation)*

| Topic | Question | Status |
|---|---|---|
| [Library X] | Does it support [Y] in version Z? | Pending |
| [API] | Rate limits for [service]? | Resolved: 100/min |

---

## Open Questions

- [ ] [Question 1] — owner: [name], needed by: [date]
- [ ] [Question 2]

---

## Constitution Compliance Notes

*(Flag any tensions with constitution.md and how they're resolved)*

- [Constitution rule]: [How this plan complies]