// Single source of truth for the application pipeline stages.
// These are Tailwind utility fragments so a status looks identical everywhere
// it is rendered (badge, dropdown, distribution bar, and the tinted row):
//   dot   – the colored status dot
//   text  – foreground text color
//   bg    – pill / badge background
//   bar   – solid color used in the distribution bar
//   row   – subtle row tint + matching hover when a status is selected
//   edge  – left accent stripe color for the row
export const STATUSES = [
  {
    key: 'found',
    label: 'Just found',
    dot: 'bg-slate-400',
    text: 'text-slate-600',
    bg: 'bg-slate-100',
    bar: 'bg-slate-300',
    row: 'bg-slate-50 hover:bg-slate-100/80',
    edge: 'bg-slate-300',
  },
  {
    key: 'cv_sent',
    label: 'CV sent',
    dot: 'bg-sky-500',
    text: 'text-sky-700',
    bg: 'bg-sky-100',
    bar: 'bg-sky-400',
    row: 'bg-sky-50 hover:bg-sky-100/70',
    edge: 'bg-sky-400',
  },
  {
    key: 'preinterview',
    label: 'Preinterview chat/mail',
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    bg: 'bg-violet-100',
    bar: 'bg-violet-400',
    row: 'bg-violet-50 hover:bg-violet-100/70',
    edge: 'bg-violet-400',
  },
  {
    key: 'chat_hr',
    label: 'Chat with HR',
    dot: 'bg-teal-500',
    text: 'text-teal-700',
    bg: 'bg-teal-100',
    bar: 'bg-teal-400',
    row: 'bg-teal-50 hover:bg-teal-100/70',
    edge: 'bg-teal-400',
  },
  {
    key: 'interview',
    label: 'Interview',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-100',
    bar: 'bg-amber-400',
    row: 'bg-amber-50 hover:bg-amber-100/70',
    edge: 'bg-amber-400',
  },
  {
    key: 'appointment',
    label: 'Appointment',
    dot: 'bg-indigo-500',
    text: 'text-indigo-700',
    bg: 'bg-indigo-100',
    bar: 'bg-indigo-400',
    row: 'bg-indigo-50 hover:bg-indigo-100/70',
    edge: 'bg-indigo-400',
  },
  {
    key: 'decline',
    label: 'Decline',
    dot: 'bg-rose-500',
    text: 'text-rose-700',
    bg: 'bg-rose-100',
    bar: 'bg-rose-400',
    row: 'bg-rose-50 hover:bg-rose-100/70',
    edge: 'bg-rose-400',
  },
  {
    key: 'hooray',
    label: 'HOOORAYY!',
    dot: 'bg-lime-500',
    text: 'text-lime-700',
    bg: 'bg-lime-100',
    bar: 'bg-lime-400',
    row: 'bg-lime-50 hover:bg-lime-100/70',
    edge: 'bg-lime-400',
  },
]

export const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.key, s]))

export const DEFAULT_STATUS = 'found'
