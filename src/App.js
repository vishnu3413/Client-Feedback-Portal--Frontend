import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginForm.jsx";
import FeedbackForm from "./components/FeedbackForm.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feedback" element={<PrivateRoute><FeedbackForm /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute adminOnly><AdminPanel /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
