import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useGenres, useParentPlatforms } from "../../hooks/use-games"
import type { Ordering } from "@/types/rawg"
import { cn } from "@/lib/utils"

export interface FiltrosState {
  genre: string
  platform: string
  ordering: Ordering
}

interface FiltrosPanelProps {
  value: FiltrosState
  onChange: (next: FiltrosState) => void
}

const ORDERINGS: { value: Ordering; label: string }[] = [
  { value: "-relevance", label: "Relevancia" },
  { value: "-added", label: "Más populares" },
  { value: "-rating", label: "Mejor valorados" },
  { value: "-metacritic", label: "Metacritic" },
  { value: "-released", label: "Más recientes" },
  { value: "name", label: "Nombre (A-Z)" },
]

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button type="button" onClick={onClick} className="text-left">
      <Badge
        variant={active ? "default" : "outline"}
        className={cn(
          "cursor-pointer font-normal transition-colors",
          !active && "hover:border-primary/60",
        )}
      >
        {children}
      </Badge>
    </button>
  )
}

export function FiltrosPanel({ value, onChange }: FiltrosPanelProps) {
  const { data: genresData, isLoading: loadingGenres } = useGenres()
  const { data: platformsData, isLoading: loadingPlatforms } =
    useParentPlatforms()

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
          Ordenar por
        </h3>
        <div className="flex flex-wrap gap-2">
          {ORDERINGS.map((o) => (
            <FilterChip
              key={o.value}
              active={value.ordering === o.value}
              onClick={() => onChange({ ...value, ordering: o.value })}
            >
              {o.label}
            </FilterChip>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
          Plataforma
        </h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={value.platform === ""}
            onClick={() => onChange({ ...value, platform: "" })}
          >
            Todas
          </FilterChip>
          {loadingPlatforms
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))
            : platformsData?.results.map((p) => (
                <FilterChip
                  key={p.id}
                  active={value.platform === String(p.id)}
                  onClick={() =>
                    onChange({ ...value, platform: String(p.id) })
                  }
                >
                  {p.name}
                </FilterChip>
              ))}
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
          Género
        </h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={value.genre === ""}
            onClick={() => onChange({ ...value, genre: "" })}
          >
            Todos
          </FilterChip>
          {loadingGenres
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))
            : genresData?.results.map((g) => (
                <FilterChip
                  key={g.id}
                  active={value.genre === g.slug}
                  onClick={() => onChange({ ...value, genre: g.slug })}
                >
                  {g.name}
                </FilterChip>
              ))}
        </div>
      </section>
    </div>
  )
}
