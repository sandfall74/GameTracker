import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginacionControlProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

// Construye la secuencia de páginas a mostrar con elipsis.
function buildRange(current: number, total: number): (number | "ellipsis")[] {
  const delta = 1
  const range: (number | "ellipsis")[] = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)
  if (left > 2) range.push("ellipsis")
  for (let i = left; i <= right; i++) range.push(i)
  if (right < total - 1) range.push("ellipsis")
  if (total > 1) range.push(total)

  return range
}

export function PaginacionControl({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginacionControlProps) {
  if (totalPages <= 1) return null

  const pages = buildRange(page, totalPages)

  return (
    <nav
      aria-label="Paginación"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        variant="outline"
        size="icon"
        aria-label="Página anterior"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-muted-foreground"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? "default" : "outline"}
            size="icon"
            aria-label={`Ir a la página ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={cn("tabular-nums", item === page && "pointer-events-none")}
            disabled={disabled}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        aria-label="Página siguiente"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  )
}
