import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Library, Star, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  STATUS_LABELS,
  useLibrary,
  type LibraryStatus,
} from "@/context/library-context"
import { cn } from "@/lib/utils"

type Tab = "all" | LibraryStatus

const TABS: { value: Tab; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "playing", label: STATUS_LABELS.playing },
  { value: "completed", label: STATUS_LABELS.completed },
  { value: "backlog", label: STATUS_LABELS.backlog },
  { value: "dropped", label: STATUS_LABELS.dropped },
]

export function LibreriaPage() {
  const { entries, remove } = useLibrary()
  const [tab, setTab] = useState<Tab>("all")

  const counts = useMemo(() => {
    return entries.reduce(
      (acc, e) => {
        acc[e.status] = (acc[e.status] ?? 0) + 1
        return acc
      },
      {} as Record<LibraryStatus, number>,
    )
  }, [entries])

  const filtered = useMemo(
    () =>
      tab === "all" ? entries : entries.filter((e) => e.status === tab),
    [entries, tab],
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Mi biblioteca</h1>
        <p className="text-muted-foreground">
          {entries.length} {entries.length === 1 ? "juego" : "juegos"} en
          seguimiento.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count =
            t.value === "all" ? entries.length : (counts[t.value] ?? 0)
          return (
            <Button
              key={t.value}
              variant={tab === t.value ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setTab(t.value)}
            >
              {t.label}
              <Badge
                variant="secondary"
                className={cn(tab === t.value && "bg-primary-foreground/20")}
              >
                {count}
              </Badge>
            </Button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Library className="size-6 text-muted-foreground" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Aún no tienes juegos aquí</p>
            <p className="text-sm text-muted-foreground">
              Explora el catálogo y añade juegos a tu biblioteca.
            </p>
          </div>
          <Button asChild>
            <Link to="/search">Explorar juegos</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => {
            const year = entry.released
              ? new Date(entry.released).getFullYear()
              : null
            return (
              <Card
                key={entry.id}
                className="flex flex-row items-center gap-4 overflow-hidden p-0"
              >
                <Link
                  to={`/game/${entry.slug}`}
                  className="relative h-24 w-32 shrink-0 overflow-hidden bg-muted"
                >
                  {entry.background_image ? (
                    <img
                      src={entry.background_image || "/placeholder.svg"}
                      alt={entry.name}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  ) : null}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1 py-3">
                  <Link
                    to={`/game/${entry.slug}`}
                    className="truncate font-semibold hover:text-primary"
                  >
                    {entry.name}
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 fill-chart-4 text-chart-4" />
                      {entry.rating ? entry.rating.toFixed(1) : "—"}
                    </span>
                    {year && <span>· {year}</span>}
                  </div>
                  <Badge variant="secondary" className="w-fit font-normal">
                    {STATUS_LABELS[entry.status]}
                  </Badge>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4 text-muted-foreground hover:text-destructive"
                  onClick={() => remove(entry.id)}
                  aria-label={`Quitar ${entry.name} de la biblioteca`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
