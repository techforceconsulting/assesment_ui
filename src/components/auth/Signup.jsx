import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>

      <input type="text" placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button>Register</button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/")}
      >
        Back to Login
      </p>
    </div>
  );
}