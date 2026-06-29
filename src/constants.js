// Single source of truth for the application pipeline stages.
// `dot`/`text`/`bg`/`ring` are Tailwind utility fragments so badges and
// charts stay visually consistent everywhere a status is rendered.
export const STATUSES = [
  {
    key: 'found',
    label: 'Just found',
    dot: 'bg-slate-400',
    text: 'text-slate-600',
    bg: 'bg-slate-100',
    bar: 'bg-slate-300',
  },
  {
    key: 'cv_sent',
    label: 'CV sent',
    dot: 'bg-sky-500',
    text: 'text-sky-700',
    bg: 'bg-sky-50',
    bar: 'bg-sky-400',
  },
  {
    key: 'interview',
    label: 'Interview',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    bar: 'bg-amber-400',
  },
  {
    key: 'decline',
    label: 'Decline',
    dot: 'bg-rose-500',
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    bar: 'bg-rose-400',
  },
  {
    key: 'hooray',
    label: 'HOOORAYY!',
    dot: 'bg-lime-500',
    text: 'text-lime-700',
    bg: 'bg-lime-50',
    bar: 'bg-lime-400',
  },
]

export const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.key, s]))

export const DEFAULT_STATUS = 'found'
