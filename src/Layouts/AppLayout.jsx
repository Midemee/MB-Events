import React from 'react'
import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"

export default function AppLayout({children}) {
  return (
    <div className='w-full mx-auto min-h-screen'>
      <Navbar/>
      <div>{children}</div>
      <Footer/>
    </div>
  )
}
