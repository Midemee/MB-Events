import {React, useContext, useState} from 'react'
import logo from "../assets/Images/Frame 1171276813.png"
import { IoEyeOutline } from "react-icons/io5";
import AuthLayout from '../Layouts/AuthLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import image from "../assets/Images/Frame 1171276802.png"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';
import {toast} from "react-toastify"

export default function ResetPassword() {
    const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const {token} = useParams();
    const Navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
  
    const handleChange = (e) => {
    // const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value});
    setErrors({...errors})
    }
  
    const validateForm = () => {
    const newErrors ={};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
    newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async(e)=>{
      e.preventDefault();
      if (!validateForm()) return;
      setIsLoading(true)
      setErrors("")
            try {
              const base_url = import.meta.env.VITE_BASE_URL || "https://mb-events-server.onrender.com/api/user";
              const response = await fetch(`${base_url}/resetpassword/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              })
              const data = await response.json();
              if (!response.ok) throw new Error(data.message);
              toast.success("New Password Created, please Login now", {
                position: "top-center",
              })
              Navigate("/signin")
              return data;
      
            } catch (error) {
              console.log(error); 
              toast.error(error.message, {
              position: "top-center",
              });
            }
             finally {
            setIsLoading(false);
          }
          };

  return (
        <AuthLayout image={image}>
          <div className='flex flex-col justify-center items-center h-screen'>
          <Link to="/"><img src={logo} className="mb-5" /></Link>
          <form onSubmit={handleSubmit} className="space-y-5 max-w-lg w-full">
          <h1 className='font-bold text-xl mb-2'>Reset Password?</h1>
          <p className='text-sm'>Enter Your New Password</p>

          <div className='relative'>
          <input onChange={handleChange} 
          name = "password"
          value={formData.password}  
          className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3" 
          id='password' 
          type={showPassword ? "text" : "password"} 
          placeholder='Password'/>
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute top-5 right-2"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
                      </button>
          </div>
             {errors.password && (<p className='text-red-600 font-semibold mb-3'>{errors.password}</p>)}

          <div className='relative'>
          <input onChange={handleChange} 
          value={formData.confirmPassword} 
          className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3" 
          name = "confirmPassword"
          id='confirmPassword' 
          type={showPassword ? "text" : "password"} 
          placeholder='Confirm Password'/>
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute top-5 right-2"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
                      </button>
          </div>
          {errors.confirmPassword && (<p className='text-red-600 font-semibold mb-3'>{errors.confirmPassword}</p>)}

          <div className='max-w-lg w-full'>
         <button className="border w-full text-white my-2 py-2 px-3 rounded-md bg-purple-600 disabled:opacity-50" type="submit" disabled={isLoading} > 
          {isLoading ? "loading..." : "Reset Password" }</button>
          </div> 
          </form>
          </div>
        </AuthLayout>  
  )
}
