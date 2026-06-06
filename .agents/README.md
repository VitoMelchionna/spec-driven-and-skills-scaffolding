# Agents & Spec-Driven Development

This directory is the **planning and specification layer** for AI-assisted development. Application code lives in `apps/` and `packages/`; this folder defines *what* to build, *in what order*, and *under which principles*.

## Hybrid architecture

Two standards work together:

| System | Role | When to use |
|--------|------|-------------|
| **GitHub Spec Kit** (`.agents/specify/`) | Durable feature artifacts: specs, plans, tasks, contracts | Planning, review, implementation sequencing |
| **OpenAI `AGENTS.md`** (repo + subfolders) | Scoped runtime instructions for agents editing code | Day-to-day coding sessions in a specific package |

**Spec Kit** answers: *What are we building? What are the acceptance criteria? What files do we touch?*

**`AGENTS.md`** answers: *What conventions apply here? Which spec am I implementing? What commands do I run?*

Neither replaces the other. Specs are reviewed like code; `AGENTS.md` files are kept short so agents load minimal context.

## Layout

```
.agents/
├── AGENTS.md                 ← Instructions for working in this folder
├── memory/
│   └── constitution.md       ← Project principles (read before any spec work)
├── specify/
│   └── specs/
│       └── 001-service-health-status/
│           ├── spec.md       ← What & why (no tech stack)
│           ├── plan.md       ← How (tech stack, architecture)
│           ├── tasks.md      ← Ordered implementation steps + checkpoints
│           └── contracts/
│               └── api-spec.md
├── skills/
│   └── github-spec-kit/      ← SDD authoring skill (read when writing new specs)
└── templates/                ← Starters for new features
```

## Spec Kit workflow

```
Constitution → Spec → Clarify → Plan → Tasks → Implement (TDD)
```

| Step | Artifact | Agent loads when… |
|------|----------|-------------------|
| 1 | `memory/constitution.md` | Starting any new feature or plan |
| 2 | `specify/specs/*/spec.md` | Understanding requirements (what/why) |
| 3 | Clarifications in `spec.md` | Ambiguity exists — ask questions, append answers |
| 4 | `plan.md` | Designing architecture or choosing libraries |
| 5 | `tasks.md` | Implementing — this is the execution checklist |
| 6 | Failing tests + code | TDD — tests first, then tasks |

### Artifact rules (from Spec Kit)

- **`spec.md`** — user stories, FR IDs, acceptance criteria, non-goals. **No tech stack.**
- **`plan.md`** — tech stack, data model, API design, file structure. References constitution.
- **`tasks.md`** — ordered steps with exact file paths, `[P]` parallel markers, and **checkpoints**.
- **`contracts/`** — optional REST/event contracts for integration boundaries.

Authoring guide: [`skills/github-spec-kit/SKILL.md`](skills/github-spec-kit/SKILL.md)

## TDD integration

Spec-driven development and TDD reinforce each other in this repo:

1. **Acceptance criteria → tests** — every Given/When/Then in `spec.md` should map to at least one test case.
2. **Tests before tasks** — add failing tests (red) before executing implementation tasks in `tasks.md`.
3. **Checkpoints = test commands** — each phase in `tasks.md` ends with a verifiable command (usually `pnpm test`).
4. **FR traceability** — reference `FR-001`, `FR-002`, etc. in test comments and commit messages.

### Red phase in practice

The baseline feature (`001-service-health-status`) ships with failing tests in:

- `packages/shared/__tests__/`
- `apps/backend/__tests__/`
- `apps/frontend/__tests__/`

Run `pnpm test` from the repo root. Failures indicate unimplemented tasks — work through `tasks.md` until green.

### TDD anti-patterns to avoid

- Implementing code without a spec or failing test first
- Writing tests that mirror implementation details instead of acceptance criteria
- Skipping checkpoint commands between phases
- Marking `tasks.md` items done while tests still fail

## Context window optimization

This folder is designed to minimize token usage during agent sessions.

### Load progressively, not all at once

```
Session type              │ Minimum context to load
──────────────────────────┼────────────────────────────────────────────
Authoring a new spec      │ constitution.md + SKILL.md + templates/
Implementing a task       │ tasks.md + local AGENTS.md + target source files
Reviewing requirements    │ spec.md only
API work                  │ contracts/ + plan.md (API section)
```

### Reference by path, not by paste

When prompting an agent:

```
✅  Implement Phase 1.2 in .agents/specify/specs/001-service-health-status/tasks.md
✅  Follow apps/backend/AGENTS.md and the api-spec contract
❌  [paste entire spec.md, plan.md, and constitution into chat]
```

### Keep sessions scoped

| Scope | Context budget |
|-------|----------------|
| One `tasks.md` phase | ~1 spec folder + 1 app/package + its `AGENTS.md` |
| One user story | `spec.md` (single story section) + relevant tests + target files |
| New feature planning | `constitution.md` + new spec folder only |

Start a fresh session when switching features or apps — stale context from a previous feature wastes tokens and causes scope drift.

### `AGENTS.md` vs spec artifacts

| File | Size target | Content |
|------|-------------|---------|
| `AGENTS.md` (any level) | < 100 lines | Commands, conventions, pointers to active spec |
| `spec.md` | As needed | Requirements — loaded for planning/review, not every coding session |
| `tasks.md` | As needed | Loaded during implementation — most actionable for agents |
| `plan.md` | As needed | Loaded for architecture decisions — skip for routine task execution |

Subfolder `AGENTS.md` files (e.g. `apps/frontend/AGENTS.md`) should **point to** spec paths, not duplicate spec content.

### Hierarchical resolution

When an agent edits a file, it reads the nearest `AGENTS.md` walking up the tree:

```
apps/frontend/components/health/HealthStatusCard.tsx
    ↑ apps/frontend/AGENTS.md   ← wins (frontend conventions, Story 2 pointer)
    ↑ AGENTS.md                 ← fallback (monorepo commands, spec index)
```

Agents do not need `.agents/` open when doing routine frontend work — only the local `AGENTS.md` and the relevant `tasks.md` phase.

## Agent session playbook

### Planning a new feature

1. Read `memory/constitution.md`
2. Read `skills/github-spec-kit/SKILL.md`
3. Copy `templates/` → `specify/specs/<NNN>-<slug>/`
4. Write `spec.md` → clarify → `plan.md` → `tasks.md`
5. Add failing tests in target packages
6. Update local `AGENTS.md` files with feature pointer

### Implementing an existing feature

1. Open `specify/specs/<NNN>-<slug>/tasks.md` — find the next unchecked phase
2. Open the target package's `AGENTS.md`
3. Run existing tests: `pnpm --filter @repo/<package> test`
4. Implement tasks until checkpoint passes
5. Mark tasks complete; stop session or continue to next phase

### Reviewing a spec

1. Load `spec.md` only
2. Validate against the Review & Acceptance Checklist at the bottom
3. Confirm every acceptance criterion is testable (Given/When/Then)
4. Confirm non-goals and NFRs are explicit

## Active features

| ID | Feature | Path |
|----|---------|------|
| 001 | Service Health Status | [`specify/specs/001-service-health-status/`](specify/specs/001-service-health-status/spec.md) |

## Related files

- [`../AGENTS.md`](../AGENTS.md) — root agent instructions
- [`../README.md`](../README.md) — human-facing overview and quick start
- [`memory/constitution.md`](memory/constitution.md) — project principles
