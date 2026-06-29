import { STATUSES } from '../constants'

// Hero "balance overview"-style card: a big headline number, a stacked
// distribution bar, and a per-stage legend with counts.
export default function Overview({ counts, total }) {
  const active = total - (counts.decline ?? 0)
  return (
    <section className="rounded-card bg-white p-6 lg:col-span-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">Applications tracked</p>
          <div className="mt-1 flex items-end gap-3">
            <span className="text-5xl font-semibold tracking-tight">{total}</span>
            <span className="mb-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-lime-700">
              {active} active
            </span>
          </div>
        </div>
        <div className="hidden gap-1 rounded-2xl bg-canvas p-1 text-xs font-medium text-muted sm:flex">
          <span className="rounded-xl bg-white px-3 py-1.5 text-ink shadow-sm">All time</span>
          <span className="px-3 py-1.5">30d</span>
        </div>
      </div>

      {/* Stacked distribution bar */}
      <div className="mt-7 flex h-3.5 w-full gap-1 overflow-hidden rounded-full">
        {total === 0 ? (
          <div className="h-full w-full bg-canvas" />
        ) : (
          STATUSES.map((s) => {
            const c = counts[s.key] ?? 0
            if (!c) return null
            return (
              <div
                key={s.key}
                className={`h-full rounded-full ${s.bar}`}
                style={{ width: `${(c / total) * 100}%` }}
                title={`${s.label}: ${c}`}
              />
            )
          })
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
        {STATUSES.map((s) => (
          <div key={s.key}>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              <span className="text-xs text-muted">{s.label}</span>
            </div>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{counts[s.key] ?? 0}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
