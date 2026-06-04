
import { useEffect, useState, useRef } from 'react'
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [currentVideo, setCurrentVideo] = useState([])
  const [likes, setLikes] = useState({})
  const [saves, setSaves] = useState({})
  const [userLikedItems, setUserLikedItems] = useState(new Set())
  const [userSavedItems, setUserSavedItems] = useState(new Set())
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const videoRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target
        const index = parseInt(video.dataset.index)

        if (entry.isIntersecting) {
          setCurrentVideo(index)
          video.play().catch(() => {
            // Handle play promise rejection (e.g., autoplay blocked)
          })
        } else {
          video.pause()
        }
      })
    }, observerOptions)

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/api/food/', {
      withCredentials: true, 
    })
    .then((response) => {
      setCurrentVideo(response.data.fooditems)
      // Initialize likes and saves state
      const likesObj = {}
      const savesObj = {}
      response.data.fooditems.forEach(item => {
        likesObj[item._id] = item.likeCount || 0
        savesObj[item._id] = item.saveCount || response.data.saveCounts?.[item._id] || 0
      })
      setLikes(likesObj)
      setSaves(savesObj)

      const likedIds = response.data.likedFoodIds || []
      setUserLikedItems(new Set(likedIds))
      const savedIds = response.data.savedFoodIds || []
      setUserSavedItems(new Set(savedIds))
    })
    .catch((err) => {
      console.error('Failed to fetch food items:', err)
    })
  }, [])

  const handleVideoRef = (el, index) => {
    videoRefs.current[index] = el
  }

 const handleLike = async (foodId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/food/like', 
        { foodId },
        { withCredentials: true }
      )

      // console.log(response.data);
      const isLiked = userLikedItems.has(foodId)
      const newLikedItems = new Set(userLikedItems)
      
      if (isLiked) {
        newLikedItems.delete(foodId)
        setLikes(prev => ({
          ...prev,
          [foodId]: (prev[foodId] || 0) -1
        }))
      } else {
        newLikedItems.add(foodId)
        setLikes(prev => ({
          ...prev,
          [foodId]: (prev[foodId] || 0) + 1
        }))
      }
      
      setUserLikedItems(newLikedItems)
    } catch (err) {
      console.error('Failed to like food:', err)
    }
  }

  const handleSave = async (foodId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/food/save',
        { foodId },
        { withCredentials: true }
      )

      console.log(response.data);
      const isSaved = userSavedItems.has(foodId)
      const newSavedItems = new Set(userSavedItems)
      
      if (isSaved) {
        newSavedItems.delete(foodId)
        setSaves(prev => ({
          ...prev,
          [foodId]: (prev[foodId] || 0) - 1
        }))
      } else {
        newSavedItems.add(foodId)
        setSaves(prev => ({
          ...prev,
          [foodId]: (prev[foodId] || 0) + 1
        }))
        // Navigate to saved page when item is saved
        setTimeout(() => {
          navigate('/saved')
        }, 300)
      }
      
      setUserSavedItems(newSavedItems)
    } catch (err) {
      console.error('Failed to save food:', err)
    }
  }

  return (
    <main className="home-reel-container" ref={containerRef}>
      {currentVideo.map((reel, index) => (
        <section className="home-reel-card" key={reel._id}>
          <video
            ref={(el) => handleVideoRef(el, index)}
            data-index={index}
            className="home-reel-video"
            src={reel.video}  
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
          
          {/* Right side action buttons */}
          <div className="home-reel-actions">
            <div className="action-button like-button" onClick={() => handleLike(reel._id)}>
              <svg 
                className={`action-icon ${userLikedItems.has(reel._id) ? 'liked' : ''}`}
                viewBox="0 0 24 24" 
                fill={userLikedItems.has(reel._id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="action-count">{likes[reel._id] || 0}</span>
            </div>

            <div className="action-button comment-button">
              <svg 
                className="action-icon"
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="action-count">10</span>
            </div>

            <div className="action-button save-button" onClick={() => handleSave(reel._id)}>
              <svg 
                className={`action-icon ${userSavedItems.has(reel._id) ? 'saved' : ''}`}
                viewBox="0 0 24 24" 
                fill={userSavedItems.has(reel._id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              </svg>
              <span className="action-count">{saves[reel._id] || 0}</span>
            </div>
          </div>

          <div className="home-reel-overlay">
            <div className="home-reel-text">
              <h2>{reel.name}</h2>
              <p>{reel.description}</p>
            </div>
            <Link to={ "/food-partner/"+ reel.foodPartner} className="home-reel-button"> Visit store </Link>
          </div>
        </section>
      ))}
    </main>
  )
}

export default Home;
