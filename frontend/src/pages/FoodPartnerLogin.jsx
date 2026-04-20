import '../styles/theme.css';
import '../styles/authShared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/api/auth/foodPartner/login', {
      email: e.target.email.value,
      password: e.target.password.value
    },
  {
    withCredentials: true
  });

  console.log(response.data);

  navigate('/create-food');
  
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Manage your restaurant and orders from here</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name='email'
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name='password'
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me */}
          <div className="form-group checkbox-group">
            <input type="checkbox" id="remember-partner" className="checkbox-input" />
            <label htmlFor="remember-partner" className="checkbox-label">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          <p className="auth-footer-text">
            <a href="#" className="auth-link">Forgot password?</a>
          </p>
          <p className="auth-footer-text">
            Register as <a href="/user/register" className="auth-link">Normal User</a> or <a href="/food-partner/register" className="auth-link">Food Partner</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
