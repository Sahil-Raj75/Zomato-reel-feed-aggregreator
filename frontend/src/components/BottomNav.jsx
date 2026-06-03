import { Link, useLocation } from 'react-router-dom'
import './BottomNav.css'

const BottomNav = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bottom-nav">
      <Link 
        to="/dashboard" 
        className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        title="Home"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span className="nav-label">Home</span>
      </Link>

      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="nav-item"
        title="Reel"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <circle cx="17.5" cy="6.5" r="1.5"/>
        </svg>
        <span className="nav-label">Reel</span>
      </a>
    </nav>
  )
}

export default BottomNav
