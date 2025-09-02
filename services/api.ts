export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}

export const fetchMovies = async ({ query }: { query?: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&include_video=false`
    : `${TMDB_CONFIG.BASE_URL}/movie/popular?sort_by=popularity.desc&include_adult=false&include_video=false`

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  })

  if (!response.ok) {
    console.error('Failed to fetch movies', response.statusText)
    throw new Error('Failed to fetch movies')
  }

  const data = await response.json()

  return data.results
}
