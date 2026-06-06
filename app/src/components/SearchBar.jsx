import { useState } from 'react'

function SearchBar({ searchQuery, setSearchQuery }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: focused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
      border: `0.5px solid ${focused ? 'rgba(0,168,225,0.5)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: '6px',
      padding: '8px 14px',
      width: '280px',
      transition: 'all 0.25s ease',
    }}>

      {/* Ícone lupa */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>

      <input
        type="text"
        placeholder="Buscar filmes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: 'none',
          color: '#fff',
          fontSize: '13px',
          width: '100%',
          letterSpacing: '0.02em',
        }}
      />

      {/* Botão limpar */}
      {searchQuery && (
        <span
          onClick={() => setSearchQuery('')}
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '16px',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
        >
          ×
        </span>
      )}
    </div>
  )
}

export default SearchBar