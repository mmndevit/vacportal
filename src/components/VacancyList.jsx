import StatusSelect from './StatusSelect'
import { STATUS_MAP } from '../constants'
import { LinkIcon, PencilIcon, TrashIcon, BriefcaseIcon } from '../icons'

const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function Row({ v, onStatus, onEdit, onRemove }) {
  const host = hostOf(v.url)
  const s = STATUS_MAP[v.status]
  return (
    <div
      className={`group relative grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl px-4 py-3 pl-5 transition sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto_auto] ${s?.row ?? 'hover:bg-canvas/60'}`}
    >
      {/* Status accent stripe on the leading edge */}
      <span className={`absolute inset-y-2 left-1.5 w-1 rounded-full ${s?.edge ?? ''}`} />

      {/* Company + position */}
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/70 text-sm font-semibold uppercase text-ink ring-1 ring-black/5">
          {v.company.slice(0, 2)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{v.position}</p>
          <p className="truncate text-xs text-muted">{v.company}</p>
        </div>
      </div>

      {/* Link / meta — hidden on small screens */}
      <div className="hidden min-w-0 flex-col sm:flex">
        {v.url ? (
          <a
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 truncate text-xs font-medium text-sky-600 hover:underline"
          >
            <LinkIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{host ?? 'Open link'}</span>
          </a>
        ) : (
          <span className="text-xs text-muted">No link</span>
        )}
        <span className="mt-0.5 text-xs text-muted">Added {fmtDate(v.createdAt)}</span>
      </div>

      {/* Status */}
      <div className="justify-self-start sm:justify-self-center">
        <StatusSelect value={v.status} onChange={(s) => onStatus(v.id, s)} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 justify-self-end opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <button
          onClick={() => onEdit(v)}
          className="grid h-9 w-9 place-items-center rounded-xl text-muted transition hover:bg-white hover:text-ink"
          title="Edit"
        >
          <PencilIcon className="h-4.5 w-4.5" />
        </button>
        <button
          onClick={() => onRemove(v.id)}
          className="grid h-9 w-9 place-items-center rounded-xl text-muted transition hover:bg-white hover:text-rose-600"
          title="Delete"
        >
          <TrashIcon className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  )
}

export default function VacancyList({ vacancies, onStatus, onEdit, onRemove }) {
  if (vacancies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas text-muted">
          <BriefcaseIcon className="h-6 w-6" />
        </span>
        <p className="mt-4 text-sm font-semibold">No vacancies here yet</p>
        <p className="mt-1 text-sm text-muted">Add a job or adjust your filters.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {vacancies.map((v) => (
        <Row key={v.id} v={v} onStatus={onStatus} onEdit={onEdit} onRemove={onRemove} />
      ))}
    </div>
  )
}
