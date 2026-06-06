/**
 * Story 3: Share a common health contract across packages
 * Spec: .agents/specify/specs/001-service-health-status/spec.md
 * FR-001, FR-002
 *
 * TDD: Red phase — tests define target behavior before implementation.
 */
import { describe, expect, it } from "vitest";
import { createHealthStatus } from "../src/index";

describe("createHealthStatus (Story 3)", () => {
  it("returns HealthStatus with status ok, service name, and ISO timestamp", () => {
    const result = createHealthStatus("backend");

    expect(result.status).toBe("ok");
    expect(result.service).toBe("backend");
    expect(result.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });

  it("throws when service name is empty (FR-002 validation)", () => {
    expect(() => createHealthStatus("")).toThrow(/service/i);
  });
});
