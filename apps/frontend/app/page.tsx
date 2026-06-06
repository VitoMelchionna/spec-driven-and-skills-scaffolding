import { createHealthStatus } from "@repo/shared";

const health = createHealthStatus("frontend");

export default function HomePage() {
  return (
    <main className="container">
      <section className="card">
        <p className="eyebrow">apps/frontend</p>
        <h1>Next.js Frontend</h1>
        <p>
          Placeholder UI app for the monorepo scaffold. Use this package for
          pages, layouts, and client-facing routes.
        </p>
        <dl className="meta">
          <div>
            <dt>Service</dt>
            <dd>{health.service}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{health.status}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
