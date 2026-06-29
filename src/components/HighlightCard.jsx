import { SparkIcon } from '../icons'

// Compact KPI card that sits beside the overview: response rate + offers.
export default function HighlightCard({ counts, total }) {
  const responded = (counts.cv_sent ?? 0) + (counts.interview ?? 0) + (counts.hooray ?? 0)
  const rate = total ? Math.round((responded / total) * 100) : 0
  const offers = counts.hooray ?? 0

  return (
    <section className="flex flex-col justify-between rounded-card bg-ink p-6 text-white">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">Response rate</p>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink">
          <SparkIcon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-semibold tracking-tight">{rate}%</span>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-brand" style={{ width: `${rate}%` }} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="text-sm text-white/60">Offers landed</p>
        <p className="text-lg font-semibold text-brand">
          {offers} 🎉
        </p>
      </div>
    </section>
  )
}
