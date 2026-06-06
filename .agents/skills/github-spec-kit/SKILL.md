---
name: spec-kit
description: >
  Create high-quality software specifications following the github/spec-kit Spec-Driven Development (SDD) standard.
  Use this skill whenever the user wants to write a spec, create a technical plan, break down features into tasks,
  define user stories, draft a product requirements document, or structure a feature for AI-agent implementation.
  Also trigger when users mention "spec-driven", "speckit", "/speckit", "spec.md", "plan.md", "tasks.md",
  "constitution.md", or when they describe a feature they want to build and need a structured development artifact.
  This skill covers both the HIGH-LEVEL spec (what & why) and the LOW-LEVEL plan/tasks (how & when).
  When in doubt, use this skill — structured specs dramatically improve AI coding agent output quality.
---

# Spec-Driven Development (SDD) Skill

Based on [github/spec-kit](https://github.com/github/spec-kit) — the open-source toolkit for Spec-Driven Development.

## Core Philosophy

Spec-Driven Development **flips the script**: specifications are not scaffolding to throw away — they become the executable source of truth that directly guides implementation. Focus on **what** and **why** before **how**.

The workflow: **Constitution → Spec → Clarify → Plan → Tasks → Implement**

---

## Artifact Overview

| Artifact | File | Level | Purpose |
|---|---|---|---|
| Constitution | `constitution.md` | Project | Governing principles, standards, constraints |
| Specification | `spec.md` | Feature (High) | What to build & why — user stories, requirements |
| Plan | `plan.md` | Feature (Low) | How to build it — tech stack, architecture, data model |
| Tasks | `tasks.md` | Feature (Low) | Ordered, actionable implementation steps |

All feature artifacts live under `.agents/specify/specs/<NNN>-<feature-slug>/` in this repository (the same `specify/specs/` layout as [github/spec-kit](https://github.com/github/spec-kit), hosted under `.agents/`).

---

## Step 1: Constitution (Project Principles)

Create once per project. Guides all future specs and plans.

**Prompt pattern:**
> "Create principles focused on [code quality / testing standards / UX consistency / performance / security / compliance]. Include governance for how these principles should guide technical decisions."

**constitution.md must include:**
- Code quality standards (linting, formatting, coverage thresholds)
- Testing approach (unit, integration, e2e expectations)
- Architecture constraints (allowed/disallowed patterns)
- Performance budgets
- Security requirements
- Naming and folder conventions
- How AI agents should reference this document

---

## Step 2: Specification — High-Level Spec (`spec.md`)

This is the **what and why**. No tech stack yet.

**Prompt pattern:**
> "Build [feature description]. Focus: [user value]. Constraints: [non-functional requirements]."

**spec.md structure:**

```markdown
# Feature: <Name>

## Overview
One paragraph: what this feature does and why it matters.

## Goals
- Goal 1
- Goal 2

## Non-Goals (explicit out of scope)
- Not doing X in this iteration

## User Stories
### Story 1: <Title>
**As a** [role]
**I want to** [action]
**So that** [value/outcome]

#### Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] ...

### Story 2: ...

## Functional Requirements
### FR-001: <Requirement Title>
Description of the requirement.

### FR-002: ...

## Non-Functional Requirements
- Performance: [e.g., page loads < 2s]
- Security: [e.g., auth required for all mutations]
- Accessibility: [e.g., WCAG 2.1 AA]

## Edge Cases & Error Handling
- What happens when [edge case]?

## Review & Acceptance Checklist
- [ ] All user stories have acceptance criteria
- [ ] Non-goals explicitly listed
- [ ] Edge cases documented
- [ ] NFRs quantified where possible
- [ ] Spec reviewed by stakeholder
```

**Key rules for spec.md:**
- Write user stories from the user's perspective, not the system's
- Acceptance criteria use Given/When/Then format
- Be explicit about NON-GOALS — this prevents scope creep
- Do NOT mention tech stack here
- Each acceptance criterion must be testable

---

## Step 3: Clarification (before planning)

Run structured clarification before creating a plan to reduce downstream rework.

**Clarification process:**
1. Read `spec.md` carefully
2. Identify gaps: ambiguous requirements, missing edge cases, unstated constraints
3. Ask sequential, coverage-based questions — one topic at a time
4. Record answers in a `## Clarifications` section appended to `spec.md`

**Common clarification areas:**
- Authentication & authorization model
- Data ownership and permissions
- Pagination / infinite scroll / limits
- Mobile vs desktop behavior
- Offline behavior
- Error states (empty states, loading, failure)
- Notification/email requirements
- Internationalization needs
- Rollback / undo behavior

After clarification, validate the **Review & Acceptance Checklist** in `spec.md` — check off each item that passes, leave unchecked what doesn't.

---

## Step 4: Technical Plan — Low-Level Plan (`plan.md`)

This is the **how**. Now you specify the tech stack.

**Prompt pattern:**
> "We're using [tech stack]. Build the plan with [architecture choices]."

**plan.md structure:**

```markdown
# Implementation Plan: <Feature Name>

## Tech Stack
- Frontend: [framework, version]
- Backend: [language/framework, version]
- Database: [DB, version]
- Infrastructure: [cloud provider, services]
- Key libraries: [list with versions]

## Architecture Overview
High-level diagram or description of components and their relationships.

## Data Model
### Entity: <Name>
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK, auto | |
| ... | | | |

### Relationships
- Entity A → Entity B: [one-to-many / many-to-many / etc.]

## API Design
### Endpoint: POST /api/resource
- Auth: Required (role: X)
- Request: `{ field: type }`
- Response: `{ field: type }`
- Errors: 400, 401, 404, 409

## Component Structure
```
src/
├── components/
│   └── FeatureName/
│       ├── index.tsx
│       └── FeatureName.test.tsx
├── services/
│   └── featureService.ts
└── types/
    └── feature.ts
```

## Implementation Phases
### Phase 1: Foundation (Core data + API)
- Set up DB migrations
- Implement core service layer
- Build basic API endpoints

### Phase 2: UI Components
- ...

### Phase 3: Integration & Polish
- ...

## Research Notes
Areas of uncertainty that need investigation before/during implementation.

## Open Questions
- [ ] Question 1 (owner: ?)
- [ ] Question 2
```

**Key rules for plan.md:**
- Pin versions for all dependencies
- Define the data model before the API
- Define the API before the UI
- Include error states in API design
- Flag rapidly-changing libraries for extra research
- Each phase should deliver independently testable value

---

## Step 5: Task Breakdown (`tasks.md`)

Break the plan into an ordered, actionable list an AI agent can execute task by task.

**tasks.md structure:**

```markdown
# Tasks: <Feature Name>

## Story 1: <User Story Title>

### Phase 1.1: Data Layer
- [ ] Create migration: add `table_name` table with fields [id, name, created_at]
  - File: `db/migrations/001_create_table_name.sql`
- [ ] Implement `TableNameRepository` with CRUD methods
  - File: `src/repositories/tableNameRepository.ts`
- [P] Write unit tests for repository
  - File: `src/repositories/tableNameRepository.test.ts`

**Checkpoint:** Database layer functional, all tests passing.

### Phase 1.2: Service Layer
- [ ] Implement `FeatureService` with business logic
  - File: `src/services/featureService.ts`
- [P] Write unit tests for service
  - File: `src/services/featureService.test.ts`

**Checkpoint:** Service layer returns correct data, edge cases handled.

### Phase 1.3: API Layer
- [ ] Implement `POST /api/feature` endpoint
  - File: `src/api/feature.ts`
- [ ] Add auth middleware
- [P] Write integration tests
  - File: `src/api/feature.test.ts`

**Checkpoint:** API responds correctly, auth enforced, errors handled.

### Phase 1.4: UI
- [ ] Build `FeatureList` component
  - File: `src/components/FeatureList/index.tsx`
- [ ] Build `FeatureForm` component
  - File: `src/components/FeatureForm/index.tsx`
- [P] Write component tests

**Checkpoint:** UI renders correctly, connected to API.

## Story 2: ...
```

**Key rules for tasks.md:**
- Tasks are ordered respecting dependencies (models → services → endpoints → UI)
- Mark parallelizable tasks with `[P]`
- Every task specifies the exact file path
- Each phase ends with a **Checkpoint** — a validation gate
- Test tasks are written alongside (or before) implementation tasks
- Tasks must be small enough to complete in one agent session

---

## Workflow Summary

```
User describes feature
        ↓
[constitution.md exists?] → No → Create constitution first
        ↓ Yes
Create spec.md (what & why, no tech)
        ↓
Run clarification loop → append answers to spec.md
        ↓
Validate Review & Acceptance Checklist
        ↓
Create plan.md (how — tech stack, architecture, data model)
        ↓
Research rapidly-changing dependencies if needed
        ↓
Generate tasks.md (ordered, file-specific, parallelism marked)
        ↓
[AI agent executes tasks.md]
```

---

## Common Patterns by Request Type

**"Help me write a spec for X"** → Go to Step 2, produce `spec.md`

**"Create a technical plan for X"** → Steps 2+4, produce `spec.md` + `plan.md`

**"Break this down into tasks"** → Step 5, produce `tasks.md` from existing plan

**"Set up my project with SDD"** → Step 1 first, then ask what to build

**"Review my spec"** → Check against the Review & Acceptance Checklist, identify gaps

**Full feature from scratch** → All 5 steps in order

---

## Quality Checks

Before finalizing any artifact, verify:

**spec.md:**
- Every user story has testable acceptance criteria
- Non-goals are explicit
- NFRs are quantified (not "fast", say "< 200ms p95")
- Edge cases documented

**plan.md:**
- Dependencies pinned to versions
- Data model defined before API
- Auth/permissions specified per endpoint
- Each phase independently testable

**tasks.md:**
- Tasks ordered by dependency (no task requires a file not yet created)
- Every task has a file path
- Checkpoints present after each phase
- `[P]` markers used where genuinely parallel

---

## File Structure Reference

```
.agents/
├── memory/
│   └── constitution.md          ← project-wide principles
├── specify/
│   └── specs/
│       └── 001-feature-name/
│           ├── spec.md          ← high-level: what & why
│           ├── plan.md          ← low-level: how
│           ├── tasks.md         ← execution: ordered steps
│           ├── research.md      ← tech research notes (optional)
│           ├── data-model.md    ← detailed schema (optional)
│           └── contracts/
│               ├── api-spec.md  ← REST contract (optional)
│               └── events.md    ← async event contracts (optional)
├── skills/
│   └── github-spec-kit/
│       └── SKILL.md             ← authoring guide for this workflow
└── templates/
    ├── spec-template.md
    ├── plan-template.md
    └── tasks-template.md
```

---

## Tips for AI-Agent Readability

When writing specs and plans that AI agents will execute:
- Use exact file paths, not vague descriptions
- Prefer numbered requirements (`FR-001`) for traceability
- Make acceptance criteria binary (pass/fail), not subjective
- In tasks.md, one task = one file or one logical change
- Write checkpoints that an agent can self-validate programmatically
- Avoid "and" in a single task — split into two tasks
- Reference constitution.md constraints explicitly in the plan when relevant