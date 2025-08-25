

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const API_BASE = import.meta.env.VITE_API_URL;

// Logo Component
import Logo from "../components/logo";

export default function Login() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate Form
  const validateForm = () => {
    if (!role) {
      setError("Please select a role");
      return false;
    }
    if (!username || !password) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const formDetails = new URLSearchParams();
    formDetails.append("username", username);
    formDetails.append("password", password);

    let endpoint = "";
    if (role === "Admin") {
      endpoint = `${API_BASE}/login_admin`;
    } else if (role === "Teacher") {
      endpoint = `${API_BASE}/login_faculty`;
    } else if (role === "Student") {
      endpoint = `${API_BASE}/login_student`;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email", username);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", role);

        if (role === "Admin") navigate("/admin");
        if (role === "Teacher") navigate("/teacher");
        if (role === "Student") navigate("/student");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="min-h-screen bg-[#2E373E] flex flex-col md:flex-row">
      {/* Left Side - Logo */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <Logo />
      </div>
  {/* Divider Line */}
    <div className="hidden md:flex items-center">
  <div className="h-120 w-px bg-gray-600"></div>
</div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-[#3C4750] p-6 rounded-xl shadow-md"
        >
          {error && (
            <div className="mb-4 p-3 text-white bg-red-700 rounded">
              {error}
            </div>
          )}

          {/* Role Select */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Role</label>
            <select
              value={role}
             
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#2E373E] text-white rounded focus:ring-2 focus:ring-[#65D6A4] outline-none"
            >
              <option value="" className="text-gray-400">Select a role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              placeholder="Email *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-3 py-2 bg-[#2E373E] text-white rounded focus:ring-2 focus:ring-[#65D6A4] outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 bg-[#2E373E] text-white rounded focus:ring-2 focus:ring-[#65D6A4] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#65D6A4] text-[#2E373E] py-2 rounded font-bold hover:bg-[#55b88c] transition"
          >
            {loading ? "Loading..." : "CONNECT"}
          </button>

          {/* Links */}
          <div className="flex justify-center items-center mt-4 text-gray-400 text-sm">
            <a href="#" className="hover:underline">
              Forgot your password
            </a>
            <span className="mx-2">-</span>
            <a href="#" className="hover:underline">
              Question?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
