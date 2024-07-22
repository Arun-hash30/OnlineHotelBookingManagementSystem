import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Image from "../../assets/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log('Login response data:', response.data); // Debugging line
      return response.data; // { success: true/false, role: string, userId: string }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, role: null, userId: null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);
    const { email, password } = formData;
    const result = await login(email, password);

    console.log('Login result:', result); // Debugging line

    const { success, role, userId } = result;

    if (!success) {
      setErrors({ form: "Invalid credentials. Please try again." });
    } else {
      console.log("Logged in userId:", userId); // Log userId to console
      localStorage.setItem('userId', userId); // Store user ID
      localStorage.setItem('userRole', role); // Store user role
      switch (role) {
        case "ADMIN":
          navigate("/bookings/all");
          break;
        case "HOTELMANAGER":
          navigate("/bookings/all");
          break;
        case "CUSTOMER":
          navigate("/");
          break;
        default:
          setErrors({ form: "Role not recognized." });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex justify-center sm:justify-end">
          <img className="h-96 object-cover rounded-lg" src={Image} alt="Login" />
        </div>
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email *
              </label>
              <input
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.email ? "border-red-500" : ""
                }`}
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password *
              </label>
              <input
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.password ? "border-red-500" : ""
                }`}
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            {errors.form && <p className="text-red-500 text-sm mt-2">{errors.form}</p>}
            <div className="text-center mt-4">
              <span className="text-gray-700 text-sm">Do not have an account? {" "}</span>
              <Link to="/signup" className="text-blue-500 hover:underline text-sm">
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
