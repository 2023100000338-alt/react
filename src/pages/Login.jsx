import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://reactbackend-production-006c.up.railway.app/api/login",
        {
          email: email.toLowerCase().trim(),
          password
        },
        { 
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // Keep your exact working logic
      if (res.data === "Login Success") {
        localStorage.setItem("token", "logged-in");
        navigate("/dashboard");
      } else {
        setError("Invalid Login");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        {/* Header */}
        <div className="auth-header">
          <div className="logo">
            <h1>🚀 Admin</h1>
          </div>
          <p className="subtitle">Welcome back</p>
        </div>

        {/* Error */}
        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Form - Your exact working logic */}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <Link to="/register" className="auth-link">
            Create Account →
          </Link>
        </div>
      </div>
      
      <div className="background-animation"></div>
    </div>
  );
}

export default Login;