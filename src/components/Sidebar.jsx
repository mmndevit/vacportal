import {
  GridIcon,
  BriefcaseIcon,
  ChartIcon,
  CalendarIcon,
  LifebuoyIcon,
  SparkIcon,
  ChevronsLeftIcon,
} from '../icons'

const NAV = [
  { label: 'Dashboard', icon: GridIcon, active: true },
  { label: 'Vacancies', icon: BriefcaseIcon },
  { label: 'Analytics', icon: ChartIcon },
  { label: 'Calendar', icon: CalendarIcon },
]

const NAV_SECONDARY = [{ label: 'Support', icon: LifebuoyIcon }]

function NavItem({ icon: Icon, label, active }) {
  return (
    <button
      className={`group flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition
        ${
          active
            ? 'bg-canvas text-ink'
            : 'text-muted hover:bg-canvas/60 hover:text-ink'
        }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  )
}

export default function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col px-4 py-6">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-3.5 pb-8">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-brand">
          <BriefcaseIcon className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold tracking-tight">
          Hunt<span className="text-brand">.</span>
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="my-5 h-px bg-line" />

      <nav className="flex flex-col gap-1">
        {NAV_SECONDARY.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div className="rounded-3xl bg-ink p-5 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink">
            <SparkIcon className="h-5 w-5" />
          </span>
          <p className="mt-3.5 text-sm font-semibold">Land faster with Pro</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            Reminders, follow-ups and salary insights for every application.
          </p>
          <button className="mt-4 w-full rounded-xl bg-brand py-2 text-sm font-semibold text-ink transition hover:brightness-105">
            Upgrade now
          </button>
        </div>

        <button className="flex items-center gap-2 px-3.5 text-sm font-medium text-muted transition hover:text-ink">
          <ChevronsLeftIcon className="h-4.5 w-4.5" />
          Collapse sidebar
        </button>
      </div>
    </aside>
  )
}
