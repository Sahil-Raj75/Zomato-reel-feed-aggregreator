import '../styles/theme.css';
import '../styles/authShared.css';

const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Partner With Us</h1>
          <p className="auth-subtitle">Register your restaurant and start reaching more customers</p>
        </div>

        {/* Form */}
        <form>
          {/* Restaurant Name */}
          <div className="form-group">
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your restaurant name"
            />
          </div>

          {/* Owner Name */}
          <div className="form-group">
            <label className="form-label">Owner Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Restaurant Address */}
          <div className="form-group">
            <label className="form-label">Restaurant Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your restaurant address"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
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
          <button type="button" className="btn btn-primary">
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
