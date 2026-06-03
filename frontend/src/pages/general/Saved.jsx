import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Saved.css'

const Saved = () => {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSavedItems()
  }, [])

  const fetchSavedItems = async () => {
    try {
      setLoading(true)
      // Fetch all food items first
      const foodResponse = await axios.get('http://localhost:3000/api/food/', {
        withCredentials: true,
      })

      // For now, we'll display all items
      // In a real app, you'd fetch only the saved items for the user
      setSavedItems(foodResponse.data.fooditems || [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch saved items:', err)
      setError('Failed to load saved items')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveSave = async (foodId) => {
    try {
      await axios.post('http://localhost:3000/api/food/save',
        { foodId },
        { withCredentials: true }
      )
      // Remove the item from the saved list
      setSavedItems(savedItems.filter(item => item._id !== foodId))
    } catch (err) {
      console.error('Failed to remove saved item:', err)
    }
  }

  if (loading) {
    return (
      <div className="saved-container">
        <div className="saved-loading">Loading saved items...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="saved-container">
        <div className="saved-error">{error}</div>
      </div>
    )
  }

  return (
    <div className="saved-container">
      <div className="saved-header">
        <h1>Saved Items</h1>
        <p className="saved-count">{savedItems.length} saved</p>
      </div>

      {savedItems.length === 0 ? (
        <div className="saved-empty">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          </svg>
          <p>No saved items yet</p>
          <p className="empty-subtitle">Items you save will appear here</p>
        </div>
      ) : (
        <div className="saved-grid">
          {savedItems.map((item) => (
            <div className="saved-card" key={item._id}>
              <div className="saved-card-image">
                <video 
                  src={item.video}
                  className="saved-card-video"
                  controls
                  controlsList="nodownload"
                />
              </div>
              <div className="saved-card-content">
                <h3 className="saved-card-title">{item.name}</h3>
                <p className="saved-card-description">{item.description}</p>
                <div className="saved-card-actions">
                  <Link 
                    to={`/food-partner/${item.foodPartner}`}
                    className="saved-visit-btn"
                  >
                    Visit Store
                  </Link>
                  <button
                    className="saved-remove-btn"
                    onClick={() => handleRemoveSave(item._id)}
                    title="Remove from saved"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved
