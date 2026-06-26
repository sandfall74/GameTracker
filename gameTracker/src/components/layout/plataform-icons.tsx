import { Monitor, Smartphone, Gamepad2, Apple, Globe } from "lucide-react"
import type { PlatformWrapper } from "@/types/rawg"


const ICON_BY_SLUG: Record<string, typeof Monitor> = {
  pc: Monitor,
  playstation: Gamepad2,
  xbox: Gamepad2,
  nintendo: Gamepad2,
  mac: Apple,
  ios: Smartphone,
  android: Smartphone,
  linux: Monitor,
  web: Globe,
}

interface PlatformIconsProps {
  platforms: PlatformWrapper[] | null
  className?: string
}

export function PlatformIcons({ platforms, className }: PlatformIconsProps) {
  if (!platforms?.length) return null

 
  const seen = new Set<string>()
  const icons = platforms
    .map((p) => p.platform.slug)
    .filter((slug) => {
      const Icon = ICON_BY_SLUG[slug]
      if (!Icon || seen.has(slug)) return false
      seen.add(slug)
      return true
    })

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icons.map((slug) => {
          const Icon = ICON_BY_SLUG[slug]
          return <Icon key={slug} className="size-3.5" aria-label={slug} />
        })}
      </div>
    </div>
  )
}
