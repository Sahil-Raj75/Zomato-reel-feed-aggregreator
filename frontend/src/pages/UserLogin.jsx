import '../styles/theme.css';
import '../styles/authShared.css';

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue ordering</p>
        </div>

        {/* Form */}
        <form>
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me */}
          <div className="form-group checkbox-group">
            <input type="checkbox" id="remember" className="checkbox-input" />
            <label htmlFor="remember" className="checkbox-label">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button type="button" className="btn btn-primary">
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

export default UserLogin;
