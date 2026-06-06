# AGENTS.md — `.agents/`

Agent orchestration and spec-driven development assets for this repository.

## Purpose

This directory is the **source of truth for AI-assisted planning**, not runtime application code.

## Structure

```
.agents/
├── memory/
│   └── constitution.md       ← Project principles (read first)
├── specify/
│   └── specs/
│       └── <NNN>-<slug>/     ← spec.md, plan.md, tasks.md, contracts/
├── skills/
│   └── github-spec-kit/    ← SDD authoring skill
└── templates/              ← Copy sources for new specs
```

## When to Use What

| Need | Read |
|------|------|
| Project standards | `memory/constitution.md` |
| What to build | `specify/specs/*/spec.md` |
| How to build | `specify/specs/*/plan.md` |
| Step-by-step execution | `specify/specs/*/tasks.md` |
| API contracts | `specify/specs/*/contracts/` |
| Authoring new specs | `skills/github-spec-kit/SKILL.md` |

## Creating a New Feature

1. Copy templates from `templates/` to `specify/specs/<NNN>-<feature-slug>/`.
2. Write `spec.md` — no tech stack.
3. Run clarification; append to `spec.md`.
4. Write `plan.md` and `tasks.md`.
5. Add failing tests in the target app/package **before** implementation.

## Token Optimization

- Load only the spec folder for the feature you are implementing.
- Do not paste entire specs into chat; reference paths and FR IDs.
- Subfolder `AGENTS.md` files contain implementation-level detail — prefer those when editing app code.
