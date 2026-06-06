# tasks-template.md — Implementation Task Breakdown

> Copy to `.agents/specify/specs/<NNN>-<feature-slug>/tasks.md`
> Generated from plan.md. This is what the AI agent executes.
> Rules: ordered by dependency, every task has a file path, [P] = parallelizable.

---

# Tasks: [Feature Name]

**Plan:** `NNN-feature-slug/plan.md`
**Total tasks:** [N]

---

## Story 1: [User Story Title from spec.md]

### Phase 1.1: Database Migrations

- [ ] Create migration file for `[table_name]` table
  - File: `db/migrations/[timestamp]_create_[table_name].sql`
  - Fields: [list key fields]
- [ ] Create migration for foreign keys / indexes
  - File: `db/migrations/[timestamp]_add_[table_name]_indexes.sql`
- [ ] Verify migration runs cleanly in dev environment
  - Command: `[migration run command]`

**Checkpoint:** `[table_name]` exists in DB with correct schema. `SELECT * FROM [table_name]` succeeds.

---

### Phase 1.2: Repository Layer

- [ ] Create `[EntityName]Repository` class with `findById`, `findAll`, `create`, `update`, `delete`
  - File: `src/repositories/[entityName]Repository.ts`
- [P] Write unit tests for `[EntityName]Repository`
  - File: `src/repositories/[entityName]Repository.test.ts`
  - Coverage: CRUD operations, not-found cases, validation errors

**Checkpoint:** All repository unit tests pass. `pnpm test [entityName]Repository` exits 0.

---

### Phase 1.3: Service Layer

- [ ] Create `[Feature]Service` implementing business rules from FR-001, FR-002
  - File: `src/services/[feature]Service.ts`
  - Logic: [describe key business rules]
- [P] Write unit tests for `[Feature]Service`
  - File: `src/services/[feature]Service.test.ts`
  - Mock: `[EntityName]Repository`
  - Coverage: happy path, permission checks, edge cases from spec

**Checkpoint:** Service unit tests pass. Business rules validated in isolation.

---

### Phase 1.4: API Endpoints

- [ ] Implement `POST /api/[resource]` handler
  - File: `src/api/[resource].ts`
  - Validates request body against schema
  - Calls `[Feature]Service.create()`
  - Returns 201 with created resource
- [ ] Implement `GET /api/[resource]` handler (list with pagination)
  - File: `src/api/[resource].ts`
- [ ] Implement `GET /api/[resource]/:id` handler
  - File: `src/api/[resource].ts`
- [ ] Implement `PATCH /api/[resource]/:id` handler
  - File: `src/api/[resource].ts`
- [ ] Implement `DELETE /api/[resource]/:id` handler
  - File: `src/api/[resource].ts`
- [ ] Add auth middleware to all endpoints
  - File: `src/middleware/auth.ts`
- [P] Write integration tests for all endpoints
  - File: `src/api/[resource].test.ts`
  - Test: auth enforcement, 404 handling, validation errors

**Checkpoint:** All API integration tests pass. Manual test via curl: `curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/[resource]` returns 200.

---

### Phase 1.5: UI Components

- [ ] Create `[FeatureList]` component showing paginated results
  - File: `src/components/[FeatureName]/[FeatureList].tsx`
  - Shows: loading state, empty state, error state, list items
- [ ] Create `[FeatureItem]` sub-component for a single row/card
  - File: `src/components/[FeatureName]/[FeatureItem].tsx`
- [ ] Create `[FeatureForm]` component for create/edit
  - File: `src/components/[FeatureName]/[FeatureForm].tsx`
  - Fields: [list form fields from spec]
  - Validation: client-side matching server-side rules
- [ ] Wire up components to API via `use[Feature]` hook
  - File: `src/hooks/use[Feature].ts`
- [P] Write component tests for `[FeatureList]`
  - File: `src/components/[FeatureName]/[FeatureList].test.tsx`
- [P] Write component tests for `[FeatureForm]`
  - File: `src/components/[FeatureName]/[FeatureForm].test.tsx`
- [ ] Add route for feature page to app router
  - File: `src/app/router.tsx`

**Checkpoint:** Feature page renders at `/[route]`. Create form submits successfully. List updates after creation.

---

## Story 2: [Next User Story Title]

### Phase 2.1: [Phase Name]

- [ ] [Task description]
  - File: `[exact/file/path.ts]`
- [P] [Parallel task]
  - File: `[exact/file/path.test.ts]`

**Checkpoint:** [Verifiable condition — what the agent can check to confirm success]

---

## Final Integration

### Phase N: End-to-End Validation

- [ ] Run full test suite: all unit + integration tests pass
  - Command: `pnpm test` (or equivalent)
- [ ] Verify all acceptance criteria from spec.md are met
  - Cross-reference: `NNN-feature-slug/spec.md` → Review & Acceptance Checklist
- [ ] Check performance: [specific measurement]
- [ ] Accessibility audit: [tool/command]
- [ ] Update spec.md checklist — mark all passing criteria

**Final Checkpoint:** `pnpm test` exits 0. All spec.md acceptance criteria checked off.

---

## Notes

- `[P]` = can be executed in parallel with preceding task
- Each checkpoint must be self-verifiable (command, observable output, or testable condition)
- If a task blocks on an open question from plan.md, stop and surface it before proceeding