import React, { useState } from "react";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isSignUp && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const userData = {
      name: isSignUp ? name.trim() : (email.split("@")[0] || "User"),
      email: email.trim(),
      token: "demo_token_" + Date.now(),
    };

    if (rememberMe) {
      localStorage.setItem("forma_user", JSON.stringify(userData));
    }

    setSuccessMsg(isSignUp ? "Account created successfully! Welcome to Forma." : "Signed in successfully! Welcome back.");
    
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
    }, 700);
  };

  const handleFillDemo = () => {
    setIsSignUp(false);
    setEmail("ashwin@example.com");
    setPassword("password123");
    setError("");
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="login-header">
          <div className="login-brand">forma<span>.</span></div>
          <h2>{isSignUp ? "Create your account" : "Welcome back"}</h2>
          <p>
            {isSignUp
              ? "Join Forma for exclusive releases and faster checkout."
              : "Sign in to access your orders and saved items."}
          </p>
        </div>

        {error && <div className="login-alert error">{error}</div>}
        {successMsg && <div className="login-alert success">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                type="text"
                placeholder="Ashwin Joshy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              {!isSignUp && (
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => alert("Password reset instructions have been sent to your email (Demo).")}
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="password-input-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
              />
              <button
                type="button"
                className="show-hide-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="demo-pill-btn"
              onClick={handleFillDemo}
              title="Auto-fill sample credentials"
            >
              Demo credentials
            </button>
          </div>

          <button type="submit" className="submit-auth-btn">
            {isSignUp ? "Create Account →" : "Sign In →"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              className="toggle-auth-btn"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccessMsg("");
              }}
            >
              {isSignUp ? "Sign In" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
