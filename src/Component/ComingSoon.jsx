import React, { useState, useEffect } from 'react'
import Header from "./Navbar"
import { Link } from "react-router-dom"
import pixel from "../assets/Images/coming-soon-7166_256.gif"
import Loader from './Loader'


export default function ComingSoon() {
    const [pageLoading, setPageLoading] = useState(true);
  
      useEffect(() => {
      const timer = setTimeout(() => setPageLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []); 
  
     if (pageLoading) return <Loader/>;
  return (
    <>
    <Header/>
    <div className='container mx-auto flex items-center justify-center text-center'>
        <div>
            <img src={pixel} alt="coming soon" className='mx-auto'/>
            <h2 className='my-3 text-lg font-semibold mb-8'>
                This page us still under construction
            </h2>
            <Link to="/" className='w-[100px]mx-auto font-semibold bg-purple-500 text-white rounded-md py-2 px-3 h-[50px]'>
            <button >Go to homepage</button>
            </Link>
        </div>
    </div>  
    </>
  )
}
