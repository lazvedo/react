import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <HashRouter>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </HashRouter>
  )
}

export default App