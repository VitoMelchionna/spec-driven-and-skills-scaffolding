# spec-template.md — High-Level Feature Specification

> Copy this template to `.agents/specify/specs/<NNN>-<feature-slug>/spec.md`
> Fill in every section. Non-goals and edge cases are REQUIRED.

---

# Feature: [Feature Name]

**Feature ID:** `NNN`
**Branch:** `NNN-feature-slug`
**Status:** Draft | In Review | Approved

## Overview

[One paragraph. What does this feature do? Who benefits? Why now?]

## Goals

- [Goal 1 — user/business value]
- [Goal 2]

## Non-Goals *(explicit out of scope for this iteration)*

- [We are NOT doing X]
- [Y will be addressed in a future spec]

---

## User Stories

### Story 1: [Title]

**As a** [role / user type]
**I want to** [action]
**So that** [value / outcome]

#### Acceptance Criteria

- [ ] Given [context], when [action], then [expected result]
- [ ] Given [context], when [action], then [expected result]
- [ ] Error: Given [bad input], when submitted, then [error message shown]

---

### Story 2: [Title]

**As a** [role]
**I want to** [action]
**So that** [value]

#### Acceptance Criteria

- [ ] Given ..., when ..., then ...

---

## Functional Requirements

### FR-001: [Requirement Title]

[Description. Be precise. Avoid "should" — use "must".]

### FR-002: [Requirement Title]

[Description.]

---

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | [e.g., List view loads in < 500ms p95] |
| Security | [e.g., All write operations require authenticated session] |
| Accessibility | [e.g., WCAG 2.1 AA compliant] |
| Scalability | [e.g., Supports up to 10,000 records without degradation] |
| Availability | [e.g., 99.9% uptime SLA] |

---

## Edge Cases & Error Handling

| Scenario | Expected Behavior |
|---|---|
| [User submits empty form] | [Show inline validation errors] |
| [Network timeout during save] | [Show retry prompt, preserve form state] |
| [Concurrent edits] | [Last-write-wins / optimistic locking] |
| [User lacks permission] | [Show 403 message, redirect to dashboard] |

---

## Dependencies & Assumptions

- **Depends on:** [Other features, APIs, or systems this relies on]
- **Assumes:** [What must be true for this feature to work]
- **Blocks:** [What downstream features depend on this]

---

## Clarifications

*(Populated during the clarification step — do not fill in advance)*

### Q: [Question]
**A:** [Answer]

---

## Review & Acceptance Checklist

- [ ] All user stories have testable acceptance criteria (Given/When/Then)
- [ ] Non-goals explicitly listed
- [ ] Edge cases and error states documented
- [ ] NFRs quantified (no vague terms like "fast" or "secure")
- [ ] Dependencies identified
- [ ] No tech stack mentioned (belongs in plan.md)
- [ ] Spec reviewed by a stakeholder or product owner
- [ ] Clarification loop completed