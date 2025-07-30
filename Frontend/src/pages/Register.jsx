import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Ensure correct path

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ff385c] flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-white rounded-2xl p-8 text-white shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo-no-nav.png" alt="Logo" className="w-16 h-16 object-contain scale-150" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-6">Create Your Account</h2>

        {error && <p className="text-red-200 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border border-white placeholder-white text-white focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border border-white placeholder-white text-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border border-white placeholder-white text-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-white text-[#ff385c] font-semibold py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-white font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
