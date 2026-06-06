# AGENTS.md — Shared (`packages/shared`)

Cross-app TypeScript utilities and types. No framework dependencies.

## Scope

- Pure functions, types, and constants consumed by `apps/*`.
- Zero React or Next.js imports.

## Active Feature: 001-service-health-status

**Spec:** `.agents/specify/specs/001-service-health-status/spec.md` (Story 3)
**Tasks:** Phase 1.1 in `tasks.md`

### Planned files

| File | Purpose |
|------|---------|
| `src/health.ts` | `HealthStatus` type + `createHealthStatus` with validation |
| `src/index.ts` | Re-exports |

## Testing

```bash
pnpm --filter @repo/shared test
```

- Framework: **Vitest**
- Tests: `__tests__/*.test.ts`
- Cover happy path and validation errors (empty service name).

## Conventions

- Export types and functions from `src/index.ts`.
- Validate inputs at factory boundaries; throw `Error` with clear messages.
- Keep functions synchronous (constitution: no I/O in shared helpers).

## Do

- Single source of truth for `HealthStatus` shape.
- Write unit tests before changing factory behavior.

## Don't

- Import from `apps/*`.
- Add side effects (network, filesystem, timers beyond `Date`).
