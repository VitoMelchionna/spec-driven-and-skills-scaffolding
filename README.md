# spec-driven-and-skills-scaffolding

A demo monorepo showing how to combine **GitHub Spec Kit** (spec-driven development) with **hierarchical `AGENTS.md`** (OpenAI agent context standard), **skills**, and **TDD** for AI-assisted development on a Next.js monorepo.

## The hybrid approach

This repository uses two complementary systems that serve different layers of context:

| Layer | Standard | Location | Purpose |
|-------|----------|----------|---------|
| **What & why** | [GitHub Spec Kit](https://github.com/github/spec-kit) | `.agents/specify/specs/` | Feature specs, plans, tasks, contracts |
| **Project principles** | Spec Kit | `.agents/memory/constitution.md` | Governing rules for all features |
| **How (local)** | OpenAI `AGENTS.md` | Root + subfolders | Scoped agent instructions per package |
| **Authoring guide** | Cursor Skill | `.agents/skills/github-spec-kit/` | How to write new spec artifacts |

**Why hybrid?** Spec Kit artifacts are durable, reviewable product/engineering documents — ideal for *what* to build and *in what order*. `AGENTS.md` files are lightweight, directory-local hints — ideal for *how to work in this folder* without loading the entire repo into an agent's context window.

```
Human / agent session
        │
        ├─ Planning a feature?     → .agents/specify/specs/<NNN>-<slug>/
        ├─ Writing code in an app? → nearest AGENTS.md (e.g. apps/frontend/)
        └─ Authoring a new spec?   → .agents/skills/github-spec-kit/SKILL.md
```

## Structure

```
.
├── .agents/                 # Spec Kit + skills (planning source of truth)
│   ├── memory/constitution.md
│   ├── specify/specs/       # Feature specs (spec, plan, tasks, contracts)
│   └── skills/              # Agent skills (e.g. github-spec-kit)
├── AGENTS.md                # Root agent instructions (OpenAI standard)
├── apps/
│   ├── frontend/            # Next.js UI app (port 3000) + AGENTS.md
│   └── backend/             # Next.js API app (port 3001) + AGENTS.md
├── packages/
│   ├── shared/              # Shared types and utilities + AGENTS.md
│   └── typescript-config/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Spec-driven workflow

Follow the Spec Kit pipeline for every feature:

```
Constitution → Spec → Clarify → Plan → Tasks → Implement (TDD)
```

1. **Constitution** — read `.agents/memory/constitution.md` once; it governs all features.
2. **Spec** — write `spec.md` (user stories, FR IDs, acceptance criteria). No tech stack here.
3. **Clarify** — resolve ambiguities; append answers to `spec.md`.
4. **Plan** — write `plan.md` (tech stack, architecture, data model, API design).
5. **Tasks** — write `tasks.md` (ordered, file-specific steps with checkpoints).
6. **Implement** — execute tasks using TDD (see below).

**Baseline feature:** [`001-service-health-status`](.agents/specify/specs/001-service-health-status/spec.md)

Detailed Spec Kit guidance: [`.agents/README.md`](.agents/README.md)

## TDD workflow

Tests are written **before** implementation and tied directly to spec acceptance criteria.

### Red → Green → Refactor

1. **Red** — add failing tests that encode acceptance criteria from `spec.md`.
2. **Green** — implement the minimum code to pass tests (`tasks.md` guides order).
3. **Refactor** — clean up while keeping tests green.

### Conventions in this repo

- Test files live in `__tests__/` within each app or package.
- Test `describe` blocks reference spec stories (e.g. `Story 2: View frontend service health`).
- Map tests to requirement IDs where possible (`FR-001`, `FR-002`, …).
- Run checkpoint commands from `tasks.md` after each phase — do not skip ahead.
- `pnpm test` is the monorepo gate; all tests must pass before a feature is done.

### Example (baseline feature)

| Package | Test file | Spec reference |
|---------|-----------|----------------|
| `packages/shared` | `__tests__/create-health-status.test.ts` | Story 3, FR-002 |
| `apps/backend` | `__tests__/health.route.test.ts` | Story 1, API contract |
| `apps/frontend` | `__tests__/health-status-card.test.tsx` | Story 2, FR-004 |

Tests may fail until you complete the corresponding tasks in `tasks.md` — that is intentional (red phase).

```bash
pnpm test                              # all workspaces
pnpm --filter @repo/frontend test      # single app
pnpm --filter @repo/shared test:watch  # watch mode while developing
```

## Context window & token optimization

AI agents have limited context. This repo is structured to **load only what you need, when you need it**.

### For humans prompting agents

| Do | Don't |
|----|-------|
| Point the agent at a spec folder: `@.agents/specify/specs/001-service-health-status/` | Paste entire spec files into chat |
| Scope work to one app: `@apps/frontend/` | Ask the agent to "read the whole repo" |
| Reference FR IDs and story titles: "implement FR-004 per tasks.md Phase 1.3" | Re-describe requirements already in `spec.md` |
| Start a new session per feature phase or checkpoint | Carry full conversation history across unrelated features |
| Use `@apps/frontend/AGENTS.md` for frontend work | Load `plan.md` when you only need local coding conventions |

### How hierarchical `AGENTS.md` helps

Agents resolve the **nearest** `AGENTS.md` to the file being edited:

```
AGENTS.md                          ← monorepo-wide commands, spec index
apps/frontend/AGENTS.md            ← Next.js UI conventions, active feature pointers
packages/shared/AGENTS.md          ← pure TS rules, no React
```

Root `AGENTS.md` stays thin. Package-level files hold implementation detail so agents working in `apps/backend/` do not load frontend guidance (and vice versa).

### Spec artifact loading order

Load artifacts progressively — each level adds detail:

1. **`spec.md`** — start here for *what* (smallest, no tech)
2. **`plan.md`** — load when designing or reviewing architecture
3. **`tasks.md`** — load when implementing (file paths, checkpoints)
4. **`contracts/`** — load only for API/integration work

Skip levels you do not need. For a UI bugfix in an already-spec'd feature, `tasks.md` + local `AGENTS.md` is often enough.

### Session sizing tips

- **One feature, one session** — e.g. complete Phase 1.2 from `tasks.md`, run checkpoint, commit.
- **One package per session** — backend route work does not require frontend context.
- **Checkpoint before continuing** — run the test command listed in `tasks.md` to confirm the agent's work before moving to the next phase.
- **Keep `AGENTS.md` files under ~100 lines** — if they grow, split detail into the spec or a nested folder.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 10+

## Getting started

```bash
pnpm install
pnpm dev
pnpm test             # expect failures until tasks.md is implemented
```

Run a single app:

```bash
pnpm dev:frontend   # http://localhost:3000
pnpm dev:backend    # http://localhost:3001, /api/health
```

## Adding a new feature

1. Copy templates from [`.agents/templates/`](.agents/templates/) to `.agents/specify/specs/<NNN>-<feature-slug>/`.
2. Write and clarify `spec.md` → `plan.md` → `tasks.md`.
3. Add failing tests in the relevant apps/packages (TDD red phase).
4. Add or update local `AGENTS.md` in affected subfolders with feature pointers.
5. Execute `tasks.md` phase by phase, running checkpoints between each.

Use the [github-spec-kit skill](.agents/skills/github-spec-kit/SKILL.md) when authoring specs.

## Workspace packages

| Package | Purpose |
|---------|---------|
| `@repo/frontend` | Client-facing Next.js app with App Router |
| `@repo/backend` | API-focused Next.js app with route handlers |
| `@repo/shared` | Cross-app types and helpers |
| `@repo/typescript-config` | Shared TypeScript configs |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm test` | Run all workspace tests (TDD gate) |
| `pnpm lint` | Lint all workspaces |
| `pnpm typecheck` | Type-check all workspaces |

## Further reading

- [`.agents/README.md`](.agents/README.md) — Spec Kit layout, artifact reference, agent session playbook
- [`AGENTS.md`](AGENTS.md) — root agent instructions
- [GitHub Spec Kit](https://github.com/github/spec-kit) — upstream SDD toolkit
- [agents.md](https://agents.md/) — OpenAI `AGENTS.md` open standard
