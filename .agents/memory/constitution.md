# Project Constitution

Governing principles for the **spec-driven-and-skills-scaffolding** monorepo. All specs, plans, and agent tasks must comply with these rules.

## Code Quality

- TypeScript strict mode is required across all packages.
- Shared logic lives in `packages/`; apps must not duplicate cross-cutting types or utilities.
- ESLint via `eslint-config-next` is the baseline for Next.js apps.
- Prefer small, focused modules over large catch-all files.

## Testing Approach (TDD)

- **Red → Green → Refactor:** write failing tests from acceptance criteria before implementation.
- **Unit tests:** `packages/shared`, pure functions, UI components in isolation.
- **Integration tests:** Next.js route handlers (`apps/backend`), server/client boundaries in `apps/frontend`.
- **Coverage target:** 80% line coverage for new code in `packages/shared` and route handlers; 70% for UI components.
- Tests must reference spec IDs (`FR-001`, Story acceptance criteria) in describe blocks or comments.
- Every feature in `.agents/specify/specs/` must map to at least one test file before implementation merges.

## Architecture Constraints

| Allowed | Disallowed |
|---------|------------|
| pnpm workspaces + Turborepo | npm/yarn lockfiles in repo |
| Next.js App Router | Pages Router for new features |
| `@repo/*` internal packages | Relative imports across app boundaries |
| Route handlers in `apps/backend` | Direct DB access from frontend |
| Spec-driven workflow via `.agents/specify/` | Ad-hoc features without spec artifacts |

## Performance Budgets

- Frontend home route TTFB: < 200ms p95 in local dev (no external API calls).
- Backend `/api/health` response: < 50ms p95 in local dev.
- Shared package functions: synchronous, no I/O.

## Security

- Health endpoints are public read-only; no secrets in health responses.
- Environment variables must not be committed; use `.env.local` patterns.
- No authentication in baseline scaffold; future specs must define auth explicitly.

## Naming & Folder Conventions

- Spec folders: `.agents/specify/specs/<NNN>-<feature-slug>/`
- Feature branch naming: `<NNN>-<feature-slug>`
- Test files: `__tests__/<name>.test.ts(x)` colocated under each package/app
- Components: `apps/frontend/components/<feature>/ComponentName.tsx`

## AI Agent Instructions

1. Read the nearest `AGENTS.md` before editing files in that subtree.
2. Read `constitution.md` before creating or modifying `plan.md` / `tasks.md`.
3. Implement only what is defined in the active feature's `tasks.md`; do not expand scope.
4. Validate checkpoints in `tasks.md` with test commands before marking tasks complete.
5. High-level requirements live in `spec.md`; tech details live in `plan.md` — do not mix levels.
