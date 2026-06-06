# AGENTS.md — Frontend (`apps/frontend`)

Next.js App Router UI app. Port **3000**.

## Scope

- Pages, layouts, and React components under `app/` and `components/`.
- Server Components by default; add `'use client'` only when needed.

## Active Feature: 001-service-health-status

**Spec:** `.agents/specify/specs/001-service-health-status/spec.md` (Story 2)
**Tasks:** Phase 1.3 in `tasks.md`

### Planned files (not yet implemented)

| File | Purpose |
|------|---------|
| `components/health/HealthStatusCard.tsx` | Accessible health display (FR-004) |
| `app/page.tsx` | Wire home page to `HealthStatusCard` |

## Testing

```bash
pnpm --filter @repo/frontend test
```

- Framework: **Vitest** + **React Testing Library**
- Tests: `__tests__/*.test.tsx`
- Test presentational components with props; avoid full Next.js routing in unit tests.

## Conventions

- Components: `components/<feature>/ComponentName.tsx`
- Colocate feature tests in `__tests__/`
- Import shared types from `@repo/shared`
- Reference acceptance criteria in test `describe` blocks (e.g. `Story 2: View frontend service health`)

## Do

- Extract UI into testable components before page integration.
- Use semantic HTML (`<dl>`, `<dt>`, `<dd>`) for labeled health data.

## Don't

- Fetch backend health API for the baseline feature (server-render via `@repo/shared`).
- Add client state libraries for this scaffold.
