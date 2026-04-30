
import { useEffect, useState, useRef } from 'react'
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [currentVideo, setCurrentVideo] = useState([])
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
    axios.get('http://localhost:3000/api/food/')
    .then((response) => {
      setCurrentVideo(response.data.fooditems)
    })
  })

  const handleVideoRef = (el, index) => {
    videoRefs.current[index] = el
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
            playsInline
            preload="metadata"
          />
          <div className="home-reel-overlay">
            <div className="home-reel-text">
              <h2>{reel.name}</h2>
              <p>{reel.description}</p>
            </div>
            {/* <button type="button" className="home-reel-button">
              Visit Store
            </button> */}
            <Link to={ "/food-partner/"+ reel.foodPartner} className="home-reel-button"> Visit store </Link>
          </div>
        </section>
      ))}
    </main>
  )
}

export default Home;
