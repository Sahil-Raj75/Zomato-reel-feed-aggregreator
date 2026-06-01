import { useState, useEffect } from 'react';
import '../../styles/foodPartnerProfile.css';

const FoodPartnerProfile = () => {
  const [profileData, setProfileData] = useState({
    businessName: 'Restaurant Name',
    address: '123 Food Street, City',
    profileImage: 'https://via.placeholder.com/120',
    totalMeals: 43,
    customerServed: '15K',
  });

  const [foodVideos, setFoodVideos] = useState([
    { id: 1, title: 'Video 1' },
    { id: 2, title: 'Video 2' },
    { id: 3, title: 'Video 3' },
    { id: 4, title: 'Video 4' },
    { id: 5, title: 'Video 5' },
    { id: 6, title: 'Video 6' },
    { id: 7, title: 'Video 7' },
    { id: 8, title: 'Video 8' },
    { id: 9, title: 'Video 9' },
  ]);

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-image-section">
          <div className="profile-image">
            <img src={profileData.profileImage} alt="Profile" />
          </div>
        </div>

        <div className="profile-info-section">
          <input
            type="text"
            className="profile-input business-name"
            placeholder="Business Name"
            defaultValue={profileData.businessName}
            disabled
          />
          <input
            type="text"
            className="profile-input address"
            placeholder="Address"
            defaultValue={profileData.address}
            disabled
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <p className="stat-label">total meals</p>
          <p className="stat-value">{profileData.totalMeals}</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <p className="stat-label">customer served</p>
          <p className="stat-value">{profileData.customerServed}</p>
        </div>
      </div>

      {/* Videos Grid Section */}
      <div className="videos-grid">
        {foodVideos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-placeholder">
              <span>video</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
