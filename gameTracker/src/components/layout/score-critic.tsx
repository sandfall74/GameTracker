import { cn } from "@/lib/utils"

interface CriticScoreProps {
  score: number | null
  className?: string
}

// Muestra las metricas segun el color
export function CriticScore({ score, className }: CriticScoreProps) {
  if (score == null) return null

  const tone =
    score >= 75
      ? "border-chart-2 text-chart-2"
      : score >= 50
        ? "border-chart-4 text-chart-4"
        : "border-destructive text-destructive"

  return (
    <span
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 text-xs font-semibold tabular-nums",
        tone,
        className,
      )}
      title="Metacritic"
    >
      {score}
    </span>
  )
}
