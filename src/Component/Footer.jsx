import {React, useState} from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/Images/Frame 1.png"
import icons from '../assets/Images/Frame 1171276770.png'
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

export default function Footer() {
    const [formData, setFormData] = useState({email: "",});
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
    };
      const validateForm = () => {
        // const {email} = formData;
    const newErrors ={};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email";
    }

        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };
    
      const handleSubmit = async (e)=>{
      e.preventDefault();
      if (!validateForm()) return;
      setErrors("");
      //Backend part
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email : formData.email}),
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Subscription failed");
        return data;

      } catch (error) {
        console.log(error); 
      }
    };
  
  return (
    <footer className="bg-[#0E021E] lg:flex lg:justify-between lg:items-center px-5 lg:px-20 py-10 lg:py-15 text-white ">
      <div className='container lg:flex mx-auto items-center justify-between'>

      <div className='branding max-w-[280px]'>
      <Link to="/" aria-label="Home">
      <img src={logo} alt="Logo"/>
      </Link>
      <p className="text-lg pt-4 w-[300px] lg:w-[420px]">Stay connected and informed with our updates Subscribe to our newsletter for the latest updates on mental health tips, app features, and exclusive offers. Join our community to receive valuable insights and support right in your inbox</p>

        <form onSubmit={handleSubmit} className="flex w-xs lg:w-[350px] bg-white rounded-md mt-4 py-2 px-2">
        <input onChange={handleChange} value={formData.email} className="py-2 px-2 text-black" id = "email" type="email" placeholder="Email" />
        
        <button className="w-[150px] lg:w-[200px] bg-purple-600 hover:bg-purple-900 flex items-center justify-center border-0 text-white py-2 lg:px-2 h-[50px] rounded-md font-bold transition ">Subscribe</button>
        </form>
        {errors.email && (<p className='text-red-600 font-semibold mb-3'>{errors.email}</p>)}

        {/* <form onSubmit={handleSubmit} className='relative w-xs lg:w-full'>
        <input onChange={handleChange} value={formData.email} className="px-4 py-2  h-[45px] text-xs rounded-sm w-full border-0 bg-white placeholder-gray-500 " id='email' type='email' placeholder='Email'/>
        {errors.email && (<p className='text-red-600 font-semibold mb-3'>{errors.email}</p>)}
        <button className="absolute inset-y-1 right-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-sm flex items-center font-medium ">Subscribe</button>
        </form>  */}

        </div>
        
        <div className='py-5 lg:py-0'>
          <h3 className='mb-4 text-lg font-bold'>Quick Links</h3>
          <div className='flex flex-col text-xs sm:text-sm gap-2'>
          <Link to='/' className="hover:underline hover:text-purple-500 cursor-pointer py-1 block">Home</Link>
          <Link to="/allevents" className="hover:underline hover:text-purple-500 cursor-pointer py-1 block">Events</Link>
          <Link to="/comingsoon" className="hover:underline hover:text-purple-500 cursor-pointer py-1 block">About</Link>
          <Link to="/comingsoon" className="hover:underline hover:text-purple-500 cursor-pointer py-1 block">Contact</Link>
          </div>
        </div>

        <div className='py-5 lg:py-0'>
          <p className="text-lg font-bold">Socials</p>
          <div className='flex mt-4 gap-5'>
          <FiFacebook />
          <FaXTwitter />
          <FaInstagram />
          <FiYoutube />
          </div>
        </div>
      </div>
    </footer>
  )
}


        
//old one

        //  <form onSubmit={handleSubmit} className='relative w-full '>
        //   <input onChange={handleChange} value={formData.email} className="px-4 py-2 text-xs rounded-sm w-full border-0 bg-white text-gray-900 placeholder-gray-500 " id='email' type='email' placeholder='Email'/>
        //   {errors.email && (<p className='text-red-600 font-semibold mb-3'>{errors.email}</p>)}
        //   <button className="absolute inset-y-1 right-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-sm flex items-center font-medium">Subscribe</button>
        // </form>

        {/* <form onSubmit={handleSubmit} className='relative w-xs lg:w-full'>
        <input onChange={handleChange} value={formData.email} className="px-4 py-2  h-[45px] text-xs rounded-sm w-full border-0 bg-white placeholder-gray-500 " id='email' type='email' placeholder='Email'/>
        {errors.email && (<p className='text-red-600 font-semibold mb-3'>{errors.email}</p>)}
        <button className="absolute inset-y-1 right-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-sm flex items-center font-medium ">Subscribe</button>
        </form>  */}