import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../services/api'

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const poster = movie.poster_path
    ? `${IMG_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/111111/555555?text=Sem+Poster'

  const rating = movie.vote_average?.toFixed(1)
  const year = movie.release_date?.split('-')[0]

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: '2/3',
        background: '#111',
        transform: hovered ? 'scale(1.04) translateY(-4px)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.7)' : '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Poster */}
      <img
        src={poster}
        alt={movie.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s',
          opacity: hovered ? 0.6 : 1,
        }}
      />

      {/* Overlay no hover */}
      {hovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '16px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '6px',
            lineHeight: 1.3,
          }}>
            {movie.title}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              fontSize: '11px',
              color: '#F0C040',
              fontWeight: 600,
            }}>
              ★ {rating}
            </span>
            {year && (
              <span style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
              }}>
                {year}
              </span>
            )}
          </div>

          <div style={{
            marginTop: '10px',
            background: '#00A8E1',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '6px 12px',
            borderRadius: '4px',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
            Ver detalhes
          </div>
        </div>
      )}

      {/* Badge de nota */}
      {!hovered && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
          borderRadius: '4px',
          padding: '3px 7px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#F0C040',
        }}>
          ★ {rating}
        </div>
      )}
    </div>
  )
}

export default MovieCard