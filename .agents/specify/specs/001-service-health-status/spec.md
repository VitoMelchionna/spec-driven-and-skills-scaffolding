# Feature: Service Health Status

**Feature ID:** `001`
**Branch:** `001-service-health-status`
**Status:** Approved (baseline scaffold)

## Overview

Operators and developers need a consistent way to verify that each service in the monorepo is running and reachable. This feature exposes a standardized health status shape shared across frontend and backend apps, with a public API endpoint and a UI surface that displays service identity and liveness.

## Goals

- Provide a single, shared health status contract used by all apps.
- Expose a backend health API suitable for uptime checks and local development verification.
- Display health status on the frontend home page for human-readable confirmation.

## Non-Goals *(explicit out of scope for this iteration)*

- Deep dependency checks (database, cache, third-party APIs).
- Authentication or authorization on health endpoints.
- Historical health metrics, alerting, or dashboards.
- Kubernetes-style liveness vs readiness split.

---

## User Stories

### Story 1: Check backend service health via API

**As a** developer or monitoring tool
**I want to** call a health endpoint on the backend app
**So that** I can confirm the API service is alive without loading the UI

#### Acceptance Criteria

- [ ] Given the backend app is running, when `GET /api/health` is requested, then the response status is `200`.
- [ ] Given a successful health response, when the body is parsed as JSON, then it contains `status`, `service`, and `timestamp` fields.
- [ ] Given a successful health response, when `status` is read, then its value is `"ok"`.
- [ ] Given a successful health response, when `service` is read, then its value is `"backend"`.
- [ ] Given a health request, when the response headers are inspected, then `Cache-Control` is `no-store`.
- [ ] Error: Given an unsupported method, when `POST /api/health` is sent, then the response status is `405`.

---

### Story 2: View frontend service health on the home page

**As a** developer
**I want to** see health status on the frontend home page
**So that** I can confirm the UI app is serving correctly during local development

#### Acceptance Criteria

- [ ] Given the frontend home page is loaded, when the health section renders, then it displays the service name `frontend`.
- [ ] Given the frontend home page is loaded, when the health section renders, then it displays status `ok`.
- [ ] Given the frontend home page is loaded, when the health section renders, then it displays a valid ISO-8601 timestamp.
- [ ] Given the health section is rendered, when inspected with accessibility tools, then service, status, and timestamp have associated labels (definition list or equivalent).

---

### Story 3: Share a common health contract across packages

**As a** maintainer
**I want to** define health types and factory logic in a shared package
**So that** frontend and backend stay aligned without duplicating shapes

#### Acceptance Criteria

- [ ] Given a non-empty service name, when `createHealthStatus(name)` is called, then it returns an object matching the `HealthStatus` type.
- [ ] Given a health status object, when `timestamp` is inspected, then it is a valid ISO-8601 string.
- [ ] Error: Given an empty service name, when `createHealthStatus("")` is called, then it throws a validation error.

---

## Functional Requirements

### FR-001: Shared HealthStatus type

The shared package must export a `HealthStatus` type with fields: `status` (literal `"ok"`), `service` (string), and `timestamp` (ISO-8601 string).

### FR-002: Health status factory

The shared package must export `createHealthStatus(service: string)` that builds a valid `HealthStatus` for the given service name.

### FR-003: Backend health route

The backend app must expose `GET /api/health` returning JSON produced via `@repo/shared`.

### FR-004: Frontend health display

The frontend app must render health information on the home page using `@repo/shared`, via a dedicated `HealthStatusCard` component.

---

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | `/api/health` responds in < 50ms p95 locally |
| Performance | Frontend health section renders without client-side fetch (server-rendered) |
| Security | Health endpoint returns no secrets or environment values |
| Accessibility | Health labels exposed to assistive tech (WCAG 2.1 AA for this section) |
| Consistency | Same JSON shape from shared helper and API response |

---

## Edge Cases & Error Handling

| Scenario | Expected Behavior |
|---|---|
| Empty service name passed to factory | Throw validation error with clear message |
| Unsupported HTTP method on `/api/health` | Return `405 Method Not Allowed` |
| Malformed client request body | N/A (GET only; no body) |

---

## Dependencies & Assumptions

- **Depends on:** Monorepo scaffold (`apps/frontend`, `apps/backend`, `packages/shared`).
- **Assumes:** Both apps run independently on ports 3000 and 3001.
- **Blocks:** Future observability features that extend the health contract.

---

## Clarifications

### Q: Should health responses be cacheable?
**A:** No. Responses must include `Cache-Control: no-store`.

### Q: Should empty service names be allowed?
**A:** No. `createHealthStatus` must reject empty strings.

### Q: Is client-side fetching required for the frontend health display?
**A:** No. Initial scaffold uses server-rendered data from `@repo/shared`.

---

## Review & Acceptance Checklist

- [x] All user stories have testable acceptance criteria (Given/When/Then)
- [x] Non-goals explicitly listed
- [x] Edge cases and error states documented
- [x] NFRs quantified (no vague terms like "fast" or "secure")
- [x] Dependencies identified
- [x] No tech stack mentioned (belongs in plan.md)
- [ ] Spec reviewed by a stakeholder or product owner
- [x] Clarification loop completed
