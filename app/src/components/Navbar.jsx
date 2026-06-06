import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar({ searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 48px',
      background: scrolled ? 'rgba(8,8,8,0.95)' : 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
      transition: 'all 0.4s ease',
    }}>

      {/* Logo */}
      <div
        onClick={() => { navigate('/'); setSearchQuery('') }}
        style={{
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: '#00A8E1',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        prime<span style={{ color: '#fff' }}>clone</span>
      </div>

      {/* Search */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {['Início', 'Filmes', 'Séries'].map(item => (
          <span key={item} style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >
            {item}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Navbar