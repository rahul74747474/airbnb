import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/login", formData, { withCredentials: true });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ff385c] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-transparent border border-white rounded-2xl p-8 text-white shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo-no-nav.png"
            alt="Logo"
            className="h-16 scale-[1.3]"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

        {error && (
          <p className="text-red-200 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border border-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border border-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full bg-white text-[#ff385c] font-semibold py-2 rounded-md hover:bg-pink-100 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="underline text-white hover:text-gray-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
