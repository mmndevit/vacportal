import { SearchIcon, BellIcon, SettingsIcon, PlusIcon } from '../icons'

export default function Topbar({ query, onQuery, onAdd }) {
  return (
    <header className="flex items-center gap-3 pb-6">
      <label className="flex flex-1 items-center gap-3 rounded-2xl bg-canvas px-4 py-3 text-muted focus-within:ring-2 focus-within:ring-ink/10">
        <SearchIcon className="h-5 w-5 shrink-0" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search company or position…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </label>

      {/* <button className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas text-ink transition hover:bg-canvas/70">
        <BellIcon className="h-5 w-5" />
      </button>
      <button className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas text-ink transition hover:bg-canvas/70">
        <SettingsIcon className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3 rounded-2xl bg-canvas py-2 pl-2 pr-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-semibold text-brand">
          A
        </span>
        <div className="hidden leading-tight sm:block">
          <p className="text-sm font-semibold">Alex Morgan</p>
          <p className="text-xs text-muted">job seeker</p>
        </div>
      </div> */}

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
      >
        <PlusIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Add vacancy</span>
      </button>
    </header>
  )
}
