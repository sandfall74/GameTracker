import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Game } from "@/types/rawg"

export type LibraryStatus = "playing" | "completed" | "backlog" | "dropped"

export interface LibraryEntry {
  id: number
  slug: string
  name: string
  background_image: string | null
  rating: number
  released: string | null
  status: LibraryStatus
  addedAt: number
}

interface LibraryContextValue {
  entries: LibraryEntry[]
  getEntry: (id: number) => LibraryEntry | undefined
  isTracked: (id: number) => boolean
  addOrUpdate: (game: Game, status: LibraryStatus) => void
  remove: (id: number) => void
}

const LibraryContext = createContext<LibraryContextValue | null>(null)

const STORAGE_KEY = "rawg-tracker-library"

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<LibraryEntry[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as LibraryEntry[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addOrUpdate = useCallback((game: Game, status: LibraryStatus) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.id === game.id)
      if (existing) {
        return prev.map((e) => (e.id === game.id ? { ...e, status } : e))
      }
      return [
        {
          id: game.id,
          slug: game.slug,
          name: game.name,
          background_image: game.background_image,
          rating: game.rating,
          released: game.released,
          status,
          addedAt: Date.now(),
        },
        ...prev,
      ]
    })
  }, [])

  const remove = useCallback((id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const getEntry = useCallback(
    (id: number) => entries.find((e) => e.id === id),
    [entries],
  )

  const isTracked = useCallback(
    (id: number) => entries.some((e) => e.id === id),
    [entries],
  )

  const value = useMemo(
    () => ({ entries, getEntry, isTracked, addOrUpdate, remove }),
    [entries, getEntry, isTracked, addOrUpdate, remove],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) {
    throw new Error("useLibrary debe usarse dentro de <LibraryProvider>")
  }
  return ctx
}

export const STATUS_LABELS: Record<LibraryStatus, string> = {
  playing: "Jugando",
  completed: "Completado",
  backlog: "Pendiente",
  dropped: "Abandonado",
}
