import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("http://localhost:8080/auth/register", {
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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      {/* 🔥 USER TYPE SELECT */}
      <select onChange={(e) => setUserType(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select><br /><br />

      <button onClick={handleRegister}>Register</button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/")}
      >
        Back to Login
      </p>
    </div>
  );
}