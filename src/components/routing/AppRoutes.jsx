import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Home from "../Home/home";
import Coding from "../assessments/Coding";
import Aptitude from "../Aptitude/Aptitude";
import Admin from "../Admin/Admin";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coding" element={<Coding />} />
        <Route path="/aptitude" element={<Aptitude />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}