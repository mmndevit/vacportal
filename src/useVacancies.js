import { useEffect, useState } from 'react'
import { DEFAULT_STATUS } from './constants'

const STORAGE_KEY = 'vacancies-portal:v1'

const seed = [
  {
    id: 'seed-1',
    company: 'Linear',
    position: 'Senior Frontend Engineer',
    url: 'https://linear.app/careers',
    status: 'interview',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: 'seed-2',
    company: 'Vercel',
    position: 'Product Engineer',
    url: 'https://vercel.com/careers',
    status: 'cv_sent',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: 'seed-3',
    company: 'Figma',
    position: 'Design Engineer',
    url: 'https://figma.com/careers',
    status: 'found',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : seed
  } catch {
    return seed
  }
}

const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `v-${Date.now()}-${Math.random().toString(16).slice(2)}`

export function useVacancies() {
  const [vacancies, setVacancies] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vacancies))
    } catch {
      /* storage full or unavailable — keep working in-memory */
    }
  }, [vacancies])

  const addVacancy = (data) =>
    setVacancies((prev) => [
      {
        id: newId(),
        status: DEFAULT_STATUS,
        createdAt: Date.now(),
        ...data,
      },
      ...prev,
    ])

  const updateVacancy = (id, patch) =>
    setVacancies((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)))

  const removeVacancy = (id) => setVacancies((prev) => prev.filter((v) => v.id !== id))

  return { vacancies, addVacancy, updateVacancy, removeVacancy }
}
