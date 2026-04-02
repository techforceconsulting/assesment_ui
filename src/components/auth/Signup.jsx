import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // default

  const handleRegister = async () => {
    if (!name || !email || !password || !userType) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userType   // 🔥 selected value
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered Successfully");
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
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
        <span className="auth-top-badge">Create Account</span>
      </header>

      {/* Auth card */}
      <div className="auth-center">
        <div className="auth-card">
          <div className="auth-card-glow" />

          <div className="auth-card-header">
            <div className="ca-hero-badge">Get Started</div>
            <h2 className="auth-title">Create your account</h2>
            <p className="auth-sub">Join and start assessing your skills</p>
          </div>

          <div className="auth-fields">
            <div className="auth-field-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Your full name"
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            {/* 🔥 USER TYPE SELECT */}
            <div className="auth-field-group">
              <label className="auth-label">Account Type</label>
              <div className="auth-select-wrap">
                <select
                  onChange={(e) => setUserType(e.target.value)}
                  className="auth-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <span className="auth-select-arrow">▾</span>
              </div>
            </div>

            <button onClick={handleRegister} className="auth-btn-primary">
              Register →
            </button>
          </div>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/")}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}