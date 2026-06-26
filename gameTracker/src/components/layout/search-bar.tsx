import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}


export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar juegos...",
}: SearchBarProps) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    setLocal(value)
  }, [value])

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onChange(local)
    }, 450)
    return () => clearTimeout(t)
  }, [local])

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="h-11 pl-10 pr-10 text-base"
      />
      {local && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
          onClick={() => {
            setLocal("")
            onChange("")
          }}
          aria-label="Limpiar búsqueda"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
