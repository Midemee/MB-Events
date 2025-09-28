import React from 'react'

export default function AuthLayouts({children, image}) {

  return (
    <div className='container mx-auto flex justify-center items-center gap-5 h-screen'>
      <div className='hidden lg:flex justify-center items-center w-1/2 h-full '>
        <img src={image} className='' alt=''/>
      </div>
      <div className='lg:w-1/2'>{children} </div>
    </div>
  )
}

