import React, { useRef, useState } from 'react'
import './../../styles/CreateFood.css'
import axios from 'axios'
import BASE_URL from '../../config'

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const videoRef = useRef(null)

  const handleVideoChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) setVideoFile(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!videoFile || !name.trim()) {
      alert('Please provide a video file and a name')
      return
    }
    const formData = new FormData()
    formData.append('video', videoFile)
    formData.append('name', name)
    formData.append('description', description)

    try {
      const response = await axios.post(`${BASE_URL}/api/food/`, formData, {
        withCredentials: true,
      })
      alert("Food item created successfully")
    } catch (error) {
      console.error('CreateFood submit error:', error)
      if (error.response) {
        alert(error.response.data.message || 'API response error')
      } else {
        console.log(`Network error: unable to reach backend at ${BASE_URL}`);
      }
    }
  }

  const clearForm = () => {
    setVideoFile(null)
    setName('')
    setDescription('')
    if (videoRef.current) videoRef.current.load()
  }

  return (
    <div className="create-food-page">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Food Page</h2>

        <label className="field file-field">
          <span className="label">Video file</span>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="input-file"
          />
        </label>

        {videoFile && (
          <div className="video-preview">
            <video controls src={URL.createObjectURL(videoFile)} ref={videoRef} />
            <div className="video-meta">{videoFile.name} • {(videoFile.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        )}

        <label className="field">
          <span className="label">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter video name"
            className="input"
          />
        </label>

        <label className="field">
          <span className="label">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
            rows={5}
            className="textarea"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <button type="button" className="btn btn-secondary" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateFood