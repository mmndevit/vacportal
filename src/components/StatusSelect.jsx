import { STATUSES, STATUS_MAP } from '../constants'
import { ChevronDownIcon } from '../icons'

// A native <select> styled to look like a colored status pill. Native is used
// deliberately: accessible, keyboard-friendly, and zero dependencies. The colored
// chrome comes from the wrapper that mirrors the selected status colors.
export default function StatusSelect({ value, onChange, className = '' }) {
  const s = STATUS_MAP[value] ?? STATUSES[0]
  return (
    <span
      className={`relative inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-7 py-1 text-xs font-medium ${s.bg} ${s.text} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
      <ChevronDownIcon className="pointer-events-none absolute right-2 h-3.5 w-3.5 opacity-70" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Change status"
      >
        {STATUSES.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  )
}
