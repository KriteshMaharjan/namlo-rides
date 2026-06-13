import { useState } from "react";
import "../styles/LoginPage.css";

const VALID_EMAIL = "intern@namlotech.com";
const VALID_PASSWORD = "namlo2026";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        setError("");
        onLogin();
      } else {
        setError("Invalid email or password.");
      }
      setIsLoading(false);
    }, 300);
  }

  function handleAutofill() {
    setEmail(VALID_EMAIL);
    setPassword(VALID_PASSWORD);
    setError("");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Namlo Rides</h1>
          <p className="login-subtitle">
            Real-Time Ride-Sharing Simulator Assignment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          {error && (
            <div className="error-alert">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-divider">
          <span>Demo Login</span>
        </div>

        <button
          type="button"
          className="demo-btn"
          onClick={handleAutofill}
          disabled={isLoading}
        >
          Use Demo Credentials
        </button>

        <p className="login-footer">
          Testing the app? Use the demo credentials above.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
