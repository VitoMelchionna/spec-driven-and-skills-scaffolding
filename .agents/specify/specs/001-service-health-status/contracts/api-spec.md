# API Contract: Health Status

**Feature:** `001-service-health-status`
**Version:** 1.0.0 (baseline)

---

## `GET /api/health`

Returns the liveness status of the backend service.

### Request

- **Method:** `GET`
- **Auth:** None
- **Body:** None

### Response

- **Status:** `200 OK`
- **Headers:**
  - `Content-Type: application/json`
  - `Cache-Control: no-store`
- **Body:**

```json
{
  "status": "ok",
  "service": "backend",
  "timestamp": "2026-06-06T12:00:00.000Z"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `status` | `"ok"` | Yes | Liveness indicator |
| `service` | `string` | Yes | Service identifier (`"backend"`) |
| `timestamp` | `string` | Yes | ISO-8601 UTC timestamp at generation time |

### Errors

| Status | Condition | Body |
|---|---|---|
| `405` | Method not `GET` | Next.js default or `{ "error": "Method Not Allowed" }` |

---

## TypeScript Reference

```typescript
type HealthStatus = {
  status: "ok";
  service: string;
  timestamp: string;
};
```

Source of truth: `packages/shared/src/health.ts` (planned) / `packages/shared/src/index.ts` (current).
