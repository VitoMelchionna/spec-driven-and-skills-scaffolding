# Tasks: Service Health Status

**Plan:** `001-service-health-status/plan.md`
**Spec:** `001-service-health-status/spec.md`
**Total tasks:** 14

> **TDD note:** Tests in `__tests__/` were added first (red). Execute tasks below to make them green. Do not skip test tasks.

---

## Story 3: Share a common health contract across packages

### Phase 1.1: Shared validation

- [ ] Extract health logic to dedicated module with empty-string guard
  - File: `packages/shared/src/health.ts`
- [ ] Re-export from package entry
  - File: `packages/shared/src/index.ts`
- [P] Ensure unit tests pass for Story 3 acceptance criteria
  - File: `packages/shared/__tests__/create-health-status.test.ts`
  - Command: `pnpm --filter @repo/shared test`

**Checkpoint:** `pnpm --filter @repo/shared test` exits 0.

---

## Story 1: Check backend service health via API

### Phase 1.2: Backend route hardening

- [ ] Add `Cache-Control: no-store` response header
  - File: `apps/backend/app/api/health/route.ts`
- [ ] Export and handle unsupported methods with `405`
  - File: `apps/backend/app/api/health/route.ts`
- [P] Ensure route tests pass for Story 1 acceptance criteria
  - File: `apps/backend/__tests__/health.route.test.ts`
  - Command: `pnpm --filter @repo/backend test`

**Checkpoint:** `pnpm --filter @repo/backend test` exits 0. Manual: `curl -i http://localhost:3001/api/health` shows `Cache-Control: no-store`.

---

## Story 2: View frontend service health on the home page

### Phase 1.3: Frontend component extraction

- [ ] Create accessible `HealthStatusCard` presentational component
  - File: `apps/frontend/components/health/HealthStatusCard.tsx`
  - Must render `<dl>` with labeled service, status, timestamp
- [ ] Update home page to use `HealthStatusCard`
  - File: `apps/frontend/app/page.tsx`
- [P] Ensure component tests pass for Story 2 acceptance criteria
  - File: `apps/frontend/__tests__/health-status-card.test.tsx`
  - Command: `pnpm --filter @repo/frontend test`

**Checkpoint:** `pnpm --filter @repo/frontend test` exits 0. Home page shows health via `HealthStatusCard`.

---

## Final Integration

### Phase 1.4: Monorepo validation

- [ ] Run full test suite across workspaces
  - Command: `pnpm test`
- [ ] Cross-reference spec.md acceptance criteria — mark complete in PR description
- [ ] Update spec.md Review checklist (stakeholder sign-off)

**Final Checkpoint:** `pnpm test` exits 0. All Story 1–3 acceptance criteria satisfied.

---

## Notes

- `[P]` = can run in parallel once the file it tests exists
- Do not implement features outside `001-service-health-status/spec.md`
- Reference FR IDs in commit messages (e.g. `feat(shared): add FR-002 validation`)
