import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Home from "../Home/home";
import Coding from "../assessments/Coding";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coding" element={<Coding />} />
      </Routes>
    </Router>
  );
}