import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { SearchBar } from "@/components/layout/search-bar"
import {
  FiltrosPanel,
  type FiltrosState,
} from "@/components/layout/panel-filtros"
import { GameGrid } from "@/components/layout/game-grid"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { GamesQueryParams } from "@/types/rawg"

const DEFAULT_FILTERS: FiltrosState = {
  genre: "",
  platform: "",
  ordering: "-relevance",
}

export function SearchPage() {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<FiltrosState>(DEFAULT_FILTERS)

  const params = useMemo<GamesQueryParams>(
    () => ({
      search: search || undefined,
      genres: filters.genre || undefined,
      platforms: filters.platform || undefined,
      ordering: filters.ordering,
    }),
    [search, filters],
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Explorar juegos</h1>
        <p className="text-muted-foreground">
          Busca por título y refina con filtros de género y plataforma.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        {/* Filtros en sheet para pantallas pequeñas */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-11 gap-2 lg:hidden">
              <SlidersHorizontal className="size-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Ajusta los resultados a tu gusto.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-6">
              <FiltrosPanel value={filters} onChange={setFilters} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Filtros fijos en escritorio */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FiltrosPanel value={filters} onChange={setFilters} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <GameGrid
            params={params}
            mode="paged"
            emptyMessage="No hay juegos que coincidan con tu búsqueda."
          />
        </div>
      </div>
    </div>
  )
}
