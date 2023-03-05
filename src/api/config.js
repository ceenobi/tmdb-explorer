export const BASE_URL = 'https://api.themoviedb.org/3'

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const options = {
  // qs: { page: '1' },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN}`,
  },
}


