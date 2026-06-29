import { useMemo, useState } from 'react'
import { STATUSES } from './constants'
import { useVacancies } from './useVacancies'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './components/Overview'
import HighlightCard from './components/HighlightCard'
import VacancyList from './components/VacancyList'
import VacancyModal from './components/VacancyModal'

export default function App() {
  const { vacancies, addVacancy, updateVacancy, removeVacancy } = useVacancies()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState({ open: false, initial: null })

  // Counts per status drive both the overview and the filter pills.
  const counts = useMemo(() => {
    const c = {}
    for (const v of vacancies) c[v.status] = (c[v.status] ?? 0) + 1
    return c
  }, [vacancies])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return vacancies
      .filter((v) => (filter === 'all' ? true : v.status === filter))
      .filter(
        (v) =>
          !q ||
          v.company.toLowerCase().includes(q) ||
          v.position.toLowerCase().includes(q),
      )
  }, [vacancies, filter, query])

  const openAdd = () => setModal({ open: true, initial: null })
  const openEdit = (v) => setModal({ open: true, initial: v })
  const closeModal = () => setModal({ open: false, initial: null })

  const handleSubmit = (data) => {
    if (modal.initial) updateVacancy(modal.initial.id, data)
    else addVacancy(data)
  }

  const filters = [{ key: 'all', label: 'All', count: vacancies.length }, ...STATUSES.map((s) => ({
    key: s.key,
    label: s.label,
    count: counts[s.key] ?? 0,
  }))]

  return (
    <div className="flex min-h-screen p-3 sm:p-5">
      <div className="flex w-full overflow-hidden rounded-[2.25rem] bg-white shadow-[0_30px_80px_-40px_rgba(20,23,28,0.35)]">
        <div className="hidden lg:block">
          {/* <Sidebar /> */}
        </div>

        {/* Main column */}
        <main className="flex-1 overflow-y-auto bg-white p-5 sm:p-7">
          <Topbar query={query} onQuery={setQuery} onAdd={openAdd} />

          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Overview counts={counts} total={vacancies.length} />
              <HighlightCard counts={counts} total={vacancies.length} />
            </div>

            {/* Pipeline list */}
            <section className="rounded-card bg-white p-5 ring-1 ring-line sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Your pipeline</h2>
                  <p className="text-sm text-muted">
                    {visible.length} of {vacancies.length} vacancies
                  </p>
                </div>

                {/* Filter pills */}
                <div className="flex flex-wrap gap-1.5">
                  {filters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        filter === f.key
                          ? 'bg-ink text-white'
                          : 'bg-canvas text-muted hover:text-ink'
                      }`}
                    >
                      {f.label}
                      <span
                        className={`ml-1.5 ${filter === f.key ? 'text-white/60' : 'text-muted/70'}`}
                      >
                        {f.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <VacancyList
                  vacancies={visible}
                  onStatus={(id, status) => updateVacancy(id, { status })}
                  onEdit={openEdit}
                  onRemove={removeVacancy}
                />
              </div>
            </section>
          </div>
        </main>
      </div>

      <VacancyModal
        open={modal.open}
        initial={modal.initial}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
