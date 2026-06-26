import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Gamepad2, Library, Moon, Search, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLibrary } from "@/context/library-context"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/", label: "Inicio", icon: Gamepad2, end: true },
  { to: "/search", label: "Explorar", icon: Search, end: false },
  { to: "/library", label: "Biblioteca", icon: Library, end: false },
]

export function Navbar() {
  const navigate = useNavigate()
  const { entries } = useLibrary()
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark"

    const savedTheme = window.localStorage.getItem("theme")
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gamepad2 className="size-5" />
          </span>
          <span className="hidden sm:inline">GameTracker</span>
        </Link>

        <nav className="ml-2 flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "bg-secondary text-secondary-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden md:inline">{label}</span>
                  {to === "/library" && entries.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {entries.length}
                    </Badge>
                  )}
                </Button>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
            <span className="hidden sm:inline">
              {theme === "dark" ? "Claro" : "Oscuro"}
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/search")}
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Buscar juegos</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
