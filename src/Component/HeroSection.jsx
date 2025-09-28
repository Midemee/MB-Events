import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import { AuthContext } from '../Context/AuthContext'

export default function HeroSection() {
   const { user } = useContext(AuthContext)
  return (
    <div className='px-5 lg:px-20 flex items-center hero-section text-white'>
      <div className='container mx-auto'>
      <section className='flex-col lg:flex justify-start lg:w-[400px]'>
      <h2 className='text-3xl lg:text-4xl md:w-[450px]  lg:w-[583px] font-semibold leading-10'>Discover Unforgettable Experiences With Ease </h2>
      <p className='w-[355px] lg:w-[420px] py-4'>"Find, book, and manage tickets for concerts, workshops, and social gatherings with ease. Create events, connect with your audience, and start making lasting memories today!"</p>
      { user ? <Link to="/createEvent"><button className='bg-purple-600 hover:bg-purple-900 w-[264px] px-2 py-2 h-[50px] rounded-md font-bold'>Create Event</button></Link> : <Link to="/signUp"><button className='bg-purple-600 hover:bg-purple-900 w-[264px] h-[50px] px-2 py-2 rounded-md font-bold'>Sign Up</button></Link>}
      </section>
      </div>
    </div>
  )
}


