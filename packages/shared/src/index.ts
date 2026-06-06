export type HealthStatus = {
  status: "ok";
  service: string;
  timestamp: string;
};

export function createHealthStatus(service: string): HealthStatus {
  return {
    status: "ok",
    service,
    timestamp: new Date().toISOString(),
  };
}
