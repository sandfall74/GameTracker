import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GameCardSkeleton() {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden p-0">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-1 h-9 w-full" />
      </div>
    </Card>
  )
}
