import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login success:", data);

        //userType based navigation
        if (data.userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-root">
      {/* Floating particles */}
      <div className="ca-particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="ca-particle"
            style={{ "--x": `${(i + 1) * 8}%`, "--delay": `${i * 0.7}s` }}
          />
        ))}
      </div>

      {/* Top bar */}
      <header className="ca-top-bar">
        <div className="ca-brand">
          <span className="ca-brand-icon">{"</>"}</span>
          <span className="ca-brand-name">CodeAssess</span>
        </div>
        <span className="auth-top-badge">Secure Login</span>
      </header>

      {/* Auth card */}
      <div className="auth-center">
        <div className="auth-card">
          <div className="auth-card-glow" />

          <div className="auth-card-header">
            {/* <span className="auth-icon">🔐</span> */}
            <div className="ca-hero-badge">Welcome Back</div>
            <h2 className="auth-title">Sign in to your account</h2>
            <p className="auth-sub">Continue your coding journey</p>
          </div>

          <div className="auth-fields">
            <div className="auth-field-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉</span>
                <input
                  type="text"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔑</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <button onClick={handleLogin} className="auth-btn-primary">
              Login →
            </button>
          </div>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/signup")}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}