import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { GameCard } from "@/components/layout/game-card"
import { GameCardSkeleton } from "@/components/layout/game-card-skeleton"
import { PaginacionControl } from "@/components/layout/paginacion-control"
import { Button } from "@/components/ui/button"
import { useInfiniteGames, usePagedGames } from "../../hooks/use-games"
import type { Game, GamesQueryParams } from "@/types/rawg"


const PAGE_SIZE = 24

const MAX_PAGES = 500

interface GameGridProps {
  params: GamesQueryParams
  emptyMessage?: string
 
  mode?: "infinite" | "paged"
}

export function GameGrid({
  params,
  emptyMessage = "No se encontraron juegos.",
  mode = "infinite",
}: GameGridProps) {
  if (mode === "paged") {
    return <PagedGameGrid params={params} emptyMessage={emptyMessage} />
  }
  return <InfiniteGameGrid params={params} emptyMessage={emptyMessage} />
}

//los skeleton mientras carga el contenido

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}

function GridError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed py-16 text-center">
      <p className="text-muted-foreground">
        Ocurrió un error al cargar los juegos.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  )
}

function GameCards({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}

//scroll infinito

function InfiniteGameGrid({
  params,
  emptyMessage,
}: {
  params: GamesQueryParams
  emptyMessage: string
}) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGames(params)

  const { ref, inView } = useInView({ rootMargin: "400px" })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) return <GridSkeleton />
  if (isError) return <GridError onRetry={() => refetch()} />

  const games = data?.pages.flatMap((page: { results: Game[] }) => page.results) ?? []

  if (games.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <GameCards games={games} />
      <div ref={ref} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <span className="text-sm text-muted-foreground">
            Cargando más juegos...
          </span>
        )}
        {!hasNextPage && (
          <span className="text-sm text-muted-foreground">
            Has llegado al final.
          </span>
        )}
      </div>
    </div>
  )
}

//Paginación 

function PagedGameGrid({
  params,
  emptyMessage,
}: {
  params: GamesQueryParams
  emptyMessage: string
}) {
  const [page, setPage] = useState(1)

 
  useEffect(() => {
    setPage(1)
  }, [params])

  const { data, isLoading, isError, isPlaceholderData, refetch } =
    usePagedGames(params, page)

  if (isLoading) return <GridSkeleton />
  if (isError) return <GridError onRetry={() => refetch()} />

  const games = data?.results ?? []

  if (games.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  const totalPages = Math.min(
    MAX_PAGES,
    Math.ceil((data?.count ?? 0) / PAGE_SIZE),
  )

  const handlePageChange = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        className={isPlaceholderData ? "opacity-60 transition-opacity" : undefined}
      >
        <GameCards games={games} />
      </div>
      <PaginacionControl
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        disabled={isPlaceholderData}
      />
    </div>
  )
}
