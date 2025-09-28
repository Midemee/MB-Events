import React, { useState, useEffect } from 'react'
import Error from  '../assets/Images/Page Not Found.png'
import Header from  '../Component/Navbar'
import Loader from './Loader';

export default function Error404() {
    const [pageLoading, setPageLoading] = useState(true);
  
      useEffect(() => {
      const timer = setTimeout(() => setPageLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []); 
  
     if (pageLoading) return <Loader/>;
  return (
    <>
    <Header/>
    <div className='container mx-auto flex flex-col justify-center items-center'>
      <img src={Error} alt='404' className='w-100'/>
      <div className='text-center space-y-2'>
       <h1 className='font-bold text-lg '>Oh snap!, this is awkward.</h1>
      <p className='text-sm'>But not as awkward as shaking someone that is to giving you a fist bump</p>
      </div>

    </div>
    </>
  )
}
