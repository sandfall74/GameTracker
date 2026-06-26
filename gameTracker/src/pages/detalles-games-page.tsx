import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, ExternalLink, Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { CriticScore } from "@/components/layout/score-critic"
import { PlatformIcons } from "@/components/layout/plataform-icons"
import { LibreriaStatusMenu } from "@/components/layout/libreria-status-menu"
import { useGameDetails, useGameScreenshots } from "@/hooks/use-games"

export function DetallesGamePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: game, isLoading, isError } = useGameDetails(slug)
  const { data: screenshots } = useGameScreenshots(slug)

  if (isLoading) {
    return <GameDetailSkeleton />
  }

  if (isError || !game) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-muted-foreground">
          No se pudo cargar la información de este juego.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    )
  }

  const year = game.released ? new Date(game.released).getFullYear() : null
  const shots = screenshots?.results ?? []

  return (
    <div className="flex flex-col gap-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit gap-2">
        <Link to="/search">
          <ArrowLeft className="size-4" />
          Volver
        </Link>
      </Button>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl border border-border">
        {game.background_image && (
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            className="h-64 w-full object-cover sm:h-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {game.name}
            </h1>
            <CriticScore score={game.metacritic} className="h-7 text-sm" />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-chart-4 text-chart-4" />
              {game.rating ? game.rating.toFixed(1) : "—"}
            </span>
            {year && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {year}
              </span>
            )}
            {game.playtime > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {game.playtime}h de media
              </span>
            )}
            <PlatformIcons platforms={game.parent_platforms} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {game.genres?.map((g) => (
            <Badge key={g.id} variant="secondary">
              {g.name}
            </Badge>
          ))}
        </div>
        <LibreriaStatusMenu game={game} size="default" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Screenshots */}
          {shots.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Capturas</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {shots.map((shot) => (
                    <CarouselItem key={shot.id} className="sm:basis-4/5">
                      <img
                        src={shot.image || "/placeholder.svg"}
                        alt={`Captura de ${game.name}`}
                        loading="lazy"
                        className="aspect-video w-full rounded-lg border border-border object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </section>
          )}

          {/* Descripción */}
          {game.description_raw && (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Acerca de</h2>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {game.description_raw}
              </p>
            </section>
          )}
        </div>

        {/* Ficha lateral */}
        <aside className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">Información</h2>
          <Separator />

          {game.developers?.length > 0 && (
            <InfoRow
              label="Desarrolladora"
              value={game.developers.map((d) => d.name).join(", ")}
            />
          )}
          {game.publishers?.length > 0 && (
            <InfoRow
              label="Editora"
              value={game.publishers.map((p) => p.name).join(", ")}
            />
          )}
          {game.released && (
            <InfoRow label="Lanzamiento" value={game.released} />
          )}
          {game.esrb_rating && (
            <InfoRow label="Clasificación" value={game.esrb_rating.name} />
          )}

          {game.platforms?.length ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Plataformas</span>
              <div className="flex flex-wrap gap-1.5">
                {game.platforms.map((p) => (
                  <Badge
                    key={p.platform.id}
                    variant="outline"
                    className="font-normal"
                  >
                    {p.platform.name}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          {game.website && (
            <Button asChild variant="outline" className="mt-2 gap-2">
              <a href={game.website} target="_blank" rel="noreferrer">
                Sitio oficial
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
        </aside>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function GameDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-72 w-full rounded-xl" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    </div>
  )
}
