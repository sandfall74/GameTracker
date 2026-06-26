import axios from "axios"

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY

if (!RAWG_KEY) {
  console.warn(
    "[RAWG] Falta VITE_RAWG_KEY en tu .env. Crea un archivo .env con: VITE_RAWG_KEY=tu_key",
  )
}


export const apiClient = axios.create({
  baseURL: "/rawg",
  params: {
    key: RAWG_KEY,
  },
})
