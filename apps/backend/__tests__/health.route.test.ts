/**
 * Story 1: Check backend service health via API
 * Spec: .agents/specify/specs/001-service-health-status/spec.md
 * Contract: .agents/specify/specs/001-service-health-status/contracts/api-spec.md
 *
 * TDD: Red phase — route must be hardened per tasks.md Phase 1.2.
 */
import { describe, expect, it } from "vitest";
import { GET } from "../app/api/health/route";

describe("GET /api/health (Story 1)", () => {
  it("returns 200 with status, service, and timestamp", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.service).toBe("backend");
    expect(body.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });

  it("sets Cache-Control: no-store on success", async () => {
    const response = await GET();

    expect(response.headers.get("cache-control")).toBe("no-store");
  });
});

describe("POST /api/health (Story 1 — unsupported method)", () => {
  it("returns 405 Method Not Allowed", async () => {
    const route = await import("../app/api/health/route");
    expect(route.POST).toBeDefined();
    const response = await route.POST!();
    expect(response.status).toBe(405);
  });
});
