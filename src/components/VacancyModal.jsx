import { useEffect, useRef, useState } from 'react'
import { STATUSES, DEFAULT_STATUS } from '../constants'
import { CloseIcon } from '../icons'

const empty = { company: '', position: '', url: '', status: DEFAULT_STATUS }

// Add / edit dialog. When `initial` is provided it edits that record,
// otherwise it creates a new one. Submits a clean payload to `onSubmit`.
export default function VacancyModal({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = useState(empty)
  const firstField = useRef(null)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...empty, ...initial } : empty)
      // focus after paint
      requestAnimationFrame(() => firstField.current?.focus())
    }
  }, [open, initial])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const company = form.company.trim()
    const position = form.position.trim()
    if (!company || !position) return
    onSubmit({ ...form, company, position, url: form.url.trim() })
    onClose()
  }

  const field =
    'w-full rounded-2xl bg-canvas px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-ink/10'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} />

      <form
        onSubmit={submit}
        className="relative w-full max-w-md rounded-card bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {initial ? 'Edit vacancy' : 'New vacancy'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-canvas hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Company</label>
            <input
              ref={firstField}
              value={form.company}
              onChange={set('company')}
              placeholder="e.g. Stripe"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Position</label>
            <input
              value={form.position}
              onChange={set('position')}
              placeholder="e.g. Frontend Engineer"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Job URL</label>
            <input
              type="url"
              value={form.url}
              onChange={set('url')}
              placeholder="https://…"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Status</label>
            <div className="relative">
              <select
                value={form.status}
                onChange={set('status')}
                className={`${field} cursor-pointer appearance-none pr-10`}
              >
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl bg-canvas py-3 text-sm font-semibold text-ink transition hover:bg-canvas/70"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-ink py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {initial ? 'Save changes' : 'Add vacancy'}
          </button>
        </div>
      </form>
    </div>
  )
}
