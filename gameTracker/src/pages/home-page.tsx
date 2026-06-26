import { useMemo } from "react"
import { GameGrid } from "@/components/layout/game-grid"
import type { GamesQueryParams } from "@/types/rawg"

export function HomePage() {
  
  const params = useMemo<GamesQueryParams>(() => {
    const today = new Date()
    const lastYear = new Date()
    lastYear.setFullYear(today.getFullYear() - 1)
    const fmt = (d: Date) => d.toISOString().slice(0, 10)
    return {
      ordering: "-added",
      dates: `${fmt(lastYear)},${fmt(today)}`,
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Descubre y rastrea tus juegos
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Explora los títulos más populares, busca por género o plataforma y
          lleva el control de lo que estás jugando, lo que completaste y tu lista
          de pendientes.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Tendencias del último año</h2>
        <GameGrid params={params} mode="paged" />
      </section>
    </div>
  )
}
