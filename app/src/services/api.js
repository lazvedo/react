import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMG_URL = 'https://image.tmdb.org/t/p/w500'
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
})

export const getPopularMovies = () => api.get('/movie/popular')
export const getTopRated = () => api.get('/movie/top_rated')
export const getTrending = () => api.get('/trending/movie/week')
export const getMovieDetails = (id) => api.get(`/movie/${id}`)
export const searchMovies = (query) => api.get('/search/movie', { params: { query } })
export const getMovieVideos = (id) => api.get(`/movie/${id}/videos`)

export default api