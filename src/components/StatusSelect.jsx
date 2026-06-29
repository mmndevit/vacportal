import { useEffect, useRef, useState } from 'react'
import { STATUSES, STATUS_MAP } from '../constants'
import { ChevronDownIcon } from '../icons'

// Custom dropdown so each option can carry its own color (a colored dot + a
// tinted highlight). Native <option> backgrounds aren't reliably styleable
// across browsers, so we render our own popover. Closes on outside click / Esc.
export default function StatusSelect({ value, onChange, className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const s = STATUS_MAP[value] ?? STATUSES[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (key) => {
    onChange(key)
    setOpen(false)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-2.5 pr-2 text-xs font-medium transition ${s.bg} ${s.text}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
        {s.label}
        <ChevronDownIcon
          className={`h-3.5 w-3.5 opacity-70 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-line"
        >
          {STATUSES.map((o) => {
            const selected = o.key === value
            return (
              <li key={o.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => pick(o.key)}
                  className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-medium transition ${o.bg} ${o.text} opacity-80 hover:opacity-100 ${
                    selected ? 'opacity-100 ring-1 ring-inset ring-black/10' : ''
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${o.dot}`} />
                  {o.label}
                  {selected && <span className="ml-auto text-sm leading-none">✓</span>}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
