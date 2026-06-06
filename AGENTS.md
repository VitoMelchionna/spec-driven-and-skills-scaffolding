# AGENTS.md — Repository Root

Instructions for AI coding agents working in this monorepo.

## Project

Spec-driven Next.js monorepo demonstrating SDD (Spec-Driven Development) with skills, TDD, and hierarchical agent context.

## Layout

```
.agents/          → Specs, constitution, skills (read before planning)
apps/frontend/    → Next.js UI (port 3000)
apps/backend/     → Next.js API (port 3001)
packages/shared/  → Cross-app types and utilities
```

## Commands

```bash
pnpm install
pnpm dev              # all apps
pnpm test             # all tests (TDD gate)
pnpm typecheck
pnpm lint
```

## Workflow

1. Find the active feature under `.agents/specify/specs/<NNN>-<feature>/`.
2. Read `spec.md` (what/why) before `plan.md` (how).
3. Execute `tasks.md` in order; run checkpoint commands after each phase.
4. Follow TDD: tests first, then implementation.
5. Obey `.agents/memory/constitution.md` for quality and architecture rules.

## Conventions

- Package manager: **pnpm** only.
- Internal imports: `@repo/<package>` workspace protocol.
- New features require spec artifacts before implementation PRs.
- Commit messages: Conventional Commits; reference FR IDs when applicable.

## Do

- Read the nearest `AGENTS.md` in the directory tree (this file is the fallback).
- Keep changes scoped to the active feature's `tasks.md`.
- Add tests that map to spec acceptance criteria.

## Don't

- Add tech stack details to `spec.md` (belongs in `plan.md`).
- Import across apps directly; use `packages/shared`.
- Implement code without corresponding spec + failing tests.

## Spec Index

| ID | Feature | Path |
|----|---------|------|
| 001 | Service Health Status | `.agents/specify/specs/001-service-health-status/` |
