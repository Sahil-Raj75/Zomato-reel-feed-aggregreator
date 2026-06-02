import { useState, useEffect } from 'react';
import '../../styles/foodPartnerProfile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FoodPartnerProfile = () => {
  
  const { id } = useParams();

  const [profileData, setProfileData] = useState(null);

  const [foodVideos, setFoodVideos] = useState([]);

  useEffect(() => {
    // Fetch profile data from backend using the id from params
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        // const data = response.data.foodPartner; // backend se food partner ka data le rhe hai
        setProfileData(response.data.foodPartner)
        setFoodVideos(response.data.foodPartner.video) // backend se food videos ka data le rhe hai
    })
  },[id])
  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-image-section">
          <div className="profile-image">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20230927%2Foriginal%2Fpngtree-man-avatar-image-for-profile-png-image_13001882.png&f=1&nofb=1&ipt=8940619e82ba17e7bd8d05b11b00c9c9414d48a287c1b73d09fd45473a8b4b09" alt="Profile" />
          </div>
        </div>

        <div className="profile-info-section">
          <input
            type="text"
            className="profile-input business-name"
            placeholder="Business Name"
            defaultValue={profileData?.restaurantName}
            disabled
          />
          <input
            type="text"
            className="profile-input address"
            placeholder="Address"
            defaultValue={profileData?.restaurantaddress}
            disabled
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <p className="stat-label">total meals</p>
          <p className="stat-value">45</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <p className="stat-label">customer served</p>
          <p className="stat-value">15k</p>
        </div>
      </div>

      {/* Videos Grid Section */}
      <div className="videos-grid">
        {foodVideos.map((v) => (
          <div key={v.id} className="video-card">
            <div className="video-placeholder">
              <video src={v.video} muted ></video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
