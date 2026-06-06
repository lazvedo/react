import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTrending, IMG_ORIGINAL } from '../services/api'

function Hero() {
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getTrending().then(res => {
      const movies = res.data.results
      const random = movies[Math.floor(Math.random() * 5)]
      setMovie(random)
    })
  }, [])

  if (!movie) return null

  const backdrop = `${IMG_ORIGINAL}${movie.backdrop_path}`
  const rating = movie.vote_average?.toFixed(1)
  const year = movie.release_date?.split('-')[0]

  return (
    <div style={{
      position: 'relative',
      height: '90vh',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '0 48px 80px',
      overflow: 'hidden',
    }}>

      {/* Imagem de fundo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        filter: 'brightness(0.5)',
      }} />

      {/* Gradiente */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.4) 50%, transparent 100%)',
      }} />

      {/* Gradiente lateral */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,8,0.8) 0%, transparent 60%)',
      }} />

      {/* Conteúdo */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px' }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,168,225,0.15)',
          border: '0.5px solid rgba(0,168,225,0.3)',
          borderRadius: '4px',
          padding: '4px 10px',
          fontSize: '11px',
          color: '#00A8E1',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          ✦ Em alta essa semana
        </div>

        {/* Título */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          color: '#fff',
        }}>
          {movie.title}
        </h1>

        {/* Infos */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px',
        }}>
          <span style={{ color: '#F0C040', fontWeight: 600, fontSize: '14px' }}>
            ★ {rating}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            {year}
          </span>
        </div>

        {/* Sinopse */}
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.7,
          marginBottom: '32px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {movie.overview || 'Sinopse não disponível.'}
        </p>

        {/* Botões */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{
              background: '#00A8E1',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            ▶ Assistir agora
          </button>

          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              border: '0.5px solid rgba(255,255,255,0.2)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            + Mais informações
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero