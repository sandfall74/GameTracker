import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "@/components/layout/root-layout"
import { HomePage } from "@/pages/home-page"
import { SearchPage } from "@/pages/search-page"
import { DetallesGamePage } from "@/pages/detalles-games-page"
import { LibreriaPage} from "@/pages/libreria-page"

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/game/:slug", element: <DetallesGamePage /> },
      { path: "/library", element: <LibreriaPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
