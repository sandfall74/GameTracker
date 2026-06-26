// Tipos para la API de RAWG 

export interface RawgListResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface PlatformInfo {
  id: number
  name: string
  slug: string
}

export interface PlatformWrapper {
  platform: PlatformInfo
}

export interface GenreInfo {
  id: number
  name: string
  slug: string
  games_count?: number
  image_background?: string
}

export interface Store {
  id: number
  store: {
    id: number
    name: string
    slug: string
    domain?: string
  }
}

export interface ShortScreenshot {
  id: number
  image: string
}

export interface EsrbRating {
  id: number
  name: string
  slug: string
}

export interface Game {
  id: number
  slug: string
  name: string
  released: string | null
  tba: boolean
  background_image: string | null
  rating: number
  rating_top: number
  ratings_count: number
  metacritic: number | null
  playtime: number
  platforms: PlatformWrapper[] | null
  parent_platforms: PlatformWrapper[] | null
  genres: GenreInfo[]
  stores: Store[] | null
  short_screenshots: ShortScreenshot[]
  esrb_rating: EsrbRating | null
}

export interface GameDetails extends Game {
  description_raw: string
  description: string
  website: string
  reddit_url: string
  metacritic_url: string
  developers: { id: number; name: string; slug: string }[]
  publishers: { id: number; name: string; slug: string }[]
  background_image_additional: string | null
}

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
}

export interface ParentPlatform {
  id: number
  name: string
  slug: string
  platforms: PlatformInfo[]
}

export type Ordering =
  | "-relevance"
  | "-rating"
  | "-released"
  | "released"
  | "-metacritic"
  | "name"
  | "-added"

export interface GamesQueryParams {
  search?: string
  genres?: string
  platforms?: string
  ordering?: Ordering
  dates?: string
  page_size?: number
}
