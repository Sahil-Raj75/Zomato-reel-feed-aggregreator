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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="nav-label">Home</span>
      </Link>

      <Link
        to="/saved"
        className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        title="saved"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path></svg>
        <span className="nav-label">Saved</span>
      </Link>
      
    </nav>
  )
}

export default BottomNav
