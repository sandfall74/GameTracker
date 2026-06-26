import { apiClient } from "../lib/api-client"
import type {
  Game,
  GameDetails,
  GamesQueryParams,
  GenreInfo,
  ParentPlatform,
  RawgListResponse,
  Screenshot,
} from "@/types/rawg"

// Lista de juegos paginada 
export async function fetchGames(
  params: GamesQueryParams & { page?: number },
): Promise<RawgListResponse<Game>> {
  const { data } = await apiClient.get<RawgListResponse<Game>>("/games", {
    params: {
      page_size: 24,
      ...params,
    },
  })
  return data
}

// Detalle de un juego concreto
export async function fetchGameDetails(slug: string): Promise<GameDetails> {
  const { data } = await apiClient.get<GameDetails>(`/games/${slug}`)
  return data
}

// Screenshots de un juego 
export async function fetchGameScreenshots(
  slug: string,
): Promise<RawgListResponse<Screenshot>> {
  const { data } = await apiClient.get<RawgListResponse<Screenshot>>(
    `/games/${slug}/screenshots`,
  )
  return data
}

// Géneros 
export async function fetchGenres(): Promise<RawgListResponse<GenreInfo>> {
  const { data } = await apiClient.get<RawgListResponse<GenreInfo>>("/genres", {
    params: { page_size: 40 },
  })
  return data
}

// Plataformas padre: PC, PlayStation, Xbox, etc.
export async function fetchParentPlatforms(): Promise<
  RawgListResponse<ParentPlatform>
> {
  const { data } = await apiClient.get<RawgListResponse<ParentPlatform>>(
    "/platforms/lists/parents",
  )
  return data
}
