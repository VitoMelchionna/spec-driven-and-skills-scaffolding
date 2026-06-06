/**
 * Story 2: View frontend service health on the home page
 * Spec: .agents/specify/specs/001-service-health-status/spec.md
 * FR-004
 *
 * TDD: Red phase — HealthStatusCard not yet implemented (tasks.md Phase 1.3).
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HealthStatusCard } from "../components/health/HealthStatusCard";

const sampleHealth = {
  status: "ok" as const,
  service: "frontend",
  timestamp: "2026-06-06T12:00:00.000Z",
};

describe("HealthStatusCard (Story 2)", () => {
  it("displays service name frontend", () => {
    render(<HealthStatusCard health={sampleHealth} />);
    expect(screen.getByText("frontend")).toBeInTheDocument();
  });

  it("displays status ok", () => {
    render(<HealthStatusCard health={sampleHealth} />);
    expect(screen.getByText("ok")).toBeInTheDocument();
  });

  it("displays ISO-8601 timestamp with accessible labels", () => {
    render(<HealthStatusCard health={sampleHealth} />);

    expect(screen.getByText("2026-06-06T12:00:00.000Z")).toBeInTheDocument();
    expect(screen.getByText("Service")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Timestamp")).toBeInTheDocument();
  });
});
