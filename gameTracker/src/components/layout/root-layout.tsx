import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layout/navbar"

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
