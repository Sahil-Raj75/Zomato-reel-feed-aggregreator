
import { useEffect, useState, useRef } from 'react'
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [foodItems, setFoodItems] = useState([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [likes, setLikes] = useState({})
  const [saves, setSaves] = useState({})
  const [userLikedItems, setUserLikedItems] = useState(new Set())
  const [userSavedItems, setUserSavedItems] = useState(new Set())
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState({})
  const [commentText, setCommentText] = useState('')
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
          setCurrentVideoIndex(index)
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
      setFoodItems(response.data.fooditems)
      // Initialize likes and saves state
      const likesObj = {}
      const savesObj = {}
      const commentsObj = {}
      response.data.fooditems.forEach(item => {
        likesObj[item._id] = item.likeCount || 0
        savesObj[item._id] = item.saveCount || response.data.saveCounts?.[item._id] || 0
        commentsObj[item._id] = item.comments || []
      })
      setLikes(likesObj)
      setSaves(savesObj)
      setComments(commentsObj)

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
      }
      
      setUserSavedItems(newSavedItems)
    } catch (err) {
      console.error('Failed to save food:', err)
    }
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
  }

  const handleAddComment = (foodId) => {
    if (commentText.trim() === '') return

    setComments(prev => ({
      ...prev,
      [foodId]: [...(prev[foodId] || []), { text: commentText, timestamp: new Date() }]
    }))
    setCommentText('')
  }

  const activeVideo = foodItems[currentVideoIndex]

  return (
    <main className={`home-reel-container ${showComments ? 'comment-panel-open' : ''}`} ref={containerRef}>
      {foodItems.map((reel, index) => (
        <section className={`home-reel-card ${showComments ? 'minimized' : ''}`} key={reel._id}>
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

            <div className="action-button comment-button" onClick={handleCommentClick}>
              <svg 
                className="action-icon"
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="action-count">{(comments[reel._id] || []).length}</span>
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

      {/* Comment Panel */}
      {showComments && activeVideo && (
        <div className={`comment-panel ${showComments ? 'visible' : ''}`}>
          <div className="comment-panel-header">
            <h3>Comments</h3>
            <button className="close-comment-btn" onClick={() => setShowComments(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="comments-list">
            {(comments[activeVideo._id] || []).length > 0 ? (
              (comments[activeVideo._id] || []).map((comment, idx) => (
                <div key={idx} className="comment-item">
                  <div className="comment-avatar">👤</div>
                  <div className="comment-content">
                    <p className="comment-text">{comment.text}</p>
                    <span className="comment-time">
                      {comment.timestamp instanceof Date ? 'just now' : 'just now'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-comments">
                <p>No comments yet. Be the first!</p>
              </div>
            )}
          </div>

          <div className="comment-input-section">
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && activeVideo) {
                  handleAddComment(activeVideo._id)
                }
              }}
            />
            <button 
              className="comment-submit-btn"
              onClick={() => activeVideo && handleAddComment(activeVideo._id)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16554707 C3.34915502,0.9084496 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376904 C16.6915026,11.5376904 17.1624089,11.5376904 17.1624089,12.0089825 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Overlay background when comment panel is open */}
      {showComments && (
        <div className="comment-panel-overlay" onClick={() => setShowComments(false)}></div>
      )}
    </main>
  )
}

export default Home;
