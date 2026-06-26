import { Check, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  STATUS_LABELS,
  useLibrary,
  type LibraryStatus,
} from "../../context/library-context"
import type { Game } from "@/types/rawg"
import { cn } from "@/lib/utils"

const STATUSES: LibraryStatus[] = ["playing", "completed", "backlog", "dropped"]

interface LibraryStatusMenuProps {
  game: Game
  size?: "sm" | "default"
  className?: string
}


export function LibreriaStatusMenu({
  game,
  size = "sm",
  className,
}: LibraryStatusMenuProps) {
  const { getEntry, addOrUpdate, remove } = useLibrary()
  const entry = getEntry(game.id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={entry ? "secondary" : "default"}
          size={size}
          className={cn("gap-1.5", className)}
        >
          {entry ? (
            <>
              <Check className="size-4" />
              {STATUS_LABELS[entry.status]}
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Añadir
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Marcar como</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {STATUSES.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => addOrUpdate(game, status)}
          >
            <span className="flex-1">{STATUS_LABELS[status]}</span>
            {entry?.status === status && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
        {entry && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => remove(game.id)}
            >
              <Trash2 className="size-4" />
              Quitar
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
