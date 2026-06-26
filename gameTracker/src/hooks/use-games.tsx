import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query"
import {
  fetchGameDetails,
  fetchGames,
  fetchGameScreenshots,
  fetchGenres,
  fetchParentPlatforms,
} from "../services/rawg-service"
import type { GamesQueryParams } from "@/types/rawg"


export function useInfiniteGames(params: GamesQueryParams) {
  return useInfiniteQuery({
    queryKey: ["games", params],
    queryFn: ({ pageParam = 1 }) => fetchGames({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 1000 * 60 * 5,
  })
}

// Lista de juegos.
// Mantiene los datos previos visibles mientras carga la siguiente página.
export function usePagedGames(params: GamesQueryParams, page: number) {
  return useQuery({
    queryKey: ["games-paged", params, page],
    queryFn: () => fetchGames({ ...params, page }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export function useGameDetails(slug: string | undefined) {
  return useQuery({
    queryKey: ["game", slug],
    queryFn: () => fetchGameDetails(slug as string),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  })
}

export function useGameScreenshots(slug: string | undefined) {
  return useQuery({
    queryKey: ["screenshots", slug],
    queryFn: () => fetchGameScreenshots(slug as string),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  })
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60,
  })
}

export function useParentPlatforms() {
  return useQuery({
    queryKey: ["parent-platforms"],
    queryFn: fetchParentPlatforms,
    staleTime: 1000 * 60 * 60,
  })
}
