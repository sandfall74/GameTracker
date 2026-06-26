import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CriticScore } from "@/components/layout/score-critic"
import { PlatformIcons } from "@/components/layout/plataform-icons"
import { LibreriaStatusMenu } from "@/components/layout/libreria-status-menu"
import type { Game } from "@/types/rawg"

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const year = game.released ? new Date(game.released).getFullYear() : null

  return (
    <Card className="group flex flex-col gap-0 overflow-hidden p-0 transition-colors hover:border-primary/60">
      <Link
        to={`/game/${game.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
      >
        {game.background_image ? (
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            Sin imagen
          </div>
        )}
        <PlatformIcons
          platforms={game.parent_platforms}
          className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 backdrop-blur"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/game/${game.slug}`}
            className="text-pretty font-semibold leading-tight hover:text-primary"
          >
            {game.name}
          </Link>
          <CriticScore score={game.metacritic} />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-chart-4 text-chart-4" />
            {game.rating ? game.rating.toFixed(1) : "—"}
          </span>
          {year && <span>· {year}</span>}
        </div>

        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {game.genres.slice(0, 3).map((g) => (
              <Badge key={g.id} variant="secondary" className="font-normal">
                {g.name}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto pt-1">
          <LibreriaStatusMenu game={game} className="w-full" />
        </div>
      </div>
    </Card>
  )
}
