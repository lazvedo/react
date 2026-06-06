import { useState, useEffect } from 'react'
import { getPopularMovies, getTopRated, getTrending, searchMovies } from '../services/api'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'

function MovieRow({ title, movies }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#fff',
        marginBottom: '16px',
        paddingLeft: '48px',
        letterSpacing: '0.02em',
      }}>
        {title}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px',
        padding: '0 48px',
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

function Home({ searchQuery }) {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getTrending(),
      getPopularMovies(),
      getTopRated(),
    ]).then(([trendRes, popRes, topRes]) => {
      setTrending(trendRes.data.results.slice(0, 12))
      setPopular(popRes.data.results.slice(0, 12))
      setTopRated(topRes.data.results.slice(0, 12))
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    const timer = setTimeout(() => {
      searchMovies(searchQuery).then(res => {
        setSearchResults(res.data.results)
      })
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  if (loading) return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#00A8E1',
      fontSize: '13px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    }}>
      Carregando...
    </div>
  )

  if (searchQuery.trim()) return (
    <div style={{ paddingTop: '100px' }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#fff',
        marginBottom: '24px',
        paddingLeft: '48px',
      }}>
        Resultados para "{searchQuery}"
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px',
        padding: '0 48px',
      }}>
        {searchResults.length > 0
          ? searchResults.map(movie => <MovieCard key={movie.id} movie={movie} />)
          : <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Nenhum filme encontrado.</p>
        }
      </div>
    </div>
  )

  return (
    <div>
      <Hero />
      <div style={{ paddingTop: '32px' }}>
        <MovieRow title="🔥 Em Alta essa Semana" movies={trending} />
        <MovieRow title="🎬 Populares" movies={popular} />
        <MovieRow title="⭐ Mais Bem Avaliados" movies={topRated} />
      </div>
    </div>
  )
}

export default Home