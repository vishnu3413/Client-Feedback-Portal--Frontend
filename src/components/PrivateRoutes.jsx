import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const decoded = jwtDecode(token);
  if (adminOnly && decoded.role !== "admin") return <Navigate to="/feedback" />;

  return children;
};

export default PrivateRoute;
