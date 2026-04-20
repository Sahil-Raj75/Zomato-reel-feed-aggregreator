import '../styles/theme.css';
import '../styles/authShared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/api/auth/foodPartner/register',
        {
          email: e.target.email.value,
          ownerName: e.target.ownerName.value,
          restaurantName: e.target.restaurantName.value,
          phonenumber: e.target.phone.value,
          restaurantaddress: e.target.address.value,
          password: e.target.password.value
        },
        { withCredentials: true })

    console.log("Form Data: ", response.data);

    navigate('/food-partner/login');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Partner With Us</h1>
          <p className="auth-subtitle">Register your restaurant and start reaching more customers</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Restaurant Name */}
          <div className="form-group">
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              className="form-input"
              placeholder="Enter your restaurant name"
            />
          </div>

          {/* Owner Name */}
          <div className="form-group">
            <label className="form-label">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Restaurant Address */}
          <div className="form-group">
            <label className="form-label">Restaurant Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Enter your restaurant address"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Create a strong password"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="form-group checkbox-group">
            <input type="checkbox" id="terms-partner" className="checkbox-input" />
            <label htmlFor="terms-partner" className="checkbox-label">
              I agree to the Partner Terms & Conditions
            </label>
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary">
            Register Restaurant
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          <p className="auth-footer-text">
            Already registered? <a href="/food-partner/login" className="auth-link">Login here</a>
          </p>
          <p className="auth-footer-text">
            Register as a <a href="/user/register" className="auth-link">Normal User</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
