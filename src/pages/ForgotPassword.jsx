import {React, useState} from 'react'
import logo from "../assets/Images/Frame 1171276813.png"
import AuthLayout from '../Layouts/AuthLayout'
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import image from "../assets/Images/Frame 1171276802 (1).png"

export default function ForgotPassword() {
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
      email: "",
    });
  
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
    };
      const validateForm = () => {
    const newErrors ={};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };
    
      const handleSubmit = async(e)=>{
      e.preventDefault();
      if (!validateForm()) return;
      setIsLoading(true);
      setErrors("");
      try {
        const base_url = import.meta.env.VITE_BASE_URL || "https://mb-events-server.onrender.com/api/user";
        const response = await fetch(`${base_url}/forgotpassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to send reset password email");
        toast.success("Reset password email sent",{
          position: "top-center",
        })
        
        return data;

      } catch (error) {
        console.log(error); 
        toast.error(error.message || "Failed to send email", {
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
          
          <form onSubmit={handleSubmit} className="space-y-5 max-w-lg w-full px-10 lg:px-0">
          <h1 className='font-bold text-xl mb-6'>Forgot Password?</h1>
          <p>No worries, we’ll send you instruction to help</p>

          <input onChange={handleChange} value={formData.email} className="border border-gray-300 rounded-md my-2 w-full h-10 text-lg px-3 " id='email' type='email' placeholder='Email'/>
          {errors.email && (<p className='text-red-600 font-semibold mb-3'>{errors.email}</p>)}

         <div className='max-w-lg w-full'>
         <button className="border w-full text-white my-2 py-2 px-3 rounded-md bg-purple-600 disabled:opacity-50" type="submit" disabled={isLoading} >
          {isLoading ? "loading..." : "Reset Password"}
          </button>
          </div> 

          </form>
          </div>
        </AuthLayout>  
  )
}
