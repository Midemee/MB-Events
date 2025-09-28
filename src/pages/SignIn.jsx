import { React, useState, useContext } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import image from "../assets/Images/Frame 1171276802 (1).png";
import logo from "../assets/Images/Frame 1171276813.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {toast} from "react-toastify"

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Backend Part
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return ;
    setIsLoading(true)
    try {
      await login(formData);
      toast.success("Signed in successfully!", {
      position: "top-center"
      })
      navigate("/");
    } catch (error) {
            toast.error(error.message || "Login failed. Please try again", {
              position: "top-center",
            })
      setErrors("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout image={image}>
      <div className="flex flex-col justify-center items-center mx-auto ">
        <Link to="/"><img src={logo} className="mb-5" /></Link>

        <form onSubmit={handleSubmit} className="max-w-lg w-full">
          <h1 className="font-bold text-xl mb-6">Welcome Back</h1>
          <p className="">Sign In To Your Account</p>

          <input
            onChange={handleChange}
            value={formData.email}
            className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3 "
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-600 font-semibold mb-3">{errors.email}</p>
          )}

          <div className="relative">
            <input
              onChange={handleChange}
              value={formData.password}
              className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-5 right-2"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 font-semibold mb-3">{errors.password}</p>
          )}

          <Link to="/forgotpassword" className="underline text-sm">
            Forgot Password?
          </Link>
          <div className="max-w-lg w-full">
            <button
              className="border w-full mt-10 mb-4 text-white py-2 px-3 rounded-md bg-purple-600 disabled:opacity-50"
              type="submit"
             
            >
            {isLoading ? "Signing In" : "Sign In"}
            </button>

            <div className="flex gap-1 justify-start">
              <h3>Dont have an account?</h3>
              <Link to="/signup" className="font-bold text-purple-600">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
