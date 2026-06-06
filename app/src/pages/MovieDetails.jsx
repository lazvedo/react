import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails, getMovieVideos, IMG_ORIGINAL, IMG_URL } from '../services/api'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getMovieDetails(id),
      getMovieVideos(id),
    ]).then(([movieRes, videoRes]) => {
      setMovie(movieRes.data)
      const yt = videoRes.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      )
      setTrailer(yt || null)
      setLoading(false)
    })
  }, [id])

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

  if (!movie) return null

  const backdrop = IMG_ORIGINAL + movie.backdrop_path
  const poster = IMG_URL + movie.poster_path
  const rating = movie.vote_average?.toFixed(1)
  const year = movie.release_date?.split('-')[0]
  const runtime = movie.runtime
    ? Math.floor(movie.runtime / 60) + 'h ' + (movie.runtime % 60) + 'min'
    : null

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>

      {/* Backdrop */}
      <div style={{
        position: 'relative',
        height: '70vh',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(' + backdrop + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'brightness(0.4)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #080808 0%, transparent 60%)',
        }} />

        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '24px',
            left: '48px',
            background: 'rgba(0,0,0,0.6)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            color: '#fff',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            zIndex: 10,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.85)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
        >
          ← Voltar
        </button>
      </div>

      {/* Conteúdo */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 48px 80px',
        marginTop: '-200px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '48px',
          alignItems: 'start',
        }}>

          {/* Poster */}
          <img
            src={poster}
            alt={movie.title}
            style={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          />

          {/* Infos */}
          <div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '16px',
              color: '#fff',
            }}>
              {movie.title}
            </h1>

            {/* Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px',
            }}>
              <span style={{
                background: 'rgba(240,192,64,0.15)',
                border: '0.5px solid rgba(240,192,64,0.3)',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '12px',
                color: '#F0C040',
                fontWeight: 600,
              }}>
                ★ {rating}
              </span>
              {year && (
                <span style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {year}
                </span>
              )}
              {runtime && (
                <span style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {runtime}
                </span>
              )}
              {movie.genres?.map(g => (
                <span key={g.id} style={{
                  background: 'rgba(0,168,225,0.1)',
                  border: '0.5px solid rgba(0,168,225,0.2)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  color: '#00A8E1',
                }}>
                  {g.name}
                </span>
              ))}
            </div>

            {/* Sinopse */}
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              marginBottom: '32px',
              maxWidth: '600px',
            }}>
              {movie.overview || 'Sinopse não disponível.'}
            </p>

            {/* Botões */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
              {trailer ? (
                <a
                  href={"https://youtube.com/watch?v=" + trailer.key}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#00A8E1',
                    color: '#fff',
                    padding: '12px 28px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    transition: 'opacity 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  ▶ Ver Trailer
                </a>
              ) : (
                <span style={{
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.3)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                }}>
                  Trailer indisponível
                </span>
              )}
            </div>

            {/* Detalhes extras */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              borderTop: '0.5px solid rgba(255,255,255,0.07)',
              paddingTop: '28px',
            }}>
              {[
                ['Título original', movie.original_title],
                ['Idioma original', movie.original_language?.toUpperCase()],
                ['Popularidade', movie.popularity?.toFixed(0)],
                ['Votos', movie.vote_count?.toLocaleString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    marginBottom: '4px',
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                  }}>
                    {value || '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails