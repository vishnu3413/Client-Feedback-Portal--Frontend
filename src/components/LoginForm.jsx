import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const toggleForm = () => {
    setError("");
    setIsRegistering(!isRegistering);
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await api.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          isAdmin: form.isAdmin,
        });
        alert("Registration successful. Please log in.");
        toggleForm();
      } else {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        if(res.data.user.role == 'admin'){
          navigate("/admin");
        }
        else{
          navigate("/feedback");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={form.isAdmin}
                onChange={handleChange}
              />
              &nbsp;Register as Admin
            </label>
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {isRegistering && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button onClick={toggleForm} style={{ marginLeft: "8px" }}>
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
