import React from "react";
import AuthLayout from "../Layouts/AuthLayout";
import image from "../assets/Images/Frame 1171276802.png";
import logo from "../assets/Images/Frame 1171276813.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {toast} from "react-toastify"

export default function Signup() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //This helps to redirect after successful signup.
  const [formData, setFormData] = useState({
    // The formData holds all the input values while setFormData updates when the user types anything
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

  const [errors, setErrors] = useState({});
  //errors will hold validation error for each field

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
    
  };

  const validateForm = () => {
    //Start with a fresh, empty object. as you find problems add new properties like "newErrors.email= "..."
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //backend use in onsubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return ;
    setIsLoading(true);
    try {
      await register(formData);
      toast.success("Account created successfully! Please log in", {
        position: "top-center"
      })
      navigate("/signin");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again", {
        position: "top-center",
      })
      setErrors("Something went wrong, Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout image={image}>
      <div className="flex flex-col justify-center items-center mx-auto">
        <Link to="/"><img src={logo} className="mb-5" /></Link>
        <form onSubmit={handleSubmit} className="mx-auto px-10">
        <div className="text-start">
          <h1 className="font-bold text-xl mb-1">Create Account</h1>
          <p>Let’s get you started so you can start joining and creating events</p>
        </div>
          <input
            onChange={handleChange}
            className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3"
            value={formData.email}
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-600 font-semibold mb-3">{errors.email}</p>
          )}

          <input
            onChange={handleChange}
            value={formData.fullName}
            className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3 "
            id="fullName"
            type="text"
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-red-600 font-semibold mb-3">{errors.fullName}</p>
          )}

          <div className="relative">
          <input
            onChange={handleChange}
            value={formData.password}
            className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3 "
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"/>
          <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute top-5 right-2">
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
          </button>
          </div>
          {errors.password && (
            <p className="text-red-600 font-semibold mb-3">{errors.password}</p>
          )}

          <div className="relative">
            <input
            onChange={handleChange}
            value={formData.confirmPassword}
            className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3 "
            id="confirmPassword"
            type={showPassword ? "text" : "password"} 
            placeholder="Confirm Password"/>
          <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute top-5 right-2">
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
          </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 font-semibold mb-3">
              {errors.confirmPassword}
            </p>
          )}

          <div className="flex gap-1">
            <input
              onChange={handleChange}
              checked={formData.agree}
              id="agree"
              type="checkbox"
            />
            <label htmlFor="agree">I agree to the <span className="underline">terms</span> and <span className="underline">conditions</span></label>
          </div>
          {errors.agree && (
            <p className="text-red-600 font-semibold mb-3">{errors.agree}</p>
          )}

          <div className="max-w-lg w-full">
            <button
              className="border w-full mt-10 my-2 py-2 px-3 rounded-md bg-purple-600 text-white disabled:opacity-50"
              type="submit" disabled={isLoading}
            >
              {isLoading ? "signing up" : "Sign up"}
            </button>

            <div className="flex gap-1 justify-start">
              <h3>Already have an account?</h3>
              <Link to="/signin" className="font-bold text-purple-600">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
