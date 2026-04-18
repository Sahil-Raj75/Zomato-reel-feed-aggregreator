import '../styles/theme.css';
import '../styles/authShared.css';
import axios from 'axios';

const UserRegister = () => {

  const handleSubmit = (e) =>{
    e.preventDefault();

    const formData = {
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      phonenumber: e.target.phonenumber.value,
      password: e.target.password.value
    }
    // const firstName = e.target.firstName.value;
    // console.log(formData)
     axios.post('http://localhost:3000/api/auth/user/register', {
      name : formData.firstName,
      email : formData.email,
      phonenumber : formData.phonenumber,
      password : formData.password
    });
    
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us to order delicious food from your favorite restaurants</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="firstName"
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
              name="phonenumber"
              className="form-input"
              placeholder="Enter your phone number"
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
            <input type="checkbox" id="terms" className="checkbox-input" />
            <label htmlFor="terms" className="checkbox-label">
              I agree to the Terms & Conditions and Privacy Policy
            </label>
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account? <a href="/user/login" className="auth-link">Login here</a>
          </p>
          <p className="auth-footer-text">
            Want to register as a partner? <a href="/food-partner/register" className="auth-link">Register for Food Partner</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
